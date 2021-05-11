type result = {
    result: 'success' | 'failure'
}
type device = {
    mac_addr:string
    hostname:string
    ip_addr:string
}
type phone = {
    pbm_id:string
    pbm_index:string
    pbm_location:string
    pbm_name:string
    pbm_number:string
    pbm_type:string
    pbm_anr:string
    pbm_anr1:string
    pbm_email:string
    pbm_sne:string
    pbm_group:string
}
type sms = {
    id:string,
    number:string,
    content:string,
    tag:string,
    date:Date,
    draft_group_id:string
}
type FW_PROTOCOL = 'TCP' | 'UDP' | 'TCP&UDP'
type PF_PROTOCOL = 'None' | 'TCP' | 'UDP' | 'ICMP'
type IPVERSION = 'ipv4' | 'ipv6'

type util = {
    contentToString(content:string):string
    stringToContent(string:string):string
    stringToBase64(string:string):string
    base64ToString(base64:string):string
    timeToDate(time:string):Date
    dateToTime(date:Date):string
}

export = class ZTECPE {
    constructor(ipAddress?:string)

    util:util
    address:string

    goformSet(endpoint:string,content:object)
    goformGet(content:object)
    goformGetMultiData(items:Array<string>|string)
    goformGetSingleData(item:string)

    login(password:string):Promise<any>
    logout():Promise<result>
    isLogged():Promise<boolean>

    getSMS(page?:number,smsPerPage?:number):Promise<Array<sms>>
    sendSMS(number:string,content:string):Promise<result>
    deleteSMS(id:Array<number>|number):Promise<result>

    connect():Promise<result>
    disconnect():Promise<result>

    getDevices():Promise<Array<device>>
    getDeviceInfo():Promise<any>
    getData():Promise<any>
    getLogData():Promise<any>
    getPhonebook():Promise<phone>
    getSMSData():Promise<any>
    getWifiData():Promise<any>

    changePassword(oldPassword:string,newPassword:string):Promise<result>
    setDLNA(name:string,audio:boolean,video:boolean,image:boolean):Promise<result>
    enablePortFiltering(enable:boolean,defaultPolicy:boolean):Promise<result>
    addIPPortFilter(ipversion:IPVERSION,protocol:PF_PROTOCOL):Promise<result>
    deleteIPPortFilter(id:number,idv6:string):Promise<result>
    enablePortForwarding(enable:boolean):Promise<result>
    addPortForward(address:string,portStart:number,portEnd:number,protocol:FW_PROTOCOL):Promise<result>
    deletePortForward(id:Array<number>|number):Promise<result>
    addURLFilter(url:string):Promise<result>
    deleteURLFilter(id:Array<number>|number):Promise<result>
    enableUPnP(enable:boolean):Promise<result>
    enableDMZ(enable:boolean,ip:string):Promise<result>
}
