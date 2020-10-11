import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import Antd from "ant-design-vue"
import 'ant-design-vue/dist/antd.css'
import form from 'ant-design-vue/dist/antd.css'
import qs from 'qs'

Vue.use(Antd);
Vue.prototype$form = form;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$qs = qs;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
