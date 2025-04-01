<template>
 <div>
  <!-- <button @click="openDialog"></button> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525;">
     <div class="flex jb"
          style="padding-top: 17px; padding-bottom: 10px; padding-left: 17px; padding-right: 17px; border-bottom: 1px solid #252525; ">
      <div class="ff" style="font-size: 16px; color: #F0F0F0;  ">{{$t('更改邮箱')}}</div>
      <div>
       <button @click="isDialogVisible = false" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
         <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
       </button>
      </div>

     </div>

     <div style="place-self: 30px; padding-right: 30px; padding-left: 30px; padding-top: 29px;">

      <!-- 手机验证码  -->

      <div>
       <div class="ff0" style="font-size: 14px; margin-bottom: 9px; ">{{$t('lang_3185')}}</div>
       <div class="input-containerS" style="height: 42px;">
        <!-- :placeholder="请输入4位手机验证码"  -->
        <input maxlength="4" style="height: 42px; padding-left: 12px; color: #F0F0F0;" v-model="phoneCheckCode"
               @focus="eventFocusS($event)"
               @blur="$event.target.style.border = 'none', eventFlag = false" class="custom-input"
               :placeholder="$t('请输入4位手机验证码') " type="text"/>
        <!-- @click="$refs.mobileCode.openDialog()" -->

        <div class="input-icon " style="cursor: pointer;display: flex;">
         <div v-if="PHONECodeshow" style="color: #737373;">
          {{ PHONEcount }}(s)
         </div>
         <div v-else @click="phondeVerifyCode('PHONE')"
              style="font-weight: 400; color: #90FF00; font-size: 12.5px;">
          {{$t('获得验证码')}}
         </div>
         <div style="margin-top: 2px; margin-left:6px; width: 14px; height: 14px;"><img
          style="width: 100%; height: 100%;" src="@/assets/newg/icon_noticeCCC.png" alt="">
         </div>
        </div>
       </div>
       <div @click="$refs.mobileCode.openDialog(getMethod)"
            style="color: #90FF00; font-size: 12px; margin-top: 7px; font-weight: 500;">
        {{$t('未收到短信验证码？')}}
       </div>

      </div>


      <!-- 邮箱验证码  -->
      <div v-if="EMAILshow">
       <div class="ff0" style="font-size: 14px; margin-bottom: 9px; margin-top: 25px;">{{$t('lang_570')}}</div>
       <div class="input-containerS" style="height: 42px;">
        <!-- :placeholder="请输入4位手机验证码"   -->
        <input maxlength="4" style="height: 42px; padding-left: 12px;color: #F0F0F0;" v-model="emailCheclkCode"
               @focus="eventFocusOld($event)"
               @blur="$event.target.style.border = 'none', eventFlagOld = false" class="custom-input"
               :placeholder="$t('请输入旧邮箱号码')" type="text"/>
        <!-- @click="$refs.mobileCode.openDialog()" -->
        <div class="input-icon " style="cursor: pointer;display: flex;">
         <div v-if="EMAILCodeshow" style="color: #737373;">
          {{ EMAILcount }}(s)
         </div>
         <div v-else @click="phondeVerifyCode('EMAIL')"
              style="font-weight: 400; color: #90FF00; font-size: 12.5px;">
          {{$t('获得验证码')}}
         </div>
         <div style="margin-top: 2px; margin-left:6px;width: 14px; height: 14px;"><img
          style="width: 100%; height: 100%;" src="@/assets/newg/icon_noticeCCC.png" alt="">
         </div>
        </div>
       </div>
       <div @click="$refs.mobileCode.openDialog()"
            style="color: #90FF00; font-size: 12px; margin-top: 7px; font-weight: 500;">
        {{$t('未收到邮件？')}}
       </div>
      </div>


      <!-- 新邮箱号  -->
      <div>
       <div class="ff0" style="font-size: 14px; margin-bottom: 9px; margin-top: 25px;">{{$t('新邮箱号')}}</div>
       <div class="input-container"
            :style="{ border: eventFlagsh ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }"
            style="padding-right: 12px;">
        <div class="inputLeft" style="height: 40px; width: 100%;">
         <input v-model="emailCode" @focus="eventFocusSh($event)"
                @blur="eventFlagsh = false" class="custom-input" :placeholder="$t('请输入邮箱号')" type="text"
                style="padding-left: 12px; color: #F0F0F0;border:none;height: 40px;"/>
        </div>

        <div
         style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; color: #737373;">
         <!-- {{ passwordData.length }}/20 -->
        </div>
       </div>


      </div>
      <!-- 新邮箱验证码 -->
      <div v-if="INPUT_EMAILshow" style=" margin-top: 29px;">
       <div class="ff0" style="font-size: 14px; margin-bottom: 9px; margin-top: 25px;">{{$t('邮箱验证码')}}</div>


       <div class="input-containerS" style="height: 42px;">
        <!-- :placeholder="请输入4位手机验证码"  -->
        <input maxlength="4" style="height: 42px; padding-left: 12px;color: #F0F0F0;" v-model="newEmailCheclkCode"
               @focus="eventFocusS($event)"
               @blur="$event.target.style.border = 'none', eventFlag = false" class="custom-input"
               :placeholder="$t('请输入4位邮箱验证码')" type="text"/>
        <!-- @click="$refs.mobileCode.openDialog()" -->
        <div class="input-icon " style="cursor: pointer;display: flex;">
         <div v-if="INPUT_EMAILCodeshow" style="color: #737373;">
          {{ INPUT_EMAILcount }}(s)

         </div>
         <div v-else @click="phondeVerifyCode('INPUT_EMAIL')"
              style="font-weight: 400; color: #90FF00; font-size: 12.5px;">
          {{$t('获得验证码')}}
         </div>
         <div style="margin-top: 2px; margin-left:6px;width: 14px; height: 14px;"><img
          style="width: 100%; height: 100%;" src="@/assets/newg/icon_noticeCCC.png" alt="">
         </div>
        </div>
       </div>


      </div>


      <!-- 谷歌验证 -->
      <div v-if="GOOGLE_AUTHENTICATORshow" style=" margin-top: 29px ;">
       <div class="ff0" style="font-size: 14px; margin-bottom: 9px; margin-top: 25px;">{{$t('lang_1625')}}</div>
       <div class="input-container"
            :style="{ border: eventFlags ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }"
            style="padding-right: 12px;">
        <div class="inputLeft" style="height: 40px; width: 100%;">
         <input maxlength="4" v-model="passwordData" @focus="eventFocus($event)"
                @blur="eventFlags = false" class="custom-input" :placeholder="$t('lang_1639')" type="text"
                style="padding-left: 12px; color: #F0F0F0;border:none;height: 40px;"/>
        </div>

        <div
         style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; color: #737373;">
         <!-- {{ passwordData.length }}/20 -->
        </div>
       </div>


      </div>


      <div class="flex" style="margin-top: 44px; margin-bottom: 30px;padding-left: 100px; padding-right: 100px;">
       <div @click.self="isDialogVisible = false" class="cancel flex jc ic"
            style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1;margin-right:14px;height: 34px;border-radius: 4px;">
        {{$t('lang_1989')}}
       </div>
       <div @click.self="submit" class="submit flex jc ic"
            style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1; height: 34px; border-radius: 4px;">
        {{$t('lang_1658')}}
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
import {mapActions, mapGetters} from 'vuex';
import MobileCode from '@/views/login/components/mobileCode.vue';
import {onModifyEmail, onModifyEmailCheck} from "@/api/user";
import {onSendCode} from "@/api/common";
import {onVerifyRegister} from "@/api/login";

