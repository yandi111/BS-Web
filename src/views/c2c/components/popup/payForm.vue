<!-- 添加|修改收款方式 -->
<template>
  <div>
    <common-modal
      :width="width"
      :show="isShow"
      class="add-pay"
      custom-class="pay-modal"
      :noFooter="false"
      :append-to-body="true"
      :FooterIsCenter="true"
    >
      <template #dia_title>
        <div class="custom-title flexs between">
          <div>
            {{
              formData.id != undefined
                ? $t(t + "编辑收款方式")
                : $t(t + "添加收款方式")
            }}
          </div>
          <i
            @click="cancelPayForm"
            class="el-icon-close block"
            style="font-size: 16px; cursor: pointer"
          ></i>
        </div>
      </template>
      <template #dia_content>
        <div class="form-common">
          <el-form
            :model="formData"
            :rules="rules"
            ref="payForm"
            label-position="top"
          >
            <el-form-item prop="type" :label="$t(t + '选择收款方式')">
              <el-select
                v-model="formData.type"
                :placeholder="$t('c2c.请选择收款方式')"
                @change="changeValue"
                :disabled="formData.id != undefined"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="$t(t + item.label)"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="name" :label="$t('c2c.姓名')">
              <el-input
                v-model="formData.name"
                autocomplete="off"
                :placeholder="$t('c2c.请前往身份验证')"
                disabled
              >
                <span
                  slot="suffix"
                  v-if="isRealname&&isRealname !== 2"
                  class="slot-name"
                  @click="toSetting"
                  >{{ $t("c2c.去认证") }}</span
                >
              </el-input>
            </el-form-item>
            <div v-if="formData.type === 1">
              <el-form-item prop="num" :label="$t('c2c.银行账号/卡号')">
                <el-input
                  v-model="formData.num"
                  autocomplete="off"
                  maxlength="24"
                  @input="(e) => changeValueNum(e, 'yhk')"
                  :placeholder="$t('c2c.请输入银行账号/卡号')"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="bankName"
                :label="$t('c2c.银行名称')"
              >
                <el-input
                  v-model="formData.bankName"
                  autocomplete="off"
                  :placeholder="$t('c2c.请输入银行名称')"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="bankBranch"
                :label="$t('c2c.开户支行（选填）')"
              >
                <el-input
                  v-model="formData.bankBranch"
                  autocomplete="off"
                  :placeholder="$t('c2c.请输入开户分行')"
                ></el-input>
              </el-form-item>
            </div>

            <div v-if="formData.type === 2">
              <el-form-item prop="num" :label="$t('c2c.支付宝账户')">
                <el-input
                  v-model="formData.num"
                  autocomplete="off"
                  @input="(e) => changeValueNum(e, 'zfb')"
                  :placeholder="$t('c2c.请输入您的支付宝账户')"
                ></el-input>
              </el-form-item>
              <el-form-item prop="qrcode" :label="$t('c2c.收款二维码')">
                <ImageUpload
                  :isShowTip="false"
                  ref="ImageUpload"
                  v-model="formData.qrcode"
                  :limit="1"
                  listType="picture-card"
                >
                  <template #content>
                    <div
                      class="upload-btn flexs"
                      v-if="!formData.qrcode | (formData.qrcode == '//0')"
                    >
                      <el-image
                        :src="require('@/assets/buy-coins/upload.png')"
                      ></el-image>
                      <span class="upload-title">{{
                        $t("c2c.请上传付款二维码")
                      }}</span>
                    </div>
                  </template>
                </ImageUpload>
              </el-form-item>
            </div>

            <div v-if="formData.type === 3">
              <el-form-item prop="num" :label="$t('c2c.微信账户')">
                <el-input
                  v-model="formData.num"
                  autocomplete="off"
                  @input="(e) => changeValueNum(e, 'wx')"
                  :placeholder="$t('c2c.请输入您的微信账户')"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="qrcode"
                :label="$t('c2c.收款二维码')"
                class="payTypeClass"
              >
                <ImageUpload
                  :isShowTip="false"
                  ref="ImageUpload"
                  v-model="formData.qrcode"
                  :limit="1"
                  listType="picture-card"
                >
                  <template #content>
                    <div
                      class="upload-btn flexs"
                      v-if="!formData.qrcode || formData.qrcode == '//0'"
                    >
                      <el-image
                        :src="require('@/assets/buy-coins/upload.png')"
                      ></el-image>
                      <span class="upload-title">{{
                        $t("c2c.请上传付款二维码")
                      }}</span>
                    </div>
                  </template>
                </ImageUpload>
              </el-form-item>
            </div>
            <el-form-item prop="remark" :label="$t('c2c.备注')">
              <el-input
                v-model="formData.remark"
                type="textarea"
                show-word-limit
                autosize
                maxlength="200"
                :placeholder="$t('c2c.请输入备注')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('c2c.温馨提示')">
              <div class="form-tips">
                {{
                  $t(
                    "c2c.交易过程中，买家可查看卖家选择的收款方式的详细信息以进行付款，卖家可查看买家真实姓名以便核对。请确保添加的账户为BSEX实名人账户，非本人实名账户会导致订单失败且账号被冻结。"
                  )
                }}
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <template #dia_footer>
        <el-button
          type="text"
          class="cancel-btn"
          style="width: 100%"
          :loading="isLoading"
          @click="cancelPayForm"
        >
          {{ $t(t + '取消')}}
        </el-button>
        <el-button
          type="text"
          class="config-btn"
          style="width: 100%"
          :loading="isLoading"
          @click="handleVerfyNext"
        >
        {{ $t(t + '保存')}}
        </el-button>
      </template>
    </common-modal>
    <!-- 验证 -->
    <verify-form
      ref="verifyForm"
      :is-show.sync="showVeriy"
      @next="handleVerifyForm"
      :is-need-secret="isNeedSecret"
      :is-need-api="isNeedApi"
      :isNeedPhone.sync="isNeedPhone"
      :isNeedEmail.sync="isNeedEmail"
      :isNeedGoogle.sync="isNeedGoogle"
      :authToken.sync="authToken"
      :codeType.sync="codeType"
      @authChange="authChange"
    ></verify-form>
  </div>
