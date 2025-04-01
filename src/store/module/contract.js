// 合约数据
import { GetAppContractList } from "@/api/hy";
import BigNumberUtils from '@/utils/format'

const bigNumber = new BigNumberUtils()
export default {
  state: {
    // 合约实时价格
    priceObj: {},
    // 合约币种
    contractCoin: {},
    tdCoin: {},
    // 是否下单
    isPlaceOrder: false,
    // 是否调整杠杆
    isEditLever: false,
    // 交易对信息
    contractInfo: {},
    // 合约数量单位
    quantityUnit: "1",
    // 合约杠杆信息
    leverInfo: {},
    // 实时保证金
    availableObj: {},
    //是否爆仓
    isLiquidation: false,
    //交易对单个信息（合约)
    contractSymbol: {},
    //标记价格
    markedPrice: null,

    coinsName: 'BTC/USDT',  // name
    coinsId: 1, // 合约id
    sellPriceInfo: null, // 实时价格
    indexPrice: null,// 标记价
    increase24H: null, //今日涨跌幅
    fundingRate: null, //资金费率
    fundingRateTime: null, //资金费率结束时间
    highPrice: null, //今日最高价
    lowestPrice: null, //今日最低价
    volData: null, //24h成交量
    open: null,  //  开盘
    fundingTime: null, // 时间戳
    minPrice24H: null,
    maxPrice24H: null,
    pricePrecision: '',   // 价格精度
    amountPrecision: '',   // 数量精度
    newTradeList: [],
    unit: null,
    depthIntervalList: [],//精度列表
    initTime: '',
    coinsIdNew: '',
    numMin: '',
    numMax: '',
    multiple: null,
    contractId: null
  },
  getters: {
    getContractInfo: (state) => state.contractInfo,
    getNewTradeList: (state) => state.newTradeList,
    //合约单个交易信息
    getContractSymbol: (state) => state.contractSymbol,
    getMaxPrice24H: (state) => state.maxPrice24H,
    getMinPrice24H: (state) => state.minPrice24H,

    getPricePrecision: (state) => state.pricePrecision,
    getAmountPrecision: (state) => state.amountPrecision,
    getInitTime: (state) => state.initTime,

    getNumMin: (state) => state.numMin,
    getNumMax: (state) => state.numMax,
    getMultiple: (state) => state.multiple,


    // setDepthIntervalList: [],//精度列表
    // setPricePrecision:null  // 精度值

    getDepthIntervalList: (state) => state.depthIntervalList,


    getCoinsName: (state) => state.coinsName,
    getCoinsId: (state) => state.coinsId,
    getSellPriceInfo: (state) => state.sellPriceInfo,
    getIndexPrice: (state) => state.indexPrice,
    getIncrease24H: (state) => state.increase24H,
    getFundingRate: (state) => state.fundingRate,
    getFundingRateTime: (state) => state.fundingRateTime,
    getHighPrice: (state) => state.highPrice,
    getLowestPrice: (state) => state.lowestPrice,
    getVolData: (state) => state.volData,
    getUnit: (state) => state.unit,
    getCoinsIdNew: (state) => state.coinsIdNew,
    getContractId: (state) => state.contractId,
  },
  mutations: {

    setCoinsName(state, payload) {
      state.coinsName = payload;
    },

    setDepthIntervalList(state, payload) {
      state.depthIntervalList = payload;
    },

    setUnit(state, payload) {
      state.unit = payload;
    },
    setCoinsId(state, payload) {
      state.coinsId = payload;
    },
    setSellPriceInfo(state, payload) {
      state.sellPriceInfo = payload;
    },
    setIndexPrice(state, payload) {
      state.indexPrice = payload;
    },
    setIncrease24H(state, payload) {
      state.increase24H = payload;
    },
    setFundingRate(state, payload) {
      state.fundingRate = payload;
    },
    setFundingRateTime(state, payload) {
      state.fundingRateTime = payload;
    },
    setHighPrice(state, payload) {
      state.highPrice = payload;
    },
    setLowestPrice(state, payload) {
      state.lowestPrice = payload;
    },
    setVolData(state, payload) {
      state.volData = payload;
    },
    setOpen(state, payload) {
      state.open = payload;
    },
    setFundingTime(state, payload) {
      state.fundingTime = payload;
    },
    setMinPrice24H(state, payload) {
      state.minPrice24H = payload;
    },
    setMaxPrice24H(state, payload) {
      state.maxPrice24H = payload;
    },


    // pricePrecision:'' ,   // 价格精度
    // amountPrecision:''    // 数量精度
    setPricePrecision(state, payload) {
      state.pricePrecision = payload;
    },
    setAmountPrecision(state, payload) {
      state.amountPrecision = payload;
    },



    // 设置实时价格
    setPriceObj(state, payload) {
      state.priceObj = payload;
    },
    // 设置合约币种
    setContractCoin(state, payload) {
      state.contractCoin = payload;
    },
    // 合约k线、深度图需要的币种信息
    setTDCoin(state, payload) {
      state.tdCoin = payload;
    },
    // 设置是否下单
    setPlaceOrder(state, payload) {
      state.isPlaceOrder = payload;
    },
    // 设置是否调整杠杆
    setEditLever(state, payload) {
      state.isEditLever = payload;
    },
    // 设置交易对信息
    setContract(state, payload) {
      state.contractInfo = payload;
    },
    // 设置单个交易对信息
    setContractSymbols(state, payload) {
      state.contractSymbol = payload;
    },
    // 设置交易数量单位类型
    setQuantityUnit(state, payload) {
      state.quantityUnit = payload;
    },
    // 设置合约杠杆信息
    setLeverInfo(state, payload) {
      state.leverInfo = payload;
    },
    // 保证金
    setAvailable(state, payload) {
      state.availableObj = payload;
    },
    //设置爆仓状态
    setLiquidation(state, payload) {
      state.isLiquidation = payload;
    },
    //标记价格
    setMarkedPrice(state, payload) {
      state.markedPrice = payload;
    },
    setNewTradeList(state, payload) {
      state.markedPrice = payload;
    },
    setInitTime(state, payload) {
      state.initTime = payload;
    },
    setCoinsIdNew(state, payload) {
      state.coinsIdNew = payload;
    },
    setContractId(state, payload) {
      state.contractId = payload;
    },

    setNumMin(state, payload) {
      state.numMin = payload;
    },
    setNumMax(state, payload) {
      state.numMax = payload;
    },
    setMultiple(state, payload) {
      state.multiple = payload;
    },


    // 清除所有值 回到默认状态
    clearContract(state) {
      var tpyeOfObj = {
        object: {},
        array: [],
        boolean: false,
      };
      for (let iterator in state) {
        state[iterator] = tpyeOfObj[typeof state[iterator]];
      }
      state.quantityUnit = "1";
    },
  },
  actions: {
    // 价格集合
    handlePriceObj({ commit }, payload) {
      commit("setPriceObj", payload);
    },
    // 合约币种
    handleContractCoin({ commit }, payload) {
      commit("setContractCoin", payload);
    },
    // 合约k线、深度图需要的币种信息
    handleTDCoin({ commit }, payload) {
      commit("setTDCoin", payload);
    },
    // 是否下单
    handlePlaceOrder({ commit }, payload) {
      commit("setPlaceOrder", payload);
    },
    // 是否调整杠杆
    handleEditLever({ commit }, payload) {
      commit("setEditLever", payload);
    },
    // 交易对信息
    handleContract({ commit }, payload) {
      commit("setContract", payload);
    },
    // 单个交易对信息
    handleContractSymbol({ commit }, payload) {
      commit("setContractSymbols", payload);
    },
    // 交易数量单位类型
    handleQuantityUnit({ commit }, payload) {
      commit("setQuantityUnit", payload);
    },
    // 合约杠杆信息
    handleLevelrInfo({ commit }, payload) {
      commit("setLeverInfo", payload);
    },
    // 保证金
    handleAvailable({ commit }, payload) {
      commit("setAvailable", payload);
    },
    handleLiquidation({ commit }, payload) {
      commit("setLiquidation", payload);
    },
    // 标记价格
    handleMarkedPrice({ commit }, payload) {
      commit("setMarkedPrice", payload);
    },


    async fetchInitListInfo({ commit }) {
      Promise.try(async () => {
        return await GetAppContractList()
      }).then(response => {
        response.data.forEach(item => {
          item.market.increase24H = item.market.increase24H ? bigNumber.multiply(+item.market.increase24H, 100) : item.market.increase24H
        })
        commit('setInitListInfo', response.data); // 提交初始化列表信息

        const contractData = response.data[0].contract; // 假设返回的数据结构
        const marketData = response.data[0].market; // 假设返回的数据结构

        const depthIntervals = contractData.depthInterval.split(',').map(value => {
          return { name: parseFloat(value) }; // 将字符串转换为数字并创建对象
        });

        const contract = response.data[0]; // 假设返回的数据结构

        commit('setTDCoin', contract);
        commit('setFundingTime', contract.market.fundingTime);
        commit('setInitTime', contract.market.fundingTime);
        commit('setCoinsName', contractData.coinsName);

        commit('setCoinsId', contractData.coinsId);
        commit('setContractId', contractData.id);

        commit('setNumMin', contractData.numMin);
        commit('setNumMax', contractData.numMax);
        commit('setMultiple', contractData.multiples);

        commit('setUnit', contractData.unit);

        commit('setSellPriceInfo', marketData.close);
        commit('setIndexPrice', marketData.indexPrice);
        commit('setIncrease24H', marketData.increase24H);
        commit('setEntrustPrice', marketData.open); // 市价
        commit('setFundingRate', marketData.fundingRate);
        commit('setCoinsIdNew', marketData.id);
        commit('setFundingRateTime', contractData.fundingRateTime);

        commit('setHighPrice', contractData.highPrice);
        commit('setLowestPrice', contractData.lowestPrice);
        commit('setVolData', marketData.vol);
        commit('setDepthIntervalList', depthIntervals);
        commit('setMinPrice24H', contractData.minPrice24H);
        commit('setMaxPrice24H', contractData.maxPrice24H);


        commit('setPricePrecision', contractData.pricePrecision);
        commit('setAmountPrecision', contractData.amountPrecision);
      })
    },

  },
};
