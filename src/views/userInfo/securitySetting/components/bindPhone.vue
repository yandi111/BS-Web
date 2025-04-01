<!-- 绑定手机 -->
<template>
  <div class="user-form">
    <div class="title-context">
      <i class="el-icon-arrow-left" @click="handleSuccess"></i>
      <span class="title" @click="handleSuccess">{{
        $t("userInfo.绑定手机")
      }}</span>
    </div>
    <div class="form-container">
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-position="top"
      >
        <el-form-item prop="contact" :label="$t('userInfo.请输入手机号码')">
          <!-- <el-input
            v-model="formData.contact"
            class="input-with-select form-input"
            :placeholder="$t('userInfo.请输入手机号码')"
          >
            <div
              slot="prefix"
              class="prefix-content"
              @click="popperShow = !popperShow"
            >
              <div class="text">{{ activeItem }}</div>
              <i class="custom-icon el-icon-arrow-down"></i>
            </div>
          </el-input>
          <el-popover
            placement="bottom"
            width="480"
            :offset="2"
            trigger="click"
            :visible-arrow="true"
            v-model="popperShow"
          >
            <div class="popper-content">
              <div class="input-content">
                <el-input v-model="areaName" :placeholder="$t('userInfo.搜索')"></el-input>
              </div>
              <ul>
                <li
                  v-for="(item, index) in phoneAreaList"
                  :key="index"
                  @click="handleChoose(item)"
                  :style="{
                    'background-color':
                      item.value === activeItem ? '#EDF1FF' : '',
                  }"
                >
                  {{ item.label }}（{{ item.value }}）
                </li>
              </ul>
            </div>
          </el-popover> -->
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
                v-model="formData.contact"
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
        <el-form-item prop="captcha" :label="$t('userInfo.请输入验证码')">
          <send-code
            :params="{
              contact: this.activeItem + ' ' + this.formData.contact,
              authToken: this.authToken,
              bizType: 6,
            }"
            :codeTime="codeTime"
            :sendMsgDisabled="sendMsgDisabled"
            @onInput="phoneInput"
            @pthoneCode="pthoneCode"
          ></send-code>
          <div class="noreceive-message">
            {{
              $t("userInfo.输入发送到") +
              protectPhone +
              $t("userInfo.的6位验证码")
            }}
            <span @click="noReceiveMsg">{{
              $t("userInfo.未收到验证码？")
            }}</span>
          </div>
        </el-form-item>
        <!-- 认证项 -->
        <el-form-item
          prop="authPhone"
          :label="$t('userInfo.手机')"
          v-if="checkResult && checkResult.authPhone"
        >
          <send-code
            :field="formData.authPhone"
            :params="{ captchaType: 1, authToken: this.authToken, bizType: 6 }"
          ></send-code>
        </el-form-item>
        <el-form-item
          prop="emailCode"
          :label="$t('userInfo.邮箱')"
          v-if="checkResult && checkResult.authEmail"
        >
          <email-send
            :params="{ captchaType: 2, authToken: this.authToken, bizType: 6 }"
            :emailCodeTime="emailCodeTime"
            :emailSendMsgDisabled="emailSendMsgDisabled"
            @onInput="emailInput"
            @emailCode="emailCode"
          ></email-send>
        </el-form-item>
        <el-form-item
          prop="authCode"
          :label="$t('userInfo.谷歌认证')"
          v-if="checkResult?.authGoogleAuth"
        >
          <!-- <send-code :field="formData.authCode"></send-code> -->
          <el-input
            v-model="formData.authCode"
            class="input-with-select form-input"
            :placeholder="$t('userInfo.请输入谷歌验证码')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submit">{{
            $t("userInfo.提交")
          }}</el-button>
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
import { securityPhone } from "@/libs/utils";
import SuccessModal from "@/components/successModal.vue";
import { bindPhone, switchStatus, countryList } from "@/api/user.js";
import { authItem, captchaSend, commonSendCaptcha } from "@/api/common.js";
import SendCode from "./sendCode.vue";
import EmailSend from "./emailSend.vue";
import PhoneCode from "@/components/phoneCode";
export default {
  name: "BindPhone",
  components: {
    SuccessModal,
    SendCode,
    EmailSend,
    PhoneCode,
  },
  computed: {
    protectPhone() {
      return this.formData.contact && securityPhone(this.formData.contact);
    },
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
      authToken: "",
      checkResult: null,
      areaName: "",
      activeItem: "+86",
      popperShow: false,
      showSuccess: false,
      showVeriy: false,
      timer: null, // 计时器
      // codeTime: null, // 发送验证码倒计时
      // sendMsgDisabled: false, // 是否显示发送验证码按钮
      formData: {
        contact: "", //手机号
        captcha: "", //新手机验证码
        authToken: "", //认证token
        emailCode: "", //邮箱验证码
        authCode: "", //Google验证码
      },
      rules: {
        contact: [{ required: true, validator: validPhone, trigger: "change" }],
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
      },
      phoneAreaList: [],

      timer: null, // 计时器(手机验证码计时器)
      timer2: null, //短信验证码计时器
      codeTime: null, // 发送验证码倒计时
      sendMsgDisabled: false, // 是否显示发送验证码按钮
      //是否绑定手机号、邮箱、谷歌认证是否开启
      phone: false,
      email: false,
      googleAuth: false,
      //邮箱
      emailSendMsgDisabled: false,
      emailCodeTime: null,
    };
  },
  created() {
    //监听点击事件
    document.addEventListener("click", () => {
      this.popperShow = false;
      this.$refs.phoneRefs.closeFn();
    });
    this.getCountryList();
    // 获取认证token
    this.authItem();
    this.switchStatus(); //获取手机邮箱绑定状态
  },
  methods: {
    handleChoose(item) {
      this.activeItem = item.value;
    },
    // 获取认证token
    authItem() {
      authItem({ data: 6 }).then((res) => {
        // 认证检查项参数
        this.checkResult = res.data;
        // 发送短信验证码参数
        this.authToken = res.data?.authToken;
      });
    },
    //根据状态判断是否绑定手机
    switchStatus() {
      switchStatus().then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.phone = res.data.data.phone;
            this.email = res.data.data.email;
          }
        }
      });
    },
    // 提交
    submit() {
      let params = {
        contact: this.activeItem + " " + this.formData.contact,
        captcha: this.formData.captcha,
        authToken: this.checkResult?.authToken,
        emailCode: this.formData.emailCode,
        authCode: this.formData.authCode,
      };
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          bindPhone(params).then((res) => {
            if (res && res.status === 200) {
              if (res.data && res.data.success) {
                // this.$emit("next");
                //绑定成功之后，1提示绑定成功弹窗，2返回安全设置页面
                this.showSuccess = true;
                this.$store.dispatch("getUserInfo");
              }
            }
          });
        }
      });
    },
    //输入值 手机验证码
    phoneInput(e) {
      this.formData.captcha = e;
    },
    //输入值 邮箱验证码
    emailInput(e) {
      this.formData.emailCode = e;
    },

    //获取未绑定手机验证码
    pthoneCode() {
      //手机未绑定获取验证码
      if (!this.phone) {
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
        captchaSend({
          contact: this.activeItem + " " + this.formData.contact,
          authToken: this.authToken,
          bizType: 6,
        })
          .then(() => {
            // 成功
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    //获取已绑定邮箱验证码
    emailCode() {
      if (this.email) {
        //已登录 获取邮箱验证码
        if (!this.timer2) {
          this.emailSendMsgDisabled = true;
          this.emailCodeTime = TIME_COUNT;
          this.timer2 = setInterval(() => {
            if (this.emailCodeTime > 1 && this.emailCodeTime <= TIME_COUNT) {
              this.emailCodeTime--;
            } else {
              this.emailSendMsgDisabled = false;
              clearInterval(this.timer2);
              this.timer2 = null;
            }
          }, 1000);
        }
        commonSendCaptcha({
          captchaType: 2,
          authToken: this.authToken,
          bizType: 6,
        })
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
      }
    },
    //获取国家列表
    getCountryList() {
      countryList().then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            const { data } = res.data;
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
    handleCode() {
      this.popperShow = !this.popperShow;
      this.$refs.phoneRefs.showFn();
    },
    shangeData(item) {
      this.activeItem = item.value;
      this.popperShow = false;
      this.$refs["ruleForm"].resetFields();
    },
    // 验证表单
    // handleVerifyForm(data) {
    //   let params = {
    //     contact: this.activeItem + " " + this.formData.contact,
    //     captcha: this.formData.captcha,
    //     authToken: this.checkResult?.authToken,
    //     emailCode: data.emailCode,
    //     authCode: data.googleCode,
    //   };
    //   bindPhone(params).then((res) => {
    //     if (res && res.status === 200) {
    //       if (res.data && res.data.success) {
    //         this.showSuccess = true;
    //       }
    //     }
    //   });
    // },
    // 成功返回页面
    handleSuccess() {
      this.$emit("success");
      this.$emit("updateStatus");
    },
    // 未收到短信验证码
    noReceiveMsg() {
      this.$emit("msg", this.formData.contact);
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

  // .prefix-content {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   width: 85px;
  //   height: 50px;
  //   line-height: 50px;
  //   position: relative;
  //   padding: 0 10px;
  //   cursor: pointer;
  //   &::before {
  //     position: absolute;
  //     content: "";
  //     width: 1px;
  //     height: 40%;
  //     top: 30%;
  //     right: 0;
  //     background-color: #333333;
  //     z-index: 999;
  //     opacity: 0.4;
  //   }
  //   .text {
  //     font-size: 14px;
  //     font-family: PingFangSC-Regular, PingFang SC;
  //     font-weight: 400;
  //     color: #333333;
  //   }
  //   .custom-icon {
  //     font-size: 12px;
  //     color: #272636;
  //   }
  // }
  .phone-form {
    display: flex;
    .phone-l {
      min-width: 80px;
      display: flex;
      align-items: center;
      height: 50px;
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
    .noreceive-message {
      text-align: left;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #8992a6;
      > span {
        color: $colorB;
        cursor: pointer;
        padding-left: 10px;
      }
    }
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

  ::v-deep .form-input {
    > .el-input__inner {
      height: 50px;
      border: none;
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
</style>
