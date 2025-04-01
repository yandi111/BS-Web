<!-- 未收到短信验证码公用弹窗 -->
<template>
  <div class="msg-tip">
    <common-modal
      width="500px"
      :show="isShow"
      :noFooter="false"
      :showClose="false"
      :appendToBody="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_content>
        <div class="msg-modal">
          <div class="code-title">{{  $t('userInfo.未收到短信验证码')  }}</div>
          <div class="code-content">
            <div>{{  $t('userInfo.发送短信成功，若仍未收到验证码，可以尝试以下操作:')  }}</div>
            <div>{{  $t('userInfo.检查绑定手机号是否欠费')  }}</div>
            <div>{{  $t('userInfo.检查是否位于短信垃圾箱中')  }}</div>
            <div>{{  $t('userInfo.请确认您的手机号是否正确')  }}</div>
            <div>{{  $t('userInfo.可能存在发送延迟,过10分钟后再重试')  }}</div>
            <div>{{  $t('userInfo.若此电话号已注册过,我们就不会再向您发送验证码')  }}</div>
          </div>
        </div>
      </template>

      <template #dia_footer>
        <div class="btn-group">
          <el-button
            type="primary"
            class="login-btn"
            @click="$emit('update:isShow', false)"
            >{{  $t('userInfo.我已知晓')  }}</el-button
          >
        </div>
      </template>
    </common-modal>
  </div>
</template>

<script>
import { securityPhone } from "@/libs/utils";
export default {
  name: "MsgTip",
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    protectPhone() {
      return this.phone && securityPhone(this.phone);
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
.msg-modal {
  padding: 0 20px;
  background-color: #fff;
  border-radius: 20px;
  .code-title {
    text-align: center;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #040a1a;
  }
  .code-content {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    padding: 40px 20px;
    > div {
      line-height: 30px;
    }
  }
  .img-container {
    text-align: center;
    img {
      width: 120px;
      height: 120px;
    }
  }
  .tip-success {
    text-align: center;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    margin: 20px 0;
  }
}
</style>