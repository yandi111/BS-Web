<template>
  <div class="selectBox" :style="{ width: width + 'px' }">
    <div
      class="select df aic jb"
      :class="{ border: isShow }"
      @click.stop="toggle"
      @dblclick.stop="banCopy"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <input class="input" type="text" v-model="content" readonly="readonly" />
      <i
        class="el-icon-caret-bottom"
        :class="{ rotate: isShow }"
        v-show="!isSow_close"
      ></i>
      <i
        class="el-icon-caret-top"
        v-show="isSow_close"
        @click.stop="onEmpty"
      ></i>
    </div>
    <div class="listbox" v-show="isShow">
      <div class="list">
        <div
          class="cell"
          :class="{ active: newValue == item.value }"
          v-for="(item, index) in options"
          :key="index"
          @click.stop="chooseCoinMarket(item)"
        >
          {{ item.label | translate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  props: {
    newValue: {
      type: String | Number,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 120,
    },
  },
  model: {
    event: "input-change",
    prop: "newValue",
  },
  data() {
    return {
      isShow: false,
      isSow_close: false,
      content: this.newValue
        ? this.fiterLabel(this.newValue)
        : `${this.$t("lang_987")}`,
    };
  },
  computed: {
    // ...mapGetters(["getTheme"]),
  },
  watch: {
    newValue: {
      handler(value) {
        this.content = value
          ? this.fiterLabel(value)
          : `${this.$t("lang_987")}`;
      },
    },
  },
  methods: {
    mouseenter() {
      if (this.clearable) {
        if (!this.newValue) return;
        this.isSow_close = true;
      }
    },
    mouseleave() {
      this.isSow_close = false;
    },
    toggle() {
      this.isShow = !this.isShow;
    },
    onEmpty() {
      this.$emit("input-change", "");
      this.isSow_close = false;
      this.isShow = false;
    },
    banCopy() {
      window.getSelection
        ? window.getSelection().removeAllRanges()
        : document.selection.empty();
    },

    chooseCoinMarket(item) {
      this.$emit("input-change", item.value);
      this.isShow = false;
    },
    fiterLabel(value) {
      let arr = this.options.filter((item) => {
        return value == item.value;
      });
      return this.$t(arr[0].label);
    },
  },
  mounted() {
    document.addEventListener("click", () => {
      if (this.isShow) {
        this.isShow = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.selectBox {
  position: relative;
  margin-top: 10px;
  .select {
    width: 100%;
    height: 28px;
    padding: 2px 5px;
    // border: 1px solid var(--border-color);
    border-radius: 5px;
    // color: var(--main-text-color);
    background: #f8f9fb;
    cursor: pointer;

    &.border {
      border: 1px solid #90ff00;
    }
    .input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding-left: 5px;
      font-size: 12px;
      cursor: pointer;
      // color: var(--main-text-color);
      background-color: #f8f9fb;
    }
    i {
      font-size: 18px;
      &.rotate {
        transform: rotate(180deg);
        // transition: transform 0.1s;
      }
    }
    .icon-guanbi {
      font-size: 14px;
    }
  }
  .listbox {
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    max-height: 200px;
    background: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    z-index: 999999;
    overflow-y: auto;

    &.dark {
      box-shadow: none;
    }
    &::-webkit-scrollbar {
      // display: none;
      width: 2px;
    }
    &::-webkit-scrollbar-track-piece {
      // background-color: var(--select-bg);
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
      // background-color: #e1e1e1;
      border-radius: 3px;
    }
    .list {
      width: 100%;
      padding: 10px 0;
      font-size: 12px;
      // color: var(--main-text-color);
      .cell {
        display: flex;
        align-items: center;
        padding: 10px 10px;
        background-color: inherit;
        cursor: pointer;
        &:hover {
          background-color: #F4F5F7;
        }
        &.active {
          color: var(--theme-color);
           background-color: #F4F5F7;
        }
      }
    }
  }
}
</style>
