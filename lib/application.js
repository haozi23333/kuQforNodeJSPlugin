"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketClient_1 = require("./socketClient");
const context_1 = require("./context");
const util_1 = require("./util");
class Application {
    constructor(option) {
        this.middleWares = [];
        this.client = new socketClient_1.SocketClient(option);
        this.listener();
    }
    listener() {
        this.client.on('message', (raw_data) => {
            this.callback()(new context_1.Context(this, raw_data));
        });
    }
    callback() {
        const fn = util_1.compose(this.middleWares);
        return (ctx) => {
            fn(ctx).then(() => false).catch(this.onError);
        };
    }
    use(fn) {
        this.middleWares.push(fn);
        return this;
    }
    onError(err) {
        console.error(err);
    }
}
exports.Application = Application;
