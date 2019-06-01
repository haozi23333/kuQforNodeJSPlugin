
import { Application } from '../src/application'
import { Route } from '../src/route/router'
import { CQ_MESSAGE_EVENT } from '../src/messages/events'
import { getWhiteList, addWhiteName, delWhiteName, dispatchCommand, getServerInfo } from './mcApi';
import * as Sequelize from 'sequelize';
import config from '../config';
import * as moment from 'moment'
import {setDiffTimeString} from "./util";
import {PrivateMessage, GroupMessage, GroupCard} from '../src/cqApi'

const sequelize = new Sequelize.Sequelize(config.mysql.database, config.mysql.username,  config.mysql.password, {
    host:  config.mysql.host,
    dialect: 'mariadb'
});

const app = new Application({
    serverHost: '192.168.50.126',
    clientHost: '192.168.50.126'
});
const route = new Route({ prefix: '#' });

route.reg(
    [CQ_MESSAGE_EVENT.PrivateMessage],
    'white :player_name', { once: false },
    async (ctx, next) => {
        const qq = ctx.data[2];
        const player_name = ctx.params.player_name;
        const me = await  sequelize.query('SELECT * FROM qq_link WHERE qq = ?', {
            replacements: [qq]
        });
        if (me[0][0] && me[0][0].name !== null ) {
            app.send(PrivateMessage(+qq, ` 这里检测到您已经绑定过一个 游戏 ID  [${me[0][0].name}]了哦, 接下来请联系群主解绑吧_(:з」∠)_`));
            return;
        }
        const user = await  sequelize.query('SELECT * FROM authme WHERE username = ?', {
            replacements: [player_name]
        });
        if (user[0][0] === null) {
            app.send(PrivateMessage(+qq, ` 游戏 ID ${player_name} 已经被占用`));
            return;
        }
        if (!/^[a-zA-Z0-9_].*$/.test(player_name)) {
            app.send(PrivateMessage(+qq, `用户名不符合规范, 必须为 大小写字母, 下划线组成`));
            return;
        }
        await addWhiteName(player_name);
        if (me[0][0]) {
            await  sequelize.query('UPDATE qq_link set name = ? WHERE qq = ?', {
                replacements: [player_name, qq]
            });
        } else {
            await sequelize.query('INSERT INTO `qq_link` (`qq`, `name`, `regDate`, `status`) VALUES (?, ?, ?, ?)', {
                replacements: [qq, player_name, new Date(), 1]
            });
        }
        app.send(PrivateMessage(+qq, `恭喜，您成功绑定了 游戏 ID ${player_name} 哦(^_^)，可以开始登入服务器啦～★`));
        app.send(GroupCard(573284146, +qq, player_name));
        app.send(PrivateMessage(+qq, `您的群名片已经被修改为您的游戏 ID ${player_name}, 如果需要修改`));
        app.send(GroupMessage(782490531, `玩家 ${ player_name } 申请白名单成功!`));
    }
);

route.reg([CQ_MESSAGE_EVENT.GroupMessage], '查询绑定ID :player_name', { once: false }, async (ctx) => {


    if (ctx.data[2] !== '782490531') {
        return;
    }
    const player_name = ctx.params.player_name;
    const me = await  sequelize.query('SELECT * FROM qq_link WHERE name = ?', {
        replacements: [player_name]
    });

    if (!me[0][0]) {
        app.send(GroupMessage(+ctx.data[2], `玩家 ID ${player_name} 信息不存在`));
        return;
    }
    const user = me[0][0] as any;
    app.send(GroupMessage(+ctx.data[2], ` 玩家信息: \n ID ${ user.name }, \n QQ: ${ user.qq }, \n注册时间: ${ user.regDate.toLocaleString() }, \n当前状态: 可用`));
})

route.reg([CQ_MESSAGE_EVENT.GroupMessage], '查询绑定QQ :qq', { once: false }, async (ctx) => {
    if (ctx.data[2] !== '782490531') {
        return;
    }
    const qq = ctx.params.qq;
    const me = await  sequelize.query('SELECT * FROM qq_link WHERE qq = ?', {
        replacements: [qq]
    });

    if (!me[0][0]) {
        app.send(GroupMessage(+ctx.data[2], `玩家 QQ: ${qq} 信息不存在`));
        return;
    }
    const user = me[0][0] as any;
    app.send(GroupMessage(+ctx.data[2], ` 玩家信息: \n ID ${ user.name }, \n QQ: ${ user.qq }, \n注册时间: ${ user.regDate.toLocaleString() }, \n当前状态: 可用`));
})

route.reg([CQ_MESSAGE_EVENT.GroupMessage], 'fdj :text*', { once: false }, async (ctx) => {
    app.send(GroupMessage(+ctx.data[2], ` ${ ctx.params.text.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;') }`));
})


route.reg([CQ_MESSAGE_EVENT.GroupMessage], '在吗 :text*', { once: false }, async (ctx) => {

    const serverInfo = await getServerInfo() as any;
    let online = false;
    serverInfo.players.map((name: string) => {
        if (new RegExp(ctx.params.text, 'i').test(name) ) {
            online = true;
        }
    })
    app.send(GroupMessage(+ctx.data[2], online ? '在' : '不在 guna [CQ:image,file=27141B5928685F4380121BFF3624A5EC.jpg]'));
})

