<template>
  <div class="layout">
    <div class="tab-head">
      <span class="tab-arrow">
        <i class="el-icon-arrow-left" @click="handleBack"></i>
      </span>
      <div class="tab" :class="{ dark: getTheme == 'dark' }">
        <div
          class="item"
          v-for="item in navList"
          :key="item.id"
          :class="{ active: currentIndex === item.id }"
          @click="changeTab(item.id)"
        >
          {{ item.label | translate }}
        </div>
      </div>
    </div>

    <div class="header" v-if="currentIndex == 0">
      <div
        class="header-select"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
      >
        <div class="select-text">{{ chooseText }} {{ $t("rules.永续") }}</div>
        <div class="select-icon">
          <i v-if="!isShow" class="el-icon-caret-bottom"></i>
          <i v-else class="el-icon-caret-top"></i>
        </div>
        <search-select
          ref="searchRef"
          :show.sync="isShow"
          :list="symbolList"
          :id="activeId"
          @handleSearch="handleSearch"
          @handleChoose="handleChoose"
        ></search-select>
      </div>
    </div>
    <div id="container">
      <div class="content" v-if="currentIndex == 0">
        <div class="chart">
          <rate-chart
            ref="rateChart"
            v-if="chartList.length"
            :list="chartList"
          ></rate-chart>
        </div>
        <div class="table">
          <rate-table
            :columnData="rateHistorycolumn"
            :tableData="rateHistoryList"
            :paginationShow="true"
            :total="total"
            :page.sync="rateForm.pageNum"
            @current-change="currentChange"
          ></rate-table>
        </div>
      </div>
      <div class="content" v-else>
        <div class="rate">
          <div class="rate-table">
            <rate-table :columnData="ratecolumn" :tableData="rateList">
            </rate-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelect from "../components/searchSelect.vue";
