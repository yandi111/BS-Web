<template>
 <div class="resetPhoneUpdate">
  <div class="p-title">
   <i class="el-icon-arrow-left" @click="back"></i>
   <span class="title-text" @click="back">{{ $t('userInfo.绑定手机') }}</span>
  </div>
  <div class="form-container">
   <el-form
    label-position="top"
    :model="formData"
    :rules="rules"
    ref="ruleForm"
   >
    <el-form-item prop="newPhone" :label="$t('userInfo.手机号')">
     <div class="phone-form">
      <div class="phone-l">
       <div class="phone-c">
        <div class="c-code">{{ activeItem }}</div>
        <div class="c-select" @click.stop="handleCode">
         <i
          :class="[
                      'custom-icon',
                      popperShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down',
                    ]"
         ></i>
        </div>
       </div>
      </div>
      <div class="phone-r">
       <el-input
        v-model="formData.newPhone"
        class="input-with-select form-input"
        :placeholder="$t('userInfo.请输入手机号码')"
        ref="phoneRef"
       ></el-input>
      </div>
     </div>
     <PhoneCode
      ref="phoneRefs"
      :list.sync="phoneAreaList"
      @shangeData="shangeData"
     />
    </el-form-item>
    <el-form-item prop="captcha" :label="$t('userInfo.短信验证码')">
     <el-input
      v-model="formData.captcha"
      class="form-input"
      autocomplete="off"
      :placeholder="$t('userInfo.请输入短信验证码')"
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
   :text="$t('userInfo.绑定手机成功')"
   @next="handleSuccess"
  ></success-modal>
 </div>
</template>

<script>
const TIME_COUNT = 59;
import PhoneCode from "@/components/phoneCode";
import SuccessModal from "@/components/successModal.vue";
import {
 countryList,
 resetBindCaptchaSend,
 resetPhoneUpdate,
} from "@/api/user.js";

export default {
 name: "resetPhoneUpdate",
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
  // 手机号验证
  const validPhone = (rule, value, callback) => {
   let reg = this.activeItem == "+86" ? /^[0-9]{11}$/ : /^\d{5,15}$/;
   if (!value) {
    callback(new Error(this.$t("userInfo.请输入手机号码")));
   } else {
    if (reg.test(value)) {
     callback();
    } else {
     callback(new Error(this.$t("userInfo.请输入正确的手机格式")));
    }
   }
  };
  return {
   activeItem: "+86",
   popperShow: false,
   showSuccess: false,
   formData: {
    newPhone: "",
    captcha: "",
   },
   rules: {
    newPhone: [
     {
      required: true,
      validator: validPhone,
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
  //监听点击事件
  document.addEventListener("click", () => {
   this.popperShow = false;
   this.$refs.phoneRefs.closeFn();
  });
  this.getCountryList();
 },
 methods: {
  //获取国家列表
  getCountryList() {
   countryList().then((res) => {
    if (res.status && res.status === 200) {
     if (res.data && res.data.success) {
      const {data} = res.data;
      const list = [];
      data.map((item) => {
       list.push({
        label: item.name,
        value: `+${item.code}`,
        phoneRegex: item.phoneRegex,
       });
      });
      this.phoneAreaList = list;
     }
    }
   });
  },
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
    bizType: 41, //41-重置手机
    successToken: this.successToken,
    contact: `${this.activeItem} ${this.formData.newPhone}`, //新的手机号
   };

   Promise.try(() => {
    return resetBindCaptchaSend(params)
   }).then(() => {})
  },

  submit() {
   this.$refs.ruleForm.validate((valid) => {
    if (!valid) return

    Promise.try(() => {
     return resetPhoneUpdate({
      successToken: this.successToken,
      newPhone: `${this.activeItem} ${this.formData.newPhone}`,
      captcha: this.formData.captcha,
     })
    }).then(() => {
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
.resetPhoneUpdate {
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