<template>
  <div class="capitalTable">
    <!-- <div class="search">
      <div class="search-box">
        <el-input
          placeholder="搜索币种"
          prefix-icon="el-icon-search"
          v-model="searchVal"
        >
        </el-input>
        <el-checkbox v-model="checkVal" style="margin-left: 20px"
          >隐藏0余额</el-checkbox
        >
      </div>
    </div> -->
    <div class="tab-search">
      <div class="search-box">
        <el-input
          :placeholder="$t('property.搜索币种')"
          prefix-icon="el-icon-search"
          v-model="searchVal"
          @input="handleSearch"
        >
        </el-input>
      </div>
      <div class="check-box">
        <Checkbox @change="handleCheck" /><span
          :class="checkVal ? 'text-active' : ''"
          >{{ $t("property.隐藏0余额") }}</span
        >
      </div>
    </div>
    <div class="border"></div>
    <el-table
      style="width: 100%"
      ref="filterTable"
      :data="tableDataList"
      @sort-change="onSortChange"
    >
      <el-table-column
        v-for="(item, index) in columnData"
        :key="index"
        :prop="item.prop"
        :sortable="item.sortable"
        :sort-orders="item.sortorders"
        :label="item.label"
        :min-width="item.width"
      >
        <template slot-scope="scope">
          <!-- 自定义内容 -->
          <span
            v-if="item.ownDefined"
            @click="symbolDetail(scope.row)"
            :class="isSpot ? 'spotDetail' : ''"
          >
            <img class="coinIcon" :src="scope.row.iconUrl" alt="" />
            <span>{{ item.ownDefinedReturn(scope.row) }}</span>
          </span>
          <div v-if="item.amountType">
            <span v-if="isShow">******</span>
            <span v-else>{{ $formatNumber(scope.row.amount) }}</span>
          </div>
          <div v-if="item.availableAmounType">
            <span v-if="isShow">******</span>
            <span v-else>{{ $formatNumber(scope.row.availableAmount) }}</span>
          </div>
          <div v-if="item.frozenAmountType">
            <span v-if="isShow">******</span>
            <span v-else>{{ $formatNumber(scope.row.frozenAmount) }}</span>
          </div>
          <div v-if="item.transferAmountType">
            <span v-if="isShow">******</span>
            <span v-else>{{ $formatNumber(scope.row.transferAmount) }}</span>
          </div>
          <!-- 默认样式 -->
          <span v-if="item.text">{{ scope.row[item.prop] }}</span>
          <!-- 操作 -->
          <span v-if="item.isOperation">
            <span v-for="(operations, index) in item.operation" :key="index">
              <span
                class="btn"
                v-if="operations.isShow(scope.row)"
                @click="operations.buttonClick(scope.row)"
                >{{ operations.label }}</span
              >
            </span>
          </span>
        </template>
      </el-table-column>
      <template slot="empty">
        <div class="empty">
          <img class="empty-img" src="@/assets/images/null-page.png" alt="" />
          <p>{{ $t("property.暂无数据") }}</p>
        </div>
      </template>
    </el-table>
    <CoinDetail ref="coinRef"  :isShow.sync="showCionDetail" />
  </div>
</template>

