<template>
  <my-modal :isShow.sync="isShow" width="width500">
    <template #header>
      <span class="title">{{ $t("square.编辑个人资料") }}</span>
      <i class="iconfont icon-close2 f24" @click="close"></i>
    </template>
    <template #content>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleRef"
        label-position="top"
        label-width="80px"
      >
        <el-form-item :label="$t('square.头像')" prop="avatar">
          <s-uplaod
            :defaultAvatar="ruleForm.avatar"
            @success="(data) => handleSuccess(data, 'port')"
          ></s-uplaod>
        </el-form-item>
        <el-form-item :label="$t('square.昵称')" prop="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="form-des">{{
            $t("square.昵称在180天内只能修改1次")
          }}</span>
        </el-form-item>
        <el-form-item :label="$t('square.用户名')" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="form-des">{{ $t("square.用户名能修改1次") }}</span>
        </el-form-item>
        <el-form-item :label="$t('square.介绍')" prop="introduction">
          <el-input
            type="textarea"
            maxlength="160"
            show-word-limit
            v-model="ruleForm.introduction"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <span class="form-des">{{
            $t("square.个人简介在30天内只能修改1次")
          }}</span>
        </el-form-item> -->
      </el-form>
    </template>
    <template #footer>
      <div class="btns df aic jb">
        <my-button class="mr15" type="normal" @click="close">{{
          $t("square.取消")
        }}</my-button>
        <my-button @click="handleSave">{{ $t("square.保存") }}</my-button>
      </div>
    </template>
  </my-modal>
</template>

<script>
import sUplaod from "./s-upload.vue";
import myModal from "@/components/my-modal/index.vue";
import $confirm from "./s-confirm";
import {
  $modifyPersonalInformation,
  $getPersonalInformation,
} from "@/api/square";
export default {
  name: "sForm",
  components: {
    sUplaod,
    myModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    infoData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    const validNickName = (rule, value, callback) => {
      const reg = /^.{1,50}$/;
      if (!value) {
        callback(new Error(this.$t("square.请输入1-50位昵称")));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(this.$t(this.$t("square.昵称输入规则有误"))));
        }
      }
    };
    const validUserName = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{4,20}$/;
      if (!value) {
        callback(
          new Error(
            this.$t(
              "square.请输入4-20位用户名，只能包含字母、数字、下划线，且至少包含一个字母"
            )
          )
        );
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(this.$t("square.用户名输入规则有误")));
        }
      }
    };
    return {
      ruleForm: {
        avatar: "",
        nickname: "",
        username: "",
        introduction: "",
      },
      rules: {
        avatar: [
          {
            required: true,
            message: this.$t("square.请上传头像"),
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, validator: validNickName, trigger: "change" },
        ],
        username: [
          { required: true, validator: validUserName, trigger: "change" },
        ],
      },
    };
  },
  methods: {
    //编辑保存
    handleSave() {
      this.$refs["ruleRef"].validate((valid) => {
        if (valid) {
          //发请求
          $modifyPersonalInformation(this.ruleForm).then((res) => {
            if (res.data.success) {
              this.$emit("update:isShow", false);
              this.editUserInfo();
              this.$store.dispatch("handleSetCommunityPersonalInformation");
              this.$emit("editList");
              this.$message({
                type: "success",
                message: this.$t("square.修改个人信息成功"),
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSuccess(fileURL, type) {
      // console.log("上传url", fileURL);
      this.ruleForm.avatar = fileURL;
    },
    close() {
      let datas = JSON.parse(JSON.stringify(this.infoData));
      if (
        this.ruleForm.avatar !== datas.avatar ||
        this.ruleForm.nickname !== datas.nickname ||
        this.ruleForm.username !== datas.username ||
        this.ruleForm.introduction !== datas.introduction
      ) {
        $confirm("edit", () => {
          this.ruleForm = datas;

          this.$emit("update:isShow", false);
        });
      } else {
        this.$emit("update:isShow", false);
      }
    },
    // 编辑个人用户信息
    editUserInfo() {
      $getPersonalInformation().then((res) => {
        this.$store.dispatch("handleSetEditPersonalInfo", res.data.data);
      });
    },
  },
  watch: {
    infoData: {
      handler(newValue) {
        // console.log("newValue", newValue);
        this.ruleForm = {
          avatar: newValue.avatar,
          nickname: newValue.nickname,
          username: newValue.username,
          introduction: newValue.introduction,
        };
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  background-color: #f6f9fc;
  border: 1px solid transparent;
}
::v-deep .el-textarea__inner {
  background-color: #f6f9fc;
  border: 1px solid transparent;
}
.form-des {
  font-size: 12px;
  color: #96a2b2;
}
::v-deep .el-textarea .el-input__count {
  background-color: #f4f5f7;
  line-height: 20px;
}
::v-deep
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
::v-deep .el-form-item__content {
  line-height: 10px;
  .el-textarea__inner {
    height: 100px;
  }
}
</style>
