<template>
  <div class="user-form">
    <div class="title-context">
      <i class="el-icon-arrow-left" @click="onBack"></i>
      <span class="title" @click="onBack">{{  $t('userInfo.修改登录密码')  }}</span>
    </div>
    <div class="form-container">
      <el-form
        label-position="top"
        :model="formData"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item
          v-if="checkData && checkData.authPhone"
          prop="phoneCode"
          :label="$t('userInfo.手机验证')"
        >
          <el-input
            v-model="formData.phoneCode"
            class="form-input"
            autocomplete="off"
            :placeholder="$t('userInfo.修改登录密码')"
            maxlength="6"
            @input="phoneChange"
          >
            <span
              class="code"
              slot="suffix"
              @click.stop="getPhoneCode"
              v-if="!sendMsgDisabledPc"
              >{{ $t('userInfo.获取验证码') }}</span
            >
            <span
              class="code resend"
              slot="suffix"
              v-else
              >{{ $t('userInfo.重新发送')+ codeTime + "s" }}</span
            >
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="checkData && checkData.authEmail"
          prop="emailCode"
          :label="$t('userInfo.邮箱验证')"
        >
          <el-input
            v-model="formData.emailCode"
            class="form-input"
            autocomplete="off"
            :placeholder="$t('userInfo.请输入验证码')"
            maxlength="6"
            @input="emailChange"
          >
            <span
              class="code"
              slot="suffix"
              @click.stop="getEmailCode"
              v-if="!sendMsgDisabledEm"
              >{{$t('userInfo.获取验证码')}}</span
            >
            <span
              class="code resend"
              slot="suffix"
              v-else
              >{{$t('userInfo.重新发送')  + codeTime2 + "s" }}</span
            >
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="checkData && checkData.authGoogleAuth"
          prop="authCode"
          :label="$t('userInfo.谷歌验证')"
        >
          <el-input
            v-model="formData.authCode"
            class="form-input"
            autocomplete="off"
            :placeholder="$t('userInfo.请输入谷歌验证码')"
            maxlength="6"
            @input="authChange"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="nextBtn"
            >{{$t('userInfo.下一步')}}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const TIME_COUNT = 59;
import { commonSendCaptcha } from "@/api/common.js";
export default {
  name: "EditPwdVerify",
  props: {
    //认证可通过检查密码通过返回的数据来控制认证选项的显示和隐藏
    checkData: {
      type: Object,
      default: () => {},
    },
    authToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      formData: {
        phoneCode: "",
        emailCode: "",
        authCode: "",
      },
      rules: {
        phoneCode: [
          { required: true, message: this.$t('userInfo.请输入手机验证码'), trigger: "change" },
        ],
        emailCode: [
          { required: true, message: this.$t('userInfo.请输入邮箱验证码'), trigger: "change" },
        ],
        authCode: [
          { required: true, message: this.$t('userInfo.请输入谷歌验证码'), trigger: "change" },
        ],
      },
      sendMsgDisabledPc: false,
      timer: null, //计时器（手机）
      codeTime: null, //倒计时（手机）
      sendMsgDisabledEm: false,
      timer2: null, //计时器（邮箱）
      codeTime2: null, //倒计时（邮箱）
    };
  },
  methods: {
    //获取手机验证码
    getPhoneCode() {
      const params = {
        captchaType: 1,
        authToken: this.authToken,
        bizType: 4, //4修改密码
      };
      if (!this.timer) {
        this.sendMsgDisabledPc = true;
        this.codeTime = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.codeTime > 1 && this.codeTime <= TIME_COUNT) {
            this.codeTime--;
          } else {
            this.sendMsgDisabledPc = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      commonSendCaptcha(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
          }
        }
      });
    },
    //获取邮箱验证码
    getEmailCode() {
      const params = {
        captchaType: 2,
        authToken: this.authToken,
        bizType: 4, //4修改密码
      };
      if (!this.timer2) {
        this.sendMsgDisabledEm = true;
        this.codeTime2 = TIME_COUNT;
        this.timer2 = setInterval(() => {
          if (this.codeTime2 > 1 && this.codeTime2 <= TIME_COUNT) {
            this.codeTime2--;
          } else {
            this.sendMsgDisabledEm = false;
            clearInterval(this.timer2);
            this.timer2 = null;
          }
        }, 1000);
      }
      commonSendCaptcha(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
          }
        }
      });
    },
    nextBtn() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("setPwdSubmit");
        }
      });
    },
    // 成功返回页面
    handleSuccess() {
      this.$emit("success");
    },
    //手机输入值传给父组件
    phoneChange(val) {
      this.$emit("phoneChange", val);
    },
    //邮箱输入值传给父组件
    emailChange(val) {
      this.$emit("emailChange", val);
    },
    //谷歌输入值
    authChange(val) {
      this.$emit("authChange", val);
    },
    onBack() {
      this.$emit("onBack");
    },
  },
};
</script>

<style lang="scss" scoped>
.user-form {
  padding: 60px;
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
    padding: 60px 0 0 20px;
    ::v-deep .el-input--suffix .el-input__inner {
      background: #f4f5f7;
    }
    ::v-deep .el-input__inner {
      background: #f4f5f7;
      height: 50px;
      line-height: 50px;
    }
    .code {
      display: inline-block;
      width: 100px;
      height: 35px;
      margin: 7.5px 0;
      cursor: pointer;
      line-height: 34px;
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

  ::v-deep .el-form-item__error {
    font-size: 14px;
  }
  ::v-deep .el-form-item {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 18px;
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
