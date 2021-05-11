module.exports = {
    contentToString(content){
        return Buffer.from(content,'hex').filter(n=>n).toString('utf-8');
    },
    stringToContent(string){
        const content = [];
        for(const byte of Buffer.from(string,'utf-8')) content.push(0,byte);
        return Buffer.from(content).toString('hex');
    },
    stringToBase64(string){
        return Buffer.from(string,'utf-8').toString('base64');
    },
    base64ToString(base64){
        return Buffer.from(base64,'base64').toString('utf-8');
    },
    timeToDate(time, separator = ','){
        const [
            year, month, day,
            hour, minute, second,
            tz,         // not sure what this one is
        ] = time.split(separator).map(data => parseInt(data));
        return new Date(2000+year,month,day,hour,minute,second);
    },
    dateToTime(date, separator = ','){
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
