"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Session {
    constructor() {
        this.map = new Map();
    }
    get(key) {
        return this.map.get(key);
    }
    set(key, value) {
        return this.map.set(key, value);
    }
}
exports.default = Session;
