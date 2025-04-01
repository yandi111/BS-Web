// store.js
// import { setToken, getToken, removeToken } from "@/libs/uti"; // 引入工具函数

// import { loginApi } from "@/apis/login";

export default {
    state: {
      // token: getToken(), // 从 localStorage 获取 token
      //  userInfo: null, // 存储用户信息
      initListInfo: [
        // {
        //   contract: {
        //     coinsName: "BTC-USDT"

        //   },
        //   market: {
        //     open: 63650,// 本阶段开盘价
        //     increase24H: "0.02", // 涨跌幅
        //     count: 46,
        //     amount: 0.654 // 成交额
        //   }
        // }, {
        //   contract: {
        //     coinsName: "BTC-USDT"

        //   },
        //   market: {
        //     open: 63650.00,// 本阶段开盘价
        //     increase24H: "0.02", // 涨跌幅
        //     count: 46,
        //     amount: 0.654 // 成交额
        //   }
        // }, {
        //   contract: {
        //     coinsName: "BTC-USDT"

        //   },
        //   market: {
        //     open: 63650,// 本阶段开盘价
        //     increase24H: "0.02", // 涨跌幅
        //     count: 46,
        //     amount: 0.654 // 成交额
        //   }
        // }

      ],
      
     
      balanceInfo:null,  // 余额
      selectNum:0.1,  // 
      lastPrice:'',  //
      interval:1, 

      timeStamp:null,
      high:null,
      low:null,
      close:null,
      vol:null,
      
    
      price:'', //限价盘口价格    
      // 下单位置状态
      denominatedUnit: 0,   //计价类型：0：张，0：母币计价，1：子币计价
      depotType: 1, //平仓类型：0：逐仓，1：全仓
      depotTypeInfo: 0, //：：合仓 :0 ，：分仓:1
      direction: 0, //方向： 0: 看多，1： 看空
      entrustAmount: null,  // 委托数量
      entrustPrice: 2, // 委托价 ----- 合约里的最新价,市价
      entrustType: null, //委托类型：0:现价委托,1:市价委托,2:指标委托,3:组合指标委托,4:追逐现价,5:条件委托
      //   equivalenceAmount:'', // 下单时按市场价可兑换的子币数量
     // limitIs: this.priceInfo,    //是否止盈止损: 0：没有，1：止盈，2：止损，3:止赢，止损
      limitIs: 0,    //是否止盈止损: 0：没有，1：止盈，2：止损，3:止赢，止损
      balance: null, // 余额
      feeRate: null, // 费率
      multipleInfo: 125, //杠杆倍数
    
      stopLossPrice: null, // 止损价
      takeProfitPrice: null, // 止盈价 
      tradeType: null, // 0：限价，1：市价 

      maintainEarnestMoneyRate: null,
      positionList:[], // 持仓列表
      depthInterval:[],
      asksList:[],
      bidsList:[],
      feeRateInfo:'' ,// 手续费
      promptInfo:'',
      usableAmount:''
     
      // selectedCurrency: localStorage.getItem('typeBU') || '未选择币种'
    },
    getters: {
      // isLoggedIn: (state) => !!state.token, // 判断用户是否登录
      // getToken: (state) => state.token, // 获取 token
      // getUserInfo: (state) => state.userInfo, // 获取用户信息

      getInitListInfo: (state) => state.initListInfo,
      getPromptInfo: (state) => state.promptInfo,
      getPositionList: (state) => state.positionList,
      getDepthInterval: (state) => state.depthInterval,
      getAsksList: (state) => state.asksList, // 获取卖盘数据
      getBidsList: (state) => state.bidsList, // 获取买盘数据
      getFeeRateInfo: (state) => state.feeRateInfo, // 获取买盘数据
     
      // getSelectedCurrency: (state) => state.selectedCurrency,
    
      getFundingTime: (state) => state.fundingTime,
      getBalanceInfo: (state) => state.balanceInfo,
      getSelectNum: (state) => state.selectNum,
      getLastPrice: (state) => state.lastPrice,
      getInterval: (state) => state.interval,

      getTimeStamp: (state) => state.timeStamp,
      getOpen: (state) => state.open,
      getHigh: (state) => state.high,
      getLow: (state) => state.low,
      getClose: (state) => state.close,
      getVol: (state) => state.vol,

      getPrice: (state) => state.price,
      // 下单位置状态的 getters
    getDenominatedUnit: (state) => state.denominatedUnit,
    getDepotType: (state) => state.depotType,
    getDepotTypeInfo: (state) => state.depotTypeInfo, 
    getDirection: (state) => state.direction,
    getEntrustAmount: (state) => state.entrustAmount,
    getEntrustPrice: (state) => state.entrustPrice,
    getEntrustType: (state) => state.entrustType,
    getLimitIs: (state) => state.limitIs,
    getMultipleInfo: (state) => state.multipleInfo,
    getStopLossPrice: (state) => state.stopLossPrice,
    getTakeProfitPrice: (state) => state.takeProfitPrice,
    getTradeType: (state) => state.tradeType,
    getBalance: (state) => state.balance, // 新增余额的 getter
    getFeeRate: (state) => state.feeRate, // 新增费率的 getter
    getUsableAmount: (state) => state.usableAmount, // 新增费率的 getter
    getMaintainEarnestMoneyRate: (state) => state.maintainEarnestMoneyRate, // 新增费率的 getter
    },
    mutations: {
      // setToken(state, token) {
      //   state.token = token; // 更新 state 中的 token
      //   setToken(token); // 存储 token 到 localStorage
      // },
      // setUserInfo(state, userInfo) {
      //   state.userInfo = userInfo; // 更新用户信息
      // },
      // clearAuth(state) {
      //   state.token = null; // 清除 token
      //   state.userInfo = null; // 清除用户信息
      //   removeToken(); // 从 localStorage 移除 token
      // },



      setInitListInfo(state, payload) {
       state.initListInfo = Array.isArray(payload) ? payload : [];
      },

      setBalanceInfo(state, payload) {
        state.balanceInfo = payload;
      },
      setUsableAmount(state, payload) {
        state.usableAmount = payload;
      },
      setPromptInfo(state, payload) {
        state.promptInfo = payload;
      },
      setSelectNum(state, payload) {
        state.selectNum = payload;
      },
      setLastPrice(state, payload) {
        state.lastPrice = payload;
      },
      setInterval(state, payload) {
        state.interval = payload;
      },

      setTimeStamp(state, payload) {
        state.timeStamp = payload;
      },
      setHigh(state, payload) {
        state.high = payload;
      },
      setLow(state, payload) {
        state.low = payload;
      },
      setClose(state, payload) {
        state.close = payload;
      },
      setVol(state, payload) {
        state.vol = payload;
      },




      setPrice(state, payload) {
        state.price = payload;
      },

       // 下单位置状态的 mutations
   
    setDenominatedUnit(state, payload) {
      state.denominatedUnit = payload;
    },
    setDepotType(state, payload) {
      state.depotType = payload;
    },
    setDepotTypeInfo(state, payload) {
      state.depotTypeInfo = payload;
    },
    setDirection(state, payload) {
      state.direction = payload;
    },
    setEntrustAmount(state, payload) {
      state.entrustAmount = payload;
    },
    setEntrustPrice(state, payload) {
      state.entrustPrice = payload;
    },
    setEntrustType(state, payload) {
      state.entrustType = payload;
    },
    setLimitIs(state, payload) {
      state.limitIs = payload;
    },
   
    setMultipleInfo(state, payload) {
      state.multipleInfo = payload;
    },
    setStopLossPrice(state, payload) {
      state.stopLossPrice = payload;
    },
    setTakeProfitPrice(state, payload) {
      state.takeProfitPrice = payload;
    },
    setTradeType(state, payload) {
      state.tradeType = payload;
    },
    setPositionList(state, payload) {
      state.positionList = payload;
    },
    setDepthInterval(state, payload) {
      state.depthInterval = payload;
    },
    setAsksList(state, payload) {
      state.asksList = payload;
    },
    setBidsList(state, payload) {
      state.bidsList = payload;
    },
   
    // setSelectedCurrency(state, payload) {
    //   localStorage.setItem('typeBU', payload); // 同步到 localStorage
    //   state.selectedCurrency = payload;
    // },
    setBalance(state, payload) {
      state.balance = payload; // 新增余额的 mutation
    },
    setFeeRate(state, payload) {
      state.feeRate = payload; // 新增费率的 mutation
    },
    setMaintainEarnestMoneyRate(state, payload) {
      state.feeRate = payload; // 新增费率的 mutation
    },
    setFeeRateInfo(state, payload) {
      state.feeRateInfo = payload; // 新增费率的 mutation
    },
    },
    actions: {


     
      
      // updatePrice({ commit }, value) {
      //   commit('setPrice', value); // 提交 mutation
      // },

      // async fetchInitListInfo({ commit }) {
      //   try {
      //     const response = await axios.get('/app/bsex-market/contract/list'); 
          
      //     if (response.data.code == 200) {
      //     commit('setInitListInfo', response.data.data); // 提交初始化列表信息
          
      //     const contractData = response.data.data[0].contract; // 假设返回的数据结构
      //     const marketData = response.data.data[0].market; // 假设返回的数据结构
      //     console.log(marketData,contractData,contractData.fundingRate,'marketData------');
      //     const depthIntervals = contractData.depthInterval.split(',').map(value => {
      //       return { name: parseFloat(value) }; // 将字符串转换为数字并创建对象
      //     });
      //     console.log(contractData.coinsName,'contractData.coinsName');
          
      //     commit('setCoinsName', contractData.coinsName);
      //     commit('setCoinsId', contractData.coinsId);
      //     commit('setSellPriceInfo', marketData.close);
      //     commit('setIndexPrice', marketData.indexPrice);
      //     commit('setIncrease24H', marketData.increase24H);
      //     commit('setEntrustPrice', marketData.open); // 市价
      //     commit('setFundingRate', marketData.fundingRate);
      //     commit('setFundingRateTime', contractData.fundingRateTime);
      //     commit('setHighPrice', contractData.highPrice);
      //     commit('setLowestPrice', contractData.lowestPrice);
      //     commit('setVolData', marketData.vol);
      //     commit('setDepthInterval', depthIntervals);
      //     }
          
      //   } catch (error) {
      //     console.error('请求失败:', error);
      //   }
      // },

    },
  };