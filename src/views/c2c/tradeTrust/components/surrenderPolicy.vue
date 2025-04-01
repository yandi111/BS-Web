<!-- 申请退保 -->
<template>
  <div v-if="!isLoading">
    <common-modal
      :title="$t(t+title)"
      width="600px"
      :show="isShow"
      :noFooter="noFooter"
      :showClose="showClose"
      :cancelText="$t(t+'取消')"
      :sureText="$t(t+'确认退保')"
      :append-to-body="true"
      :FooterIsCenter="true"
      @cancel="handleCancel"
      @save="sureApply"
    >
      <template #dia_content>
        <div class="aduit-content" v-if="status === 7">
          <div class="img-container">
            <img src="@/assets/images/apply-wait.png" alt="" />
          </div>
          <p class="status">{{$t(t+'退保申请提交成功，正在等待审核！')}}</p>
          <p class="tip">{{$t(t+'我们将在收到资料后尽快进行审核')+$t(t+'请耐心等待！')}}</p>
        </div>

        <div class="aduit-content" v-else-if="status === 8">
          <div class="img-container">
            <img src="@/assets/images/apply-fail.png" alt="" />
          </div>
          <p class="status">{{$t(t+'审核失败，需重新提交退保申请！')}}</p>
          <p class="tip">{{$t(t+'请重新提交退保申请原因')}}</p>
          <el-button type="primary" @click="restartApply"
            >{{$t(t+'重新提交审核资料')}}</el-button
          >
        </div>

        <div class="form-common" v-else>
          <div class="tip">
            <i class="el-icon-warning-outline"></i>
            <span class="title">{{$t(t+'温馨提示')}}</span>
          </div>
          <div class="content">
            <p>1.{{$t(t+'您正在进行商家注销操作，确认提交申请操作后，将无法撤销。')}}</p>
            <p>{{ $t(t+'注销前，您发布的广告需全部下架。') }}</p>
            <p>{{ $t(t+'注销后，您的保证金将在1-5个工作日退回。') }}</p>
          </div>
          <el-form
            :model="formData"
            :rules="rules"
            ref="applyForm"
            label-position="top"
            v-if="status !== 7 && status !== 8"
          >
            <el-form-item prop="remark" :label="$t(t+'填写退保原因')">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :rows="4"
                autocomplete="off"
                :placeholder="$t(t+'请')+$t(t+'填写退保原因')"
                maxlength="300"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </common-modal>
    <validate-info
      :is-show.sync="validateShow"
      :params="params"
      @next="startApprove"
    ></validate-info>
  </div>
</template>

<script>
import { merchantRefund, merchantCheck, getMerhantAuth } from "@/api/otc.js";
import ValidateInfo from "./validateInfo.vue";
import { authItemStong } from "@/api/common";
export default {
  name: "SurrenderPolicy",
  components: {
    ValidateInfo,
  },
  data() {
    return {
      showClose: true,
      isLoading: true,
      isShow: false,
      merchantId: null,
      noFooter: false,
          // 国际缩写
          t: 'c2c.',
      title: "申请退保",
      validateShow: false,
      // 参数验证信息，需要接口获取参数
      params: null,
      // 商户状态 7 退保中 8退保失败 null初始状态，申请退保 4:已禁止 5.解禁失败 5.解禁申请
      status: null,
      formData: {
        remark: "",
      },
      rules: {
        remark: [
          { required: true, message: "退保原因不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.isShow = true;
    this.merchantCheck();
  },
  methods: {
    // 确认退保
    sureApply() {
      this.$refs.applyForm.validate((valid) => {
        if (valid) {
          // 查询商户信息
          getMerhantAuth().then((res) => {
            // 验证
            authItemStong({ data: 35 }).then((auth) => {
              this.params = {
                email: auth.data.email,
                phone: auth.data.phone,
                authToken: auth.data.authToken,
                bizType: 35,
                tradePasswordStatus: auth.data.tradePasswordStatus,
              };
              // 商户id
              this.merchantId = res.data.merchantId;
              this.validateShow = true;
              this.title = "退保审核";
            });
          });
        }
      });
    },
    // 开始审核，提交审核数据
    startApprove(item) {
      // 验证通过后申请退保
      merchantRefund({
        merchantId: this.merchantId,
        remark: this.formData.remark,
        successToken: item.successToken,
      }).then((res) => {
        this.isShow = false;
        this.$emit("next");
      });
    },
    // 查询当前登录人商户审核状态
    merchantCheck() {
      merchantCheck().then((res) => {
        // 得到商户状态
        this.status = res.data;
        this.isLoading = false;
        if (this.status === 7 || this.status === 8) {
          // 隐藏底部按钮
          this.noFooter = true;
        }
      });
    },
    // 是否自定义返回
    handleCancel() {
      this.$emit("update:isShow", false);
      // if (!this.showClose) {
      // 	this.$router.go(-1)
      // }
    },
    // 重新提交审核资料
    restartApply() {
      this.status = 17;
      this.noFooter = false;
    },
  },
};
</script>
<style lang="scss" scoped>
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
  .el-icon-warning-outline {
    font-size: 18px;
    color: #fa9c93;
  }
  .tip {
    margin-bottom: 20px;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      padding-left: 5px;
    }
  }
  .content {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 6px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    p {
      height: 22px;
      line-height: 22px;
    }
  }
}

::v-deep   .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
}

.add-pay {
  ::v-deep   .el-dialog__body {
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
}

// 文件上传
.upload-demo {
  padding-right: 30px;
  .upload-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 100px;
    line-height: 180px;
    text-align: center;
    border-radius: 6px;
    color: #90ff00;
    background-color: #f5f5f5;
    .upload-title {
      padding-left: 15px;
      font-size: 14px;
    }
  }
}

.aduit-content {
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img-container {
    width: 186px;
    height: 131px;
    margin-bottom: 60px;
		img{
			width: 100%;
			height: 100%;
		}
  }
  .status {
    width: 288px;
    font-size: 18px;
    text-align: center;
    font-family: PingFangSC-Semibold, PingFang SC;
    height: 50px;
    line-height: 50px;
    font-weight: 600;
    color: #333333;
  }
  .tip {
    text-align: center;
    width: 288px;
    padding: 0 30px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 400;
    color: #8992a6;
  }
  .el-button {
    margin-top: 40px;
    width: 345px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }
}
</style>
