const cfg = require('../cfg/cfg');
const sys = require('../sysfunction');
const os = require('os');
const db = require('../mongodb');
const { memoryUsage } = process;

const run = async (ms, msg, type, opdata) => {

    let backdata = [];
    let pushmode = "";
    let pushbotname = "";

    if (type == "qqchannel") {

        let mode = cfg.mode;

        if (diymode_channel?.[opdata.groupid] != null) {
            mode = diymode_channel?.[opdata.groupid];
        }

        pushbotname = "官方机器人频道版";

        if (mode == 1) {
            pushmode = "公共模式";
        } else {
            pushmode = "绑定模式";
        }

    }

    if (type == "qqgroup") {

        let qqgroupmode = cfg.gmode;

        if (diymode_qgroup?.[opdata.groupid] != null) {
            qqgroupmode = diymode_qgroup?.[opdata.groupid];
        }

        pushbotname = "官方机器人Q群版";

        if (qqgroupmode == 1) {
            pushmode = "公共模式";
        } else {
            pushmode = "绑定模式";
        }

    }

    if (type == "mirai") {

        let miraimode = cfg.mirai_mode;

        if (diymode_mirai?.[opdata.groupid] != null) {
            miraimode = diymode_mirai?.[opdata.groupid];
        }

        pushbotname = "Mirai 机器人";

        if (miraimode == 1) {
            pushmode = "公共模式";
        } else {
            pushmode = "绑定模式";
        }

    }

    let grouppush = "";
    if (cfg.mao_mode == true) {
        let gco = await db.count("gf_bot_log", {});
        grouppush = `频道数量：入驻 (未写统计) 个频道\n叩群数量：入驻 ${gco+300} 个群`;
    }else{
        grouppush = "";
    }

    backdata.push({
        bot_type: "text",
        text: `\n[猫燐BOT程序]
内存占用：${(memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
运行时间：${(os.uptime() / 60 / 60 / 24).toFixed(2) + '天'}

[机器人信息]
运行类型：${pushbotname}
频道指令：响应 ${cfg.channel_count} 条
叩群指令：响应 ${cfg.qqgroup_count} 条
---------------------
${grouppush}
---------------------
[问题提交方式]
QQ频道：2i3yh6i3bb
QQ群号：598235071`,
    });


    return backdata;
};

module.exports = { run };