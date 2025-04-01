<template>
  <div class="box" v-if="isShow">
    <div class="content">
      <div class="title">{{ $t("contract.一键平仓") }}</div>
      <div class="text">
        {{
          $t(
            "contract.确认撤销U本位下所有挂单，并以市价委托方式平仓U本位下所有仓位"
          )
        }}
      </div>
      <div class="btns df aic jb">
        <div class="btn" @click="cancel">{{ $t("contract.取消") }}</div>
        <div class="btn confirm" @click="confirm">
          {{ $t("contract.确认") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cancel() {
      this.$emit("update:isShow", false);
    },
    confirm() {
      this.$emit("confirm");
      this.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 1100;
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 225px;
    padding: 30px;
    border-radius: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 18px;
      color: #333;
    }
    .text {
      color: #333;
      font-size: 14px;
    }
    .btns {
      width: 100%;
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 50px;

        color: #333;
        font-size: 20px;

        background-color: #f5f7fa;
        border-radius: 6px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        &.confirm {
          color: #fff;
          background: #90ff00;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
