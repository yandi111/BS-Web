<template>
  <div class="second">
    <div class="targetBox">
      <div class="target">
        <div class="box">{{ $t("lang_864") }}</div>
        <div class="box">{{ $t("lang_942") }}</div>
        <div class="box">{{ $t("lang_1336") }}</div>
        <div class="box">{{ $t("lang_1386") }}</div>
      </div>
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
        title: "guide.查看订单和资产",
        text: "guide.您可在这里查看当前委托、历史委托、历史成交、资产。",
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
    top: 890px;
    left: 0;
    display: flex;
    margin-left: 7px;
    .target {
      display: flex;
      align-items: center;
      height: 40px;
      border-radius: 6px;
      padding: 0 12px;
      background-color: var(--mask-tips-bg);
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 100vw;
      .box {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        margin-right: 40px;
        color: var(--main-text-color);
        &:last-child{
          margin-right: 10px;
        }
      }
    }
    .tips {
      position: absolute;
      bottom: 100%;
      left: 0;
      margin-left: 20px;
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
}
</style>
