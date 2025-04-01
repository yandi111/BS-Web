<!-- 新手指引弹窗 -->
<template>
  <div id="guideMaskLayer" v-if="$store.state.setting.guideMask_isShow">
    <First :total="total" :current.sync="current" v-show="current == 1" />
    <Second :total="total" :current.sync="current" v-show="current == 2" />
    <Three :total="total" :current.sync="current" v-show="current == 3" />
  </div>
</template>

<script>
// import { getUserStatus } from "@/api/user.js";
import { getToken } from "@/libs/utils.js";

import First from "./components/first.vue";
import Second from "./components/second.vue";
import Three from "./components/three.vue";
export default {
  components: {
    First,
    Second,
    Three,
  },
  data() {
    return {
      current: 1,
      total: 3,
    };
  },
  methods: {
    // getUserStatus() {
    //   if (!getToken()) return;
    //   let params = {
    //     type: 1,
    //     key: "depositGuidanceStatus",
    //   };
    //   this.$store.commit("setGuideTypeState", params.key);
    //   getUserStatus(params).then((res) => {
    //     if (res.data.data[params.key] == 1) {
    //       this.$store.commit("setguideMask_isShow", true);
    //     } else {
    //       this.$store.commit("setguideMask_isShow", false);
    //     }
    //   });
    // },
  },
  mounted() {
    // this.getUserStatus();
  },
};
</script>

<style lang="scss" scoped></style>
