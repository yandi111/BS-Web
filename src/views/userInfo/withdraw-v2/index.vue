<template>
  <div
    style="height: calc(100vh - 4.52547rem);overflow-y: scroll;padding-bottom: 200px; padding-left: 24px; padding-top: 24px;">

    <div class="flex  ic ff0" style="">
      <div @click="$router.push('/overview');"
        style="width: 8.75px; height: 16.25px; margin-right: 10px; cursor: pointer;">
        <img style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/iconArr.png" alt="">
      </div>
      <div style="font-weight: 600; font-size: 24px;">{{$t('lang_2038')}}</div>
    </div>
    <!-- coinState -->
    <div style="padding-top: 53px; padding-left: 20px; width: 100%;">
      <!-- 选择您需要充入的币种 -->
      <div>
        <div class="flex" style="height: 22px;">

          <div style="width: 22px; height: 22px; ">
            <img style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/icon_01.png" alt="">
          </div>
          <div style="color: #F0F0F0; font-weight: 500; font-size: 16px;margin-left: 10px;">{{$t('lang_1369')}}</div>
        </div>

        <div class="flex ic" :style="{ borderLeft: coinState ? '2px solid #90FF00' : '2px solid #252525' }"
          style="height:90px; border-left: 2px solid #252525; margin-left: 11px; padding-left: 18px;">

          <div style="width:530px; height: 42px;">
            <SelectList @indexStateFn="indexStateFn" :coinPairList="coinPairList" :coinPairTitle="coinPairTitle" />
          </div>

        </div>
      </div>
      <div>
        <div class="flex" style="height: 22px;">
          <div style="width: 22px; height: 22px; ">
            <img v-if="coinState" style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/icon_02.png"
              alt="">
            <img v-else style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/icon_02s.png" alt="">
          </div>
          <!-- <Table  :tableInfo="tableInfo" :tableInfotow ="tableInfotow" />  -->
          <!--链上充币  内部转账 -->


          <div style="" class="flex">
            <div @click="tableState = true, account = ''" class="flex jc ic"
              style=" font-weight: 500; font-size: 16px;margin-left: 10px; margin-right: 25px; flex-direction: column; cursor: pointer; ">
              <div :style="{ color: tableState ? '#F0F0F0' : '#737373' }">{{$t('lang_1930')}}</div>
              <div style="width: 18px; height: 2px;margin-top: 7px;">
                <img v-if="tableState" style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/Rec.png"
                  alt="">
              </div>
            </div>

            <div @click="tableState = false, account = ''" class="flex jc ic"
              style="color: #F0F0F0; font-weight: 500; font-size: 16px;margin-left: 10px; margin-right: 25px; flex-direction: column ;cursor: pointer;  ">
              <div :style="{ color: !tableState ? '#F0F0F0' : '#737373' }">{{$t('lang_1944')}}</div>
              <div style="width: 18px; height: 2px;margin-top: 7px;">
                <img v-if="!tableState" style="width: 100%; height: 100%;" src="@/assets/images/deposit-v2/Rec.png"
                  alt="">
              </div>
            </div>
            <!-- <div style="color: #737373;"></div> -->
          </div>
        </div>

        <!-- //链上提币   -->
        <div v-if="tableState">
          <div class="" style="height:90px;  padding-left: 30px; margin-top: 25px; ">
            <div style="color: #F0F0F0;">提币地址</div>
            <div style="width: 530px; height: 42px;margin-top: 20px;">
              <leftRightInput :chainList=chainList :receiver=receiver @receiverFunction="receiverFunction" />
            </div>
          </div>

          <div>
            <div class="flex" style="height: 22px; margin-top: 25px;">

              <div style="width: 22px; height: 22px; ">
              </div>
              <div style="color: #F0F0F0; font-weight: 500; font-size: 16px;margin-left: 10px;">链类型</div>
            </div>

            <div class="flex ic" style="height:90px; padding-left: 30px;">
              <div style="width: 530px; height: 42px;">
                <SelectListRefund :chainTypeList='chainTypeList' @chainPairListFn='chainPairListFn'
                  :chainListTypeTitle='chainListTypeTitle' />
              </div>
            </div>
          </div>

          <div>
            <div class="flex" style="height: 22px; margin-top: 25px;">

              <div style="width: 22px; height: 22px; ">
              </div>
              <div style="color: #F0F0F0; font-weight: 500; font-size: 16px;margin-left: 10px;">提币数量</div>
            </div>

            <div class="flex ic" style="height:90px; padding-left: 30px; ">
              <div style="width: 530px; height: 42px;">
                <SelectListState @withdrawalAmount='withdrawalAmount' @allCoinTakeFn="allCoinTakeFn"
                  :withdrawMin="withdrawMin" :withdrawalChainAmount="account" :coinName="coinName" />
              </div>
            </div>
          </div>
          <!-- 可提：0.00 -->
          <div style="margin-left: 30px; width: 530px;" class="flex jb">
            <div class="flex">
              <div class="flex jc" style="flex-direction: column; color: #737373; font-size: 12px;">
                <div>可提：</div>
                <div style="margin-top: 7px;">手续费：</div>
              </div>
              <div class="flex jc" style="flex-direction: column; font-size: 12px;">
                <div>{{ balance || '--' }}</div>
                <div style="margin-top: 7px;">{{ withdrawFee || '--' }}</div>
              </div>

            </div>


            <div class="flex" style="flex-direction: column;">
              <div class="" style="flex-direction: column; font-size: 12px;">
                <div class="flex" style="justify-content: end;color: #F0F0F0; ">资金账户</div>
              </div>
              <div class="flex jc" style=" font-size: 12px;margin-top: 7px">
                <div style="color: #737373">预计到账：</div>
                <div>{{ arrive || '--' }}</div>
              </div>

            </div>


          </div>
        </div>
        <!-- 内部转账 -->
        <div v-else style="padding-left: 30px;">
          <div v-if="false" style="margin-top: 18px; margin-bottom: 100px;">
            <div style="color: #F0F0F0; font-size: 16px;" class="ff0">{{$t('该功能仅限VIP1及以上用户使用')}}</div>
          </div>
          <div>

            <div style=" margin-top: 18px;">
              <dir style=" color: #F0F0F0; margin-bottom: 10px; margin-left: -35px;">{{$t('lang_2138')}}UID</dir>
              <div style="width: 530px; height: 42px;">
                <LeftRightUid @uidFunction="uidFunction" />
              </div>
            </div>

            <div style=" margin-top: 18px;">

              <div style="width: 530px; height: 42px; margin-bottom: 20px;">
                <div style=" color: #F0F0F0; margin-bottom: 10px;">{{$t('lang_2140')}}</div>
                <SelectAccount @AccountStateFn="AccountStateFn" :coinAccountList=coinAccountList
                  :coinAccountTitle=coinAccountTitle />
              </div>


              <div v-if="phoneCodeState == 0 || phoneCodeState == 1" style="width: 530px;">
                <PhoneNumber @phoneNumberData="phoneNumberData" v-if="phoneCodeState == 0" />
                <div v-else style="width: 530px; height: 42px; margin-top: 50px;">
                  <div style=" color: #F0F0F0; margin-bottom: 10px; ">{{$t('lang_2754')}}</div>
                  <LeftRightMail @receiverEmailFunction="receiverEmailFunction" />
                </div>
              </div>


            </div>
            <!-- 提币数量 -->
            <div>
              <div class="flex" style="height: 22px; margin-top: 50px;">
                <div style="color: #F0F0F0; font-weight: 500; font-size: 15px;">{{$t('lang_2046')}}</div>
              </div>

              <div class="flex ic" style="height:90px;">
                <div style="width: 530px; height: 42px;">
                  <SelectCoinListNumber @withdrawalAmountNumber='withdrawalAmountNumber' :withdrawMin="withdrawMin"
                    :withdrawMax="withdrawMax" :withdrawalInputAmount="account" @allAccountFn="allAccountFn"
                    :balance="balance" :coinPairList="coinPairList" :coinPairTitle="coinPairTitle" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="jic" @click="submitAdd"
          style="background-color: #90FF00; color: #000000; border-radius: 4px; width: 530px;height: 39px; margin-left: 30px; margin-top: 50px;">
          {{$t('lang_2626')}}</div>

        <Tips  :withdrawMin="withdrawMin"  />

      </div>
      <!-- 链类型 -->
      <div>


        <RechargeRecord :chainIdInfo=chainIdInfo :coinNameInfo="coinNameInfo" />
        <!-- 1212 -->


      </div>
      <CheckMask @blanceInfoFmn="blanceInfoFmn" ref="checkMask" @takeCoinSuccessFn="takeCoinSuccessFn" />


    </div>





  </div>
