const sys = require('../sysfunction');

const run = async (ms, msg, type, opdata) => {

    let backdata = [];

    try {
        const randomNumber = Math.floor(Math.random() * 143) + 1;
        if (opdata?.exp?.[1] != null) {
            opdata.authorid = opdata?.exp?.[1];
            backdata.push({
                bot_type: "imgurl",
                text: "https://api.lolimi.cn/API/preview/api.php?qq=" + opdata.authorid + "&msg=　&type=" + randomNumber,
            });
        } else {
            backdata.push({
                bot_type: "text",
                text: `/表情包制作 目标QQ号 `,
            });
        }
    } catch (e) {
        console.error("api错误");
    }







    return backdata;
};

module.exports = { run };