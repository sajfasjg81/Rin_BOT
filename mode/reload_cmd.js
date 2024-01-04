const sys = require('../sysfunction');

const run = async (ms, msg, type, opdata) => {

    let backdata = [];
    await sys.get_botcmd();
    backdata.push({
        bot_type: "text",
        text: `\n重载指令成功`,
    });
  
    return backdata;
};

module.exports = { run };

