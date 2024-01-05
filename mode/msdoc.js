
const run = async (ms, msg, type, opdata) => {

    let backdata = [];

    backdata.push({
        bot_type: "text",
        text: `指令文档 https://sv2api.ww2.ren/bothelp`,
    });
  
    return backdata;
};

module.exports = { run};