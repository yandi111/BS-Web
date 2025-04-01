<template>
 <div
  style="height: calc(100vh - 4.52547rem);overflow-y: scroll;padding-bottom: 200px; padding-left: 24px; padding-top: 24px;">

  <div class="flex  ic ff0" style="">
   <div @click="$router.push('/overview');"
        style="width: 8.75px; height: 16.25px; margin-right: 10px; cursor: pointer;">
    <img style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/iconArr.png" alt="">
   </div>
   <div style="font-weight: 600; font-size: 24px;">{{$t('lang_852')}}</div>
  </div>
  <!-- coinState -->
  <div style="padding-top: 53px; padding-left: 20px; width: 100%;">
   <!-- 选择您需要充入的币种 -->
   <div>
    <div class="flex" style="height: 22px;">

     <div style="width: 22px; height: 22px; ">
      <img style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/icon_01.png" alt="">
     </div>
     <div style="color: #F0F0F0; font-weight: 500; font-size: 16px;margin-left: 10px;">{{$t('选择您需要充入的币种')}}</div>
    </div>

    <div class="flex ic" :style="{ borderLeft: coinState ? '2px solid #90FF00' : '2px solid #252525' }"
         style="height:90px; border-left: 2px solid #252525; margin-left: 11px; padding-left: 30px; ">

     <div style="width: 530px; height: 42px;">
      <SelectList @indexStateFn="indexStateFn" :coinPairList="coinPairList" :coinPairTitle="coinPairTitle"/>
     </div>


    </div>
   </div>

   <!-- 链类型 -->
   <div>
    <div class="flex" style="height: 22px;">
     <div style="width: 22px; height: 22px; ">
      <img v-if="coinState" style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/icon_02.png"
           alt="">
      <img v-else style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/icon_02s.png" alt="">
     </div>
     <div style="color: #F0F0F0; font-weight: 500; font-size: 16px;margin-left: 10px;">{{$t('链类型')}}</div>
    </div>

    <div class="flex ic"
         :style="{ borderLeft: coinState && coinInfoState ? '2px solid #90FF00' : '2px solid #252525' }"
         style="height:90px; border-left: 2px solid #252525; margin-left: 11px; padding-left: 30px; ">
     <div style="width: 530px; height: 42px;">
      <SelectListRefund :chainList=chainList :chainListTitle=chainListTitle @chainListFn="chainListFn"/>
     </div>
    </div>
   </div>
   <!-- 链类型 -->
   <div>
    <!-- 充币地址-->
    <div class="flex" style="">

     <div style="width: 22px; height: 22px; ">
      <img v-if="coinState && coinInfoState" style="width: 100%; height: 100%;"
           src="@/assets/images/deposit-v2/icon_03.png" alt="">
      <img v-else style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/icon_03s.png" alt="">
     </div>
     <div style="color: #F0F0F0; font-weight: 500; font-size: 16px;margin-left: 10px;">{{$t('lang_1805')}}</div>
    </div>

    <!-- 二维码部分-->
    <div v-if="coinState && coinInfoState" style=" margin-left: 11px; padding-left: 30px ">
     <div class="flex ic">

      <div class="flex"
           style="background-color: #252525; border-radius: 4px; padding-left: 20px; padding-top: 20px; margin-top: 20px;padding-bottom: 20px; padding-right: 37px;">
       <div style="width: 148px; height: 148px;">
        <!-- <img style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/GroupImg.png" alt=""> -->
        <img style="width: 100%; height: 100%;" :src="qrcodeUrl" alt="">
       </div>

       <div class="flex jc" style="margin-left:20px; font-size: 12px; flex-direction: column;">
        <div style="color: #737373; margin-bottom: 8px;">{{$t('lang_1836')}}</div>
        <div class="flex ic">
         <div style="color:#F0F0F0 ;">{{ address }}</div>
         <div @click="$copyContent(address)" style="width: 20px; height: 20px;"><img
          style="width: 100%; height: 100%; cursor: pointer;" src="@/assets/images/deposit-v2/icon_res.png"
          alt="">
         </div>
        </div>

        <div style="color: #ED3C2F; margin-top: 22px;">{{$t('仅支持')}}{{ this.chainListTitle }}{{$t('链的转账，若通过其他地址进行充提')}}，
         <br>{{$t("资金将无法找回")}}！
        </div>

       </div>

      </div>
     </div>


     <!-- 充币额度及到账 -->

     <div style="margin-top: 30px; width: 520px;">
      <div style="margin-bottom: 20px;">{{$t('充币额度及到账')}}</div>
      <div class="flex jb ic"
           style="height: 42px; background-color: #252525; border-radius: 4px;margin-top: 20px;padding-left: 10px; padding-right: 10px;">
       <div style="font-size: 12px; color: #B3B3B3; font-weight: 500;">{{$t('lang_1098')}}</div>
       <div style="font-size: 12px; color: FFFFFF; font-weight: 500;"></div>
      </div>

     </div>

     <!-- 将资金充入-->
     <div style="margin-top: 30px; width: 530px;">
      <div>{{$t('将资金充入')}}</div>

      <div class="flex jb ic"
           style="height: 42px; background-color: #252525; border-radius: 4px;margin-top: 20px;padding-left: 10px; padding-right: 10px;">
       <div style="font-size:  12px; color: #B3B3B3; font-weight: 500;">≥ {{ rechargeMin }} USDT</div>
       <div style="font-size: 12px; color: FFFFFF; font-weight: 500;">{{ confirmingThreshold }} {{$t('区块确认')}}</div>
      </div>

     </div>
     <Tips :rechargeMin="rechargeMin" :confirmingThreshold="confirmingThreshold" :coinNameInfo="coinNameInfo"   />
    </div>

    <RechargeRecord   :coinNameInfo=coinNameInfo :records="records" :transferList="transferList"/>
    <!-- 1212 -->


   </div>


  </div>


 </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import SelectList from "./com/SelectList.vue";
