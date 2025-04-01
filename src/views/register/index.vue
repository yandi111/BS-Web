<template>
 <div class="register-container  flex" style="">
  <div class="register-item">
   <div class="register-img" style="">
    <img width="100%" height="100%" src="@/assets//login-img/login-phone.gif" alt=""/>
   </div>
   <!-- v-if="phoneState"  -->
   <div v-if="phoneState" class="register-box" style="width: 480px; ">
    <div>
     <div v-if="errorStatu" class="flex"
          style="background-color:#30201d;  overflow: hidden; padding-left: 13px; padding-top: 15px; padding-bottom: 17px; padding-right: 15px;">
      <div><img src="@/assets/newg/icon_notice.png" alt=""></div>
      <div style="font-size: 12px; margin-left: 6px; "> 密码长度为 8-20 个字符，需至少包含1个大写字母、1个小写字母、1个数字、1
       个符 <br><span
        style="margin-top: 5px;">号</span></div>
     </div>
     <div style=" padding: 48px 40px; border-radius: 10px; ">

      <div
       style="font-size: 30px;font-weight: 600; margin-bottom: 36px; color: #F0F0F0;">
       欢迎注册BSEX
      </div>
      <div class="ff flex " style="font-size: 16px;font-weight: 600;">
       <div style="margin-right: 20px;font-weight: 600;" :style="{ color: curIndex == 1 ? '#F0F0F0' : '#737373' }"
            @click="handleCheck(1)">
        邮箱
       </div>
       <div style="font-weight: 600;" :style="{ color: curIndex == 0 ? '#F0F0F0' : '#737373' }" @click="handleCheck(0)">
        手机
       </div>
      </div>
      <div class="register-content">
       <div v-show="!curComp">
        <div class="register-type">
        </div>

        <register-phone v-if="curIndex == 0" ref="registerPhone" @submit="submitForm"></register-phone>
        <register-email v-if="curIndex == 1" ref="registerEmail" @submit="submitForm"></register-email>
       </div>
       <custom-modal :showModal="showModal">
        <template>
         <div class="code-modal">
          <div class="code-title">{{ $t('loginRegister.未收到短信验证码') }}</div>
          <div class="code-content">
           <div>{{ $t('loginRegister.发送短信成功，若仍未收到验证码，可尝试下操作') }}：</div>
           <div>{{ $t('loginRegister.1,检查绑定的手机号是否欠费') }}</div>
           <div>{{ $t('loginRegister.2,检查是否位于短信垃圾箱中') }}</div>
           <div>{{ $t('loginRegister.3,请确认您的手机号是否正确') }}</div>
           <div>{{ $t('loginRegister.4,可能存在发送延迟,过10分钟后再重试') }}</div>
           <div style="margin-bottom: 30px">
            {{ $t('loginRegister.5,若此电话号已注册过,我们就不会再向您发送验证码') }}
           </div>
           <el-button type="primary" class="login-btn"
                      @click="showModal = false">{{ $t('loginRegister.我已知晓') }}
           </el-button>
          </div>
         </div>
        </template>
       </custom-modal>

       <custom-modal :showModal="showSuccessModal">
        <template>
         <div class="code-modal modal-width">
          <div class="img-container">
           <img src="@/assets/login-img/success.png" alt=""/>
          </div>
          <div class="tip-success">{{ $t('loginRegister.谷歌验证绑定成功') }}</div>
          <el-button type="primary" class="login-btn login-btn1" @click="
                      handleLogin();
                    showSuccessModal = false;
                    ">{{ $t('loginRegister.返回登录') }}
          </el-button>
         </div>
        </template>
       </custom-modal>
      </div>
     </div>

    </div>


   </div>

   <div v-else>
    <mobile-vcode/>
   </div>

  </div>
 </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import RegisterPhone from "./components/registerPhone.vue";
import RegisterEmail from "./components/registerEmail.vue";
import CustomModal from "@/components/customModal/index.vue";
import MobileVcode from "./components/mobileVcode.vue";
import {onSendCode} from "@/api/common";

export default {
 // eslint-disable-next-line vue/multi-word-component-names
 name: "Register",
 components: {
  RegisterPhone,
  RegisterEmail,
  CustomModal,
  MobileVcode
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
   typeList: [
    {
     type: this.$t("login.register.phone"),
    },
    {
     type: this.$t("login.register.email"),
    },
   ],
   formRefList: ["formPhone", "formEmail", "formCode"],
  };
 },
 computed: {
  ...mapGetters(["getCurIndex", "getAuthOptions", "getAuthBizEnum", "getBizId",]),
 },
 mounted() {

  this.curIndex = this.getCurIndex;
 },
 methods: {
  ...mapActions(["handleHomeAccount"]),

  phondeVerifyCode() {
   Promise.try(async () => {
    return onSendCode({
     authBizEnum: this.getAuthBizEnum,
     method: this.getAuthOptions[0].method,
     bizId: this.getBizId
    });
   }).then(() => {
    this.verifyTime = false
    this.timer = setInterval(() => {
     if (this.seconds > 0) {
      this.seconds--; // 每秒减少 1
     } else {

      clearInterval(this.timer); // 倒计时结束，清除定时器
      this.isCounting = false; // 设置为未倒计时
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

  // 提交表单
  submitForm(comp) {
    console.log(comp);
    
  },

  // 前往登录页面
  handleLogin() {
   this.$router.push("/login");
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
 margin-top: 180px;
 width: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
 // height: 100%;
 // padding-left: 127px;
 box-sizing: border-box;

 .register-item {
  display: flex;
  justify-content: center;
  align-items: center;

  .register-img {
   width: 1038px;
   height: 900px;
   margin-right: 18px;

   img {
    width: 100%;
    height: 100%;
   }
  }

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
   // overflow: hidden;
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
