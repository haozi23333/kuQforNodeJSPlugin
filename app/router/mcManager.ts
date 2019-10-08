import {CQ_MESSAGE_EVENT} from "../../src/messages/events";
import {dispatchCommand, getServerInfo, getWhiteList} from "../mcApi";
import {GroupMessage} from "../../src/cqApi";
import { Route } from '../../src/route/router'
import config from "../config";
import {isManagerGroup} from "../util";


const route = new Route({ prefix: '#' });

route.reg([CQ_MESSAGE_EVENT.GroupMessage], '服务器信息', { once: false }, async (ctx) => {
    let whiteListinfo;
    try {
        whiteListinfo = await getWhiteList();
    } catch (e) {
        await ctx.send(GroupMessage(+ctx.data[2], "服务器连接失败，[CQ:at,qq=1067770480] 快去康康~"));
        return;
    }
    const serverInfo = await getServerInfo() as any;
    const player_str = `听你这么说，你很勇哦? 服务器目前白名单共有 ${whiteListinfo.players.length} 个, 在线玩家 ${ serverInfo.players.length } 人`;
    await ctx.send(GroupMessage(+ctx.data[2], player_str));
})

route.reg([CQ_MESSAGE_EVENT.GroupMessage], '服务器玩家', { once: false }, async (ctx) => {
    const serverInfo = await getServerInfo() as any;
    const player_str = `听你这么说，你很勇哦? 服务器目前 在线玩家 ${ serverInfo.players.length } 人, 分别为 ${  serverInfo.players.join(',  ').replace(/\§./g, '').replace(/[\ufffd]{2}./g, '') }`;
    await ctx.send(GroupMessage(+ctx.data[2], player_str));
})

route.reg([CQ_MESSAGE_EVENT.GroupMessage], 'System Call :cmd*', { once: false }, async (ctx) => {
    if (ctx.data[2] !== config.managerGroup + '') {
        return;
    }

    if(isManagerGroup(ctx.data[2])){
        return
    }
    await dispatchCommand(ctx.params.cmd);
    await ctx.send(GroupMessage(+ctx.data[2], `执行命令 ${ ctx.params.cmd } 成功 [CQ:image,file=5B9AF5FA6CD407AB7EE3C803805A1F33.jpg]`));
})

route.reg([CQ_MESSAGE_EVENT.GroupMessage], '在吗 :text*', { once: false }, async (ctx) => {

    const serverInfo = await getServerInfo() as any;
    let online = false;
    serverInfo.players.map((name: string) => {
        if (new RegExp(ctx.params.text, 'i').test(name) ) {
            online = true;
        }
    })
    await ctx.send(GroupMessage(+ctx.data[2], online ? '在' : '不在 guna [CQ:image,file=27141B5928685F4380121BFF3624A5EC.jpg]'));
})

export default route.routes();
