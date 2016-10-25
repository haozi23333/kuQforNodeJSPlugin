/**
 * Created by haozi on 10/23/2016.
 */


import {Api,Client,cov} from './lib'




let client = new Client(25565)

client.on('data', (data)=>{
    "use strict";
})

client.on('GroupMessage',(data)=>{
    "use strict";
    console.log(`from ${data[1]} -> ${data[2]}`)
})


let api = null
async function run () {
    "use strict";
    await client.waitConnect()

    api = new Api(client)
    api.setPath('I:\酷Q Air')
    let id = api.movePic('C:\\Users\\haozi\\Desktop\\BZ\\hj.png')
    await api.PrivateMessage('296409654',api.getCode())

}

run().then( _ => {  });