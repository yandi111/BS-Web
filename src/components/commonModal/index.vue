<!-- 公用弹窗 -->
<template>
  <div
    :class="[
      'common-modal',
      title ? 'modal-padding' : '',
      isCenter ? 'is-center' : '',
    ]"
  >
    <el-dialog
      :title="title"
      :visible.sync="show"
      :width="width || '780px'"
      v-if="show"
      :before-close="cancel"
      :show-close="showClose"
      :custom-class="customClass"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="appendToBody"
      :style="bgColor"
    >
      <div slot="title" v-if="!title">
        <slot name="dia_title"></slot>
      </div>
      <slot name="dia_content"></slot>
      <div
        slot="footer"
        :class="[FooterIsCenter ? 'dialog-footer' : '']"
        v-if="noFooter ? false : true"
      >
        <slot name="dia_footer">
          <!-- <el-button @click="cancel">{{ cancelText }}</el-button>
          <el-button
            class="conifg"
            type="text"
            @click="save"
            :loading="loading"
            >{{ sureText }}</el-button
          > -->
          <div class="btn-box">
            <div class="cancel mr15" @click="cancel">
              {{ cancelText | translate }}
            </div>
            <div class="sure" @click="save">{{ sureText }}</div>
          </div>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { useThemePage } from "@/libs/useThemePage";

export default {
  name: "CommonModal",
  components: {},
  props: {
    // 控制弹窗显示/隐藏
    show: {
      type: Boolean,
      default: false,
    },
    // 控制弹窗宽度
    width: {
      type: String,
    },
    // 是否显示footer
    noFooter: {
      type: Boolean,
      default: true,
    },
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 是否显示右上角关闭按钮
    showClose: {
      type: Boolean,
      default: false,
    },
    // header内容是否居中
    isCenter: {
      type: Boolean,
      default: false,
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      default: "c2c.取消",
    },
    // 确认按钮文字
    sureText: {
      type: String,
      default: "userInfo.确认",
    },
    // 底部按钮是否居中
    FooterIsCenter: {
      type: Boolean,
      default: false,
    },
    // 是否添加到body
    appendToBody: {
      type: Boolean,
      default: false,
    },
    // 是否显示加载loading
    isShowLoading: {
      type: Boolean,
      default: true,
    },
    // 自定义 class 类名
    customClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      useTheme: false,
    };
  },
  mounted() {
    this.useTheme = useThemePage.includes(this.$route.fullPath) ? true : false;
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      if (this.isShowLoading) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
      this.$emit("save");
    },
  },
  computed: {
    ...mapState(["setting"]),
    bgColor() {
      return {
        "--color":
          this.setting.theme == "dark" && this.useTheme ? "#1d1d1d" : "#ffff",
      };
    },
  },
};
</script>

<style>
.el-dialog {
  margin: 0 auto !important;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  white-space: normal;
  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
}
</style>
<style lang="scss" scoped>
::v-deep .el-dialog__header {
  font-weight: 600;
  padding: 30px 30px 0px 30px;
}
::v-deep .el-dialog__footer {
  padding: 30px;
}
::v-deep .el-dialog {
  // background-color: var(--dialog-bg);
  background-color: var(--color);
  color: var(--trade-text-color);
}
::v-deep .el-dialog__close {
  &:hover {
    color: #909399;
  }
}
.conifg {
  background-color: #90ff00;
  border: 1px solid #90ff00;
  color: white;
  padding: 12px 20px;
}
.btn-box {
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  div {
    width: 260px;
    height: 47px;
    line-height: 47px;
    text-align: center;
    background: #f4f5f7;
    border-radius: 6px;
    font-size: 18px;
    color: #333;
    cursor: pointer;
  }
  .sure {
    background: #90ff00;
    color: #fff;
  }
}
</style>
