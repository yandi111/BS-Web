<template>
 <div class="login-container">
  <div class="login-item">
   <div class="login-img" style="">
    <img width="100%" height="100%" src="@/assets/login-img/login-phone.gif" alt=""/>
   </div>
   <div v-if="phoneStateInfo" class="login-box">

    <div v-if="phoneState" class="login-content" style="padding: 40px;padding-bottom: 25px; width: 480px;">
     <h6 class="title">欢迎登陆BSEX</h6>
     <div v-show="!curComp" style="margin-top: 40px;">
      <div class="login-type">
       <div
        :style="{color :curIndex === 0 ? '#F0F0F0' :'#737373' }"
        style="font-size:16px;font-weight: 600; margin-right: 20px; "
        @click="handleCheck(0)"
       >
        手机
       </div>
       <div
        :style="{color :curIndex === 1 ? '#F0F0F0' :'#737373' }"
        style="font-size:16px;font-weight: 600; "
        @click="handleCheck(1)"
       >
        邮箱
       </div>
      </div>
      <div class="login-form">
       <form-phone
        v-if="curIndex === 0"
        ref="formPhone"
         @forgetPassWordFn="forgetPassWordFn"

       ></form-phone>
       <form-email
        @forgetPassWordFn="forgetPassWordFn"
        v-if="curIndex === 1"
        ref="formEmail"

       ></form-email>
      </div>
     </div>

     <div class="register" v-if="!curComp">
     </div>
    </div>
    <div v-else>
     <form-vcode/>
    </div>
   </div>

   <div v-else>
    <div v-if="forgotPasswordState">
        <forgotPassword  @forgotPasswordFn="forgotPasswordFn" @onbackLoginFnsh="onbackLoginFnsh"  />
    </div>

    <div v-else >
     <div v-if="formVcodeState">
         <formVcodePw @authVerifyFun="authVerifyFun" />
     </div>
     <div v-else>
         <resetPassword @resetPasswordFn="resetPasswordFn"  @onbackLoginFn="onbackLoginFn" />
     </div>
    </div>

   </div>
  </div>
 </div>
</template>

<script>
import {mapActions} from "vuex";
import FormPhone from "./components/formPhone.vue";
import FormEmail from "./components/formEmail.vue";
import forgotPassword from "./components/forgotPassword.vue";
import FormVcode from "./components/formVcode.vue";
import formVcodePw from "./components/formVcodePw.vue";
import resetPassword from "./components/resetPassword.vue";

export default {
 // eslint-disable-next-line vue/multi-word-component-names
 name: "Login",
 components: {
  FormPhone,
  FormEmail,
  FormVcode,
  forgotPassword,
  formVcodePw,
  resetPassword
 },
 data() {
  return {
    formVcodeState:true,
    forgotPasswordState: true,
    phoneStateInfo: true,
    typeState:'',
   phoneState: true,
 
   // 是否需要验证码
   // needCaptcha: true,
   auditParams: null,
   // 是否是新设备
   newDevice: true,
   authToken: undefined,
   params: null,
   curComp: null,
   isLoading: false,
   showModal: false,
   curIndex: 0,
   typeList: [
    {
     type: this.$t("loginRegister.phone"),
    },
    {
     type: this.$t("loginRegister.email"),
    },
   ],
   formRefList: ["formPhone", "formEmail", "formAccount"],
  };
 },
 computed: {
  // 手机/邮箱
  loginType() {
   return this.params && this.params.email ? "邮箱" : "手机号";
  },
 },
 methods: {
  ...mapActions(["handleToken", 'handleIsChina']),

  authVerifyFun(){
    this.formVcodeState =false

  },
  forgotPasswordFn(){
    this.forgotPasswordState  = false

  },
  forgetPassWordFn() {  // 忘记密码
    this.phoneStateInfo = false
   this.phoneStateInfo = false

  },
  resetPasswordFn(){
    this.phoneStateInfo=true
    this.formVcodeState = true 
    this.forgotPasswordState=true
  
  },
  onbackLoginFn(){
    this.phoneStateInfo=true
    this.formVcodeState = true 
    this.forgotPasswordState=true
  },
  onbackLoginFnsh(){
    this.phoneStateInfo=true
    this.formVcodeState = true 
    this.forgotPasswordState=true
  },

  handleCheck(index) {
   this.curIndex = index;
  },

  handleBack() {
   this.curComp = null;
  },
 },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-container {
 display: flex;
 justify-content: center;
 align-items: center;
 width: 100%;
 height: 100%;
 box-sizing: border-box;

 .login-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .login-img {
   width: 1038px;
   height: 900px;
   margin-right: 17px;

   img {
    width: 100%;
    height: 100%;
   }
  }

  .login-box {

   .el-icon-arrow-left {
    font-size: 30px;
    padding-right: 10px;
   }

   .login-content {
    margin-top: 30px;
    position: relative;
    box-sizing: border-box;
    background: #1B1B1B;

    box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.04);
    border-radius: 20px;


    .login-type {
     display: flex;
     align-items: center;
     flex: 1 1 auto;
     list-style: none;
     border-radius: 5px;
     overflow: hidden;
     cursor: pointer;

     .login-phone {
      width: 100%;
      height: 64px;
      line-height: 64px;
      text-align: center;
      border-radius: 15px 0px 15px 0px;
      font-size: 22px;
      color: #69798d;
     }

     .login-email {
      width: 100%;
      height: 64px;
      line-height: 64px;
      text-align: center;
      border-radius: 0px 0px 15px 15px;
      font-size: 22px;
      color: #69798d;
     }

     .login-account {
      width: 100%;
      height: 64px;
      line-height: 64px;
      text-align: center;
      border-radius: 0px 15px 0px 15px;
      font-size: 22px;
      color: #69798d;
     }

     .type-active {

      color: #F0F0F0;
     }
    }

    .login-form {
     // padding: 60px 30px 0 30px;
     margin-top: 14px;
    }

    .btn-form {
     // padding: 0px 30px;
    }

    .register {
     margin: 20px 0 0 30px;
     font-size: 16px;
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
 font-size: 20px;
}

.ido-btn {
 margin-top: 10px;
 width: 100%;
 height: 35px;
 line-height: 35px;
 color: #fff;
 background-color: #90ff00;
 border-radius: 6px;
 display: flex;
 justify-content: center;
 align-items: center;
 cursor: pointer;
}

.login-google {
 width: 100%;
 height: 61px;
 line-height: 61px;
 border: 1px solid #eaeaea;
 border-radius: 3px;
 text-align: center;
 font-size: 24px;
 font-weight: 500;
 color: #8992a6;
 margin-top: 40px;
}

::v-deep .el-input__inner {
 height: 55px;
 font-size: 22px;
}

::v-deep .el-input__inner::placeholder {
 font-size: 22px;
}

.title {
 @include Font((
  size: 30px,
  color: $colorD,
  weight: bold,
 ))
}
</style>
