<template>
  <div class="assets-table">
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tableType"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <div class="pad">
            <div class="pad-box">
              <div class="titile-box">
                <div class="tab-title">
                  <p class="todayEarn" v-if="index === 0">{{$t('property.总资产估值')}}</p>
                  <p class="todayEarn" v-if="index === 1">{{$t('property.总资产估值')}}</p>
                  <p class="todayEarn" v-if="index === 2">{{$t('property.总资产估值')}}</p>
                  <p class="todayEarn" v-if="index === 3">{{$t('property.总资产估值')}}</p>
                  <!-- <p class="todayEarn" v-if="index === 1">
              <span>今日盈亏</span>
              <i class="el-icon-arrow-right"></i>
            </p> -->
                </div>
                <div class="tab-num">
                  <p v-if="index === 0">
                    <span>{{
                      !eyeIsShow ? $formatNumber(sumAccount) : "******"
                    }}</span>
                    <span class="usdt">{{ conversionCoinName }}</span>
                    <span
                      style="font-size: 16px; color: #999; padding-left: 5px"
                      >{{
                        !eyeIsShow
                          ? $formatNumber(transferSumAccount)
                          : "******"
                      }}</span
                    >
                  </p>
                  <p v-if="index === 1">
                    <span>{{
                      !eyeIsShow ? $formatNumber(accountEquity) : "******"
                    }}</span>
                    <span class="usdt">USDT</span>
                    <span
                      style="font-size: 16px; color: #999; padding-left: 5px"
                      >{{
                        !eyeIsShow
                          ? $formatNumber(transferAccountEquity)
                          : "******"
                      }}</span
                    >
                  </p>
                  <p v-if="index === 2">
                    <span>{{
                      !eyeIsShow
                        ? $formatNumber(documentaryAccountStr)
                        : "******"
                    }}</span>
                    <span class="usdt">USDT</span>
                    <span
                      style="font-size: 16px; color: #999; padding-left: 5px"
                      >{{
                        !eyeIsShow
                          ? $formatNumber(transferDocumentaryAccount)
                          : "******"
                      }}</span
                    >
                  </p>
                  <!-- <p v-if="index === 1">
              <span v-if="eyeIsShow === 1">{{ contractTodayEarn }}</span>
              <span v-if="eyeIsShow === 2">******</span>
              <span class="usdt">USDT</span>
              <span class="small-font" v-if="eyeIsShow === 1"
                >0.000（合约账户今日盈亏）</span
              >
              <span class="small-font" v-if="eyeIsShow === 2">******</span>
            </p> -->
                  <p v-if="index === 3">
                    <span>{{
                      !eyeIsShow ? $formatNumber(sumAccount) : "******"
                    }}</span>
                    <span class="usdt">{{ conversionCoinName }}</span>
                    <span
                      style="font-size: 16px; color: #999; padding-left: 5px"
                      >{{
                        !eyeIsShow
                          ? $formatNumber(transferSumAccount)
                          : "******"
                      }}</span
                    >
                  </p>
                </div>
              </div>
              <div class="search">
                <!-- 资金账户搜索 -->
                <div class="tab-search" v-if="index === 0">
                  <div class="search-box">
                    <el-input
                      :placeholder="$t('property.搜索币种')"
                      prefix-icon="el-icon-search"
                      v-model="fundsSearchVal"
                      @input="fundsSearch"
                    >
                    </el-input>
                  </div>
                  <div class="check-box">
                    <Checkbox @change="fundsCheck" /><span
                      :class="fundsCheckVal ? 'text-active' : ''"
                      >{{$t('property.隐藏0余额')}}</span
                    >
                  </div>
                </div>
                <!-- 合约账户搜索 -->
                <div class="tab-search" v-if="index === 1">
                  <div class="search-box">
                    <el-input
                      :placeholder="$t('property.搜索币种')"
                      prefix-icon="el-icon-search"
                      v-model="contractSearchVal"
                      @input="contractSearch"
                    >
                    </el-input>
                  </div>
                  <div class="check-box">
                    <Checkbox @change="contractCheck" /><span
                      :class="contractCheckVal ? 'text-active' : ''"
                      >{{$t('property.隐藏0余额')}}</span
                    >
                  </div>
                </div>
                <!-- 跟单账户搜索 -->
                <div class="tab-search" v-if="index === 2">
                  <div class="search-box">
                    <el-input
                      :placeholder="$t('property.搜索币种')"
                      prefix-icon="el-icon-search"
                      v-model="documentarySearchVal"
                      @input="documentarySearch"
                    >
                    </el-input>
                  </div>
                  <div class="check-box">
                    <Checkbox @change="documentaryCheck" /><span
                      :class="documentaryCheckVal ? 'text-active' : ''"
                      >{{$t('property.隐藏0余额')}}</span
                    >
                  </div>
                </div>
                <!-- 现货账户搜索 -->
                <div class="tab-search" v-if="index === 3">
                  <div class="search-box">
                    <el-input
                      :placeholder="$t('property.搜索币种')"
                      prefix-icon="el-icon-search"
                      v-model="spotSearchVal"
                      @input="spotSearch"
                    >
                    </el-input>
                  </div>
                  <div class="check-box">
                    <Checkbox @change="spotCheck" /><span
                      :class="spotCheckVal ? 'text-active' : ''"
                      >{{$t('property.隐藏0余额')}}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-border"></div>
          <div class="pad">
            <!-- 资金账户 -->
            <div class="tab-table" v-if="index === 0">
              <el-table
                :data="assetAccountData"
                style="width: 100%"
                v-if="activeName === item.name"
              >
                <el-table-column :label="$t('property.币种')">
                  <template slot-scope="scope">
                    <img class="icon-img" :src="scope.row.iconUrl" alt="" />
                    <span style="padding-left: 10px">{{
                      scope.row.coinName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="availableAmount" :label="$t('property.可用')">
                  <template slot-scope="scope">
                    <span>{{
                      !eyeIsShow
                        ? $formatNumber(scope.row.availableAmount)
                        : "******"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="frozenAmount" :label="$t('property.冻结')">
                  <template slot-scope="scope">
                    <span>{{
                      !eyeIsShow
                        ? $formatNumber(scope.row.frozenAmount)
                        : "******"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('property.全部')" width="400">
                  <template slot-scope="scope">
                    <span>{{
                      !eyeIsShow
                        ? $formatNumber(scope.row.amount) +
                          " ≈" +
                          symbol +
                          $formatNumber(scope.row.transferAmount)
                        : "******"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('property.操作')" width="250">
                  <template slot-scope="scope">
                    <el-button
                      @click="capitalAccounttransferClick(scope.row)"
                      type="text"
                      >{{$t('property.划转')}}</el-button
                    >
                    <el-button type="text" @click="depositClick(scope.row)"
                      >{{$t('property.充币')}}</el-button
                    >
                    <el-button
                      type="text"
                      @click="withdrawCoinsClick(scope.row)"
                      >{{$t('property.提币')}}</el-button
                    >
                  </template>
                </el-table-column>
                <template slot="empty">
                  <my-empty></my-empty>
                </template>
              </el-table>
            </div>
            <!-- 合约账户 -->
            <div class="tab-table" v-if="index === 1">
              <el-table
                :data="contractAccountData"
                style="width: 100%"
                v-if="activeName === item.name"
              >
                <el-table-column :label="$t('property.币种')">
                  <template slot-scope="scope">
                    <img class="icon-img" :src="scope.row.coinIcon" alt="" />
                    <span style="padding-left: 10px">{{
                      scope.row.coinName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="accountEquity" :label="$t('property.账户权益')">
                  <template slot-scope="scope">
                    <span>{{
                      !eyeIsShow
                        ? $formatNumber(scope.row.accountEquity)
                        : "******"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="availableDeposit" :label="$t('property.可用保证金')">
                  <template slot-scope="scope">
                    <span>{{
                      !eyeIsShow
                        ? $formatNumber(scope.row.availableDeposit)
                        : "******"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="occupyDeposit" :label="$t('property.占用保证金')">
                  <template slot-scope="scope">
                    <span>{{
                      !eyeIsShow
                        ? $formatNumber(scope.row.occupyDeposit)
                        : "******"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('property.操作')" width="180">
                  <template slot-scope="scope">
                    <el-button @click="transferClick(scope.row)" type="text"
                      >{{$t('property.划转')}}</el-button
                    >
                  </template>
                </el-table-column>
                <template slot="empty">
                  <my-empty></my-empty>
                </template>
              </el-table>
            </div>
            <!-- 跟单账户 -->
            <div class="tab-table" v-if="index === 2">
              <el-table
                :data="documentaryData"
                style="width: 100%"
                v-if="activeName === item.name"
              >
                <el-table-column :label="$t('property.币种')">
                  <template slot-scope="scope">
                    <img class="icon-img" :src="scope.row.coinIcon" alt="" />
                    <span style="padding-left: 10px">{{
                      scope.row.coinName
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="availableDeposit" :label="$t('property.可用')">
                  <template slot-scope="scope">
                    <span
                      >{{
                        !eyeIsShow
                          ? $formatNumber(scope.row.availableDeposit)
                          : "******"
                      }}
                      USDT</span
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="occupyDeposit" :label="$t('property.冻结')">
                  <template slot-scope="scope">
                    <span
                      >{{
                        !eyeIsShow
                          ? $formatNumber(scope.row.occupyDeposit)
                          : "******"
                      }}
                      USDT</span
                    >
                  </template>
                </el-table-column>

                <el-table-column :label="$t('property.操作')" width="280">
                  <template slot-scope="scope">
                    <el-button
                      @click="documentaryTransferClick(scope.row)"
                      type="text"
                      >{{$t('property.划转')}}</el-button
                    >
                  </template>
                </el-table-column>
                <template slot="empty">
                  <my-empty></my-empty>
                </template>
              </el-table>
            </div>
            <!-- 现货账户 -->
            <div class="tab-table" v-if="index === 3">
              <el-table
                :data="spotAccountData"
                style="width: 100%"
                v-if="activeName === item.name"
              >
                <el-table-column :label="$t('property.资产')">
                  <template slot-scope="scope">
                    <img class="icon-img" :src="scope.row.iconUrl" alt="" />
                    <span style="padding-left: 10px">{{
                      scope.row.coinName
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="availableAmount" :label="$t('property.可用')">
                  <template slot-scope="scope">
                    <span>{{
                      !eyeIsShow
                        ? $formatNumber(scope.row.availableAmount)
                        : "******"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="frozenAmount" :label="$t('property.已冻结')">
                  <template slot-scope="scope">
                    <span>{{
                      !eyeIsShow
                        ? $formatNumber(scope.row.frozenAmount)
                        : "******"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('property.全部')">
                  <template slot-scope="scope">
                    <span>{{
                      !eyeIsShow
                        ? $formatNumber(scope.row.amount) +
                          " ≈" +
                          symbol +
                          $formatNumber(scope.row.transferAmount)
                        : "******"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('property.操作')" width="400">
                  <template slot-scope="scope">
                    <el-button type="text" @click="onbuyorsell(scope.row)"
                      >{{$t('property.买币/卖币')}}</el-button
                    >
                    <el-button
                      @click="spotAccounttransferClick(scope.row)"
                      type="text"
                      >{{$t('property.划转')}}</el-button
                    >
                    <el-button
                      type="text"
                      @click="spotAccountDeposit(scope.row)"
                      >{{$t('property.充币')}}</el-button
                    >
                    <el-button type="text" @click="spotAccountFlash(scope.row)"
                      >{{$t('property.闪兑')}}</el-button
                    >
                    <el-button
                      type="text"
                      @click="spotAccountWithdrawCoins(scope.row)"
                      >{{$t('property.提币')}}</el-button
                    >
                  </template>
                </el-table-column>
                <template slot="empty">
                  <my-empty></my-empty>
                </template>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Checkbox from "@/components/checkbox/checkbox.vue";
import {
  sumAccountApi,
  contractAccountApi,
  documentaryAccount,
} from "@/api/assetWallet";
import { getExchange } from "@/libs/utils";

export default {
  name: "AssetsTable",
  props: {
    conversionCoinName: {
      type: String,
      default: "",
    },
  },
  components: {
    Checkbox,
  },
  data() {
    return {
      eyeIsShow: false,
      activeName: "first",
      fundsSearchVal: "",
      fundsCheckVal: false, //资金
      contractSearchVal: "",
      contractCheckVal: false, //合约
      spotSearchVal: "", //现货
      spotCheckVal: false,
      documentarySearchVal: "", //跟单
      documentaryCheckVal: false,
      index: 0,
      tableType: [
        {
          label: this.$t('property.资金账户'),
          name: "first",
        },
        {
          label: this.$t('property.合约账户'),
          name: "second",
        },
        {
          label: this.$t('property.跟单账户'),
          name: "three",
        },
        {
          label: this.$t('property.现货账户'),
          name: "four",
        },
      ],
      type: 0, //0:总览 1：币币 2：otc 3：合约
      unitAssetName: "", //要转换的汇率
      assetAccountData: [], //资金账户数据
      assetAccountSearchData: [],
      contractAccountData: [], //合约表格数据 (账户权益待后端处理)
      contractAccountSearchData: [],
      spotAccountData: [], //现货账户数据
      spotAccountSearchData: [],
      transferOtcSumAccount: "", //约等于多少法币(资金账户)
      otcSumAccount: "", //资金总资产
      accountEquity: "", //合约总资产
      transferAccountEquity: "", //合约账户约等于多少法币
      contractTodayEarn: "", //合约今日盈亏(只有合约有,暂时未提供)
      tradeSumAccount: "", //现货账户总资产
      transferTradeSumAccount: "", //现货账户约等于多少法币
      symbol: "", //法币符号
      sumAccount: "",
      transferSumAccount: "",
      documentaryData: [], //跟单账户数据
      documentarySearchData: [],
      documentaryAccountStr: "",
      transferDocumentaryAccount: "",
    };
  },
  mounted() {
    this.getAccountList(2); //资金账户
  },
  methods: {
    //获取资金账户数据
    getAccountList(type) {
      this.unitAssetName = getExchange();
      sumAccountApi({
        type: type, //1/现货账户；2资金账户
        unitAssetName: this.unitAssetName,
        coinName: this.conversionCoinName,
      }).then((res) => {
        this.sumAccount = res.data?.sumAccount;
        this.transferSumAccount = `${res.data?.symbol}${res.data?.transferSumAccount}`;
        this.symbol = res.data?.symbol;
        //资金账户数据
        this.assetAccountData = res.data.accountCoinInfoVOS || [];
        this.assetAccountSearchData = this.assetAccountData;
        //现货账户数据
        this.spotAccountData = res.data.accountCoinInfoVOS || [];
        this.spotAccountSearchData = this.spotAccountData;
      });
    },
    handleClick(e) {
      this.$emit("changeUsdtList", e);
      if (Number(e.index) === 1) {
        //合约接口
        this.unitAssetName = getExchange();
        contractAccountApi({
          unitAssetName: this.unitAssetName,
          coinName: "USDT", //只有USDT
        }).then((res) => {
          if (res.status && res.status === 200) {
            if (res.data && res.data.success) {
              //合约总资产
              this.accountEquity = res.data.data.accountEquity;
              this.transferAccountEquity = `${res.data?.data?.symbol}${res.data?.data?.transferAccountEquity}`;
              let list = [];
              list.push(res.data.data);
              this.contractAccountData = list || [];
              this.contractAccountSearchData = this.contractAccountData;
            }
          }
        });
      } else if (Number(e.index) === 2) {
        //跟单账户
        this.getDocumentaryAccount();
      } else if (Number(e.index) === 3) {
        //现货账户
        this.getAccountList(1);
      } else {
        //资金账户
        this.getAccountList(2);
      }
      this.fundsSearchVal = "";
      this.contractSearchVal = "";
      this.spotSearchVal = "";
    },
    //资金账户划转
    capitalAccounttransferClick(row) {
      this.$router.push({
        name: "fundsTransfer",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
          iconUrl: row.iconUrl,
        },
      });
    },
    //资金账户充币
    depositClick(row) {
      this.$router.push({
        name: "deposit",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
        },
      });
    },
    //资金账户提币
    withdrawCoinsClick(row) {
      console.log("row", row);
      this.$router.push({
        name: "withdrawCoins",
        params: {
          value: 2,
          coinName: row.coinName,
          coinId: row.coinId,
        },
      });
    },
    //现货账户买币/卖币
    onbuyorsell(row) {
       this.$router.push("/layout/c2c/buyCoin");
    },
    //现货账户划转
    spotAccounttransferClick(row) {
      this.$router.push({
        name: "fundsTransfer",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
          iconUrl: row.iconUrl,
        },
      });
    },
    //现货账户充币
    spotAccountDeposit(row) {
      this.$router.push({
        name: "deposit",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
        },
      });
    },
    //现货账户闪兑
    spotAccountFlash(row) {
      // this.$router.push({
      //   name: "capitalAccount",
      //   params: {
      //     capitalIndex: 3,
      //     coinName: row.coinName,
      //     coinId: row.coinId,
      //   },
      // });
       this.$router.push({
        path:'/wallet/flashExchange',
        query:{
          fromAccountType: 1
        }
      })
    },
    //现货账户提币
    spotAccountWithdrawCoins(row) {
      this.$router.push({
        name: "withdrawCoins",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
        },
      });
    },

    //合约账户划转
    transferClick(row) {
      this.$router.push({
        name: "fundsTransfer",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
          iconUrl: row.iconUrl,
        },
      });
    },
    //跟单账户划转
    documentaryTransferClick(row) {
      this.$router.push({
        name: "fundsTransfer",
        params: {
          coinName: row.coinName,
          coinId: row.coinId,
          iconUrl: row.coinIcon,
        },
      });
    },

    //跟单账户查询
    getDocumentaryAccount() {
      this.unitAssetName = getExchange();
      documentaryAccount({
        unitAssetName: this.unitAssetName,
        coinName: "USDT", //只有USDT
      }).then((res) => {
        this.documentaryAccountStr = res.data?.data?.sumAccount;
        this.transferDocumentaryAccount = `${res.data?.data?.symbol}${res.data?.data?.transferSumAccount}`;
        let list = [];
        list.push(res.data.data);
        this.documentaryData = list || [];
        this.documentarySearchData = this.documentaryData;
      });
    },

    // 资金账户搜索
    fundsSearch(val) {
      let dataArr = [];
      let searchKey = val && val.toLowerCase().trim();
      if (searchKey) {
        this.assetAccountSearchData.filter((item) => {
          if (item.coinName.toLowerCase().indexOf(searchKey) != -1) {
            dataArr.push(item);
          }
        });
      } else {
        dataArr = this.assetAccountSearchData;
      }
      this.assetAccountData = dataArr;
    },
    fundsCheck(val) {
      this.fundsCheckVal = val;
      if (val) {
        this.fundsSearchVal = "";
        this.assetAccountData = this.assetAccountSearchData.filter(
          (v) => Number(v.availableAmount) !== 0
        );
      } else {
        this.assetAccountData = this.assetAccountSearchData;
      }
    },

    //合约账户搜索
    contractSearch(val) {
      let dataArr = [];
      let searchKey = val && val.toLowerCase().trim();
      if (searchKey) {
        this.contractAccountSearchData.filter((item) => {
          if (item.coinName.toLowerCase().indexOf(searchKey) != -1) {
            dataArr.push(item);
          }
        });
      } else {
        dataArr = this.contractAccountSearchData;
      }
      this.contractAccountData = dataArr;
    },
    contractCheck(val) {
      this.contractCheckVal = val;
      if (val) {
        this.contractSearchVal = "";
        this.contractAccountData = this.contractAccountSearchData.filter(
          (v) => Number(v.availableAmount) !== 0
        );
      } else {
        this.contractAccountData = this.contractAccountSearchData;
      }
    },

    //现货账户搜索
    spotSearch(val) {
      let dataArr = [];
      let searchKey = val && val.toLowerCase().trim();
      if (searchKey) {
        this.spotAccountSearchData.filter((item) => {
          if (item.coinName.toLowerCase().indexOf(searchKey) != -1) {
            dataArr.push(item);
          }
        });
      } else {
        dataArr = this.spotAccountSearchData;
      }
      this.spotAccountData = dataArr;
    },
    spotCheck(val) {
      this.spotCheckVal = val;
      if (val) {
        this.spotSearchVal = "";
        this.spotAccountData = this.spotAccountSearchData.filter(
          (v) => Number(v.availableAmount) !== 0
        );
      } else {
        this.spotAccountData = this.spotAccountSearchData;
      }
    },

    //跟单账户搜索
    documentarySearch(val) {
      let dataArr = [];
      let searchKey = val && val.toLowerCase().trim();
      if (searchKey) {
        this.documentarySearchData.filter((item) => {
          if (item.coinName.toLowerCase().indexOf(searchKey) != -1) {
            dataArr.push(item);
          }
        });
      } else {
        dataArr = this.documentarySearchData;
      }
      this.documentaryData = dataArr;
    },
    documentaryCheck(val) {
      this.documentaryCheckVal = val;
      if (val) {
        this.spotSearchVal = "";
        this.documentaryData = this.documentarySearchData.filter(
          (v) => Number(v.availableDeposit) !== 0
        );
      } else {
        this.documentaryData = this.documentarySearchData;
      }
    },

    eyeChange() {
      this.eyeIsShow = !this.eyeIsShow;
    },
  },
};
</script>

<style lang="scss" scoped>
.assets-table {
  padding-bottom: 40px;
  .container {
    padding-top: 40px;
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
    .tab-title {
      display: flex;
      justify-content: space-between;

      .todayEarn {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #8992a6;
      }
    }
    .tab-num {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      font-size: 26px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      .usdt {
        padding-left: 5px;
      }
      // .small-font {
      //   font-size: 16px;
      //   font-family: PingFangSC-Medium, PingFang SC;
      //   font-weight: 500;
      //   color: #8992A6;
      //   padding-left: 10px;
      // }
    }
    .search {
      padding-right: 15px;
      padding-bottom: 15px;
      .tab-search {
        margin-top: 30px;
        display: flex;
        .search-box {
          display: flex;
          align-items: center;
          width: 300px;
          margin-right: 20px;
          ::v-deep .el-input__inner {
            height: 50px;
            line-height: 50px;
            background: #f5f7fa;
            border: none;
          }
          ::v-deep .el-input__icon {
            line-height: 50px;
          }
        }
        .check-box {
          display: flex;
          align-items: center;
          padding-right: 10px;
          color: #333;
          font-size: 14px;
          .text-active {
            color: #90ff00;
          }
        }
      }
    }
    .tab-border {
      margin-top: 30px;
      border-bottom: 1px solid #f5f7fa;
      margin-bottom: 15px;
    }
    .tab-table {
       padding-right: 30px;
      .icon-img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .empty {
      margin-top: 120px;
    }
  }
}
.pad {
  padding-left: 30px;
  .pad-box {
    display: flex;
    justify-content: space-between;
  }
}

//表格处理
::v-deep .el-tabs__nav-wrap::after {
  background-color: transparent;
}

//表label颜色
::v-deep .el-table th.el-table__cell > .cell {
  color: #8992a6;
}
//表格边框
::v-deep .el-table td.el-table__cell {
  border-bottom: 1px solid #f4f5f7 !important;
}
::v-deep .el-table th.el-table__cell.is-leaf,
.el-table td.el-table__cell {
  border-bottom: none;
}
.el-table::before {
  background: #f4f5f7;
}
/* 修改鼠标经过表格的颜色 */
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f4f5f7 !important;
}

::v-deep .el-table .el-table__cell {
  padding: 7px 0;
}
::v-deep  .el-table .cell {
  line-height: 48px;
}
</style>
