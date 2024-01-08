const axios = require('axios');


const challenges = {
    "合作挑战1": "6596a9797e4bee785e72ff52",
    "合作挑战2": "6596a9797e4bee785e72ff53",
    "合作挑战3": "6596a9797e4bee785e72ff54",
    "合作挑战4": "6596a9797e4bee785e72ff55",
};


const ckmsMappings = {
    "卡马逊食神": "6504fc35186c533c03340648",
    "卡马逊厨神": "6504fc35186c533c03340648",
    "卡马逊亡灵": "6504fc35186c533c03340647",
    "卡马逊死灵": "6504fc35186c533c03340647",
    "卡马逊黑帮": "6504fc35186c533c0334064d",
    "卡马逊植物": "6504fc35186c533c0334064e",
    "卡马逊西部": "6504fc35186c533c0334064f",
    "卡马逊其他1": "6504fc35186c533c03340643",
    "卡马逊其他2": "6504fc35186c533c03340652",
    "卡马逊额外": "6504fc35186c533c03340627",
};



const keys = Object.keys(ckmsMappings);
let kmx_mstext = "";
let kmxpush = [];
for (let i = 0; i < keys.length; i++) {
    kmx_mstext += `${keys[i]}\n`
    kmxpush.push(keys[i]);
}

const sjMappings = {
    "赛季1":"659b240942d8370c166d4257",
    "赛季2":"6504fc35186c533c03340645",
    "赛季3": "6504fc35186c533c03340649",
    "赛季4": "656dc67ae2f42045c6199ca2",
};
const keys2 = Object.keys(sjMappings);
let sj_mstext = "";
let sjpush = [];
for (let i = 0; i < keys2.length; i++) {
    sj_mstext += `${keys2[i]}\n`
    sjpush.push(keys2[i]);
}

const cfg = [
    {
        name: "pcr千里眼",
        class: "pcr",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["pcr千里眼", "pcrqly", "pcr未来视"],
        tips: "公主连结角色千里眼",
        off: false,
    },
    {
        name: "60秒看世界",
        class: "za",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["60秒看世界", "看世界"],
        tips: "获取今天的新闻",
        off: false,
    },
    {
        name: "随机柴郡",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        tips:"随机发送一张柴郡表情包",
        trigger: ["随机柴郡", "柴郡"],
        off: false,
    },
    {
        name: "随机咖波",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        tips:"随机发送一张咖波表情包",
        trigger: ["随机咖波", "咖波"],
        off: false,
    },
    {
        name: "随机龙图",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        tips:"随机发送一张龙图表情包（攻击性极高）",
        trigger: ["随机龙图", "龙图"],
        off: false,
    },
    {
        name: "丢",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["丢", "diu"],
        tips: "diu 目标Q号",
        off: false,
    },
    {
        name: "爬",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["爬", "pa"],
        tips: "pa 目标Q号",
        off: false,
    },
    {
        name: "mihoyo",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["mihoyo"],
        tips: "mihoyo 目标Q号",
        off: false,
    },
    {
        name: "rua",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["rua"],
        tips: "rua 目标Q号、摸头",
        off: false,
    },
    {
        name: "结婚",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["结婚", "jiehun"],
        tips: "结婚 目标Q号、生成结婚登记申请图片",
        off: false,
    },
    {
        name: "离婚",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["离婚", "lihun"],
        tips: "离婚 目标Q号、生成离婚协议图片",
        off: false,
    },
    {
        name: "悲报",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["悲报", "beibao"],
        tips: "悲报 内容、生成悲报图片",
        off: false,
    },
    {
        name: "喜报",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["喜报", "xibao"],
        tips: "喜报 内容 、生成喜报图片",
        off: false,
    },
    {
        name: "聚合表情包",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["表情包制作", "bqbzz", "聚合表情"],
        tips: "[参数]列表/指定 根据Q号随机制作表情包",
        off: false,
    },
    {
        name: "启动",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["启动", "qidong"],
        off: false,
        tips: "启动 Q号 文本",
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
        trigger: ["元气时间", "元气时间表"],
        off: false,
    },
    {
        name: "元气骑士词缀表",
        class: "za",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["元气词缀", "元气词缀表"],
        off: false,
    },
    {
        name: "合作远征",
        class: "wt",
        plugin: "img_gl",
        mstype: "local",
        trigger: [
            "合作远征", "hzyz",
            "合作挑战1", "合作挑战2", "合作挑战3", "合作挑战4",
        ],
        tips: "合作远征攻略、额外指令[合作远征列表]",
        off: false,
    },
    {
        name: "卡马逊",
        class: "wt",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["卡马逊", "kmx", "卡马逊列表", "卡马逊额外", ...kmxpush],
        tips: "卡马逊一图流、额外指令[卡马逊列表]",
        off: false,
    },
    {
        name: "赛季成就",
        class: "wt",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["赛季成就", "赛季", "赛季成就列表", "赛季列表", ...sjpush],
        tips: "赛季成就一图流、额外指令[赛季成就列表]",
        off: false,
    },

];

