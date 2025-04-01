export default {
  state: {
    // token
    orderInfo: null,
    // 快捷卖币，用户转换所得获取信息
    fastBuyAndSaleInfo: null,
    // 订单状态
    orderStatus: null,
    //发布币种
    pubSymbol: null,
    //自选区-是否有订单在进行中
    orderInProgress: false,
    selectedCurrency: ''

    
  },
  getters: {
    // 获取order信息
    getOrderInfo: (state) => state.orderInfo,
    // 获取卖出信息
    getFastBuyAndSaleInfo: (state) => state.fastBuyAndSaleInfo,
    // 订单状态
    getOrderStatus: state => state.orderStatus,
    //发布币种
    getPubSymbol: state => state.pubSymbol,
    
    getOrderInProgress: (state) => state.orderInProgress,
    getSelectedCurrency: (state) => state.selectedCurrency,

  },
  mutations: {
    setSelectedCurrency(state, payload) {
      localStorage.setItem('typeBU', payload); // 同步到 localStorage
      state.selectedCurrency = payload;
    },
    // 设置token
    setOrderInfo(state, payload) {
      state.orderInfo = payload;
    },
    // 快捷卖币，用户转换所得获取信息
    setFastBuyAndSaleInfo(state, payload) {
      state.fastBuyAndSaleInfo = payload;
    },
    // 订单状态
    setOrderStatus(state, payload) {
      state.orderStatus = payload;
    },
    //自选区-进行中订单
    setOrderInProgress(state, payload) {
      state.orderInProgress = payload;
    },
    //发布币种
    setPubSymbol(state, payload) {
      state.pubSymbol = payload
    },
  },
  actions: {
    // 提交token
    handleOrderInfo({ commit }, payload) {
      commit("setOrderInfo", payload);
    },
    // 快捷卖币，用户转换所得获取信息
    handleFastBuyAndSaleInfo({ commit }, payload) {
      commit("setFastBuyAndSaleInfo", payload);
    },
    // 订单状态
    handleOrderStatus({ commit }, payload) {
      commit('setOrderStatus', payload)
    },
    //发布币种
    handlePubSymbol({ commit }, payload) {
      commit('setPubSymbol', payload)
      commit("setOrderStatus", payload);
    },
    //自选区-进行中订单
    hanleOrderInProgress({ commit }, payload) {
      commit("setOrderInProgress", payload);
    },
  },
};
