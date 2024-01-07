const axios = require('axios');
const fs = require('fs');
const sys = require(dir + '/sysfunction');
const apitoken = cfg2.baapitoken;
let batimer = null;
const retime = 60 * 60 * 1000;
const cfg = [
    {
        name: "ba档线",
        class: "ba",
        plugin: "ba_aronaicu_api",
        mstype: "local",
        trigger: ["ba档线", "ba档线B服", "ba档线b服", "ba档线国服"],
    },
];

const start = async () => {
    if (apitoken == null) {
        console.log('未配置密钥');
        return;
    }
    const rank_cngf = async () => {
        const data = {
            server: 1,
            season: "latest",
            type: 2,
            page: 1,
            size: 21,
        };
        const url = 'https://api.arona.icu/api/v2/rank/list';
        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apitoken,
            }
        })
            .then(async response => {
                if (response.status == 200) {
                    await sys.save_json(`${dir}/json/ba_dang_gf.json`, response.data.data.records);
                }
            });

    }

    const rank_cnbf = async () => {
        const data = {
            server: 2,
            season: "latest",
            type: 2,
            page: 1,
            size: 21,
        };
        const url = 'https://api.arona.icu/api/v2/rank/list';
        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apitoken,
            }
        })
            .then(async response => {
                if (response.status == 200) {
                    await sys.save_json(`${dir}/json/ba_dang_bf.json`, response.data.data.records);
                }
            });

    }

    const run_get = async () => {
        console.log(`[info]正在获取BA官服档线`);
        await rank_cngf();
        console.log(`[info]正在获取BAB服档线`);
        await rank_cnbf();
    }

    batimer = setInterval(function () {
        run_get();
    }, retime);


    fs.access(`${dir}/json/ba_dang_bf.json`, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('BA缓存文件不存在');
            run_get();
        } else {
            fs.stat(`${dir}/json/ba_dang_bf.json`, (err, stats) => {
                if (err) {
                    console.error('获取文件修改日期时出错:', err);
                } else {
                    const modificationTime = stats.mtime;
                    const oneHourInMilliseconds = 60 * 60 * 1000;
                    const currentTime = new Date().getTime();
                    const timeDifference = currentTime - modificationTime;
                    if (timeDifference > oneHourInMilliseconds) {
                        run_get();
                    }
                }
            });
        }
    });
    console.log(`[${sys.get_time()}][info]正在运行BA总力战自动程序`);
};

const run = async (ms, msg, type, opdata) => {
    backdata = [];

    if (apitoken == null) {
        backdata.push({
            bot_type: "text",
            text: `未配置密钥。`,
        });
        return backdata;
    }

    if (ms.name == "ba档线") {

        if (msg[0] == "ba档线国服") {
            const dang = await sys.load_json(`${dir}/json/ba_dang_gf.json`)
            backdata.push({
                bot_type: "text",
                text: `[蔚蓝档案国服总力战档线]\n`,
            });
            if (dang.length <= 0 || dang.length == null) {
                backdata.push({
                    bot_type: "text",
                    text: `档线数据未缓存请等待60分钟。`,
                });
                return backdata;
            } else {
                dang.forEach(element => {
                    backdata.push({
                        bot_type: "text",
                        text: `\n${element.rank}线：${element.bestRankingPoint}(${element.hard})`,
                    });
                });
                backdata.push({
                    bot_type: "text",
                    text: `\n\n※B服指令：ba档案b服\n数据来源：什亭之匣(Arona ICU)(已授权)\n`,
                });
            }
        }

        if (msg[0] == "ba档线" || msg[0] == "ba档线b服" || msg[0] == "ba档线B服") {
            const dang = await sys.load_json(`${dir}/json/ba_dang_bf.json`)
            backdata.push({
                bot_type: "text",
                text: `[蔚蓝档案B服总力战档线]\n`,
            });
            if (dang.length <= 0 || dang.length == null) {
                backdata.push({
                    bot_type: "text",
                    text: `档线数据未缓存请等待60分钟。`,
                });
                return backdata;
            } else {
                dang.forEach(element => {
                    backdata.push({
                        bot_type: "text",
                        text: `\n${element.rank}线：${element.bestRankingPoint}(${element.hard})`,
                    });
                });
                backdata.push({
                    bot_type: "text",
                    text: `\n\n※国服指令：ba档案国服 ba档案b服\n数据来源：什亭之匣(Arona ICU)(已授权)\n`,
                });
            }
        }


    }
    return backdata;
};

module.exports = { cfg, run, start };