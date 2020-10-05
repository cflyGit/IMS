import request from '@/config/request'

export function logout(params) {
    return request({
        url: 'admin/logout',
        method: 'get',
        data: params
    })
}

export function getUserInfo(params) {
    return request({
        url: 'admin/info/get',
        method: 'get',
        data: params
    })
}

export function getUserList(reqData) {
    return request({
        url: 'admin/list/get',
        method: 'get',
        data: reqData
    })
}