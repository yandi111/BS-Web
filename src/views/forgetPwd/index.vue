<template>
  <div class="login-container">
    <div class="login-item">
      <div class="login-img">
        <img src="@/assets//login-img/login-phone.png" alt="" />
      </div>
      <div class="login-box">
        <div class="login-title" @click="handleBack">
          <i class="el-icon-arrow-left cup"></i
          ><span class="cup">{{ $t("loginRegister.重置登录密码") }}</span>
        </div>
        <div class="login-content">
          <div>
            <div>
              <div class="login-type" v-if="!curComp">
                <div
                  class="login-phone"
                  :class="curIndex === 0 ? 'type-active' : ''"
                  @click="handleCheck(0)"
                >
                  {{ $t("loginRegister.手机") }}
                </div>
                <div
                  class="login-email"
                  :class="curIndex === 1 ? 'type-active' : ''"
                  @click="handleCheck(1)"
                >
                  {{ $t("loginRegister.邮箱") }}
                </div>
              </div>
              <div class="login-form">
                <forget-phone
                  v-if="!curComp && curIndex === 0"
                  ref="formPhone"
                  @submit="submitForm"
                ></forget-phone>
                <forget-email
                  v-if="!curComp && curIndex === 1"
                  ref="formEmail"
                  @submit="submitForm"
                ></forget-email>
              </div>
            </div>
            <div class="login-form">
              <forget-code
                v-if="curComp === 'ForgetCode'"
                ref="ForgetCode"
                :params="params"
                :audit-params="auditParams"
                :authToken="authToken"
                :biz-type="3"
                @msg="handleModal"
                @submit="submitCode"
              ></forget-code>
              <reset-pwd
                v-if="curComp === 'ResetPwd'"
                :codeParams="codeParams"
                @success="handleSuccess"
              ></reset-pwd>

              <el-button
                type="primary"
                class="login-btn"
                v-if="curComp === 'ForgetCode'"
                @click="handleSubmitCode"
                >{{ $t("loginRegister.下一步") }}</el-button
              >
            </div>
          </div>
          <!-- 自定义弹窗，短信验证码为接收 -->
          <!-- <custom-modal :showModal="showModal">
            <template>
              <div class="code-modal">
                <div class="code-title">未收到短信验证码</div>
                <div class="code-content">
                  <div @click="showModal = false">
                    发送短信成功，若仍未收到验证码，可以尝试以下操作:
                  </div>
                  <div>1.检查绑定手机号是否欠费</div>
                  <div>2.检查是否位于短信垃圾箱中</div>
                  <div>3.请确认您的手机号是否正确</div>
                  <div>4.可能存在发送延迟,过10分钟后再重试</div>
                  <div>5.若此电话号已注册过,我们就不会再向您发送验证码</div>
                  <el-button
                    type="primary"
                    class="login-btn"
                    @click="showModal = false"
                    >我已知晓</el-button
                  >
                </div>
              </div>
            </template>
          </custom-modal> -->
          <custom-modal :showModal="showModal">
            <template>
              <div class="code-modal">
                <div class="code-title">
                  {{ $t("loginRegister.未收到验证码") }}？
                </div>
                <div class="code-content">
                  <div>
                    {{
                      $t(
                        "loginRegister.发送短信成功，若仍未收到验证码，可尝试下操作"
                      )
                    }}:
                  </div>
                  <div>
                    {{ $t("loginRegister.1,检查绑定的手机号是否欠费") }}
                  </div>
                  <div>
                    {{ $t("loginRegister.2,检查是否位于短信垃圾箱中") }}
                  </div>
                  <div>
                    {{ $t("loginRegister.3,请确认您的手机号是否正确") }}
                  </div>
                  <div>
                    {{
                      $t("loginRegister.4,可能存在发送延迟,过10分钟后再重试")
                    }}
                  </div>
                  <div>
                    {{
                      $t(
                        "loginRegister.5,若此电话号已注册过,我们就不会再向您发送验证码"
                      )
                    }}
                  </div>
                  <!-- <el-button
                    type="primary"
                    class="login-btn"
                    @click="showModal = false"
                    >{{$t('loginRegister.我已知晓')}}</el-button
                  > -->
                  <div @click="showModal = false" class="ido-btn">
                    {{ $t("loginRegister.我已知晓") }}
                  </div>
                </div>
              </div>
            </template>
          </custom-modal>

          <!-- 自定义弹窗，保存成功 -->
          <custom-modal :showModal="showSuccessModal">
            <template>
              <div class="code-modal modal-width">
                <div class="img-container">
                  <img src="@/assets/login-img/success.png" alt="" />
                </div>
                <div class="tip-success">密码修改成功</div>
                <el-button type="primary" class="login-btn" @click="backLogin"
                  >返回登录</el-button
                >
              </div>
            </template>
          </custom-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ForgetPhone from "./components/forgetPhone.vue";
