<template>
  <div class="first">
    <div class="targetBox">
      <div class="target"></div>
    </div>
    <div class="tips">
      <div class="arrow">
        <i class="iconfont icon-arrows"></i>
      </div>
      <tipsBox
        :current="current"
        :total="total"
        :data="data"
        @update="update"
      />
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
        title: "guide.选择交易对",
        text: "guide.点击选择币种，可查看或切换币种交易对。",
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
  top: 115px;
  left: 0;
  .targetBox {
    margin-left: 16px;
    display: flex;
    align-items: center;
    .target {
      margin-top: 10px;
      width: 180px;
      height: 50px;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;
      border-radius: 5px;
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
      }
    }
  }
}
</style>
