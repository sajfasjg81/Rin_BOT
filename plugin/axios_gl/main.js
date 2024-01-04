const axios = require('axios');

const cfg = [
    {
        name: "疯狂星期四",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        trigger: ["疯狂星期四", "vivo50"],
        api: {
            url: "https://api.yujn.cn/api/kfc.php?type=json",
            type: 'text',
            key: "msg",
        },
    },
    {
        name: "随机一言",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        trigger: ["随机一言", "rdyy"],
        api: {
            url: "https://api.lolimi.cn/API/dmyiyan/api.php",
            type: "text",
            key: "msg",
        },
    },
    {
        name: "塔罗牌",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        trigger: ["塔罗牌", "tlp", "塔罗"],
        api: {
            url: "https://oiapi.net/API/Tarot",
            type: "taluo",
        },
    },
    {
        name: "二次元形象",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        trigger: ["二次元形象", "ecy", "二次元"],
    },
    {
        name: "成分组成",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        trigger: ["成分组成", "cf", "成分"],
    },
    {
        name: "发病文案",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        trigger: ["发病文案", "发病文", "发病", "发癫"],
    },
    {
        name: "狗屁不通",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        trigger: ["狗屁不通", "狗屁文", "发病"],
    },
];

const run = async (ms, msg, type, opdata) => {
    backdata = [];

    try {

        if (ms.name == "狗屁不通") {
            if (opdata?.exp?.[1] != null) {
                await axios.get("https://api.lolimi.cn/API/dog/api.php?num=300&type=text&msg=" + opdata.exp[1])
                    .then(response => {
                        backdata.push({
                            bot_type: "text",
                            text: `${response.data}`,
                        });
                    })
                    .catch(error => {
                        backdata.push({
                            bot_type: "text",
                            text: `[远程API失败]${error}`,
                        });
                        console.error(error);
                    });
            } else {
                backdata.push({
                    bot_type: "text",
                    text: `${opdata.exp[0]} 目标名称`,
                });
            }

            return backdata;
        }

        if (ms.name == "发病文案") {
            if (opdata?.exp?.[1] != null) {
                await axios.get("https://api.lolimi.cn/API/fabing/fb.php?name=" + opdata?.exp[1])
                    .then(response => {
                        if (response.data.data == "各个视频的评论区偷的，别被屏蔽qwq") {
                            backdata.push({
                                bot_type: "text",
                                text: `指令失败请重试。`,
                            });
                        } else {
                            backdata.push({
                                bot_type: "text",
                                text: `${response.data.data}`,
                            });
                        }
                    })
                    .catch(error => {
                        backdata.push({
                            bot_type: "text",
                            text: `[远程API失败]${error}`,
                        });
                        console.error(error);
                    });
            } else {
                backdata.push({
                    bot_type: "text",
                    text: `${opdata.exp[0]} 要发癫的名称`,
                });
            }

            return backdata;
        }

        if (ms.name == "成分组成") {

            if (opdata?.exp?.[1] != null) {
                opdata.authorid = opdata?.exp[1];
                await axios.get("https://api.lolimi.cn/API/name/api.php?msg=" + opdata.authorid + "&type=text")
                    .then(response => {
                        backdata.push({
                            bot_type: "text",
                            text: `${response.data}`,
                        });
                    })
                    .catch(error => {
                        backdata.push({
                            bot_type: "text",
                            text: `[远程API失败]${error}`,
                        });
                        console.error(error);
                    });
            } else {
                backdata.push({
                    bot_type: "text",
                    text: `成分组成 名称`,
                });
            }

            return backdata;
        }
        if (ms.name == "二次元形象") {

            if (opdata?.exp?.[1] != null) {
                opdata.authorid = opdata?.exp[1];
                await axios.get("https://api.lolimi.cn/API/Ser/?name=" + opdata.authorid + "&type=text")
                    .then(response => {
                        backdata.push({
                            bot_type: "text",
                            text: `${response.data}`,
                        });
                    })
                    .catch(error => {
                        backdata.push({
                            bot_type: "text",
                            text: `[远程API失败]${error}`,
                        });
                        console.error(error);
                    });
            } else {
                backdata.push({
                    bot_type: "text",
                    text: `/ecy 名称`,
                });
            }

            return backdata;
        }

        const api = cfg.find(item => item.name === ms.name)?.api || {};
        if (api.type === 'taluo') {
            await axios.get(api.url)
                .then(response => {
                    if (response?.data?.data?.[0]?.['逆位'] == null) {
                        backdata.push({
                            bot_type: "text",
                            text: `${response.data.data[0].name_cn} (${response.data.data[0].name_en})\n${response.data.data[0]['meaning']}\n正位：${response.data.data[0]['正位']}`,
                        });
                    } else {
                        backdata.push({
                            bot_type: "text",
                            text: `${response.data.data[0].name_cn} (${response.data.data[0].name_en})\n${response.data.data[0]['meaning']}\n逆位：${response.data.data[0]['逆位']}`,
                        });
                    }
                    let newPicUrl = (response.data.data[0].pic).replace("oiapi.net", "xxapi.ww2.ren");
                    backdata.push({
                        bot_type: "imgurl",
                        text: `${newPicUrl}`,
                    });
                });
            return backdata;
        }
        if (api.type === 'text') {
            await axios.get(api.url)
                .then(response => {
                    backdata.push({
                        bot_type: "text",
                        text: response.data[api.key] || response.data,
                    });
                });
            return backdata;
        }
    } catch (err) {
        backdata.push({
            bot_type: "text",
            text: `[远程API失败]${error}`,
        });
        console.error(error);
    }
}


module.exports = { cfg, run };