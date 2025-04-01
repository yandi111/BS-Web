<template>
 <div>
  <!-- <button @click="openDialog"></button> -->
  <!-- <PhoneNumber /> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525; ">
     <div class="flex jb"
          style="padding-top: 17px; padding-bottom: 10px; padding-left: 30px; padding-right: 30px; border-bottom: 1px solid #252525; ">
      <div class="ff" style="font-size: 16px; color: #F0F0F0;  ">{{ titleInfo }}</div>
      <div class="closetext">
       <button @click="isDialogVisible = false" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
         <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
       </button>
      </div>

     </div>


     <div v-if=" authBizEnum =='BIND_GOOGLE_AUHT'">
      <GoogleBindText :googleTotpKey=googleTotpKey :qrcodeUrl="qrcodeUrl"/>
     </div>
     <div style="padding-left: 30px; padding-right: 30px;" v-if=" authBizEnum =='SET_FUNDS_PASSWORD'">
      <passWordNewFunds @passwordDataClickFunds="passwordDataClickFunds"
                        @passwordNewDataClickFunds="passwordNewDataClickFunds"/>
     </div>
     <!-- <GoogleSetText :googleTotpKey = googleTotpKey /> -->

     <div style="place-self: 30px; padding-right: 30px; padding-left: 30px;">
      <div v-for="(item, index) in authOptions" :key="index">

       <div v-if="item.method === 'NEW_PHONE'">
        <PhoneNumber @phoneNumberData="phoneNumberData" :authBizEnum='authBizEnum' :bizId='bizId'/>
        <PhoneNewCode @phoneNewCodeClick="phoneNewCodeClick" :authBizEnum='authBizEnum' :bizId='bizId'
                      :method="item.method"/>
       </div>

       <div v-if="item.method === 'INPUT_PHONE'">
        <PhoneNumber @phoneNumberData="phoneNumberData" :authBizEnum='authBizEnum' :bizId=bizId
                     :titleInfoState="titleInfoState"/>
        <PhoneINPUTCode @phoneINPUTCode='phoneINPUTCode' :phoneData='phoneData' :authBizEnum='authBizEnum'
                        :titleInfoState="titleInfoState"
                        :bizId='bizId' :method="item.method"/>
       </div>

       <div v-if="item.method === 'PHONE'">
        <!-- <PhoneNumber  @phoneNumberData="phoneNumberData" :authBizEnum='authBizEnum' :bizId='bizId' />  -->
        <PhoneCheckCode @phoneCheckCodeClick='phoneCheckCodeClick' :prompt=" item.prompt" :authBizEnum='authBizEnum'
                        :bizId='bizId'
                        :titleInfoState="titleInfoState"
                        :method="item.method"/>
       </div>

       <div v-if="item.method === 'EMAIL'">
        <EmailCheckCode @emailCheckCodeClick='emailCheckCodeClick' :authBizEnum='authBizEnum' :bizId='bizId'
                        :method="item.method"/>
       </div>
       <div v-if="item.method === 'NEW_EMAIL'">
        <EmailNewCode @emailNewCodeClick='emailNewCodeClick' :authBizEnum='authBizEnum' :bizId='bizId'
                      :method="item.method"/>
       </div>

       <div v-if="item.method === 'INPUT_EMAIL'">
        <EmailINPUTCode @emailINPUTCodeClick='emailINPUTCodeClick' :authBizEnum='authBizEnum' :bizId='bizId'
                        @emailINPUTCodeClickSh="emailINPUTCodeClickSh"
                        :emailInfoState='emailInfoState'
                        :method="item.method"/>
       </div>


       <div v-if="item.method === 'GOOGLE_AUTHENTICATOR'">
        <div v-if=" authBizEnum ==='MODIFY_GOOGLE_AUHT'">
         <GoogleSetText :qrcodeUrl="qrcodeUrl" :googleTotpKey=googleTotpKey />
        </div>

        <GoogleCheckCode @googleCheckCodeClick='googleCheckCodeClick' :authBizEnum='authBizEnum' :bizId='bizId' :method="item.method"/>
       </div>


       <div v-if="item.method === 'NEW_GOOGLE_AUTHENTICATOR'">
        <GoogleNewCode @googleNewCodeClick="googleNewCodeClick" :authBizEnum='authBizEnum' :bizId='bizId' :method="item.method"/>
       </div>

       <div v-if="item.method === 'PASSWORD'">
        <PassWord @passWordClick='passWordClick'/>
        <passWordNew @passwordDataClick='passwordDataClick' @tipsStatusInfo='tipsStatusInfo'
                     @passwordNewDataClick="passwordNewDataClick"/>
       </div>

       <div v-if="item.method ==='FUNDS_PASSWORD'">
        <PassWordFunds @passWordClickFunds='passWordClickFunds'/>

        <passWordNewFunds v-if="authBizEnum === 'MODIFY_FUNDS_PASSWORD'" @passwordDataClickFunds="passwordDataClickFunds" @passwordNewDataClickFunds="passwordNewDataClickFunds"/>
       </div>

      </div>


      <div class="flex" style="margin-top: 44px; margin-bottom: 30px;padding-left: 100px; padding-right: 100px;">
       <div @click.self="isDialogVisible = false" class="cancel flex jc ic"
            style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1;margin-right:14px;height: 34px;border-radius: 4px;">
        {{$t('lang_1989')}}
       </div>
       <div @click.self="submit" class="submit flex jc ic"
            style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1; height: 34px; border-radius: 4px;">
        {{$t('lang_1996')}}
       </div>
      </div>
     </div>

    </div>
   </div>

  </transition>

  <mobile-code ref="mobileCode"/>
 </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import PhoneNumber from '@/views/com/PhoneNumber.vue'
