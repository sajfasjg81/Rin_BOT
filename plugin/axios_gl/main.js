const axios = require('axios');
const event = require(dir + '/event');

const cfg = [
    {
        name: "疯狂星期四",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        tips: "随机生成疯狂星期四",
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
        tips: "生成随机一句二次元话",
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
        tips: "随机获取一张卡牌",
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
        tips: "ecy 生成名称、随机生成二次元形象",
        trigger: ["二次元形象", "ecy", "二次元"],
    },
    {
        name: "成分组成",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        tips: "cf 生成名称、随机生成成分",
        trigger: ["成分组成", "cf", "成分"],
    },
    {
        name: "发病文案",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        tips: "发病文 发癫对象、随机生成一段发癫文",
        trigger: ["发病文案", "发病文", "发病", "发癫"],
    },
    {
        name: "狗屁不通",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        tips: "狗屁文 目标对象、随机生成一段文字",
        trigger: ["狗屁不通", "狗屁文"],
    },
    {
        name: "今天吃什么",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        tips: "随机美食",
        trigger: ["今天吃什么", "jtcsm", "今晚吃什么", "中午吃什么"],
    },
    {
        name: "原神图图",
        class: "za",
        plugin: "axios_gl",
        mstype: "local",
        trigger: ["原神图图"],
        tips: "随机返回一张原神图片",
        off: false,
    },
    {
        name: "素描头像",
        class: "yule",
        plugin: "axios_gl",
        mstype: "local",
        trigger: ["素描头像"],
        tips: "参数QQ号，生成一张素描头像。",
        off: false,
    },
    /*
{
    name: "图图",
    class: "za",
    plugin: "axios_gl",
    mstype: "local",
    trigger: ["图图"],
    tips: "随机一张二次元图",
    off: false,
},

{
    name: "识图搜番",
    class: "za",
    plugin: "axios_gl",
    mstype: "local",
    trigger: ["识图搜番"],
    tips: "根据动漫图片搜索番剧。",
    off: false,
},
*/
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

        /*
        //识别率过低停用
                if (ms.name == "识图搜番") {
                    let upimg = null;
                    if (opdata?.attach?.[0] != null) {
                        upimg = opdata.attach[0].url;
                    }
        
                    if (upimg == null) {
                        backdata.push({
                            bot_type: "text",
                            text: `请在指令后面添加图片`,
                        });
                    } else {
        
                        backdata.push({
                            bot_type: "text",
                            text: `搜番中...预计30s左右完成。（接口识别率非常低，可以尝试多次识别。）`,
                        });
        
                        axios.get(`https://api.52vmy.cn/api/img/fan?url=${upimg}`)
                            .then(response => {
        
                                backdata = [];
        
                                backdata.push({
                                    bot_type: "text",
                                    text: `疑似名称：${response.data.data.chinesetitle}(${response.data.data.nativetitle})`,
                                });
        
                                event.emit('send_cmd', {
                                    type: type,
                                    cmd: ms,
                                    seq: 2,
                                    send: backdata,
                                    exp: msg,
                                    data: opdata,
                                });
        
                            })
                            .catch(error => {
                                backdata.push({
                                    bot_type: "text",
                                    text: `[远程API失败]${error}`,
                                });
                                console.error(error);
                            });
                    }
        
                    return backdata;
                }
    
        //功能停用
        if (ms.name == "图图") {

            await axios.get(`https://api.lolicon.app/setu/v2?excludeAI=true&size=original&proxy=${cfg2.pixiv}`)
                .then(response => {
                    console.log(`${response.data.data[0]['urls']['original']}`);
                    backdata.push({
                        bot_type: "imgurl",
                        text: `${response.data.data[0]['urls']['original']}`,
                    });
                })
                .catch(error => {
                    backdata.push({
                        bot_type: "text",
                        text: `[远程API失败]${error}`,
                    });
                    console.error(error);
                });


            return backdata;
        }
    */
        if (ms.name == "素描头像") {

            if (opdata?.atlist?.[0] != null) {
                msg[1] = opdata.atlist[0];
            }
            if (msg[1] == null && type == "mirai") {
                msg[1] = opdata.authorid;
            }
            if (msg[1] == null) {
                backdata.push({
                    bot_type: "text",
                    text: `请添加参数\n素描头像 QQ号`,
                });
            } else {
                await axios.get(`https://api.52vmy.cn/api/avath/xian?qq=${msg[1]}&type=text`)
                    .then(response => {

                        backdata.push({
                            bot_type: "imgurl",
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
            }

            return backdata;
        }

        if (ms.name == "原神图图") {

            await axios.get("https://api.52vmy.cn/api/img/tu/yuan?type=text")
                .then(response => {

                    backdata.push({
                        bot_type: "imgurl",
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


            return backdata;
        }

        if (ms.name == "今天吃什么") {

            await axios.get("https://zj.v.api.aa1.cn/api/eats/")
                .then(response => {

                    backdata.push({
                        bot_type: "text",
                        text: `${response.data.meal1} ${response.data.meal2} ${response.data.mealwhat}`,
                    });
                })
                .catch(error => {
                    backdata.push({
                        bot_type: "text",
                        text: `[远程API失败]${error}`,
                    });
                    console.error(error);
                });


            return backdata;
        }

        if (ms.name == "发病文案") {

            let fbtext = null;

            if (opdata?.exp?.[1] != null) {
                await axios.get("https://api.lolimi.cn/API/fabing/fb.php?name=" + opdata?.exp[1])
                    .then(response => {
                        if (response.data.data == "各个视频的评论区偷的，别被屏蔽qwq") {
                            backdata.push({
                                bot_type: "text",
                                text: `指令失败请重试。`,
                            });
                        } else {
                            fbtext = response.data.data;
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
                    text: `请使用指令：${opdata.exp[0]} 要发癫的名称`,
                });
            }

            //违规词检测
            if (fbtext != null) {
                await axios.get("https://api.52vmy.cn/api/min?msg=" + fbtext)
                    .then(response => {
                        if(response.data.data.length >= 1){
                            backdata.push({
                                bot_type: "text",
                                text: `[发癫失败]包含违规词语`,
                            });
                        }else{
                            backdata.push({
                                bot_type: "text",
                                text: fbtext,
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