<template>
  <div class="second">
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
    <div class="targetBox">
      <div class="target df aic">
        <div class="box" v-for="(item, index) in list" :key="index">
          {{ item | translate }}
        </div>
      </div>
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
        title: "guide.查看仓位信息",
        text: "guide.查看您的仓位信息和委托订单的情况",
      },
      list: ["guide.仓位(2)", "guide.当前委托(1)", "guide.历史委托", "guide.历史仓位", "guide.合约账单"],
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
  top: 666px;
  left: 0;
  .targetBox {
    display: flex;
    align-items: center;
    margin-left: 5px;
    .target {
      height: 40px;
      border-radius: 6px;
      padding: 0 10px;
      background-color: var(--mask-tips-bg);
      // border: 1px solid red;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;

      .box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        height: 100%;
        font-size: 14px;
        color: var(--main-text-color);
        margin-right: 40px;
        &:last-child {
          margin-right: 5px;
        }
      }
    }
  }
  .tips {
    margin-left: 20px;
    position: relative;
    .arrow {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #fff;
      i {
        font-size: 56px;
        transform: rotate(-130deg);
      }
    }
    .content {
      width: 500px;
      padding: 20px;
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
