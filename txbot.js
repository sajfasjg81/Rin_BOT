const WebSocket = require('ws');
const sys = require('./sysfunction');
const db = require('./mongodb');
const https = require('https');
const axios = require('axios');
const event = require('./event');
const { count } = require('console');
const cfg = require('./cfg/cfg');
let wss_timer;
let timer_token;


//[官方bot]运行BOT
const v2run = async () => {
    let lth = 0;
    return new Promise((resolve, reject) => {
        cfg.botlist.forEach(async (v, k) => {
            gfbot[v.appid] = v;
            await token(v.appid);
            await wssget(v.appid);
            await run_timer_token(v.appid);
            await connect_wss(v.appid);
            lth++;
            console.log(`[${sys.get_time()}][INFO][腾讯平台BOT-${v.appid}] BOT进度  ${lth} / ${cfg.botlist.length}`);
            if (lth >= cfg.botlist.length) {
                resolve(true);
            };
        });
    });
}

//[官方BOT]获取token
const token = async (appid) => {

    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            'appId': appid,
            'clientSecret': gfbot[appid].ak,
        });
        const options = {
            hostname: 'bots.qq.com',
            path: '/app/getAppAccessToken',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //sys.cmdlog("info", `[官方机器人-${appid}]正在向腾讯开放平台申请临时token`);
        const req = https.request(options, (res) => {
            res.on('data', (data) => {
                data = JSON.parse(data.toString());
                gfbot[appid].token = data.access_token;
                gfbot[appid].tokenout = data.expires_in - 50; //可能60概率会被识别错误
                //sys.cmdlog("info", `[官方机器人-${appid}] token获取成功，下次更新token时间 [ ${gfbot[appid].tokenout} ] 秒后`);
                resolve(true);
            });
        });
        req.on('error', (error) => {
            console.error(error);
            process.exit();
        });
        req.write(postData);
        req.end();
    });
}

//[官方机器人] 首次定时申请token
const run_timer_token = (appid) => {
    //sys.cmdlog("info", `[官方机器人-${appid}] token计时器启动`);
    clearTimeout(gfbot[appid].timer_token);
    gfbot[appid].timer_token = setTimeout(async () => {
        await out_timer_token(appid);  //函数未改
        run_timer_token(appid);
    }, gfbot[appid].tokenout * 1000); //单位毫秒修正
}

