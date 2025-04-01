<template>
  <div
    style="height: calc(100vh - 4.52547rem);overflow-y: scroll;padding-bottom: 200px; padding-left: 24px; padding-top: 24px; padding-right: 20px;">

    <div class="flex jb ic" style="">

      <div style="font-size: 30px;font-weight: 600;">闪兑</div>
      <div class="flex">
        <div class="fc btn1" @click="$router.push('/user/deposit-v2');"
          style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; background-color: #90FF00;">
          充币</div>
        <div class="fc btn2" @click="$router.push('/user/withdraw-v2');"
          style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; color: #F0F0F0; margin-left: 20px;">
          提币</div>
        <div class="fc btn2"
          style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; color: #F0F0F0; margin-left: 20px;">
          划转</div>

      </div>
    </div>
    <div style="margin-top: 55px;padding-left: 111px;">

      <div class="flex" style="padding-top: 19px;">
        <div class="left">
          <div class="ff0 c73" style="font-weight: 500; font-size: 14px;margin-bottom: 7px;">兑换</div>
          <div style="width: 234px; height: 42px;">
            <!--  from -->
            <FromList @fromDataFn="fromDataFn" :fromDataList="fromNewDataList" :fromDataTitle="fromDataTitle" />

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
          <div style="width: 234px; height: 42px;">
            <!-- to -->
            <ToList @toDataFn="toDataFn" :toDataList=toNewDataList :toDataTitle=toDataTitle />
          </div>
        </div>

      </div>

    </div>
    <div class="flex ic" style="margin-top: 20px;">
      <div style="margin-right: 15px;" class="c73">兑换数量({{ this.fromDataTitle.coinName }})</div>
      <div style=" height: 42px; width: 510px;">
        <SelectCoinListNumber @withdrawalAmount="withdrawalAmount" @allAmountFn="allAmountFn"
          :withdrawalAmountNumber="amount" />
      </div>
    </div>


    <div class="flex ic" style="margin-top: 20px;padding-left: 111px;">

      <div style="width: 510px;">


        <div style="margin-top: 49px;">
          <div class="flex ic jb" style="margin-top: 5px; width: 100%; color: #F0F0F0;">
            <div class="c73" style="font-size: 13px;">最多可兑换：</div>

            <div style="font-size: 13px;">{{ fromCoinAmount }} {{ this.fromDataTitle.coinName }}</div>
          </div>
          <div class="flex ic jb" style="margin-top: 5px; width: 100%; color: #F0F0F0;">
            <div class="c73" style="font-size: 13px;">实时汇率</div>
            <div style="font-size: 13px;">1 {{ this.fromDataTitle.coinName }} = {{ rate }} {{ this.toDataTitle.coinName
              }}</div>
          </div>
          <div class="flex ic jb" style="margin-top: 5px; width: 100%; color: #F0F0F0;">
            <div class="c73" style="font-size: 13px;">您预计获得：</div>
            <div style="font-size: 13px;">{{ $thousandth(expectedoToBtain) }} {{ this.toDataTitle.coinName }} <span style="color: #ED3C2F;">{{countdown}}s</span> </div>
          </div>

        </div>


      </div>

    </div>
    <div style="margin-left: 113px; margin-top: 60px;">
      <div @click="submitChange" class="flex jc ic"
        style="cursor: pointer;  width: 234px; height: 39px; background: #90FF00; color: #000000; border-radius: 4px;">
        确认兑换</div>

      <RechargeRecord ref="rechargeRecord" :coinNameInfo="coinNameInfo" :coinId="coinId" :records="records" />
    </div>
  </div>


</template>


<script>

