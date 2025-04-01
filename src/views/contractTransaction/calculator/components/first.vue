<!-- 收益 -->
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
            class="btn short ml10"
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
          <div class="top df fdc aifs">
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
              <div class="label">{{ $t("calculator.平仓价格") }}</div>
              <div class="value">
                <my-input
                  v-model="closePrice"
                  :decimal="symbolInfo.priceDecimal"
                />
                <span>USDT</span>
              </div>
            </div>
            <div class="cell num">
              <div class="label">{{ $t("calculator.成交数量") }}</div>
              <el-popover
                placement="top"
                trigger="manual"
                popper-class="calculator-popover"
                :content="tips"
                v-model="visible"
              >
                <div class="value" slot="reference">
                  <my-input v-model="nums" />
                  <mySelect
                    :options="numsType"
                    v-model="numsValue"
                    :width="110"
                  />
                </div>
              </el-popover>
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
          <div class="label">{{ $t("calculator.起始保证金") }}</div>
          <div class="value">{{ margin }} USDT</div>
        </div>
        <div class="cell">
          <div class="label">{{ $t("calculator.标题-收益") }}</div>
          <div class="value">{{ income }} USDT</div>
        </div>
        <div class="cell">
          <div class="label">{{ $t("calculator.回报率") }}</div>
          <div class="value">{{ responseRate }} %</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mySlider from "./my-slider.vue";
import handleDecimalPlaces from "../handleDecimalPlaces";
import mySelect from "@/components/my-select/my-select.vue";

export default {
  name: "cal-first",
  components: {
    mySlider,
    mySelect,
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
      type: 1, //0 做空 1 做多
      times: 1, //进度条
      min: 1,
      maxPositionAmount: undefined, //最大可开 持有头寸
      openPrice: "",
      closePrice: "",
      nums: "",
      margin: "- -", //保证金
      income: "- -", //收益
      responseRate: "- -", //回报率
      btnStatus: true,
      numsValue: 1,
      numsType: [
        { value: 1, label: this.$t("contract.张") },
        { value: 2, label: "USDT" },
        { value: 3, label: "BTC" },
      ],
      initialNums: "", //张数
      transferNums: 0,
      visible: false,
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    calculate() {
      this.transferUnit();

      //起始保证金= 面值 * 数量 * 开仓价格 / 杠杆倍数 (数量默认单位 张)
      this.margin =
        (this.symbolInfo.faceValue * this.initialNums * this.openPrice) /
        this.times;

      this.margin = handleDecimalPlaces(
        this.symbolInfo.priceDecimal,
        this.margin
      );

      // console.log("this.margin", this.margin);

      //收益 = (平仓价格 - 开仓价格)*面值*数量
      let p = this.type == 1 ? 1 : -1; //1多 -1空
      this.income =
        (this.closePrice - this.openPrice) *
        this.symbolInfo.faceValue *
        this.initialNums *
        p;

      this.income = handleDecimalPlaces(
        this.symbolInfo.priceDecimal,
        this.income
      );

      //回报率 = (平仓价格-开仓价格)*杠杆倍数/开仓价格
      this.responseRate =
        (100 * this.times * ((this.closePrice - this.openPrice) * p)) /
        this.openPrice;

      this.responseRate = handleDecimalPlaces(
        this.symbolInfo.priceDecimal,
        this.responseRate
      );
    },

    transferUnit() {
      if (this.numsValue == 1) {
        this.initialNums = this.nums;
      } else if (this.numsValue == 2) {
        this.initialNums =
          this.nums / this.symbolInfo.faceValue / this.openPrice + "";
      } else {
        this.initialNums = this.nums / this.symbolInfo.faceValue + "";
      }
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
    unit() {
      let index = this.symbolInfo?.symbolCode.indexOf("/");
      let unit = this.symbolInfo?.symbolCode.slice(0, index);
      return ` ${unit}`;
    },
    disabled() {
      let flag =
        this.nums &&
        this.nums != 0 &&
        this.openPrice &&
        this.openPrice != 0 &&
        this.closePrice &&
        this.closePrice != 0 &&
        this.nums <= this.transferNums;
      return !flag;
    },

    tips() {
      const cont = this.maxPositionAmount;
      let amount = 0;
      let unit = "";
      if (this.numsValue == 1) {
        amount = cont;
        unit = this.$t("contract.张");
      } else if (this.numsValue == 2) {
        amount = cont * this.symbolInfo.faceValue * this.openPrice;
        unit = " USDT";
      } else {
        amount = cont * this.symbolInfo.faceValue;
        unit = this.unit;
      }
      this.transferNums = amount;
      let text = `限制最大数量为 ${amount} ${unit}`;
      const temporaryTips = "参数错误";
      return temporaryTips;
    },
  },
  watch: {
    unit: {
      handler(value) {
        let obj = {
          label: value,
          value: 3,
        };
        this.numsType[2] = obj; //设置o下拉框单位

        if (this.numsValue == 3) {
          //重置动态的单位
          this.numsValue = 1;
        }
      },
      immediate: true,
    },
    numsValue() {
      this.nums = undefined;
    },
    nums: {
      handler(newValue) {
        this.visible = newValue > this.transferNums ? true : false;
      },
    },
  },
};
</script>
<style>
.el-tooltip__popper.is-dark {
  z-index: 99999 !important;
}
.calculator-popover {
  background-color: var(--main-bg);
  padding: 10px;
  width: unset !important;
  color: var(--main-text-color);
}
</style>

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
          &.num {
            padding-right: 0px;
            .value {
              display: flex;
              align-items: center;
              ::v-deep .selectBox {
                .select {
                  border: none;
                  input {
                    text-align: right;
                    font-size: 14px;
                    background-color: var(--pop-bg);
                  }
                  i {
                    font-size: 26px;
                    &::before {
                      content: "\e607";
                      font-family: "iconfont";
                    }
                  }
                }
              }
            }
          }
          .label {
            color: #96a2b2;
            min-width: 70px;
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
      padding: 5px 0;
      font-size: 14px;
      margin-bottom: 5px;
      .label {
        color: #96a2b2;
      }
      .value {
        min-width: 80px;
        text-align: right;
        color: #00082d;
      }
    }
  }
}
</style>