//[官方机器人-事件] 机器人连接时
event.on('txbot_connect', async function (appid) {
    gfbot[appid].wss = new WebSocket(gfbot[appid].wssurl);

    // 监听错误事件
    gfbot[appid].wss.onclose = function (event) {
        sys.cmdlog("info", `[官方机器人-${appid}] 与腾讯服务器断开正在重连。`);
        setTimeout(function () {
            connect_wss(appid);
        }, 2000)
    };
    // 监听错误事件
    gfbot[appid].wss.onerror = function (error) {
        sys.cmdlog("info", `[官方机器人-${appid}] 与腾讯服务器断开正在重连。`);
        setTimeout(function () {
            connect_wss(appid);
        }, 2000)
    };

    gfbot[appid].wss.on('open', () => {
        //sys.cmdlog("info", `[官方机器人-${appid}] 腾讯服务器连接成功，正在登录BOT。`);
        sub_msg(appid); //订阅模式
        //发送心跳包
        clearTimeout(gfbot[appid].wss_timer);
        gfbot[appid].wss_timer = setInterval(() => {
            const heart = {
                "op": 1,
                "d": cfg.d
            }
            gfbot[appid].wss.send(JSON.stringify(heart));
        }, 5000);

    });

    gfbot[appid].wss.on('message', async (message) => {

        let data = message.toString();

        try {
            data = JSON.parse(data);
            //console.log(data);


            if (data.s) {
                gfbot[appid].s = data.s;
            }
            if (data.op == 7) {
                //console.log("腾讯服务器通知：即将断开ws服务器链接");
                return;
            }
            if (data.op == 10) {
                //console.log("腾讯服务器通知：正在连接ws服务器");
                return;
            }
            if (data.op == 0) {
                //登录成功
                if (data.t == "READY") { //BOT成功登录
                    gfbot[appid].user = data.d.user.id; //botid
                    event.emit(`txbot_connect_${appid}_end`, appid); //登录back

                    //猫燐专用  向数据库注册bot信息
                    if (cfg.mao_mode == true) {
                        let botinfo = await db.find("gf_bot_info", {
                            user: "11510438378917080826",
                        });
                        if (botinfo == null) {
                            await db.saveall('gf_bot_info', [{
                                user: data.d.user.id,
                                username: data.d.user.username,
                                bot: data.d.user.bot,
                                session_id: data.d.session_id,
                                qqcount: 0,
                                pdcount: 0,
                                online: 1,
                            }]);
                            botinfo = await db.find("gf_bot_info", {
                                user: "11510438378917080826",
                            });
                        }
                        cfg.qqgroup_count = botinfo.qqcount; //导入历史处理数量
                        cfg.channel_count = botinfo.pdcount; //导入历史处理数量
                    }
                    return;
                }
                //[官方BOT事件] BOT加群
                if (data.t == "GROUP_ADD_ROBOT") {
                    const datas = {
                        appid: appid,
                        group_openid: data.d.group_openid,
                    };
                    const postDatas = {
                        content: "欢迎使用[RinBOT]腾讯平台版本\n使用文档：https://sv2api.ww2.ren/bothelp",
                        msg_type: 0,
                        timestamp: Date.now(),
                    };
                    sendmsgzhu(datas, postDatas);
                    //发送主动消息 官方似乎每个群限制每月4次
                    //猫燐专用
                    if (cfg.mao_mode == true) {
                        let send_msg = {
                            type: "addbot",
                            group: data.d.group_openid,
                            msgqq: data.d.op_member_openid,
                            appid: appid,
                            time: data.d.timestamp,
                        };
                        await db.save('gf_bot_log', send_msg);

                    }
                    return;
                }
                //[官方BOT事件] BOT被T出群
                if (data.t == "GROUP_DEL_ROBOT") {
                    //猫燐专用
                    if (cfg.mao_mode == true) {

                        let send_msg = {
                            type: "kickbot",
                            group: data.d.group_openid,
                            msgqq: data.d.op_member_openid,
                            appid: appid,
                            time: data.d.timestamp,
                        };
                        await db.save('gf_bot_log', send_msg);

                    }
                    return;
                }
                //[官方BOT事件] 频道消息 公域 AT
                if (data.t == "AT_MESSAGE_CREATE") {
                    let msg = sys.set_msg(data.d.content);
                    const exp = sys.set_exp(msg);
                    const msck = sys.msgck(exp?.[0],"gfbot");
                    data = sys.set_data(data,appid,exp);
                    sys.count_add("qqchannel",gfbot[appid].user);
                    console.log(`[${sys.get_time()}][INFO][QQchannel-公域-收到消息]\n■ 频道：${data.channel_room}(${data.groupid})\n■ 消息ID：${data.msgid}\n■ ${msg}`);
                    if (msck != false) {
                        event.emit('trigger_instr', {
                            type: 'qqchannel',
                            cmd: msck,
                            exp: exp,
                            data: data,
                        });
                    }
                    return;
                }
                //[官方BOT事件] 频道消息 私域 
                if (data.t == "MESSAGE_CREATE") {
                    let msg = sys.set_msg(data.d.content);
                    const exp = sys.set_exp(msg);
                    const msck = sys.msgck(exp?.[0],"gfbot");
                    data = sys.set_data(data,appid,exp);
                    sys.count_add("qqchannel",gfbot[appid].user);
                    console.log(`[${sys.get_time()}][INFO][QQchannel-私域-收到消息]\n■ 频道：${data.channel_room}(${data.groupid})\n■ 消息ID：${data.msgid}\n■ ${msg}`);
                    if (msck != false) {
                        event.emit('trigger_instr', {
                            type: 'qqchannel',
                            cmd: msck,
                            exp: exp,
                            data: data,
                        });
                    }
                    return;
                    }
                //[官方BOT事件] 公域私域消息 群消息
                if (data.t == "GROUP_AT_MESSAGE_CREATE") {
                    let msg = sys.set_msg(data.d.content);
                    const exp = sys.set_exp(msg);
                    const msck = sys.msgck(exp?.[0],"gfbot");
                    data = sys.set_data(data,appid,exp);
                    sys.count_add("qqgroup",gfbot[appid].user);
                    console.log(`[${sys.get_time()}][INFO][GROUP-收到消息]\n■ 群号：${data.groupid}\n■ 消息ID：${data.msgid}\n■ ${msg}`);
                    if (msck != false) {
                        event.emit('trigger_instr', {
                            type: 'qqgroup',
                            cmd: msck,
                            exp: exp,
                            data: data,
                        });
                    }
                    return;
                }
            }
            return true;
        } catch (err) {
            console.error(`[${sys.get_time()}][ERROR]`,err);
            return false;
        }
    });

});

