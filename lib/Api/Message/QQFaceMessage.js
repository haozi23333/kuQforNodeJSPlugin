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
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBase_1 = require("./MessageBase");
/**
 * 婊情系统
 */
var QQFaceMessage = (function (_super) {
    __extends(QQFaceMessage, _super);
    /**
     * 默认发送qq默认的表情
     * @param faceId
     * @param num
     */
    function QQFaceMessage(faceId, num) {
        var _this = _super.call(this) || this;
        if (faceId) {
            _this.face(faceId, num);
        }
        return _this;
    }
    /**
     *  发送表情
     * @param faceId
     * @param num   重复次数
     */
    QQFaceMessage.prototype.face = function (faceId, num) {
        if (num === void 0) { num = 1; }
        this.message += new Array(num).fill("[CQ:face,id=" + faceId + "]").join('');
    };
    /**
     *  发送emoji
     * @param emojiId   emoji字符的unicode编号
     * @param num   重复次数
     */
    QQFaceMessage.prototype.emoji = function (emojiId, num) {
        if (num === void 0) { num = 1; }
        this.message += new Array(num).fill("[CQ:emoji,id=" + emojiId + "]").join('');
    };
    /**
     * 原创婊情
     * @param bfaceId   为该原创婊情的ID，存放在酷Q目录的data\bface\下
     * @param num   重复次数
     */
    QQFaceMessage.prototype.bface = function (bfaceId, num) {
        if (num === void 0) { num = 1; }
        this.message += new Array(num).fill("[CQ:bface,id=" + bfaceId + "]").join('');
    };
    /**
     *  小婊情
     * @param sfaceId   该小婊情的ID
     * @param num   重复次数
     */
    QQFaceMessage.prototype.sface = function (sfaceId, num) {
        if (num === void 0) { num = 1; }
        this.message += new Array(num).fill("[CQ:sface,id=" + sfaceId + "]").join('');
    };
    return QQFaceMessage;
}(MessageBase_1.MessageBase));
exports.QQFaceMessage = QQFaceMessage;
