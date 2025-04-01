<template>
  <div class="price-module mt10">
    <div class="price" v-if="type == 3">
      <div class="label mb15">{{ $t("contractPass.委托价格") }}</div>
      <div class="inputbox df aic jb">
        <div class="value">
          <my-input
            v-model="limitPrice"
            :decimal="symbolInfo?.priceDecimal"
            :placeholder="$t('contractPass.委托价格')"
          ></my-input>
        </div>
        <div class="lastest" @click="getLatestPrice(3)">
          {{ $t("contractPass.最新") }}
        </div>
      </div>
    </div>
    <div class="price" v-else-if="type == 2">
      <div class="label mb15">{{ $t("contractPass.委托价格") }}</div>
      <div class="inputbox df aic jb market">
        <div class="value">{{ $t("contractPass.最优市价") }}</div>
      </div>
    </div>
    <div class="price" v-else>
      <div class="label mb15">{{ $t("contractPass.触发价") }}</div>
      <div class="inputbox df aic jb mb15">
        <div class="value">
          <my-input
            v-model="triggerPrice"
            :decimal="symbolInfo?.priceDecimal"
            :placeholder="$t('contractPass.触发价')"
          ></my-input>
        </div>
        <div class="lastest" @click="getLatestPrice(1)">
          {{ $t("contractPass.最新") }}
        </div>
      </div>
      <div class="label mb15">{{ $t("contractPass.委托价格") }}</div>
      <div class="inputbox df aic jb select">
        <div
          class="value mr10 df aic jb"
          :class="{ market: marketValue == 1 }"
        >
          <span v-if="marketValue == 1">{{ placeholder }}</span>
          <my-input
            v-else
            v-model="planPrice"
            :decimal="symbolInfo?.priceDecimal"
            :placeholder="placeholder"
          ></my-input>
          <div
            class="pointer"
            v-if="marketValue == 2"
            @click="getLatestPrice(2)"
          >
            {{ $t("contractPass.最新") }}
          </div>
        </div>
        <div class="lastest df aic jc">
          <mySelect :options="marketType" v-model="marketValue" autoWidth />
        </div>
      </div>
    </div>
    <div class="amount mt15 mb25">
      <div class="label">{{ $t("contractPass.委托数量") }}</div>
      <div class="slider">
        <mySlider :marks="marks" notGet v-model="sliderValue" />
      </div>
    </div>
  </div>
</template>

<script>
import mySelect from "@/components/my-select/my-select.vue";
import mySlider from "../calculator//components//my-slider";
// import { $contractList } from "@/api/contractTransaction";

export default {
  props: {
    type: {
      type: Number,
      default: 3, //1 计划委托 2 市价委托 3 限价委托
    },
    symbolInfo: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    mySelect,
    mySlider,
  },
  data() {
    return {
      marketValue: 1,
      marketType: [
        { label: "contractPass.市价", value: 1 },
        { label: "contractPass.限价", value: 2 },
      ],
      placeholder: this.$t("contractPass.最优市价"),
      planPrice: undefined, //计划委托-限价
      limitPrice: undefined, //限价委托
      lastPrice: undefined, //委托最新价
      triggerPrice: undefined, //触发价
      sliderValue: 100,
      marks: {
        1: "1%",
        25: "25%",
        50: "50%",
        75: "75%",
        100: "100%",
      },
    };
  },
  methods: {
    // getLatestPrice(type) {
    //   //合约交易对列表 目的拿最新价格
    //   $contractList().then((res) => {
    //     let currentSymbol = res.data.data.filter((item) => {
    //       return this.symbolInfo.coinId == item.baseAssetId;
    //     })[0];
    //     this.lastPrice = currentSymbol.lastPrice + ""; //input里的replace是字符串方法

    //     if (type == 3) {
    //       this.limitPrice = this.lastPrice;
    //     } else if (type == 2) {
    //       this.planPrice = this.lastPrice;
    //     } else {
    //       this.triggerPrice = this.lastPrice;
    //     }
    //   });
    // },
    handlerPrice() {
      const o = {
        1: () => (this.marketValue == 1 ? "0.101" : this.planPrice),
        2: () => "0.101",
        3: () => this.limitPrice,
      };
      return o[this.type]();
    },
  },
  watch: {
    symbolInfo: {
      handler(newValue) {
        this.price = undefined;
        this.triggerPrice = undefined;
        this.planPrice = undefined;
        this.limitPrice = undefined;
      },
      deep: true,
    },
    marketValue: {
      handler(newValue) {
        this.placeholder =
          newValue == 1
            ? this.$t("contractPass.最优市价")
            : this.$t("contractPass.委托价格");
        this.price = newValue == 1 ? "0.101" : this.planPrice;
      },
      immediate: true,
    },
  },
  updated() {
    this.price = this.handlerPrice();

    let params = {
      price: this.price,
      amount: this.sliderValue,
      marketValue: this.marketValue,
    };
    if (this.type == 1) {
      params.triggerPrice = this.triggerPrice;
    }
    this.$emit("onPrice", params);
  },
};
</script>

<style lang="scss" scoped>
.price-module {
  font-size: 14px;
  .price {
    .label {
      color: #96a2b2;
    }
    .market {
      background-color: var(--pass-marketprice-bg) !important;
    }
    .inputbox {
      height: 40px;
      background-color: var(--pass-pricebox-bg);
      padding: 0 15px;
      padding-left: 10px;
      border-radius: 6px;
      .value {
        color: var(--main-text-color);
        ::v-deep .my-input {
          input {
            font-size: 14px;
            background-color: inherit;
            color: inherit;
          }
          input::placeholder {
            color: inherit !important;
          }
        }
      }
      .lastest {
        color: var(--theme-color);
        cursor: pointer;
      }
      &.select {
        background-color: var(--pop-bg);
        padding: 0px;
        .value {
          flex: 1;
          height: 100%;
          padding: 0 15px;
          background-color: var(--pass-pricebox-bg);
          border-radius: 6px;
          color: var(--theme-color);
          ::v-deep .my-input {
            input {
              font-size: 14px;
              background-color: inherit;
              color: var(--main-text-color) !important;
            }
            input::placeholder {
              color: var(--main-text-color) !important;
            }
          }
          span:first-child {
            color: var(--main-text-color);
            cursor: pointer;
          }
          div {
            // min-width: 50px;
            white-space: nowrap;
          }
        }
        .lastest {
          min-width: 80px;
          height: 100%;
          border-radius: 6px;
          background-color: var(--pass-pricebox-bg);
          ::v-deep .select {
            border: none;
            input {
              text-align: right;
              color: var(--theme-color);
              padding-right: 10px;
              background-color: inherit;
            }
            i {
              font-size: 22px;
              color: #8992a6;
              &::before {
                font-family: "iconfont";
                content: "\e606";
              }
            }
          }
        }
      }
    }
  }
  .amount {
    .label {
      color: #96a2b2;
    }
    .slider {
      ::v-deep .el-slider {
        .el-slider__runway .el-slider__marks {
          margin-top: -32px;
          .el-slider__marks-text:first-child {
            left: 1% !important;
          }
        }
        .el-slider__button-wrapper {
          z-index: 998;
        }
      }
    }
  }
}
</style>
