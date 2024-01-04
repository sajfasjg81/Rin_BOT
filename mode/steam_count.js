const axios = require('axios');

const run = async (ms, msg, type, opdata) => {

    let backdata = [];

    await axios.get("https://api.yujn.cn/api/steam.php?type=json&count=15")
        .then(response => {
            backdata.push({
                bot_type: "text",
                text: `[steam今日在线排行榜]`,
            });
            response.data.data.forEach((value, index) => {
                if (value.name_cn.length >= 1) {
                    backdata.push({
                        bot_type: "text",
                        text: `\n${value.index} [${value.name_cn}] 在线${value.day_peak}`,
                    });
                } else {
                    backdata.push({
                        bot_type: "text",
                        text: `\n${value.index} [${value.name}] 在线${value.day_peak}`,
                    });
                }
            });

        })
        .catch(error => {
            console.error(error);
        });

    return backdata;
};

module.exports = { run};