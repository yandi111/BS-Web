<!-- OTC买卖支付方式 -->
<template>
  <div>
    <common-modal
      v-if="isNoPayType == false"
      width="600px"
      :show="isShow"
      :noFooter="false"
      :showClose="false"
      :FooterIsCenter="true"
      @cancel="cancelMethod"
      class="payModal"
    >
      <template #dia_title>
        <div class="custom-title between mg20">
          <div class="flexs">
            <img :src="params.legalIcon" class="width24 height24" alt="" />
            <span
              style="
                padding-left: 5px;
                line-height: 24px;
                font-size: 18px;
                color: #303133;
              "
            >
              {{ params?.type == 1 ?$t(t+'卖出') : $t(t+'买入')
              }}{{ params?.coinName }}</span
            >
          </div>
          <div @click="cancelMethod">
            <i class="el-icon-close fontSize16 pointer"></i>
          </div>
        </div>
      </template>

      <template #dia_content>
        <div class="pay-content">
          <div class="money-content">
            <div class="text-container">
              <!-- 0 买 1卖 -->
              <!-- 快捷 -->
              <template v-if="isQuick">
                <span>{{
                  params?.type == 1 ? params.quantity : params.amount
                }}</span>
                <span>{{
                  params?.type == 1 ? params.coinName : params?.legalTenderName
                }}</span>
              </template>
              <!-- 普通 -->
              <template v-else>
                <span>{{
                  params?.type == 1 ? params.amount : params.quantity
                }}</span>
                <span>{{
                  params?.type == 1 ? params.coinName : params?.legalTenderName
                }}</span>
              </template>
            </div>
            <div class="text-reciver" v-if="isQuick">
          {{   $t(t+'我将得到') }}    {{ params.actuallyGet }}
            </div>
            <div class="text-reciver" v-else>
              {{$t(t+'我将得到')}} 
              {{ params?.type == 1 ? params.quantity : params.amount }}
              {{
                params?.type == 1 ? params.legalTenderName : params?.coinName
              }}
            </div>
          </div>

          <div class="collect-type">
            <div class="flex-type">
              <p class="type">
                {{ params?.type == 1 ?$t(t+'收款方式') : $t(t+'支付方式') }}
              </p>
              <p>  {{$t(t+'价格')}} </p>
            </div>
            <div class="collect-content">
              <div class="pay-kind">
                <div
                  class="pay-con"
                  :class="[{ 'active-item': activePay.includes(item.key) }]"
                  v-for="(item, index) in payList"
                  :key="index"
                  @click="choosePay(item)"
                >
                  <div
                    :class="{
                      'pay-alipay': item.key == 2,
                      'pay-wx': item.key == 3,
                      'pay-card': item.key == 1,
                    }"
                  >
                    {{ $t(t+item.name )}}
                  </div>
                  <div class="pay-container">
                    <div class="pay-price">
                      {{
                        params.createType == 1
                          ? params?.coinName
                          : params?.legalTenderName
                      }}
                      ￥ {{ isQuick ? item.unitPrice : params.unitPrice }}
                    </div>
                    <div class="pay-cheap" v-if="isQuick && index == 0">
                      {{ $t(t+'单价最优')  }}  
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-type flexs" v-if="params?.type == 1">
              <p class="type">
                {{ params?.type == 1 ?$t(t+'收款账户'):$t(t+'支付账户') }}
              </p>
              <p
                class="pointer fontSize15 flexs"
                style="color: #90ff00"
                @click="handleAddPayShow"
              >
              {{ $t(t+'选择收款方式') }}  
              </p>
            </div>
            <div class="payInfo" v-if="params?.type == 1">
              <div class="payInfo-name" v-show="activePay.toString() == 1">
                {{ $t(t+payNum[activePay.toString()]) }}     {{ $t(t+'尾号') }}        
                {{ payTypeVos?.num.slice(-4) }}
              </div>
              <div class="mt15 flexs between">
                <div class="label">   {{ $t(t+'账户名') }}    </div>
                <div class="value">{{ payTypeVos?.name || $t(t+'空')  }}</div>
              </div>
              <div class="mt15 flexs between">
                <div class="label">
                  {{ $t(t+payNum[activePay.toString()])|| $t(t+'空')}}{{$t(t+'账号')}}
                </div>
                <div class="value">{{ payTypeVos?.num || $t(t+'空')}}</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #dia_footer>
        <el-button type="text" style="width: 100%" @click="handleVerfyNext">
          {{$t(t+'确认')}}     {{ params?.type == 1 ? $t(t+'卖出') : $t(t+'买入')  }}
        </el-button>
      </template>
    </common-modal>

    <choose-pay
      ref="schoosePay"
      :isQuick="isQuick"
      :incomeId="incomeId"
      :addPayShow.sync="addPayShow"
      :chooseList="payTypeVos == undefined ? params.payTypeVos : [payTypeVos]"
      :isRudio="true"
      v-show="addPayShow"
      @cancelPay="cancelPay"
      @next="handleSelectPay"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { payList } from "@/api/otc.js";
