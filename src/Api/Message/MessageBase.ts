/**
 * Created by haozi on 4/12/2017.
 */
/**
 * Meesage 基类
 */
export class MessageBase {

    private _message: string

    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }

    constructor (){
        this._message = ""
    }

    toString () {
        return this._message
    }

}