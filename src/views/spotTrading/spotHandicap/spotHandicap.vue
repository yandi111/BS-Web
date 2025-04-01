<template>
 <div class="orderForm">
  <div class="tabs">
   <a
    class="tab"
    :class="tabIndex === item.id ? 'tab-active' : ''"
    v-for="item in tabsArr"
    :key="item.id"
    @click="tabChange(item.id)"
   >
    {{ item.label }}
   </a>
  </div>

  <div class="tabs-icon flex" v-if="tabIndex === 1">
   <div class="handlers-icon">
    <span @click="changePlate('all')" class="handler handler-all" :class="{ active: selectedPlate === 'all' }" />
    <span @click="changePlate('sell')" class="handler handler-red" :class="{ active: selectedPlate === 'sell' }" />
    <span @click="changePlate('buy')" class="handler handler-green" :class="{ active: selectedPlate === 'buy' }" />
   </div>

   <el-dropdown>
    <p class="el-dropdown-link">
     {{ depthIntervalVal }}<i class="el-icon-caret-bottom el-icon--right"></i>
    </p>
    <el-dropdown-menu slot="dropdown">
     <el-dropdown-item v-for="(item, index) of depthInterval" :key="index">{{ item }}</el-dropdown-item>
    </el-dropdown-menu>
   </el-dropdown>
  </div>

  <div class="table" v-if="tabIndex === 1">
   <div class="table-header">
    <el-row>
     <el-col :span="8">
      <p class="label">{{ $t("lang_1325") }}(USDT)</p>
     </el-col>
     <el-col :span="6">
      <p class="unit label">{{ $t("lang_1352") }}</p>
     </el-col>
     <el-col :span="10">
      <p class="unit label">{{ $t("lang_901") }}</p>
     </el-col>
    </el-row>
   </div>
<!--   <div class="plate-nowprice" v-show="selectedPlate !== 'all'">-->
<!--    <span v-if="+marketInfo.fluctuation > 0" class="buy">↑</span>-->
<!--    <span v-else class="sell">↓</span>-->
<!--    <span :class="[+marketInfo.fluctuation > 0 ? 'buy' : 'sell', 'price']">{{ marketInfo.marketPrice }}</span>-->
<!--   </div>-->
   <div v-show="selectedPlate === 'all' || selectedPlate === 'sell'" :class="[selectedPlate === 'sell' ? 'active-list' : '', 'table-list mb-15']">
    <div
      class="table-item"
      :class="selectedPlate === 'sell' ? 'table-active' : ''"
      v-for="(item, index) in sellData"
      :key="index"
     >
      <div class="pointer">
       <el-row>
        <el-col :span="8">
         <div class="sell">{{ item.price }}</div>
        </el-col>
        <el-col :span="6">
         <div style="text-align: right">{{ item.number }}</div></el-col>
        <el-col :span="10">
         <div style="text-align: right">{{ item.amount }}</div>
        </el-col>
       </el-row>
      </div>
      <div :style="`width: ${(item.number / totalSellAmount) * 100}%`" class="ask_bg"></div>
     </div>
   </div>
   <div :class="[['sell', 'all'].includes(selectedPlate) ? 'mb-15' : '', 'plate-nowprice flex']">
    <span v-if="+marketInfo.fluctuation > 0" class="buy">↑</span>
    <span v-else class="sell">↓</span>
    <span :class="[+marketInfo.fluctuation > 0 ? 'buy' : 'sell', 'price']">{{ marketInfo.marketPrice }}</span>
   </div>
   <div v-show="selectedPlate === 'all' || selectedPlate === 'buy'" :class="[selectedPlate === 'buy' ? 'active-list' : '', 'table-list']">
    <div
      class="table-item"
      :class="selectedPlate === 'buy' ? 'table-active' : ''"
      v-for="(item, index) in buyData"
      :key="index">
      <div class="pointer">
       <el-row>
        <el-col :span="8">
         <div class="buy">{{ item.price }}</div>
        </el-col>
        <el-col :span="6">
         <div style="text-align: right">{{ item.number }}</div>
        </el-col>
        <el-col :span="10">
         <div style="text-align: right">{{ item.amount }}</div>
        </el-col>
       </el-row>
      </div>
      <div :style="`width: ${(item.number / totalBuyAmount) * 100}%`" class="bid_bg"></div>
     </div>
   </div>
  </div>

 <div class="news-table" v-if="tabIndex === 2">
  <div class="new-header">
    <el-row>
      <el-col :span="9">
      <div class="newPrice label">
       {{ $t("lang_917") }}(USDT)
      </div>
     </el-col>
     <el-col :span="9">
      <div class="newPrice label">
       {{ $t("lang_1013") }}(USDT)
      </div>
     </el-col>
    <el-col :span="6">
      <div class="newPrice label">{{ $t("lang_2018") }}</div>
     </el-col>
    </el-row>
   </div>
   <div class="new-box">
    <el-row class="new-item" v-for="(item, index) in tradesArr" :key="index">
      <el-col :span="9">
      <div :class="[item.direction === 1 ? 'buy' : 'sell', 'newPrice']">{{ item.price }}</div>
     </el-col>
     <el-col :span="9">
      <div class="newPrice">{{ item.amount }}</div>
     </el-col>
     <el-col :span="6">
      <div class="newPrice">{{ item.time }}</div>
     </el-col>
    </el-row>
   </div>
  </div>
 </div>
