<!-- 绑定手机 -->
<template>
  <div>
    <div class="user-form" v-if="isComp == 'editeEmail'">
      <div class="title-context">
        <i class="el-icon-arrow-left" @click="handleSuccess"></i>
        <span class="title" @click="handleSuccess">{{
          $t("userInfo.修改邮箱")
        }}</span>
      </div>
      <div class="form-container">
        <el-form :model="formData" :rules="rules" ref="ruleForm">
          <el-form-item prop="contact" :label="$t('userInfo.输入新的邮箱')">
            <el-input
              v-model="formData.contact"
              :placeholder="$t('userInfo.请输入邮箱')"
              class="form-input"
              ref="emailRef"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="captcha"
            :label="$t('userInfo.将发送验证码到您的邮箱')"
          >
            <el-input
              v-model="formData.captcha"
              class="form-input"
              autocomplete="off"
              :placeholder="$t('userInfo.请输入验证码')"
              maxlength="6"
            >
              <span
                class="code"
                slot="suffix"
                @click.stop="getNewEmailCode"
                v-if="!sendMsgDisabled"
                >{{ $t("userInfo.获取验证码") }}</span
              >
              <span class="code resend" slot="suffix" v-else>{{
                $t("userInfo.重新发送") + codeTime + "s"
              }}</span>
            </el-input>
          </el-form-item>
          <el-form-item
            prop="emailCode"
            :label="$t('userInfo.将发送验证码到您的') + `${protectOldEmail}`"
          >
            <el-input
              v-model="formData.emailCode"
              class="form-input"
              autocomplete="off"
              :placeholder="$t('userInfo.请输入验证码')"
              maxlength="6"
            >
              <span
                class="code"
                slot="suffix"
                @click.stop="getOmCode"
                v-if="!sendMsgDisabledOm"
                >{{ $t("userInfo.获取验证码") }}</span
              >
              <span class="code resend" slot="suffix" v-else>{{
                $t("userInfo.重新发送") + codeTime1 + "s"
              }}</span>
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
                v-if="!sendMsgDisabledPc"
                >{{ $t("userInfo.获取验证码") }}</span
              >
              <span class="code resend" slot="suffix" v-else>{{
                $t("userInfo.重新发送") + codeTime2 + "s"
              }}</span>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="checkResult && checkResult.authGoogleAuth"
            prop="authCode"
            :label="$t('userInfo.请输入谷歌验证码')"
          >
            <el-input
              v-model="formData.authCode"
              class="form-input"
              autocomplete="off"
              :placeholder="$t('userInfo.请输入谷歌验证码')"
              maxlength="6"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="submit">{{
              $t("userInfo.确认")
            }}</el-button>
            <div>
              <span class="verifyCode" @click="showModal"
                >{{$t('userInfo.无法收到验证码')}}</span
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
      <verify-form
        :is-show.sync="showVeriy"
        @next="handleVerifyForm"
      ></verify-form>

      <success-modal
        :is-show.sync="showSuccess"
        :text="$t('userInfo.修改邮箱成功')"
        @next="handleSuccess"
      ></success-modal>
      <my-modal
        :isShow.sync="isShowModal"
        @close="closeModal"
        :title="$t('userInfo.无法收到验证码')"
      >
        <template #content>
          <div>{{$t('userInfo.发送短信成功，若仍未收到验证码.可以尝试以下操作')}}</div>
          <div>{{$t('userInfo.检查绑定手机号是否欠费')}}</div>
          <div>{{$t('userInfo.检查是否位于短信垃圾堆中')}}</div>
          <div>{{$t('userInfo.请确认您的手机号是否正确')}}</div>
          <div>{{$t('userInfo.可能存在发送延迟，过10钟后再重试')}}</div>
          <div>{{$t('userInfo.若此电话号已注册过，我们就不会再向您发送验证码')}}</div>
        </template>
        <template #footer>
          <div class="modal-btn">
            <div class="m-item" @click="onService">{{$t('userInfo.联系客服')}}</div>
            <div class="m-item m-bg" @click="closeModal">{{$t('userInfo.好的')}}</div>
          </div>
        </template>
      </my-modal>
    </div>
    <!-- 重置邮箱 -->
    <div v-if="isComp == 'resetEmail'">
      <email-verication
        :veridata="veridata"
        @submit="onUpdateEmail"
      ></email-verication>
    </div>
    <!-- 绑定邮箱 -->
    <div v-if="isComp == 'updateEmail'">
      <ResetEmailUpdate
        :successToken="successToken"
        @back="emailUpdateBack"
      ></ResetEmailUpdate>
    </div>
  </div>
</template>