export default {
 components: {
  MobileCode,
 },
 name: 'SetEmail',
 data() {
  return {

   emailCode: '',
   phoneCheckCode: '',
   emailCheclkCode: '',
   newEmailCheclkCode: '',
   PHONECodeshow: false,
   EMAICodeLshow: false,

   EMAILCodeshow: false,
   INPUT_EMAILCodeshow: false,
   PHONCodeEshow: false,
   INPUT_PHONECodeshow: false,


   EMAILcount: 60,
   PHONEcount: 60,
   INPUT_PHONEcount: 60,
   INPUT_EMAILcount: 60,

   EMAILshow: false,
   INPUT_EMAILshow: false,
   PHONEshow: false,
   INPUT_PHONEshow: false,
   GOOGLE_AUTHENTICATORshow: false,
   NEW_GOOGLE_AUTHENTICATORshow: false,
   PASSWORDshow: false,
   FUNDS_PASSWORDshow: false,
   authBizEnum: '',
   bizId: '',
   authOptions: '',
   emailContent: '',


   getMethod: "NEW_PHONE",
   seconds: 60, // 倒计时数据
   eventFlags: false,
   eventFlagOld: false,
   eventFlagsh: false,
   verifyCode: '',
   blurstate: false,
   phoneCheck: false,
   selectedOption: '86', // 默认选项
   isDropdownVisible: false,
   phoneNumberData: null,
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

   passwordData: '',
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

 methods: {
  ...mapActions(['fetchUserInfo']),

  check() {
   Promise.try(() => {
    return onModifyEmailCheck()
   }).then(res => {
    const {authBizEnum, bizId, authOptions} = res.data

    this.authBizEnum = authBizEnum
    this.bizId = bizId
    this.authOptions = authOptions
    authOptions.forEach(item => {
     if (item.method === "EMAIL") {
      this.EMAILshow = true
     }
     if (item.method === "INPUT_EMAIL") {
      this.INPUT_EMAILshow = true
     }
     if (item.method === "PHONE") {
      this.PHONEshow = true
     }
     if (item.method === "INPUT_PHONE") {
      this.INPUT_PHONEshow = true
     }
     if (item.method === "GOOGLE_AUTHENTICATOR") {
      this.GOOGLE_AUTHENTICATORshow = true
     }
     if (item.method === "NEW_GOOGLE_AUTHENTICATOR") {
      this.NEW_GOOGLE_AUTHENTICATORshow = true
     }
     if (item.method === "PASSWORD") {
      this.PASSWORDshow = true
     }
     if (item.method === "FUNDS_PASSWORD") {
      this.FUNDS_PASSWORDshow = true
     }

    })
   })
  },

  eventFocusS(e) {
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlag = true
  },
  eventFocusOld(e) {
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlagOld = true
  },
  eventFocusSh(e) {
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlagsh = true
  },
  phondeVerifyCode(method) {  // 获取验证码
   this.setVerifyCode = method
   this.getCode(this.bizId, method, this.authBizEnum)
  },

  getCode(bizId, method, authBizEnum) {
   Promise.try(() => {
    return onSendCode({
     bizId,
     method,
     authBizEnum,
     to: method === 'INPUT_EMAIL' ? this.emailCode : ''
    })
   }).then(() => {
    if (method === 'INPUT_EMAIL') {
     this.INPUT_EMAILCodeshow = true
     this.timer = setInterval(() => {
      if (this.INPUT_EMAILcount > 0) {
       this.INPUT_EMAILcount--; // 每秒减少 1
      } else {
       clearInterval(this.timer); // 倒计时结束，清除定时器
       // this.isCounting = false; // 设置为未倒计时
       this.INPUT_EMAILcount = 60
       if (method === 'INPUT_EMAIL') this.INPUT_EMAILCodeshow = false
      }
     }, 1000); // 每 1000 毫秒（1 秒）执行一次
    }
    if (method === 'PHONE') {

     this.PHONECodeshow = true
     this.timer = setInterval(() => {
      if (this.PHONEcount > 0) {
       this.PHONEcount--; // 每秒减少 1
      } else {
       clearInterval(this.timer); // 倒计时结束，清除定时器
       this.PHONEcount = 60
       if (method === 'INPUT_PHONE') this.PHONECodeshow = false
      }
     }, 1000); // 每 1000 毫秒（1 秒）执行一次

    }
    if (method === 'EMAIL') {
     this.EMAILCodeshow = true
     this.timer = setInterval(() => {
      if (this.EMAILcount > 0) {
       this.EMAILcount--; // 每秒减少 1
      } else {
       clearInterval(this.timer); // 倒计时结束，清除定时器
       // this.isCounting = false; // 设置为未倒计时
       this.EMAILcount = 60
       if (method === 'EMAIL') this.EMAILCodeshow = false
      }
     }, 1000); // 每 1000 毫秒（1 秒）执行一次
    }
   })
  },

  submit() {
   const params = {
    bizId: this.bizId,
    authBizEnum: this.authBizEnum,
    verifyInfos: [
     {
      authMethod: 'PHONE',
      verifyCode: this.phoneCheckCode,
     },
     {
      authMethod: 'INPUT_EMAIL',
      verifyCode: this.newEmailCheclkCode,
     },

     {
      authMethod: 'EMAIL',
      verifyCode: this.emailCheclkCode,
     },

    ]
   }

   Promise.try(() => {
    return onVerifyRegister(params)
   }).then(() => {
    this.submitSetEmail(this.bizId)
   })

  },


  submitSetEmail() {
    console.log("onModifyEmail------------111",345678);
   Promise.try(() => {
    return onModifyEmail({bizId: this.bizId})
  
    
   }).then(res => {
    console.log("onModifyEmail------------",res);
    if (res.code == 200) {
        this.fetchUserInfo();
        this.isDialogVisible = false
        this.$customMessage(0, res.data.msg)
    }
   })
   this.isDialogVisible = false
  },

  eventFocus(e) {
   this.eventFlag = true
   this.eventFlags = true
  },

  openDialog() {
   this.phoneCheckCode = ''
   this.emailCheclkCode = ''
   this.emailCode = ''
   this.newEmailCheclkCode = ''
   this.passwordData = ''
   this.check()
   this.isDialogVisible = true
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

.ff0 {
 color: #F0F0F0;
}

.cof {
 color: #FFFFFF;
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

.close-button {
 position: absolute;
 /* top: 10px; */
 right: 10px;
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

 color: #90FF00;;
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