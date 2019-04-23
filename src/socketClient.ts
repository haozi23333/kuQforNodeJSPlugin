
import { createSocket, Socket } from 'dgram'
import { EventEmitter } from 'events'



/**
 * socket客户端初始化参数
 */
export interface ISocketClientOptions {
    /**
     * 服务器端口
     */
    serverPort?: number
    /**
     * 客户端端口
     */
    clientPort?: number
    /**
     * 客户端Host
     */
    clientHost?: string
    /**
     * 服务器host
     */
    serverHost?: string,
    /**
     * 是否同步推送
     */
    async?: boolean
}


export class SocketClient extends EventEmitter{
    private server_host: string
    private server_port: number
    private client_host: string
    private client_port: number
    private create_callback: (client: SocketClient) => any = null

    private client_socket: Socket;

    private keep_heart: boolean;

    /**
     * 初始化所有参数
     */
    constructor(options: ISocketClientOptions, createCallBack?: (client: SocketClient) => any) {
        super()
        this.server_host = options.serverHost || '127.0.0.1';
        this.server_port = options.serverPort || 11235;
        this.client_host = options.clientHost || '0.0.0.0';
        this.client_port = options.clientPort || 27789;
        this.create_callback = createCallBack;
        this.createSocket()
    }

    /**
     * 创建 Socket 链接, 如果注册了回调函数, 将实例回调
     */
    private createSocket() {
        this.client_socket = createSocket('udp4');
        this.client_socket.bind(this.client_port, this.client_host);

        if (this.create_callback) {
            this.create_callback(this);
        }

        this.listener()

        this.keep_heart = true;
        this.heartRateService(true);

        console.log('开始💓')
    }

    /**
     * 发送信息
     */
    public async send(raw_data: string) {
        return new Promise((s, j) => {
            this.client_socket.send(raw_data, 0, raw_data.length, this.server_port, this.server_host, (err) => {
                if (err) {
                   return j(err)
                }
                return s();
            })
        })
    }

    /**
     * 心跳字符
     */
    private serverSayHelloStr() {
        return `ClientHello ${this.client_port} ${this.client_host}`;
    }

    /**
     * 心跳服务
     * @param immediately {Boolean} 是否立即执行
     */
    private heartRateService(immediately: boolean = false) {
        if (!this.keep_heart) {
            return;
        }
        setTimeout(() => {
            this.send(this.serverSayHelloStr());
            this.heartRateService();
        }, immediately ? 1 : 300000)
    }

    /**
     * 关闭所有的 Socket
     */
    public close() {
        this.keep_heart = false;
        if (this.client_socket) {
            this.client_socket.close();
        }
    }

    /**
     * 监听数据
     */
    private listener() {
        this.client_socket.on('message', (message: string) => {
            console.log(message)
            this.emit('data', message);
        }) 
        this.client_socket.on('error', (error) => {
            console.log(error)
            this.emit('error', error);
            this.close();
        }) 
    }
}