import SelectListRefund from "./com/SelectListRefund.vue";
import Tips from "./com/Tips.vue";
import QRCode from 'qrcode'; // 导入 qrcode 库
import RechargeRecord from "./com/RechargeRecord.vue";
import {getUserRecordAddress, getUserRecordList, getUserSupperCoin, getUserTransferList} from "@/api/user";

// import leftRightInput from "./components/leftRightInput.vue";

export default {
 name: "SecuritySetting",
 components: {
  SelectList, SelectListRefund, Tips, RechargeRecord
 },
 data() {
  return {

   transferList: [],
   chainId: '',
   qrcodeUrl: '',
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
   chainList: [],
   // chainListTitle:'',
   coinPairTitle: this.$t("请选择币种"),
   chainListTitle: this.$t("选择网络"),

   chainIdInfo: '',
   address: '',
   createTime: '',
   updateTime: '',
   coinState: false,
   coinInfoState: false,
   confirmingThreshold: '',
   rechargeMin: '',  // 充值下限
   coinNameInfo: '',
   records: [],
   threeMonthsAgoTimestamp: '',
   currentTimestamp: '',

  }
 },
 computed: {
  ...mapGetters(["userInfo", 'getUserList']),
  token() {
   return this.$store.getters.getToken
  }
 },
 created() {

 },
 mounted() {
  this.initTotal()
  this.allCoinList(1, 100, 'DEPOSIT', '', '')

  this.currentTimestamp = Date.now();
  // 获取三个月前的时间戳（毫秒）
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3); // 设置为当前月份减去 3
  this.threeMonthsAgoTimestamp = threeMonthsAgo.getTime(); // 获取毫秒时间戳

  this.transferListFn(
   1,
   100,
   "Deposit",
   null,
   "DEPOSIT",
   this.coinNameInfo,
   this.threeMonthsAgoTimestamp,
   this.currentTimestamp
  );
 },
 methods: {
  ...mapActions(['fetchUserInfo']),

  transferListFn(page, size, type, status, queryType, coinName, startTime, endTime) {
   Promise.try(async () => {
    return await getUserTransferList({page, size, type, status, queryType, coinName, startTime, endTime,})
   }).then(res => {
    this.transferList = res.data.records
   })
  },


  generateQRCode(address) {
   QRCode.toDataURL(address, {width: 200, margin: 1})
    .then(url => {
     this.qrcodeUrl = url; // 将生成的二维码 URL 赋值给 qrcodeUrl
    })
    .catch(err => {
     console.error(err); // 处理错误
    });
  },

  indexStateFn([index, coinNameInfo, coinId]) {
   this.allCoinList(1, 100, 'DEPOSIT', coinId, coinNameInfo)
   this.transferListFn(
    1,
    100,
    "Deposit",
    null,
    "DEPOSIT",
    coinNameInfo,
    this.threeMonthsAgoTimestamp,
    this.currentTimestamp
   );

   this.coinNameInfo = coinNameInfo
   this.coinState = true
   this.chainList = this.coinPairList[index].chainList
   console.log(index, this.chainList, 'indexStateFnindexStateFn');
   this.rechargeMin = this.coinPairList[index].rechargeMin
   // this.chainListTitle = this.coinPairList[index].chainList[0].tokenProtocol
   this.chainId = this.coinPairList[index].chainList[0].chainId
   this.chainListTitle = "选择网络"
   this.coinInfoState = false
  },

  chainListFn(item) {
   this.coinInfoState = true
   this.chainListTitle = item.tokenProtocol
   console.log(item, "itemitemitem--;;;//////");

   this.rechargeAddress(item.chainId)
   this.confirmingThreshold = item.confirmingThreshold
  },

  initTotal() {
   Promise.try(async () => {
    return await getUserSupperCoin()
   }).then(res => {
    this.coinPairList = res.data
    this.chainList = res.data[0].chainList
    this.rechargeMin = res.data[0].rechargeMin
    this.coinNameState = res.data[0].coinName
    this.confirmingThreshold = res.data[0].chainList[0].confirmingThreshold  // 区块确认值
    this.chainId = this.coinPairList[0].chainList[0].chainId
    this.rechargeAddress(this.chainId)
   })
  },

  allCoinList(page, size, queryType, coinId, coinName) {
   Promise.try(async () => {
    return await getUserRecordList({page, size, queryType, coinId, coinName})
   }).then(res => {
    this.records = res.data.records
   })
  },

  rechargeAddress(chainId) {
   Promise.try(async () => {
    return await getUserRecordAddress(chainId)
   }).then(res => {
    const {chainId, address, createTime, updateTime} = res.data

    this.chainIdInfo = chainId
    this.address = address
    this.createTime = createTime
    this.updateTime = updateTime
    this.generateQRCode(address)
   })
  },
 },
};
</script>
<style lang='scss' scoped>
.ff0 {
 color: #F0F0F0;
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
   // background: $colorB;
   border-radius: 6px;
   color: #ffffff;
   cursor: pointer;
  }
 }
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