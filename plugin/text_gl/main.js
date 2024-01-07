const axios = require('axios');
const sys = require(dir + '/sysfunction');

const cfg = [
    {
        name: "pcrwiki",
        class: "pcr",
        plugin: "text_gl",
        mstype: "local",
        trigger: ["pcrwiki", "pcrwiki"],
    },
    {
        name: "模式切换",
        class: "guild",
        plugin: "text_gl",
        mstype: "local",
        trigger: ["模式切换", "msqh", "切换模式"],
    },
    {
        name: "重载指令",
        class: "hide",
        plugin: "text_gl",
        mstype: "local",
        trigger: ["重载指令", "reload", "rems"],
    },
    {
        name: "群信息",
        class: "hide",
        plugin: "text_gl",
        mstype: "local",
        trigger: ["群信息"],
    },
];

const run = async (ms, msg, type, opdata) => {
    backdata = [];
    let ckms = "";
    let ckmsarr = {};


    if(ms.name == "群信息"){
        //console.log(opdata);
        backdata.push({
            bot_type: "text",
            text: `群号：\n${opdata.groupid}\nQQ号：\n${opdata.qq}`,
        });
        return backdata;
    }

    if (ms.name == "pcrwiki") {
        backdata.push({
            bot_type: "text",
            text: `【花舞组文档】https://sv2api.ww2.ren/pcrwiki`,
        });
        return backdata;
    }

    if (ms.name == "重载指令") {
        let backdata = [];
        await sys.get_botcmd();
        backdata.push({
            bot_type: "text",
            text: `\n重载指令成功`,
        });

        return backdata;
    }

    if (ms.name == "模式切换") {
        if (type == "mirai") {

            if (diymode_mirai[opdata.groupid] == null) {
                diymode_mirai[opdata.groupid] = cfg.mirai_mode;
            }

            if (diymode_mirai[opdata.groupid] == 1) {
                diymode_mirai[opdata.groupid] = 2;
                backdata.push({
                    bot_type: "text",
                    text: `[Mirai群模式切换]\n - 群号：${opdata.groupid}\n - 模式：绑定模式\n此模式下所有人共享绑定公会。\n两种模式绑定不互通 首次切换模式后 需要重新绑定公会`,
                });
            } else {
                diymode_mirai[opdata.groupid] = 1;
                backdata.push({
                    bot_type: "text",
                    text: `[Mirai群模式切换]\n - 群号：${opdata.groupid}\n - 模式：公共模式\n此模式下所有人得单独绑定公会。\n两种模式绑定不互通 首次切换模式后 需要重新绑定公会`,
                });
            }

            sys.save_json(`${dir}/json/mode_mirai.json`, diymode_mirai);

        }

        if (type == "qqgroup") {

            const group = opdata.d.group_id;

            if (diymode_qgroup[group] == null) {
                diymode_qgroup[group] = cfg.gmode;
            }

            if (diymode_qgroup[group] == 1) {
                diymode_qgroup[group] = 2;
                backdata.push({
                    bot_type: "text",
                    text: `\n[官方机器人Q群模式切换]\n - 群号：${group}\n - 模式：绑定模式\n此模式下所有人共享绑定公会。\n两种模式绑定不互通 首次切换模式后 需要重新绑定公会`,
                });
            } else {
                diymode_qgroup[group] = 1;
                backdata.push({
                    bot_type: "text",
                    text: `\n[官方机器人Q群模式切换]\n - 群号：${group}\n - 模式：公共模式\n此模式下所有人得单独绑定公会。\n两种模式绑定不互通 首次切换模式后 需要重新绑定公会`,
                });
            }

            sys.save_json(`${dir}/json/mode_qgroup.json`, diymode_qgroup);

        }

        if (type == "qqchannel") {

            const group = opdata.d.guild_id;

            if (diymode_channel[group] == null) {
                diymode_channel[group] = cfg.gmode;
            }

            if (diymode_channel[group] == 1) {
                diymode_channel[group] = 2;
                backdata.push({
                    bot_type: "text",
                    text: `\n[模式切换]\n - 频道：${group}\n - 模式：绑定模式\n此模式下所有人共享绑定公会。\n两种模式绑定不互通 首次切换模式后 需要重新绑定公会`,
                });
            } else {
                diymode_channel[group] = 1;
                backdata.push({
                    bot_type: "text",
                    text: `\n[模式切换]\n - 频道：${group}\n - 模式：公共模式\n此模式下所有人得单独绑定公会。\n两种模式绑定不互通 首次切换模式后 需要重新绑定公会`,
                });
            }

            sys.save_json(`${dir}/json/mode_channel.json`, diymode_channel);

        }
        return backdata;
    }

};

module.exports = { cfg, run };