
import { localStorage } from '../util'
import config from "../config";

/**
 * 一个很简单的黑名单,
 *  //TODO 本来打算做过期时间啥的, 懒得做了, 直接一个Key保存字符串, **将来** 会改成HASHTABLE
 */
export class  BlackList{

    private key =  `${config.redis.prefix}bot:blacklist`;
    constructor() {

    }

    /**
     * 获取全部的数据
     */
    public async getList(): Promise<number[]> {
        return localStorage.redis().hgetall(this.key)
    }

    /**
     * 添加黑名单
     * @param qq
     */
    public async addBlack(qq: number) {
        if (await this.has(qq)) {
            return false;
        }
        return localStorage.redis().hset(this.key, qq + '', Date.now());
    }

    /**
     * 移除黑名单
     * @param qq
     */
    public async removeBlack(qq: number) {
        if (await this.has(qq)) {
            return false;
        }
        return localStorage.redis().hdel(this.key, qq + '');
    }

    /**
     * 是否是黑名单成员
     * @param qq
     */
    public async has(qq: number) {
        return localStorage.redis().hexists(this.key, qq + '');
    }
}

export default new BlackList();