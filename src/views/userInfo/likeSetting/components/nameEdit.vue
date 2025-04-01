<template>
  <div>
    <my-modal :title="title" :isShow="isShow" @close="close">
      <template slot="content">
        <div class="form-common">
          <el-form ref="formRule" :model="formData" :rules="rules">
            <el-form-item>
              <div>{{ $t("userInfo.为您的个人资料设置自定义昵称") }}</div>
            </el-form-item>
            <el-form-item :label="$t('userInfo.昵称')" prop="name">
              <el-input
                v-model="formData.name"
                @input="editNameChange"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div>*{{ $t("userInfo.最大长度为50个字符") }}</div>
              <div>*{{ $t("userInfo.每180天仅可变更一次，请谨慎操作") }}</div>
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
  name: "NameEdit",
  components: {
    myModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    nickName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      title: this.$t("userInfo.编辑昵称"),
      formData: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t("userInfo.昵称不能为空"),
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    getName(name) {
      this.formData.name = name;
    },
    handleSave() {
      this.$refs["formRule"].validate((valid) => {
        if (valid) {
          this.$emit("update:isShow", false);
          this.$emit("handleEditName", this.formData);
        }
      });
    },
    editNameChange(val) {
      this.$emit("editNameChange", val);
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
