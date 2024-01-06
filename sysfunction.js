const axios = require('axios');
const os = require('os');
const { memoryUsage } = process;
const https = require('https');
const fs = require('fs');
const db = require('./mongodb');
const { Console } = require('console');
const path = require('path');
const cmdlog = (type, msg) => {

    const currentTime = new Date();
    const hours = currentTime.getHours();
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const minutes = currentTime.getMinutes();
    const formattedminutes = minutes < 10 ? '0' + minutes : minutes;
    const seconds = currentTime.getSeconds();
    const formattedseconds = seconds < 10 ? '0' + seconds : seconds;

    if (type == "info") {
        console.log(`\x1b[36m[INFO]${formattedHours}:${formattedminutes}:${formattedseconds} ${msg}\x1b[0m`);
    }
    if (type == "error") {
        console.log(`\x1b[31m[ERROR]${formattedHours}:${formattedminutes}:${formattedseconds} ${msg}\x1b[0m`);
    }
}


//[官方BOT] count增加
const count_add = async (type, user) => {
    if (type == "qqgroup") {
        //猫燐专用
        if (cfg.mao_mode == true) {
            await db.upd('gf_bot_info', { user: user }, { $inc: { qqcount: 1 } });
        }
        cfg.qqgroup_count++;
        return;
    }
    if (type == "qqchannel") {
        if (cfg.mao_mode == true) { //猫燐专用
            await db.upd('gf_bot_info', { user: user }, { $inc: { pdcount: 1 } });
        }
        cfg.channel_count++;
        return;
    }
    return;
}

//[官方BOT] msg转换
const set_msg = (msg) => {
    msg = msg.trim();
    const regex = /<@!.*?>/g;
    msg = msg.replace(regex, '');
    msg = msg.trim();
    if (msg.charAt(0) === '/') {
        msg = msg.slice(1);
    }
    return msg;
}
//[函数] 获取时间
const get_time = () => {
    const date = new Date();
    const options = {
        timeZone: "Asia/Shanghai", // 指定时区为上海  
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    return date.toLocaleString('zh-CN', { ...options });
}
//[官方BOT] exp转换
const set_exp = (msg) => {
    const sp = msg.split(' ');
    const exp = sp.map(word => word.trim());
    return exp;
}
//[官方BOT] data数组
const set_data = (data, appid, exp) => {
    if (data.t == "GROUP_AT_MESSAGE_CREATE") {
        //群消息
        data.groupid = data.d.group_openid;
        data.channel_room = null;
    } else {
        //频道消息
        data.groupid = data.d.channel_id;
        data.channel_room = data.d.guild_id; //频道号？
    }
    data.attach = data.attachments;
    data.appid = appid;
    data.msgid = data.d.id;
    data.exp = exp;
    data.attach = data.attachments;
    data.atlist = [];
    return data;
}

//[官方BOT] QQ群 发送图片类
const sendmsgfile = async (d, postData) => {


    return new Promise((resolve, reject) => {

        const data = JSON.stringify(postData);
        const options = {
            hostname: 'api.sgroup.qq.com',
            path: `/v2/groups/${d.group_openid}/files`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `QQBot ${cfg.token}`,
                'X-Union-Appid': gfbot[appid].appid
            },
        };

        const req = https.request(options, (res) => {



            if (res.statusCode === 200) {
                let responseData = Buffer.alloc(0);

                res.on('data', (chunk) => {
                    responseData = Buffer.concat([responseData, chunk]);
                })

                res.on('end', () => {
                    try {
                        console.log(responseData.toString());
                        const data = JSON.parse(responseData.toString());
                        resolve(data);
                    } catch (e) {
                        cmdlog("error", e)
                        resolve();
                    }
                });
            } else {
                cmdlog("error", "图片发送失败")
                resolve();
            }

        });

        req.on('error', (e) => {
            cmdlog("error", e)
            resolve();
        });
        req.write(data);
        req.end();
    });
}

//载入BOT命令
const get_botcmd = async () => {
    const url = cfg.bot_cmd_url;
    // 发送HTTP请求
    axios.get(url)
        .then(response => {
            botcmd = {};
            botlist = response.data.data;
            // 处理成功的情况
            response.data.data.forEach((v, k) => {
                v.trigger.forEach((v2, k2) => {
                    botcmd[v2] = k;
                });
            });
            console.log('注册猫燐远程指令成功');

            // 指定目录路径  
            const directoryPath = `${dir}/plugin/`;

            // 读取目录中的文件和子目录  
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    console.error('无法读取目录:', err);
                    return;
                }

                // 遍历文件和子目录  
                files.forEach(file => {
                    const filePath = path.join(directoryPath, file);
                    const stat = fs.statSync(filePath);

                    // 如果是目录，则添加到结果数组中  
                    if (stat.isDirectory()) {
                        const lmode = require(`${directoryPath}${file}/main.js`);
                        lmode.cfg.forEach((v, k) => {
                            v.trigger.forEach((v2, k2) => {
                                botcmd[v2] = botlist.length;
                            });
                            botlist.push(v);
                        });
                    }
                });
            });

        })
        .catch(error => {
            console.error(error);
        });

}

