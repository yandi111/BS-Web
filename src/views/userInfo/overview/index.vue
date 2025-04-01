<!-- 个人中心-总览 -->
<template>
 <div style="padding: 30px 40px">
  <userBasicInformation />
 </div>
</template>

<script>
import userBasicInformation from "./components/userBasicInformation.vue";
import { sumAccountApi, simpleApi } from "@/api/assetWallet";
import { favoriteApi } from "@/api/quotes";
import {
  announceListApi,
} from "@/api/user";
import { swiperList } from "@/api/home";
import { getExchange } from "@/libs/utils";
import {  mapActions} from "vuex";

export default {
  name: "overview",
  // mixins: [webSocketMixin],
  components: {
    userBasicInformation,
  },
  data() {
    return {
      status: {
        NOT_SUBMIT: this.$t("userInfo.未认证"),
        WAIT: this.$t("userInfo.待审核"),
        PASS: this.$t("userInfo.已认证"),
        FAIL: this.$t("userInfo.认证失败"),
      },
      activeIndex: 0,
      reviewInfo: {},
      isEditShow: false,
      tabsActive: 2,
      btnActive: 1,
      marketType: "USDT_M_FUTURE", //默认合约
      tabsList: [
        {
          value: 1,
          label: this.$t("userInfo.自选"),
        },
        {
          value: 2,
          label: this.$t("userInfo.合约"),
        },
        {
          value: 3,
          label: this.$t("userInfo.现货"),
        },
      ],
      tabBtnList: [
        {
          id: 1,
          label: this.$t("userInfo.合约"),
        },
        {
          id: 2,
          label: this.$t("userInfo.现货"),
        },
      ],
      symbolCode: null,
      popularColumnData: [
        {
          isSymbolType: true,
          sortable: "custom",
          prop: "symbol",
          sortorders: ["ascending", "descending"],
          label: this.$t("property.币种"),
          width: "180",
        },
        {
          lastPriceType: true,
          sortable: "custom",
          sortorders: ["ascending", "descending"],
          prop: "lastPrice",
          label: this.$t("userInfo.最新价"),
          width: "100",
        },
        {
          volOf24hType: true,
          sortable: "custom",
          sortorders: ["ascending", "descending"],
          prop: "volOf24h",
          label: this.$t("userInfo.24h交易量"),
          width: "150",
        },
        {
          changeType: true,
          sortable: "custom",
          sortorders: ["ascending", "descending"],
          prop: "change",
          label: this.$t("userInfo.24h涨跌"),
          width: "150",
        },
        {
          isOperation: true,
          label: "",
          width: "80",
          sortable: false,
          operation: [
            {
              type: "text",
              label: this.$t("userInfo.交易"),
              icon: "",
              color: "#5771F5",
              buttonClick: this.handleTrade,
              isShow: () => {
                return true;
              },
            },
          ],
        },
      ],
      popularData: [], //合约
      optionalData: [],
      eyeShow: 1,
      coinValue: null,
      conversionList: [], // 查可换算币种
      //接口数据
      sumAccount: "", //总资产
      transferSumAccount: "", //约等于多少法币(总资产)
      bannerImg: "",
      announceParams: {
        pageNum: 1,
        pageSize: 3,
        search: "",
        systemType: 2,
        // language:'en_us'
      },
      announceList: [],
      coinName: "", //选择币种
      unitAssetName: "", //默认汇率
      // bannerParams: { bannerPositionIds: [9], deviceType: 3 },
      topic: 0, //0白天，1黑夜
      spotData: [], //现货
      spotOptionalData: [], //现货自选
    };
  },
  mounted() {

    this.fetchUserInfo();
  },
  methods: {
    ...mapActions(['fetchUserInfo']),


    //总资产估值
    getSumAccount(coinName) {
      this.unitAssetName = getExchange();
      sumAccountApi({
        type: 0,
        unitAssetName: this.unitAssetName, // 取汇率值
        coinName: coinName, //取币种名称值
      }).then((res) => {
        this.sumAccount = res.data?.sumAccount;
        this.transferSumAccount = `≈${res.data?.symbol}${res.data?.transferSumAccount}`;
      });
    },
    //可换算币种
    getConversionList() {
      simpleApi({ isType: 7 }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.conversionList = res.data.data || [];
            this.coinValue = this.conversionList[0].id;
            this.coinName = this.conversionList[0].coinName;
            this.getSumAccount(this.coinName);
          }
        }
      });
    },
  // 千分位格式化

    // 收藏以及取消收藏功能
    isFavor(row) {
      if (!localStorage.getItem("token")) {
        this.$router.push({
          path: "/layout/login",
          query: { redirect: "/layout/quotes" },
        });
        return;
      }
      if (row.favorite === true) {
        if (row.symbolId) {
          favoriteApi({
            symbolId: row.symbolId,
            enable: false,
            marketType: row.marketType,
          }).then(() => {
            if (row.type === "contractOptional") {
              // this.getHotQuotesList("contractOptional");
            } else if (row.type === "contract") {
              // this.getHotQuotesList("contract");
            } else if (row.type === "spotOptional") {
              // this.getHotQuotesList("spotOptional");
            } else if (row.type === "spot") {
              // this.getHotQuotesList("spot");
            }
            row.favorite = false;
          });
        }
      } else {
        if (row.symbolId) {
          favoriteApi({
            symbolId: row.symbolId,
            enable: true,
            marketType: row.marketType,
          }).then(() => {
            row.favorite = true;
          });
        }
      }
    },

    //banner公告列表
    getBannerList() {
      swiperList({
        categoryId: 12,
        type: 1,
        topic: this.getTheme === "dark" ? 1 : 0,
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.bannerImg = res.data.data[0].imgUrl;
          }
        }
      });
    },
    //客户查询公告列表
    getannounceList() {
      announceListApi(this.announceParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.announceList = res.data.data.records || [];
          }
        }
      });
    },
    handleDetail(row) {
      this.$router.push({
        path: "/postDetail",
        query: {
          type: 1,
          id: row.announceId,
        },
      });
    },
    //交易
    handleTrade(row) {
      if (row.marketType == "USDT_M_FUTURE") {
        this.$store.commit("setCurrentMarket", row.symbol);
        this.$router.push({
          path: "/layout/contractTransaction",
        });
      } else if (row.marketType == "SPOT") {
        // this.$store.commit("setCurrentMarket", row.symbol);
        this.$router.push({
          path: "/layout/spotTrading",
        });
      }
    },

    eyeClick(index) {
      this.eyeShow = index;
    },

    // 导航点击事件
    handleTabs(index) {
      this.activeIndex = index;
      if (index === 0) {
        // 合约
        this.getHotQuotesList(1);
      } else if (index === 1) {
        //自选
        this.getHotQuotesList(2);
      }
    },
    // 认证
    dentify(status) {
      if (status !== "NOT_SUBMIT") return;
    },

    handleQuotes() {
      this.$router.push("/layout/quotes");
    },

    //新行情表格-----
    changTabs(item) {
      this.tabsActive = item.value;
      switch (this.tabsActive) {
        case 1:
          this.btnActive = 1;
          // this.marketType = "USDT_M_FUTURE"; //合约类型参数(恢复合约类型参数)
          this.getHotQuotesList("contractOptional"); //自选
          break;
        case 2:
          this.btnActive = 1;
          // this.marketType = "USDT_M_FUTURE"; //合约类型参数
          this.getHotQuotesList("contract");
          break;
        case 3:
          this.btnActive = 1;
          // this.marketType = "SPOT"; //现货类型参数
          this.getHotQuotesList("spot");
          break;
        default:
      }
    },
    handleBtn(item) {
      this.btnActive = item.id;
      if (this.tabsActive === 1) {
        if (this.btnActive === 1) {
          //自选合约
          this.marketType = "USDT_M_FUTURE";
          this.getHotQuotesList("optional");
        } else {
          this.marketType = "SPOT";
          //自选现货
          this.getHotQuotesList("spotOptional");
        }
      }
    },
    //新行情表格-----
  },
};
</script>
<style lang="scss" scoped>
.overview {
  background: #141414;
  height: 100%;
  padding: 20px 20px 0px 20px;
  overflow-y: auto;

  .userinfo-content {
    display: flex;
    // justify-content: space-between;
    .userinfo-left {
      flex: 1;
      margin-right: 20px;
      .lefttop-content {
        width: 100%;
        height: 160px;
        background: #ffffff;
        border-radius: 15px;
        margin-bottom: 20px;
        padding: 21px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .verify-text {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p {
            color: #333333;
            margin-bottom: 5px;
            font-weight: 500;
            &:first-child {
              font-size: 16px;
            }
            &:nth-child(2) {
              font-size: 14px;
            }
          }
          .verify-btn {
            // width: 110px;
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            background-color: $colorB;
            color: #ffffff;
            border-radius: 5px;
            text-align: center;
            font-size: 16px;
            margin-top: 10px;
            cursor: pointer;
          }
        }
      }

      .leftbottom-content {
        width: 100%;
        height: calc(100% - 160px - 20px);
        background: #ffffff;
        border-radius: 15px;
        background: #ffffff;
        border-radius: 15px;
        padding-top: 31px;
        .table-container {
          padding-bottom: 20px;
          padding-left: 10px;
          padding-right: 10px;
        }
        .content-valuation,
        .content-quotes {
          margin-bottom: 40px;
          padding-left: 20px;
          .valuation,
          .count {
            display: flex;
            align-items: center;
            font-size: 24px;
            font-weight: 600;
            color: #333333;

            ::v-deep .el-input__inner {
              border: none;
            }
            .kind {
              font-size: 22px;
              font-weight: 600;
              color: #333333;
              padding-right: 10px;
            }
            .number {
              padding-left: 10px;
              font-size: 18px;
              font-weight: 600;
              color: #666666;
            }
          }
          .count {
            margin-top: 25px;
            .select {
              width: 85px;
            }
          }
          .text {
            font-size: 12px;
            font-weight: 600;
            color: #8992a6;
            margin-top: 13px;
          }
        }
        .quotes-tabs {
          display: flex;
          align-items: center;
          padding-left: 20px;
          li {
            text-align: center;
            width: 100px;
            height: 30px;
            line-height: 30px;
            margin-right: 10px;
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;
          }
          .active-tabs {
            border-radius: 5px;
            background-color: rgba(88, 113, 246, 0.1);
            color: $colorB;
          }
        }
      }
    }
    .userinfo-right {
      width: 790px;
      background: #ffffff;
      border-radius: 15px;
      padding: 30px;
    }
  }

  // 去除表格所有边框
  ::v-deep .el-table__body-wrapper {
    font-size: 16px;
  }
  // 去除表格所有边框
  .el-table::before {
    height: 0 !important;
  }
  ::v-deep .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: none !important;
  }
  /* 头部边框 */
  ::v-deep .customer-no-border-table thead tr th.is-leaf {
    border: none !important;
    border-right: none !important;
  }

  .trade-btn {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: $colorB;
  }

  .username-input {
    width: 150px;
  }
}

