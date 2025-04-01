<template>
  <div class="container_all" :class="{ dark: getTheme == 'dark' }">
    <div class="container pb22">
      <div class="top_container">
        <img
          src="@/assets/contract-imgs/backToDark.png"
          alt=""
          v-if="getTheme == 'dark'"
          @click="$router.go(-1)"
        />
        <img src="@/assets/contract-imgs/backTo.png" alt="" v-else @click="$router.go(-1)" />
        <span>{{ $t(t + "历史口令") }}</span>
      </div>
      <div class="container_search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item :label="$t(t + '口令状态')" class="status">
            <el-select
              v-model="searchForm.tokenStatus"
              :placeholder="$t(t + '状态')"
              class="width100"
              @visible-change="popperCss1 = !popperCss1"
            >
              <el-option
                v-for="item in statusOption"
                :key="item.value"
                :label="$t(t + item.label)"
                :value="item.value"
              />
              <i
                slot="prefix"
                :class="[
                  'custom-icon',
                  popperCss1 ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
                ]"
              ></i>
            </el-select>
          </el-form-item>

          <el-form-item class="ml20 mr590">
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t(t + '开始日期')"
              :end-placeholder="$t(t + '结束日期')"
              align="left"
              class="width450"
              popper-class="date_style"
            />
          </el-form-item>
          <el-form-item class="from-btn ml30">
            <el-button size="small" class="ml20 reset" @click="reset">
              {{ $t(t + "重置") }}
            </el-button>
            <el-button type="text" class="config" size="small" @click="search">
              {{ $t(t + "搜索") }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-infinite-scroll="getList"
        :infinite-scroll-disabled="!isLoad"
        :scroll-disabled="loading"
      >
        <div
          class="container_body mt30"
          v-for="item in passData"
          :key="item.key"
        >
          <div class="body_password mb20">
            <span class="mr5">{{ item.tradeToken }}</span>
            <i
              class="icon-copy iconfont f12 pointer ml10 mr25"
              v-if="item.tokenStatus == 1"
              @click="copyText(item.tradeToken)"
            ></i>
            <!-- <img src="@/assets/contract-imgs/copy.png" alt="" @click="copyText(item.pass)"> -->
            <span v-else class="invalid">{{ $t(t + "已失效") }}</span>
            <span>{{ item.createTime }}</span>
          </div>
          <div class="body_info">
            <el-descriptions direction="vertical" :column="9" border>
              <el-descriptions-item
                :label="$t(t + col.label)"
                v-for="col in colums"
                :key="col.id"
                labelClassName="table_label"
                contentClassName="table_content"
                :labelStyle="{ width: col.width + 'px' }"
                :contentStyle="{ width: col.width + 'px' }"
              >
                {{
                  col.default
                    ? $t(t + col.options[col.default])
                    : col.options
                    ? $t(t + col.options[item[col.prop]])
                    : item[col.prop]
                }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { $getHistoryList } from "@/api/contractTransaction";
export default {
  name: "PassHistory",
  computed: {
    ...mapGetters(["getTheme"]),
  },
  data() {
    return {
      t: "contractPass.",
      popperCss1: false,
      searchForm: {
        tokenStatus: "",
        pageSize: 3,
        PageNum: 1,
      },
      dateRange: [],
      statusOption: [
        { value: "", label: "全部" },
        { value: 1, label: "生效中" },
        { value: 2, label: "已失效" },
      ],
      passData: [],
      colums: [
        {
          prop: "tokenStatus",
          label: "口令状态",
          width: 170,
          options: { "": "全部", 1: "生效中", 2: "已失效" },
        },
        {
          prop: "tradeType",
          label: "交易类型",
          options: { 1: "U本位合约", 2: "币本位合约", 3: "现货" },
          width: 170,
          default: 1,
        },
        { prop: "coinMarket", label: "交易对", width: 200 },
        {
          prop: "positionType",
          label: "保证金类型",
          options: { 1: "逐仓", 0: "全仓" },
          width: 170,
        },
        { prop: "leverTimes", label: "杠杆", width: 160 },
        {
          prop: "type",
          label: "方向",
          options: { 1: "买入", 2: "卖出" },
          width: 170,
        },
        {
          prop: "priceType",
          label: "委托类型",
          options: {
            1: "限价委托",
            2: "市价委托",
            5: "计划限价",
            7: "计划市价",
          },
          width: 170,
        },
        { prop: "triggerPrice", label: "触发价", width: 160 },
        { prop: "entrustPrice", label: "委托价格", width: 120 },
        { prop: "amountPrencent", label: "委托数量", width: 170 },
        { prop: "tradeNumber", label: "下单人数", width: 170 },
        { prop: "failureTime", label: "失效时间", width: 200 },
      ],
      loading: false,
      isLoad: true,
    };
  },
  created() {},
  mounted() {
    this.changeTdTh();
  },
  methods: {
    getList() {
      if (this.loading || !this.isLoad) return;
      this.loading = true;
      $getHistoryList(this.searchForm).then((res) => {
        this.passData = res.data.data.records;
        this.searchForm.pageSize = this.searchForm.pageSize + 3;
        this.isLoad =
          this.passData.length == res.data.data.total ? false : true;
        this.loading = false;
      });
    },
    changeTdTh() {
      let arr = document.querySelectorAll("[colspan='7']");
      console.log(arr,"arrarrarrarrarrarrarrarrarrarr-----");
      if (arr) {
        arr.forEach((item) => {
        // item.setAttribute("colspan", "1");
        console.log(item);
      })
        
      }
    },
    reset() {
      this.isLoad = true;
      this.searchForm.tokenStatus = "";
      this.searchForm.pageSize = 3;
      this.dateRange = [];
      this.getList();
    },
    search() {
      this.isLoad = true;
      this.searchForm.pageSize = 3;
      this.getList();
    },
    // 复制文本
    copyText(fields) {
      let that = this;
      this.$copyText(fields).then(
        function (e) {
          console.log(e);
          
          that.$message.success(that.$t(that.t + "复制成功"));
        },
        function (e) {
          console.log(e);
          that.$message.success(that.$t(that.t + "复制失败"));
        }
      );
    },
  },
  watch: {
    dateRange: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.searchForm.startTime = new Date(newVal[0]).getTime();
          this.searchForm.endTime = new Date(newVal[1]).getTime();
          this.searchForm.timeType = 1;
        } else {
          this.searchForm.timeType = undefined;
          this.searchForm.startTime = this.searchForm.endTime = undefined;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-icon-time:before {
  content: "\e634";
  font-family: "iconfont";
  font-size: 14px;
}
.el-form {
  position: relative;
}
.icon-copy {
  color: #90ff00;
}
.container_all {
  overflow: hidden;
  background: linear-gradient(
    180deg,
    #edfff8 0%,
    #ffffff 100%,
    #ffffff 100%,
    #ffffff 100%
  );
  width: 100%;
  &.dark {
    background: #121212;
  }
  .container {
    width: 1500px;
    margin: 0 auto;

    .top_container {
      margin-top: 50px;
      position: relative;
      img {
        position: absolute;
        width: 24px;
        height: 24px;
        top: 7px;
      }
      span {
        margin-left: 39px;
        font-size: 26px;
        font-weight: 500;
        color: var(--main-text-color);
        line-height: 37px;
      }
    }
    .container_search {
      margin-top: 40px;
    }
  }
}
::v-deep .el-input__icon {
  margin-left: 10px !important;
}
::v-deep .el-select {
  .el-input__inner {
    border: none;
  }
}
::v-deep .status {
  min-width: 220px;
  .el-form-item__content {
    margin-left: 40px;
  }
}
::v-deep .el-date-editor {
  border: none;
}
::v-deep .el-form-item {
  background: var(--pass-input-bg);
  font-size: 14px !important;
  .el-form-item__label {
    margin-left: 10px;
    color: #8992a6;
  }
  .el-input {
    &__inner {
      color: var(--main-text-color);
      text-align: center;
      font-size: 14px;
      padding-left: 0;
      background: transparent;
    }
    &__suffix {
      display: none;
    }
    &__prefix {
      left: auto;
      right: 10px;
      font-size: 20px;
      color: #8992a6;
      line-height: 35px;
    }
  }
  .el-range-input {
    background: transparent;
    color: var(--main-text-color);
  }
  .custom-icon {
    margin-left: 5px;
    font-size: 16px;
    color: #8992a6;
  }
}
.from-btn {
  position: absolute;
  right: 0;
  background: none !important;
  .el-button {
    width: 70px;
    height: 34px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 6px;
  }

  .config {
    background-color: #90ff00;
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }
}
.container_body {
  .body_password {
    font-size: 14px;
    font-weight: 500;
    color: var(--main-text-color);
    img {
      vertical-align: bottom;
      margin-right: 20px;
    }
  }
}
::v-deep .el-descriptions-item__cell {
  border: none !important;
}
::v-deep .el-descriptions__body {
  background-color: transparent;
}
::v-deep .body_info:hover td {
  background-color: var(--pass-tablecontent-bg) !important;
}
.reset {
  border: none !important;
  background: var(--pass-reset-bt) !important;
  color: var(--main-text-color);
  padding: 6px 18px !important;
}
.invalid {
  margin-left: 5px;
  margin-right: 20px;
  padding: 2px 6px;
  background: var(--pass-invalid-bg);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #90ff00;
  line-height: 17px;
}
::v-deep .table_label {
  background: var(--pass-tablelabel-bg);
  color: var(--pass-tablelabel-col);
}
::v-deep .table_content {
  color: var(--main-text-color);
}
::v-deep .el-select-dropdown {
  background: var(--main-bg) !important;
}
</style>
<style lang="scss">
.date_style {
  background-color: var(--main-bg);
  color: var(--main-text-color);
  border: 1px solid var(--pass-datepick-gapline-color);
  .el-date-range-picker__time-header {
    border-bottom: 1px solid var(--pass-datepick-gapline-color);
    .el-input--small .el-input__inner {
      background-color: inherit;
      border: 1px solid var(--pass-datepick-gapline-color);
      color: var(--main-text-color);
    }
    .el-time-panel {
      background-color: var(--main-bg);
      border: 1px solid var(--pass-datepick-gapline-color);
      .el-time-panel__content {
        .el-time-spinner {
          background-color: var(--main-bg);
          // background-color: red;
        }
        .el-time-spinner__item {
          color: var(--main-text-color);
          &:hover {
            background-color: var(--select-hover);
          }
          &.active {
            color: var(--theme-color);
          }
        }
      }
      .el-time-panel__footer {
        border-top: 1px solid var(--pass-datepick-gapline-color);
        .el-time-panel__btn {
          color: var(--main-text-color);
          &.confirm {
            color: var(--theme-color);
          }
        }
      }
    }
  }
  .el-date-range-picker__header {
    color: var(--main-text-color);
    button {
      color: inherit;
    }
    span {
      color: inherit;
    }
  }
  .el-date-table th {
    border-bottom: 1px solid var(--pass-datepick-gapline-color);
  }
  .el-picker-panel__footer {
    border-top: 1px solid var(--pass-datepick-gapline-color);
    background-color: inherit;
    .is-plain {
      color: var(--main-text-color);
      border: 1px solid var(--pass-datepick-gapline-color);
      background-color: inherit;
    }
  }
  .el-date-table td.in-range div:hover {
    background-color: var(--pass-tablecontent-bg) !important;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: var(--pass-tablelabel-bg) !important;
  }
  .el-date-table td.in-range div {
    background-color: var(--pass-tablelabel-bg) !important;
  }
  .el-date-range-picker__content.is-left {
    border-right: 1px solid var(--pass-datepick-gapline-color);
  }
  .popper__arrow {
    display: none;
  }
}
</style>


