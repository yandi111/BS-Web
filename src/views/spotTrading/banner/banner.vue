<template>
 <div class="banner flex" @mouseleave="mouseleave">
  <div class="coinType" @mouseenter="mouseenter">
   <div class="label flex">
    <h1 class="flex">
     {{ getCoins.name || '--' }}
     <span>{{$t('lang_795')}}</span>
    </h1>
    <i class="el-icon-caret-bottom triangle" />
   </div>

   <coinTypePopup :isShow.sync="isShow" :list="symbolList" :getCoins="getCoins" @chooseCoin="chooseCoin"/>
  </div>

  <h6 :class="`${setClassData(info.fluctuation).className} price-change`">{{info.marketPrice || '- -'}}</h6>

  <div class="item">
   <label>{{ $t("home_59") }}</label>
   <p v-if="info.fluctuation" :class="setClassData(info.fluctuation).className">{{ setClassData(info.fluctuation).txt }}{{ info.rate }}</p>
   <p class="price" v-else>--</p>
  </div>
  <div class="item">
   <label>{{$t('home_60')}}</label>
   <p class="price">{{ info.high || "- -" }}</p>
  </div>

  <div class="item">
   <label>{{$t('home_61')}}</label>
   <p class="number">{{ info.low || '--' }}</p>
  </div>
  <div class="item">
   <label>{{$t('home_62')}} <span>({{ getCoins.coinSymbol || '--' }})</span></label>
   <p class="price">{{ info.vol || "- -" }}</p>
  </div>
 </div>
</template>

<script>
import coinTypePopup from "./coinTypeSearch-popup.vue"; // 导入交易对选择弹窗组件
import {mapGetters, mapMutations} from "vuex";
import {GetTradingPairs} from "@/api/spotTrading";
import {NumberFormat} from "@/utils/format";

export default {
 name: "banner-page", // 组件名称
 components: {
  coinTypePopup, // 注册子组件
 },
 data() {
  return {
   getCoins: {},
   symbolList: [], // 交易对列表
   info: {}, // 买卖盘信息

   isShow: false, // 是否显示弹窗
   contractData: [], // 合约数组
   contractSearchData: [], // 合约搜索数据
   optionaSearchlData: [], // 可选搜索数据
   headerData: {}, // 头部行情数据
   tdCoinData: {}, // 交易对数据
   currentIndex: 0, // 弹窗 tab 下标
   fistEnter: true, // 第一次进入搜索弹窗
   markedPrice: undefined, // 标记价格
   coinsName: "", // 交易对小写
   time: undefined, // 倒计时的时间
   fundingRate: undefined, // 资金费率
  };
 },

 methods: {
  ...mapMutations(['setSelectNum']),

  // 根据涨跌幅给予样式
  setClassData(e) {
   let className = ''
   let txt = ''

   if (+e > 0) {
    className = 'add'
    txt = '+'
   }
   if (+e < 0) {
    className = 'reduce'
   }

   return {
    className,
    txt
   }
  },

  // 展开搜索
  toggle() {
   this.isShow = !this.isShow; // 切换弹窗显示状态
  },

  mouseenter() {
   if (this.fistEnter) {
    this.fistEnter = false; // 设置为非第一次进入
   }
   this.isShow = true; // 显示弹窗
  },

  mouseleave() {
   this.isShow = false; // 鼠标离开时隐藏弹窗
  },

  // 选择交易对
  chooseCoin(val) {
   this.getCoins = val
   this.$EventBus.$emit("getCoins", this.getCoins)
  },

  // 获取交易对
  async getCurrency() {
   try {
    const res = await GetTradingPairs()

    if (res.data.length === 0) return

    this.symbolList = res.data.map(item => {
     return {
      name: item.spotCoin.coinsName,
      id: item.spotCoin.id,
      depthInterval: item.spotCoin.depthInterval,
      coinScale: item.spotCoin.coinScale,
      coinSymbol: item.spotCoin.coinSymbol,
      closePrice: item.spotCoinMarket.closePrice,
      volatility: item.spotCoinMarket.volatility,
      ratio: NumberFormat({val: item.spotCoinMarket.volatility, minimumFractionDigits: item.spotCoin.coinScale, style: 'percent'}),
      logo: item.spotCoin.logo,
      coinTitle: item.spotCoin.coinSymbol + item.spotCoin.baseSymbol,
      coinId: item.spotCoin.coinId
     }
    })
    this.getCoins = this.symbolList[0]
    this.$EventBus.$emit("getCoins", this.getCoins)
   } catch (err) {}
  },
 },
 async created() {
  await this.getCurrency()

  await this.$EventBus.$on("currencyInfo", e => {
   this.info = {
    marketPrice: NumberFormat({val: e.close, minimumFractionDigits: this.getCoins.coinScale}),
    fluctuation: e.rate,
    rate: NumberFormat({val: e.rate, minimumFractionDigits: this.getCoins.coinScale, style: 'percent'}),
    high: NumberFormat({val: e.high, minimumFractionDigits: this.getCoins.coinScale}),
    low: NumberFormat({val: e.low, minimumFractionDigits: this.getCoins.coinScale}),
    vol: NumberFormat({val: e.volume, minimumFractionDigits: this.getCoins.coinScale}),
   }
  })
 },
 computed: {
  // ...mapState(["setting"]), // 映射 Vuex 状态
  ...mapGetters([
   'getVolData',
   'getTimeStamp',
  ]), // 映射 Vuex 计算属性

  coneNameInfo() {   // 币对列表的子币值
   return ''
  },
 },
 watch: {
  markedPrice: {
   async handler(newValue) {
    newValue = this.markedPrice; // 更新标记价格
    await this.$store.dispatch("handleMarkedPrice", newValue); // 更新 Vuex 中的标记价格
   },
  },
 },
};
</script>

