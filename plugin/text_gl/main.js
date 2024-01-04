const axios = require('axios');
const cfg = [
    {
        name: "pcrwiki",
        class: "pcr",
        plugin: "text_gl",
        mstype: "local",
        trigger: ["pcrwiki", "pcrwiki"],
    },
];

const run = async (ms, msg, type, opdata) => {
    backdata = [];
    let ckms = "";
    let ckmsarr = {};

    if (ms.name == "pcrwiki") {
        backdata.push({
            bot_type: "text",
            text: `【花舞组文档】https://sv2api.ww2.ren/pcrwiki`,
        });
        return backdata;
    }

};

module.exports = { cfg, run };