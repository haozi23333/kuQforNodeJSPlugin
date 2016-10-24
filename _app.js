/**
 * Created by haozi on 10/23/2016.
 */


import {Api,Client} from './lib'


import iconv from 'iconv'

let Iconv = iconv.Iconv
let cov = new Iconv('UTF-8','GBK')

let client = new Client(25565)

client.on('data', (data)=>{
    "use strict";
    if(data[0]=='PrivateMessage')
    console.log(data[0] + ' -> '+data[1]+' -> '+(new Buffer(data[2],'base64')).toString())
})




async function run () {
    console.log('fuck start');
    await client.waitConnect()
    const api = new Api(client)

    api.PrivateMessage("296409654","23333", _ => {})
    api.GroupMessage("55306867","Test", _=>{})

    console.log("OK?")
}

run().then(_ => {  });