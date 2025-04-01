<!-- 开仓价格 -->
<template>
  <div class="calculator_container">
    <div class="top">
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
      <div class="openPrice">
        <div class="label">{{ $t("calculator.开仓均价") }} (USDT)</div>
        <div class="value">{{ averagePrice }}</div>
      </div>
    </div>
    <div class="content">
      <div class="lableList">
        <div class="openPosition_label">{{ $t("calculator.开仓") }}</div>
        <div class="openPrice_label">{{ $t("calculator.开仓价格") }}(USDT)</div>
        <div class="amount_label">
          {{ $t("calculator.成交数量") }}({{ unit }})
        </div>
        <div class="action_label">{{ $t("calculator.操作") }}</div>
      </div>
      <div class="box">
        <div class="listBox">
          <div
            class="cell border"
            v-for="(item, index) in positionList"
            :key="item.id"
          >
            <div class="openPosition">{{ index + 1 }}</div>
            <div class="openPrice">
              <my-input
                v-model="item.openPrice"
                :decimal="symbolInfo.priceDecimal"
              />
            </div>
            <div class="amount">
              <my-input v-model="item.amount" />
            </div>
            <div class="action" @click="deletePositon(item.id)">
              <i class="iconfont icon-garbage"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="addPosition df">
        <div @click="addPosition">
          <i class="iconfont icon-tianjia mr5"></i>
          <span>{{ $t("calculator.增加仓位") }} </span>
        </div>
      </div>
    </div>
    <div
      class="submit pointer"
      :class="{ notAllow: !btnStatus }"
      @click="calculate"
    >
      {{ $t("calculator.计算") }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import handleDecimalPlaces from "../handleDecimalPlaces";

export default {
  name: "cal-five",
  props: {
    symbolInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      btnStatus: false,
      type: 1,
      averagePrice: "--",
      positionList: [{ id: 1, openPrice: undefined, amount: undefined }],
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    addPosition() {
      let lastId = undefined;
      if (this.positionList.length) {
        lastId = this.positionList[this.positionList.length - 1].id;
      } else {
        lastId = 0;
      }
      let obj = {
        id: lastId + 1,
        openPrice: undefined,
        amount: undefined,
      };
      this.positionList.push(obj);
    },
    deletePositon(id) {
      this.positionList.forEach((item, index) => {
        if (item.id == id) {
          this.positionList.splice(index, 1);
          // item.openPrice = undefined;
          // item.amount = undefined;
        }
      });
    },
    calculate() {
      if (!this.btnStatus) return;

      // console.log("this.positionList", this.positionList);
      //开仓均价 = (原数量*原价格 + 新数量1*新价格1 + 新数量2*新价格2+ ....)/(原数量 + 新数量1 +新数量2 + .....)

      let total = 0;
      let totalPrice = 0;
      this.positionList.forEach((item) => {
        total += parseFloat(item.amount);
        totalPrice += parseFloat(item.openPrice * item.amount);
        // console.log("total", total);
      });
      this.averagePrice = handleDecimalPlaces(
        this.symbolInfo.priceDecimal,
        totalPrice / total
      );
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
    unit() {
      let index = this.symbolInfo?.symbolCode.indexOf("/");
      let unit = this.symbolInfo?.symbolCode.slice(0, index);
      return unit;
    },
  },
  watch: {
    positionList: {
      handler(data) {
        // console.log("value", data);
        if (!data.length) {
          this.btnStatus = false;
        } else {
          this.btnStatus = data.every((item) => {
            return item.amount && item.openPrice;
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.calculator_container {
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .direction {
      flex: 1;
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
    .openPrice {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 200px;
      height: 40px;
      font-size: 14px;
      padding: 0 10px;
      background-color: var(--calculator-content-bg);
      border-radius: 6px;
      .label {
        color: #96a2b2;
      }
      .value {
        color: var(--main-text-color);
      }
    }
  }
  .content {
    margin-top: 10px;
    .lableList {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #96a2b2;
      font-size: 12px;
      height: 40px;
      margin-bottom: 20px;
      &.border {
        border: 1px solid #f4f5f7;
        border-radius: 6px;
        padding: 0 10px;
      }
      .openPosition {
        width: 100px;
      }
      .openPrice,
      .amount {
        height: 100%;
        width: 160px;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          height: 100%;
          padding: 0 5px;
          border: none;
          outline: none;
          &:focus {
            border: 1px solid var(--theme-color);
            border-radius: 6px;
          }
        }
      }
      .action {
        cursor: pointer;
        i {
          font-size: 20px;
          color: #afb8c4;
        }
      }
    }
    .box {
      max-height: 180px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        // display: none;
        width: 3px;
      }
      &::-webkit-scrollbar-track-piece {
        background-color: var(--select-bg);
        border-radius: 3px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #e1e1e1;
        border-radius: 3px;
      }
      .listBox {
        .cell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #96a2b2;
          font-size: 12px;
          height: 40px;
          margin-bottom: 20px;
          &.border {
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 0 10px;
          }
          .openPosition {
            width: 100px;
          }
          .openPrice,
          .amount {
            height: 100%;
            width: 160px;
            display: flex;
            align-items: center;
            ::v-deep .my-input {
              input {
                width: 100%;
                height: 100%;
                padding: 0 5px;
                border: none;
                outline: none;
                background-color: var(--pop-bg);
                color: var(--main-text-color);
                &:focus {
                  border: 1px solid var(--theme-color);
                  border-radius: 6px;
                }
              }
            }
          }
          .action {
            // visibility: hidden;
            cursor: pointer;
            i {
              font-size: 22px;
              color: #918d8d;
            }
            &.show {
              visibility: visible;
            }
          }
        }
      }
    }
    .addPosition {
      height: 30px;
      align-items: flex-end;
      font-size: 16px;
      font-weight: bold;
      color: var(--theme-color);
      cursor: pointer;
    }
  }
  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: #ffffff;
    margin-top: 30px;
    background-color: var(--theme-color);
    border-radius: 6px;
  }
}
</style>