import CommonModal from "@/components/commonModal/index.vue";
import ChoosePay from "./choosePay.vue";
import { deepClone } from "@/libs/utils.js";

export default {
  name: "GetMethods",
  components: {
    CommonModal,
    ChoosePay,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    // 显示参数
    params: {
      type: Object,
      default: () => {},
    },
    // 支付类型
    incomeId: {
      type: String,
      default: "",
    },
    // 支付类型匹配
    payObj: {
      type: Array,
      default: () => [],
    },
    // 是否从快捷买入进入
    isQuick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
        // 国际缩写
        t: 'c2c.',
      isNoPayType: true,
      minPrice: 0,
      activePay: [],
      payList: [],
      payNum: {
        1: "银行卡",
        2: "支付宝",
        3: "微信",
      },
      accountId: "",
      payArr: [],
      payTypeVos: {},
      addPayShow: false,
      getPayNum: [],
    };
  },
  mounted() {
    // 快捷,选择卖家的支付方式
    if (this.isQuick) {
      // 获取支持的支付类型
      this.payList = this.params.payArr;
      this.activePay = [this.payList[0]?.key];
      this.payTypeVos = this.payList[0]?.payTypeVos[0];
      // console.log("object :>> ", this.params);
      this.params.actuallyGet = this.extractNonNumeric(
        this.params.data[0]?.actuallyGet
      );
      // 选择默认的支付账号
      this.chooseAccount();
      this.isNoPayType = false;
      return;
    }
    // 组装支付列表
    if (this.incomeId) {
      this.payList = this.incomeId.split(",").map((item) => {
        return {
          key: Number(item),
          name: this.payNum[item],
        };
      });
      // 默认选择支付类型
      const filterIncome = this.incomeId?.split(",");
      this.activePay = [Number(filterIncome[0])];
      this.payTypeVos = this.getPayNum.find(
        (acc) => acc.type == this.activePay.toString()
      );
      // 选择默认的支付账号
      this.chooseAccount();
			// console.log(this.incomeId, this.payList, this.payTypeVos, this.getPayNum);
      setTimeout((_) => {
        this.params?.type != 1 && (this.isNoPayType = false);
      });
    }
  },
  computed: {
    ...mapState({
      fastBuyAndSaleInfo: (state) => state.order.fastBuyAndSaleInfo,
    }),
  },
  methods: {
    // 选择收款方式弹框开关
    handleAddPayShow() {
      this.$refs.schoosePay?.handleNav(this.activePay[0]);
      setTimeout((_) => {
        this.addPayShow = true;
      }, 700);
    },
    // 回显收款方式
    handleSelectPay(list) {
			console.log(list)
      this.activePay = [list.type];
      this.getPayNum = this.getPayNum.map((acc) => {
        return acc.type === list.type ? list : acc;
      });
      this.payTypeVos = this.getPayNum.find(
        (acc) => acc.type == this.activePay.toString()
      );
      this.accountId = this.payTypeVos?.id;

      this.isNoPayType = false;
      this.$emit("update:isShow", true);
    },
    async getPayList() {
      await payList({ ids: 0, status: 1 }).then((res) => {
        if (res.data.length) {
          var uniqueArray = [];
          var typeSet = new Set();
          res.data.forEach(function (item) {
            if (!typeSet.has(item.type)) {
              typeSet.add(item.type);
              uniqueArray.push(item);
            }
          });
          this.getPayNum = uniqueArray;
          this.payTypeVos = uniqueArray.find(
            (acc) => acc.type == this.activePay.toString()
          );
          this.accountId = this.payTypeVos?.id;
          this.isNoPayType = false;
          return;
        }
        this.isNoPayType = true;
        this.addPayShow = true;
      });
    },
    // 选择支付账号
    chooseAccount(id = undefined) {
      let chooseItem = this.payObj.find(
        (item) => item.type === this.activePay[0]
      );
      this.accountId = chooseItem?.id || id;
    },
    // 选择支付方式
    async choosePay(item) {
      this.activePay = [item.key];
			// 如果是快捷
      if (this.isQuick) {
        this.params.actuallyGet = this.extractNonNumeric(
          this.params.data.find(
            (acc) => acc.showPayType == this.activePay.toString()
          ).actuallyGet
        );
        this.payTypeVos = this.params.payArr.find(
          (acc) => acc.key == this.activePay.toString()
        ).payTypeVos;
        this.accountId = this.payTypeVos[0]?.id;
      } else {
        this.payTypeVos = this.getPayNum.find(
          (acc) => acc.type == this.activePay.toString()
        );
        this.accountId = this.payTypeVos?.id;
      }
      // 获取到买家的支付
      this.params?.type != 1 && this.chooseAccount(this.accountId);
    },
    //  选择付款方式，下一步  2zfb 3wx
    handleVerfyNext() {
      // console.log('activePay :>> ', {activePay: this.activePay, accountId: this.accountId} ,this.payObj);
      if (this.params?.type == 1 && !this.payTypeVos?.num) {
        this.$message.warning(  this.$t(this.t+'账户为空，请选择收款方式进行添加')+"！");
        return;
      }
      if (!this.accountId && this.isQuick == false) {
        this.$message.warning(this.$t(this.t+'请选择支付方式'));
        return;
      }
      if (this.isQuick) {
        this.$emit("next", {
          activePay: this.activePay,
          accountId: this.accountId,
        });
        return;
      }
      this.$emit("next", this.accountId);
    },
    // 分割数字和字符串
    extractNonNumeric(str) {
      const nonNumericPart = str.replace(/[0-9.]/g, "");
      const numericPart = str.replace(/[^0-9.]/g, "");
      return numericPart + " " + nonNumericPart;
    },
		// 关闭选择收款方式
		async cancelPay(){
		 await this.getPayList();
			this.addPayShow = false;
		},
    // 关闭订单弹框
    cancelMethod() {
      this.$emit("cancelMethod");
      this.$emit("update:isShow", false);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep   .payModal {
  .el-dialog__body {
    padding: 0;
    margin-bottom: 35px;
  }
}
.pay-content {
  padding: 0 30px;
  .money-content {
    width: 100%;
    height: 102px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .text-container {
      span {
        height: 30px;
        line-height: 30px;
        &:first-child {
          font-size: 28px;
          color: #90ff00;
        }
        &:last-child {
          font-size: 18px;
          color: #333333;
          padding-left: 10px;
        }
      }
    }
    .text-reciver {
      font-size: 14px;
      line-height: 30px;
      color: #96a2b2;
    }
  }
  .collect-type {
    // padding: 0 15px;
    .flex-type {
      display: flex;
      justify-content: space-between;
      align-items: bottom;
      padding-bottom: 15px;
      font-size: 16px;
      color: #96a2b2;
      .type {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .price {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #666666;
      }
    }
    .collect-content {
      width: 100%;
      // background: #F7F7F7;
      border-radius: 10px;
      .quick-sale {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 30px;
      }
      .quick-card {
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #8992a6;
        line-height: 30px;
        padding-bottom: 15px;
        border-bottom: 1px solid #edf1ff;
      }
      .pay-kind {
        .pay-con {
          width: 100%;
          padding: 15px 20px;
          border-radius: 6px;
          border: 1px solid #f4f5f7;
          cursor: pointer;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          /** 微信 */
        }
        .active-item {
          border: 1px solid #90ff00;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            border: 14px solid #90ff00;
            border-top-color: transparent;
            border-left-color: transparent;
            z-index: 99;
          }
          &::after {
            content: "";
            position: absolute;
            width: 4px;
            height: 11px;
            bottom: 5px;
            right: 4px;
            border: 1px solid #fff;
            border-top: none;
            border-top-color: transparent;
            border-left-color: transparent;
            transform: rotate(40deg);
            z-index: 99;
          }
        }
      }
    }
    .payInfo {
      font-size: 14px;
      color: #333;
      &-name {
        height: 45px;
        line-height: 45px;
        border-radius: 6px;
        padding-left: 10px;
        border: 1px solid #f4f5f7;
      }
      .label {
        color: #96a2b2;
      }
    }
  }
}

.pay-wx {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 10px;
    background: #90ff00;
    left: -5px;
    top: 7px;
  }
}

/** 银行卡 */
.pay-card {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 10px;
    background: #ffd887;
    left: -5px;
    top: 7px;
  }
}

/** 支付宝 */
.pay-alipay {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 10px;
    background: #90ff00;
    left: -5px;
    top: 7px;
  }
}

.pay-wx1 {
  padding-left: 10px;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 12px;
    background: #90ff00;
    left: 0;
    top: 28%;
  }
}

/** 银行卡 */
.pay-card1 {
  padding-left: 10px;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 12px;
    background: #ffd887;
    left: 0;
    top: 28%;
  }
}

/** 支付宝 */
.pay-alipay1 {
  padding-left: 10px;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 12px;
    background: #90ff00;
    left: 0;
    top: 28%;
  }
}

.pay-container {
  .pay-price {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #00082d;
  }
  .pay-cheap {
    padding: 2px 7px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #90ff00;
    background: #edf1ff;
    border-radius: 3px;
    text-align: center;
    margin-top: 10px;
  }
}
::v-deep   .el-button {
  border: none;
  color: white;
  background: #90ff00;
  &:hover {
    opacity: 0.8;
  }
}
</style>
