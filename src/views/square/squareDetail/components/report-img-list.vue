<template>
  <div class="report-img-list">
    <div class="img" v-for="src in urlList" :key="src">
      <img class="pic" :src="src" alt="" />
      <i class="iconfont icon-close2 f22" @click="onRemove(src)"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      urlList: [],
    };
  },
  watch: {
    list: {
      handler(list) {
        this.urlList = list;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onRemove(val) {
      const index = this.urlList.indexOf(val);
      this.urlList.splice(index, 1);
      this.$emit("onChange", this.urlList);
    },
  },
};
</script>

<style lang="scss" scoped>
.report-img-list {
  display: flex;
  align-items: center;
  .img {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 10px;
    &:hover {
      .iconfont {
        display: flex;
      }
    }
    .pic {
      width: 100%;
      height: 100%;
    }
    .iconfont {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      color: #7c7f84;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