.item-bold1 {
  font-weight: 600;
  color: #333333;
  font-size: 16px;
  padding-left: 20px;
  padding-bottom: 6px;
}

.item-bold2 {
  font-weight: 500;
  color: #333333;
  font-size: 14px;
  padding-right: 30px;
  padding-top: 6px;
}

.common-icon {
  font-size: 16px;
  width: 24px;
  height: 24px;
  background-color: #f5f7fa;
  border-radius: 5px;
  margin-left: 10px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
  .eye-open {
    width: 24px;
    height: 24px;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
  }
  .eye-close {
    width: 24px;
    height: 24px;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-icon-edit-outline {
  font-size: 22px;
  cursor: pointer;
  margin-left: 14px;
  vertical-align: middle;
}

.change {
  &-up {
    color: #90ff00;
  }
  &-down {
    color: #f75f52;
  }
}

.pointer {
  cursor: pointer;
}

.tabs {
  padding: 0 20px;
  .tabs-header {
    height: 48px;
    background: #ebeff5;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    align-items: center;
    .tabs-item {
      padding: 0 20px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      cursor: pointer;
      color: #96a2b2;
      font-size: 16px;
      &:first-child {
        border-radius: 10px 0px 0px 0px;
      }
    }
    .tabs-active {
      background: #ffffff;
      color: #333;
    }
  }
  .tabs-btn {
    display: flex;
    background-color: #fff;
    padding-left: 15px;
    .btn-item {
      padding: 0 20px;
      height: 35px;
      line-height: 35px;
      background: #f8f9fb;
      border-radius: 4px;
      margin-right: 15px;
      margin-top: 20px;
      text-align: center;
      font-size: 14px;
      color: #333;
      cursor: pointer;
    }
    .btn-active {
      background: #90ff00;
      color: #fff;
    }
  }
}
</style>
