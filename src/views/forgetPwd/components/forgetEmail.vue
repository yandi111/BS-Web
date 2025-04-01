<template>
  <div class="gate-form">
    <el-form :model="formData" :rules="rules" ref="ruleForm">
      <el-form-item prop="email">
        <el-input
          v-model="formData.email"
          autocomplete="off"
          class="input-with-select"
          :placeholder="$t('loginRegister.请输入邮箱')"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-button type="primary" class="login-btn" @click="handleNext"
          >{{$t("loginRegister.下一步")}}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ForgetEmail",
  data() {
    // 邮箱验证
    const validEmail = (rule, value, callback) => {
      const reg =
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!value) {
        callback(new Error(this.$t("loginRegister.请输入邮箱(提示)")));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(this.$t("loginRegister.请输入正确的邮箱")));
        }
      }
    };
    return {
      formData: {
        email: "",
      },
      rules: {
        email: [{ required: true, validator: validEmail, trigger: "change" }],
      },
    };
  },
  methods: {
    // 下一步
    handleNext() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$emit("submit", "ForgetCode", this.formData);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 105px;
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

::v-deep .el-input-group__prepend {
  background-color: #fff !important;
}

::v-deep .el-form-item__label {
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #040a1a;
}

.login-btn {
  margin-top: 25px;
}
</style>