import PhoneINPUTCode from '../inputCom/PhoneINPUTCode'
import PhoneCheckCode from '../inputCom/PhoneCheckCode'
import EmailCheckCode from '../inputCom/EmailCheckCode'
import EmailINPUTCode from '../inputCom/EmailINPUTCode'
import PhoneNewCode from '../inputCom/PhoneNewCode'
import GoogleCheckCode from '../inputCom/GoogleCheckCode'
import GoogleNewCode from '../inputCom/GoogleNewCode'
import EmailNewCode from '../inputCom/EmailNewCode'
import PassWord from '../inputCom/PassWord'
import passWordNew from '../inputCom/passWordNew'
import PassWordFunds from '../inputCom/PassWordFunds'
import passWordNewFunds from '../inputCom/passWordNewFunds'

import GoogleBindText from '../inputCom/GoogleBindText'

import GoogleSetText from '../inputCom/GoogleSetText'
import MobileCode from '@/views/login/components/mobileCode.vue';
import SHA256 from 'crypto-js/sha256';
import QRCode from 'qrcode'; // 导入 qrcode 库

// import axios from 'axios';
import {onVerifyRegister} from "@/api/login";

export default {
 components: {
  // UserTips
  MobileCode,
  PassWord,
  passWordNew,
  PassWordFunds,
  passWordNewFunds,
  GoogleBindText,
  GoogleSetText,
  PhoneNumber,
  PhoneINPUTCode,
  PhoneCheckCode,
  EmailINPUTCode,
  EmailCheckCode,
  PhoneNewCode,
  GoogleCheckCode,
  GoogleNewCode,
  EmailNewCode
 },
 name: 'BindPhone',
 data() {
  return {
   titleInfo: '',
   qrcodeUrl: '',
   summitUrl: '',
   EMAILshow: false,
   INPUT_EMAILshow: false,
   emailInfoState: false,

   PHONEshow: false,
   INPUT_PHONEshow: false,

   GOOGLE_AUTHENTICATORshow: false,
   NEW_GOOGLE_AUTHENTICATORshow: false,

   PASSWORDshow: false,
   FUNDS_PASSWORDshow: false,

   authBizEnum: '',
   bizId: '',
   itemMethod: '',
   newAuthOptionsList: '',
   authOptions: [],
   secondsStatus: false,
   secondsInfo: false,
   isRotated: true,
   getMethod: "NEW_PHONE",

   googleTotpKey: '',
   googleTotpKeyQrCodeText: '',


   phoneData: '', // 输入的手机号
   phoneNewData: '', // 新手机号验证码
   phoneINPUTData: '',// phoneINPUT
   emailCheckCodeData: '',// EMAIL
   emailINPUTdata: '', // imputEmail
   emailNewData: '', // new_gmail
   googleData: '',
   googleNewData: '',
   passWordData: '', // 旧密码
   passwordDataNew: '', // 新密码
   passwordDataNewInfo: '', // 新密码确认
   passWordFundsOld: '', // 旧资金密码
   passwordDataFunds: '', // 新资金密码
   passwordNewDataFundsInfo: '',// // 新资金密码确认
   emailCheckCodeNumber: '',
   phoneCheckCodeData: '',
   phoneCheckCode: '',
   emailData: '',
   googleCheckCode: '',
   seconds: 60, // 倒计时数据
   secondsEmail: 60, // 倒计时数据

   eventFlags: false,
   verifyCode: '',
   blurstate: false,
   phoneCheck: false,
   selectedOption: '86', // 默认选项
   countryList: [
    {
     id: 1,
     name: '中国',
     code: 53
    },
    {
     id: 2,
     name: '中国香港',
     code: 54
    },

    {
     id: 2,
     name: '中国香',
     code: 55
    }

   ],
   emailCheckCodeNumber: '',
   eventFlag: false,
   count: 0,
   isHovered: false,
   isAddHovered: false,
   isDialogVisible: false,
   accountList: [
    {
     account: '857229093@qq.components',
     name: '移出'
    },
    {
     account: '857229093@qq.components',
     name: '移出'
    },
    {
     account: '857229093@qq.components',
     name: '移出'
    }
   ]
  }
 },
 computed: {
  ...mapGetters(['getUserList']),

  userList() {
   return this.getUserList; // 计算属性返回用户信息
  },
  phoneEmail() {
   return this.getMethod === "NEW_PHONE"
  },
 },
 // eslint-disable-next-line vue/return-in-computed-property
 mounted() {

 },
 methods: {
  ...mapMutations(['setAuthBizEnum', 'setBizId']),
  ...mapActions(['fetchUserInfo']),


  generateQRCode(address) {
   QRCode.toDataURL(address, {width: 200, margin: 1})
    .then(url => {
     this.qrcodeUrl = url; // 将生成的二维码 URL 赋值给 qrcodeUrl
    })
    .catch(err => {
     console.error(err); // 处理错误
    });
  },

  // 输入的手机号码
  phoneNumberData(phoneData) {
   this.phoneData = phoneData
  },

  // 新的手机号验证码
  phoneNewCodeClick(phoneNewData) {
   this.phoneNewData = phoneNewData
  },
  // INPUT_PNONE
  phoneINPUTCode(phoneINPUTData) {
   this.phoneINPUTData = phoneINPUTData
  },
  // PHONE
  phoneCheckCodeClick(phoneCheckCodeData) {
   this.phoneCheckCodeData = phoneCheckCodeData
  },
  // EMAIL
  emailCheckCodeClick(emailCheckCodeData) {
   this.emailCheckCodeData = emailCheckCodeData
  },
  // imputEmail
  emailINPUTCodeClick(emailCheckCodeNumber) {
   this.emailCheckCodeNumber = emailCheckCodeNumber //新邮箱号

  },
  emailINPUTCodeClickSh(emailCheckCodeInfo) {
   this.emailINPUTdata = emailCheckCodeInfo // 新邮箱验证码
  },

  // new_gmail
  emailNewCodeClick(emailNewData) {
   this.emailNewData = emailNewData
  },
  // google
  googleCheckCodeClick(googledata) {
   this.googleData = googledata
  },

  // googleNew
  googleNewCodeClick(googleNewData) {
   this.googleNewData = googleNewData
  },

  // passWordData  旧密码
  passWordClick(passWordData) {
   this.passWordData = passWordData

  },
  // 新密码
  passwordDataClick(passwordDataNew) {
   this.passwordDataNew = passwordDataNew

  },
  // 新密码确认
  passwordNewDataClick(passwordDataNewInfo) {
   this.passwordDataNewInfo = passwordDataNewInfo
  },

  // 资金旧密码
  passWordClickFunds(passWordFundsOld) {
   this.passWordFundsOld = passWordFundsOld
  },

  // passwordDataClickFunds"    @passwordNewDataClickFunds
  // 资金密码
  passwordDataClickFunds(passwordDataFunds) {
   this.passwordDataFunds = passwordDataFunds
  },
  // 资金密码 确认
  passwordNewDataClickFunds(passwordNewDataFundsInfo) {
   this.passwordNewDataFundsInfo = passwordNewDataFundsInfo
  },


  // tipsStatusInfo
  tipsStatusInfo(tipsStatus) {
   this.tipsStatus = tipsStatus

  },


  toggleDropdown() {
   this.isDropdownVisible = !this.isDropdownVisible;
   this.isRotated = !this.isRotated; // 切换旋转状态
  },


  selectOption(option) {
   this.selectedOption = option;
   this.isDropdownVisible = false; // 选择后隐藏下拉框
   this.isRotated = false; // 切换旋转状态
   this.selectedValue = option

  },


  eventFocusS(e) {
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlag = true
  },


  check(checkUrl) {
   // 检查接口
   Promise.try(() => {
    return checkUrl()
   }).then(res => {
    // let bizId  = ''
    let authOptions = []
    if (res.data.authOptionInfo) {

     this.googleTotpKey = res.data.googleTotpKey
     this.googleTotpKeyQrCodeText = res.data.googleTotpKeyQrCodeText
     this.generateQRCode(res.data.googleTotpKeyQrCodeText)

     this.authBizEnum = res.data.authOptionInfo.authBizEnum
     this.bizId = res.data.authOptionInfo.bizId
     authOptions = res.data.authOptionInfo.authOptions
    } else {
     this.authBizEnum = res.data.authBizEnum
     this.bizId = res.data.bizId
     authOptions = res.data.authOptions
    }

    // 定义排序顺序
    const sortOrder = [
     'PASSWORD',
     'FUNDS_PASSWORD',
     'INPUT_PHONE',
     'PHONE',
     'NEW_PHONE',
     'EMAIL',
     'INPUT_EMAIL',
     'NEW_EMAIL',
     'GOOGLE_AUTHENTICATOR',
     'NEW_GOOGLE_AUTHENTICATOR',
    ];
    // 创建一个映射以获取每个 method 的排序索引
    const orderMap = sortOrder.reduce((acc, method, index) => {
     acc[method] = index;
     return acc;
    }, {});

    // 排序 authOptions 数组
    if (authOptions) {

     authOptions.sort((a, b) => {
      const aIndex = orderMap[a.method] !== undefined ? orderMap[a.method] : Infinity; // 如果未定义则为 Infinity
      const bIndex = orderMap[b.method] !== undefined ? orderMap[b.method] : Infinity; // 如果未定义则为 Infinity
      return aIndex - bIndex; // 进行排序
     });
    }

    // this.bizId = bizId
    this.authOptions = authOptions

    this.isDialogVisible = true
   })

  },


  // 绑定提交
  submit() {
    console.log("submit3---------------->",234567890);
    
   for (const item of this.authOptions) {
    if (item.method === 'EMAIL') {
     if (!this.emailCheckCodeData) {
      this.$customMessage(1, '请输入邮箱验证码');
      return; // 退出 registerBtn 方法
     }
    }

    if (item.method === 'INPUT_EMAIL') {

     if (!this.emailCheckCodeNumber) {
      this.$customMessage(1, '请输入邮箱号');
      return; // 退出 registerBtn 方法
     }
     if (!this.emailINPUTdata) {
      this.$customMessage(1, '请输入邮箱验证码');
      return; // 退出 registerBtn 方法
     }
    }

    if (item.method === 'NEW_EMAIL') {
     if (!this.emailNewData) {
      this.$customMessage(1, '请输入邮箱验证码');
      return; // 退出 registerBtn 方法
     }
    }

    if (item.method === 'PHONE') {
     console.log(this.phoneCheckCodeData, !this.phoneCheckCodeData, "this.phoneCheckCodeData");

     if (!this.phoneCheckCodeData) {
      this.$customMessage(1, '请输入手机验证码');
      return; // 退出 registerBtn 方法
     }
    }
    if (item.method === 'NEW_PHONE') {
     if (!this.phoneNewData) {
      this.$customMessage(1, '请输入手机验证码');
      return; // 退出 registerBtn 方法
     }
    }
    if (item.method === 'GOOGLE_AUTHENTICATOR') {
     if (!this.googleData) {
      this.$customMessage(1, '请输入谷歌验证码');
      return; // 退出 registerBtn 方法
     }
    }
    if (item.method === 'NEW_GOOGLE_AUTHENTICATOR') {
     if (!this.googleNewData) {
      this.$customMessage(1, '请输入谷歌验证码');
      return; // 退出 registerBtn 方法
     }
    }
    if (item.method === 'PASSWORD') {
     if (!this.passWordData) {
      this.$customMessage(1, '请输入密码');
      return; // 退出 registerBtn 方法
     }
    }
    if (item.method === 'FUNDS_PASSWORD') {
     if (!this.passWordFundsOld) {
      this.$customMessage(1, '请输入密码');
      return; // 退出 registerBtn 方法
     }
    }
    if (item.method === 'INPUT_PHONE') {
     if (!this.phoneData) {
      this.$customMessage(1, '请输入手机验证码');
      return; // 退出 registerBtn 方法
     }
    }
   }
   this.bindPhoneCheck()
  },

  bindPhoneCheck() {
   const params = {
    bizId: this.bizId,
    authBizEnum: this.authBizEnum,
    verifyInfos: [
     {
      authMethod: 'PHONE',
      verifyCode: this.phoneCheckCodeData,  // phoneCheckCodeData
     },
     {
      authMethod: 'NEW_PHONE',
      verifyCode: this.phoneNewData,
     },
     {
      authMethod: 'INPUT_PHONE',
      verifyCode: this.phoneINPUTData,
     },

     {
      authMethod: 'EMAIL',
      verifyCode: this.emailCheckCodeData,
     },
     {
      authMethod: 'NEW_EMAIL',
      verifyCode: this.emailNewData,
     },
     {
      authMethod: 'INPUT_EMAIL',
      verifyCode: this.emailINPUTdata,
     },

     {
      authMethod: 'GOOGLE_AUTHENTICATOR',
      verifyCode: this.googleData,
     },
     {
      authMethod: 'NEW_GOOGLE_AUTHENTICATOR',
      verifyCode: this.googleNewData,
     },
     {
      authMethod: 'PASSWORD',
      verifyCode: SHA256(this.passWordData).toString(),
     },
     {
      authMethod: 'FUNDS_PASSWORD',
      verifyCode: SHA256(this.passWordFundsOld).toString(),
     },
    ],

   }

   Promise.try(() => {
    return onVerifyRegister(params)
   }).then(() => {
    this.bindPhoneCodeSubmit(this.bizId)
   })
  },

  bindPhoneCodeSubmit(bizId) {
   // MODIFY_PASSWORD
   let params = {}
   if (this.authBizEnum === 'MODIFY_PASSWORD') {
    if (this.passwordDataNew !== this.passwordDataNewInfo) {
     this.$customMessage(1, '两次新密码不一致')
     return
    }
    params = {
     bizId,
     newPassword: SHA256(this.passwordDataNew).toString(),
    }

   } else if (this.authBizEnum === 'SET_FUNDS_PASSWORD') {

    if (this.passwordDataFunds !== this.passwordNewDataFundsInfo) {
     this.$customMessage(1, '两次新密码不一致')
     return
    }
    params = {
     bizId,
     fundPassword: SHA256(this.passwordDataFunds).toString(),
    }
   } else if (this.authBizEnum === 'MODIFY_FUNDS_PASSWORD') {
    if (this.passwordDataFunds !== this.passwordNewDataFundsInfo) {
     this.$customMessage(1, '两次新密码不一致')
     return
    }
    params = {
     bizId,
     fundPassword: SHA256(this.passwordDataFunds).toString(),
    }

   } else {
    params = {
     bizId
    }
   }

   Promise.try(() => {
    return this.summitUrl(params)
   }).then(res => {
    console.log("isDialogVisible=============>",res);
    if (res.code  === 200) {
      this.isDialogVisible = false
      this.fetchUserInfo();
     this.$customMessage(0, res.data.msg)

    
    }
   
   })

   this.titleInfoState = false
   this.emailInfoState = false
  },


  eventFocus() {
   this.eventFlag = true
   this.eventFlags = true
  },

  openDialog(active) {
   this.titleInfo = active.title
   if (active.title === '更改手机号') {
    this.titleInfoState = true
   }
   if (active.title === '更改邮箱') {
    this.emailInfoState = true
   }

   console.log(active)
   this.summitUrl = active.summitUrl
   this.check(active.checkUrl)
   this.phoneCheckCodeData = ''
   this.phoneNewData = ''
   this.phoneINPUTData = ''
   this.emailCheckCodeData = ''
   this.emailNewData = ''

   this.emailINPUTdata = ''
   this.googleData = ''
   this.googleNewData = ''
   this.passWordData = ''
   this.passWordFundsOld = ''

  },
  closeDialog() {
   this.isDialogVisible = false
  },
 }
}
</script>

