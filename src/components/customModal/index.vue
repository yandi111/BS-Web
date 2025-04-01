<!-- 自定义弹窗 -->
<template>
  <div v-if="showModal">
    <div class="mask"></div>
    <!-- modal弹窗 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CustomModal",
  components: {},
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
.mask {
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // z-index: 999;
  border-radius: 15px;
}
</style>