<!-- 自选区 -->
<template>
  <div class="trade-container">
    <div class="main">
      <div class="header-swiper reletive">
        <el-carousel indicator-position="outside" arrow="never">
          <el-carousel-item>
            <div
              class="flexs banner"
              @click="$router.push('/c2c/merchantPlan')"
            >
              <div class="banner-title">{{ $t(t + "成为C2C认证广告方") }}</div>
              <div class="banner-desc ml40 mr100">
                {{ $t(t + "解锁更多权益") }}
              </div>
              <img
                class="banner-img block"
                decoding="async"
                src="@/assets/buy-coins/c2cBanner.png"
                alt="Smiley face"
                style="width: 80px; height: 100px"
              />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div
        class="header-swiper reletive"
        v-if="userLevel == 1 && bannerList?.length"
      >
        <el-carousel
          indicator-position="outside"
          :arrow="bannerList?.length > 1 ? 'always' : 'never'"
        >
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <div class="flexs banner">
              <div class="banner-title">{{ item.title }}</div>
              <div class="banner-desc ml40 mr100">{{ item.content }}</div>
              <el-image
                class="banner-img block"
                :src="item.imgUrl"
                v-if="item.imgUrl"
              />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="todoList">
        <ul class="tabsNav between pb10" v-if="isTit">
          <li class="module-type">
            <div
              class="module-content flexs"
              :style="{
                border:
                  curModule === 'buy'
                    ? '1px solid #90ff00'
                    : '1px solid #F75F52',
              }"
            >
              <div
                :class="[
                  'item',
                  { 'item-buy': key === 0 && curModule === 'buy' },
                  { 'item-sale': key === 1 && curModule === 'sale' },
                ]"
                v-for="(item, key) in typeList"
                :key="key"
                @click="handleType(item, key)"
              >
                {{ $t(t + item.title) }}
              </div>
            </div>
          </li>
          <!-- <li
            v-if="userLevel == 0 || !userLevel"
            class="to-saler common-sale"
            :style="{ background: curModule === 'buy' ? '#90ff00' : '#F75F52' }"
            @click="toSaler(1)"
          >
            {{ $t(t + "成为商家") }}
          </li> -->
          <!-- <li
            v-if="userLevel == 1"
            class="to-saler common-sale"
            :style="{ background: curModule === 'buy' ? '#90ff00' : '#F75F52' }"
            @click="toSaler(2)"
          >
            {{ $t(t + "申请退保") }}
          </li> -->
        </ul>
        <coins-buy
          ref="coinsList"
          :userLevel="userData?.userLevel"
          v-show="coinsShow"
          @back="isTit = true"
          @next="isTit = false"
          :method="method"
        />
      </div>
    </div>
    <div class="menu pb40">
      <div class="content">
        <div class="box pt70">
          <h3 class="box-title">{{ $t(t + "C2C的优势") }}</h3>
          <div class="between">
            <div class="box-group group1">
              <div class="name">{{ $t(t + "低廉的交易费用") }}</div>
              <div class="text">{{ $t(t + "下单方以零手续费交易。我们承诺在市场应用。") }}</div>
            </div>
            <div class="box-group group2">
              <div class="name">{{ $t(t + "多种支付方式") }}</div>
              <div class="text">{{ $t(t + "推荐使用微信、支付宝、银行转账方式快捷买币！") }}</div>
            </div>
            <div class="box-group group3">
              <div class="name">{{ $t(t + "全天候支持") }}</div>
              <div class="text">{{ $t(t + "我们提供24/7多种语种支持服务，随时为客户排忧解难！") }}</div>
            </div>
          </div>
        </div>
        <otc-question></otc-question>
        <div class="payment">
          <div class="payment_canner">
            <div class="payment_text">{{$t('c2c.热门付款方式')}}</div>
            <div class="payment_imgs">
              <div class="img" @click="choosePayment(item.value)" v-for="(item) in payMethods" :key="item.id">
                <div class="img_bg"> 
                  <img class="img_pay" :src="require(`@/assets/buy-coins`+item.src)" alt="" />
                  <span class="img_method">{{ $t(t+item.label) }}</span>
                </div>
                <div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="mask">
      <guideMask />
    </div>
  </div>
</template>

