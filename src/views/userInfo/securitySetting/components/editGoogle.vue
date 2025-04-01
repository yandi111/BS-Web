<!-- 修改谷歌验证器 -->
<template>
  <div class="user-form">
    <div class="title-context">
      <i class="el-icon-arrow-left" @click="handleSuccess"></i>
      <span class="title" @click="handleSuccess">{{ $t('userInfo.修改谷歌') }}</span>
    </div>
    <div class="form-container">
      <google-audit-edit @success="handleSuccess"></google-audit-edit>
    </div>
    <verify-form
      :is-show.sync="showVeriy"
      @next="handleVerifyForm"
    ></verify-form>

    <success-modal
      :is-show.sync="showSuccess"
      :text="$t('userInfo.绑定谷歌成功')"
      @next="handleSuccess"
    ></success-modal>
  </div>
</template>

<script>
import VerifyForm from "@/components/verifyForm.vue";
import SuccessModal from "@/components/successModal.vue";
import GoogleAuditEdit from "./googleAuditEdit.vue";
export default {
  name: "EditGoogle",
  components: {
    VerifyForm,
    SuccessModal,
    GoogleAuditEdit,
  },
  data() {
    return {
      showSuccess: false,
      showVeriy: false,
    };
  },
  mounted() {},
  methods: {
    // 提交
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.showVeriy = true;
          this.$emit("next");
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
    },
  },
};
</script>
<style lang="scss" scoped>
.user-form {
  padding: 60px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 15px;
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
    padding: 40px 500px 0 40px;
  }

  ::v-deep   .el-input-group__prepend {
    background-color: #fff !important;
  }

  ::v-deep   .el-form-item__error {
    font-size: 14px;
  }
  ::v-deep   .el-form-item {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 18px;
    }
  }

  ::v-deep   .el-input--prefix .el-input__inner {
    padding-left: 20px;
  }

  ::v-deep   .input-with-select {
    > .el-input__inner {
      padding-left: 120px;
    }
  }

  ::v-deep   .form-input {
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

  ::v-deep   .el-form-item__label {
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

::v-deep   .el-popover {
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
