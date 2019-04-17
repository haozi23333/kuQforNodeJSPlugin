"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App = /** @class */ (function () {
    function App() {
        this.middleWares = [];
    }
    /**
    * 将所有中间件组合起来
    * @param middleware 中间件的数组
    * @returns {(ctx:Context, next?:Promise)=>any}
    * @api private
    */
    App.prototype.compose = function (middleware) {
        return function (ctx, next) {
            var index = 0;
            var dispatch = function (i) {
                index = i;
                var cb = middleware[i] || next;
                if (!cb) {
                    return Promise.resolve();
                }
                try {
                    return Promise.resolve(cb(ctx, function () {
                        return dispatch(i + 1);
                    }));
                }
                catch (err) {
                    return Promise.reject(err);
                }
            };
            return dispatch(0);
        };
    };
    App.prototype.callback = function () {
        var _this = this;
        var fn = this.compose(this.middleWares);
        return function (ctx) {
            fn(ctx).then(function () { return false; }).catch(_this);
        };
    };
    App.prototype.use = function (fn) {
        this.middleWares.push(fn);
        return this;
    };
    App.prototype.onError = function (err) {
        console.error(err);
    };
    return App;
}());
exports.App = App;
