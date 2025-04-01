<!-- 商家计划 -->
<template>
	<div class="contenter">
		<div class="header reletive">
			<el-carousel indicator-position="outside" :arrow="bannerList?.length > 1 ? 'always' : 'never'">
				<template v-if="bannerList?.length">
					<el-carousel-item v-for="(item, index) in bannerList" :key="index">
						<el-image class="banner block" :src="item.imgUrl" v-if="item.imgUrl" />
						<div class="header-content absolute">
							<div class="text">
								<h1 class="fontSize38">{{ item.title }}</h1>
								<div class="ellipsis ellipsis5 width330 mt30">{{ item.content }}</div>
							</div>
							<el-button type="primary" v-if="item.jumpUrl" @click="go(item.jumpUrl)" class="block mt30 ml28">{{
								$t(t + '即刻开始') }}</el-button>
						</div>
					</el-carousel-item>
				</template>
				<template v-else>
					<el-image class="banner block" :src="require('@/assets/business/banner.png')" />
					<div class="header-content absolute">
						<div class="text">
							<h1 class="fontSize38">
								{{ $t(t + '智能交易') }}
								<br>
								{{ $t(t + '成为C2C交易行家') }}
							</h1>
							<div class="ellipsis width330 mt30">{{ $t(t + '即刻成为认证商家') }}！</div>
						</div>
						<el-button type="text" @click="scrollBot" class="block mt30 ml28 config">{{ $t(t + '即刻开始') }}</el-button>
					</div>
				</template>
			</el-carousel>
		</div>
		<div class="main pt80">
			<div class="main-equity">
				<h2 class="fontSize50">{{ $t(t + '商家权益') }}</h2>
				<div class="mt20 mb40 fontSize18">{{ $t(t + '除了C2C交易') }}<span
						class="color-origin">0{{ $t(t + '费率') }}</span>，{{ $t(t + '我们还为商家提供了更多丰富多彩的权益') }}</div>
				<div class="flexs card pb10">
					<el-card class="box-card">
						<div class="flexs between mb25">
							<div class="top-name">
								<div class="fontSize28 fontWeight500">{{ $t(t + '申请条件') }}</div>
								<div class="describe fontSize12 mt10">{{ $t(t + '成为认证商家，享受更多权益') }}</div>
							</div>
							<el-image class="topImg" :src="require('@/assets/business/shenqing.png')"></el-image>
						</div>
						<div class="line" v-if="chinaPhone"> <el-image class="line-img"
								:src="require(`@/assets/business/${authStatus.canPhone ? 'success' : 'danger'}.png`)" />{{ $t(t + '完成手机认证') }}
						</div>
						<div class="line"> <el-image class="line-img"
								:src="require(`@/assets/business/${authStatus.canEmail ? 'success' : 'danger'}.png`)" />
							{{ $t(t + '完成邮箱认证') }}</div>
						<div class="line"> <el-image class="line-img"
								:src="require(`@/assets/business/${authStatus.canGoogleAuth ? 'success' : 'danger'}.png`)" />{{ $t(t + '完成谷歌认证') }}
						</div>
						<div class="line"> <el-image class="line-img"
								:src="require(`@/assets/business/${authStatus.canMerchantAuthStatus ? 'success' : 'danger'}.png`)" />{{ $t(t + '完成身份认证') }}
						</div>
						<div class="line"> <el-image class="line-img"
								:src="require(`@/assets/business/${authStatus.canEarnestMoney ? 'success' : 'danger'}.png`)" />
							{{ $t(t + '冻结保证金') }}
							<span class="color-origin">{{ authStatus.earnestMoney }} {{ authStatus.earnestMoneyCoinName }} </span>
						</div>
						<div class="btn">
							<div class="fontSize14 text-centent btn-text"> {{ $t(t + '需收纳') }} <span class="color-origin">{{
							authStatus.earnestMoney }}
								{{ authStatus.earnestMoneyCoinName }} </span> {{ $t(t + '保证金') }} </div>
						<el-button type="text" @click="handleClick"  class="block config fontSize18">
							{{ userLevel == 1 ? $t(t + '发布广告') : $t(t + '立即申请') }}</el-button>
						</div>
					</el-card>
					<el-card class="box-card  ml100">
						<div class="flexs between mb25">
							<div class="top-name">
								<div class="fontSize28 fontWeight500">{{ $t(t + '认证商家') }}</div>
								<div class="describe fontSize12 mt10">{{ $t(t + '享受交易市场最高信任度') }}</div>
							</div>
							<el-image class="topImg" :src="require('@/assets/business/renzhen.png')"></el-image>
						</div>
						<div class="line"> <el-image class="line-img" :src="require('@/assets/business/success.png')" />{{
							$t(t + '申请成功即可发布广告委托单') }} </div>
						<div class="line"> <el-image class="line-img" :src="require('@/assets/business/success.png')" />{{
							$t(t + '每个币种可发布购买/出售广告委托单各2单') }} </div>
						<div class="line"> <el-image class="line-img" :src="require('@/assets/business/success.png')" />{{
							$t(t + '单笔购买广告委托单限额') }} <span class="color-origin">{{authStatus.maxMerchantBuyAdvertisingCount}} CNY
							</span> </div>
							<div class="line"> <el-image class="line-img" :src="require('@/assets/business/success.png')" />{{
							$t(t + '单笔出售广告委托单限额') }} <span class="color-origin">{{authStatus.maxMerchantSellAdvertisingCount}} CNY
							</span> </div>
						<div class="line"> <el-image class="line-img" :src="require('@/assets/business/success.png')" />
							{{ $t(t + '广告商认证专属标识') }}
						</div>
						<div class="line"> <el-image class="line-img" :src="require('@/assets/business/success.png')" />
							{{ $t(t + '针对商家提供一对一客服服务，提高交易效率') }}
						</div>
						<div class="btn">
							<div class="fontSize14 text-centent btn-text"> {{ $t(t + '需收纳') }} <span class="color-origin"> {{
							authStatus.earnestMoney }}
								{{ authStatus.earnestMoneyCoinName }} </span> {{ $t(t + '保证金') }}</div>
						<el-button type="text" @click="handleClick" class="block fontSize18 config">
							{{ userLevel == 1 ? $t(t + '发布广告') : $t(t + '立即申请') }}</el-button>
						</div>
					</el-card>
				</div>
			</div>
			<div class="main-authen mt80">
				<h1 class="fontSize50 mb32">{{ $t(t + '如何成为认证商家') }}</h1>
				<div class="line">
					<div class="flexs fontSize16">
						<el-image class="line-img mr10"
							:src="require(`@/assets/business/${authStatus.canMerchantAuthStatus ? 'success' : 'danger'}.png`)" />
						{{ $t(t + '身份认证达到商家') }}
					</div>
					<div class="flexs fontSize12 color-origin mt10 ml20"
						@click="!userLevel && ($router.push(`/user/verifyIdentidy`))">
						{{ userLevel == 1 ? $t(t + '已认证') : $t(t + '去认证') }}
						<el-image v-if="!userLevel" class="line-img ml5" :src="require('@/assets/business/gourow.png')" />
					</div>
				</div>
				<div class="line">
					<div class="flexs fontSize16">
						<el-image class="line-img mr10"
							:src="require(`@/assets/business/${authStatus.canEarnestMoney ? 'success' : 'danger'}.png`)" />
						{{ $t(t + '冻结保证金') }} {{ authStatus.earnestMoney }} {{ authStatus.earnestMoneyCoinName }}
					</div>
					<div class="flexs fontSize12 color-origin mt10 ml20" @click="$router.push('/wallet/capitalAccount')">
						{{ $t(t + '资金账户充值') }} <el-image class="line-img ml5" :src="require('@/assets/business/gourow.png')" />
					</div>
				</div>
				<div class="line">
					<div class="flexs fontSize16"> <el-image class="line-img mr10"
							:src="require(`@/assets/business/${completionRate ? 'success' : 'danger'}.png`)" />
						{{ $t(t + '完成率不低于90%') }}
					</div>
					<div class="flexs fontSize12 color-origin mt10 ml20"
						@click="userLevel == 1&&authStatus.canMerchantAuthStatus ? $router.push(`/layout/c2c/buyCoin`) : $router.push(`/user/securitySetting`)">
						{{ userLevel == 1 ? $t(t + '去交易') : $t(t + '完善信息') }}
						<el-image class="line-img ml5" :src="require('@/assets/business/gourow.png')" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { criteriaAuthApply, getMerchantInfoById,isChina } from "@/api/otc.js";
