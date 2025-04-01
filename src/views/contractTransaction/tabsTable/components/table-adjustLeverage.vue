<!-- 调整杠杆 -->
<template>
  <div>
    <my-modal
      :is-show.sync="isShow"
      useTheme
      title="contract.调整杠杆"
      @close="handleCancel"
      @submit="toSubmit"
    >
      <template slot="content">
        <div class="content">
          <span class="label mt5">{{ "contract.杠杆" | translate }}</span>
          <div
            class="stepBox df aic jb"
            :class="{ dark: getTheme === 'dark' }"
          >
            <div
              class="minus pointer"
              :class="{ disabled: times == 1, dark: getTheme === 'dark' }"
              @click="onMinus"
            >
              <i class="iconfont icon-jianhao"></i>
            </div>
            <div class="nums df aic jc">
              <input type="number" v-model.number="times" />
            </div>
            <div
              class="plus pointer"
              :class="{ disabled: times == max, dark: getTheme === 'dark' }"
              @click="onPlus"
            >
              <i class="iconfont icon-tianjia"></i>
            </div>
          </div>
          <div class="slider">
            <mySlider
              :marks="marks"
              :max="max"
              v-model="times"
              :symbolInfo="symbolInfo"
              :maxPositionAmount.sync="basePositionAmount"
            />
          </div>

          <div class="text">
            <p>
              <span>{{ "contract.当前杠杆倍数最大可开" | translate }}</span>
              <span>{{ maxPositionAmount }}</span>
            </p>
          </div>
          <div class="tips mb5">
            <i class="iconfont icon-warning1 mr5"></i>
            <span class="txt">{{
              "contract.选择超过杠杆交易会增加强行平仓风险,请注意仓位风险"
                | translate
            }}</span>
          </div>
        </div>
      </template>
    </my-modal>
  </div>
</template>

<script>
import { $setleverage, $getLeverInfo } from "@/api/contractTransaction";
import mySlider from "../../calculator/components/my-slider.vue";
import { mapGetters, mapState } from "vuex";
import myModal from "@/components/my-modal";

export default {
  name: "adjustPosition",
  components: {
    mySlider,
    myModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      times: 1, //杠杆倍数
      basePositionAmount: 100, //最大可开
      marks: null,
      positionAmount: 10, //持仓量
      symbolInfo: {}, //交易对信息
      min: 1,
      max: 125,
      timesValue: 1,
      contractAvailableAmount: null,
      positionType: undefined, //0 全仓
      positionDirection: undefined, //1 多
    };
  },
  methods: {
    onMinus() {
      if (this.times == this.min) return;
      this.times = this.times - 1;
    },
    onPlus() {
      if (this.times == this.max) return;
      this.times = this.times + 1;
    },
    handleCancel() {
      this.times = this.data.leverTimes;
      this.$emit("update:isShow", false);
    },

    //确认
    toSubmit() {
      let data = {
        coinId: this.data.coinId,
        positionId: this.data.id,
        positionType: this.positionType,
        operationType: 1,
        warehousePositionDirection: this.positionDirection,
        leverTime: this.times,
      };

      if (this.times == this.data.leverTimes) {
        this.$message(this.$t("contract.杠杆未发生变化"));
        return;
      }

      $setleverage(data).then((res) => {
        if (res.data.success) {
          this.handleCancel();
          this.$store.dispatch("handleEditLever", true);
          this.$showMsg(this.$t("contract.tips_setlever"));
        }
      });
    },

    //交易对信息
    getGearinfoApi() {
      $getLeverInfo({ coinId: this.data.coinId }).then((res) => {
        this.max = res.data.data.maxValue;

        let obj = {
          1: "1X",
        };
        let num = 5;
        let d = this.max / num;

        for (let i = 1; i <= num; i++) {
          //等差数列 第n项
          let an = d + d * (i - 1);
          obj[an] = an + "X";
        }
        this.marks = obj;
        this.times =
          this.positionType == 0
            ? res.data.data.defaultValue
            : this.positionDirection == 1
            ? res.data.data.warehouseMuchPosition
            : res.data.data.warehouseShortPosition;
      });
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
    ...mapState(["contract"]),

    maxPositionAmount() {
      let obj = {
        1: this.basePositionAmount + ` ${this.$t("contract.张")}`,
        2:
          this.basePositionAmount * this.data.faceValue * this.data.lastPrice +
          " USDT",
        3:
          this.basePositionAmount * this.data.faceValue +
          ` ${this.contract.contractInfo.baseAssetCode}`,
      };
      return obj[this.contract.quantityUnit];
    },
  },
  watch: {
    //监听父组件传入的数据
    data: {
      handler(oldVal) {
        // this.leverTimes = oldVal.leverTimes;
        this.positionType = oldVal.positionType;
        this.positionDirection = oldVal.positionDirection;
        this.positionAmount = oldVal.positionAmount;
        this.times = oldVal.leverTimes;
      },
    },
    isShow(value) {
      if (value) {
        // console.log("this.data", this.data);
        this.symbolInfo = {
          symbolCode: this.data.coinMarket,
          coinId: this.data.coinId,
          faceValue: this.data.faceValue,
        };
        this.getGearinfoApi();
      }
    },
    times(newValue) {
      if (!newValue) {
        this.times = 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text {
    font-size: 18px;
    color: var(--main-text-color);
  }
  .icon-close {
    font-size: 22px;
    color: #8992a6;
    cursor: pointer;
  }
}
.content {
  // padding: 0 30px;
  .label {
    font-size: 16px;
    color: #8992a6;
  }
  .stepBox {
    height: 45px;
    margin-top: 10px;
    padding: 3px;
    background-color: #f8f9fb;
    border-radius: 6px;
    &.dark {
      background-color: #333333;
      input {
        background-color: inherit;
      }
    }
    .minus,
    .plus {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      color: #b8c0cb;
      border-radius: 6px;
      background-color: #ffffff;

      &:active {
        color: var(--theme-color);
      }
      i {
        font-size: 22px;
      }
      &.disabled {
        cursor: not-allowed;
        background-color: #f8f9fb;
      }
      &.dark {
        background-color: #1d1d1d;
      }
    }
    .nums {
      flex: 1;
      height: 100%;
      font-size: 16px;
      color: var(--secondary-text-color);

      input {
        text-align: center;
        height: 100%;
        border: none;
        outline: none;
        font-weight: 700;
        color: var(--main-text-color);
        background-color: inherit;
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          appearance: none;
        }
      }
    }
  }
  .slider {
    padding: 0 0px;
  }

  .text {
    font-size: 14px;
    color: #8992a6;
    margin-top: 30px;
    P {
      line-height: 32px;
      span {
        color: var(--main-text-color);
        font-weight: 700;
      }
    }
  }
  .tips {
    display: flex;
    align-items: center;
    margin-top: 10px;
    // height: 45px;
    background: rgba($color: #ffce68, $alpha: 0.1);
    border-radius: 6px;
    padding: 5px 10px 5px 20px;
    .iconfont {
      color: #ffce68;
      font-size: 32px;
    }
    .txt {
      font-size: 12px;
      color: #96a2b2;
    }
  }
}
.btn-group {
  display: flex;
  align-items: center;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    font-size: 18px;
    border-radius: 6px;
    background-color: var(--theme-color);
    color: #fff;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
  .confirm,
  .cancel {
    flex: 1;
    height: 50px;
    font-size: 18px;
  }
}
</style>
<style lang="scss" scoped>
.el-select {
  .el-input {
    input {
      font-size: 16px;
    }
  }
}
</style>
