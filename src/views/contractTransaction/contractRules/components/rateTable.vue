<template>
  <div class="table">
    <el-table
      style="width: 100%"
      :header-cell-style="{
        color: '#96a2b2',
        backgroundColor: getTheme == 'dark' ? '#242424' : '#F4F5F7',
      }"
      :data="tableData"
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
          <div v-if="item.isTime">
            <span>{{ parseTime(scope.row.timeTsLong) }}</span>
          </div>
          <!-- 资金费率 -->
           <div v-if="item.estimateFundingRate">
            <span>{{ scope.row.estimateFundingRate }}%</span>
          </div>
          <div v-if="item.curFundingRate">
            <span>{{ scope.row.curFundingRate }}%</span>
          </div>
         
           <!-- 资金费率对比 -->
           <div v-if="item.curFundingRateC">
            <span>{{ scope.row.curFundingRate }}%</span>
          </div>
          <div v-if="item.estimateFundingRateC">
            <span>{{ scope.row.estimateFundingRate }}%</span>
          </div>
          <div v-if="item.countdownType">
            <span v-show="scope.row.dayTime">{{ scope.row.dayTime }}</span>
          </div>
          <!-- 默认样式 -->
          <span v-if="item.text">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <template slot="empty">
        <div class="empty">
          <img class="empty-img" src="@/assets/images/null-page.png" alt="" />
          <p>{{ $t('rules.暂无数据') }}</p>
        </div>
      </template>
    </el-table>
    <!--分页 -->
    <div class="block" v-if="total > 0">
      <el-pagination
        background
        @current-change="onCurrentChange"
        :current-page.sync="page"
        :page-size="10"
        layout="->, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RateTable",
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columnData: {
      type: Array,
      default: () => [],
    },
    paginationShow: {
      type: Boolean,
      default: false,
    },
    pageNum: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  computed: {
    page: {
      get() {
        return this.pageNum;
      },
      set(val) {
        this.$emit("update:pageNum", val);
      },
    },
    limit: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("update:pageSize", val);
      },
    },
    ...mapGetters(["getTheme"]),
  },
  methods: {
    // 切换当前页
    onCurrentChange(val) {
      this.$emit("current-change", { page: val, limit: this.limit });
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
          this.sortFun2(column.prop, column.order === "descending")
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

<style lang="scss" scoped>
.table {
  width: 100%;
  .block {
    padding: 30px 30px 20px 0;
  }
}
.empty{
  margin-top: 40px;
  .empty-img{
    width: 100px;
  }
}
//表格处理
::v-deep .el-table {
  background-color: var(--main-bg);
  .el-table__header,
  .el-table__body,
  .el-table__footer {
    background: var(--main-bg) !important;
  }
  thead {
    tr {
      th {
        background-color: var(--main-bg);
      }
    }
  }
  tbody {
    tr {
      // background-color: var(--main-bg);
    }
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
  line-height: 48px;
}
//分页
::v-deep .el-pager li {
  background: var(--dialog-bg) !important;
}
::v-deep .el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .btn-next:disabled {
  background-color: var(--dialog-bg) !important;
}
::v-deep .el-pagination .btn-next  {
   background-color: var(--dialog-bg) !important;
}

::v-deep .el-input__inner {
  background-color: var(--dialog-bg) !important;
  border: 1px solid var(--dialog-bg) !important;
}
</style>
