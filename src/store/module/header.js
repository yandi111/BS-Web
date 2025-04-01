export default {
  state: {
    // 顶部导航激活板块
    headerActiveIndex: "/home",
    spotTradingHearderData:
      localStorage.getItem("SPOT_COIN_INFO") == "undefined"
        ? undefined
        : JSON.parse(localStorage.getItem("SPOT_COIN_INFO")), //现货头部信息
    localTheme: localStorage.getItem("localTheme") || "light",
    //tradingView的时间导航tab选项
    tradingTabsActive: Array.isArray(
      JSON.parse(localStorage.getItem("TRADING_TAB_ACTIVE"))
    )
      ? JSON.parse(localStorage.getItem("TRADING_TAB_ACTIVE"))
      : [],
    spotsTabsActive: Array.isArray(
      JSON.parse(localStorage.getItem("SPOT_TAB_ACTIVE"))
    )
      ? JSON.parse(localStorage.getItem("SPOT_TAB_ACTIVE"))
      : [],
    searchSymbolList: [],
  },
  getters: {
    // 获取顶部导航激活板块
    getHeaderActiveIndex: (state) => state.headerActiveIndex,

    //tradingView的时间导航tab选项
    getTradingActive: (state) => state.tradingTabsActive,
    getSpotsTabsActive: (state) => state.spotsTabsActive,
    //获取现货头部信息
    getSpotTradingHearderData: (state) => {
      let spotTradingHearderData = JSON.parse(
        localStorage.getItem("SPOT_COIN_INFO")
      );
      return spotTradingHearderData;
    },
    //顶部搜索交易对数组
    getSearchSymbolList: (state) => state.searchSymbolList,

    getLocalTheme: (state) => state.localTheme,
  },
  mutations: {
    // 设置顶部导航激活板块
    setHeaderActiveIndex(state, payload) {
      state.curIndex = payload;
    },
    setTradingActive(state, payload) {
      // payload 判断是不是数组
      const arr = Array.isArray(payload) ? payload : [];
      state.tradingTabsActive = arr;
      localStorage.setItem("TRADING_TAB_ACTIVE", JSON.stringify(arr));
    },
    setSpotsTradingActive(state, payload) {
      const arr = Array.isArray(payload) ? payload : [];
      state.spotsTabsActive = arr;
      localStorage.setItem("SPOT_TAB_ACTIVE", JSON.stringify(arr));
    },
    setSpotTradingHearderData(state, payload) {
      localStorage.setItem("SPOT_COIN_INFO", JSON.stringify(payload));
      state.spotTradingHearderData = payload;
    },

    setSearchSymbolList(state, payload) {
      const arr = Array.isArray(payload) ? payload : [];
      state.searchSymbolList = arr;
    },

    setLocalTheme(state, payload) {
      state.localTheme = payload;
    },
  },
  actions: {
    // 提交顶部导航激活板块
    handleHeaderActiveIndex({ commit }, payload) {
      commit("setHeaderActiveIndex", payload);
    },
    handleSpotTradingHearderData({ commit }, payload) {
      commit("setSpotTradingHearderData", payload);
    },
    handleLocalTheme({ commit }, payload) {
      commit("setLocalTheme", payload);
    },
  },
};
