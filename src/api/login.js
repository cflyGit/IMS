import request from '@/config/request'

export function login(actor, params) {
    return request ({
        url: '/' + actor + '/login',
        method: 'post',
        data: params
    })
}
