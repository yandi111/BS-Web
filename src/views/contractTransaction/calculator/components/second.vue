<!-- 目标价格 -->
<template>
  <div>
    <div class="calculator_container df jb">
      <div class="left">
        <div class="direction" :class="{ dark: getTheme == 'dark' }">
          <div
            class="btn long"
            :class="{ green: type == 1 }"
            @click="changeType(1)"
          >
            {{ $t("calculator.做多") }}
          </div>
          <div
            class="btn ml10 short"
            @click="changeType(0)"
            :class="{ red: type == 0 }"
          >
            {{ $t("calculator.做空") }}
          </div>
        </div>
        <div class="slider">
          <mySlider
            :marks="marks"
            :max="max"
            v-model="times"
            :symbolInfo="symbolInfo"
            :maxPositionAmount.sync="maxPositionAmount"
          />
        </div>

        <div class="content">
          <div class="top">
            <div class="label">
              {{ $t("calculator.当前杠杆倍数最高可持有头寸:") }}
            </div>
            <div class="value">
              <span>{{ maxPositionAmount }}</span>
              <span> {{ $t("contract.张") }}</span>
            </div>
          </div>
          <div class="middle" :class="{ dark: getTheme == 'dark' }">
            <div class="cell">
              <div class="label">{{ $t("calculator.开仓价格") }}</div>
              <div class="value">
                <my-input
                  v-model="openPrice"
                  :decimal="symbolInfo.priceDecimal"
                />
                <span>USDT</span>
              </div>
            </div>
            <div class="cell">
              <div class="label">{{ $t("calculator.回报率") }}</div>
              <div class="value">
                <my-input v-model="responseRate" />
                <span>%</span>
              </div>
            </div>
          </div>
          <div class="btn">
            <my-button @click="calculate" :disabled="disabled">{{
              $t("calculator.计算")
            }}</my-button>
          </div>
        </div>
      </div>
      <div class="right" :class="{ dark: getTheme == 'dark' }">
        <div class="cell">
          <div class="label">{{ $t("calculator.目标价格") }}</div>
          <div class="value">{{ targetPrice }} USDT</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mySlider from "./my-slider.vue";
import handleDecimalPlaces from "../handleDecimalPlaces";

export default {
  name: "cal-second",
  components: {
    mySlider,
  },
  props: {
    marks: {
      type: Object,
      default: () => {},
    },
    max: {
      type: Number,
      default: 0,
    },
    symbolInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      type: 1,
      times: 1,
      min: 1,
      maxPositionAmount: undefined, //最大可开 持有头寸
      openPrice: "",
      responseRate: "",
      targetPrice: "- -",
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    calculate() {

      //回报率 = (目标价格- 开仓价格)*杠杆倍数/开仓价格
      // 目标价格= (回报率*开仓价格)/杠杆倍数+ 开仓价格=
      if (this.type == 1) {
        this.targetPrice =
          ((this.responseRate / 100) * this.openPrice) / this.times +
          this.openPrice * 1;
      } else {
        this.targetPrice =
          this.openPrice * 1 -
          ((this.responseRate / 100) * this.openPrice) / this.times;
      }

      this.targetPrice = handleDecimalPlaces(
        this.symbolInfo.priceDecimal,
        this.targetPrice
      );
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
    disabled() {
      let flag =
        this.openPrice &&
        this.openPrice != 0 &&
        this.responseRate &&
        this.responseRate != 0;
      return !flag;
    },
  },
};
</script>

<style lang="scss" scoped>
.calculator_container {
  width: 100%;
  .left {
    flex: 1;
    .direction {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      &.dark {
        .btn {
          &.long {
            color: #96a2b2;
            background-image: url("@/assets/contract-imgs/dark_bg1.png") !important;
          }
          &.green {
            color: #ffffff;
            background-image: url("@/assets/contract-imgs/green_bg.png") !important;
          }
          &.short {
            background-image: url("@/assets/contract-imgs/dark_bg.png") !important;
          }
          &.red {
            color: #ffffff;
            background-image: url("@/assets/contract-imgs/red_bg.png") !important;
          }
        }
      }
      .btn {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
        background-repeat: no-repeat;
        background-size: contain;
        &.long {
          color: #333333;
          background-image: url("@/assets/contract-imgs/gray_bg1.png");
        }
        &.green {
          color: #ffffff;
          background-image: url("@/assets/contract-imgs/green_bg.png");
        }
        &.short {
          color: #96a2b2;
          background-image: url("@/assets/contract-imgs/gray_bg.png");
        }
        &.red {
          color: #ffffff;
          background-image: url("@/assets/contract-imgs/red_bg.png");
        }
      }
    }
    .slider {
      padding-bottom: 10px;
    }
    .content {
      margin-top: 20px;
      .top {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 12px;
        .label {
          color: #96a2b2;
        }
        .value {
          color: var(--main-text-color);
          line-height: 26px;
        }
      }
      .middle {
        padding-top: 20px;
        &.dark {
          .value {
            color: #ffffff !important;
          }
        }
        .cell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40px;
          font-size: 14px;
          padding: 0 10px;
          margin-top: 20px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          .label {
            color: #96a2b2;
            min-width: 50px;
            margin-right: 5px;
          }
          .value {
            flex: 1;
            display: flex;
            color: #00082d;
            ::v-deep .my-input {
              input {
                background-color: var(--pop-bg);
                color: var(--main-text-color);
                font-size: 14px;
                text-align: right;
              }
            }
            span {
              margin-left: 5px;
            }
          }
          &:first-child {
            margin-top: 0px;
          }
        }
      }
      .btn {
        display: flex;
        margin-top: 30px;
        ::v-deep .my-button {
          width: 100%;
        }
      }
    }
  }
  .right {
    width: 230px;
    padding: 16px 15px;
    margin-left: 10px;
    background-color: var(--calculator-content-bg);
    border-radius: 6px;
    &.dark {
      .value {
        color: #ffffff !important;
      }
    }
    .cell {
      display: flex;
      // align-items: center;
      justify-content: space-between;
      height: 30px;
      font-size: 14px;
      margin-bottom: 5px;
      .label {
        color: #96a2b2;
      }
      .value {
        min-width: 80px;
        text-align: right;
        // word-break: break-all;
        color: #00082d;
      }
    }
  }
}
</style>
