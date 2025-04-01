<template>
  <div>
    <div v-if="capitalIndex === 1" class="capitalAccount">
      <div class="title">
        <span>{{ $t("property.现货账户") }}</span>
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
          <div class="card-num">
            <span v-if="eyeShow === 1">{{ $formatNumber(sumAccount) }}</span>
            <span v-if="eyeShow === 2">******</span>
            <!-- <el-select
              style="width: 85px"
              v-model="coinName"
              @change="handleChange"
              placeholder="请选择"
            >
              <el-option
                v-for="item in conversionList"
                :key="item.id"
                :label="item.coinName"
                :value="item.coinName"
              >
              </el-option>
            </el-select> -->
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
          <div class="card-active" @click="$router.push('/wallet/deposit')">
            {{ $t("property.充币") }}
          </div>
          <div @click="$router.push('/wallet/withdrawCoins')">
            {{ $t("property.提币") }}
          </div>
          <div @click="$router.push('/wallet/fundsTransfer')">
            {{ $t("property.划转") }}
          </div>
          <div @click="flash(1)">{{ $t("property.闪兑") }}</div>
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
        <div class="table-data">
          <CapitalTable
            ref="tableRef"
            v-if="tradeSumAccountData.length"
            :tableData="tradeSumAccountData"
            :columnData="columnData"
            :isSpot="true"
          />
        </div>
      </div>
    </div>
    <!-- 钱包历史 -->
    <div v-if="capitalIndex === 2">
      <WalletHistory @changeIndex="changeIndex" />
    </div>
    <!-- 闪兑 -->
    <!-- <div v-if="capitalIndex === 3">
      <Flash @changeIndex="changeIndex" :fromAccountType="fromAccountType" />
    </div> -->
  </div>
</template>

<script>
import CapitalTable from "../capitalAccount/components/capitalTable.vue";
import WalletHistory from "../capitalAccount/walletHistory/history.vue";
import Flash from "../capitalAccount/flash/flash.vue";
import SymbolSelect from "../components/select.vue";
import { sumAccountApi, simpleApi } from "@/api/assetWallet";
import { getExchange } from "@/libs/utils";
export default {
  name: "SpotAccount",
  components: {
    CapitalTable,
    WalletHistory,
    Flash,
    SymbolSelect,
  },
  data() {
    return {
      eyeShow: 1,
      capitalIndex: 1,
      searchVal: "",
      checkVal: false,
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
          width: "180",
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
              buttonClick: this.handleTransfer,
              isShow: (row) => {
                return true;
              },
            },
            {
              type: "text",
              label: this.$t("property.充币"),
              icon: "",
              color: "",
              buttonClick: this.handleDeposit,
              isShow: (row) => {
                return true;
              },
            },
            {
              type: "text",
              label: this.$t("property.闪兑"),
              icon: "",
              color: "",
              buttonClick: this.handleFlash,
              isShow: (row) => {
                return true;
              },
            },
            {
              type: "text",
              label: this.$t("property.提币"),
              icon: "",
              color: "",
              buttonClick: this.handleWithdraw,
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
      tradeSumAccountData: [],
      fromAccountType: 1, //现货账户类型
      conversionList: [],
      coinName: "",
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
          this.tradeSumAccountData = this.tradeSumAccountData.filter(
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
    //现货总资产
    getSpotAccountAccount(coinName) {
      this.unitAssetName = getExchange();
      sumAccountApi({
        type: 1, //type:1是现货（币币）
        unitAssetName: this.unitAssetName,
        coinName: coinName,
      }).then((res) => {
        this.sumAccount = res.data?.sumAccount;
        this.transferSumAccount = `${res.data?.symbol}${res.data?.transferSumAccount}`;
        this.tradeSumAccountData = res.data.accountCoinInfoVOS;
        this.tradeSumAccountData = this.tradeSumAccountData.map((item) => {
          return {
            ...item,
            symbol: res.data?.symbol,
          };
        });
        this.tempData = this.tradeSumAccountData;
      });
    },
    //可换算币种
    getConversionList() {
      simpleApi({ isType: 7 }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.conversionList = res.data.data || [];
            this.coinName = this.conversionList[0].coinName;
            this.getSpotAccountAccount(this.coinName);
          }
        }
      });
    },
    //汇率切换
    // handleChange(val) {
    //   this.getSpotAccountAccount(val);
    // },
    coinChange(item) {
      this.$refs.selectRef.showFn();
      this.getSpotAccountAccount(item.coinName);
    },

    // 钱包历史
    walletHistory() {
      this.capitalIndex = 2;
    },
    //闪兑
    flash(index) {
      // this.capitalIndex = 3;
      // this.fromAccountType = index;
      this.$router.push({
        path: "/wallet/flashExchange",
        query: {
          fromAccountType: index,
        },
      });
    },
    changeIndex() {
      this.capitalIndex = 1;
    },
    //表格筛选
    handleFilter(val) {
      this.tradeSumAccountData = this.tradeSumAccountData.filter((v) =>
        v.coinName.toLowerCase().includes(val)
      );
    },
    handleInit() {
      this.tradeSumAccountData = this.tempData;
    },
    eyeClick(index) {
      this.eyeShow = index;
      this.$refs.tableRef.isShowFn();
    },
    //前往一键买币
    handleBuyCoin() {
      this.$router.push("/c2c/buyCoin");
    },
    //买币/卖币
    rowOperation(row) {
      // console.log("买币/卖币", row);
      this.$router.push("/c2c/buyCoin");
    },
    handleTransfer(row) {
      this.$router.push({
        name: "fundsTransfer",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
          iconUrl: row.iconUrl,
        },
      });
    },
    handleDeposit(row) {
      this.$router.push({
        name: "deposit",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
        },
      });
    },
    handleFlash(row) {
      this.coinName = row.coinName;
      this.coinId = row.coinId;
      this.iconUrl = row.iconUrl;
      // this.fromAccountType = 1; //1现货、2资金
      // this.capitalIndex = 3;
      //跳去闪兑页面
       this.$router.push({
        path: "/wallet/flashExchange",
        query: {
          fromAccountType: 1,
        },
      });
    },
    handleWithdraw(row) {
      this.$router.push({
        name: "withdrawCoins",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.capitalAccount {
  background-color: #fff;
  color: #333333;
  min-height: 600px;
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
      font-weight: 500;
      div {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 6px;
        border: 1px solid #f4f5f7;
        margin-left: 30px;
        padding: 0 20px;
        cursor: pointer;
        font-size: 18px;
        &:hover {
          color: #ffffff;
          background: #90ff00;
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
        color: #90ff00;
      }
    }
  }
  .table {
    background: #ffffff;
    border-radius: 15px;
    margin-top: 20px;
  }
  .table-data {
    margin: 0 40px;
    padding-bottom: 40px;
  }
}
</style>
