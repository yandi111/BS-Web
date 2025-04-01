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
        title: "guide.选择模式",
        text: "guide.选择【全仓】或【逐仓】模式并调整杠杆倍数",
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
  top: 518px;
  right: 0;
  .targetBox {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 6px;
    .target {
      width: 340px;
      height: 58px;
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
      padding: 0 120px;
      color: #fff;
      i {
        font-size: 56px;
        transform: rotate(40deg);
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
