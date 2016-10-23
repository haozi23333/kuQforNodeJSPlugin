/**
 * Created by haozi on 10/23/2016.
 */


import Client from './lib/client'

var Iconv  = require('iconv').Iconv

let cov = new Iconv('UTF-8','GBK')

let client = new Client(25565)

client.on('data',(data)=>{
    "use strict";
    console.log(data)
})


setTimeout(()=>{
    "use strict";
    client.emit('send','SendPrivateMessage 296409654 '+cov.convert("SB 0u0 辣鸡").toString('base64'),(err)=>{
        if(err)
            throw err
        else
            console.log('success')
    })
},2000)