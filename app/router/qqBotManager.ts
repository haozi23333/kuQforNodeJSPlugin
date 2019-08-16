import {CQ_MESSAGE_EVENT} from "../../src/messages/events";
import {delWhiteName, dispatchCommand, getServerInfo, getWhiteList} from "../mcApi";
import {GroupMessage, PrivateMessage} from "../../src/cqApi";
import { Route } from '../../src/route/router'
import config from "../config";
import mysql from "../db";
import blacklist from "../services/blacklist";


const route = new Route({ prefix: '#' });

/**
 * 添加黑名单
 */
route.reg([CQ_MESSAGE_EVENT.GroupMessage], '添加黑名单 :qq', { once: false }, async (ctx) => {
    const qq = ctx.params.qq;
    if (ctx.data[2] !== config.managerGroup + '') {
        console.log(233)
        return;
    }
    await blacklist.addBlack(qq)
    await ctx.send(GroupMessage(config.managerGroup, `QQ为 ${qq} 的玩家已经被添加到黑名单`))
})

/**
 * 解除黑名单
 */
route.reg([CQ_MESSAGE_EVENT.GroupMessage], '解除黑名单 :qq', { once: false }, async (ctx) => {
    const qq = ctx.params.qq;
    if (ctx.data[2] !== config.managerGroup + '') {
        return;
    }
    await blacklist.removeBlack(qq)
    await ctx.send(GroupMessage(config.managerGroup, `QQ为 ${qq} 的玩家已经被解除黑名单`))
})
export default route.routes();
