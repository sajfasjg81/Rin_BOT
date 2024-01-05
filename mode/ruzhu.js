const axios = require('axios');
const event = require('../event');
let usertimer = {};

const run = async (ms, msg, type, opdata, seq = 1) => {

    if (type == "mirai") {
        return "no";
    }

    const timername = `${opdata.d.author.id}_${type}`; //计时器名


    if (type == "qqchannel") {
        let backdata = [];
        backdata.push({
            bot_type: "text",
            text: `QQ频道不支持该指令，请在Q群使用。`,
        });
        return backdata;
    } else {
        let backdata = [];
        backdata.push({
            bot_type: "text",
            text: `\n请在3分钟内使用哔哩哔哩手机客户端 > 右下角我的-顶部扫码图标 > 扫描入驻公会二维码。\n - 扫码登录代表您同意猫燐助手获取(SEDATA)数据用于分析《坎公骑冠剑手游-坎公百宝袋》公会战数据。\n扫码时提示风险是正常的，不放心可以不用公会功能。`,
        });

        backdata.push({
            bot_type: "text",
            text: `\n 入驻帮助问题文档：https://sv2api.ww2.ren/ruzhuhelp`,
        });

        backdata.push({
            bot_type: "imgurl",
            text: `https://sv2api.ww2.ren/?t=get/bili/qrget_bot&author=${opdata.d.author.id}&type=${type}`,
        });



        event.emit('send_cmd', {
            type: type,
            cmd: ms,
            seq: seq,
            send: backdata,
            exp: msg,
            data: opdata,
        });
        seq = seq + 3;
    }



    let smck = 0;
    let maxtime = 120 * 1000;

    function ABC() {
        maxtime = maxtime - 1000;
        if (maxtime <= 0) {
            seq++;
            backdata = [];
            backdata.push({
                bot_type: "text",
                text: `未扫码已停止检测，请重新使用 /入驻公会 指令。`,
            });
            event.emit('send_cmd', {
                type: type,
                cmd: ms,
                seq: seq,
                send: backdata,
                exp: msg,
                data: opdata,
            });
        } else {
            axios.get(`https://sv2api.ww2.ren/?t=get/bili/qrpoll_bot&author=${opdata.d.author.id}&type=${type}`)
                .then(response => {


                    if (response.data.title == "ck" && smck == 0) {
                        smck = 1;
                        seq++;
                        backdata = [];
                        backdata.push({
                            bot_type: "text",
                            text: "已收到扫码登录请求，请确认授权。",
                        });
                        event.emit('send_cmd', {
                            type: type,
                            cmd: ms,
                            seq: seq,
                            send: backdata,
                            exp: msg,
                            data: opdata,
                        });
                    }

                    if (response.data.title == 'error') {
                        seq++;
                        backdata = [];
                        backdata.push({
                            bot_type: "text",
                            text: response.data.text,
                        });
                        event.emit('send_cmd', {
                            type: type,
                            cmd: ms,
                            seq: seq,
                            send: backdata,
                            exp: msg,
                            data: opdata,
                        });
                        return;
                    }

                    if (response.data.title == 'ok') {
                        seq++;
                        backdata = [];
                        backdata.push({
                            bot_type: "text",
                            text: `入驻已完成，请使用指令绑定公会(已绑忽略)\n/绑定公会 ${response.data.text.guild_name} 绑定公会`,
                        });

                        event.emit('send_cmd', {
                            type: type,
                            cmd: ms,
                            seq: seq,
                            send: backdata,
                            exp: msg,
                            data: opdata,
                        });
                        return;
                    }

                    setTimeout(function () {
                        ABC();
                    }, 1000);

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    // 开始轮询  
    clearTimeout(usertimer[timername]);
    usertimer[timername] = setTimeout(ABC, 1000);

    return "no";
};

module.exports = { run };