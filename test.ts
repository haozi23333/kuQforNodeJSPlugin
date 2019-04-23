
import { Application } from './src/application'
import { Route, IRouteOption } from './src/route/router'
import { CQ_MESSAGE_EVENT } from './src/messages/events'
import { PrivateMessage } from './src/cqApi'

const app = new Application({
    serverHost: '192.168.50.215',
    clientHost: '192.168.50.231'
});
const route = new Route({ prefix: '#' });

route.reg(
    [CQ_MESSAGE_EVENT.PrivateMessage, CQ_MESSAGE_EVENT.GroupMessage],
     '登录 :user_name', { once: false }, 
    async (ctx, next) => {
        console.log(ctx);
        console.log(ctx.params);
    }
);

// app.send(PrivateMessage(296409654, '你好'));
app.use(route.routes())