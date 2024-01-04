const axios = require('axios');
const cfg = [
    {
        name: "pcr千里眼",
        class: "pcr",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["pcr千里眼", "pcrqly", "pcr未来视"],
        off: false,
    },
    {
        name: "60秒看世界",
        class: "za",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["60秒看世界", "看世界"],
        off: false,
    },
    {
        name: "随机柴郡",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["随机柴郡", "柴郡"],
        off: false,
    },
    {
        name: "随机龙图",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["随机龙图", "龙图"],
        off: false,
    },
    {
        name: "丢",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["丢", "diu"],
        off: false,
    },
    {
        name: "爬",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["爬", "pa"],
        off: false,
    },
    {
        name: "mihoyo",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["mihoyo"],
        off: false,
    },
    {
        name: "rua",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["rua"],
        off: false,
    },
    {
        name: "结婚",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["结婚", "jiehun"],
        off: false,
    },
    {
        name: "离婚",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["离婚", "lihun"],
        off: false,
    },
    {
        name: "悲报",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["悲报", "beibao"],
        off: false,
    },
    {
        name: "喜报",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["喜报", "xibao"],
        off: false,
    },
    {
        name: "聚合表情包",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["表情包制作", "bqbzz", "聚合表情"],
        off: false,
    },
    {
        name: "启动",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["启动", "qidong"],
        off: false,
    },
    {
        name: "呃呃",
        class: "za",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["呃呃"],
        off: false,
    },
    {
        name: "点赞",
        class: "za",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["点赞"],
        off: false,
    },
    {
        name: "元气骑士时间表",
        class: "za",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["元气骑士时间表", "元气时间表"],
        off: false,
    },
    {
        name: "元气骑士词缀表",
        class: "za",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["元气骑士词缀", "元气词缀表"],
        off: false,
    },
];

