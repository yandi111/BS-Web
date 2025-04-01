<!-- 绑定手机 -->
<template>
  <div>
    <div class="user-form" v-if="isComp == 'editPhone'">
      <div class="title-context">
        <i class="el-icon-arrow-left" @click="handleSuccess"></i>
        <span class="title" @click="handleSuccess">{{
          $t("userInfo.修改手机")
        }}</span>
      </div>
      <div class="form-container">
        <el-form
          label-position="top"
          :model="formData"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item prop="contact" :label="$t('userInfo.输入新的手机号码')">
            <!-- <el-input
            v-model="formData.contact"
            class="input-with-select form-input"
            placeholder="请输入手机号码"
            ref="phoneRef"
          >
            <div slot="prefix" class="prefix-content" @click.stop="handleCode">
              <div class="text">{{ activeItem }}</div>
              <i
                :class="[
                  'custom-icon',
                  popperShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down',
                ]"
              ></i>
            </div>
          </el-input> -->
            <div class="phone-form">
              <div class="phone-l">
                <div class="phone-c">
                  <div class="c-code">{{ activeItem }}</div>
                  <div class="c-select" @click.stop="handleCode">
                    <i
                      :class="[
                        'custom-icon',
                        popperShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down',
                      ]"
                    ></i>
                  </div>
                </div>
              </div>
              <div class="phone-r">
                <el-input
                  v-model="formData.contact"
                  class="input-with-select form-input"
                  :placeholder="$t('userInfo.请输入手机号码')"
                  ref="phoneRef"
                ></el-input>
              </div>
            </div>
            <!-- <el-popover
            placement="bottom"
            width="480"
            :offset="2"
            trigger="click"
            :visible-arrow="true"
            v-model="popperShow"
          >
            <div class="popper-content">
              <div class="input-content">
                <el-input v-model="areaName" placeholder="搜索"></el-input>
              </div>
              <ul>
                <li
                  v-for="(item, index) in phoneAreaList"
                  :key="index"
                  @click="handleChoose(item)"
                  :style="{
                    'background-color':
                      item.value === activeItem ? '#EDF1FF' : '',
                  }"
                >
                  {{ item.label }}（{{ item.value }}）
                </li>
              </ul>
            </div>
          </el-popover> -->
            <!-- <div>111</div> -->
            <PhoneCode
              ref="phoneRefs"
              :list.sync="phoneAreaList"
              @shangeData="shangeData"
            />
          </el-form-item>
          <el-form-item
            prop="captcha"
            :label="$t('userInfo.将发送验证码到您的新手机号码')"
          >
            <el-input
              v-model="formData.captcha"
              class="form-input"
              autocomplete="off"
              :placeholder="$t('userInfo.请输入短信验证码')"
              maxlength="6"
            >
              <span
                class="code"
                slot="suffix"
                @click.stop="getNewPhoneCode"
                v-if="!sendMsgDisabled"
                >{{ $t("userInfo.获取验证码") }}</span
              >
              <span class="code resend" slot="suffix" v-else>
                {{ $t("userInfo.重新发送") + codeTime + "s" }}</span
              >
            </el-input>
            <div class="noreceive-message">
              {{
                $t("userInfo.输入发送到") +
                protectPhone +
                $t("userInfo.的6位验证码")
              }}
              <!-- <span @click="noReceiveMsg(formData.phone)">{{
              $t("userInfo.未收到验证码？")
            }}</span> -->
            </div>
          </el-form-item>
          <el-form-item
            prop="phoneCode"
            :label="$t('userInfo.将发送验证码到您的') + `${protectPhoneOld}`"
            v-if="checkResult && checkResult.authPhone"
          >
            <el-input
              v-model="formData.phoneCode"
              class="form-input"
              autocomplete="off"
              :placeholder="$t('userInfo.请输入短信验证码')"
              maxlength="6"
            >
              <span
                class="code"
                slot="suffix"
                @click.stop="getOldPhoneCode"
                v-if="!sendMsgDisabledOp"
                >{{ $t("userInfo.获取验证码") }}</span
              >
              <span class="code resend" slot="suffix" v-else>{{
                $t("userInfo.重新发送") + codeTime1 + "s"
              }}</span>
            </el-input>
            <div class="noreceive-message">
              {{ $t("userInfo.输入发送到") }}
              {{ protectPhoneOld }} {{ $t("userInfo.的6位验证码") }}
              <!-- <span @click="noReceiveMsg(oldPhone)">{{
              $t("userInfo.未收到验证码？")
            }}</span> -->
            </div>
          </el-form-item>
          <el-form-item
            v-if="checkResult && checkResult.authEmail"
            prop="emailCode"
            :label="$t('userInfo.邮箱验证')"
          >
            <el-input
              v-model="formData.emailCode"
              class="form-input"
              autocomplete="off"
              :placeholder="$t('userInfo.请输入邮箱验证码')"
              maxlength="6"
            >
              <span
                class="code"
                slot="suffix"
                @click.stop="getEmailCode"
                v-if="!sendMsgDisabledEm"
                >{{ $t("userInfo.获取验证码") }}</span
              >
              <span class="code resend" slot="suffix" v-else>{{
                $t("userInfo.重新发送") + codeTime2 + "s"
              }}</span>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="checkResult && checkResult.authGoogleAuth"
            prop="authCode"
            :label="$t('userInfo.谷歌验证')"
          >
            <el-input
              class="form-input"
              v-model="formData.authCode"
              :placeholder="$t('userInfo.请输入谷歌验证码')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="submit">{{
              $t("userInfo.确认")
            }}</el-button>
            <div>
              <span class="verifyCode" @click="showModal"
                >{{$t('userInfo.无法收到验证码')}}</span
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- <verify-form
      :is-show.sync="showVeriy"
      @next="handleVerifyForm"
      :is-need-api="false"
      :is-need-secret="false"
      :is-need-phone="checkResult && checkResult.authPhone"
      :is-need-google="checkResult && checkResult.authGoogleAuth"
      :is-need-email="checkResult && checkResult.authEmail"
    ></verify-form> -->

      <success-modal
        :is-show.sync="showSuccess"
        :text="$t('userInfo.绑定手机成功')"
        @next="handleSuccess"
      ></success-modal>
      <my-modal
        :isShow.sync="isShowModal"
        @close="closeModal"
        :title="$t('userInfo.无法收到验证码')"
      >
        <template #content>
          <div>{{$t('userInfo.发送短信成功，若仍未收到验证码，可以尝试以下操作')}}</div>
          <div>{{$t('userInfo.检查绑定手机号是否欠费')}}</div>
          <div>{{$t('userInfo.检查是否位于短信垃圾堆中')}}</div>
          <div>{{$t('userInfo.请确认您的手机号是否正确')}}</div>
          <div>{{$t('userInfo.可能存在发送延迟，过10分钟后再重试')}}</div>
          <div>{{$t('userInfo.若此电话号已注册过，我们就不会再向您发送验证码')}}</div>
        </template>
        <template #footer>
          <div class="modal-btn">
            <div class="m-item" @click="onService">{{$t('userInfo.联系客服')}}</div>
            <div class="m-item m-bg" @click="closeModal">{{$t('userInfo.好的')}}</div>
          </div>
        </template>
      </my-modal>
    </div>
    <!-- 重置手机 -->
    <div v-if="isComp == 'resetPhone'">
      <phone-verication
        :veridata="veridata"
        @back="handleBack"
        @submit="onUpdatePhone"
      ></phone-verication>
    </div>
    <!-- 绑定手机 -->
    <div v-if="isComp == 'updatePhone'">
      <ResetPhoneUpdate
        :successToken="successToken"
        @back="phoneUpdateBack"
      ></ResetPhoneUpdate>
    </div>
  </div>
