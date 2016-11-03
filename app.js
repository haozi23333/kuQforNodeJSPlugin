"use strict";

var _lib = require("./lib");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by haozi on 10/23/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var client = new _lib.Client();
var api = new _lib.Api(client);

// client.on('PrivateMessage',(data)=>{
//     "use strict";
//     if(data.fromQQ == '820950794')
//     {
//         api.PrivateMessage('820950794','[CQ:image,file=81D06774959C4CDDE75F588DC32D50C0.jpg]',_=>{})
//     }
// })


client.use(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return next();

                    case 2:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}()).use(function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(data, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return next();

                    case 2:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

var r = new _lib.Route({
    prefix: 'haozi'
});

r.reg('/:cmd', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(data) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5) {
        return _ref3.apply(this, arguments);
    };
}());
client.use(r.routes());

var f = new _lib.Route({
    prefix: 'cao'
});

f.reg('/hello/:cmd', function (data) {
    "use strict";

    console.log(data);
});

client.use(f.routes());

client.listen(11235, 25565);
