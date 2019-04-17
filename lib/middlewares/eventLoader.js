"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../messages/events");
/**
 * 如果是回调事件, 进行拦截, 交由其他处理
 */
function default_1(ctx, next) {
    const CQ_CALLBACK_EVENT_KEYS = Object.keys(events_1.CQ_CALLBACK_EVENT);
    if (CQ_CALLBACK_EVENT_KEYS.includes(ctx.prefix)) {
    }
}
exports.default = default_1;
