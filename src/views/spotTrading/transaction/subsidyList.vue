<template>
  <div class="list">
    <div class="l-title">
      <div>
        <i class="el-icon-back" @click="back"></i>
      </div>
      <div>{{ $t("contract.盈利档位比例") }}</div>
      <div></div>
    </div>
    <!-- <div class="l-select">
      <div class="header">
        <div
          class="header-select"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <div class="select-text">{{ chooseText }}</div>
          <div class="select-icon">
            <i v-if="!isShow" class="el-icon-caret-bottom"></i>
            <i v-else class="el-icon-caret-top"></i>
          </div>
          <subsidy-select
            ref="searchRef"
            :show.sync="isShow"
            :list="symbolList"
            @handleSearch="handleSearch"
            @handleChoose="handleChoose"
          ></subsidy-select>
        </div>
      </div>
    </div> -->
    <div class="l-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="num" :label="$t('contract.档位')" width="50">
        </el-table-column>
        <el-table-column
          prop="poolProfitRatio"
          :label="$t('contract.已实现盈亏率')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.poolProfitRatio | ratio }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" :label="$t('contract.盈利奖励百分比')">
          <template slot-scope="scope">
            <span>{{ scope.row.poolRatioMin | ratio }}</span
            >~<span>{{ scope.row.poolRatioMax | ratio }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty">
            <my-empty></my-empty>
          </div>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import subsidySelect from "@/components/select/index.vue";
import { mapState } from "vuex";
import { $contractList, getSubsidyInfo } from "@/api/contractTransaction";
export default {
  naem: "subsidyList",
  components: {
    subsidySelect,
  },
  data() {
    return {
      isShow: false,
      chooseText: "",
      symbolList: [],
      symbolSearchList: [],
      tableData: [],
    };
  },
  computed: {
    ...mapState({
      // 合约币种
      contractCoin: (state) => state.contract.contractCoin,
    }),
  },
  filters: {
    ratio(num) {
      return num + "%";
    },
  },
  watch: {
    contractCoin: {
      handler() {
        this.chooseText = this.contractCoin?.symbolKey.toUpperCase();
        this.getSymbolList();
        this.getSubsidyInfo(this.contractCoin?.symbol);
      },
      immediate: true,
    },
  },

  methods: {
    back() {
      this.$emit("back");
    },
    mouseenter() {
      this.isShow = true;
      this.handleSearch();
    },
    mouseleave() {
      this.isShow = false;
      this.$refs.searchRef.initVal();
    },
    //搜索
    handleSearch(val) {
      let dataArr = [];
      let searchVal = val && val.toUpperCase().trim();
      if (searchVal) {
        this.symbolSearchList.filter((item) => {
          if (item.symbolKey.indexOf(searchVal) != -1) {
            dataArr.push(item);
          }
        });
      } else {
        dataArr = this.symbolSearchList;
      }
      this.symbolList = dataArr;
    },
    handleChoose(row) {
      this.chooseText = row.symbolKey;
      this.getSubsidyInfo(row.symbolCode);
    },
    getSymbolList() {
      $contractList().then((res) => {
        if (res.status == 200) {
          const { data } = res.data;

          let arr = [];
          data.forEach((item) => {
            if (item.isSubsidy == 1) {
              arr.push({
                symbolKey: item.symbolKey.toUpperCase(),
                symbolCode: item.symbol,
              });
            }
          });
          this.symbolList = arr;
          this.symbolSearchList = this.symbolList;
        }
      });
    },
    //获取奖励信息
    getSubsidyInfo(symbol) {
      getSubsidyInfo({ coinMarket: symbol }).then((res) => {
        this.tableData = res.data?.data?.subsidyPoolInfos;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 20px;
  .l-title {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    .el-icon-back {
      font-size: 28px;
      cursor: pointer;
    }
  }
  .l-select {
    .header {
      width: 100%;
      padding: 20px 0;
      display: flex;
      align-items: center;
      .header-icon {
        .el-icon-arrow-left {
          cursor: pointer;
          font-size: 20px;
        }
      }
      .header-select {
        position: relative;
        display: flex;
        cursor: pointer;
        .select-text {
          font-size: 24px;
        }
        .select-icon {
          display: flex;
          align-items: center;
          margin-left: 10px;
          .el-icon-caret-bottom {
            font-size: 20px;
          }
          .el-icon-caret-top {
            font-size: 20px;
          }
        }
      }
    }
  }
}
//表格边框
::v-deep .el-table td.el-table__cell {
  border-bottom: 1px solid var(--border-color) !important;
}
::v-deep .el-table th.el-table__cell.is-leaf,
.el-table td.el-table__cell {
  border-bottom: none;
}
.el-table::before {
  background: var(--border-color);
}
/* 修改鼠标经过表格的颜色 */
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: var(--deep-bg) !important;
}

::v-deep .el-table .el-table__cell {
  padding: 7px 0;
}
::v-deep .el-table .cell {
  // line-height: 48px;
}
//分页
::v-deep .el-pager li {
  background: var(--dialog-bg) !important;
}
::v-deep .el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .btn-next:disabled {
  background-color: var(--dialog-bg) !important;
}
::v-deep .el-pagination .btn-next {
  background-color: var(--dialog-bg) !important;
}

::v-deep .el-input__inner {
  background-color: var(--dialog-bg) !important;
  border: 1px solid var(--dialog-bg) !important;
}
</style>