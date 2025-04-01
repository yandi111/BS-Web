<template>
 <div class="contractTransaction">
  <coinHeader/>
  <div class="main" style="background-color: #141414;">
   <div class="left">
    <Banner/>
    <div class="left-top">
     <div class="traddingview">
      <TradingView @tradeListFn="tradeListFn"></TradingView>
     </div>
     <div class="order-form">
      <OrderForm :tradeList="tradeList"/>
     </div>
    </div>
    <div class="table">
     <assetOperationList/>

    </div>
   </div>
   <div class="right">
    <transaction/>
    <rightFooter/>
   </div>
  </div>
  <my-loading></my-loading>
 </div>
</template>

<script>
import coinHeader from "./banner/coin-header.vue";
import Banner from "./banner/banner.vue";
import OrderForm from "./orderForm/orderForm.vue";
import transaction from "./transaction/index.vue";
// import TabsTable from "./tabsTable/tabsTable.vue";
import TradingView from "@/views/contractTransaction/tradingView/tradingView.vue";
import myLoading from "@/components/my-loading/index.vue";
import assetOperationList from "../components/swap/assetOperationList.vue";
import rightFooter from "./rightFooter/index.vue"
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
 name: "ContractTransaction",
 components: {
  coinHeader,
  Banner,
  OrderForm,
  transaction,
  TradingView,
  myLoading,
  assetOperationList,
  rightFooter
 },
 data() {

  return {
   selectNum: "0.1",
   tradeList: []
  }

 },
 computed: {
  ...mapGetters(['getSelectNum', 'getCoinsName', 'getInterval', 'getToken'])
 },
 mounted() {
  let tokenstate =  this.$store.getters.getToken
    if(tokenstate) {
        this.fetchUserInfo();
    }
//   this.fetchUserInfo();
  // if (this.getToken) {
  //   this.userInfo()
  // }
  // this.getHandicap()
 },
 created() {
  this.fetchInitListInfo()  // 初始化list的数据
 },
 watch: {
  // getCoinsName(newVal) {
  //   // 检查 newVal 是否存在
  //   if (newVal) {
  //     this.getHandicap(); // 调用 getHandicap 方法
  //   }
  // },
 },
 methods: {
  ...mapActions(['fetchInitListInfo', 'fetchUserInfo']),
  ...mapMutations(['setAsksList', 'setBidsList', 'setLastPrice', 'setSellPriceInfo',
   'setIndexPrice', 'setIncrease24H', 'setMaxPrice24H', 'setFundingRate', 'setMinPrice24H', 'setVolData', 'setTimeStamp',
   'setOpen', 'setHigh', 'setLow', 'setClose', 'setVol'
  ]),
  tradeListFn(type) {
   this.tradeList = type
  }


 },


};
</script>

<style lang="scss" scoped>
.contractTransaction {
 color: var(--main-text-color);
 height: 100%;
 position: relative;

 .main {
  height: 100%;
  display: flex;
  justify-content: space-between;

  // border-top: 1px solid #252525;
  // margin-top: 5px;
  .left {
   flex: 1;

   .left-top {
    display: flex;
    justify-content: space-between;
    height: 690px;
    border: 1px solid #252525;
    border-right: none !important;

    .traddingview {
     // width: 1210px;
     flex: 1;
     height: 100%;
     background: var(--main-bg);
     margin-right: 5px;
    }

    .order-form {
     width: 355px;
     height: 100%;
     background-color: var(--main-bg);
     background: #141414;
    }
   }

   .table {
    width: 100%;
    // height: 416px;
    // height: 440px;
    // background-color: var(--main-bg);
    // border-radius: 0px 0px 6px 6px;
    // margin-top: 5px;
    // margin-bottom: 10px;
   }
  }

  .right {
   display: flex;
   flex-direction: column;
   width: 488px;
   // background: var(--main-bg);
   border-radius: 6px;
   // margin-left: 5px;
   // margin-bottom: 10px;
   background-color: #141414;
   // height: 770px;
   position: relative;
  }
 }
}
</style>
