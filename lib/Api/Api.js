/**
 * Created by haozi on 4/10/2017.
 */
import * as Iconv from 'iconv';
const cov = new Iconv('UTF-8', 'GBK');
export class Api {
    /**
     * 初始化Api结构
     * @param client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * 发送数据
     * @param data  需要被发送的数据(已经被编码过的)
     * @private
     */
    async send(data) {
        await this.client.send(data);
    }
    /**
     *  向好友发消息
     * @param   to QQ号
     * @param   msg   信息
     * @returns {*}
     */
    async PrivateMessage(to, msg) {
        const data = "PrivateMessage " + to + ' ' + cov.convert(msg).toString('base64');
        await this.send(data);
    }
    /**
     * 向群发送信息
     * @param   to 群ID
     * @param   msg 信息
     * @returns {*}
     */
    async GroupMessage(to, msg) {
        const data = "GroupMessage " + to + ' ' + cov.convert(msg).toString('base64');
        await this.send(data);
    }
    /**
     * 向讨论组发信息
     * @async   pro
     * @param   to 讨论组ID
     * @param   msg 信息
     * @returns {*}
     */
    async DiscussMessage(to, msg) {
        const data = "DiscussMessage " + to + ' ' + cov.convert(msg).toString('base64');
        await this.send(data);
    }
}
//# sourceMappingURL=Api.js.map