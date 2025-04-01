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
          <span class="text">{{$t('property.止盈止损')}}</span>
          <i class="iconfont icon-close" @click="handleCancel"></i>
        </div>
      </template>
      <template #dia_content>
        <div class="content">
          <p class="tip">
            {{$t('property.如果此委托单部分或完全成交，则提交止盈委托和止损委托。')}}
          </p>
          <div class="baseInfo">
            <div class="orderNo">
              <span class="orderLabel mr10">{{$t('property.委托单号')}}:</span>
              <span class="orderNum">{{ data.entrustNo }}</span>
            </div>
            <div class="cell">
              <span class="label">{{$t('property.限价委托')}}</span>
              <span class="value">{{
                data.orderStatus === 1 ? $t('property.未生效') : $t('property.已生效') 
              }}</span>
            </div>
            <div class="cell">
              <span class="label">{{$t('property.方向')}}</span>
              <span class="value" :class="data.direct === 1 ? 'in' : 'out'">{{
                data.direct === 1 ? $t('property.买入') : $t('property.卖出')
              }}</span>
            </div>
            <div class="cell">
              <span class="label">{{$t('property.数量')}}</span>
              <span class="value" v-if="data.orderAmount"
                >{{ data.orderAmount }} {{$t('property.张')}}</span
              >
              <span class="value" v-else>-- {{$t('property.张')}}</span>
            </div>
            <div class="cell">
              <span class="label">{{$t('property.触发价')}}</span>
              <span class="value">{{ data.triggerPrice }} USDT</span>
            </div>
            <div class="cell">
              <span class="label">{{$t('property.委托价')}}</span>
              <span class="value">{{ data.orderPrice?data.orderPrice: $t('property.最优市价') }}</span>
            </div>
          </div>
          <div class="lines">
            <div class="line1"></div>
          </div>
          <div class="df aic jb">
            <div class="cardBox">
              <p class="tip">{{$t('property.如果止盈委托完全成交，则取消止损委托')}}</p>
              <div class="card">
                <div class="title">{{$t('property.止盈委托')}}</div>
                <div class="cell">
                  <span class="label">{{$t('property.市价止盈')}}</span>
                  <span class="value">{{
                    data.profitStatus === 1 ? $t('property.未生效') : $t('property.已生效')
                  }}</span>
                </div>
                <div class="cell">
                  <span class="label">{{$t('property.方向')}}</span>
                  <span
                    class="value"
                    :class="data.profitDirect === 1 ? 'in' : 'out'"
                    >{{ data.profitDirect === 1 ? $t('property.买入') : $t('property.卖出') }}</span
                  >
                </div>
                <div class="cell">
                  <span class="label">{{$t('property.数量')}}</span>
                  <span class="value" v-if="data.profitAmount"
                    >{{ data.profitAmount }} {{$t('property.张')}}</span
                  >
                  <span class="value" v-else>-- {{$t('property.张')}}</span>
                </div>
                <div class="cell">
                  <span class="label">{{$t('property.触发价')}}</span>
                  <span class="value" v-if="data.profitTriggerPrice">{{ data.profitTriggerPrice }} USDT</span>
                  <span class="value" v-else>-- USDT</span>
                </div>
                <div class="cell">
                  <span class="label">{{$t('property.触发类型')}}</span>
                  <span class="value">{{$t('property.最新价格')}}</span>
                </div>
              </div>
            </div>
            <div class="cardBox">
              <p class="tip">{{$t('property.如果止损委托完全成交，则取消止盈委托')}}</p>
              <div class="card">
                <div class="title">{{$t('property.止损委托')}}</div>
                <div class="cell">
                  <span class="label">{{$t('property.市价止损')}}</span>
                  <span class="value">{{
                    data.lossStatus === 1 ? $t('property.未生效') : $t('property.已生效')
                  }}</span>
                </div>
                <div class="cell">
                  <span class="label">{{$t('property.方向')}}</span>
                  <span
                    class="value"
                    :class="data.lossDirect === 1 ? 'in' : 'out'"
                    >{{ data.lossDirect === 1 ? $t('property.买入') : $t('property.卖出') }}</span
                  >
                </div>
                <div class="cell">
                  <span class="label">{{$t('property.数量')}}</span>
                  <span class="value" v-if="data.lossAmount"
                    >{{ data.lossAmount }} {{$t('property.张')}}</span
                  >
                  <span class="value" v-else>-- {{$t('property.张')}}</span>
                </div>
                <div class="cell">
                  <span class="label">{{$t('property.触发价')}}</span>
                  <span class="value" v-if="data.lossTriggerPrice"> {{ data.lossTriggerPrice }} USDT</span>
                  <span class="value" v-else>-- USDT</span>
                </div>
                <div class="cell">
                  <span class="label">{{$t('property.触发类型')}}</span>
                  <span class="value">{{$t('property.最新价格')}}</span>
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
export default {
  name: "ContractDialog",
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
  methods: {
    handleCancel() {
      this.$emit("update:isShow", false);
    },
  },
  watch: {
    data: {
      handler(data) {
        console.log("data", data);
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
    color: #333333;
  }
  .icon-close {
    font-size: 22px;
    color: #8992a6;
    cursor: pointer;
  }
}
.content {
  padding: 0 20px;
  .tip {
    font-size: 12px;
    color: #333333;
  }
  .baseInfo {
    margin-top: 20px;
    .orderNo {
      display: flex;
      align-items: center;
      padding-left: 15px;
      margin-bottom: 10px;
      height: 30px;
      border-radius: 6px 6px 0 0;
      background-color: #f1f3fe;
      font-size: 12px;
      color: #90ff00;
    }
    .cell {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 15px;
      justify-content: space-between;
      color: #96a2b2;
      .value {
        color: #333333;
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
    // background-color: pink;
    margin: 0 auto;
    .line1 {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50%;
      border-left: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 0;
      content: "";
      width: 100%;
      height: 1px;
      background-color: #f0f0f0;
    }
    &::before {
      position: absolute;
      top: 0;
      left: 50%;
      content: "";
      height: 50%;
      width: 1px;
      background-color: #f0f0f0;
    }
  }
  .cardBox {
    width: 260px;
    margin-top: 5px;
    box-shadow: 0px 0px 8px 0px rgba(237, 241, 255, 0.6);
    .tip {
      font-size: 12px;
      color: #333333;
    }
    .card {
      margin-top: 10px;
      .title {
        height: 30px;
        padding: 0 15px;
        background-color: #f1f3fe;
        border-radius: 6px 6px 0 0;
        color: #90ff00;
      }
      .cell {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 15px;
        justify-content: space-between;
        color: #96a2b2;
        .value {
          color: #333333;
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
