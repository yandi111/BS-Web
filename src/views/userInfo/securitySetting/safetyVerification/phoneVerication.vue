<template>
 <div class="phone-verication">
  <div class="p-title">
   <i class="el-icon-arrow-left" @click="back"></i>
   <span class="title-text" @click="back">{{ $t('userInfo.安全验证') }}</span>
  </div>
  <div class="form-container">
   <el-form
    label-position="top"
    :model="formData"
    :rules="rules"
    ref="ruleForm"
   >
    <el-form-item prop="password" :label="$t('userInfo.登录密码')">
     <el-input
      type="password"
      class="form-input"
      v-model="formData.password"
      :placeholder="$t('userInfo.请输入登录密码')"
     ></el-input>
    </el-form-item>
    <el-form-item v-if="veridata &&veridata.authEmail" prop="emailCode" :label="$t('userInfo.邮箱验证码')">
     <el-input
      v-model="formData.emailCode"
      class="form-input"
      autocomplete="off"
      :placeholder="$t('userInfo.请输入邮箱验证码')"
      maxlength="6"
     >
            <span
             class="code"
             slot="suffix"
             @click.stop="getEmailCode"
             v-if="!sendMsgDisabledEm"
            >{{ $t("userInfo.获取验证码") }}</span
            >
      <span class="code resend" slot="suffix" v-else>{{
        $t("userInfo.重新发送") + codeTime + "s"
       }}</span>
     </el-input>
    </el-form-item>
    <el-form-item v-if="veridata &&veridata.authGoogleAuth" prop="authCode" :label="$t('userInfo.谷歌验证码')">
     <el-input
      class="form-input"
      v-model="formData.authCode"
      :placeholder="$t('userInfo.请输入谷歌验证码')"
     ></el-input>
    </el-form-item>
    <el-form-item>
     <el-button class="btn" type="primary" @click="submit">{{
       $t("userInfo.提交")
      }}
     </el-button>
    </el-form-item>
   </el-form>
  </div>
 </div>
</template>

<script>
const TIME_COUNT = 59;
import {commonSendCaptcha} from "@/api/common";
import {resetPhoneCheck} from "@/api/user";

export default {
 name: "phoneVerication",
 props: {
  veridata: {
   type: Object,
   default: () => {
   }
  }
 },
 data() {
  return {
   formData: {
    password: "", //登录密码
    authToken: "", //认证token
    phoneCode: "", //手机验证码
    emailCode: "", //邮箱验证码
    authCode: "", //谷歌验证码
   },
   rules: {
    password: [
     {
      required: true,
      message: this.$t("userInfo.登录密码不能为空"),
      trigger: "change",
     },
    ],
    phoneCode: [
     {
      required: true,
      message: this.$t("userInfo.验证码不能为空"),
      trigger: "change",
     },
    ],
    emailCode: [
     {
      required: true,
      message: this.$t("userInfo.验证码不能为空"),
      trigger: "change",
     },
    ],
    authCode: [
     {
      required: true,
      message: this.$t("userInfo.验证码不能为空"),
      trigger: "change",
     },
    ],
   },
   sendMsgDisabledEm: false,
   codeTime: null,
   timer: null,
  };
 },
 methods: {
  back() {
   this.$emit("back");
  },
  getEmailCode() {
   if (!this.timer) {
    this.sendMsgDisabledEm = true;
    this.codeTime = TIME_COUNT;
    this.timer = setInterval(() => {
     if (this.codeTime > 1 && this.codeTime <= TIME_COUNT) {
      this.codeTime--;
     } else {
      this.sendMsgDisabledEm = false;
      clearInterval(this.timer);
      this.timer = null;
     }
    }, 1000);
   }
   const params = {
    captchaType: 2, //邮箱
    bizType: 41, //重置手机
    authToken: this.veridata.authToken, //认证token
   }
   commonSendCaptcha(params).then(() => {

   })
  },
  submit() {
   this.$refs.ruleForm.validate((valid) => {
    if (!valid) return

    //提交安全验证
    const params = {
     password: this.$getEncryptCode(this.formData.password),
     authToken: this.veridata.authToken,
     // phoneCode: this.veridata.phoneCode,
     emailCode: this.formData.emailCode,
     authCode: this.formData.authCode,
    };
    Promise.try(() => {
     return resetPhoneCheck(params)
    }).then(res => {
     this.$emit('submit', res.successToken)
    })
   });
  },
 },
};
</script>

<style lang="scss" scoped>
.phone-verication {
 .p-title {
  font-size: 30px;

  .el-icon-arrow-left {
   font-size: 24px;
   padding-right: 20px;
   cursor: pointer;
  }

  span {
   cursor: pointer;
  }
 }

 .form-container {
  width: 500px;
  padding: 40px 0 0 40px;
 }

 .btn {
  margin-top: 40px;
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
 }

 .code {
  display: inline-block;
  width: 100px;
  height: 35px;
  margin: 8px;
  cursor: pointer;
  line-height: 35px;
  background-color: #90ff00;
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

}

::v-deep .form-input {
 > .el-input__inner {
  height: 50px;
  background-color: #f4f5f7;
 }
}
</style>