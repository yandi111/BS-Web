<!-- 修改登录密码 -->
<template>
  <div>
    <div class="user-form" v-if="tabIndex === 1">
      <div class="title-context">
        <i class="el-icon-arrow-left" @click="handleback"></i>
        <span class="title" @click="handleback">{{  $t('userInfo.修改登录密码')  }}</span>
      </div>
      <div class="form-container">
        <!-- <p class="tip-text">
          *为了您的资金安全，修改密码后24小时不允许提币及(提现和OTC卖币)
        </p> -->
        <el-form
          label-position="top"
          :model="formData"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item prop="oldPassword" :label=" $t('userInfo.原始登录密码') ">
            <el-input
              :type="flag ? 'text' : 'password'"
              v-model="formData.oldPassword"
              autocomplete="off"
              :placeholder=" $t('userInfo.请输入旧密码') "
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
          <el-form-item prop="newPassword" :label=" $t('userInfo.新密码登录') ">
            <el-input
              :type="flag2 ? 'text' : 'password'"
              v-model="formData.newPassword"
              autocomplete="off"
              :placeholder=" $t('userInfo.请输入新密码') "
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
          <el-form-item prop="confirmPassword" :label="$t('userInfo.确认密码')">
            <el-input
              :type="flag3 ? 'text' : 'password'"
              v-model="formData.confirmPassword"
              autocomplete="off"
              :placeholder=" $t('userInfo.确认新密码') "
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
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 修改密码验证页面 -->
    <EditPwdVerify
      :checkData="checkData"
      :authToken.sync="authToken"
      @phoneChange="phoneChange"
      @emailChange="emailChange"
      @authChange="authChange"
      @setPwdSubmit="setPwdSubmit"
      @onBack="onBack"
      v-if="tabIndex === 2"
    />
    <success-modal
      :is-show.sync="showSuccess"
      :text="$t('userInfo.密码修改成功')"
      :btnText="$t('userInfo.重新登录')"
      @next="handleSuccess"
    ></success-modal>
  </div>
</template>

<script>
import { checkPwd, setPwd } from "@/api/user.js";
import EditPwdVerify from "./editPwdVerify.vue";
import SuccessModal from "@/components/successModal.vue";
import { removeToken } from "@/libs/utils";
export default {
  name: "",
  components: {
    EditPwdVerify,
    SuccessModal,
  },
  data() {
    // 旧密码验证
    const validPwdOld = (rule, value, callback) => {
      const reg =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}\[\]:;"'<>?,.\/])[^\s\n]{8,15}$/;
      if (!value) {
        callback(new Error(this.$t('userInfo.请输入旧密码')));
      } else {
        if (value.length < 8 || value.length > 15) {
          callback(
            this.$t('userInfo.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号')
          );
        } else {
          if (reg.test(value)) {
            callback();
          } else {
            callback(
              new Error(
            this.$t('userInfo.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号')
              )
            );
          }
        }
      }
    };
    // 密码验证
    const validPwd = (rule, value, callback) => {
      const reg =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}\[\]:;"'<>?,.\/])[^\s\n]{8,15}$/;
      if (!value) {
        callback(new Error(this.$t('userInfo.请输入新密码')));
      } else {
        if (value.length < 8 || value.length > 15) {
          callback(
            this.$t('userInfo.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号')
          );
        } else {
          if (reg.test(value)) {
            callback();
          } else {
            callback(
              new Error(
                this.$t('userInfo.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号')
              )
            );
          }
        }
      }
    };

    // 密码验证
    const validPwd2 = (rule, value, callback) => {
      const reg =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}\[\]:;"'<>?,.\/])[^\s\n]{8,15}$/;
      if (!value) {
        callback(new Error(this.$t('userInfo.请再次输入密码')));
      } else {
        if (value.length < 8 || value.length > 15) {
          callback(
            this.$t('userInfo.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号')
          );
        } else {
          if (reg.test(value)) {
            if (value !== this.formData.newPassword) {
              
              callback(new Error(this.$t('userInfo.两次输入密码不一致!')));
            } else {
              callback();
            }
          } else {
            callback(
              new Error(
                this.$t('userInfo.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号')
              )
            );
          }
        }
      }
    };
    return {
      authToken: "",
      tabIndex: 1,
      flag: false,
      flag2: false,
      flag3: false,
      showVeriy: false,
      showSuccess: false,
      //验证码输入值
      phoneCode: "",
      emailCode: "",
      authCode: "",
      formData: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        oldPassword: [
          { required: true, validator: validPwdOld, trigger: "change" },
        ],
        newPassword: [
          { required: true, validator: validPwd, trigger: "change" },
        ],
        confirmPassword: [
          { required: true, validator: validPwd2, trigger: "change" },
        ],
      },
      checkData: {},
    };
  },
  mounted() {},
  methods: {
    // 提交
    saveBtn() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // this.showVeriy = true
          // this.$emit('next')
          const params = {
            oldPassword: this.$getEncryptCode(this.formData.oldPassword),
          };
          let res = await checkPwd(params);
          if (res && res.status === 200) {
            if (res.data && res.data.success) {
              this.checkData = res.data.data;
              this.authToken = res.data?.data?.authToken;
              //打开验证页面
              this.tabIndex = 2;
            }
          }
        }
      });
    },
    // 验证表单
    // handleVerifyForm(data) {
    //   this.showSuccess = true;
    // },
    handleback() {
      this.$emit("success");
    },
    // 成功返回页面
    handleSuccess() {
      // this.$emit("success");
      removeToken();
      this.$router.push("/layout/login");
    },

    phoneChange(val) {
      this.phoneCode = val;
    },
    emailChange(val) {
      this.emailCode = val;
    },
    authChange(val) {
      this.authCode = val;
    },
    //修改密码
    setPwdSubmit() {
      const params = {
        newPassword: this.$getEncryptCode(this.formData.newPassword),
        authToken: this.authToken,
        phoneCode: this.phoneCode,
        emailCode: this.emailCode,
        authCode: this.authCode,
      };
      setPwd(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.showSuccess = true;
            //跳回登录页
          }
        }
      });
    },
    onBack() {
      this.tabIndex = 1;
    },
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
    ::v-deep .el-input__inner {
      height: 50px;
      line-height: 50px;
      background: #f4f5f7;
    }
    .tip-text {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333;
      background: #ffd4d4;
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
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
