const axios = require('axios');
function filterText(text) {  
    var linkRegex = /(https?:\/\/[^\s]+)/g;  
    return text.replace(linkRegex, '');  
  }
const run = async (ms, msg, type, opdata) => {

    let backdata = [];

    await axios.get("https://wiki.biligame.com/gt/游戏礼包码兑换须知?action=edit&veswitched=1")
        .then((response) => {
            const textareaRegex = /<textarea[^>]*>([\s\S]*?)<\/textarea>/gi;
            const textareaContent = response.data.match(textareaRegex)[0];
            const sp = textareaContent.split("\n");
            sp.forEach(function (item) {
                const sp = item.split("、");
                if (sp[3] == "可兑换") {
                    const sp2 = sp[1].split(" ");
                    const sp3 = sp2[0].split("&lt");
                    const dhm = sp[0].substring(1);
                    sp3[0] = filterText(sp3[0]);  
                    backdata.push({
                        bot_type: "text",
                        text: `${sp3[0]} ${sp[2]}\n  - ${dhm}\n`,
                    });

                }
            });
        })
        .catch((error) => {
            console.error(error);
        });

    return backdata;
};

module.exports = { run };