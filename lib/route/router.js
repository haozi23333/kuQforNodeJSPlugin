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
        this.prefix_regex = new RegExp(this.prefix);
    }
    reg(path, option = { once: false }, ...callback) {
        this.stack.push({
            regexp: pathToRegExp(this.prefix + ' ' + path),
            callback: util_1.compose(callback),
            prefix: this.prefix,
            once: option.once
        });
    }
    route() {
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            this.stack.forEach((stack) => {
                if (stack.regexp.test(ctx.raw_data)) {
                }
            });
        });
    }
}
exports.Route = Route;
