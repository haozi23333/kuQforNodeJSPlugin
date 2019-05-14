"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pathToRegExp = require("path-to-regexp");
const util_1 = require("../util");
class Route {
    constructor(option) {
        this.stack = [];
        this.prefix = option.prefix;
    }
    reg(message_type, path, option = { once: false }, ...callback) {
        const message_types = Array.isArray(message_type) ? message_type : [message_type];
        const keys = [];
        const regexp = pathToRegExp(this.prefix + ' ' + path, keys, {
            start: false,
            end: false,
        });
        this.stack.push({
            type: message_types,
            regexp,
            keys,
            callback: util_1.compose(callback),
            prefix: this.prefix,
            once: option.once
        });
    }
    routes() {
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            for (let stack, i = 0; i < this.stack.length; i++) {
                stack = this.stack[i];
                if (stack.type.includes(ctx.type)) {
                    if (stack.regexp.test(ctx.raw_data)) {
                        const params = {};
                        const data = stack.regexp.exec(ctx.raw_data);
                        stack.keys.forEach((val, j) => {
                            params[val.name] = data[1 + j];
                        });
                        ctx.params = params;
                        return stack.callback(ctx);
                    }
                }
            }
            return next();
        });
    }
}
exports.Route = Route;
