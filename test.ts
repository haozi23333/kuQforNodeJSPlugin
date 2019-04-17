
import { Application } from './src/application'
import { Route, IRouteOption } from './src/route/router'
import { CQ_MESSAGE_EVENT } from './src/messages/events'
import { PrivateMessage } from './src/cqApi'

const app = new Application();
const route = new Route({ prefix: '#' });

route.reg(CQ_MESSAGE_EVENT.PrivateMessage, '登录 :id', { once: false },  async (ctx, next) => {
    console.log(ctx);
});

app.send(PrivateMessage(296409654, '你好'));
app.use(route.routes())