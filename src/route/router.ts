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
    type: CQ_EVENT
} 
export class Route {
    private prefix: string;

    private stack: IStack[] = [];

    constructor(option: IRouteOption) {
        this.prefix = option.prefix;    
    }

    public reg(message_type: CQ_EVENT, path: string, option = { once: false }, ...callback: IMiddleware[]) {
        this.stack.push({
            type: message_type,
            regexp: pathToRegExp(this.prefix + ' ' + path),
            callback: compose(callback),
            prefix: this.prefix,
            once: option.once
        })
    }

    public routes() {
        return async (ctx: Context, next: any) => {
            for (let stack: IStack, i = 0; i < this.stack.length ; i++ ) {
                stack = this.stack[i];
                if (stack.type === ctx.type) {
                    if (stack.regexp.test(ctx.raw_data)) {
                        const params = stack.regexp.exec(ctx.raw_data);
                        console.log('命中')
                        return;
                    }
                }
            }
        }
    }
}