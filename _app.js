/**
 * Created by haozi on 10/23/2016.
 */


import {Api,Client,cov,Route} from './lib'




let client = new Client()
let api = new Api(client)


// client.on('PrivateMessage',(data)=>{
//     "use strict";
//     if(data.fromQQ == '820950794')
//     {
//         api.PrivateMessage('820950794','[CQ:image,file=81D06774959C4CDDE75F588DC32D50C0.jpg]',_=>{})
//     }
// })


client.use(async (data,next)=>{
    "use strict";
    await next()
}).use(async (data,next)=>{
    "use strict";
    await next()
})


let r = new Route({
    prefix : 'haozi'
})


r.reg('/:cmd',async (data)=>{
    "use strict";
})
client.use(r.routes())


let f = new Route({
    prefix : 'cao'
})

f.reg('/hello/:cmd', (data)=>{
    "use strict";
    console.log(data)
})



client.use(f.routes())


client.listen(11235,25565)