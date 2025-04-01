<template>
<div></div>
</template>

<script>
import { mapState } from "vuex";
import tradeSetting from "../components/tradeSetting.vue";
import guideMask from "../guideMask/guideMask.vue";
import calculator from "../calculator/index.vue";
import contractPass from "../contractPassword/index.vue";
import { webSocketMixin } from "./bannerSocket.js";

export default {
  name: "coin-header",
  mixins: [webSocketMixin],
  components: {
    tradeSetting,
    guideMask,
    calculator,
    contractPass,
  },
  props: {},

  data() {
    return {
      selectData: [],
      isShow: false,
      calculator_isShow: false,
      contractPass_isShow: false,
    };
  },
  computed: {
    ...mapState(["setting"]),
  },
  watch: {
    "setting.whetherInTheCollection"(value) {
      if (value) {
        // this.getCollectionList();
      }
    },
  },

  methods: {
    websockOpen() {
      const self = this;
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      self.websockSend("coinCollection");
    },
    onGuide() {
      this.$store.commit("setguideMask_isShow", true);
    },
    onCalculator() {
      this.calculator_isShow = true;
    },
    onContractPassword() {
       if (!localStorage.getItem("token")) {
        this.$router.push({
          path: "/layout/login",
          query: { redirect: "/layout/contractTransaction" },
        });
        return;
      }
      this.contractPass_isShow = true;
    },
    toShow() {
      this.isShow = true;
    },
    // getCollectionList() {
    //   if (!this.$store.state.login.token) return;
    //   $coinTypeCollectionList().then((res) => {
       
    //     this.selectData = res.data.data.slice(0, 8).map((item) => {
    //       return {
    //         ...item,
    //         coin: item.baseAssetCode + item.quoteAssetCode,
    //       };
    //     });
    //     this.webSocket();
    //     this.$store.commit("setCollectionState", false);
    //   });
    // },
    chooseCoinMarket(item) {
     
      this.$store.commit("setCurrentMarket", item.symbol);
    },
  },
  filters: {
    changeFilter(num) {
      if (num < 0 || num == 0) {
        return `${num}%`;
      } else {
        return `+${num}%`;
      }
    },
  },
  mounted() {
    this.$store.commit("setguideMask_isShow", false);
    // this.getCollectionList();
  },
};
</script>

<style lang="scss" scoped>
.coin-header {
  position: relative;
  height: 40px;
  padding: 0 25px 0 20px;
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  background-color: var(--main-bg);
  border-top: 1px solid var(--gap-bg);
  .collection {
    .star {
      margin-right: 20px;
      .iconfont {
        font-size: 30px;
        color: #8992a6;
        &.love {
          color: #ffd000;
        }
      }
    }
    .selectBox {
      .item {
        display: flex;
        align-items: center;
        margin-right: 30px;
        .label {
          font-weight: 700;
          margin-right: 10px;
        }
        .change {
          color: var(--main-text-color);
          &.up {
            color: #90ff00;
          }
          &.down {
            color: #f75f52;
          }
        }
      }
    }
  }
  .function {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 200px;
    height: 30px;
    .iconfont {
      font-size: 24px;
      color: #acb5c2;
      margin-left: 20px;
      cursor: pointer;
      &:hover {
        color: var(--theme-color);
      }
    }
  }
  .tradeSetting,
  .mask,
  .contractPassword,
  .calculator {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999999;
  }
  .calculator {
    z-index: 2000 !important;
  }
}
</style>
