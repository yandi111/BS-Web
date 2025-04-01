<template>
  <el-dialog
    width="480px"
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <div class="dialog">
      <div class="text">
        <span>{{ $t("c2c.请前往完成") }}</span>
        <span v-if="otcStatusObj?.settingKycLevel ==1">LV.1</span>
        <span v-if="otcStatusObj?.settingKycLevel ==2">LV.2</span>
        <span v-if="otcStatusObj?.settingKycLevel ==3">LV.3</span>
        <span>{{ $t("c2c.身份认证后，开启商家发布广告") }}</span>
      </div>
      <div class="btn-box">
        <div class="btn cancel" @click="handleClose">{{ $t("c2c.取消") }}</div>
        <div class="btn" @click="handleBtn">{{ $t("c2c.去认证") }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "OtcAuthDialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    otcStatusObj: {
      type: Object,
      default: ()=>{}
    },
  },
  data() {
    return {};
  },

  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleBtn() {
      this.$router.push("/user/verifyIdentidy");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  background: linear-gradient(180deg, #ffffff 0%, #f8fffc 44%, #f1fffa 100%);
  padding: 0px 20px;
  .text {
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: #333;
    margin-bottom: 40px;
    padding: 0px 20px;
  }
  .btn-box {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 47%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      background: #90ff00;
      cursor: pointer;
    }
    .cancel {
      background: #f4f5f7;
      color: #333;
    }
  }
}
</style>