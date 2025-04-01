<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%"
      @sort-change="onSortChange"
    >
      <el-table-column
        v-for="(item, index) in columnData"
        :key="index"
        :min-width="item.width"
        :sortable="item.sortable"
        :sort-orders="item.sortorders"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="{ row }">
          <!-- 默认展示 -->
          <span v-if="item.text">{{ row[item.prop] }}</span>
          <!-- 自定义内容 -->
          <div v-if="item.isSymbolType">
            <span @click="isFavor(row)">
              <svg-icon
                :iconClass="row.favorite ? 'start-on' : 'start-off'"
                :className="row.favorite ? 'startOn' : 'startOff'"
              />
            </span>
            <img class="icon" :src="row.icon" alt="" />
            <span>{{ row.symbol }}</span>
          </div>
          <div v-if="item.changeType">
            <span
              :class="[
                parseFloat(row.change) > 0 ? 'up' : '',
                parseFloat(row.change) < 0 ? 'down' : '',
              ]"
              >{{ row.change | changeFilter }}</span
            >
          </div>
          <div v-if="item.lastPriceType">
            <span :class="num(row)?'up':'down'">{{ $formatNumber(row.lastPrice) }}</span>
          </div>
          <div v-if="item.volOf24hType">
            <span>{{ $formatNumber(row.volOf24h) }}</span>
          </div>
          <!-- 操作 -->
          <span v-if="item.isOperation">
            <span v-for="(operations, index) in item.operation" :key="index">
              <span
                class="btn"
                v-if="operations.isShow(row)"
                @click="operations.buttonClick(row)"
                >{{ operations.label }}</span
              >
            </span>
          </span>
        </template>
      </el-table-column>
      <template slot="empty">
       <my-empty></my-empty>
      </template>
    </el-table>
  </div>
</template>

<script>
import {simulateArrayData} from '@/libs/simulateArrayData'
export default {
  name: "CommontTable",
  props: {
    record: {
      type: String,
      default: "暂无数据",
    },
    columnData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  filters: {
    changeFilter(val) {
      if (val < 0) {
        return `${val}%`;
      } else if (val == 0) {
        return val;
      } else if(val == null){
        return '--%'
      } else {
        return `+${val}%`;
      }
    },
  },
  data() {
    return {
      num:simulateArrayData()
    };
  },
  methods: {
    //收藏或取消收藏
    isFavor(row) {
      this.$emit("isFavor", row);
    },
    //排序功能
    onSortChange(column) {
      if (column.prop === "symbol") {
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
      // if (rev) {
      //   rev = 1;
      // } else {
      //   rev = -1;
      // }
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }
      let that = this;
      return function (a, b) {
        let res = 0;
        for (let i = 0; that.tableData; i++) {
          
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
  padding-bottom: 20px;
  .btn {
    color: #90ff00;
    cursor: pointer;
  }
  .empty-img {
    margin-top: 60px;
  }
  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    vertical-align: middle;
    margin: 0 10px;
  }
  .up {
    color: rgba(46, 189, 133, 1);
  }
  .down {
    color: rgba(247, 95, 82, 1);
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
::v-deep   .el-table thead tr th.is-leaf {
  border: 0px solid #ebeef5;
  border-right: none;
}
::v-deep   .el-table thead tr th:nth-last-of-type(2) {
  border-right: 0px solid #ebeef5;
}
</style>
