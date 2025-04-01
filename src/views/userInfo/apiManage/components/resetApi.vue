<!-- 重置api -->
<template>
  <div>
    <common-modal
      :title="$t('userInfo.重置API')"
      width="500px"
      :show="isShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      :appendToBody="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_content>
        <div class="form-common">
          <el-form
            :model="formData"
            :rules="rules"
            ref="verifyForm"
            label-position="top"
          >
            <!-- <el-form-item prop="zh" label="手机号/邮箱">
              <el-input v-model="formData.bz" autocomplete="off" placeholder="请输入手机号/邮箱"></el-input>
            </el-form-item> -->
            <el-form-item prop="password" :label="$t('userInfo.登录密码')">
              <el-input
                v-model="formData.password"
                :type="flag ? 'text' : 'password'"
                autocomplete="off"
                :placeholder="$t('userInfo.请输入登录密码')"
              >
                <div slot="suffix" @click="onChangeEye">
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
            <el-form-item prop="newPassword" :label="$t('userInfo.新的API口令')">
              <el-input
                v-model="formData.newPassword"
                autocomplete="off"
                :placeholder="$t('userInfo.请输入新的API口令')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="againPassword" :label="$t('userInfo.确认新的API口令')">
              <el-input
                v-model="formData.againPassword"
                autocomplete="off"
                :placeholder="$t('userInfo.请再次输入新的API口令')"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <template #dia_footer>
        <el-button type="primary" style="width: 100%" @click="handleVerfyNext"
          >{{$t('userInfo.确认')}}</el-button
        >
      </template>
    </common-modal>
  </div>
</template>

<script>
import CommonModal from "@/components/commonModal/index.vue";
export default {
  name: "ResetApi",
  components: {
    CommonModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    //口令需要做校验
    const validCode = (rule, value, callback) => {
      const reg =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>?,./])[^\\s\n]{8,32}$/;
      if (!value) {
        callback(new Error(this.$t('userInfo.请创建您的API密码')));
      } else {
        if (value.length < 8 || value.length > 32) {
          callback(
            new Error(
              this.$t('userInfo.请输入8-32位字符，必须包含大写字母，小写字母，数字及特殊符号')
            )
          );
        } else {
          if (reg.test(value)) {
            callback();
          } else {
            callback(
              new Error(
              this.$t('userInfo.请输入8-32位字符，必须包含大写字母，小写字母，数字及特殊符号')
              )
            );
          }
        }
      }
    };
    const validCode2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('userInfo.请再次输入新的API口令')));
      } else if (value !== this.formData.newPassword) {
        callback(new Error(this.$t('userInfo.密码不一致，请重试')));
      } else {
        callback();
      }
    };
    return {
      flag: false,
      formData: {
        password: "", //登录密码
        newPassword: "", //新密码
        againPassword: "",
      },
      rules: {
        password: [
          { required: true, message:this.$t('userInfo.请输入登录密码') , trigger: "change" },
        ],
        newPassword: [
          { required: true, validator: validCode, trigger: "change" },
        ],
        againPassword: [
          { required: true, validator: validCode2, trigger: "change" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    // 验证下一步
    handleVerfyNext() {
      this.$refs["verifyForm"].validate((valid) => {
        if (valid) {
          // this.$emit("update:isShow", false);
          this.$emit("next", this.formData);
        }
      });
    },
    onChangeEye() {
      this.flag = !this.flag;
    },
    resetParams() {
      this.formData = {
        password: "", //登录密码
        newPassword: "", //新密码
        againPassword: "",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-style {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-top: 8px;
  margin-right: 5px;
  cursor: pointer;
}
// 表格padding
.form-common {
  padding: 0 30px;
  .qx-set {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    li {
      width: 160px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(244, 245, 247, 0.8);
      border-radius: 6px;
      border: 1px solid #8992a6;
      margin-right: 25px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #8992a6;
      cursor: pointer;
    }

    .item-active {
      background: rgba(81, 113, 255, 0.1);
      border-radius: 6px;
      border: 1px solid #90ff00;
      color: #90ff00;
    }
  }
}

::v-deep   .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
}
</style>
