<template>
 <div class="area flex">
  <div class="c-search flex">
   <div class="tabs flex">
    <div v-for="item of tabs" @click="onTabs(item.id)" :class="[active === item.id ? 'active' : '', 'tab flex']">
     <i v-if="item.id === 1"></i>
     {{ item.name }}
    </div>
   </div>

   <el-input :placeholder="$t('lang_1278')" v-model="ruleForm.symbol" @keyup.native.enter="onSearch">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
   </el-input>
  </div>

  <div class="c-table" v-if="list.length > 0">
   <el-table :border="false" :data="list" :empty-text="' '">
    <el-table-column :label="$t('lang_1189')">
     <template slot-scope="{row}">
      <div class="info flex">
       <i @click="handleCurrency(row)" :class="[+row.isCollect === 1 ? 'active' : '', 'collect']"></i>

       <img :src="row.symbolInfo.icon" alt="">

       <div class="currency flex">
        <!-- <p class="name">BTC <span>USDT</span></p> -->
         <p class="name">{{ row.symbolInfo.coinsName.split('-')[0] }} <span>{{ row.symbolInfo.coinsName.split('-')[1] }}</span></p>
        <p class="content">{{$t('spot_33')}}</p>
       </div>
      </div>
     </template>
    </el-table-column>
    <el-table-column :label="$t('lang_1363')">
     <template slot-scope="{row}">
      <Echarts :option="row.options" width="96px" height="50px" />
     </template>
    </el-table-column>
    <el-table-column :label="$t('lang_1724')">
     <template slot-scope="{row}">
      <p :class="[+row.market.increase < 0 ? 'reduce' : 'add']">{{ row.market.close }}</p>
     </template>
    </el-table-column>
    <el-table-column :label="$t('home_59')">
     <template slot-scope="{row}">
      <p :class="[+row.market.increase < 0 ? 'reduce' : 'add']">{{ +row.market.increase > 0 ? '+' : '' }}{{ row.market.increase24H }}</p>
     </template>
    </el-table-column>
    <el-table-column :label="$t('market_008')" width="80" align="right">
     <template slot-scope="{row}">
      <el-button type="success">{{$t('market_009')}}</el-button>
     </template>
    </el-table-column>
   </el-table>

   <el-pagination  background :page-size="ruleForm.size" :pager-count="9" :current-page="ruleForm.page" :hide-on-single-page="true" @current-change="onCurrent" layout="prev, pager, next" :total="total"></el-pagination>
  </div>

  <div v-if="list.length === 0 && active === 1" class="no-data-warp">
    <NoData :text="$t('market_007')">
      <el-button type="primary" @click="onTabs(0)">{{ $t('market_008')}}</el-button>
    </NoData>
  </div>

 </div>
</template>

<script>
import {GetQuotesApi, HandleSymbol} from "@/api/quotes";
import BigNumberUtils from "@/utils/format";
import Echarts from "@/components/Echarts/index.vue";
import * as echarts from 'echarts';
import dayjs from 'dayjs'
import {NumberFormat} from "@/utils/format";
import {GetTradingPairs} from "@/api/spotTrading";
import NoData from "@/components/NoData.vue";
import {mapState} from "vuex";

