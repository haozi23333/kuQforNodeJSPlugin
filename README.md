# coolQ for Nodejs SDK
 ___
coolQ 的 基于socketApi 的 Nodejs SDK

:simple_smile: 建议使用ES6/ES7的语法

:star:  中间件！！

新版本去除了全部的组件，只保留了最基础的核心。希望大家利用中间件的特性来写出更多的中间件  

# Intro
_(:зゝ∠)_
<!-- 详见[wiki](https://github.com/haozi23333/kuQforNodeJSPlugin/wiki)~~废了~~   -->
QQ 讨论组 **304876598**
# Installation
 * 请安装 [org.dazzyd.cqsocketapi.cpk](https://github.com/yukixz/cqsocketapi)(原版的)
 * 在酷Q中开启插件
 * 重启酷Q
 * 安装本模块

    `npm install node-coolq --save`


# hello node-coolq
```javascript
    const cq = require('node-coolq')
    const app = new cq()

    //中间件
    app.use(async (ctx, next) => {
        // 发送私聊消息 hello world　给QQ为296409654的好友
        const {encode} = ctx
        await ctx.app.send('PrivateMessage 296409654 ' + encode('hello world'))
        await next()
    })

    app.listen()
```
# Getting started


# Middleware
和一些 像 `Koa` 框架一样的中间件，但是这个中间件必须使用Promise否则讲无法运行qwq  
例如：
```javascript
// echo app
app.use(async (ctx, next) => {
    // 将收到的信息组合起来再发送回去
    await ctx.app.send(ctx.content.join(' '))
    await next()
})

app.listen()
```
# ctx

| 参数名 | 参数类型 |  备注  |
| ------------- |  ------- | ------ |
| messageId  | string  |  消息唯一id  |
| timeStamp  | number  |  时间戳  |
| content  | string[]  | 内容数组  |
| app  | string[]  |  app 实例  |
| encode  | (string) => string |  编码函数  |
| decode  | (string) => string  |  解码函数 |


# update
[3.1.1]:  
增加`encode` 和 `decode` 两个函数  
encode => 接受一个字符串返回经过 base64 和 gbk 编码之后的字符串  
encode => 接受一个字符串返回经过 base64 和 gbk 解码之后的字符串   
调用方式
```ts
app.use(async (ctx, next) => {
    // 发送私聊消息 hello world　给QQ为296409654的好友
    const {encode} = ctx
    await ctx.app.send('PrivateMessage 296409654 ' + encode('hello world'))
    await next()
})

```

<!-- # Community
 - [wiki](https://github.com/haozi23333/kuQforNodeJSPlugin/wiki)  文档
 - [Middlewares](23333) 中间件s -->


# License
License -> [WTFPL](http://www.wtfpl.net/)

for haozi23333
