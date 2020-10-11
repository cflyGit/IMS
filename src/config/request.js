import axios from 'axios'
// import store from '@/store'
// import {getToken} from '@/config/auth'

const headers = {
    "Accept": "*",
    'Content-Type': 'application/json;charset=utf-8',
};

export let baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8989' : 'http://localhost:8989';

// create axios instance
let request = axios.create( {
    headers: headers,
    baseURL: baseUrl,
    timeout: 2500
})

// request interceptor
// request.interceptor.request.use(config => {
//     if (store.getters.token) {
//         config.headers = {
//             'Authorization': "Token" + getToken('Token'),
//         };
//     }
//     return config
// }, error => {
//     Promise.reject(error)
// })

// response interceptor
// request.interceptor.reponse.use(
//     response => {
//         const res = reponse.data
//         if (res.code !== 200) {
//             Message:({
//                 message: res.message,
//                 type: 'error',
//                 duration: 5 * 1000
//             })
//
//             /**
//              * 5001: 非法token， 5002: 其他客户端在登录, 5004: token过期
//              */
//             if (res.code == 5001 || res.code.code === 5002 || res.code === 5004) {
//                 MessageBox.comfirm('你已被登出，请重新登录', '确定登出', {
//                     confirmButtonText: '重新登录',
//                     cancelButtonText: '取消',
//                     type: 'warning'
//                 }).then(() => {
//                     store.dispatch('LogOut').then(() => {
//                         location.reload() // 重新实例化veu-router
//                     })
//                 })
//             }
//             return Promise.reject('error')
//         }else { // res.code == 200 正常
//             return response.data
//         }
//     }, error => {
//         Message({
//             message: error.message,
//             type: 'error',
//             duration: 5 * 1000
//         })
//         return Promise.reject(error)
//     }
// )

export default request