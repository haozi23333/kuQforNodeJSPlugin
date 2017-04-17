/**
 * Created by haozi on 4/12/2017.
 */
/**
 * Meesage 基类
 */
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MessageBase;
    return {
        setters: [],
        execute: function () {/**
             * Created by haozi on 4/12/2017.
             */
            /**
             * Meesage 基类
             */
            MessageBase = class MessageBase {
                get message() {
                    return this._message;
                }
                set message(value) {
                    this._message = value;
                }
                constructor() {
                    this._message = "";
                }
                toString() {
                    return this._message;
                }
            };
            exports_1("MessageBase", MessageBase);
        }
    };
});
