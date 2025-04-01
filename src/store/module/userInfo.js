// store.js
import {getToken} from "@/libs/utils"; // 引入获取 token 的工具函数
import {infoHome , onLogout} from "@/api/user";
import router from "@/router";
// eslint-disable-next-line no-unused-vars

export default {
 state: {
  userList: {}, // 存储用户信息
  sppUserSecurity: {},
  mobileRebateState: false,
  username: '',
  expireTime: '',
  mobilePhone: '',
  mobileEmail:'',

  token: ''
 },
 getters: {
  getUserList: (state) => state.userList, // 获取用户信息
  getSppUserSecurity: (state) => state.sppUserSecurity, // 获取用户信息
  getMobileRebateState: (state) => state.mobileRebateState, // 获取用户信息
  getUsername: (state) => state.username,
  getExpireTime: (state) => state.expireTime,

  getToken: state => state.token,
  getMobilePhone: state => state.mobilePhone,
  getMobileEmail: state => state.mobileEmail
 },

 mutations: {
  setUserList(state, payload) {
   state.userList = payload; // 更新用户信息
  },
  setMobilePhone(state, payload) {
   state.mobilePhone = payload; // 更新用户信息
  },
  getMobileEmail(state, payload) {
   state.mobileEmail = payload; // 更新用户信息
  },
  setToken(state, val) {
   state.token = val
  },

  clearUserList(state) {
   state.userList = {}; // 清空用户信息
  },
  setSppUserSecurity(state, payload) {
   state.sppUserSecurity = payload; // 更新用户信息
  },
  setMobileRebateState(state, payload) {
   state.mobileRebateState = payload; // 更新用户信息
  },
  setUsername(state, payload) {
   state.username = payload;
  },
  setExpireTime(state, payload) {
   state.expireTime = payload;
  },
 },
 actions: {
  // 退出登陆
  async logOut({commit}) {
   console.log(121212);
   commit('setUserList', {})
   commit('setToken', '')

  //  await router.push('/')
  },




  async loginFN (){
    console.log(8888888);
        Promise.try(async () => {
            return onLogout();
           }).then(res => {
            console.log(res);
           })
  },

  async fetchUserInfo({commit}, token = null) {
    console.log("fetchUserInfo----------",'fetchUserInfo');
    
    console.log(token,getToken(),"getToken()getToken()getToken()");
      
    // let tokeDetli = ''
    // if (token) {
    //   // eslint-disable-next-line no-unused-vars
    //   tokeDetli = token
    // }else {
    //     // eslint-disable-next-line no-unused-vars
    //     tokeDetli = getToken()
    // }
    // if (tokeDetli) {
        Promise.try(async () => {
            return infoHome();
           }).then(response => {
            const {uid, nickname, avatar} = response.data.appUser;
            const {vipLevel, createTime} = response.data.appUserStatus;
            
            const createTimeFn = response.data.lastLoginLog.createTime;

            console.log('createTimeFn----',createTimeFn);
            
           
            
            const {expireTime, limit} = response.data.limits.user_nickname;
            const {
             antiScamCode,
             email,
             fundPassword,
             googleAuthenticator,
             mobilePhone,
             walletAddress
            } = response.data.appUserSecurity;
            commit("setMobilePhone",mobilePhone)
            console.log(response,'emailItememai');
            // 创建用户信息对象
            commit("setUserList", {
             nickname,
             uid,
             vipLevel,
             avatar,
             createTime,
             expireTime,
             createTimeFn,
             antiScamCode, email, fundPassword, googleAuthenticator, mobilePhone, walletAddress, limit
            }); // 提交 mutation 更新用户信息   mobilePhone email
        
            
            // commit("setMobileEmail",email)
            let uservityInfo = mobilePhone ? mobilePhone : email
        
            let timeSum = Date.now() + expireTime;
            let emailList = JSON.parse(localStorage.getItem('EMAI_LIST')) || [];
            let emailItem = {
             account: uservityInfo,
             token,
             expireTime: timeSum,
             nickname,
             uid,
             vipLevel
        
            };
            console.log(emailItem,'emailItememailItem');
            
            // 查找 emailItem 是否存在于 emailList 中
            const index = emailList.findIndex(item => item.uid === emailItem.uid);
        
            if (index !== -1) {
             // 如果存在，移除该项并将其放到数组的开头
             emailList.splice(index, 1); // 移除该项
            }
            // 将 emailItem 添加到数组的开头
            emailList.unshift(emailItem); // 添加到数组开头
            console.log("emailList---------->",emailList);
            
        
            // 将更新后的 emailList 存储到 localStorage
            let emailListPush = JSON.stringify(emailList);
            localStorage.setItem('EMAI_LIST', emailListPush);
            commit("setAccountList", emailListPush);    
           })
        
    // }
   
   
  },






 },
};