//检查字符串是否识别指令
const msgck = (msname) => {
    if (typeof botcmd[msname] === 'undefined') {
        return false;
    } else {
        return botlist[botcmd[msname]];
    }
}

//运行BOT命令
const run_bot_cmd = async (ms, msg, type, opdata) => {


    try {

        return new Promise(async (resolve, reject) => {

            //本地指令
            if (ms.mstype == "local") {
                const lmode = require(`${dir}/plugin/${ms.plugin}/main.js`);
                let backdata = await lmode.run(ms, msg, type, opdata);
                if (backdata?.length <= 0) {
                    resolve();
                } else {
                    resolve(backdata);
                }
            }
            //猫燐指令
            if (ms.cmdtype == "mao_lin") {

                fs.exists(`${dir}/mode/${ms.mao_type}.js`, async (exists) => {

                    if (exists) {
                        const lmode = require(`./mode/${ms.mao_type}`);
                        let backdata = await lmode.run(ms, msg, type, opdata);
                        if (backdata.length <= 0) {
                            resolve([]);
                        } else {
                            resolve(backdata);
                        }
                    }

                });





                if (ms.mao_type == "balogo") {
                    let backdata = [];
                    let e1 = encodeURIComponent(opdata?.exp?.[1] ?? '未输入');
                    let e2 = encodeURIComponent(opdata?.exp?.[2] ?? '未输入');

                    backdata.push({
                        bot_type: "imgurl",
                        text: `https://oiapi.net/API/BlueArchive?startText=${e1}&endText=${e2}`,
                    });

                    resolve(backdata);
                }


                if (ms.mao_type == "rand_moe") {
                    let backdata = [];


                    backdata.push({
                        bot_type: "imgurl",
                        text: "https://t.mwm.moe/moez",
                    });

                    console.log(114514);

                    resolve(backdata);
                }


                if (ms.mao_type == "rand_ava") {
                    let backdata = [];

                    backdata.push({
                        bot_type: "imgurl",
                        text: "https://t.mwm.moe/tx",
                    });
                    Console.log(114514);
                    resolve(backdata);
                }

                if (ms.mao_type == "sub_test") {
                    resolve('no');
                }



            }
            // img指令
            if (ms.cmdtype == "img_src") {
                let backdata = [];

                backdata.push({
                    bot_type: "imgurl",
                    text: ms['img_src'],
                });

                resolve(backdata);
            }
            // curl_get指令
            if (ms.cmdtype == "curl_get") {
                const params = new URLSearchParams();
                msg.forEach((value, index) => {
                    params.append('text[]', value);
                });
                let ms___url = "";
                if (type == "qqgroup") {

                    let dmode = cfg.gmode;
                    let group = opdata.d.group_id;
                    if (diymode_qgroup[group] != null) {
                        dmode = diymode_qgroup[group];
                    }

                    ms___url = ms.curl_get + `&botmode=${dmode}&bottype=${type}&authorid=${opdata.d.author.id}&groupid=${opdata.d.group_id}&` + params.toString();
                }
                if (type == "qqchannel") {
                    ms___url = ms.curl_get + `&botmode=${cfg.mode}&bottype=${type}&authorid=${opdata.d.author.id}&channelid=${opdata.d.channel_id}&groupid=${opdata.d.guild_id}&` + params.toString();
                }
                if (type == "mirai") {
                    let miraimode = cfg.mirai_mode;
                    if (diymode_mirai?.[opdata.groupid] != null) {
                        miraimode = diymode_mirai?.[opdata.groupid];
                    }
                    console.log(diymode_mirai);
                    ms___url = ms.curl_get + `&botmode=${miraimode}&bottype=${type}&authorid=${opdata.authorid}&groupid=${opdata.groupid}&` + params.toString();
                }


                console.log(`[请求地址]${ms___url}`);

                axios.get(ms___url)
                    .then(response => {
                        resolve(response.data.data);
                    })
                    .catch(error => {

                        let backdata = [];

                        backdata.push({
                            bot_type: "text",
                            text: error + "请联系BOT管理员",
                        });

                        resolve(backdata);
                    });
            }
        });

    } catch (e) {
        cmdlog("error", `run_bot_cmd error`);
        cmdlog("error", e);
    }
}

//写入json
const save_json = async (file, json) => {
    return new Promise(async (resolve, reject) => {
        fs.writeFile(file, JSON.stringify(json), (err) => {
            if (!err) {
                console.log(`\x1b[36m[INFO]${file} JSON文件写入成功`);
                resolve();
            } else {
                reject(err);
            }
        });
    });
};

//读取json
const load_json = async (file) => {
    return new Promise(async (resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (!err) {
                console.log(`\x1b[36m[INFO]${file} JSON文件载入成功`);
                resolve(JSON.parse(data));
            } else {
                resolve({});
            }
        });
    });
}

module.exports = { get_time,count_add, set_data, set_exp, set_msg, load_json, save_json, cmdlog, msgck, run_bot_cmd, get_botcmd, sendmsgfile };