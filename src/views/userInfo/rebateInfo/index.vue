<!-- eslint-disable vue/no-parsing-error -->
<!-- 我的邀请 -->
<template>
 <div style="padding: 30px 40px">
  <div style="padding-bottom: 40px; border-bottom: 1px solid #252525;">

   <div class="fc ff" style="font-weight: 500; font-size: 30px ; margin-bottom: 51px;">邀请好友一起赚币!</div>
   <!-- <div class="ff fc" style="margin-top: 57px; font-size: 16px; font-weight: 500;">立即邀请</div> -->

   <!-- <div>邀请码</div>
 <div>邀请码</div>   -->


   <div style="border-bottom: 1px solid #252525; padding-bottom: 40px;" class="flex  ic">

    <div class="container" style="display: flex; width: 50%; height: 240px;">
     <div class="left flex jb ic" style="flex: 1; padding-right: 30px;">
      <!-- 立即邀请 -->
      <div style="width: 100%;">
       <div class="ff fc" style="font-size: 16px; font-weight: 500; margin-bottom: 28px; cursor: pointer;">立即邀请
       </div>
       <div class="flex ic">
        <div class="ff fc flex ic" style="font-size: 14px; width: 70px;">邀请码</div>
        <div class="flex ic"
             style="height: 42px; width: 100%; border-radius: 4px; border: 1px solid #252525; padding-left: 10px; padding-right: 10px;">
         <input v-model="initInfoCode"
                style="background-color: #141414; border: none; outline: none; flex: 1; color: #F0F0F0;"
                type="text">
         <div @click="$copyContent(initInfoCode)"
              style="width: 20px; height: 20px; margin-left: 30px; cursor: pointer;">
          <img style="width: 100%; height: 100%;" src="@/assets/images/invite/icon_responsible.png" alt="">
         </div>
        </div>
       </div>

       <div class="flex ic" style="margin-top: 20px; margin-bottom: 32px;width: 100%;">
        <div class="ff fc flex ic" style="font-size: 14px; width: 70px;">邀请链接</div>
        <div class="flex ic"
             style="height: 42px;width: 100%; border-radius: 4px; border: 1px solid #252525; padding-left: 10px; padding-right: 10px;">
         <input v-model="inviteUrl"
                style="background-color: #141414; border: none; outline: none; flex: 1;color: #F0F0F0;"
                type="text">
         <div @click="$copyContent(inviteUrl)"
              style="width: 20px; height: 20px; margin-left: 30px; cursor: pointer;">
          <img style="width: 100%; height: 100%;" src="@/assets/images/invite/icon_responsible.png" alt="">
         </div>
        </div>
       </div>


       <div class="flex ic">
        <div class="ff fc" style="margin-right: 28px; font-size: 14px;">分享至</div>

        <div style="margin-right: 20px; width: 22px; height: 22px; ">
         <img style="width: 100%;cursor: pointer;  height: 100%;" @click="shareToTwitter" src="@/assets/images/invite/Maskgroup.png" alt="">
        </div>

        <div style="width: 22px; height: 22px;">
         <img style="width: 100%; height: 100%;cursor: pointer; " @click="shareToFacebook" src="@/assets/images/invite/icon_facebook.png" alt="">
        </div>
       </div>


       <div class="flex" style="width: 100%; justify-content: end ; cursor: pointer;">
        <div class="flex jc ic" @click="rightNowPic" style="margin-top: 28px; width: 234px; height: 39px; background: #90FF00; border-radius:4px; color: #000000;">
         立即邀请
        </div>
       </div>
      </div>
     </div>

     <!-- 图片部分 -->
     <div style="width: 224px; height: 240px;">
      <img style="width: 100%; height: 100%;" src="@/assets/images/invite/left.png" alt="">
     </div>
    </div>

    <div class="right_ flex ic" style="width: 50%; flex: 1; border-left: 1px solid #252525;padding-left: 40px; ">

     <div class="_left" style="width: 120px;">
      <div class="ff fc " style="font-weight: 500; font-size: 16px; margin-bottom: 27px;">我的推荐</div>
      <div class="ff fc " style=" font-size: 14px; margin-bottom: 9px;">总邀请(人)</div>
      <div class="flex  jc ic"
           style="width: 120px; height: 42px; border-radius: 4px; border: 1px solid #252525;">{{ inviteNum }}</div>

      <div class="ff fc " style=" font-size: 14px; margin-top: 84px; margin-bottom: 9px;">当日邀请(人)</div>
      <div class="flex  jc ic" style="width: 120px; height: 42px; border-radius: 4px; border: 1px solid #252525;">{{ todayInviteNum }}
      </div>

     </div>

     <div class="center" style="flex: 1; padding-left: 40px; padding-right: 30px; height: 100%;">
      <div class="flex jb" style="padding-left: 15px; padding-right: 15px; margin-bottom: 9px;">
       <div class="ff fc" style="font-size: 14px;">用户UID</div>
       <div class="ff fc" style="font-size: 14px;">注册时间</div>
      </div>
      <div v-if="recordsList.length > 0">

       <div v-for="(item, index) in recordsList" :key="index" class="flex jb ic hoverItem"
            style="margin-bottom: 10px; padding-left: 15px; padding-right: 15px; height: 42px; border-radius: 4px; border: 1px solid #252525 ">
        <div class="ff fc" style="font-size: 13px;">{{ item.uid }}</div>
        <div class="ff fc" style="font-size: 13px;">{{ $formatTimesYMD(item.createTime) }}</div>
       </div>
      </div>
      <div class="flex jc ic" style="height: 192px; width: 100%; margin-bottom: -39px; margin-top: 20px;" v-else>

       <div class="flex jc ic hoverItem"
            style=" padding-left: 15px;width: 100%; height: 100%; padding-right: 15px;  border-radius: 4px; border: 1px solid #252525 ">
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;padding-left: 40px; padding-right: 30px; border-radius: 4px;">
         <div style="width: 46px; height: 46px;"><img style="width: 100%; height: 100%;" src="@/assets/images/Friend/icon_Null_status.png" alt=""></div>
         <div style="color: #737373; font-size: 12px; margin-top: 10px;">您还没有邀请好友
         </div>
        </div>
       </div>
      </div>
     </div>
     <div class="right_" style="width: 224px; height: 184px;margin-left: auto">
      <img style="width: 100%; height: 100%;" src="@/assets/images/invite/right.png" alt="">
     </div>
    </div>
   </div>

   <!-- 返佣收入 -->
   <RefundMoney />
  </div>
  <!-- 隐藏小额币种(<10 CNY) -->
  <MinCoinPair />
  <!--  资金流水 -->
  <div style="margin-top: 47px;">
   <CapitalFlow />
  </div>

  <!--  邀请图片 -->
  <InvitePictures ref="invitePictures" :initInfoCode =initInfoCode :qrcodeUrl="qrcodeUrl" />
 </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import MinCoinPair from "./com/MinCoinPair";
