"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by haozi on 4/11/2017.
 * message Api
 */
var MessageApi = (function () {
    function MessageApi() {
        this.Mesage = "";
    }
    Object.defineProperty(MessageApi.prototype, "message", {
        get: function () {
            return this.Mesage;
        },
        enumerable: true,
        configurable: true
    });
    MessageApi.prototype.add = function (msg) {
        return this;
    };
    MessageApi.prototype.toString = function () {
        return "null";
    };
    return MessageApi;
}());
