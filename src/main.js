import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import 'babel-polyfill'
import VueSocketIO from 'vue-socket.io'
Vue.use(ElementUI)
import Api from './api/index.js';

Vue.prototype.$api = Api;

Vue.use(new VueSocketIO({
    debug: true,// 生产环境关闭，打开可在控制台查看socket连接和事件监听的信息
    options: {
        autoConnect: false //创建时是否自动连接，默认关闭，使用时用open开启链接
    },
    connection: 'http://127.0.0.1:5000' //链接地址
}))

new Vue({
    el: '#app',
    router,
    store,//使用store
    render: h => h(App),
})



Vue.filter('filterTime', function (times) {
    const time = new Date(times)
    let y = time.getFullYear()
    let m = time.getMonth() + 1
    let d = time.getDate()
    let h = time.getHours()
    // let min = time.getMinutes()
    // let s = time.getSeconds()
    //  这个处理函数return 一个数据
    return y + "年" + m + "月" + d + "日" + h + "时"
})