//[官方bot]连接wss服务器
const connect_wss = async (appid) => {

    return new Promise((resolve, reject) => {
        event.emit(`txbot_connect`, appid);
        event.once(`txbot_connect_${appid}_end`, async function (appid) {
            //sys.cmdlog("info", `[官方机器人-${appid}] BOT登录成功`);
            resolve(true);
        });
    });

}


//[官方BOT] QQ群 发送图片类
const sendmsgfile = async (d, postData) => {


    return new Promise((resolve, reject) => {
        try {
            const data = JSON.stringify(postData);
            const options = {
                hostname: 'api.sgroup.qq.com',
                path: `/v2/groups/${d.d.group_openid}/files`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `QQBot ${gfbot[d.appid].token}`,
                    'X-Union-Appid': d.appid
                },
            };

            const req = https.request(options, (res) => {



                if (res.statusCode === 200) {
                    let responseData = Buffer.alloc(0);

                    res.on('data', (chunk) => {
                        responseData = Buffer.concat([responseData, chunk]);
                    })

                    res.on('end', () => {
                        const data = JSON.parse(responseData.toString());
                        resolve(data);
                    });
                } else {
                    const sendmsg = "\n[发生故障]图片发送失败。" + res.statusCode + res.statusMessage;
                    reject(sendmsg);
                }

            });

            req.on('error', (e) => {
                const sendmsg = "\n[发生故障]图片发送失败。" + e;
                reject(sendmsg);
            });
            req.write(data);
            req.end();

        } catch (e) {
            const sendmsg = "\n[发生故障]图片发送失败。" + e;
            reject(sendmsg);
        }

    });
}

//[官方BOT]转换指令频道
const send_msg_back_qqchannel = (cmdback, data, seq = 1) => {

    let sendmsg = "";
    let sendimg = [];

    try {
        cmdback.forEach((v, k) => {

            if (v.bot_type == "text") {
                sendmsg = sendmsg + `${v.text}`;
            }
            if (v.bot_type == "link") {
                sendmsg = sendmsg + `QQ频道不支持发送链接`;
            }
            if (v.bot_type == "imgurl") {
                console.log(`[${data.d.timestamp}][图片地址] msgid ${data.d.id} url ${v.text} `);
                sendimg.push(v.text);
            }
        });

        if (sendimg.length > 1) {

        } else {
            let postdata = {
                content: `to - ${data.d.author.username}\n` + sendmsg,
                msg_id: data.d.id,
            };

            if (sendimg.length == 1) {
                postdata.image = sendimg[0];
            }

            sendmsg_channel(data, postdata);
        }
    } catch (error) {
        console.log(error);
    }

}

//[官方BOT]转换指令
const send_msg_back = (cmdback, data, seq = 1) => {

    let sendmsg = "";
    try {
        cmdback.forEach(async (v, k) => {

            if (v.bot_type == "text") {
                sendmsg = sendmsg + `${v.text}`;
            }
            if (v.bot_type == "link") {
                sendmsg = sendmsg + `${v.text}`;
            }
            if (v.bot_type == "markdown") {
                seq++;
                const postData = {
                    msg_seq: seq,
                    msg_type: 2,
                    msg_id: data.d.id,
                    markdown: v.text,
                    timestamp: Date.now(),
                };
                sendmsgat(data, postData);
                return;
            }
            if (v.bot_type == "imgurl") {
                seq++;
                const filedata = {
                    file_type: 1,
                    srv_send_msg: false,
                    url: v.text,
                };

                console.log(`[${sys.get_time()}][INFO][图片地址] ${v.text} `);
                let re = 0;
                let backfile;
                function resfile() {
                    re++;
                    sendmsgfile(data, filedata)
                        .then(result => {
                            //console.log(`[${sys.get_time()}][INFO][上传完成] msgid ${data.d.id}  `);
                            // 处理成功的结果  
                            seq++;
                            const postData = {
                                msg_seq: seq,
                                msg_type: 7,
                                msg_id: data.d.id,
                                media: result,
                                timestamp: Date.now(),
                            };
                            sendmsgat(data, postData);
                        })
                        .catch(error => {
                            if (re >= 3) {
                                console.error(`[${sys.get_time()}][上传失败] msgid ${data.d.id}  `);
                                sendmsg = sendmsg + `${error} 失败，远程API故障与BOT无关。`;
                                console.error(error + "失败");
                                seq++;
                                const postData = {
                                    msg_seq: seq,
                                    content: sendmsg,
                                    msg_type: 0,
                                    msg_id: data.d.id,
                                    timestamp: Date.now(),
                                };
                                sendmsgat(data, postData);

                                return;
                            } else {
                                console.error(`[${sys.get_time()}][上传重试] msgid ${data.d.id}  `);
                                resfile();
                            }
                        });
                }
                resfile();
            }

            //botcmd[v2] = k;
        });


        if (sendmsg.length >= 1) {


            seq++;
            const postData = {
                msg_seq: seq,
                content: sendmsg,
                msg_type: 0,
                msg_id: data.d.id,
                timestamp: Date.now(),
            };
            sendmsgat(data, postData);
        }

    } catch (error) {
        sendmsg = "\n[发生故障]\n" + error.msg + error.stack + "\n频繁显示请发送给猫燐修复。";
        console.error(error.msg, error.stack);
        const postData = {
            content: sendmsg,
            msg_type: 0,
            msg_id: data.d.id,
            timestamp: Date.now(),
        };
        sendmsgat(data, postData);
    }

}

