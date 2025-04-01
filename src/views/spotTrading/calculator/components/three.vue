<!-- 强平价格 -->
<template>
  <div>
    <div class="calculator_container df jb">
      <div class="left">
        <div class="positionType">
          <div
            class="textbox"
            :class="{ active: positionType_isShow }"
            @click="togglePositionSelect(0)"
          >
            <span class="text mr10">{{ positionType }}</span>
            <i
              class="iconfont"
              :class="positionType_isShow ? 'icon-up' : 'icon-down'"
            ></i>
            <Select
              ref="positionTypeRef"
              :show.sync="positionType_isShow"
              :list="positionTypeList"
              :id="position_activeId"
              @handleChoose="positionChoose"
            />
          </div>
          <!-- 双向持仓隐藏 -->
          <!-- <div class="textbox"> -->

          <!-- <span class="text mr10">{{ directionType }}</span> -->
          <!-- <i
              class="iconfont"
              :class="directionType_isShow ? 'icon-up' : 'icon-down'"
            ></i> -->
          <!-- <Select
              ref="directionTypeRef"
              :show.sync="directionType_isShow"
              :list="directionTypeList"
              :id="direction_activeId"
              @handleChoose="directionChoose"
            /> -->
          <!-- </div> -->
        </div>
        <div
          class="direction"
          :class="{ dark: getTheme == 'dark' }"
          v-show="directionId == 1"
        >
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
          <div class="top">
            <div class="label">
              {{ $t("calculator.当前杠杆倍数最高可持有头寸:") }}
            </div>
            <div class="value">
              <span>{{ maxPositionAmount }}</span>
              <span> {{ $t("contract.张") }}</span>
            </div>
          </div>
          <div
            class="middle"
            :class="{ dark: getTheme == 'dark' }"
            v-if="!direction_activeId"
          >
            <div class="cell">
              <div class="label">{{ $t("calculator.开仓价格") }}</div>
              <div class="value">
                <my-input
                  v-model="form_single.openPrice"
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
                  <my-input v-model="form_single.theNumberOfTransactions" />
                  <mySelect
                    :options="numsType"
                    v-model="numsValue"
                    :width="110"
                  />
                </div>
              </el-popover>
            </div>
            <div class="cell">
              <div class="label">{{ $t("calculator.钱包余额") }}</div>
              <div class="value">
                <my-input v-model="form_single.walletBalance" />
                <span>USDT</span>
              </div>
            </div>
          </div>
          <div class="middle" :class="{ dark: getTheme == 'dark' }" v-else>
            <div class="title long">{{ $t("calculator.做多") }}</div>
            <div class="cell mt10">
              <div class="label">{{ $t("calculator.开仓价格") }}</div>
              <div class="value">
                <my-input v-model="form_double.openPrice_long" />
                <span>USDT</span>
              </div>
            </div>
            <div class="cell num">
              <div class="label">{{ $t("calculator.成交数量") }}</div>
              <div class="value">
                <my-input v-model="form_double.theNumberOfTransactions_long" />
                <mySelect
                  :options="numsType"
                  v-model="numsValue"
                  :width="110"
                />
              </div>
            </div>
            <div class="title short mt15">{{ $t("calculator.做空") }}</div>
            <div class="cell mt10">
              <div class="label">{{ $t("calculator.开仓价格") }}</div>
              <div class="value">
                <my-input v-model="form_double.openPrice_short" />
                <span>USDT</span>
              </div>
            </div>
            <div class="cell num">
              <div class="label">{{ $t("calculator.成交数量") }}</div>
              <div class="value">
                <my-input v-model="form_double.theNumberOfTransactions_short" />
                <mySelect
                  :options="numsType"
                  v-model="numsValue"
                  :width="110"
                />
              </div>
            </div>
            <div class="cell">
              <div class="label">{{ $t("calculator.钱包余额") }}</div>
              <div class="value">
                <my-input v-model="form_double.walletBalance" />
                <span>USDT</span>
              </div>
            </div>
          </div>
          <div class="btn">
            <my-button @click="calculate" :disabled="!btnStatus">{{
              $t("calculator.计算")
            }}</my-button>
          </div>
        </div>
      </div>
      <div class="right" :class="{ dark: getTheme == 'dark' }">
        <div class="cell">
          <div class="label">{{ $t("calculator.强平价格") }}</div>
          <div class="value">{{ strongPrice }} USDT</div>
        </div>
        <div class="indr">
          {{
            $t(
              "calculator.*强平价格的计算考虑了您现有的持仓,持有仓位的未实现盈亏和占有保证金将影响强平价格计算。"
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mySlider from "./my-slider.vue";
import Select from "./search.vue";
import handleDecimalPlaces from "../handleDecimalPlaces";
import mySelect from "@/components/my-select/my-select.vue";

export default {
  name: "cal-three",
  components: {
    Select,
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
    maintenanceMarginRatio: {
      type: Number,
      default: 0.004,
    },
  },
  data() {
    return {
      type: 1, // 0 空仓 1 多仓
      times: 1, // 杠杆倍数
      min: 1,
      maxPositionAmount: undefined, //最大可开 持有头寸
      //单向持仓参数
      form_single: {
        openPrice: undefined,
        theNumberOfTransactions: undefined,
        walletBalance: undefined,
      },
      // 双向持仓参数
      form_double: {
        openPrice_long: undefined,
        theNumberOfTransactions_long: undefined,
        openPrice_short: undefined,
        theNumberOfTransactions_short: undefined,
        walletBalance: undefined,
      },

      strongPrice: "--",
      positionType_isShow: false,
      positionType: this.$t("calculator.全仓"),
      position_activeId: 0,
      positionId: 1,
      positionTypeList: [
        { id: 0, symbolKey: this.$t("calculator.全仓"), positionId: 1 },
        { id: 1, symbolKey: this.$t("calculator.逐仓"), positionId: 2 },
      ],
      directionType_isShow: false,
      directionType: this.$t("calculator.双向持仓"),
      direction_activeId: 0, // 双向持仓 字段,单向持仓界面
      directionId: 1, //1 单向 2 双向
      directionTypeList: [
        { id: 0, symbolKey: this.$t("calculator.单向持仓"), directionId: 1 },
        { id: 1, symbolKey: this.$t("calculator.双向持仓"), directionId: 2 },
      ],
      btnStatus: false,
      P: 1, //常数符号 1 正数 -1 负数

      numsValue: 1,
      numsType: [
        { value: 1, label: this.$t("contract.张") },
        { value: 2, label: "USDT" },
        { value: 3, label: "BTC" },
      ],
      single_initialNums: "", //单向持仓张数
      double_short_initialNums: "",
      double_long_initialNums: "",
      transferNums: 0,
      visible: false,
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    togglePositionSelect(type) {
      if (type == 0) {
        this.positionType_isShow = !this.positionType_isShow;
      } else {
        if (this.positionId == 2) return;
        this.directionType_isShow = !this.directionType_isShow;
      }
    },

    // 全仓/逐仓选择
    positionChoose(row) {
      this.positionType = row.symbolKey;
      this.position_activeId = row.id;
      this.positionId = row.positionId;
    },
    //单向持仓/双向持仓选择
    directionChoose(row) {
      this.directionType = row.symbolKey;
      this.direction_activeId = row.id;
      this.directionId = row.directionId;
    },

    //保留小数
    handleDecimalPlaces(price) {
      let zero = "";
      for (let i = 1; i <= this.symbolInfo.priceDecimal; i++) {
        zero += "0";
      }
      let base = 1 + zero;
      let res = Math.round(price * base * 1) / base;
      return res;
    },

    //改变按钮状态
    changeStatus(formObj) {
      let arr = [];
      for (const key in formObj) {
        if (Object.hasOwnProperty.call(formObj, key)) {
          const element = formObj[key];
          let items = element && element != 0 ? true : false;
          arr.push(items);
          this.btnStatus = arr.every((item) => {
            return item == true;
          });
        }
      }
    },

    //单位换算
    transferUnit() {
      //单向持仓
      if (this.directionId == 1) {
        if (this.numsValue == 1) {
          this.single_initialNums = this.form_single.theNumberOfTransactions;
        } else if (this.numsValue == 2) {
          this.single_initialNums =
            this.form_single.theNumberOfTransactions /
            this.symbolInfo.faceValue /
            this.form_single.openPrice;
        } else {
          this.single_initialNums =
            this.form_single.theNumberOfTransactions /
            this.symbolInfo.faceValue;
        }
        // console.log("prompt", this.single_initialNums);
      } else {
        if (this.numsValue == 1) {
          //做多数量
          this.double_long_initialNums =
            this.form_double.theNumberOfTransactions_long;
            console.log('做多数量0',this.double_long_initialNums);
          //做空数量
          this.double_short_initialNums =
            this.form_double.theNumberOfTransactions_short;
        } else if (this.numsValue == 2) {
          //做多数量
          this.double_long_initialNums =
            this.form_double.theNumberOfTransactions_long /
              this.symbolInfo.faceValue /
              this.form_double.openPrice_long +
            "";
             console.log('做多数量1',this.double_long_initialNums);
          //做空数量
          this.double_short_initialNums =
            this.form_double.theNumberOfTransactions_short /
              this.symbolInfo.faceValue /
              this.form_double.openPrice_short +
            "";
        } else {
          //做多数量
          this.double_long_initialNums =
            this.form_double.theNumberOfTransactions_long /
              this.symbolInfo.faceValue +
            "";
          console.log('做多数量2',this.double_long_initialNums);
          //做空数量
          this.double_short_initialNums =
            this.form_double.theNumberOfTransactions_short /
              this.symbolInfo.faceValue +
            "";
        }
      }
    },

    calculate() {
      this.transferUnit();
      // if (!this.btnStatus) return;

      //单向持仓
      if (this.directionId == 1) {
        //预估强平价= (余额 - 面值 *|张数| *开仓价格)/(面值*|张数|*(维持保证金率+手续费 - 1))
        this.strongPrice =
          (this.form_single.walletBalance -
            this.p *
              this.symbolInfo.faceValue *
              this.single_initialNums *
              this.form_single.openPrice) /
          (this.symbolInfo.faceValue *
            this.single_initialNums *
            (this.maintenanceMarginRatio +
              this.symbolInfo.openTakerFee -
              this.p));
        console.log("计算价格1", this.strongPrice);
      } else {
        //双向持仓
        //预估强平价= [余额-面值*做多数量*做多开仓价格 + 面值*做空数量*做空开仓价格]/[(面值*(做多数量+做空数量)*(维持保证金率+手续费率)-面值*做多数量+面值*做空数量)]

        this.strongPrice =
          (this.form_double.walletBalance -
            this.symbolInfo.faceValue *
              (this.double_long_initialNums * this.form_double.openPrice_long +
                this.double_short_initialNums *
                  this.form_double.openPrice_short)) /
          (this.symbolInfo.faceValue *
            ((this.double_long_initialNums + this.double_short_initialNums) *
              (this.maintenanceMarginRatio + this.symbolInfo.openTakerFee) -
              (this.double_long_initialNums + this.double_short_initialNums)));
        console.log("计算价格2", this.strongPrice);
      }
      this.strongPrice = handleDecimalPlaces(
        this.symbolInfo.priceDecimal,
        this.strongPrice
      );
      console.log("计算价格3", this.strongPrice);
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
    unit() {
      let index = this.symbolInfo?.symbolCode.indexOf("/");
      let unit = this.symbolInfo?.symbolCode.slice(0, index);
      return unit;
    },
    disabled() {
      let flag = "";
      if (this.directionId == 1) {
        flag =
          this.form_single.theNumberOfTransactions &&
          this.form_single.theNumberOfTransactions != 0 &&
          this.form_single.walletBalance &&
          this.form_single.walletBalance != 0 &&
          this.form_single.closePrice &&
          this.form_single.closePrice != 0 &&
          !this.visible;
      }
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
        amount = cont * this.symbolInfo.faceValue * this.form_single.openPrice;
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
    "form_single.theNumberOfTransactions": {
      handler(newValue) {
        this.visible = newValue > this.transferNums ? true : false;
      },
    },
    //监听单位
    unit: {
      handler(value) {
        let obj = {
          label: value,
          value: 3,
        };
        this.numsType[2] = obj; //设置下拉框单位

        if (this.numsValue == 3) {
          //重置动态的单位
          this.numsValue = 1;
        }
      },
      immediate: true,
    },

    //做多 空
    type: {
      handler(value) {
        this.p = value ? 1 : -1;
      },
      immediate: true,
    },
    form_single: {
      handler(formObj) {
        if (this.directionId == 1) {
          this.changeStatus(formObj);
        }
      },
      deep: true,
      immediate: true,
    },
    form_double: {
      handler(formObj) {
        if (this.directionId == 2) {
          this.changeStatus(formObj);
        }
      },
      deep: true,
      immediate: true,
    },
    //全仓 逐仓
    // positionId: {
    //   handler(value) {
    //     if (value == 2) {
    //       this.$refs.directionTypeRef.chooseItem(this.directionTypeList[0]);
    //     }
    //   },
    // },

    directionId: {
      handler(newValue) {
        if (newValue == 1) {
          this.changeStatus(this.form_single);
        } else {
          this.changeStatus(this.form_double);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.calculator_container {
  width: 100%;
  .left {
    flex: 1;
    .positionType {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .textbox {
        position: relative;
        width: 160px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        border-radius: 6px;
        background-color: var(--calculator-content-bg);
        cursor: pointer;
        z-index: 9999;
        &.active {
          border: 1px solid var(--theme-color);
        }
        ::v-deep .search-box {
          display: none;
        }
      }
    }
    .direction {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      margin-top: 20px;
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
        .title {
          font-size: 16px;
          &.long {
            color: #90ff00;
          }
          &.short {
            color: #f75f52;
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
    position: relative;
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
    .indr {
      position: absolute;
      bottom: 15px;
      left: 0;
      padding: 0 10px;
      font-size: 12px;
      color: #96a2b2;
    }
  }
}
</style>
