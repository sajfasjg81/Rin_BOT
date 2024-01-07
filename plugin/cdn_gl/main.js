const cfg = [
    {
        name: "分刀千里眼",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["分刀千里眼", "fdqly", "队伍千里眼"],
        tips: "返回公会战配队千里眼",
        cdnid: "652fbc812afc7b0bd250abe5",
    },
    {
        name: "评分暗",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["评分暗", "暗", "#暗"],
        tips: "返回会战属性配队",
        cdnid: "6504fc35186c533c03340629",
    },
    {
        name: "评分火",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["评分火", "火", "#火"],
        tips: "返回会战属性配队",
        cdnid: "6504fc35186c533c03340632",
    },
    {
        name: "评分土",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["评分土", "土", "#土"],
        tips: "返回会战属性配队",
        cdnid: "6504fc35186c533c03340633",
    },
    {
        name: "评分水",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["评分水", "水", "#水"],
        tips: "返回会战属性配队",
        cdnid: "6504fc35186c533c03340634",
    },
    {
        name: "评分虚",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["评分虚", "虚", "#虚"],
        tips: "返回会战属性配队",
        cdnid: "6504fc35186c533c0334063a",
    },
    {
        name: "评分光",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["评分光", "光", "#光"],
        tips: "返回会战属性配队",
        cdnid: "6504fc35186c533c03340635",
    },
    {
        name: "坎公千里眼",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["坎公千里眼", "千里眼", "qly"],
        tips: "返回坎公千里眼预测",
        cdnid: "653929bdcb10291c2227cc3c",
    },
    {
        name: "评分总览",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["会战总览", "总览"],
        tips: "返回公会战配队评分图表",
        cdnid: "6504fc35186c533c03340640",
    },
    {
        name: "连锁表",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["连锁表", "连锁", "#连锁"],
        tips: "返回连锁技能前摇时间表",
        cdnid: "6504fc35186c533c0334062a",
    },
    {
        name: "破甲冲突",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["破甲表", "破甲", "#破甲"],
        tips: "返回破甲冲突图表",
        cdnid: "6504fc35186c533c0334062b",
    },
    {
        name: "bossrush",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["bossrush", "br"],
        tips: "BR首领连战千里眼",
        cdnid: "6504fc35186c533c0334062c",
    },
    {
        name: "44进攻",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["44进攻", "44atk", "进攻"],
        tips: "44进攻阵容统计表",
        cdnid: "6504fc35186c533c03340630",
    },
    {
        name: "44防守",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["44防守", "44def", "防守"],
        tips: "44防守阵容统计表",
        cdnid: "6504fc35186c533c0334062e",
    },
    {
        name: "会战向遗物",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["会战向遗物","遗物", "遗器"],
        tips: "会战向推荐遗物表",
        cdnid: "6504fc35186c533c03340637",
    },
    {
        name: "角色评分表",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["角色评分表","角色强度", "角色评分"],
        tips: "返回已上线角色评分表",
        cdnid: "6504fc35186c533c03340639",
    },
    {
        name: "专武留存榜",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["专武留存榜","专武", "专武排名", "突破"],
        tips: "专武优先级排行榜",
        cdnid: "6504fc35186c533c03340636",
    },
    {
        name: "周边制造表",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["周边制造表","周边"],
        tips: "周边制造/道具图表",
        cdnid: "6504fc35186c533c0334063d",
    },
    {
        name: "钓鱼一图流",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["钓鱼一图流", "#钓鱼", "钓鱼"],
        tips: "钓鱼玩法攻略图表",
        cdnid: "6504fc35186c533c0334063f",
    },
    {
        name: "公会战分刀",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["公会战分刀","排刀", "分刀"],
        tips: "公会战分刀一图流",
        cdnid: "6504fc35186c533c03340641",
    },
    {
        name: "坎公伤害公式",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["坎公伤害公式", "公式","坎公公式"],
        tips: "坎公伤害公式",
        cdnid: "6504fc35186c533c03340644",
    },
    {
        name: "动作系数",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["动作系数","系数"],
        tips: "操控角色动作系数表",
        cdnid: "6504fc35186c533c0334064c",
    },
    {
        name: "BOSS异常抗性",
        class: "wt",
        plugin: "cdn_gl",
        mstype: "local",
        trigger: ["异常", "抗性"],
        tips: "公会战首领异常抗性表",
        cdnid: "6504fc35186c533c0334062f",
    },
];

const run = async (ms, msg, type, opdata) => {
    backdata = [];
    if (cfg2.cdnurl == null) {
        backdata.push({
            bot_type: "text",
            text: `未配置攻略源`,
        });
        return backdata;
    } else {
        if (ms.cdnid != null) {
            if (type == "qqgroup") {
                //使用腾讯广州cos走内网服务器
                backdata.push({
                    bot_type: "imgurl",
                    text: `${cfg2.cdnurl}${ms.cdnid}${cfg2.cdnurl_end}`,
                });
            } else {
                if (type == "qqchannel") {
                    //QQ频道走腾讯cos cdn服务器 
                    backdata.push({
                        bot_type: "imgurl",
                        text: `${cfg2.cdnurl2}${ms.cdnid}${cfg2.cdnurl2_end}`,
                    });
                } else {
                    //第三方BOT走本地服务器 
                    //【自搭服务器在腾讯云广州时】
                    console.log(`${cfg2.cdnurl3}${ms.cdnid}${cfg2.cdnurl3_end}`);
                    backdata.push({
                        bot_type: "imgurl",
                        text: `${cfg2.cdnurl3}${ms.cdnid}${cfg2.cdnurl3_end}`,
                    });
                }
            }
            return backdata;
        }
    }
};

module.exports = { cfg, run };