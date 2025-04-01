<!-- 谷歌验证 -->
<template>
  <div class="google-audit">
    <step :stepInfo="stepInfo"></step>

    <!-- 下载谷歌验证器 -->
    <div class="down-audit center down-pad" v-if="stepInfo.step === 0">
      <div class="img-container">
        <img src="@/assets/user-img/audit.png" alt="" />
      </div>
      <p class="google-desc">{{ $t('userInfo.谷歌验证') }}</p>
      <p class="desc mg-bot">
        {{ $t('userInfo.谷歌验证是由Google lnc.推出的第三方独立身份验证器，可以为您的操作更安全的保护。因此我们需使用谷歌验证才能完成注册操作') }}
        
      </p>
      <span class="down">{{ $t('userInfo.下载谷歌验证器') }}</span>

      <!-- <p class="read">
        {{ $t('userInfo.下载谷歌身份验证器即代表您已阅读并接受') }}
        <span>{{$t('userInfo.免责声明')}}</span>
      </p> -->

      <span class="bind" @click="bindConfig">{{ $t('userInfo.绑定设置') }}</span>
    </div>

    <!-- 绑定设置 -->
    <div class="down-audit center bind-pad" v-if="stepInfo.step === 1">
      <p class="google-desc top">{{ $t('userInfo.在谷歌验证器中添加密钥并备份') }}</p>
      <p class="desc">
        {{ $t('userInfo.打开谷歌验证器，扫描下方二维码或手动输入下述密钥添加验证令牌。密钥用于手机更换或遗失时找回谷歌验证器，绑定前请务必将下述密钥备份保存。') }}
        
      </p>
      <div class="secret-container">
        <div class="code-container">
          <img
            :src="auditParams && auditParams.secretQrCodes"
            :alt="$t('userInfo.谷歌谷歌认证器密钥的二维码')"
          />
        </div>
        <div class="text-container">
          <p>{{ auditParams && auditParams.secret }}</p>
          <p>
            <span class="copy">{{ $t('userInfo.复制密钥') }}</span>
            <i class="el-icon-copy-document" @click="copyText"></i>
          </p>
        </div>
      </div>
      <span class="bind" @click="handleNext">{{ $t('userInfo.下一步') }}</span>
    </div>

    <!-- 谷歌绑定验证 -->
    <verify-form
      ref="verifyRef"
      :is-show.sync="showVerify"
      :isNeedPhone.sync="isNeedPhone"
      :isNeedEmail.sync="isNeedEmail"
      :isNeedGoogle.sync="isNeedGoogle"
      :authToken.sync="authToken"
      :codeType.sync="codeType"
      @phoneChange="phoneChange"
      @emailChange="emailChange"
      @authChange="authChange"
      @next="googleSubmit"
    >
    </verify-form>
    <!-- 设置成功 弹出成功窗口即可-->
    <success-modal
      :is-show.sync="showSuccess"
      :text="$t('userInfo.绑定谷歌成功')"
      @next="handleSuccess"
    ></success-modal>

    <!-- <div class="down-audit center bind-pad" v-if="stepInfo.step === 2">
      <p class="google-desc top">在谷歌验证器中添加密钥并备份</p>
      <p class="desc">
        打开谷歌验证器，扫描下方二维码或手动输入下述密钥添加验证令牌。
        密钥用于手机更换或遗失时找回谷歌验证器，绑定前请务必将下述密钥备份保存。
      </p>
      <div class="secret-container">
        <div class="code-container">
          <img
            :src="auditParams && auditParams.secretQrCodes"
            alt="谷歌谷歌认证器密钥的二维码"
          />
        </div>
        <div class="text-container">
          <p>{{ auditParams && auditParams.secret }}</p>
          <p>
            <span class="copy">复制密钥</span>
            <i class="el-icon-copy-document" @click="copyText"></i>
          </p>
        </div>
      </div>
    </div> -->

    <!-- <div class="down-audit bind-pad" v-if="stepInfo.step === 2">
      <p class="google-desc top">安全验证</p>
      <el-form label-position="top" :model="formData" ref="formData">
        <el-form-item
          label="新谷歌验证"
          prop="authCode"
          :rules="[
            { required: true, message: '验证码不能为空' },
            { type: 'number', message: '验证码必须为数字' },
          ]"
        >
          <el-input
            v-model.number="formData.authCode"
            autocomplete="off"
            maxlength="6"
            placeholder="请输入谷歌验证码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        class="login-btn"
        @click="handleSubmit"
        :loading="loading"
        >确定</el-button
      >
    </div> -->
  </div>
