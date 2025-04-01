<!-- 平仓 -->
<template>
  <div class="unwind">
    <my-modal
      :is-show.sync="isShow"
      useTheme
      title="contract.平仓"
      @close="handleCancel"
      @submit="toSubmit"
    >
      <template slot="content">
        <div class="content">
          <div class="pirceInfo">
            <p>
              <span class="label">{{ "contract.合约F" | translate }}</span>
              <span
                class="value down"
                :class="{ up: data.positionDirection == 1 }"
                >{{ data.coinMarket }} {{ "lang_1059" | translate
                }} {{
                  data.positionDirection == 1
                    ? "lang_1850"
                    : "lang_1923" | translate
                }}{{ data.leverTimes }}X</span
              >
            </p>
            <p>
              <span class="label">{{ "lang_771" | translate }}</span>
              <span class="value">{{ data.positionAveragePrice }} USDT</span>
            </p>
            <p>
              <span class="label">{{ "lang_1775" | translate }}</span>
              <span class="value">{{ data.markedPrice }} USDT</span>
            </p>
          </div>
          <div class="df aic jb">
            <div class="cell">
              <span class="title">{{ "lang_2535" | translate }}</span>
              <div class="inputBox df aic jb">
                <span v-if="typeValue == 1" class="label">{{
                  "lang_1186" | translate
                }}</span>
                <input
                  v-else
                  type="text"
                  :placeholder="$t('lang_1187')"
                  v-model="priceValue"
                  ref="ipt"
                />
                <span class="label">USDT</span>
              </div>
            </div>
            <div class="select">
              <span class="title">{{ "lang_1924" | translate }}</span>
              <mySelect :options="options" v-model="typeValue" />
            </div>
          </div>
          <div class="mt20">
            <div class="cell">
              <span class="title">{{ "lang_2034" | translate }}</span>
              <div class="inputBox df aic jb">
                <input
                  type="text"
                  :placeholder="numsPlace"
                  v-model="numsValue"
                  ref="numRef"
                  @keyup.enter="toSubmit"
                />
                <span class="label">{{ unit }}</span>
              </div>
            </div>
          </div>
          <div class="slider">
            <mySlider :marks="marks" notGet v-model="sliderValue" />
          </div>
          <div class="pirceInfo">
            <p>
              <span class="label">{{ "lang_833" | translate }}</span>
              <span class="value">{{ positionAmounts }}</span>
            </p>
          </div>
        </div>
      </template>

      <!-- <template #dia_footer>
        <div class="btn-group">
          <div class="btn" @click="toSubmit">
            {{ "contract.确认" | translate }}
          </div>
        </div>
      </template> -->
    </my-modal>
  </div>
</template>

<script>
import { $unwind } from "@/api/contractTransaction";
import { mapGetters, mapState } from "vuex";
import mySelect from "@/components/my-select/my-select.vue";
import mySlider from "../../calculator/components/my-slider.vue";
import myModal from "@/components/my-modal";

