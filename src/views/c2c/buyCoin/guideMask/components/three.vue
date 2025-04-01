<template>
  <div class="first">
    <div class="targetBox">
      <div class="tips">
        <tipsBox
          :current="current"
          :total="total"
          :data="data"
          @update="update"
        />
        <div class="arrow">
          <i class="iconfont icon-arrows"></i>
        </div>
      </div>
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
        title: "guide.下单",
        text: "guide.点击【买入】或【卖出】生成订单，待匹配商家接单",
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
  .targetBox {
    position: absolute;
    top: 638px;
    left: 1165px;
    margin-left: 15px;
    .target {
      width: 505px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;
    }
    .tips {
      position: absolute;
      bottom: 100%;
      left: 0;
      margin-left: 60px;
      .arrow {
        display: flex;
        align-items: center;
        padding: 0 80px;
        color: #fff;
        i {
          font-size: 56px;
          transform: rotate(240deg);
        }
      }
    }
  }
}
</style>
