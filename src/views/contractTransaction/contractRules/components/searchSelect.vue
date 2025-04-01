<template>
  <transition>
    <div class="search" v-show="show">
      <div class="search-box" :class="{ dark: getTheme == 'dark' }">
        <i class="iconfont icon-search"></i>
        <input
          type="text"
          class="input"
          :placeholder="$t('rules.搜索')"
          v-model="searchVal"
          @input="onSearch"
        />
      </div>
      <div class="search-list" :class="{ dark: getTheme == 'dark' }">
        <div
          class="search-item"
          :class="activeId === item.id ? 'item-active' : ''"
          v-for="(item, index) in list"
          :key="index"
          @click="chooseItem(item)"
        >
          {{ item.symbolKey }}
        </div>
        <div class="no-data" v-if="!list.length">
          <span>{{ $t('rules.暂无数据') }}</span>
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
    id(oldVal, newVal) {
      this.activeId = oldVal;
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
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  position: absolute;
  top: 45px;
  left: 0;
  width: 220px;
  background-color: var(--pop-bg);
  box-shadow: 0px 1px 8px 0px
    rgba($color: #cccccc, $alpha: var(--box-shadow-alpha));
  border-radius: 12px;
  z-index: 99;
  .search-box {
    display: flex;
    align-items: center;
    height: 35px;
    margin: 0 15px;
    margin-top: 20px;
    border-radius: 5px;
    padding: 0 10px;
    background-color: #f8f9fb;
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
    &.dark {
      background-color: var(--main-bg);
      .input {
        background-color: var(--main-bg);
      }
    }
  }
  .search-list {
    margin-top: 10px;
    padding-bottom: 10px;
    height: 400px;
    overflow-y: auto;
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
    .search-item {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      font-size: 14px;
      color: var(--main-text-color);
      &:hover {
        color: var(--theme-color);
        background-color: var(--select-hover);
      }
    }
    .item-active {
      background-color: var(--select-hover);
    }
    .no-data {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    // &.dark {
    //   .search-item {
    //     &:hover {
    //       background-color: var(--main-bg);
    //       color: var(--theme-color);
    //     }
    //   }
    //   .item-active {
    //     background-color: var(--main-bg);
    //     // background-color: red;
    //   }
    // }
  }
}
</style>
