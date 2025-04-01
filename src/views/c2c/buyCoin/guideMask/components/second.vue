<template>
  <div class="first">
    <div class="targetBox">
      <div class="target">
      </div>
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
        title: "guide.开始下单",
        text: "guide.根据需求选择币种，并输入金额/数量",
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
  top: 320px;
  left: 1147px;
  .targetBox {
    margin-left: 15px;
    display: flex;
    align-items: center;
    .target {
      width: 542px;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      box-shadow: rgba(0,0,0,0.5) 0 0 0 100vw
    }
  }
  .tips {
    position: relative;
    margin-left: -80px;
    margin-top: 20px;
    .arrow {
      display: flex;
      align-items: center;
      padding: 0 120px;
      color: #fff;
      i {
        font-size: 56px;
        transform: rotate(55deg);
      }
    }
  }
}
</style>
