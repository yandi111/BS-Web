<template>
  <div class="showMsg">
    <div class="dialog">
      <i class="iconfont icon-success"></i>
      <div class="text">{{ text }}</div>
      <!-- <div class="btn" @click="$emit('click')">
        {{ "contract.conform_text" | translate }}
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "showMsg",
  props: {
    text: {
      type: String,
      default: "成功",
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

    setTimeout(() => {
      this.$emit("click");
    }, 1000);
  },
};
</script>

<style lang="scss" scope>
.showMsg {
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
    // width: 400px;
    // height: 239px;
    width: 350px;
    height: 160px;
    border-radius: 10px;
    padding: 40px 20px 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: var(--dialog-bg);
    .iconfont {
      font-size: 32px;
      color: #33be88;
    }
    .text {
      font-size: 22px;
      color: var(--main-text-color);
      font-weight: 500;
      margin-top: -20px;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 160px;
      height: 50px;
      color: #fff;
      font-size: 18px;
      border-radius: 6px;
      margin-top: 10px;
      background-color: var(--theme-color);
      cursor: pointer;
      &:hover {
        // background-color: #7089f7;
        opacity: 0.9;
      }
      // &:active {
      //   background-color: #3659f6;
      // }
    }
  }
}
</style>
