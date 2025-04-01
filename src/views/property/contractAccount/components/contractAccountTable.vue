<template>
  <div class="container">
    <div class="select">
      <div class="item" v-if="typeShow">
        <el-form label-position="top">
          <el-form-item :label="$t('property.类型')">
            <el-select
              v-model="currentParams.orderType"
              @change="typeChange"
              :placeholder="$t('property.请选择')"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="item">
        <el-form label-position="top">
          <el-form-item :label="$t('property.合约')">
            <el-select
              v-model="currentParams.coinMarket"
              @change="symbolChange"
              :placeholder="$t('property.请选择')"
            >
              <el-option
                v-for="item in symbolList"
                :key="item.id"
                :label="item.symbolCode"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="item">
        <el-form label-position="top">
          <el-form-item :label="contractTypeShow ? $t('property.类型') : $t('property.方向')">
            <el-select
              v-model="currentParams.type"
              :placeholder="$t('property.请选择')"
              @change="directionChange"
            >
              <el-option
                v-for="item in closeTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="select-date" v-if="historyShow">
        <el-form label-position="top">
          <el-form-item :label="$t('property.时间')">
            <el-date-picker
              v-model="currentParams.dateVal"
              type="daterange"
              :range-separator="$t('property.至')"
              :start-placeholder="$t('property.开始日期')"
              :end-placeholder="$t('property.结束日期')"
              @change="changeDate"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          v-for="(item, index) in columnData"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
        >
          <template slot-scope="scope">
            <!-- 默认展示 -->
            <span v-if="item.text">{{ scope.row[item.prop] }}</span>
            <!-- 自定义内容 -->
            <div v-if="item.isTimeType">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </div>
            <!-- 当前委托合约 -->
            <div v-if="item.currentMarketType">
              <div v-if="scope.row.positionType === 0">
                {{ scope.row.coinMarket }}
                <span style="color: #90ff00">{{`(${$t('property.全仓')})`}}</span>
              </div>
              <div v-else>
                {{ scope.row.coinMarket }}
                <span style="color: #ffac00">{{`(${$t('property.逐仓')})`}}</span>
              </div>
            </div>
            <!-- 当前委托委托价格 -->
            <div v-if="item.entrustPriceType">
              <div>
                {{
                  scope.row.entrustPrice ? scope.row.entrustPrice : $t('property.最优市价')
                }}
              </div>
            </div>
            <!-- 历史委托合约 -->
            <div v-if="item.historyMarketType">
              <div v-if="scope.row.positionType === 0">
                {{ scope.row.coinMarket }}
                <span style="color: #90ff00">{{`(${$t('property.全仓')})`}}</span>
              </div>
              <div v-else>
                {{ scope.row.coinMarket }}
                <span style="color: #ffac00">{{`(${$t('property.逐仓')})`}}</span>
              </div>
            </div>
            <!-- 历史仓位合约 -->
            <div v-if="item.entrustMarketType">
              <div v-if="scope.row.positionType === 0">
                {{ scope.row.coinMarket }}
                <span style="color: #90ff00">{{`(${$t('property.全仓')})`}}</span>
              </div>
              <div v-else>
                {{ scope.row.coinMarket }}
                <span style="color: #ffac00">{{`(${$t('property.逐仓')})`}}</span>
              </div>
            </div>
            <!-- 历史仓位开仓时间 -->
            <div v-if="item.lastTimeType">
              <span>{{ parseTime(scope.row.createTimeTsLong) }}</span>
            </div>
            <div v-if="item.isPriceType">
              <span v-if="scope.row.entrustType === 1">{{$t('property.限价委托')}}</span>
              <span v-if="scope.row.entrustType === 2">{{$t('property.市价委托')}}</span>
              <span v-if="scope.row.entrustType === 3">{{$t('property.市价止盈')}}</span>
              <span v-if="scope.row.entrustType === 4">{{$t('property.市价止损')}}</span>
              <span v-if="scope.row.entrustType === 5">{{$t('property.计划委托')}}</span>
              <span v-if="scope.row.entrustType === 6">{{$t('contract.限价止盈')}}</span>
              <span v-if="scope.row.entrustType === 7">{{$t('contract.限价止损')}}</span>
            </div>
            <div
              v-if="item.isType"
              :class="scope.row.type === 1 ? 'buy' : 'sell'"
            >
              <span v-if="scope.row.closingType === 1">{{$t('property.开多')}}</span>
              <span v-if="scope.row.closingType === 2">{{$t('property.开空')}}</span>
              <span v-if="scope.row.closingType === 3">{{$t('property.平多')}}</span>
              <span v-if="scope.row.closingType === 4">{{$t('property.平空')}}</span>
              <span v-if="scope.row.closingType === 5">{{$t('property.系统强平')}}</span>
              <span>|</span>
              <span>{{ scope.row.leverTimes }}X</span>
            </div>
            <!-- 历史仓位 -->
            <div
              v-if="item.isdirectionType"
              :class="scope.row.positionDirection === 1 ? 'buy' : 'sell'"
            >
              <span v-if="scope.row.positionDirection === 1">{{$t('property.开多')}}</span>
              <span v-if="scope.row.positionDirection === 2">{{$t('property.开空')}}</span>
              <span v-if="scope.row.leverage">|</span>
              <span v-if="scope.row.leverage">{{ scope.row.leverage }}X</span>
            </div>
            <div
              v-if="item.isdirectionType"
              :class="scope.row.direction === 1 ? 'buy' : 'sell'"
            >
              <span v-if="scope.row.closingType === 1">{{$t('property.开多')}}</span>
              <span v-if="scope.row.closingType === 2">{{$t('property.开空')}}</span>
              <span v-if="scope.row.closingType === 3">{{$t('property.平多')}}</span>
              <span v-if="scope.row.closingType === 4">{{$t('property.平空')}}</span>
              <span v-if="scope.row.closingType === 5">{{$t('property.系统强平')}}</span>
              <span v-if="scope.row.leverTimes">|</span>
              <span v-if="scope.row.leverTimes"
                >{{ scope.row.leverTimes }}X</span
              >
            </div>

            <div v-if="item.isAmountType">
              <span>{{ scope.row.entrustAmount }}</span>
              <span class="pad">|</span>
              <span>{{ scope.row.dealAmount }}</span>
            </div>
            <!-- 当前委托订单状态 -->
            <div v-if="item.isStatusType">
              <span v-if="scope.row.status === 0">{{$t('property.待交易')}}</span>
              <!-- <span v-if="scope.row.status === 0">{{$t('property.撤销中')}}</span> -->
              <span v-if="scope.row.status === 1">{{$t('property.完全成交')}}</span>
              <span v-if="scope.row.status === 2">{{$t('property.部分成交')}}</span>
              <span v-if="scope.row.status === 3">{{$t('property.撤销中')}}</span>
              <span v-if="scope.row.status === 4">{{$t('property.撤销成功')}}</span>
            </div>
            <!-- 合约账单type -->
            <div v-if="item.isCoinMarket">
                <span>{{scope.row.coinMarket?scope.row.coinMarket: '--'}}</span>  
            </div>
            <div v-if="item.contractType">
              <span v-if="scope.row.type === 1">{{$t('property.开多')}}</span>
              <span v-if="scope.row.type === 2">{{$t('property.开空')}}</span>
              <span v-if="scope.row.type === 3">{{$t('property.平多')}}</span>
              <span v-if="scope.row.type === 4">{{$t('property.平空')}}</span>
              <span v-if="scope.row.type === 5">{{$t('property.强平平多')}}</span>
              <span v-if="scope.row.type === 6">{{$t('property.强平平空')}}</span>
              <span v-if="scope.row.type === 7">{{$t('property.现货账户转入')}}</span>
              <span v-if="scope.row.type === 8">{{$t('property.资金账户转入')}}</span>
              <span v-if="scope.row.type === 9">{{$t('property.转出现货账户')}}</span>
              <span v-if="scope.row.type === 10">{{$t('property.转出资金账户')}}</span>
              <span v-if="scope.row.type === 11">{{$t('property.资金费用')}}</span>
              <span v-if="scope.row.type === 12"
                >{{$t('property.个人跟单账户划入虚拟合作跟单总账户')}}</span
              >
              <span v-if="scope.row.type === 13"
                >{{$t('property.虚拟合作跟单总账户划入个人跟单账户')}}</span
              >
              <span v-if="scope.row.type === 14"
                >{{$t('property.跟单账户转入')}}</span
              >
              <span v-if="scope.row.type === 15"
                >{{$t('property.转出跟单账户')}}</span
              >
               <span v-if="scope.row.type === 17"
                >{{$t('property.KYC等级2级')}}</span
              >
              <span v-if="scope.row.type == 19">{{$t('property.交易奖励')}}</span>
              <span v-if="scope.row.type == 20">{{$t('property.盈利奖励')}}</span>
            </div>
            <!-- <div v-if="item.isKycLevel">
              <span>{{$t('property.2级')}}</span>
            </div> -->
            <!-- 当前委托类型 -->
            <div v-if="item.currentCommissionType">
              <span v-if="scope.row.entrustType === 1">{{$t('property.限价委托')}}</span>
              <span v-if="scope.row.entrustType === 2">{{$t('property.市价委托')}}</span>
              <span v-if="scope.row.entrustType === 3">{{$t('property.市价止盈')}}</span>
              <span v-if="scope.row.entrustType === 4">{{$t('property.市价止损')}}</span>
              <span v-if="scope.row.entrustType === 5">{{$t('property.计划委托')}}</span>
            </div>
            <!-- 当前委托止盈止损 -->
            <div v-if="item.currentPLType">
              <div>
                <span v-if="scope.row.profitTriggerPrice">{{
                  scope.row.profitTriggerPrice
                }}</span>
                <span v-else>--</span>
                <span class="pad">|</span>
                <span v-if="scope.row.lossTriggerPrice">{{
                  scope.row.lossTriggerPrice
                }}</span>
                <span v-else>--</span>
              </div>
            </div>
            <!-- 当前委托方向杠杆 -->
            <div v-if="item.currentType">
              <span v-if="scope.row.directType === 1" class="buy"
                >{{$t('property.开多')}} | {{ scope.row.leverTimes }}X</span
              >
              <span v-if="scope.row.directType === 2" class="buy"
                >{{$t('property.平多')}} | {{ scope.row.leverTimes }}X</span
              >
              <span v-if="scope.row.directType === 3" class="sell"
                >{{$t('property.开空')}} | {{ scope.row.leverTimes }}X</span
              >
              <span v-if="scope.row.directType === 4" class="sell"
                >{{$t('property.平空')}} | {{ scope.row.leverTimes }}X</span
              >
            </div>
            <!-- 历史委托方向杠杆 -->
            <div v-if="item.historyType">
              <span v-if="scope.row.directType === 1" class="buy"
                >{{$t('property.开多')}} | {{ scope.row.leverTimes }}X</span
              >
              <span v-if="scope.row.directType === 2" class="buy"
                >{{
                  scope.row.closePositionsType === 1 ? $t('property.强平平多') : $t('property.平多')
                }}
                | {{ scope.row.leverTimes }}X</span
              >
              <span v-if="scope.row.directType === 3" class="sell"
                >{{$t('property.开空')}} | {{ scope.row.leverTimes }}X</span
              >
              <span v-if="scope.row.directType === 4" class="sell"
                >{{
                  scope.row.closePositionsType === 1 ? $t('property.强平平空') : $t('property.平空') 
                }}
                | {{ scope.row.leverTimes }}X</span
              >
            </div>
            <!-- 委托价格 -->
            <div v-if="item.historyPriceType">
              <span>{{
                scope.row.entrustPrice ? scope.row.entrustPrice : $t('property.最优市价') 
              }}</span>
            </div>
            <!-- 触发价 -->
            <div v-if="item.triggerType">
              <span v-if="scope.row.triggerPrice">{{
                scope.row.triggerPrice
              }}</span>
              <span v-else>--</span>
            </div>
            <!-- 收益 -->
            <div v-if="item.lossType">
              <span
              v-if="scope.row.type ==8 || scope.row.type ==9 || scope.row.type ==10 || scope.row.type ==11 ||scope.row.type ==12 || scope.row.type ==13 || scope.row.type ==14 || scope.row.type ==15 || scope.row.type ==7 || scope.row.type == 17 ||scope.row.type == 19 || scope.row.type == 20"
              >{{scope.row.amount}}</span>
              <span v-else>{{
                Number(scope.row.closeProfitOrLoss)
                  ? scope.row.closeProfitOrLoss
                  : "0"
              }}</span>
            </div>
            <!-- 手续费 -->
            <div v-if="item.feeType">
              <span
                v-if="
                  scope.row.type == 1 ||
                  scope.row.type == 2 ||
                  scope.row.type == 3 ||
                  scope.row.type == 4 ||
                  scope.row.type == 5 ||
                  scope.row.type == 6 
                "
                >{{ Number(scope.row.amount) ? scope.row.amount : "0" }}</span
              >
              <span v-else>0</span>
            </div>
            <!-- 总额 -->
            <!-- <div v-if="item.amountType">
              <span
                v-if="
                  scope.row.type === 1 ||
                  scope.row.type === 2 ||
                  scope.row.type === 3 ||
                  scope.row.type === 4
                "
                >--</span
              >
              <span v-else>{{
                Number(scope.row.amount) ? scope.row.amount : "--"
              }}</span>
            </div> -->
            <!-- 历史仓位（平仓盈亏） -->
            <div v-if="item.realizedProfitLossType">
              <div
                :class="[
                  parseFloat(scope.row.realizedProfitLoss) > 0 ? 'buy' : '',
                  parseFloat(scope.row.realizedProfitLoss) < 0 ? 'sell' : '',
                ]"
              >
                {{ scope.row.realizedProfitLoss }}
              </div>
            </div>
            <div v-if="item.statusType">
              <div v-if="scope.row.strongClose ==1">{{$t('contract.强平')}}</div>
              <div v-else>{{scope.row.status ==1? $t('contract.全部平仓') : $t('contract.部分平仓')}}</div>
            </div>
            <!-- 平仓时间 -->
            <div v-if="item.closePositionTimeType">
              <div>{{ parseTime(scope.row.closePositionTimeTsLong) }}</div>
            </div>
            <!-- 操作 -->
            <div v-if="item.isOperation">
              <span v-for="(operations, index) in item.operation" :key="index">
                <span
                  class="btn"
                  :class="{
                    undo: operations.type == 'undo',
                    disabled:
                      operations.type == 'check' &&
                      !scope.row.profitTriggerPrice,
                  }"
                  v-if="operations.isShow(scope.row)"
                  @click="operations.buttonClick(scope.row)"
                  >{{ operations.label }}</span
                >
              </span>
            </div>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
      <!--分页 -->
      <div class="block" v-show="total > 0">
        <el-pagination
          background
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="->, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContractAccountTable",
  props: {
    historyShow: {
      type: Boolean,
      default: false,
    },
    typeShow: {
      type: Boolean,
      default: true,
    },
    record: {
      type: String,
      default: "暂无数据",
    },
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
    typeList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    currentParams: {
      type: Object,
      default: () => {
        return {};
      },
    },
    symbolList: {
      type: Array,
      default: () => [],
    },
    closeTypeList: {
      type: Array,
      default: () => [],
    },
    isOrderType: {
      type: Boolean,
      default: false,
    },
    contractTypeShow: {
      type: Boolean,
      default: false,
    },
    paginationShow: {
      type: Boolean,
      default: false,
    },
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
  },
  data() {
    return {
      // options: [],
    };
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    typeChange(e) {
      this.$emit("onTypeChange", e);
    },
    symbolChange(e) {
      this.$emit("symbolChange", e);
    },
    directionChange(e) {
      this.$emit("directionChange", e);
    },
    handleSizeChange(val) {
      if (this.currentPage * val > this.total) {
        this.currentPage = 1;
      }
      this.$emit("pagination", { page: this.currentPage, limit: val });
    },
    // 切换当前页
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
    },
    // 日期选择
    changeDate(data) {
      this.$emit("onChangeDate", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  ::v-deep .el-tabs__header {
    margin: 0;
  }
  .select {
    display: flex;
    margin-left: 70px;
    .item {
      width: 140px;
      margin-right: 20px;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #8992a6;
      ::v-deep .el-form--label-top .el-form-item__label {
        padding: 0;
      }
    }
    .select-date {
      ::v-deep .el-range-editor.el-input__inner {
        width: 235px;
      }
      ::v-deep .el-form--label-top .el-form-item__label {
        padding: 0;
      }
      ::v-deep .el-date-editor .el-range-separator {
        padding: 0;
        font-size: 14px;
        width: 9%;
        color: #333;
      }
    }
  }
  // .border {
  //   border: 1px solid #e1e1e1;
  //   margin-bottom: 15px;
  // }
  .table {
    padding: 0 0 30px 50px;
    .btn {
      display: inline-block;
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 6px;
      margin-right: 20px;
      font-size: 16px;
      font-weight: 600;
      border: 1px solid #90ff00;
      color: #90ff00;
      cursor: pointer;
      &.undo {
        border: 1px solid #f75f52;
        color: #f75f52;
      }
      &.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    .buy {
      color: #90ff00;
    }
    .sell {
      color: #f75f52;
    }
  }
}
.pad {
  padding: 0 5px;
}
.block {
  margin-top: 20px;
}
::v-deep .el-tabs__nav-wrap::after {
  background-color: transparent;
}
::v-deep .el-table th.el-table__cell > .cell {
  color: #8992a6;
}

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
  height: 49px;
  line-height: 49px;
}
</style>
