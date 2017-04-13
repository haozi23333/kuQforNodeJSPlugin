/**
 * Created by haozi on 4/12/2017.
 */

import {MessageBase} from "./MessageBase";

/**
 * 文字信息
 */
export class TextMessage extends MessageBase{

    constructor (message) {
        super()
        this.message = message
    }
}


