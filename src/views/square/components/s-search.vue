<template>
  <div class="s-search">
    <i class="iconfont icon-search"></i>
    <input
      type="text"
      v-model="value"
      :placeholder="$t('square.' + placeholder)"
      @keyup.enter="onSearch"
    />
    <i
      class="iconfont search icon-close2"
      v-show="value"
      @click="value = ''"
    ></i>
  </div>
</template>

<script>
import { antiShake } from "@/libs/utils";
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索文章、用户",
    },
  },
  watch: {
    "$route.query.search": {
      handler(val) {
        if (val) {
          this.value = val;
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onSearch() {
      this.$emit("onSearch", this.value);
    },
    handler() {
      console.log("value", this.value);
    },
  },
  // watch: {
  //   value: {
  //     handler(newValue) {
  //       console.log("newValue", newValue);
  //     },
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.s-search {
  display: flex;
  align-items: center;
  height: 45px;
  padding: 0 20px;
  padding-right: 0;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e9edf2;
  color: #8992a6;
  .iconfont {
    font-size: 18px;
    margin-right: 10px;
  }
  input {
    flex: 1;
    outline: none;
    border: none;
    color: inherit;
    &::placeholder {
      color: inherit;
    }
  }
  .search {
    font-size: 20px;
    color: #c9ced9;
    cursor: pointer;
  }
}
</style>
