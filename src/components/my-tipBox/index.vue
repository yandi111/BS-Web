<!-- 新手指引提示框 -->
<template>
  <div class="tipsBox">
    <div class="content df fdc jb">
      <div class="top">
        <div class="title">{{ data.title | translate }}</div>
        <div class="jump df aic jc" @click="onJump">
          {{ $t("lang_1356") }}
        </div>
      </div>
      <div class="text">{{ data.text | translate }}</div>
      <div class="bottom df aic jb">
        <div class="pagination" :class="{ finally: current == total }">
          <span class="current">{{ current }}</span>
          <span>/</span>
          <span class="total">{{ total }}</span>
        </div>
        <div class="btns df aic">
          <div class="btn" @click="pre" v-show="current != 1">
            {{ $t("lang_2702") }}
          </div>
          <div class="btn next" @click="next">{{ btntxt | translate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setUserStatus } from "@/api/user.js";

export default {
  props: {
    //当前页
    current: {
      type: Number,
      default: 1,
    },
    //总页数
    total: {
      type: Number,
      default: 6,
    },
    //提示内容
    data: {
      type: Object,
      default: () => {},
    },
    //是否展示[完成]
    ok: {
      type: Boolean,
      default: false,
    },
    //是否移动内容
    move: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      btntxt: "guide.下一步",
      routeWhite: ["/layout/contractTransaction", "/layout/spotTrading"],
    };
  },
  methods: {
    pre() {
      if (this.current == 1) return;
      let num = this.current - 1;
      this.$emit("update", num);
      if (this.move) {
        this.resetContentPosition();
      }
    },
    next() {
      if (this.current == this.total) {
        if (this.routeWhite.includes(this.$route.path)) {
          this.closeMask();
        } else {
          this.setUserStatus();
        }
        this.resetContentPosition("reset");
      } else {
        let num = this.current + 1;
        this.$emit("update", num);
        this.moveContentUp();
      }
    },
    //跳过
    onJump() {
      if (this.routeWhite.includes(this.$route.path)) {
        this.closeMask();
      } else {
        this.setUserStatus();
      }
      this.resetContentPosition("reset");
    },
    //发请求-设置用户状态
    setUserStatus() {
      let params = {
        statusKey: this.$store.state.setting.guideType,
        statusValue: 0, //0 关闭
        type: 1,
      };
      console.log("testtt", params);
      setUserStatus(params).then((res) => {
        if (res.data.success) {
          this.$store.commit("setguideMask_isShow", false);
          this.$emit("update", 1);
        }
      });
    },
    //向上移动内容的位置
    moveContentUp() {
      if (this.move) {
        let dom = document.querySelector(".main-content");
        if (dom) {
          dom.classList.add("move");
        }
      }
    },
    //重置内容的位置
    resetContentPosition(reset) {
      if (this.move || reset) {
        let dom = document.querySelector(".main-content");
        if (dom) {
          dom.classList.remove('move')
        }
      }
    },
    //仅关闭弹窗  不发请求
    closeMask() {
      this.$store.commit("setguideMask_isShow", false);
      this.$emit("update", 1);
    },
  },
  watch: {
    current: {
      handler(value) {
        this.btntxt =
          value == this.total
            ? this.ok
              ? "guide.完成"
              : "guide.开始交易"
            : "guide.下一步";
      },
      immediate: true,
    },
  },
};
</script>
<style>
.move {
  transform: translateY(-420px) !important;
}
</style>

<style lang="scss" scoped>
.content {
  width: 500px;
  padding: 20px;
  margin-top: 20px;
  background-color: var(--mask-tips-bg);
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
    color: var(--main-text-color);
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
    color: var(--main-text-color);
  }
  .bottom {
    .pagination {
      color: var(--main-text-color);
      span {
        font-size: 14px;
      }
      .current {
        font-size: 16px;
      }
      .total {
        font-size: 12px;
      }
      &.finally {
        span {
          font-size: 14px;
        }
      }
    }
    .btns {
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 70px;
        height: 30px;
        color: var(--theme-color);
        padding: 0 15px;
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
</style>
