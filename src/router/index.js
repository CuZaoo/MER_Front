//引入vue
import Vue from 'vue';
//引入vue-router
import VueRouter from 'vue-router';
// 引入vuex
import store from '../store/index.js'
//第三方库需要use一下才能用
Vue.use(VueRouter)
import main from '../pages/index.vue'

import error from '../pages/error/index.vue'

//定义routes路由的集合，数组类型
const routes = [
	//单个路由均为对象类型，path代表的是路径，component代表组件

	{
		name: 'Main',
		path: '/',
		component: main
	},
]

//实例化VueRouter并将routes添加进去
const router = new VueRouter({
	//ES6简写，等于routes：routes
	routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router
//
// // 路由守卫
// router.beforeEach((to, from, next) => {
// 	if (to.matched.length === 0) { //匹配前往的路由不存在
// 		from.name ? next({
// 			name: from.name
// 		}) : next('/error'); //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
// 	} else if (to.meta.requiresAuth && store.getters.getUserToken == null && store.getters.getDoctorToken == null) {
// 		store.dispatch("removeUser");
// 		next({
// 			path: '/login'
// 		})
// 	} else if (to.path === '/login' && (store.getters.getUserToken != null && store.getters.getDoctorToken != null)) {
// 		next({
// 			path: '/'
// 		})
// 	} else {
// 		next()
// 	}
// })
//
// // 解决Redirected when going from异常
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
// 	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
// 	return originalPush.call(this, location).catch(err => err)
// }