<style lang="scss" scoped>
.buy {
 color: #0CBB57 !important; // 设置买入项颜色
}

.sell {
 color: #ED3C2F !important; // 设置卖出项颜色
}

.triangle {
 margin-left: 4px;
}

.rotate {
 transform: rotate(180deg);
 /* 旋转 180 度 */
}

.banner {
 align-items: center;
 padding: 6.5px 20px;
 font-size: 12px;
 border-bottom: 1px solid $border-color;

 .coinType {
  position: relative; // 设置相对定位
  display: flex; // 使用 flex 布局
  align-items: center; // 垂直居中对齐
  margin-right: 15px; // 设置右边距
  z-index: 100; // 设置层级
  cursor: pointer; // 鼠标悬停时显示为手型

  .label {
   align-items: center;

   h1 {
    flex-direction: column;
    color: #fff;
    font: {
     size: 20px;
     weight: bold;
    }
    span {
     color: #fff;
     font: {
      size: 14px;
      weight: bold;
     }
    }
   }
   .el-icon-caret-bottom {
    color: #B3B3B3;
    transition: .3s;
   }
   &:hover {
    .el-icon-caret-bottom {
     transform: rotate(180deg);
     transition: .3s;
    }
   }
  }

  .toggle-icon {
   width: 40px; // 设置图标宽度
   height: 40px; // 设置图标高度
   margin-left: 5px; // 设置左边距
  }

  .iconfont {
   font-size: 34px; // 设置图标字体大小
   margin-left: 8px; // 设置左边距
   color: var(--main-text-color); // 设置图标颜色
  }
 }

 .price-change {
  margin-right: 20px;
  font: {
   size: 20px;
   weight: bold;
  }
 }

 .item {
  &:not(:last-child) {
   margin-right: 25px;
  }
  label {
   font: {
    size: 12px;
   }
   color: #737373;

   span {
    font: {
     size: 12px;
    }
    color: #90FF00;
   }
  }

  .price {
   font: {
    size: 11px
   }

   span {
    font: {
     size: 11px
    }
   }
  }

  .tip {
   margin-left: 5px; // 设置左边距
   color: #8992a6; // 设置提示图标颜色
   font-size: 26px; // 设置提示图标字体大小
   cursor: pointer; // 鼠标悬停时显示为手型

   &:hover {
    color: lighten(#8992a6, 10%); // 悬停时变亮
   }
  }
 }
}
</style>