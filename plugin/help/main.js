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
];

const run = (ms, msg, type, opdata) => {
    backdata = [];
    let ckms = "";
    let ckmsarr = {};
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