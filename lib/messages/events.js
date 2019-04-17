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
var MESSAGE_EVENT;
(function (MESSAGE_EVENT) {
    MESSAGE_EVENT["PrivateMessage"] = "PrivateMessage";
    MESSAGE_EVENT["GroupMessage"] = "GroupMessage";
    MESSAGE_EVENT["DiscussMessage"] = "DiscussMessage";
    MESSAGE_EVENT["GroupAdmin"] = "GroupAdmin";
    MESSAGE_EVENT["GroupMemberDecrease"] = "GroupMemberDecrease";
    MESSAGE_EVENT["GroupMemberIncrease"] = "GroupMemberIncrease";
    MESSAGE_EVENT["FriendAdded"] = "FriendAdded";
    MESSAGE_EVENT["RequestAddFriend"] = "RequestAddFriend";
    MESSAGE_EVENT["RequestAddGroup"] = "RequestAddGroup";
    MESSAGE_EVENT["GroupUpload"] = "GroupUpload";
})(MESSAGE_EVENT = exports.MESSAGE_EVENT || (exports.MESSAGE_EVENT = {}));
