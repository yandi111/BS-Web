<template>
  <div class="first">
    <div class="targetBox">
      <div class="target">
        <div class="box">{{ $t("guide.买加密货币") }}</div>
        <div class="box">{{ $t("guide.自选区") }}</div>
        <div class="box">{{ $t("guide.大宗区") }}</div>
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
        title: "guide.交易区",
        text: "guide.根据购买需要，可选择不同区进行买卖币。",
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
  top: 93px;
  left: 170px;
  .targetBox {
    margin-left: 15px;
    display: flex;
    align-items: center;
    .target {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      padding: 0 20px 0 0;
      border-radius: 10px;
      background: #fff;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;
      .box {
        margin-left: 30px;
        &:nth-child(2) {
          // margin-left: 10px;
          color: var(--theme-color);
        }
      }
    }
  }
  .tips {
    position: relative;
    margin-left: 80px;
    margin-top: 20px;
    .arrow {
      display: flex;
      align-items: center;
      padding: 0 120px;
      color: #fff;
      i {
        font-size: 56px;
        transform: rotate(5deg);
      }
    }
  }
}
</style>