<script>
import CoinsBuy from "../tradeToc/components/coinsBuy.vue";
import guideMask from "./guideMask/guideMask.vue";
import OtcQuestion from '../components/question/question.vue';
import { bannerList } from "@/api/common.js";
import { merchantCheck, getMerchantInfoById } from "@/api/otc.js";
export default {
  name: "",
  components: {
    CoinsBuy,
    guideMask,
    OtcQuestion
  },
  data() {
    return {
      isTit: true,
      coinsShow: false,
      userLevel: undefined,
      curModule: "buy",
      typeList: [
        {
          key: 1,
          title: "买入",
          type: "buy",
        },
        {
          key: 2,
          title: "卖出",
          type: "sale",
        },
      ],
      payMethods:[
        {value:1,label:'银行卡',src:'/yinhangka.png'},
        {value:2,label:'支付宝',src:'/zhifubao.png'},
        {value:3,label:'微信支付',src:'/weixin.png'},
      ],
      bannerList: [],
      questionList: [],
      t: "c2c.",
      method:undefined,
      userData: {}
    };
  },
  created() {
    this.getMerchantInfoById();
  },
  mounted() {
    this.handleType({ type: "buy" }, 0);
    this.getBannerList();
  },
  methods: {
    //热门付款方式跳转
	choosePayment(method){
		
		this.method = method
    let dom = document.querySelector(".wrapper-view");
        if (dom) {
          dom.scroll({
            top:0,
            behavior:'smooth'
          })
        }
      this.method = method;
	},
    // 获取banner 图
    getBannerList() {
      bannerList({
        bannerPositionIds: [4],
        deviceType: 3,
      }).then((res) => {
        this.bannerList = res.data;
      });
    },
    // 根据用户ID 查询 商户信息
    getMerchantInfoById() {
      getMerchantInfoById().then((res) => {
        this.userLevel = res.data.userLevel;
        this.userData = res.data
      });
    },
    // 处理类型
    handleType(item, index) {
      this.curModule = item.type;
      this.$nextTick((_) => {
        this.$refs.coinsList.formInline.type = index;
        this.$refs.coinsList.formInline.isBulkDeal = 0;
        this.$refs.coinsList.coinSimple();
        this.coinsShow = true;
      });
    },
    // 成为商家或者申请退保
    toSaler(type) {
      if (!this.$store.state.login.token) {
        this.$router.push("/layout/login");
        return;
      }
      merchantCheck().then((res) => {
        if (res.data == 6) {
          this.$message({
              message:this.$t(this.t + "解禁申请正在审核中，暂不能申请退保!"),
              type:'warning'
            });
          return;
        }
        // 跳转到我的委托单
        this.$router.push({
          path: "/layout/c2c/tradeTrust",
          query: {
            curComp: type === 1 ? "Saler" : "cancel",
          },
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.trade-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f5f7fa;

  .main {
    // width: 1400px;
    padding: 0 210px;
    margin: auto;

    ::v-deep .header-swiper {
      .el-carousel__container {
        // width: 1400px;
        height: 135px;
        line-height: 135px;
        background: #ffffff;
        border-radius: 15px;
        margin-top: 40px;

        .banner {
          justify-content: center;
          color: #333333;

          &-title {
            font-size: 38px;
          }

          &-desc {
            font-size: 24px;
          }
          // .banner-img{
          //   width: 120px;
          //   height: 120px;
          //   //  img{
          //   //   width: 80px;
          //   // }

          // }
          // &-img {
          // }
        }

        .el-image__inner {
          width: 85px;
          height: 135px;
          object-fit: cover;
        }
      }

      .el-carousel__indicators--outside {
        display: none;
      }
    }

    .todoList {
      background-color: white;
      margin: 30px 0;
      padding: 30px;
      border-radius: 15px;

      .tabsNav {
        width: 100%;

        .module-type {
          width: 160px;
          height: 45px;
          text-align: center;
          background: #f5f7fa;

          .module-content {
            border-radius: 6px;
            padding: 5px;

            .item {
              width: 75px;
              height: 35px;
              line-height: 35px;
              border-radius: 4px;
              cursor: pointer;
              color: #8992a6;
            }

            .item-buy {
              font-weight: bold;
              color: white;
              background: #90ff00;
            }

            .item-sale {
              font-weight: bold;
              color: white;
              background: #f75f52;
            }
          }
        }

        .to-saler {
          cursor: pointer;
          border-radius: 6px;
          font-size: 18px;
          text-align: center;
          padding: 8px 10px;
          background: #90ff00;
          color: #ffffff;
        }
      }
    }
  }
}

.menu {
  .green {
    color: #90ff00;
  }

  width: 100%;
  background: #ffffff;

  .content {
    // width: 1400px;
    padding: 0 210px;
    margin: auto;

    .box {
      color: #333333;

      &-title {
        font-size: 45px;
        margin-bottom: 40px;
      }

      &-group {
        width: 440px;
        height: 300px;
        text-align: center;
      }

      .name {
        padding: 150px 0 30px;
        font-size: 22px;
      }

      .text {
        color: #8992a6;
        font-size: 14px;
        width: 279px;
        margin: auto;
      }

      .group1 {
        background: url("@/assets/buy-coins/c2cImg1.png") no-repeat right /
          440px 300px;
      }

      .group2 {
        background: url("@/assets/buy-coins/c2cImg2.png") no-repeat right /
          440px 300px;
      }

      .group3 {
        background: url("@/assets/buy-coins/c2cImg3.png") no-repeat right /
          440px 300px;
      }

      .line {
        font-size: 20px;
        &:hover {
          color: #90ff00;
        }
        span {
          cursor: pointer;
        }
      }
    }
  }
  .q-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .q-text {
      width: 45%;
      font-size: 20px;
      margin-bottom: 20px;
      span {
        cursor: pointer;
        &:hover {
          color: #90ff00;
        }
      }
    }
  }
}
.payment {
  // width: 1400px;
  height: 300px;
  margin: 70px auto 0 auto;
  // padding-top: 0.1px;
  background: url("@/assets/buy-coins/paymentBG.png") no-repeat;
  background-size: 100% 300px;
  .payment_canner {
    width: 100%;
    position: relative;
    height: 77px;
    // margin: auto;
    padding-top: 112px;
    .payment_text {
      font-size: 55px;
      font-weight: 500;
      color: #333333;
      line-height: 77px;
      margin-left: 160px;
      display: inline-block;
    }
    .payment_imgs {
      display: flex;
      position: absolute;
      top: 130px;
      left: 883px;
      .img {
        // display: inline-block;
        min-width: 110px;
        height: 40px;
        margin-right: 10px;
        position: relative;
        background: url("@/assets/buy-coins/paymentIcon.png") no-repeat ;
        background-size: 100% 40px;
        cursor: pointer;
        .img_bg{
          position: relative;
        }

        .img_pay {
          position: absolute;
          top: 8px;
          left: 18px;
        }
        .img_method {
          margin-left: 47px;
          margin-top: 8px;
          line-height: 40px;
          margin-right: 18px;
        
        }
      }
    }
  }
}
</style>
