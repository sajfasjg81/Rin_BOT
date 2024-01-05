const axios = require('axios');

const run = async (ms, msg, type, opdata) => {
    return new Promise(async (resolve, reject) => {
        try {
            let backdata = [];
            let re = 0;
            const run2 = async (ms, msg, type, opdata) => {
                re++;
                await axios.get("https://arona.diyigemt.com/api/v2/image?name=国服未来视")
                    .then(response => {
                        let bdata = response?.data?.data?.[0]?.content;
                        if (bdata != null) {
                            backdata.push({
                                bot_type: "imgurl",
                                text: `https://arona.cdn.diyigemt.com/image/s${bdata}`,
                            });
                            resolve(backdata);
                        } else {
                            console.error("数据获取失败");
                            reject("no");
                        }
                    })
                    .catch(error => {
                        if (re >= 3) {
                            console.error(error);
                            reject("no");
                        } else {
                            run2();
                        }
                    });
            };
            run2();
        } catch (err) {
            console.log(err);
            reject("no");
        }
    });
};

module.exports = { run };