const run = async (ms, msg, type, opdata) => {
    backdata = [];
    let ckms = "";
    let ckmsarr = {};


    if (ms.name == "合作远征") {

        const keys = Object.keys(challenges);
        let mstext = "";
        for (let i = 0; i < keys.length; i++) {
            mstext += `${keys[i]}\n`
        }

        if (msg[0] == "合作远征" || msg[0] == "hzyz") {
            backdata.push({
                bot_type: "text",
                text: `[合作远征指令列表]\n${mstext}`,
            });
            return backdata;
        }


        if (challenges.hasOwnProperty(msg[0])) {
            ckms = "gl";
            ckmsarr.imgid = `&id=${challenges[msg[0]]}`;
        }
    }


    if (ms.name == "赛季成就") {
        if (msg[0] == "赛季" || msg[0] == "赛季成就") {
            ckms = "gl";
            ckmsarr.imgid = `&id=6504fc35186c533c0334063e`;
        }
        if (msg[0] == "赛季列表" || msg[0] == "赛季成就列表") {
            backdata.push({
                bot_type: "text",
                text: `[赛季成就指令列表]\n\n${sj_mstext}\n※缺失或错误联系猫燐修复，请带一图流。`,
            });
            return backdata;
        }

        if (sjMappings.hasOwnProperty(msg[0])) {
            ckms = "gl";
            ckmsarr.imgid = `&id=${sjMappings[msg[0]]}`;
        }

    }

    if (ms.name == "卡马逊") {
        if (msg[0] == "卡马逊") {
            ckms = "gl";
            ckmsarr.imgid = `&id=6504fc35186c533c03340624`;
        }

        if (msg[0] == "卡马逊列表") {
            backdata.push({
                bot_type: "text",
                text: `[卡马逊指令列表]\n\n${kmx_mstext}\n※缺失或错误联系猫燐修复，请带一图流。`,
            });
            return backdata;
        }

        if (ckmsMappings.hasOwnProperty(msg[0])) {
            ckms = "gl";
            ckmsarr.imgid = `&id=${ckmsMappings[msg[0]]}`;
        }

    }

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


        if (opdata?.atlist?.[0] != null) {
            opdata.exp[1] = opdata?.atlist?.[0];

        }

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


        //console.log(opdata);


        let imgl = {
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

            if (opdata?.atlist?.[0] != null) {
                opdata.exp[3] = opdata?.atlist?.[0];
            }

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

        if (opdata?.atlist?.[0] != null) {
            opdata.exp[1] = opdata?.atlist?.[0];
        }

        if (opdata.exp[1] == null && type == "mirai") {
            opdata.exp[1] = opdata.authorid;
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

        if (opdata?.atlist?.[0] != null) {
            opdata.exp[1] = opdata?.atlist?.[0];
        }

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

        if (opdata?.atlist?.[0] != null) {
            opdata.exp[1] = opdata?.atlist?.[0];
        }

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

        if (opdata?.atlist?.[0] != null) {
            opdata.exp[1] = opdata?.atlist?.[0];
        }

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

        if (opdata?.atlist?.[0] != null) {
            opdata.exp[1] = opdata?.atlist?.[0];
        }

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

    if (ms.name == "合作远征秘籍") {
        await axios.get('https://sv2api.ww2.ren/?t=get/gfbot/glms&name=合作远征秘籍')
            .then(response => {

            });
    }

    if (ms.name == "随机柴郡") {
        //console.log("测试触发");
        backdata.push({
            bot_type: "imgurl",
            text: `http://chaijun.avocado.wiki`,
        });
        return backdata;
    }
    if (ms.name == "随机咖波") {
        //console.log("测试触发");
        backdata.push({
            bot_type: "imgurl",
            text: `http://hanhan.avocado.wiki?kabo`,
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