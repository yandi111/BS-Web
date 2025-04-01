<template>
  <el-dialog
    width="480px"
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <div class="dialog">
      <div class="text">
        <span>{{ $t("c2c.由于您的操作行为，风控已禁止您个人发布广告；如需恢复交易请联系在线客服！") }}</span>
      </div>
      <div class="btn-box">
        <div class="btn cancel" @click="handleClose">{{ $t("c2c.取消") }}</div>
        <div class="btn" @click="handleBtn">{{ $t("c2c.联系客服") }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "HintDialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
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
      //联系客服
       zE('messenger', 'open');
       this.$emit("close");
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