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
        trigger: ["结婚","jiehun"],
        off: false,
    },
    {
        name: "离婚",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["离婚","lihun"],
        off: false,
    },
    {
        name: "悲报",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["悲报","beibao"],
        off: false,
    },
    {
        name: "喜报",
        class: "yule",
        plugin: "img_gl",
        mstype: "local",
        trigger: ["喜报","xibao"],
        off: false,
    },
];

const run = async (ms, msg, type, opdata) => {
    backdata = [];
    let ckms = "";
    let ckmsarr = {};
    if (ms.name == "60秒看世界") {
        backdata.push({
            bot_type: "imgurl",
            text: `https://api.52vmy.cn/api/wl/60s?id=2`,
        });
        return backdata;
    }

    if(ms.name == "离婚"){
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
    if(ms.name == "结婚"){
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
    if(ms.name == "悲报"){
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
    if(ms.name == "喜报"){
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
    if(ms.name == "聚合表情包"){
        let imgl = {
            "关注":41,
            "不幸":34,
            "追火车":25,
            "撕画":20,
            "画画":19,
            "奶茶":17,
            "波奇":16,
            "吃掉":14,
            "工地":11,
            "阿尼亚":7,
            "美少女":6,
            "异次元绳":1,
            "垃圾桶":43,
            "举枪":48,
            "锤子":49,
            "prpr":53,
            "胡桃":54,
            "急急国王":58,
            "亲亲":59,
            "凯露":61,
            "卡比":64,
            "可莉":65,
            "鲨鲨敲打":66,
            "loading":71,
            "看扁":72,
            "永远爱你":74,
        };
        let txl = {
            "狂粉" : 38,
            "寄" : 22,
            "不知道" : 10,
            "永远喜欢":5,
            "跟一样":4,
            "启动":44,
            "鲁迅":76,
        };
        let rdl = [41,39,37,34,33,32,31,30,29,28,27,25,23,21,20,19,18,17,16,15,14,11,8,7,6,3,2,1,43,48,49,50,52,53,54,58,59,60,61,62,63,64,65,66,68,69,71,72,73,74,79];
    }

    if (ms.name == "mihoyo") {
        if (opdata?.exp[1] != null) {
            opdata.authorid = opdata?.exp[1];
            backdata.push({
                bot_type: "imgurl",
                text: "https://oiapi.net/API/Mihoyo/?url=http://q1.qlogo.cn/g?b=qq%26nk="+opdata.authorid+"%26s=640",
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