import {IContext} from "../../src/context";
import blacklist from "../services/blacklist";
import {CQ_MESSAGE_EVENT} from "../../src/messages/events";

export default async (ctx:  IContext, next: any) => {
    let qq;
    if (ctx.type === CQ_MESSAGE_EVENT.GroupMessage) {
        qq = ctx.data[3];
    }

    if (ctx.type === CQ_MESSAGE_EVENT.PrivateMessage) {
        qq = ctx.data[2];
    }

    if (await blacklist.has(+qq)) {
        return Promise.resolve();
    }

    return next()
}