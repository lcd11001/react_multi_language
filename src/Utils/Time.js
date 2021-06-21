// https://gist.github.com/vankasteelj/74ab7793133f4b257ea3
export const zeroPadding = (num, size) =>
{
    return ('000' + num).slice(size * -1);
}

export const sec2time = (timeInSeconds) =>
{


    var time = parseFloat(timeInSeconds).toFixed(2),
        // hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60);

    var milliseconds = time.slice(-2);

    return zeroPadding(minutes, 2) + ':' + zeroPadding(seconds, 2) + '.' + zeroPadding(milliseconds, 2);

    // return zeroPadding(hours, 2) + ':' + zeroPadding(minutes, 2) + ':' + zeroPadding(seconds, 2) + '.' + zeroPadding(milliseconds, 2);

    // return zeroPadding(hours, 2) + ':' + zeroPadding(minutes, 2) + ':' + zeroPadding(seconds, 2);
}

export const getCurrentTime = (separatorDate = '/', separatorTime = ':', separatorDateTime = ' ') =>
{
    let now = new Date()

    let date = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()

    let hours = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()

    let DATE = `${year}${separatorDate}${zeroPadding(month, 2)}${separatorDate}${zeroPadding(date, 2)}`
    let TIME = `${zeroPadding(hours, 2)}${separatorTime}${zeroPadding(minutes, 2)}${separatorTime}${zeroPadding(seconds, 2)}`

    return `${DATE}${separatorDateTime}${TIME}`
}

export const sec2FullTime = (timeInMiliSeconds, separatorDate = '/', separatorTime = ':', separatorDateTime = ' ') =>
{

    if (isNaN(timeInMiliSeconds))
        return ''

    let now = new Date(timeInMiliSeconds)

    let date = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()

    let hours = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()

    let DATE = `${year}${separatorDate}${zeroPadding(month, 2)}${separatorDate}${zeroPadding(date, 2)}`
    let TIME = `${zeroPadding(hours, 2)}${separatorTime}${zeroPadding(minutes, 2)}${separatorTime}${zeroPadding(seconds, 2)}`

    return `${DATE}${separatorDateTime}${TIME}`
}
