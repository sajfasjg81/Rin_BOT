const cfg = {

    // true 开启  false 关闭

    //猫燐账号信息
    authkey : "你的猫燐小助手账号authkey",  //登录后获取
    sandbox : false , //返回开发指令 （authkey非管理员级别无效）
    cmdsave: false, // 是否保存猫燐指令到本地，设置为TRUE时只有首次下载指令，后续需要使用指令 【更新指令】
    bot_cmd_url : "https://sv2api.ww2.ren/?t=get/os/bot_command", //API指令地址

    //官方BOT类
    mode : 1 , //1 = 公共模式运行 2 = 群模式运行  （公共就是每个人都要绑定公会） 群就是 同一个群绑定同一个公会
    appid : "请输入官方BOTappid", //官方机器人appid  注册>https://q.qq.com/#/
    ak : "请输入AppSecret",//官方机器人的 AppSecret
    group_mode :  true,//是否开启官方QQ群机器人
    qqchannel_mode :  true,//是否开启官方QQ频道机器人
    qqchannel_at : false,//是否为公域机器人，全域和私域订阅类型不同，私域不用@ 公域必须@
    //官方BOT类

    //http服务
    http_mode : false, //是否开启http服务器  用于api查询服务器状态
    http_port : 32131, //http服务器端口

    //mirai类
    mirai_test : false, // 是否开启测试模式
    mirai_test_user : 10000 , //测试模式的许可QQ号，只影响猫燐指令。
    mirai_wsport : 8080,//mirai ws的端口
    mirai_host : "0.0.0.0", //正向ws服务器地址
    verifyKey : "verifyKey", //修改为mirai的verifyKey
    mirai_mode : 1, //默认模式 1 = 公共模式运行 2 = 群模式运行  （公共就是每个人都要绑定公会） 群模式就是以前那种绑定群的
    mirai_qq : [ 10000, ],//绑定的机器人QQ号  如 10000,10001,10002
    //mirai类

    //gocq类
    gocq_mode : false, //无效  gocq已停更
    gocq_type : false, //无效  gocq已停更
    //gocq类

    //数据库类
    db_mode : false, //是否开启mongodb数据库
    host : "dbname", //数据库用户名 不懂把 db_mode 设置为false
    pw : "pw", //数据库密码 不懂把 db_mode 设置为false
    base : "dbname", //数据库名 不懂把 db_mode 设置为false
    //数据库类

    token : '',//勿改
    user : null,//勿改
    tokenout : 0,//勿改
    wssurl : '', //勿改
    s:null,//勿改
    online : 1,//勿改
    qqgroup_count : 0,//勿改
    channel_count : 0,//勿改
};

module.exports = cfg;