# coolQ for Nodejs SDK
coolQ 的 基于socketApi 的 Nodejs SDK

:simple_smile: 建议使用ES6/ES7的语法

:star:  中间件！！
:star:  路由！！

##Intro
_(:зゝ∠)_

##Installation
 1. 请安装 [org.dazzyd.cqsocketapi.cpk](https://github.com/haozi23333/cqsocketapi)(本人fork 修改过的)
 2. 在酷Q中开启插件
 3. 重启酷Q
 4. 安装本模块

    `npm install node-coolq --save`

`node >= 0.12`

`npm >=2.0`
## ClientApi


```javascript
    import {Api,Client,Route} from './lib'


    // 实例化 客户端
    let app = new Client()

    app.on('data', (data)=>{
        "use strict";
        //接收没有被处理过的数据
        //      type           data1        data2       data3       data...
        //[ 'GroupMessage', '304876598', '296409654', 'zbe3orXE' ]

    })

       /**
       * 接收信息
       * @param eventName  事件名称
       * @param callback   回调
       */
    app.on(eventName,callback)
    app.on('GroupMessage',(data)=>{
        "use strict";
         data => {
            type:"eventName",
            fromQQ:"fromQQ",
            discuss|group:"id",
            content:"content"
         }
    })

   /**
     *  发送原数据
     * @param data 数据
     * @param callback 回调
     * @returns {Promise}
     */
    app.send(data,callback)
    //async
    await app.send(data)

    /**
    * 同步等待服务器连接成功
    * @returns {Promise}
    */
     await app.waitConnect()
     
    /**
     * 必须在use之后调用
     * @param serverPort coolqSocket插件的端口 默认11235
     * @param localPort 本地socket的端口 默认25565
     */
     
     app.listen(serverPort,localPort)
```

## middleware Api
```javascript
    
     /**
      * 中间件
      * @param fn {Promise}
      * @returns {client}
      */
     app.use(fn)
     
     app.use(async (ctx,next)=>{
            console.log(1)
            await next()
            console.log(3)
     })
     app.use(async (ctx,next)=>{
            console.log(2)
            await next()
    })
    log >1
         2
         3
     
```
[参考](https://github.com/guo-yu/koa-guide#级联代码cascading) 和Koa的一样 但是我们使用ES6语法

## Route Api
```javascript
        
    /**
    *  构造路由
    * @param opts
    * @param opts.commas 命令分隔符 默认空格
    * @param opts.prefix 命令前缀  默认空
    */
     
     let route = new Route(opt)   
     
     
```

```javascript
    import {Api,Client,Route} from 'node-coolq'
    
    const app = new Client()
    
    const router = new Route();
    
    router.reg('/:cmd',async ()=>{
        "use strict";
    
    })
    
    app.use(router.routes())
    
    app.listen(serverPort,localPort)
```

**命令分割**
```javascript
    
    const router = new Route({
        commas : "#"
    });
    
```
设置命令分隔符
如果是`#`那么 你#好#啊 -> [你,好,啊]
如果是`&&`那么 你&&好&&啊 -> [你,好,啊]
默认是空格


**路由前缀**
```javascript
    
    const router = new Route({
        prefix : "#"
    });
    
    router.reg('/',...) // 接受 #命令
    router.reg('/:cmd',...)//接受 #:id
```

**基础路由**
```javascript
     /**
       * 创建路由
       * @param path 路由参数
       * @param fn   回调函数 async
       * @param opts  设置
       */
    router.reg(path,fn,opts)
    
    router.reg('/:cmd',async (data)=>{
        "use strict";
        console.log(body.cmd)
    })
```



**例子** 
简单使用:
     
```javascript
    import {Api,Client,Route} from 'node-coolq'
    
    const app = new Client()
    
    const router = new Route({
        prefix : 'haozi'
    });
    
    
    router.reg('/login/:account/:password',async (body)=>{
        "use strict";
        console.log(body)
        
    })
    
    app.use(router.routes())
    
    app.listen(serverPort,localPort)
    
    //例子
    QQ -> app () -> "haozi user1 password1"
    
    console.log()↓
    {
        type:'MessageType',
        content:'haozi user1 password1',
        fromQQ:'QQ',
        account = 'user1',
        password:'password1'
    }
```
     
    

##SdkApi

```javascript

   const api = new Api(client)

   /**
     * 向好友发消息
     * @param to QQ号
     * @param msg   信息
     * @param callback 回调函数
     * @returns {*}
     */
    api.PrivateMessage(to,msg,callback)
    or
    await api.PrivateMessage(to,msg)

    /**
     * 向群发送信息
     * @param to 群ID
     * @param msg 信息
     * @param callback 回调函数
     * @returns {*}
     */
    api.GroupMessage(to,msg,callback)
    or
    await api.GroupMessage(to,msg)

    /**
      * 向讨论组发信息
      * @param to 讨论组ID
      * @param msg 信息
      * @param callback 回调函数
      * @returns {*}
      */
    api.DiscussMessage(to,msg,callback)
    or
    await api.DiscussMessage(to,msg)


```

##ES5
```javascript
    var sdk = require('node-coolQ')


    var Api = sdk.Api
    var Client = sdk.Client



    var app = new Client(25565)


    var api = new Api(app)

    app.on('connect',()=>{
    	console.log("OK")
    	api.PrivateMessage("296409654","haozi233333")
    })

```
##code API
```javascript

    
    /**
     *  返回code类的实例
     * @returns {code}
     */
    api.getCode()

class code{
    /**
     *  构造 qq表情信息
     * @param id
     * @returns {string}
     */
    static getQQFace(id)

    /**
     *  构造 emoji 表情信息
     * @param id emojiID
     * @returns {string}
     */
    static getQQEmoji(id)

    /**
     * 构造图片信息
     * @param id 图片在文件夹的id
     * @returns {string}
     */
    static getImage(id)

    /**
     *  构造@信息
     * @param qq
     * @returns {string}
     */
    static getAt(qq)

    /**
     *  抖动窗口  仅限好友
     * @returns {string}
     */
    static getShake()

    /**
     * 发送匿名消息
     * @param ignore false或ignore参数被忽略时，代表强制使用匿名，如果匿名失败将取消该消息的发送。 为true时，代表不强制使用匿名，如果匿名失败将转为普通消息发送。
     * @returns {string}
     */
    static getAnonymous(ignore)

    /**
     *  发送音乐信息
     * @param id
     * @returns {string}
     */
    static getMusic(id)
}

```

##event list

1. data                     SDK接收的全部的数据
2. connect                  连接成功触发这个事件
3. PrivateMessage           好友聊天信息事件
4. DiscussMessage           讨论组聊天信息事件
5. GroupMessage             群聊天信息事件
6. GroupAdmin               群事件-管理员变动事件
7. GroupMemberDecrease      群事件-群成员减少事件
8. GroupMemberIncrease      群事件-群成员增加事件

##License
License -> [WTFPL](http://www.wtfpl.net/)

for haozi23333