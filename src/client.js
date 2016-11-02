/**
 * Created by haozi on 10/23/2016.
 */

import dgram from 'dgram'
import events from 'events'
import iconv from 'iconv'
import compose from 'koa-compose'
import convert from 'koa-convert'
import isGeneratorFunction from 'is-generator-function'

let Iconv = iconv.Iconv
let cov = new Iconv('UTF-8','GBK')
let recov = new Iconv('GBK','UTF-8')


const HOST = '127.0.0.1';
const PORT = 0;




export default class client extends events.EventEmitter{
    constructor(){
        super()
        this.middlewares = []
    }

    init(serverport,port){
        this.serverPort = serverport
        this.port = port
        this.client = dgram.createSocket('udp4')
        this.server = dgram.createSocket('udp4')
        this.server.bind(port)
        this.listener()
        this.send("ClientHello "+this.port,(err,rinfo)=>{
            "use strict";
            if(err)
                throw err
            console.log('server connect success')
            this.emit('connect',{...rinfo})
            this.heartRate()
        })
        this._callack = this.callback()

    }

    listen(serverport,port){
        this.init(serverport||11235,port||25565)
    }
    listener(){
        this.client.on('message',(data)=>{
            "use strict";
            console.log(new Buffer(data, 'base64').toString())
        })
        this.server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            this.server.close();
        });

        this.server.on('message', (msg, rinfo) => {
            let m =(new Buffer(msg, 'base64').toString()).split(' ')
            this.emit('data',m)
            this.split(m)
        });

        this.server.on('listening', () => {
            var address = this.server.address()
            console.log(`server listening ${address.address}:${address.port}`)
        });
        this.on('send',(data)=>{
            this.send(data)
        })
    }
    heartRate(){
        this.heart = setInterval(()=>{
            this.send("ClientHello "+this.port)
        },300000)
    }

    /**
     *  发送原数据
     * @param data 数据
     * @param callback 回调
     * @returns {Promise}
     */
    send(data,callback){
        let msg = data.toString('base64')
        if(!callback){
            return new Promise((s,j)=>{
                this.client.send(msg,0,msg.length,this.serverPort, HOST,function (err) {
                    if(err)
                        s(err)
                    else
                        s()
                })
            })
        }else
            this.client.send(msg,0,msg.length,this.serverPort, HOST,callback)
    }
    split(data){
        let type = ""
        let msg = {}
        switch (data[0]){
            //私聊消息
            case 'PrivateMessage':
                type = 'PrivateMessage'
                msg.fromQQ = data[1]
                msg.content = recov.convert((new Buffer(data[2],'base64'))).toString()
                break
            //讨论组消息
            case 'DiscussMessage':
                type = 'DiscussMessage'
                msg.discuss = data[1]
                msg.fromQQ = data[2]
                msg.content = recov.convert((new Buffer(data[3],'base64'))).toString()
                break
            //群消息
            case 'GroupMessage':
                type = 'GroupMessage'
                msg.group = data[1]
                msg.fromQQ = data[2]
                msg.content = recov.convert((new Buffer(data[3],'base64'))).toString()
                break
            // Type=101 群事件-管理员变动
            case 'GroupAdmin':
                type = 'GroupAdmin'
                msg.group = data[1]
                msg.fromQQ = data[2]
                if(data[2]==1)
                    msg.admin = true
                else
                    msg.admin = false
                break
            //群事件-群成员减少
            case 'GroupMemberDecrease':
                type = 'GroupMemberDecrease'
                msg.group = data[1]
                msg.fromQQ = data[2]
                msg.beingOperateQQ = data[3]
                break
            // 群事件-群成员增加
            case 'GroupMemberIncrease':
                type = 'GroupMemberIncrease'
                msg.group = data[1]
                msg.fromQQ = data[2]
                msg.beingOperateQQ = data[3]
                break
            // 好友事件-好友已添加
            case '****':
                type = '****'
                msg.group = data[1]
                msg.fromQQ = data[2]
                msg.content = recov.convert((new Buffer(data[3],'base64')).toString())
                break
            // 请求-好友添加
            case '***':
                type = '***'
                msg.group = data[1]
                msg.fromQQ = data[2]
                msg.content = recov.convert((new Buffer(data[3],'base64')).toString())
                break
            default:
                type = data[0]
                msg.content = data.slice(0,data.length)
                break
        }
        msg.type = type
        this.emit(type,msg)
        msg.type = type
        this._callack(msg)
    }

    /**
     * 
     * @returns {Promise}
     */
    waitConnect(){
        return new Promise( (s,j) => {
            this.on('connect',()=>{
                s()
            })
        })
    }

    /**
     * 停止发送心跳
     */
    stopHeartRate(){
        clearInterval(this.heart)
    }

    /**
     *  关闭并销毁
     */
    close(){
        this.stopHeartRate()
        this.client.close()
        this.server.close()
    }
    onerror(err){
        throw err
    }
    use(fn){
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        if(isGeneratorFunction(fn)){
            fn = convert(fn)
        }
        this.middlewares.push(fn)
        return this
    }
    callback(){
        const fn = compose(this.middlewares);
        return (data) =>{
            fn(data).then(()=>{

            }).catch(this.onerror)
        }
    }
}