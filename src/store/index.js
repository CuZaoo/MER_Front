import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index.js';
Vue.use(Vuex);
const store = new Vuex.Store(
	{
		state:{
			// vuex保存的数据
			//用户： 
			//登录用户的用户信息数据
			nowUserInfoId:sessionStorage.getItem("nowUserInfoId")?sessionStorage.getItem("nowUserInfoId"):null,
			nowUserInfo:sessionStorage.getItem("nowUserInfo")?sessionStorage.getItem("nowUserInfo"):null,
			errorMessage:'',
			userToken:sessionStorage.getItem("userToken")?sessionStorage.getItem("userToken"):null,
			doctorToken:sessionStorage.getItem("doctorToken")?sessionStorage.getItem("doctorToken"):null,
			nowOrder:sessionStorage.getItem("nowOrder")?sessionStorage.getItem("nowOrder"):null,
			nowReport:sessionStorage.getItem("nowReport")?sessionStorage.getItem("nowReport"):null,
		},
		mutations:{
			setNowUserInfoId(state,userId){
				return state.nowUserInfoId = userId;
			},
			setNowUserInfo(state,user){
				return state.nowUserInfo = user;
			},
			setErrorMessage(state,error){
				return state.errorMessage = error;
			},
			setUserToken(state,userToken){
				return state.userToken = userToken;
			},
			setDoctorToken(state,doctorToken){
				return state.doctorToken = doctorToken;
			},
			setNowOrder(state,order){
				return state.nowOrder = order;
			},
			setNowReport(state,nowReport){
				return state.nowReport = nowReport;
			},
			removeNodeUserInfo(state){
				sessionStorage.removeItem("nowUserInfo");
				state.nowUserInfo = null;
			},
			removeNodeUserInfoId(state){
				sessionStorage.removeItem("nowUserInfoId");
				state.nowUserInfoId = null;
			},
			removeUserToken(state){
				sessionStorage.removeItem("userToken");
				state.userToken = null;
			},
			removeDoctorToken(state){
				sessionStorage.removeItem("doctorToken");
				state.doctorToken = null;
			}
			
			
		},
		actions:{
			// vuex中做异步等操作，然后通知mutations的地方
			setNowUserInfoId(context,userId){
				sessionStorage.setItem("nowUserInfoId",userId);
				context.commit("setNowUserInfoId",userId);
			},
			setNowUserInfo(context,user){
				let userInfo = JSON.stringify(user);
				context.commit("setNowUserInfo",userInfo);
				sessionStorage.setItem("nowUserInfo",userInfo);
			},
			setUserToken(context,userToken){
				context.commit("setUserToken",userToken);
				// userToken设置至会话
				sessionStorage.setItem("userToken",userToken);
			},
			setDoctorToken(context,doctorToken){
				context.commit("setDoctorToken",doctorToken);
				// doctorToken设置至会话
				sessionStorage.setItem("doctorToken",doctorToken);
			},
			setNowOrder(context,order){
				context.commit('setNowOrder',order);
				sessionStorage.setItem("nowOrder",order);
			},
			setNowReport(context,nowReport){
				let nowReports = JSON.stringify(nowReport);
				context.commit('setNowReport',nowReports);
				sessionStorage.setItem("nowReport",nowReports);
			},
			removeUser(context){
				context.commit("removeNodeUserInfo");
				context.commit("removeNodeUserInfoId");
				context.commit("removeUserToken");
				context.commit("removeDoctorToken");
			}
		},
		getters:{
			// 实时监听state中数据最新变化的地方
			getNowUserInfoId:state=>state.nowUserInfoId,
			getNowUserInfo:state=>{
				return JSON.parse(state.nowUserInfo);
			},
			getUserToken:state=>state.userToken,
			getDoctorToken:state=>state.doctorToken,
			getNowOrder:state=>state.nowOrder,
			getNowReport:state=>{
				return JSON.parse(state.nowReport);
			},
		}
	}
);
 
export default store;