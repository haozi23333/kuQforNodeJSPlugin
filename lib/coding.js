"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iconv = require('iconv-lite');
// 编码
var encode = function (str) { return (new Buffer(iconv.encode(str, 'gbk'))).toString('base64'); };
exports.encode = encode;
// 解码
var decode = function (str) { return iconv.decode(new Buffer(str, 'base64'), 'gbk'); };
exports.decode = decode;
