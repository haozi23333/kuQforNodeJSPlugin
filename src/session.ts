
export default class Session {

    private map = new Map();

    public get(key: string) {
        return this.map.get(key);
    }

    public set(key: string, value: any) {
        return this.map.set(key, value);
    }
}