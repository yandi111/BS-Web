<!-- 资金验证表单 -->
<template>
  <div>
    <common-modal
      :title="$t('property.验证')"
      width="600px"
      :show="isShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      :appendToBody="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_content>
        <div class="form-common">
          <el-form
            :model="formData"
            :rules="rules"
            ref="verifyForm"
            label-position="top"
          >
            <el-form-item
              prop="kl"
              :label="$t('property.口令密码')"
              v-if="isNeedApi"
              style="position: relative"
            >
              <span
                style="
                  position: absolute;
                  top: -50px;
                  left: 70px;
                  color: #5271ff;
                  font-size: 16px;
                  cursor: pointer;
                "
                @click="forgetKl"
                >{{ $t("property.忘记密码") }}</span
              >
              <el-input
                v-model="formData.kl"
                type="password"
                show-password
                autocomplete="off"
                class="input-with-select"
                :placeholder="$t('property.请输入口令密码')"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :label="$t('property.资金密码')"
              v-if="isNeedSecret"
            >
              <el-input
                v-model="formData.password"
                type="password"
                autocomplete="off"
                class="input-with-select"
                :placeholder="
                  tradePasswordStatus == 1
                    ? $t('property.请输入资金密码')
                    : $t('property.请绑定资金密码')
                "
                :disabled="tradePasswordStatus == 0"
              >
                <span
                  class="code"
                  slot="suffix"
                  @click="bindFunds"
                  v-if="tradePasswordStatus == 0"
                  >{{ $t("property.去绑定") }}</span
                >
              </el-input>
            </el-form-item>
            <el-form-item
              prop="phoneCode"
              :label="$t('property.手机验证')"
              v-if="isCheckObj.authPhone"
            >
              <el-input
                v-model="formData.phoneCode"
                autocomplete="off"
                class="input-with-select"
                :placeholder="
                  phoneStatus === 1
                    ? $t('property.请输入短信验证码')
                    : $t('property.请绑定手机')
                "
                maxlength="6"
                :disabled="phoneStatus == 0"
              >
                <span
                  v-if="phoneStatus == 0"
                  class="code"
                  slot="suffix"
                  @click.stop="toBindPhone"
                  >{{ $t("property.去绑定") }}</span
                >
                <div slot="suffix" v-else>
                  <span
                    v-if="!sendMsgDisabled"
                    @click="getPhoneCode"
                    class="code"
                    >{{ $t("property.获取验证码") }}</span
                  >
                  <span class="code resend" v-else="sendMsgDisabled">{{
                    $t("property.重新发送") + codeTime + "s"
                  }}</span>
                </div>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="emailCode"
              :label="$t('property.邮箱验证')"
              v-if="isCheckObj.authEmail"
            >
              <el-input
                v-model="formData.emailCode"
                autocomplete="off"
                class="input-with-select"
                :placeholder="
                  emailStatus == 1
                    ? $t('property.请输入邮箱验证码')
                    : $t('property.请绑定邮箱')
                "
                :disabled="emailStatus === 0"
                maxlength="6"
              >
                <span
                  v-if="emailStatus == 0"
                  class="code"
                  slot="suffix"
                  @click.stop="toBindEmail"
                  >{{ $t("property.去绑定") }}</span
                >
                <div slot="suffix" v-else>
                  <span
                    v-if="!sendMsgDisabled1"
                    @click="getEmailCode"
                    class="code"
                    >{{ $t("property.获取验证码") }}</span
                  >
                  <span class="code resend" v-else="sendMsgDisabled1">{{
                    $t("property.重新发送") + codeTime1 + "s"
                  }}</span>
                </div>
              </el-input>
            </el-form-item>
            <!-- <el-form-item prop="email" label="邮箱验证">
              <el-input v-model="formData.email" type="password" autocomplete="off" class="input-with-select" placeholder="请输入您的邮箱"></el-input>
            </el-form-item> -->
            <el-form-item
              prop="authCode"
              :label="$t('property.谷歌认证')"
              v-if="isCheckObj.authGoogleAuth"
            >
              <el-input
                v-model="formData.authCode"
                autocomplete="off"
                class="input-with-select"
                :placeholder="
                  googleAuthStatus == 1
                    ? $t('property.请输入谷歌验证码')
                    : $t('property.请绑定谷歌认证')
                "
                :disabled="googleAuthStatus == 0"
                maxlength="6"
              >
                <span
                  v-if="googleAuthStatus == 0"
                  class="code"
                  slot="suffix"
                  @click.stop="toBindGoogle"
                  >{{ $t("property.去绑定") }}</span
                >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <template #dia_footer>
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleVerfyNext"
          >{{ $t("property.下一步") }}</el-button
        >
      </template>
    </common-modal>
  </div>