import ForgetEmail from "./components/forgetEmail.vue";
import ForgetCode from "./components/forgetCode.vue";
import ResetPwd from "./components/resetPwd.vue";
import CustomModal from "@/components/customModal/index.vue";
import { checkAccount } from "@/api/login.js";
export default {
  name: "HelloWorld",
  components: {
    ForgetPhone,
    ForgetEmail,
    ForgetCode,
    ResetPwd,
    CustomModal,
  },
  data() {
    return {
      auditParams: null,
      codeParams: null,
      authToken: "",
      params: null,
      showModal: false,
      showSuccessModal: false,
      curIndex: 0,
      curComp: null,
      typeList: [
        {
          type: "手机",
        },
        {
          type: "邮箱",
        },
        // {
        //   type: '二维码'
        // }
      ],
      formRefList: ["formPhone", "formEmail", "formCode"],
    };
  },
  computed: {
    numberCount() {
      const userName = this.params && this.params.phone && this.params.phone;
      return userName;
    },
  },
  methods: {
    checkLoginType(item, index) {
      this.curIndex = index;
    },
    handleCheck(index) {
      this.curIndex = index;
    },
    /**
     * 提交方法
     */
    handleNext() {
      this.$refs[this.formRefList[this.curIndex]].submitForm();
    },
    // 提交表单
    submitForm(comp, params) {
      this.checkAccountExist(comp, params);
    },
    // 校验发送按钮
    handleSubmitCode() {
      this.$refs["ForgetCode"].handleNext();
    },
    // 检查手机号或者邮箱是否存在
    checkAccountExist(comp, params) {
      console.log(comp,params);
      checkAccount({
        username: params && params.phone ? `${params.phoneArea} ${params.phone}` : params.email,
      }).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            const { authPhone, authToken, authEmail, authGoogleAuth } =
              res.data.data;
            this.auditParams = {
              authPhone: authPhone || "",
              authEmail: authEmail || "",
              authGoogleAuth: authGoogleAuth || "",
            };
            this.authToken = authToken;

            this.curComp = null;
            this.$nextTick(() => {
              this.curComp = comp;
              this.params = params;
            });
          } else {
            this.$message.error(res.data.message);
          }
        }
      });
    },
    // 处理弹窗打开方式
    handleModal() {
      this.showModal = true;
    },
    // 获取短信验证码下一步
    submitCode(data) {
      this.curComp = null;
      this.$nextTick(() => {
        this.curComp = "ResetPwd";
        // 验证码 重置密码需要传入
        this.codeParams = {
          authToken: this.authToken,
          ...data,
        };
      });
    },
    // 保存成功
    handleSuccess() {
      this.showSuccessModal = true;
    },
    // 返回登录
    backLogin() {
      this.showSuccessModal = false;
      this.$router.push("/login");
    },

    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .login-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .login-img {
      width: 800px;
      height: 800px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login-box {
      margin: 120px 210px 0 0;
      .login-title {
        font-size: 40px;
        color: #333;
      }
      .cup {
        cursor: pointer;
      }
      .el-icon-arrow-left {
        font-size: 30px;
        padding-right: 10px;
      }
      .login-content {
        margin-top: 30px;
        position: relative;
        box-sizing: border-box;
        width: 540px;
        height: 529px;
        box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.04);
        border-radius: 20px;
        // padding: 131px 57px 54px 58px;
        .login-btn {
          margin-top: 30px;
          font-size: 20px;
        }
        .ido-btn {
          margin-top: 10px;
          width: 100%;
          height: 35px;
          line-height: 35px;
          color: #fff;
          background-color: #90ff00;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .modal-width {
          width: 400px;
          height: 360px;
          top: 12%;
          left: 23%;
          right: 23%;
        }
        .login-text {
          margin-bottom: 39px;
          font-size: 42px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #040a1a;
          text-align: center;
        }
        .login-type {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1 1 auto;
          list-style: none;
          border-radius: 5px;
          overflow: hidden;
          cursor: pointer;
          .login-phone {
            width: 100%;
            height: 64px;
            line-height: 64px;
            background: #f5f7fa;
            text-align: center;
            border-radius: 15px 0px 15px 0px;
            font-size: 22px;
            color: #69798d;
          }
          .login-email {
            width: 100%;
            height: 64px;
            line-height: 64px;
            background: #f5f7fa;
            text-align: center;
            border-radius: 0px 15px 0px 15px;
            font-size: 22px;
            color: #69798d;
          }
          .type-active {
            background: #fff;
            color: #333;
          }
        }
        .login-form {
          padding: 60px 30px 0 30px;
        }
      }
    }
  }
}

::v-deep .el-input__inner {
  height: 55px;
  font-size: 22px;
}

::v-deep .el-input__inner::placeholder {
  font-size: 22px;
}
</style>
