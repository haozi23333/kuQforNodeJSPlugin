import * as pathToRegExp from 'path-to-regexp'
import { IMiddleware } from '../application';
import { Context } from '../context';
import { compose } from '../util';
import { CQ_EVENT } from '../messages/events';

export interface IRouteOption {
    prefix: string
}

interface IStack {
    regexp: RegExp,
    callback: any,
    prefix: string,
    once: boolean,
    type: CQ_EVENT[],
    keys: any[]
} 
export class Route {
    private prefix: string;

    private stack: IStack[] = [];

    constructor(option: IRouteOption) {
        this.prefix = option.prefix;    
    }

    public reg(message_type: CQ_EVENT | CQ_EVENT[], path: string, option = { once: false }, ...callback: IMiddleware[]) {
        const message_types = Array.isArray(message_type) ? message_type : [message_type];
        const keys: any[] = [];
        const regexp = pathToRegExp(this.prefix + ' ' + path, keys, {
            start: false,
            end: false,
        });
        this.stack.push({
            type: message_types,
            regexp,
            keys,
            callback: compose(callback),
            prefix: this.prefix,
            once: option.once
        })
    }

    public routes() {
        return async (ctx: Context, next: any) => {
            for (let stack: IStack, i = 0; i < this.stack.length ; i++ ) {
                stack = this.stack[i];
                if (stack.type.includes(ctx.type)) {
                    if (stack.regexp.test(ctx.raw_data)) {
                        const params = {} as any;
                        const data = stack.regexp.exec(ctx.raw_data);
                        stack.keys.forEach((val, j) => {
                            params[val.name] = data[1 + j];
                        })
                        ctx.params = params;
                        return stack.callback(ctx);
                    }
                }
            }
            return next();
        }
    }
}