</template>

<script>
import {webSocketMixin} from "../tradingView/webSocket";
import {getDate} from "@/libs/utils";
import {mapGetters} from "vuex";
import { NumberFormat } from "@/utils/format";
import dayjs from 'dayjs'

export default {
 name: "spotHandicap",
 mixins: [webSocketMixin],
 data() {
  return {
   tabIndex: 1,

   type: 'DepthPlate',

   headerArr: [
    {
     id: 0,
     label: "",
    },
   ],
   tabsArr: [
    {
     id: 1,
     label: this.$t("lang_879"),
    },
    {
     id: 2,
     label: this.$t("lang_1115"),
    },
   ],

   tradesArr: [], //最新成交
   buyData: [], //盘口 买
   sellData: [], //盘口 卖

   selectedPlate: "all", //当前显示的买卖盘

   totalSell: [],
   totalBuy: [],
   marketInfo: {},

   coins: "", //交易对大写
   coinsName: "", //交易对小写
   baseAssetCode: "", //币种数量单位
   quoteAssetCode: "", //币种价格单位

   depthInterval: [], // 间隔
   depthIntervalVal: '', // 默认间隔

   symbol: ''
  };
 },
 computed: {
  ...mapGetters(["getTheme"]),

  totalSellAmount() {
   return this?.totalSell[0]?.number || 0;
  },
  totalBuyAmount() {
   return this?.totalBuy[this.totalBuy.length - 1]?.number || 0;
  },
  changeNum() {
   const currentNumber = Number(
    this.$store.state.spots.spotPriceObj.lastPrice
   );
   const previousNumber = Number(localStorage.getItem("previousNumbers"));

   if (currentNumber >= previousNumber) {
    localStorage.setItem(
     "previousNumbers",
     this.$store.state.spots.spotPriceObj.lastPrice
    );
    return true;
   } else {
    localStorage.setItem(
     "previousNumbers",
     this.$store.state.spots.spotPriceObj.lastPrice
    );
    return false;
   }
  },

  data() {
   return {

   }
  }
 },
 watch: {
 },

 filters: {
  formatDate(time) {
   return getDate(time);
  },
  //单位换算
  formatNumberWithUnit(number) {
   if (!number) {
    return 0;
   }
   if (number >= 1000000) {
    return (
     (number / 1000000)
      ?.toFixed(2)
      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "M"
    );
   } else if (number >= 1000) {
    return (
     (number / 1000)?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
     "K"
    );
   } else {
    return Number(number);
   }
  },
 },
 created() {
 },
  mounted() {
    this.$EventBus.$on('getCoins', e => {
      this.symbol = e

      if (!this.websock) this.webSocket();

      this.depthInterval = e.depthInterval.split(',')

      if (this.depthInterval.length) this.depthIntervalVal = this.depthInterval[0]
      this.websock.onopen = () => {
        this.websock.send(JSON.stringify({
          cmd: 'SUBSCRIBE',
          data: {
            topic: `trade-market-depth-${e.name}-${this.depthIntervalVal}`,
            format: this.depthIntervalVal,
            symbol: e.name
          }
        }))

        this.websock.send(JSON.stringify({
          cmd: 'SUBSCRIBE',
          data: {
            topic: `spot-trade-${this.symbol.name}`,
          }
        }))
      }
  })
 },
  methods: {
    changePlate(str) {
      this.selectedPlate = str

      this.sellData = this.totalSell.slice(
        0,
        this.selectedPlate === "all" ? 9 : 19
      ); // 卖
      this.buyData = this.totalBuy.slice(
        0,
        this.selectedPlate === "all" ? 9 : 19
      ); // 买
    },

    tabChange(e) {
      this.tabIndex = e
    },

  // 订单表
   getOrder(data) {
     data.ask.items.forEach((item) => {
       item.price = NumberFormat({ val: item.price });
       item.number = NumberFormat({ val: item.number });
       item.amount = NumberFormat({ val: item.amount });
     });

     data.bid.items.forEach((item) => {
       item.price = NumberFormat({ val: item.price });
       item.number = NumberFormat({ val: item.number });
       item.amount = NumberFormat({ val: item.amount });
     });

     this.sellData = data.ask.items.slice(
       0,
       this.selectedPlate === "all" ? 9 : 19
     ); // 卖
     this.buyData = data.bid.items.slice(
       0,
       this.selectedPlate === "all" ? 9 : 19
     ); // 买

     this.totalSell = data.ask.items;
     this.totalBuy = data.bid.items;

     this.marketInfo = {
       marketPrice: NumberFormat({ val: data.marketPrice }),
       fluctuation: data.fluctuation,
       marketPriceCny: data.marketPriceCny,
     };
   },

   // 最新成交价
   getNewOrder(e) {
    this.tradesArr.unshift({
      price: NumberFormat({val: e.price}),
      amount: NumberFormat({val: e.amount}),
      time: dayjs(+e.createTimeLong).format('HH:mm:ss')
    })

    if (this.tradesArr.length > 30) this.tradesArr.splice(-1, 1)
   }
 },
};
</script>

