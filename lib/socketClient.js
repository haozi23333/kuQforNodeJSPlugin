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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var iconv = require('iconv-lite');
var SocketClient = /** @class */ (function (_super) {
    __extends(SocketClient, _super);
    /**
     * 初始化所有参数
     */
    function SocketClient(options, createCallBack) {
        var _this = _super.call(this) || this;
        _this.create_callback = null;
        _this.server_host = options.serverHost || '127.0.0.1';
        _this.server_port = options.serverPort || 11235;
        _this.client_host = options.clientHost || '0.0.0.0';
        _this.client_port = options.clientPort || 27789;
        _this.create_callback = createCallBack;
        _this.createSocket();
        return _this;
    }
    /**
     * 创建 Socket 链接, 如果注册了回调函数, 将实例回调
     */
    SocketClient.prototype.createSocket = function () {
        this.client_socket = dgram_1.createSocket('udp4');
        this.client_socket.bind(this.client_port, this.client_host);
        if (this.create_callback) {
            this.create_callback(this);
        }
        this.listener();
        this.keep_heart = true;
        this.heartRateService(true);
        console.log('开始💓');
    };
    /**
     * 发送信息
     */
    SocketClient.prototype.send = function (raw_data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (s, j) {
                        _this.client_socket.send(raw_data, 0, raw_data.length, _this.server_port, _this.server_host, function (err) {
                            if (err) {
                                return j(err);
                            }
                            return s();
                        });
                    })];
            });
        });
    };
    /**
     * 编码
     */
    SocketClient.prototype.encode = function (str) {
        return (new Buffer(iconv.encode(str, 'gbk'))).toString('base64');
    };
    /**
     * 解码
     */
    SocketClient.prototype.decode = function (str) {
        return iconv.decode(new Buffer(str, 'base64'), 'gbk');
    };
    /**
     * 心跳字符
     */
    SocketClient.prototype.serverSayHelloStr = function () {
        return "ClientHello " + this.client_port;
    };
    /**
     * 心跳服务
     * @param immediately {Boolean} 是否立即执行
     */
    SocketClient.prototype.heartRateService = function (immediately) {
        var _this = this;
        if (immediately === void 0) { immediately = false; }
        if (!this.keep_heart) {
            return;
        }
        setTimeout(function () {
            _this.send(_this.serverSayHelloStr());
            _this.heartRateService();
        }, immediately ? 1 : 300000);
    };
    /**
     * 关闭所有的 Socket
     */
    SocketClient.prototype.close = function () {
        this.keep_heart = false;
        if (this.client_socket) {
            this.client_socket.close();
        }
    };
    /**
     * 监听数据
     */
    SocketClient.prototype.listener = function () {
        var _this = this;
        this.client_socket.on('message', function (message) {
            _this.emit('data', message);
        });
        this.client_socket.on('error', function (error) {
            _this.emit('error', error);
            _this.close();
        });
    };
    return SocketClient;
}(events_1.EventEmitter));
exports.SocketClient = SocketClient;
