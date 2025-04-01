<template>
  <div class="selectBox">
    <div
      class="select df aic jb"
      :class="{ border: isShow }"
      @click.stop="toggle"
      @dblclick.stop="banCopy"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <input
        class="input"
        :style="{ width: !autoWidth ? width + 'px' : setWidth }"
        type="text"
        v-model="content"
        readonly="readonly"
      />
      <i
        class="iconfont icon-down1"
        :class="{ rotate: isShow }"
        v-show="!isSow_close"
      ></i>
      <i
        class="iconfont icon-guanbi"
        v-show="isSow_close"
        @click.stop="onEmpty"
      ></i>
    </div>
    <div class="listbox" v-show="isShow" :class="{ dark: getTheme == 'dark' }">
      <div class="pl10 pr10 Box" v-if="search" ref="Box">
        <div class="search">
          <i class="iconfont icon-search"></i>
          <input type="text" placeholder="搜索" v-model="searchValue" />
          <i
            class="iconfont icon-close2 delete"
            v-show="searchValue"
            @click="searchValue = ''"
          ></i>
        </div>
      </div>
      <div class="pl10 pr10 inputBox" v-if="hasInput" ref="Box">
        <input type="text" placeholder="输入杠杆" v-model="leverValue" />
      </div>
      <div class="list">
        <div
          class="cell"
          :class="{ active: newValue == item.value }"
          v-for="(item, index) in list"
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
import { mapGetters } from "vuex";

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
      default: 90,
    },
    autoWidth: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
    hasInput: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    event: "input-change",
    prop: "newValue",
  },
  data() {
    return {
      list: [],
      isShow: false,
      isSow_close: false,
      content: this.newValue
        ? this.fiterLabel(this.newValue)
        : `${this.$t("contract.全部")}`,

      setWidth: "100px",
      searchValue: "",
      leverValue: "",
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  watch: {
    newValue: {
      handler(value) {
        this.content = value
          ? this.fiterLabel(value)
          : `${this.$t("contract.全部")}`;
      },
    },
    content: {
      handler(newValue) {
        const textWidth = this.getTextWidth(newValue);
        this.setWidth = `${textWidth + 20}px`;
        if (textWidth < 60) {
          this.setWidth = "80px";
        }
        // console.log("this.set", this.setWidth);
      },
      immediate: true,
    },
    isShow: {
      handler(newValue) {
        if (!newValue) {
          this.searchValue = "";
          // this.leverValue = "";
        }
      },
    },
    options: {
      handler(newValue) {
        if (newValue.length) {
          this.list = [...newValue];
        }
      },
      immediate: true,
    },
    searchValue: {
      handler(newValue) {
        const arr = this.options.filter((item) => {
          if (item.value.includes(newValue?.toLowerCase())) {
            return item;
          }
        });
        this.list = arr;
      },
    },
    leverValue: {
      handler(newValue) {
        this.leverValue = newValue.replace(/[^[1-9]?/g, "");
        console.log("prompt", this.leverValue);
        this.$emit("input-change", this.leverValue ? this.leverValue*1 : 1);
      },
    },
  },
  methods: {
    getTextWidth(text) {
      const temp = document.createElement("span");
      temp.style.visibility = "hidden";
      temp.style.whiteSpace = "pre";
      temp.style.display = "inline-block";
      temp.textContent = text;

      document.body.appendChild(temp);

      const width = temp.offsetWidth;

      document.body.removeChild(temp);

      return width;
    },
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
      if (arr.length) {
        return this.$t(arr[0].label);
      } else {
        return value + "X";
      }
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      const dom = this.$refs["Box"];
      if (dom) {
        if (!dom.contains(e.target)) {
          if (this.isShow) {
            this.isShow = false;
          }
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.selectBox {
  position: relative;
  // width: 105px;
  .select {
    width: 100%;
    height: 28px;
    padding: 2px 5px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    color: var(--main-text-color);
    cursor: pointer;

    &.border {
      border: 1px solid var(--theme-color);
    }
    .input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding-left: 5px;
      font-size: 12px;
      cursor: pointer;
      color: var(--main-text-color);
      background-color: var(--main-bg);
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
    background-color: var(--select-bg);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    z-index: 999;
    overflow-y: auto;
    // &:hover {
    //   overflow-y: auto;
    // }
    &.dark {
      box-shadow: none;
    }
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
    .Box {
      position: sticky;
      padding-top: 10px;
      top: 0;
      background-color: inherit;
      .search {
        display: flex;
        align-items: center;
        width: 100%;
        height: 30px;
        border: 1px solid var(--dialog-line-color);
        border-radius: 4px;
        padding: 0 10px;
        input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 12px;
          color: var(--main-text-color);
          background-color: inherit;
        }
        i {
          margin-right: 5px;
          font-size: 18px;
          color: #96a2b2;
        }
        .delete {
          color: #96a2b2;
          margin-right: -5px;
          cursor: pointer;
        }
      }
    }
    .inputBox {
      position: sticky;
      padding-top: 10px;
      top: 0;
      background-color: inherit;
      input {
        width: 100%;
        height: 30px;
        padding-left: 10px;
        border: 1px solid var(--dialog-line-color);
        outline: none;
        font-size: 12px;
        color: var(--main-text-color);
        background-color: inherit;
      }
    }

    .list {
      width: 100%;
      padding: 10px 0;
      font-size: 12px;
      color: var(--main-text-color);
      .cell {
        display: flex;
        align-items: center;
        padding: 10px 10px;
        background-color: inherit;
        cursor: pointer;
        &:hover {
          background-color: var(--select-hover);
        }
        &.active {
          color: var(--theme-color);
        }
      }
    }
  }
}
</style>
