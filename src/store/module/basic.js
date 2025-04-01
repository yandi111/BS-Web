export default {
  state: {
    coinConfig: [],
  },
  getters: {
    // 获取顶部导航激活板块
    coinConfigMap: (state) => {
      const list = state.coinConfig
      return list?.reduce?.((cache, v) => {
        cache[v?.coinName] = v
        return cache
      }, {})
    },
  },
  mutations: {
    // 设置顶部导航激活板块
    saveCoinConfig (state, payload) {
      state.coinConfig = payload;
    },

  }
};
