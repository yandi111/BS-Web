// 现货数据
export default {
  state: {
		// spot实时价格
		spotPriceObj: {},
		// 现货数量单位
		quantUnitVal: '2',
		// 单个交易对信息
		spotTradePairs: {},
		// 是否下单
		isPlaceOrder: false, 
		// 现货币种
		spotCoinInfo: {},
		// 资产钱包币种信息
		assetsCoinInfo: {},
	},
		getters:{
		getSpotCoinInfo: (state) => state.spotCoinInfo,
		getAssetsCoinInfo: (state) => state.assetsCoinInfo,
	},
  mutations: {
		// 设置交易数量单位类型
		setSpotsQuantityUnit (state, payload) {
		  state.quantUnitVal = payload
		},
		// 设置单个交易对信息
		setSpotTradePairs (state, payload) {
		  state.spotTradePairs = payload
		},
		setSpotPriceObj(state, payload){
		  state.spotPriceObj = payload
		},
		// 设置是否下单
		setSportPlaceOrder(state, payload) {
			state.isPlaceOrder = payload;
		},
		// 现货币种
		setSpotCoinInfo(state, payload) {
			state.spotCoinInfo = payload;
		},
		// 资产钱包币种信息
		setAssetsCoinInfo(state, payload) {
			state.assetsCoinInfo = payload;
		},
		clearSpots(state, payload) {
			var tpyeOfObj = {
				'object': {},
				'array': [],
				'boolean': false,
			}
			for (let iterator in state) {
				state[iterator] = tpyeOfObj[typeof(state[iterator])];
			}
			state.quantUnitVal = '2';
		}
	},
  actions: {
		// 交易单位类型
		 handleSetSpotsQuantityUnit({ commit }, payload) {
			commit('setSpotsQuantityUnit', payload)
		},
		  // 价格集合
			handleSpotPriceObj({ commit }, payload) {
				commit('setSpotPriceObj', payload)
			},
		
		// 交易对信息
		 handleSpotTradePairs({ commit }, payload) {
			commit('setSpotTradePairs', payload)
		},
		// 是否下单
		 handleSportPlaceOrder({ commit }, payload) {
			commit('setSportPlaceOrder', payload)
		},
		// 现货币种
		handleSpotCoinInfo({ commit }, payload) {
			commit('setSpotCoinInfo', payload)
		},
		// 资产钱包币种信息
		handleAssetsCoinInfo({ commit }, payload) {
			commit('setAssetsCoinInfo', payload)
		},
	},
}