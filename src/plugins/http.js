// 将axios 改为 vue插件
const MyHttpServer = {}; 

import axios from 'axios'
MyHttpServer.install = (Vue, options) => {

  Vue.portotype.$http = axios
 
}

export default MyHttpServer