<!-- 查看止盈止损 -->
<template>
  <div class="toView">
    <common-modal
      width="600px"
      :show="isShow"
      :noFooter="false"
      :showClose="false"
      :appendToBody="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_title>
        <div class="title">
          <span class="text">{{
            "contract.止盈止损" | translate
          }}</span>
          <i class="iconfont icon-close" @click="handleCancel"></i>
        </div>
      </template>
      <template #dia_content>
        <div class="content">
          <p class="tip">
            {{ "contract.如果此委托单部分或完全成交,则提示止盈委托和止损委托" | translate }}
          </p>
          <div class="baseInfo">
            <div class="orderNo">
              <span class="orderLabel mr10">
                {{ "contract.委托单号" | translate }}:</span
              >
              <span class="orderNum">{{ data.entrustNo }}</span>
            </div>
            <div class="cell">
              <span class="label">{{
                list.entrustType == 1
                  ? "contract.限价委托"
                  : "contract.计划委托" | translate
              }}</span>
              <span class="value">{{
                list.orderStatus == 1
                  ? "contract.未生效"
                  : "contract.已生效" | translate
              }}</span>
            </div>
            <div class="cell">
              <span class="label">{{
                "contract.方向" | translate
              }}</span>
              <span class="value" :class="list.direct == 1 ? 'in' : 'out'">{{
                list.direct == 1
                  ? "contract.买入open"
                  : "contract.卖出close" | translate
              }}</span>
            </div>
            <div class="cell">
              <span class="label">{{
                "contract.数量" | translate
              }}</span>
              <span class="value"
                >{{ list.orderAmount }}
                {{ "contract.张" | translate }}</span
              >
            </div>
            <div class="cell">
              <span class="label">{{
                "contract.触发价" | translate
              }}</span>
              <span class="value">{{ list.triggerPrice }} USDT</span>
            </div>
            <div class="cell">
              <span class="label">{{
                "contract.委托价" | translate
              }}</span>
              <span class="value"
                >{{
                  list.orderPrice
                    ? `${list.orderPrice} USDT`
                    : "contract.最优市价" | translate
                }}
              </span>
            </div>
          </div>
          <div class="lines">
            <div class="line1"></div>
          </div>
          <div class="df aic jb">
            <div class="cardBox">
              <p class="tip">{{ $t('contract.如果止盈委托完全成交，则取消止损委托') }}</p>
              <div class="card">
                <div class="title">
                  {{ "contract.止盈委托" | translate }}
                </div>
                <div class="cell">
                  <span class="label">
                    {{ "contract.市价止盈" | translate }}</span
                  >
                  <span class="value">{{
                    list.profitStatus == 2
                      ? "contract.已生效"
                      : "contract.未生效" | translate
                  }}</span>
                </div>
                <div class="cell">
                  <span class="label">
                    {{ "contract.方向" | translate }}</span
                  >
                  <span class="value out">{{
                    list.profitDirect == 1
                      ? "contract.买入open"
                      : "contract.卖出close" | translate
                  }}</span>
                </div>
                <div class="cell">
                  <span class="label">
                    {{ "contract.数量" | translate }}</span
                  >
                  <span class="value"
                    >{{ list.profitAmount ? list.profitAmount : "- -" }}
                    {{ "contract.张" | translate }}</span
                  >
                </div>
                <div class="cell">
                  <span class="label">{{
                    "contract.触发价" | translate
                  }}</span>
                  <span class="value"
                    >{{
                      list.profitTriggerPrice ? list.profitTriggerPrice : "- -"
                    }}
                    USDT</span
                  >
                </div>
                <div class="cell">
                  <span class="label">{{
                    "contract.触发类型" | translate
                  }}</span>
                  <span class="value">{{
                    "contract.最新价格" | translate
                  }}</span>
                </div>
              </div>
            </div>
            <div class="cardBox">
              <p class="tip">{{ $t('contract.如果止损委托完全成交，则取消止盈委托') }}</p>
              <div class="card">
                <div class="title">
                  {{ "contract.止损委托" | translate }}
                </div>
                <div class="cell">
                  <span class="label">
                    {{ "contract.市价止损" | translate }}</span
                  >
                  <span class="value">{{
                    list.lossStatus == 2
                      ? "contract.已生效"
                      : "contract.未生效" | translate
                  }}</span>
                </div>
                <div class="cell">
                  <span class="label">
                    {{ "contract.方向" | translate }}</span
                  >
                  <span class="value out">{{
                    list.lossDirect == 1
                      ? "contract.买入open"
                      : "contract.卖出close" | translate
                  }}</span>
                </div>
                <div class="cell">
                  <span class="label">{{
                    "contract.数量" | translate
                  }}</span>
                  <span class="value"
                    >{{ list.lossAmount ? list.lossAmount : "- -" }}
                    {{ "contract.张" | translate }}</span
                  >
                </div>
                <div class="cell">
                  <span class="label">{{
                    "contract.触发价" | translate
                  }}</span>
                  <span class="value"
                    >{{
                      list.lossTriggerPrice ? list.lossTriggerPrice : "- -"
                    }}
                    USDT</span
                  >
                </div>
                <div class="cell">
                  <span class="label">{{
                    "contract.触发类型" | translate
                  }}</span>
                  <span class="value">{{
                    "contract.最新价格" | translate
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #dia_footer>
        <div class="btn-group"></div>
      </template>
    </common-modal>
  </div>
</template>

<script>
import { profitLossDetial } from "@/api/contractTransaction";
export default {
  name: "contract-toView",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
    markedPrice: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    handleCancel() {
      this.$emit("update:isShow", false);
    },
    getDetail(data) {
      profitLossDetial(data).then((res) => {
        console.log("res", res.data.data);
        this.list = res.data.data;
      });
    },
  },
  watch: {
    data: {
      handler(data) {
        // console.log("data", data);
        let params = {
          orderNo: data.entrustNo,
          entrustType: data.entrustType,
        };
        // console.log("prompt", params);
        this.getDetail(params);
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
  padding: 0 30px;
  .tip {
    font-size: 12px;
    color: var(--main-text-color);
  }
  .baseInfo {
    margin-top: 20px;
    border-radius: 6px 6px 0 0;
    background-color: var(--dialog_card_bg);
    overflow: hidden;
    .orderNo {
      display: flex;
      align-items: center;
      padding-left: 15px;
      margin-bottom: 10px;
      height: 30px;
      background-color: var(--dialog_order_bg);
      font-size: 12px;
      color: var(--main-text-color);
    }
    .cell {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 15px;
      justify-content: space-between;
      color: #96a2b2;
      .value {
        color: var(--main-text-color);

        &.in {
          color: #f75f52;
        }
        &.out {
          color: #90ff00;
        }
      }
    }
  }
  .lines {
    position: relative;
    width: 333px;
    height: 41px;
    margin: 0 auto;
    .line1 {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50%;
      border-left: 1px solid var(--dialog-line-color);
      border-right: 1px solid var(--dialog-line-color);
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 0;
      content: "";
      width: 100%;
      height: 1px;
      background-color: var(--dialog-line-color);
    }
    &::before {
      position: absolute;
      top: 0;
      left: 50%;
      content: "";
      height: 50%;
      width: 1px;
      background-color: var(--dialog-line-color);
    }
  }
  .cardBox {
    width: 260px;
    margin-top: 5px;
    // box-shadow: 0px 0px 8px 0px rgba(237, 241, 255, 0.6);
    .tip {
      font-size: 12px;
      color: var(--main-text-color);
    }
    .card {
      margin-top: 10px;
      background-color: var(--dialog_card_bg);

      .title {
        height: 30px;
        padding: 0 15px;
        background-color: var(--dialog_order_bg);
        border-radius: 6px 6px 0 0;
        color: var(--main-text-color);
      }
      .cell {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 15px;
        justify-content: space-between;
        color: #96a2b2;
        .value {
          color: var(--main-text-color);
          &.in {
            color: #f75f52;
          }
          &.out {
            color: #90ff00;
          }
        }
      }
    }
  }
}
</style>
