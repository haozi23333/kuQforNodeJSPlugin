/**
 * Created by haozi on 2/14/2017.
 */
import {Api} from './Api/Api'
import {SocketClinet} from './SocketConnect'

const app = new SocketClinet()
const api = new Api(app)

app.use(async (ctx, next) => {
    return null
})

app.listen()

setTimeout(() => {
    // app.send('PrivateMessage 296409654 ' + (new Buffer('中文测试 + 2333 qwewqe', 'gbk')).toString('base64'));
    // app.send('getGroupInfo 177812016 296409654');
    api.PrivateMessage("296409654", "qwdwqd+ 中文测试 + ][]\[qwdqwdwqdwqdqwdqwdw").then((_) => {
    })
}, 3000)
