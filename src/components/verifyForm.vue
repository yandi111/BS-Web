<!-- 资金验证表单 -->
<template>
  <div>
    <common-modal
      :title="$t('userInfo.验证')"
      width="600px"
      :show="isShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      :appendToBody="true"
      @cancel="handleCancel"
    >
      <template #dia_content>
        
        <div class="form-common">
          <el-form
            :model="formData"
            :rules="rules"
            ref="verifyForm"
            label-position="top"
          >
            <!-- 新的谷歌验证 -->
            <el-form-item
              prop="newGoogleCode"
              :label="$t('userInfo.新的谷歌认证')"
              v-if="isNeedNewGoogle"
            >
              <el-input
                v-model="formData.newGoogleCode"
                autocomplete="off"
                class="input-with-select"
                :placeholder="$t('userInfo.验证码')"
                maxlength="6"
                type="number"
                @input="newGoogleChange"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="kl"
              :label="$t('userInfo.API密码')"
              v-if="isNeedApi"
              style="position: relative"
            >
              <span class="forget pointer" @click="forgetKl">{{
                $t("userInfo.忘记密码？")
              }}</span>
              <el-input
                v-model="formData.kl"
                type="password"
                show-password
                autocomplete="off"
                class="input-with-select"
                :placeholder="$t('userInfo.请输入API密码')"
                @input="apiChange"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="pwd"
              :label="$t('userInfo.资金密码')"
              v-if="isNeedSecret"
            >
              <el-input
                v-model="formData.pwd"
                type="password"
                show-password
                autocomplete="off"
                class="input-with-select"
                :placeholder="$t('userInfo.请输入您的资金密码')"
                @input="pwdChange"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              :label="$t('userInfo.手机验证')"
              v-if="isNeedPhone"
            >
              <el-input
                v-model="formData.code"
                autocomplete="off"
                class="input-with-select"
                :placeholder="$t('userInfo.请输入短信验证码')"
                maxlength="6"
                @input="phoneChange"
                type="number"
              >
                <span
                  class="code"
                  slot="suffix"
                  @click.stop="getCode(codeType)"
                  v-if="!sendMsgDisabled"
                  >{{ $t("userInfo.获取验证码") }}</span
                >
                <span
                  class="code resend"
                  slot="suffix"
                  v-else
                  >{{ $t("userInfo.重新发送") + codeTime + "s" }}</span
                >
              </el-input>
            </el-form-item>
            <el-form-item
              prop="emailCode"
              :label="$t('userInfo.邮箱验证')"
              v-if="isNeedEmail"
            >
              <el-input
                v-model="formData.emailCode"
                autocomplete="off"
                class="input-with-select"
                :placeholder="$t('userInfo.请输入邮箱验证码')"
                maxlength="6"
                @input="emailChange"
                type="number"
              >
                <span
                  class="code"
                  slot="suffix"
                  @click.stop="getEmailCode(codeType)"
                  v-if="!sendMsgDisabled1"
                  >{{ $t("userInfo.获取验证码") }}</span
                >
                <span
                  class="code resend"
                  slot="suffix"
                  v-else
                  >{{ $t("userInfo.重新发送") + codeTime1 + "s" }}</span
                >
              </el-input>
            </el-form-item>
            <!-- <el-form-item prop="email" label="邮箱验证">
              <el-input v-model="formData.email" type="password" autocomplete="off" class="input-with-select" placeholder="请输入您的邮箱"></el-input>
            </el-form-item> -->
            <el-form-item
              prop="googleCode"
              :label="$t('userInfo.谷歌认证')"
              v-if="isNeedGoogle"
            >
              <el-input
                v-model="formData.googleCode"
                autocomplete="off"
                class="input-with-select"
                :placeholder="$t('userInfo.验证码')"
                maxlength="6"
                @keyup.enter.native="handleVerfyNext"
                @input="authChange"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <template #dia_footer>
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleVerfyNext"
          >{{ $t("userInfo.下一步") }}</el-button
        >
      </template>
    </common-modal>
  </div>
</template>