const bigNumber = new BigNumberUtils()
export default {
  components: {
    Echarts,
    NoData
  },
  data() {
    return {
      loading: false,

      active: 1,

      list: [],

      tabs: [
        {
          name: this.$t('market_004'),
          id: 1
        },
        {
          name: this.$t('market_005'),
          id: 0
        },
        {
          name: this.$t('market_005'),
          id: 2
        },
        // {
        //  name: 'USDT',
        //  id: 3
        // }
      ],

      ruleForm: {
        page: 1,
        size: 5,
        symbol: undefined,
        isCollect: 1
      },

      total: 0,

      socket: null,
      socketTime: null,
      timer: null
    }
  },
  mounted() {
    this.getList()
    this.createSocket()
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  watch: {
    'ruleForm.symbol' () {
      if (this.timer !== null) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout( () => {
        this.onSearch()
      }, 600)
    }
  },
  computed: {
    ...mapState({
      // token
      token: (state) => state.login?.token
    }),
  },
  methods: {
    // 切换tabs
    onTabs(e) {
      console.log(e)
      switch (e) {
        case 1:
          this.ruleForm.isCollect = 1;
          break;
        case 0:
          this.ruleForm.isCollect = undefined;
          break;
      }
      this.active = e

      this.ruleForm.page = 1
      if (e === 2) return this.getAssetsList()

      this.getList()
    },

    // 搜索
    onSearch() {
      this.ruleForm.page = 1
      this.getList()
    },

    // 获取现货列表
    getAssetsList() {
      Promise.try(async () => {
        return await GetTradingPairs({isCollect: 0})
      }).then((res) => {
        console.log(res)
        this.list = res.data.map(item => {
          return {
            symbolInfo: {
              coinsName: item.spotCoin.coinsName,
              icon: item.spotCoin.logo,
            },
            market: {
              close: NumberFormat({val: item.spotCoinMarket.closePrice, minimumFractionDigits: item.spotCoin.coinScale}),
              increase: item.spotCoinMarket.volatility,
              increase24H: NumberFormat({val: item.spotCoinMarket.volatility, minimumFractionDigits: item.spotCoin.coinScale, style: 'percent'})
            }
          }
        })
      }).catch(err => {})
    },

    // 获取列表
    getList() {
      this.loading = true
      Promise.try(async () => {
        return await GetQuotesApi(this.ruleForm)
      }).then(res => {
        res.data.records.forEach(item => {
          item.market.amount = NumberFormat({val: item.market.amount})
          item.market.close = NumberFormat({val: item.market.close, minimumFractionDigits: 2})
          item.market.increase = item.market.increase24H
          item.market.increase24H = NumberFormat({val: item.market.increase24H, minimumFractionDigits: 2, style: 'percent'})
          item.options = {
            grid: {
              bottom: 0,
              left: 0,
              top: 0,
              right: 0
            },
            xAxis: {
              show: false,
              boundaryGap: false,
              data: item.closeList.map(i => {
                return dayjs(+i.id * 1000).format('YYYY-MM-DD HH:mm:ss')
              })
            },
            yAxis: {
              show: false,
              type: 'value',
              boundaryGap: [0, '30%']
            },
            dataZoom: [
            ],
            series: [
              {
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                itemStyle: {
                  color: +item.market.increase < 0 ? '#ED3C2F' : '#0CBB57'
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: +item.market.increase < 0 ? 'rgba(237, 60, 47, 0.5)' : 'rgba(12, 187, 87, .5)'
                    },
                    {
                      offset: 1,
                      color: +item.market.increase24H < 0 ? 'rgba(237, 60, 47, 0)' : 'rgba(12, 187, 87, 0)'
                    }
                  ])
                },
                data: item.closeList.map(item => {
                  return item.close
                })
              }
            ]
          }
        })

        this.list = res.data.records
        this.total = res.data.total
      }).catch(() => {})
      this.loading = false
    },

    // 创造实例
    createSocket() {
      console.log(process.env.VUE_APP_BASE_WS_TY)
      this.socket = new WebSocket(process.env.VUE_APP_BASE_WS_TY + '/websocket');

      this.socket.onopen = this.onOpen.bind(this)
      this.socket.onmessage = this.onMessage.bind(this)
      this.socket.onerror = this.onError.bind(this)
      this.socket.onclose = this.onClose.bind(this)
    },

    // 开启socket链接
    onOpen(e) {
      let that = this
      that.socket.send(JSON.stringify({
        cmd: 'SUBSCRIBE',
        data: {
          topic: 'market.kline'
        }
      }))

      that.socketTime = setTimeout(() => {
        that.socket.send('ping')
      }, 30000)
    },

    // 接收参数
    onMessage(e) {
      // 响应服务端
      if (e.data === 'ping') return this.socket.send('pong')

      // 回应服务端
      if (e.data === 'pong') return

      // 接收到的参数
      try {
        const data = JSON.parse(e.data).data
        // console.log(data)
        let find = this.list.find(item => item.symbolInfo.coinsName === data.symbol)

        if (!find) return
        data.close = NumberFormat({val: data.close})
        data.increase = data.increase24H
        data.increase24H = NumberFormat({val: data.increase24H, style: 'percent'})
        find.market = {...find.market, ...data}
      } catch (err) {
        console.log(err, e, '我是错误信息')
      }
    },

    // 异常
    onError() {

    },

    // 关闭
    onClose() {

    },

    // 页面发生变化
    onCurrent(e) {
      this.ruleForm.page = e
      this.getList()
    },

    // 操作自选币种
    async handleCurrency(item) {
      if (!this.token) {
        await this.$router.push({
          path: "/login",
          query: {redirect: this.$route.fullPath},
        });
        return;
      }

      this.loading = true
      Promise.try(async () => {
        return await HandleSymbol({symbol: item.symbolInfo.coinsName, collect: item.isCollect === 0 ? 1 : 0, symbolId: item.symbolInfo.coinsId, type: 'U'})
      }).then(res => {
        this.$message.success('操作成功')
        this.getList()
      }).catch(err => {
        this.loading = false
      })
    },

    closeWs() {
      this.socket.close()
    },

  }
}
</script>

