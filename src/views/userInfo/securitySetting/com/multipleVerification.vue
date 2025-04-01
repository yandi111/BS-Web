<!-- 安全设置 -->
<template>
 <div style="">
  <!--多重验证 -->
  <div style="margin-top: 65px">
   <div class="ff0" style=" font-weight: 600; font-size: 24px;margin-bottom: 31px;">{{$t('多重验证')}}</div>

   <div class="flex ic"
        style="height: 48px; width: 100%; background: #2A1817; padding-left: 15px; border-radius: 4px;margin-bottom: 20px;">
    <div style="width: 14px; height: 14px; margin-right: 8px;"><img src="@/assets/userInfo/icon_notice.png"
                                                                    style="width: 100%; height: 100%;" alt=""></div>
    <div style="font-size:14px ; color: #ED3C2F;">{{$t('安全等级：低，建议您开启手机验证/谷歌身份验证器，多重验证更安全')}}</div>
   </div>
   <!-- <div class="flex ic" style="height: 48px; width: 100%; background: #2B1E12;; padding-left: 15px; border-radius: 4px;margin-bottom: 20px;">
   <div style="width: 14px; height: 14px; margin-right: 8px;"> <img src="@/assets/userInfo/icon_noticeC.png" style="width: 100%; height: 100%;" alt=""> </div>
   <div style="font-size:14px ; color: #FF7400;">安全等级：中，建议您开启手机验证/谷歌身份验证器，多重验证更安全</div>
</div>
<div class="flex ic" style="height: 48px; width: 100%; background: #13251B;; padding-left: 15px; border-radius: 4px;margin-bottom: 20px;">
   <div style="width: 14px; height: 14px; margin-right: 8px;"> <img src="@/assets/userInfo/icon_noticeH.png" style="width: 100%; height: 100%;" alt=""> </div>
   <div style="font-size:14px ; color: #0CBB57;;">安全等级：高，建议您开启手机验证/谷歌身份验证器，多重验证更安全</div>
