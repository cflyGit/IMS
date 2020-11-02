import request from '@/config/request'

export function logout() {
    return request ({
        url: '/logout',
        method: 'get',
    })
}