import {
  symbolListApi,
  fundingRateList,
  fundingRateHistory,
  fundingRateChart,
} from "@/api/contractTransaction";
import RateChart from "../components/rateChart.vue";
import RateTable from "../components/rateTable.vue";
import { countDownFun } from './js/time'
export default {
  name: "FundingRate",
  components: {
    SearchSelect,
    RateChart,
    RateTable,
  },
  data() {
    return {
      isShow: false,
      chooseText: "",
      symbolList: [],
      symbolSearchList: [],
      activeId: null,
      activeName: "first",
      navList: [
        { label: "rules.资金费率历史", id: 0 },
        { label: "rules.资金费率对比", id: 1 },
      ],
      currentIndex: 0,
      rateHistorycolumn: [
        {
          isTime: true,
          prop: "timeTsLong",
          sortable: false,
          sortorders: ["ascending", "descending"],
          label: this.$t("rules.时间"),
          width: "",
        },
        {
          estimateFundingRate: true,
          prop: "estimateFundingRate",
          label: this.$t("rules.预计资金费率"),
          width: "",
          sortable: false,
          sortorders: ["ascending", "descending"],
        },
        {
          curFundingRate: true,
          prop: "curFundingRate",
          label: this.$t("rules.当前资金费率"),
          width: "20",
          sortable: false,
          sortorders: ["ascending", "descending"],
        },
      ],
      rateHistoryList: [],
      ratecolumn: [
        {
          text: true,
          prop: "symbol",
          sortable: false,
          sortorders: ["ascending", "descending"],
          label: this.$t("rules.USDT本位"),
          width: "",
        },
        {
          curFundingRateC: true,
          prop: "curFundingRate",
          label: this.$t("rules.当前资金费率"),
          width: "",
          sortable: "custom",
          sortorders: ["ascending", "descending"],
        },
        {
          estimateFundingRateC: true,
          prop: "estimateFundingRate",
          label: this.$t("rules.预计资金费率"),
          width: "",
          sortable: "custom",
          sortorders: ["ascending", "descending"],
        },
        {
          countdownType: true,
          prop: "countDownTime",
          label: this.$t("rules.距费用结算"),
          width: "50",
        },
      ],
      rateList: [],
      rateForm: {
        symbol: null,
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      chartList: [],
       temp: null, //倒计时初始
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  mounted() {
    this.init();
  },
   destroyed() {
    //切记页面销毁需要销毁
    clearInterval(this.temp);
  },
  methods: {
    mouseenter() {
      this.isShow = true;
      this.handleSearch();
    },
    mouseleave() {
      this.isShow = false;
      this.$refs.searchRef.initVal();
    },
    handleChoose(row) {
      this.chooseText = row.symbolKey;
      this.rateForm.symbol = row.symbolCode;
      this.getFundingRateHistory();
      this.getFundingRateChart();
    },
    changeTab(id) {
      this.currentIndex = id;
      if (this.currentIndex == 1) {
        this.getFundingRateList();
         clearInterval(this.temp);
      } else {
        this.getFundingRateChart();
      }
    },
    init() {
      this.getSymbolList();
    },
    getSymbolList() {
      let routeSymbol = this.$route.query.code;
      let routeSymbolId = Number(this.$route.query.rid);
      symbolListApi().then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          data.forEach((item) => {
            item.symbolKey = item.symbolKey.toUpperCase();
          });
          this.symbolList = this.symbolList.concat(data);
          this.symbolSearchList = this.symbolList;
          this.activeId = routeSymbolId ? routeSymbolId : this.symbolList[0].id;
          this.chooseText = routeSymbol
            ? routeSymbol
            : this.symbolList[0].symbolKey;
          this.rateForm.symbol = routeSymbol
            ? routeSymbol
            : this.symbolList[0].symbolCode;
          this.getFundingRateHistory();
          this.getFundingRateChart();
        }
      });
    },
    //资金费率图表
    getFundingRateChart() {
      let endTime = new Date().getTime();
      let startTime = endTime - 7 * 24 * 3600 * 1000;
      fundingRateChart({
        symbol: this.rateForm.symbol,
        startTime: startTime,
        endTime: endTime,
      }).then((res) => {
        if (res.status === 200) {
          this.chartList = res.data.data;
          this.$nextTick(() => {
            this.$refs.rateChart.initChart();
          });
        }
      });
    },
    // 资金费率列表
    getFundingRateList() {
      fundingRateList().then((res) => {
        if (res.status === 200) {
          let arr = res.data.data
          let newArr = arr.map(item=>{
            return {
              dayTime: null,
              ...item
            }
          })
          this.rateList = newArr
          this.timer()
        }
      });
    },
    // 资金费率历史
    getFundingRateHistory() {
      fundingRateHistory(this.rateForm).then((res) => {
        if (res.status === 200) {
          this.rateHistoryList = res.data.data.records || [];
          this.total = res.data.data.total;
        }
      });
    },
    //倒计时
     timer() {
      //页面多个定时器 //主要逻辑都在这页面更新
      let _that = this;
      this.temp = setInterval(() => {
        _that.rateList.forEach((item, index) => {
          item.countDownTime = item.countDownTime - 1;
          item.dayTime = countDownFun(item.countDownTime);
          _that.$set(_that.rateList, item.dayTime, countDownFun(item.countDownTime));
        });
      }, 1000);
    },

    handleTabs(tab) {
      if (tab.name === "second") {
        this.getFundingRateList();
      }
    },
    //翻页功能
    currentChange(val) {
      this.rateForm.pageNum = val.page;
      this.getFundingRateHistory();
    },
    //搜索
    handleSearch(val) {
      let dataArr = [];
      let searchVal = val && val.toUpperCase().trim();
      if (searchVal) {
        this.symbolSearchList.filter((item) => {
          if (item.symbolKey.indexOf(searchVal) != -1) {
            dataArr.push(item);
          }
        });
      } else {
        dataArr = this.symbolSearchList;
      }
      this.symbolList = dataArr;
    },
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  color: var(--main-text-color);
  .tab-head {
    display: flex;
    .tab-arrow {
      margin: 30px 0 0 105px;
      display: flex;
      align-items: center;
      padding-right: 20px;
      .el-icon-arrow-left {
        cursor: pointer;
        font-size: 20px;
      }
    }
  }
  .header {
    width: 100%;
    padding: 30px 0 0 90px;
    display: flex;
    align-items: center;
    .header-icon {
      .el-icon-arrow-left {
        cursor: pointer;
        font-size: 20px;
      }
    }
    .header-select {
      position: relative;
      margin-left: 9px;
      display: flex;
      cursor: pointer;
      .select-text {
        font-size: 24px;
      }
      .select-icon {
        display: flex;
        align-items: center;
        margin-left: 10px;
        .el-icon-caret-bottom {
          font-size: 20px;
        }
        .el-icon-caret-top {
          font-size: 20px;
        }
      }
    }
  }
  .tab {
    display: flex;
    height: 40px;
    margin: 40px 105px 0 0;
    // border-bottom: 1px solid #f4f5f7;
    &.dark {
      border-bottom: 1px solid #333333;
    }
    .item {
      color: #96a2b2;
      font-size: 20px;
      margin-right: 40px;
      cursor: pointer;
    }
    .active {
      position: relative;
      color: var(--main-text-color);
      &::after {
        position: absolute;
        left: 50%;
        bottom: -1px;
        content: "";
        transform: translateX(-50%);
        width: 80%;
        height: 2px;
        background-color: var(--theme-color);
        opacity: 0.9;
      }
    }
  }
  #container {
    width: 100%;
    height: calc(100vh - 140px);
    padding: 30px 105px 100px 105px;
    .content {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track-piece {
        background-color: var(--select-bg);
        border-radius: 3px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba($color: #e1e1e1, $alpha: 0.2);
        border-radius: 3px;
      }
      .rate {
        .rate-title {
          font-size: 16px;
          margin: 20px 0;
          color: #96a2b2;
          span {
            color: var(--main-text-color);
          }
        }
      }
    }
  }
}
</style>
