<template>
  <div>
    <div class="contractAccount" v-if="tabIndex === 1">
      <div class="title">
        <span>{{ $t("property.合约账户") }}</span>
        <img
          v-if="eyeShow === 1"
          class="eye-open"
          src="@/assets/images/eye-open.png"
          alt=""
          @click="eyeClick(2)"
        />
        <img
          v-if="eyeShow === 2"
          class="eye-close"
          src="@/assets/images/eye.png"
          alt=""
          @click="eyeClick(1)"
        />
      </div>
      <div class="card">
        <div class="card-left">
          <p class="card-title">{{ $t("property.总资产估值") }}</p>
          <p class="card-num">
            <span v-if="eyeShow === 1">{{ $formatNumber(sumAccount) }}</span>
            <span v-if="eyeShow === 2">******</span>
            <!-- <span style="padding-left: 10px; font-size: 14px">USDT</span> -->
            <SymbolSelect
              ref="selectRef"
              v-if="conversionList.length"
              :conversionList="conversionList"
              @handleChoose="coinChange"
            />
          </p>
          <p v-if="eyeShow === 1">{{ $formatNumber(transferSumAccount) }}</p>
          <p v-if="eyeShow === 2">******</p>
        </div>
        <div class="card-right">
          <div @click="$router.push('/wallet/fundsTransfer')">
            {{ $t("property.划转") }}
          </div>
          <div @click="detailRecord">{{ $t("property.明细记录") }}</div>
        </div>
      </div>
      <div class="ad" v-if="!Number(sumAccount)">
        <p>
          <span>{{ $t("property.暂无资产，您可通过") }}</span>
          <span class="ad-text" @click="handleBuyCoin">{{ $t("property.一键买币") }}</span>
          <span>{{ $t("property.获得您的数字资产") }}</span>
        </p>
      </div>
      <div class="content">
        <div class="amount">
          <div class="item">
            <p class="item-title">{{ $t("property.账户权益") }}</p>
            <p>
              <span v-if="eyeShow === 1" class="item-num">{{
                accountEquity
              }}</span>
              <span v-if="eyeShow === 2" class="item-num">******</span>
              <span>USDT</span>
            </p>
            <p v-if="eyeShow === 1">{{ transferAccountEquity }}</p>
            <p v-if="eyeShow === 2">******</p>
          </div>
          <div class="item">
            <p class="item-title">{{ $t("property.可用保证金") }}</p>
            <p>
              <span v-if="eyeShow === 1" class="item-num">{{
                availableDeposit
              }}</span>
              <span v-if="eyeShow === 2" class="item-num">******</span>
              <span>USDT</span>
            </p>
            <p v-if="eyeShow === 1">{{ transferAvailableDeposit }}</p>
            <p v-if="eyeShow === 2">******</p>
          </div>
          <div class="item">
            <p class="item-title">{{ $t("property.占用") }}</p>
            <p>
              <span v-if="eyeShow === 1" class="item-num">{{
                occupyDeposit
              }}</span>
              <span v-if="eyeShow === 2" class="item-num">******</span>
              <span>USDT</span>
            </p>

            <p v-if="eyeShow === 1">{{ transferOccupyDeposit }}</p>
            <p v-if="eyeShow === 2">******</p>
          </div>
        </div>
        <div class="tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('property.仓位')" name="first">
              <div v-if="activeName === 'first'">
                <PropertyTable
                  :tableData="contractSumAccountData"
                  :columnData="positionColumnData"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('property.资产')" name="second">
              <div v-if="activeName === 'second'">
                <PropertyTable
                  ref="tableRef"
                  :tableData="contractAssetsData"
                  :columnData="assetsColumnData"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 平仓成功 -->
      <success-modal
        :is-show.sync="successShow"
        :btnText="$t('property.确定')"
        :text="$t('property.平仓成功')"
        @next="sureSuccess"
      ></success-modal>
    </div>
    <!-- 明细记录 -->
    <div v-if="tabIndex === 2">
      <detail-record @onBack="onBack" :index="index"></detail-record>
    </div>
  </div>
</template>

