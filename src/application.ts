import { SocketClient, ISocketClientOptions } from "./socketClient";

export interface IContext {
    // APP 实例
    app: Application,
    // 元数据
    raw_data: string,
    uuid: string,
}

export type IMiddleware = (ctx: IContext, next: Promise<void>) => void

export class Application {

    private middleWares: IMiddleware[]  = [];

    private client: SocketClient;

    constructor(option: ISocketClientOptions) {
        this.client = new SocketClient(option);
        this.listener()
    }

    private listener() {
        this.client.on('message', (message: string) => {
            // this.callback()()
        })
    }

    private compose<T>(middleware: IMiddleware[]) {
        return (ctx: IContext, next?: Promise<void>) => {
            let index: number = 0
            const dispatch = (i: number) => {
                index = i
                const cb: any = middleware[i] || next
                if (!cb) {
                    return Promise.resolve()
                }
                try {
                    return Promise.resolve(cb(ctx, ():any =>{
                        return dispatch(i + 1)
                    }))
                }catch (err) {
                    return Promise.reject(err)
                }
            }
            return dispatch(0)
        }
    }

    private callback() {
        const fn = this.compose(this.middleWares);
        return (ctx: IContext) => {
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
}
    