export default {
    state: {
        coinConfig: [],
        localCollectSpot: JSON.parse(localStorage.getItem("spot_collect")) || [],
        localCollectContract: JSON.parse(localStorage.getItem("contract_collect")) || [],
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
        getLocalCollectSpot: (state) => state.localCollectSpot,
        getLocalCollectContract: (state) => state.localCollectContract,
    },
    mutations: {
        // 设置顶部导航激活板块
        saveCoinConfig(state, payload) {
            state.coinConfig = payload;
        },

        setLocalCollectSpot(state, payload) {
            const arr = state.localCollectSpot
            if (!arr.includes(payload)) {
                arr.push(payload)
            } else {
                arr.splice(arr.indexOf(payload), 1)
            }

            state.localCollectSpot = arr;
            localStorage.setItem('spot_collect', JSON.stringify(arr))
        },

        setLocalCollectContract(state, payload) {
            const arr = state.localCollectContract
            console.log(state,payload)
            if (!arr.includes(payload)) {
                arr.push(payload)
            } else {
                arr.splice(arr.indexOf(payload), 1)
            }

            state.localCollectContract = arr;
            localStorage.setItem('contract_collect', JSON.stringify(arr))
        }

    }
};
