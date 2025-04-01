<template>
 <div>
  <!-- <button @click="openDialog"></button> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525;">
     <div class="flex jb"
          style="padding-top: 17px; padding-bottom: 10px; padding-left: 17px; padding-right: 17px; border-bottom: 1px solid #252525; ">
      <div class="ff" style="font-size: 16px; color: #F0F0F0;  ">{{$t('lang_2720')}}</div>
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
      <div class="flex ic"
           style="height: 48px; width: 100%;   border-radius: 4px;margin-bottom: 20px;">
       <div style="width: 14px; height: 14px; margin-right: 8px;"><img
        src="@/assets/userInfo/icon_noticeC.png" style="width: 100%; height: 100%;" alt="">
       </div>
       <div style="font-size:14px ; color: #ED3C2F;">{{$t('修改登录密码后，为了保障您的账户安全，24小时无法提币')}}</div>
      </div>


      <PhoneCheck @phoneCheckCodeClick='phoneCheckCodeClick' :bizId='bizId' :method='PHONEmethod'
                  :authBizEnum='authBizEnum' v-if="PHONEshow"/>

      <!-- 邮箱验证码 EMAILshow  EmailCheck-->
      <div v-if="EMAILshow" style="margin-top: 20px;">
       <EmailCheck @emailCheckCodeClick='emailCheckCodeClick' :bizId='bizId' :method='EMAILmethod'
                   :authBizEnum='authBizEnum'/>
      </div>

      <!--  密码  -->
      <div style="margin-top: 20px;">
       <div style="margin-bottom: 9px; font-size: 14px;color: #F0F0F0;">{{$t('旧密码')}}</div>
       <!--  旧密码  -->
       <div class="input-container" style="margin-bottom: 19px;"
            :style="{ border: eventFlagOld ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }">
        <div class="inputLeft" style="height: 42px; padding-left: 12px;">
         <input v-model="passwordDataOld" maxlength="20"
                @focus="eventFocusOld($event)" @blur="eventFlagOld = false" class="custom-input"
                :placeholder="$t('lang_2587')"
                style="color: #F0F0F0;border:none;height: 42px;"/>
        </div>

        <div
         style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; margin-left: 33px; margin-right: 10px; ">
         <div @click.stop="iconClickOld(1)" v-if="iconOpenOld == 0"
              style="cursor: pointer; margin-top: 5px;">
          <img src="@/assets/newg/icon_open.png" alt="打开">
         </div>
         <div @click.stop="iconClickOld(0)" v-if="iconOpenOld == 1"
              style="cursor: pointer; width: 20px; height: 20px;margin-top: -1px;">
          <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_close.png"
               alt="关闭">
         </div>
        </div>
       </div>
       <!--  新密码  -->
       <div style="margin-bottom: 9px; font-size: 14px;color: #F0F0F0;">{{$t('新密码')}}</div>
       <div class="input-container"
            :style="{ border: eventFlag ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }">
        <div class="inputLeft" style="height: 42px; padding-left: 12px;">
         <input v-model="passwordData" @input="handleInput" @focus="eventFocus($event)"
                @blur="eventFlag = false" class="custom-input" :placeholder="$t('lang_1640')"
                style="color: #F0F0F0;border:none;height: 42px;"/>
        </div>

        <div
         style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; margin-left: 33px; margin-right: 10px; ">
         <div @click.stop="iconClick(1)" v-if="iconOpen == 0"
              style="cursor: pointer; margin-top: 5px;">
          <img src="@/assets/newg/icon_open.png" alt="打开">
         </div>
         <div @click.stop="iconClick(0)" v-if="iconOpen == 1"
              style="cursor: pointer; width: 20px; height: 20px;margin-top: -1px;">
          <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_close.png"
               alt="关闭">
         </div>
        </div>
       </div>
       <!-- this.passwordValidation.length < 5   eventFlag  -->
       <div style="margin-top:14px; line-height: 14px;">
        <div class="flex" style="height: 18px;">
         <!-- <div style="margin-right: 5px;"> <img src="@/assets/newg/icon_reached.png" alt=""> </div> -->
         <div v-if="passwordValidation.includes(0)"
              style="margin-right: 5px;margin-top: 1.2px;opacity: 0.85;"><img
          src="@/assets/newg/icon_reached.png" alt=""></div>
         <div v-else style="margin-right: 5px;margin-top: 1.2px;"><img
          src="@/assets/newg/icon_not.png" alt=""></div>
         <div style="font-size: 12px; color: #737373;">{{$t('长度为 8-20 个字符')}}</div>
        </div>
        <div class="flex" style="height: 18px; margin-top: 3px;">
         <div v-if="passwordValidation.includes(1)"
              style="margin-right: 5px;margin-top: 1.2px;opacity: 0.85;"><img
          src="@/assets/newg/icon_reached.png" alt=""></div>
         <div v-else style="margin-right: 5px;margin-top: 1.2px;"><img
          src="@/assets/newg/icon_not.png" alt=""></div>

         <div style="font-size: 12px; color: #737373;">{{$t('至少包含1 个大写字符')}}</div>
        </div>
        <div class="flex" style="height: 18px;  margin-top: 3px;">
         <div v-if="passwordValidation.includes(2)"
              style="margin-right: 5px;margin-top: 1.2px;opacity: 0.85;"><img
          src="@/assets/newg/icon_reached.png" alt=""></div>
         <div v-else style="margin-right: 5px;margin-top: 1.2px;"><img
          src="@/assets/newg/icon_not.png" alt=""></div>

         <div style="font-size: 12px; color: #737373;">{{$t('至少包含1个小写字符')}}</div>
        </div>
        <div class="flex" style="height: 18px; margin-top: 3px;">
         <div v-if="passwordValidation.includes(3)"
              style="margin-right: 5px;margin-top: 1.2px;opacity: 0.85;"><img
          src="@/assets/newg/icon_reached.png" alt=""></div>
         <div v-else style="margin-right: 5px;margin-top: 1.2px;"><img
          src="@/assets/newg/icon_not.png" alt=""></div>

         <div style="font-size: 12px; color: #737373;">{{$t('至少包含 1个数字')}}</div>
        </div>
        <div class="flex" style="height: 18px; margin-top: 3px;">
         <div v-if="passwordValidation.includes(4)"
              style="margin-right: 5px;margin-top: 1.2px;opacity: 0.85;"><img
          src="@/assets/newg/icon_reached.png" alt=""></div>
         <div v-else style="margin-right: 5px;margin-top: 1.2px;"><img
          src="@/assets/newg/icon_not.png" alt=""></div>

         <div style="font-size: 12px; color: #737373;">{{$t('至少包含1个符号')}}</div>
        </div>

       </div>
      </div>


      <div style="margin-top: 19px;">
       <div style="margin-bottom: 9px; font-size: 14px;color: #F0F0F0;">{{$t('新密码确认')}}</div>
       <div class="input-container" style="margin-bottom: 19px;"
            :style="{ border: eventFlagNew ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }">
        <div class="inputLeft" style="height: 42px; padding-left: 12px;">
         <input v-model="passwordDataNew" maxlength="20"
                @focus="eventFocusNew($event)" @blur="eventFlagNew = false" class="custom-input"
                :placeholder="$t('lang_1640')"
                style="color: #F0F0F0;border:none;height: 42px;"/>
        </div>

        <div
         style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; margin-left: 33px; margin-right: 10px; ">
         <div @click.stop="iconClickNew(1)" v-if="iconOpenNew == 0"
              style="cursor: pointer; margin-top: 5px;">
          <img src="@/assets/newg/icon_open.png" alt="打开">
         </div>
         <div @click.stop="iconClickNew(0)" v-if="iconOpenNew == 1"
              style="cursor: pointer; width: 20px; height: 20px;margin-top: -1px;">
          <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_close.png"
               alt="关闭">
         </div>
        </div>
       </div>
      </div>

      <div v-if="tipsStatus" style="font-size: 12px; color:#737373;">
       <div class="flex">
        <div @click="tipsStatus = !tipsStatus"
             style="margin-right: 3px; width: 12px; height: 12px;"><img
         src="@/assets/userInfo/icon_not.png" style="width: 100%; height: 100%;" alt="">
        </div>
        <div>{{$t('为保障您的账户资金安全，真同意更新密码后24小时内禁止提现操作，我已知晓并')}}</div>
       </div>
       <div>{{$t('同意')}}</div>
      </div>
      <div v-else style="font-size: 12px; color:#90FF00;">
       <div class="flex">
        <div @click="tipsStatus = !tipsStatus"
             style="margin-right: 3px; width: 12px; height: 12px;"><img
         src="@/assets/userInfo/icon-check.png" style="width: 100%; height: 100%;"
         alt="">
        </div>
        <div>{{$t('为保障您的账户资金安全，真同意更新密码后24小时内禁止提现操作，我已知晓并')}}</div>
       </div>
       <div>{{$t('同意')}}</div>

      </div>


      <div class="flex"
           style="margin-top: 44px; margin-bottom: 30px;padding-left: 100px; padding-right: 100px;">
       <div @click.self="isDialogVisible = false" class="cancel flex jc ic"
            style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1;margin-right:14px;height: 34px;border-radius: 4px;">
        {{$t('lang_1989')}}
       </div>
       <div @click.self="submit" class="submit flex jc ic"
            style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1; height: 34px; border-radius: 4px;">
        {{$t('lang_345')}}
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
import {mapGetters, mapActions} from 'vuex';
import MobileCode from '@/views/login/components/mobileCode.vue';
import PhoneCheck from '../popCom/PhoneCheck.vue';
import EmailCheck from '../popCom/EmailCheck.vue';
import SHA256 from 'crypto-js/sha256';
import {ModifyPassCheck} from "@/api/user";
import {onVerifyRegister} from "@/api/login";
import {onSendCode} from "@/api/common";

