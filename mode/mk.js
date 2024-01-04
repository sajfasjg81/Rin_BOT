const sys = require('../sysfunction');

const run = async (ms, msg, type, opdata) => {

    let backdata = [];
    backdata.push({
        bot_type: "markdown",
        text: {
            "custom_template_id": "101993071_1658748972",
            "params": [{
                    "key": "title",
                    "values": ["标题"]
                },
                {
                    "key": "image",
                    "values": [
                        "https://resource5-1255303497.cos.ap-guangzhou.myqcloud.com/abcmouse_word_watch/other/mkd_img.png"
                    ]
                },
                {
                    "key": "para1",
                    "values": ["段落1"]
                },
                {
                    "key": "para2",
                    "values": ["段落2"]
                },
                {
                    "key": "desc",
                    "values": ["简介"]
                },
                {
                    "key": "content",
                    "values": ["在这个子频道非常开心"]
                },
                {
                    "key": "link_introduction",
                    "values": ["链接介绍"]
                },
                {
                    "key": "link",
                    "values": ["https://www.qq.com"]
                }
            ]
        },
    });
    return backdata;

};

module.exports = { run };