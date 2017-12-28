const iconv = require('iconv-lite')

// 编码
const encode = (str: string): string => (new Buffer(iconv.encode(str, 'gbk'))).toString('base64')
// 解码
const decode = (str: string): string => iconv.decode(new Buffer(str, 'base64'), 'gbk')

export {
  encode,
  decode
}
