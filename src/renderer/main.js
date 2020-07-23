import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/theme/index.css'
import '@/assets/iconfont/iconfont.css'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
//Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

Vue.prototype.$postData = async function postData(url, data = null) {
  const response = await fetch(url, {
    body: data,
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    referrer: 'no-referrer',
  })
  return await response.json() // parses response to JSON
}