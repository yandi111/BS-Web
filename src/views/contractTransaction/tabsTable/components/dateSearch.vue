<template>
  <div class="dateSearch">
    <div class="typeSelect df aic">
      <div class="item df aic mr20" v-if="isPickCoin">
        <span class="label mr10">{{
          "contract.合约" | translate
        }}</span>
        <mySelect :options="coinData" v-model="coinValue" clearable />
      </div>
      <div class="item df aic">
        <span class="label mr10">{{ "contract.类型" | translate }}</span>
        <mySelect
          :options="paramsTypeList"
          v-model="priceTypeValue"
          :width="width"
          clearable
        />
      </div>
    </div>

    <div class="datePick df aic" v-if="isPickDate">
      <div class="label">{{ "contract.日期" | translate }}</div>
      <el-date-picker
        popper-class="my-dete-picker"
        v-model="dateValue"
        type="daterange"
        range-separator="-"
        :start-placeholder="start_placeholder"
        :end-placeholder="end_placeholder"
        value-format="timestamp"
      >
      </el-date-picker>
    </div>
    <div class="btns" :class="{ dark: getTheme == 'dark' }">
      <div class="btn" @click="search(1)" :class="{ active: currenIndex == 1 }">
        {{ "contract.查询" | translate }}
      </div>
      <div class="btn" @click="reset(2)" :class="{ active: currenIndex == 2 }">
        {{ "contract.重置" | translate }}
      </div>
    </div>
  </div>
</template>

<script>
import mySelect from "@/components/my-select/my-select.vue";
import { mapGetters } from "vuex";
import { symbolListApi } from "@/api/contractTransaction";

export default {
  components: {
    mySelect,
  },
  props: {
    isPickCoin: {
      type: Boolean,
      default: true,
    },
    isPickDate: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 105,
    },
    paramsTypeList: {
      type: Array,
      default: () => {
        return [
          { label: `${this.$t("contract.限价委托")}`, value: 1 },
          { label: `${this.$t("contract.市价委托")}`, value: 2 },
          { label: `${this.$t("contract.市价止盈")}`, value: 3 },
          { label: `${this.$t("contract.市价止损")}`, value: 4 },
          { label: `${this.$t("contract.计划委托")}`, value: 5 },
        ];
      },
    },
  },
  data() {
    return {
      currenIndex: 0,
      priceTypeValue: "",
      coinValue: "",
      coinData: [],
      dateValue: "",
      searchData: {},
      start_placeholder: this.$t("contract.开始日期"),
      end_placeholder: this.$t("contract.结束日期"),
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  watch: {
    paramsTypeList: {
      handler() {
        this.priceTypeValue = "";
      },
      deep: true,
    },
  },
  methods: {
    changeDate(date) {
      this.date = date;
    },
    getsymbolListApi() {
      symbolListApi().then((res) => {
        // console.log("red", res.data.data);
        this.coinData = res.data.data.map((item) => {
          return {
            label: item.symbolCode,
            value: item.symbolKey,
          };
        });
      });
    },
    search(num) {
      this.currenIndex = num;
      let coinMarket = this.coinValue.toLocaleUpperCase().split("");
      coinMarket.splice(coinMarket.length - 4, 0, "/");
      coinMarket = coinMarket.join("");

      // console.log("this.priceTypeValue", this.priceTypeValue);

      this.coinValue
        ? (this.searchData.coinMarket = coinMarket)
        : delete this.searchData.coinMarket;
      this.priceTypeValue
        ? (this.searchData[this.paramsTypeList[0].attribute] =
            this.priceTypeValue)
        : delete this.searchData[this.paramsTypeList[0].attribute];
      this.dateValue
        ? (this.searchData.startTime = this.dateValue[0])
        : delete this.searchData.startTime;
      this.dateValue
        ? (this.searchData.endTime = this.dateValue[1])
        : delete this.searchData.endTime;

      // console.log("thsis.searchData", this.searchData);
      this.$emit("update", this.searchData);
    },
    reset(num) {
      this.currenIndex = num;
      this.coinValue = "";
      this.priceTypeValue = "";
      this.dateValue = "";
      this.searchData = {};
      if (this.searchData) this.$emit("update", this.searchData);
    },
  },
  mounted() {
    this.getsymbolListApi();
  },
};
</script>

<style lang="scss">
.my-dete-picker {
  background-color: var(--main-bg);
  color: var(--main-text-color);
  .el-date-range-picker__header {
    color: var(--main-text-color);
    button {
      color: inherit;
    }
  }
  .el-date-table td {
    &.in-range div {
      background-color: var(--row-hover-bg);
    }
  }
  // .el-date-range-picker__content.is-left{
  //   border-right: 1px solid #cac6c6;
  // }
}
</style>

<style lang="scss" scoped>
.dateSearch {
  display: flex;
  align-items: center;
  font-size: 12px;
  height: 40px;
  padding: 5px 10px;
  font-size: 14px;
  color: var(--main-text-color);
  .typeSelect {
    height: 100%;
    padding-left: 15px;
    padding-right: 20px;
    &:first-child {
      padding-left: 0px;
    }
  }
  .datePick {
    height: 100%;
    width: 375px;
    display: flex;
    align-items: center;
    .label {
      width: 40px;
      margin-right: 10px;
    }
    ::v-deep   .el-range-editor.el-input__inner {
      flex: 1;
      height: 100%;
      padding-right: 0;
      background-color: var(--main-bg);
      border: 1px solid var(--border-color);
      .el-range-input {
        background: var(--main-bg);
        color: var(--main-text-color);
      }
      i {
        position: relative;
        margin-right: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        // &::before {
        //   position: absolute;
        //   top: -4px;
        //   left: 4px;
        // }
      }
      .el-range-separator {
        width: 10%;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .btns {
    display: flex;
    align-items: center;
    &.dark {
      .btn {
        background-color: #1d1d1d;
      }
    }
    .btn {
      padding: 5px 10px;
      background-color: #f8f9fb;
      border-radius: 5px;
      margin-left: 20px;
      color: var(--main-text-color);
      cursor: pointer;
      &:hover {
        color: var(--theme-color);
      }
      &.active {
        background-color: var(--theme-color);
        color: #fff;
        &:hover {
          background-color: var(--theme-color);
        }
      }
    }
  }
}
</style>
