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
        title: "guide.选择币种",
        text: "guide.选择需要进行资金划转的账户以及币种",
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
  top: 420px;
  left: 330px;
  .targetBox {
    margin-left: 15px;
    display: flex;
    align-items: center;
    .target {
      width: 510px;
      height: 60px;
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
      }
    }
  }
}
</style>
