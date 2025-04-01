export default {
  state: {
    coinsName:'',
    // 注册页面激活板块 手机/邮箱
    curIndex: 0,
    // 首页手机号码/邮箱
    homeAccount: '',

    authBizEnum:'',
    method:'',
    prompt:'',  // 手机号
    bizId:'',
    authOptions:[],
    password:'',
    inviteCode:'',
    telegramId:''
  },
  getters: {
    // 获取curIndex
    getCurIndex: state => state.curIndex,
    getHomeAccount: state => state.homeAccount,
    
    getAuthBizEnum: (state) => state.authBizEnum,
    getMethod: (state) => state.method,
    getPrompt: (state) => state.prompt,
    getBizId: (state) => state.bizId,
    getTelegramId: (state) => state.telegramId,
    getInviteCode: (state) => state.inviteCode,
    getPassword: (state) => state.password,
    getAuthOptions: (state) => state.authOptions,
  },
  mutations: {
    // 设置激活index
    setCurIndex(state, payload) {
      state.curIndex = payload
    },
    // 设置首页手机号码/邮箱
    setHomeAccount(state, payload) {
      state.homeAccount = payload
    },
    setAuthBizEnum(state, payload) {
      state.authBizEnum = payload;
    },
    setMethod(state, payload) {
      state.method = payload;
    },
    setPrompt(state, payload) {
      state.prompt = payload;
    },
    setBizId(state, payload) {
      state.bizId = payload;
    },

   
    setPassword(state, payload) {
      state.password = payload;
    },
    setInviteCode(state, payload) {
      state.inviteCode = payload;
    },
    setTelegramId(state, payload) {
      state.telegramId = payload;
    },
    setAuthOptions(state, payload) {
      state.authOptions = payload;
    },


  },
  actions: {
    // 提交激活index
    handleCurIndex({ commit }, payload) {
      commit('setCurIndex', payload)
    },
    // 提交首页手机号码/邮箱
    handleHomeAccount({ commit }, payload) {
      commit('setHomeAccount', payload)
    },
  },
}