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
import { getUserStatus } from "@/api/user.js";
import { getToken } from "@/libs/utils.js";

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
  methods: {
    // getUserStatus() {
    //   if (!getToken()) return;
    //   let params = {
    //     type: 1,
    //     key: "withdrawCoinsGuidanceStatus",
    //   };
    //   this.$store.commit("setGuideTypeState", params.key);
    //   getUserStatus(params).then((res) => {
    //     console.log('res.data',res.data);
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
