<template>
  <div class="s-setting" ref="s-setting">
    <i class="iconfont setting-icon" :class="icon" @click="onFun"></i>
    <div class="box" v-show="isShow">
      <div
        class="cell"
        :class="{ active: current == index }"
        v-for="(item, index) in actionList"
        :key="item.value"
        @click="onAction(index, item)"
      >
        <i class="iconfont f20 mr5" :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "icon-s-setting",
    },
    actionList: {
      type: Array,
      default: () => [
        { label: "编辑", value: "edit", icon: "icon-s-edit" },
        { label: "下架", value: "remove", icon: "icon-s-remove" },
        { label: "删除", value: "delete", icon: "icon-s-delete" },
      ],
    },
  },
  data() {
    return {
      current: 10,
      isShow: false,
      flag: true,
    };
  },
  methods: {
    onAction(index, item) {
      this.current = index;
      this.$emit("onAction", item.value);
    },
    onFun() {
      this.isShow = !this.isShow;
    },
    close(e) {
      const dom = this.$refs["s-setting"];
      if (dom) {
        if (dom.contains(e.target) == false) {
          this.current = 10;
          this.isShow = false;
        }
      }
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      this.close(e);
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", (e) => {
      this.close(e);
    });
  },
};
</script>

<style lang="scss" scoped>
.s-setting {
  position: relative;
  .setting-icon {
    font-size: 20px;
    color: #8992a6;
    cursor: pointer;
    &:hover {
      color: var(--theme-color);
    }
  }
  .box {
    z-index: 999;
    position: absolute;
    top: 100%;
    right: -20px;
    width: 80px;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    overflow: hidden;
    z-index: 999;
    .cell {
      padding: 0 15px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      color: #333;
      cursor: pointer;
      &:hover {
        background-color: #f5f7fa;
      }
      &.active {
        color: #fa596f;
        .iconfont {
          color: inherit;
        }
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
