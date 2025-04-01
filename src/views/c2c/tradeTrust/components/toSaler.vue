<!-- 申请成为商家 | 发布委托单 -->
<template>
  <div class="to-saler" v-if="!isLoading">
    <h1 v-if="status === 0">{{  $t(t+'申请成为商家')}}</h1>
    <h1 v-if="status === 7">{{  $t(t+'申请退保中')}}</h1>
    <h1 v-if="status === 4 || status === 6 || status === 5">{{  $t(t+'申请解禁')}}</h1>
    <h1 v-if="status === 1 || status === 2 || status === 3">{{  $t(t+'您的商家认证')}}</h1>
    <div class="approve" v-if="status !== 0">
      <!-- 审核中或者解禁申请 -->
      <div
        class="img-container"
        v-if="status === 2 || status === 6 || status === 4 || status === 7"
      >
        <img src="@/assets/images/apply-wait.png" alt="" />
      </div>
      <!-- 审核通过 -->
      <div class="img-container" v-if="status === 1">
        <img src="@/assets/images/apply-success.png" alt="" />
      </div>
      <!-- 审核失败 退保中  或者解禁失败 -->
      <div class="img-container" v-if="status === 3 || status === 5">
        <img src="@/assets/images/apply-fail.png" alt="" />
      </div>
      <!-- 审核成功 -->
      <div class="approve-content" v-if="status === 1">
        <p class="success">{{  $t(t+'审核通过，您已成功认证商户！')}}</p>
        <p class="tip common-size">
          {{  $t('property.已冻结')}}
          <span class="color-blue"
            >{{ merchantInfo.earnestMoney }} {{ merchantInfo.coinName }}</span
          >
        </p>
        <p class="tip-content common-size">
         {{  $t(t+'成为认证商家期间，保证金冻结在账户里，不可提现，不可交易')}}
        </p>
        <div class="btn-group">
          <el-button type="primary" @click="publishAd">  {{  $t(t+'发布广告')}}</el-button>
        </div>
      </div>

      <!-- 审核失败 -->
      <div class="approve-content" v-if="status === 3">
        <p class="success">{{  $t(t+'审核失败，根据材料需求完成提交！')}}</p>
        <p class="tip-content common-size">{{ merchantInfo.auditRemark }}</p>
        <div class="btn-group">
          <el-button type="primary" @click="getCriteriaAuthApply('approveShow')">{{  $t(t+'重新提交审核材料')}}</el-button>
        </div>
      </div>

      <!-- 审核中 -->
      <div class="approve-content" v-if="status === 2">
        <p class="success">{{  $t(t+'申请信息提交成功，正在等待审核！')}}</p>
        <p class="tip common-size">{{  $t(t+'我们将在收到资料后尽快进行审核，')}}</p>
        <p class="tip-content common-size">{{  $t(t+'请耐心等待')}}</p>
      </div>

      <!-- 退保中 -->
      <div class="approve-content" v-if="status === 7">
        <p class="success">{{  $t(t+'退保申请提交成功，正在等待审核！')}}</p>
        <p class="tip common-size">{{  $t(t+'我们将在收到资料后尽快进行审核，')}}</p>
        <p class="tip-content common-size">{{  $t(t+'请耐心等待')}}</p>
      </div>

      <!-- 申请解禁 -->
      <div class="approve-content mt20" v-if="status === 4">
        <p class="success">{{  $t(t+'申请解禁，根据材料需求完成提交！')}}</p>
        <div class="btn-group pt20">
          <el-button type="primary" @click="removeShow = true">{{  $t(t+'申请解禁')}}</el-button>
        </div>
      </div>
      <!-- 解禁失败 -->
      <div class="approve-content" v-if="status === 5">
        <p class="success">{{  $t(t+'解禁失败，根据材料需求完成提交！')}}</p>
        <p class="tip-content common-size">{{ merchantInfo.liftBanRemark }}</p>
        <div class="btn-group">
          <el-button type="primary" @click="removeShow = true">{{  $t(t+'重新提交审核材料')}}</el-button>
        </div>
      </div>
      <!-- 解禁申请中 -->
      <div class="approve-content" v-if="status === 6">
        <p class="success">{{  $t(t+'解禁信息提交成功，正在等待审核！')}}</p>
        <p class="tip common-size">{{  $t(t+'我们将在收到资料后尽快进行审核，')}}</p>
        <p class="tip-content common-size">{{  $t(t+'请耐心等待')}}</p>
      </div>
    </div>
    <div class="advantage">
      <div
        class="panel-content"
        v-for="(item, index) in adviceList"
        :key="index"
      >
        <div class="img-container">
          <img :src="require(`@/assets/images/sale${index + 1}.png`)" alt="" />
        </div>
        <div class="panel-text">
          <p>{{$t(t+item.tip )}}</p>
          <p>{{ $t(t+item.desc ) }}</p>
        </div>
      </div>
    </div>

    <div class="rules" v-if="!status || status === 0">
      <div class="rule-content">
        <el-checkbox v-model="checked">
          <div class="text">{{  $t(t+'我与阅读并同意')}}</div>
        </el-checkbox>
        <a href="">{{  $t(t+'《认证商家协议》')}}</a>
      </div>
    </div>
    <div class="btn-group" v-if="!status || status === 0">
      <el-button
        type="primary"
        :disabled="!isChecked"
        @click="getCriteriaAuthApply('isShow')"
        >{{  $t(t+'立即申请')}}</el-button>
    </div>

    <common-modal
      width="600px"
      :title="$t(t+'如何申请为商户')"
      :show="isShow"
      :showClose="true"
      :noFooter="false"
      :FooterIsCenter="true"
      @cancel="isShow = false"
    >
      <template #dia_content>
        <div class="modal-sale">
          <div class="step">
            <div class="step-title">{{$t(t+'步骤一：按要求准备以下资料')}}</div>
            <div class="step-content">
              {{$t(t+'认证所需材料')}}<br />
              {{$t(t+'手机号、邮箱、微信号、身份证正反面；')}}<br />
              {{ $t(t+'视频录制')}}<br />
              {{ $t(t+"手持证件正面，进行视频录制，保持录制过程中声音和影像都清晰。如下录制朗读内容：本人(姓名)，证件号(证件号)，我的资金来源合法可靠，自愿交易比特币等数字资产，本人充分了解数字货币及潜在风险，具有抗风险能力并愿意承担一切风险！")}} 
            </div>
          </div>

          <div class="step">
            <div class="step-title">{{$t(t+'步骤二：提交申请')}}</div>
            <div class="step-content">
              {{$t(t+'完成需要填写和上传的商家认证审核材料，点击提交审核。')}}
            </div>
          </div>

          <div class="step">
            <div class="step-title"> {{$t(t+'步骤三：资料审核')}}</div>
            <div class="step-content">
              {{$t(t+'我们将在1-5个工作日内对您的商家资料进行审核，请随时关注审核状态，可在提交页面查看审核状态，审核通过后您即可在交易区发布广告。')}}
            </div>
          </div>
          <div class="flexs">
            <el-checkbox v-model="checked">
              <div class="text">
             {{$t(t+'同意冻结资金账户')}}
             <span style="color: #90ff00">{{ authMerchan.earnestMoney }} {{ authMerchan.earnestMoneyCoinName }}</span>
             {{$t(t+'作为商家保证金') }}
              </div>
            </el-checkbox>
          </div>
        </div>
      </template>

      <template #dia_footer>
        <el-button
          type="primary"
          :disabled="!isChecked"
          style="width: 100%"
          @click="getCriteriaAuthApply('approveShow')"
          >    {{$t(t+'申请成为商家') }}</el-button
        >
      </template>
    </common-modal>
    <!-- 申请成为商家 -->
    <approve-data
      :is-show.sync="approveShow"
      ref="approve"
      :authMerchan="authMerchan"
      v-if="approveShow"
      @next="submitApprove"
    ></approve-data>
    <!-- 验证 -->
    <validate-info
      :is-show.sync="validateShow"
      v-if="validateShow"
      :params="params"
      @next="startApprove"
    ></validate-info>
    <!-- 解禁 -->
    <remove-forbid
      :is-show.sync="removeShow"
      v-if="removeShow"
      @next="merchantCheck"
    ></remove-forbid>
    <!-- 去绑定 -->
    <el-dialog
      :title="$t(t+'温馨提示')"
      :visible.sync="showBind"
      width="400px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      class="bindDialog"
      :show-close="false"
    >
      <div class="text-centent fontSize16">{{ bindDesc }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showBind = false" style="width: 100%; height: 45px"> {{$t(t+'取消')}}</el-button>
        <el-button
          @click="
            $router.push(
              `${
                !authMerchan.canAuthStatus
                  ? '/user/verifyIdentidy'
                  : '/wallet/deposit'
              }`
            )
          "
          type="primary"
          style="width: 100%; height: 45px"
          >{{ !authMerchan.canAuthStatus ?$t(t+'去认证') : $t(t+'去充值') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ApproveData from "./approveData.vue";
import ValidateInfo from "./validateInfo.vue";
import {
  merchantCheck,
  applyMerchantInfo,
  criteriaAuthApply,
} from "@/api/otc.js";
import { authItemStong } from "@/api/common";
import RemoveForbid from "./removeForbid.vue";
export default {
  name: "ToSaler",
  components: {
    ApproveData,
    ValidateInfo,
    RemoveForbid,
  },
  props: {
    merchantInfo: {
      type: Object,
    },
  },
  data() {
    return {
          // 国际缩写
          t: 'c2c.',
      // 认证查询
      showBind: false,
      bindDesc: null,
      authMerchan: {},

      isLoading: true,
      removeShow: false,
      timer: null,
      // 4.已禁止 3 审核失败 2审核中 1审核成功 5解禁失败 6解禁申请
      status: 0,
      params: {},
      approveShow: false,
      form: undefined,
      isShow: false,
      validateShow: false,
      checked: true,
      adviceList: [
        { tip: "专属标识", desc: "广告商认证专属标识" },
        { tip: "一对一服务", desc: "针对商家提供一对一客服，提高交易效率" },
        { tip: "安全可靠", desc: "高性能风控体系，专业专注独立风控智能检测" },
      ],
    };
  },
  mounted() {
    this.merchantCheck();
  },
  methods: {
    // 查询当前状态
    merchantCheck() {
      merchantCheck().then((res) => {
        this.status = res.data;
        this.isLoading = false;
      });
    },
    // 商人申请认证授权
    getCriteriaAuthApply(type) {
      
      criteriaAuthApply().then((auth) => {
        this.authMerchan = auth.data;
        if (
          !this.authMerchan.canMerchantAuthStatus
        ) {
          this.showBind = true;
          this.bindDesc = !this.authMerchan.canAuthStatus
            ? this.$t(this.t+'您还未完成身份认证，请先完成身份认证！')
            : this.$t(this.t+'您的资金不足，请先前往资金账户充值！');
          return;
        }
        // console.log(this.authMerchan);
        this[type] = true;
      });
    },
    // 提交申请
    submitApprove(item) {
      authItemStong({ data: 34 }).then((auth) => {
        this.params = auth.data
        this.params.bizType = 34
        this.validateShow = true;
        this.form = item;
        this.isShow = false;
      });
    },

    // 开始审核,验证通过以后才能提交审核
    startApprove(result) {
      this.validateShow = false;
      this.approveShow = false;
      applyMerchantInfo({ ...this.form, ...result }).then((res) => {
        // 提交申请信息后，重新查询用户的审核状态
        this.$message({
            message:this.$t(this.t + "提交审核成功！"),
            type: 'success'
          });
        this.merchantCheck();
      });
    },

    // 发布广告
    publishAd() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.$emit("publish");
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  computed: {
    isChecked() {
      return this.checked;
    },
  },
};
</script>
<style lang="scss" scoped>
.to-saler {
  h1 {
    font-size: 38px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #00082d;
    text-align: center;
    line-height: 67px;
    margin-bottom: 80px;
    margin-top: 80px;
  }
  .advantage {
    display: flex;
    justify-content: space-between;
    margin-bottom: 80px;
    .panel-content {
      margin-right: 50px;
      width: 440px;
      height: 480px;
      background: #ffffff;
      box-shadow: 0px 3px 8px 0px rgba(177, 177, 177, 0.6);
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      &:last-child {
        margin-right: 0;
      }
      .img-container {
        width: 100%;
        flex: 1;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          display: inline-block;
          width: 176px;
          height: 160px;
        }
      }
      .panel-text {
        width: 100%;
        height: 170px;
        background: #fafafa;
        border-radius: 0 0 12px 12px;
        color: #333;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        padding: 20px;
        p {
          &:first-child {
            font-size: 22px;
            margin-bottom: 15px;
          }
          &:last-child {
            font-size: 14px;
          }
        }
      }
    }
  }
  .rules {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    .rule-content {
      width: 600px;
      .text {
        font-size: 16px;
        color: #00082d;
      }
      a {
        text-decoration: none;
        color: #90ff00;
      }
    }
  }

  .btn-group {
    display: flex;
    justify-content: center;
    .el-button--primary {
      width: 600px;
      height: 50px;

      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 1px;
    }
  }

  ::v-deep   .el-radio__input.is-checked .el-radio__inner {
    margin-top: 2px;
    border: 1px solid #90ff00;
  }

  .el-radio {
    margin-right: 0;
    ::v-deep   .el-radio__inner {
      width: 16px;
      height: 16px;
      border: 1px solid #8992a6;
      background-color: transparent;
      &::after {
        width: 10px;
        height: 10px;
        background: #90ff00;
      }
    }
  }

  .modal-sale {
    padding: 0 30px;
    height: 400px;
    .step {
      margin-bottom: 40px;
      .step-title {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
        margin-bottom: 20px;
      }
      .step-content {
        padding: 15px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
        background-color: #f5f5f5;
        border-radius: 6px;
      }
      &:last-child {
        margin-bottom: 20px;
      }
      .text {
        font-size: 16px;
        color: #00082d;
      }
    }
  }
  .approve {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 120px;
    .img-container {
      width: 260px;
      height: 200px;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .approve-content {
      text-align: center;
    }
    p {
      margin-bottom: 15px;
    }
    .success {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #00082d;
    }
    .tip-content {
      margin-bottom: 50px;
    }

    .common-size {
      font-size: 14px;
      color: #8992a6;
      .color-blue {
        color: #90ff00;
      }
    }
  }
}
::v-deep   .bindDialog {
  overflow: hidden;
  .el-dialog {
    border-radius: 12px;
    margin-top: 25vh !important;
    &__title {
      font-size: 19px;
      font-weight: bold;
    }
  }
}
</style>
