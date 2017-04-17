import { MessageBase } from "./Message/MessageBase";
/**
 * Created by haozi on 4/11/2017.
 * message Api
 */

class MessageApi {
    private Mesage: string
    constructor() {
        this.Mesage = ""
    }

    get message(): string {
        return this.Mesage
    }

    public add<T extends MessageBase>(msg: T): this {
        return this
    }

    public toString(): string {
        return ""
    }
}

