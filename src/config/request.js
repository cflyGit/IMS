import axios from 'axios'
// import {ActionContext as store} from "vuex";
import store from '@/store'
import {message, Modal} from "ant-design-vue"
import yanRouter from "../router";
// import yanRouter from "../router";
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

request.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers = {
            'Authorization': store.getters.token,
        };
        // console.log(config.headers)
    }
    return config
}, error => {
    Promise.reject(error)
})

request.interceptors.response.use(
    response => {

        let res = response.data;
        console.log(res)
        if (res.success !== undefined && res.success === false) {

            // 1500 - 1999 用户交互
            if (res.errorCode > 1499 && res.errorCode < 2000) {
                message.error(res.errorMsg);
                return res;
            }

            // 2000 - 2999 用户错误
            if (res.errorCode > 1999 && res.errorCode < 3000) {
                // message.error(res.errorMsg);
                    Modal.error({
                        title: "出错",
                        content: res.errorMsg + "。 请重新登录",
                        onOk: Logout,
                    })
            }

            // common fail 999
            if (res.errorCode === 999) {
                message.error(res.errorMsg);
            }

            // logout success 201
            if (res.errorCode === 201) {
                message.success(res.errorMsg);
            }

            /**
             * 403: token
             */
            if (res.errorCode === 403) {
                Modal.error({
                    title: "无权限",
                    content: "抱歉，你无权访问此内容！",
                })
            }
        }else { // res.code == 200 正常
            return res
        }
    }
)

function Logout() {
    console.log("logout");
    store.commit("logout");
    yanRouter.push("/login");
}

export default request