<template>
  <div class="first">
    <div class="tips">
      <tipsBox
        :current="current"
        :total="total"
        :data="data"
        ok
        @update="update"
      />
      <div class="arrow">
        <i class="iconfont icon-arrows"></i>
      </div>
    </div>
    <div class="targetBox">
      <div class="target"></div>
    </div>
  </div>
</template>

<script>
import tipsBox from "@/components/my-tipBox";
export default {
  components: {
    tipsBox,
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      data: {
        title: "guide.选择币种",
        text: "guide.选择需要充值的币种",
      },
    };
  },
  methods: {
    update(value) {
      this.$emit("update:current", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.first {
  position: absolute;
  top: 418px;
  left: 325px;
  .targetBox {
    margin-left: 15px;
    display: flex;
    align-items: center;
    .target {
      width: 140px;
      height: 53px;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;
    }
  }
  .tips {
    position: relative;
    margin-left: 80px;
    .arrow {
      display: flex;
      align-items: center;
      padding: 0 10px;
      color: #fff;
      i {
        font-size: 56px;
        transform: rotate(-115deg);
      }
    }
  }
}
</style>
