import * as pathToRegExp from 'path-to-regexp'

export default class RouteLayer {

    private path: string;
    private param_names: string[]
    public regexp: RegExp;
    private option: any;

    private stack: any[] = [];

    constructor(path: string, middleware: any, option: any) {
        this.path = path;
        this.param_names = [] as string[];
        this.option = option;

        this.stack = Array.isArray(middleware) ? middleware : [middleware];
        this.regexp = pathToRegExp(path, this.param_names as any, this.option);
    }

    public match(path: string) {
        return this.regexp.test(path);
    }
}