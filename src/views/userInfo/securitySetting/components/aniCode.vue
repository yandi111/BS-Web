<!-- 设置钓鱼码 -->
<template>
 <div>
  <div class="user-form" v-if="tabIndex === 1">
   <div class="title-context">
    <i class="el-icon-arrow-left" @click="handleSuccess"></i>
    <span class="title" @click="handleSuccess">{{ title }}</span>
   </div>
   <div class="form-container">
    <div class="tip">
     {{ $t('userInfo.什么是防钓鱼码？') }}<br/>
     {{ $t('userInfo.防钓鱼码是需要您自行设置的一串字符，设置后币家给您发送的邮件会包含此码，能够帮助您识别仿冒的币家邮件；') }}<br/>
     {{ $t('userInfo.若设置后收到未包含此码的为伪造、诈骗邮件，请立即与官方客服联系确认。') }}
    </div>
    <el-form :model="formData" :rules="rules" ref="ruleForm">
     <el-form-item prop="password" label="防钓鱼码">
      <el-input
       v-model="formData.password"
       :placeholder="$t('userInfo.请输入防钓鱼码')"
      ></el-input>
     </el-form-item>
     <el-form-item>
      <el-button class="btn" type="primary" @click="submit"
      >{{ $t('userInfo.提交') }}
      </el-button
      >
     </el-form-item>
    </el-form>
   </div>
  </div>
  <!-- 设置、修改钓鱼码验证页面 -->
  <AniCodeVerify
   v-if="tabIndex === 2"
   :checkData="checkData"
   :authToken.sync="authToken"
   @phoneChange="phoneChange"
   @emailChange="emailChange"
   @authChange="authChange"
   @setAniCodeSubmit="setAniCodeSubmit"
   @onBack="onBack"
   :title="title"
  />
  <success-modal
   :is-show.sync="showSuccess"
   :text="`${title}`+ $t('userInfo.成功')"
   @next="handleSuccess"
  ></success-modal>
 </div>
</template>

<script>
import VerifyForm from "@/components/verifyForm.vue";
import SuccessModal from "@/components/successModal.vue";
import AniCodeVerify from "./aniCodeVerify.vue";
import {authItem} from "@/api/common";
import {fishingCodeSet} from "@/api/user.js";

export default {
 name: "BindEmail",
 components: {
  VerifyForm,
  SuccessModal,
  AniCodeVerify,
 },
 props: {
  title: {
   type: String,
  },
 },
 data() {
  // 钓鱼码验证
  const validCode = (rule, value, callback) => {
   const reg = /^[a-zA-Z0-9]{8,32}$/;
   if (!value) {
    callback(new Error(this.$t('userInfo.请输入防钓鱼码')));
   } else {
    if (value.length < 8 || value.length > 32) {
     callback(new Error(this.$t('userInfo.请输入8-32位英文或数字，不包括特殊符号')));
    } else {
     if (reg.test(value)) {
      callback();
     } else {
      callback(new Error(this.$t('userInfo.请输入8-32位英文或数字，不包括特殊符号')));

     }
    }
   }
  };
  return {
   tabIndex: 1,
   showSuccess: false,
   showVeriy: false,
   formData: {
    password: "",
   },
   rules: {
    password: [{required: true, validator: validCode, trigger: "change"}],
   },
   phoneCode: "",
   emailCode: "",
   authCode: "",
   //接口数据
   checkData: {},
   authToken: "",
  };
 },
 mounted() {
  this.authItem();
 },
 methods: {
  //获取认证
  authItem() {
   Promise.try(() => {
    return authItem({data: 14})
   }).then(res => {
    this.checkData = res.data;
    this.authToken = res.data?.authToken;
   })
  },

  //子组件输入值
  phoneChange(val) {
   this.phoneCode = val;
  },
  emailChange(val) {
   this.emailCode = val;
  },
  authChange(val) {
   this.authCode = val;
  },
  //设置防钓鱼码
  setAniCodeSubmit() {
   const params = {
    password: this.formData.password,
    authToken: this.authToken,
    phoneCode: this.phoneCode,
    emailCode: this.emailCode,
    authCode: this.authCode,
   };
   Promise.try(async () => {
    return fishingCodeSet(params)
   }).then(() => {
    this.showSuccess = true; //设置成功
   })
  },

  // 提交
  submit() {
   this.$refs.ruleForm.validate((valid) => {
    if (valid) this.tabIndex = 2;
   });
  },

  // 验证表单
  handleVerifyForm() {
   this.showSuccess = true;
  },
  // 成功返回页面
  handleSuccess() {
   this.$emit("success");
   this.$emit("updateStatus");
  },
  onBack() {
   this.tabIndex = 1;
  },
 },
};
</script>
<style lang="scss" scoped>
.user-form {
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

 .form-container {
  width: 500px;
  padding: 40px 0 0 40px;

  ::v-deep .el-input__inner {
   height: 50px;
   line-height: 50px;
   background: #f4f5f7;
  }

  .tip {
   width: 100%;
   padding: 26px 30px;
   height: 180px;
   background: #f4f5f7;
   border-radius: 6px;
   font-size: 14px;
   font-family: PingFangSC-Regular, PingFang SC;
   font-weight: 400;
   color: #333333;
   line-height: 26px;
   margin-bottom: 40px;
  }
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
</style>
