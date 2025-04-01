<template>
  <div
    class="my-button"
    :class="{
      'type-1': type === 'solid',
      'type-2': type === 'normal',
      border: type === 'border',
      disabled: disabled || loading,
    }"
    @click.stop="onClick"
  >
    <slot v-if="!loading">{{ $t("contract.确认") }}</slot>
    <div class="loading df aic jc" v-else>
      <i class="iconfont icon-jiazai"></i>
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "myButton",
  props: {
    type: {
      type: String,
      default: "solid",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      if (this.disabled || this.loading) return;
      this.$emit("click", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  padding: 0 15px;
  border-radius: 6px;
  cursor: pointer;
  $btncolors: #90ff00, #e7e9eb;
  @for $i from 1 through length($btncolors) {
    &.type-#{$i} {
      $color: nth($btncolors, $i);
      color: #fff;
      background: $color;
      &:hover {
        background: lighten($color, 2%);
      }
      &:active {
        background: darken($color, 2%);
      }
      &.disabled {
        // background: lighten($color, 30%);
        background: var(--btn-disabled-bg);
        color: var(--tooltip-text-color);
        span {
          filter: opacity(50%);
        }
        cursor: not-allowed;
      }
    }
  }
  &.type-2 {
    color: #333;
  }

  &.border {
    border: 1px solid hsla(162, 71%, 44%, 1);
    color: hsla(162, 71%, 44%, 1);
    &:hover {
      color: #fff;
      background-color: hsla(162, 71%, 44%, 0.9);
    }
    &:active {
      background-color: hsla(162, 81%, 40%, 1);
    }
  }
  .loading {
    color: #fff;
    .iconfont {
      font-size: 25px;
      margin-right: 5px;
      animation: rotate 0.5s linear infinite;
    }
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(100deg);
      }
    }
  }
}
</style>
