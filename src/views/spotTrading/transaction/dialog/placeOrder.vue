<!-- 下单弹框 -->
<template>
  <div>
    <!-- <el-dialog
      :visible.sync="visible"
      class="placeOrder"
      width="600px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="placeOrder-content">
        <div class="title fontWeight600">{{ $t(t + "下单确认") }}</div>
        <div class="box">
          <div class="box-line value between fontWeight600">
            {{ contractInfo.symbolCode }} {{ $t(t + "永续") }}
            <div
              :class="[
                { green: showText.typeBtnTxtCol != -1 },
                { origin: showText.typeBtnTxtCol == -1 },
              ]"
            >
              {{ showText.placeTextObj?.name1 }}
              {{ showText.placeTextObj?.name2 }}{{ $t(t + "仓") }}
              {{ showText.placeTextObj?.name3 }}X
            </div>
          </div>
          <div class="box-line between gray">
            {{ $t(t + "价格") }}
            <div class="fontWeight600 value block">{{ showText.price }}</div>
          </div>
          <div class="box-line between gray">
            {{ $t(t + "数量") }}
            <div class="fontWeight600 value block">
              {{ showText.quantity }}
              {{
                contractInfo.amountUnit == "张"
                  ? $t(t + "张")
                  : contractInfo.amountUnit
              }}
            </div>
          </div>
          <div class="box-line between gray">
            {{ $t(t + "类型") }}
            <div class="fontWeight600 value block">{{ showText.type }}</div>
          </div>
        </div>

        <template v-if="tabsIndex == 1">
          <el-collapse
            class="cuday-collapsae"
            value="1"
            @change="isShowzyzsInfo = !isShowzyzsInfo"
          >
            <el-collapse-item name="1">
              <template slot="title">
                <div class="fontSize16 between pointer title pt15">
                  {{ $t(t + "止盈止损") }}
                </div>
              </template>
              <div class="blockInput between mt20">
                <el-input
                  placeholder="0.00"
                  class=""
                  v-model.trim="params.triggerProfitPrice"
                  @input.native="(e) => changeInputPay(e)"
                  maxlength="12"
                >
                  <div slot="suffix" class="block mr10 quantyUnit">USDT</div>
                  <div slot="suffix" class="inputName pl10">
                    {{ $t(t + "止盈") }}
                  </div>
                </el-input>
                <div class="unit block">
                  {{ activePrice == 0 ? $t(t + "限价") : $t(t + "市价") }}
                </div>
              </div>
              <div class="blockInput between mt20">
                <el-input
                  placeholder="0.00"
                  class=""
                  v-model.trim="params.triggerLossPrice"
                  @input.native="(e) => changeInputPay(e)"
                  maxlength="12"
                >
                  <div slot="suffix" class="block mr10 quantyUnit">USDT</div>
                  <div slot="suffix" class="inputName pl10">
                    {{ $t(t + "止损") }}
                  </div>
                </el-input>
                <div class="unit block">
                  {{ activePrice == 0 ? $t(t + "限价") : $t(t + "市价") }}
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </template>

        <template v-else>
          <div class="tips">
            {{ $t(t + "当市场价与标记价格偏离超过5%时，下单可能失败") }}
          </div>
        </template>

        <div class="tips-strong">
          {{
            $t(
              "contract.由于行情变动快，止损触发价不宜离预估强平价过近，避免触发失败"
            )
          }}
        </div>
        <div class="flexs mt20">
          <el-checkbox v-model="isShowPlaceOreder">{{
            $t(t + "不再展示，您可在【用户-交易】中重新设置。")
          }}</el-checkbox>
        </div>
      </div>
      <div class="placeOrder-footerBtn between mt40">
        <div class="cancel" @click="$emit('close')">{{ $t(t + "取消") }}</div>
        <div
          class="config"
          :style="{
            background: showText.typeBtnTxtCol != -1 ? '#90ff00' : '#F75F52',
          }"
          @click="handlePlaceOrder"
        >
          {{ $t(t + "确认") }}
        </div>
      </div>
    </el-dialog> -->
    <myModal :is-show="visible" useTheme class="placeOrder">
      <template slot="header">
        <div class="title">{{ $t("contract.下单确认") }}</div>
      </template>
      <template slot="content">
        <div class="placeOrder-content">
          <div class="box">
            <div class="box-line value between fontWeight600">
              {{ contractInfo.symbolCode }} {{ $t(t + "永续") }}
              <div
                :class="[
                  { green: showText.typeBtnTxtCol != -1 },
                  { origin: showText.typeBtnTxtCol == -1 },
                ]"
              >
                {{ showText.placeTextObj?.name1 }}
                {{ showText.placeTextObj?.name2 }}{{ $t(t + "仓") }}
                {{ showText.placeTextObj?.name3 }}X
              </div>
            </div>
            <div class="box-line between gray">
              {{ $t(t + "价格") }}
              <div class="fontWeight600 value block">{{ showText.price }}</div>
            </div>
            <div class="box-line between gray">
              {{ $t(t + "数量") }}
              <div class="fontWeight600 value block">
                {{ showText.quantity }}
                {{
                  contractInfo.amountUnit == "张"
                    ? $t(t + "张")
                    : contractInfo.amountUnit
                }}
              </div>
            </div>
            <div class="box-line between gray">
              {{ $t(t + "类型") }}
              <div class="fontWeight600 value block">{{ showText.type }}</div>
            </div>
          </div>

          <template v-if="tabsIndex == 1">
            <el-collapse
              class="cuday-collapsae"
              value="1"
              @change="isShowzyzsInfo = !isShowzyzsInfo"
            >
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="fontSize16 between pointer title pt15">
                    {{ $t(t + "止盈止损") }}
                  </div>
                </template>
                <div class="blockInput between mt20">
                  <el-input
                    placeholder="0.00"
                    class=""
                    v-model.trim="params.triggerProfitPrice"
                    @input.native="(e) => changeInputPay(e)"
                    maxlength="12"
                  >
                    <div slot="suffix" class="block mr10 quantyUnit">USDT</div>
                    <div slot="suffix" class="inputName pl10">
                      {{ $t(t + "止盈") }}
                    </div>
                  </el-input>
                  <div class="unit block">
                    {{ activePrice == 0 ? $t(t + "限价") : $t(t + "市价") }}
                  </div>
                </div>
                <div class="blockInput between mt20">
                  <el-input
                    placeholder="0.00"
                    class=""
                    v-model.trim="params.triggerLossPrice"
                    @input.native="(e) => changeInputPay(e)"
                    maxlength="12"
                  >
                    <div slot="suffix" class="block mr10 quantyUnit">USDT</div>
                    <div slot="suffix" class="inputName pl10">
                      {{ $t(t + "止损") }}
                    </div>
                  </el-input>
                  <div class="unit block">
                    {{ activePrice == 0 ? $t(t + "限价") : $t(t + "市价") }}
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </template>

          <template v-else>
            <div class="tips">
              {{ $t(t + "当市场价与标记价格偏离超过5%时，下单可能失败") }}
            </div>
          </template>

          <div class="tips-strong">
            {{
              $t(
                "contract.由于行情变动快，止损触发价不宜离预估强平价过近，避免触发失败"
              )
            }}
          </div>
          <div class="flexs mt20">
            <el-checkbox v-model="isShowPlaceOreder">{{
              $t(t + "不再展示，您可在【用户-交易】中重新设置。")
            }}</el-checkbox>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="btns df aic jb">
          <my-button type="normal" class="mr15" @click="close">{{
            $t(t + "取消")
          }}</my-button>
          <my-button
            :class="showText.typeBtnTxtCol != -1 ? 'buy' : 'sell'"
            :loading="isLoading"
            @click="handlePlaceOrder"
            >{{ $t(t + "确认") }}</my-button
          >
        </div>
      </template>
    </myModal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { usdtContract } from "@/api/contractExchange.js";
