import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import Vant from 'vant'
// 导入时间过滤器的js
import './utils/dayjs'
// 导入vant样式
import 'vant/lib/index.css'
import '@/styles/index.css'
import '@/styles/icon.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
