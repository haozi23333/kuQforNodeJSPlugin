'use strict';

var run = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var id;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return client.waitConnect();

                    case 2:

                        api = new _lib.Api(client);
                        api.setPath('I:\酷Q Air');
                        id = api.movePic('C:\\Users\\haozi\\Desktop\\BZ\\hj.png');
                        _context.next = 7;
                        return api.PrivateMessage('296409654', api.getCode());

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by haozi on 10/23/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var client = new _lib.Client(25565);

client.on('data', function (data) {});

client.on('GroupMessage', function (data) {
    "use strict";

    console.log('from ' + data[1] + ' -> ' + data[2]);
});

var api = null;


run().then(function (_) {});
