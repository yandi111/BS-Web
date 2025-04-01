<!-- 确认注销账户页面 -->
<template>
  <div>
    <common-modal
      width="600px"
      title="注销账户"
      :show="isShow"
      :noFooter="false"
      :FooterIsCenter="true"
      :showClose="true"
      :appendToBody="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_content>
        <div class="success-container">
          {{ $t('userInfo.“注销后您将永远失去此账户，且此账户所绑定的手机/邮箱号码将无法在本平台继续使用；此账户所有功能(包含API密钥)均将禁用或删除请您保证注销时您已提取完所有的账户资产,并已结束充提,交易流程,我们的客服人员会协助检查并审核,因此所产生的等待时间,请您谅解。”') }}
         
        </div>
      </template>

      <template #dia_footer>
        <el-button type="primary" class="back" style="width: 100%" @click="handleNext">确定</el-button>
      </template>
    </common-modal>
  </div>
</template>

<script>
export default {
  name: 'SuccessModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    // 验证下一步
    handleNext () {
      this.$emit('next')
    },
  }
}
</script>
<style lang='scss' scoped>
.success-container {
  padding: 0 50px;
  height: 135px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #00082D;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  .back {
    width: 160px;
    height: 50px;
    border-radius: 6px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
}
</style>