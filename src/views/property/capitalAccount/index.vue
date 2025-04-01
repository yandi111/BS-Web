<template>
  <div>
    <div v-if="capitalIndex === 1" class="capitalAccount">
      <div class="title">
        <span> {{ $t("property.资金账户") }} </span>
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
          <p class="card-title">{{ $t("property.资金账户资金估值") }}</p>
          <div class="card-num">
            <span v-if="eyeShow === 1">{{ $formatNumber(sumAccount) }}</span>
            <span v-if="eyeShow === 2">******</span>
            <SymbolSelect
              ref="selectRef"
              v-if="conversionList.length"
              :conversionList="conversionList"
              @handleChoose="coinChange"
            />
          </div>
          <p v-if="eyeShow === 1">{{ $formatNumber(transferSumAccount) }}</p>
          <p v-if="eyeShow === 2">******</p>
        </div>
        <div class="card-right">
          <div class="card-active" @click="$router.push('/deposit')">
            {{ $t("property.充币") }}
          </div>
          <div @click="$router.push('/withdrawCoins')">
            {{ $t("property.提币") }}
          </div>
          <div @click="$router.push('/fundsTransfer')">
            {{ $t("property.划转") }}
          </div>
          <div @click="flash(2)">{{ $t("property.闪兑") }}</div>
          <div @click="walletHistory">{{ $t("property.钱包历史") }}</div>
        </div>
      </div>
      <div class="ad" v-if="!Number(sumAccount)">
        <p>
          {{ $t("property.暂无资产，您可通过") }}
          <span @click="handleBuyCoin">{{ $t("property.一键买币") }}</span>
          {{ $t("property.获得您的数字资产") }}
        </p>
      </div>
      <div class="table">
        <div class="capitalTable">
          <CapitalTable
            ref="tableRef"
            v-if="otcSumAccountData.length"
            :tableData="otcSumAccountData"
            :columnData="columnData"
          />
        </div>
      </div>
    </div>
    <!-- 钱包历史 -->
    <div v-if="capitalIndex === 2">
      <WalletHistory @changeIndex="changeIndex" @flash="flash" />
    </div>
    <!-- 闪兑 -->
    <!-- <div v-if="capitalIndex === 3">
      <Flash
        @changeIndex="changeIndex"
        :fromAccountType="fromAccountType"
        :coinName="coinName"
        :coinId="coinId"
      />
    </div> -->
    <!-- 闪兑新搜指引弹窗 -->
    <div class="mask">
      <guideMask v-if="capitalIndex === 3" />
    </div>
  </div>
</template>

