import * as moment from 'moment'
import ioredis = require("ioredis");

import config from "./config";

export function setDiffTimeString(diffDuration: moment.Duration) {
    const str = [];
    diffDuration.years() > 0 ? str.push(`${diffDuration.years()} 年`) : null;
    diffDuration.months() > 0 ? str.push(`${diffDuration.months()} 月`) : null;
    diffDuration.days() > 0 ? str.push(`${diffDuration.days()} 天`) : null;
    diffDuration.hours() > 0 ? str.push(`${diffDuration.hours()} 小时`) : null;
    diffDuration.minutes() > 0 ? str.push(`${diffDuration.minutes()} 分钟`) : null;
    diffDuration.seconds() > 0 ? str.push(`${diffDuration.seconds()} 秒`) : null;
    return str;
}


export class Storage {
    private $redis: ioredis.Redis

    constructor() {
        this.$redis = new ioredis(config.redis.url)
    }

    public redis() {
        return this.$redis;
    }
}

export const localStorage = new Storage();

/**
 *
 * @param qq
 */
export async function isBlacklist(qq: number) {

}

export async function removeBlacklist() {

}