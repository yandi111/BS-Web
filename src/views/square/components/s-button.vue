<template>
  <div class="btns" @click="onHandle">
    <div class="btn1" v-if="large">
      <slot>{{ $t("square.发布") }}</slot>
    </div>
    <div class="btn" v-else :class="{ focus: focus }">
      <slot>{{ $t("square.关注") }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    focus: {
      type: Number,
      default: 0,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onHandle() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  .btn1 {
    padding: 4.5px 19px;
    font-size: 16px;
    color: #fff;
    background-color: #90ff00;
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
  }
  .btn {
    padding: 2px 14px;
    font-size: 16px;
    color: #fff;
    background-color: #90ff00;
    border-radius: 2px;
    cursor: pointer;
    white-space: nowrap;
    &.focus {
      opacity: 0.55;
      // cursor: not-allowed;
    }
  }
}
</style>
