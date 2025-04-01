<template>
 <div>
  <div style=" background: #1B1B1B; border-radius: 10px;">
   <div style="padding: 40px; width: 480px;">
    <div style="font-size: 30px;font-weight: 600;color: #F0F0F0;"> {{
      phoneEmail ?
       '手机验证码' : '邮箱验证码'
     }}
    </div>
    <div class="ff" style="margin-top: 36px; font-size: 14px;font-weight: 500; color: #737373;">
     获取并输入{{ phoneEmail ? '手机' : '邮箱' }} {{ promptNumber }} 收到的验证码，验证码10分钟内有效
    </div>

    <div class="input-container" style=" margin-top: 30px;">
     <!-- :placeholder="请输入4位手机验证码"  -->
     <input v-model="verifyCode" maxlength="4" @focus="eventFocus($event)" @blur="$event.target.style.border = 'none', eventFlag = false" class="custom-input" :placeholder="phoneEmail ? '请输入4位手机验证码' : '请输入4位邮箱验证码'" type="text"/>
     <div class="input-icon " style="cursor: pointer; margin-left: 30px; display: flex;">
      <div v-if="!verifyTime" style="color: #737373;">
       {{ seconds }}(s)
      </div>
      <div v-else @click="phondeVerifyCode" style="font-weight: 400; color: #90FF00; font-size: 14px;">
       获得验证码
      </div>
      <div style="margin-top: 2px; margin-left:6px;width: 14px; height: 14px;"><img style="width: 100%; height: 100%;" src="@/assets/newg/icon_noticeCCC.png" alt=""></div>
     </div>
    </div>
    <div @click="verificationCode" style="margin-top: 10px;font-size: 14px; color: #90FF00;cursor: pointer;">
     {{ phoneEmail ? '未收到短信验证码？' : '未收到邮件？' }}
    </div>

    <!-- <div  style="border-radius: 4px; margin-top: 48px; width: 100%; height: 48px;background-color: #90FF00; color: #252525; display: flex; align-items: center; justify-content: center;">注册</div> -->
    <div style="display: flex; justify-content: center; align-items: center;height: 50px;">
     <div @mousedown="handleMouseDown" @mouseup="handleMouseUp" @click="registerBtn" class="flex jc ic "
          style=" font-weight: 500; border-radius: 4px; font-size: 16px; margin-top: 20px; background-color:#90FF00;"
          :style="{ width: msState ? '98%' : '100%', height: msState ? '44px' : '48px', color: msState ? '#5A9212' : '#252525' }">
      <div style="color: #252525; font-weight: 600; font-size: 16px;">注册</div>
     </div>
    </div>
   </div>
  </div>
  <!-- this.$refs.mobileCode.openDialog() -->
  <mobile-code ref="mobileCode"/>
 </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import MobileCode from "./mobileCode.vue";
import {onRegister, onVerifyRegister} from "@/api/login";
import {onSendCode} from "@/api/common";

