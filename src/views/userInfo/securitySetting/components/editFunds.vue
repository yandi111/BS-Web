<!-- 修改资金密码 -->
<template>
  <div>
    <div class="user-form" v-if="tabIndex === 1">
      <div class="title-context">
        <i class="el-icon-arrow-left" @click="handleSuccess"></i>
        <span class="title" @click="handleSuccess">{{ $t('userInfo.修改资金密码') }}</span>
      </div>
      <div class="form-container">
        <el-form
          label-position="top"
          :model="formData"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item>
            <div class="tip-text">
              {{ $t('userInfo.*为了您的资金安全，修改密码后24小时不允许提币及（提现和OTC卖币）') }}
              
            </div>
          </el-form-item>
          <el-form-item prop="oldPassword" :label="$t('userInfo.当前资金密码')">
            <el-input
              class="form-input"
              :type="flag ? 'text' : 'password'"
              v-model="formData.oldPassword"
              autocomplete="off"
              :placeholder=" $t('userInfo.当前资金密码') "
            >
              <div slot="suffix" @click="onChangeEye(1)">
                <img
                  class="icon-style"
                  v-if="!flag"
                  src="@/assets/images/eye-close.png"
                  alt=""
                />
                <img
                  class="icon-style"
                  v-if="flag"
                  src="@/assets/images/eye-open.png"
                  alt=""
                />
              </div>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :label=" $t('userInfo.新资金密码') ">
            <el-input
              class="form-input"
              :type="flag2 ? 'text' : 'password'"
              v-model="formData.password"
              autocomplete="off"
              :placeholder="$t('userInfo.请输入资金密码')"
            >
              <div slot="suffix" @click="onChangeEye(2)">
                <img
                  class="icon-style"
                  v-if="!flag2"
                  src="@/assets/images/eye-close.png"
                  alt=""
                />
                <img
                  class="icon-style"
                  v-if="flag2"
                  src="@/assets/images/eye-open.png"
                  alt=""
                />
              </div>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" :label="$t('userInfo.确认资金密码')">
            <el-input
              class="form-input"
              :type="flag3 ? 'text' : 'password'"
              v-model="formData.confirmPassword"
              autocomplete="off"
              :placeholder=" $t('userInfo.请确认资金密码') "
            >
              <div slot="suffix" @click="onChangeEye(3)">
                <img
                  class="icon-style"
                  v-if="!flag3"
                  src="@/assets/images/eye-close.png"
                  alt=""
                />
                <img
                  class="icon-style"
                  v-if="flag3"
                  src="@/assets/images/eye-open.png"
                  alt=""
                />
              </div>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="saveBtn"
              >{{ $t('userInfo.提交') }}</el-button
            >
            <span class="forget-funds" @click="forgetFunds"
              >{{ $t('userInfo.忘记资金密码？') }}</span
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 修改资金密码验证码 -->
    <EditFundsVerify
      v-if="tabIndex === 2"
      :checkData="checkData"
      :authToken.sync="authToken"
      :bizTypeCode.sync="bizTypeCode"
      @phoneChange="phoneChange"
      @emailChange="emailChange"
      @authChange="authChange"
      @editFundsSubmit="editFundsSubmit"
      @back="handleBack"
    />
    <success-modal
      :is-show.sync="showSuccess"
      :text="$t('userInfo.修改资金密码成功') "
      @next="handleSuccess"
    ></success-modal>
  </div>
</template>