</div> -->

   <!--  手机验证 -->
   <div class="flex ic" style="border-bottom: 1px solid #252525; padding-bottom: 21px;">

    <div class=" flex ic" style="width: 52%;">
     <div style="width: 32px; height: 32px;margin-right: 20px;"><img class="img100"
                                                                     src="@/assets/userInfo/icon_phone authentication.png"
                                                                     alt=""></div>
     <div>
      <div class="ff0" style="font-size: 16px;">{{$t('lang_438')}}</div>
      <div class="ff73" style="font-size: 14px;margin-top: 9px;">{{$t('用于提现、修改密码、安全设置时收取验证短信')}}</div>
     </div>
    </div>
    <div class="flex jb ic" style="width: 48%;">
     <div class=" flex ic">
      <div style="width: 18px; height: 18px;margin-right: 8px;">
       <img v-if="getUserList.mobilePhone" class="img100"
            src="@/assets/images/icon/icon-success.png" alt="">
       <img v-else class="img100" src="@/assets/images/icon/icon-circle-close.png" alt="">
      </div>
      <div class="ff0" style="font-size: 14px;">
       {{getUserList.mobilePhone ? getUserList.mobilePhone : $t('未开启')}}
      </div>
     </div>
     <div class=" flex">
      <div @click="$refs.bindPhoneInfo.openDialog(
                            {
                            title:'绑定手机',
                            checkUrl: onBindMobileCheck,
                            summitUrl: onBindMobileC
                             }
                        )"
           class="ff0 jic"
           v-if="!getUserList.mobilePhone"
           style="cursor: pointer; width: 84px; height: 32px; background-color: #252525; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('lang_2446')}}
      </div>

      <div v-else class="ff0 jic" @click="$refs.bindPhoneInfo.openDialog(
                            {
                            title:'更改手机号',
                            checkUrl: ModifyMobileCheck,
                            summitUrl: ModifyPassword
                             }
                        )"
           style="cursor: pointer; width: 84px; height: 32px; border: 1px solid #737373; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('lang_2510')}}
      </div>
     </div>

    </div>

   </div>
   <!-- 邮箱验证  -->
   <div class="flex ic " style="border-bottom: 1px solid #252525; padding-bottom: 21px; margin-top: 21px;">
    <div class=" flex ic" style="width: 52%;">
     <div class=" flex ic">
      <div style="width: 32px; height: 32px;margin-right: 20px;"><img class="img100"
                                                                      src="@/assets/userInfo/icon_e-mail authentication.png"
                                                                      alt=""></div>
      <div>
       <div class="ff0" style="font-size: 16px;">{{$t('lang_2755')}}</div>
       <div class="ff73" style="font-size: 14px;margin-top: 9px;">{{$t('绑定一个常用邮箱，用于登录、找回密码、提币时的确认')}}</div>
      </div>
     </div>
    </div>
    <div class=" flex ic jb" style="width: 48%;">
     <div class=" flex">
      <div style="width: 18px; height: 18px;margin-right: 8px;">
       <img v-if="getUserList.email" class="img100"
            src="@/assets/images/icon/icon-success.png" alt="">
       <img v-else class="img100" src="@/assets/images/icon/icon-circle-close.png" alt="">
      </div>
      <div class="ff0" style="font-size: 14px;">
       {{getUserList.email ? getUserList.email : $t('未开启')}}
      </div>
     </div>
     <div class=" flex">
      <div class="ff0 jic" @click="$refs.bindPhoneInfo.openDialog(
                             {
                            title:'绑定邮箱',
                            checkUrl :BindEmailCheck,
                            summitUrl: onBindEmail
                             }
                        )"
           v-if="!getUserList.email"
           style="cursor: pointer; width: 84px; height: 32px; background-color: #252525; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('lang_2446')}}
      </div>
      <div v-else class="ff0 jic" @click="$refs.bindPhoneInfo.openDialog(
                            {
                            title:'更改邮箱',
                            checkUrl: onModifyEmailCheck,
                            summitUrl: onModifyEmail
                             }
                        )"
           style="cursor: pointer; width: 84px; height: 32px; border: 1px solid #737373; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('lang_2510')}}
      </div>
     </div>

    </div>
   </div>
   <!-- 谷歌身份验证器  -->
   <div class="flex ic jb" style="border-bottom: 1px solid #252525; padding-bottom: 21px;margin-top: 21px;">
    <div class=" flex ic" style="width: 52%;">
     <div class=" flex ic">
      <div style="width: 32px; height: 32px;margin-right: 20px;"><img class="img100"
                                                                      src="@/assets/userInfo/icon_google authenticator.png"
                                                                      alt=""></div>
      <div>
       <div class="ff0" style="font-size: 16px;">{{$t('谷歌身份验证器')}}</div>
       <div class="ff73" style="font-size: 14px;margin-top: 9px;">{{$t('用于登录、提现、修改安全设置时使用，保护您的交易和账户安全')}}
       </div>
      </div>
     </div>
    </div>
    <div class=" flex ic jb" style="width: 48%;">
     <div class=" flex">
      <div style="width: 18px; height: 18px;margin-right: 8px;">
       <img v-if="getUserList.googleAuthenticator" class="img100"
            src="@/assets/images/icon/icon-success.png" alt="">
       <img v-else class="img100" src="@/assets/images/icon/icon-circle-close.png" alt="">
      </div>
      <div class="ff0" style="font-size: 14px;">{{
        getUserList.googleAuthenticator ? $t('已开启')
         : $t('未开启')
       }}
      </div>
     </div>

     <div class=" flex">
      <div class="ff0 jic" @click="$refs.bindPhoneInfo.openDialog(
                             {
                            title:'绑定谷歌验证',
                            checkUrl: onBindGoogleTotp,
                            summitUrl: onBindGoogleKey
                             }
                        )"
           v-if="!getUserList.googleAuthenticator"
           style="width: 84px; height: 32px; background-color: #252525; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('lang_2446')}}
      </div>
      <div v-else class="ff0 jic" @click="$refs.bindPhoneInfo.openDialog(
                             {
                            title:'更改谷歌验证',
                            checkUrl: onModifyGoogleKey,
                            summitUrl: onModifyGoogleBindKey
                             }
                        )"
           style="width: 84px; height: 32px; border: 1px solid #737373; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('lang_2510')}}
      </div>
     </div>
    </div>

   </div>
   <bind-phone ref="bindPhoneInfo"/>
   <set-phone ref="setPhoneInfo"/>
   <bind-email ref="bindEmailInfo"/>
   <set-email ref="setEmailInfo"/>
   <bind-google ref="bindGoogleInfo"/>
   <set-google ref="setGoogleInfo"/>
  </div>

  <!--高级安全 -->
  <div style="margin-top: 65px">
   <div class="ff0" style=" font-weight: 600; font-size: 24px; margin-bottom: 30px;">{{$t('lang_2507')}}</div>

   <!--  登录密码-->
   <div class="flex ic" style="border-bottom: 1px solid #252525; padding-bottom: 21px;">

    <div class=" flex ic" style="width: 52%;">
     <div style="width: 32px; height: 32px;margin-right: 20px;"><img class="img100"
                                                                     src="@/assets/userInfo/icon_password.png" alt="">
     </div>
     <div>
      <div class="ff0" style="font-size: 16px;">{{$t('lang_2485')}}</div>
      <div class="ff73" style="font-size: 14px;margin-top: 9px;">
       {{$t('用于管理您的账户登录密码，安全性高的密码可以使账户更安全')}}
      </div>
     </div>
    </div>
    <div class="flex jb ic" style="width: 48%;">
     <div class=" flex ic">
      <div style="width: 18px; height: 18px;margin-right: 8px;">
       <img class="img100" src="@/assets/images/icon/icon-success.png" alt="">
       <!-- <img class="img100" src="@/assets/images/icon/icon-circle-close.png" alt=""> -->
      </div>
      <div class="ff0" style="font-size: 14px;">{{$t('已开启')}}</div>
     </div>
     <div class=" flex">
      <div class="ff0 jic"
           style="cursor: pointer; width: 84px; height: 32px; border-radius: 4px; font-size: 14px; margin-right:21px ;">
      </div>

      <div class="ff0 jic" @click="$refs.bindPhoneInfo.openDialog(
                             {
                            title:'修改登录密码',
                            checkUrl: ModifyPassCheck,
                            summitUrl: onModifyPassword
                             }
                        )"
           style="cursor: pointer; width: 84px; height: 32px; border: 1px solid #737373; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('lang_2510')}}
      </div>
     </div>
    </div>

   </div>
   <!-- 资金密码  -->
   <div class="flex ic " style="border-bottom: 1px solid #252525; padding-bottom: 21px; margin-top: 21px;">
    <div class=" flex ic" style="width: 52%;">
     <div class=" flex ic">
      <div style="width: 32px; height: 32px;margin-right: 20px;"><img class="img100"
                                                                      src="@/assets/userInfo/icon_funds password.png"
                                                                      alt=""></div>
      <div>
       <div class="ff0" style="font-size: 16px;">{{$t('lang_2787')}}</div>
       <div class="ff73" style="font-size: 14px;margin-top: 9px;">{{$t('提现时需要额外输入资金密码，用于保护资金安全')}}</div>
      </div>
     </div>
    </div>
    <div class=" flex ic jb" style="width: 48%;">
     <div class=" flex">
      <div style="width: 18px; height: 18px;margin-right: 8px;">
       <img v-if="getUserList.fundPassword" class="img100"
            src="@/assets/images/icon/icon-success.png" alt="">
       <img v-else class="img100" src="@/assets/images/icon/icon-circle-close.png" alt="">
      </div>
      <div class="ff0" style="font-size: 14px;">{{ getUserList.fundPassword ? $t('已开启') : $t('未开启') }}
      </div>
     </div>
     <div class=" flex">
      <div class="ff0 jic" @click="$refs.bindPhoneInfo.openDialog(
                              {
                            title:'设置资金密码',
                            checkUrl: SetPassCheck,
                            summitUrl: SetPass
                             }
                        )"
           v-if="!getUserList.fundPassword"
           style="cursor: pointer; width: 84px; height: 32px; background-color: #252525; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('lang_2446')}}
      </div>
      <div class="ff0 jic" @click="$refs.bindPhoneInfo.openDialog(
                             {
                            title:'更改资金密码',
                            checkUrl: ModifyPass,
                            summitUrl: onModifyPass
                             }
                        )" v-else
           style="cursor: pointer; width: 84px; height: 32px; border: 1px solid #737373; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('lang_2510')}}
      </div>
     </div>
    </div>
   </div>
   <!-- 防钓鱼码  -->
   <div class="flex ic jb" style="border-bottom: 1px solid #252525; padding-bottom: 21px;margin-top: 21px;">
    <div class=" flex ic" style="width: 52%;">
     <div class=" flex ic">
      <div style="width: 32px; height: 32px;margin-right: 20px;">
       <img class="img100" src="@/assets/userInfo/icon_anti-phishing code.png" alt=""></div>
      <div>
       <div class="ff0" style="font-size: 16px;">{{$t('lang_2499')}}</div>
       <div class="ff73" style="font-size: 14px;margin-top: 9px;">
        {{$t('我们给您发送的所有邮件都将包含该防钓鱼码，从而识别邮件是否来自BSEX')}}
       </div>
      </div>
     </div>
    </div>
    <div class=" flex ic jb" style="width: 48%;">
     <div class=" flex">
      <div style="width: 18px; height: 18px;margin-right: 8px;">
       <img v-if="getUserList.antiScamCode" class="img100"
            src="@/assets/images/icon/icon-success.png" alt="">
       <img v-else class="img100" src="@/assets/images/icon/icon-circle-close.png" alt="">
      </div>
      <div class="ff0" style="font-size: 14px;">{{ getUserList.antiScamCode ? $t('已开启') : $t('未开启') }}
      </div>
     </div>

     <div class=" flex">
      <div class="ff0 jic" @click="$refs.changeFishingcodeShow.openDialog(1)"
           v-if="!getUserList.antiScamCode"
           style="width: 84px; height: 32px; background-color: #252525; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('绑定')}}
      </div>
      <div class="ff0 jic" @click="$refs.changeFishingcodeShow.openDialog()" v-else
           style="width: 84px; height: 32px; border: 1px solid #737373; border-radius: 4px; font-size: 14px; margin-right:21px ;">
       {{$t('lang_2510')}}
      </div>
     </div>
    </div>

   </div>
  </div>

  <!--登录管理 -->
  <div style="margin-top: 65px">
   <div class="ff0" style=" font-weight: 600; font-size: 24px;margin-bottom: 31px;">{{$t('登录管理')}}</div>

   <!--  登录密码-->
   <div class="flex ic"
        style="border-bottom: 1px solid #252525; padding-bottom: 15px; color: #737373; font-size: 12px;">
    <div class=" flex ic" style="width: 45%;">
     {{$t('lang_2486')}}
    </div>
    <div class="flex jb ic" style="width: 55%;">
     <div>{{$t('来源')}}</div>
     <div>{{$t('lang_2487')}}</div>
    </div>
   </div>
   <div style="height: 500px; overflow-y:auto;">
    <div class="flex ic "
         v-for="(item,index) in  loginInfoList" :key="index"
         style="border-bottom: 1px solid #252525; padding-bottom: 15px; color: #F0F0F0; font-size: 12px;margin-top: 16px;">

     <div class=" flex ic " style="width: 45%;">
      {{ $formatTimesYMDHMS(item.createTime) }}
     </div>
     <div class="flex jb ic" style="width: 55%;">
      <div class="flex ic">{{ item.appType }}</div>
      <div class="flex ic">{{ item.ip }}</div>

     </div>

    </div>
   </div>

  </div>

  <set-password ref="setPasswordShow"/>
  <fund-password ref="fundPasswordShow"/>
  <change-password ref="changePasswordShow"/>
  <change-fishingcode ref="changeFishingcodeShow"/>

 </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import BindPhone from "./bindPhone.vue";