export default {
 components: {
  // UserTips
  MobileCode,
  EmailCheck, PhoneCheck
 },
 name: 'SetPassword',
 data() {
  return {

   PHONEmethod: 'PHONE',
   EMAILmethod: 'EMAIL',
   EMAILshow: false,
   EmailCheck: false,
   phoneCheckCode: '',
   emailCheckCode: '',
   PHONEshow: false,

   authBizEnum: '',
   bizId: '',
   authOptions: [],
   tipsStatus: true,
   getMethod: "NEW_PHONE",
   iconOpen: 1,
   iconOpenOld: 1,
   seconds: 60, // 倒计时数据
   eventFlags: false,
   eventFlagOld: false,
   eventFlagsh: false,
   eventFlagSub: false,
   eventFlagNew: false,
   verifyCode: '',
   blurstate: false,
   phoneCheck: false,
   selectedOption: '86', // 默认选项
   isDropdownVisible: false,
   phoneNumberData: null,
   iconOpenNew: 1,
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
   passwordDataNew: '',
   passwordDataOld: '',
   passwordDatas: '',
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
  passwordValidation() {
   const validationResults = [];

   // 检查密码长度
   if (this.passwordData.length >= 8 && this.passwordData.length <= 20) {
    validationResults.push(0); // 长度符合条件
   }

   // 检查是否包含大写字母
   if (/[A-Z]/.test(this.passwordData)) {
    validationResults.push(1); // 包含大写字母
   }

   // 检查是否包含小写字母
   if (/[a-z]/.test(this.passwordData)) {
    validationResults.push(2); // 包含小写字母
   }

   // 检查是否包含数字
   if (/\d/.test(this.passwordData)) {
    validationResults.push(3); // 包含数字
   }

   // 检查是否包含特殊符号
   if (/[!@#$%^&*(),.?":{}|<>[\]\\';'`~]/.test(this.passwordData)) {
    validationResults.push(4); // 包含特殊符号
   }

   return validationResults; // 返回校验结果数组
  },
 },

 methods: {

  ...mapActions(['fetchUserInfo']),

  phoneCheckCodeClick(active) {
   this.phoneCheckCode = active
  },
  emailCheckCodeClick(active) {
   this.emailCheckCode = active
  },

  check() {
   Promise.try(() => {
    return ModifyPassCheck()
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

  submit() {
   if (this.tipsStatus) return this.$customMessage(1, "未确认知晓内容不能修改密码")

   const params = {
    bizId: this.bizId,
    authBizEnum: this.authBizEnum,
    verifyInfos: [
     {
      authMethod: 'PHONE',
      verifyCode: this.phoneCheckCode,
     },
     {
      authMethod: 'EMAIL',
      verifyCode: this.emailCheckCode,
     },

     {
      authMethod: 'PASSWORD',
      verifyCode: SHA256(this.passwordDataOld).toString(),
     },

    ]
   }
   Promise.try(() => {
    return onVerifyRegister(params)
   }).then(() => {
    let password = SHA256(this.passwordDataNew).toString();
    this.bindPhoneCodeSubmit(this.bizId, password)
   })
  },


  bindPhoneCodeSubmit(bizId, newPassword) {
   Promise.try(() => {
    return ModifyPassCheck({bizId, newPassword})
   }).then(res => {
    this.fetchUserInfo();
    this.isDialogVisible = false
    this.$customMessage(0, res.data.msg)
   })
  },


  handleInput(event) {
   const inputValue = event.target.value;
   // 限制输入长度为 20
   if (inputValue.length <= 20) {
    this.passwordData = inputValue; // 更新密码数据
   } else {
    this.passwordData = inputValue.slice(0, 20); // 截取前 20 个字符
    return
   }
  },

  iconClick(active) {
   this.iconOpen = active
  },
  iconClickOld(active) {
   this.iconOpenOld = active
  },
  iconClickNew(active) {
   this.iconOpenNew = active
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

  eventFocusSh(e) {
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlagsh = true
  },
  eventFocusOld(e) {
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlagOld = true
  },
  eventFocusNew(e) {
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlagNew = true
  },
  phondeVerifyCode() {
   Promise.try(() => {
    return onSendCode({
     authBizEnum: this.getAuthBizEnum,
     method: this.getAuthOptions[0].method,
     bizId: this.getBizId
    })
   }).then(() => {
    this.verifyTime = false
    this.timer = setInterval(() => {
     if (this.seconds > 0) {
      this.seconds--; // 每秒减少 1
     } else {

      clearInterval(this.timer); // 倒计时结束，清除定时器
      this.isCounting = false; // 设置为未倒计时
      this.seconds = 60
      this.verifyTime = true
     }
    }, 1000); // 每 1000 毫秒（1 秒）执行一次
   })
  },

  eventFocus(e) {
   this.eventFlag = true
   this.eventFlags = true
  },

  openDialog() {
   this.passwordDataOld = ''
    this.passwordData = ''
   this.passwordDataNew = ''

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

.inputLeft {
 width: 100%;
 /* 输入框宽度 */
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