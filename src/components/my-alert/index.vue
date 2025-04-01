<template>
  <div class="my-alert">
    <div class="dialog">
      <i class="iconfont icon-success" v-if="!cancel"></i>
      <div class="text">{{ content | translate }}</div>
      <div class="btns" :class="cancel ? 'jb' : 'jc'">
        <div class="btn return" @click="$emit('return')" v-if="cancel">
          {{ cancel }}
        </div>
        <div class="btn" @click="$emit('click')">
          {{ btnText | translate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myAlert",
  props: {
    content: {
      type: String,
      default: "c2c.成功",
    },
    btnText: {
      type: String,
      default: "userInfo.确认",
    },
    cancel: {
      type: String,
      default: "",
    },
  },

  data() {
    return {};
  },

  methods: {},
  mounted() {
    document.addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        this.$emit("click");
      }
    });
  },
};
</script>

<style lang="scss" scope>
.my-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  .dialog {
    width: 400px;
    // min-height: 239px;
    border-radius: 10px;
    padding: 40px 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--dialog-bg);
    .iconfont {
      font-size: 32px;
      color: #33be88;
      margin-bottom: 15px;
    }
    .text {
      font-size: 22px;
      color: var(--main-text-color);
      font-weight: 500;
      text-align: center;
      // background-color: red;
    }
    .btns {
      width: 100%;
      display: flex;
      align-items: center;
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 160px;
        padding: 0 15px;
        height: 50px;
        color: #fff;
        font-size: 18px;
        border-radius: 6px;
        margin-top: 40px;
        background-color: var(--theme-color);
        cursor: pointer;
        &:hover {
          opacity: 0.9;
        }
        &.return {
          background-color: #f5f7fa;
          color: #333;
        }
      }
    }
  }
}
</style>
