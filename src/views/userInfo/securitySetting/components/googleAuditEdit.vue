<!-- 谷歌验证 -->
<template>
  <div class="google-audit">
    <step :stepInfo="stepInfo"></step>

    <!-- 下载谷歌验证器 -->
    <div class="google-old" v-if="stepInfo.step === 0">
      <el-form
        :model="oldFormData"
        :rules="rules"
        ref="verifyForm"
        label-position="top"
      >
        <el-form-item>
          <!-- <div class="title">安全验证</div> -->
        </el-form-item>
        <el-form-item prop="googleCode" :label="$t('userInfo.原谷歌验证码')">
          <el-input
            v-model="oldFormData.googleCode"
            :placeholder="$t('userInfo.请输入原谷歌验证码')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phoneCode" :label="$t('userInfo.手机验证')" v-if="isNeedPhone">
          <el-input
            v-model="oldFormData.phoneCode"
            autocomplete="off"
            :placeholder="$t('userInfo.请输入短信验证码')"
            maxlength="6"
          >
            <span
              class="code"
              slot="suffix"
              @click.stop="getCode"
              v-if="!sendMsgDisabled"
              >{{ $t('userInfo.获取验证码') }}</span
            >
            <span class="code resend" slot="suffix" v-else>{{$t('userInfo.重新发送')
              + codeTime + "s"
            }}</span>
          </el-input>
        </el-form-item>
        <!-- 邮箱验证 -->
        <el-form-item prop="emailCode" :label="$t('userInfo.邮箱验证')" v-if="isNeedEmail">
          <el-input
            v-model="oldFormData.emailCode"
            autocomplete="off"
            :placeholder="$t('userInfo.请输入邮箱验证码')"
            maxlength="6"
          >
            <span
              class="code"
              slot="suffix"
              @click.stop="getEmailCode"
              v-if="!sendMsgDisabled1"
              >{{ $t('userInfo.获取验证码') }}</span
            >
            <span class="code resend" slot="suffix" v-else>{{$t('userInfo.重新发送')
               + codeTime1 + "s"
            }}</span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit" @click="verifySubmit">{{ $t('userInfo.确定') }}</div>
        </el-form-item>
      </el-form>
    </div>

    <!-- 绑定设置 -->
    <div class="down-audit center bind-pad" v-if="stepInfo.step === 1">
      <p class="google-desc top">{{ $t('userInfo.在谷歌验证器中添加密钥并备份') }}</p>
      <p class="desc">
        {{ $t('userInfo.打开谷歌验证器，扫描下方二维码或手动输入下述密钥添加验证令牌。密钥用于手机更换或遗失时找回谷歌验证器，绑定前请务必将下述密钥备份保存。') }}
      </p>
      <div class="secret-container">
        <div class="code-container">
          <img
            :src="auditParams && auditParams.secretQrCodes"
            :alt="$t('userInfo.谷歌谷歌认证器密钥的二维码')"
          />
        </div>
        <div class="text-container">
          <p>{{ auditParams && auditParams.secret }}</p>
          <p>
            <span class="copy">{{ $t('userInfo.复制密钥') }}</span>
            <i class="el-icon-copy-document" @click="copyText(auditParams.secret)"></i>
          </p>
        </div>
      </div>
      <span class="bind" @click="handleNext">下一步</span>
    </div>

    <!-- 设置成功 -->
    <div class="down-audit bind-pad" v-if="stepInfo.step === 2">
      <p class="google-desc top">{{ $t('userInfo.安全验证') }}</p>
      <el-form label-position="top" :model="formData" ref="formData">
        <el-form-item
          :label="$t('userInfo.新谷歌验证')"
          prop="authCode"
          :rules="[
            { required: true, message: this.$t('userInfo.验证码不能为空') },
            { type: 'number', message: this.$t('userInfo.验证码必须为数字') },
          ]"
        >
          <el-input
            v-model.number="formData.authCode"
            autocomplete="off"
            maxlength="6"
            :placeholder="$t('userInfo.请输入谷歌验证码')"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        class="login-btn"
        @click="handleSubmit"
        :loading="loading"
        >{{ $t('userInfo.确定') }}</el-button
      >
    </div>

    <verify-form
      :is-show.sync="showVeriy"
      :isNeedNewGoogle.sync="isNeedNewGoogle"
      :isNeedPhone.sync="isNewNeedPhone"
      :isNeedEmail.sync="isNewNeedEmail"
      :isNeedGoogle.sync="isNewNeedGoogle"
      :authToken.sync="newAuthToken"
      :codeType.sync="codeType"
      @phoneChange="phoneChange"
      @emailChange="emailChange"
      @authChange="authChange"
      @newGoogleChange="newGoogleChange"
      @next="handleVerifyForm"
      v-if="showVeriy"
    ></verify-form>
    <success-modal
      :is-show.sync="showSuccess"
      :text="$t('userInfo.修改谷歌成功')"
      @next="handleSuccess"
    ></success-modal>
  </div>
