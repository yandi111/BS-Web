<template>
 <div class="spotTrading">
  <div class="main">
   <div class="echarts flex">
    <Banner />

    <TradingView :contract-type="false"/>
   </div>
   <SpotHandicap />
   <transaction/>
  </div>
  <TabsTable/>
 </div>
</template>

<script>
import Banner from "@/views/spotTrading/banner/banner.vue";
import TabsTable from "./tabsTable/tabsTable.vue";
import TradingView from "./tradingView/tradingView.vue";
import transaction from "./transaction/index.vue";
import SpotHandicap from "./spotHandicap/spotHandicap.vue";

export default {
 name: "SpotTrading",
 components: {
  Banner,
  TabsTable,
  TradingView,
  transaction,
  SpotHandicap
 },
};
</script>

<style lang="scss" scoped>
.spotTrading {
 color: var(--main-text-color);
 width: 100%;

 .main {
  width: 100%;
  display: flex;
  border-bottom: 1px solid $border-color;
  .echarts {
   flex: 1 1 auto;
   width: 1%;
   flex-direction: column;
  }

  .left {
   flex: 1;

   .left-top {
    display: flex;
    justify-content: space-between;
    height: 690px
   }

   .table {
    width: 100%;
    height: 416px;
    border-radius: 0px 0px 6px 6px;
    margin-top: 5px;
    margin-bottom: 10px;
   }
  }
 }
}

::v-deep {
 .trade-view {
  flex: 1 1 auto;
  height: 1%;
 }
}
</style>
