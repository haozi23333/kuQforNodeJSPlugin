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


export function compose<T, U>(middleware: T[]) {
    return (ctx: U, next?: Promise<void>) => {
        let index: number = 0
        const dispatch = (i: number) => {
            index = i
            const cb: any = middleware[i] || next
            if (!cb) {
                return Promise.resolve()
            }
            try {
                return Promise.resolve(cb(ctx, ():any =>{
                    return dispatch(i + 1)
                }))
            }catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}