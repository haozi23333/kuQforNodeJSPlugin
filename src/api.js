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
    PrivateMessage(to,msg,callback){
        let data = "PrivateMessage "+ to + ' ' + cov.convert(msg).toString('base64')
        if(!callback)
           return this.returnPromise(data)
        else
           this.send(data,callback)
    }
    GroupMessage(to,msg,callback)
    {
        let data = "GroupMessage "+ to + ' ' + cov.convert(msg).toString('base64')
        if(!callback)
            return this.returnPromise(data)
        else
            this.send(data,callback)
    }
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