"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CQ 回调事件的 Type
 */
var CQ_CALLBACK_EVENT;
(function (CQ_CALLBACK_EVENT) {
    CQ_CALLBACK_EVENT["SrvGroupMemberInfo"] = "SrvGroupMemberInfo";
    CQ_CALLBACK_EVENT["SrvGroupMemberList"] = "SrvGroupMemberList";
    CQ_CALLBACK_EVENT["SrvStrangerInfo"] = "SrvStrangerInfo";
    CQ_CALLBACK_EVENT["SrvCookies"] = "SrvCookies";
    CQ_CALLBACK_EVENT["SrvCsrfToken"] = "SrvCsrfToken";
    CQ_CALLBACK_EVENT["SrvLoginQQ"] = "SrvLoginQQ";
    CQ_CALLBACK_EVENT["SrvLoginNickname"] = "SrvLoginNickname";
    CQ_CALLBACK_EVENT["SrvAppDirectory"] = "SrvAppDirectory";
})(CQ_CALLBACK_EVENT = exports.CQ_CALLBACK_EVENT || (exports.CQ_CALLBACK_EVENT = {}));
/**
 * CQ 消息事件 Type
 */
var CQ_MESSAGE_EVENT;
(function (CQ_MESSAGE_EVENT) {
    CQ_MESSAGE_EVENT["PrivateMessage"] = "PrivateMessage";
    CQ_MESSAGE_EVENT["GroupMessage"] = "GroupMessage";
    CQ_MESSAGE_EVENT["DiscussMessage"] = "DiscussMessage";
    CQ_MESSAGE_EVENT["GroupAdmin"] = "GroupAdmin";
    CQ_MESSAGE_EVENT["GroupMemberDecrease"] = "GroupMemberDecrease";
    CQ_MESSAGE_EVENT["GroupMemberIncrease"] = "GroupMemberIncrease";
    CQ_MESSAGE_EVENT["FriendAdded"] = "FriendAdded";
    CQ_MESSAGE_EVENT["RequestAddFriend"] = "RequestAddFriend";
    CQ_MESSAGE_EVENT["RequestAddGroup"] = "RequestAddGroup";
    CQ_MESSAGE_EVENT["GroupUpload"] = "GroupUpload";
})(CQ_MESSAGE_EVENT = exports.CQ_MESSAGE_EVENT || (exports.CQ_MESSAGE_EVENT = {}));
/**
 * 特殊的类型,  ALL 全部匹配
 */
var CQ_SPECIAL_TYPE;
(function (CQ_SPECIAL_TYPE) {
    CQ_SPECIAL_TYPE["ALL"] = "ALL";
    CQ_SPECIAL_TYPE["ALL_NO"] = "ALL_NO";
})(CQ_SPECIAL_TYPE = exports.CQ_SPECIAL_TYPE || (exports.CQ_SPECIAL_TYPE = {}));
