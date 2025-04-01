<template>
  <div class="s-setting">
    <s-tabs :tabsList="sTabs" :active.sync="active"></s-tabs>
    <main class="mt30">
      <s-setting-reply-control
        v-if="active == 1"
        :permission="permissionValue"
        @controlPemission="controlPemission"
      ></s-setting-reply-control>
      <div
        v-else
        class="s-setting-two"
        :infinite-scroll-disabled="!isLoad"
        v-infinite-scroll="getBlacklistList"
      >
        <sEmptyStatus :state="state" v-if="!infoList.length" />
        <sSettingCard :list="infoList" @onAction="onUnblockOperation" />
      </div>
    </main>
  </div>
</template>

<script>
import sTabs from "../components/s-tabs.vue";
import sSettingReplyControl from "./components/setting-replyControl.vue";
import sSettingCard from "./components/setting-card";
import sEmptyStatus from "../components/s-empty-status.vue";

import { mapGetters } from "vuex";
import * as api from "@/api/square";
export default {
  components: {
    sTabs,
    sSettingReplyControl,
    sSettingCard,
    sEmptyStatus,
  },
  data() {
    return {
      sTabs: [
        { label: this.$t("square.回复控制"), id: 1 },
        { label: this.$t("square.拉黑用户"), id: 2 },
      ],
      active: 1,
      params: {
        pageNum: 1,
        pageSize: 10,
      },
      infoList: [],
      permissionValue: "all_user_comment",
      state: "",
      isLoad: true,
    };
  },
  methods: {
    controlPemission(params) {
      if (params.settingValues[0] == this.permissionValue) return;
      api.$setReplyPermission(params).then((res) => {
        if (res.data.success) {
          this.getControlPemission();
          this.$message({
            message: this.$t("square.修改权限成功"),
            type: "success",
          });
        }
      });
    },

    //解除拉黑
    onUnblockOperation(val) {
      const params = {
        uid: val.uid,
        black: false,
      };
      api.$onBlacklistOperation(params).then((res) => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: this.$t("square.解除拉黑成功"),
          });
          this.getBlacklistList("loading");
        }
      });
    },

    //黑名单列表
    getBlacklistList(loading) {
      this.state = "";
      const params = this.params;

      //重置页数为1 数组置空 滚动回顶部
      if (loading == "loading") {
        this.params.pageNum = 1;
        this.infoList = [];
        // this.$refs.backtop.scrollToTop();
      }

      api
        .$getBlacklistList(params)
        .then((res) => {
          console.log("黑名单列表", res.data.data);
          this.state = "success";
          this.params.pageNum++;
          this.infoList = [...this.infoList, ...res.data.data.records];
          this.isLoad =
            this.infoList.length == res.data.data.total ? false : true;
        })
        .catch(() => {
          this.state = "error";
          this.isLoad = false;
        });
    },

    getControlPemission() {
      api.$getReplyPermission().then((res) => {
        this.permissionValue = res.data.data.article_comment[0];
      });
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.getControlPemission();
  },
};
</script>

<style lang="scss" scoped>
.s-setting {
  background-color: #fff;
  height: 960px;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #e9edf2;
}
</style>
