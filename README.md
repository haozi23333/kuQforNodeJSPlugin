 coolQ for Nodejs SDK
 ___
coolQ 的 基于socketApi 的 Nodejs SDK

:simple_smile: 建议使用ES6/ES7的语法

:star:  中间件！！

新版本去除了全部的组件，只保留了最基础的核心。希望大家利用中间件的特性来写出更多的中间件  
新开

#Intro
_(:зゝ∠)_

#Installation
 1. 请安装 [org.dazzyd.cqsocketapi.cpk](https://github.com/haozi23333/cqsocketapi)(本人fork 修改过的)
 2. 在酷Q中开启插件
 3. 重启酷Q
 4. 安装本模块

    `npm install node-coolq --save`


#hello node-coolq
```javascript
    const cq = require('node-coolq')
    const app = new cq()
    
    //中间件
    app.use(async (ctx, next) => {
        await ctx.app.send('PrivateMessage 296409654 ' + new Buffer("hello world").toString('base64'))
        await next()
    })
    
    app.listen().then(_ => {})
```
#Getting started

#Middleware
和一些webServer框架一样这个库有中间件，但是这个中间件必须使用Promise否则讲无法运行qwq  
例如：
```javascript
// echo app
app.use(async (ctx, next) => {
    // 将收到的信息组合起来再发送回去
    await ctx.app.send(ctx.content.join(' '))
    await next()
})

app.listen({}).then(_ => {})
```

#Community
 - [wiki](https://github.com/haozi23333/kuQforNodeJSPlugin/wiki)  文档
 - [Middlewares](23333) 中间件s


#License
License -> [WTFPL](http://www.wtfpl.net/)

for haozi23333

