const sys = require('../sysfunction');

const run = async (ms, msg, type, opdata) => {

    let backdata = [];


    const randomNumber = Math.floor(Math.random() * 143) + 1;
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
};

module.exports = { run };