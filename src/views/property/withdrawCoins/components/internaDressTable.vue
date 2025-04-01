<template>
  <!-- 内部提币地址表格 -->
  <div class="propertyTable">
    <el-table
      class="customer-no-border-table"
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in columnData"
        :key="index"
        :prop="item.prop"
        :sortable="item.sortable"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <!-- 自定义内容 -->
          <span v-if="item.ownDefined">
            <i class="el-icon-s-help"></i>
            <span>{{ item.ownDefinedReturn(scope.row) }}</span>
          </span>
          <span v-if="item.typeOwnDefined">
            <span v-if="scope.row.type === 1">地址</span>
            <span v-if="scope.row.type === 2">手机</span>
            <span v-if="scope.row.type === 3">邮箱</span>
            <span v-if="scope.row.type === 4">uid</span>
          </span>
          <div v-if="item.isTimeType">
            <span>{{ $formatTime(scope.row.confirmTimeTsLong) }}</span>
          </div>
          <div v-if="item.isAccountType">
            <span v-if="scope.row.accountType === 1">现货账户</span>
            <span v-if="scope.row.accountType === 2">资金账户</span>
          </div>
          <div v-if="item.isType">
            <span v-if="scope.row.type === 1">充值</span>
            <span v-if="scope.row.type === 2">提币</span>
          </div>
          <div v-if="item.isStatus">
            <span v-if="scope.row.status === 0">已完成</span>
            <span v-if="scope.row.status === 10">审核中</span>
            <span v-if="scope.row.status === 20">审核失败</span>
            <span v-if="scope.row.status === 30">待打包</span>
            <span v-if="scope.row.status === 40">确认中</span>
            <span v-if="scope.row.status === 50">已确认</span>
            <span v-if="scope.row.status === 60">确认失败，待重试</span>
            <span v-if="scope.row.status === 70">充值未上账</span>
            <span v-if="scope.row.status === 80">充值已上账</span>
          </div>
          <!-- 默认样式 -->
          <span v-if="item.text">{{ scope.row[item.prop] }}</span>
          <!-- 操作 -->
          <span v-if="item.isOperation">
            <span v-for="(operations, index) in item.operation" :key="index">
              <span
                :class="operations.type === 'button' ? 'button' : 'text'"
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
          <p>暂无数据</p>
        </div>
      </template>
    </el-table>
    <div class="block" v-if="paginationShow">
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
export default {
  name: "InternaDressTable",
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
  },
  mounted() {},
  methods: {
    // 排序
    sortChange(column) {
      switch (column.prop) {
        case "symbol":
          if (column.order == "ascending") {
            // 向上排序
          } else if (column.order == "descending") {
            // 向下排序
          }
          break;
        case "price":
          break;
        case "updown":
          break;
        case "high":
          break;
        case "low":
          break;
        case "volume":
          break;
        default:
      }
    },
    sortDevName(str1, str2) {
      let res = 0;
      for (let i = 0; ; i++) {
        if (!str1[i] || !str2[i]) {
          res = str1.length - str2.length;
          break;
        }
        const char1 = str1[i];
        const char1Type = this.getChartType(char1);
        const char2 = str2[i];
        const char2Type = this.getChartType(char2);
        // 类型相同的逐个比较字符
        if (char1Type[0] === char2Type[0]) {
          if (char1 === char2) {
            continue;
          } else {
            if (char1Type[0] === "zh") {
              res = char1.localeCompare(char2);
            } else if (char1Type[0] === "en") {
              res = char1.charCodeAt(0) - char2.charCodeAt(0);
            } else {
              res = char1 - char2;
            }
            break;
          }
        } else {
          // 类型不同的，直接用返回的数字相减
          res = char1Type[1] - char2Type[1];
          break;
        }
      }
      return res;
    },
    getChartType(char) {
      // 数字可按照排序的要求进行自定义，我这边产品的要求是
      // 数字（0->9）->大写字母（A->Z）->小写字母（a->z）->中文拼音（a->z）
      if (/^[\u4e00-\u9fa5]$/.test(char)) {
        return ["zh", 300];
      }
      if (/^[a-zA-Z]$/.test(char)) {
        return ["en", 200];
      }
      if (/^[0-9]$/.test(char)) {
        return ["number", 100];
      }
      return ["others", 999];
    },
    // 切换当前页
    onCurrentChange(val) {
      this.$emit("current-change", { page: val, limit: this.limit });
    },
  },
};
</script>

<style scoped lang="scss">
/* 修改鼠标经过表格的颜色 */
::v-deep  .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ecf0ff !important;
}

/* hover状态：鼠标悬停和划过时 */
::v-deep  .el-button:hover {
  background: #90ff00;
  color: #fff;
}
.propertyTable {
  .button {
    display: inline-block;
    width: 80px;
    height: 40px;
    border-radius: 6px;
    line-height: 40px;
    border: 1px solid #90ff00;
    text-align: center;
    color: #90ff00;
    cursor: pointer;
  }
  .text {
    color: #90ff00;
    cursor: pointer;
  }
  .empty {
    margin-top: 120px;
  }
  .isFavor {
    cursor: pointer;
  }
  .el-icon-star-on {
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
  .icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: middle;
    border-radius: 50%;
    object-fit: cover;
  }
  .block {
    padding: 30px 30px 20px 0;
  }
}
//去掉表格边框
::v-deep   .el-table__row > td {
  border: none;
}
/* 清除底部横线 */
.el-table::before {
  height: 0px;
}
/*头部边框*/
::v-deep  .el-table thead tr th.is-leaf {
  border: 0px solid #ebeef5;
  border-right: none;
}
::v-deep  .el-table thead tr th:nth-last-of-type(2) {
  border-right: 0px solid #ebeef5;
}
</style>
