import request from '@/config/request'

export function login(actor, params) {
    return request ({
        url: '/login',
        method: 'post',
        data: params
    })
}