<script>
import CoinDetail from './coinDetail.vue'
import Checkbox from "@/components/checkbox/checkbox.vue";
export default {
  name: "CapitalTable",
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    columnData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isSpot: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Checkbox,
    CoinDetail
  },
  data() {
    return {
      searchVal: "",
      checkVal: false,
      tableDataList: [],
      listTempData: [],
      isShow: false,
      showCionDetail:false
    };
  },

  mounted() {
    this.tableDataList = this.tableData;
    this.listTempData = this.tableData;
  },
  methods: {
    //币种详情
    symbolDetail(row) {
      if (this.isSpot) {
        this.$store.dispatch("handleAssetsCoinInfo", row);
        this.$refs.coinRef.recordQuery()
        this.$refs.coinRef.quotes()
        this.showCionDetail = true
      }
    },
    // 搜索
    handleSearch(val) {
      let dataArr = [];
      let searchKey = val && val.toLowerCase().trim();
      if (searchKey) {
        this.listTempData.filter((item) => {
          if (item.coinName.toLowerCase().indexOf(searchKey) != -1) {
            dataArr.push(item);
          }
        });
      } else {
        dataArr = this.listTempData;
      }
      this.tableDataList = dataArr;
    },
    handleCheck(val) {
      this.checkVal = val;
      if (val) {
        this.searchVal = "";
        this.tableDataList = this.listTempData.filter(
          (v) => Number(v.availableAmount) !== 0
        );
      } else {
        this.tableDataList = this.listTempData;
      }
    },

    isShowFn() {
      this.isShow = !this.isShow;
    },
    // 排序功能
    onSortChange(column) {
      if (column.prop === "coinName") {
        // 对展示的源数据进行重新排序
        this.tableData.sort(
          this.sortFun(column.prop, column.order === "ascending")
        );
      } else {
        // 对展示的源数据进行重新排序
        this.tableData.sort(
          this.sortFun2(column.prop, column.order === "ascending")
        );
      }
    },
    sortFun(attr, rev) {
      // 第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }
      let that = this;
      return function (a, b) {
        let res = 0;
        for (let i = 0; that.tableData; i++) {
          console.log(a[attr][i]);
          if (!a[attr][i] || !b[attr][i]) {
            res = a[attr].length - b[attr].length;
            break;
          }
          let char1 = a[attr][i];
          let char1Type = that.getChartType(char1);
          let char2 = b[attr][i];
          let char2Type = that.getChartType(char2);
          // 类型相同的逐个比较字符
          if (char1Type[0] === char2Type[0]) {
            // console.log('字符类型相同');
            if (char1 === char2) {
              res = 0;
              // console.log('值全等', res);
              continue;
            } else {
              if (char1Type[0] === "zh") {
                res = char1.localeCompare(char2);
                // console.log('a的字符类型为中文', res);
              } else if (char1Type[0] === "en") {
                res = char1.charCodeAt(0) - char2.charCodeAt(0);
                // console.log('a的字符类型为英文', res);
              } else {
                res = char1 - char2;
                // console.log('a的字符类型为数字', res);
              }
              // console.log('值不相等比较的结果', res);
              break;
            }
          } else {
            // 类型不同的，直接用返回的数字相减
            var num1 = char1Type[1];
            var num2 = char2Type[1];
            res = num1 - num2;
            break;
          }
        }
        return res * rev;
      };
    },
    getChartType(char) {
      // 数字可按照排序的要求进行自定义 ;数字（0->9）->大写字母（A->Z）->小写字母（a->z）->中文拼音（a->z）
      if (/^[u4e00-u9fa5]$/.test(char)) {
        return ["zh", 3];
      }
      if (/^[a-zA-Z]$/.test(char)) {
        return ["en", 2];
      }
      if (/^[0-9]$/.test(char)) {
        return ["number", 1];
      }
      return ["others", 4];
    },
    //其他排序
    sortFun2(attr, rev) {
      //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }
      return function (a, b) {
        a = parseFloat(a[attr]);
        b = parseFloat(b[attr]);
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      };
    },
  },
};
</script>

<style scoped lang="scss">
.spotDetail {
  cursor: pointer;
}
.tab-search {
  margin-top: 30px;
  display: flex;
  .search-box {
    display: flex;
    align-items: center;
    width: 300px;
    margin-right: 20px;
    ::v-deep .el-input__inner {
      height: 50px;
      line-height: 50px;
      background: #f5f7fa;
      border: none;
    }
    ::v-deep .el-input__icon {
      line-height: 50px;
    }
  }
  .check-box {
    display: flex;
    align-items: center;
    padding-right: 10px;
    color: #333;
    font-size: 14px;
    .text-active {
      color: #90ff00;
    }
  }
}
.border {
  margin-top: 30px;
  border-bottom: 1px solid #f5f7fa;
  margin-bottom: 15px;
}
/* 修改鼠标经过表格的颜色 */
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ecf0ff !important;
}

/* hover状态：鼠标悬停和划过时 */
::v-deep .el-button:hover {
  background: $colorB;
  color: #fff;
}
.table {
  .btn {
    display: inline-block;
    color: $colorB;
    cursor: pointer;
    font-size: 16px;
    margin-right: 20px;
  }
  .empty {
    margin-top: 120px;
  }
  .isFavor {
    cursor: pointer;
  }
  .el-coinIcon-star-on {
    font-size: 24px;
    color: #ffd887;
  }
  .el-icon-star-off {
    font-size: 24px;
    color: #e1e1e1;
  }
  .up {
    color: rgba(46, 189, 133, 1);
  }
  .down {
    color: rgba(247, 95, 82, 1);
  }
  .coinIcon {
    display: inline-block;
    width: 30px;
    height: 30px;
    vertical-align: middle;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
}

::v-deep .el-tabs__nav-wrap::after {
  background-color: transparent;
}

//表label颜色
::v-deep .el-table th.el-table__cell > .cell {
  color: #8992a6;
}
//表格边框
::v-deep .el-table td.el-table__cell {
  border-bottom: 1px solid #f4f5f7 !important;
}
::v-deep .el-table th.el-table__cell.is-leaf,
.el-table td.el-table__cell {
  border-bottom: none;
}
.el-table::before {
  background: #f4f5f7;
}
/* 修改鼠标经过表格的颜色 */
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f4f5f7 !important;
}

::v-deep .el-table .el-table__cell {
  padding: 7px 0;
}
::v-deep .el-table .cell {
  line-height: 48px;
}
</style>
