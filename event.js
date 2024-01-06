const EventEmitter = require('events');
const eve = new EventEmitter();
const sys = require('./sysfunction');

//发送消息
eve.on('send_msg', async function (data) {

    if (data.type == "mirai") {
        if (data.data.msgtype == "GroupMessage") {
            const backmsg = {
                syncId: "send_group",
                command: "sendGroupMessage",
                content: {
                    target: data.data.groupid,
                    messageChain: data.miraimsg,
                }
            };
            console.log(backmsg);
            miraiwss[data.data.bot].send(JSON.stringify(backmsg));
            return;
        }
        return;
    } else {
        if (data.type == "qqgroup") {
            return;
        } else {
            if (data.type == "qqchannel") {
                return;
            } else {
                return;
            }
        }
    }

});
//指令内容翻译转换
eve.on('send_cmd', async function (data) {
    if (data.type == "mirai") {
        const backdata = await mirai.send_msg_back(data.send);
        if (backdata?.[0]?.type == "Plain") {
            if (backdata[0]['text'].startsWith('\n')) {
                backdata[0]['text'] = backdata[0]['text'].slice(1);
            }
        }

        eve.emit('send_msg', {
            ...data,
            miraimsg: backdata,
        });
    } else {
        if (data.type == "qqgroup") {
            const backdata = await txbot.send_msg_back(data.send, data.data, data.seq);
        } else {
            if (data.type == "qqchannel") {
                const backdata = await txbot.send_msg_back_qqchannel(data.send, data.data, data.seq);
            } else {
                return;
            }
        }
    }
});

//接收的指令
eve.on('trigger_instr', async function (data, seq = 1) {
    console.log(data);
    if (data.cmd.mstype == "local") {
        const cmdback = await sys.run_bot_cmd(data.cmd, data.exp, data.type, data.data, seq);
        if (cmdback == null) { return; }
        eve.emit('send_cmd', {
            type: data.type,
            cmd: data.cmd,
            seq: cmdback?.seq ?? 1,
            send: cmdback,
            exp: data.exp,
            data: data.data,
        });
        return;
    }
    if (data.cmd.mstype == "maobot") {
        const cmdback = await sys.run_bot_cmd(data.cmd, data.exp, data.type, data.data, seq);
        if (cmdback == 'no') { return; }
        eve.emit('send_cmd', {
            type: data.type,
            cmd: data.cmd,
            seq: cmdback?.seq ?? 1,
            send: cmdback,
            exp: data.exp,
            data: data.data,
        });
        return;
    }

    //其他分类交给插件自己处理
    return;

});

//接收的消息
eve.on('receive_messages', function (data) {
    return; 
    //废弃
    if (data.type == "mirai") {
        //sys.cmdlog("info", `\x1b[36m[` + data.type + `-${data.data.bot}] ${data.data.groupid}（${data.data.authorid}）：${data.data.msg}\x1b[0m`);
    } else {
        if (data.type == "qqgroup") {
            console.log(`[${data.data.d.timestamp}][接收信息] msgid ${data.data.d.id} msg${data.data.d.content} `);
            //sys.cmdlog("info", `\x1b[36m[` + data.type + `-${data.data.d.group_id}] ${data.data.d.content}\x1b[0m`);
        } else {
            if (data.type == "qqchannel") {
                console.log(`${data.data.d.authorid}：${data.data.d.content}`);
                //sys.cmdlog("info", `\x1b[36m[` + data.type + `-${data.data.d.guild_id}] ${data.data.d.content}\x1b[0m`);
            }
        }
    }
});

module.exports = eve;