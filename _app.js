/**
 * Created by haozi on 10/23/2016.
 */


import {Api,Client,cov} from './lib'


// import iconv from 'iconv'
//
// let Iconv = iconv.Iconv
// let cov = new Iconv('UTF-8','GBK')

let client = new Client(25565)

client.on('data', (data)=>{
    "use strict";
    if(data[0]=='PrivateMessage')
    console.log(data[0] + ' -> '+data[1]+' -> '+(new Buffer(data[2],'base64')).toString())
})

client.on('GroupMessage',(data)=>{
    "use strict";
    console.log(`from ${data[1]} -> ${data[2]}`)
})



async function run () {
}

run().then( _ => {  });