import * as moment from 'moment'

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
