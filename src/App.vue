<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      direction: 'ltr',
      visible: false,
      activeStyleLeft: '',
      userInfo: null,
      userMenus: null
    }
  },
  methods: {
    // changeUserInfo(val, type) {
    // 	this.userInfo = val;
    // 	if (type) {
    // 		this.setDoctorMenu();
    // 	} else {
    // 		this.setUserMenu();
    // 	}
    // },
    // switchDraw() {
    // 	this.direction = 'ltr';
    // 	this.visible = this.visible ? false : true;
    // },
    // // 移入
    // mouseOver(flag) {
    // 	if (flag) {
    // 		this.activeStyleLeft = "left:0px";
    // 	}
    // },
    // mouseLeave() {
    // 	this.activeStyleLeft = "";
    // },
    // openSubMenu(index, indexPath) {},
    // selectMenuItem(index, indexPath) {
    // 	this.visible = false;
    // 	if (index == "/exit") {
    // 		this.$confirm('确认退出登录吗？')
    // 			.then(_ => {
    // 				this.$api.delete("logoutUser", {}, res => {
    // 					this.userInfo = null;
    // 					this.$store.dispatch("removeUser");
    // 					this.userMenus = [{
    // 						cdId: '1',
    // 						menuPath: '/login',
    // 						menuName: "登录",
    // 						menuList: []
    // 					}]
    // 					this.$router.push({
    // 						path: "/login"
    // 					})
    // 				});
    // 			})
    // 			.catch(_ => {});
    //
    // 		return;
    // 	}
    // 	this.$router.push({
    // 		path: index
    // 	});
    //
    // },
    // lookupUser() {
    // 	this.visible = false;
    // 	this.$router.push({
    // 		name: "userInfo",
    // 		params: {
    // 			xxId: null
    // 		}
    // 	});
    // },
    // setUserMenu() {
    // 	this.userMenus = [{
    // 			cdId: '1',
    // 			menuPath: '/',
    // 			menuName: "用户信息",
    // 			menuList: []
    // 		},
    // 		{
    // 			cdId: '2',
    // 			menuPath: '/userOrder',
    // 			menuName: "我的预约",
    // 			menuList: []
    // 		},
    // 		{
    // 			cdId: '3',
    // 			menuPath: '/userReport',
    // 			menuName: "体检报告",
    // 			menuList: []
    // 		},
    // 		// {
    // 		// 	cdId: '4',
    // 		// 	menuPath: '/communicate',
    // 		// 	menuName: "沟通中心",
    // 		// 	menuList: []
    // 		// },
    // 		{
    // 			cdId: '5',
    // 			menuPath: '/exit',
    // 			menuName: "退出登录",
    // 			menuList: []
    // 		}
    // 	]
    // },
    // setDoctorMenu() {
    // 	this.userMenus = [{
    // 			cdId: '1',
    // 			menuPath: '/',
    // 			menuName: "用户信息",
    // 			menuList: []
    // 		},
    // 		{
    // 			cdId: '2',
    // 			menuPath: '/doctorOrder',
    // 			menuName: "预约通知",
    // 			menuList: []
    // 		},
    // 		{
    // 			cdId: '3',
    // 			menuPath: '/doctorReport',
    // 			menuName: "专家诊断",
    // 			menuList: []
    // 		},
    // 		// {
    // 		// 	cdId: '4',
    // 		// 	menuPath: '/communicate',
    // 		// 	menuName: "沟通中心",
    // 		// 	menuList: []
    // 		// },
    // 		{
    // 			cdId: '5',
    // 			menuPath: '/exit',
    // 			menuName: "退出登录",
    // 			menuList: []
    // 		}
    // 	]
    // }
  },
  mounted() {
    // if (this.getNowUserInfo) {
    // 	this.userInfo = this.getNowUserInfo;
    //
    // } else {
    // 	this.userInfo = null;
    // }
    // if (this.getUserToken) {
    // 	this.userMenus = [{
    // 			cdId: '1',
    // 			menuPath: '/',
    // 			menuName: "用户信息",
    // 			menuList: []
    // 		},
    // 		{
    // 			cdId: '2',
    // 			menuPath: '/userOrder',
    // 			menuName: "我的预约",
    // 			menuList: []
    // 		},
    // 		{
    // 			cdId: '3',
    // 			menuPath: '/userReport',
    // 			menuName: "体检报告",
    // 			menuList: []
    // 		},
    // 		// {
    // 		// 	cdId: '4',
    // 		// 	menuPath: '/communicate',
    // 		// 	menuName: "沟通中心",
    // 		// 	menuList: []
    // 		// },
    // 		{
    // 			cdId: '5',
    // 			menuPath: '/exit',
    // 			menuName: "退出登录",
    // 			menuList: []
    // 		}
    // 	]
    // } else if (this.getDoctorToken) {
    // 	this.userMenus = [{
    // 			cdId: '1',
    // 			menuPath: '/',
    // 			menuName: "用户信息",
    // 			menuList: []
    // 		},
    // 		{
    // 			cdId: '2',
    // 			menuPath: '/doctorOrder',
    // 			menuName: "预约通知",
    // 			menuList: []
    // 		},
    // 		{
    // 			cdId: '3',
    // 			menuPath: '/doctorReport',
    // 			menuName: "专家诊断",
    // 			menuList: []
    // 		},
    // 		// {
    // 		// 	cdId: '4',
    // 		// 	menuPath: '/communicate',
    // 		// 	menuName: "沟通中心",
    // 		// 	menuList: []
    // 		// },
    // 		{
    // 			cdId: '5',
    // 			menuPath: '/exit',
    // 			menuName: "退出登录",
    // 			menuList: []
    // 		}
    // 	]
    // } else {
    // 	this.userMenus = [{
    // 		cdId: '1',
    // 		menuPath: '/login',
    // 		menuName: "登录",
    // 		menuList: []
    // 	}]
    // }
  },
  computed: {
    ...mapGetters(['getNowMenuItem', 'getMenu', 'getNowUserInfo', 'getNowUserInfoId', 'getDoctorToken', 'getUserToken']),
  }

}
</script>

<style>
.is_fixed {
  position: fixed;
  top: 3%;
  z-index: 999;
  transition: left 1s, right 1s;
}

.toLeft {
  left: -40px;
}

.toRight {
  right: -40px;
  top: 1%;
}

body,
html {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
</style>
