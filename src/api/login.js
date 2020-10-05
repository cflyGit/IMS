import request from '@/config/request'

export function login(params) {
    return request ({
        url: '/login',
        method: 'get',
        data: params
    })
}
