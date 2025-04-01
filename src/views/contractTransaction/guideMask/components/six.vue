<template>
  <div class="second">
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
      <div class="target df aic">
        <div class="box">{{ $t("guide.操作") }}</div>
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
        title: "guide.仓位操作",
        text: "guide.可对持有仓位进行【全部平仓】、【平仓/闪电平仓】、设置【止盈/止损】的操作。",
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
  .targetBox {
    position: absolute;
    top: 942px;
    right: 339px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 76px;
    .target {
      height: 40px;
      border-radius: 6px;
      padding: 0 10px;
      background-color: var(--mask-tips-bg);
      // border: 1px solid red;
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;

      .box {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 14px;
        color: var(--mian-text-color);
      }
    }
    .tips {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-left: 20px;
      .arrow {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
        color: #fff;
        margin-top: 5px;
        i {
          font-size: 56px;
          transform: rotate(180deg);
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
}
</style>
