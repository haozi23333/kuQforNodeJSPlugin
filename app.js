'use strict';

var _client = require('./lib/client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Iconv = require('iconv').Iconv; /**
                                     * Created by haozi on 10/23/2016.
                                     */

var cov = new Iconv('UTF-8', 'GBK');

var client = new _client2.default(25565);

client.on('data', function (data) {
    "use strict";

    console.log(data);
});

setTimeout(function () {
    "use strict";

    client.emit('send', 'SendPrivateMessage 296409654 ' + cov.convert("SB 0u0 辣鸡").toString('base64'), function (err) {
        if (err) throw err;else console.log('success');
    });
}, 2000);