import { changeNumberVal, truncateDecimal } from "@/libs/utils.js";
import checkUtils from "@/libs/checkUtils";
import myModal from "@/components/my-modal";
export default {
  components: {
    myModal,
  },
  props: {
    // 1 开仓 2 平仓
    tabsIndex: {
      type: String | Number,
    },
    // 价格类型 0 限价 | 1 市价 | 2 计划
    active: {
      type: String | Number,
    },
    // 下单参数
    params: {
      type: Object,
    },
    // 0 限价 1市价
    activePrice: {
      type: String | Number,
    },
    // 下单开关
    visible: {
      type: Boolean,
      default: false,
    },
    // 下单类型
    typeBtnTxt: {
      type: Object,
    },
    // 小数精度
    quantityDecimal: {
      type: String | Number,
    },
    // 是否 % 转换
    isBfbUnit: {
      type: Boolean,
      default: false,
    },
    // 1张 = xxx数量单位
    oneConvertUnit: {
      type: String | Number,
    },
  },
  data() {
    return {
      // 显示文本内容
      showText: {
        placeText: "",
        price: "",
        quantity: "",
        type: "",
      },
      // 设置不显示下单弹框
      isShowPlaceOreder: false,
      // 止盈止损开关
      isShowzyzsInfo: false,
      // 国际缩写
      t: "contract.",
      isLoading: false, //数据提交中
    };
  },

  // mounted() {
  //   this.handleShowData();
  // },
  methods: {
    close() {
      this.isLoading = false;
      this.$emit("update:visible", false);
    },
    // 下单
    handlePlaceOrder() {
      if (this.isLoading) return;
      this.isLoading = true;
      // 市价不传金额
      [2, 4, 7].includes(this.params.orderType) &&
        (this.params.price = undefined);
      usdtContract({
        ...this.params,
        positionType: this.leverInfo?.positionType,
        coinMarket: this.contractInfo.symbolCode,
      })
        .then((res) => {
          if (res.code == 1 && res.success) {
            this.$emit("success");
            this.isLoading = false;
          } else {
            this.close();
          }
        })
        .catch((error) => {
          this.close();
        });
    },
    // 显示数据处理
    handleShowData() {
      // active 0 限 1 市 2 计划  | activePrice 0 限价 1市价 | tabsIndex 1 开仓 2 平仓 ≈
      // 下单类型 1限价开仓，2市价开仓，3限价平仓，4市价平仓，5计划限价开仓，6计划限价平仓，7计划市价开仓，8计划市价平仓 (6和8没有)
      this.params.orderType = this.getOrderType(
        this.active,
        this.activePrice,
        this.tabsIndex
      );
      // 下单类型标题（显示文本内容）

      // console.log("prompt", this.typeBtnTxt.value.slice(0, 1).indexOf(1));
      // console.log("this.leverInfo", this.leverInfo);

      const sliderText =
        this.leverInfo.positionType == 0
          ? this.leverInfo.defaultValue
          : this.typeBtnTxt.value.substr(-1) == "1"
          ? this.leverInfo.warehouseMuchPosition
          : this.leverInfo.warehouseShortPosition;

      this.showText = {
        placeTextObj: {
          name1: this.typeBtnTxt.label,
          name2:
            this.typeBtnTxt.value.substr(-1) == 1
              ? this.$t("contract.多")
              : this.$t("contract.空"),
          name3: sliderText,
        },
        typeBtnTxtCol: this.typeBtnTxt.value.slice(0, 1).indexOf(1),
        price: [2, 4, 7].includes(this.params.orderType)
          ? this.$t(this.t + "最优市价")
          : this.params.price + " USDT",
        type: `${
          this.leverInfo.positionType == 0
            ? this.$t(this.t + "全仓")
            : this.$t(this.t + "逐仓")
        } - ${this.active == 2 ? this.$t(this.t + "计划") : ""} ${
          this.activePrice == 0
            ? this.$t(this.t + "限价")
            : this.$t(this.t + "市价")
        }`,
      };

      const boolBTCBfb =
        this.isBfbUnit &&
        this.contractInfo.amountUnit != "USDT" &&
        this.contractInfo.amountUnit != "张";
      // console.log(this.params.amount, this.contractInfo.faceValue)
      // 判定是否是Btc百分比
      if (boolBTCBfb) {
        // console.log(this.params.amount, this.oneConvertUnit)
        this.showText.quantity = checkUtils.accMul(
          this.params.amount,
          this.contractInfo.faceValue
        );
        this.handleCount();
      } else {
        // console.log(this.oneConvertUnit,this.params.amount)
        this.handleCount();
        this.showText.quantity = checkUtils.accMul(
          this.params.amount,
          this.oneConvertUnit
        );
      }
    },
    // 计算转换“张”
    handleCount() {
      const price = this.params.price || this.priceObj?.lastPrice, // 价格
        amount = this.params.amount, // 数量
        faceValue = this.contractInfo.faceValue, // 面值
        openTakerFee = this.contractInfo.openTakerFee, // 手续费
        amountUnit = this.contractInfo.amountUnit; // 数量单位

      if (amountUnit == "张") return;
      // 判断条件，数量单位转换
      let result;
      if (amountUnit === "USDT") {
        const countBfbUSDT = checkUtils.accDiv(amount, faceValue, price); // 是否百分比
        const countUSDT = checkUtils.accDiv(amount, this.oneConvertUnit);
        result = this.isBfbUnit ? countBfbUSDT : countUSDT;
      } else {
        const unit = this.isBfbUnit ? 1 : faceValue; // 如果是百分比单位，原值即可（相当于除以1）
        result = checkUtils.accDiv(amount, unit);
      }
      this.params.amount = parseInt(result);
    },
    // 获取订单类型
    getOrderType(active, activePrice, tabsIndex) {
      const mapping = {
        0: {
          1: 1, // 限价开仓
          2: 3, // 限价平仓
        },
        1: {
          1: 2, // 市价开仓
          2: 4, // 市价平仓
        },
        2: {
          0: {
            1: 5, // 计划限价开仓
            2: 6, // 计划限价平仓
          },
          1: {
            1: 7, // 计划市价开仓
            2: 8, // 计划市价平仓
          },
        },
      };

      const orderType =
        mapping[active]?.[activePrice]?.[tabsIndex] ??
        mapping[active]?.[tabsIndex] ??
        mapping[active];

      return orderType;
    },

    // 输入框限制
    changeInputPay(e) {
      e.target.value = changeNumberVal(
        e.target.value,
        this.quantityDecimal,
        ""
      );
    },
  },
  computed: {
    ...mapState({
      // 实时价格
      priceObj: (state) => state.contract?.priceObj,
      // 获取合约杠杆信息
      leverInfo: (state) => state.contract?.leverInfo,
      // 交易对
      contractInfo: (state) => state.contract?.contractInfo,
      // 实时保证金
      availableObj: (state) => state.contract?.availableObj,
    }),
  },
  watch: {
    visible: {
      handler(newVal) {
        if (newVal) {
          this.handleShowData();
        }
      },
    },
  },
};
</script>

