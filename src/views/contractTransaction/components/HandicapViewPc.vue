<template>
  <div class="tradingview_form">
    <el-tabs class="tab" v-model="orderName" @tab-click="orderTab">
      <el-tab-pane label="委托订单" name="order">
        <ul class="form_tabs">
          <li>价格(USDT)</li>
          <li>数量(BTC)</li>
          <li>合计(BTC)</li>
        </ul>
        <div class="form_border"></div>
        <ul class="form_data">
          <li
            v-for="(item, index) in handicapData.ask"
            :key="index"
            style="color: #f75f52"
          >
            <span style="color: #f75f52">{{ item.price }}</span>121212
            <span style="color: #fdfdfd">{{ item.num }}</span>
            <span style="color: #fdfdfd">{{ item.sum }}</span>
            <div style="transform: translateX(-20.2%)" class="ask_bg"></div>
          </li>
        </ul>

        <div style="margin: 24px 0">
          <span
            :class="[
              parseFloat(marketInfo.change) >= 0 ? 'lastPrice_rise' : 'lastPrice_fall',
            ]"
            >{{ marketInfo.lastPrice }}</span
          >
          <span style="padding-left: 20px; font-size: 14px; color: #8992a6"
            >20118.23</span
          >
        </div>
        <ul class="form_data">
          <li v-for="(item, index) in handicapData.bid" :key="index">
            <span style="color: #37bc85">{{ item.price }}</span>
            <span style="color: #fdfdfd">{{ item.num }}</span>
            <span style="color: #fdfdfd">{{ item.sum }}</span>
            <div style="transform: translateX(-50%)" class="bid_bg"></div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="成交记录" name="record">
        <ul class="form_tabs">
          <li>时间</li>
          <li>价格(USDT)</li>
          <li>数量(BTC)</li>
        </ul>
        <div class="form_border"></div>
        <ul class="form_data">
          <li v-for="(item, index) in tradesArr" :key="index">
            <span>{{ item.time | formatDate }}</span>
            <span :class="item.direction == 1 ? 'buy' : 'sell'">{{
              item.price
            }}</span>
            <span>{{ item.num }}</span>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getDate } from "@/libs/utils";
import { handicapApi, marketTradesApi } from "@/api/contractTransaction";
import { webSocketMixin } from "../sTradingviewPc/mixin/webSocket";
export default {
  name: "HandicapView",
  mixins: [webSocketMixin],
  data() {
    return {
      wsUrl: "ws://192.168.0.11/ws/zh_cn",
      //盘口数据
      handicapData: {
        ask: [],
        bid: [],
      },
      // 成交记录
      orderName: "order",
      tradesArr: [],
      // 单个行情信息
      marketInfo: {
        lastPrice: "", //最新价格
        higePrice: "", //最高价格
        lowPrice: "", //最低价
        volOf24h: "", //24成交量
        change: "", //涨跌幅
      },
    };
  },
  filters: {
    formatDate(time) {
      return getDate(time);
    },
  },
  mounted() {
    this.$EventBus.$on("sendMsg", (msg) => {
      this.marketInfo = msg;
    });
    this.getHandicap();
    this.getMarketTrades();
  },
  methods: {
    websockOpen(e) {
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.websockSend("depthData"); //委托订单
      this.websockSend("tradeData"); //成交记录
    },
    // 盘口
    getHandicap() {
      // handicapApi({
      //   symbol: "BTC/USDT",
      //   marketType: "USDT_M_FUTURE",
      // }).then((res) => {
      //   const data = res.data;
      //   if (data.code == 1) {
      //     const { ask, bid } = data.data;
      //     this.handicapData.ask = ask.slice(0, 6);
      //     this.handicapData.bid = bid.slice(0, 6);
      //   }
      // });
    },
    // 实时成交
    // getMarketTrades() {
    //   marketTradesApi({ symbol: "BTC/USDT", marketType: "USDT_M_FUTURE" }).then(
    //     (res) => {
    //       const data = res.data;
    //       if (data.code == 1) {
    //         this.tradesArr = data.data.slice(0, 14);
    //         // console.log("实时成交", this.tradesArr);
    //       }
    //     }
    //   );
    // },

    orderTab(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.lastPrice_rise{
  color: #37bc85;
}
.lastPrice_fall{
  color: #f75f52;
}
.tradingview_form {
  background: #000622;
  width: 350px;
  height: 500px;
  margin-left: 5px;
  .tab {
    margin: 0 15px;
    color: #96a2b2;
    .form_tabs {
      display: flex;
      justify-content: space-between;
      li {
        font-size: 14px;
      }
    }
    .form_border {
      margin-top: 14px;
      border-top: 1px solid #2e3442;
    }
    .form_data {
      li {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 28px;
        line-height: 28px;
        span {
          display: inline-block;
          font-size: 14px;
        }
        .ask_bg {
          @include handicapBg();
          background-color: rgba(247, 95, 82, 0.3);
        }
        .bid_bg {
          @include handicapBg();
          background-color: rgba(55, 188, 133, 0.3);
        }
        .buy {
          color: #37bc85;
        }
        .sell {
          color: #f75f52;
        }
      }
    }
  }
}
</style>