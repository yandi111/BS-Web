<template>
  <div class="rulesAll">
    <Header></Header>
    <div class="container">
      <div class="title">
        <i class="iconfont icon-left" @click="$router.back()"></i>
        <span class="label">{{ $t("rules.交易规则") }}</span>
      </div>
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
      <div class="content">
        <div class="box" v-if="currentIndex == 0">
          <div class="top">
            <p class="tip mt10">
              {{
                $t(
                  "rules.*每位用户每个合约下，可以同时处于挂单状态的条件单（包括止盈止损、市价止盈止损、计划委托）上限为10单。条件单挂单包括在最大挂单数量里。"
                )
              }}
            </p>
            <div class="searchBox" :class="{ dark: getTheme == 'dark' }">
              <i class="iconfont icon-search"></i>
              <input
                type="text"
                v-model="searchValue"
                :placeholder="$t('rules.输入交易对')"
                @input="onSearch"
              />
              <i
                class="iconfont icon-close2 delete"
                v-if="searchValue"
                @click="onClear"
              ></i>
            </div>
          </div>
          <div class="table">
            <rulesTable
              :columnLabel="columnLabel"
              :data="rulesRes"
              :height="rulesDataHeight"
              v-if="rulesData.length"
            />
            <myEmpty v-else />
          </div>
        </div>
        <div class="box" v-else>
          <div class="top">
            <p class="tip mt10">
              {{ $t("rules.初始保证金 = 仓位名义价值 / 杠杆倍数") }}
            </p>
            <p class="tip mt5">
              {{
                $t(
                  "rules.维持保证金 = 仓位名义价值 * 维持保证金率 - 维持保证金速算额"
                )
              }}
            </p>
            <div class="df aic jb">
              <div class="searchBox" :class="{ dark: getTheme == 'dark' }">
                <span>{{ $t("rules.合约") }}</span>
                <mySelect
                  :options="symbolOptions"
                  v-model="symbolValue"
                  :width="150"
                />
              </div>
              <div class="more pointer" @click="learnMore">
                <i class="iconfont icon-more"></i>
                <span>{{ $t("rules.了解更多") }}</span>
              </div>
            </div>
          </div>
          <div class="tabel">
            <rulesTable
              :columnLabel="columnLabel"
              :data="leverageData"
              height="250px"
              v-if="leverageData.length"
            />
            <myEmpty v-else />
          </div>

          <div class="instructions" v-if="leverageData.length">
            <p>
              *{{ $t("rules.规则更新时间:") }} 2023/03/06 14:04<br />
              *{{
                $t("rules.最大杠杆倍数为125倍的U本位合约包括: BTCUSDT 永续")
              }}
            </p>
            <p class="mt15">
              {{
                $t(
                  "rules.请注意，在异常价格波动和极端市场行情下，币安会采取额外的措施来维护市场稳定，包括但不限于："
                )
              }}<br />
              1. {{ $t("rules.调整最高杠杆倍数") }} <br />2.
              {{ $t("rules.调整不同层级的仓位限制") }} <br />3.
              {{ $t("rules.调整不同层级的维持保证金比率") }}
            </p>
            <p class="mt10">
              {{
                $t(
                  "rules..開通合約賬戶60天內的新用戶不得使用超過20x槓桿進行合約交易。"
                )
              }}
              <span class="link" @click="learnMore">{{
                $t("rules.了解更多")
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import rulesTable from "./components/rulesTable.vue";
import mySelect from "@/components/my-select/my-select.vue";
import { rulesLabel, leverageLabel } from "./js/labelData.js";
import {
  symbolListApi,
  appSymbolList,
  symbolDetail,
} from "@/api/contractTransaction";
import debounce from "./js/debounce";
import { mapGetters } from "vuex";
export default {
  name: "rulesAll",
  components: {
    Header,
    Footer,
    rulesTable,
    mySelect,
  },
  props: {},

  data() {
    return {
      searchValue: "",
      activeName: "first",
      navList: [
        { label: "rules.交易规则", id: 0 },
        { label: "rules.仓位档位", id: 1 },
      ],
      currentIndex: 0,
      columnLabel: [], //表头列表
      rulesData: [],
      rulesRes: [],
      rulesDataHeight: "",
      leverageData: [],
      total: undefined,
      pageSize: 5,
      pageNum: 1,
      symbolList: [],
      symbolValue: "btcusdt",
      symbolOptions: [],
      bouncedIsShow: false,
      submitParams: {
        symbolCode: "BTC/USDT",
        coinId: 1,
      },
    };
  },

  methods: {
    changeTab(id) {
      this.currentIndex = id;
      this.columnLabel = id ? leverageLabel : rulesLabel;
      this.getListData();
    },
    learnMore() {
      this.$router.push("/contractRules/leverageMargin");
    },
    changePage(index) {
      // console.log("index", index);
    },
    //获取交易对
    getSymbolList() {
      symbolListApi().then((res) => {
        this.symbolOptions = res.data.data.map((item) => {
          return {
            label: `${item.symbolKey.toUpperCase()} ${this.$t("rules.永续")}`,
            value: item.symbolKey,
            symbolCode: item.symbolCode,
            coinId: item.baseAssetId,
          };
        });
        this.changeTab(0);
      });
    },
    // onSearch(){
    //   let key = this.searchValue?.trim()
    //   console.log('key',key);
    //   this.rulesData.filter((item) => {
    //     console.log('prompt',item);

    //   })
    onClear() {
      this.searchValue = "";
      this.onSearch();
    },
    onSearch: debounce(function () {
      let searchKey = this.searchValue?.trim();
      searchKey = searchKey.toUpperCase();
      if (searchKey) {
        this.rulesRes = this.rulesData.filter((item) => {
          return item.symbolCode.includes(searchKey);
        });
      } else {
        this.rulesRes = this.rulesData;
      }
      // console.log('this.rulesRes',this.rulesRes);
      // console.log("arr", rulesRes);
    }),

    getListData() {
      if (this.currentIndex) {
        let params = {
          coinMarket: this.submitParams.symbolCode,
        };
        //仓位档位
        appSymbolList(params).then((res) => {
          this.leverageData = res.data.data.map((item, index) => {
            return {
              index: index + 1,
              ...item,
            };
          });
        });
      } else {
        //交易规则
        this.symbolOptions.forEach((item) => {
          symbolDetail({ coinId: item.coinId }).then((res) => {
            let obj = res.data.data;
            obj.definition = this.$t("rules.价格*面值");
            obj.dataSources = this.$t("rules.取多家主流交易所的平均现货价格");
            obj.fundingRateSettlementCycle = this.splitTimestamp(
              obj.fundingRateSettlementCycle
            );
            this.rulesData.push(obj);
            this.rulesRes = [...this.rulesData];
          });
        });
      }
    },
    //分割时间戳
    splitTimestamp(val) {
      let timestampArray = val.split(",");
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

    visibleChange(flag) {
      this.bouncedIsShow = flag;
    },
    getScreenSize() {
      let height = document.body.clientHeight;
      if (height < 800) {
        this.rulesDataHeight = `480px`;
      } else {
        this.rulesDataHeight = `620px`;
      }
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  mounted() {
    this.getScreenSize();
    this.getSymbolList();
  },
  watch: {
    symbolValue: {
      handler(symbolValue) {
        this.submitParams = this.symbolOptions.filter((item) => {
          return item.value == symbolValue;
        })[0];
        this.getListData();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.rulesAll {
  height: 100%;
  background-color: var(--main-bg);
  .container {
    width: 100%;
    padding: 40px 210px;
    background-color: var(--main-bg);
    .title {
      display: flex;
      align-items: center;
      height: 40px;
      color: var(--main-text-color);
      margin-bottom: 40px;

      .iconfont {
        font-size: 34px;
        margin-top: 3px;
        cursor: pointer;
      }
      .label {
        font-weight: 500;
        font-size: 33px;
      }
    }
    .tab {
      display: flex;
      height: 40px;
      border-bottom: 1px solid #f4f5f7;
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
    .content {
      .top {
        .more {
          display: flex;
          align-items: center;
          color: #96a2b2;
          &:hover {
            color: var(--theme-color);
          }
          .icon-more {
            font-size: 26px;
            margin-right: 5px;
          }
        }

        .tip {
          font-size: 14px;
          color: #96a2b2;
        }
        .searchBox {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 320px;
          height: 40px;
          border: 1px solid #e1e1e1;
          padding-left: 10px;
          margin: 20px 0;
          border-radius: 6px;
          &.dark {
            border: 1px solid #333333;
            input {
              background-color: var(--main-bg);
            }
          }
          .iconfont {
            font-size: 24px;
            color: #aaa8a8;
          }
          .select-icon {
            background-color: #fff;
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            font-size: 28px;
            color: #00082d;
          }
          input {
            flex: 1;
            padding-left: 10px;
            color: #666666;
            border: none;
            outline: none;
          }
          .delete {
            color: #aaa8a8;
            font-size: 24px;
            cursor: pointer;
          }
          span {
            font-size: 14px;
            color: #96a2b2;
          }
          ::v-deep .selectBox .select {
            border: none;
          }
        }
      }
      .instructions {
        margin-top: 15px;
        p {
          font-size: 14px;
          color: #96a2b2;
          line-height: 28px;
        }
        .link {
          color: var(--theme-color);
          cursor: pointer;
        }
      }
    }
    .pagination {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 50px;
      // background-color: blue;
    }
  }
}
</style>