<style lang="scss" scoped>
.orderForm {
  display: flex;
  flex-direction: column;
 min-width: 278px;
 width: 14.479%;
 height: 690px;
 border-left: 1px solid $border_color;
 border-right: 1px solid $border_color;

 .tabs {
  display: flex;
  border-bottom: 1px solid $border_color;

  .tab {
   padding: 18px 10px 24px;
   position: relative;

   &:not(:last-child) {
    margin-right: 6px;
   }

   color: #737373;
   font-size: 12px;
   font-weight: 500;
   cursor: pointer;

   &.tab-active {
    color: #90FF00;

    &:after {
     content: '';
     position: absolute;
     bottom: 18px;
     left: 50%;
     transform: translateX(-50%);
     width: 18px;
     height: 2px;
     background-color: #90FF00;
    }
   }
  }
 }

 .tabs-icon {
  padding: 10px;
  justify-content: space-between;

  .el-dropdown {
   cursor: pointer;

   p {
    color: #737373;
    font: {
     size: 12px;
     weight: 600;
    };

    .el-icon--right {
     margin-left: 4px;
    }
   }
  }

  .handlers-icon {
   display: flex;
   align-items: center;

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
 }

 .table {
  display: flex;
  flex-direction: column;
  height: 595px;
  padding: 0 10px;

  .label {
   color: #737373;
   font: {
    size: 12px;
    weight: 500;
   }
  }

  .table-header {
   margin-bottom: 10px;
   font-size: 14px;
   color: #96a2b2;
  }

  .plate-nowprice {
   align-items: center;
   .sell {
    font: {
     size: 18px;
     weight: bold;
    }
   }

   .price {
    margin-left: 5px;
   }
  }

  .t-flex {
   display: flex;
   flex-direction: column;
   min-height: 100%;
  }

  .table-item {
    position: relative;

    .ask_bg {
      max-width: 100%;
     @include handicapBg();
     background-color: rgba(247, 95, 82, 0.1);
    }

    .bid_bg {
      max-width: 100%;
     @include handicapBg();
     background-color: rgba(55, 188, 133, 0.1);
    }

    &:hover {
     background-color: var(--handicap-hover);
    }
   }
 }

 .news-table {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 1%;
  padding-bottom: 10px;
  font-size: 16px;
  color: var(--main-text-color);

  .new-header {
   margin: 8 0 0 0;
   color: #96a2b2;
  }

  .new-box {
   flex: 1 1 auto;
   height: 1%;
   overflow-y: scroll;

   &::-webkit-scrollbar {
    display: none;
   }
  }
 }

 ::v-deep {
  .el-col {
   div {
    padding: 6px 0;
    font: {
     size: 12px;
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

 .table-list {
  display: flex;
  flex-direction: column;

  &.active-list {
    flex: 1 1 auto;
    height: 1%;
  }
 }

 .unit {
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis; //文本溢出显示省略号
  white-space: nowrap; //文本不会换行
 }
}

.newPrice {
  padding: 6px 10px !important;
  font: {
    size: 11px;
    weight: 500
  }

  &.label {
    color: #737373;
    font: {
      size: 12px
    }
  }
}
</style>