</template>

<script>
const TIME_COUNT = 59;
import step from "./step.vue";
// import { googleAuthFirst } from "@/api/login.js";
import VerifyForm from "@/components/verifyForm.vue";
import SuccessModal from "@/components/successModal.vue";
import { authItem, commonSendCaptcha } from "@/api/common";
import { updateGoogleSecret, bindGoogleSecret } from "@/api/user";
export default {
  name: "GoogleAudit",
  components: {
    step,
    VerifyForm,
    SuccessModal,
  },
  data() {
    return {
      showVeriy: false,
      showSuccess: false,
      loading: false,
      stepInfo: {
        list: [
          { textParams: this.$t('userInfo.验证旧谷歌')},
          { textParams: this.$t('userInfo.绑定新谷歌') },
          { textParams: this.$t('userInfo.修改成功')},
        ],
        step: 0,
      },
      formData: {
        authCode: "",
      },
      timer: null, // 计时器
      codeTime: null, // 发送验证码倒计时
      sendMsgDisabled: false, // 是否显示发送验证码按钮
      timer1: null, // 计时器
      codeTime1: null, // 发送验证码倒计时
      sendMsgDisabled1: false, // 是否显示发送验证码按钮
      oldFormData: {
        googleCode: "", //谷歌验证
        phoneCode: "", //手机验证
        emailCode: "", //邮箱验证
      },
      rules: {
        googleCode: [
          { required: true, message: this.$t('userInfo.谷歌验证码不能为空'), trigger: "change" },
        ],
        emailCode: [
          { required: true, message: this.$t('userInfo.邮箱验证码不能为空'), trigger: "change" },
        ],
        phoneCode: [
          { required: true, message: this.$t('userInfo.手机验证码不能为空'), trigger: "change" },
        ],
      },
      isNeedPhone: false,
      isNeedEmail: false,
      authToken: "",
      //修改谷歌验证器返回参数
      auditParams: {},
      isNeedNewGoogle: true,
      isNewNeedPhone: false,
      isNewNeedEmail: false,
      isNewNeedGoogle: false,
      newAuthToken: "",
      codeType: 11, //11-确认修改谷歌验证器
      //验证通过后修改绑定新参数
      newGoogleCode: "",
      newPhoneCode: "",
      newEmailCode: "",
      oldGoogleCode: "",
    };
  },
  mounted() {
    this.authItem();
  },
  methods: {
    //获取认证
    authItem() {
      authItem({ data: 9 }).then((res) => {
        this.authToken = res.data?.authToken;
        this.isNeedPhone = res.data?.authPhone;
        this.isNeedEmail = res.data?.authEmail;
      });
    },
    // 获取手机验证码
    getCode() {
      let params = {
        captchaType: 1,
        authToken: this.authToken,
        bizType: 9, //更新谷歌验证器
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
      commonSendCaptcha(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
          }
        }
      });
    },
    // 获取邮箱验证码
    getEmailCode() {
      let params = {
        captchaType: 2,
        authToken: this.authToken,
        bizType: 9, //更新谷歌验证器
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
      commonSendCaptcha(params).then((res) => {
        if (res && res.status === 200) {
          // 成功
          if (res.data && res.data.success) {
          }
        }
      });
    },
    //原谷歌验证
    verifySubmit() {
      this.$refs["verifyForm"].validate((valid) => {
        if (valid) {
          const params = {
            authToken: this.authToken,
            phoneCode: this.oldFormData.phoneCode,
            emailCode: this.oldFormData.emailCode,
            authCode: this.oldFormData.googleCode,
          };
          updateGoogleSecret(params).then((res) => {
            if (res && res.status === 200) {
              if (res.data && res.data.success) {
                this.auditParams = res.data.data;
                this.newAuthToken = res.data?.data?.authToken;
                this.isNewNeedPhone = res.data?.data?.authPhone;
                this.isNewNeedEmail = res.data?.data?.authEmail;
                this.isNewNeedGoogle = res.data?.data?.authGoogleAuth;
                this.stepInfo.step = 1;
              }
            }
          });
        }
      });
    },
    // 成功返回页面
    handleSuccess() {
      this.$emit("success");
    },
    phoneChange(val) {
      this.newPhoneCode = val;
    },
    emailChange(val) {
      this.newEmailCode = val;
    },
    authChange(val) {
      this.oldGoogleCode = val;
    },
    newGoogleChange(val) {
      this.newGoogleCode = val;
    },
    // 提交弹窗
    handleVerifyForm() {
      //验证通过更新谷歌
      const params = {
        password: this.newGoogleCode,
        authToken: this.newAuthToken,
        phoneCode: this.newPhoneCode,
        emailCode: this.newEmailCode,
        authCode: this.oldGoogleCode,
      };
      bindGoogleSecret(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.showSuccess = true;
          }
        }
      });

      // this.showVeriy = false;
      // if (this.stepInfo.step === 0) {
      //   this.stepInfo.step = 1;
      // } else if (this.stepInfo.step === 1) {
      //   this.stepInfo.step = 2;
      // }
    },
    // 复制文本
    copyText(text) {
       navigator.clipboard.writeText(text).then(() => {
        this.$message.success(this.$t("userInfo.复制成功"));
      });
    },
    // 绑定谷歌验证器
    bindConfig() {
      this.showVeriy = true;
    },
    // 下一步
    handleNext() {
      this.showVeriy = true;
    },
    // 确认
    // handleSubmit() {
    //   this.$refs.formData.validate((valid) => {
    //     if (valid) {
    //       // 请求接口，弹出创建成功的窗口
    //       let { id, openToken } = this.auditParams;
    //       let params = {
    //         id: id,
    //         openToken: openToken,
    //         authCode: this.formData.authCode,
    //       };
    //       this.loading = true;
    //       googleAuthFirst(params)
    //         .then((res) => {
    //           if (res && res.status === 200) {
    //             if (res.data && res.data.success) {
    //               // this.$message.success('用户创建成功')
    //               this.$emit("success");
    //               this.loading = false;
    //             }
    //           }
    //         })
    //         .finally(() => {
    //           this.loading = false;
    //         });
    //     }
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
.google-audit {
  padding-top: 30px;
  .google-old {
    width: 460px;
    // margin: 60px 0 0 318px;
    .title {
      font-size: 18px;
      color: #333333;
      font-weight: 600;
    }
    .submit {
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: $colorB;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      font-size: 18px;
      font-weight: 500;
    }
    ::v-deep .el-input__inner {
      height: 60px;
      background: #f4f5f7;
      border-radius: 6px;
      border: none;
    }
    .code {
      display: inline-block;
      width: 100px;
      height: 40px;
      margin: 10px 0 0 0;
      cursor: pointer;
      line-height: 40px;
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
  }
  .down-pad {
    // padding: 0 120px;
  }
  .bind-pad {
    padding: 0 110px;
    line-height: 24px;
  }
  .center {
    align-items: center;
  }
  .down-audit {
    padding: 0 200px;
    display: flex;
    flex-direction: column;
    .img-container {
      width: 100px;
      height: 100px;
      margin-top: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .google-desc {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 80px;
    }
    .top {
      margin-top: 78px;
    }
    .desc {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }
    .down {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-radius: 6px;
      border: 1px solid $colorB;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: $colorB;
      text-align: center;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .read {
      width: 100%;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      text-align: left;
      & span {
        color: $colorB;
        cursor: pointer;
      }
    }
    .bind {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-radius: 6px;
      border: 1px solid $colorB;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      text-align: center;
      background-color: $colorB;
      margin-bottom: 10px;
      cursor: pointer;
      margin-top: 30px;
    }

    .secret-container {
      width: 100%;
      height: 160px;
      padding: 10px;
      background-color: #edf1ff;
      border-radius: 6px;
      margin-top: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .code-container {
        width: 140px;
        height: 140px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text-container {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        .copy {
          margin-right: 10px;
        }
        .el-icon-copy-document {
          color: $colorB;
          padding: 4px;
          cursor: pointer;
        }
      }
    }
  }

  .mg-bot {
    margin-bottom: 30px;
  }

  .login-btn {
    margin-top: 30px;
    font-size: 18px;
  }

  ::v-deep .el-input__inner::placeholder {
    font-size: 14px !important;
  }
}
</style>
