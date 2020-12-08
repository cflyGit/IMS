import axios from 'axios'

const headers = {
    'Accept': "*",
    "Content-type": "application/json"
};
export const Request_ = axios.create({
    headers: headers,
    timeout: 12000,
});

export function statisticDataDemo(){
    return Request_({
        url: 'https://api.github.com/repos/vueComponent/ant-design-vue',
        method: 'get'
    })
}