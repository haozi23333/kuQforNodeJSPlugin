"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = require("dgram");
const events_1 = require("events");
class SocketClient extends events_1.EventEmitter {
    /**
     * 初始化所有参数
     */
    constructor(options, createCallBack) {
        super();
        this.create_callback = null;
        this.server_host = options.serverHost || '127.0.0.1';
        this.server_port = options.serverPort || 11235;
        this.client_host = options.clientHost || '0.0.0.0';
        this.client_port = options.clientPort || 27789;
        this.create_callback = createCallBack;
        this.createSocket();
    }
    /**
     * 创建 Socket 链接, 如果注册了回调函数, 将实例回调
     */
    createSocket() {
        this.client_socket = dgram_1.createSocket('udp4');
        this.client_socket.bind(this.client_port, this.client_host);
        if (this.create_callback) {
            this.create_callback(this);
        }
        this.listener();
        this.keep_heart = true;
        this.heartRateService(true);
        console.log('开始💓');
    }
    /**
     * 发送信息
     */
    send(raw_data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((s, j) => {
                this.client_socket.send(raw_data, 0, raw_data.length, this.server_port, this.server_host, (err) => {
                    if (err) {
                        return j(err);
                    }
                    return s();
                });
            });
        });
    }
    /**
     * 心跳字符
     */
    serverSayHelloStr() {
        return `ClientHello ${this.client_port} ${this.client_host}`;
    }
    /**
     * 心跳服务
     * @param immediately {Boolean} 是否立即执行
     */
    heartRateService(immediately = false) {
        if (!this.keep_heart) {
            return;
        }
        setTimeout(() => {
            this.send(this.serverSayHelloStr());
            this.heartRateService();
        }, immediately ? 1 : 300000);
    }
    /**
     * 关闭所有的 Socket
     */
    close() {
        this.keep_heart = false;
        if (this.client_socket) {
            this.client_socket.close();
        }
    }
    /**
     * 监听数据
     */
    listener() {
        this.client_socket.on('message', (message) => {
            this.emit('data', message);
        });
        this.client_socket.on('error', (error) => {
            console.log(error);
            this.emit('error', error);
            this.close();
        });
    }
}
exports.SocketClient = SocketClient;
