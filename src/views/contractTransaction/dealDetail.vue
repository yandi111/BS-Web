<!-- 成交明细 -->
<template>
  <div class="main">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.back()"></i>
      <span>{{ "contract.仓位成交明细" | translate }}</span>
    </div>
    <div class="positonOverview">
      <span class="link">{{ "contract.仓位总览" | translate }}</span>
      <div class="table table1">
        <TableData
          v-if="overViewData.length"
          :columnData="overViewDataOptions"
          :tableData="overViewData"
          tableHeight="100px"
          :tableWidth="tableWidth"
        />
      </div>
    </div>
    <div class="dealDetail mt10">
      <span class="link">{{ "contract.成交明细" | translate }}</span>
      <div class="table">
        <TableData
          v-if="detailDataOptions.length"
          :tableData="renderDetailData"
          :columnData="detailDataOptions"
          :tableWidth="tableWidth"
          tableHeight="370px"
        />
      </div>
    </div>
    <div class="strongDetail" v-if="isStrong">
      <span class="title1">{{ "contract.强平详情" | translate }}</span>
      <div class="indr">
        <span>{{
          $t(
            "contract.X永续的标记价格到达X时,您的XX仓位的保证金率小于或等于100%，强制平仓将被触发。仓位按照标记价格X被强平引擎接管",
            [
              overViewData[0].coinMarket,
              strongPrice,
              overViewData[0].coinMarket,
              direction,
            ]
          )
        }}</span>
      </div>
      <div class="link" @click="(_) => $router.push('/forcedLiquidation')">
        <span>{{ "contract.关于强平" | translate }}</span>
        <i class="iconfont icon-left"></i>
      </div>
    </div>
  </div>
</template>

