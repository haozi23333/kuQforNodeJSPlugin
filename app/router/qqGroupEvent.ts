import {Route} from "../../src/route/router";
import {CQ_MESSAGE_EVENT} from "../../src/messages/events";
import { GroupMessage } from "../../src/cqApi";
import { delWhiteName} from "../mcApi";
import * as moment from 'moment'
import {setDiffTimeString} from "../util";
import mysql from '../db'
const route = new Route({ prefix: '#' });

route.reg([CQ_MESSAGE_EVENT.GroupMemberIncrease], '*', { once: false }, async (ctx) => {
    await ctx.send(GroupMessage(+ctx.data[2], `欢迎 [CQ:at,qq=${ctx.data[4]}] ，这位新人大老爷好，欢迎加入工艺小镇，请先仔细阅读群公告，需要注意的是，加入服务器需要先在群文件下载客户端整合包啦亲(づ ●─● )づ，记得找我这个AI添加您的白名单哦，格式只说一次所以要记住啦！格式是: #white <游戏ID>，一定要记得小窗敲我唷，公共场合不宜窃声私语x。其实如果忘了我还可以再告诉您一次的［小声］`))
});

route.reg([CQ_MESSAGE_EVENT.GroupMemberDecrease], '*', { once: false }, async (ctx) => {
    const me = await  mysql.query('SELECT * FROM qq_link WHERE qq = ?', {
        replacements: [ctx.data[4]]
    });
    if (!me[0][0]) {
        await ctx.send(GroupMessage(782490531, `群成员 QQ: ${ctx.data[4]} 退出了群, 他没有申请游戏白名单`));
        return;
    }

    const user = me[0][0];
    await delWhiteName(me[0][0].name);
    await mysql.query('UPDATE qq_link set status = 0 WHERE qq = ?', {
        replacements: [ctx.data[4]]
    });
    await ctx.send(GroupMessage(782490531, `群成员 QQ: ${ctx.data[4]} 退出了群, 他的游戏ID 为 ${me[0][0].name} 现在已经将他的白名单移除 , \n 申请白名单时间: ${ user.regDate.toLocaleString()} \n 离群时间: ${new Date().toLocaleString() } \n 游戏时长: ${ setDiffTimeString(moment.duration(moment(new Date()).diff(user.regDate))) }`));
});

export default route.routes();