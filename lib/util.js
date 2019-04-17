"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iconv = require('iconv-lite');
/**
 * 编码
 */
function encode(str) {
    return (new Buffer(iconv.encode(str, 'gbk'))).toString('base64');
}
exports.encode = encode;
/**
 * 解码
 */
function decode(str) {
    return iconv.decode(new Buffer(str, 'base64'), 'gbk');
}
exports.decode = decode;
function compose(middleware) {
    return (ctx, next) => {
        let index = 0;
        const dispatch = (i) => {
            index = i;
            const cb = middleware[i] || next;
            if (!cb) {
                return Promise.resolve();
            }
            try {
                return Promise.resolve(cb(ctx, () => {
                    return dispatch(i + 1);
                }));
            }
            catch (err) {
                return Promise.reject(err);
            }
        };
        return dispatch(0);
    };
}
exports.compose = compose;
