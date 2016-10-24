'use strict';

var run = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var api;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('fuck start');
                        _context.next = 3;
                        return client.waitConnect();

                    case 3:
                        api = new _lib.Api(client);


                        api.PrivateMessage("296409654", "23333", function (_) {});
                        api.GroupMessage("55306867", "Test", function (_) {});

                        console.log("OK?");

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function run() {
        return _ref.apply(this, arguments);
    };
}();

var _lib = require('./lib');

var _iconv = require('iconv');

var _iconv2 = _interopRequireDefault(_iconv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by haozi on 10/23/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var Iconv = _iconv2.default.Iconv;
var cov = new Iconv('UTF-8', 'GBK');

var client = new _lib.Client(25565);

client.on('data', function (data) {
    "use strict";

    if (data[0] == 'PrivateMessage') console.log(data[0] + ' -> ' + data[1] + ' -> ' + new Buffer(data[2], 'base64').toString());
});

run().then(function (_) {});
