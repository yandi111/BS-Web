<template>
  <div>
    <div class="depositRecord">
      <div style="display: flex; justify-content: space-between">
        <div style="font-size: 16px; font-weight: 500">{{ title }}</div>
        <div v-if="show" @click="allRecord" class="all-record">
          {{ $t("property.全部记录") }}
        </div>
      </div>
      <div class="depositRecord-select">
        <div class="depositRecord-symbol">
          <div>
            <el-select
              v-model="formInline.symbolVal"
              @change="onCoinChange"
              :placeholder="$t('property.全部币种')"
            >
              <el-option
                v-for="item in symbolList"
                :key="item.coinId"
                :label="item.coinName"
                :value="item.coinId"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="depositRecord-time">
          <div class="select-box">
            <div class="select-time">
              <el-select
                v-model="formInline.timeVal"
                :placeholder="$t('property.最近7天')"
                style="margin-right: 20px"
                @change="recentDate"
              >
                <el-option
                  v-for="item in timeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="select-date">
              <el-date-picker
                v-model="formInline.dateVal"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t('property.开始日期')"
                :end-placeholder="$t('property.结束日期')"
                @change="changeDate"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-border"></div>
    <div class="deposit-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          v-for="(item, index) in columnData"
          :key="index"
          :min-width="item.width"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="{ row, $index }">
            <!-- 默认展示 -->
            <span v-if="item.text">{{ row[item.prop] }}</span>
            <!-- 自定义内容 -->
            <div v-if="item.createTimeTsLongType">
              <span>{{ $formatTime(row.createTimeTsLong) }}</span>
            </div>
            <div v-if="item.confirmTimeType">
              <span>{{ $formatTime(row.confirmTimeTsLong) }}</span>
            </div>
            <!-- 提币 -->
            <div v-if="item.WithdrawCoinsTimeType">
              <span>{{ $formatTime(row.confirmTimeTsLong) }}</span>
            </div>
            <div v-if="item.ownDefined">
              <span v-if="row.status === 0">{{ $t("property.已完成") }}</span>
              <!-- <span v-if="row.status === 0">{{$t('property.充值已上账')}}</span> -->
              <span v-if="row.status === 10">{{ $t("property.审核中") }}</span>
              <span v-if="row.status === 20">{{
                $t("property.审核失败")
              }}</span>
              <span v-if="row.status === 30">{{ $t("property.待打包") }}</span>
              <span v-if="row.status === 40">{{ $t("property.待确认") }}</span>
              <span v-if="row.status === 50">{{ $t("property.已确认") }}</span>
              <span v-if="row.status === 60">{{
                $t("property.确认失败，待重试")
              }}</span>
              <span v-if="row.status === 70">{{
                $t("property.充值未上账")
              }}</span>
              <span v-if="row.status === 80">{{
                $t("property.充值已上账")
              }}</span>
            </div>
            <div v-if="item.toAccountType">
              <span v-if="row.toAccountType === 1">{{
                $t("property.现货账户")
              }}</span>
              <span v-if="row.toAccountType === 2">{{
                $t("property.资金账户")
              }}</span>
              <span v-if="row.toAccountType === 3">{{
                $t("property.合约账户")
              }}</span>
              <span v-if="row.toAccountType === 4">{{
                $t("property.跟单账户")
              }}</span>
              <span v-if="row.toAccountType === 5">{{
                $t("property.资方账户")
              }}</span>
              <span v-if="row.toAccountType === 6">{{
                $t("property.机构-交易员账户")
              }}</span>
            </div>
            <div v-if="item.fromAccountType">
              <span v-if="row.fromAccountType === 1">{{
                $t("property.现货账户")
              }}</span>
              <span v-if="row.fromAccountType === 2">{{
                $t("property.资金账户")
              }}</span>
              <span v-if="row.fromAccountType === 3">{{
                $t("property.合约账户")
              }}</span>
              <span v-if="row.fromAccountType === 4">{{
                $t("property.跟单账户")
              }}</span>
              <span v-if="row.fromAccountType === 5">{{
                $t("property.资方账户")
              }}</span>
              <span v-if="row.fromAccountType === 6">{{
                $t("property.机构-交易员账户")
              }}</span>
            </div>
            <div v-if="item.isOwnDefined">
              <span v-if="row.depositType === 0">{{ $t("property.链上提币") }}</span>
              <span v-if="row.depositType === 1">{{ $t("property.人工审核") }}</span>
              <span v-if="row.depositType === 2">{{ $t("property.内部转账") }}</span>
            </div>
            <!-- 闪兑 -->
            <div v-if="item.isTimeType">
              <span>{{ $formatTime(row.createTimeTsLong) }}</span>
            </div>
            <div v-if="item.isFlashType">
              <span v-if="row.type === 1">{{ $t("property.市价") }}</span>
              <span v-if="row.type === 2">{{ $t("property.限价") }}</span>
            </div>
            <div v-if="item.isAccountType">
              <span v-if="row.accountType === 1">{{
                $t("property.现货账户")
              }}</span>
              <span v-if="row.accountType === 2">{{
                $t("property.资金账户")
              }}</span>
            </div>
            <div v-if="item.isFromAmount">
              <span style="margin-right: 3px">{{ row.fromAmount }}</span>
              <span>{{ row.fromCoinName }}</span>
            </div>
            <div v-if="item.isSuccess">
              <span>{{ $t("property.成功") }}</span>
            </div>
            <div v-if="item.isDepositType">
              <span v-show="row.depositType == 2">{{
                $t("property.内部充值")
              }}</span>
               <span v-show="row.depositType == 0">{{
                $t("property.链上充值")
              }}</span>
              <span v-show="row.depositType == 1">{{
                $t("property.人工审核")
              }}</span>
            </div>
            <!-- 操作 -->
            <span
              v-if="item.isOperation && row.status == 20"
              class="resubmit"
              @click="resubmit(row)"
              >{{$t('property.重新提交')}}</span
            >
            <span
              v-if="item.isOperation"
              @click="onDetail(row, $index)"
              style="color: #90ff00; cursor: pointer"
              >{{ $t("property.详情") }}</span
            >
          </template>
        </el-table-column>
        <template slot="empty">
          <img class="empty-img" src="@/assets/images/null-page.png" alt="" />
          <p class="empty-text">{{ $t("property.暂无数据") }}</p>
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
    <!-- 充值详情弹窗 -->
    <common-modal
      :title="$t('property.充值详情')"
      width="600px"
      :show="isShow"
      :noFooter="true"
      :showClose="true"
      @cancel="isShow = false"
    >
      <template #dia_content>
        <div class="detail">
          <div class="detail-left">{{ $t("property.状态") }}</div>
          <div class="detail-right">
            <span v-if="depositDetailData.status === 0">{{
              $t("property.已完成")
            }}</span>
            <span v-if="depositDetailData.status === 10">{{
              $t("property.审核中")
            }}</span>
            <span v-if="depositDetailData.status === 20">{{
              $t("property.审核失败")
            }}</span>
            <span v-if="depositDetailData.status === 30">{{
              $t("property.待打包")
            }}</span>
            <span v-if="depositDetailData.status === 40">{{
              $t("property.待确认")
            }}</span>
            <span v-if="depositDetailData.status === 50">{{
              $t("property.已确认")
            }}</span>
            <span v-if="depositDetailData.status === 60">{{
              $t("property.确认失败，待重试")
            }}</span>
            <span v-if="depositDetailData.status === 70">{{
              $t("property.充值未上账")
            }}</span>
            <span v-if="depositDetailData.status === 80">{{
              $t("property.充值已上账")
            }}</span>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.充值方式") }}</div>
          <div class="detail-right">
            <span v-show="depositDetailData.depositType == 2">{{
              $t("property.内部充值")
            }}</span>
            <span v-show="depositDetailData.depositType == 0">{{
              $t("property.链上充值")
            }}</span>
            <span v-show="depositDetailData.depositType == 1">{{
              $t("property.人工审核")
            }}</span>
          </div>
        </div>
        <!-- <div class="detail">
          <div class="detail-left">{{ $t("property.确认") }}</div>
          <div class="detail-right">{{ depositDetailData.confirmNum }}</div>
        </div> -->
        <div class="detail">
          <div class="detail-left">{{ $t("property.时间") }}</div>
          <div class="detail-right">
            {{ $formatTime(depositDetailData.confirmTimeTsLong) }}
          </div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.币种") }}</div>
          <div class="detail-right">{{ depositDetailData.coinName }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.充值数量") }}</div>
          <div class="detail-right">{{ depositDetailData.amount }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.转账网络") }}</div>
          <div class="detail-right">{{ depositDetailData.chainName }}</div>
        </div>
        <!-- <div class="detail">
          <div class="detail-left">{{ $t("property.转账方式") }}</div>
          <div class="detail-right">
            <div v-if="depositDetailData.ownType === 1">
              {{ $t("property.链上地址") }}
            </div>
            <div v-if="depositDetailData.ownType === 2">
              {{ $t("property.手机号") }}
            </div>
            <div v-if="depositDetailData.ownType === 3">
              {{ $t("property.邮箱") }}
            </div>
            <div v-if="depositDetailData.ownType === 4">UID</div>
            <div v-if="depositDetailData.ownType === 5">
              {{ $t("property.内部地址") }}
            </div>
          </div>
        </div> -->
        <div class="detail">
          <div class="detail-left">{{ $t("property.地址") }}</div>
          <div class="detail-right">{{ depositDetailData.toAddress }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">TxId</div>
          <div class="detail-right">{{ depositDetailData.txId }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.充币账户") }}</div>
          <div class="detail-right">
            <div v-if="depositDetailData.accountType === 1">
              {{ $t("property.现货账户") }}
            </div>
            <div v-if="depositDetailData.accountType === 2">
              {{ $t("property.资金账户") }}
            </div>
          </div>
        </div>
      </template>
    </common-modal>
    <!-- 提币详情弹窗 -->
    <common-modal
      :title="$t('property.提币详情')"
      width="600px"
      :show="withdrawCoinsShow"
      :noFooter="true"
      :showClose="true"
      @cancel="withdrawCoinsShow = false"
    >
      <template #dia_content>
        <div class="detail">
          <div class="detail-left">{{ $t("property.状态") }}</div>
          <div class="detail-right">
            <span v-if="withdrawCoinsData.status === 0">{{
              $t("property.已完成")
            }}</span>
            <span v-if="withdrawCoinsData.status === 10">{{
              $t("property.审核中")
            }}</span>
            <span v-if="withdrawCoinsData.status === 20">{{
              $t("property.审核失败")
            }}</span>
            <span v-if="withdrawCoinsData.status === 30">{{
              $t("property.待打包")
            }}</span>
            <span v-if="withdrawCoinsData.status === 40">{{
              $t("property.待确认")
            }}</span>
            <span v-if="withdrawCoinsData.status === 50">{{
              $t("property.已确认")
            }}</span>
            <span v-if="withdrawCoinsData.status === 60">{{
              $t("property.确认失败，待重试")
            }}</span>
            <span v-if="withdrawCoinsData.status === 70">{{
              $t("property.充值未上账")
            }}</span>
            <span v-if="withdrawCoinsData.status === 80">{{
              $t("property.充值已上账")
            }}</span>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.确认") }}</div>
          <div class="detail-right">{{ withdrawCoinsData.confirmNum }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.时间") }}</div>
          <div class="detail-right">
            {{ $formatTime(withdrawCoinsData.confirmTimeTsLong) }}
          </div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.提币账户") }}</div>
          <div class="detail-right">
            <div v-if="withdrawCoinsData.accountType === 1">
              {{ $t("property.现货账户") }}
            </div>
            <div v-if="withdrawCoinsData.accountType === 2">
              {{ $t("property.资金账户") }}
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.币种") }}</div>
          <div class="detail-right">{{ withdrawCoinsData.coinName }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.提取金额") }}</div>
          <div class="detail-right">{{ withdrawCoinsData.amount }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.手续费") }}</div>
          <div class="detail-right">{{ withdrawCoinsData.fee }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.实际到账数量") }}</div>
          <div class="detail-right">{{ withdrawCoinsData.actualAmount }}</div>
        </div>
        <div class="detail" v-if="withdrawCoinsData.chainName">
          <div class="detail-left">{{ $t("property.转账网络") }}</div>
          <div class="detail-right">{{ withdrawCoinsData.chainName }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.地址") }}</div>
          <div class="detail-right">{{ withdrawCoinsData.toAddress }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.转账ID") }}(BTC)</div>
          <div class="detail-right">{{ withdrawCoinsData.txId }}</div>
        </div>
      </template>
    </common-modal>
  </div>
</template>

<script>
export default {
  name: "AssetTable",
  props: {
    record: {
      type: String,
      default: "暂无数据",
    },
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
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
    symbolList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      isShow: false, // 充值详情
      withdrawCoinsShow: false, //提币详情
      depositDetailData: {}, //充值详情内容
      withdrawCoinsData: {}, //提币详情内容
      formInline: {
        symbolVal: "",
        timeVal: 1,
        dateVal: [],
        startDate: "",
        endDate: "",
        pageNum: 1,
        pageSize: 10,
      },
      timeList: [
        {
          value: 1,
          label: this.$t("property.最近7天"),
        },
        {
          value: 2,
          label: this.$t("property.最近30天"),
        },
      ],
    };
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
    onDetail(row, $index) {
      if (row.operateType === "withdraw") {
        // 提币详情弹窗
        this.withdrawCoinsData = row;
        this.withdrawCoinsShow = true;
      } else if (row.operateType === "recharge") {
        this.depositDetailData = row;
        // 充币详情弹窗
        this.isShow = true;
      }
    },
    //重新提交
    resubmit(row) {
      this.$emit("resubmit", row);
    },
    // 切换当前页
    onCurrentChange(val) {
      this.$emit("current-change", { page: val, limit: this.limit });
    },
    //币种筛选
    onCoinChange(val) {
      this.$emit("coinChange", val);
    },
    //最近7天、30天
    recentDate(val) {
      this.$emit("onRecentDate", val);
    },
    // 日期选择
    changeDate(data) {
      this.$emit("onChangeDate", data);
    },
    allRecord() {
      this.$emit("onAllRecord");
    },
  },
};
</script>

<style lang="scss" scoped>
.depositRecord {
  .all-record {
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #f5f7fa;
    border-radius: 6px;
    color: #90ff00;
  }
  .depositRecord-select {
    margin-top: 20px;
    display: flex;
    .depositRecord-symbol {
      margin-right: 20px;
      ::v-deep .el-input__inner {
        width: 120px;
      }
    }
  }
  .depositRecord-time {
    .select-box {
      display: flex;
      .select-time {
        ::v-deep .el-input__inner {
          width: 130px;
        }
      }
      .select-date {
      }
    }
  }
}
.table-border {
  border-bottom: 1px solid #f5f7fa;
  margin-top: 20px;
}
.deposit-table {
  .block {
    padding: 30px 30px 20px 0;
  }
  .empty-img {
    display: inline-block;
    width: 93px;
    height: 76px;
    margin-top: 35px;
  }
  .empty-text {
    margin-top: 10px;
    margin-bottom: 30px;
  }
  ::v-deep .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
  }
  ::v-deep .el-table__empty-text {
    line-height: 20px;
    width: 50%;
    color: #909399;
    font-size: 12px;
  }
}
.detail {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  margin: 0 30px;
  font-size: 16px;
  color: #333;
  .detail-left {
    width: 35%;
    color: #8992a6;
  }
  .detail-right {
    text-align: right;
  }
}
.resubmit {
  color: #90ff00;
  cursor: pointer;
  font-size: 12px;
  padding-right: 10px;
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
