<template>
  <div class="page">
    <div class="header">
      <div class="title">{{ $t("property.跟单账户") }}</div>
      <div class="eye-icon" @click="eyeClick">
        <img v-if="!eyeShow" src="@/assets/images/eye-open.png" alt="" />
        <img v-else src="@/assets/images/eye.png" alt="" />
      </div>
    </div>
    <div class="valuations">
      <div class="left">
        <div class="left-title">{{ $t("property.总资产估值") }}</div>
        <div class="left-num" :class="eyeShow ? 'num-active' : ''">
          <span class="sumAccount">{{
            `${!eyeShow ? info.sumAccount : "******"}`
          }}</span>
          <span>USDT</span>
        </div>
        <div>
          {{ `${!eyeShow ? info.symbol + info.transferSumAccount : "******"}` }}
        </div>
      </div>
      <div class="right">
        <div class="right-btn" @click="handleTransfer">
          {{ $t("property.划转") }}
        </div>
        <!-- <div class="right-btn">明细记录</div> -->
      </div>
    </div>
    <div class="no-assets" v-if="!Number(info.sumAccount)">
      {{ $t("property.暂无资产，您可通过")
      }}<span @click="$router.push('/c2c/buyCoin')">{{
        $t("property.一键买币")
      }}</span>
      {{ $t("property.获得您的数字资产") }}
    </div>
    <div class="card">
      <div class="card-item">
        <div class="card-t">{{ $t("property.可用") }}</div>
        <div class="card-num" :class="eyeShow ? 'card-active' : ''">
          {{ !eyeShow ? info.availableDeposit : "******" }}<span>USDT</span>
        </div>
        <div>
          {{
            !eyeShow ? info.symbol + info.transferAvailableDeposit : "******"
          }}
        </div>
      </div>
      <div class="card-item">
        <div class="card-t">{{ $t("property.冻结") }}</div>
        <div class="card-num" :class="eyeShow ? 'card-active' : ''">
          {{ !eyeShow ? info.occupyDeposit : "******" }}<span>USDT</span>
        </div>
        <div>
          {{ !eyeShow ? info.symbol + info.transferOccupyDeposit : "******" }}
        </div>
      </div>
      <div class="card-item">
        <div class="card-b" @click="showDialog">
          {{ $t("property.合作跟单账户总额") }}
        </div>
        <div class="card-num" :class="eyeShow ? 'card-active' : ''">
          {{ !eyeShow ? info.cooperateSumAccount : "******" }}<span>USDT</span>
        </div>
        <div>
          {{
            !eyeShow ? info.symbol + info.transferCooperateSumAccount : "******"
          }}
        </div>
      </div>
    </div>
    <div class="table">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('property.跟单持仓')" name="first">
          <div v-if="activeName === 'first'">
            <Table  ref="assetsRef" :tableData="positionData" :columnData="positionColumn" />
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane :label="$t('property.资产')" name="second">
          <div v-if="activeName === 'second'">
            <Table
              ref="assetsRef"
              :tableData="assetsData"
              :columnData="assetsColumn"
            />
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>
    <DocumentaryAccountDialog :is-show.sync="dialogShow" />
  </div>
</template>

