import {MessageBase} from "./Message/MessageBase";
/**
 * Created by haozi on 4/11/2017.
 * message Api
 */

class MessageApi{
    private _message:String
    constructor () {

    }


    get message(): String {
        return this._message;
    }

    public add <T extends MessageBase> (msg: T): this {

        return this
    }

    public toString (){

    }
}

