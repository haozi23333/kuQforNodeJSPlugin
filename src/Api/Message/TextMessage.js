/**
 * Created by haozi on 4/12/2017.
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var MessageBase_1 = require("./MessageBase");
/**
 * 文字信息
 */
var TextMessage = (function (_super) {
    __extends(TextMessage, _super);
    function TextMessage(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        return _this;
    }
    return TextMessage;
}(MessageBase_1.MessageBase));
exports.TextMessage = TextMessage;