<script>
import Table from "./components/table.vue";
import DocumentaryAccountDialog from "./components/dialog.vue";
import { documentaryAccount } from "@/api/assetWallet";
import { getExchange } from "@/libs/utils";
import { webSocketMixin } from "../components/socket";
export default {
  name: "DocumentaryAccount",
  components: { Table, DocumentaryAccountDialog },
  mixins: [webSocketMixin],
  data() {
    return {
      eyeShow: false,
      dialogShow: false,
      TabsActive: 1,
      activeName: "first",
      unitAssetName: "",
      info: {},
      positionData: [], //跟单仓位数据
      assetsData: [], //跟单资产数据
      positionColumn: [
        {
          positionMarketType: true,
          prop: "coinMarket",
          label: this.$t("property.合约"),
          width: "",
        },
        {
          text: true,
          prop: "positionAmount", //持仓数量
          label: this.$t("property.数量"),
          width: "",
        },
        {
          text: true,
          prop: "positionAveragePrice", //仓位均价
          label: this.$t("property.开仓价格"),
          width: "",
        },
        {
          markType: true,
          prop: "markedPrice", //标记价格接websocket
          label: this.$t("property.标记价格"),
          width: "",
        },
        {
          lossType: true,
          prop: "unrealizedProfitLoss", //未实现盈亏
          label: this.$t("property.未实现盈亏（回报率）"),
          width: "",
        },
        {
          rateReturn: true,
          prop: "rateReturn",
          label: this.$t("property.收益率"),
          width: "",
        },
        // {
        //   isOperation: true,
        //   label: this.$t("property.操作"),
        //   width: "180",
        //   sortable: false,
        //   operation: [
        //     {
        //       type: "button",
        //       label: this.$t("property.平仓"),
        //       icon: "",
        //       color: "#90ff00",
        //       cursor: "pointer",
        //       buttonClick: this.closePosition,
        //       isShow: (row) => {
        //         return true;
        //       },
        //     },
        //   ],
        // },
      ],
      assetsColumn: [
        {
          text: true,
          prop: "coinName", //币种
          sortable: false,
          label: this.$t("property.资产"),
          width: "",
        },
        {
          accountEquityType: true,
          prop: "accountEquity",
          label: this.$t("property.账户权益"),
          width: "",
          sortable: false,
        },
        {
          unrealizeType: true,
          prop: "unrealizedProfitLoss",
          label: this.$t("property.未实现盈亏"),
          width: "",
          sortable: false,
        },
        {
          occupyDepositType: true,
          prop: "occupyDeposit", //占用保证金
          label: this.$t("property.占用"),
          width: "",
          sortable: false,
        },
        {
          availableDepositType: true,
          prop: "availableDeposit",
          label: this.$t("property.保证金额"),
          width: "",
          sortable: false,
        },
        {
          isOperation: true,
          label: this.$t("property.操作"),
          width: "180",
          sortable: false,
          operation: [
            {
              type: "button",
              label: this.$t("property.划转"),
              icon: "",
              color: "#90ff00",
              cursor: "pointer",
              buttonClick: this.transfer,
              isShow: (row) => {
                return true;
              },
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    // socket 推送
    websockOpen(e) {
      const self = this;
      // console.log("socket连接成功");
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      self.websockSend("documentaryMarkPrice");
    },
    eyeClick() {
      this.eyeShow = !this.eyeShow;
      this.$refs.assetsRef.isEyeShow();
    },
    tabsChange(index) {
      this.TabsActive = index;
    },
    initData() {
      this.unitAssetName = getExchange();
      documentaryAccount({
        coinName: "USDT",
        unitAssetName: this.unitAssetName,
      }).then((res) => {
        this.info = res.data.data;
        //跟单仓位数据
        if (res.data.data.contractDetails) {
          this.positionData = res.data.data.contractDetails.map((item) => {
            return {
              ...item,
              markedPrice: null,
              coinName: item.coinMarket.replace("/", "").toLocaleLowerCase(),
            };
          });
        }
        //跟单资产数据
        let list = [];
        list.push(res.data.data);
        this.assetsData = list || [];
        this.webSocket();
      });
    },
    //划转
    transfer(row) {
      this.$router.push({
        name: "fundsTransfer",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
        },
      });
    },
    handleTransfer() {
      this.$router.push("/wallet/fundsTransfer");
    },
    //平仓
    closePosition() {

    },
    showDialog() {
      this.dialogShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: $bgColor;
  font-size: $fontF;
  .header {
    display: flex;
    font-size: $fontE;
    padding: 20px 0 20px 30px;
    background-color: #f5f7fa;
    .eye-icon {
      margin-left: 10px;
      img {
        display: inline-block;
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }
  }
  .valuations {
    height: 137px;
    display: flex;
    justify-content: space-between;
    margin: 0 30px;
    .left {
      display: flex;
      justify-content: center;
      flex-direction: column;
      .left-title {
        font-size: $fontG;
        color: #8992a6;
      }
      .left-num {
        padding: 5px 0;
        .sumAccount {
          font-size: $fontE;
          padding-right: 5px;
        }
        span {
          font-size: 18px;
        }
      }
      .num-active {
        display: flex;
        align-items: center;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .right-btn {
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 6px;
        border: 1px solid #f4f5f7;
        margin-left: 30px;
        cursor: pointer;
        &:hover {
          background-color: $colorB;
          color: #fff;
        }
      }
    }
  }
  .no-assets {
    height: 60px;
    line-height: 60px;
    background: linear-gradient(90deg, #e6f7ec 0%, #f6fcf7 100%);
    font-size: $fontG;
    padding-left: 30px;
    span {
      color: $colorB;
      cursor: pointer;
    }
  }
  .card {
    padding: 30px 0 30px 30px;
    display: flex;
    .card-item {
      margin-right: 104px;

      .card-num {
        margin: 10px 0;
        font-size: 26px;
        padding-right: 5px;
        span {
          font-size: 18px;
          padding-left: 5px;
        }
      }
      .card-active {
        display: flex;
        align-items: center;
      }
      .card-b {
        border-bottom: 1px solid #96a2b2;
        cursor: pointer;
        color: #96a2b2;
      }
      .card-t {
        color: #96a2b2;
      }
    }
  }
  .table {
    padding-left: 30px;
  }
}
/**
tabs及表格样式修改
*/
::v-deep .el-tabs__item {
  font-weight: 500;
  color: #8992a6;
  font-size: 24px;
}
::v-deep .el-tabs__item.is-active {
  color: #333;
}
::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}
::v-deep .el-tabs__active-bar {
  background-color: $colorB;
}

::v-deep .el-tabs__item {
  padding: 0 30px;
  line-height: 30px;
  font-size: 18px;
  font-weight: 500;
  color: #8992a6;
}
::v-deep .el-tabs__item.is-active {
  color: #333333;
}
</style>