//[官方BOT] QQ频道 发送文本类
const sendmsg_channel = (d, postData) => {

    const appid = d.appid;
    const dd = d;
    d = d.d;

    const xdd = JSON.stringify(postData);

    const options = {
        hostname: 'api.sgroup.qq.com',
        path: `/channels/${d.channel_id}/messages`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `QQBot ${gfbot[appid].token}`,
            'X-Union-Appid': appid
        },
    };
    let re = 0;
    const msrun = () => {
        const req = https.request(options, (res) => {
            res.on('data', (chunk) => {
                re++;
                chunk = JSON.parse(chunk.toString());
                if (chunk.code != null) {

                    if (re <= 3) {
                        console.error(`[发生故障]发送失败，正在重试。msgid ${postData.msg_id}`);
                        msrun();
                    } else {
                        sys.cmdlog("error", JSON.stringify(chunk));
                        sendmsg = "\n[发生故障]\n" + JSON.stringify(chunk) + "\n频繁显示请发送给猫燐修复。";
                        if (postData.re != 1) {
                            const np = {
                                re: 1,
                                content: sendmsg,
                                msg_id: postData.msg_id,
                                timestamp: Date.now(),
                            };
                            sendmsg_channel(dd, np);
                        }
                    }

                }else{
                    console.log(`[发送完成]发送成功 msgid ${postData.msg_id}`);
                }
            });
            res.on('end', (end) => {
            });
        });

        req.on('error', (e) => {
        });
        req.write(xdd);
        req.end();
    }
    msrun();

}

//[官方BOT] QQ群 主动发送文本类 每月5次
const sendmsgzhu = (d, postData) => {

    const appid = d.appid;

    const xdd = JSON.stringify(postData);

    const options = {
        hostname: 'api.sgroup.qq.com',
        path: `/v2/groups/${d.group_openid}/messages`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `QQBot ${gfbot[appid].token}`,
            'X-Union-Appid': gfbot[appid].appid
        },
    };

    console.log(`[发送内容] ：`, postData);

    const req = https.request(options, (res) => {
        res.on('data', (chunk) => {
            chunk = JSON.parse(chunk.toString());
            console.log(`[消息已发] ：`, chunk);
        });
        res.on('end', (end) => {
        });
    });

    req.on('error', (e) => {
    });
    req.write(xdd);
    req.end();
}
//[官方BOT] QQ群 发送文本类
const sendmsgat = (d, postData) => {

    try {
        const appid = d.appid;
        d = d.d;

        const xdd = JSON.stringify(postData);

        const options = {
            hostname: 'api.sgroup.qq.com',
            path: `/v2/groups/${d.group_openid}/messages`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `QQBot ${gfbot[appid].token}`,
                'X-Union-Appid': gfbot[appid].appid
            },
        };

        let reint = 0;
        //console.log(postData);
        function run_ax() {
            const req = https.request(options, (res) => {
                res.on('data', (chunk) => {
                    chunk = JSON.parse(chunk.toString());
                    if (chunk.msg != "success") {
                        reint++;
                        if (reint >= 2) {
                            console.error(`[消息失败]  msgid ${d.id} 指令处理失败：禁止重试。`, chunk)
                        } else {
                            console.error(`[消息失败]  msgid ${d.id} 指令处理失败：频繁被拦截。`, chunk)
                            run_ax();
                        }
                    } else {
                        console.log(`[${sys.get_time()}][INFO][发送成功] ${d.id}`);
                    }
                });
                res.on('end', (end) => {
                });
            });

            req.on('error', (e) => {
            });
            req.write(xdd);
            req.end();
        }
        run_ax();
    } catch (err) {
        console.err(err);
    }


}

