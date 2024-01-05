# 开发插件、开发指令node

[返回首页](/)

## 简单开发一个指令

在`plugin`目录创建一个文件夹`插件名`然后在文件夹创建`main.js`

### 配置代码

```
const cfg = [
    {
        name: "指令名称",
        class: "ms",
        plugin: "help",
        mstype: "local",
        trigger: ["指令触发名称", "指令触发名称2"],
    },
];
```

### 指令代码

```
const run = async (ms, msg, type, opdata) => {
    backdata = [];

    if (ms.name == "指令名称") {
            backdata.push({
                bot_type: "text",
                text: "发送的消息",
            });
        return backdata;
    }

};

module.exports = { cfg, run };
```

然后重启BOT就可以使用该指令了

## 进阶：使用指令分类、自定义分类

```
官方分类：
wt = 攻略
yule = 娱乐
za = 其他
guild = 坎公公会战
ba = ba类型
pcr = pcr类型

添加分类：
在plugin/help/main.js 添加分类

    {
        name: "娱乐指令",
        class: "ms",
        plugin: "help",
        mstype: "local",
        trigger: ["娱乐", "娱乐指令"],
    },

    if (ms.name == "娱乐指令") {
        ckms = "zlb";
        ckmsarr.class = "yule"; //分类名称
    }
```

## 进阶：消息类型

```
bot_type : 
    text = 文本内容
    imgurl = 图片连接
text : 内容
```