</template>

<script>
import CommonModal from "@/components/commonModal/index.vue";
import { payAdd, realNameQuery } from "@/api/otc.js";
import ImageUpload from "@/components/ImageUpload/index.vue";
import VerifyForm from "@/components/verifyForm.vue";
import { authItem, checkAuthStrong, authItemStong } from "@/api/common";
export default {
  name: "payForm",
  components: {
    CommonModal,
    ImageUpload,
    VerifyForm,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    isQueryAddShow: {
      type: Boolean,
      default: false,
    },
    // 参数
    editFormInfo: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: "600px",
    },
  },
  data() {
    const yhkLimit = (rule, value, callback) => {
      const check = /^(?:\d{4}[- ]){3}\d{4}|\d{16}$/;
      if (this.formData.type == 1 && !check.test(value)) {
        callback(new Error(this.$t("c2c.请输入正确的银行卡账号！")));
      } else {
        callback();
      }
    };
    return {
      codeType: 0,
      showVeriy: false,
      // 验证表单所需项
      authToken: "",
      isNeedPhone: false, //手机验证
      isNeedEmail: false, //邮箱验证
      isNeedGoogle: false, //谷歌验证
      isNeedSecret: false,
      isNeedApi: false,
      //验证是否实名
      isRealname: null, //0-未认证 1-审核中 2-已认证 3-审核失败
      realName:'',
      //验证参数
      authPhone: "",
      authEmail: "",
      authGoogleAuth: "",
      fundPsd: "",
      bizType: undefined,

      isLoading: false,
      timer: null, // 计时器
      codeTime: null, // 发送验证码倒计时
      sendMsgDisabled: false, // 是否显示发送验证码按钮
      formData: this.editFormInfo,
      t: "c2c.",
      options: [
        { value: 1, label: "银行卡" },
        { value: 2, label: "支付宝" },
        { value: 3, label: "微信" },
      ],
      rules: {
        type: [
          {
            required: true,
            message: this.$t("c2c.请选择收款方式"),
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: this.$t("c2c.请输入您的姓名"),
            trigger: "blur",
          },
        ],
        num: [
          {
            required: true,
            message: this.$t("c2c.请输入银行账号/卡号"),
            trigger: "blur",
          },
          { required: true, validator: yhkLimit, trigger: "blur" },
        ],
        bankName: [
          {
            required: true,
            message: this.$t("c2c.请输入银行名称"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  created(){
    
  },
  mounted() {
    this.formData.qrcode =
    this.formData.qrcode === "//0" || !this.formData.qrcode
    ? ""
    : this.formData.qrcode;
    //获取实名
  },
  watch: {
    "formData.type": {
      handler(newVal) {
        this.rules.num[0].message =
          newVal === 2
            ? this.$t("c2c.请输入您的支付宝账户")
            : newVal === 3
            ? this.$t("c2c.请输入您的微信账户")
            : this.$t("c2c.请输入银行账号/卡号");
      },
      immediate: true,
    },
  },
  methods: {
    //获取认证选项
    // getAuthItem(type) {
    //   authItem({ data: type }).then((res) => {
    //     this.isNeedPhone = res.data?.authPhone;
    //     this.isNeedEmail = res.data?.authEmail;
    //     this.isNeedGoogle = res.data?.authGoogleAuth;
    //     this.authToken = res.data?.authToken;
    //     this.isNeedSecret = res.data?.tradePasswordStatus
    //   });
    // },
    // 获取实名
    getName() {
      realNameQuery().then((res) => {
        this.isRealname = res.data.data.authStatus;
        if (this.isRealname == 2) {
           this.$nextTick(() => {
            this.formData.name = res.data.data.realName
            this.realName = res.data.data.realName
          });
        } else {
          this.$nextTick(() => {
            this.formData.name = undefined;
          });
        }
      });
    },
    // 去认证
    toSetting() {
      this.$router.push("/user/verifyIdentidy");
    },
    //新增支付方式 修改支付方式获取认证 只需谷歌认证
    getAuthItem(type) {
      authItemStong({ data: type }).then((res) => {
        this.isNeedGoogle = res.data?.authGoogleAuth;
        this.authToken = res.data?.authToken;
      });
    },

    //验证参数
    // phoneChange(val) {
    //   this.authPhone = val;
    // },
    // emailChange(val) {
    //   this.authEmail = val;
    // },
    authChange(val) {
      this.authGoogleAuth = val;
    },
    // pwdChange(val) {
    //   this.fundPsd = val;
    // },

    // 验证表单
    async handleVerifyForm() {
      //  提交参数
      const params = {
        authToken: this.authToken,
        // phoneCode: this.authPhone,
        // emailCode: this.authEmail,
        authCode: this.authGoogleAuth,
        bizType: this.bizType,
      };
      await checkAuthStrong(params).then((res) => {
        this.formData.successToken = res.data.successToken;
      });
      let data = JSON.parse(JSON.stringify(this.formData));
      data.qrcode = data.qrcode ? data.qrcode : "//0";
      payAdd(data)
        .then((_) => {
          this.$emit("update:isShow", false);
          this.$message({
            message:this.formData.id != undefined
              ? this.$t("c2c.修改成功") + "！"
              : this.$t("c2c.添加成功") + "！",
              type: 'success'
          }
            
          );
          this.isLoading = false;
          this.$emit("next", this.formData.type);
        })
        .finally(() => {
          this.isLoading = false;
          this.showVeriy = false;
        });
    },

    // 验证下一步
    handleVerfyNext() {
      this.$refs["payForm"].validate((valid) => {
        if (valid) {
          this.getAuthItem(this.bizType);
          // console.log("验证类型", this.bizType);
          // this.isLoading = true;
          this.showVeriy = true;
        }
      });
    },
    changeValueNum(input, type) {
      var value = input.replace(/\s/g, ""); // 去除输入框中的所有空格
      var formattedValue = "";

      for (var i = 0; i < value.length; i++) {
        var char = value.charAt(i);

        if (/[0-9]/.test(char)) {
          // 检查字符是否为数字
          if (i > 0 && i % 4 === 0 && type == "yhk") {
            formattedValue += " "; // 在每个连续的四位数字之后插入一个空格
          }
          formattedValue += char;
        }
      }
      this.formData.type == 1 && (this.formData.num = formattedValue);
    },
    // 切换收款方式
    changeValue(value) {
      this.$refs["payForm"].resetFields();
      for (const key in this.formData) {
        this.formData[key] = undefined;
      }
      this.formData.type = value;
      if(this.realName){
         this.formData.name = this.realName
      }
    },
    // 取消弹框
    cancelPayForm() {
      this.$emit("update:isShow", false);
      this.$emit("cancelPayForm");
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-title {
  color: black;
  font-size: 18px;
  // padding-left: 15px;
}
.form-tips {
  font-size: 14px;
  color: #333;
  line-height: 22px;
}

::v-deep .el-form-item__content {
  .el-input__inner,
  .el-textarea__inner {
    border: 1px solid transparent;
    background: #f4f5f7;
    &:hover {
      border: 1px solid #4dcca6;
    }
    &:focus {
      background: white;
    }
  }
  .el-input__count {
    background: #f4f5f7;
  }
}
.code {
  display: inline-block;
  width: 100px;
  height: 30px;
  margin: 5px 0 0 0;
  cursor: pointer;
  line-height: 30px;
  background-color: #90ff00;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
}

/** 发送验证吗样式 */
.resend {
  cursor: not-allowed;
  background-color: #8992a6;
}

/* // 表格padding */
.form-common {
  padding: 0 30px;
  overflow-y: auto;
  height: 500px;
  overflow-y: scroll;
}

.slot-name {
  color: #90ff00;
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
}

::v-deep .el-form-item {
  margin-bottom: 10px;
  &__label {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #00082d;
  }
}

::v-deep .el-textarea__inner {
  min-height: 100px !important;
}

.add-pay {
  ::v-deep .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
}

.el-select {
  width: 100%;
}
::v-deep .el-select .el-input .el-select__caret {
  color: #333333;
}

/* // 文件上传 */

.payTypeClass {
  ::v-deep .el-form-item__content {
    width: 180px;
    height: 180px;
    overflow: hidden;
  }
}
.component-upload-image {
  width: 180px;
  height: 180px;
  overflow: hidden;
}
::v-deep .el-upload {
  &-list--picture-card .el-upload-list__item {
    width: 180px;
    height: 180px;
    overflow: hidden;
  }
}
.upload-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;
  line-height: 180px;
  background: #f4f5f7;
  text-align: center;
  font-size: 16px;
  border-radius: 6px;
  color: #333333;
  ::v-deep .el-image {
    width: 24px;
    height: 24px;
  }
  .upload-title {
    padding-left: 10px;
    font-size: 14px;
  }
}
.avatar {
  width: 200px;
  border-radius: 10px;
  object-fit: cover;
}

.el-button {
  width: 100%;
  height: 45px;
  &:hover {
    opacity: 0.8;
  }
}
.cancel-btn {
  color: #333;
  background: #f4f5f7;
  border-color: #f4f5f7;
}
.config-btn {
  color: white;
  background-color: #90ff00;
  border-color: #90ff00;
}
</style>
