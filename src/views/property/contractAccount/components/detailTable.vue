<template>
  <div>
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
          <div v-if="item.coinMarketType">
            <span>{{scope.row.coinMarket}}</span>
            <span v-if="scope.row.positionType==0" style="color:#2EBD85;">{{`（${$t('property.全仓')}）`}}</span>
            <span v-if="scope.row.positionType==1" style="color:#FFAC00;">{{`（${$t('property.逐仓')}）`}}</span>
          </div>
          <div v-if="item.isdirectionType">
            <span class="buy" v-if="scope.row.positionDirection === 1"
              >{{$t('property.开多')}}</span
            >
            <span class="sell" v-if="scope.row.positionDirection === 2"
              >{{$t('property.开空')}}</span
            >
            <span
              class="pad"
              :class="scope.row.positionDirection === 1 ? 'buy' : 'sell'"
              >|</span
            >
            <span :class="scope.row.positionDirection === 1 ? 'buy' : 'sell'"
              >{{ scope.row.leverage }}X</span
            >
          </div>
          <!-- 平仓盈亏 -->
          <div v-if="item.realizedProfitLossType">
            <div
            :class="[
              parseFloat(scope.row.realizedProfitLoss) > 0 ? 'buy' : '',
              parseFloat(scope.row.realizedProfitLoss) < 0 ? 'sell' : '',
            ]"
          >
            {{ scope.row.realizedProfitLoss}}
          </div>
          </div>
          <div v-if="item.closePositionTimeTsLongType">
            <div>{{ parseTime(scope.row.closePositionTimeTsLong) }}</div>
          </div>
          <!-- 成交明细 -->
          <div v-if="item.dealDirectionType">
            <span class="buy" v-if="scope.row.directType === 1">{{$t('property.开多')}}</span>
            <span class="buy" v-if="scope.row.directType === 2">{{
              scope.row.detailType === 2 ? $t('property.强平平多') : $t('property.平多')
            }}</span>
            <span class="sell" v-if="scope.row.directType === 3">{{$t('property.开空')}}</span>
            <span class="sell" v-if="scope.row.directType === 4">{{
              scope.row.detailType === 2 ? $t('property.强平平空') : $t('property.平空')
            }}</span>
            <span
              class="pad"
              :class="
                scope.row.directType === 1 || scope.row.directType === 2
                  ? 'buy'
                  : 'sell'
              "
              >/</span
            >
            <span
              :class="
                scope.row.directType === 1 || scope.row.directType === 2
                  ? 'buy'
                  : 'sell'
              "
              >{{ scope.row.leverTimes }}X</span
            >
          </div>
          <div v-if="item.isEntrustType">
            <span v-if="scope.row.entrustType === 1">{{$t('property.限价委托')}}</span>
            <span v-if="scope.row.entrustType === 2">{{$t('property.市价委托')}}</span>
          </div>
          <div v-if="item.amountType">
            <span>{{
              scope.row.dealAmount ? scope.row.dealAmount : "0"
            }}</span>
            <span class="pad">/</span>
            <span>{{
              scope.row.entrustAmount ? scope.row.entrustAmount : "0"
            }}</span>
          </div>
          <div v-if="item.priceType">
            <span>{{ scope.row.dealPrice ? scope.row.dealPrice : "0" }}</span>
            <span class="pad">/</span>
            <span>{{
              scope.row.entrustPrice ? scope.row.entrustPrice : "0"
            }}</span>
          </div>
          <div v-if="item.dealTimeType">
            <span>{{ scope.row.dealTimeTsLong? parseTime(scope.row.dealTimeTsLong) : '--' }}</span>
          </div>
          <div v-if="item.entrustTimeType">
            <span>{{ scope.row.entrustTimeTsLong? parseTime(scope.row.entrustTimeTsLong):'--' }}</span>
          </div>
          <!-- 强平数量 -->
          <div v-if="item.strongCloseAmountType">
            <span>{{
              scope.row.strongCloseAmount ? scope.row.strongCloseAmount : "0"
            }}</span>
          </div>
          <!-- 强平价格 -->
          <div v-if="item.strongClosePriceType">
            <span>{{
              scope.row.strongCloseAmount ? scope.row.strongClosePrice : "0"
            }}</span>
          </div>
          <!-- 瓜分比例 -->
           <div v-if="item.poolRatioType">
            <span>{{
              scope.row.poolRatio ? scope.row.poolRatio : "0"
            }}</span>
          </div>
           <div v-if="item.userProfitRatioType">
            <span>{{
              scope.row.userProfitRatio ? scope.row.userProfitRatio : "0"
            }}</span>
          </div>
           <div v-if="item.poolProfitRatioType">
            <span>{{
              scope.row.poolProfitRatio ? scope.row.poolProfitRatio : "0"
            }}</span>
          </div>
        </template>
      </el-table-column>
      <template slot="empty">
        <div class="empty">
          <img class="empty-img" src="@/assets/images/null-page.png" alt="" />
          <p>{{$t('property.暂无数据')}}</p>
        </div>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DetailTable",
  props: {
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
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
//去掉表格边框
::v-deep .el-table__row > td {
  border: none;
}
/* 清除底部横线 */
.el-table::before {
  height: 0px;
}
/*头部边框*/
::v-deep .el-table thead tr th.is-leaf {
  border: 0px solid #ebeef5;
  border-right: none;
}
::v-deep .el-table thead tr th:nth-last-of-type(2) {
  border-right: 0px solid #ebeef5;
}
.pad {
  padding: 0 5px;
}
.buy {
  color: #90ff00;
}
.sell {
  color: #f75f52;
}
.empty {
  margin-top: 120px;
}

</style>