<script>
import CapitalTable from "./components/capitalTable.vue";
import WalletHistory from "./walletHistory/history.vue";
import Flash from "./flash/flash.vue";
import SymbolSelect from "../components/select.vue";
import guideMask from "./guideMask/guideMask.vue";
import { sumAccountApi, simpleApi } from "@/api/assetWallet";
import { getExchange } from "@/libs/utils";
export default {
  name: "CapitalAccount",
  components: {
    CapitalTable,
    WalletHistory,
    Flash,
    SymbolSelect,
    guideMask,
  },
  data() {
    return {
      eyeShow: 1,
      capitalIndex: this.$route.params.capitalIndex || 1,
      coinValue: 1,
      conversionCoinName: "",
      columnData: [
        {
          ownDefined: true,
          prop: "coinName",
          sortable: "custom",
          sortorders: ["ascending", "descending"],
          label: this.$t("property.资产"),
          width: "",
          ownDefinedReturn: (row) => {
            return row.coinName;
          },
        },
        {
          amountType: true,
          prop: "amount",
          label: this.$t("property.全部"),
          width: "",
          sortable: "custom",
          sortorders: ["ascending", "descending"],
        },
        {
          availableAmounType: true,
          prop: "availableAmount",
          label: this.$t("property.可用"),
          width: "",
          sortable: "custom",
          sortorders: ["ascending", "descending"],
        },
        {
          frozenAmountType: true,
          prop: "frozenAmount",
          label: this.$t("property.已冻结"),
          width: "",
          sortable: "custom",
          sortorders: ["ascending", "descending"],
        },
        {
          transferAmountType: true,
          prop: "transferAmount",
          label: this.$t("property.USDT估值"),
          width: "",
          sortable: "custom",
          sortorders: ["ascending", "descending"],
        },
        {
          isOperation: true,
          label: this.$t("property.操作"),
          width: "200",
          sortable: false,
          operation: [
            {
              type: "text",
              label: this.$t("property.买币/卖币"),
              icon: "",
              color: "",
              buttonClick: this.rowOperation,
              isShow: (row) => {
                return true;
              },
            },
            {
              type: "text",
              label: this.$t("property.划转"),
              icon: "",
              color: "",
              buttonClick: this.onTransfer,
              isShow: (row) => {
                return true;
              },
            },
            {
              type: "text",
              label: this.$t("property.充币"),
              icon: "",
              color: "",
              buttonClick: this.onDeposit,
              isShow: (row) => {
                return true;
              },
            },
            {
              type: "text",
              label: this.$t("property.闪兑"),
              icon: "",
              color: "",
              buttonClick: this.onFlash,
              isShow: (row) => {
                return true;
              },
            },
            {
              type: "text",
              label: this.$t("property.提币"),
              icon: "",
              color: "",
              buttonClick: this.onWithdrawCoins,
              isShow: (row) => {
                return true;
              },
            },
          ],
        },
      ],
      tempData: [],
      //接口数据
      unitAssetName: "", //要转换的汇率
      sumAccount: "",
      transferSumAccount: "",
      otcSumAccountData: [],
      fromAccountType: null,
      coinName: "",
      coinId: null,
      iconUrl: "",
      //可换算币种
      conversionList: [],
    };
  },
  watch: {
    searchVal(newVal, oldVal) {
      if (!newVal) {
        this.handleInit();
      }
      if (newVal.trim()) {
        this.handleFilter(newVal.trim());
      }
    },
    checkVal: {
      handler: function (val) {
        if (val) {
          this.otcSumAccountData = this.otcSumAccountData.filter(
            (v) => Number(v.availableAmount) !== 0
          );
        } else {
          this.handleInit();
          this.handleFilter(this.searchVal);
        }
      },
    },
  },
  mounted() {
    this.getConversionList();
  },
  methods: {
    //资金账户总资产
    getCapitalAccount(coinName) {
      this.unitAssetName = getExchange();
      sumAccountApi({
        type: 2, //type:2资金
        unitAssetName: this.unitAssetName,
        coinName: coinName,
      }).then((res) => {
        this.sumAccount = res.data?.sumAccount;
        this.transferSumAccount = `${res.data?.symbol}${res.data?.transferSumAccount}`;
        this.otcSumAccountData = res.data.accountCoinInfoVOS;
        this.tempData = this.otcSumAccountData;
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
            this.getCapitalAccount(this.coinName);
          }
        }
      });
    },
    coinChange(item) {
      this.$refs.selectRef.showFn();
      this.getCapitalAccount(item.coinName);
    },
    //买币/卖币
    rowOperation(row) {
      // console.log("买币/卖币", row);
      this.$router.push("/layout/c2c/buyCoin");
    },
    // 钱包历史
    walletHistory() {
      this.capitalIndex = 2;
    },
    //闪兑
    flash(val) {
      // this.capitalIndex = 3;
      //闪兑（类型1现货，2资金，3合约）
      // this.fromAccountType = val;
      this.$router.push({
        path: "/wallet/flashExchange",
        query: {
          fromAccountType: val,
        },
      });
    },
    changeIndex() {
      this.capitalIndex = 1;
    },
    //表格筛选
    handleFilter(val) {
      this.otcSumAccountData = this.otcSumAccountData.filter((v) =>
        v.coinName.toLowerCase().includes(val)
      );
    },
    handleInit() {
      this.otcSumAccountData = this.tempData;
    },
    eyeClick(index) {
      this.eyeShow = index;
      this.$refs.tableRef.isShowFn();
    },
    //划转
    onTransfer(row) {
      this.$router.push({
        name: "fundsTransfer",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
          iconUrl: row.iconUrl,
        },
      });
    },
    //充币
    onDeposit(row) {
      this.$router.push({
        name: "deposit",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
        },
      });
    },
    //闪兑
    onFlash(row) {
      this.coinName = row.coinName;
      this.coinId = row.coinId;
      this.iconUrl = row.iconUrl;
      // this.fromAccountType = 2;
      // this.capitalIndex = 3;
      //跳至闪兑页面
      this.$router.push({
        path: "/wallet/flashExchange",
        query: {
          fromAccountType: 2,
        },
      });
    },
    //提币
    onWithdrawCoins(row) {
      this.$router.push({
        name: "withdrawCoins",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
        },
      });
    },
    //前往一键买币
    handleBuyCoin() {
      this.$router.push("/layout/c2c/buyCoin");
    },
  },
};
</script>

<style lang="scss" scoped>
.capitalAccount {
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
        ::v-deep .el-input__inner {
          border: none;
        }
      }
    }
    .card-right {
      margin: 70px 40px 0 0;
      display: flex;
      div {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #f5f7fa;
        border-radius: 6px;
        margin-left: 30px;
        font-weight: 500;
        padding: 0 20px;
        cursor: pointer;
        font-size: 18px;
        color: #333;
        &:hover {
          color: #ffffff;
          background: $colorB;
        }
      }
      .card-active {
        border: none;
        color: #ffffff;
        background: #90ff00;
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
      span {
        cursor: pointer;
        color: $colorB;
      }
    }
  }
  .table {
    background: #ffffff;
    border-radius: 15px;
    margin-top: 20px;
  }
  .capitalTable {
    margin: 0 20px;
    padding-bottom: 20px;
  }
}
</style>
