<template>
  <div class="first">
    <div class="targetBox">
      <div class="tips">
        <div class="arrow">
          <i class="iconfont icon-arrows"></i>
        </div>
        <tipsBox
          :current="current"
          :total="total"
          :data="data"
          move
          @update="update"
        />
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
        title: "guide.第二步",
        text: "guide.填写提币信息",
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
    top: 220px;
    left: 325px;
    margin-left: 15px;
    display: flex;
    align-items: center;
    .target {
      width: 520px;
      height: 690px;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;
    }
  }
  .tips {
    position: absolute;
    bottom: 100%;
    left: 100%;
    transform: translate(10px, 40px);
    display: flex;
    .arrow {
      display: flex;
      align-items: flex-end;
      padding: 10px 20px;
      color: #fff;
      i {
        font-size: 56px;
        transform: rotate(-100deg);
      }
    }
  }
}
</style>
