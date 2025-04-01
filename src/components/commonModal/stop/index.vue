<template>
  <div>
    <el-dialog
      :visible.sync="stopVisible"
      width="560px"
      class="stopDialog"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div class="main">
        <div class="title">温馨提示</div>
        <div class="desc mt28">
          由于您的操作行为，风控已禁止您的交易；如需恢复交易请联系在线客服！
        </div>
        <div class="but mt40 flexs between">
          <div class="cancel" style="text-align: center;" @click="$emit('cancel')">取消</div>
          <div class="config" style="text-align: center;" @click="$emit('cancel')">联系客服</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CommonModal",
  components: {},
  props: {
    stopVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
::v-deep   .stopDialog {
  overflow: hidden;
  .el-dialog {
    &__header {
      display: none;
    }
    &__body {
      padding: 0;
    }
    border-radius: 15px;
    .main {
      padding: 30px;
      color: #333;
      .title {
        font-weight: 500;
        font-size: 18px;
      }
      .desc {
        font-size: 16px;
        width: 420px;
        white-space: break-spaces;
        text-align: left;
      }
      .but {
        div {
          width: 240px;
          height: 60px;
          line-height: 60px;
          border-radius: 6px;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        }
        .cancel {
          color: #000;
          background: #f5f5f5;
        }
        .config {
          color: white;
          background: #5271ff;
        }
      }
    }
  }
}
</style>