<script>
const TIME_COUNT = 59;
import CommonModal from "@/components/commonModal/index.vue";
import { commonSendCaptcha } from "@/api/common";
import { switchStatus } from "@/api/user.js";
export default {
  name: "VerifyForm",
  components: {
    CommonModal,
  },
  created() {
    this.switchStatus();
  },
  props: {
   
    isShow: {
      type: Boolean,
      default: false,
    },
    isNeedSecret: {
      type: Boolean,
      default: false,
    },
    isNeedEmail: {
      type: Boolean,
      default: false,
    },
    isNeedPhone: {
      type: Boolean,
      default: false,
    },
    isNeedNewGoogle: {
      type: Boolean,
      default: false,
    },
    isNeedGoogle: {
      type: Boolean,
      default: false,
    },
    isNeedApi: {
      type: Boolean,
      default: false,
    },
    authToken: {
      type: String,
      default: "",
    },
    //获取验证码类型
    codeType: {
      type: Number,
    },
  },
  data() {
    return {
      status: null,
      timer: null, // 计时器
      codeTime: null, // 发送验证码倒计时
      sendMsgDisabled: false, // 是否显示发送验证码按钮
      timer1: null, // 计时器
      codeTime1: null, // 发送验证码倒计时
      sendMsgDisabled1: false, // 是否显示发送验证码按钮
      formData: {
        kl: "",
        pwd: "",
        code: "",
        googleCode: null,
        emailCode: "",
      },
      rules: {
        pwd: [
          {
            required: true,
            message: this.$t("userInfo.资金密码不能为空"),
            trigger: "change",
          },
        ],
        code: [
          {
            required: true,
            message: this.$t("userInfo.手机验证码不能为空"),
            trigger: "change",
          },
        ],
        googleCode: [
          {
            required: true,
            message: this.$t("userInfo.谷歌验证码不能为空"),
            trigger: "change",
          },
        ],
        emailCode: [
          {
            required: true,
            message: this.$t("userInfo.邮箱验证码不能为空"),
            trigger: "change",
          },
        ],
        kl: [
          {
            required: true,
            message: this.$t("userInfo.API密码不能为空"),
            trigger: "change",
          },
        ],
      },
    };
  },
  watch:{
    'formData.googleCode':{
      handler(val){
        this.formData.googleCode = val.replace(/[^\d]/g,'')  
      }
    }
  },
  mounted() {},
  methods: {
    // 开关设置
    switchStatus() {
      switchStatus().then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.status = res.data.data;
          }
        }
      });
    },
    // 获取手机验证码
    async getCode(type) {
      let params = {
        captchaType: 1,
        authToken: this.authToken,
        bizType: type, //创建apikey
      };
      const res = commonSendCaptcha(params);
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
      if (res && res.status === 200) {
        if (res.data && res.data.success) {
        }
      }
    },
    // 获取邮箱验证码
    getEmailCode(type) {
      let params = {
        captchaType: 2,
        authToken: this.authToken,
        bizType: type, //创建apikey
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
    // 忘记密码
    forgetKl() {
      this.$emit("forget");
    },
    // 验证下一步
    handleVerfyNext() {
      this.$refs["verifyForm"].validate((valid) => {
        if (valid) {
          // this.$emit("update:isShow", false);
          this.$emit("next", this.formData);
        }
      });
    },
    //输入api密码
    apiChange(val) {
      this.$emit("apiChange", val);
    },
    //输入手机验证码
    phoneChange(val) {
      this.$emit("phoneChange", val);
    },
    //输入邮箱验证码
    emailChange(val) {
      this.$emit("emailChange", val);
    },
    //输入谷歌验证码
    authChange(val) {
      this.$emit("authChange", val);
    },
    //输入资金密码
    pwdChange(val) {
      this.$emit("pwdChange", val);
    },
    //新的谷歌输入
    newGoogleChange(val) {
      this.$emit("newGoogleChange", val);
    },
    //初始化参数
    resetParams() {
      this.formData = {
        kl: "",
        pwd: "",
        code: "",
        googleCode: "",
        emailCode: "",
      };
    },
    //清除定时器
    handleCancel() {
      this.$emit("update:isShow", false);
      this.clearTimeoutFn();
    },
    clearTimeoutFn() {
      clearInterval(this.timer);
      this.sendMsgDisabled = false;
      this.timer = null;
      clearInterval(this.timer1);
      this.timer1 = null;
      this.sendMsgDisabled1 = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.code {
  display: inline-block;
  width: 100px;
  height: 30px;
  margin: 5px 0 0 0;
  cursor: pointer;
  line-height: 30px;
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

// 表格padding
.form-common {
  padding: 0 30px;
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
}
::v-deep .el-form .el-form-item {
  position: relative;
  .forget {
    position: absolute;
    right: 0px;
    top: -50px;
    color: var(--theme-color);
    // background-color: red;
  }
}
</style>
