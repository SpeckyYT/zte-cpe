module.exports = {
    contentToString(content = ''){
        const matches = content.match(/([0-9a-f]{1,4})/gi) || [];
        let string = '';
        for(const match of matches)
            string += eval(`"\\u${match.padStart(4, '0')}"`);
        return string;
    },
    stringToContent(string = ''){
        let content = '';
        for(let i = 0; i < string.length; i++)
            content += string.codePointAt(i).toString(16).padStart(4, '0');
        return content.toUpperCase();
    },
    stringToBase64(string = ''){
        return Buffer.from(string,'utf-8').toString('base64');
    },
    base64ToString(base64 = ''){
        return Buffer.from(base64,'base64').toString('utf-8');
    },
    timeToDate(time = '', separator = ','){
        const [
            year, month, day,
            hour, minute, second,
            tz,         // not sure what this one is
        ] = time.split(separator).map(data => parseInt(data));
        return new Date(2000+year,month,day,hour,minute,second);
    },
    dateToTime(date = new Date(), separator = ','){
        return [
            date.getFullYear() - 2000,
            date.getMonth(),
            date.getDay(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            '+2',               // still not sure what this is
        ]
        .map(n => `${n}`.padStart(2,'0'))
        .join(separator);
    },
}
