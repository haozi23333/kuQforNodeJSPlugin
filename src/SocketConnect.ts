/**
 * Created by haozi on 2/11/2017.
 */

import {createSocket,Socket} from 'dgram'
import {EventEmitter} from 'events'
import ErrnoException = NodeJS.ErrnoException
import Timer = NodeJS.Timer
import {ExceptionInfo} from "_debugger";


const Iconv = require('iconv')
let cov = new Iconv.Iconv('UTF-8','GBK')
let recov = new Iconv.Iconv('GBK','UTF-8')


/**
 * socket客户端初始化参数
 */
interface SocketConnectInitParm{
    /**
     * 服务器端口
     */
    serverPort?:number
    /**
     * 客户端端口
     */
    clientPort?:number
    /**
     * 服务器host
     */
    serverHost?:string
}

interface CoolqMessage{
    /**
     * 消息唯一ID
     */
    messageId:string,
    /**
     * 时间戳
     */
    timeStamp:number,
    /**
     * 内容
     */
    conent:string,
}

/**
 *  socket连接类
 */
export class SocketClinet extends EventEmitter{
    private middleWares:Function[]
    private serverSocket:Socket
    private clientSocket:Socket
    private serverPort:number
    private clientPort:number
    private Host:string
    private heart:Timer
    private

    /**
     *
     * @param serverPort
     * @param clientPort
     * @param serverHost
     * @constructor
     */
    constructor () {
        super()
        this.middleWares = []
    }

    /**
     *
     * @param serverPort? 服务器端口
     * @param clientPort? 客户端监听端口
     * @param serverHost? 服务器Host
     * @returns {Promise<void>}
     */
    public async init (parm:SocketConnectInitParm = {}):Promise<void> {
        this.serverSocket = createSocket('udp4')
        this.clientSocket = createSocket('udp4')
        this.serverSocket.bind(parm.serverPort)
        this.Host = parm.serverHost
        this.clientPort = parm.clientPort || 25565
        this.serverPort = parm.serverPort || 11235
        console.log(this.listener)
        this.listener()
        let rinfo = await this.send(this.serverHello())
        this.emit('connect', rinfo)
    }

    private listener ():void {
        /**
         *S
         */
        this.clientSocket.on('message', (mag:string) => {
            console.log(new Buffer(mag, 'base64').toString())
        })
        /**
         *
         */
        this.serverSocket.on('error', (err:Error) => {
            console.log(`server error:\n${err.stack}`);
            this.serverSocket.close();
        });
        /**
         *
         */
        this.serverSocket.on('message', (msg:string, rinfo) => {
            let m =(new Buffer(msg, 'base64').toString()).split(' ')
            this.emit('data',m)
        });
        /**
         *
         */
        this.serverSocket.on('listening', () => {
            var address = this.serverSocket.address()
            console.log(`server listening ${address.address}:${address.port}`)
        });
        /**
         *
         */
        this.on('send',(data:string)=>{
            this.send(data)
        })
    }

    /**
     * 向服务器发送socket数据
     * @param data 数据
     * @returns {IThenable<T>|Promise}
     */
    public send (data):Promise<void> {
        let msg = data.toString('base64')
        return new Promise<void>((s:Function, j:Function) => {
            this.clientSocket.send(msg,0,msg.length,this.serverPort, this.Host,function (err) {
                if(err)
                    j(err)
                else
                    s()
            })
        })
    }

    /**
     * 构造clienthello信息
     * @returns {string}
     */
    private serverHello ():string {
        return `ClientHello ${this.clientPort}`
    }

    /**
     * 发送心跳包
     * 30秒一次
     */
    private heartRateService ():void {
        this.heart = setInterval(() => {
            this.send(this.serverHello())
        },300000)
    }

    public use (fn:Function):SocketClinet {
        this.middleWares.push(fn)
        return this
    }

    /**
     * 将所有中间件组合起来
     * @param middleware 中间件的数组
     * @returns {(ctx:Context, next?:Promise)=>any}
     * @api private
     */
    private compose (middleware:Function[]):Function | Promise<void>{
        return (ctx:CoolqMessage,next?:Promise<void>) => {
            //定义索引表示执行到了第几个
            let index = 0
            //定义处理函数
            let dispatch:Function|Promise<void> = (i:number) => {
                //更新索引
                index = i
                //判断中间件是否存在 否则执行挂起的中间件
                const cb:Function | Promise<void> = middleware[i] || next
                // 如果都不存在 就返回一个resolved形态的Promise
                if(!cb){
                    return Promise.resolve()
                }
                //捕获执行过程中的异常 并以rejected形态的Promise对象抛出
                try{
                    //Promise.resolve的方法传入一个thenable的对象(可以then的) 返回的promise会跟随这个thenable对象直到返回resolve状态
                    //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve  mdn参考
                    // 当中间件await 的时候 递归执行 dispatch 函数调用下一个中间件
                    return Promise.resolve(cb(ctx, ():Function|Promise<void> =>{
                        return dispatch(i + 1)
                    }))
                }catch (err){
                    return Promise.reject(err)
                }
            }
            //执行第一个中间件
            return dispatch(0)
        }
    }

    /**
     * 开始监听
     * 这个函数必须在use完成后调用
     * @param serverPort
     * @param clientPort
     * @param serverHost
     */
    listen (param?:SocketConnectInitParm) {
        this.init(param)
    }
}