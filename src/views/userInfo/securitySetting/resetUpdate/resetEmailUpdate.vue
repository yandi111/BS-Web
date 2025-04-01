<template>
 <div class="resetEmailUpdate">
  <div class="p-title">
   <i class="el-icon-arrow-left" @click="back"></i>
   <span class="title-text" @click="back">{{ $t('userInfo.绑定邮箱') }}</span>
  </div>
  <div class="form-container">
   <el-form
    label-position="top"
    :model="formData"
    :rules="rules"
    ref="ruleForm"
   >
    <el-form-item prop="newEmail" :label="$t('userInfo.邮箱地址')">
     <el-input
      class="form-input"
      v-model="formData.newEmail"
      :placeholder="$t('userInfo.请输入邮箱地址')"
     ></el-input>
    </el-form-item>
    <el-form-item prop="captcha" :label="$t('userInfo.邮箱验证')">
     <el-input
      v-model="formData.captcha"
      class="form-input"
      autocomplete="off"
      :placeholder="$t('userInfo.请输入邮箱验证码')"
      maxlength="6"
     >
            <span
             class="code"
             slot="suffix"
             @click.stop="getCode"
             v-if="!sendMsgDisabled"
            >{{ $t("userInfo.获取验证码") }}</span
            >
      <span class="code resend" slot="suffix" v-else>{{
        $t("userInfo.重新发送") + codeTime + "s"
       }}</span>
     </el-input>
    </el-form-item>

    <el-form-item>
     <el-button class="btn" type="primary" @click="submit">{{
       $t("userInfo.确认")
      }}
     </el-button>
    </el-form-item>
   </el-form>
  </div>
  <success-modal
   :is-show.sync="showSuccess"
   :text="$t('userInfo.绑定邮箱成功')"
   @next="handleSuccess"
  ></success-modal>
 </div>
</template>

<script>
const TIME_COUNT = 59;
import PhoneCode from "@/components/phoneCode";
import SuccessModal from "@/components/successModal.vue";
import {resetBindCaptchaSend, resetEmailUpdate} from "@/api/user.js";

export default {
 name: "resetEmailUpdate",
 props: {
  successToken: {
   type: String,
   default: "",
  },
 },
 components: {
  PhoneCode,
  SuccessModal,
 },

 data() {
  // 邮箱验证
  const validEmail = (rule, value, callback) => {
   const reg =
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
   if (!value) {
    callback(new Error(this.$t("userInfo.请输入邮箱")));
   } else {
    if (reg.test(value)) {
     callback();
    } else {
     callback(new Error(this.$t("userInfo.请输入正确的邮箱")));
    }
   }
  };
  return {
   popperShow: false,
   showSuccess: false,
   formData: {
    newEmail: "",
    captcha: "",
   },
   rules: {
    newEmail: [
     {
      required: true,
      validator: validEmail,
      trigger: "blur",
     },
    ],
    captcha: [
     {
      required: true,
      message: this.$t("userInfo.验证码不能为空"),
      trigger: "change",
     },
    ],
   },
   sendMsgDisabled: false,
   codeTime: null,
   timer: null,
   phoneAreaList: [],
  };
 },
 created() {
 },
 methods: {
  back() {
   this.$emit("back");
  },
  handleCode() {
   this.popperShow = !this.popperShow;
   this.$refs.phoneRefs.showFn();
  },
  shangeData(item) {
   this.activeItem = item.value;
   this.popperShow = false;
   this.$refs["ruleForm"].resetFields();
  },
  getCode() {
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

   const params = {
    bizType: 42, //42-重置邮箱
    successToken: this.successToken,
    contact: this.formData.newEmail, //新的邮箱
   };

   Promise.try(() => {
    return resetBindCaptchaSend(params)
   }).then(() => {})
  },

  submit() {
   this.$refs.ruleForm.validate((valid) => {
    if (!valid) return

    const params = {
     successToken: this.successToken,
     newEmail: this.formData.newEmail,
     captcha: this.formData.captcha,
    };

    Promise.try(() => {
     return resetEmailUpdate(params)
    }).then(res => {
     this.showSuccess = true;
    })
   });
  },

  handleSuccess() {
   this.$router.go(0);
   this.$store.dispatch("getUserInfo");
  },
 },
};
</script>

<style lang="scss" scoped>
.resetEmailUpdate {
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

 .phone-form {
  display: flex;

  .phone-l {
   min-width: 80px;
   display: flex;
   align-items: center;
   height: 50px;
   border: 1px solid #dcdfe6;
   margin-right: 5px;
   background: #f4f5f7;

   .phone-c {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .c-code {
     margin-left: 10px;
    }

    .c-select {
     margin: 0 10px;
    }
   }
  }

  .phone-r {
   flex: 1;
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