const run = async (ms, msg, type, opdata) => {
    backdata = [];
    let ckms = "";
    let ckmsarr = {};
    if (ms.name == "呃呃") {
        backdata.push({
            bot_type: "imgurl",
            text: `https://sv2api.ww2.ren/e.jpg`,
        });
        return backdata;
    }
    if (ms.name == "点赞") {
        backdata.push({
            bot_type: "imgurl",
            text: `https://sv2api.ww2.ren/gj.jpg`,
        });
        return backdata;
    }
    if (ms.name == "60秒看世界") {
        backdata.push({
            bot_type: "imgurl",
            text: `https://api.52vmy.cn/api/wl/60s?id=2`,
        });
        return backdata;
    }
    if (ms.name == "启动") {
        if (opdata?.exp[1] != null && opdata?.exp[2] != null) {
            opdata.exp[1] = parseInt(opdata.exp[1]); 
            backdata.push({
                bot_type: "imgurl",
                text: `https://api.lolimi.cn/API/preview/api.php?qq=${opdata.exp[1]}&msg=${opdata.exp[2]}&type=44`,
            });
        } else {
            backdata.push({
                bot_type: "text",
                text: `/${opdata.exp[0]} 目标QQ号 启动文本`,
            });
        }
        return backdata;
    }
    if (ms.name == "离婚") {
        if (opdata?.exp[1] != null) {
            backdata.push({
                bot_type: "imgurl",
                text: `https://api.lolimi.cn/API/preview/api.php?qq=${opdata.exp[1]}&type=32`,
            });
        } else {
            backdata.push({
                bot_type: "text",
                text: `/${opdata.exp[0]} 目标QQ号 `,
            });
        }
        return backdata;
    }
    if (ms.name == "结婚") {
        if (opdata?.exp[1] != null) {
            backdata.push({
                bot_type: "imgurl",
                text: `https://api.lolimi.cn/API/preview/api.php?qq=${opdata.exp[1]}&type=80`,
            });
        } else {
            backdata.push({
                bot_type: "text",
                text: `/${opdata.exp[0]} 目标QQ号 `,
            });
        }
        return backdata;
    }
    if (ms.name == "悲报") {
        if (opdata?.exp[1] != null) {
            backdata.push({
                bot_type: "imgurl",
                text: `https://api.lolimi.cn/API/preview/api.php?msg=${opdata.exp[1]}&type=12`,
            });
        } else {
            backdata.push({
                bot_type: "text",
                text: `/${opdata.exp[0]} 文本`,
            });
        }
        return backdata;
    }
    if (ms.name == "喜报") {
        if (opdata?.exp[1] != null) {
            backdata.push({
                bot_type: "imgurl",
                text: `https://api.lolimi.cn/API/preview/api.php?msg=${opdata.exp[1]}&type=45`,
            });
        } else {
            backdata.push({
                bot_type: "text",
                text: `/${opdata.exp[0]} 文本`,
            });
        }
        return backdata;
    }
    if (ms.name == "聚合表情包") {
        let imgl = {
            "关注": 41,
            "不幸": 34,
            "追火车": 25,
            "撕画": 20,
            "画画": 19,
            "奶茶": 17,
            "吃掉": 14,
            "工地": 11,
            "阿尼亚": 7,
            "美少女": 6,
            "异次元绳": 1,
            "垃圾桶": 43,
            "举枪": 48,
            "锤子": 49,
            "prpr": 53,
            "胡桃": 54,
            "急急国王": 58,
            "亲亲": 59,
            "凯露": 61,
            "卡比": 64,
            "可莉": 65,
            "鲨鲨敲打": 66,
            "loading": 71,
            "看扁": 72,
            "永远爱你": 74,
            "未响应": 88,
            "像画": 91,
            "西瓜": 94,
            "玩游戏": 98,
            "舔": 104,
            "关公": 119,
            "汤姆": 132,
            "嘲笑": 134,
            "我老婆": 136,
        };
        let rdl = [41, 39, 37, 34, 33, 32, 31, 30, 29, 28, 27, 25, 23, 21, 20, 19, 18, 17, 16, 15, 14, 11, 8, 7, 6, 3, 2, 1, 43, 48, 49, 50, 52, 53, 54, 58, 59, 60, 61, 62, 63, 64, 65, 66, 68, 69, 71, 72, 73, 74, 79, 82, 84, 86, 88, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104, 105, 106, 108, 110, 111, 112, 113, 118, 119, 121, 125, 126, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 141, 142, 143];

        if (opdata?.exp[1] == "列表") {
            backdata.push({
                bot_type: "text",
                text: `\n[纯表情列表]\n`,
            });
            for (let key in imgl) {
                backdata.push({
                    bot_type: "text",
                    text: `${key}、`,
                });
            }
            backdata.push({
                bot_type: "text",
                text: `\n\n[纯表情用法]\n ${opdata.exp[0]} 指定 永远爱你 QQ号`,
            });
            return backdata;
        }

        if (opdata?.exp[1] == "指定") {
            if (imgl?.[opdata?.exp?.[2]] != null) {
                if (opdata?.exp?.[3] == null) {
                    backdata.push({
                        bot_type: "text",
                        text: `未填写Q号 ${opdata?.exp?.[0]} ${opdata?.exp?.[1]} ${opdata?.exp?.[2]} QQ号`,
                    });
                } else {
                    backdata.push({
                        bot_type: "imgurl",
                        text: `https://api.lolimi.cn/API/preview/api.php?qq=${opdata.exp[3]}&type=${imgl[opdata.exp[2]]}`,
                    });
                }
                return backdata;
            } else {
                backdata.push({
                    bot_type: "text",
                    text: `指定表情不存在`,
                });
                return backdata;
            }
        }

        if (opdata?.exp[1] != null) {
            let randomIndex = Math.floor(Math.random() * rdl.length);
            let randomNumber = rdl[randomIndex];
            backdata.push({
                bot_type: "imgurl",
                text: `https://api.lolimi.cn/API/preview/api.php?qq=${opdata.exp[1]}&type=${randomNumber}`,
            });
            return backdata;
        } else {
            backdata.push({
                bot_type: "text",
                text: `请使用指令 ${opdata.exp[0]} QQ号`,
            });
            return backdata;
        }

    }

    if (ms.name == "mihoyo") {
        if (opdata?.exp[1] != null) {
            opdata.authorid = opdata?.exp[1];
            backdata.push({
                bot_type: "imgurl",
                text: "https://oiapi.net/API/Mihoyo/?url=http://q1.qlogo.cn/g?b=qq%26nk=" + opdata.authorid + "%26s=640",
            });
        } else {
            backdata.push({
                bot_type: "text",
                text: `/mihoyo 目标QQ号 `,
            });
        }
        return backdata;
    }
    if (ms.name == "rua") {
        if (opdata?.exp[1] != null) {

            backdata.push({
                bot_type: "imgurl",
                text: `https://api.lolimi.cn/API/face_petpet/?QQ=${opdata.exp[1]}`,
            });
        } else {
            backdata.push({
                bot_type: "text",
                text: `/${opdata.exp[0]} 目标QQ号`,
            });
        }
        return backdata;
    }
    if (ms.name == "丢") {
        if (opdata?.exp[1] != null) {

            backdata.push({
                bot_type: "imgurl",
                text: `https://api.lolimi.cn/API/diu/api.php?QQ=${opdata.exp[1]}`,
            });
        } else {
            backdata.push({
                bot_type: "text",
                text: `/丢 目标QQ号`,
            });
        }
        return backdata;
    }
    if (ms.name == "爬") {
        if (opdata?.exp[1] != null) {

            backdata.push({
                bot_type: "imgurl",
                text: `https://api.lolimi.cn/API/pa/api.php?QQ=${opdata.exp[1]}`,
            });
        } else {
            backdata.push({
                bot_type: "text",
                text: `/爬 目标QQ号`,
            });
        }
        return backdata;
    }

    if (ms.name == "pcr千里眼") {
        ckms = "gl";
        ckmsarr.imgid = `&id[]=6596a9797e4bee785e72ff56&id[]=6596a9797e4bee785e72ff57&id[]=6596a9797e4bee785e72ff58`;
    }

    if (ms.name == "元气骑士时间表") {
        ckms = "gl";
        ckmsarr.imgid = `&id=656dc67ae2f42045c6199ca4`;
    }

    if (ms.name == "元气骑士词缀表") {
        ckms = "gl";
        ckmsarr.imgid = `&id=656dc67ae2f42045c6199ca5`;
    }

    if (ms.name == "随机柴郡") {
        backdata.push({
            bot_type: "imgurl",
            text: `https://api.lolimi.cn/API/chaiq/c.php`,
        });
        return backdata;
    }
    if (ms.name == "随机龙图") {
        backdata.push({
            bot_type: "imgurl",
            text: `https://api.lolimi.cn/API/longt/l.php`,
        });
        return backdata;
    }



    if (ckms == "gl") {
        console.log('https://sv2api.ww2.ren/?t=get/gfbot/gl' + ckmsarr.imgid);
        await axios.get('https://sv2api.ww2.ren/?t=get/gfbot/gl' + ckmsarr.imgid)
            .then(response => {
                if (response?.data?.data != null) {
                    const imgdata = response.data.data;
                    imgdata.forEach((v, k) => {
                        backdata.push({
                            bot_type: "imgurl",
                            text: v.text,
                        });
                    });
                }
            })
            .catch(error => {
                console.error('请求发生错误:', error);
            });


        return backdata;
    }

};

module.exports = { cfg, run };