<script>
import VerifyForm from "@/components/verifyForm.vue";
import SuccessModal from "@/components/successModal.vue";
import EditFundsVerify from "./editFundsVerify.vue";
import { checkTradePwd, updateTradePwd } from "@/api/user.js";
export default {
  name: "EditFunds",
  components: {
    VerifyForm,
    SuccessModal,
    EditFundsVerify,
  },
  data() {
    //旧密码验证
    // const validOldPwd = (rule, value, callback) => {
      // const reg =
      //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}\[\]:;"'<>?,.\/])[^\s\n]{8,15}$/;
      // if (!value) {
      //   callback(new Error("请输入密码"));
      // } else {
      //   if (value.length < 8 || value.length > 15) {
      //     callback(
      //       "密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
      //     );
      //   } else {
      //     if (reg.test(value)) {
      //       callback();
      //     } else {
      //       callback(
      //         new Error(
      //           "密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
      //         )
      //       );
      //     }
      //   }
      // }
      //资金密码新正则
    //   const reg = /^[0-9]{6}$/;
    //   if (!value) {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (value.length !== 6) {
    //       callback("请设置6位数字资金密码");
    //     } else {
    //       if (reg.test(value)) {
    //         callback();
    //       } else {
    //         callback(new Error("请设置6位数字资金密码"));
    //       }
    //     }
    //   }
    // };
    // 密码验证
    const validPwd = (rule, value, callback) => {
      // const reg =
      //  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}\[\]:;"'<>?,.\/])[^\s\n]{8,15}$/;
      // if (!value) {
      //   callback(new Error("请输入密码"));
      // } else {
      //   if (value.length < 8 || value.length > 15) {
      //     callback(
      //       "密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
      //     );
      //   } else {
      //     if (reg.test(value)) {
      //       callback();
      //     } else {
      //       callback(
      //         new Error(
      //           "密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
      //         )
      //       );
      //     }
      //   }
      // }
      //资金密码新正则
      const reg = /^[0-9]{6}$/;
      if (!value) {
        callback(new Error(this.$t('userInfo.请输入资金密码') ));
      } else {
        if (value.length !== 6) {
          callback(this.$t('userInfo.请设置6位数字资金密码'));
        } else {
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error(this.$t('userInfo.请设置6位数字资金密码')));
          }
        }
      }
    };

    // 密码验证
    const validPwd2 = (rule, value, callback) => {
      // const reg =
      //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}\[\]:;"'<>?,.\/])[^\s\n]{8,15}$/;
      // if (!value) {
      //   callback(new Error("请再次输入密码"));
      // } else {
      //   if (value.length < 8 || value.length > 15) {
      //     callback(
      //       "密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
      //     );
      //   } else {
      //     if (reg.test(value)) {
      //       if (value !== this.formData.password) {
      //         callback(new Error("两次输入密码不一致!"));
      //       } else {
      //         callback();
      //       }
      //     } else {
      //       callback(
      //         new Error(
      //           "密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
      //         )
      //       );
      //     }
      //   }
      // }
      //资金密码新正则
      const reg = /^[0-9]{6}$/;
      if (!value) {
        callback(new Error(this.$t('userInfo.请再次输入密码')));
      } else {
        if (value.length !== 6) {
          callback(
            this.$t('userInfo.请设置6位数字资金密码')
          );
        } else {
          if (reg.test(value)) {
            if (value !== this.formData.password) {
              callback(new Error(this.$t('userInfo.两次输入密码不一致!')));
            } else {
              callback();
            }
          } else {
            callback(
              new Error(
                this.$t('userInfo.请设置6位数字资金密码')
              )
            );
          }
        }
      }
    };
    return {
      tabIndex: 1,
      showVeriy: false,
      showSuccess: false,
      flag: false,
      flag2: false,
      flag3: false,
      //输入验证码
      bizTypeCode: 10,
      checkData: {},
      authToken: "",
      phoneCode: "",
      emailCode: "",
      authCode: "",
      formData: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        //旧密码不用校验
         oldPassword: [
          { required: true, message: this.$t('userInfo.请输入资金密码'), trigger: 'change' }
        ],
        // oldPassword: [
        //   { required: true, validator: validOldPwd, trigger: "change" },
        // ],
        password: [{ required: true, validator: validPwd, trigger: "change" }],
        confirmPassword: [
          { required: true, validator: validPwd2, trigger: "change" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    onChangeEye(index) {
      switch (index) {
        case 1:
          this.flag = !this.flag;
          break;
        case 2:
          this.flag2 = !this.flag2;
          break;
        case 3:
          this.flag3 = !this.flag3;
          break;
        default:
      }
    },
    // 提交
    saveBtn() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let res = await checkTradePwd({
            data: this.$getEncryptCode(this.formData.oldPassword),
          });
          if (res && res.status === 200) {
            if (res.data && res.data.success) {
              this.checkData = res.data.data;
              this.authToken = res.data?.data?.authToken;
              this.tabIndex = 2;
            }
          }
        }
      });
    },
    //子组件输入值
    phoneChange(val) {
      this.phoneCode = val;
    },
    emailChange(val) {
      this.emailCode = val;
    },
    authChange(val) {
      this.authCode = val;
    },
    editFundsSubmit() {
      //修改资金密码
      const params = {
        password: this.$getEncryptCode(this.formData.password),
        authToken: this.authToken,
        phoneCode: this.phoneCode,
        emailCode: this.emailCode,
        authCode: this.authCode,
      };
      updateTradePwd(params).then((res) => {
        if (res.data && res.data.success) {
          this.showSuccess = true;
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
      this.$emit("updateStatus");
    },
    // 忘记资金密码
    forgetFunds() {
      this.$emit("forget");
    },
    //验证返回
    handleBack() {
      this.tabIndex = 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-style {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-top: 14px;
  margin-right: 5px;
  cursor: pointer;
}
.user-form {
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

  ::v-deep .form-input {
    > .el-input__inner {
      height: 50px;
      // border: none;
      background-color: #f4f5f7;
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
    .tip-text {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #333;
      height: 40px;
      line-height: 40px;
      background: #ffd4d4;
      border-radius: 3px;
      padding-left: 22px;
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

  .forget-funds {
    display: inline-block;
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #90ff00;
    line-height: 20px;
    text-align: right;
    cursor: pointer;
  }
}
</style>
