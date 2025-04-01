<script>
import Search from "./components/search.vue";
import { symbolListApi, $getLevergeonCal } from "@/api/contractTransaction";
import First from "./components/first.vue";
import Second from "./components/second.vue";
import Three from "./components/three.vue";
import Four from "./components/four.vue";
import Five from "./components/five.vue";
import { mapState } from "vuex";
export default {
  name: "web-calculator",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Search,
    First,
    Second,
    Three,
    Four,
    Five,
  },
  data() {
    return {
      tabList: [
        { label: "calculator.标题-收益", id: 0 },
        { label: "calculator.标题-目标价格", id: 1 },
        { label: "calculator.标题-强平价格", id: 2 },
        { label: "calculator.标题-可开", id: 3 },
        { label: "calculator.标题-开仓价格", id: 4 },
      ],
      currentIndex: 0,
      search_isShow: false,
      symbolList: [],
      symbolSearchList: [],
      activeId: undefined,
      coinId: undefined,
      chooseText: undefined,
      currenMarket: undefined,
      marks: undefined, //最大杠杆
      max: undefined,
      symbolInfo: {},
      maintenanceMarginRatio: undefined, //维持保证金率
    };
  },
  methods: {
    closeMask() {
      this.$emit("update:isShow", false);
    },

    toggleSearchShow() {
      this.search_isShow = !this.search_isShow;
      if (this.search_isShow) {
        this.$refs.searchRef.initVal();
      }
    },
    changeTab(id) {
      this.currentIndex = id;
    },

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
    handleChoose(row) {
      // console.log("row", row);
      this.coinId = row.coinId;
      this.chooseText = row.symbolKey;
      this.symbolInfo = row;
      this.getGearinfoApi(this.symbolInfo.symbolCode);
    },
    getSymbolList() {
      symbolListApi().then((res) => {
        if (res.status == 200) {
          this.symbolList = res.data.data.map((item) => {
            return {
              id: item.id,
              symbolKey:
                item.symbolKey.toUpperCase() + ` ${this.$t("calculator.永续")}`,
              symbolCode: item.symbolCode,
              faceValue: item.faceValue,
              coinId: item.baseAssetId,
              priceDecimal: item.priceDecimal,
              keepMarginRate: item.keepMarginRate,
              openTakerFee: item.openTakerFee,
            };
          });

          this.symbolSearchList = [...this.symbolList];

          //选取当前交易对
          this.symbolList.forEach((item) => {
            if (item.symbolCode == this.currenMarket) {
              this.activeId = item.id;
              this.chooseText = item.symbolKey;
              this.coinId = item.coinId;
              this.symbolInfo = item;
            }
          });
          // console.log("this.yb", this.symbolInfo);
        }
      });
    },
    //获取交易对杠杆倍数
    getGearinfoApi(symbol) {
      $getLevergeonCal({ coinMarket: symbol }).then((res) => {
        // console.log("res.data", res.data);
        if (res.status == 200 && res.data.success) {
          this.maintenanceMarginRatio =
            res.data.data[0]?.maintenanceMarginRatio;
          let max = res.data.data[0]?.maximumLeverage;
          this.max = max;
          let obj = {
            1: "1X",
          };
          let num = 5;
          let d = max / num;
          for (let i = 1; i <= num; i++) {
            //等差数列 第n项
            let an = d + d * (i - 1);
            obj[an] = an + "X";
          }
          this.marks = obj;
        }
      });
    },
  },
  mounted() {
    this.getSymbolList();
  },
  computed: {
    ...mapState(["setting"]),
  },
  watch: {
    "setting.currentMarket": {
      handler(value) {
        this.currenMarket = value;
        //选取当前交易对
        this.symbolList.forEach((item) => {
          // console.log("item", item);
          if (item.symbolCode == this.currenMarket) {
            this.activeId = item.id;
            this.chooseText = item.symbolKey;
            this.coinId = item.coinId;
            this.symbolInfo = item;
          }
        });
      },
      immediate: true,
    },
    isShow: {
      handler(flag) {
        if (flag) {
          this.getGearinfoApi(this.symbolInfo.symbolCode);
        }
      },
    },
  },
};
</script>

<template>
  <div id="mask" v-if="isShow">
    <div class="box">
      <div class="title">
        <div class="symbol" :class="{ active: search_isShow }">
          <div class="chooseTextBox df aic" @click="toggleSearchShow">
            <div class="text">{{ chooseText }}</div>
            <i
              class="iconfont"
              :class="search_isShow ? 'icon-up' : 'icon-down'"
            ></i>
          </div>
          <Search
            ref="searchRef"
            :show.sync="search_isShow"
            :list="symbolList"
            :id="activeId"
            @handleSearch="handleSearch"
            @handleChoose="handleChoose"
          />
        </div>
        <i class="iconfont icon-close close" @click="closeMask"></i>
      </div>
      <div class="tab df aic">
        <div
          class="item"
          v-for="item in tabList"
          :key="item.id"
          :class="{ active: item.id == currentIndex }"
          @click="changeTab(item.id)"
        >
          {{ item.label | translate }}
        </div>
      </div>
      <div id="content">
        <First
          :marks="marks"
          :max="max"
          :symbolInfo="symbolInfo"
          v-if="currentIndex == 0"
        />
        <Second
          :marks="marks"
          :max="max"
          :symbolInfo="symbolInfo"
          v-else-if="currentIndex == 1"
        />
        <Three
          :marks="marks"
          :max="max"
          :symbolInfo="symbolInfo"
          :maintenanceMarginRatio="maintenanceMarginRatio"
          v-else-if="currentIndex == 2"
        />
        <Four
          :marks="marks"
          :max="max"
          :symbolInfo="symbolInfo"
          v-else-if="currentIndex == 3"
        />
        <Five :symbolInfo="symbolInfo" v-else />
        <div class="tips">
          <span>{{
            $t(
              "calculator.提前查看交易的潜在风险和回报。通过使用合约计算器来了解交易在盈利或者亏损"
            )
          }}</span>
          <span
            class="illustrate"
            @click="
              $router.push({
                name: 'calculatorInstructions',
              })
            "
            >{{ $t("calculator.使用说明") }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  // z-index: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  .box {
    position: absolute;
    left: 50%;
    top: 130px;
    transform: translateX(-50%);
    width: 630px;
    padding: 30px;
    background-color: var(--pop-bg);
    border-radius: 15px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      .symbol {
        position: relative;
        display: flex;
        align-items: center;
        min-width: 180px;
        height: 30px;
        padding-left: 10px;
        padding-right: 20px;
        background-color: var(--calculator-content-bg);
        border: 1px solid transparent;
        border-radius: 6px;
        z-index: 99999;
        cursor: pointer;
        .chooseTextBox {
          width: 100%;
          .text {
            font-size: 16px;
            color: var(--main-text-color);
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: 30px;
          }
          i {
            font-size: 20px;
          }
          &.active {
            border: 1px solid var(--theme-color);
          }
        }
      }
      .close {
        font-size: 20px;
        cursor: pointer;
        color: #8992a6;
      }
    }
    .tab {
      margin: 20px 0px;
      .item {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #96a2b2;
        margin-right: 20px;
        cursor: pointer;
        &.active {
          position: relative;
          color: var(--main-text-color);
          &::after {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 50%;
            height: 2px;
            background-color: var(--theme-color);
          }
        }
      }
    }
    #content {
      position: relative;
      padding-top: 10px;
      // z-index: 99999;
      .tips {
        margin-top: 20px;
        font-size: 12px;
        color: #96a2b2;
        .illustrate {
          color: var(--theme-color);
          cursor: pointer;
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
