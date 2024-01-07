const cfg = {
    token : '',//勿改
    tokenout : 0,//勿改
    user : null,//勿改
    wssurl : '', //勿改

    //猫燐信息
    authkey : "你的猫燐小助手账号authkey",  //无效配置暂不生效
    sandbox : true , //无效配置暂不生效 返回开发指令 （authkey非管理员级别无效）
    cmdsave: false, // 无效配置暂不生效 是否保存猫燐指令到本地，设置为TRUE时只有首次下载指令，后续需要使用指令 【更新指令】
    bot_cmd_url : "https://sv2api.ww2.ren/?t=get/os/bot_command", //API指令地址


    //反代
    pixiv:"",//pixiv反代 影响图图指令
    //禁用指令
    gfban : [], //官方BOT禁用
    ban: [],  //Mirai 等第三方BOT禁用

    //ba插件配置
    baapitoken: "ba-token ??:??", //通过什亭之匣获取
    baapih : 6, //总力战每X小时刷新一次数据

    //Hoshino配置
    //功能没写完 别true
    //hoshinobot : false, //是否启动hoshino功能（需要自行搭建hoshinoBOT程序）
    //hoshino_host : "", //hoshino服务器地址
    //hoshino_wsport : "", //hoshino服务器地址

    //http服务
    //弃用
    //http_mode : true, //是否开启http服务器  用于api查询服务器状态
    //http_port : 0, //http服务器端口


    //猫燐攻略地址
    cdnurl : "https://t.ww2.ren/neko_code/gl/",  //腾讯官方群
    cdnurl_end : "/jpg",
    cdnurl2 : "https://t2.ww2.ren/neko_code/gl/",  //腾讯官方频道
    cdnurl2_end : "/jpg",
    cdnurl3 : "https://t2.ww2.ren/neko_code/gl/",  //第三方BOT
    cdnurl3_end : "/jpg",

    //官方BOT类
    mode : 1 , //1 = 公共模式运行 2 = 群模式运行  （公共就是每个人都要绑定公会） 群就是 同一个群绑定同一个公会
    gmode : 1, // 默认运行模式  1=公共模式 2=绑定模式
    
    botlist : [
        {

        },
    ],
    group_mode :  true,//是否开启官方QQ群机器人功能
    qqchannel_mode :  true,//是否开启官方QQ频道机器人功能
    //官方BOT类

    //mirai类
    mirai_mode : 1, // 是否启用Mirai BOT
    mirai_wsport : 8080,//启动的mirai ws正方服务器端口，必须与mirai程序的cqhttp插件一样。
    mirai_host : "localhost", //正向ws服务器地址，必须与mirai程序的cqhttp插件一样。
    verifyKey : "",
    mirai_qq : [ ],//绑定的机器人QQ号  如 10000,10001,10002

    //其他
    mao_mode : false, //是否在猫燐服务器运行，自搭BOT请设置为false，否则无法使用。
    host : "", //仅猫燐服务器运行有效
    pw : "",//仅猫燐服务器运行有效
    base : "", //仅猫燐服务器运行有效
    online : 1, //勿改
    qqgroup_count : 0, //勿改
    channel_count : 0, //勿改
};

module.exports = cfg;