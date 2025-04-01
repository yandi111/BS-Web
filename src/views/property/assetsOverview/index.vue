<template>
  <div>
    <div class="assetsOverview"  v-if="!isWalletHistory">
      <div class="title">
        <span>{{$t('property.资产')}}</span>
        <div @click="eyeClick">
          <img
            v-if="!eyeShow"
            class="eye-open"
            src="@/assets/images/eye-open.png"
            alt=""
          />
          <img v-else class="eye-close" src="@/assets/images/eye.png" alt="" />
        </div>
      </div>
      <div class="assets-card">
        <div class="card-left">
          <div class="card-title">{{$t('property.总资产估值')}}</div>
          <div class="card-num">
            <div>
              {{ !eyeShow ? $formatNumber(sumAccount) : "******" }}
            </div>
            <div class="card-select">
              <div class="selected" @click.stop="handleSelect">
                <div>{{ coinName }}</div>
                <div class="card-icon">
                  <i
                    :class="
                      !selectShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
                    "
                  ></i>
                </div>
              </div>
              <div class="select-list" v-show="selectShow">
                <div
                  class="list-item"
                  v-for="item in conversionList"
                  :key="item.id"
                  @click.stop="chooseItem(item)"
                >
                  {{ item.coinName }}
                </div>
              </div>
            </div>
          </div>
          <div>{{ !eyeShow ? $formatNumber(transferSumAccount) : "******" }}</div>
        </div>
        <div class="card-right">
          <div class="card-active" @click="$router.push('/wallet/deposit')">
            {{$t('property.充币')}}
          </div>
          <div @click="$router.push('/wallet/withdrawCoins')">{{$t('property.提币')}}</div>
          <div @click="$router.push('/wallet/fundsTransfer')">{{$t('property.划转')}}</div>
          <div @click="walletHistory">{{ $t("property.钱包历史") }}</div>
        </div>
      </div>
      <div class="assets-noyet" v-if="!Number(sumAccount)">
        <p>
          {{$t('property.暂无资产，您可通过')}}
          <span style="color: #90ff00; cursor: pointer" @click="handleBuyCoin"
            >{{$t('property.一键买币')}}</span
          >
          {{$t('property.获得您的数字资产')}}
        </p>
      </div>
      <AssetsTable
        v-if="conversionCoinName"
        @changeUsdtList="changeUsdtList"
        :conversionCoinName.sync="conversionCoinName"
        ref="assetsTable"
        />
      </div>
      <!-- 钱包历史 -->
      <div v-else>
        <WalletHistory @changeIndex="changeIndex"  />
      </div>
  </div>

</template>

<script>
import { sumAccountApi, simpleApi } from "@/api/assetWallet";
import AssetsTable from "./components/assetsTable.vue";
import { getExchange } from "@/libs/utils";
import WalletHistory from "../capitalAccount/walletHistory/history.vue";
export default {
  name: "assetsOverview",
  components: {
    AssetsTable,
    WalletHistory,

  },
  data() {
    return {
      eyeShow: false,
      selectShow: false,
      sumAccount: "", //总资产
      transferSumAccount: "", //约等于多少法币(总资产)
      type: 0, //0:总览、 1：现货、 2：资金
      unitAssetName: "", //要转换的汇率
      conversionList: [], // 查可换算币种
      conversionCoinName: "",
      coinName: "", //选择币种
      // capitalIndex:undefined,
      isWalletHistory:false, //历史钱包
    };
  },
  mounted() {
    document.addEventListener("click", () => {
      this.selectShow = false;
    });
    this.getConversionList();
  },
  methods: {
    // 账户资产总览
    getSumAccount(coinName) {
      this.unitAssetName = getExchange();
      sumAccountApi({
        type: 0,
        unitAssetName: this.unitAssetName,
        coinName: coinName,
      }).then((res) => {
        this.sumAccount = res.data?.sumAccount;
        this.transferSumAccount = `${res.data?.symbol}${res.data?.transferSumAccount}`;
      });
    },
    //可换算币种
    getConversionList() {
      simpleApi({ isType: 7 }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.conversionList = res.data.data || [];
            this.conversionCoinName = this.conversionList[0].coinName;
            this.coinName = this.conversionList[0].coinName;
            this.usdtList = JSON.parse(JSON.stringify(res.data.data));
            this.getSumAccount(this.coinName); //总览
          }
        }
      });
    },
    walletHistory(){
      this.isWalletHistory = true
    },
    changeUsdtList(e) {
      if (Number(e.index) === 1) {
      }
    },
    eyeClick() {
      this.eyeShow = !this.eyeShow;
      this.$refs.assetsTable.eyeChange();
    },
    //前往一键买币
    handleBuyCoin() {
      this.$router.push("/layout/c2c/buyCoin");
    },
    handleSelect() {
      this.selectShow = !this.selectShow;
    },
    chooseItem(item) {
      this.coinName = item.coinName;
      this.conversionList.forEach((ele) => {
        if (item.coinName === ele.coinName) {
          this.conversionCoinName = item.coinName;
        }
      });
      //总览
      this.getSumAccount(item.coinName);
      this.selectShow = false;
    },
    changeIndex(){
      this.isWalletHistory = false
    }
  },
};
</script>

<style lang="scss" scoped>
.assetsOverview {
  background: #fff;
  color: $colorC;
  .title {
    background-color: $bgColorA;
    padding: 20px 0 20px 30px;
    display: flex;
    align-items: center;
    span {
      font-size: $fontE;
      padding-right: 10px;
    }
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
  .assets-card {
    display: flex;
    justify-content: space-between;
    height: 137px;
    background: $bgColor;
    .card-left {
      font-size: 16px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding-left: 30px;
      .card-title {
        color: #8992a6;
        font-size: 14px;
      }
      .card-num {
        display: flex;
        align-items: center;
        font-size: 26px;
        padding: 10px 0;
        ::v-deep  .el-input__inner {
          border: none;
        }
        .card-select {
          margin-left: 10px;
          font-size: $fontG;
          cursor: pointer;
          position: relative;
          .selected {
            display: flex;
            .card-icon {
              margin-left: 10px;
            }
          }
          .select-list {
            position: absolute;
            top: 30px;
            left: 50px;
            z-index: 99;
            width: 80px;
            height: 310px;
            overflow-y: scroll;
            background: #ffffff;
            box-shadow: 0px 0px 4px 0px rgba(229, 232, 245, 0.5);
            border-radius: 6px;
            .list-item {
              height: 40px;
              line-height: 40px;
              text-align: center;
              font-size: 12px;
              &:hover {
                background: #f7f7f7;
                box-shadow: 0px 0px 4px 0px rgba(229, 232, 245, 0.5);
              }
            }
          }
        }
      }
    }
    .card-right {
      display: flex;
      align-items: center;
      margin-right: 30px;
      div {
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #f5f7fa;
        border-radius: 6px;
        margin-left: 30px;
        cursor: pointer;
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
  .assets-noyet {
    height: 60px;
    line-height: 60px;
    background: linear-gradient(to right, #e6f7ec, #f6fcf7);
    p {
      font-size: 14px;
      margin-left: 30px;
      a {
        text-decoration: none;
      }
    }
  }
}
</style>
