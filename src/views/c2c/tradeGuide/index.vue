<!-- c2c交易指南 -->
<template>
  <div class="trade-guide">
    <div class="banner-img">{{ $t(t+'无需兑币，轻松交易') }}</div>
    <div class="guide-content">
      <getting-started v-if="activeFocusIndex === 0"></getting-started>
      <merchant-plan v-if="activeFocusIndex === 1"></merchant-plan>
    </div>
  </div>
</template>

<script>
import GettingStarted from "./components/gettingStarted.vue";
import MerchantPlan from "./components/merchantPlan.vue";
import { getMerchantInfo } from "@/api/otc.js";
export default {
  name: "TradeGuide",
  components: {
    GettingStarted,
    MerchantPlan,
  },
  data() {
    return {
     // 国际缩写
        t: 'c2c.',
      activeFocusIndex: 1,
      focusList: ["入门须知", "商家计划"],
    };
  },
  mounted() {
    // 查询商户信息
    getMerchantInfo().then((res) => {
      //  console.log(res.data,'sdajkl')
    });
  },
  methods: {
    handleFocusNav(index) {
      this.activeFocusIndex = index;
    },
  },
};
</script>
<style lang="scss" scoped>
.trade-guide {
  width: 100%;
  padding-bottom: 120px;
  .banner-img {
    width: 100%;
    height: 200px;
    background: url("@/assets/images/tradeZn.png") no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 46px;
    font-family: FZDHTK--GBK1-0, FZDHTK--GBK1;
    font-weight: normal;
    color: #333330;
  }
  .guide-content {
    padding: 0 240px;
  }

  ::v-deep   .otc-content {
    padding: 0;
  }

  ::v-deep   .otc-content .oct-topNav .left-panel > li {
    text-align: left;
  }
  .topNav {
    width: 100%;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 1px solid #eeeeee;
    color: #8992a6;
    height: 60px;
    line-height: 60px;
    .mr40 {
      font-weight: bold;
    }
    .tabs {
      border-bottom: 1px solid transparent;
      font-weight: bold;
      &-active {
        color: #333333;
        border-bottom: 1px solid #90ff00;
      }
    }
  }
}
</style>
