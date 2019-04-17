"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    constructor(app, raw_data = '') {
        this.raw_data = '';
        this.data = [];
        this.raw_data = raw_data;
        this.data = raw_data.split(' ');
    }
    /**
     * 获取前缀
     * @readonly
     * @memberof Context
     * @returns string
     */
    get prefix() {
        return this.raw_data[0];
    }
    /**
     * 注册回调
     */
    registerIntercept(event, callback) {
    }
}
exports.Context = Context;
