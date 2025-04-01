<template>
  <div class="s-tabs" :class="isBg?'s-bg':''">
    <div class="tab">
      <div
        class="tab-item"
        :class="active == item.id ? 'tab-active' : ''"
        v-for="item in tabsList"
        :key="item.id"
        @click="tabItem(item)"
      >
        <div>{{ item.label}}</div>
        <div v-show="active == item.id" class="t-border"></div>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "sTabs",
  props: {
    tabsList: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
      default: 1,
    },
    isBg:{
      type:Boolean,
      default: false,
    }
  },
  data() {
    return {
      // active: 1,
    };
  },
  methods: {
    tabItem(item) {
      this.$emit("update:active", item.id);
      this.$emit("activeFn", item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.s-tabs {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tab {
    display: flex;
    align-items: center;
    .tab-item {
      position: relative;
      font-size: 14px;
      color: #96a2b2;
      padding-right: 20px;
      cursor: pointer;
      .t-border {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 55%;
        height: 5px;
        background: linear-gradient(
          90deg,
          #90ff00 0%,
          rgba(255, 255, 255, 0) 100%
        );
      }
    }
    .tab-active {
      font-size: 16px;
      color: #333;
    }
  }
}
.s-bg{
  background: #f5f7fa !important;
}
</style>
