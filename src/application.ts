import { SocketClient, ISocketClientOptions } from "./socketClient";
import { Context, IContext } from "./context";
import { compose } from "./util";

export type IMiddleware = (ctx: IContext, next: Promise<void>) => void

export class Application {

    private middleWares: IMiddleware[]  = [];

    private client: SocketClient;

    constructor(option: ISocketClientOptions = {}) {
        this.client = new SocketClient(option);
        this.listener()
    }

    private listener() {
        this.client.on('data', (raw_data: string) => {
            console.log(raw_data)
            this.callback()(new Context(this, raw_data));
        })
    }

    private callback() {
        const fn = compose(this.middleWares);
        return (ctx: Context) => {
            fn(ctx).then(() => false).catch(this.onError)
        }
    }

    public use(fn: IMiddleware) {
        this.middleWares.push(fn);
        return this;
    }

    private onError(err: Error) {
        console.error(err)
    }

    public send(raw_data: string) {
        this.client.send(raw_data);
    }
}
    