</template>

<script>
import step from "./step.vue";
import VerifyForm from "@/components/verifyForm.vue";
import SuccessModal from "@/components/successModal.vue";
import { bindGoogleFirst } from "@/api/user";
export default {
  name: "GoogleAudit",
  components: {
    step,
    VerifyForm,
    SuccessModal,
  },
  props: {
    auditParams: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showVerify: false,
      showSuccess: false,
      loading: false,
      stepInfo: {
        list: [
          { textParams: this.$t('userInfo.下载谷歌验证器') },
          { textParams: this.$t('userInfo.绑定设置') },
          { textParams: this.$t('userInfo.设置成功') },
        ],
        step: 0,
      },
      // formData: {
      //   authCode: "",
      // },
      //验证参数
      codeType: 15,
      authToken: "",
      isNeedPhone: "",
      isNeedGoogle: true,
      isNeedEmail: "",
      phoneCode: "",
      emailCode: "",
      authCode: null,
    };
  },
  mounted() {},
  methods: {
    // 复制文本
    copyText() {
      let that = this;
      this.$copyText(this.auditParams.secret).then(
        function (e) {
          this.$customMessage(0,"复制成功")
        },
        function (e) {
          this.$customMessage(1,"复制失败")
        }
      );
    },
    // 绑定谷歌验证器
    bindConfig() {
      this.stepInfo.step = 1;
    },
    // 下一步
    handleNext() {
      //跳至验证页面
      this.showVerify = true;
      this.isNeedPhone = this.auditParams && this.auditParams.authPhone;
      this.isNeedEmail = this.auditParams && this.auditParams.authEmail;
      this.authToken = this.auditParams && this.auditParams.authToken;
    },
    //输入验证码
    phoneChange(val) {
      this.phoneCode = val;
    },
    emailChange(val) {
      this.emailCode = val;
    },
    authChange(val) {
      this.authCode = val;
    },
    //绑定谷歌验证通过
    googleSubmit() {
      const params = {
        newGauthCode: Number(this.authCode),
        authToken: this.authToken,
        phoneCode: this.phoneCode,
        emailCode: this.emailCode,
      };
      bindGoogleFirst(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            // this.stepInfo.step = 2;
            //绑定成功
            this.showSuccess = true;
          }
        }
      });
    },
    // 成功返回页面
    handleSuccess() {
      this.$emit("success");
    },
  },
};
</script>
<style lang="scss" scoped>
.google-audit {
  padding-top: 30px;
  .down-pad {
    // padding: 0 120px;
  }
  .bind-pad {
    padding: 0 110px;
    line-height: 24px;
  }
  .center {
    align-items: center;
  }
  .down-audit {
    padding: 0 200px;
    display: flex;
    flex-direction: column;
    .img-container {
      width: 100px;
      height: 100px;
      margin-top: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .google-desc {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 80px;
    }
    .top {
      margin-top: 78px;
    }
    .desc {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }
    .down {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-radius: 6px;
      border: 1px solid $colorB;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: $colorB;
      text-align: center;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .read {
      width: 100%;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      text-align: left;
      & span {
        color: $colorB;
        cursor: pointer;
      }
    }
    .bind {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-radius: 6px;
      border: 1px solid $colorB;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      text-align: center;
      background-color: $colorB;
      margin-bottom: 10px;
      cursor: pointer;
      margin-top: 30px;
    }

    .secret-container {
      width: 100%;
      height: 160px;
      padding: 10px;
      background-color: #edf1ff;
      border-radius: 6px;
      margin-top: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .code-container {
        width: 140px;
        height: 140px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text-container {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        .copy {
          margin-right: 10px;
        }
        .el-icon-copy-document {
          color: $colorB;
          padding: 4px;
          cursor: pointer;
        }
      }
    }
  }

  .mg-bot {
    margin-bottom: 30px;
  }

  .login-btn {
    margin-top: 30px;
    font-size: 18px;
  }

  ::v-deep   .el-input__inner::placeholder {
    font-size: 14px !important;
  }
}
</style>
