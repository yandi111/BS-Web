<!-- 绑定邮箱 -->
<template>
 <div class="user-form">
  <div class="title-context">
   <i class="el-icon-arrow-left" @click="handleSuccess"></i>
   <span class="title" @click="handleSuccess">{{ $t('userInfo.绑定邮箱') }}</span>
  </div>
  <div class="form-container">
   <el-form :model="formData" :rules="rules" ref="ruleForm">
    <el-form-item prop="contact" :label="$t('userInfo.请输入邮箱')">
     <el-input
      class="form-input"
      v-model="formData.contact"
      :placeholder="$t('userInfo.请输入邮箱')"
     ></el-input>
    </el-form-item>
    <el-form-item prop="captcha" :label="$t('userInfo.请输入邮箱验证码')">
     <el-input
      v-model="formData.captcha"
      class="form-input"
      autocomplete="off"
      :placeholder="$t('userInfo.请输入邮箱验证码')"
      maxlength="6"
     >
      <span class="code" slot="suffix" @click.stop="getEmailCode" v-if="!sendMsgDisabled">{{ $t('userInfo.获取验证码') }}</span>
      <span class="code resend" slot="suffix" v-else>
       {{$t('userInfo.重新发送') + codeTime + "s"}}</span>
     </el-input>
    </el-form-item>
    <el-form-item
     v-if="checkResult && checkResult.authPhone"
     prop="phoneCode"
     :label="$t('userInfo.请输入手机验证码')"
    >
     <el-input
      v-model="formData.phoneCode"
      class="form-input"
      autocomplete="off"
      :placeholder="$t('userInfo.请输入手机验证码')"
      maxlength="6"
     >
            <span
             class="code"
             slot="suffix"
             @click.stop="getPhoneCode"
             v-if="!phoneSendMsgDisabled"
            >{{ $t('userInfo.获取验证码') }}</span
            >
      <span
       class="code resend"
       slot="suffix"
       v-else
      >{{ $t('userInfo.重新发送') + phoneCodeTime + "s" }}</span
      >
     </el-input>
    </el-form-item>
    <el-form-item
     v-if="checkResult && checkResult.authGoogleAuth"
     prop="authCode"
     :label="$t('userInfo.请输入谷歌验证码')"
    >
     <el-input
      class="form-input"
      v-model="formData.authCode"
      :placeholder="$t('userInfo.请输入谷歌验证码')"
     ></el-input>
    </el-form-item>
    <el-form-item>
     <el-button class="btn" type="primary" @click="submit">{{ $t('userInfo.提交') }}</el-button>
    </el-form-item>
   </el-form>
  </div>
  <!-- <verify-form
    :is-show.sync="showVeriy"
    @next="handleVerifyForm"
    :is-need-api="false"
    :is-need-secret="false"
    :is-need-phone="checkResult && checkResult.authPhone"
    :is-need-google="checkResult && checkResult.authGoogleAuth"
    :is-need-email="checkResult && checkResult.authEmail"
  ></verify-form> -->
  <success-modal
   :is-show.sync="showSuccess"
   :text="$t('userInfo.绑定邮箱成功')"
   @next="handleSuccess"
  ></success-modal>
 </div>
</template>

<script>
const TIME_COUNT = 59;
// import { sendNoauthCaptcha } from "@/api/login.js";
import VerifyForm from "@/components/verifyForm.vue";
import SuccessModal from "@/components/successModal.vue";
import {authItem, captchaSend, commonSendCaptcha} from "@/api/common";
import {bindEmail} from "@/api/user";

