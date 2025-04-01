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
        title: "guide.兑换",
        text: "guide.点击【兑换】，确认订单进行闪兑",
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
    top: 600px;
    left: 330px;
    margin-left: 15px;
    display: flex;
    align-items: center;
    .target {
      width: 510px;
      height: 73px;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;
    }
  }
  .tips {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-left: 80px;
    .arrow {
      display: flex;
      align-items: center;
      padding: 10px 10px;
      color: #fff;
      i {
        font-size: 56px;
        transform: rotate(-120deg);
      }
    }
  }
}
</style>
