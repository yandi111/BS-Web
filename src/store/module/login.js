export default {
  state: {
    // token: getToken(),
    // token: null,
    userInfo: null,
    // 用户状态
    userStatus: {},
    //是否是中国用户
    isChina:true,
    hoverValue:false,
    uid:'',
    nickname:'',
    avatar:'',
    vipLevel:'',
    accountList:localStorage.getItem('EMAI_LIST')|| []
  },
  getters: {
    // 获取token
    // getToken: (state) => state.token,
    // 确认是否登录
    isLogin: (state) => state.token !== null,
    userInfo: (state) => state.userInfo,
    userStatus: (state) => state.userStatus,
    //中国用户
    getIsChina:state => state.isChina,

   getUid:state => state.uid,
   getNickname:state => state.nickname,
   getAvatar:state => state.avatar,
   getVipLevel:state => state.vipLevel,
   getAccountList:state => state.accountList
  },
  mutations: {
    // 设置token
    // setToken(state, payload) {
    //   state.token = payload;
    //   state.curIndex = payload;
    //   setToken(payload)
    // },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    // 用户状态
    setUserStatus(state, payload) {
      state.userStatus = payload;
    },
    //中国用户
    setIsChina(state, payload) {
      state.isChina = payload
    },
    setHoverValue(state, payload) {
      state.hoverValue = payload
    },


   setUid(state, payload) {
      state.uid = payload
    },
    setNickname(state, payload) {
      state.nickname = payload
    },
    setAvatar(state, payload) {
      state.avatar = payload
    },
    setVipLevel(state, payload) {
      state.vipLevel = payload
    },
    setAccountList(state, payload) {
      state.accountList = payload
    },
  },
  actions: {
    // 提交token
    // handleToken({ commit }, payload) {
    //   commit("setToken", payload);
    // },
    // handleLogOut({ state, commit }) {
    //   const token = getToken();
    //   return new Promise((resolve, reject) => {
    //     loginOut({ token: token })
    //       .then((res) => {
    //         commit("setToken", null);
    //         commit("setUserInfo", null);
    //         commit("setUserStatus", null);
    //         commit("setCommunityPersonalInformation", null);
    //         removeToken();
    //         Local.removeLocal("token");
    //         resolve();
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },
    // In your Vuex store actions
    // getUserInfo({ commit }) {
    //   return infoHome()
    //     .then((res) => {
    //       console.log('123');
    //       const userInfo = res.data.data;
    //       commit("setUserInfo", userInfo);
    //       return userInfo;
    //     })
    //     .catch((err) => {
    //       throw err;
    //     });
    // },

    // getUserStatus({ commit }) {
    //   return userStatus()
    //     .then((res) => {
    //       commit("setUserStatus", res.data);
    //       return res.data;
    //     })
    //     .catch((err) => {
    //       throw err;
    //     });
    // },
    // 中国用户
    handleIsChina({ commit }, payload) {
      commit('setIsChina', payload)
    },
  },
};