</template>

<script>
const TIME_COUNT = 59;
import { securityPhone } from "@/libs/utils";
// import { sendNoauthCaptcha } from "@/api/login.js";
import VerifyForm from "@/components/verifyForm.vue";
import SuccessModal from "@/components/successModal.vue";
import myModal from "@/components/my-modal";
import PhoneCode from "@/components/phoneCode";
import phoneVerication from "../safetyVerification/phoneVerication.vue";
import ResetPhoneUpdate from "../resetUpdate/resetPhoneUpdate.vue";
import {
  editPhone,
  countryList,
  getPhoneAuthItem,
} from "@/api/user.js";
import { authItem, captchaSend, commonSendCaptcha } from "@/api/common";
export default {
  name: "EditPhone",
  components: {
    VerifyForm,
    SuccessModal,
    PhoneCode,
    myModal,
    phoneVerication,
    ResetPhoneUpdate,
  },
  data() {
    // 手机号验证
    const validPhone = (rule, value, callback) => {
      let reg = this.activeItem == "+86" ? /^[0-9]{11}$/ : /^\d{5,15}$/;
      if (!value) {
        callback(new Error(this.$t("userInfo.请输入手机号码")));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(this.$t("userInfo.请输入正确的手机格式")));
        }
      }
    };
    return {
      isComp: "editPhone",
      authToken: "", //认证token
      areaName: "",
      checkResult: null,
      oldPhone: "",
      activeItem: "+86",
      popperShow: false,
      showSuccess: false,
      showVeriy: false,
      isShowModal: false,
      timer: null, // 计时器
      codeTime: null, // 发送验证码倒计时
      sendMsgDisabled: false, // 是否显示发送新手机验证码按钮
      timer1: null, // 计时器(旧手机)
      codeTime1: null, // 发送验证码倒计时（旧手机）
      sendMsgDisabledOp: false, // 是否显示发送旧手机验证码按钮
      sendMsgDisabledEm: false, // 是否显示发送验证码按钮(邮箱)
      timer2: null, //计时器（邮箱）
      codeTime2: null, //发送倒计时（邮箱）
      formData: {
        contact: "", //新手机号
        captcha: "", //新手机号验证码
        authToken: "", //认证token
        phoneCode: "", //旧手机号验证码
        emailCode: "", //邮箱验证码
        authCode: "", //谷歌验证码
      },
      rules: {
        contact: [{ required: true, validator: validPhone, trigger: "blur" }],
        captcha: [
          {
            required: true,
            message: this.$t("userInfo.验证码不能为空"),
            trigger: "change",
          },
        ],
        phoneCode: [
          {
            required: true,
            message: this.$t("userInfo.验证码不能为空"),
            trigger: "change",
          },
        ],
        emailCode: [
          {
            required: true,
            message: this.$t("userInfo.验证码不能为空"),
            trigger: "change",
          },
        ],
        authCode: [
          {
            required: true,
            message: this.$t("userInfo.验证码不能为空"),
            trigger: "change",
          },
        ],
      },
      phoneAreaList: [],
      //优化
      codeShow: false,
      veridata: {},
      successToken: null,
    };
  },
  computed: {
    protectPhone() {
      return this.formData.captcha && securityPhone(this.formData.captcha);
    },
    protectPhoneOld() {
      return this.oldPhone && securityPhone(this.oldPhone);
    },
  },
  created() {
    //监听点击事件
    document.addEventListener("click", () => {
      this.popperShow = false;
      this.$refs.phoneRefs.closeFn();
    });
    //获取焦点
    // this.$nextTick(() => {
    //   this.$refs.phoneRef.focus();
    // });
    this.getCountryList();
    this.getOldPhone();
    this.getAuthItem();
  },
  methods: {
    //获取认证
    getAuthItem() {
      authItem({ data: 8 }).then((res) => {
        this.checkResult = res.data;
        this.authToken = res.data?.authToken;
      });
    },
    //获取旧手机号
    getOldPhone() {
      // infoHome().then((res) => {
      //   if (res && res.status === 200) {
      //     if (res.data && res.data.success) {
      //       this.oldPhone = res.data.data.phoneNo;
      //     }
      //   }
      // });
    },
    noReceiveMsg(data) {
      this.$emit("msg", data);
    },
    // handleChoose(item) {
    //   this.activeItem = item.value;
    // },
    // 获取新手机验证码
    getNewPhoneCode() {
      if (this.formData.contact === "") {
        this.$nextTick(() => {
          this.$refs.phoneRef.focus();
        });
        return;
      }
      let params = {
        contact: `${this.activeItem} ${this.formData.contact}`,
        authToken: this.authToken,
        bizType: 8, //8更新手机号
      };
      if (!this.timer) {
        this.sendMsgDisabled = true;
        this.codeTime = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.codeTime > 1 && this.codeTime <= TIME_COUNT) {
            this.codeTime--;
          } else {
            this.sendMsgDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      captchaSend(params)
        .then(() => {
          // 成功
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // 获取旧手机验证码
    getOldPhoneCode() {
      let params = {
        captchaType: 1, //验证类型1手机
        authToken: this.authToken,
        bizType: 8, //更新手机号
      };
      if (!this.timer1) {
        this.sendMsgDisabledOp = true;
        this.codeTime1 = TIME_COUNT;
        this.timer1 = setInterval(() => {
          if (this.codeTime1 > 1 && this.codeTime1 <= TIME_COUNT) {
            this.codeTime1--;
          } else {
            this.sendMsgDisabledOp = false;
            clearInterval(this.timer1);
            this.timer1 = null;
          }
        }, 1000);
      }
      commonSendCaptcha(params)
        .then((res) => {
          if (res && res.status === 200) {
            // 成功
            if (res.data && res.data.success) {
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    //邮箱验证
    getEmailCode() {
      let params = {
        captchaType: 2, //验证类型2邮箱
        authToken: this.authToken,
        bizType: 8, //更新手机号
      };
      if (!this.timer2) {
        this.sendMsgDisabledEm = true;
        this.codeTime2 = TIME_COUNT;
        this.timer2 = setInterval(() => {
          if (this.codeTime2 > 1 && this.codeTime2 <= TIME_COUNT) {
            this.codeTime2--;
          } else {
            this.sendMsgDisabledEm = false;
            clearInterval(this.timer2);
            this.timer2 = null;
          }
        }, 1000);
      }
      commonSendCaptcha(params)
        .then((res) => {
          if (res && res.status === 200) {
            // 成功
            if (res.data && res.data.success) {
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // 提交
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //修改手机号
          const params = {
            contact: `${this.activeItem} ${this.formData.contact}`,
            captcha: this.formData.captcha,
            authToken: this.authToken,
            phoneCode: this.formData.phoneCode,
            emailCode: this.formData.emailCode,
            authCode: this.formData.authCode,
          };
          editPhone(params).then((res) => {
            if (res && res.status === 200) {
              if (res.data && res.data.success) {
                this.showSuccess = true;
                this.$store.dispatch("getUserInfo");
              }
            }
          });
        }
      });
    },
    //获取国家列表
    getCountryList() {
      countryList().then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            const { data } = res.data;
            const list = [];
            data.map((item) => {
              list.push({
                label: item.name,
                value: `+${item.code}`,
                phoneRegex: item.phoneRegex,
              });
            });
            this.phoneAreaList = list;
          }
        }
      });
    },
    handleCode() {
      this.popperShow = !this.popperShow;
      this.$refs.phoneRefs.showFn();
    },
    shangeData(item) {
      this.activeItem = item.value;
      this.popperShow = false;
      this.$refs["ruleForm"].resetFields();
    },
    // 验证表单
    // handleVerifyForm(data) {
    //   let params = {
    //     contact: this.formData.phone,
    //     captcha: this.formData.phoneCode,
    //     authToken: data.authToken,
    //     phoneCode: this.formData.phoneCode1,
    //     emailCode: data.emailCode,
    //     authCode: data.googleCode,
    //   };
    //   editPhone(params).then((res) => {
    //     if (res && res.status === 200) {
    //       if (res.data && res.data.success) {
    //         this.showSuccess = true;
    //       }
    //     }
    //   });
    // },
    // 成功返回页面
    handleSuccess() {
      this.$emit("success");
      this.$emit("updateStatus");
    },
    showModal() {
      /**
       点击无法收到验证码，需判断：
      是否绑定邮箱或谷歌，有则跳转下一个页面。两个都没绑定则弹窗提示联系客服
       */
      getPhoneAuthItem()
        .then((res) => {
          if (res.data?.data?.authEmail || res.data?.data?.authGoogleAuth) {
            //下一个验证页面
            this.isComp = "resetPhone";
            // 验证数据
            this.veridata = res.data?.data;
          } else {
            this.isShowModal = true;
          }
        })
        .catch(() => {
          this.isShowModal = true;
        });
    },
    closeModal() {
      this.isShowModal = false;
    },
    onService() {
      zE("messenger", "open");
    },
    handleBack() {
      this.isComp = "editPhone";
    },
    onUpdatePhone(token) {
      this.isComp = "updatePhone";
      this.successToken = token;
    },
    //绑定手机
    phoneUpdateBack() {
      this.isComp = "resetPhone";
    },
  },
};
</script>
<style lang="scss" scoped>
.user-form {
  // padding: 60px;
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
      // margin-bottom: 40px;
      cursor: pointer;
    }
  }

  // .prefix-content {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   width: 85px;
  //   height: 50px;
  //   line-height: 50px;
  //   position: relative;
  //   padding: 0 10px;
  //   cursor: pointer;
  //   &::before {
  //     position: absolute;
  //     content: "";
  //     width: 1px;
  //     height: 40%;
  //     top: 30%;
  //     right: 0;
  //     background-color: #333333;
  //     z-index: 999;
  //     opacity: 0.4;
  //   }
  //   .text {
  //     font-size: 14px;
  //     font-family: PingFangSC-Regular, PingFang SC;
  //     font-weight: 400;
  //     color: #333333;
  //   }
  //   .custom-icon {
  //     font-size: 12px;
  //     color: #272636;
  //   }
  // }
  .verifyCode {
    cursor: pointer;
    color: #90ff00;
  }
  .phone-form {
    display: flex;
    .phone-l {
      min-width: 80px;
      display: flex;
      align-items: center;
      height: 50px;
      border: 1px solid #dcdfe6;
      margin-right: 5px;
      background: #f4f5f7;
      .phone-c {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .c-code {
          margin-left: 10px;
        }
        .c-select {
          margin: 0 10px;
        }
      }
    }
    .phone-r {
      flex: 1;
    }
  }

  .form-container {
    width: 500px;
    padding: 40px 0 0 40px;
    .noreceive-message {
      text-align: left;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #8992a6;
      > span {
        color: $colorB;
        cursor: pointer;
        padding-left: 10px;
      }
    }
  }

  ::v-deep .el-input-group__prepend {
    background-color: #fff !important;
  }

  ::v-deep .el-form-item__error {
    font-size: 14px;
  }
  ::v-deep .el-form-item {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 18px;
    }
  }

  ::v-deep .el-input--prefix .el-input__inner {
    padding-left: 20px;
  }

  ::v-deep .input-with-select {
    > .el-input__inner {
      // padding-left: 100px;
    }
  }

  ::v-deep .form-input {
    > .el-input__inner {
      height: 50px;
      // border: none;
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

  ::v-deep .el-form-item__label {
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

::v-deep .el-popover {
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
.modal-btn {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  .m-item {
    height: 40px;
    line-height: 40px;
    color: #90ff00;
    border: 1px solid #90ff00;
    border-radius: 4px;
    text-align: center;
    padding: 0 30px;
    cursor: pointer;
  }
  .m-bg {
    background: #90ff00;
    color: #fff;
  }
}
</style>
