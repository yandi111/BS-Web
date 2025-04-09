export default {
  state: {
    quotesMarket: {},
  },
  getters: {
    getQuotesMarket: (state) => state.quotesMarket,
  },
  mutations: {
    // 行情
    setQuotesMarket (state, payload) {
      state.quotesMarket = payload
    },

  }
};
