import { encode } from "./util";
import { deprecate } from "util";

/**
 * 指定好友发送信息
 * @param to 被私聊的 QQ 号
 * @param message 信息
 */
export function PrivateMessage(to: number, message: string) {
    return `PrivateMessage ${to} ${encode(message)}`;
}

/**
 * 指定群发送信息
 * @param to 发送到的 QQ 群号
 * @param message 信息
 */
export function GroupMessage(to: number, message: string) {
    return `GroupMessage ${to} ${encode(message)}`;
}

/**
 * 指定讨论组发送信息
 * @param to 发送到的 QQ 讨论组
 * @param message 信息
 */
export function DiscussMessage(to: number, message: string) {
    return `DiscussMessage ${to} ${encode(message)}`;
}

/**
 * 给某个 QQ 号点赞
 * @param to QQ号
 * @param message 点赞次数 
 */
export function Like(to: number,  times: number) {
    return `Like ${to} ${times}`;
}

/**
 * 
 * @param group_id 被操作的 QQ 群
 * @param to 被操作的人
 * @param reject_add_request 如果为真则对方以后无法加群
 */
export function GroupKick(group_id: number, to: number, reject_add_request: boolean) {
    return `GroupKick ${group_id} ${to} ${~~reject_add_request}`;
}

/**
 * 禁言群员
 * @param group_id 被操作的群
 * @param to 被操作的用户
 * @param duration 禁言时间 如果为 0 为取消, 单位秒
 */
export function GroupBan(group_id: number, to: number, duration: number) {
    return `GroupBan ${to} ${ group_id} ${duration}`;
}

/**
 * 设置群管理员
 * @param group_id 被操作的 QQ 群
 * @param to 被操作的群员
 * @param set_admin 是否成为管理员, true 为设置  false 取消
 */
export function GroupAdmin(group_id: number, to: number, set_admin: boolean) {
    return `GroupAdmin ${to} ${group_id} ${~~set_admin}`;
}

/**
 * 设置群员禁言 
 * @param to 操作的 QQ 群
 * @param enable_ban true 为设置, false 为取消
 */
export function GroupWholeBan(to: number,  enable_ban: boolean) {
    return `GroupWholeBan ${to} ${~~enable_ban}`;
}

/**
 * 禁言匿名用户
 * @param group_id 进
 * @param anonymous 也就是__eventGroupMsg 中的 fromAnonymous
 * @param duration 禁言时长，秒数，为0则取消禁言
 */
export function GroupAnonymousBan(group_id: number, anonymous: string, duration: number) {
    return `GroupAnonymousBan ${group_id} ${anonymous} ${duration}`;
}

/**
 * 设置群匿名状态
 * @param group_id 被操作的 QQ 群
 * @param enable_ban true 允许匿名 false 禁止匿名
 */
export function GroupAnonymous(group_id: number, enable_ban: boolean) {
    return `GroupAnonymous ${group_id} ${~~enable_ban}`;
}

/**
 * 设置群名片
 * @param group_id 被操作的 QQ 群 ID
 * @param qq 操作者的 QQ 号
 * @param new_card 群名片的名字，置NULL则取消名片
 */
export function GroupCard(group_id: number, qq: number, new_card: string) {
    return `GroupCard ${group_id} ${qq} ${encode(new_card)}`;
}

/**
 * 退出群
 * @param group_id 被操作的 QQ 群
 * @param is_dismiss 是否解散群 实测效果：退出别人的群正常有效，没有测试解散自己的群。(复制自文档, 未测试)
 */
export function GroupLeave(group_id: number, is_dismiss: boolean = false) {
    return `GroupLeave ${group_id} ${~~is_dismiss}`;
}

/**
 * 设置群成员头衔
 * 需要群主权限，管理员权限不够，正常有效。
 * @param group_id 被操作的 QQ群 ID
 * @param qq 被操作的 QQ 号
 * @param new_special_title 头衔
 * @param duration 时间 -1 为永久
 */
export function GroupSpecialTitle(group_id: number, qq: number, new_special_title: string, duration = -1) {
    return `GroupSpecialTitle ${group_id} ${qq} ${encode(new_special_title)} ${duration}`;
}

/**
 * 退出讨论组
 * @param group_id 讨论组 ID
 */
export function DiscussLeave(group_id: number) {
    return `PrivateMessage ${group_id}`;
}

/**
 * 好友添加请求
 * @param response_flag 请求事件收到的 response_flag 参数
 * @param response_operation true 同意 false 拒绝
 * @param remark 添加成功以后设置的备注
 */
export function FriendAddRequest(response_flag: string, response_operation: boolean, remark: string) {
    return `FriendAddRequest ${response_flag} ${(~~response_operation) + 1} ${encode(remark)}`;
}

/**
 * 置群添加请求
 * @param response_flag 请求事件收到的 response_flag 参数
 * @param request_type  REQUEST_GROUPADD 请求_群添加 ( 1 )或 REQUEST_GROUPINVITE 请求_群邀请 (2) // 啥玩意
 * @param response_operation true 同意 false 拒绝
 * @param reason 当操作为拒绝的时候有效    拒绝理由
 */
export function GroupAddRequest(response_flag: string, request_type: number, response_operation: boolean, reason: string) {
    return `GroupAddRequest ${response_flag} ${request_type} ${(~~response_operation) + 1} ${encode(reason)}`
}

/**
 * 获取 QQ 群信息
 * @param to 目标 QQ群
 * @param no_cache 是否
 */
export function GroupMemberInfo(group_id: number, no_cache: boolean) {
    return `GroupMemberInfo ${group_id} ${~~no_cache}`;
}

/**
 * 获取 QQ 群成员列表
 * @param group_id 目标 QQ群
 */
export function GroupMemberList(group_id: number) {
    return `GroupMemberList ${group_id}`;
}

/**
 * 取陌生人信息
 * @param to 目标QQ
 * @param no_cache 不使用缓存 
 */
export function StrangerInfo(to: number, no_cache: boolean) {
    return `StrangerInfo ${to} ${~~no_cache}`;
}

/**
 * 获取用户 Cookie
 */
export function Cookies() {
    return `Cookies`;
}

/**
 * 获取 CsrfToken
 */
export function CsrfToken() {
    return `CsrfToken`;
}

/**
 * 获取当前登录的 QQ 号
 */
export function LoginQQ() {
    return `LoginQQ`;
}

/**
 * 获取当前登录的QQ昵称
 */
export function LoginNick() {
    return `LoginNick`
}

/**
 * 返回绝对路径
 */
export function AppDirectory() {
    return `AppDirectory`
}
