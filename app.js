'use strict';

var run = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
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

// import iconv from 'iconv'
//
// let Iconv = iconv.Iconv
// let cov = new Iconv('UTF-8','GBK')

var client = new _lib.Client(25565);

client.on('data', function (data) {
    "use strict";

    if (data[0] == 'PrivateMessage') console.log(data[0] + ' -> ' + data[1] + ' -> ' + new Buffer(data[2], 'base64').toString());
});

client.on('GroupMessage', function (data) {
    "use strict";

    console.log('from ' + data[1] + ' -> ' + data[2]);
});

run().then(function (_) {});
