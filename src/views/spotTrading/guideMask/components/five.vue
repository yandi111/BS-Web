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
        ok
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
        title: "guide.自定义您的交易界面",
        text: "guide.选择您喜欢的主题、颜色偏好等。",
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
  top: 65px;
  right: 0;
  .targetBox {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .target {
      width: 40px;
      height: 50px;
      margin-right: 21px;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;
    }
  }
  .tips {
    position: relative;
    margin-right: 20px;
    .arrow {
      display: flex;
      align-items: center;
      padding: 0 30px;
      justify-content: flex-end;
      color: #fff;
      i {
        font-size: 56px;
        transform: rotate(60deg);
      }
    }
  }
}
</style>