</template>

<script>
const TIME_COUNT = 59;
import CommonModal from "@/components/commonModal/index.vue";
import { commonSendCaptcha } from "@/api/common.js";
import { switchStatus } from "@/api/user.js";
export default {
  name: "",
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
      default: true,
    },
    isNeedEmail: {
      type: Boolean,
      default: true,
    },
    isNeedPhone: {
      type: Boolean,
      default: true,
    },
    isNeedGoogle: {
      type: Boolean,
      default: true,
    },
    isNeedApi: {
      type: Boolean,
      default: true,
    },
    phoneStatus: {
      type: Number,
      default: 0,
    },
    emailStatus: {
      type: Number,
      default: 0,
    },
    googleAuthStatus: {
      type: Number,
      default: 0,
    },
    tradePasswordStatus: {
      type: Number,
      default: 0,
    },
    authToken: {
      type: String,
      default: "",
    },
    isCheckObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    //资金密码校验
    // const validPwd = (rule, value, callback) => {
    //   const reg =
    //     /((^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=.])(?=\S+$).{8,15}$))/;
    //   if (!value) {
    //     callback(new Error("请输入资金密码"));
    //   } else {
    //     if (value.length < 8 || value.length > 16) {
    //       callback(
    //         "密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
    //       );
    //     } else {
    //       if (reg.test(value)) {
    //         callback();
    //       } else {
    //         callback(
    //           new Error(
    //             "密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
    //           )
    //         );
    //       }
    //     }
    //   }
    // };
    return {
      status: null,
      timer: null, // 计时器
      codeTime: null, // 发送验证码倒计时
      sendMsgDisabled: false, // 是否显示发送验证码按钮
      timer1: null, // 计时器
      codeTime1: null, // 发送验证码倒计时
      sendMsgDisabled1: false, // 是否显示发送验证码按钮
      formData: {
        password: "", //资金密码
        // kl: "",//口令密码
        phoneCode: "",
        emailCode: "",
        authCode: "",
      },
      rules: {
        // password: [{ required: true, validator: validPwd, trigger: "blur" }],
        password: [
          {
            required: true,
            message:
              "密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号",
            trigger: "change",
          },
        ],
        phoneCode: [
          { required: true, message: "手机验证码不能为空", trigger: "change" },
        ],
        authCode: [
          { required: true, message: "谷歌验证码不能为空", trigger: "change" },
        ],
        emailCode: [
          { required: true, message: "邮箱验证码不能为空", trigger: "change" },
        ],
        // kl: [{ required: true, message: "口令不能为空", trigger: "change" }],
      },
    };
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
    //绑定手机
    toBindPhone() {
      this.$router.push("/user/securitySetting");
    },
    getPhoneCode() {
      let params = {
        captchaType: 1, //1手机
        authToken: this.authToken,
        bizType: 22, //22-提现；
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
    // 去绑定邮箱
    toBindEmail() {
      this.$router.push("/user/securitySetting");
    },
    //获取邮箱验证码
    getEmailCode() {
      let params = {
        captchaType: 2, //2邮箱
        authToken: this.authToken,
        bizType: 22, //22-提现；
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
    //绑定资金密码
    bindFunds() {
      this.$router.push("/user/securitySetting");
    },
    //绑定谷歌
    toBindGoogle() {
      this.$router.push("/user/securitySetting");
    },
    // 忘记密码
    forgetKl() {
      this.$emit("forget");
    },
    // 验证下一步
    handleVerfyNext() {
      this.$refs["verifyForm"].validate((valid) => {
        if (valid) {
          this.$emit("update:isShow", false);
          this.$emit("next", this.formData);
        }
      });
    },
    //初始化验证参数
    initParams() {
      this.formData = {
        password: "", //资金密码
        // kl: "",//口令密码
        phoneCode: "",
        emailCode: "",
        authCode: "",
      };
    },
    //初始化定时器
    initTimer() {
      this.sendMsgDisabled = false;
      clearInterval(this.timer);
      this.timer = null;
      this.sendMsgDisabled1 = false;
      clearInterval(this.timer1);
      this.timer1 = null;
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
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
}
</style>
