import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from "ant-design-vue"
import 'ant-design-vue/dist/antd.css'
import form from 'ant-design-vue/dist/antd.css'

Vue.use(Antd);
Vue.prototype$form = form
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
