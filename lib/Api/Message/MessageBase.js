"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by haozi on 4/12/2017.
 */
/**
 * Meesage 基类
 */
var MessageBase = (function () {
    function MessageBase() {
        this._message = "";
    }
    Object.defineProperty(MessageBase.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            this._message = value;
        },
        enumerable: true,
        configurable: true
    });
    MessageBase.prototype.toString = function () {
        return this._message;
    };
    return MessageBase;
}());
exports.MessageBase = MessageBase;
