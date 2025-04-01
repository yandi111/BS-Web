<template>
 <div
  style="height: calc(100vh - 4.52547rem);overflow-y: scroll;padding-bottom: 200px; padding-left: 24px; padding-top: 24px;">

  <div class="flex  ic ff0" style="">
   <div @click="$router.push('/overview');"
        style="width: 8.75px; height: 16.25px; margin-right: 10px; cursor: pointer;">
    <img style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/iconArr.png" alt="">
   </div>
   <div style="font-weight: 600; font-size: 24px;">资金划转</div>

  </div>
  <div style="margin-top: 55px">
   <div class="flex">
    <div class="c73 flex" style="margin-right: 53px; flex-direction: column; justify-content: start;">选择币种</div>
    <div>
     <div style="width:710px; height: 42px; ;">
      <SelectList @indexStateFn="indexStateFn" :coinPairList="coinList" :coinPairTitle="coinPairTitle"/>
     </div>
     <div class="flex" style="padding-top: 19px;">
      <div class="left">
       <div class="ff0 c73" style="font-weight: 500; font-size: 14px;margin-bottom: 7px;">从</div>
       <div style="width: 334px; height: 42px;">
        <!--  from -->
        <FromList @fromDataFn="fromDataFn" :fromDataList="fromDataList" :fromDataTitle="fromDataTitle" />
       </div>
      </div>
      <div class="center" style="margin-left: 10px; margin-right: 10px;">
       <div class="ff0 c73" style="font-weight: 500; font-size: 14px;margin-bottom: 7px; visibility: hidden;">从
       </div>
       <div @click="changeState" class="flex jc ic" style="height: 42px; cursor: pointer;">
        <div style="width: 22px; height: 22px;">
         <img width="100%" height="100%" src="@/assets/Transfer-v2/icon_onversion.png" alt="">
        </div>
       </div>
      </div>

      <div class="left">
       <div class="ff0 c73" style="font-weight: 500; font-size: 14px;margin-bottom: 7px;">到</div>
       <div style="width: 334px; height: 42px;">
        <!-- to -->
        <ToList @toDataFn="toDataFn" :toDataList="fromDataList" :toDataTitle="toDataTitle" />
       </div>
      </div>

     </div>
    </div>
   </div>

  </div>


  <div class="flex ic" style="margin-top: 20px;">
   <div style="margin-right: 81px;" class="c73">数量</div>

   <div>
    <div style="width: 710px; height: 42px;">
     <SelectCoinListNumber @withdrawalAmount="withdrawalAmount" @allAmountFn="allAmountFn"
                           :withdrawalAmountNumber="amount"/>
    </div>
    <div class="flex" style="margin-top: 5px;">
     <div class="c73" style="margin-right: 12px; font-size: 13px;">可转数量</div>
     <div style="font-size: 13px;">{{ fromDataTitle.id == 'fund' ? balance : afterBalance }}</div>

    </div>

   </div>

  </div>
  <div style="margin-left: 113px; margin-top: 60px;">
   <div @click="submitChange" class="flex jc ic"
        style="cursor: pointer;  width: 234px; height: 39px; background: #90FF00; color: #000000; border-radius: 4px;">
    立即划转
   </div>

   <RechargeRecord @fundListFn="fundListFn" :coinNameInfo="coinNameInfo" :coinId="coinId/1" :records="records"/>
  </div>
 </div>


</template>

<script>

