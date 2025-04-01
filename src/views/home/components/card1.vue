<template>
 <div class="card card1 flex">
  <div class="card1_left flex">
<!--   <p class="abandon">注：这个绿色的数据会跳动</p>-->

   <h2 class="num">231,750,167</h2>

   <h2 class="title">
    {{$t('home_1')}} <br/>
    {{$t('home_2')}}
   </h2>

   <div class="register flex" v-if="!getToken">
    <el-input v-model="ruleForm.username" :placeholder="$t('home_3')"/>

    <el-button type="primary" @click="$router.push({name: 'register', query: {msg: ruleForm.username}})">{{$t('lang_943')}}</el-button>
   </div>

   <div class="allAssets flex">
    <h6 class="flex">{{$t('home_4')}} <img @click="isCurrency = !isCurrency" src="../../../assets/images/icon_eye_close.png" alt="" /></h6>

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

    <p class="today">{{$t('lang_1906')}} <span :class="[+info.todayProfitAndLoss > 0 ? 'add' : +info.todayProfitAndLoss === 0 ? 'default' : 'reduce']">${{ info.todayProfitAndLoss || 0.00 }} ({{ info.todayProfitAndLossRate || 0.00 }}%)</span></p>

    <el-button>{{$t('lang_2422')}}</el-button>
   </div>

   <div class="download flex">
    <div class="download_app">
     <p>{{$t('home_5')}}</p>

     <div class="download_icon flex">
      <a><img src="../../../assets/images/google.png" alt="谷歌"></a>
      <a><img src="../../../assets/images/ios.png" alt="苹果"></a>
     </div>
    </div>

    <div class="download_app">
     <p>{{$t('home_13')}}</p>

     <div class="download_icon flex">
      <a><img src="../../../assets/images/code.png" alt="下载二维码"></a>
     </div>
    </div>
   </div>
  </div>

  <div class="card1_right fd">
   <div class="currency">
    <div class="flex jb currency_header">
     <div class="flex tab">
      <a @click="currency_type = 0" :class="currency_type === 0 ? 'active' : ''">{{$t('lang_1717')}}</a>
      <a @click="currency_type = 1" :class="currency_type === 1 ? 'active' : ''">{{$t('home_6')}}</a>
     </div>
     <a class="all">{{$t('home_7')}} <i class="el-icon-arrow-right"/></a>
    </div>
    <div v-for="(item,index) in getInitListInfo" :key="index" class="flex jb item">
     <div class="ff flex ic item_left">
      <img width="100%" height="100%" :src="item.contract.icon" alt="">
      <p class="item_name">{{ item.contract.coinsName }}</p>
     </div>
     <p class="item_price">${{ formatNumber(item.market.open) || '--' }}</p>
     <p class="item_rate" :style="{color:item.market.increase24H > 0 ? '#0CBB57' : '#ED3C2F' }">{{ item.market.increase24H || '--' }}%</p>
    </div>
   </div>

   <div class="news">
    <div class="news_header flex">
     <h6>{{$t('home_8')}}</h6>
     <router-link class="flex" :to="'home'">{{$t('lang_3017')}} <i class="el-icon-arrow-right"/></router-link>
    </div>

    <div class="news_main flex fd">
     <a class="line">{{$t('home_9')}}</a>
     <a class="line">{{$t('home_10')}}</a>
     <a class="line">{{$t('home_11')}}</a>
     <a class="line">{{$t('home_12')}}</a>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {GetUserAllMoney} from "@/api/home";

export default {
 computed: {
  ...mapGetters(['getInitListInfo', 'getToken'])
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

   info: []
  }
 },
 mounted() {
  this.fetchInitListInfo()

  this.getToken && this.getCurrencyAll()
 },
 methods: {
  ...mapActions(['fetchInitListInfo']),
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

     &:hover{
      background-color: $colorH;
      transition: .3s;
     }

     img {
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
     };
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
}
</style>