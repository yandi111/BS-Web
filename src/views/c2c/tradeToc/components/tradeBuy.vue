<!-- 交易条款弹窗 -->
<template>
  <div>
    <common-modal :show="isShow" class="trade-modal">
      <template #dia_content>
        <div class="dia-content">
          <div class="left-panel">
            <div class="top-info">
              <div class="height50">
                <el-avatar
                  class="top-info-img width60"
                  :size="60"
                  fit="cover"
                  :src="buyInfo.avatar"
                ></el-avatar>
              </div>
              <div class="top-info-content">
                <div class="font-large ellipsis width200">
                  {{ buyInfo.nikeName }}
                </div>
                <div class="grade">
                  <span class="font-grey mar-right right-line">{{
                    buyInfo.orderQuantity + $t(t + "单")
                  }}</span>
                  <span class="font-grey">{{ buyInfo.orderRate }}</span>
                </div>
              </div>
            </div>
            <ul class="center-info">
              <li>
                <span class="color-grey"> {{ $t(t + "单价") }} </span>
                <span
                  :style="{
                    color: buyInfo.type == '0' ? '#90ff00' : '#F75F52',
                  }"
                  >{{ buyInfo.unitPrice }} {{ buyInfo.legalTenderName }}</span
                >
              </li>
              <li>
                <span class="color-grey">{{ $t(t + "限额") }}</span>
                <span class="color-black"
                  >{{ $formatNumber(buyInfo.minMoney) }}-{{
                    $formatNumber(buyInfo.maxMoney)
                  }}
                  CNY</span
                >
              </li>
              <li>
                <span class="color-grey">{{ $t(t + "剩余数量") }}</span>
                <span class="color-black"
                  >{{ $formatNumber(buyInfo.beleftQuantity) }}
                  {{ buyInfo.coinName }}</span
                >
              </li>
              <li>
                <span class="color-grey">{{ $t(t + "支付时效") }}</span>
                <span class="color-black">{{
                  buyInfo.tradingTime + $t(t + "分钟")
                }}</span>
              </li>
              <li>
                <span class="color-grey">{{ $t(t + "商家收款方式") }}</span>
                <span class="color-black">
                  <span
                    class="pay-card"
                    v-if="buyInfo.incomeId?.indexOf('1') > -1"
                    >{{ $t(t + "银行卡") }}</span
                  >&nbsp;
                  <span
                    class="pay-alipay"
                    v-if="buyInfo.incomeId?.indexOf('2') > -1"
                    >{{ $t(t + "支付宝") }}</span
                  >&nbsp;
                  <span
                    class="pay-wx"
                    v-if="buyInfo.incomeId?.indexOf('3') > -1"
                    >{{ $t(t + "微信") }}</span
                  >
                </span>
              </li>
            </ul>
            <div class="bottom-info">
              <p class="color-grey rules">{{ $t(t + "须知交易条款") }}</p>
              <div class="color-grey content">
                <p>
                  {{
                    $t("c2c.不要备注BTC、ETH、USDT等数字币字符，否则不放币。")
                  }}
                </p>
                <p>
                  {{
                    $t(
                      "c2c.打款账户资金如果是个人需要存在账户超过15天，如果是从股市，基金理财出来的钱，视情况3天内都行。如果没有达到，请不要下单，如果下单了，请您取消。"
                    )
                  }}
                </p>
                <p>
                  {{
                    $t(
                      "c2c.麻烦您提供一下银行卡APP上15天的交易明细，带尾号带余额，以及个人中心的带余额带银行卡尾号截图。"
                    )
                  }}
                </p>
                <p>
                  {{
                    $t(
                      "c2c.本商号已在反诈中心备案，如果您是黑钱，麻烦取消订单，如执意打款，发现后当场不退，并立即报警。"
                    )
                  }}
                </p>
                <P>
                  {{
                    $t(
                      "c2c.如您买币是参与各类资金盘，麻烦取消订单，本商家不与资金盘的人做交易，也请您远离资金盘，不要被骗。"
                    )
                  }}
                </P>
              </div>
            </div>
          </div>
          <div class="right-panel">
            <i
              class="el-icon-close"
              style="width: 100%; text-align: right; cursor: pointer"
              @click="$emit('update:isShow', false)"
            ></i>
            <el-form :model="formData" :rules="rules" ref="formData">
              <!-- 0 买 1 卖 -->
              <el-form-item
                prop="amount"
                :label="
                  buyInfo.type == 0 ? $t(t + '我将支付') : $t(t + '我将得到')
                "
                v-if="isChange"
              >
                <el-input
                  v-model="formData.quantity"
                  class="bcb-input"
                  @input.native="(e) => changeInputGet(e)"
                  :placeholder="$t(t + '请输入金额')"
                >
                  <div slot="suffix" class="small-content">
                    <img
                      :src="buyInfo.legalTenderIcon"
                      alt=""
                      style="width: 24px; height: 24px; border-radius: 50%"
                    />
                    <div class="text">{{ buyInfo.legalTenderName }}</div>
                  </div>
                </el-input>
              </el-form-item>
              <el-form-item
                :label="
                  buyInfo.type == 0 ? $t(t + '我将得到') : $t(t + '我将卖出')
                "
                prop="quantity"
                v-else
              >
                <el-input
                  v-model="formData.amount"
                  class="bcb-input"
                  @input.native="(e) => changeInputPay(e)"
                  :placeholder="$t(t + '请输入数量')"
                >
                  <div slot="suffix" class="small-content">
                    <img
                      :src="buyInfo.coinIcon"
                      alt=""
                      style="width: 24px; height: 24px; border-radius: 50%"
                    />
                    <div class="text">{{ buyInfo.coinName }}</div>
                  </div>
                </el-input>
              </el-form-item>
              <div class="balanceTips" v-if="buyInfo.type !== 0">
                <div >{{ $t(t+'资金账户可售 ') + availableAmount }}</div>
                <div class="toTranslate" @click="$router.push('/wallet/fundsTransfer')">{{ $t(t+'去划转') }}</div>
              </div>
              <el-form-item
                class="bcb-form-item item-get"
                :label="
                  buyInfo.type == 0 ? $t(t + '我将得到') : $t(t + '我将支付')
                "
                prop="quantity"
                v-if="isChange"
              >
                <el-input
                  v-model.trim="formData.amount"
                  class="bcb-input"
                  @input.native="(e) => changeInputPay(e)"
                  :placeholder="$t(t + '请输入数量')"
                >
                  <div slot="suffix" class="small-content">
                    <img
                      :src="buyInfo.coinIcon"
                      alt=""
                      style="width: 24px; height: 24px; border-radius: 50%"
                    />
                    <div class="text">{{ buyInfo.coinName }}</div>
                  </div>
                </el-input>
              </el-form-item>
              <el-form-item
                prop="amount"
                :label="
                  buyInfo.type == 0 ? $t(t + '我将支付') : $t(t + '我将得到')
                "
                v-else
              >
                <el-input
                  v-model="formData.quantity"
                  class="bcb-input"
                  @input.native="(e) => changeInputGet(e)"
                  :placeholder="$t(t + '请输入金额')"
                >
                  <div slot="suffix" class="small-content">
                    <img
                      :src="buyInfo.legalTenderIcon"
                      alt=""
                      style="width: 24px; height: 24px; border-radius: 50%"
                    />
                    <div class="text">{{ buyInfo.legalTenderName }}</div>
                  </div>
                </el-input>
              </el-form-item>
              <span class="bcb-hint"
                >*{{ $t(t + "当前汇率") }}: 1 {{ buyInfo.coinName }} ≈
                {{ buyInfo.unitPrice }}
                {{ buyInfo.legalTenderName }}
              </span>
              <el-form-item class="bcb-form-item item-button">
                <el-button
                  type="text"
                  :style="{
                    background: buyInfo.type == '0' ? '#90ff00' : '#F75F52',
                  }"
                  class="next"
                  @click="handleNext"
                  >{{ $t(t + "下一步") }}</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
    </common-modal>
  </div>
