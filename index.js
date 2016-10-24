/**
 * Created by haozi on 10/23/2016.
 */


require("babel-core/register");
require("babel-polyfill");
// require("./app");
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cov = exports.Client = exports.Api = undefined;

var _api = require('./lib/api');

var _api2 = _interopRequireDefault(_api);

var _client = require('./lib/client');

var _client2 = _interopRequireDefault(_client);

var _iconv = require('iconv');

var _iconv2 = _interopRequireDefault(_iconv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Iconv = _iconv2.default.Iconv; /**
 * Created by haozi on 10/23/2016.
 */

var cov = new Iconv('UTF-8', 'GBK');

exports.Api = _api2.default;
exports.Client = _client2.default;
exports.cov = cov;