// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/icon/iconfont.css'
import echarts from 'echarts'
import tim from './tim'
import TIM from 'tim-js-sdk'
import store from './vuex/store'
import filters from './filters' //将全部过滤器放在 filters/index.js 中便于管理

// 注册全局过滤器
filters(Vue)

window.tim = tim
window.TIM = TIM
window.store = store
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.$echarts = echarts
Vue.prototype.$store = store
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})