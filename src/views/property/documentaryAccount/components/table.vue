<template>
  <div class="table-wrapper">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in columnData"
        :key="index"
        :min-width="item.width"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="{ row }">
          <!-- 默认展示 -->
          <span v-if="item.text">{{ row[item.prop] }}</span>
          <!-- 自定义内容 -->
          <!-- 仓位 -->
          <div v-if="item.positionMarketType">
            <div v-if="row.positionType === 0">
              {{ row.coinMarket }}
              <span style="color: #3990ff">(全仓)</span>
            </div>
            <div v-else>
              {{ row.coinMarket }}
              <span style="color: #ffac00">(逐仓)</span>
            </div>
          </div>
          <div v-if="item.markType">
            <span>{{ row.markedPrice }}</span>
          </div>
          <!-- 资金 -->
          <div v-if="item.accountEquityType">
            <span>{{ isShow ? row.accountEquity : "******" }}</span>
          </div>
          <div v-if="item.unrealizeType">
            <span>{{ isShow ? row.unrealizedProfitLoss : "******" }}</span>
          </div>
          <div v-if="item.occupyDepositType">
            <span>{{ isShow ? row.occupyDeposit : "******" }}</span>
          </div>
          <div v-if="item.availableDepositType">
            <span>{{ isShow ? row.availableDeposit : "******" }}</span>
          </div>
          <div v-if="item.lossType">
            <span>{{row.unrealizedProfitLoss}}</span>
          </div>
           <div v-if="item.rateReturn">
            <span>{{row.rateReturn}}%</span>
          </div>
          <!-- 操作 -->
          <span v-if="item.isOperation">
            <span v-for="(operations, index) in item.operation" :key="index">
              <span
                :class="operations.type === 'button' ? 'button' : 'text'"
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
export default {
  name: "DocumentaryTable",
  props: {
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
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    isEyeShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  padding-bottom: 30px;
}
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

//表格处理
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
  line-height: 49px;
  height: 49px;
}
</style>
