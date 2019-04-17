
/**
 * CQ 回调事件的 Type
 */
export enum CQ_CALLBACK_EVENT {
    SrvGroupMemberInfo = 'SrvGroupMemberInfo',
    SrvGroupMemberList = 'SrvGroupMemberList',
    SrvStrangerInfo = 'SrvStrangerInfo',
    SrvCookies = 'SrvCookies',
    SrvCsrfToken = 'SrvCsrfToken',
    SrvLoginQQ = 'SrvLoginQQ',
    SrvLoginNickname = 'SrvLoginNickname',
    SrvAppDirectory = 'SrvAppDirectory'
}

/**
 * CQ 消息事件 Type
 */
export enum CQ_MESSAGE_EVENT {
    PrivateMessage = 'PrivateMessage',
    GroupMessage = 'GroupMessage',
    DiscussMessage = 'DiscussMessage',
    GroupAdmin = 'GroupAdmin',
    GroupMemberDecrease = 'GroupMemberDecrease',
    GroupMemberIncrease = 'GroupMemberIncrease',
    FriendAdded = 'FriendAdded',
    RequestAddFriend = 'RequestAddFriend',
    RequestAddGroup = 'RequestAddGroup',
    GroupUpload = 'GroupUpload',
}

/**
 * 特殊的类型,  ALL 全部匹配
 */
export enum CQ_SPECIAL_TYPE {
    ALL = 'ALL',
    ALL_NO = 'ALL_NO'
}

export type CQ_EVENT = CQ_CALLBACK_EVENT | CQ_MESSAGE_EVENT | CQ_SPECIAL_TYPE