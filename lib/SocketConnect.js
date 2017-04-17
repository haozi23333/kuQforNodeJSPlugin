/**
 * Created by haozi on 2/11/2017.
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dgram_1 = require("dgram");
var events_1 = require("events");
var querystring_1 = require("querystring");
/**
 *  socket连接类
 */
var SocketClinet = (function (_super) {
    __extends(SocketClinet, _super);
    /**
     *
     * @param serverPort
     * @param clientPort
     * @param serverHost
     * @constructor
     */
    function SocketClinet() {
        var _this = _super.call(this) || this;
        _this.middleWares = [];
        return _this;
    }
    /**
     *
     * @param parm ISocketConnectInitParm
     */
    SocketClinet.prototype.init = function (parm) {
        if (parm === void 0) { parm = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var rinfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.serverSocket = dgram_1.createSocket('udp4');
                        this.clientSocket = dgram_1.createSocket('udp4');
                        this.clientPort = parm.clientPort || 27788;
                        this.serverPort = parm.serverPort || 11235;
                        this.serverSocket.bind(this.clientPort);
                        this.Host = parm.serverHost || '127.0.0.1';
                        this.listener();
                        return [4 /*yield*/, this.send(this.serverHello())];
                    case 1:
                        rinfo = _a.sent();
                        this.emit('connect', rinfo);
                        this.heartRateService();
                        return [2 /*return*/];
                }
            });
        });
    };
    SocketClinet.prototype.listener = function () {
        var _this = this;
        /**
         *
         */
        this.clientSocket.on('message', function (mag) {
            console.log(new Buffer(mag, 'base64').toString());
        });
        /**
         *
         */
        this.serverSocket.on('error', function (err) {
            console.log("server error:\n" + err.stack);
            _this.serverSocket.close();
        });
        /**
         *
         */
        this.serverSocket.on('message', function (msg, rinfo) {
            var m = (new Buffer(msg, 'base64').toString()).split(' ');
            console.log(m);
            if (m[0] === "group") {
                console.log(querystring_1.unescape(m[1].replace(/\\u/g, '%u')));
            }
            _this.emit('data', m);
        });
        /**
         *
         */
        this.serverSocket.on('listening', function () {
            var address = _this.serverSocket.address();
            console.log("server listening " + address.address + ":" + address.port);
        });
        /**
         *
         */
        this.on('send', function (data) {
            _this.send(data);
        });
    };
    /**
     * 向服务器发送socket数据
     * @param data 数据
     * @returns {Promise<void>|Promise|IThenable<void>}
     * @public
     */
    SocketClinet.prototype.send = function (data) {
        var _this = this;
        console.log(data);
        var msg = new Buffer(data).toString('base64');
        return new Promise(function (s, j) {
            _this.clientSocket.send(msg, 0, msg.length, _this.serverPort, _this.Host, function (err) {
                if (err) {
                    j(err);
                }
                else {
                    s();
                }
            });
        });
    };
    /**
     * 构造clienthello信息
     * @returns {string}
     * @private
     */
    SocketClinet.prototype.serverHello = function () {
        return "ClientHello " + this.clientPort;
    };
    /**
     * 发送心跳包
     * 30秒一次
     */
    SocketClinet.prototype.heartRateService = function () {
        var _this = this;
        this.heart = setInterval(function () {
            _this.send(_this.serverHello());
        }, 300000);
    };
    /**
     * 将所有中间件组合起来
     * @param middleware 中间件的数组
     * @returns {(ctx:Context, next?:Promise)=>any}
     * @api private
     */
    SocketClinet.prototype.compose = function (middleware) {
        return function (ctx, next) {
            // 定义索引表示执行到了第几个
            var index = 0;
            // 定义处理函数
            var dispatch = function (i) {
                // 更新索引
                index = i;
                // 判断中间件是否存在 否则执行挂起的中间件
                var cb = middleware[i] || next;
                // 如果都不存在 就返回一个resolved形态的Promise
                if (!cb) {
                    return Promise.resolve();
                }
                // 捕获执行过程中的异常 并以rejected形态的Promise对象抛出
                try {
                    // Promise.resolve的方法传入一个thenable的对象(可以then的) 返回的promise会跟随这个thenable对象直到返回resolve状态
                    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve  mdn参考
                    // 当中间件await 的时候 递归执行 dispatch 函数调用下一个中间件
                    return Promise.resolve(cb(ctx, function () {
                        return dispatch(i + 1);
                    }));
                }
                catch (err) {
                    return Promise.reject(err);
                }
            };
            // 执行第一个中间件
            return dispatch(0);
        };
    };
    SocketClinet.prototype.callback = function (ctx) {
        var fn = this.compose(this.middleWares);
        return function (ctx) {
            fn(ctx).then(function () { return false; }).catch();
        };
    };
    SocketClinet.prototype.use = function (fn) {
        this.middleWares.push(fn);
        return this;
    };
    /**
     * 开始监听
     * 这个函数必须在use完成后调用
     * @param serverPort
     * @param clientPort
     * @param serverHost
     */
    SocketClinet.prototype.listen = function (param) {
        this.init(param).then(function (_) { return 1; });
    };
    return SocketClinet;
}(events_1.EventEmitter));
exports.SocketClinet = SocketClinet;
