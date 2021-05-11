const fetch = require('node-fetch');
const url = require('url');

const util = require('./src/util');

class ZTECPE {
    constructor(hostname = '192.168.1.1'){
        this.address = hostname;
        this.util = util;
    }

    // UTIL
    goformSet(endpoint, content = {}){
        const options = Object.assign(
            {
                goformId: endpoint,
                isTest: false,
            },
            content,
        );
        const search = new URLSearchParams();
        for(const option of Object.entries(options)) search.append(option[0], option[1]);
        return fetch.default(
            url.format({
                protocol: 'http',
                hostname: this.address,
                pathname: 'goform/goform_set_cmd_process',
            }),
            {
                method: 'POST',
                body: search,
            }
        )
        .then(r => r.json())
        .catch(e => ({result: 'failure'}));
    }
    goformGet(content = {}){
        const query = Object.assign(
            {
                isTest: false,
                _: new Date().getTime(),
            },
            content,
        );
        return fetch.default(
            url.format({
                protocol: 'http',
                hostname: this.address,
                pathname: 'goform/goform_get_cmd_process',
                query: query,
            })
        )
        .then(r => r.json())
        .catch(e => ({result: 'failure'}));
    }
    goformGetMultiData(items){
        return this.goformGet({
            multi_data: 1,
            cmd: Array.isArray(items) ? items.join(',') : items,
        })
    }
    goformGetSingleData(item){
        return this.goformGet({
            cmd: item,
        })
    }

    // PASSWORD/LOGIN RELATED
    login(password){
        return this.goformSet(
            'LOGIN',
            {
                password: util.stringToBase64(password),
            }
        )
    }
    logout(){
        return this.goformSet('LOGOUT');
    }
    changePassword(oldPassword, newPassword){
        return this.goformSet(
            'CHANGE_PASSWORD',
            {
                newPassword: util.stringToBase64(newPassword),
                oldPassword: util.stringToBase64(oldPassword),
            }
        )
    }
    isLogged(){
        return this.goformGetSingleData('loginfo')
        .then(r => r.loginfo == 'ok');
    }

    // SMS RELATED
    getSMS(page = 0, smsPerPage = 500){
        return this.goformGet(
            {
                cmd: 'sms_data_total',
                page: page,
                data_per_page: smsPerPage,
                mem_store: 1,
                tags: 10,
                order_by: 'order by id desc',
            }
        )
        .then(res => {
            if(Array.isArray(res.messages))
                return res.messages.map(msg => {
                    msg.content = util.contentToString(msg.content);
                    msg.date = util.timeToDate(msg.date);
                    return msg;
                })
            return res;
        })
    }
    sendSMS(number, content){
        return this.goformSet(
            'SEND_SMS',
            {
                Number: number,
                sms_time: util.dateToTime(new Date(), ';'),
                MessageBody: util.stringToContent(content),
                ID: -1,
                encode_type: 'GSM7_default',
            }
        )
    }
    deleteSMS(sms){
        return this.goformSet(
            'DELETE_SMS',
            {
                msg_id: Array.isArray(sms) ? sms.join(';') : sms,
            }
        )
    }

    // NETWORK RELATED
    connect(){
        return this.goformSet(
            'CONNECT_NETWORK',
            {
                notCallback: true,
            }
        )
    }
    disconnect(){
        return this.goformSet(
            'DISCONNECT_NETWORK',
            {
                notCallback: true,
            }
        )
    }

    // STATS RELATED
    getDevices(){
        return this.goformGetSingleData('station_list')
        .then(r => r.station_list)
    }
    getDeviceInfo(){
        return this.goformGetMultiData([
            'wifi_coverage','m_ssid_enable','imei','rssi',
            'imsi','cr_version','wa_version','hardware_version',
            'MAX_Access_num','SSID1','AuthMode','WPAPSK1_encode',
            'm_SSID','m_AuthMode','m_HideSSID','m_WPAPSK1_encode',
            'm_MAX_Access_num','lan_ipaddr','mac_address','msisdn',
            'LocalDomain','wan_ipaddr','static_wan_ipaddr','ipv6_wan_ipaddr',
            'ipv6_pdp_type','pdp_type','opms_wan_mode','ppp_status',
        ])
    }
    getData(){
        return this.goformGetMultiData([
            'modem_main_state','pin_status','opms_wan_mode','loginfo',
            'sms_received_flag','sts_received_flag','signalbar','network_type',
            'network_provider','ppp_status','EX_SSID1','ex_wifi_status',
            'EX_wifi_profile','m_ssid_enable','sms_unread_num','RadioOff',
            'simcard_roam','lan_ipaddr','station_mac','battery_charging',
            'battery_vol_percent','battery_pers','spn_name_data','spn_b1_flag',
            'spn_b2_flag','realtime_tx_bytes','realtime_rx_bytes','realtime_time',
            'realtime_tx_thrpt','realtime_rx_thrpt','monthly_rx_bytes','monthly_tx_bytes',
            'monthly_time','date_month','data_volume_limit_switch','data_volume_limit_size',
            'data_volume_alert_percent','data_volume_limit_unit','roam_setting_option',
            'ota_current_upgrade_state','ota_new_version_state',
        ])
    }
    getLogData(){
        return this.goformGetMultiData([
            'modem_main_state',
            'pin_status',
            'opms_wan_mode',
            'loginfo',
        ])
    }
    getPhonebook(page = 0, numbersPerPage = 500){
        return this.goformGet(
            {
                cmd: 'pbm_data_total',
                page: page,
                data_per_page: numbersPerPage,
                mem_store: 2,
                tags: 10,
                orderBy: 'name',
                isAsc: true,
            }
        )
        .then(res => {
            if(Array.isArray(res.pbm_data))
                return res.pbm_data.map(item => {
                    item.pbm_name = util.contentToString(item.pbm_name)
                    return item;
                })
            return res;
        })
    }
    getSMSData(){
        return this.goformGetSingleData('sms_capacity_info');
    }
    getWifiData(){
        return this.goformGetMultiData([
            'ACL_mode','wifi_mac_black_list',
            'wifi_hostname_black_list',
            'RadioOff','user_ip_addr',
        ])
    }
}

module.exports = ZTECPE;