import { bannerList } from "@/api/common.js";
export default {
  name: "merchantPlan",
  components: {},
  data() {
    return {
      // 国际缩写
      t: "c2c.",
      bannerList: [],
      authStatus: {},
      userLevel: null,
      isSatisfy:false,//是否全部满足条件
      chinaPhone:true,
    };
  },
  computed:{
    // chinaPhone(){
    //   return this.$store.state.login.isChina
    // },
    completionRate(){
      return this.authStatus.canEmail && this.authStatus.canGoogleAuth && this.authStatus.canPhone && this.authStatus.canMerchantAuthStatus
    },
  },
  created() {
    this.getCriteriaAuthApply();
    this.getMerchantInfoById();
    this.getBannerList();
  },
  methods: {
    // 根据用户ID 查询 商户信息
    getMerchantInfoById() {
      getMerchantInfoById().then((res) => {
        this.userLevel = res.data.userLevel;
      });
    },
    // 商人申请认证授权
    getCriteriaAuthApply() {
      criteriaAuthApply().then((res) => {
        this.authStatus = res.data;
      });
      isChina({}).then(res => {
        this.chinaPhone = res.data.data
      })
    },
    // 获取banner 图
    getBannerList() {
      bannerList({
        bannerPositionIds: [5],
        deviceType: 3,
      }).then((res) => {
        this.bannerList = res.data;
      });
    },
    scrollBot() {
      this.$scrollToTop(0, 1200);
    },
    // 跳转链接
    go(url) {
      window.open(url);
    },
    // 跳转到我的委托单
    handleClick() {
      //有不满足条件时滚动到如何成为商家，满足条件跳转我的委托单
      if (Object.values(this.authStatus).includes(false)) {
        let dom = document.querySelector(".wrapper-view");
        if (dom) {
          dom.scroll({
            top:1000,
            behavior:'smooth'
          })
        }
      }else{
        this.$router.push(`/c2c/tradeTrust?curComp=Saler`);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
::v-deep .header {
  .el-carousel__container {
    height: 492px;

    .el-image__inner {
      height: 492px;
      object-fit: cover;
    }
  }

  .el-carousel__indicators--outside {
    display: none;
  }

  &-content {
    z-index: 9;
    top: 50%;
    left: 236px;
    transform: translateY(-50%);

    .text {
      padding-left: 21px;
      border-left: 5px solid #ffe75c;
    }

    .el-button {
      width: 200px;
      height: 50px;
    }
  }
}

::v-deep .main {
  text-align: center;

  .color-origin {
    color: #ffb928;
    cursor: pointer;
  }

  &-equity {
    .card {
      text-align: left;
      justify-content: center;
      .box-card {
        width: 400px;
        // padding-bottom: 30px;
        height: 560px;
        position: relative;
        .btn {
          position: absolute;
          bottom: 40px;
          left: 75px;
          .btn-text {
            padding-bottom: 10px;
          }
        }
        .describe {
          color: #8992a6;
        }

        .topImg {
          width: 61px;
          height: 61px;
        }

        .line {
          font-size: 14px;
          padding-bottom: 20px;
          font-weight: 400;

          &-img {
            width: 12px;
            height: 12px;
            margin-right: 10px;
          }

          &:last-child {
            padding-bottom: 0;
          }
        }

        .el-button {
          width: 240px;
          height: 50px;
          margin: auto;
        }
      }
    }
  }

  &-authen {
    .line {
      margin: 0 210px;
      border-bottom: 1px solid #f4f5f7;
      padding: 30px 0;

      .el-image {
        width: 10px;
        height: 10px;
      }
    }
  }
}

.config {
  background-color: #90ff00;
  color: white;
  padding: 9px 18px;

  &:hover {
    opacity: 0.8;
  }
}

.el-button.is-disabled.el-button--text {
  background-color: #96dec2;
  color: white;
}
</style>