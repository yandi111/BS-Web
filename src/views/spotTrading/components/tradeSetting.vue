<script>
import { mapState } from "vuex";
import mySelect from "@/components/my-select/my-select.vue";

export default {
  name: "tradeSetting",
  components: {
    mySelect,
  },
  props: {
    contractType: {
      type: Boolean,
      default: true,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [
        {
          label: "rules.主题模式",
          theme: true,
          value: false,
        },
        { label: "rules.涨跌幅基准", selet: true },
        // { label: "限价 订单", switch: true, value: false },
        // { label: "市价 订单", switch: true, value: false },
        // { label: "市价止盈止损 订单", switch: true, value: false },
        // { label: "计划委托 订单", switch: true, value: false },
        // { label: "价差保护", switch: true, value: false },
        // { label: "止盈止损触发通知", switch: true, value: false },
        // { label: "资金费用触发通知", switch: true, value: false },
      ],
      radio_select: 0,
      isShows: false,
      positionType: 2,
      positionOptions: [
        { label: "单向持仓", value: 1 },
        { label: "双向持仓", value: 2 },
      ],
      marginType: 1,
      marginOptions: [
        { label: "单币保证金模式", value: 1 },
        { label: "联合保证金模式", value: 2 },
      ],
      amplitude_isShow: false, //是否 展开 涨跌幅
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:isShow", false);
    },
    showAmplitude() {
      // console.log("11", 11);
      // this.amplitude_isShow = true;
    },
  },
  computed: {
    ...mapState(["setting"]),
    positionTips() {
      let o = {
        1: "rules.单向持仓模式下，一个合约只允许持有一个方向的仓位",
        2: "rules.双向持仓模式下，一个合约只允许持有多空两个方向的仓位，并且同一合约下不同方向仓位风险对冲。",
      };
      return o[this.positionType];
    },
    marginTips() {
      let o = {
        1: "rules.仅支持使用合约的保证金资产交易U本位合约。保证金资产相同的全仓仓位间盈亏互相抵消。支持全仓和逐仓。",
        2: "rules.可跨保证金资产交易U本位合约。不同保证金资产全仓仓位间盈亏相互抵消。目前仅支持全仓。",
      };
      return o[this.marginType];
    },
  },
  mounted() {
    this.list[0].value = this.setting.theme == "light" ? false : true;
    //价差保护
    // this.list[6].value =
    //   storage.getLocal("whetherToProtect") == "true" ? true : false;
  },
  watch: {
    isShow: {
      handler(value) {
        this.isShows = value;
        //价差保护
        // this.list[6].value =
        //   storage.getLocal("whetherToProtect") == "true" ? true : false;
        this.list = !this.contractType
          ? this.list.filter((item) => item.theme)
          : this.list;
      },
    },

    setting: {
      handler(oldVal) {
        this.list[0].value = oldVal.theme == "dark" ? true : false;
      },
      deep: true,
    },

    list: {
      handler(oldVal) {
        let theme = oldVal[0].value ? "dark" : "light";
        this.$store.dispatch("handleTheme", theme);
        this.$store.dispatch("handleLocalTheme", theme);

        //价差保护
        // let whetherToProtect = oldVal[6].value ? true : false;
        // storage.setLocal("whetherToProtect", whetherToProtect);
      },
      deep: true,
    },
    isShows(value) {
      if (!value) {
        this.$emit("update:isShow", false);
      }
    },
  },
};
</script>
<template>
  <div class="tradeSetting" v-show="isShow">
    <el-drawer
      :with-header="false"
      :size="400"
      :visible.sync="isShows"
      :modal="false"
    >
      <div class="content" v-if="!amplitude_isShow">
        <div class="header">
          <span>{{ $t("rules.交易设置") }}</span>
          <i class="iconfont icon-close" @click="closeModal"></i>
        </div>
        <div
          class="cell df aic jb"
          v-for="(item, index) in list"
          :key="index"
        >
          <span class="label">{{ item.label | translate }}</span>
          <div
            class="switch"
            :class="{
              day: item.theme && setting.theme === 'light',
              night: item.theme && setting.theme === 'dark',
            }"
          >
            <el-switch
              v-if="item.theme"
              v-model="item.value"
              active-color="#8992a6"
              inactive-color="#e9e9eb"
            >
            </el-switch>
            <el-switch
              v-if="item.switch"
              v-model="item.value"
              active-color="#13ce66"
              inactive-color="#e9e9eb"
            >
            </el-switch>
            <div class="select" v-if="item.selet" @click="showAmplitude">
              <span class="tiem">{{ $t("rules.近24h") }}</span>
              <!-- <i class="iconfont icon-down1"></i> -->
            </div>
          </div>
        </div>
        <div v-show="contractType">
          <div class="selects">
            <div class="top df aic jb">
              <span class="label">{{ $t("rules.仓位模式") }}</span>
              <div class="btn">
                <span>{{ $t("rules.双向持仓") }}</span>
                <!-- <mySelect
                  :width="80"
                  v-model="positionType"
                  :options="positionOptions"
                /> -->
              </div>
            </div>
            <p>{{ positionTips | translate }}</p>
          </div>
          <div class="selects">
            <div class="top df aic jb">
              <span class="label">{{ $t("rules.资产模式") }}</span>
              <div class="btn">
                <!-- <mySelect
                  :width="120"
                  v-model="marginType"
                  :options="marginOptions"
                /> -->
                <span>{{ $t("rules.单币种保证金模式") }}</span>
              </div>
            </div>
            <p>
              {{ marginTips | translate }}
            </p>
          </div>
          <div
            class="cell rule df aic jb"
            @click="() => $router.push('/contractRules/tradingRules')"
          >
            <span>{{ $t("rules.交易规则") }}</span>
            <i class="iconfont icon-right1"></i>
          </div>
        </div>

        <div class="selects" v-show="!contractType">
          <div class="top">
            <span class="label label_color">{{
              $t("rules.颜色偏好设置")
            }}</span>
            <div class="btn">
              <el-radio-group v-model="radio_select" class="radio_select">
                <el-radio :label="0" class="radio_text" text-color="#00082D">
                  <div style="text-align: start">
                    {{ $t("rules.绿涨红跌") }}
                  </div>
                  <img
                    src="@/assets/spotTrading-imgs/greenRed.png"
                    alt=""
                    srcset=""
                  />
                </el-radio>
                <!-- <el-radio :label="1" class="radio_text" text-color="#00082D">
                  <div>红涨绿跌</div>
                  <img
                    src="@/assets/spotTrading-imgs/redGreen.png"
                    alt=""
                    srcset=""
                  />
                </el-radio> -->
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
      <!-- 涨跌幅基准 -->
      <div class="content amplitude" v-else>
        <div class="header">
          <i class="iconfont icon-pre" @click="amplitude_isShow = false"></i>
        </div>
        <div class="tips">
          <div class="title">涨跌幅基准</div>
          <div class="text">
            <div class="txt">
              1.当您切换到新的UTC时区时，杠杆和合约的涨跌幅(%)将根据您所选时区0点的开盘价格为基准来计算。
            </div>
            <div class="txt">
              2.切换到新的UTC时区只会影响涨跌幅(%)的变化。此更改不适用于K线。
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.radio_select {
  display: flex;
  flex-direction: column;
  .radio_text:nth-of-type(1) {
    padding-top: 25px;
    display: flex;
    flex-direction: row;
    margin-right: 0;
    div {
      color: var(--main-text-color);
    }
  }
  .radio_text:nth-of-type(2) {
    padding-top: 25px;
    display: flex;
    flex-direction: row;

    margin-right: 0;
  }

  ::v-deep .el-radio__label {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #00082d;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    img {
      width: 24px;
      height: 24px;
    }
  }
}
.tradeSetting {
  .content {
    padding: 20px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 25px;
      span {
        font-size: 18px;
        color: var(--main-text-color);
      }
      .iconfont {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .cell {
      font-size: 14px;
      color: var(--secondary-text-color);
      height: 50px;
      .day {
        ::v-deep .el-switch__core:after {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "iconfont";
          content: "\e621";
          color: #ffcd73;
        }
      }
      .night {
        ::v-deep .el-switch__core:after {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "iconfont";
          content: "\e60c";
          color: #ffcd73;
        }
      }
      .select {
        display: flex;
        align-items: center;
        .iconfont {
          font-size: 20px;
        }
      }
      &.rule {
        cursor: pointer;
        .iconfont {
          font-size: 20px;
        }
      }
    }
    .selects {
      margin-top: 20px;
      .top {
        color: var(--secondary-text-color);
        .label {
          font-size: 14px;
        }
        .label_color {
          color: #96a2b2;
        }
        .btn {
          cursor: pointer;
          ::v-deep .select {
            border: none;
          }
          // span {
          //   font-size: 12px;
          // }
          // i {
          //   color: #8992a6;
          // }
        }
      }
      p {
        margin-top: 10px;
        font-size: 12px;
        line-height: 24px;
        color: #96a2b2;
        margin-bottom: 40px;
      }
    }
    &.amplitude {
      .icon-pre {
        font-size: 26px;
      }
      .tips {
        .title {
          font-size: 18px;
        }
      }
    }
  }
  ::v-deep .el-drawer__open .el-drawer.rtl {
    background-color: var(--main-bg);
  }
}
</style>
