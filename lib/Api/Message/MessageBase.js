/**
 * Created by haozi on 4/12/2017.
 */
/**
 * Meesage 基类
 */
/**
 * Created by haozi on 4/12/2017.
 */ export class MessageBase {
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
    constructor() {
        this._message = "";
    }
    toString() {
        return this._message;
    }
}
//# sourceMappingURL=MessageBase.js.map