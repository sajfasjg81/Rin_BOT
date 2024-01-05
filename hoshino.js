//开发中

const event = require('./event');
const WebSocket = require('ws');
botrc["hoshino"] = 0;

event.on('reconnect_hoshino', async function (data) {

    hoshinowss = new WebSocket(`ws://${cfg.hoshino_host}:${cfg.hoshino_wsport}/ws/`, {
        headers: {
            'X-Self-ID': '10001000',
            'X-Client-Role': 'Universal',
        }
    });
    const bot = "hoshino";
    let offhand = false;
    

    // 监听错误事件
    hoshinowss.onclose = function (eve) {
        if (offhand == false) {
            offhand = true;
            console.log(eve);
            console.log(`[Hoshino] 服务器断开，重连(${botrc[bot]})次。`);
            setTimeout(function () {
                event.emit('reconnect_hoshino', {});
            }, 3000)
            botrc[bot]++;
            hoshinowss.close();
        }
    };

    // 监听错误事件
    hoshinowss.onerror = function (error) {
        console.log(error);
    };
    //连接成功事件
    hoshinowss.on('open', () => {
        console.log('[Hoshino] 服务器连接成功');
    });

    hoshinowss.on('message', async (message) => {
        data = message.toString();
        try {
            data = JSON.parse(data);
            console.log(data);
        } catch (err) {

        }
    });

});

//[hoshino]连接wss服务器
const connect_wss = async () => {
    event.emit('reconnect_hoshino', {});
}

module.exports = { connect_wss };