<script>
const TIME_COUNT = 59;
import { securityPhone } from "@/libs/utils";
// import { sendNoauthCaptcha } from "@/api/login.js";
import { editEmail, infoHome, getEmailAuthItem } from "@/api/user.js";
import { authItem, captchaSend, commonSendCaptcha } from "@/api/common";
import VerifyForm from "@/components/verifyForm.vue";
import SuccessModal from "@/components/successModal.vue";
import emailVerication from "../safetyVerification/emailVerication.vue";
import ResetEmailUpdate from "../resetUpdate/resetEmailUpdate.vue";
import myModal from "@/components/my-modal";
export default {
  name: "BindEmail",
  components: {
    VerifyForm,
    SuccessModal,
    emailVerication,
    ResetEmailUpdate,
    myModal,
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
      isComp: "editeEmail",
      authToken: "",
      checkResult: null,
      oldEmail: "",
      showSuccess: false,
      showVeriy: false,
      timer: null, // 计时器
      codeTime: null, // 发送验证码倒计时
      sendMsgDisabled: false, // 是否显示发送验证码按钮
      timer1: null, // 计时器（旧邮箱）
      codeTime1: null, // 发送验证码倒计时（旧邮箱）
      sendMsgDisabledOm: false, // 是否显示发送验证码按钮（旧邮箱）
      timer2: null, // 计时器（手机）
      codeTime2: null, // 发送验证码倒计时（手机）
      sendMsgDisabledPc: false, // 是否显示发送验证码按钮（手机）
      formData: {
        contact: "",
        captcha: "",
        authToken: "",
        phoneCode: "",
        emailCode: "",
        authCode: "",
      },
      rules: {
        contact: [{ required: true, validator: validEmail, trigger: "blur" }],
        captcha: [
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
        phoneCode: [
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
      isShowModal: false,
      veridata: {},
      successToken: null,
    };
  },
  computed: {
    protectOldEmail() {
      return this.oldEmail && securityPhone(this.oldEmail);
    },
  },
  mounted() {
    //获取焦点
    this.$nextTick(() => {
      this.$refs.emailRef.focus();
    });
    this.getOldEmail();
    this.getAuthItem();
  },
  methods: {
    //获取旧邮箱
    getOldEmail() {
      // infoHome().then((res) => {
      //   if (res && res.status === 200) {
      //     if (res.data && res.data.success) {
      //       this.oldEmail = res.data.data.email;
      //     }
      //   }
      // });
    },
    //获取认证
    getAuthItem() {
      authItem({ data: 7 }).then((res) => {
        this.checkResult = res.data;
        this.authToken = res.data?.authToken;
      });
    },
    // 获取新邮箱验证码
    getNewEmailCode() {
      if (this.formData.contact === "") {
        this.$nextTick(() => {
          this.$refs.emailRef.focus();
        });
        return;
      }
      let params = {
        contact: this.formData.contact,
        authToken: this.authToken,
        bizType: 7, //7更新邮箱
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
    // 获取旧邮箱验证码
    getOmCode() {
      let params = {
        captchaType: 2, //验证类型2邮箱
        authToken: this.authToken,
        bizType: 7, //7更新邮箱
      };
      if (!this.timer1) {
        this.sendMsgDisabledOm = true;
        this.codeTime1 = TIME_COUNT;
        this.timer1 = setInterval(() => {
          if (this.codeTime1 > 1 && this.codeTime1 <= TIME_COUNT) {
            this.codeTime1--;
          } else {
            this.sendMsgDisabledOm = false;
            clearInterval(this.timer1);
            this.timer1 = null;
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
    //获取手机验证码
    getPhoneCode() {
      let params = {
        captchaType: 1, //验证类型1手机
        authToken: this.authToken,
        bizType: 7, //7更新邮箱
      };
      if (!this.timer2) {
        this.sendMsgDisabledPc = true;
        this.codeTime2 = TIME_COUNT;
        this.timer2 = setInterval(() => {
          if (this.codeTime2 > 1 && this.codeTime2 <= TIME_COUNT) {
            this.codeTime2--;
          } else {
            this.sendMsgDisabledPc = false;
            clearInterval(this.timer2);
            this.timer2 = null;
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
          //更新邮箱
          const params = {
            contact: this.formData.contact,
            captcha: this.formData.captcha,
            authToken: this.authToken,
            phoneCode: this.formData.phoneCode,
            emailCode: this.formData.emailCode,
            authCode: this.formData.authCode,
          };
          editEmail(params).then((res) => {
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
    handleVerifyForm(data) {
      this.showSuccess = true;
    },
    // 成功返回页面
    handleSuccess() {
      this.$emit("success");
    },
    //重置邮箱
    showModal() {
      /**
       点击无法收到验证码，需判断：
       是否绑定手机（国内手机号）或谷歌，有则跳转下一个页面。两个都没绑定则弹窗提示联系客服
       */

      getEmailAuthItem()
        .then((res) => {
          if (res.data?.data?.authEmail || res.data?.data?.authGoogleAuth) {
            //下一个验证页面
            this.isComp = "resetEmail";
            // 验证数据
            this.veridata = res.data?.data;
          } else {
            this.isShowModal = true;
          }
        })
        .catch(() => {
          this.isShowModal = true;
        });
    },
    onUpdateEmail(token) {
      this.isComp = "updateEmail";
      this.successToken = token;
    },
    emailUpdateBack() {
      this.isComp = "resetEmail";
    },
    closeModal() {
      this.isShowModal = false;
    },
    onService() {
      zE("messenger", "open");
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

  .verifyCode {
    cursor: pointer;
    color: #90ff00;
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
.modal-btn {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  .m-item {
    height: 40px;
    line-height: 40px;
    color: #90ff00;
    border: 1px solid #90ff00;
    border-radius: 4px;
    text-align: center;
    padding: 0 30px;
    cursor: pointer;
  }
  .m-bg {
    background: #90ff00;
    color: #fff;
  }
}
</style>
