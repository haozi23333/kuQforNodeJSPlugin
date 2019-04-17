import { IContext } from "../context";
import { CQ_CALLBACK_EVENT } from "../messages/events";

export default function(ctx: IContext, next: any) {
    const CQ_CALLBACK_EVENT_KEYS = Object.keys(CQ_CALLBACK_EVENT);
    if (CQ_CALLBACK_EVENT_KEYS.includes(ctx.prefix)) {
        
    }
}