export default {
  name: "contract-unwind",
  components: {
    mySelect,
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
      typeValue: 1, //类型
      options: [
        { label: this.$t("contract.市价委托"), value: 1 },
        { label: this.$t("contract.限价委托"), value: 2 },
      ],
      priceValue: null, //价格
      numsValue: null, //数量
      positionAmount: null, //仓位数量
      basePositionAmount: null,
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
    handleCancel() {
      this.priceValue = null;
      this.numsValue = null;
      this.typeValue = 1;
      this.sliderValue = 100;
      this.$emit("update:isShow", false);
    },
    //提交
    toSubmit() {
      let value = (this.sliderValue * this.positionAmount) / 100;
      if (this.typeValue == 2) {
        if (!this.priceValue) {
          this.$message({
            message: this.$t("contract.输入值不能为空"),
            type: "error",
          });
          return;
        }
      }

      let data = {
        type: this.data.positionDirection, //1 买 2 卖
        amount: Math.floor(value), //数量
        price: this.priceValue, //价格
        orderType: this.typeValue == 1 ? 4 : 3, //4 市价平仓 3 限价平仓
        coinMarket: this.data.coinMarket, //交易对
        positionType: this.data.positionType, //0 全仓 1 逐仓
      };
      // console.log("amout", data);

      if (data.amount == 0) {
        this.$message({
          message: this.$t("contract.数量不能为零"),
          type: "error",
        });
        return;
      }

      $unwind(data).then((res) => {
        if (res.data.success) {
          this.handleCancel();
          this.$showMsg(this.$t("contract.平仓成功"), () => {
            this.$emit("adjustLever-success", res.data.success);
          });
        }
      });
    },
    change() {
      this.numsValue = null;
      this.$refs.numRef.blur();
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
    ...mapState(["contract"]),

    unit() {
      let obj = {
        1: ` ${this.$t("contract.张")}`,
        2: " USDT",
        3: ` ${this.contract.contractInfo.baseAssetCode}`,
      };
      return obj[this.contract.quantityUnit];
    },
    positionAmounts() {
      let obj = {
        1: this.basePositionAmount + this.unit,
        2:
          (
            this.data.faceValue *
            1 *
            this.data.lastPrice *
            this.basePositionAmount
          ).toFixed(2) + this.unit,
        3:
          (this.basePositionAmount * this.data.faceValue).toFixed(1) +
          this.unit,
      };
      return obj[this.contract.quantityUnit];
    },
    numsPlace: {
      get() {
        return `${this.sliderValue}%(≈${
          (this.sliderValue * parseFloat(this.positionAmounts)) / 100
        })`;
      },
      set() {},
    },
  },
  watch: {
    //数量
    numsValue(oldVal) {
      if (oldVal == null) return;
      let nums = oldVal * 1;
      console.log("prompt", parseFloat(this.positionAmounts));
      if (nums > parseFloat(this.positionAmounts)) {
        this.numsValue = parseFloat(this.positionAmounts);
      }

      //进度条的值
      this.sliderValue = (100 * nums) / parseFloat(this.positionAmounts);
    },
    //价格
    priceValue(oldVal) {
      if (oldVal) {
        this.priceValue = oldVal.replace(/[^\d.]/g, ""); //筛选 数字以外的替换为 ''
      }
    },
    data: {
      handler(oldVal) {
        // console.log(oldVal);
        this.positionAmount = oldVal.positionAmount * 1;
        this.basePositionAmount = oldVal.positionAmount * 1;
        //输入框展示值
        // this.numsPlace = `${this.sliderValue}%(≈${
        //   (this.sliderValue * this.positionAmounts) / 100
        // })`;
      },
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
  .pirceInfo {
    margin-bottom: 20px;
    P {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      line-height: 32px;
      font-weight: 700;
      .label {
        color: #8992a6;
      }
    }
    .value {
      color: var(--main-text-color);
      font-weight: 700;
      &.down {
        color: #f75f52;
      }
      &.up {
        color: #90ff00;
      }
    }
    .warn {
      display: flex;
      font-size: 16px;
      line-height: 32px;
      font-weight: 700;
      .label {
        color: #8992a6;
      }
      .iconfont {
        color: #96a2b2;
        font-size: 12px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .slider {
    padding: 0 0px 30px;
  }
  .cell {
    flex: 1;
    .title {
      font-size: 14px;
      color: #96a2b2;
      margin-bottom: 10px;
    }
    .inputBox {
      flex: 1;
      width: 100%;
      height: 45px;
      padding: 0 10px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      .label {
        font-size: 14px;
        color: var(--main-text-color);
      }
      input {
        flex: 1;
        height: 100%;
        border: none;
        outline: none;
        font-size: 14px;
        color: #96a2b2;
        padding-right: 20px;
        background-color: var(--dialog-bg);
      }
    }
  }
  .select {
    width: 200px;
    margin-left: 20px;
    .title {
      font-size: 14px;
      color: #96a2b2;
      margin-bottom: 10px;
    }
    ::v-deep .selectBox {
      width: 200px !important;
      .select {
        height: 45px;
        .input {
          background-color: var(--dialog-bg);
        }
      }
      .list {
        background: var(--dialog-bg);
        .cell {
          &:hover {
            background-color: var(--pop-hover-bg);
          }
        }
      }
    }
    .select1 {
      border: 1px solid var(--border-color);
      border-radius: 6px;
    }
    ::v-deep .el-input__inner {
      border: none;
      font-weight: 700;
      height: 43px;
      background-color: var(--dialog-bg);
      color: var(--main-text-color) !important;
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
