"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./messages/events");
const util_1 = require("./util");
class Context {
    constructor(app, raw_data = '') {
        this.raw_data = '';
        this.data = [];
        this.app = app;
        // this.raw_data = this.autoDecode(raw_data.toString());
        this.raw_data = raw_data.toString();
        this.data = this.raw_data.split(' ');
        console.log(`[DEBUG]: 收到消息 ${this.raw_data}`);
        this.parserMessage();
    }
    /**
     * 获取前缀
     * @readonly
     * @memberof Context
     * @returns string
     */
    get prefix() {
        return this.data[0] || 'UnKnowPrefix';
    }
    get type() {
        return this.prefix;
    }
    // private autoDecode(raw_string: string) {
    //    return raw_string.split(' ').map(str => /[=\/]$/.test(str) ? decode(str) : str).join(' ');
    // }
    parserMessage() {
        switch (this.prefix) {
            case events_1.CQ_MESSAGE_EVENT.PrivateMessage:
                this.message = {
                    form_qq: parseInt(this.data[2]),
                    content: util_1.decode(this.data[3])
                };
                break;
            case events_1.CQ_MESSAGE_EVENT.PrivateMessage:
                this.message = {
                    form_qq: parseInt(this.data[3]),
                    form_group: parseInt(this.data[2]),
                    content: util_1.decode(this.data[4])
                };
                break;
        }
    }
}
exports.Context = Context;
