/**
 * Created by haozi on 10/23/2016.
 */

import iconv from 'iconv'
import uuid from 'node-uuid'
import fs from 'fs'
let Iconv = iconv.Iconv
let cov = new Iconv('UTF-8','GBK')

export default class Api {
    /**
     *
     * @param client
     */
    constructor(client) {
        this.client  = client
    }

    /**
     *  设置coolQ的根目录
     * @param path
     */
    setPath(path){
        this.path = path
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

    /**
     * 移动 一张图片到 缓存
     * @param from 图片源
     * @returns {string}  缓存文件中的ID
     */
    movePic(from){
        if(!this.path){
            console.log('没有设置基本文件夹')
            return
        }
        let id = uuid.v4()
        try {
            fs.accessSync(from,fs.R_OK)
            let type = from.split('.')[ from.split('.').length - 1 ]
            fs.writeFileSync( this.path+'\\data\\image\\'+ id + type,fs.readFileSync(from,'binary'),'binary');
            return id + '.' + type
        }catch (e){
            console.log(e.message)
        }
    }

    /**
     * 
     * @returns {code}
     */
    getCode(){
        return code
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

    /**
     * 
     * @param data
     * @param callback
     */
    send(data,callback){
        this.client.send(data,callback)
    }
}

class code{
    /**
     *  构造 qq表情信息
     * @param id
     * @returns {string}
     */
    static getQQFace(id){
        return '[CQ:face,id=' + id +']'
    }

    /**
     *  构造 emoji 表情信息
     * @param id emojiID
     * @returns {string}
     */
    static getQQEmoji(id){
        return '[CQ:emoji,id=' + id +']'
    }

    /**
     * 构造图片信息
     * @param id 图片在文件夹的id
     * @returns {string}
     */
    static getImage(id){
        return '[CQ:image,file='+ id +']'
    }

    /**
     *  构造@信息
     * @param qq
     * @returns {string}
     */
    static getAt(qq){
        return '[CQ:at,qq='+ qq +']'
    }

    /**
     *  抖动窗口  仅限好友
     * @returns {string}
     */
    static getShake(){
        return '[CQ:shake]'
    }

    /**
     * 发送匿名消息
     * @param ignore false或ignore参数被忽略时，代表强制使用匿名，如果匿名失败将取消该消息的发送。 为true时，代表不强制使用匿名，如果匿名失败将转为普通消息发送。
     * @returns {string}
     */
    static getAnonymous(ignore){
        return '[CQ:anonymous'+ ignore?',ignore=true':'' +']'
    }

    /**
     *  发送音乐信息
     * @param id
     * @returns {string}
     */
    static getMusic(id){
        return '[CQ:music,id='+ id +']'
    }
}