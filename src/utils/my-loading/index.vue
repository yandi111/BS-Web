<template>
  <div class="loading-overlay" v-if="isShow">
    <div class="loading_box">
      <img class="loading-image" src="@/assets/images/loding/lodding.gif" alt="Loading...">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      required: true
    }
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Loading',
};
</script>

<style lang="scss" scoped>
.loading-overlay {
  position: absolute;
  top: 30px;
  left: 0;
  width: 100vw;
  height: 100vh;
  // background-color: rgba(0, 0, 0, 0.3); /* 80% 透明度的遮罩 */
  // opacity: 0.4;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999 !important; /* 确保在最上层 */
}

.loading_box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-image {
  width: 100px; /* 设置图像的宽度 */
  height: 100px; /* 设置图像的高度 */
}
</style>