const sys = require('../sysfunction');

const run = async (ms, msg, type, opdata) => {

    if (type == "mirai") {
        const backid = `mirai_plugin_info_${opdata?.authorid}_${opdata?.timestamp}`;
        const backmsg = {
            syncId: backid,
            command: "about",
            content: {}
        };

        let jsq = async (message) => {
            let data = message.toString();
            try {
                data = JSON.parse(data);
                if (backid == data?.syncId) {
                    if (data?.data?.code === 0) {
                        let backdata = [];
                        backdata.push({
                            bot_type: "text",
                            text: `Mirai-http插件版本：${data?.data?.data?.version}`,
                        });
                        opdata.ws.off('message', jsq);
                        resolve(backdata);
                    }
                    opdata.ws.off('message', jsq);
                    resolve('no');
                }

            } catch (e) {
                //忽略
            }
        };
        opdata.ws.on('message', jsq);
        opdata.ws.send(JSON.stringify(backmsg));
    } else {
        let backdata = [];
        backdata.push({
            bot_type: "text",
            text: `你使用的是官方机器人，非MiraiBOT不支持查询Mirai类指令。`,
        });
        return backdata;
    }

};

module.exports = { run };