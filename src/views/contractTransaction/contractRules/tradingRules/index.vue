<template>
  <div class="layout">
    <div class="header">
      <div class="header-icon" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
      </div>
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
    <div class="content" :class="{ dark: getTheme == 'dark' }">
      <div
        class="cell df aic jb mb10"
        v-for="item in rulesList"
        :key="item.label"
      >
        <span class="label">{{ item.label | translate }}</span>
        <span class="value">{{ item.value ? item.value : "- -" }}</span>
      </div>
      <div class="checkrules" @click="onLink">
        {{ $t("rules.查看所有合约交易规则") }}
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelect from "../components/searchSelect.vue";
import { symbolListApi, symbolDetail } from "@/api/contractTransaction";
import { mapGetters } from "vuex";
export default {
  name: "TradingRules",
  components: {
    SearchSelect,
  },
  data() {
    return {
      isShow: false,
      chooseText: "",
      symbolList: [],
      symbolSearchList: [],
      rulesList: [],
      activeId: null,
      coinId: 1,
      contractInfo: {}, //合约信息
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  methods: {
    mouseenter() {
      this.isShow = true;
      // this.handleSearch();
    },
    mouseleave() {
      this.isShow = false;
      this.$refs.searchRef.initVal();
    },
    handleChoose(row) {
      // console.log("row", row);
      this.chooseText = row.symbolKey;
      this.coinId = row.baseAssetId;
    },
    init() {
      this.getSymbolList();
    },
    //获取交易对
    getSymbolList() {
      symbolListApi().then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          data.forEach((item) => {
            item.symbolKey = item.symbolKey.toUpperCase();
          });
          this.symbolList = this.symbolList.concat(data);
          this.symbolSearchList = this.symbolList;
          this.activeId = this.symbolList[0].id;
          this.chooseText = this.symbolList[0].symbolKey;
          this.coinId = this.symbolList[0].baseAssetId;
        }
      });
    },
    getTradingRules() {
      symbolDetail({ coinId: this.coinId }).then((res) => {
        this.contractInfo = res.data.data;
        let data = res.data.data;
        console.log("data", data);
        this.rulesList = [
          { label: "rules.合约类型", value: data.marketType },
          { label: "rules.保证金币种", value: data.quoteAssetCode },
          { label: "rules.价格乘数", value: data.priceDecimal },
          { label: "rules.数量乘数", value: data.qtyDecimal },
          {
            label: this.$t("rules.最小委托量(BTC)", [data.baseAssetCode]),
            value: data.singleMinQty,
          },
          {
            label: this.$t("rules.最大委托量(BTC)", [data.baseAssetCode]),
            value: data.singleMaxQty,
          },
          { label: "rules.最小委托量(USDT)", value: data.singleMinQuoteQty },
          { label: "rules.最大委托量(USDT)", value: data.singleMaxQuoteQty },
          { label: "rules.最大杠杆倍数", value: data.maxLever },
          { label: "rules.下次结算资金费率", value: data.fundingRate + "%" },
          { label: "rules.资金费率结算周期", value: this.splitTimestamp() },
          { label: "rules.合约面值", value: data.faceValue },
          { label: "rules.张数定义", value: this.$t("rules.价格*面值") },
          {
            label: "rules.指数来源",
            value: this.$t("rules.取多家主流交易所的平均现货价格"),
          },
        ];
      });
    },
    splitTimestamp() {
      let timestampArray =
        this.contractInfo.fundingRateSettlementCycle.split(",");
      let arr = [];
      timestampArray.forEach((item) => {
        arr.push(this.processingTimestamps(item));
      });
      let timestampString = arr.join();
      return timestampString;
    },

    processingTimestamps(time) {
      let date = new Date(time * 1);
      const h = date.getHours() + ":";
      const m = date.getMinutes() + ":";
      const s = date.getSeconds();
      return h + m + s;
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
    onLink() {
      this.$router.push("/rulesAll");
    },
  },
  watch: {
    chooseText: {
      handler(type) {
        // let coinMarket =
        //   type.slice(0, type.length - 4) + "/" + type.slice(type.length - 4);
        this.getTradingRules();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  color: var(--main-text-color);
  background-color: var(--main-bg);
  .header {
    width: 100%;
    padding: 30px 0 0 75px;
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
        font-size: 30px;
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
  .content {
    width: 100%;
    padding: 30px 0 0 112px;
    &.dark {
      .cell {
        .value {
          color: #ffffff;
        }
      }
    }
    .cell {
      width: 732px;
      font-size: 14px;
      color: #96a2b2;
      font-weight: 500;
      .value {
        color: #00082d;
      }
    }
    .checkrules {
      margin-top: 60px;
      font-size: 14px;
      color: var(--theme-color);
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>
