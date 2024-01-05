const WebSocket = require('ws');
const sys = require('./sysfunction');
const db = require('./mongodb');
const event = require('./event');

let fun = {};

//[MiraiBOT]转换消息
const send_msg_back = async (cmdback, data=[], seq = 1) => {

    let sendmsg = [];
    try {
        cmdback.forEach((v, k) => {

            if (v.bot_type == "text") {
                sendmsg.push({
                    "type": "Plain",
                    "text": v.text
                });
            }
            if (v.bot_type == "link") {
                sendmsg.push({
                    "type": "Plain",
                    "text": v.text
                });
            }
            if (v.bot_type == "imgurl") {
                sendmsg.push({
                    "type": "Image",
                    "url": v.text
                });
            }
        });

        if (sendmsg.length >= 1) {
            return sendmsg;
        } else {
            return [];
        }
    } catch (error) {
        sys.cmdlog("error", error.msg + error.stack);
        sendmsg = "\n[发生故障]\n" + error.msg + error.stack + "\n频繁显示请发送给猫燐修复。";
        return [];
    }

}


event.on('reconnect_mirai', async function (data) {
    miraiwss[data.bot] = new WebSocket(`ws://${cfg.mirai_host}:${cfg.mirai_wsport}/all?verifyKey=${cfg.verifyKey}&qq=${data.bot}`);
    const bot = data.bot;
    sekey[bot] = null;
    let skey = null;
    let offhand = false;


    // 监听错误事件
    miraiwss[bot].onclose = function (eve) {
        if (offhand == false) {
            offhand = true;
            console.log(eve);
            sys.cmdlog("error", `[Mirai-${bot}] websock服务器断开，重连(${botrc[bot]})次。`);
            setTimeout(function () {
                event.emit('reconnect_mirai', {
                    bot: bot,
                });
            }, 3000)
            botrc[bot]++;
            miraiwss[bot].close();
        }
    };
    // 监听错误事件
    miraiwss[bot].onerror = function (error) {
        if (offhand == false) {
            offhand = true;
            sys.cmdlog("error", `[Mirai-${bot}] websock服务器断开，重连(${botrc[bot]})次。`);
            setTimeout(function () {
                event.emit('reconnect_mirai', {
                    bot: bot,
                });
            }, 5000)
            botrc[bot]++;
            miraiwss[bot].close();
        }
    };

    miraiwss[bot].on('open', () => {
        sys.cmdlog("info", `[Mirai-${bot}] websock服务器连接成功`);
        botrc[bot] = 1;
    });

    miraiwss[bot].on('message', async (message) => {
        data = message.toString();

        

        try {
            data = JSON.parse(data);
            //sekey
            if (skey == null && data?.data?.session != null) {
                skey = data.data.session;
                sekey[bot] = data.data.session;
                sys.cmdlog("info", `\x1b[36m[Mirai-${bot}] ：已注册skey ${skey}\x1b[0m`);
            }

            if (data?.data?.type == "GroupMessage") {
                const sender = data?.data?.sender;


                if (cfg.mirai_test == true && sender.id != cfg.mirai_test_user) {
                    return;
                }

                let send = {
                    authorid: sender.id,
                    ws: miraiwss[bot],
                    bot: bot,
                    atlist: [],
                    msg: "",
                    msgtype : data.data.type,
                    attach: [],
                    groupid: sender.group.id,
                    name: sender.group.name,
                    groupusername: sender.memberName,
                    grouplevel: sender.group.permission,
                    timestamp: sender.joinTimestamp,
                };
                //console.log(data?.data?.messageChain);
                data?.data?.messageChain.forEach((v2, k2) => {
                    if (v2.type == "Source") {
                        //消息ID 不需要
                    }
                    if (v2.type == "At") {
                        //AT了某人
                        send.atlist.push(v2.target);
                    }
                    if (v2.type == "Plain") {
                        //消息
                        send.msg = send.msg + v2.text;
                    }
                    if (v2.type == "Image") {
                        //图片
                        send.attach.push({
                            filename : v2.imageId,
                            content_type : v2.imageType,
                            url : v2.url,
                        });
                    }
                });
                //console.log(send);
                if(send.atlist.length >=1){
                    return;
                }

                if (send.msg.length <= 1) {
                    send.msg = send.img;
                }
                if (send.msg == null) {
                    return;
                }

            

                //开启数据库时有效  向数据库写入次数
                if (cfg.db_mode == true) {
                    await db.upd('gf_bot_info', {
                        user: cfg.user
                    }, {
                        $inc: { qqcount: 1 }
                    });
                }

                cfg.qqgroup_count++;

                let msg = send.msg.trim();
                if (msg.charAt(0) === '/') {
                    msg = msg.slice(1);
                } else {
                    msg = msg;
                }
                const sp = msg.split(' ');
                const exp = sp.map(word => word.trim());
                const msck = sys.msgck(exp?.[0]);
                send.exp = exp;
                send.bot = bot;

                event.emit('receive_messages', {
                    type: 'mirai',
                    exp: exp,
                    data: send,
                });

                if (msck == false) {
                    return;
                } else {
                    event.emit('trigger_instr', {
                        type: 'mirai',
                        cmd: msck,
                        exp: exp,
                        data: send,
                    });
                    return;
                }

            }

        } catch (err) {
            sys.cmdlog("error", `[Mirai-${bot}] 接收的消息错误。`);
            sys.cmdlog("error", err);
        }
    });

});

//[官方bot]连接wss服务器
const connect_wss = async () => {
    return new Promise((resolve, reject) => {
        if (cfg.mirai_qq.length >= 1) {
            cfg.mirai_qq_pd = cfg.mirai_qq.length;
            cfg.mirai_qq.forEach((v, k) => {
                botrc[v] = 1;
                event.emit('reconnect_mirai', {
                    bot: v,
                });
            });
        }

    });
}

module.exports = {send_msg_back,connect_wss};