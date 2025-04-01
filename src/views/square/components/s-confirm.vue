<template>
  <div class="s-conform">
    <div class="content">
      <div class="text" v-if="type == 'edit'">
        <div class="pic">
          <img src="@/assets/square-imgs/s-edit.png" alt="" />
        </div>
        <p>
          {{ "square.退出后，您的编辑将不会保存。确定要继续？" | translate }}
        </p>
      </div>
      <div class="text" v-if="type == 'remove'">
        <div class="pic">
          <img src="@/assets/square-imgs/s-remove.png" alt="" />
        </div>
        <p>
          {{
            "square.已下架的内容仅对您一个人可见。 确定要继续吗？" | translate
          }}
        </p>
      </div>
      <div class="text" v-if="type == 'report'">
        <div class="pic report">
          <img src="@/assets/square-imgs/s-report.png" alt="" />
        </div>
        <p>{{ "square.举报成功！" | translate }}</p>
      </div>
      <div class="text forward" v-if="type == 'forward'">
        <div class="top df aic jb">
          <span>{{ "square.分享动态" | translate }}</span>
          <i class="iconfont icon-close2 f26" @click="$emit('return')"></i>
        </div>
        <div class="tip">
          {{ "square.复制链接，即可分享给身边的好朋友" | translate }}
        </div>
      </div>
      <div class="text tips" v-if="type == 'tips'">
        <div class="title">温馨提示</div>
        <p>
          由于您在社区的部分行为已涉及违规社区规则和政策，风控已禁止您发布/转发文章并下架您所有文章；如需恢复请联系在线客服！
        </p>
      </div>
      <div class="btns">
        <div
          class="btn return mr15"
          @click="$emit('return')"
          v-if="type != 'report'"
        >
          {{ "square.取消" | translate }}
        </div>
        <div class="btn" @click="$emit('click')">{{ btnText | translate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "s-conform",
  props: {
    type: {
      type: String,
      default: "edit",
    },
    // text: {
    //   type: String,
    //   default: "退出后，您的编辑将不会保存。确定要继续？",
    // },
  },

  data() {
    return {};
  },

  methods: {},
  computed: {
    btnText() {
      const o = {
        edit: "square.确认",
        remove: "square.确认",
        report: "square.关闭",
        forward: "square.复制链接",
        tips: "square.联系客服",
      };
      return o[this.type];
    },
  },
  mounted() {
    document.addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        this.$emit("click");
      }
    });
  },
};
</script>

<style lang="scss" scope>
.s-conform {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.3);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 400px;
    border-radius: 10px;
    padding: 30px 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to bottom, #fff, #f1fffa);
    .text {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 236px;
      font-size: 14px;
      color: #333;
      text-align: center;
      padding: 20px 10px 50px;
      .pic {
        width: 52px;
        margin-bottom: 30px;
        img {
          width: 100%;
        }
        &.report {
          width: 138px;
          margin-bottom: 20px;
        }
      }
      p {
        line-height: 20px;
      }
      &.forward {
        padding: 0;
        width: 100%;
        .top {
          width: 100%;
          font-size: 18px;
          color: #333;
          .iconfont {
            color: #b0b2b1;
            cursor: pointer;
          }
        }
        .tip {
          width: 100%;
          font-size: 14px;
          color: #7d869b;
          text-align: left;
          padding: 20px 0 40px;
        }
      }
      &.tips{
        width: auto;
        padding: 10px;
        .title{
          font-size: 18px;
          margin-bottom: 15px;
        }
        p{
          line-height: 28px;
          color: #7d869b;
          font-size: 14px;
          text-align: left;
        }
      }
    }
    .btns {
      width: 100%;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        // min-width: 160px;
        padding: 0 15px;
        height: 100%;
        color: #fff;
        font-size: 16px;
        border-radius: 6px;
        background-color: var(--theme-color);
        cursor: pointer;
        &:hover {
          opacity: 0.9;
        }
        &.return {
          background: #f4f5f7;
          color: #333;
        }
      }
    }
  }
}
</style>