route.reg([CQ_MESSAGE_EVENT.GroupMessage], '解绑 :qq', { once: false }, async (ctx) => {
    if (ctx.data[2] !== '782490531') {
        return;
    }
    const qq = ctx.params.qq;
    const me = await  sequelize.query('SELECT * FROM qq_link WHERE qq = ?', {
        replacements: [qq]
    });
    if (!me[0][0]) {
        app.send(GroupMessage(+ctx.data[2], `玩家 QQ: ${qq} 信息不存在`));
        return;
    }
    await  sequelize.query('UPDATE qq_link set name = NULL WHERE qq = ?', {
        replacements: [qq]
    });
    await delWhiteName(me[0][0].name);
    app.send(GroupMessage(782490531, ` 解绑用户 QQ: ${qq} 游戏 ID: ${me[0][0].name} 成功`));
    app.send(PrivateMessage(qq, `里收到了新的反馈哦，所以我来提醒啦，您的解绑请求群主已经处理完啦, 快去绑定新的ID吧(づ ●─● )づ`))
})

route.reg([CQ_MESSAGE_EVENT.GroupMessage], '服务器信息', { once: false }, async (ctx) => {
    let whiteListinfo;
    try {
        whiteListinfo = await getWhiteList();
    } catch (e) {
        app.send(GroupMessage(+ctx.data[2], "服务器连接失败，[CQ:at,qq=1067770480] 快去康康~"));
        return;
    }
    const serverInfo = await getServerInfo() as any;
    const player_str = `听你这么说，你很勇哦? 服务器目前白名单共有 ${whiteListinfo.players.length} 个, 在线玩家 ${ serverInfo.players.length } 人`;
    app.send(GroupMessage(+ctx.data[2], player_str));
})

route.reg([CQ_MESSAGE_EVENT.GroupMessage], '服务器玩家', { once: false }, async (ctx) => {
    const serverInfo = await getServerInfo() as any;
    const player_str = `听你这么说，你很勇哦? 服务器目前 在线玩家 ${ serverInfo.players.length } 人, 分别为 ${  serverInfo.players.join(',  ').replace(/\§./g, '').replace(/[\ufffd]{2}./g, '') }`;
    app.send(GroupMessage(+ctx.data[2], player_str));
})

route.reg([CQ_MESSAGE_EVENT.GroupMessage], 'System Call :cmd*', { once: false }, async (ctx) => {
    if (ctx.data[2] !== '782490531') {
        return;
    }
    await dispatchCommand(ctx.params.cmd);
    app.send(GroupMessage(+ctx.data[2], `执行命令 ${ ctx.params.cmd } 成功 [CQ:image,file=5B9AF5FA6CD407AB7EE3C803805A1F33.jpg]`));
})

route.reg([CQ_MESSAGE_EVENT.GroupMemberIncrease], '*', { once: false }, async (ctx) => {
    app.send(GroupMessage(+ctx.data[2], `欢迎 [CQ:at,qq=${ctx.data[4]}] ，这位新人大老爷好，欢迎加入工艺小镇，请先仔细阅读群公告，需要注意的是，加入服务器需要先在群文件下载客户端整合包啦亲(づ ●─● )づ，记得找我这个AI添加您的白名单哦，格式只说一次所以要记住啦！格式是: #white <游戏ID>，一定要记得小窗敲我唷，公共场合不宜窃声私语x。其实如果忘了我还可以再告诉您一次的［小声］`))
});

route.reg([CQ_MESSAGE_EVENT.GroupMemberDecrease], '*', { once: false }, async (ctx) => {
    const me = await  sequelize.query('SELECT * FROM qq_link WHERE qq = ?', {
        replacements: [ctx.data[4]]
    });
    if (!me[0][0]) {
        app.send(GroupMessage(782490531, `群成员 QQ: ${ctx.data[4]} 退出了群, 他没有申请游戏白名单`));
        return;
    }

    const user = me[0][0];
    await delWhiteName(me[0][0].name);
    await  sequelize.query('UPDATE qq_link set status = 0 WHERE qq = ?', {
        replacements: [ctx.data[4]]
    });
    app.send(GroupMessage(782490531, `群成员 QQ: ${ctx.data[4]} 退出了群, 他的游戏ID 为 ${me[0][0].name} 现在已经将他的白名单移除 , \n 申请白名单时间: ${ user.regDate.toLocaleString()} \n 离群时间: ${new Date().toLocaleString() } \n 游戏时长: ${ setDiffTimeString(moment.duration(moment(new Date()).diff(user.regDate))) }`));
});

const route2 = new Route({ prefix: '/' });

route2.reg([CQ_MESSAGE_EVENT.GroupMessage], 'help', { once: false }, async (ctx) => {
    app.send(GroupMessage(+ctx.data[2], `[CQ:at,qq=${ctx.data[3]}] 你叫我帮你调出/help我就照做，那艺酱岂不是很没面子？不行～［对你做了个滑稽脸］`));

})

app.use(route.routes())
app.use(route2.routes())