import { mapGetters, mapActions } from "vuex";
import SelectList from "./com/SelectList.vue";
import FromList from "./com/FromList.vue";
import ToList from "./com/ToList.vue";
import SelectCoinListNumber from "./com/SelectCoinListNumber.vue";
import RechargeRecord from "./com/RechargeRecord.vue";
import {exchangeRecordPage,fastExchangeAmount,assetFastExchange,getCoinList} from "@/api/user";
export default {
  name: "SecuritySetting",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SelectList, ToList, FromList, SelectCoinListNumber, RechargeRecord
  },
  data() {
    return {
      records:[],
      fromCoinAmount: '',
      rate: '',
      toDataList: [],

      fromDataList: [],

      fromDataTitle: {
      },
      toDataTitle: {
      },
      fundData: {
      },
      contractData: {
      },


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

      chainIdInfo: '',
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
      afterBalance: '',  // 合约余额

      fromCoinList: [],
      toCoinList: [],
      fromInitTitle: {},
      toInitTitle: {},

      countdown: 5, // 倒计时初始值
      isCounting: false, // 开关状态
      interval: null // 存储 setInterval 的 ID

    }
  },
  computed: {
    ...mapGetters(["userInfo", 'getUserList', 'getToken']),

    // 累计获得  // 数量 * 汇率

    expectedoToBtain() {
      return this.amount * this.rate
    },


    fromNewDataList() {
      return this.fromDataList.filter(item => {
        return item.coinName != this.toDataTitle.coinName
      })
    },
    toNewDataList() {
      return this.toDataList.filter(item => {
        return item.coinName != this.fromDataTitle.coinName
      })
    }

  },
  created() {
    // this.fromDataList


  },
  mounted() {
    this.rightCoinList()
    this.startCountdown()
    this.initTotal()
  },
  methods: {
    ...mapActions(['fetchUserInfo']),


   // 兑换记录
    initTotal() {
            let params = {
                page: '1',
                size: '100',
               
            }

Promise.try(() => {
  return exchangeRecordPage(params)
 }).then(res => {
          if (res.code == 200) {
            this.records = res.data.records

          } else {
            this.$customMessage(2, res.msg);
          }
 }).catch((e)=>{
  console.log(e);
  
 })

            // axios
            //     .post("/app/bsex-finance/asset/fast/exchange/record/page", params, {
            //         headers: {
            //             "x-language": "zh_CN",
            //             "x-device-id": "", // 设备唯一标识
            //             "x-app-type": "WEB",
            //             "x-app-version": "", // app版本号
            //             "x-app-token": this.getToken, //
            //             "x-device-model": "", //  设备型号
            //         },
            //     })
            //     .then((res) => {
            //         if (res.data.code == 200) {
            //             console.log(res, 'coinNameInfocoinNameInfo');

            //             this.records = res.data.data.records
            //         } else {
            //             this.$customMessage(2, res.data.msg);
            //         }
            //     })
            //     .catch((e) => {
            //         this.$customMessage(2, e);
            //         console.log(e);
            //     });
        },



    selectOptionInfo() {

    },

    allAmountFn() {    // 全部提币

      this.amount = this.fromCoinAmount
    },

    // 数量·
    withdrawalAmount(amount) {
      this.amount = amount
    },
    // from
    fromDataFn(item) {
      this.fromDataTitle = item
      this.fromInitTitle = item

      this.initContract(item.coinName, this.toDataTitle.coinName)

      this.startCountdown()

    },
    // to
    toDataFn(item) {
   
      this.toDataTitle = item
      this.toInitTitle = item
      this.initContract(this.fromDataTitle.coinName, item.coinName)

      this.startCountdown()
    },

    // 切换
    changeState() {
      if (this.fromDataTitle != this.toInitTitle) {
        this.fromDataTitle = this.toInitTitle
        this.toDataTitle = this.fromInitTitle
      } else {
        this.fromDataTitle = this.fromInitTitle
        this.toDataTitle = this.toInitTitle
      }
      this.initContract(this.fromDataTitle.coinName, this.toDataTitle.coinName)

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

    },

    // 提交
    submitChange() {
      if (!this.amount) {
        this.$customMessage(1, '兑换数量不能为空');
        return
      }
      let params = {
        amount: this.amount,
        fromCoinName: this.fromDataTitle.coinName,
        toCoinName: this.toDataTitle.coinName,
      }

      Promise.try(() => {
  return assetFastExchange(params)
 }).then(res => {
          if (res.code == 200) {
            this.$customMessage(0, '闪兑成功');
            this.initTotal()
            this.amount=''
          } else {
            this.$customMessage(2, res.msg);
          }
 }).catch((e)=>{
  console.log(e);
  
 })


      // axios
      //   .post("/app/bsex-finance/asset/fast/exchange", params, {
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
      //       this.$customMessage(0, '闪兑成功');
      //       this.initTotal()
      //       this.amount=''
      //     } else {
      //       this.$customMessage(2, res.data.msg);
      //     }
      //   })
      //   .catch((e) => {
      //     // this.$customMessage(2, e);
      //     console.log(e);
      //   });
    },
    // 
    rightCoinList() {

    
  Promise.try(async () => {
   return await getCoinList()
  }).then(res => {
  //  this.coinPairListInfo = res.data
  if (res.code ==200) {
    console.log(res, 'totaltotaltotaltotal---000000');
            this.fromDataList = res.data
            this.toDataList = res.data
            this.fromDataTitle = res.data[0]
            this.fromInitTitle = res.data[0]
            this.toInitTitle = res.data[1]
            this.toDataTitle = res.data[1]
            this.initContract(this.fromDataTitle.coinName, this.toDataTitle.coinName)
  }
  })

      // axios
      //   .get("/app/bsex-market/coin/list", {
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
      //       console.log(res, 'totaltotaltotaltotal---000000');
      //       this.fromDataList = res.data.data
      //       this.toDataList = res.data.data
      //       this.fromDataTitle = res.data.data[0]
      //       this.fromInitTitle = res.data.data[0]
      //       this.toInitTitle = res.data.data[1]
      //       this.toDataTitle = res.data.data[1]
      //       this.initContract(this.fromDataTitle.coinName, this.toDataTitle.coinName)
      //     } else {
      //       this.$customMessage(2, res.data.msg);
      //     }
      //   })
      //   .catch((e) => {
      //     this.$customMessage(2, e);
      //     console.log(e);
      //   });
    },


    initContract(from, to) {
      let params = {
        fromCoinName: from,
        toCoinName: to
      };

      console.log('请求参数:', params); // 打印请求参数


      Promise.try(() => {
  return fastExchangeAmount(params)
 }).then(res => {
          if (res.code == 200) {
            console.log(res, 'datadatadatadatadata11');
            let { fromCoinAmount, rate } = res.data
            this.fromCoinAmount = this.$thousandth(fromCoinAmount)
            this.rate = rate
            
          } else {
            this.$customMessage(2, res.msg);
          }
 }).catch((e)=>{
  console.log(e);
  
 })


      // axios.post("/app/bsex-finance/asset/fast/exchange/amount", params, {
      //   headers: {
      //     "x-language": "zh_CN",
      //     "x-device-id": "", // 设备唯一标识
      //     "x-app-type": "WEB",
      //     "x-app-version": "", // app版本号
      //     "x-app-token": this.getToken, // 确保这个值是有效的
      //     "x-device-model": "", // 设备型号
      //   },
      // })
      //   .then((res) => {
      //     if (res.data.code == 200) {
      //       console.log(res, 'datadatadatadatadata11');
      //       let { fromCoinAmount, rate } = res.data.data
      //       this.fromCoinAmount = this.$thousandth(fromCoinAmount)
      //       this.rate = rate
      //     } else {
      //       this.$customMessage(2, res.data.msg);
      //     }
      //   })
      //   .catch((error) => {
      //     if (error.response) {
      //       console.error('Response data:', error.response.data);
      //       console.error('Response status:', error.response.status);
      //       console.error('Response headers:', error.response.headers);
      //     } else if (error.request) {
      //       console.error('Request data:', error.request);
      //     } else {
      //       console.error('Error message:', error.message);
      //     }
      //   });
    },

    startCountdown() {
       // 清除之前的定时器
    if (this.interval) {
        clearInterval(this.interval);
    }
      this.isCounting = true;
      this.countdown = 5; // 重置倒计时
      this.interval = setInterval(() => {
        if (this.countdown <= 0) {
          // 调用接口    fromDataTitle toDataTitle
          console.log(this.fromDataTitle.coinName,this.toDataTitle.coinName,'this.toDataTitle.coinName');
          
          this.initContract(this.fromDataTitle.coinName, this.toDataTitle.coinName); // 示例参数
          this.countdown = 5; // 重置倒计时
        } else {
          this.countdown--; // 倒计时减一
        }
      }, 1000); // 每秒更新倒计时
    },
    stopCountdown() {
      this.isCounting = false;
      clearInterval(this.interval); // 清除定时器
    },
    toggleCountdown() {
      if (this.isCounting) {
        this.stopCountdown();
      } else {
        this.startCountdown();
      }
    }


  },
  beforeDestroy() {
        // 组件销毁时清除定时器
        clearInterval(this.interval);
    }
};
</script>
<style lang='scss' scoped>
.ff0 {
  color: #F0F0F0;
}

.jb {
  justify-content: space-between;
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

.fc {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn1 {
  color: #252525
}

.btn1:hover {
  color: #737373
}

.btn2 {
  background-color: #252525;
}

.btn2:hover {
  background-color: #363636;
}
</style>