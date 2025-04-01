<template>
  <div class="order-form">
    <div class="tabs" :class="{ dark: getTheme == 'dark' }">
      <div
        class="tab"
        :class="tabIndex === item.id ? 'tab-active' : ''"
        v-for="item in tabsArr"
        :key="item.id"
        @click="tabChange(item.id)"
      >
        {{ $t(item.label)  }}
      </div>
    </div>
    <!-- 订单表 -->
    <div v-if="tabIndex === 1">
      <div class="top">
        <div class="handlers">
          <div>
            <span
              @click="changePlate('all')"
              class="handler handler-all"
              :class="{ active: selectedPlate == 'all' }"
            ></span>
            <span
              @click="changePlate('sell')"
              class="handler handler-red"
              :class="{ active: selectedPlate == 'sell' }"
            ></span>
            <span
              @click="changePlate('buy')"
              class="handler handler-green"
              :class="{ active: selectedPlate == 'buy' }"
            ></span>
          </div>
          <div class="handler-select" @click.stop="selectShow = !selectShow">
            <div class="select-top">
              {{ selectNum }}
              <div class="select-icon">
                <i v-show="!selectShow" class="el-icon-caret-bottom"></i>
                <i v-show="selectShow" class="el-icon-caret-top"></i>
              </div>
            </div>

            <div
              class="select-b"
              :class="{ dark: getTheme == 'dark' }"
              v-show="selectShow"
            >
              <div
                class="select-item"
                v-for="item in selectArr"
                :key="item.id"
                @click.stop="selectItem(item)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <div class="table">
          <div class="table-header">
            <el-row>
              <el-col :span="8"><div>{{$t('lang_177')}}+(USDT)</div></el-col>
              <el-col :span="6"
                ><div style="text-align: right">{{$t('lang_441')}}+(BTC)</div></el-col
              >
              <el-col :span="10"
                ><div style="text-align: right">{{$t('lang_901')}}+(BTC)</div></el-col
              >
            </el-row>
          </div>
          <div class="plate-nowprice" v-show="selectedPlate != 'all'">
            <span
              class="price"
              :class="{
                buy: parseFloat(marketInfo1.change) > 0,
                sell: parseFloat(marketInfo1.change) < 0,
              }"
              >{{ marketInfo1.lastPrice }}</span
            >
            <span v-if="parseFloat(marketInfo1.change) > 0" class="buy">↑</span>
            <span v-else-if="parseFloat(marketInfo1.change) < 0" class="sell"
              >↓</span
            >
            <!-- <span class="price-right">{{ markedPrice }}</span> -->
            <span class="price-right">{{ markedPrice1 }}</span>
          </div>
          <div class="table-list">
            <div
              class="table-box"
              :class="selectedPlate === 'sell' ? 'hight-active' : ''"
              v-show="selectedPlate != 'buy'"
            >
              <div
                class="table-item"
                v-for="(item, index) in sellData"
                :key="index"
              >
                <div>
                  <el-row>
                    <el-col :span="8"
                      ><div class="sell">{{ item.price }}</div></el-col
                    >
                    <el-col :span="6"
                      ><div style="text-align: right">
                        {{ item.num }}
                      </div></el-col
                    >
                    <el-col :span="10"
                      ><div style="text-align: right">
                        {{ item.sum }}
                      </div></el-col
                    >
                  </el-row>
                </div>
                <div
                  :style="`width: ${(item.sum / totalSellAmount) * 100}%`"
                  class="ask_bg"
                ></div>
              </div>
            </div>
          </div>
          <div class="plate-nowprice" v-show="selectedPlate === 'all'">
            <span
              class="price"
              :class="{
                buy: parseFloat(marketInfo1.change) > 0,
                sell: parseFloat(marketInfo1.change) < 0,
              }"
              >{{ marketInfo1.lastPrice }}</span
            >
            <span v-if="parseFloat(marketInfo1.change) > 0" class="buy">↑</span>
            <span v-else-if="parseFloat(marketInfo1.change) < 0" class="sell"
              >↓</span
            >
            <!-- <span class="price-right"> {{ markedPrice }}</span> -->
            <el-tooltip
              popper-class="my-tooltip"
              content="Top center"
              placement="top"
            >
              <div slot="content">
                <p>当前标记价格。点击<span>了解详情</span></p>
              </div>
              <span class="price-right"> {{ markedPrice1 }}</span>
              <!-- <span class="price-right"> {{ $store.state.priceObj.markedPrice }}</span> -->
            </el-tooltip>
          </div>
          <div class="table-list">
            <div
              class="table-box"
              :class="selectedPlate === 'buy' ? 'hight-active' : ''"
              v-show="selectedPlate != 'sell'"
            >
              <div
                class="table-item"
                v-for="(item, index) in buyData"
                :key="index"
              >
                <div>
                  <el-row>
                    <el-col :span="8"
                      ><div class="buy">{{ item.price }}</div></el-col
                    >  111111
                    <el-col :span="6"
                      ><div style="text-align: right">
                        {{ item.num }}22222
                      </div></el-col
                    >
                    <el-col :span="10"
                      ><div style="text-align: right">
                        {{ item.sum }}33333
                      </div></el-col
                    >
                  </el-row>
                </div>
                <div
                  :style="`width: ${(item.sum / totalBuyAmount) * 100}%`"
                  class="bid_bg"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 最新成交 -->
    <div class="new-price" v-if="tabIndex === 2">
      <div class="new-header">
        <el-row>
          <el-col :span="8"><div>{{$t('lang_1004')}}</div></el-col>
          <el-col :span="6" style="text-align: right"
            ><div>{{$t('lang_1325')}}+(USDT)</div></el-col
          >
          <el-col :span="10"
            ><div style="text-align: right">{{$t('lang_1352')}}+(BTC)</div></el-col
          >
        </el-row>
      </div>
      <div class="new-box">
        <el-row
          class="new-item"
          v-for="(item, index) in tradesArr"
          :key="index"
        >
          <el-col :span="8"
            ><div>
              {{ item.time | formatDate }} 1111111
            </div></el-col
          >
          <el-col :span="6"
            ><div
              style="text-align: right"
              :class="item.direction === 1 ? 'buy' : 'sell'"
            >
              {{ item.price }}
            </div></el-col
          >
          <el-col :span="10"
            ><div style="text-align: right">{{ item.num }}</div></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { webSocketMixin } from "./orderSocket";