import CapitalFlow from "./com/CapitalFlow.vue";

import RefundMoney from "./com/RefundMoney.vue";

import InvitePictures from "./com/InvitePictures.vue";
import QRCode from 'qrcode';
import {getShareUser, getShareUserList} from "@/api/user"; // 导入 qrcode 库

export default {
  name: "SecuritySetting",
  components: {
    MinCoinPair, CapitalFlow, RefundMoney, InvitePictures
    // SelectList

  },
  data() {
    return {
      product: {
        name: 'BSEX',
        description: '一个超级牛叉的交易所',
        url: 'http://47.243.6.115/rebateInfo', // 产品页面的 URL
      },
      isDropdownVisible: false,
      iconOpen: 1,
      selectedOption: 'USDT', // 默认选项
      isRotated: false,
      stateflag: true,
      coinPairList: [
        {
          id: 2,
          name: "BTC",
          code: 53,
        },
        {
          id: 1,
          name: "ETH",
          code: 54,
        },
        {
          id: 1,
          name: "XRP",
          code: 54,
        },
      ],
      coinPairTitle: "请选择币种",


      tabList: [
        {
          name: 'USDT',
          id: 1
        },
        {
          name: 'BTC',
          id: 2
        }
        ,
        {
          name: 'ETH',
          id: 3
        }
      ],
      initInfoCode: '',  //邀请码
      inviteUrl: '', //邀请链接
      inviteNum: '',  //邀请人数
      todayInviteNum: '',  //今日邀请人数
      recordsList: [],
      qrcodeUrl:''

    };
  },
  computed: {
    ...mapGetters(["userInfo", 'getUserList']),
    token() {
      return this.$store.getters.getToken
    }
  },
  mounted() {
    this.initRebate()
    this.initRebateList()
  },
  methods: {
    ...mapActions(['fetchUserInfo']),

    shareToFacebook() {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.product.url)}`;
      console.log(facebookUrl,'shareToFacebook被点击');
      window.open(facebookUrl, '_blank'); // 在新标签页中打开 Facebook 分享链接
    },
    shareToTwitter() {
      
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.product.url)}&text=${encodeURIComponent(this.product.name)}`;
      console.log(twitterUrl,'shareToTwitter被点击');
      window.open(twitterUrl, '_blank'); // 在新标签页中打开 Twitter 分享链接
    },
  
    rightNowPic(){
     this.$refs.invitePictures.openDialog(),
     this.generateQRCode(this.inviteUrl)
    },

    generateQRCode(address) {
      QRCode.toDataURL(address, { width: 200, margin: 1 })
        .then(url => {
          this.qrcodeUrl = url; // 将生成的二维码 URL 赋值给 qrcodeUrl
        })
        .catch(err => {
          console.error(err); // 处理错误
        });
    },

    initRebate() {
     Promise.try(async () => {return getShareUser()}).then(res => {
      this.initInfo = res.data
      this.initInfoCode = res.data.inviteCode
      this.inviteUrl = res.data.inviteUrl
      this.inviteNum = res.data.inviteNum
      this.todayInviteNum = res.data.todayInviteNum
     })
    },

    initRebateList() {
      Promise.try(async () => {
       return await getShareUserList({page: 1, size: 100})
      }).then(res => {
       this.recordsList = res.data.records
      })
    },
  },
};
</script>
<style lang='scss' scoped>
.ff0 {
  color: #F0F0F0;
}
.ic {
  align-items: center;
}

