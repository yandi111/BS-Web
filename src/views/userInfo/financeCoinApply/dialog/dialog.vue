<template>
  <el-dialog
    width="500px"
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <div class="dialog">
      <div class="box basic">
        <div class="title">{{ $t("userInfo.基本信息") }}</div>
        <div class="text">
          <div class="left">{{ $t("userInfo.项目名称") }}</div>
          <div class="right">{{ details.projectName }}</div>
        </div>
        <div class="text">
          <div class="left">{{ $t("userInfo.币种全称") }}</div>
          <div class="right">{{ details.chineseDesc }}</div>
        </div>
        <div class="text">
          <div class="left">{{ $t("userInfo.币种简称") }}</div>
          <div class="right">{{ details.coinName }}</div>
        </div>
        <div class="text">
          <div class="left">{{ $t("userInfo.联系邮箱") }}</div>
          <div class="right">{{ details.email }}</div>
        </div>
      </div>
      <div class="box details">
        <div class="title">{{ $t("userInfo.详细信息") }}</div>
        <div class="text">
          <div class="left">{{ $t("userInfo.是否首次上新") }}</div>
          <div class="right">
            <span v-if="details.isFirst == 1">{{ $t("userInfo.是") }}</span>
            <span v-if="details.isFirst == 0">{{ $t("userInfo.否") }}</span>
          </div>
        </div>
        <div class="text">
          <div class="left">{{ $t("userInfo.官网地址") }}</div>
          <div class="right linkText">{{ details.officialWebsite }}</div>
        </div>
        <div class="text">
          <div class="left">{{ $t("userInfo.白皮书链接") }}</div>
          <div class="right linkText">{{ details.whitePaper }}</div>
        </div>
         <div class="text">
          <div class="left">{{ $t("userInfo.项目社区账号链接") }}</div>
          <div class="right linkText">{{ details.projectAccountLink?details.projectAccountLink:'--' }}</div>
        </div>
        <div class="text">
          <div class="left">{{ $t("userInfo.备注") }}</div>
          <div class="right">{{ details.remark }}</div>
        </div>
        <div class="text">
          <div class="left">{{ $t("userInfo.币种logo") }}</div>
          <div class="right">
            <img class="iconUrl" :src="details.iconUrl" alt="" />
          </div>
        </div>
        <div class="border"></div>
        <div class="des">
          <div class="des-title">{{ $t("userInfo.项目介绍") }}</div>
          <div class="des-text">{{ details.coinIntroduction }}</div>
        </div>
      </div>
      <div class="box status">
        <div class="title">{{ $t("userInfo.审核状态") }}</div>
        <div class="text">
          <div class="left">{{ $t("userInfo.审核状态") }}</div>
          <div class="right">
            <span v-if="details.status == 0">{{
              $t("userInfo.审核成功")
            }}</span>
            <span v-if="details.status == 10">{{ $t("userInfo.审核中") }}</span>
            <span v-if="details.status == 20">{{
              $t("userInfo.审核失败")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "coinApplyDialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    details: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },

  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  height: 600px;
  overflow-y: scroll;
  padding: 0px 20px;
  color: #333;
  .box {
    background: #f9f9f9;
    border-radius: 6px;
    padding: 15px 15px 5px 15px;
  }
  .basic {
  }
  .details {
    margin-top: 10px;
  }
  .status {
    margin-top: 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    margin-bottom: 10px;
    .left {
      font-family: PingFangSC, PingFang SC;
      color: #96a2b2;
    }
  }
  .border {
    border-bottom: 1px dashed #90ff00;
    margin: 10px 0px;
  }
  .des {
    .des-title {
      font-family: PingFangSC, PingFang SC;
      color: #96a2b2;
      font-size: 12px;
    }
    .des-text {
      font-size: 12px;
      color: #333;
      margin: 10px 0px;
    }
  }
  .iconUrl {
    width: 28px;
    height: 28px;
    display: block;
    border-radius: 50%;
  }
  .linkText {
    color: #90ff00 !important;
  }
}
</style>