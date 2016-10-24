# coolQ for Nodejs SDK
coolQ Socket Api for Nodejs

##Intro
_(:зゝ∠)_

##Installation
 1. Place [org.dazzyd.cqsocketapi.cpk](https://github.com/yukixz/cqsocketapi/releases) into CoolQ app folder.
 2. Enable CQSocketAPI in CoolQ App management windoes.
 3. Restart CoolQ.
 4. Install using npm

    `npm install node-coolQ --save`

`node >= 0.12`

`npm >=2.0`
## ClientApi


```javascript
    import {Api,Client,cov} from './lib'



    // 参数是端口号 不能是 11235  QAQ
    // 是node这边启动服务器bind的端口
    let client = new Client(25565)

    client.on('data', (data)=>{
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
       client.on(eventName,callback)
    client.on('GroupMessage',(data)=>{
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
    client.send(data,callback)
    //async
    await client.send(data)

    /**
    * 同步等待服务器连接成功
    * @returns {Promise}
    */
     await client.waitConnect()
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
##covApi
```javascript
    var cov = sdk.cov
      /**
       * 由UTF-8 字符集 转到 GBK 字符集
       * @param data 需要转换的文字
       * @returns {Buffer}
       */
    cov.convert(data)
```

##ES5
```javascript
    var sdk = require('node-coolQ')


    var Api = sdk.Api
    var Client = sdk.Client



    var client = new Client(25565)


    var api = new Api(client)

    client.on('connect',()=>{
    	console.log("OK")
    	api.PrivateMessage("296409654","haozi233333")
    })

```
##event list

1. data                     SDK接收的全部的数据
2. connect                  连接成功触发这个事件
3. PrivateMessage           好友聊天信息事件
4. DiscussMessage           讨论组聊天信息事件
5. GroupMessage             讨论组聊天信息事件

##License
License -> [WTFPL](http://www.wtfpl.net/)

for haozi23333