/**
 * Created by haozi on 4/10/2017.
 */

import * as Iconv from 'iconv'
import {SocketClinet} from "../SocketConnect";
let cov = new Iconv.Iconv('UTF-8','GBK')



export  default class Api{
    private client: SocketClinet

    /**
     * 初始化Api结构
     * @param client
     */
    constructor(client: SocketClinet) {
        this.client  = client
    }

    public async send(data): Promise<void> {
        await this.client.send(data)
    }
    /**
     *  向好友发消息
     * @param to QQ号
     * @param msg   信息
     * @returns {*}
     */
    public async PrivateMessage(to,msg): Promise<void> {
        let data = "PrivateMessage "+ to + ' ' + cov.convert(msg).toString('base64')
        await this.send(data)
    }
    /**
     * 向群发送信息
     * @param to 群ID
     * @param msg 信息
     * @returns {*}
     */
    public async GroupMessage(to,msg): Promise<void>{
        let data = "GroupMessage "+ to + ' ' + cov.convert(msg).toString('base64')
        await this.send(data)
    }

    /**
     * 向讨论组发信息
     * @async pro
     * @param to 讨论组ID
     * @param msg 信息
     * @returns {*}
     */
    public async DiscussMessage(to,msg): Promise<void>{
        let data = "DiscussMessage "+ to + ' ' + cov.convert(msg).toString('base64')
        await this.send(data)
    }

}