import { getDate } from "@/libs/utils";
import {
  handicapApi,
  $getSymbolInfo,
} from "@/api/contractTransaction";
import { mapGetters } from "vuex";

export default {
  name: "OrderForm",
  mixins: [webSocketMixin],
  data() {
    return {
      tabIndex: 1,
      headerArr: [
        {
          id: 0,
          label: "",
        },
      ],
      tabsArr: [
        {
          id: 1,
          label: "lang_879",
        },
        {
          id: 2,
          label: "lang_1115",
        },
      ],
      selectArr: [],
      selectNum: "",
      selectShow: false,
      tradesArr: [], //最新成交
      buyData: [], //盘口 买
      sellData: [], //盘口 卖
      selectedPlate: "all", //当前显示的买卖盘
      currentCoin: {
        change: 0.1,
      },
      totalSell: [],
      totalBuy: [],
      marketInfo: {},
      coins: "", //交易对大写
      coinsName: "", //交易对小写
      marketType: "", //市场类型
      markedPrice: 0, //标记价格
      // markedPrice1:0,
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
    totalSellAmount() {
      return this.totalSell[0].sum;
    },
    totalBuyAmount() {
      return this.totalBuy[this.totalBuy.length - 1].sum;
    },
    markedPrice1() {
      // console.log('aaaaaaaaaa',this.$store.state.contract.priceObj.markedPrice);
      return this.$store.state.contract.priceObj.markedPrice;
    },
    marketInfo1() {
      return this.$store.state.contract.priceObj;
    },
  },
  filters: {
    formatDate(time) {
      return getDate(time);
    },
  },
  created() {
    document.addEventListener("click", () => {
      this.selectShow = false;
    });
    this.init();
  },
  methods: {
    // socket 推送
    websockOpen(e) {
      const self = this;
      const that = this;
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      self.websockSend("depthData");
      self.websockSend("tradeData");
      that.websockSend("priceData");
      that.websockSend("markPriceSend");
    },
    init() {
      this.getdefaultCoin();
      this.getTabCoin();
      this.selectNum =
        localStorage.getItem("selectNum") || localStorage.getItem("selectNum2");
    },
    selectItem(item) {
      const self = this;
      this.selectShow = false;
      //停止订阅
      self.unWebsockSend();
      this.selectNum = item.name;
      localStorage.setItem("selectNum", this.selectNum);
      //发起订阅
      self.websockSend("depthData");
      if (this.selectedPlate == "all") {
        this.getHandicap("all");
      } else if (this.selectedPlate == "buy") {
        this.getHandicap("buy");
      } else {
        this.getHandicap("sell");
      }
    },

    tabChange(id) {
      this.tabIndex = id;
      // this.getMarketTrades();
      this.getTabCoin;
    },
    changePlate(str) {
      this.getPlate(str);
    },
    // 买卖盘
    getPlate(str) {
      if (str != "") {
        this.selectedPlate = str;
      }
      this.getHandicap(str);
    },

    // 获取默认的交易对
    getdefaultCoin() {
      this.$EventBus.$on("sendDefaultSymbol", (msg) => {
        this.marketType = msg.marketType;
        this.marketInfo = msg;
        this.coins = msg.symbol;
        this.coinsName = msg.symbolKey;
        this.getHandicap("all");
        // this.getMarketTrades();
        this.getDeepths(this.coins);
        if (this.coinsName) {
          this.webSocket();
        }
      });
    },
    // 获取切换后的交易对
    getTabCoin() {
      this.$EventBus.$on("sendSymbol", (msg) => {
        this.marketInfo = msg;
        this.coins = msg.symbol;
        this.coinsName = msg.symbolKey;
        this.marketType = msg.marketType;
        this.getDeepths(this.coins);
        this.getHandicap("all");
        // this.getMarketTrades();
        this.webSocket();
      });
    },

    // 盘口
    getHandicap(type) {
      this.sellData = [];
      this.buyData = [];
      handicapApi({
        symbol: this.coins, //交易对
        marketType: this.marketType, //市场类型
        priceDecimal: this.selectNum,
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            if (type === "all") {
              this.buyData = res.data.data.bid.slice(0, 11);
              this.sellData = res.data.data.ask.slice(0, 11);
              this.totalSell = res.data.data.ask;
              this.totalBuy = res.data.data.bid;
            } else if (type === "buy") {
              this.buyData = res.data.data.bid;
            } else if (type === "sell") {
              this.sellData = res.data.data.ask;
            }
          }
        }
      });
    },
    // 实时成交
    // getMarketTrades() {
    //   marketTradesApi({ symbol: this.coins, marketType: this.marketType }).then(
    //     (res) => {
    //       if (res.status && res.status === 200) {
    //         if (res.data && res.data.success) {
    //           this.tradesArr = res.data.data;
    //         }
    //       }
    //     }
    //   );
    // },
    //获取深度系数
    getDeepths(symbol) {
      $getSymbolInfo({ symbolCode: symbol, marketType: "USDT_M_FUTURE" }).then(
        (res) => {
          if (res.status && res.status === 200) {
            let list = [];
            list = res.data?.data?.depthConfig.split(",") || [];
            let arr = [];
            list.forEach((item, index) => {
              arr.push({
                id: index + 1,
                name: item,
              });
            });
            this.selectArr = arr;
            localStorage.setItem("selectNum2", this.selectArr[0].name);
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.order-form {
  width: 100%;
  height: 100%;
  background: var(--main-bg);
  .tabs {
    height: 38px;
    line-height: 38px;
    border-radius: 6px 6px 0px 0px;
    display: flex;
    padding-left: 10px;
    // &.dark {
    //   background-color: #1e2335;
    // }
    .tab {
      color: #96a2b2;
      font-size: 16px;
      font-weight: 540;
      margin-right: 30px;
      cursor: pointer;
    }
    .tab-active {
      color: var(--main-text-color);
      border-bottom: 2px solid #90ff00;
    }
    .active {
      color: var(--main-text-color);
    }
  }
  .top {
    background: var(--main-bg);
    border-radius: 6px 6px 0px 0px;
    padding: 15px 0 0 10px;
    .handlers {
      display: flex;
      justify-content: space-between;
      
      .handler-select {
        position: relative;
        font-size: 12px;
        color: var(--main-text-color);
        cursor: pointer;
        .select-top {
          position: relative;
          margin-right: 10px;
          width: 96px;
          height: 24px;
          // background: var(--deep-bg);
          background: #0e0e0e;
          border-radius: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          .select-icon {
            padding-right: 5px;
            position: absolute;
            right: 0;
          }
        }

        .select-b {
          width: 96px;
          padding: 5px 0;
          background: var(--select-bg);
          position: absolute;
          left: 0;
          top: 29px;
          z-index: 9999;
          box-shadow: 0px 0px 4px 0px rgba(229, 232, 245, 0.5);
          border-radius: 6px;
          .select-item {
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            text-align: center;
            &:hover {
              background-color: var(--select-hover);
            }
          }
        }
        .dark {
          box-shadow: none;
        }
      }
      .handler {
        display: inline-block;
        margin-right: 10px;
        width: 24px;
        height: 24px;
        background-size: 100% 100%;
        cursor: pointer;
        &.handler-all {
          background-image: url("@/assets/contract-imgs/plate_all.png");
          &.active {
            background-image: url("@/assets/contract-imgs/plate_all_active.png");
          }
        }
        &.handler-green {
          background-image: url("@/assets/contract-imgs/plate_green.png");
          &.active {
            background-image: url("@/assets/contract-imgs/plate_green_active.png");
          }
        }
        &.handler-red {
          background-image: url("@/assets/contract-imgs/plate_red.png");
          &.active {
            background-image: url("@/assets/contract-imgs/plate_red_active.png");
          }
        }
      }
    }
    .table {
      height: 100%;
      padding-right: 10px;
      margin-top: 15px;
      .table-header {
        font-size: 12px;
        color: #96a2b2;
      }
      .plate-nowprice {
        margin-top: 10px;
        .price {
          margin-right: 5px;
          font-size: 18px;
        }
        .price-right {
          margin-left: 5px;
          font-size: 14px;
          color: #96a2b2;
        }
      }
      .table-box {
        margin-top: 10px;
        font-size: 12px;
        &::-webkit-scrollbar {
          display: none;
        }
        overflow-y: scroll;
        .table-item {
          height: 20px;
          line-height: 20px;
          position: relative;
          .ask_bg {
            @include handicapBg();
            background-color: rgba(247, 95, 82, 0.1);
          }
          .bid_bg {
            @include handicapBg();
            background-color: rgba(55, 188, 133, 0.1);
          }
          &:hover {
            background-color: var(--handicap-hover); 
          }
        }
      }
    }
  }
  .new-price {
    font-size: 12px;
    color: var(--main-text-color);
    padding: 0 10px;
    .new-header {
      margin: 15px 0 10px 0;
      color: #96a2b2;
    }
    .new-box {
      height: 425px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .new-item {
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
.buy {
  color: #90ff00 !important;
}
.sell {
  color: #f75f52 !important;
}
.hight-active {
  height: 345px;
}
</style>
