<template>
  <transition>
    <div class="search" v-show="show" :class="{ dark: getTheme == 'dark' }">
      <div class="search-box">
        <i class="iconfont icon-search"></i>
        <input
          type="text"
          class="input"
          placeholder="搜索"
          v-model="searchVal"
          @input.stop="onSearch"
        />
      </div>
      <div class="listBox" :class="{ dark: getTheme == 'dark' }">
        <div class="box">
          <div class="search-list" :class="{ dark: getTheme == 'dark' }">
            <div
              class="search-item"
              :class="activeId === item.id ? 'item-active' : ''"
              v-for="(item, index) in list"
              :key="index"
              @click.stop="chooseItem(item)"
            >
              {{ item.symbolKey }}
            </div>
            <div class="no-data" v-if="!list.length">
              <my-empty></my-empty>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "searchSelect",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
    id: {
      type: Number,
    },
  },
  data() {
    return {
      searchVal: "",
      activeId: null,
    };
  },
  watch: {
    id(newVal) {
      this.activeId = newVal;
    },
  },
  created() {
    this.activeId = this.id;
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  methods: {
    onSearch() {
      this.$emit("handleSearch", this.searchVal);
    },
    chooseItem(item) {
      this.activeId = item.id;
      this.$emit("update:show", false);
      this.$emit("handleChoose", item);
    },
    initVal() {
      this.searchVal = "";
      this.$emit("handleSearch", this.searchVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(1px);
  box-shadow: 0px 2px 6px 0px rgba(225, 225, 225, 0.6);
  border-radius: 12px;
  z-index: 99999;
  background-color: #ffffff;
  &.dark {
    box-shadow: none;
    background-color: #222222;
  }
  .search-box {
    display: flex;
    align-items: center;
    height: 35px;
    margin: 0 15px;
    margin-top: 20px;
    border-radius: 5px;
    padding: 0 8px;
    background-color: var(--calculator-content-bg);
    .input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      color: #8992a6;
      font-size: 14px;
      padding-left: 10px;
      background-color: inherit;
    }
    .icon-search {
      font-size: 20px;
      color: #8992a6;
    }
    div {
      width: 180px;
    }
  }
  .listBox {
    margin-top: 10px;
    padding-bottom: 10px;
    background-color: #ffffff;
    &.dark {
      background-color: #222222;
    }
    .box {
      width: 100%;
      max-height: 350px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        // display: none;
        width: 2px;
      }
      &::-webkit-scrollbar-track-piece {
        background-color: var(--select-bg);
        border-radius: 3px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #e1e1e1;
        border-radius: 3px;
      }
      .search-list {
        // background-color: red;
        .search-item {
          height: 40px;
          display: flex;
          align-items: center;
          padding-left: 20px;
          font-size: 14px;
          color: var(--main-text-color);
          &:hover {
            background: #f4f5f7;
            color: var(--theme-color);
            cursor: pointer;
          }
        }
        .item-active {
          color: var(--theme-color);
        }
        .no-data {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 20px;
          ::v-deep .empty {
            padding-top: 20px;
          }
        }
        &.dark {
          .search-item {
            &:hover {
              background-color: var(--select-hover);
            }
          }
        }
      }
    }
  }
}
</style>
