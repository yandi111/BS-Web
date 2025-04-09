<template>
  <div class="card card1 flex">
    <div class="card1_left flex">
      <!--   <p class="abandon">注：这个绿色的数据会跳动</p>-->

      <h2 class="num">
        <ScrollNumber :number="personNum"></ScrollNumber>
      </h2>

      <h2 class="title">
        {{ $t('home_1') }} <br/>
        {{ $t('home_2') }}
      </h2>

      <div class="register flex">
        <el-input v-model="ruleForm.username" :placeholder="$t('home_3')"/>

        <el-button type="primary" @click="$router.push({name: 'register', query: {msg: ruleForm.username}})">
          {{ $t('lang_943') }}
        </el-button>
      </div>

      <div class="allAssets flex" v-if="getToken">
        <h6 class="flex">{{ $t('home_4') }} <img @click="isCurrency = !isCurrency"
                                                 src="../../../assets/images/icon_eye_close.png" alt=""/></h6>

        <div class="assets flex" v-if="isCurrency">
          <h1 class="flex">{{ info.totalAsset }}</h1>

          <el-dropdown @command="onCommand">
            <a class="el-dropdown-link">
              {{ currencyForm.unitCoin || 0.00 }}<i class="el-icon-caret-bottom el-icon--right"></i>
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="BTC">BTC</el-dropdown-item>
              <el-dropdown-item command="ETH">ETH</el-dropdown-item>
              <el-dropdown-item command="BNB">BNB</el-dropdown-item>
              <el-dropdown-item command="USDT">USDT</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <P>≈ ${{ info.totalLegalAsset || 0.00 }}</P>
        </div>

        <div v-else class="assets flex">
          <h1>****</h1>
        </div>

        <p class="today">{{ $t('lang_1906') }} <span
            :class="[+info.todayProfitAndLoss > 0 ? 'add' : +info.todayProfitAndLoss === 0 ? 'default' : 'reduce']">${{
            info.todayProfitAndLoss || 0.00
          }} ({{ info.todayProfitAndLossRate || 0.00 }}%)</span></p>

        <el-button>{{ $t('lang_2422') }}</el-button>
      </div>

      <div class="download flex">
        <div class="download_app">
          <p>{{ $t('home_5') }}</p>

          <div class="download_icon flex">
            <a><img class="phone" src="@/assets/images/home/phone-b.png" alt="手机"></a>
            <a class="flex ic"><img class="email" src="@/assets/images/home/email-b.png" alt="邮箱"></a>
          </div>
        </div>

        <div class="download_app">
          <p>{{ $t('home_13') }}</p>

          <div class="download_icon flex">
            <el-popover
                :visible-arrow="false"
                placement="right-end"
                trigger="hover">
              <a slot="reference"><img class="qr-code" src="../../../assets/images/code.png" alt="下载二维码"></a>
              <div class="qr-content">
                <div class="title">扫描下载UBEX</div>
                <div class="qr-box">
                  <img src="@/assets/images/home/qr-code.png" alt="">
                </div>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </div>

    <div class="card1_right fd">
      <div class="currency">
        <div class="flex jb currency_header">
          <div class="flex tab">
            <a @click="setTab(0)" :class="currency_type === 0 ? 'active' : ''">{{ $t('lang_1717') }}</a>
            <a @click="setTab(1)" :class="currency_type === 1 ? 'active' : ''">{{ $t('home_6') }}</a>
          </div>
          <a class="all">{{ $t('home_7') }}</a>
        </div>
        <div v-if="currency_type === 0" class="currency_main">
          <div v-for="(item,index) in hotCoinList" :key="index" class="flex jb item">
            <div class="ff flex ic item_left">
              <img width="100%" height="100%" :src="item.symbolInfo.icon" alt="">
              <p class="item_name">{{ item.symbolInfo.coinsName.split('-')[0] }} <span
                  class="sub-title">{{ item.symbolInfo.coinsName.split('-')[1] }}</span></p>
            </div>
            <p class="item_price">${{ formatNumber(item.market.close) || '--' }}</p>
            <p class="item_rate" :style="{color:item.market.increase24H > 0 ? '#0CBB57' : '#ED3C2F' }">
              {{ item.market.increase24H || '--' }}%</p>
          </div>
        </div>

        <div v-else class="currency_main">
          <div v-for="(item,index) in newCoinList" :key="index" class="flex jb item">
            <div class="ff flex ic item_left">
              <img width="100%" height="100%" :src="item.icon" alt="">
              <p class="item_name">{{ item.coinName.split('/')[0] }} <span
                  class="sub-title">{{ item.coinName.split('/')[1] }}</span></p>
            </div>
            <p class="item_price">${{ formatNumber(item.price) || '--' }}</p>
            <p class="item_rate" :style="{color:item.increase24H > 0 ? '#0CBB57' : '#ED3C2F' }">
              {{ item.increase24H || '--' }}%</p>
          </div>
        </div>
      </div>

      <div class="info-box flex ic jb">
        <div class="left-box">
          <div class="title">{{$t('home_8')}}</div>
          <div class="desc">{{$t('home_8')}}</div>
        </div>
        <img src="@/assets/images/home/info-b.png" alt="">
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {GetUserAllMoney} from "@/api/home";
import ScrollNumber from '@/components/ScrollNumber.vue'
import {GetCoinNewsApi, GetQuotesApi} from "@/api/quotes";
import BigNumberUtils from "@/utils/format";

