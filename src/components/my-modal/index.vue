<template>
  <div
    class="my-modal"
    :class="[useTheme ? 'theme' : '', 1 == 1 ? customizeClass : '']"
    v-if="isShow"
  >
    <div class="mask"></div>
    
    <div v-if="!isMobileRebate" id="content" :class="[1 == 1 ? width : '']">
      <header>
        <slot name="header">
          <span class="title">{{ title | translate }}</span>
          <i class="iconfont icon-close" @click="close"></i>
        </slot>
      </header>
      <main>
        <slot name="content">Write your Code here</slot>
      </main>
      <footer>
        <slot name="footer">
          <div class="btns df aic jb">
            <my-button
              @click="onSubmit"
              :loading="loading"
              :disabled="disabled"
            ></my-button>
          </div>
        </slot>
      </footer>
    </div>

  </div>
</template>

<script>
export default {
  name: "my-modal",
  props: {
    //自定义类名
    customizeClass: {
      type: String,
      default: "",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "弹窗标题",
    },
    useTheme: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "width600",
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit");
    },
    close() {
      this.$emit("close");
    },
  },
  computed: {
    isMobileRebate() {
      return this.$route.name == 'mobileRebate'; // 检查当前路由名称
    }
  },
  mounted() {
    this.$nextTick(() => {
      const body = document.querySelector("body");
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.my-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  .mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.2);
    color: #333;
  }
  &.theme {
    color: var(--main-text-color);
    #content {
      background-color: var(--dialog-bg);
    }
  }
  #content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-height: 700px;
    // padding: 30px;
    border-radius: 15px;
    background-color: #fff;

    header {
      display: flex;
      // align-items: center;
      justify-content: space-between;
      padding: 30px 30px 0px 30px;
      // height: 40px;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .iconfont {
        font-size: 22px;
        cursor: pointer;
        color: #96a2b2;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    main {
      max-height: 425px;
      margin-top: 10px;
      padding: 20px 30px 0 30px;
      // overflow-y: hidden;
      overflow-y: auto;
      // &:hover {
      //   overflow-y: auto;
      // }
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track-piece {
        background-color: var(--select-bg);
        border-radius: 3px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #e1e1e1;
        border-radius: 3px;
      }
    }
    footer {
      padding: 0 30px 30px 30px;
      .btns {
        margin-top: 20px;
        ::v-deep .my-button {
          font-size: 18px;
          flex: 1;
          height: 50px;
        }
      }
    }
  }
}
</style>
