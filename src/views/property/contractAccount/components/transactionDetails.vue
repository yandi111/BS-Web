<template>
  <div class="transactionDetail">
    <div class="detail-title">
      <i class="el-icon-arrow-left" @click="back"></i>
      <span @click="back">{{ $t("property.仓位成交明细") }}</span>
    </div>
    <div class="position-overview">
      <div class="overview-title">{{ $t("property.仓位总览") }}</div>
      <div class="table">
        <DetailTable
          v-if="positionOverviewData.length"
          :columnData="positionOverviewColumnData"
          :tableData="positionOverviewData"
        />
      </div>
    </div>
    <div class="transaction-detail">
      <div class="overview-title">{{ $t("property.成交明细") }}</div>
      <div class="table">
        <DetailTable
          v-if="dealData.length"
          :columnData="dealColumnData"
          :tableData="dealData"
        />
      </div>
      <div class="leveling" v-if="isStrong">
        <div class="leveling-border"></div>
        <div>
          <span class="leveling-title">{{ $t("property.强平详情") }}</span>
          <span class="leveling-time">{{
            parseTime(detail.entrustTimeTsLong)
          }}</span>
        </div>
        <div class="leveling-text">
          {{
            $t(
              "contract.X永续的标记价格到达X时,您的XX仓位的保证金率小于或等于100%，强制平仓将被触发。仓位按照标记价格X被强平引擎接管",
              [
                detail.coinMarket,
                strongClosePrice,
                detail.coinMarket,
                direction,
              ]
            )
          }}
        </div>
        <div>
          <span class="leveling-more">
            <span @click="(_) => $router.push('/forcedLiquidation')"
              >{{ $t("property.关于强平")
              }}<i class="iconfont icon-more1 ml10"></i
            ></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailTable from "./detailTable.vue";
export default {
  name: "TransactionDetail",
  components: {
    DetailTable,
  },
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    direction() {
      let directType =
        this.detail.positionDirection == 1 || this.detail.positionDirection == 2
          ? this.$t("contract.多仓")
          : this.$t("contract.空仓");
      let text = `${this.$t("lang_795")}-${directType}-${
        this.detail.leverage
      }X`;
      return text;
    },
  },
  data() {
    return {
      positionOverviewColumnData: [
        {
          isTimeType: true,
          // prop: "createTime",
          label: this.$t("property.开仓时间"),
          width: "50",
        },
        {
          coinMarketType: true,
          prop: "coinMarket",
          label: this.$t("property.合约"),
          width: "50",
        },
        {
          isdirectionType: true,
          // prop: "direction",//direction方向，1：买，2：卖 杠杆倍数leverTimes
          label: this.$t("property.方向 | 杠杆"),
          width: "50",
        },
        {
          text: true,
          prop: "positionAveragePrice",
          label: this.$t("property.开仓价格"),
          width: "50",
        },
        {
          text: true,
          prop: "closeAveragePrice",
          label: this.$t("property.平仓均价"),
          width: "50",
        },
        {
          text: true,
          prop: "maxPositionAmount",
          label: this.$t("property.最大持仓量"),
          width: "50",
        },
        {
          text: true,
          prop: "closedAmount",
          label: this.$t("property.已平仓量"),
          width: "50",
        },
        {
          realizedProfitLossType: true,
          prop: "realizedProfitLoss",
          label: this.$t("property.平仓盈亏"),
          width: "50",
        },
        {
          closePositionTimeTsLongType: true,
          // prop: "closePositionTimeTsLong",
          label: this.$t("property.平仓时间"),
          width: "50",
        },
        {
          poolRatioType: true,
          prop: "poolRatio",
          label: this.$t("property.瓜分比例"),
          width: "50",
        },
        {
          userProfitRatioType: true,
          prop: "userProfitRatio",
          label: this.$t("property.瓜分奖金池仓位已实现收益"),
          width: "50",
        },
        {
          poolProfitRatioType: true,
          prop: "poolProfitRatio",
          label: this.$t("property.已实现收益率"),
          width: "50",
        },
      ],
      positionOverviewData: [], //仓位总览
      dealColumnData: [
        {
          dealDirectionType: true,
          label: this.$t("property.方向 / 杠杆"),
          width: "50",
        },
        {
          isEntrustType: true,
          label: this.$t("property.类型"),
          width: "50",
        },
        {
          amountType: true,
          label: this.$t("property.成交数量/委托数量"),
          width: "50",
        },
        {
          text: true,
          prop: "handlingFee",
          label: this.$t("property.手续费"),
          width: "50",
        },
        {
          priceType: true,
          label: this.$t("property.成交价格/委托价格"),
          width: "50",
        },
        {
          entrustTimeType: true,
          label: this.$t("property.委托时间"),
          width: "50",
        },
        {
          dealTimeType: true,
          label: this.$t("property.成交时间"),
          width: "50",
        },
      ],
      dealData: [], //成交明细
      isStrong: false,
      strongClosePrice: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.dealData = this.detail.orders;
      this.positionOverviewData.push(this.detail);
      this.dealData.forEach((item) => {
        if (item.strongClosePrice) {
          this.strongClosePrice = item.strongClosePrice;
        }
      });
      this.isStrong = this.dealData.some((item) => {
        return item.detailType == 2;
      });
      this.editLabel();
    },
    //处理表格
    editLabel() {
      const mount = {
        strongCloseAmountType: true,
        prop: "strongCloseAmount",
        label: this.$t("contract.强平数量"),
        width: "50",
      };
      const price = {
        strongClosePriceType: true,
        prop: "strongClosePrice",
        label: this.$t("contract.强平价格"),
        width: "50",
      };
      if (this.isStrong) {
        this.dealColumnData.splice(2, 0, mount, price);
      }
    },

    back() {
      this.$emit("back");
    },
  },
};
</script>

<style lang="scss" scoped>
.transactionDetail {
  padding: 30px 80px 0 0;
  .detail-title {
    padding-top: 30px;
    margin-left: 74px;
    margin-bottom: 50px;
    .el-icon-arrow-left {
      padding-right: 20px;
      font-size: 24px;
      cursor: pointer;
    }
    span {
      font-size: 30px;
      cursor: pointer;
    }
  }
  .overview-title {
    font-size: 16px;
    font-weight: 500;
    color: #90ff00;
  }
  .title {
    font-size: 24px;
    font-weight: 500;
    color: #333333;
  }
  .position-overview {
    margin-top: 30px;
    background: #ffffff;
    border-radius: 15px;
    padding: 30px;
  }
  .transaction-detail {
    margin-top: 20px;
    background: #ffffff;
    border-radius: 15px;
    padding: 30px;
  }
  .leveling {
    font-size: 16px;
    .leveling-border {
      border-bottom: 1px solid #f5f5f5;
      margin: 10px 0;
    }
    .leveling-title {
      color: #00082d;
    }
    .leveling-time {
      font-size: 12px;
      color: #999;
      padding-left: 10px;
    }
    .leveling-text {
      font-size: 14px;
      color: #999;
      margin-top: 10px;
    }
    .leveling-more {
      color: #90ff00;
      padding-top: 15px;
      cursor: pointer;
    }
  }
}
</style>