<!-- 资金验证表单 -->
<template>
  <div>
    <common-modal
      :title="$t(t + '验证')"
      width="600px"
      :show="isShow"
      :noFooter="false"
      :showClose="true"
      :append-to-body="true"
      :FooterIsCenter="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_content>
        <div class="form-common">
          <div class="realName_tips" v-if="nameTips">
            <span class="tips">{{ nameTips }}</span>
          </div>
          <el-form :model="formData" ref="payForm" label-position="top">
            <el-form-item
              prop="tradePassword"
              :label="$t(t + '请输入您的资金密码')"
            >
              <el-input
                v-model="formData.tradePassword"
                autocomplete="off"
                :placeholder="$t(t + '请输入您的资金密码')"
                maxlength="16"
                :disabled="params.tradePasswordStatus != 1"
              >
                <el-button
                  type="primary"
                  v-if="params.tradePasswordStatus != 1"
                  slot="suffix"
                  @click.stop="goBind"
                >
                  去绑定
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="isVerify && params.authPhone"
              prop="phoneCode"
              :label="$t(t + '将发送验证码到您的手机号', [params.phone])"
            >
              <el-input
                v-model="formData.phoneCode"
                autocomplete="off"
                :placeholder="$t(t + '请输入您短信验证码')"
                maxlength="16"
              >
                <el-button
                  type="primary"
                  slot="suffix"
                  @click.stop="getCode(1)"
                  :disabled="isPhoneCode"
                  >{{ $t(t + phoneTitle) }}</el-button
                >
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="isVerify && params.authEmail"
              prop="emailCode"
              :label="$t(t + '将发送验证码到您的邮箱', [params.email])"
            >
              <el-input
                v-model="formData.emailCode"
                autocomplete="off"
                :placeholder="$t(t + '请输入您的邮箱验证码')"
                maxlength="16"
              >
                <el-button
                  type="primary"
                  slot="suffix"
                  @click.stop="getCode(2)"
                  :disabled="isEmailCode"
                  >{{ $t(t + emailTitle) }}</el-button
                >
              </el-input>
            </el-form-item>
            <el-form-item prop="authCode" :label="$t(t + '谷歌验证码')"
            v-if="params.authGoogleAuth">
              <el-input
                v-model="formData.authCode"
                autocomplete="off"
                :placeholder="$t(t + '请输入您的谷歌验证码')"
                maxlength="16"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <template #dia_footer>
        <el-button
          type="primary"
          :disabled="!isNext"
          class="modal-btn"
          style="width: 100%"
          @click="handleApprove"
          >{{ $t(t + "下一步") }}
        </el-button>
      </template>
    </common-modal>
  </div>
</template>

<script>
import { checkAuthStrong } from "@/api/common";
import { sendCaptchaAuth } from "@/api/otc.js";
export default {
  name: "",
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      default: () => {},
    },
    isVerify: {
      type: Boolean,
      default: true,
    },
    nameTips:{
      type: String,
      default: undefined,
    },
  },
  computed:{
    chinaPhone(){
      return this.$store.state.login.isChina
    },
  },
  data() {
    return {
      // 获取手机验证码
      phoneTitle: "获取验证码",
      isPhoneCode: false,
      // 获取邮箱验证码
      emailTitle: "获取验证码",
      isEmailCode: false,
      // 国际缩写
      t: "c2c.",
      // 提交数据
      formData: {
        phoneCode: "",
        emailCode: "",
        authCode: "",
        tradePassword: "",
      },
    };
  },
  mounted() {
    console.log('params',this.params);
    // if (this.$store.state.login.userInfo.userId == 10479) {
    //   this.formData = {
    //     phoneCode: "456161",
    //     emailCode: "456161",
    //     authCode: "456161",
    //     tradePassword: "Qwe123456..",
    //   };
    // }
    if (this.$cache.local.getJSON("authPhoneTime")) {
      this.countdown(1);
    }
    if (this.$cache.local.getJSON("authEmailTime")) {
      this.countdown(2);
    }
  },
  computed: {
    isNext() {
      return (
        // this.formData.phoneCode &&
        // this.formData.emailCode &&
        this.formData.authCode && this.formData.tradePassword
      );
    },
  },
  methods: {
    // 验证下一步
    handleApprove() {
      this.$refs["payForm"].validate((valid) => {
        if (valid) {
          const encrypt = JSON.parse(JSON.stringify(this.formData));
          encrypt.tradePassword = this.$getEncryptCode(encrypt.tradePassword);
          checkAuthStrong({
            authToken: this.params.authToken,
            bizType: this.params.bizType,
            ...encrypt,
          }).then((res) => {
            this.formData.successToken = res.data.successToken;
            this.$emit("update:isShow", false);
            this.$emit("next", this.formData);
            console.log("prompt", this.formData);
          });
        }
      });
    },
    //倒计时
    countdown(captchaType) {
      let type = captchaType == 1 ? "authPhoneTime" : "authEmailTime",
        title = captchaType == 1 ? "phoneTitle" : "emailTitle",
        code = captchaType == 1 ? "isPhoneCode" : "isEmailCode",
        time = this.$cache.local.getJSON(type);

      this[title] = `${time}秒后重试`;
      this[code] = true;

      let timer = setInterval(() => {
        if (time == 0) {
          this[title] = "获取验证码";
          this[code] = false;
          clearInterval(timer);
          this.$cache.local.remove(type);
        } else {
          // 倒计时
          this[title] = `${time}秒后重试`;
          time--;
          this.$cache.local.setJSON(type, time);
        }
      }, 1000);
    },

    // 获取验证码
    getCode(captchaType) {
      sendCaptchaAuth({
        captchaType,
        authToken: this.params.authToken,
        bizType: this.params.bizType,
      }).then((_) => {
        const type = captchaType == 1 ? "authPhoneTime" : "authEmailTime";
        this.$cache.local.setJSON(type, this.$cache.local.getJSON(type) || 60);
        this.countdown(captchaType);
      });
    },
    // 去绑定资金密码
    goBind() {
      this.$router.push("/user/securitySetting?curComp=setFunds");
    },
  },
  watch: {
    isShow: {
      handler(newValue) {
        if (!newValue) {
          this.formData = {
            phoneCode: "",
            emailCode: "",
            authCode: "",
            tradePassword: "",
          };
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.realName_tips{
  width: 540px;
  height: 50px;
  background: rgba(0,0,0,0.3);
  background: #90ff00 ;
  border-radius: 6px;
  text-align: center;
  .tips{

    font-size: 14px;
    font-weight: 500;
    color: #333333;
    line-height: 50px;
  }
}
.code {
  display: inline-block;
  width: 100px;
  height: 30px;
  margin: 5px 0 0 0;
  cursor: pointer;
  line-height: 30px;
  background-color: #90ff00;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
}

/** 发送验证吗样式 */
.resend {
  cursor: not-allowed;
  background-color: #8992a6;
}

// 表格padding
.form-common {
  padding: 0 30px;
  .el-button {
    width: 100px;
    height: 30px;
    line-height: 0;
    padding: 0;
  }
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
}

.add-pay {
  ::v-deep .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
}

.el-select {
  width: 100%;
}

.modal-btn {
  height: 50px;
}

// 文件上传
.upload-demo {
  padding-right: 30px;

  .upload-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 100px;
    line-height: 180px;
    text-align: center;
    border-radius: 6px;
    color: #90ff00;
    background-color: #f5f5f5;

    .upload-title {
      padding-left: 15px;
      font-size: 14px;
    }
  }
}
</style>