//[官方bot]订阅消息
const sub_msg = (appid) => {
    let its;
    if (gfbot[appid].qqchannel_at == false) {
        if (gfbot[appid].qqgroup_pd == false) {
            its = 0 | 1 << 9 | 1 << 12;
        } else {
            its = 0 | 1 << 25 | 1 << 9 | 1 << 12;
        }
        sys.cmdlog("info", `[官方机器人-${appid}] 正在以 私域 模式启动BOT`);
    } else {
        its = 0 | 1 << 25 | 1 << 30 | 1 << 12;
        sys.cmdlog("info", `[官方机器人-${appid}] 正在以 公域 模式启动BOT`);
    }

    const data = {
        "op": 2,
        "d": {
            "token": `QQBot ${gfbot[appid].token}`,
            "intents": its,
            "properties": {
                "$os": "linux",
                "$browser": "my_library",
                "$device": "my_library"
            }
        }
    };
    gfbot[appid].wss.send(JSON.stringify(data));

}



//[官方机器人] 定时重新申请token
const out_timer_token = async (appid) => {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            'appId': gfbot[appid].appid,
            'clientSecret': gfbot[appid].ak,
        });
        const options = {
            hostname: 'bots.qq.com',
            path: '/app/getAppAccessToken',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        sys.cmdlog("info", "[官方机器人]正在刷新临时token");
        const req = https.request(options, (res) => {
            res.on('data', (data) => {
                data = JSON.parse(data.toString());

                gfbot[appid].token = data.access_token;
                gfbot[appid].tokenout = data.expires_in - 50; //可能60概率会被识别错误
                sys.cmdlog("info", `[官方机器人]token获取成功，下次更新token时间 [ ${gfbot[appid].tokenout} ] 秒后`);
                resolve(true);
            });
        });
        req.on('error', (error) => {
            console.error(error);
            process.exit();
        });
        req.write(postData);
        req.end();
    });
}

//[官方BOT] 函数调用类 获取频道
const getchannel = async () => {
    const options = {
        hostname: 'api.sgroup.qq.com',
        path: `/users/@me/guilds`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `QQBot ${cfg.token}`,
            'X-Union-Appid': cfg.appid
        },
    };

    return new Promise((resolve, reject) => {
        https.get(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const back = JSON.parse(data);
                resolve(back);
            });
        }).on('error', (e) => {
            reject(false);
        }).end();
    });
}

//[官方BOT] 函数调用类 获取机器人状态
const getme = async () => {
    const options = {
        hostname: 'api.sgroup.qq.com',
        path: `/users/@me`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `QQBot ${cfg.token}`,
            'X-Union-Appid': cfg.appid
        },
    };

    return new Promise((resolve, reject) => {
        https.get(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const back = JSON.parse(data);
                if (back.id > 10000) {
                    delete back.union_openid;
                    delete back.union_user_account;
                    resolve(back);
                } else {
                    reject(false);
                }
            });
        }).on('error', (e) => {
            reject(false);
        }).end();
    });
}

//[官方bot]获取wss服务器
const wssget = async (appid) => {
    //sys.cmdlog("info", `[官方机器人-${appid}]正在获取官方websock服务器。`);
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({});
        const options = {
            hostname: 'api.sgroup.qq.com',
            path: '/gateway',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `QQBot ${gfbot[appid].token}`,
                'X-Union-Appid': gfbot[appid].appid
            },
        };
        const req = https.request(options, (res) => {
            res.on('data', (data) => {
                data = JSON.parse(data.toString());
                gfbot[appid].wssurl = data.url;
                //sys.cmdlog("info", `[官方机器人-${appid}]获取官方websock服务器成功：${gfbot[appid].wssurl}`);
                resolve(true);
            });
        });
        req.on('error', (error) => {
            sys.cmdlog("info", `[官方机器人-${appid}]获取官方websock服务器失败。`);
            console.error(error);
            process.exit();
        });
        req.write(postData);
        req.end();
    });
}

module.exports = { sendmsgzhu, sendmsgfile, token, v2run, send_msg_back_qqchannel, connect_wss, sub_msg, send_msg_back, sendmsgat, run_timer_token, out_timer_token, getchannel, getme, wssget };