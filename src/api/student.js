import request from '@/config/request'

export function logout(params) {
    return request({
        url: 'student/logout',
        method: 'get',
        data: params
    })
}

export function getUserInfo(params) {
    return request({
        url: 'student/info/get',
        method: 'get',
        data: params
    })
}

export function getUserList(reqData) {
    return request({
        url: 'student/list/get',
        method: 'get',
        data: reqData
    })
}