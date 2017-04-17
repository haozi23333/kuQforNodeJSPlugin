/**
 * Created by haozi on 2/11/2017.
 */
import { createSocket } from 'dgram';
import { EventEmitter } from 'events';
import { unescape } from "querystring";
/**
 *  socket连接类
 */
export class SocketClinet extends EventEmitter {
    /**
     *
     * @param serverPort
     * @param clientPort
     * @param serverHost
     * @constructor
     */
    constructor() {
        super();
        this.middleWares = [];
    }
    /**
     * 开始监听
     * 这个函数必须在use完成后调用
     * @param serverPort
     * @param clientPort
     * @param serverHost
     */
    listen(param) {
        this.init(param).then();
    }
    /**
     *
     * @param serverPort? 服务器端口
     * @param clientPort? 客户端监听端口
     * @param serverHost? 服务器Host
     * @returns {Promise<void>}
     */
    async init(parm = {}) {
        this.serverSocket = createSocket('udp4');
        this.clientSocket = createSocket('udp4');
        this.clientPort = parm.clientPort || 27788;
        this.serverPort = parm.serverPort || 11235;
        this.serverSocket.bind(this.clientPort);
        this.Host = parm.serverHost || '127.0.0.1';
        this.listener();
        const rinfo = await this.send(this.serverHello());
        this.emit('connect', rinfo);
        this.heartRateService();
    }
    use(fn) {
        if (typeof fn === "function") {
            this.middleWares.push(fn);
        }
        else {
            throw new Error("fn must be  a Function");
        }
        return this;
    }
    /**
     * 向服务器发送socket数据
     * @param data 数据
     * @returns {Promise<void>|Promise|IThenable<void>}
     * @public
     */
    send(data) {
        // console.log(data)
        return new Promise((s, j) => {
            this.clientSocket.send(data, 0, data.length, this.serverPort, this.Host, (err) => {
                if (err) {
                    j(err);
                }
                else {
                    s();
                }
            });
        });
    }
    listener() {
        /**
         *
         */
        this.clientSocket.on('message', (mag) => {
            console.log(new Buffer(mag, 'base64').toString());
        });
        /**
         *
         */
        this.serverSocket.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            this.serverSocket.close();
        });
        /**
         *
         */
        this.serverSocket.on('message', (msg, rinfo) => {
            const m = (new Buffer(msg, 'base64').toString()).split(' ');
            console.log(m);
            if (m[0] === "group") {
                console.log(unescape(m[1].replace(/\\u/g, '%u')));
            }
            this.emit('data', m);
        });
        /**
         *
         */
        this.serverSocket.on('listening', () => {
            const address = this.serverSocket.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
        /**
         *
         */
        this.on('send', (data) => {
            this.send(data);
        });
    }
    /**
     * 向服务器发送socket数据
     * @param data 数据
     * @returns {Promise<void>|Promise|IThenable<void>}
     * @public
     */
    send(data) {
        console.log(data);
        const msg = data.toString('base64');
        return new Promise((s, j) => {
            this.clientSocket.send(msg, 0, msg.length, this.serverPort, this.Host, (err) => {
                if (err) {
                    j(err);
                }
                else {
                    s();
                }
            });
        });
    }
    /**
     * 构造clienthello信息
     * @returns {string}
     * @private
     */
    serverHello() {
        return `ClientHello ${this.clientPort}`;
    }
    /**
     * 发送心跳包
     * 30秒一次
     */
    heartRateService() {
        this.heart = setInterval(() => {
            this.send(this.serverHello());
        }, 300000);
    }
    /**
     * 将所有中间件组合起来
     * @param middleware 中间件的数组
     * @returns {(ctx:Context, next?:Promise)=>any}
     * @api private
     */
    compose(middleware) {
        return (ctx, next) => {
            // 定义索引表示执行到了第几个
            let index = 0;
            // 定义处理函数
            const dispatch = (i) => {
                // 更新索引
                index = i;
                // 判断中间件是否存在 否则执行挂起的中间件
                const cb = middleware[i] || next;
                // 如果都不存在 就返回一个resolved形态的Promise
                if (!cb) {
                    return Promise.resolve();
                }
                // 捕获执行过程中的异常 并以rejected形态的Promise对象抛出
                try {
                    // Promise.resolve的方法传入一个thenable的对象(可以then的) 返回的promise会跟随这个thenable对象直到返回resolve状态
                    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
                    // 当中间件await 的时候 递归执行 dispatch 函数调用下一个中间件
                    return Promise.resolve(cb(ctx, () => {
                        return dispatch(i + 1);
                    }));
                }
                catch (err) {
                    return Promise.reject(err);
                }
            };
            // 执行第一个中间件
            return dispatch(0);
        };
    }
    callback(ctx) {
        const fn = this.compose(this.middleWares);
        return (ctx) => {
            fn(ctx).then(() => false).catch();
        };
    }
    use(fn) {
        this.middleWares.push(fn);
        return this;
    }
    /**
     *  收到信息的时候的回调 用来调用中间件
     * @param ctx
     * @returns {(ctx:IMessageContext)=>undefined}
     * @private
     */
    callback(ctx) {
        const fn = this.compose(this.middleWares);
        return (context) => {
            fn(context).then(() => false).catch();
        };
    }
    listen(param) {
        this.init(param).then((_) => 1);
    }
}
//# sourceMappingURL=SocketConnect.js.map