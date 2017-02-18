/**
 * Created by haozi on 10/23/2016.
 */


require("babel-core/register");
require("babel-polyfill");
require("./app");
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Route = exports.recov = exports.cov = exports.Client = exports.Api = undefined;

var _api = require('./lib/api');

var _api2 = _interopRequireDefault(_api);

var _client = require('./lib/client');

var _client2 = _interopRequireDefault(_client);

var _iconv = require('iconv');

var _iconv2 = _interopRequireDefault(_iconv);

var _route = require('./lib/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by haozi on 10/23/2016.
 */

var Iconv = _iconv2.default.Iconv;
var cov = new Iconv('UTF-8', 'GBK');
var recov = new Iconv('GBK', 'UTF-8');

exports.Api = _api2.default;
exports.Client = _client2.default;
exports.cov = cov;
exports.recov = recov;
exports.Route = _route2.default;