const bigNumber = new BigNumberUtils()

export default {
  components: {
    ScrollNumber
  },
  computed: {
    ...mapGetters(['getInitListInfo', 'getToken', 'getQuotesMarket']),
  },
  watch: {
    'getQuotesMarket'() {
      if (this.currency_type === 0) {
        this.hotCoinList = this.hotCoinList.map((item, index) => {
          return {
            ...item,
            market: {
              ...item.market,
              increase24H: this.getQuotesMarket.symbol === item.symbolInfo.coinsName ? bigNumber.multiply(this.getQuotesMarket.increase24H, 100) : item.market.increase24H,
              close: this.getQuotesMarket.symbol === item.symbolInfo.coinsName ? this.getQuotesMarket.close : item.market.close
            },
          }
        })
      } else {
        this.newCoinList = this.newCoinList.map((item, index) => {
          return {
            ...item,
            increase24H: this.getQuotesMarket.symbol === item.coinName.replace('/', '-') ? bigNumber.multiply(this.getQuotesMarket.increase24H, 100) : item.increase24H,
            price: this.getQuotesMarket.symbol === item.coinName.replace('/', '-') ? this.getQuotesMarket.close : item.price
          }
        })
      }
    }
  },
  data() {
    return {
      // 当前币种显示类型, 0: 热门，1：新币
      currency_type: 0,

      ruleForm: {
        username: ''
      },

      isCurrency: true,

      currencyForm: {
        unitCoin: 'BTC',
        legalCoin: 'USDT'
      },

      info: [],
      personNum: 231750167,

      timer: null,
      hotCoinList: [],
      newCoinList: []
    }
  },
  created() {
    this.initHttp()
  },
  mounted() {
    this.getToken && this.getCurrencyAll()
    this.subscribe()

    // if (this.timer) {
    //   clearInterval(this.timer)
    // }
    // this.timer = setInterval(() => {
    //   const increment = Math.floor(Math.random() * 10) + 1;
    //   this.personNum = this.personNum + increment;
    // }, Math.floor(Math.random() * 10000));
  },
  beforeDestroy() {
    this.unsubscribe()
    // if (this.timer) {
    //   clearInterval(this.timer)
    // }
  },
  methods: {
    ...mapActions(['fetchInitListInfo']),
    async setTab(tab) {
      this.currency_type = tab
      if (tab === 0) {
        await this.getHotList()
      } else {
        await this.getNewCoinsList()
      }
      this.initNewCoinsByField()
    },
    async initHttp() {
      await this.getHotList()
      await this.getNewCoinsList()
      this.initNewCoinsByField()
    },
    async getHotList() {
      return Promise.try(async () => {
        return await GetQuotesApi({isHot: 1, size: 20, page: 1})
      }).then(res => {
        this.hotCoinList = res.data.records
        this.hotCoinList.forEach(item => {
          item.market.increase24H = bigNumber.multiply(item.market.increase24H, 100)
        })
      }).catch(() => {
      })
    },

    initNewCoinsByField() {
      this.newCoinList = this.newCoinList.map((item, index) => {
        const obj = this.hotCoinList.find(a => a.symbolInfo.coinsName.split('-')[0] === item.coinName.split('/')[0]) || {}
        return {
          ...item,
          increase24H: Object.keys(obj).length > 0 ? obj?.market?.increase24H : '',
          icon: Object.keys(obj).length > 0 ? obj?.symbolInfo?.icon : '',
        }
      })
    },
    //订阅
    subscribe() {
      this.$socket.subscribe({
        cmd: 'SUBSCRIBE',
        data: {
          topic: 'market.kline'
        }
      })
    },

    //取消订阅
    unsubscribe() {
      this.$socket.unsubscribe({
        cmd: 'SUBSCRIBE',
        data: {
          topic: 'market.kline'
        }
      })
    },
    async getNewCoinsList() {
      return Promise.try(async () => {
        return await GetCoinNewsApi()
      }).then(res => {
        this.newCoinList = res.data
        this.newCoinList.forEach(item => {
          item.increase24H = bigNumber.multiply(item.increase24H, 100)
        })
      }).catch(() => {
      })
    },
    formatNumber(num) {
      // 将数字转换为字符串
      const [integerPart, decimalPart] = num.toString().split(".");
      // 使用正则表达式添加千分位
      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // 如果有小数部分，返回格式化后的整数部分和小数部分
      return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    },

    // 总资产
    onCommand(e) {
      this.currencyForm.unitCoin = e
      this.getCurrencyAll()
    },

    // 获取总资产
    getCurrencyAll() {
      Promise.try(async () => {
        return await GetUserAllMoney(this.currencyForm)
      }).then(res => {
        this.info = res.data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.card1 {
  width: 100%;
  justify-content: space-between;

  &_left {
    flex-direction: column;

    .abandon {
      display: block;
      position: relative;
      margin: 0 auto 0 70px;
      @include Font((
          size: 13px,
          color: $abandon_color,
      ));

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 1px;
        background-color: $abandon_color;
      }
    }

    .num {
      @include Font((color: $colorA, size: $h1, weight: bold));
    }

    .title {
      @include Font((color: $colorD, size: $h1, weight: bold));
      margin-bottom: 20px;
    }

    .register {
      margin-bottom: 100px;
      justify-content: space-between;

      .el-input {
        margin-right: 10px;
        width: 308px;
        height: 48px;
        font-size: $h4;

        ::v-deep {
          .el-input__inner {
            height: 48px;
            line-height: 48px;
            border-color: $border_color;
            background-color: transparent;
            color: $colorD;
            transition: .3s;
            border-radius: 8px;

            &:hover {
              border-color: $colorG;
              transition: .3s;
            }

            &:focus {
              border-color: $colorG;
              transition: .3s;
            }
          }
        }
      }

      .el-button {
        height: 48px;
        width: 181px;
        background-color: $colorA;
        border-color: $colorA;
        transition: .3s;
        border-radius: 8px;

        ::v-deep {
          span {
            @include Font((color: $colorE, size: $h4, weight: 600));
            transition: .3s;
          }
        }

        &:active {
          transform: scale(.9);
          transition: .3s;

          ::v-deep {
            span {
              color: $colorL;
              transition: .3s;
            }
          }
        }
      }
    }

    .download {
      &_app {
        &:not(:first-child) {
          margin-left: 53px;
        }

        p {
          margin-bottom: 16px;
          @include Font((color: $colorF, size: $h5));
        }
      }

      &_icon {
        a {
          padding: 12px;
          border: 1px solid #252525;
          border-radius: 8px;
          transition: .3s;

          &:not(:first-child) {
            margin-left: 15px;
          }

          &:hover {
            background-color: $colorH;
            transition: .3s;
          }

          img.qr-code {
            width: 24px;
            height: 24px;
          }
        }
      }
    }

    .allAssets {
      margin-bottom: 60px;
      flex-direction: column;

      h6 {
        margin-bottom: 10px;
        font: {
          size: 14px;
        }
        color: #f4f4f4;

        img {
          margin-left: 4px;
          width: 20px;
          cursor: pointer;
        }
      }

      .assets {
        margin-bottom: 6px;
        align-items: baseline;

        h1 {
          margin-right: 10px;
          font: {
            size: 40px;
            weight: 600
          }
          color: #f4f4f4
        }

        .el-dropdown {
          margin-right: 9px;
          cursor: pointer;
          outline: none;

          a {
            color: #fff;
            font: {
              size: 14px
            }
          }
        }

        p {
          font: {
            size: 14px
          }
        }
      }

      .today {
        margin-bottom: 40px;
        font: {
          size: 14px
        }

        span {
          font: {
            size: 14px
          }

          &.add {
            color: #0CBB57
          }

          &.reduce {
            color: rgb(237, 60, 47)
          }
        }
      }

      .el-button {
        width: 180px;
        height: 48px;
        background-color: #90FF00;
        border-radius: 8px;
        border: none;

        ::v-deep {
          span {
            font: {
              size: 16px;
              weight: 600
            }
            color: #252525
          }
        }
      }
    }
  }

  &_right {
    width: 480px;

    .currency {
      margin-bottom: 15px;
      padding: 17px 24px;
      min-height: 308px;
      background-color: $card_bg;
      border-radius: 10px;

      .currency_main {
        height: 300px;
        overflow-y: auto;
      }

      &_header {
        margin-bottom: 20px;
      }

      .tab {
        a {
          position: relative;
          @include Font((
              size: $h4,
              color: $subtitle_color
          ));

          &.active {
            color: $white;

            &:after {
              background-color: $colorA;
            }
          }

          &:first-child {
            margin-right: 20px;
          }

          &:after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 80%;
            height: 2px;
            border-radius: 2px;
          }
        }
      }

      .all {
        @include Font((color: $subtitle_color, size: 14px));
        transition: .3s;

        i {
          color: $subtitle_color;
          transition: .3s;
        }

        &:hover {
          color: $colorF;
          transition: .3s;

          i {
            color: $colorF;
            transition: .3s;
          }
        }
      }
    }

    .item {
      justify-content: space-between;

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      &_left {
        width: 160px;

        img {
          width: 28px;
          margin-right: 10px;
        }
      }

      .item_name {
        .sub-title {
          color: #737373;
        }
      }

      .item_name, .item_price, .item_rate {
        @include Font((size: 16px, color: $white, weight: bold, align: left));
        transition: .3s;
      }

      .item_price {
        width: 100px;
      }

      &:hover {
        .item_name, .item_price {
          color: $colorJ;
          transition: .3s;
        }
      }
    }

    .news {
      padding: 17px 24px;
      background-color: $card_bg;
      border-radius: 10px;

      &_header {
        margin-bottom: 10px;
        justify-content: space-between;

        h6 {
          @include Font((
              size: $h4,
              color: $colorD,
          ));
        }
      ;

        a {
          align-items: center;
          @include Font((size: $h5, color: $subtitle_color,));
          transition: .3s;

          i {
            margin-left: 4px;
            color: $subtitle_color;
            transition: .3s;
          }

          &:hover {
            color: $colorF;
            transition: .3s;

            i {
              color: $colorF;
              transition: .3s;
            }
          }
        }
      }

      .news_main {
        a {
          &:not(:last-child) {
            margin-bottom: 16px;
          }
        ;
          @include Font((color: $colorD, size: $h4));
          transition: .3s;

          &:hover {
            color: $colorI;
            transition: .3s;
          }
        }
      }
    }
  }

  .card1_right {
    .info-box {
      border-radius: 10px;
      background: #1B1B1B;
      padding: 27px 24px 27px 32px;

      .left-box {
        margin-right: 32px;

        .title {
          @include Font((size: 20px, color: #F4F4F4));
          margin-bottom: 9px;
        }

        .desc {
          color: #B3B3B3;
        }
      }

      > img {
        width: 180px;
        height: 155px;
      }
    }
  }
}

.download_icon {
  .phone {
    width: 16px;
    height: 22px;
  }

  .email {
    width: 20px;
    height: 14.3px;
  }
}

.qr-content {
  text-align: center;

  .qr-code {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .title {
    margin-bottom: 10px;
    font-weight: 600;
  }

  .qr-box {
    border-radius: 10px;
    background: #FFF;
    padding: 11px;

    > img {
      width: 127px;
      height: 127px;
    }
  }
}
</style>