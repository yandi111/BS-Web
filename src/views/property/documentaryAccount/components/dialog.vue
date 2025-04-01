<template>
  <div>
    <common-modal
      :title="title"
      width="600px"
      :show="isShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      :appendToBody="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_content>
        <div class="form-common">
         此账户总额是双方冻结后合作托管账户，不参与双方个人资产计算
        </div>
      </template>
      <template #dia_footer>
        <el-button type="primary" style="width: 100%" @click="handleSave"
          >确定</el-button
        >
      </template>
    </common-modal>
  </div>
</template>

<script>
import CommonModal from "@/components/commonModal/index.vue";
export default {
  name: "DocumentaryAccountDialog",
  components: {
    CommonModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    nickName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      title: "合作跟单账户总额",
      
    };
  },
  methods: {
   
    handleSave() {
     this.$emit("update:isShow", false);
    },
 
  },
};
</script>

<style lang="scss" scoped>
.form-common {
  padding: 0 30px;
  .notice {
    color: #999;
    line-height: 20px;
  }

  ::v-deep  .el-input__inner {
    height: 45px;
    line-height: 45px;
    border: 1px solid #f4f5f7;
  }
}
</style>
