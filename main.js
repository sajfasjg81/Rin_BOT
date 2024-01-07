const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { memoryUsage } = process;
const sys = require('./sysfunction');
const mongoose = require('mongoose');
const os = require('os');
global.dir = __dirname;
global.botrc = {};
global.txbot = require('./txbot');
global.mirai = require('./mirai');
global.hoshino = require('./hoshino');
global.wss = null;
global.gfbot = {};
global.sekey = {};
global.hoshinowss = null;
global.miraiwss = {};
global.cfg = null;
global.cfg2 = null;
global.botlist = [];
global.allseq = [];
global.botcmd = {};
global.msgca = {};
global.diymode_mirai = {};
global.diymode_channel = {};
global.diymode_qgroup = {};



//启动
const start = async () => {

    diymode_mirai = await sys.load_json(`${dir}/json/mode_mirai.json`)
    diymode_channel = await sys.load_json(`${dir}/json/mode_channel.json`)
    diymode_qgroup = await sys.load_json(`${dir}/json/mode_qgroup.json`)

    const ck = await ck_cfg();
    if (ck == true) {
        sys.cmdlog("info", "载入配置文件成功");
        await rundb();
        if (cfg.group_mode == true || cfg.qqchannel_mode == true) {
            //sys.cmdlog("info", "正在启动官方机器人");
            await txbot.v2run(); // 运行官方机器人
        }

        //启动mirai框架
        if (cfg.mirai_mode == true) {
            mirai.connect_wss();
        }

        await sys.get_botcmd(); //获取指令
        
        //open_http();

        //get_maolincmd()//猫燐插件 
    } else {
        sys.cmdlog("info", '程序已终止，请前往cfg目录配置设置。');
        process.exit();
    }
}



//创建配置文件
const ck_cfg = async () => {

    return new Promise((resolve, reject) => {

        fs.exists(path.join(__dirname, 'cfg', 'cfg.js'), (exists) => {
            if (exists) {
                cfg = require('./cfg/cfg.js');
                cfg2 = cfg;
                resolve(true);
            } else {
                newcfg = 1;
                const sourcePath = path.join(__dirname, 'default', 'cfg.js');
                const destinationPath = path.join(__dirname, 'cfg', 'cfg.js');
                fs.copyFile(sourcePath, destinationPath, (err) => {
                    if (err) {
                        console.error('配置文件创建失败', err);
                        reject(false);
                    }
                    console.error('配置文件创建成功');
                    resolve(false);
                });
            }
        });
    });
}

//运行数据库
const rundb = async () => {
    return new Promise((resolve, reject) => {
        if (cfg.mao_mode == true) {
            sys.cmdlog("info", "猫燐官方模式");
            mongoose.connect(`mongodb://${cfg.host}:${cfg.pw}@localhost/${cfg.base}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
                .then(async () => {
                    database = mongoose.connection.db;
                    resolve(true);
                })
                .catch(async (error) => {
                    sys.cmdlog("info", error);
                    process.exit();
                });
        } else {
            sys.cmdlog("info", "自搭模式");
            resolve(true);
        }
    });
}

//启动http服务器
const open_http = () => {
    //启动HTTP
    const server = http.createServer(async (req, res) => {

        if (req.method == 'GET') {

            let url = req.url; // 获取请求的URL
            let queryString = '';

            // 如果URL中包含'?'，那么分割出查询字符串
            if (url.includes('?')) {
                let parts = url.split('?');
                url = parts[0];
                queryString = parts[1];
            }

            // 解析查询字符串，获取参数
            let params = queryString.split('&');
            let get = {};
            for (let i = 0; i < params.length; i++) {
                let pair = params[i].split('=');
                get[pair[0]] = pair[1]; // 使用键-值形式存储参数
            }

            if (get.type == 'info') {

                let back = {
                    code: 1,
                    msg: 'ok',
                    data: {
                        ram: ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2),
                        rammax: (os.totalmem() / 1024 / 1024).toFixed(2),
                        cpu: os.cpus()[0].model,
                        os: os.type(),
                        running: (os.uptime() / 60 / 60 / 24).toFixed(2) + '天',
                        botinfo: await txbot.getme(),
                        online: cfg.online,
                        group_count: cfg.qqgroup_count,
                        channel_count: cfg.channel_count,
                        pro: memoryUsage(),
                        user: cfg.user,
                    },
                }
                const cpuUsage = os.loadavg()[0];
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end(JSON.stringify(back));
                return;
            }

            if (get.type == 'dsada') {

            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');

            const back = {
                code: -1,
                msg: '错误的参数',
            };
            res.end(JSON.stringify(back));


        }

    });

    server.listen(cfg.http_port, () => {
    });
}



//开始运行
start();