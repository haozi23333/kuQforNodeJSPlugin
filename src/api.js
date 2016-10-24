/**
 * Created by haozi on 10/23/2016.
 */

import iconv from 'iconv'

let Iconv = iconv.Iconv
let cov = new Iconv('UTF-8','GBK')

export default class Api {
    constructor(client) {
        this.client  = client
    }

    /**
     *  向好友发消息
     * @param to QQ号
     * @param msg   信息
     * @param callback 回调函数
     * @returns {*}
     * @constructor
     */
    PrivateMessage(to,msg,callback){
        let data = "PrivateMessage "+ to + ' ' + cov.convert(msg).toString('base64')
        if(!callback)
           return this.returnPromise(data)
        else
           this.send(data,callback)
    }

    /**
     * 向群发送信息
     * @param to 群ID
     * @param msg 信息
     * @param callback 回调函数
     * @returns {*}
     * @constructor
     */
    GroupMessage(to,msg,callback)
    {
        let data = "GroupMessage "+ to + ' ' + cov.convert(msg).toString('base64')
        if(!callback)
            return this.returnPromise(data)
        else
            this.send(data,callback)
    } 

    /**
     * 向讨论组发信息
     * @async pro
     * @param to 讨论组ID
     * @param msg 信息
     * @param callback 回调函数
     * @returns {*}
     * @constructor
     */
    DiscussMessage(to,msg,callback)
    {
        let data = "DiscussMessage "+ to + ' ' + cov.convert(msg).toString('base64')
        if(!callback)
            return this.returnPromise(data)
        else
            this.send(data,callback)
    }

    returnPromise(data){
        return new Promise((s,j)=>{
            this.client.send(data,function (err) {
                if(err)
                    s(err)
                else
                    s()
            })
        })
    }
    send(data,callback){
        this.client.send(data,callback)
    }
}