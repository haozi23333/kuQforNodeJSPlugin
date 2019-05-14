export interface CQ_MESSAGE {

}

/**
 * 私聊消息
 */
export interface PrivateMessage extends CQ_MESSAGE{
    form_qq: number,
    content: string
}

/**
 * 群聊消息
 */
export interface GroupMessage extends CQ_MESSAGE{
    form_group: number,
    form_qq: number,
    content: string
}
