<!-- 调整保证金 -->
<template>
  <div class="marginedit">
    <my-modal
      :is-show.sync="isShow"
      useTheme
      title="contract.调整保证金"
      @close="handleCancel"
      @submit="toSubmit"
    >
      <template slot="content">
        <div class="content">
          <div class="text df aic jb">
            <span>{{ "contract.总额" | translate }} (USDT)</span>
            <span class="label"
              >{{
                typeValue == 1
                  ? "contract.最大可增加"
                  : "contract.最大可减少" | translate
              }}
              {{ max }} USDT</span
            >
          </div>
          <div class="inputBox" :class="{ dark: getTheme === 'dark' }">
            <mySelect :options="options" v-model="typeValue" :width="80" />
            <input type="text" v-model="value" placeholder="0.00" />
            <span
              class="pointer"
              @click="
                () => {
                  value = max;
                }
              "
              >{{ "contract.最大" | translate }}</span
            >
          </div>
          <div class="pirceInfo">
            <p>
              <span class="label"
                >{{ "contract.当前仓位保证金" | translate }}
                {{ data.coinsName?.toUpperCase() }}
                {{ "lang_795" | translate }}</span
              >
              <span class="value">{{ data.positionDeposit }}</span>
            </p>
            <p>
              <span class="label">{{
                typeValue == 1
                  ? "contract.最大可增加"
                  : "contract.最大可减少" | translate
              }}</span>
              <span class="value">{{ max }} USDT</span>
            </p>
            <p>
              <span class="label">{{
                "contract.调整后参考强平价" | translate
              }}</span>
              <span class="value">{{ expectStrongPrice }} USDT</span>
            </p>
          </div>
        </div>
      </template>
    </my-modal>
  </div>
</template>

<script>
import {
  $getSymbolInfo,
  $availableBalance,
  $adjustMargin,
} from "@/api/contractTransaction";

import { mapGetters } from "vuex";
import mySelect from "@/components/my-select/my-select.vue";
import myModal from "@/components/my-modal";

export default {
  name: "contract-marginedit",
  components: {
    mySelect,
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
      typeValue: 1,
      options: [
        { label: `${this.$t("contract.添加")}`, value: 1 },
        { label: `${this.$t("contract.减少")}`, value: 2 },
      ],
      value: null, //调整值
      faceValue: 0.01,
      openTakerFee: 0.0005, //手续费率
      positionAmount: 10, //持仓量
      times: 1, //杠杆倍数
      contractAvailableAmount: null, //合约可用余额
    };
  },

  methods: {
    //获取面值
    getSymbolInfo() {
      let data = {
        symbolCode: this.data.coinMarket,
        marketType: "USDT_M_FUTURE",
      };
      $getSymbolInfo(data).then((res) => {
        // console.log("res", res.data.data);
        this.faceValue = res.data.data.faceValue;
        this.openTakerFee = res.data.data.openTakerFee;
      });
    },

    //可用余额
    availableBalance(data) {
      $availableBalance(data).then((res) => {
        // console.log("res", res.data.data);
        this.contractAvailableAmount = res.data.data.contractAvailableAmount;
      });
    },

    handleCancel() {
      this.value = null;
      this.$emit("update:isShow", false);
    },
    toSubmit() {
      let reg = /^[0-9]+(\.[0-9]{1,})?$/;
      if (this.value) {
        if (!reg.test(this.value)) {
          this.$message({
            message: this.$t("contract.格式错误"),
            type: "error",
          });
          return;
        }
      } else {
        this.$message({
          message: this.$t("contract.数量不能为零"),
          type: "error",
        });
        return;
      }

      let data = {
        positionId: this.data.id + "",
        margin: this.value,
        operationType: this.typeValue,
      };
      console.log("data", data);

      $adjustMargin(data).then((res) => {
        console.log("res", res.data.success);
        if (res.data.success) {
          this.handleCancel();
          this.$showMsg(this.$t("contract.调整保证金成功"), () => {
            this.$emit("adjustLever-success", res.data.success);
          });
        }
      });
    },
  },

  computed: {
    ...mapGetters(["getTheme"]),
    //最大可增加
    max() {
      if (this.typeValue == 1) {
        return this.contractAvailableAmount;
      } else {
        //占用保证金 = 面值* 张数 *标记价/杠杆
        let occupy =
          (this.data.faceValue *
            this.data.positionAmount *
            this.data.markedPrice) /
          this.data.leverTimes;
        // 最大可减少 = 仓位保证金 - 占用保证金 + 收益(未实现盈亏)
        let res =
          parseFloat(this.data.positionDeposit) -
          occupy * 1 +
          parseFloat(this.data.unrealizedProfitLoss);
        return res < 0 ? 0 : res;
      }
    },
    expectStrongPrice() {
      let difference = this.data.positionDirection == 1 ? -1 : 1;
      let price = 0;
      if (this.value) {
        price = this.value * 1 + parseFloat(this.data.positionDeposit);
      } else {
        price = parseFloat(this.data.positionDeposit);
      }
      // console.log("prompt", price);
      return (
        (price +
          difference *
            this.faceValue *
            this.data.positionAmount *
            this.data.positionAveragePrice) /
        (this.faceValue *
          this.data.positionAmount *
          (this.data.maintenanceMarginRatio * 1 +
            this.openTakerFee +
            difference))
      );
    },
  },
  watch: {
    data: {
      handler(oldVal) {
        console.log("oldVal", oldVal);
        this.availableBalance({
          coinId: oldVal.coinId,
          coinName: oldVal.coinMarket,
        });
        this.getSymbolInfo();
      },
    },

    //输入框
    value(val) {
      if (val) {
        this.value = val.toString().replace(/[^\d.]/g, ""); //筛选 数字以外的替换为 ''
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
  .text {
    font-weight: 700;
    span {
      font-size: 16px;
      color: #8992a6;
    }
    .label {
      color: var(--main-text-color);
    }
  }
  ::v-deep .selectBox {
    .select {
      border: none !important;
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
  .inputBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding-right: 10px;
    margin: 20px 0px 30px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    .select {
      position: relative;
      width: 85px;

      ::v-deep .el-select {
        color: red;
      }
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 40%;
        background-color: #e4e4e4;
      }
      &.dark::after {
        background-color: var(--theme-color);
      }
    }
    ::v-deep .el-input__inner {
      border: none;
      font-weight: 700;
      height: 43px;
      background-color: var(--dialog-bg);
      color: var(--main-text-color) !important;
    }
    input {
      flex: 1;
      margin-right: 20px;
      height: 100%;
      padding: 0 5px;
      border: none;
      outline: none;
      font-size: 16px;
      color: #8992a6;
      background-color: var(--dialog-bg);
    }
    span {
      color: var(--theme-color);
    }
  }
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
      .value {
        color: var(--main-text-color);
        font-weight: 700;
      }
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
    border-radius: 6px;
    background-color: var(--theme-color);
    font-size: 18px;
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
