<!-- 绑定谷歌 -->
<template>
  <div class="user-form">
    <div class="title-context">
      <i class="el-icon-arrow-left" @click="handleSuccess"></i>
      <span class="title" @click="handleSuccess">{{$t('userInfo.绑定谷歌')}}</span>
    </div>
    <div class="form-container">
      <google-audit
        :auditParams.sync="googleForm"
        @success="handleSuccess"
      ></google-audit>
    </div>
    <verify-form
      :is-show.sync="showVeriy"
      @next="handleVerifyForm"
      v-if="showVeriy"
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
import GoogleAudit from "./googleAudit.vue";
import { googleFirstApi } from "@/api/user";
export default {
  name: "BindGoogle",
  components: {
    VerifyForm,
    SuccessModal,
    GoogleAudit,
  },
  data() {
    return {
      showSuccess: false,
      showVeriy: false,
      googleForm: {},
    };
  },
  mounted() {
    this.googleFirst();
  },
  methods: {
    //绑定谷歌认证器创建密钥
    googleFirst() {
      googleFirstApi().then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.googleForm = res.data.data;
          }
        }
      });
    },
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
    handleVerifyForm() {
      this.showSuccess = true;
    },
    // 成功返回页面
    handleSuccess() {
      this.$emit("updateStatus");
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

  .form-container {
    padding: 40px 500px 0 40px;
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