<script>
import TableData from "./tabsTable/components/tableData.vue";
import * as datas from "./tabsTable/js/data";
import * as api from "@/api/contractTransaction";
export default {
  name: "dealDetail",
  components: {
    TableData,
  },
  data() {
    return {
      strongPrice: undefined,
      overViewData: [],
      overViewDataOptions: [
        {
          text: true,
          prop: "createTime",
          label: "contract.开仓时间",
          width: "",
          minWidth: "150",
        },
        {
          contractType: true,
          prop: "coinMarket",
          label: "contract.合约",
          content: [
            { type: "text", name: "coinMarket" },
            { type: "tag", name: "$positionType", value: "positionType" },
          ],
          width: "",
          minWidth: "140",
        },
        {
          direction: true,
          prop: "direction",
          label: "contract.方向丨杠杆",
          width: "",
          minWidth: "120",

          content: [{ id: 0, type: "text" }],
        },
        {
          text: true,
          prop: "positionAveragePrice",
          label: "contract.开仓价格",
          width: "",
          minWidth: "120",
        },
        {
          text: true,
          prop: "closeAveragePrice",
          label: "contract.平仓价格",
          width: "",
          minWidth: "90",
        },
        {
          text: true,
          prop: "maxPositionAmount",
          label: "contract.最大持仓量",
          width: "",
          minWidth: "100",
        },
        {
          text: true,
          prop: "closedAmount",
          label: "contract.已平仓量",
          width: "",
          minWidth: "120",
        },
        {
          text: true,
          prop: "lastDealTime",
          label: "contract.平仓时间",
          width: "",
          minWidth: "160",
        },
        {
          profitLoss: true,
          prop: "realizedProfitLoss",
          label: "contract.平仓盈亏",
          content: [{ name: "realizedProfitLoss", type: "usdt" }],
          width: "",
          minWidth: "150",
        },
      ],
      detailData: [],
      detailDataOptions: [
        {
          e_direction: true,
          prop: "$directions",
          label: "contract.方向丨杠杆",
          content: [
            { id: 0, type: "text", name: "$direction" },
            { id: 0, type: "text", name: "$leverTimes" },
          ],
          width: "",
          minWidth: "130",
        },
        {
          text: true,
          prop: "entrustType",
          label: "contract.类型",
          width: "",
          minWidth: "120",
        },

        {
          text: true,
          prop: "dealAmount",
          label: "contract.成交数量丨委托数量",
          width: "",
          minWidth: "130",
        },
        {
          text: true,
          prop: "handlingFee",
          label: "contract.手续费",
          width: "",
          minWidth: "110",
        },
        {
          text: true,
          prop: "dealPrice",
          label: "contract.成交价格丨委托价格",
          width: "",
          minWidth: "150",
        },
        {
          text: true,
          prop: "entrustTime",
          label: "contract.委托时间",
          width: "",
          minWidth: "160",
        },
        {
          text: true,
          prop: "dealTime",
          label: "contract.成交时间",
          width: "",
          minWidth: "160",
        },
      ],
      renderDetailData: [],
      positionId: null,
      total: 1,
      pageSize: 6,
      pageNum: 1,
      isStrong: false,
      tableWidth: undefined,
    };
  },
  methods: {
    editLabel() {
      const mount = {
        text: true,
        prop: "strongCloseAmount",
        label: "lang_979",
        width: "",
        minWidth: "130",
      };
      const price = {
        text: true,
        prop: "strongClosePrice",
        label: "lang_774",
        width: "",
        minWidth: "130",
      };
      if (this.isStrong) {
        this.detailDataOptions.splice(2, 0, mount, price);
      }
    },
    getDetailData() {
      api.positionDetailApi({ positionId: this.positionId }).then((res) => {
        this.isStrong = res.data.data.orders.some((item) => {
          return item.detailType == 2;
        });

        this.editLabel();
        let obj = {};
        for (let key in res.data.data) {
          if (key !== "orders") {
            obj[key] = res.data.data[key];
          }
        }
        let arr = [obj];
        this.overViewData = arr.map((item) => {
          return {
            ...item,
            $positionType:
              item.positionType == 0
                ? `(${this.$t("lang_990")})`
                : `(${this.$t("lang_1087")})`,
            direction: `${
              item.positionDirection == 1
                ? `${this.$t("lang_1912")}`
                : `${this.$t("lang_1916")}`
            } 丨 ${item.leverage}X`,
          };
        });
        // console.log("this.overViewData", this.overViewData);

        //成交明细总数据
        this.detailData = res.data.data.orders.map((item) => {
          if (item.strongClosePrice) {
            this.strongPrice = item.strongClosePrice;
          }
          return {
            ...item,
            $direction: item.strongClosePrice
              ? item.directType == 2
                ? this.$t("lang_977")
                : this.$t("lang_978")
              : datas.options.priceType[[item.directType]],
            $leverTimes: ` 丨${item.leverTimes}X`,
            entrustType: datas.options.entrustType[[item.entrustType]],
            dealAmount: `${item.dealAmount ? item.dealAmount : "0"}/${
              item.entrustAmount ? item.entrustAmount : "0"
            }`,
            dealPrice: `${item.dealPrice ? item.dealPrice : "0"}/${
              item.entrustPrice ? item.entrustPrice : "0"
            }`,
            strongCloseAmount: item.strongCloseAmount
              ? item.strongCloseAmount + this.$t("contract.张")
              : "0",
            strongClosePrice: item.strongClosePrice
              ? item.strongClosePrice
              : "0",
            entrustTime: item.entrustTime ? item.entrustTime : "- -",
          };
        });

        // console.log('this.detailData',this.detailData);

        this.total = this.detailData.length;
        this.detailData.sort((a, b) => {
          return b.entrustTimeTsLong - a.entrustTimeTsLong;
        });
        // console.log("this.detailData", this.detailData);
        this.renderDetailData = this.detailData;
      });
    },
    // setPagination(num) {
    //   let start = (num - 1) * this.pageSize;
    //   let end =
    //     this.pageSize * num < this.total ? this.pageSize * num : this.total;
    //   this.renderDetailData = [...this.detailData.slice(start, end)];
    // },
    // changeNum(num) {
    //   this.setPagination(num);
    // },
    getTableSize() {
      let table = document.querySelector(".table");
      this.tableWidth = table.clientWidth + "px";
    },
  },
  computed: {
    direction() {
      let directType =
        this.overViewData[0].positionDirection == 1 ||
        this.overViewData[0].positionDirection == 2
          ? this.$t("lang_883")
          : this.$t("lang_935");
      let text = `${this.$t("lang_795")}-${directType}-${
        this.overViewData[0].leverage
      }X`;
      return text;
    },
  },
  mounted() {
    this.getTableSize();
    this.positionId = this.$route.query.positionId;
    this.getDetailData();
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: var(--gap-bg);
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    height: 73px;
    font-weight: 500;
    font-size: 24px;
    color: var(--main-text-color);
    padding: 0 200px;
    font-family: PingFangSC-Medium, PingFang SC;

    .iconfont {
      font-size: 30px;
      cursor: pointer;
    }
  }
  .positonOverview,
  .dealDetail {
    padding: 20px 210px;
    background-color: var(--main-bg);
    .table {
      width: 100%;
      margin-top: 15px;
    }
    ::v-deep .table-data .profitLoss .box {
      justify-content: flex-start;
    }
    .link {
      font-size: 16px;
      font-weight: 700;
      color: var(--main-text-color);
      text-decoration: underline;
      margin-bottom: 50px;
      cursor: pointer;
    }
  }
  .dealDetail {
    flex: 1;
    background-color: var(--main-bg);
  }
  .strongDetail {
    font-size: 16px;
    padding: 0 210px 40px;
    background-color: var(--main-bg);

    .title1 {
      color: var(--main-text-color);
      font-weight: 700;
      margin-bottom: 10px;
    }
    .indr {
      display: flex;
      align-items: center;
      color: #96a2b2;
      padding: 10px 0;
      .price {
        color: var(--main-text-color);
      }
    }
    .link {
      display: flex;
      align-items: center;
      color: var(--theme-color);
      font-weight: 700;
      cursor: pointer;
      .iconfont {
        font-size: 22px;
        transform: rotate(180deg);
      }
    }
  }
  #pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 210px 0 0;
    background-color: var(--main-bg);
  }
  ::v-deep .el-table {
    background-color: var(--main-bg);
    z-index: 0;

    tbody {
      tr {
        // background-color: var(--main-bg);
      }
    }
  }
  ::v-deep .el-table thead tr th.is-leaf {
    background-color: var(--detail-table-header);
    color: #666666;
    padding: 8px 0;
  }
  ::v-deep .el-table--scrollable-x .el-table__body-wrapper {
    background-color: var(--main-bg);
  }
  ::v-deep .el-table__body-wrapper {
    background-color: var(--main-bg);
  }
  ::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: var(--row-hover-bg);
  }
}
</style>
