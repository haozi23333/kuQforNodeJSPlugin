import { IContext } from "../context";
import { CQ_CALLBACK_EVENT } from "../messages/events";

/**
 * 如果是回调事件, 进行拦截, 交由其他处理
 */
export default function(ctx: IContext, next: any) {
    const CQ_CALLBACK_EVENT_KEYS = Object.keys(CQ_CALLBACK_EVENT);
    if (CQ_CALLBACK_EVENT_KEYS.includes(ctx.prefix)) {
        
        return;
    }

    return next();
}