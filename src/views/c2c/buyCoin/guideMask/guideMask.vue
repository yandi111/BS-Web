<!-- 新手指引弹窗 -->
<template>
  <div id="guideMaskLayer" v-if="$store.state.setting.guideMask_isShow">
    <First :total="total" :current.sync="current" v-show="current == 1" />
    <Second :total="total" :current.sync="current" v-show="current == 2" />
    <Three :total="total" :current.sync="current" v-show="current == 3" />
    <Fourth :total="total" :current.sync="current" v-show="current == 4" />
  </div>
</template>

<script>
import First from "./components/first.vue";
import Second from "./components/second.vue";
import Three from "./components/three.vue";
import Fourth from "./components/fourth.vue";
export default {
  components: {
    First,
    Second,
    Three,
    Fourth,
  },
  data() {
    return {
      current: 1,
      total: 4,
    };
  },
  mounted() {
    this.getUserStatus();
  },
};
</script>

<style lang="scss" scoped></style>
