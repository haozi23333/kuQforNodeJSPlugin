"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathToRegExp = require("path-to-regexp");
class RouteLayer {
    constructor(path, middleware, option) {
        this.stack = [];
        this.path = path;
        this.param_names = [];
        this.option = option;
        this.stack = Array.isArray(middleware) ? middleware : [middleware];
        this.regexp = pathToRegExp(path, this.param_names, this.option);
    }
    match(path) {
        return this.regexp.test(path);
    }
}
exports.default = RouteLayer;
