<!-- 资金账户 -->
<template>
  <div class="overview" style="padding-top: 30px">
    <div class="flex jb ic" style="padding-right: 20px">
      <div style="font-size: 30px; font-weight: 600">{{ $t('lang_1098') }}</div>
      <div class="flex">
        <div
          class="fc btn1"
          @click="$router.push('/deposit-v2')"
          style="
            cursor: pointer;
            border-radius: 4px;
            width: 72px;
            height: 34px;
            font-size: 13px;
            font-weight: 600;
            background-color: #90ff00;
          "
        >
          {{ $t('lang_73') }}
        </div>
        <div
          class="fc btn2"
          @click="$router.push('/withdraw-v2')"
          style="
            cursor: pointer;
            border-radius: 4px;
            width: 72px;
            height: 34px;
            font-size: 13px;
            font-weight: 600;
            color: #f0f0f0;
            margin-left: 20px;
          "
        >
          {{ $t('lang_2038') }}
        </div>
        <div
          class="fc btn2"
          @click="$router.push('/Transfer-v2')"
          style="
            cursor: pointer;
            border-radius: 4px;
            width: 72px;
            height: 34px;
            font-size: 13px;
            font-weight: 600;
            color: #f0f0f0;
            margin-left: 20px;
          "
        >
          {{ $t('lang_2405') }}
        </div>
      </div>
    </div>
    <div class="flex jb ic">
      <div>
        <RefundMoney
          :totalAsset="totalAsset"
          :totalLegalAsset="totalLegalAsset"
          @iconOpen="iconOpen"
          @selectedOptionFn="selectedOptionFn"
        />
      </div>
      <div class="flex">
        <div class="flex ic" style="cursor: pointer">
          <div style="width: 16.3px; height: 16.3px">
            <img
              width="100%"
              height="100%"
              src="@/assets/images/fundAccount/icon_tnstant.png"
              alt=""
            />
          </div>
          <div
            @click="$router.push('/fastExchange')"
            class="ff"
            style="font-size: 14px; margin-left: 6px; color: #f0f0f0"
          >
            {{$t('lang_2007')}}
          </div>
        </div>
        <div class="flex ic" style="margin-left: 26px; cursor: pointer">
          <div style="width: 16.3px; height: 16.3px">
            <img
              width="100%"
              height="100%"
              src="@/assets/images/fundAccount/icon_history.png"
              alt=""
            />
          </div>
          <div
            @click="$router.push('/fastExchangehistory')"
            class="ff"
            style="font-size: 14px; color: #f0f0f0; margin-left: 6px"
          >
            {{$t('lang_2213')}}
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 82px">
      <MinCoinPair
        :coinAssetList="coinAssetList"
        :unitCoin="unitCoin"
        :iconOpenState="iconOpenState"
        @hideMinCoinFn="hideMinCoinFn"
      />
    </div>

    <div></div>
  </div>
</template>

<script>
import RefundMoney from './com/RefundMoney.vue'
import MinCoinPair from './com/MinCoinPair.vue'

import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import { GetFundTotal } from '@/api/hy'
export default {
  name: 'FundAccount',
  mixins: [],
  components: {
    RefundMoney,
    MinCoinPair,
  },
  data() {
    return {
      totalAsset: '',
      totalLegalAsset: '',
      unitCoin: 'USDT',
      coinAssetList: [],
      coinList: [],
      coinAssetListMin: [],
      iconOpenState: 1,
    }
  },
  mounted() {
    this.fetchUserInfo()
    this.initTotal(this.unitCoin)
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  methods: {
    ...mapActions(['fetchUserInfo']),
    iconOpen(type) {
      this.iconOpenState = type
    },
    selectedOptionFn(unitCoin) {
      this.initTotal(unitCoin)
      this.unitCoin = unitCoin
    },

    async initTotal(unitCoin) {
      let params = {
        unitCoin: unitCoin,
        legalCoin: 'CNY',
      }

      try {
        const res = await GetFundTotal(params)
        if (res.code == 200) {
          console.log(res, 'selectedOptionselectedOption')
          const { totalAsset, totalLegalAsset, coinAssetList } = res.data
          this.totalAsset = totalAsset //总资产
          this.totalLegalAsset = totalLegalAsset // 法币总资产
          this.coinList = coinAssetList
          this.coinAssetList = coinAssetList
          this.coinAssetListMin = coinAssetList.filter((item) => {
            return item.totalLegal > 10
          })
        } else {
          this.$customMessage(2, res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
      // axios
      //   .get("/app/bsex-finance/asset/main/total", {params,
      //     headers: {
      //       "x-language": "zh_CN",
      //       "x-device-id": "", // 设备唯一标识
      //       "x-app-type": "WEB",
      //       "x-app-version": "", // app版本号
      //       "x-app-token": this.getToken, //
      //       "x-device-model": "", //  设备型号
      //     },
      //   })
      //   .then((res) => {
      //     if (res.data.code == 200) {
      //       console.log(res,'selectedOptionselectedOption');
      //       const { totalAsset ,totalLegalAsset,coinAssetList} = res.data.data
      //       this.totalAsset = totalAsset               //总资产
      //       this.totalLegalAsset = totalLegalAsset     // 法币总资产
      //       this.coinList = coinAssetList
      //       this.coinAssetList = coinAssetList
      //       this.coinAssetListMin = coinAssetList.filter(item=>{
      //   return item.totalLegal > 10
      // })

      //     } else {
      //       this.$customMessage(2, res.data.msg);
      //     }
      //   })
      //   .catch((e) => {
      //     this.$customMessage(2, e);
      //     console.log(e);
      //   });
    },

    hideMinCoinFn(type) {
      if (type) {
        // eslint-disable-next-line no-self-assign
        this.coinAssetList = this.coinList
      } else {
        this.coinAssetList = this.coinAssetListMin
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.overview {
  background: #141414;
  height: 100%;
  padding: 20px 20px 0px 20px;

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

.fc {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn1 {
  color: #252525;
}

.btn1:hover {
  color: #737373;
}

.btn2 {
  background-color: #252525;
}

.btn2:hover {
  background-color: #363636;
}
</style>
