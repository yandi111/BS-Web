<template>
  <div class="gate-form">
    <el-form
      label-position="top"
      :model="formData"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item prop="password" :label="$t('loginRegister.输入新密码')">
        <el-input
          :type="flag ? 'text' : 'password'"
          v-model="formData.password"
          autocomplete="off"
          class="form-input"
          :placeholder="$t('loginRegister.请输入密码')"
          @blur="handlePwdBlur"
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
      <el-form-item prop="confirmPassword" :label="$t('loginRegister.再次输入新密码')">
        <el-input
          class="form-input"
          :type="flag2 ? 'text' : 'password'"
          v-model="formData.confirmPassword"
          autocomplete="off"
          :placeholder="$t('loginRegister.请输入密码')"
          @blur="handlePwdBlur"
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
      <!-- <div class="error-msg" v-show="showErrorMsg">
        您输入的密码与确认密码不一致，请重新输入
      </div> -->
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="saveBtn"
          >{{ $t('loginRegister.保存') }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { resetPwd } from "@/api/login";
export default {
  name: "ResetPwd",
  data() {
    // 密码验证
    const validPwd = (rule, value, callback) => {
      const reg =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}\[\]:;"'<>?,.\/])[^\s\n]{8,15}$/;
      if (!value) {
        callback(new Error(this.$t('loginRegister.请输入密码(提示)')));
      } else {
        if (value.length < 8 || value.length > 15) {
          callback(
            this.$t('loginRegister.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号')
            // "密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
          );
        } else {
          if (reg.test(value)) {
            // this.$refs.ruleForm.validateField('password')
            callback();
          } else {
            callback(
              new Error(
                this.$t('loginRegister.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号')
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
        callback(new Error( this.$t('loginRegister.再次输入新密码')));
      } else {
        if (value.length < 8 || value.length > 15) {
          callback(
            this.$t('loginRegister.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号')
          );
        } else {
          if (reg.test(value)) {
            if (value !== this.formData.password) {
              callback(new Error( this.$t('loginRegister.两次输入密码不一致!')));
            } else {
              callback();
            }
          } else {
            callback(
              new Error(
                 this.$t('loginRegister.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号')
              )
            );
          }
        }
      }
    };
    return {
      flag: false,
      flag2: false,
      formData: {
        password: "",
        confirmPassword: "",
      },
      rules: {
        password: [{ required: true, validator: validPwd, trigger: "change" }],
        confirmPassword: [
          { required: true, validator: validPwd2, trigger: "change" },
        ],
      },
    };
  },
  props: {
    codeParams: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onChangeEye(index) {
      switch (index) {
        case 1:
          this.flag = !this.flag;
          break;
        case 2:
          this.flag2 = !this.flag2;
          break;
        default:
      }
    },
    handlePwdBlur() {
      // if ((this.formData.confirmPassword && this.formData.password) && this.formData.confirmPassword !== this.formData.password) {
      //   this.showErrorMsg = true
      // } else {
      //   this.showErrorMsg = false
      // }
    },
    // 保存
    saveBtn() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // if (this.showErrorMsg) return
          let params = {
            authToken: this.codeParams.authToken,
            password: this.$getEncryptCode(this.formData.password),
            // ...this.codeParams
          };
          resetPwd(params)
            .then((res) => {
              if (res && res.status === 200) {
                // 成功
                if (res.data && res.data.success) {
                  this.$emit("success");
                } else {
                  this.$message.error(res.data.message);
                }
              }
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      });
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
::v-deep .form-input {
  > .el-input__inner {
    height: 50px;
  }
}
.el-select {
  width: 105px;
}

::v-deep .el-input-group__prepend {
  background-color: #fff !important;
}

.forget-pwd {
  text-align: right;
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #90ff00;
  cursor: pointer;
}

.login-btn {
  margin-top: 30px;
  font-size: 20px;
}

::v-deep .el-form-item__label {
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #040a1a;
}

.error-msg {
  height: 20px;
  line-height: 20px;
  color: #ff4141;
  font-size: 18px;
  font-family: PingFang SC;
}
</style>
