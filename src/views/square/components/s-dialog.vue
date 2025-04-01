<template>
  <el-dialog
    :class="showBg ? 'dialog' : ''"
    :title="title"
    :visible.sync="tDialogVisible"
    :width="width"
    @open="open"
    @closed="dialogClose"
    :append-to-body="appendToBody"
    :fullscreen="fullscreen"
    :top="top"
    :modal="modal"
    @before-close="beforeClose"
    :center="center"
    :close-on-click-modal="closeOnClickModel"
    @close="close"
  >
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <div class="btn-box">
        <div class="btn" @click="tDialogVisible = false" v-if="showCancel">
          {{ cancelBtn }}
        </div>
        <div
          class="btn btn-bg"
          type="primary"
          @click="submit"
          v-if="showSubmit"
        >
          {{ confirmBtn }}
        </div>
      </div>
    </div>
  </el-dialog>
</template>
 
<script>
export default {
  name: "sDialog",
  data() {
    return {
      tDialogVisible: this.dialogVisible,
    };
  },
  props: {
    dialogVisible: {
      default: false,
    },
    width: {
      default: "65%",
    },
    title: {
      default: "",
    },
    showCancel: {
      default: true,
    },
    showSubmit: {
      default: true,
    },
    appendToBody: {
      default: false,
    },
    fullscreen: {
      default: false,
    },
    top: {
      default: "15vh",
    },
    modal: {
      default: true,
    },
    center: {
      default: true,
    },
    closeOnClickModel: {
      default: true,
    },
    showBg: {
      type: Boolean,
      default: false,
    },
    cancelBtn: {
      type: String,
      default: "取消",
    },
    confirmBtn: {
      type: String,
      default: "确定",
    },
  },
  watch: {
    dialogVisible: function (n) {
      this.tDialogVisible = n;
    },
    tDialogVisible(n) {
      this.$emit("update:dialogVisible", n);
    },
  },
  methods: {
    open() {
      this.$emit("open");
    },
    dialogClose() {
      this.$emit("closed");
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>
 
<style lang='scss' scoped>
.dialog {
  ::v-deep .el-dialog {
    width: 100%;
    height: 300px;
    background: url("../../../assets/square-imgs/dialog-bg.png");
    background-size: contain;
    background-repeat: no-repeat;
  }
}
.btn-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .btn {
    width: 48%;
    height: 35px;
    line-height: 35px;
    background: #f4f5f7;
    border-radius: 4px;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }
  .btn-bg {
    background: #90ff00;
    color: #fff;
  }
}

::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
  border-radius: 10px;
}
::v-deep .el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
::v-deep .el-dialog__headerbtn {
  background: url("../../../assets/square-imgs/dialog-close.png");
  background-size: cover;
  height: 24px;
  width: 24px;
  i {
    display: none; // 在这里隐藏弹窗默认的关闭图标
  }
}
</style>