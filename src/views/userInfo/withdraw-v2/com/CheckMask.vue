<template>
  <div>
    <!-- <button @click="openDialog"></button> -->
    <!-- <PhoneNumber /> -->

    <transition name="fade">
      <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
        <div class="dialog-content" style="border:1px solid #252525; ">
          <div class="flex jb"
            style="padding-top: 17px; padding-bottom: 10px; padding-left: 30px; padding-right: 30px; border-bottom: 1px solid #252525; ">
            <div class="ff" style="font-size: 16px; color: #F0F0F0;  ">安全校验</div>
            <div class="closetext">
              <button @click="isDialogVisible = false" class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              </button>
            </div>

          </div>

     
          <div v-if=" authBizEnum =='BIND_GOOGLE_AUHT'">
                <GoogleBindText :googleTotpKey = googleTotpKey />
           </div>
          <div style="padding-left: 30px; padding-right: 30px;" v-if=" authBizEnum =='SET_FUNDS_PASSWORD'">
             <passWordNewFunds  @passwordDataClickFunds="passwordDataClickFunds"    @passwordNewDataClickFunds="passwordNewDataClickFunds" />
           </div>
           <!-- <GoogleSetText :googleTotpKey = googleTotpKey /> -->
           
         


          <div style="place-self: 30px; padding-right: 30px; padding-left: 30px;">
            <div v-for="(item, index) in authOptions" :key="index">
              

              <div v-if="item.method === 'NEW_PHONE'">
                <PhoneNumber @phoneNumberData="phoneNumberData" :authBizEnum='authBizEnum' :bizId='bizId' />
                <PhoneNewCode @phoneNewCodeClick="phoneNewCodeClick" :authBizEnum='authBizEnum' :bizId='bizId'
                  :method="item.method" />
              </div>

              <div v-if="item.method === 'INPUT_PHONE'">
                <PhoneNumber @phoneNumberData="phoneNumberData" :authBizEnum='authBizEnum' :bizId=bizId :titleInfoState="titleInfoState" />
                <PhoneINPUTCode @phoneINPUTCode='phoneINPUTCode' :phoneData='phoneData' :authBizEnum='authBizEnum'
                :titleInfoState="titleInfoState"
                  :bizId='bizId' :method="item.method" />
              </div>

              <div v-if="item.method === 'PHONE'"> 
                <!-- <PhoneNumber  @phoneNumberData="phoneNumberData" :authBizEnum='authBizEnum' :bizId='bizId' />  -->
                <PhoneCheckCode @phoneCheckCodeClick='phoneCheckCodeClick' :authBizEnum='authBizEnum' :bizId='bizId'
                :titleInfoState="titleInfoState"
                  :method="item.method" />
              </div>

              <div v-if="item.method === 'EMAIL'">
                <EmailCheckCode @emailCheckCodeClick='emailCheckCodeClick' :authBizEnum='authBizEnum' :bizId='bizId'
                  :method="item.method" />
              </div>
              <div v-if="item.method === 'NEW_EMAIL'">
                <EmailNewCode @emailNewCodeClick='emailNewCodeClick' :authBizEnum='authBizEnum' :bizId='bizId'
                  :method="item.method" />
              </div>

              <div v-if="item.method === 'INPUT_EMAIL'">
                <EmailINPUTCode @emailINPUTCodeClick='emailINPUTCodeClick' :authBizEnum='authBizEnum' :bizId='bizId'
                :emailInfoState ='emailInfoState'
                  :method="item.method" />

                </div>

               



              <div v-if="item.method === 'GOOGLE_AUTHENTICATOR'">

                <div v-if=" authBizEnum =='MODIFY_GOOGLE_AUHT'">
                    <GoogleSetText :googleTotpKey = googleTotpKey />
                </div>

               

                <GoogleCheckCode @googleCheckCodeClick='googleCheckCodeClick' :authBizEnum='authBizEnum' :bizId='bizId'
                  :method="item.method" />
              </div>

              <div v-if="item.method === 'NEW_GOOGLE_AUTHENTICATOR'">
                <GoogleNewCode @googleNewCodeClick="googleNewCodeClick" :authBizEnum='authBizEnum' :bizId='bizId'
                  :method="item.method" />
              </div>

              <div v-if="item.method === 'PASSWORD'">
                <PassWord @passWordClick='passWordClick' />
                <passWordNew @passwordDataClick='passwordDataClick' @tipsStatusInfo='tipsStatusInfo'
                  @passwordNewDataClick="passwordNewDataClick" />
              </div>

              <div v-if="item.method =='FUNDS_PASSWORD'">
                 <PassWordFunds @passWordClickFunds ='passWordClickFunds' />
                 
                 <passWordNewFunds v-if="authBizEnum == 'MODIFY_FUNDS_PASSWORD'"  @passwordDataClickFunds="passwordDataClickFunds"    @passwordNewDataClickFunds="passwordNewDataClickFunds" />
              </div>

            </div>
            <!-- passwordDataClickFunds    passwordNewDataClickFunds -->
            <!-- <PassWord @passWordClick = 'passWordClick' />
            <passWordNew  @passwordDataClick ='passwordDataClick' 
            @tipsStatusInfo = 'tipsStatusInfo'
             @passwordNewDataClick="'passwordNewDataClick'" /> -->


            
            <div class="flex" style="margin-top: 44px; margin-bottom: 30px;padding-left: 100px; padding-right: 100px;">
              <div @click.self="isDialogVisible = false" class="cancel flex jc ic"
                style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1;margin-right:14px;height: 34px;border-radius: 4px;">
                取消</div>
              <div @click.self="submit" class="submit flex jc ic"
                style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1; height: 34px; border-radius: 4px;">
                确定</div>
            </div>
          </div>

        </div>
      </div>
     
    </transition>

    <mobile-code ref="mobileCode" />
  </div>
