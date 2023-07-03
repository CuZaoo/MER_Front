import axios from 'axios'
import store from '../store/index.js'
import {
	Message
} from 'element-ui';
import router from '../router/index.js'


// 创建一个axois
let http = axios.create({
	baseURL: '/api',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	},
	transformRequest: [function(data) {
		let newData = '';
		for (let k in data) {
			if (data.hasOwnProperty(k) === true) {
				newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
			}
		}
		return newData;
	}]
});
// 添加请求拦截器，在请求头中加token
http.interceptors.request.use(
	config => {
		var token = null;
		if (store.getters.getUserToken != null) {
			token = store.getters.getUserToken;
		} else if (store.getters.getDoctorToken != null) {
			token = store.getters.getDoctorToken;
		}
		if (token) {
			console.log("设置token");
			config.headers.token = token;
		}
		console.log("tokenl了")
		return config;
	},
	error => {
		console.log("失败响应");
		return Promise.reject(error);
	});

// 响应拦截器
http.interceptors.response.use(response => {
	// 对响应数据做些什么
	console.log("获取请求");
	console.log(response);
	if (response.data.status == 0) {
		Message.error({
			message: "错误：" + response.data.message,
			center: true
		})
		return;
	} else if (response.data.status == 301) {
		Message.error({
			message: "token错误：" + response.data.message,
			center: true
		})
		store.dispatch("removeUser");
		router.push({
			path: "/login"
		})
		return;
	} else if (response.data.status == 1 && response.data.message != null && response.data.message !='' ) {
		Message.success({
			message: response.data.message,
			center: true
		})
	}
	return response
}, error => {
	return Promise.reject(error)
})

// 封装请求
function apiAxios(method, url, params, response) {
	http({
		method: method,
		url: url,
		data: method === 'POST' || method === 'PUT' ? params : null,
		params: method === 'GET' || method === 'DELETE' ? params : null,
	}).then(function(res) {
		response(res);
	}).catch(function(err) {
		response(err);
	})
}

export default {
	get: function(url, params, response) {
		return apiAxios('GET', url, params, response)
	},
	post: function(url, params, response) {
		return apiAxios('POST', url, params, response)
	},
	put: function(url, params, response) {
		return apiAxios('PUT', url, params, response)
	},
	delete: function(url, params, response) {
		return apiAxios('DELETE', url, params, response)
	}
}
