
const sys = require(`${dir}/sysfunction`);
const cfg = [
    {
        name: "pcr指令",
        class: "ms",
        plugin: "help",
        mstype: "local",
        trigger: ["pcr", "pcr指令"],
    },
    {
        name: "娱乐指令",
        class: "ms",
        plugin: "help",
        mstype: "local",
        trigger: ["娱乐", "娱乐指令"],
    },
    {
        name: "切换指令",
        class: "ms",
        plugin: "help",
        mstype: "local",
        tips:"切换指令表展示方式",
        trigger: ["切换指令"],
    },
];


const run = async (ms, msg, type, opdata) => {
    backdata = [];
    let ckms = "";
    let ckmsarr = {};


    let ms_swich = await sys.load_json(`${dir}/json/ms_swich.json`)

    if (ms.name == "切换指令") {
        if(ms_swich[opdata.d.group_id] == null){
            ms_swich[opdata.d.group_id] = 1;
        }else{
            if(ms_swich[opdata.d.group_id] == 1){
                ms_swich[opdata.d.group_id] = 0;
            }else{
                ms_swich[opdata.d.group_id] = 1;
            }
        }
        if(ms_swich[opdata.d.group_id] == 1){
            backdata.push({
                bot_type: "text",
                text: `已切换为图片指令表模式`,
            });
        }else{
            backdata.push({
                bot_type: "text",
                text: `已切换为文本指令表模式`,
            });
        }
        await sys.save_json(`${dir}/json/ms_swich.json`,ms_swich);
        return backdata;
    }

    if (ms.name == "pcr指令") {
        ckms = "zlb";
        ckmsarr.class = "pcr";
    }
    if (ms.name == "娱乐指令") {
        ckms = "zlb";
        ckmsarr.class = "yule";
    }

    if (ckms == "zlb") {
        ckmsarr.list = `\n[${ms.name}列表]`;
        botlist.forEach((v, k) => {
           if(v.class == ckmsarr.class){
                ckmsarr.list += `\n${v.trigger?.[0]}(${v.trigger?.[1]})`;
           }
        });
        backdata.push({
            bot_type: "text",
            text: ckmsarr.list,
        });
        return backdata;
    }

};

module.exports = { cfg, run };