</template>

<script>
// import { account } from '@/views/contractTransaction/components/ws/accountEnsure';
// import UserTips from './userTips.vue';    this.$refs.mobileCode.openDialog(this.getMethod)
import { mapGetters, mapMutations, mapActions } from 'vuex';
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
import {onBsexUserVerify,onWithdrawalApply,onBsexFinanceAssetCoin} from "@/api/user";

import {onWithdrawalCheck} from "@/api/user";

// import axios from 'axios';
export default {
  components: {
    // UserTips
    MobileCode, PassWord, passWordNew,PassWordFunds,passWordNewFunds,GoogleBindText,GoogleSetText,
    PhoneNumber, PhoneINPUTCode, PhoneCheckCode, EmailINPUTCode, EmailCheckCode, PhoneNewCode, GoogleCheckCode, GoogleNewCode, EmailNewCode
  },
  name: 'CheckMask',
  data() {
    return {
      titleInfoState:false,
      titleInfo:'',
      summitUrl:'',
      EMAILshow: false,
      INPUT_EMAILshow: false,
      emailInfoState:false,

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

      googleTotpKey:'',


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
      passWordFundsOld:'', // 旧资金密码
      passwordDataFunds : '' , // 新资金密码
      passwordNewDataFundsInfo:'',// // 新资金密码确认
      phoneCheckCodeData : '',
      phoneCheckCode: '',
      emailData: '',
      googleCheckCode: '',
      seconds: 60, // 倒计时数据
      secondsEmail: 60, // 倒计时数据
      blanceInfo:'',

      eventFlags: false,
      verifyCode: '',
      blurstate: false,
      phoneCheck: false,
      selectedOption: '86', // 默认选项
      coinName:'',
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
      ],
      paramsInfo:{},


    }
  },
  computed: {
    ...mapGetters(['getAccountList', 'getToken', 'getUserList',  'getSppUserSecurity']),

    authBizEnumInfo(){
      // MODIFY_GOOGLE_AUHT
      if (this.authBizEnum == 'BIND_GOOGLE_AUHT' || this.authBizEnum == 'MODIFY_GOOGLE_AUHT') {
        return 0
      }else {
        return 1
      }
    
    },
    userList() {
      return this.getUserList; // 计算属性返回用户信息
    },
    phoneEmail() {
      return this.getMethod == "NEW_PHONE" ? true : false
    },
  },
  // eslint-disable-next-line vue/return-in-computed-property
  mounted() {

  },
  methods: {
    ...mapMutations(['setAuthBizEnum', 'setBizId']),
    ...mapActions(['fetchUserInfo']),

    // 输入的手机号码
    phoneNumberData(phoneData) {
      this.phoneData = phoneData
      console.log(phoneData, "phoneDataphoneData");

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
    emailINPUTCodeClick(emailINPUTdata) {
      this.emailINPUTdata = emailINPUTdata

    },
    // new_gmail
    emailNewCodeClick(emailNewData) {
      this.emailNewData = emailNewData
    },
    // google
    googleCheckCodeClick(googledata) {
      this.googleData = googledata


      console.log(googledata,this.googleData,'this.googleData');
      

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
    passWordClickFunds(passWordFundsOld){
      this.passWordFundsOld = passWordFundsOld
    },

    // passwordDataClickFunds"    @passwordNewDataClickFunds
    // 资金密码 
    passwordDataClickFunds(passwordDataFunds){
      this.passwordDataFunds = passwordDataFunds   
    }, 
    // 资金密码 确认
    passwordNewDataClickFunds(passwordNewDataFundsInfo){
      this.passwordNewDataFundsInfo =passwordNewDataFundsInfo
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
    check(params) {
      this.paramsInfo = params
      this.coinName = params.coinName
  Promise.try(() => {
   return onWithdrawalCheck(params)
  } ).then(res => {
    console.log(res,'resresresresresres===============>');
    
        if (res.code == 200) {
          // let bizId  = ''
          let authOptions = []
            this.googleTotpKey = res.data.data.googleTotpKey
            this.authBizEnum = res.data.data.authBizEnum
            this.bizId = res.data.data.bizId
            authOptions = res.data.data.authOptions
            // const { authBizEnum, bizId ,authOptions } = res.data.data.authOptionInfo
          console.log(res,authOptions,'this.authOptions0000');
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

          console.log(this.authOptions,'this.authOptions');
          
          this.isDialogVisible = true



        } else {
          this.$customMessage(2, res.msg)
        }


      }).catch(e => {
        console.log(e);
      })
 },


    // 绑定提交
    submit() {
      this.bindPhoneCheck()
    },

    bindPhoneCheck() {

      for (const item of this.authOptions) {
        if (item.method == 'EMAIL') {
            if (!this.emailCheckCodeData) {
                this.$customMessage(1, '请输入邮箱验证码');
                return; // 退出 registerBtn 方法
            }
        }
        if (item.method == 'NEW_EMAIL') {
            if (!this.emailNewData) {
                this.$customMessage(1, '请输入邮箱验证码');
                return; // 退出 registerBtn 方法
            }
        }

        if (item.method == 'PHONE') {
            if (!this.phoneCheckCodeData) {
                this.$customMessage(1, '请输入手机验证码');
                return; // 退出 registerBtn 方法
            }
        }
        if (item.method == 'NEW_PHONE') {
            if (!this.phoneNewData) {
                this.$customMessage(1, '请输入手机验证码');
                return; // 退出 registerBtn 方法
            }
        }
        if (item.method == 'GOOGLE_AUTHENTICATOR') {
            if (!this.googleData) {
                this.$customMessage(1, '请输入谷歌验证码');
                return; // 退出 registerBtn 方法
            }
        }
        if (item.method == 'NEW_GOOGLE_AUTHENTICATOR') {
            if (!this.googleNewData) {
                this.$customMessage(1, '请输入谷歌验证码');
                return; // 退出 registerBtn 方法
            }
        }
         if (item.method == 'PASSWORD') {
            if (!this.passWordData) {
                this.$customMessage(1, '请输入密码');
                return; // 退出 registerBtn 方法
            }
        }
         if (item.method == 'FUNDS_PASSWORD') {
            if (!this.passWordFundsOld) {
                this.$customMessage(1, '请输入密码');
                return; // 退出 registerBtn 方法
            }
        }
         if (item.method == 'INPUT_PHONE') {
          if (!this.phoneData) {
                this.$customMessage(1, '请输入手机验证码');
                return; // 退出 registerBtn 方法
            }
        }


    }

     




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
            verifyCode:   SHA256(this.passWordData).toString() ,
          },
          {
            authMethod: 'FUNDS_PASSWORD',
            verifyCode:  SHA256(this.passWordFundsOld).toString() , 
          },
        
        ]

      }


Promise.try(() => {
  return onBsexUserVerify(params)
 }).then(res => {
          if (res.code == 200) {
            console.log(res.data, "this.bizIdthis.bizIdthis.bizId");
          this.paramsInfo.bizId = this.bizId
          console.log(this.paramsInfo,'this.paramsInfo-----');
          
          this.bindPhoneCodeSubmit()

          } else {
            this.$customMessage(2, res.msg);
          }
 }).catch((e)=>{
  console.log(e);
  
 })


      // axios.post('/app/bsex-user/verify', params, {
      //   headers: {
      //     'x-language': 'zh_CN',
      //     'x-device-id': '',   // 设备唯一标识
      //     'x-app-type': 'WEB',
      //     'x-app-version': '',  // app版本号
      //     'x-app-token': this.getToken, // 
      //     'x-device-model': ''  //  设备型号
      //   }
      // }
      // ).then(res => {
      //   console.log(res);
      //   if (res.data.code == 200) {
      //     console.log(res.data, "this.bizIdthis.bizIdthis.bizId");
      //     this.paramsInfo.bizId = this.bizId
      //     console.log(this.paramsInfo,'this.paramsInfo-----');
          
      //     this.bindPhoneCodeSubmit()

      //   } else {
      //     this.$customMessage(2, res.data.msg)
      //   }
      // }).catch(e => {
      //   console.log(e);
      // })

    },


    // import {onWithdrawalApply} from "@/api/user";



    bindPhoneCodeSubmit() {
      console.log(this.paramsInfo,'bindPhoneCodeSubmit-----------------');
      Promise.try(() => {
  return onWithdrawalApply(this.paramsInfo)
 }).then(res => {
  console.log(res,'bindPhoneCodeSubmit-----------------');
  
          if (res.code == 200) {
            this.$customMessage(0,'提币成功')
          this.$emit('takeCoinSuccessFn')
          this.assetCoin()  // 刷新余额度
          this.isDialogVisible = false
            
          } else {
            this.$customMessage(2, res.msg);
          }
 }).catch((e)=>{
  console.log(e);
  
 })
    //   axios.post('/app/bsex-finance/withdrawal/apply', this.paramsInfo, {
    //     headers: {
    //       'x-language': 'zh_CN',
    //       'x-device-id': '',   // 设备唯一标识
    //       'x-app-type': 'WEB',
    //       'x-app-version': '',  // app版本号
    //       'x-app-token': this.getToken, // 
    //       'x-device-model': ''  //  设备型号
    //     }
    //   }
    //   ).then(res => {
    //     console.log(res);
    //     if (res.data.code == 200) {
    //       // this.fetchUserInfo();
    //       this.$customMessage(0,'提币成功')
    //       this.$emit('takeCoinSuccessFn')
    //       this.assetCoin()  // 刷新余额度
    //       this.isDialogVisible = false

    //     } else {
    //       this.$customMessage(2, res.data.msg)

    //     }
    //   }).catch(e => {
    //     console.log(e);

    //   })
    //   this.titleInfoState = false
    //   this.emailInfoState = false

    },

    assetCoin() {
      let params = {
        coinName:this.coinName,
        unitCoin:'USDT'
      }

     

Promise.try(() => {
  return onBsexFinanceAssetCoin(params)
 }).then(res => {
          if (res.code == 200) {
            let blanceInfo = res.data.balance
            this.$emit('blanceInfoFmn',blanceInfo)
            

          } else {
            this.$customMessage(2, res.msg);
          }
 }).catch((e)=>{
  console.log(e);
  
 })




      // axios.post('/app/bsex-finance/asset/coin', params, {
      //   headers: {
      //     'x-language': 'zh_CN',
      //     'x-device-id': '',   // 设备唯一标识
      //     'x-app-type': 'WEB',
      //     'x-app-version': '',  // app版本号
      //     'x-app-token': this.getToken, // 
      //     'x-device-model': ''  //  设备型号
      //   }
      // }
      // ).then(res => {
      //   console.log(res);
      //   if (res.data.code == 200) {
      //      let blanceInfo = res.data.data.balance
      //     this.$emit('blanceInfoFmn',blanceInfo)
      //   } else {
      //     this.$customMessage(2, res.data.msg)

      //   }
      // }).catch(e => {
      //   console.log(e);

      // })
      this.titleInfoState = false
      this.emailInfoState = false
    },






    eventFocus(e) {
      console.log(e)
      // e.target.style.border  = '0.5px solid #90FF00'
      this.eventFlag = true
      this.eventFlags = true
    },
    openDialog() {
      this.titleInfoState = true
     
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

.jc {
  justify-content: center;
}

.ic {
  align-items: center;
}

.jb {
  justify-content: space-between;
}

.input-containerS {
  display: flex;
  align-items: center;
  position: relative;
  /* 使子元素绝对定位相对于这个容器 */

  width: 100%;
  /* 容器宽度 */
}

.rotate {
  transform: rotate(180deg);
  /* 旋转 180 度 */
}

.dropdown {
  height: 296px;
  border: 0.5px solid #252525;
  width: 272px;
  position: absolute;
  top: 58px;
  left: 0px;
  background-color: #1C1C1C;
  border-radius: 4px;
  margin-top: 1px;
  z-index: 10;
  overflow: hidden;
}

.input-icon {
  position: absolute;
  right: 10px;
  display: inline-block;
  /* 确保图标在同一行 */
}

.dropdown-item {

  border-radius: 4px;
  /* // padding: 8px 12px; */
  cursor: pointer;
  overflow: hidden;
  /* // color: #363636; */
  color: #737373;
}

.dropdown-item:hover {
  overflow: hidden;
  border-radius: 4px;
  background-color: #252525;
  color: #90ff00;
}

.parent-component {
  padding: 20px;
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

.custom-input {
  width: 100%;
  /* 输入框宽度 */
  height: 40px;
  /* 输入框高度 */
  caret-color: #90FF00;
  /* 光标颜色 */
  outline: none;
  /* 去除聚焦时的蓝色边框 */
  border: 0.5px solid rgba(0, 0, 0, 0);
  /* 初始边框样式 */
  border-radius: 4px;
  /* 圆角边框 */
  background: #252525;
  /* 背景颜色 */
  text-align: left;
  /* 文本左对齐 */
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

.confirm-button {
  border-top: 1px solid #252525;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  background: rgba(0, 0, 0, 0);

  color: #90FF00;
  ;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-container {
  display: flex;
  border-radius: 4px;
  overflow-y: auto;
  position: relative;
  /* 使子元素绝对定位相对于这个容器 */
  width: 100%;
  /* 容器宽度 */
  background: #252525;
  /* 背景颜色 */
}

/* .confirm-button:hover {
    background-color: #45a049;
  } */

h2 {
  color: #333;
  margin-bottom: 15px;
}

p {
  margin-bottom: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.selected-icon {
  position: absolute;
  right: 0.3px;
  top: 0.3px;
  overflow: hidden;
}

.selected-icon img {
  height: 30px;
  width: 30px;
}

.box {
  padding: 5px 70px;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  border: 1px solid #737373;
  margin-right: 5px;
  overflow: hidden;
  /* 确保图标不会超出边框 */
}

.box:last-child {
  margin-right: 0;
}

.selected {
  border-color: #90FF00;
}

.selected-icon {
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  width: auto;
  /* 保持图片的原始宽高比 */
  object-fit: contain;
  /* 确保图片完全显示 */
}

.textTips {
  font-size: 11px;
  font-weight: 500;
  color: #737373;
}
</style>

<style scoped>
.custom-slider-container {
  position: relative;
  width: 100%;
  padding-bottom: 20px;
  /* 为标签腾出空间 */
}

.custom-slider {
  position: relative;
  width: 100%;
  height: 14px;
  padding: 6px 0;
}

.slider-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 1px;
  background-color: #252525;
}

.slider-fill {
  position: absolute;
  height: 100%;
  background-color: #B3B3B3;
}

.slider-point {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: url('@/assets/images/icon/icon-drag-node2.png') no-repeat center center;
  background-size: cover;
}

.slider-point.active {
  background-image: url('@/assets/images/icon/icon-drag-node.png');
}

.slider-thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  background: url('@/assets/images/icon/icon-Slide.png') no-repeat center center;
  background-size: cover;
  cursor: pointer;
}

.slider-tooltip {
  position: absolute;
  top: -25px;
  transform: translateX(-50%);
  background-color: #B3B3B3;
  color: #252525;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;

}

.slider-labels {
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  margin-top: -16px;
}

.slider-label {
  position: absolute;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 500;
  color: #B3B3B3;
}

.filteredAccountList {
  color: #B3B3B3;

}

.filteredAccountList:hover {
  color: #FFFFFF;
}
</style>