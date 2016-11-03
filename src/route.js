/**
 * Created by haozi on 11/1/2016.
 */

    import pathToRegexp from 'path-to-regexp'
    import isGeneratorFunction from 'is-generator-function'




class Route {
    /**
     *  构造路由
     * @param opts
     * @param opts.commas 命令分隔符 默认空格
     * @param opts.prefix 命令前缀  默认空
     */
    constructor(opts) {
        this.opts = opts || {}
        this.opts.commas  = this.opts.commas || ' '
        if(!opts.prefix)
            throw Error('opts.prefix must be existed')
        this.m = []
        this.prefixReg = new RegExp(this.opts.commas||' ','g')
    }

    /**
     * 创建路由
     * @param path 路由参数
     * @param fn   回调函数
     * @param opts  设置
     */
    reg(path,fn,opts={}){
        if(!path)
            throw Error('path must be existed')
        if(!fn)
            throw Error('callback must be a function')
        if(isGeneratorFunction(fn)){
            fn = convert(fn)
        }
        opts = opts || {}

        let r = {
            regexp : pathToRegexp(path),
            fn : fn,
            prefix:this.opts.prefix||'/'
        }
        this.m.push(r)
        return this
    }

    /**
     *
     * @returns {function()}
     */
    routes(){
        console.log(1);
        return async (data,next) => {
            let msg = (data.content || '').replace(this.prefixReg,'/')
            if(!data.content.split(this.opts.commas)[0]==this.opts.prefix)
                return
            msg = msg.replace(this.opts.prefix+'/','/')
            console.log('path ->'+msg)
            for(var i=0;i<this.m.length;i++){
                let g = this.m[i].regexp.exec(msg)
                if (g) {
                    data.body = {}
                    this.m[i].regexp.keys.map((j, _i)=> {
                        try{
                            data.body[j.name]  = JSON.parse(g[_i+1])
                        }catch (e){
                            data.body[j.name] = g[_i + 1]
                        }
                    })
                    await this.m[i].fn(data)
                }
            }
            await next()
        }
    }
}
export default Route