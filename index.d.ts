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

export = class ZTECPE {
    constructor(ipAddress?:string)

    goformSet(endpoint:string,content:object)
    goformGet(content:object)
    goformGetMultiData(items:Array<string>|string)
    goformGetSingleData(item:string)

    login(password:string):Promise<any>
    logout():Promise<result>
    changePassword(oldPassword:string,newPassword:string):Promise<result>
    isLogged():Promise<boolean>

    getSMS(page?:number,smsPerPage?:number):Promise<any>
    sendSMS(number:string,content:string):Promise<result>
    deleteSMS(sms:Array<string>|string):Promise<result>

    connect():Promise<result>
    disconnect():Promise<result>

    getDevices():Promise<Array<device>>
    getDeviceInfo():Promise<any>
    getData():Promise<any>
    getLogData():Promise<any>
    getPhonebook():Promise<phone>
    getSMSData():Promise<any>
    getWifiData():Promise<any>
}