<style scoped lang="scss">
.area {
 flex-direction: column;

 .c-search {
  margin-bottom: 17px;
  align-items: center;
  justify-content: space-between;

  .el-input {
   width: 220px;
   ::v-deep {
    .el-input__inner {
     padding: 8px 12px 8px 36px;
     border-radius: 4px;
     background-color: #252525;
     border-color: #252525;
     @include Font((size: 12px, color: #fff));

     &::placeholder {
      color: #737373
     }

     &:focus {
      border-color: #90FF00;
     }
    }
   }
  }
 }
 .tabs {
  margin-bottom: 18px;
  align-items: center;

  .tab {
   &:not(:last-child) {
    margin-right: 40px;
   }
   align-items: center;
   @include Font((size: 20px, color: #F0F0F0, weight: bold));
   cursor: pointer;
   i {
    margin-right: 8px;
    width: 20px;
    height: 20px;
    background: {
     image: url('../../../assets/images/vector.png');
     repeat: no-repeat;
     position: center center;
     size: cover
    };
   }

   &.active {
    color: #90FF00;
    i {
     background-image: url('../../../assets/images/is_vector.png');
    }
   }
  }
 }

  .no-data-warp{
    margin-top: 149px;
    margin-bottom: 463px;
    button{
      margin-top: 30px;
    }
  }
}

.c-table {
 display: flex;
 flex-direction: column;
  margin-bottom: 107px;

 .el-pagination {
  margin: 50px auto 0;

  ::v-deep {
   .btn-prev, .btn-next, .number {
    background-color: #1b1b1b;

    &.active {
     background-color: #90FF00;
    }
   }
  }
 }
}

.info {
 align-items: center;

 i {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  background: {
   image: url('../../../assets/images/vector.png');
   repeat: no-repeat;
   position: center center;
   size: cover
  };
  cursor: pointer;

  &.active {
   background-image: url('../../../assets/images/is_vector.png');
  }
 }

 img {
  margin-right: 11px;
  width: 30px;
  border-radius: 50%;
 }
 .currency {
  flex-direction: column;

  .name {
   margin-bottom: 1px;
   margin-right: 6px;
   @include Font((size: 16px, weight: bold, color: #F0F0F0));
   span {
    @include Font((size: 12px, weight: bold, color: #737373));
   }
  }

  .content {
   @include Font((size: 12px, weight: bold, color: #737373));
  }
 }
}

::v-deep {
 .el-table {
   th.el-table__cell >.cell{
     color: #737373;
   }
  th, tr, td {
   border: none !important;
   background-color: #141414 !important;
  }

   tr:hover{
     td {
         background-color: #1B1B1B !important;
       }
     }

  .el-table__empty-block {
   background-color: #141414;
  }

  &::before {
   height: 0;
  }
  &::after {
   height: 0;
  }
 }

 // .el-link {
 //   span {
 //     @include Font((size: 16px, weight: bold, color: #F0F0F0));
 //   }
 // }
}
</style>