import SetPhone from "./setPhone.vue";
import BindEmail from "./bindEmail.vue";
import SetEmail from "./setEmail.vue";
import BindGoogle from "./bindGoogle.vue";
import SetGoogle from "./setGoogle.vue";
import SetPassword from "./setPassword.vue";
import FundPassword from "./fundPassword.vue";
import ChangePassword from "./changePassword.vue";
import ChangeFishingcode from "./changeFishingcode.vue";
import {onLoginRecord, onLoginToken} from "@/api/login";
import {
 BindEmailCheck,
 ModifyMobileCheck, ModifyPass, ModifyPassCheck, ModifyPassword, onBindEmail,
 onBindGoogleKey,
 onBindGoogleTotp, onBindMobileC, onBindMobileCheck, onModifyEmail, onModifyEmailCheck,
 onModifyGoogleBindKey,
 onModifyGoogleKey, onModifyPass, onModifyPassword, SetPass, SetPassCheck
} from "@/api/user";

export default {
 name: "MultipleVerification",
 components: {
  BindPhone,
  SetPhone,
  BindEmail,
  SetEmail,
  BindGoogle,
  SetGoogle,
  SetPassword,
  FundPassword,
  ChangePassword,
  ChangeFishingcode

 },
 data() {
  return {
   loginInfoList: []
  };
 },
 computed: {
  ...mapGetters(['getUserList']),
 },
 mounted() {
  this.fetchUserInfo();

  Promise.try(() => {
   return onLoginToken()
  }).then(res => {
   this.loginInfoList = res.data
  })
 },
 methods: {
  onModifyPass,
  ModifyPass,
  SetPass,
  SetPassCheck,
  onModifyPassword,
  ModifyPassCheck,
  onModifyEmail,
  onModifyEmailCheck,
  onBindEmail,
  BindEmailCheck,
  onBindMobileC,
  onBindMobileCheck,
  ModifyPassword,
  ModifyMobileCheck,
  onBindGoogleKey,
  onBindGoogleTotp,
  onModifyGoogleBindKey,
  onModifyGoogleKey,
  ...mapActions(['fetchUserInfo']),

  userInfo() {
   Promise.try(() => {
    return onLoginRecord()
   }).then(() => {})
  },


 },
};
</script>
<style lang='scss' scoped>
.ff0 {
 color: #F0F0F0;
}

.ff73 {
 color: #737373;
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
</style>