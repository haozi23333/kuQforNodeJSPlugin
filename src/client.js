/**
 * Created by haozi on 10/23/2016.
 */

import dgram from 'dgram'
import events from 'events'
var Iconv  = require('iconv').Iconv
let cov = new Iconv('UTF-8','GBK')
const HOST = '127.0.0.1';
const PORT = 11235;




export default class client extends events.EventEmitter{
    constructor(port){
        super()
        this.port = port
        this.client = dgram.createSocket('udp4')
        this.server = dgram.createSocket('udp4');
        this.server.bind(port)

        this.listen()
        this.init()
    }

    init(){
        this.send(cov.convert("ClientHello "+this.port),(err)=>{
            "use strict";
            if(err)
                throw err
            console.log('server connect success')
            this.heartRate()
        })
    }
    listen(){
        this.client.on('message',(data)=>{
            "use strict";
            console.log(new Buffer(data, 'base64').toString())
        })
        this.server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            this.server.close();
        });

        this.server.on('message', (msg, rinfo) => {
            let m =(new Buffer(msg, 'base64').toString()).split(' ')
            // if(m[0] == 'PrivateMessage')
            //     console.log('from '+m[1] +' -> '+ new Buffer(m[2],'base64').toString())
            this.emit('data',m)
        });

        this.server.on('listening', () => {
            var address = this.server.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
        this.on('send',(data)=>{
            this.send(data)
        })
    }
    heartRate(){
        this.heart = setInterval(()=>{
            this.send("ClientHello "+this.port)
        },300000)
    }
    send(data,callback){
        console.log(data)
        callback = callback || new Function()
        let msg = data.toString('base64')
        this.client.send(msg,0,msg.length,PORT, HOST,callback)
    }
    stopHeartRate(){
        clearInterval(this.heart)
    }
    close(){
        this.stopHeartRate()
        this.client.close()
        this.server.close()
    }

}