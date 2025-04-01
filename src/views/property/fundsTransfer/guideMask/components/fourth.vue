<template>
  <div class="first">
    <div class="targetBox">
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
        title: "guide.确认划转",
        text: "guide.点击【确认划转】，进行资金划转",
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
    top: 690px;
    left: 325px;
    margin-left: 15px;
    display: flex;
    align-items: center;
    .target {
      width: 520px;
      height: 77px;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;
    }
  }
  .tips {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-left: 30px;
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
