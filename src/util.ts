const iconv = require('iconv-lite')


/**
 * 编码
 */
export function encode(str: string) {
    return (new Buffer(iconv.encode(str, 'gbk'))).toString('base64')
}

/**
 * 解码
 */
export function decode(str: string) {
    return iconv.decode(new Buffer(str, 'base64'), 'gbk')
}