.jc {
  justify-content: center;
}

.jic {
  display: flex;
  align-items: center;
  justify-content: center;
}

.img100 {
  width: 100%;
  height: 100%;
}

.common-content {
  padding: 0 20px;
  font-size: 14px;
  color: #637287;

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .item {
    margin-top: 15px;
  }

  .btn {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 500;
    margin-top: 32px;
    margin-bottom: 10px;

    .cancel {
      width: 210px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 6px;
      // border: 1px solid $colorB;
      // color: $colorB;
      color: #333;
      cursor: pointer;
      background: #F4F5F7;
    }

    .hoverItem:hover {
      background: #1B1B1B;
    }

    .sure {
      width: 210px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: $colorB;
      border-radius: 6px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}

.ic {
  align-items: center;
}

.fd {
  flex-direction: column;
}

.jc {
  justify-content: center;
}

.jb {
  justify-content: space-between;
}

.fc {
  color: #F0F0F0;
}

.ff90 {
  color: #90FF00;
}

.dropdown-items {
  border-radius: 4px;
  // padding: 8px 12px;
  cursor: pointer;
  overflow: hidden;
  color: #FFFFFF;
}

.dropdown-items:hover {
  overflow: hidden;
  border-radius: 4px;
  background-color: #252525;
  color: #90ff00;
}

.rotate {
  transform: rotate(180deg);
  /* 旋转 180 度 */
}

/* Webkit 浏览器（Chrome, Safari） */
.scroll-container::-webkit-scrollbar {
  width: 1px;
  /* 滚动条宽度 */
}

.scroll-container::-webkit-scrollbar-track {
  background: #141414;
  /* 滚动条轨道颜色 */
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #141414;
  /* 滚动条颜色 */
  border-radius: 6px;
  /* 滚动条圆角 */
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #141414;
  /* 滚动条悬停时的颜色 */
}

/* Firefox */
.scroll-container {
  scrollbar-width: thin;
  /* 滚动条宽度 */
  scrollbar-color: #252525 #141414;
  /* 滚动条颜色和轨道颜色 */
}
</style>