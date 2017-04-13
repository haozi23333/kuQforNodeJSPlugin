/**
 * Created by haozi on 4/12/2017.
 */

import {MessageBase} from "./MessageBase";

/**
 * 婊情系统
 */
export class QQFaceMessage extends MessageBase{

    /**
     * 默认发送qq默认的表情
     * @param faceId
     * @param num
     */
    constructor (faceId?: number, num?: number) {
        super()
        if(faceId){
            this.face(faceId, num)
        }
    }

    /**
     *  发送表情
     * @param faceId
     * @param num   重复次数
     */
    face (faceId?: number, num: number = 1) {
        this.message += new Array(num).fill(`[CQ:face,id=${faceId}]`).join('')
    }

    /**
     *  发送emoji
     * @param emojiId   emoji字符的unicode编号
     * @param num   重复次数
     */
    emoji (emojiId: string, num: number = 1){
        this.message += new Array(num).fill(`[CQ:emoji,id=${emojiId}]`).join('')
    }

    /**
     * 原创婊情
     * @param bfaceId   为该原创婊情的ID，存放在酷Q目录的data\bface\下
     * @param num   重复次数
     */
    bface (bfaceId: number, num: number = 1) {
        this.message += new Array(num).fill(`[CQ:bface,id=${bfaceId}]`).join('')
    }

    /**
     *  小婊情
     * @param sfaceId   该小婊情的ID
     * @param num   重复次数
s     */
    sface (sfaceId: number, num: number = 1) {
        this.message += new Array(num).fill(`[CQ:sface,id=${sfaceId}]`).join('')
    }
}