<style scoped>
.ff {
 font-weight: 500;
}

.cancel {
 color: #737373;
 background-color: #252525;
}

.cancel:hover {
 color: #F0F0F0;
 background-color: #363636;
}

.submit {
 background-color: #90FF00;
 color: #252525;
}

.submit:hover {
 color: #737373;
}

.dialog-overlay {
 border-radius: 10px;
 position: fixed;
 top: -70px;
 left: 0;
 width: 100%;
 height: 100%;
 background-color: rgba(0, 0, 0, 0.5);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 888;
}

.dialog-content {
 background-color: #1B1B1B;
 border-radius: 10px;
 position: relative;
 max-width: 90%;
 max-height: 90%;
 overflow: auto;
}

.closetext {
 margin-left: 400px;
}

.close-button {
 position: absolute;
 /* top: 10px; */
 right: 23px;
 background: transparent;
 border: none;
 cursor: pointer;
 padding: 0;
 width: 20px;
 height: 20px;
 display: flex;
 justify-content: center;
 align-items: center;
}

.close-button svg {
 fill: #333333;
 transition: fill 0.3s ease;
}

.close-button:hover svg {
 fill: #ffffff;
}

h2 {
 color: #333;
 margin-bottom: 15px;
}

p {
 margin-bottom: 20px;
}

.selected-icon img {
 height: 30px;
 width: 30px;
}
</style>