<style>
.cuday-collapsae {
  .el-collapse-item__header,
  .el-collapse-item__wrap {
    background: var(--trade-order-Input-bg);
    border-bottom: 1px solid transparent;
  }
}
</style>

<style lang="scss" scoped>
.green {
  color: #90ff00;
}

.origin {
  color: #f75f52;
}
.buy {
  background: #90ff00 !important;
}
.sell {
  background: #f75f52 !important;
}

// .el-dialog__wrapper {
//   overflow: hidden;
// }

/* 下单弹框 */
.placeOrder {
  .el-collapse {
    border: none !important;
    background-color: var(--pop-bg) !important;
    .el-collapse-item__header {
      background-color: inherit !important;
    }
    .el-collapse-item__wrap {
      background-color: inherit !important;
      border-bottom: none;
    }
  }

  .el-dialog {
    background: var(--trade-order-Input-bg);
  }

  &-content {
    width: 540px;
    margin: auto;

    .title {
      font-size: 18px;
      color: var(--trade-text-color);
    }

    .box {
      font-size: 14px;
      // padding: 30px 0;
      padding-bottom: 30px;
      border-bottom: 1px solid var(--trade-dialog-line-bg);
      b .value {
        color: var(--trade-text-color);
      }

      &-line {
        line-height: 28px;
        color: var(--trade-label-text-color);
      }
    }

    .el-checkbox {
      color: var(--trade-text-color);
    }

    .blockInput {
      color: var(--trade-text-color);

      .quantyUnit {
        color: var(--trade-text-color);
      }

      ::v-deep .el-input {
        font-size: 16px;
        width: 384px;
        height: 45px;
        line-height: 45px;

        &__inner {
          height: 45px;
          line-height: 45px;
          padding-right: 80px;
          background: var(--trade-lever-btn-gb);
          border: 1px solid var(--trade-dialog-line-bg);
          color: var(--trade-text-color);
          text-align: right;

          &:hover,
          &:focus {
            border-color: #90ff00;
          }
        }

        .inputName {
          position: absolute;
          left: -315px;
          top: 0;
          color: var(--trade-text-color);
        }
      }

      .unit {
        width: 136px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        border-radius: 6px;
        border: 1px solid #e1e1e1;
        font-weight: bold;
        font-size: 16px;
        border: 1px solid var(--trade-dialog-line-bg);

        &:hover {
          border-color: #90ff00;
        }
      }
    }

    .tips {
      margin-top: 20px;
      font-size: 14px;
      color: #f75f52;
    }
    .tips-strong {
      font-size: 14px;
      color: #ffac00;
    }
  }

  &-footerBtn {
    width: 540px;
    margin: auto;

    div {
      cursor: pointer;
      width: 260px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border-radius: 12px;
      font-size: 18px;
      background: var(--trade-btn-color);
      color: var(--trade-text-color);

      &:hover {
        opacity: 0.8;
      }
    }

    .config {
      color: white;
    }
  }
}
</style>
