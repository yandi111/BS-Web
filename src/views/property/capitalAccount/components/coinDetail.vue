<template>
  <div class="coinDetai" v-show="isShow">
    <el-drawer :visible.sync="isShows" :with-header="false" :modal="false">
      <div class="drawer">
        <div class="drawer-header">
          <div class="h-left">
            <div class="h-icon">
              <img :src="assetsCoinInfo.iconUrl" alt="" />
            </div>
            <div>
              <div class="h-title">{{ assetsCoinInfo.coinName }}</div>
              <p>{{ assetsCoinInfo.englishDesc }}</p>
            </div>
          </div>
          <div>
            <i class="el-icon-close" @click="handleClose"></i>
          </div>
        </div>
        <div class="position">
          <div class="p-title">{{ $t("property.持仓") }}</div>
          <div>
            <span class="p-left">{{ assetsCoinInfo.amount }}</span>
            <span class="p-right">
              ≈
              {{
                `${assetsCoinInfo.symbol}${assetsCoinInfo.transferAmount}`
              }}</span
            >
          </div>
        </div>
        <!-- <div class="profit-loss">
          <div>
            <div class="loss-title">今日盈亏</div>
            <div class="loss-num">+0.00</div>
          </div>
          <div>
            <div class="loss-title">今日盈亏(%)</div>
            <div class="loss-num up">+1.19%</div>
          </div>
          <div class="more" @click="handleLoss">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div> -->
        <div class="balance">
          <div class="b-header">
            <div class="b-title">{{ $t("property.可用余额") }}</div>
            <div>{{ assetsCoinInfo.availableAmount }}</div>
          </div>
        </div>
        <div class="freeze">
          <div>
            <a @click="handleA(assetsCoinInfo.coinId)" v-show="aShow"
              >View all</a
            >
          </div>
          <div v-show="!aShow">
            <div class="freeze-box">
              <div class="freeze-title">{{ $t("property.冻结") }}</div>
              <div>{{ assetsCoinInfo.frozenAmount }}</div>
            </div>
            <div class="freeze-box">
              <div class="freeze-title">{{ $t("property.提现中") }}</div>
              <div>{{ frozenDetail.depositFrozenAmount }}</div>
            </div>
            <div class="freeze-box">
              <div class="freeze-title">{{ $t("property.委托中") }}</div>
              <div>{{ frozenDetail.entrustFrozenAmount }}</div>
            </div>
          </div>
        </div>
        <div class="spot">
          <div class="spot-header">
            <div>{{ $t("property.现货") }}</div>
            <div class="spot-right" @click="toSpot">
              <div>{{ $t("property.去交易") }}</div>
              <div class="spot-icon">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
          <div class="spot-box" v-if="quotesList.length">
            <div
              class="spot-item"
              v-for="(item, index) in quotesList"
              :key="index"
              @click="handleSpot(item)"
            >
              <div class="spot-symbol">
                <img :src="item.icon" alt="" />
                <span>{{ item.symbol }}</span>
              </div>
              <div class="spot-price" :class="num(item) ? 'up' : 'dowm'">
                {{ item.lastPrice }}
              </div>
              <div
                class="spot-change"
                :class="[
                  parseFloat(item.change) > 0 ? 'up' : '',
                  parseFloat(item.change) < 0 ? 'dowm' : '',
                ]"
              >
                {{ item.change | showChange }}
              </div>
            </div>
            <div class="spot-empty" v-if="quotesList.length <= 2"></div>
          </div>
        </div>
        <div class="border"></div>
        <div class="record">
          <div class="r-header">
            <div>{{ $t("property.历史记录") }}</div>
            <div class="select-box">
              <div
                class="r-select"
                :class="selectShow ? 'bActive' : ''"
                @click.stop="handleSelect"
              >
                <div>{{ tabText }}</div>
                <div>
                  <i
                    :class="
                      selectShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                    "
                  ></i>
                </div>
              </div>
              <div class="r-list" v-show="selectShow" @click.stop>
                <div
                  class="r-item"
                  :class="tabIndex == item.id ? 'cActive' : ''"
                  v-for="item in selectList"
                  :key="item.id"
                  @click.stop="handleItem(item)"
                >
                  {{ item.label }}
                </div>
              </div>
            </div>
          </div>
          <!-- 充、提币记录 -->
          <div class="r-box" v-if="tabIndex == 1 || tabIndex == 2">
            <div class="r-text" v-for="(item, index) in list" :key="index">
              <div>
                <div>{{ tabText }}</div>
                <div class="mar">{{ $t("property.到账数量") }}</div>
                <div>{{ $t("property.日期") }}</div>
              </div>
              <div class="right">
                <div :class="item.status == 0 ? 'up' : 'dowm'">
                  {{ item.statusName }}
                </div>
                <div class="mar">
                  {{ item.actualAmount }} {{ item.coinName }}
                </div>
                <div>{{ $formatTime(item.confirmTimeTsLong) }}</div>
              </div>
            </div>
            <my-empty v-if="!list.length"></my-empty>
          </div>
          <!-- 划转记录 -->
          <div class="r-box" v-if="tabIndex == 3">
            <div
              class="r-text"
              v-for="(item, index) in transferList"
              :key="index"
            >
              <div>
                <div>{{ tabText }}</div>
                <div class="pad">
                  {{ $t("property.从") }}：{{ item.fromAccountName }}
                </div>
                <div class="pad">
                  {{ $t("property.到") }}：{{ item.toAccountName }}
                </div>
                <div class="pad">{{ $t("property.日期") }}</div>
              </div>
              <div class="right">
                <div class="up pad">{{ $t("property.已完成") }}</div>
                <div class="emp pad"></div>
                <div class="pad">{{ item.amount }} {{ item.coinName }}</div>
                <div class="pad">{{ $formatTime(item.createTimeTsLong) }}</div>
              </div>
            </div>
            <my-empty v-if="!transferList.length"></my-empty>
          </div>
          <!-- 闪兑记录 -->
          <div class="r-box" v-if="tabIndex == 4">
            <div class="r-text" v-for="(item, index) in flashList" :key="index">
              <div>
                <div>{{ tabText }}</div>
                <div class="pad">
                  {{ $t("property.从") }}：{{ item.fromCoinName }}
                </div>
                <div class="pad">
                  {{ $t("property.从") }}：{{ item.fromAmount }}
                </div>
                <div class="pad">{{ $t("property.日期") }}</div>
              </div>
              <div class="right">
                <div class="up pad">
                  {{
                    item.status == 1
                      ? $t("property.闪兑成功")
                      : $t("property.闪兑失败")
                  }}
                </div>
                <div class="emp pad">
                  {{ $t("property.到") }}：{{ item.toCoinName }}
                </div>
                <div class="pad">
                  {{ $t("property.到") }}：{{ item.toAmount }}
                </div>
                <div class="pad">{{ $formatTime(item.createTimeTsLong) }}</div>
              </div>
            </div>
            <my-empty v-if="!flashList.length"></my-empty>
          </div>
          <!-- 现货买入、卖出 -->
          <div class="r-box" v-if="tabIndex == 5 || tabIndex == 6">
            <div
              class="r-text"
              v-for="(item, index) in entrustList"
              :key="index"
            >
              <div>
                <div>{{ $t("property.现货") }}{{ tabText }}</div>
                <div class="pad">{{ item.coinMarket }}</div>
                <div class="pad">{{ $t("property.手续费") }}</div>
                <div class="pad">{{ $t("property.日期") }}</div>
              </div>
              <div class="right">
                <div class="up pad">{{ $t("property.已成交") }}</div>
                <div class="emp pad">{{ item.amount }}</div>
                <div class="pad">{{ item.fee }}</div>
                <div class="pad">{{ $formatTime(item.createTime) }}</div>
              </div>
            </div>
            <my-empty v-if="!entrustList.length"></my-empty>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  frozenAmount,
  recordQueryApi,
  transferRecordQueryApi,
  flashRecordApi,
  spotDetailList,
} from "@/api/assetWallet";
// import { quotesApi } from "@/api/quotes";
import { webSocketMixin } from "./coinDetailSocket";
import { simulateArrayData } from "@/libs/simulateArrayData";
export default {
  name: "CoinDetail",
  mixins: [webSocketMixin],
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShows: false,
      aShow: true,
      selectShow: false,
      frozenDetail: {},
      tabIndex: 1,
      tabText: this.$t("property.充币"),
      selectList: [
        {
          id: 1,
          label: this.$t("property.充币"),
        },
        {
          id: 2,
          label: this.$t("property.提币"),
        },
        {
          id: 3,
          label: this.$t("property.划转"),
        },
        {
          id: 4,
          label: this.$t("property.闪兑"),
        },
        {
          id: 5,
          label: this.$t("property.卖出"),
        },
        {
          id: 6,
          label: this.$t("property.买入"),
        },
      ],
      //充提币参数
      depositPrams: {
        type: 1,
        status: null,
        coinId: null,
        pageNum: 1,
        pageSize: 10,
        startTime: null,
        endTime: null,
      },
      //历史记录
      list: [],
      transferPrams: {
        coinId: null,
        fromAccountType: null,
        toAccountType: null,
        status: null,
        startTime: null,
        endTime: null,
        pageNum: 1,
        pageSize: 10,
      },
      transferList: [],
      flashParams: {
        fromCoinId: null,
        toCoinId: null,
        status: null,
        startTime: null,
        endTime: null,
        pageNum: 1,
        pageSize: 10,
      },
      flashList: [],
      entrustParams: {
        type: 2,
        pageNum: 1,
        pageSize: 10,
        coinMarket: null,
        priceType: null,
        startTime: null,
        endTime: null,
      },
      entrustList: [],
      //现货行情
      quotesList: [],
      num: simulateArrayData(),
    };
  },
  computed: {
    ...mapState({
      assetsCoinInfo: ({ spots }) => spots.assetsCoinInfo,
    }),
  },
  watch: {
    isShow: {
      handler(value) {
        this.isShows = value;
      },
    },
    isShows(value) {
      if (!value) {
        this.init();
        this.$emit("update:isShow", false);
        this.aShow = true
      }
    },
  },
  filters: {
    showChange(val) {
      if (val < 0) {
        return `${val}%`;
      } else if (val == 0) {
        return val;
      } else {
        return `+${val}%`;
      }
    },
  },
  mounted() {
    addEventListener("click", () => {
      this.selectShow = false;
    });
  },
  methods: {
    //数据初始化
    init() {
      this.tabIndex = 1;
      this.tabText = this.$t("property.充币");
      this.depositPrams.type = 1;
      this.depositPrams.coinId = this.assetsCoinInfo.coinId;
    },
    //现货行情
    // async quotes() {
    //   const res = await quotesApi({ marketType: "SPOT" });
    //   let newArr = [];
    //   let arr = res.data.data;
    //   arr.forEach((item) => {
    //     if (
    //       item.baseAssetCode == this.assetsCoinInfo.coinName ||
    //       item.quoteAssetCode == this.assetsCoinInfo.coinName
    //     ) {
    //       newArr.push(item);
    //     }
    //   });
    //   this.quotesList = newArr.length > 3 ? newArr.slice(0, 3) : newArr;
    //   this.websockSend("coinDetailData");
    // },
    //充、提币记录
    async recordQuery() {
      this.depositPrams.coinId = this.assetsCoinInfo.coinId;
      const res = await recordQueryApi(this.depositPrams);
       const obj = {
        0: this.$t('property.已完成'),
        10: this.$t('property.审核中'),
        20: this.$t('property.审核失败'),
        30: this.$t('property.待打包'),
        40: this.$t('property.确认中'),
        50: this.$t('property.已确认'),
        60: this.$t('property.确认失败，请重试'),
        70: this.$t('property.充值未上账'),
        80: this.$t('property.充值已上账'),
      };
      const arr = res.data.data.records || [];
      const newArr = arr.map((item) => {
        return {
          ...item,
          statusName: obj[item.status],
        };
      });
      this.list = newArr
    },
    //划转记录
    async transferRecord() {
      this.transferPrams.coinId = this.assetsCoinInfo.coinId;
      const res = await transferRecordQueryApi(this.transferPrams);
       const obj = {
        1: this.$t('property.现货'),
        2: this.$t('property.资金'),
        3: this.$t('property.合约'),
      };
       const arr = res.data.data.records || [];
      const newArr = arr.map((item) => {
        return {
          ...item,
          fromAccountName: obj[item.fromAccountType],
          toAccountName: obj[item.toAccountType],
        };
      });
      this.transferList = newArr

    },
    //闪兑记录
    async flashRecord() {
      this.flashParams.fromCoinId = this.assetsCoinInfo.coinId;
      const res = await flashRecordApi(this.flashParams);
      this.flashList = res.data.data.records || [];
    },
    //买入、卖出记录
    async entrustRecord() {
      this.entrustParams.coinMarket = this.assetsCoinInfo.coinName;
      const res = await spotDetailList(this.entrustParams);
      this.entrustList = res.data.data.records || [];
    },

    //去交易
    toSpot() {
      this.$router.push("/spotTrading");
    },
    handleSpot(row) {
      if (row.marketType == "SPOT") {
        this.$store.commit("setSpotCurrentMarket", row.symbol);
        this.$router.push({
          path: "/spotTrading",
        });
      }
    },

    handleClose() {
      this.init();
      this.$emit("update:isShow", false);
      this.aShow = true
    },
    //收益
    handleLoss() {},
    //冻结
    async handleA(id) {
      const res = await frozenAmount({ coinId: id });
      this.frozenDetail = res.data.data;
      this.aShow = false;
    },
    //条件筛选
    handleSelect() {
      this.selectShow = !this.selectShow;
    },
    //选中类型
    handleItem(item) {
      this.tabIndex = item.id;
      this.tabText = item.label;
      switch (item.id) {
        case 1:
          //充币
          this.depositPrams.type = 1;
          this.recordQuery();
          break;
        case 2:
          //提币
          this.depositPrams.type = 2;
          this.recordQuery();
          break;
        case 3:
          //划转
          this.transferRecord();
          break;
        case 4:
          //闪兑
          this.flashRecord();
          break;
        case 5:
          //现货卖出
          this.entrustParams.type = 2;
          this.entrustRecord();
          break;
        case 6:
          //现货买入
          this.entrustParams.type = 1;
          this.entrustRecord();
          break;
        default:
      }
      this.selectShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.coinDetai {
  color: #333;
  .drawer {
    padding: 30px;
    .drawer-header {
      display: flex;
      justify-content: space-between;
      .h-left {
        display: flex;
        align-items: center;
        .h-icon {
          margin-right: 10px;
          img {
            width: 60px;
            height: 60px;
            display: inline-block;
          }
        }
        .h-title {
          font-size: 26px;
        }
        p {
          font-size: 18px;
          color: #96a2b2;
        }
      }
      .el-icon-close {
        font-size: 24px;
        cursor: pointer;
      }
    }
    .position {
      margin-top: 60px;
      .p-title {
        font-size: 20px;
        color: #96a2b2;
        margin-bottom: 15px;
      }
      .p-left {
        font-size: 32px;
        color: #333;
      }
      .p-right {
        font-size: 28px;
        color: #96a2b2;
      }
    }
    .profit-loss {
      margin-top: 30px;
      padding: 0 30px;
      height: 140px;
      background: #fafafa;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .loss-title {
        color: #96a2b2;
        font-size: 20px;
      }
      .loss-num {
        margin-top: 14px;
        font-size: 32px;
      }
      .more {
        font-size: 12px;
        width: 30px;
        height: 30px;
        background: #96a2b2;
        opacity: 0.3;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .el-icon-arrow-right {
          color: #000;
          font-size: 12px;
        }
      }
    }
    .balance {
      margin-top: 30px;
      .b-header {
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        .b-title {
          color: #96a2b2;
        }
      }
    }
    .freeze {
      margin-top: 15px;
      a {
        text-decoration: underline;
        font-size: 20px;
        color: #96a2b2;
        cursor: pointer;
      }
      .freeze-box {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        .freeze-title {
          color: #96a2b2;
        }
      }
    }
    .spot {
      margin-top: 30px;
      .spot-header {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        .spot-right {
          display: flex;
          align-items: center;
          color: #90ff00;
          cursor: pointer;
          .spot-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #90ff00;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 10px;
            color: #fff;
            font-size: 16px;
          }
        }
      }
      .spot-box {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        .spot-item {
          min-width: 155px;
          height: 110px;
          background: #ffffff;
          box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.05);
          border-radius: 6px;
          cursor: pointer;
          padding: 15px;
          .spot-symbol {
            img {
              width: 24px;
              height: 24px;
              display: inline-block;
              vertical-align: middle;
              margin-right: 5px;
            }
            font-size: 14px;
          }
          .spot-price {
            font-size: 20px;
            margin: 5px 0px;
          }
          .spot-change {
            font-size: 12px;
          }
        }
        .spot-empty {
          min-width: 155px;
        }
      }
    }
    .border {
      margin: 40px 0px;
      border-bottom: 1px solid #f5f7fa;
    }
    .record {
      .r-header {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        margin-bottom: 30px;
        .select-box {
          position: relative;
          .r-select {
            min-width: 120px;
            height: 40px;
            background: #fafafa;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            font-size: 14px;
            cursor: pointer;
            i {
              font-size: 18px;
            }
          }
          .bActive {
            border: 1px solid #90ff00;
          }
          .r-list {
            min-width: 120px;
            position: absolute;
            left: 0;
            top: 50px;
            background: #ffffff;
            box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
            border-radius: 4px;
            padding: 15px 0px;
            .r-item {
              height: 40px;
              line-height: 40px;
              text-align: center;
              font-size: 12px;
              cursor: pointer;
              &:hover {
                background: #f7f7f7;
              }
            }
            .cActive {
              color: #90ff00;
            }
          }
        }
      }
      .r-box {
        height: 400px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .r-text {
          font-size: 16px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          color: #818c9c;
          .r-right {
            .r-end {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              .r-coin {
                margin-right: 5px;
                width: 8px;
                height: 8px;
                background: #90ff00;
                border-radius: 50%;
              }
            }
          }
          .r-b {
            margin-top: 10px;
            font-size: 14px;
            color: #818c9c;
          }
          .right {
            text-align: right;
            color: #333;
            .emp {
              height: 20px;
            }
          }
        }
      }
    }
  }
  .mar {
    margin: 10px 0px;
  }
  .pad {
    margin-top: 10px;
  }
  .up {
    color: #90ff00;
  }
  .dowm {
    color: #f75f52;
  }
}
</style>