export default {
  state: {
    guideMask_isShow: false,
    guideType: "homeGuidanceStatus", //默认首页
    currentMarket: localStorage.getItem("CURRENT_MARKET") || "BTC/USDT", 
    spotCurrentMarket:
      localStorage.getItem("SPOT_CURRENT_MARKET") || "BTC/USDT",
    spotCurrentCoinId: localStorage.getItem("SPOT_CURRENT_COINID") || 1,
    theme:
      localStorage.getItem("theme") == null
        ? "light"
        : localStorage.getItem("theme"),
    contractSelectNum: localStorage.getItem("contractSelectNum") || 1,
    SpotSelectNum: localStorage.getItem("SpotSelectNum") || 1,
    whetherInTheCollection: false,
    unreadNum: 0, //未读信息
    showNum: 1,
    otcStatusObj: {},
    merchantInfos: {}, //用户或商户信息
    userLevels: null,
    all_symbolStatus: 1, //全部交易对状态 0 禁止 1启用
    /*
    status 0 禁用 1 启用
    symbol 交易对 BTC/USDT
    */
    contract_symbolStatus: {},
    spot_symbolStatus: {},
  },
  getters: {
    getSpotSelectNum: (state) => state.SpotSelectNum,
    getOtcStatusObj: (state) => state.otcStatusObj,
    getMerchantInfo: (state) => state.merchantInfos,
    getUserLevel: (state) => state.userLevels,
    getContractSelectNum: (state) => state.contractSelectNum,
    //交易设置弹窗
    getTguideMask_isShow: (state) => state.guideMask_isShow,

    //合约当前交易对
    getCurrntCoinMarket: (state) => state.currentMarket,
    //现货当前交易对
    getSpotCurrntCoinMarket: (state) => state.spotCurrentMarket,
    //现货当前交易对id
    getSpotCurrentCoinId: (state) => state.spotCurrentCoinId,

    getTheme: (state) => {
      document.documentElement.dataset.theme = state.theme;
      return state.theme;
    },
    getGuideType: (state) => state.guideType,
    getUnreadNum: (state) => state.unreadNum,
    getShowNum: (state) => state.showNum,
    getCollectionState: (state) => {
      return state.whetherInTheCollection;
    },

    getAll_symbolStatus: (state) => state.all_symbolStatus,
    getContract_symbolStatus: (state) => state.contract_symbolStatus,
    getSpot_symbolStatus: (state) => state.spot_symbolStatus,
  },
  mutations: {
    setSpotSelectNum(state, payload) {
      state.SpotSelectNum = payload;
      localStorage.setItem("SpotSelectNum", payload || 1);
    },
    setContractSelectNum(state, payload) {
      state.contractSelectNum = payload;
      localStorage.setItem("contractSelectNum", payload || 1);
    },
    setguideMask_isShow(state, payload) {
      state.guideMask_isShow = payload;
    },
    setCurrentMarket(state, payload) {
      state.currentMarket = payload;
      localStorage.setItem("CURRENT_MARKET", payload);
    },
    setSpotCurrentMarket(state, payload) {
      state.spotCurrentMarket = payload;
      localStorage.setItem("SPOT_CURRENT_MARKET", payload);
    },
    setSpotCurrentCoinId(state, payload) {
      (state.spotCurrentCoinId = payload),
        localStorage.setItem("SPOT_CURRENT_COINID", payload);
    },

    setTheme(state, payload) {
      state.theme = payload;
      localStorage.setItem("theme", payload);
      document.documentElement.dataset.theme = payload;
    },
    setCollectionState(state, payload) {
      state.whetherInTheCollection = payload;
    },
    setGuideTypeState(state, payload) {
      state.guideType = payload;
    },
    setUnreadState(state, payload) {
      state.unreadNum = payload;
    },
    setShowNumState(state, payload) {
      state.showNum = payload;
    },
    setOtcStatusObj(state, payload) {
      state.otcStatusObj = payload;
    },
    setMerchantInfo(state, payload) {
      state.merchantInfos = payload;
    },
    setUserLevel(state, payload) {
      state.userLevels = payload;
    },

    //全部交易对状态
    setAll_symbolStatus(state, payload) {
      state.all_symbolStatus = payload;
    },
    //合约交易对状态
    setContract_symbolStatus(state, payload) {
      state.contract_symbolStatus = payload;
    },
    //现货交易对状态
    setSpot_symbolStatus(state, payload) {
      state.spot_symbolStatus = payload;
    },
  },
  actions: {
    handleguideMask_isShow({ commit }, payload) {
      commit("setguideMask_isShow", payload);
    },
    handleCurrentMarket({ commit }, payload) {
      commit("setCurrentMarket", payload);
    },
    handleSpotCurrentMarket({ commit }, payload) {
      commit("setSpotCurrentMarket", payload);
    },
    handleSpotCurrentCoinId({ commit }, payload) {
      commit("setSpotCurrentCoinId", payload);
    },

    handleTheme({ commit }, payload) {
      commit("setTheme", payload);
    },
    handleCollectionState({ commit }, payload) {
      commit("setCollectionState", payload);
    },
    handleGuideType({ commit }, payload) {
      commit("setGuideTypeState", payload);
    },
    handleUnreadState({ commit }, payload) {
      commit("setUnreadState", payload);
    },
    handleShowNumState({ commit }, payload) {
      commit("setShowNumState", payload);
    },
    handleSetOtcStatusObj({ commit }, payload) {
      commit("setOtcStatusObj", payload);
    },
    handleSetMerchantInfo({ commit }, payload) {
      commit("setMerchantInfo", payload);
    },
    handleSetUserLevel({ commit }, payload) {
      commit("setUserLevel", payload);
    },
    handleAll_symbolStatus({ commit }, payload) {
      commit("setAll_symbolStatus", payload);
    },
    handleContract_symbolStatus({ commit }, payload) {
      commit("setContract_symbolStatus", payload);
    },
    handleSpot_symbolStatus({ commit }, payload) {
      commit("setSpot_symbolStatus", payload);
    },
  },
};