<script>
import PropertyTable from "../components/propertyTable.vue";
import SuccessModal from "@/components/successModal.vue";
import DetailRecord from "./components/detailRecord.vue";
import { contractAccountApi, simpleApi } from "@/api/assetWallet";
import { getExchange } from "@/libs/utils";
import { webSocketMixin } from "../components/socket";
import SymbolSelect from "../components/select.vue";
export default {
  name: "ContractAccount",
  components: {
    PropertyTable,
    SuccessModal,
    DetailRecord,
    SymbolSelect,
  },
  mixins: [webSocketMixin],
  data() {
    return {
      eyeShow: 1,
      tabIndex: 1,
      index: 0,
      successShow: false,
      activeName: "first",
      conversionList: [],
      //资产
      contractAssetsData: [], //合约资产数据
      assetsColumnData: [
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
      assetsData: [],
      // 仓位
      contractSumAccountData: [], //合约仓位数据
      positionColumnData: [
        {
          positionMarketType: true,
          prop: "coinMarket",
          sortable: false,
          label: this.$t("property.合约"),
          width: "",
        },
        {
          text: true,
          prop: "positionAmount", //持仓数量
          label: this.$t("property.数量"),
          width: "",
          sortable: false,
        },
        {
          text: true,
          prop: "positionAveragePrice", //仓位均价
          label: this.$t("property.开仓价格"),
          width: "",
          sortable: false,
        },
        {
          markType: true,
          // prop: "markedPrice", //标记价格接websocket
          label: this.$t("property.标记价格"),
          width: "",
          sortable: false,
        },
        {
          lossType: true,
          // prop: "unrealizedProfitLoss", //未实现盈亏
          label: this.$t("property.未实现盈亏（回报率）"),
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
              label: this.$t("property.平仓"),
              icon: "",
              color: "#90ff00",
              cursor: "pointer",
              buttonClick: this.closePosition,
              isShow: (row) => {
                return true;
              },
            },
          ],
        },
      ],
      //接口数据
      sumAccount: "", //总资产
      transferSumAccount: "",
      accountEquity: "",
      transferAccountEquity: "", //约多少法币
      availableDeposit: "", //保证金余额
      transferAvailableDeposit: "", //约等于多少法币可用保证金
      occupyDeposit: "", //占用保证金
      transferOccupyDeposit: "", //约等于多少法币占用保证金
      unitAssetName: "",
      coinName: "",
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.detailRecord();
      this.index = this.$route.query.id * 1;
    }
    // this.getContractAccount();
    this.getConversionList();
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
      self.websockSend("positionSocket");
      self.websockSend("markPriceSend");
      self.websockSend("contractSend");
    },
    //可换算币种
    getConversionList() {
      simpleApi({ isType: 7 }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.conversionList = res.data.data || [];
            this.coinName = this.conversionList[0].coinName;
            this.getContractAccount(this.coinName);
          }
        }
      });
    },
    coinChange(item) {
      this.$refs.selectRef.showFn();
      this.getContractAccount(item.coinName);
    },
    //合约表格数据
    getContractAccount(name) {
      this.unitAssetName = getExchange();
      contractAccountApi({
        coinName: name,
        unitAssetName: this.unitAssetName,
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.sumAccount = res.data.data.sumAccount;
            this.transferSumAccount =
              res.data.data.symbol + res.data.data.transferSumAccount;
            this.accountEquity = res.data.data.accountEquity;
            this.transferAccountEquity =
              res.data.data.symbol + res.data.data.transferAccountEquity;
            this.availableDeposit = res.data.data.availableDeposit;
            this.transferAvailableDeposit =
              res.data.data.symbol + res.data.data.transferAvailableDeposit;
            this.occupyDeposit = res.data.data.occupyDeposit;
            this.transferOccupyDeposit =
              res.data.data.symbol + res.data.data.transferOccupyDeposit;
            //合约仓位数据
            if (res.data.data.contractDetails) {
              this.contractSumAccountData = res.data.data.contractDetails.map(
                (item) => {
                  return {
                    ...item,
                    markedPrice: null,
                    coinName: item.coinMarket
                      .replace("/", "")
                      .toLocaleLowerCase(),
                  };
                }
              );
            }
            //合约资产数据
            let list = [];
            list.push(res.data.data);
            this.contractAssetsData = list || [];
            this.webSocket();
          }
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
    //平仓
    closePosition(row) {
      this.$router.push({
        path: "/layout/contractTransaction",
        query: {
          id: row.id,
        },
      });
    },
    //关闭平仓成功窗口
    sureSuccess() {
      this.successShow = false;
    },
    detailRecord() {
      this.tabIndex = 2;
    },
    onBack() {
      this.tabIndex = 1;
    },
    eyeClick(index) {
      this.eyeShow = index;
      this.$store.commit("setShowNumState", this.eyeShow);
    },
    //前往一键买币
    handleBuyCoin() {
      this.$router.push("/layout/c2c/buyCoin");
    },
  },
};
</script>

<style lang="scss" scoped>
.contractAccount {
  background-color: #fff;
  color: #333333;
  .title {
    background-color: #f5f7fa;
    font-size: 32px;
    padding: 20px 0 20px 30px;
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
  .card {
    height: 179px;
    background: #ffffff;
    border-radius: 15px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    .card-left {
      margin: 40px 0 0 40px;
      font-size: 16px;
      .card-title {
        color: #8992a6;
        font-size: 14px;
      }
      .card-num {
        display: flex;
        align-items: center;
        font-size: 26px;
        padding: 10px 0;
      }
    }
    .card-right {
      margin: 70px 40px 0 0;
      display: flex;
      div {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 6px;
        border: 1px solid #f4f5f7;
        padding: 0 20px;
        margin-left: 30px;
        cursor: pointer;
        &:hover {
          color: #ffffff;
          background: $colorB;
        }
      }
    }
  }
  .ad {
    height: 60px;
    line-height: 60px;
    background: linear-gradient(90deg, #e6f7ec 0%, #f6fcf7 100%);
    p {
      font-size: 14px;
      margin-left: 40px;
      .ad-text {
        cursor: pointer;
        color: $colorB;
      }
    }
  }
  .content {
    background: #ffffff;
    border-radius: 15px;
    margin-top: 20px;
    .amount {
      display: flex;
      padding: 40px 0 60px 40px;
      .item {
        margin-right: 120px;
        font-size: 14px;
        color: #333;
        .item-title {
          font-weight: 500;
          color: #999;
          margin-bottom: 10px;
        }
        .item-num {
          font-size: 26px;
          padding-bottom: 10px;
          padding-right: 5px;
        }
      }
    }
    .tabs {
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
}
</style>
