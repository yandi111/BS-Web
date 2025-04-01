<template>
  <div class="gate-form">
    <el-form :model="formData" :rules="rules" ref="ruleForm">
      <el-form-item prop="account">
        <el-input
          v-model.trim="formData.account"
          autocomplete="off"
          class="input-with-select"
          :placeholder="enter_email"
          @keyup.enter.native="onKeyup"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="flag ? 'text' : 'password'"
          v-model.trim="formData.password"
          @keyup.enter.native="onKeyup"
          autocomplete="off"
          :placeholder="enter_password"
        >
          <div slot="suffix" @click="flag = !flag">
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
    </el-form>
    <div class="forget-pwd">
      <span @click="forgetPwd">{{ $t("loginRegister.忘记密码？") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormAccount",
  data() {
   
    return {
      enter_email: this.$t("loginRegister.输入账号"),
      enter_password: this.$t("loginRegister.请输入密码"),
      flag: false,
      formData: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: this.$t("loginRegister.请输入账号"), trigger: "change" }],
        password: [
          { required: true, message: this.$t("loginRegister.请输入密码"), trigger: "change" },
        ],
      },
    };
  },
  methods: {
    onKeyup() {
      this.$emit("onKeyup");
    },
    // 提交表单
    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$emit("submit", this.formData);
        }
      });
    },
    // 忘记密码
    forgetPwd() {
      this.$router.push("/forget");
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-style {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-top: 18px;
  margin-right: 5px;
  cursor: pointer;
}
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

.forget-pwd {
  font-size: 16px;
  font-weight: 500;
  color: #90ff00;
  cursor: pointer;
  margin-bottom: 70px;
}
</style>
