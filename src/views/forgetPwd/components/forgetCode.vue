<template>
  <div class="gate-form">
    <el-form :model="formData" :rules="rules" ref="ruleForm">
      <el-form-item
        prop="phoneCode"
        v-if="auditParams && auditParams.authPhone"
      >
        <el-input
          v-model="formData.phoneCode"
          autocomplete="off"
          class="input-with-select"
          :placeholder="$t('loginRegister.请输入短信验证码')"
          maxlength="6"
        >
          <span
            class="code"
            slot="suffix"
            @click.stop="getCode"
            v-if="!sendMsgDisabled"
            >{{ $t("loginRegister.获取验证码") }}</span
          >
          <span class="code resend" slot="suffix" v-else="!sendMsgDisabled">{{
            $t("loginRegister.重新发送") + codeTime + "s"
          }}</span>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="emailCode"
        v-if="auditParams && auditParams.authEmail"
      >
        <el-input
          v-model="formData.emailCode"
          autocomplete="off"
          class="input-with-select"
          :placeholder="$t('loginRegister.请输入邮箱验证码')"
          maxlength="6"
        >
          <span
            class="code"
            slot="suffix"
            @click.stop="getCode1"
            v-if="!sendMsgDisabled1"
            >{{ $t("loginRegister.获取验证码") }}</span
          >
          <span class="code resend" slot="suffix" v-else="!sendMsgDisabled1">{{
            $t("loginRegister.重新发送") + codeTime1 + "s"
          }}</span>
        </el-input>
      </el-form-item>
      <!-- <el-form-item
        v-if="(auditParams && auditParams.authPhone) || auditParams.authEmail"
      >
        <div class="noreceive-message" v-if="params.phoneArea">
          输入发送到 {{ protectPhone }} 的6位验证码<span @click="noReceiveMsg"
            >未收到验证码？</span
          >
        </div>

        <div class="noreceive-message" v-if="!params.phoneArea">
          输入发送到 {{ protectMail }} 的6位验证码<span @click="noReceiveMsg"
            >未收到验证码？</span
          >
        </div>
      </el-form-item> -->
      <el-form-item
        v-if="(auditParams && auditParams.authPhone) || auditParams.authEmail"
      >
        <div class="noreceive-message" v-if="params.phone">
          {{ $t("loginRegister.输入发送到的6位验证码", [protectPhone])
          }}<span @click="noReceiveMsg"
            >{{ $t("loginRegister.未收到验证码") }}？</span
          >
        </div>

        <div class="noreceive-message" v-if="!params.phone">
          {{ $t("loginRegister.输入发送到的6位验证码", [protectMail]) }}
        </div>
      </el-form-item>

      <el-form-item
        prop="authCode"
        v-if="auditParams && auditParams.authGoogleAuth"
      >
        <el-input
          v-model="formData.authCode"
          autocomplete="off"
          class="input-with-select"
          :placeholder="$t('loginRegister.请输入谷歌验证码')"
          maxlength="6"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const TIME_COUNT = 59;
import { securityPhone, encryptedmailbox } from "@/libs/utils";
// import { commonSendCaptcha } from "@/api/common.js";
import { sendNoauthCaptcha, passwordCheck } from "@/api/login";
export default {
  name: "FormCode",
  props: {
    auditParams: {
      type: Object,
      default: () => {},
    },
    params: {
      type: Object,
      default: () => {},
    },
    authToken: {
      type: String,
      default: "",
    },
  },
  computed: {
    protectPhone() {
      return this.params.phone && securityPhone(this.params.phone);
    },
    protectMail() {
      return this.params.mail && encryptedmailbox(this.params.mail);
    },
  },
  data() {
    return {
      timer: null, // 计时器
      codeTime: null, // 发送验证码倒计时
      sendMsgDisabled: false, // 是否显示发送验证码按钮
      timer1: null, // 计时器
      codeTime1: null, // 发送验证码倒计时
      sendMsgDisabled1: false, // 是否显示发送验证码按钮
      formData: {
        emailCode: "",
        phoneCode: "",
        authCode: "",
      },
      rules: {
        phoneCode: [
          {
            required: true,
            message: this.$t("loginRegister.请输入短信验证码"),
            trigger: "change",
          },
        ],
        emailCode: [
          {
            required: true,
            message: this.$t("loginRegister.请输入邮箱验证码"),
            trigger: "change",
          },
        ],
        authCode: [
          {
            required: true,
            message: this.$t("loginRegister.请输入谷歌验证码"),
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    // 下一步
    handleNext() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 找回密码-认证检查
          const params = {
            authToken: this.authToken,
            phoneCode: this.formData.phoneCode,
            emailCode: this.formData.emailCode,
            authCode: this.formData.authCode,
          };
          passwordCheck(params).then((res) => {
            if (res && res.status === 200) {
              if (res.data && res.data.success) {
                this.$emit("submit", this.formData);
              }
            }
          });
        }
      });
    },
    // 未收到验证码
    noReceiveMsg() {
      this.$emit("msg");
    },
    // 获取验证码
    getCode() {
      let params = {
        // username: (this.params.email ?  this.params.email : this.params.phone)
        captchaType: 1, //手机
        authToken: this.authToken,
        bizType: 3, //找回密码验证码
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
      sendNoauthCaptcha(params)
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
    // 获取验证码
    getCode1() {
      let params = {
        // username: this.params.email ? this.params.email : this.params.phone,
        captchaType: 2, //邮箱
        authToken: this.authToken,
        bizType: 3, //找回密码验证码
      };
      if (!this.timer1) {
        this.sendMsgDisabled1 = true;
        this.codeTime1 = TIME_COUNT;
        this.timer1 = setInterval(() => {
          if (this.codeTime1 > 1 && this.codeTime1 <= TIME_COUNT) {
            this.codeTime1--;
          } else {
            this.sendMsgDisabled1 = false;
            clearInterval(this.timer1);
            this.timer1 = null;
          }
        }, 1000);
      }
      sendNoauthCaptcha(params)
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
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 105px;
}

::v-deep .el-input-group__prepend {
  background-color: #fff !important;
}
::v-deep .el-input .el-input__inner::placeholder {
  font-size: 16px;
  color: #69798d !important;
}
::v-deep .el-input__inner {
  background: #f5f7fa;
  border: 1px solid #f5f7fa;
  color: #333333;
  font-size: 14px;
}

.noreceive-message {
  text-align: left;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #8992a6;
  > span {
    color: #90ff00;
    cursor: pointer;
    padding-left: 10px;
  }
}

.code {
  display: inline-block;
  width: 100px;
  height: 40px;
  margin: 8px 3px 0px 0px;
  cursor: pointer;
  line-height: 40px;
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

::v-deep .el-form-item__label {
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #040a1a;
}
</style>