</template>

<script>

import { mapGetters, mapActions ,mapMutations} from "vuex";
import { getToken } from "@/libs/utils"; // 引入获取 token 的工具函数

import SelectList from "./com/SelectList.vue";
import leftRightInput from "./com/leftRightInput.vue";
import Tips from "./com/Tips.vue";
import QRCode from 'qrcode'; // 导入 qrcode 库
import RechargeRecord from "./com/RechargeRecord.vue";
import SelectListState from "./com/SelectListState.vue";
import SelectCoinListNumber from "./com/SelectCoinListNumber.vue";
import SelectListRefund from "./com/SelectListRefund.vue";
import LeftRightMail from "./com/LeftRightMail.vue";
import LeftRightUid from "./com/LeftRightUid.vue";
import PhoneNumber from '@/views/com/PhoneNumber.vue'
import { GetWithdrawal } from "@/api/hy";
import {getUserRecordAddress} from "@/api/user";

import SelectAccount from "./com/SelectAccount.vue";

import CheckMask from "./com/CheckMask.vue";


import Table from "./com/Table.vue";

// import leftRightInput from "./components/leftRightInput.vue";

export default {
  name: "SecuritySetting",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SelectList, leftRightInput, Tips, RechargeRecord, Table, SelectListState, SelectListRefund, CheckMask, LeftRightUid, SelectAccount,
    PhoneNumber, LeftRightMail, SelectCoinListNumber
  },
  data() {
    return {
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
      chainList: [],
      // chainListTitle:'',
      coinPairTitle: "请选择币种",
      chainListTitle: "选择网络3",

      chainIdInfo: '',
      address: '',
      createTime: '',
      updateTime: '',
      coinState: false,
      coinInfoState: false,
      confirmingThreshold: '',
      rechargeMin: '',  // 充值下限
      chainTypeList: [],

      withdrawalPrecision: '',   //提币精度
      withdrawFee: '',  // 手续费
      withdrawMin: '',  // 上限
      withdrawMax: '',  // 下限
      balance: '',
      amount: '',  // 提币金额
      coinId: '',
      receiver: '',
      emailData: '', // 
      phoneData: '',
      uidData: '',
      account: null,
      accountInfo: null,
      // arrive:null,
    }
  },
  computed: {
    ...mapGetters(["userInfo", 'getUserList']),
    token() {
      return getToken() ? getToken() : ''
    },
    // eslint-disable-next-line vue/return-in-computed-property
    arrive() {
      if (this.accountInfo && this.withdrawFee) {
        return this.accountInfo / 1 - this.withdrawFee / 1
      }
    }


  },
  created() {

  },
  mounted() {
    this.initTotal()
  },
  methods: {
    ...mapActions(['fetchUserInfo']),
    ...mapMutations(['setMobilePhone']),
    blanceInfoFmn(blance) {

      this.balance = blance

    },
    formatPhoneNumber(phoneNumber) {
    if (phoneNumber) {
        // 正则表达式匹配国际区号和手机号
        const regex = /(\+\d{1,3})\s*(\d{3})(\d{4})(\d{4,})/; // 匹配国际区号、前三位、中间四位和末尾部分
        // 使用 replace 方法进行格式化
        return phoneNumber.replace(regex, '$1 $2****$4');
    }
    return phoneNumber; // 如果没有提供手机号，返回原始值
},


    

    AccountStateFn(id) {   //  账号选择 , 0手机 1邮箱
      this.phoneCodeState = id
      this.coinAccountTitle = id == 0 ? '手机号' : '邮箱号'
    },
    allAccountFn() {   // 点击提币
      this.account = this.withdrawMax
    },

    allCoinTakeFn() {  //链上提币的全部提币


      this.account = this.balance
    },
    takeCoinSuccessFn() {     // 提币成功回掉
      this.account = ''

    },

    selectOptionInfo() {

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

    chainPairListFn(item) {
      this.chainListTypeTitle = item.tokenProtocol
      this.withdrawFee = item.withdrawFee


    },
    submitAdd() {
      

      if (this.coinPairTitle == "请选择币种") {
        this.$customMessage(1, '请选择币种');
        return
      }

      let params = {}

      

      if (this.tableState) {   // 链上提币
        if (!this.receiver) {
          this.$customMessage(1, '请输入提币地址');
          return
        }
        if (this.chainListTypeTitle == '选择网络') {
          this.$customMessage(1, '请选择网络');
          return
        }

       
       
        params = {
          amount: this.account,
          coinId: this.coinId,
          coinName: this.coinName,
          type: 1,
          chainId: this.chainId, receiver: this.receiver,
          toUid: null,
          bizId: null
        }

      } else {      // 内部转账
        if (!this.uidData) {
          this.$customMessage(1, '请输入账户UID');
          return
        }
        if (this.phoneCodeState != 1 && this.phoneCodeState != 0) {
          this.$customMessage(1, '请选择账户名');
          return
        } else {
          if (this.phoneCodeState == 1) {
            if (!this.emailData) {
              this.$customMessage(1, '请输入邮箱');
              return

            }

          }
          if (this.phoneCodeState == 0) {
            if (!this.phoneData) {
              this.$customMessage(1, '请输入手机号');
              return
            }else{
              console.log( 'formatPhoneNumber================================>',  this.phoneData);
              let phstate = this.formatPhoneNumber(this.phoneData) 
              console.log( 'formatPhoneNumber================================>121212',  phstate);
               this.setMobilePhone(phstate)
            }

          }
        }      
        
        params = {
          amount: this.account,
          coinId: this.coinId,
          coinName: this.coinName,
          type: this.phoneCodeState == 1 ? 2 : 3,    // 提现类型 1:链上钱包提现 2-内部邮箱提现 3-内部手机号提现 4-内部钱包地址提现(链上转内部，由后台识别变更),可用值:1,2,3,4
          chainId: null,
          receiver: this.phoneCodeState == 1 ? this.emailData : this.phoneData,
          toUid: this.uidData,
          bizId: null
        }
      }
      if (!this.accountInfo) {
          this.$customMessage(1, '请输入提币数量');
          return
        }
        if (this.accountInfo/1 < 0) {
          this.$customMessage(1, '提币数量不能为负');
          return
        }
        if (this.accountInfo/1 < this.withdrawMin/1) {
          this.$customMessage(1, '提币金额小于最小提币限额');
          return
        }

  

      this.$refs.checkMask.check(params)

    },
    // 提币数量·
    withdrawalAmount(amount) {
      this.account = amount
      this.accountInfo = amount
    },
    withdrawalAmountNumber(amount) {
    
      this.account = amount
      this.accountInfo = amount

      console.log(amount,this.accountInfo,'accountInfo');

    },
    //  提币地址
    receiverFunction(receiver) {
      this.receiver = receiver
    },
    receiverEmailFunction(email) {   // 邮箱
      this.emailData = email

    },
    phoneNumberData(email) {   // 邮箱
      this.phoneData = email
    },

    uidFunction(uid) {
      this.uidData = uid
    },


    //  选择币种
    indexStateFn(item) {
      this.coinNameInfo = item.coinName
      this.coinPairTitle = item.coinName
      this.coinState = true

      // this.chainList = this.coinPairList[index].chainList
      this.chainTypeList = item.chains

      this.coinName = item.coinName
      this.coinId = item.coinId
      this.coinName = item.coinName

      this.withdrawMin = item.withdrawMin  //每次可提上限	
      this.withdrawMax = item.withdrawMax
      this.balance = item.balance
      this.withdrawFee = item.chains[0].withdrawFee //	提币手续费
      this.withdrawalPrecision = item.withdrawalPrecision   //提币精度

      if (this.chainListTitle == "选择网络") {
        return
      } else {
        // this.rechargeAddress(this.chainListTitle)
      }
    },

    chainListFn(item) {
      this.coinInfoState = true
      this.chainListTitle = item.tokenProtocol
      this.chainId = item.chainId
      this.confirmingThreshold = item.confirmingThreshold
    },



    async initTotal() {

      //  GetTransferDone
      try {
        const res = await GetWithdrawal(null)

          this.coinPairList = res.data
          this.chainTypeList = res.data[0].chains
          console.log(this.chainTypeList, 'chainTypeList');

          this.coinNameState = res.data[0].coinName
          this.confirmingThreshold = res.data[0].chains[0].confirmingThreshold  // 区块确认值
          this.chainId = this.coinPairList[0].chains[0].chainId
          this.rechargeAddress(this.chainId)
       
      } catch (e) { console.log(e) }
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
</style>