export default {
 name: "MobileVcode",
 components: {
  MobileCode
 },
 data() {
  return {
   seconds: 60, // 倒计时数据
   msState: false,
   verifyTime: true,
   errorStatu: false,
   eventFlag: false,
   phoneState: true,
   textflag: 0,
   showSuccessModal: false,
   // 谷歌验证所需参数
   // auditParams: null,
   showModal: false,
   verifyCode: '',
   // 注册所需参数
   params: null,
   curComp: null,
   curIndex: 1,

  };
 },
 computed: {
  ...mapGetters(["getAuthOptions", "getAuthBizEnum", "getBizId", "getMethod", "getTelegramId", "getInviteCode", "getPassword", "getUsername"]),
  // 手机/邮箱
  loginType() {
   return this.params && this.params.email ? "邮箱" : "手机号";
  },
  numberCount() {
   return this.params && this.params.phone && this.params.phone;
  },
  phoneEmail() {
   return this.getMethod === "NEW_PHONE"
  },
  // eslint-disable-next-line vue/return-in-computed-property
  promptNumber() {
   if (this.getAuthOptions && this.getAuthOptions[0].prompt) {
    return this.getAuthOptions[0].prompt ? this.getAuthOptions[0].prompt : ''
   }
  }
 },
 mounted() {
  console.log(this.getAuthOptions, this.getMethod, 'getMethodgetMethodgetMethod111');
 },

 methods: {
  ...mapMutations(['setToken', 'setUid', 'setNickname', 'setAvatar', 'setVipLevel', 'setAccountList']),
  ...mapActions(['fetchUserInfo']),

  verificationCode() {
   console.log(8888);
   this.$refs.mobileCode.openDialog(this.getMethod, this.promptNumber)

  },

  handleMouseDown() {
   console.log("按钮被按下！", this.msState, "handleMouseDown222");
   this.msState = true

  },
  handleMouseUp() {
   this.msState = false
   console.log("按钮被松开！", this.msState, "handleMouseDown222");
  },
  // 注册
  registerBtn() {
   if (!this.verifyCode) return this.$customMessage(1, '请输入验证码')

   const authVerifyRequestVO = {
    authBizEnum: this.getAuthBizEnum,
    bizId: this.getBizId,
    verifyInfos: [
     {
      verifyCode: this.verifyCode,
      authMethod: this.getAuthOptions[0].method,
     }
    ]
   }

   Promise.try(async () => {
    return await onVerifyRegister(authVerifyRequestVO)
   }).then(res => {
    res.data.status === "AUTHENTICATED" && this.registerFn()
   })
  },


  accountShowList(res) {
   let timeSum = Date.now() + res.data.expireTime
   let emailList = JSON.parse(localStorage.getItem('EMAI_LIST')) || []
   let emailItem = {
    account: this.getUsername,
    token: res.data.token,
    expireTime: timeSum
   }
   const exists = emailList.some(item => item.uid === emailItem.account);
   if (!exists) {
    emailList.unshift(emailItem); // 如果没有，则添加到数组开头
   }
   let emailListPush = JSON.stringify(emailList)
   localStorage.setItem('EMAI_LIST', emailListPush)
   this.setAccountList(emailListPush)
  },

  registerFn() {
   const authVerifyRequestVO = {
    registerType: this.getAuthOptions[0].method === 'NEW_PHONE' ? 'PHONE' : 'EMAIL',
    username: this.getUsername,
    password: this.getPassword,
    inviteCode: this.getInviteCode,
    telegramId: this.getTelegramId,
    bizId: this.getBizId,
   }

   Promise.try(async () => {
    return await onRegister(authVerifyRequestVO)
   }).then(res => {
    this.setToken(res.data.token);
    // this.accountShowList(res)

    this.$customMessage(0, "注册成功")
    this.$router.push('/home')
    this.fetchUserInfo(res.data.token)

   })
  },

  phondeVerifyCode() {
   Promise.try(async () => {
    return onSendCode({
     authBizEnum: this.getAuthBizEnum,
     method: this.getAuthOptions[0].method,
     bizId: this.getBizId
    });
   }).then(() => {
    this.$customMessage(0, "发送成功")
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
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlag = true
  },

  handleCheck(index) {
   this.curIndex = index;
  },

  // 谷歌验证绑定成功
  handleSuccess() {
   this.showSuccessModal = true;
  },
  handleBack() {
   this.curComp = null;
  },
 },
};
</script>

<style lang="scss" scoped>
.c90 {
 color: #90FF00;
}

.b90 {
 background: #90FF00;
}

.c25 {
 color: #252525;

}

.b25 {
 background: #252525;
}

.t73 {
 color: #737373;
 // background: #737373;
}


.register-container {
 // width: 100%;
 height: 100%;
 // padding-left: 127px;
 box-sizing: border-box;

 .register-item {
  margin-left: 127px;
  margin-top: 197px;
  display: flex;
  justify-content: space-between;
  align-items: center;


  .modal-width {
   width: 500px;
   // height: 350px;
   top: 25%;
   left: 17%;

   .login-btn1 {
    font-size: 18px;
   }
  }

  .register-box {
   border-radius: 10px;
   background: #1B1B1B;
   // height: 480px;

  }

  .register-box {
   //   overflow: hidden;
   //  height: 27.5rem;
   // margin: 90px 210px 0 0;
   background: #1B1B1B;
   border-radius: 10px;

   .register-title {
    font-size: 40px;
    color: #333;
   }

   .cup {
    cursor: pointer;
   }

   .el-icon-arrow-left {
    font-size: 30px;
    padding-right: 10px;
   }

   .register-content {
    margin-top: 14px;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.04);
    border-radius: 20px;

    .el-icon-arrow-left {
     position: absolute;
     left: 53px;
     top: 40px;
     font-size: 36px;
     cursor: pointer;
    }

    .register-title {
     width: 100%;
     font-size: 42px;
     font-weight: 500;
     color: #040a19;
     text-align: center;
     padding: 30px 0;
    }

    .register-type {
     display: flex;
     justify-content: space-between;
     align-items: center;
     flex: 1 1 auto;
     list-style: none;
     border-radius: 5px;
     overflow: hidden;
     cursor: pointer;

     .login-phone {
      font-size: 16px;
      color: #737373;
     }

     .login-email {
      margin-right: 20px;
      font-size: 16px;
      color: #F0F0F0;

     }

     .type-active {
      color: #F0F0F0;
     }
    }

    .register-form {
     margin-top: 20px;
     padding: 0 30px;
    }

    .register {
     margin: 15px 0px 0px 30px;
     text-align: left;
     font-size: 18px;
     font-weight: 500;
     color: #8992a6;

     > span {
      color: #90ff00;
      cursor: pointer;
     }
    }

    .el-divider {
     margin-top: 39px;
    }

    .el-divider__text {
     font-size: 20px;
     font-weight: 500;
     color: #8992a6;
    }
   }
  }
 }
}

.login-btn {
 font-size: 18px;
 height: 45px;
}

::v-deep .el-input__inner {
 height: 55px;
 font-size: 22px;
}

::v-deep .el-input__inner::placeholder {
 font-size: 22px;
}

::v-deep .gate-form .el-form-item {
 margin-bottom: 30px;
}

.input-container {
 display: flex;
 position: relative;
 /* 使子元素绝对定位相对于这个容器 */

 width: 100%;
 /* 容器宽度 */
}

.custom-input {
 color: #F0F0F0;
 width: 100%;
 /* 输入框宽度 */
 height: 57px;
 /* 输入框高度 */
 padding: 5px 12px;
 /* 上右下左内边距 */
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

.input-icon {
 position: absolute;
 right: 10px;
 top: 20px;

 display: inline-block;
 /* 确保图标在同一行 */
}
</style>
