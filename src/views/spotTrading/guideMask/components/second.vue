<template>
  <div class="second">
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
        title: "guide.选择订单类型",
        text: "guide.点击这里选择订单类型，现货交易目前支持的订单类型有限价单、市价单。",
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
.second {
  position: absolute;
  top: 160px;
  right: 0;
  .targetBox {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .target {
      width: 340px;
      height: 54px;
      margin-right: 6px;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;
    }
  }
  .tips {
    position: relative;
    margin-right: 100px;
    .arrow {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 70px;
      color: #fff;
      i {
        font-size: 56px;
        transform: rotate(60deg);
      }
    }
    .content {
      width: 500px;
      padding: 20px;
      margin-top: 20px;

      background-color: #fff;
      border-radius: 15px;
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      -ms-border-radius: 15px;
      -o-border-radius: 15px;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #333333;
        .title {
          font-size: 16px;
        }
        .jump {
          height: 24px;
          padding: 0 15px;
          color: var(--theme-color);
          border: 1px solid var(--theme-color);
          cursor: pointer;
          border-radius: 24px;
          -webkit-border-radius: 24px;
          -moz-border-radius: 24px;
          -ms-border-radius: 24px;
          -o-border-radius: 24px;
        }
      }
      .text {
        padding: 20px 0;
        font-size: 14px;
      }
      .bottom {
        .pagination {
          font-size: 14px;

          .current,
          span {
            font-size: 18px;
          }
        }
        .btns {
          .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 30px;
            color: var(--theme-color);
            background-color: #fff;
            border: 1px solid var(--theme-color);
            cursor: pointer;
            border-radius: 4px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            -ms-border-radius: 4px;
            -o-border-radius: 4px;
            &.next {
              margin-left: 15px;
              background-color: var(--theme-color);
              color: #fff;
            }
            &.not-arrow {
              cursor: not-allowed;
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
}
</style>