import {mapGetters, mapActions} from "vuex";
import SelectList from "./com/SelectList.vue";
import FromList from "./com/FromList.vue";
import ToList from "./com/ToList.vue";
import SelectCoinListNumber from "./com/SelectCoinListNumber.vue";
import RechargeRecord from "./com/RechargeRecord.vue";
import {GetWalletList ,GetFundBalance,GetTransferDone,SubmitTransferDone} from "@/api/hy";
// import leftRightInput from "./components/leftRightInput.vue";
export default {
 name: "SecuritySetting",
 components: {
  // eslint-disable-next-line vue/no-unused-components
  SelectList, ToList, FromList, SelectCoinListNumber, RechargeRecord
 },
 data() {
  return {

   fromDataList: [
    {
     coinName: '资金',
     id: 'fund'

    },
    {
     coinName: 'U本位合约账户',
     id: 'contract'

    }
   ],

   fromDataTitle: {
    coinName: '资金',
    id: 'fund'
   },
   toDataTitle: {
    coinName: 'U本位合约账户',
    id: 'contract'
   },

   fundData: {
    coinName: '资金',
    id: 'fund'
   },

   contractData: {
    coinName: 'U本位合约账户',
    id: 'contract'
   },


   zijin: '资金',

   toDataTitleInfo: {},

   phoneCodeState: null,
   coinAccountTitle: '请选择账户名',
   coinNameInfo: '',
   chainListType: [],
   chainListTypeTitle: '选择网络',
   coinName: 'USDT',

   tableState: true,
   tableInfo: '11',
   tableInfotow: '22',
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
   coinAccountList: [
    {
     id: 0,
     name: '手机号'
    },
    {
     id: 1,
     name: '邮箱号'
    }

   ],
   balance: '',
   coinList: [],
   chainList: [],
   // chainListTitle:'',
   coinPairTitle: "请选择币种",
   chainListTitle: "选择网络3",

   address: '',
   createTime: '',
   updateTime: '',
   coinInfoState: false,
   confirmingThreshold: '',
   rechargeMin: '',  // 充值下限
   chainTypeList: [],

   withdrawalPrecision: '',   //提币精度
   withdrawFee: '',  // 手续费
   withdrawMin: '',  // 上限
   withdrawMax: '',  // 下限
   amount: '',  // 提币金额
   coinId: '',
   receiver: '',
   emailData: '', //
   phoneData: '',
   uidData: '',
   afterBalance: '', // 合约余额

   currentTimestamp: '',
   threeMonthsAgoTimestamp: '',
   records: []
  }
 },
 computed: {
  ...mapGetters(["userInfo", 'getUserList', 'getToken']),
  // token() {
  //   return this.getToken() ? this.getToken() : ''
  // }
 },
 created() {
  this.initTime()

 },
 mounted() {
  this.initCoinList()
  this.transferListFn(1, 100, null, null, 'TO_U_CONTRACT', this.threeMonthsAgoTimestamp, this.currentTimestamp, 'TRANSFER')


 },
 methods: {
  ...mapActions(['fetchUserInfo']),

  initTime(){
    this.currentTimestamp = Date.now();
  // 获取三个月前的时间戳（毫秒）
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3); // 设置为当前月份减去 3
  this.threeMonthsAgoTimestamp = threeMonthsAgo.getTime(); // 获取毫秒时间戳

  },



  fundListFn(type) {
    this.initTime()
    
   this.transferListFn(1, 100, null, null, type, this.threeMonthsAgoTimestamp, this.currentTimestamp, 'TRANSFER')
  },

  selectOptionInfo() {

  },

  allAmountFn() {    // 全部提币

   this.amount = this.fromDataTitle.id == 'fund' ? this.balance : this.afterBalance
  },

  // 数量·
  withdrawalAmount(amount) {
   this.amount = amount
  },
  // from
  fromDataFn(item) {
   this.fromDataTitle = item
   if (item.id == 'contract') {
    this.toDataTitle = this.fundData

   } else {
    this.toDataTitle = this.contractData

   }

  },
  // to
  toDataFn(item) {
   this.toDataTitle = item
   if (item.id == 'contract') {
    this.fromDataTitle = this.fundData
   } else {
    this.fromDataTitle = this.contractData

   }
  },

  // 切换
  changeState() {
    this.amount = null
    
   if (this.fromDataTitle.id == 'fund') {

    this.fromDataTitle = this.contractData
    this.toDataTitle = this.fundData

   } else if (this.fromDataTitle.id == 'contract') {

    this.fromDataTitle = this.fundData
    this.toDataTitle = this.contractData
   }
  },


  //  选择币种
  indexStateFn(item) {



   this.coinPairTitle = item.coinName
   this.coinNameInfo = item.coinName
   this.coinId = item.coinId
   this.balance = item.balance

   this.fromDataList = [
    {
     coinName: '资金',
     id: 'fund'

    },
    {
     coinName: 'U本位合约账户',
     id: 'contract'
    }
   ],
    this.initContract(item.coinName) // 合约余额

   this.initCoinList()

  },

  // 提交划转 SubmitTransferDone
 async submitChange() {
   if (this.coinPairTitle == "请选择币种") {
    this.$customMessage(1, '请先选择币种');
    return
   }
   if (!this.amount || this.amount <= 0) {
    this.$customMessage(1, '请先输入划转数量');
    return
   }

   let params = {
    fromType: this.fromDataTitle.id == 'contract' ? 'U_CONTRACT' : 'MAIN',
    toType: this.fromDataTitle.id == 'contract' ? 'MAIN' : 'U_CONTRACT',
    coinId: this.coinId,
    coinName: this.coinNameInfo,
    amount: this.amount,
   }

   try {
     const res = await SubmitTransferDone(params)
     console.log(res);
     this.initContract(this.coinNameInfo)
      this.initCoinList()
      this.$customMessage(0, '划转成功');
       this.$router.push('/contractTransaction')
      // this.$refs.rechargeRecord.transferSuccess()
      this.initTime()
      if (this.fromDataTitle.id == 'contract') {
       this.transferListFn(1, 100, null, null, 'FROM_U_CONTRACT', this.threeMonthsAgoTimestamp, null, 'TRANSFER')
      } else {
       this.transferListFn(1, 100, null, null, 'TO_U_CONTRACT', this.threeMonthsAgoTimestamp, null, 'TRANSFER')
      }
      this.amount = ''
   } catch (e) {console.log(e)}
  },


  // 资金余额 ==============================
 async initCoinList() { 
    
   try {
     const res = await GetFundBalance()
     console.log(res, 'totaltotaltotaltotal');
      let {data} = res
      let coinListInfo = data.filter(item => {
       return item.coinName == "USDT"
      })
      this.coinList = coinListInfo
      // this.coinNameInfo  =
      this.balance = coinListInfo[0].balance
      this.coinNameInfo = coinListInfo[0].coinName
      console.log(coinListInfo, coinListInfo.balance, 'this.coinList');
   } catch (e) {console.log(e)}
  },

  // 合约余额
  async initContract(coinName) {
    let coinNameInfo = {
      coinName
    }
   try {
     const res = await GetWalletList(coinNameInfo)
     this.afterBalance = res.data.afterBalance
   } catch (e) {console.log(e)}
  },


 async transferListFn(page, size, coinId, coinName, type, startTime, endTime, aggType) {
   let params = {
    page,
    size,
    coinId,
    coinName,
    type,
    startTime,
    endTime, aggType
   }
  //  GetTransferDone
  try {
     const res = await GetTransferDone(params)
     this.records = res.data.records
   } catch (e) {console.log(e)}
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

.c73 {
 color: #737373;
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