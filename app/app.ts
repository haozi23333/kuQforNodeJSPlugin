import { Application } from '../src/application'
import { Route } from '../src/route/router'
import { CQ_MESSAGE_EVENT } from '../src/messages/events'
import {GroupMessage} from '../src/cqApi'

const app = new Application({
    serverHost: '192.168.50.121',
    clientHost: '192.168.50.115'
});

const route = new Route({ prefix: '#' });

route.reg([CQ_MESSAGE_EVENT.GroupMessage], 'fdj :text*', { once: false }, async (ctx) => {
    await ctx.send(GroupMessage(+ctx.data[2], ` ${ ctx.params.text.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;') } ${  (new Date).toString() }`));
})

// route2.reg([CQ_MESSAGE_EVENT.GroupMessage], 'help', { once: false }, async (ctx) => {
//     app.send(GroupMessage(+ctx.data[2], `[CQ:at,qq=${ctx.data[3]}] 你叫我帮你调出/help我就照做，那艺酱岂不是很没面子？不行～［对你做了个滑稽脸］`));
// })


app.use(require('./middlewares/blacklist').default)

app.use(route.routes())
// app.use(route2.routes())


app.use(require('./router/qqGroupEvent').default)
app.use(require('./router/qqBotManager').default)
app.use(require('./router/mcManager').default)
app.use(require('./router/mcWhite').default)
