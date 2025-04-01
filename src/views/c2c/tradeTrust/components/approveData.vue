<!-- 认证资料 -->
<template>
  <div>
    <common-modal
      :title="$t(t + '认证资料')"
      width="600px"
      :show="isShow"
      :noFooter="false"
      :showClose="true"
      :append-to-body="true"
      :FooterIsCenter="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_content>
        <div class="form-common">
          <el-form
            :model="formData"
            :rules="rules"
            ref="payForm"
            label-position="top"
          >
            <el-form-item prop="phone" :label="$t(t + '手机号')" v-if="chinaPhone">
              <el-input
                v-model="formData.phone"
                autocomplete="off"
                :placeholder="$t(t + '请输入') + $t(t + '手机号')"
                readonly
                class="readonly"
              >
                <el-button
                  type="primary"
                  size="mini"
                  v-if="!formData.phone"
                  slot="suffix"
                  @click.stop="goBind('phone')"
                >
                  {{ $t(t + "去绑定") }}
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="email" :label="$t(t + '邮箱')">
              <el-input
                v-model="formData.email"
                autocomplete="off"
                :placeholder="$t(t + '请输入') + $t(t + '邮箱')"
                readonly
                class="readonly"
              >
                <el-button
                  type="primary"
                  size="mini"
                  v-if="!formData.email"
                  slot="suffix"
                  @click.stop="goBind('email')"
                >
                  {{ $t(t + "去绑定") }}
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="wechat" :label="$t(t + '微信')">
              <el-input
                v-model="formData.wechat"
                autocomplete="off"
                :placeholder="$t(t + '请输入') + $t(t + '微信')"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="amount"
              :label="`${$t(t + '保证金')} (${
                authMerchan.earnestMoneyCoinName
              })`"
              class="readonly"
            >
              <el-input
                v-model="formData.amount"
                autocomplete="off"
                readonly
              >
            <template slot="suffix" v-if="!authMerchan.canEarnestMoney">
              <span @click="$router.push('/wallet/capitalAccount')"  style="color:#333333" class="noSifity">未满足
                <img style="margin: 0 10px;width: 17px;height: 12px;" src="@/assets/buy-coins/noSafity.png" alt="">
              </span>
            </template>
            </el-input>
            </el-form-item>
            <el-form-item
              prop="card"
              :label="$t(t + '身份证')"
              class="formOverflow"
            >
              <div style="display: flex">
                <ImageUpload
                  :isShowTip="false"
                  ref="ImageUpload"
                  v-model="formData.idFront"
                  :limit="1"
                  listType="picture-card"
                >
                  <template #content>
                    <div class="upload-btn" v-if="!formData.idFront">
                      <span class="upload-title" v-if="!formData.idFront">
                        {{ $t(t + "身份证正面") }}</span
                      >
                      <el-image v-else :src="formData.idFront" fit="cover" />
                    </div>
                  </template>
                </ImageUpload>

                <ImageUpload
                  :isShowTip="false"
                  ref="ImageUpload"
                  v-model="formData.idReverse"
                  :limit="1"
                  :fileSize="10"
                  listType="picture-card"
                >
                  <template #content>
                    <div class="upload-btn" v-if="!formData.idReverse">
                      <span class="upload-title" v-if="!formData.idReverse">
                        {{ $t(t + "身份证反面") }}</span
                      >
                    </div>
                  </template>
                </ImageUpload>
              </div>
            </el-form-item>
            <el-form-item prop="video" :label="$t(t + '上传视频')">
              <ImageUpload
                :isShowTip="false"
                @input="(file) => (formData.video = file)"
                :value="formData.video"
                :isVideo="true"
                :fileSize="200"
                :fileType="['avi', 'rmvb', 'mpeg', 'mpg', 'mp4', 'wmv']"
              >
                <template #content>
                  <div class="upload-btn" v-if="!formData.video">
                    {{ $t(t + "上传录制视频") }}
                  </div>
                  <video
                    v-else
                    class="video inline-block"
                    :src="formData.video"
                    controls="controls"
                    poster="images.jpg"
                  >
                    {{ $t(t + "您的浏览器不支持 video 标签") }}。
                  </video>
                </template>
              </ImageUpload>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <template #dia_footer>
        <el-button
          :type="authMerchan.canEarnestMoney ? 'primary' :'info'"
          :class="authMerchan.canEarnestMoney? 'modal-btn' : 'disableInfo modal-btn'"
          @click="handleApprove"
          :disabled="authMerchan.canEarnestMoney? false :true"
        >
          {{ $t(t + "提交申请") }}
        </el-button>
      </template>
    </common-modal>
  </div>
</template>

<script>
import { getUserInfoApply,isChina } from "@/api/otc.js";
import { simpleApi } from "@/api/assetWallet";
import ImageUpload from "@/components/ImageUpload/index.vue";
export default {
  name: "ApproveData",
  components: {
    ImageUpload,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    authMerchan: {
      type: Object,
    },
  },
  data() {
    // 身份证校验
    const validCard = (rule, value, callback) => {
      if (!this.formData.idReverse || !this.formData.idFront) {
        callback(new Error(this.$t(this.t + "请上传身份证信息")));
      } else {
        callback();
      }
    };

    // 身份证校验
    const validVideo = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t(this.t + "请上传视频信息")));
      } else {
        callback();
      }
    };
    return {
      timer: null, // 计时器
      codeTime: null, // 发送验证码倒计时
      sendMsgDisabled: false, // 是否显示发送验证码按钮
      // 国际缩写
      t: "c2c.",
      formData: {
        email: "",
        phone: "",
        wechat: "",
        amount: "",
        coinId: "",
        coinName: "",
        // 身份证正面
        idReverse: "",
        // 身份证反面
        idFront: "",
        video: "",
        applyEntranceType: 1,
      },
      rules: {
        wechat: [
          {
            required: true,
            message: this.$t("c2c.(必填)微信号"),
            trigger: "blur",
          },
        ],
        card: [{ required: true, validator: validCard, trigger: "blur" }],
        video: [{ required: true, validator: validVideo, trigger: "blur" }],
      },
       chinaPhone:true,
    };
  },
  created() {
    this.getUserInfoApply();
    this.getCoinList();
  },
  methods: {
    handleSuccess(file, type) {
      // console.log(file, type);
      switch (type) {
        case "front":
          break;
        case "back":
          break;
        case "video":
          break;
        default:
      }
    },
    //获取币种列表
    getCoinList() {
      simpleApi({ isType: 0 }).then((res) => {
        const item = res.data.data;
        this.formData.coinId = item.find(
          (coin) => coin.coinName === this.authMerchan.earnestMoneyCoinName
        ).coinId;
      });
    },
    // 获取用户信息
    getUserInfoApply() {
      getUserInfoApply().then((res) => {
        this.$nextTick((_) => {
          this.formData.email = res.data.email;
          this.formData.phone = res.data.phoneNo;
          this.formData.amount = this.authMerchan.earnestMoney;
          this.formData.coinName = this.authMerchan.earnestMoneyCoinName;
        });
      });
      isChina({}).then(res => {
        this.chinaPhone = res.data.data
      })
    },
    // 验证下一步
    handleApprove() {
      this.$refs["payForm"].validate((valid) => {
        if (valid) {
          this.$emit("next", this.formData);
        }
      });
    },
    // 去绑定
    goBind(type) {
      this.$router.push(
        `/user/securitySetting?curComp=${
          type == "phone" ? "bindPhone" : "bindEmail"
        }`
      );
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__suffix{
  cursor: pointer;
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

// 表格padding
.form-common {
  padding: 0 30px;
  height: 600px;
  max-height: 600px;
  overflow-y: auto;
}
::v-deep .el-input .el-input__inner{
  background-color: #F4F5F7;
  border: none !important;
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
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

.modal-btn {
  height: 50px;
  width:100%;

}
.disableInfo {
color: #333333 !important;
background-color: #F4F5F7 !important;
border: none;
}
/* 当输入框被选中时的样式 */

::v-deep .readonly {
  .el-input__inner {
    cursor: not-allowed;
    &:focus,
    &:hover {
      border-color: #dcdfe6 !important;
    }
  }
}

/* 文件上传 */
.upload-demo {
  padding-right: 30px;
}
.upload-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 100px;
  text-align: center;
  border-radius: 6px;
  color: #90ff00;
  background-color: #F4F5F7;
  margin-right: 20px;
  overflow: hidden;
  .upload-title {
    font-size: 14px;
  }
  .el-image {
    width: 180px;
    height: 100px;
  }
}



.video {
  max-width: 500px;
  max-height: 500px;
}
.formOverflow {
  .component-upload-image {
    width: 180px;
    height: 100px;
    overflow: hidden;
  }
}

::v-deep .el-upload-list--picture-card .el-upload-list__item {
  width: 180px;
  height: 100px;
  margin-right: 20px;
  overflow: hidden;
}
</style>