export default {
 name: "BindEmail",
 components: {
  VerifyForm,
  SuccessModal,
 },
 data() {
  // 邮箱验证
  const validEmail = (rule, value, callback) => {
   const reg =
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
   if (!value) {
    callback(new Error(this.$t('userInfo.请输入邮箱')));
   } else {
    if (reg.test(value)) {
     callback();
    } else {
     callback(new Error(this.$t('userInfo.请输入正确的邮箱')));
    }
   }
  };
  return {
   authToken: "", //邮箱绑定认证token
   checkResult: null,
   showSuccess: false,
   // showVeriy: false,
   isLoading: false,
   timer: null, // 计时器
   codeTime: null, // 发送验证码倒计时
   phoneTimer: null, // 手机计时器
   phoneCodeTime: null, //手机验证码计时器
   sendMsgDisabled: false, // 是否显示发送验证码按钮
   phoneSendMsgDisabled: false, // 是否显示发送手机验证码按钮
   formData: {
    contact: "", //邮箱
    captcha: "", //邮箱验证码
    authToken: "", //认证token
    authCode: "", //谷歌验证码
    phoneCode: "", //手机验证码
   },
   rules: {
    contact: [{required: true, validator: validEmail, trigger: "change"}],
    captcha: [
     {required: true, message: this.$t('userInfo.邮箱验证码不能为空'), trigger: "change"},
    ],
    phoneCode: [
     {required: true, message: this.$t('userInfo.手机验证码不能为空'), trigger: "change"},
    ],
   },
  };
 },
 mounted() {
  // 获取认证token
  this.authItem();
 },
 methods: {
  // 获取认证token
  authItem() {
   authItem({data: 5}).then((res) => {
    // 认证检查项参数
    this.checkResult = res.data;
    // 发送短信验证码参数
    this.authToken = res.data?.authToken;
   });
  },
  // 获取邮箱验证码
  getEmailCode() {
   let params = {
    contact: this.formData.contact,
    authToken: this.authToken,
    bizType: 5,
   };
   if (!this.timer) {
    this.sendMsgDisabled = true;
    this.codeTime = TIME_COUNT;
    this.timer = setInterval(() => {
     if (this.codeTime > 1 && this.codeTime <= TIME_COUNT) {
      this.codeTime--;
     } else {
      this.sendMsgDisabled = false;
      clearInterval(this.timer);
      this.timer = null;
     }
    }, 1000);
   }
   captchaSend(params)
    .then(() => {
     // 成功
    })
    .finally(() => {
     this.isLoading = false;
    });
  },
  //获取手机验证码
  getPhoneCode() {
   //手机号已绑定 获取手机验证码
   const params = {
    captchaType: 1, //1-手机号；2-邮箱；
    authToken: this.authToken,
    bizType: 5,
   };
   if (!this.phoneTimer) {
    this.phoneSendMsgDisabled = true;
    this.phoneCodeTime = TIME_COUNT;
    this.phoneTimer = setInterval(() => {
     if (this.phoneCodeTime > 1 && this.phoneCodeTime <= TIME_COUNT) {
      this.phoneCodeTime--;
     } else {
      this.phoneSendMsgDisabled = false;
      clearInterval(this.phoneTimer);
      this.phoneTimer = null;
     }
    }, 1000);
   }
   commonSendCaptcha(params)
    .then((res) => {
     if (res && res.status === 200) {
      // 成功
      if (res.data && res.data.success) {
      }
     }
    })
    .finally(() => {
     this.isLoading = false;
    });
  },
  // 提交
  submit() {
   this.$refs.ruleForm.validate((valid) => {
    if (valid) {
     // this.showVeriy = true;
     //绑定手机 退回安全设置页面（刷新页面）
     let params = {
      contact: this.formData.contact,
      captcha: this.formData.captcha,
      authToken: this.authToken,
      authCode: this.formData.authCode,
      phoneCode: this.formData.phoneCode,
     };
     bindEmail(params).then((res) => {
      if (res && res.status === 200) {
       if (res.data && res.data.success) {
        this.showSuccess = true;
        this.$store.dispatch("getUserInfo");
       }
      }
     });
    }
   });
  },
  // 验证表单
  // handleVerifyForm(data) {
  //   let params = {};
  //   bindEmail({});
  //   this.showSuccess = true;
  // },
  // 成功返回页面
  handleSuccess() {
   this.$emit("success");
   this.$emit("updateStatus");
  },
 },
};
</script>
<style lang="scss" scoped>
.user-form {
 // padding: 60px;
 width: 100%;
 background-color: #ffffff;

 .title-context {
  width: 100%;

  .el-icon-arrow-left {
   font-size: 24px;
   padding-right: 20px;
   cursor: pointer;
  }

  .title {
   font-size: 30px;
   font-family: PingFangSC-Medium, PingFang SC;
   font-weight: 500;
   color: #333333;
   margin-bottom: 60px;
   cursor: pointer;
  }
 }

 .prefix-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85px;
  height: 50px;
  line-height: 50px;
  position: relative;
  padding: 0 10px;
  cursor: pointer;

  &::before {
   position: absolute;
   content: "";
   width: 1px;
   height: 40%;
   top: 30%;
   right: 0;
   background-color: #333333;
   z-index: 999;
   opacity: 0.4;
  }

  .text {
   font-size: 14px;
   font-family: PingFangSC-Regular, PingFang SC;
   font-weight: 400;
   color: #333333;
  }

  .custom-icon {
   font-size: 12px;
   color: #272636;
  }
 }

 .form-container {
  width: 500px;
  padding: 40px 0 0 40px;
 }

 ::v-deep .el-input-group__prepend {
  background-color: #fff !important;
 }

 ::v-deep .el-form-item__error {
  font-size: 14px;
 }

 ::v-deep .el-form-item {
  margin-bottom: 40px;

  &:last-child {
   margin-bottom: 18px;
  }
 }

 ::v-deep .el-input--prefix .el-input__inner {
  padding-left: 20px;
 }

 ::v-deep .input-with-select {
  > .el-input__inner {
   padding-left: 120px;
  }
 }

 ::v-deep .form-input {
  > .el-input__inner {
   height: 50px;
   // border: none;
   background-color: #f4f5f7;
  }
 }

 .code {
  display: inline-block;
  width: 100px;
  height: 35px;
  margin: 8px;
  cursor: pointer;
  line-height: 35px;
  background-color: $colorB;
  border-radius: 5px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
 }

 /** 发送验证吗样式 */
 .resend {
  cursor: not-allowed;
  background-color: #8992a6;
 }

 ::v-deep .el-form-item__label {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
 }

 .btn {
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
 }
}

::v-deep .el-popover {
 margin-top: 10px;
 border-radius: 12px;
 border: 1px solid #e1e1e1;
 padding: 12px 0;
}

.popper-content {
 .input-content {
  padding: 20px;
 }

 ul {
  li {
   height: 40px;
   line-height: 40px;
   padding-left: 20px;
   cursor: pointer;
  }
 }
}
</style>
