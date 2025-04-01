<!-- 新手指引弹窗 -->
<template>
  <div id="guideMaskLayer" v-if="$store.state.setting.guideMask_isShow">
    <First :total="total" :current.sync="current" v-if="current == 1" />
    <Second :total="total" :current.sync="current" v-else-if="current == 2" />
    <Three :total="total" :current.sync="current" v-else-if="current == 3" />
    <Fourth :total="total" :current.sync="current" v-else-if="current == 4" />
    <Five :total="total" :current.sync="current" v-else-if="current == 5" />
    <Six :total="total" :current.sync="current" v-else />
  </div>
</template>

<script>
import First from "./components/first.vue";
import Second from "./components/second.vue";
import Three from "./components/three.vue";
import Fourth from "./components/fourth.vue";
import Five from "./components/five.vue";
import Six from "./components/six.vue";
export default {
  components: {
    First,
    Second,
    Three,
    Fourth,
    Five,
    Six,
  },
  data() {
    return {
      current: 1,
      total: 6,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const body = document.querySelector("body");
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
