<template>
 <div class="right flex">
  <div class="top-tab flex">
   <a :class="[tabsType === 1 ? 'top-tab-active' : '']">{{$t('lang_1263')}}</a>
   <a :class="[tabsType === 2 ? 'top-tab-active' : '']">{{$t('lang_1264')}}</a>
  </div>

  <el-main class="main">
   <div class="subTabs flex">
    <a v-for="(item, index) of tabs" :key="index" :class="activeTab === index && 'active'" @click="activeTab = index">{{ item }}</a>
   </div>

   <label class="assets flex">
    {{$t('lang_1919')}}

    <span>{{ info[0].availableAmount || 0 }} {{ info[0].coinName || '' }}</span>
   </label>

   <Limit :info="info" v-show="activeTab === 0" :currency="currency" :tabsType="tabsType" :getCoins="getCoins" />
   <Market :info="info" v-show="activeTab === 1" :currency="currency" :tabsType="tabsType" :getCoins="getCoins" />
   <Condition :info="info" v-show="activeTab === 2" :currency="currency" :tabsType="tabsType" :getCoins="getCoins" />

   <div class="currency flex">
    <div v-for="item of info" class="info flex">
     <p class="info_name">{{ item.coinName }}<span>{{$t('lang_1919')}}</span></p>
     <p class="info_price">{{ item.availableAmount }}</p>
    </div>
   </div>

   <div class="btn flex">
    <el-button>{{$t('lang_73')}}</el-button>
    <el-button>{{$t('lang_696')}}</el-button>
   </div>
  </el-main>
 </div>
</template>

<script>
import Market from "@/views/spotTrading/transaction/components/Market.vue";
import Limit from "@/views/spotTrading/transaction/components/Limit.vue";
import Condition from "@/views/spotTrading/transaction/components/Condition.vue";
import {webSocketMixin} from "../tradingView/webSocket";
import { GetUserSpotAssets } from '@/api/spotTrading'
import { NumberFormat } from "@/utils/format";

export default {
 name: "",
 components: {Condition, Limit, Market},
 mixins: [webSocketMixin],
 data() {
  return {
   // 买 | 卖
   tabsType: 1,

   tabs: ['限价', '市价', '条件'],

   activeTab: 0,

   currency: [],

   getCoins: {},

   info: [],
  };
 },
 created() {
  this.$EventBus.$on('getCoins', e => {
   this.getUserCurrency(e)
   this.getCoins = e

   if (!this.websock) this.webSocket();

   this.websock.onopen = () => {
    this.websock.send(JSON.stringify({
     cmd: 'SUBSCRIBE',
     data: {
      topic: `spot-wallet-asset-1863597978541412353-${this.getCoins.coinSymbol}`
     }
    }))
   }
  })
 },
 methods: {

  // 获取用户资产
  async getUserCurrency({coinId}) {
   const res = await GetUserSpotAssets({coinId})
   res.data.forEach(item => {
    item.availableAmount = NumberFormat({val: item.availableAmount})
    item.coinType = item.coinName === 'USDT' ? 0 : 1
   })
   this.info = res.data
   console.log(this.info, 234234)
  }

 },
};
</script>

<style lang="scss" scoped>
.right {
 min-width: 320px;
 width: 16.667%;
 flex-direction: column;

 .top-tab {
  a {
   color: #B3B3B3;
   position: relative;
   padding: 8px 17px;
   font-size: 14px;

   &.top-tab-active {
    color: #fff;
    background-color: #1B1B1B;

    &:after {
     content: '';
     position: absolute;
     bottom: 0;
     left: 50%;
     transform: translateX(-50%);
     width: 18px;
     height: 2px;
     background-color: #90FF00;
    }
   }
  }
 }

 .main {
  padding: 12px 17px;
  flex-direction: column;
  background-color: #1B1B1B;

  .assets {
   margin-bottom: 10px;
   justify-content: space-between;
   align-items: center;
   color: #737373;
   font: {
    size: 12px;
    weight: 500;
   }

   span {
    color: #f4f4f4;
    font: {
     weight: bold;
    }
   }
  }

  .subTabs {
   margin-bottom: 15px;
   a {
    font: {
     size: 13px;
     weight: 500;
    }
    transition: .3s;
    &:not(:last-child) {
     margin-right: 15px;
    }

    &:hover {
     color: #90FF00;
     transition: .3s;
    }

    &.active {
     color: #90ff00;
    }
   }
  }

  ::v-deep {
   .form {
    margin-bottom: 20px;
   }
  }

  .currency {
   margin-bottom: 20px;
   flex-direction: column;

   .info {
    &:not(:last-child) {
     margin-bottom: 8px;
    }

    justify-content: space-between;

    &_name {
     align-items: center;
     font: {
      size: 12px
     }
     color: #B3B3B3;

     span {
      color: #737373;
     }
    }

    &_price {
     font: {
      size: 12px
     }
     color: #fff;
    }
   }
  }

  .btn {
   align-items: center;
   justify-content: space-between;

   .el-button {
    &:not(:last-child) {
     margin-right: 10px;
    }

    padding: 10px 0;
    flex: 1 1 auto;
    width: 1%;
    background-color: #363636;
    border: none;

    ::v-deep {
     font: {
      size: 12px;
      weight: 500;
     }
     color: #B3B3B3;
    }
   }
  }
 }
}
</style>

