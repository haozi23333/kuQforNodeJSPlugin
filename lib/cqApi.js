"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
/**
 * 指定好友发送信息
 * @param to 被私聊的 QQ 号
 * @param message 信息
 */
function PrivateMessage(to, message) {
    return `PrivateMessage ${to} ${util_1.encode(message)}`;
}
exports.PrivateMessage = PrivateMessage;
/**
 * 指定群发送信息
 * @param to 发送到的 QQ 群号
 * @param message 信息
 */
function GroupMessage(to, message) {
    return `GroupMessage ${to} ${util_1.encode(message)}`;
}
exports.GroupMessage = GroupMessage;
/**
 * 指定讨论组发送信息
 * @param to 发送到的 QQ 讨论组
 * @param message 信息
 */
function DiscussMessage(to, message) {
    return `DiscussMessage ${to} ${util_1.encode(message)}`;
}
exports.DiscussMessage = DiscussMessage;
/**
 * 给某个 QQ 号点赞
 * @param to QQ号
 * @param message 点赞次数
 */
function Like(to, times) {
    return `Like ${to} ${times}`;
}
exports.Like = Like;
/**
 *
 * @param group_id 被操作的 QQ 群
 * @param to 被操作的人
 * @param reject_add_request 如果为真则对方以后无法加群
 */
function GroupKick(group_id, to, reject_add_request) {
    return `GroupKick ${group_id} ${to} ${~~reject_add_request}`;
}
exports.GroupKick = GroupKick;
/**
 * 禁言群员
 * @param group_id 被操作的群
 * @param to 被操作的用户
 * @param duration 禁言时间 如果为 0 为取消, 单位秒
 */
function GroupBan(group_id, to, duration) {
    return `GroupBan ${to} ${group_id} ${duration}`;
}
exports.GroupBan = GroupBan;
/**
 * 设置群管理员
 * @param group_id 被操作的 QQ 群
 * @param to 被操作的群员
 * @param set_admin 是否成为管理员, true 为设置  false 取消
 */
function GroupAdmin(group_id, to, set_admin) {
    return `GroupAdmin ${to} ${group_id} ${~~set_admin}`;
}
exports.GroupAdmin = GroupAdmin;
/**
 * 设置群员禁言
 * @param to 操作的 QQ 群
 * @param enable_ban true 为设置, false 为取消
 */
function GroupWholeBan(to, enable_ban) {
    return `GroupWholeBan ${to} ${~~enable_ban}`;
}
exports.GroupWholeBan = GroupWholeBan;
/**
 * 禁言匿名用户
 * @param group_id 进
 * @param anonymous 也就是__eventGroupMsg 中的 fromAnonymous
 * @param duration 禁言时长，秒数，为0则取消禁言
 */
function GroupAnonymousBan(group_id, anonymous, duration) {
    return `GroupAnonymousBan ${group_id} ${anonymous} ${duration}`;
}
exports.GroupAnonymousBan = GroupAnonymousBan;
/**
 * 设置群匿名状态
 * @param group_id 被操作的 QQ 群
 * @param enable_ban true 允许匿名 false 禁止匿名
 */
function GroupAnonymous(group_id, enable_ban) {
    return `GroupAnonymous ${group_id} ${~~enable_ban}`;
}
exports.GroupAnonymous = GroupAnonymous;
/**
 * 设置群名片
 * @param group_id 被操作的 QQ 群 ID
 * @param qq 操作者的 QQ 号
 * @param new_card 群名片的名字，置NULL则取消名片
 */
function GroupCard(group_id, qq, new_card) {
    return `GroupCard ${group_id} ${qq} ${util_1.encode(new_card)}`;
}
exports.GroupCard = GroupCard;
/**
 * 退出群
 * @param group_id 被操作的 QQ 群
 * @param is_dismiss 是否解散群 实测效果：退出别人的群正常有效，没有测试解散自己的群。(复制自文档, 未测试)
 */
function GroupLeave(group_id, is_dismiss = false) {
    return `GroupLeave ${group_id} ${~~is_dismiss}`;
}
exports.GroupLeave = GroupLeave;
/**
 * 设置群成员头衔
 * 需要群主权限，管理员权限不够，正常有效。
 * @param group_id 被操作的 QQ群 ID
 * @param qq 被操作的 QQ 号
 * @param new_special_title 头衔
 * @param duration 时间 -1 为永久
 */
function GroupSpecialTitle(group_id, qq, new_special_title, duration = -1) {
    return `GroupSpecialTitle ${group_id} ${qq} ${util_1.encode(new_special_title)} ${duration}`;
}
exports.GroupSpecialTitle = GroupSpecialTitle;
/**
 * 退出讨论组
 * @param group_id 讨论组 ID
 */
function DiscussLeave(group_id) {
    return `PrivateMessage ${group_id}`;
}
exports.DiscussLeave = DiscussLeave;
/**
 * 好友添加请求
 * @param response_flag 请求事件收到的 response_flag 参数
 * @param response_operation true 同意 false 拒绝
 * @param remark 添加成功以后设置的备注
 */
function FriendAddRequest(response_flag, response_operation, remark) {
    return `FriendAddRequest ${response_flag} ${(~~response_operation) + 1} ${util_1.encode(remark)}`;
}
exports.FriendAddRequest = FriendAddRequest;
/**
 * 置群添加请求
 * @param response_flag 请求事件收到的 response_flag 参数
 * @param request_type  REQUEST_GROUPADD 请求_群添加 ( 1 )或 REQUEST_GROUPINVITE 请求_群邀请 (2) // 啥玩意
 * @param response_operation true 同意 false 拒绝
 * @param reason 当操作为拒绝的时候有效    拒绝理由
 */
function GroupAddRequest(response_flag, request_type, response_operation, reason) {
    return `GroupAddRequest ${response_flag} ${request_type} ${(~~response_operation) + 1} ${util_1.encode(reason)}`;
}
exports.GroupAddRequest = GroupAddRequest;
/**
 * 获取 QQ 群信息
 * @param to 目标 QQ群
 * @param no_cache 是否
 */
function GroupMemberInfo(group_id, no_cache) {
    return `GroupMemberInfo ${group_id} ${~~no_cache}`;
}
exports.GroupMemberInfo = GroupMemberInfo;
/**
 * 获取 QQ 群成员列表
 * @param group_id 目标 QQ群
 */
function GroupMemberList(group_id) {
    return `GroupMemberList ${group_id}`;
}
exports.GroupMemberList = GroupMemberList;
/**
 * 取陌生人信息
 * @param to 目标QQ
 * @param no_cache 不使用缓存
 */
function StrangerInfo(to, no_cache) {
    return `StrangerInfo ${to} ${~~no_cache}`;
}
exports.StrangerInfo = StrangerInfo;
/**
 * 获取用户 Cookie
 */
function Cookies() {
    return `Cookies`;
}
exports.Cookies = Cookies;
/**
 * 获取 CsrfToken
 */
function CsrfToken() {
    return `CsrfToken`;
}
exports.CsrfToken = CsrfToken;
/**
 * 获取当前登录的 QQ 号
 */
function LoginQQ() {
    return `LoginQQ`;
}
exports.LoginQQ = LoginQQ;
/**
 * 获取当前登录的QQ昵称
 */
function LoginNick() {
    return `LoginNick`;
}
exports.LoginNick = LoginNick;
/**
 * 返回绝对路径
 */
function AppDirectory() {
    return `AppDirectory`;
}
exports.AppDirectory = AppDirectory;
