<!-- 申请解禁 -->
<template>
  <div>
    <common-modal
      :title="$t(t+title)"
      width="700px"
      :show="isShow"
      :noFooter="noFooter"
      :showClose="true"
      :cancelText="$t(t+'取消')"
      :sureText=" $t(t+'提交')"
      :append-to-body="true"
      :FooterIsCenter="true"
      @cancel="$emit('update:isShow', false)"
      @save="sureApply"
    >
      <template #dia_content>
        <div class="form-common">
          <div class="tip" v-if="status !== 7 && status !== 8">
            <i class="el-icon-warning-outline"></i>
            <span class="title">{{$t(t+'温馨提示')}}</span>
          </div>
          <div class="content" v-if="status !== 7 && status !== 8">
            <p>1.{{$t(t+'您正在进行商家注销操作，确认提交申请操作后，将无法撤销。')}}</p>
            <p>2.{{$t(t+'申请解禁前前，您将无法发布广告')}}。</p>
            <p>3.{{$t(t+'申请解禁后，您的商户将在1-3个工作日内审核完成')}}。</p>
          </div>
          <el-form
            :model="formData"
            :rules="rules"
            ref="applyForm"
            label-position="top"
          >
            <el-form-item prop="remark" :label="$t(t+'填写解禁原因')">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :rows="4"
                autocomplete="off"
                :placeholder="$t(t+'请输入解禁原因')"
                maxlength="300"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="aduit-content" v-if="status === 7">
          <div class="img-container">
            <img src="@/assets/images/apply-wait.png" alt="" />
          </div>
          <p class="status">{{ $t(t+'解禁申请提交成功，正在等待审核') }}！</p>
          <p class="tip">{{ $t(t+'我们将在收到资料后尽快进行审核请耐心等待') }}！</p>
        </div>

        <div class="aduit-content" v-if="status === 8">
          <div class="img-container">
            <img src="@/assets/images/apply-success.png" alt="" />
          </div>
          <p class="status">{{ $t(t+'解禁申请失败，需重新提交解禁申请') }}！</p>
          <!-- <p class="tip">请重新提交退保申请原因</p> -->
          <!-- <el-button type="primary" @click="restartApply">重新提交审核资料</el-button> -->
        </div>
      </template>
    </common-modal>
  </div>
</template>

<script>
import { merchantBanApply, getMerhantAuth, merchantCheck } from "@/api/otc.js";
import ValidateInfo from "./validateInfo.vue";
import { authItemStong } from "@/api/common";
export default {
  name: "SurrenderPolicy",
  components: {
    ValidateInfo,
  },
  data() {
    return {
      isShow: false,
      merchantId: null,
      noFooter: false,
      title: "申请解禁",
        // 国际缩写
        t: 'c2c.',
      validateShow: false,
      // 参数验证信息，需要接口获取参数
      params: null,
      // 商户状态  0未申请 1审核通过 2审核中 3审核失败 4:已禁止 5.解禁失败 6.解禁申请 7 申请退保中 8申请退保失败
      status: null, //null初始状态，申请退保
      formData: {
        remark: "",
      },
      rules: {
        remark: [
          { required: true, message:  this.$t( this.t+'取消原因不能为空') , trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.isShow = true;
  },
  methods: {
    // 提交解禁
    sureApply() {
      this.$refs.applyForm.validate((valid) => {
        if (valid) {
          // 验证通过后申请解禁
          merchantBanApply({ remark: this.formData.remark }).then((res) => {
            // 查询当前登录人商户审核状态
            this.isShow = false;
            this.$message({
            message:this.$t(this.t + "申请解禁成功") + `！`,
            type: 'success'
          });
            this.$emit("next");
          });
        }
      });
    },
    // // 重新提交审核资料
    // restartApply () {
    //   this.auditShow = false
    //   this.isShow = true
    // },
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
  padding-bottom: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img-container {
    width: 186px;
    height: 131px;
    margin-bottom: 60px;
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