</template>

<script>
// import { mapState, mapGetters, mapActions } from "vuex";
import CommonModal from "@/components/commonModal/index.vue";
import checkUtils from "@/libs/checkUtils.js";
import { changeNumberVal } from "@/libs/utils.js";
import {queryAccount} from '@/api/otc.js'
export default {
  name: "TradeInfo",
  components: {
    CommonModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    buyInfo: {
      type: Object,
      default: null,
    },
  },
  computed: {
    // ...mapState(['order']),
  },
  watch: {
    // pubSymbol(v){
    // 	this.coinName = v //BTC
    // 	console.log('发布币种-监听',this.coinName);
    // }
    // 'order.pubSymbol': {
    //   handler(v) {
    //     this.coinName = v; //BTC
    //     console.log("发布币种-监听", this.coinName);
    //   },
		// 	immediate:true
    // },
  },
  data() {
    // 金额校验
    const validAmmount = (rule, value, callback) => {
      const { minMoney, maxMoney } = this.buyInfo;

      value = this.formData.quantity;
      callback(
        !value
          ? new Error(this.$t(this.t + "请输入金额"))
          : value < Number(minMoney)
          ? new Error(
              `${this.$t(this.t + "金额不能小于")}${this.buyInfo.minMoney}`
            )
          : value > Number(maxMoney)
          ? new Error(`${this.$t(this.t + "金额不能大于")}${maxMoney}`)
          : undefined
      );
    };
    // 数量校验
    const validAuantity = (rule, value, callback) => {
      const { beleftQuantity } = this.buyInfo;
      value = this.formData.amount;
      callback(
        !value
          ? new Error(this.$t(this.t + "请输入数量"))
          : value > beleftQuantity
          ? new Error(this.$t(this.t + "不可大于剩余数量"))
          : undefined
      );
    };
    return {
      //可售金额
      availableAmount:undefined,
      // 是否显示设置支付方式弹窗
      showGetModal: false,
      // 按数量还是金额
      isChange: true,
      formData: {
        // 金额 计算汇率所得到金额或者输入金额
        amount: "",
        // 计算汇率所得到数量或者输入数量
        quantity: "",
        // 买入币种
        dealId: 4,
        // 支付方式
        // incomeId: '1',
        // 法币id
        legalTenderId: 1,
      },
      entranceType: 1,
      rules: {
        amount: [
          {
            required: true,
            validator: validAmmount,
            trigger: "input",
          },
        ],
        quantity: [
          {
            required: true,
            validator: validAuantity,
            trigger: "input",
          },
        ],
      },
      activeName: "0",
      // 虚拟货币名称
      coinName: "USDT",
      // 法币名称
      legalTenderName: "CNY",
      // 国际化缩写
      t: "c2c.",
    };
  },
  mounted(){
    queryAccount({coinId:this.formData.dealId,type:2}).then(res => {
      this.availableAmount = res.data.amount
    })
  },
  methods: {
    // 换算
    change() {
      this.isChange = !this.isChange;
    },
    // 数量
    async changeInputPay(e) {
      e.target.value = changeNumberVal(
        e.target.value,
        this.buyInfo.decimalPlaces
      );
      this.formData.quantity = await checkUtils
        .accMul(e.target.value, this.buyInfo.unitPrice)
        .toFixed(this.buyInfo.accuracy);
      Number(this.formData.quantity) <= 0 && (this.formData.quantity = "");
    },
    // 金额
    async changeInputGet(e) {
      e.target.value = changeNumberVal(e.target.value, this.buyInfo.accuracy);
      this.formData.amount = await checkUtils
        .accDiv(e.target.value, this.buyInfo.unitPrice)
        .toFixed(this.buyInfo.decimalPlaces);
      Number(this.formData.amount) <= 0 && (this.formData.amount = "");
    },
    // 下一步点击事件
    handleNext() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          // 下单传参 (USDT数量 CNY金额)
          let params = {
            advertId: this.buyInfo.id,
            // 0 卖  1 买
            orderType: this.buyInfo.type == 0 ? 1 : 0,
            price: this.buyInfo.unitPrice,
            // 订单类型 1 数量下单 2 金额下单
            createType: this.isChange ? 2 : 1,
            // coinId: this.formData.dealId,
            coinId: this.buyInfo.coinId,
            // coinName: this.coinName,
            coinName: this.buyInfo.coinName,
            quantity: this.isChange ? undefined : this.formData.amount,
            amount: this.isChange ? this.formData.quantity : undefined,
            // 广告商id
            advertUserId: this.buyInfo.userId,
            // 广告商uid
            advertUid: this.buyInfo.uid,
            // 1：c2c 、2：大宗
            entranceType: this.entranceType,
          };
          // 第一个对象params,接口所需参数
          // 第二个对象, 显示在支付页面的字段
          this.$emit("next", params, {
            ...this.formData,
            legalTenderName: this.legalTenderName,
            // coinName: this.coinName,
            coinName: this.buyInfo.coinName, 
            unitPrice: this.buyInfo.unitPrice,
            legalIcon: this.buyInfo.coinIcon,
            coinIcon: this.buyInfo.legalTenderIcon,
            payTypeVos: this.buyInfo.payTypeVos,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.balanceTips{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #8992A6;
  .toTranslate{
    color: #90ff00;
    text-decoration:underline;
    cursor: pointer;
  }
}
.trade-modal {
  ::v-deep .el-dialog {
    border-radius: 6px;
    .el-dialog__header{
      padding: 0 !important;
    }
  }

  ::v-deep .el-dialog__body {
    padding: 0;
    margin-bottom: 0;
  }

  .dia-content {
    /* width: 761px; */
    padding: 0;

    .left-panel {
      border-radius: 6px 0 0 6px;
      padding: 35px 30px 43px 25px;
      width: 50%;
      background-color: #f5f7fa;

      .top-info {
        display: flex;
        margin-bottom: 40px;

        .top-info-img {
          width: 50px;
          height: 50px;
          margin-right: 20px;
          border-radius: 50%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .top-info-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .right-line {
            position: relative;

            &::before {
              content: "";
              position: absolute;
              top: 3px;
              right: -10px;
              width: 2px;
              height: 15px;
              background-color: #8992a6;
              border-radius: 2px;
            }
          }
        }
      }

      .center-info {
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          font-weight: 400;
        }
      }

      .bottom-info {
        margin-top: 20px;

        .rules {
          font-size: 14px;
          font-weight: 600;
          color: #666666;
          margin-bottom: 18px;
        }

        .content {
          font-size: 10px;
          font-weight: 400;
          color: #666666;
          line-height: 2;
        }
      }
    }

    .right-panel {
      border-radius: 0 6px 6px 0;
      width: 50%;
      padding: 40px 40px 0 40px;
      position: relative;

      .change-icon {
        position: absolute;
        top: 26%;
        right: 50%;
        width: 24px;
        height: 24px;
        z-index: 999;

        .icon-change {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.next {
  width: 100%;
  height: 47px;
  font-size: 16px;
  font-weight: 600;
  color: #fefefe;
  margin-top: 40px;

  &:hover {
    opacity: 0.8;
  }
}

.font-large {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
}

.font-grey {
  font-size: 14px;
  font-weight: 400;
  color: #8992a6;
}

.mar-right {
  margin-right: 20px;
}

.color-grey {
  color: #666666;
}

.color-black {
  color: #333333;
}

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333333;
}

.form-tip {
  font-size: 10px;
  font-weight: 400;
  color: #8992a6;
  line-height: 30px;
}

.el-select {
  width: 100%;
}
.bcb-input {
  ::v-deep .el-input__inner {
    border: 1px solid transparent;
    background: #f5f7fa;
    &:hover {
      border: 1px solid #90ff00;
    }
    &:focus {
      background: white;
    }
  }
}
.bcb-hint {
  width: 100%;
  height: 14px;
  font-size: 12px;
  font-weight: 500;
  color: #8992a6;
  margin-bottom: 20px;
}
</style>
