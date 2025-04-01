<template>
  <div>
    <my-modal :title="$t('userInfo.编辑简介')" :isShow="isShow" @close="close">
      <template slot="content">
        <div class="form-common">
          <el-form ref="formRule" :model="formData">
            <el-form-item>
              <div>{{ $t("userInfo.为您的个人资料设置自定义个人简介") }}</div>
            </el-form-item>
            <el-form-item :label="$t('userInfo.简介')" prop="introduction">
              <el-input
                type="textarea"
                maxlength="160"
                show-word-limit
                v-model="formData.introduction"
                @input="editNameChange"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template slot="footer">
        <div class="btns df aic jb">
          <my-button @click="handleSave">{{ $t("userInfo.保存") }}</my-button>
        </div>
      </template>
    </my-modal>
  </div>
</template>

<script>
import myModal from "@/components/my-modal";
export default {
  name: "DesEdit",
  components: {
    myModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    introduction: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      title: this.$t("userInfo.编辑个人简介"),
      formData: {
        introduction: "",
      },
      // rules: {
      //   introduction: [
      //     {
      //       required: true,
      //       message: this.$t("userInfo.用户名不能为空"),
      //       trigger: "change",
      //     },
      //   ],
      // },
    };
  },
  methods: {
    getName(name) {
      this.formData.introduction = name;
    },
    handleSave() {
      this.$refs["formRule"].validate((valid) => {
        if (valid) {
          this.$emit("update:isShow", false);
          this.$emit("handleIntroduction", this.formData);
        }
      });
    },
    editNameChange(val) {
      this.$emit("editIntroduction", val);
    },
    close() {
      this.$emit("update:isShow", false);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-common {
  .notice {
    color: #999;
    line-height: 20px;
  }

  ::v-deep .el-input__inner {
    height: 45px;
    line-height: 45px;
    border: 1px solid #f4f5f7;
  }
}
</style>
