// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MyHttpServer from './plugins/http.js'
import moment from 'moment'

// import axios from 'axios'
// Vue.prototype.$http = axios
// 引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入公共css
import  './assets/css/reset.css'

// 使用Vue插件
Vue.use(ElementUI);
Vue.use(MyHttpServer);

Vue.config.productionTip = false

// 全局过滤器
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
