import request from '@/config/request'

export function deleteOne(url) {
    return request({
        url: url,
        method: 'get'
    })
}

export function search(url) {
    return request({
        url: url,
        method: 'get',
    })
}

export function IMSget(url) {
    return request({
        url: url,
        method: 'get',
    })
}

export function insert(actor, table) {
    return request({
        url: '/' + actor + '/insert',
        method: 'post',
        data: table
    })
}

export function update(actor, params) {
    return request({
        url: '/' + actor + '/update',
        method: 'post',
        data: params,
    })
}

export function post(url, params) {
    return request({
        url: url,
        method: 'post',
        data: params,
    })
}