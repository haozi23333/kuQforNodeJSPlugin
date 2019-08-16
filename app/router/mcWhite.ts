import {Route} from "../../src/route/router";
import {CQ_MESSAGE_EVENT} from "../../src/messages/events";
import {GroupCard, GroupMessage, PrivateMessage} from "../../src/cqApi";
import {addWhiteName, delWhiteName } from "../mcApi";

import mysql from '../db'
import config from "../config";
const route = new Route({ prefix: '#' });

/**
 * 注册白名单
 */
route.reg(
    [CQ_MESSAGE_EVENT.PrivateMessage],
    'white :player_name', { once: false },
    async (ctx, next) => {
        const qq = ctx.data[2];
        const player_name = ctx.params.player_name;
        const me = await  mysql.query('SELECT * FROM qq_link WHERE qq = ?', {
            replacements: [qq]
        });
        if (me[0][0] && me[0][0].name !== null ) {
            await ctx.send(PrivateMessage(+qq, ` 这里检测到您已经绑定过一个 游戏 ID  [${me[0][0].name}]了哦, 接下来请联系群主解绑吧_(:з」∠)_`));
            return;
        }
        const user = await  mysql.query('SELECT * FROM authme WHERE username = ?', {
            replacements: [player_name]
        });
        if (user[0][0] === null) {
            await ctx.send(PrivateMessage(+qq, ` 游戏 ID ${player_name} 已经被占用`));
            return;
        }
        if (!/^[a-zA-Z0-9_].*$/.test(player_name)) {
            await ctx.send(PrivateMessage(+qq, `用户名不符合规范, 必须为 大小写字母, 下划线组成`));
            return;
        }
        await addWhiteName(player_name);
        if (me[0][0]) {
            await  mysql.query('UPDATE qq_link set name = ? WHERE qq = ?', {
                replacements: [player_name, qq]
            });
        } else {
            await mysql.query('INSERT INTO `qq_link` (`qq`, `name`, `regDate`, `status`) VALUES (?, ?, ?, ?)', {
                replacements: [qq, player_name, new Date(), 1]
            });
        }
        await ctx.send(PrivateMessage(+qq, `恭喜，您成功绑定了 游戏 ID ${player_name} 哦(^_^)，可以开始登入服务器啦～★`));
        await ctx.send(GroupCard(config.gameGroup, +qq, player_name));
        await ctx.send(PrivateMessage(+qq, `您的群名片已经被修改为您的游戏 ID ${player_name}, 如果需要修改`));
        await ctx.send(GroupMessage(782490531, `玩家 ${ player_name } 申请白名单成功!`));
    }
);

/**
 * 查询绑定ID   管理员使用
 */
route.reg([CQ_MESSAGE_EVENT.GroupMessage], '查询绑定ID :player_name', { once: false }, async (ctx) => {
    if (ctx.data[2] !== config.managerGroup + '') {
        return;
    }
    const player_name = ctx.params.player_name;
    const me = await  mysql.query('SELECT * FROM qq_link WHERE name = ?', {
        replacements: [player_name]
    });

    if (!me[0][0]) {
        await ctx.send(GroupMessage(+ctx.data[2], `玩家 ID ${player_name} 信息不存在`));
        return;
    }
    const user = me[0][0] as any;
    await ctx.send(GroupMessage(+ctx.data[2], ` 玩家信息: \n ID ${ user.name }, \n QQ: ${ user.qq }, \n注册时间: ${ user.regDate.toLocaleString() }, \n当前状态: 可用`));
})

/**
 * 查询绑定QQ
 */
route.reg([CQ_MESSAGE_EVENT.GroupMessage], '查询绑定QQ :qq', { once: false }, async (ctx) => {
    if (ctx.data[2] !== config.managerGroup + '') {
        return;
    }
    const qq = ctx.params.qq;
    const me = await mysql.query('SELECT * FROM qq_link WHERE qq = ?', {
        replacements: [qq]
    });

    if (!me[0][0]) {
        await ctx.send(GroupMessage(+ctx.data[2], `玩家 QQ: ${qq} 信息不存在`));
        return;
    }
    const user = me[0][0] as any;
    await ctx.send(GroupMessage(+ctx.data[2], ` 玩家信息: \n ID ${ user.name }, \n QQ: ${ user.qq }, \n注册时间: ${ user.regDate.toLocaleString() }, \n当前状态: 可用`));
})


/**
 * 解绑玩家账号
 */
route.reg([CQ_MESSAGE_EVENT.GroupMessage], '解绑 :qq', { once: false }, async (ctx) => {
    if (ctx.data[2] !== config.managerGroup + '') {
        return;
    }
    const qq = ctx.params.qq;
    const me = await  mysql.query('SELECT * FROM qq_link WHERE qq = ?', {
        replacements: [qq]
    });
    if (!me[0][0]) {
        await ctx.send(GroupMessage(+ctx.data[2], `玩家 QQ: ${qq} 信息不存在`));
        return;
    }
    await  mysql.query('UPDATE qq_link set name = NULL WHERE qq = ?', {
        replacements: [qq]
    });
    await delWhiteName(me[0][0].name);
    await ctx.send(GroupMessage(782490531, ` 解绑用户 QQ: ${qq} 游戏 ID: ${me[0][0].name} 成功`));
    await ctx.send(PrivateMessage(qq, `里收到了新的反馈哦，所以我来提醒啦，您的解绑请求群主已经处理完啦, 快去绑定新的ID吧(づ ●─● )づ`))
})


export default route.routes();