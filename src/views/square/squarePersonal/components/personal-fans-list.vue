<template>
  <div class="fans-list">
    <div class="p-user">
      <i class="el-icon-back" @click="goBack()"></i>
      <div class="p-u-box">
        <div class="p-u-avatar">
          <img
            v-if="getCommunityPersonalInformation?.avatar"
            :src="getCommunityPersonalInformation?.avatar"
            alt=""
          />
          <img v-else src="@/assets/square-imgs/defaultAvatar.png" alt="" />
        </div>
        <div class="p-u-right">
          <div>{{ getCommunityPersonalInformation.nickname }}</div>
          <div class="p-u-des">
            {{ getCommunityPersonalInformation.username }}
          </div>
        </div>
      </div>
    </div>
    <div class="p-tabs">
      <s-tabs :tabsList="tabsList" :active.sync="tabIndex"></s-tabs>
    </div>
    <div class="box">
      <div
        class="p-t-card"
        :infinite-scroll-disabled="!isLoad"
        v-infinite-scroll="getListData"
      >
        <div v-show="tabIndex == 1">
          <div v-for="(item, index) in list" :key="index">
            <s-notify-focus :info="item">
              <template>
                <div class="s-notify-r">
                  <div
                    class="notify-r-btn"
                    :class="!item.followMe ? 'focus-bg' : ''"
                    @click="handleFocus('focus', item)"
                  >
                    <span v-if="item.followMe">{{ $t("square.互关") }}</span>
                    <span v-if="!item.followMe">{{ $t("square.已关注") }}</span>
                  </div>
                </div>
              </template>
            </s-notify-focus>
          </div>
        </div>
        <div v-show="tabIndex == 2">
          <div v-for="(item, index) in list" :key="index">
            <s-notify-focus :info="item">
              <template>
                <div class="s-notify-r">
                  <div
                    class="notify-r-btn"
                    :class="!item.isFollowFans ? 'focus-bg' : ''"
                    @click="handleFocus('fans', item)"
                  >
                    <span>{{
                      item.isFollowFans == 0
                        ? $t("square.回关")
                        : $t("square.互关")
                    }}</span>
                  </div>
                  <div class="notify-r-more">
                    <s-notify-more
                      :info="item"
                      @success="handleMore(arguments)"
                    ></s-notify-more>
                  </div>
                </div>
              </template>
            </s-notify-focus>
          </div>
        </div>
      </div>
      <el-backtop target=".p-t-card" ref="backtop"></el-backtop>
    </div>
  </div>
</template>

<script>
import sTabs from "../../components//s-tabs";
import sNotifyFocus from "../../squareNotify/s-notify-focus";
import sNotifyMore from "../../squareNotify/s-notify-more";

import * as api from "@/api/square";

import { mapGetters } from "vuex";
export default {
  components: {
    sTabs,
    sNotifyFocus,
    sNotifyMore,
  },
  data() {
    return {
      tabIndex: 1,
      tabsList: [
        {
          id: 1,
          label: this.$t("square.关注"),
        },
        {
          id: 2,
          label: this.$t("square.粉丝"),
        },
      ],
      params: {
        pageNum: 1,
        pageSize: 10,
        uid: undefined,
      },
      list: [],
      state: "",
      isLoad: true,
      keyMap: {},
    };
  },
  computed: {
    ...mapGetters(["getCommunityPersonalInformation"]),
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    handleFocus(type, item) {
      const params =
        type == "fans"
          ? {
              uid: item.uid,
              follow: !item.isFollowFans,
            }
          : {
              uid: item.uid,
              follow: false,
            };
      if (!params.follow) {
        this.$myAlert("square.确定要取消关注吗？", {
          cancel: this.$t("square.取消"),
          callback: () => {
            api.$onFollowOperations(params).then((res) => {
              if (res.data.success) {
                this.getListData("loading");
                this.$store.dispatch("handleSetCommunityPersonalInformation");
              }
            });
          },
        });
      } else {
        api.$onFollowOperations(params).then((res) => {
          if (res.data.success) {
            this.getListData("loading");
            this.$store.dispatch("handleSetCommunityPersonalInformation");
          }
        });
      }
    },
    handleMore(data) {
      if (data[0].id == 1) {
        //移除
        api.$unsubscribe({ fansUid: data[1].uid }).then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: this.$t("square.移除成功"),
              type: "success",
            });
            this.getListData("loading");
          }
        });
      } else if (data[0].id == 2) {
        // 拉黑
        api
          .$onBlacklistOperation({ uid: data[1].uid, black: true })
          .then((res) => {
            if (res.data.code == 1) {
              this.$message({
                message: this.$t("square.拉黑成功"),
                type: "success",
              });
              this.getListData("loading");
            }
          });
      }
    },
    getListData(loading) {
      const o = {
        1: "getWatchlist",
        2: "getFanList",
      };

      const key = `_${this.params.pageNum}`;
      const value = this.keyMap[key];
      if (value) return;
      this.keyMap[key] = "temp";

      if (loading == "loading") {
        this.list = [];
        this.params.pageNum = 1;
      }

      this.params.uid = this.getCommunityPersonalInformation.uid;
      const params = { ...this.params };

      api[`$${o[this.tabIndex]}`](params)
        .then((res) => {
          this.state = "success";
          this.list = [...this.list, ...res.data.data.records];
          this.params.pageNum++;
          this.isLoad = this.list.length == res.data.data.total ? false : true;
          console.log("this.list", this.list);
        })
        .catch(() => {
          this.state = "error";
          this.isLoad = false;
        })
        .finally(() => {
          this.keyMap = {};
        });
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.query.following == 2) {
          this.tabIndex = 2;
        }
      },
      deep: true,
      immediate: true,
    },
    tabIndex: {
      handler(newValue) {
        this.list = [];
        this.params.pageNum = 1;
        this.isLoad = true;
        this.getListData();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.fans-list {
  position: relative;
  color: #333;
  height: 900px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e9edf2;
  padding: 20px;
  padding-right: 0;
  .el-backtop {
    position: absolute;
    bottom: 120px !important;
  }
  .p-user {
    i {
      font-size: 24px;
      cursor: pointer;
    }
    .p-u-box {
      margin-top: 30px;
      display: flex;
      .p-u-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        font-size: 16px;
        img {
          width: 100%;
          height: 100%;
          display: inline-block;
          border-radius: 50%;
        }
      }
      .p-u-des {
        font-size: 12px;
        color: #8992a6;
        margin-top: 5px;
      }
    }
  }
  .p-tabs {
    margin-top: 20px;
  }
  .box {
    height: 725px;
    padding-right: 20px;
    overflow-y: auto;
    .p-t-card {
      margin-top: 20px;
      .s-notify-r {
        display: flex;
        align-items: center;
        .notify-r-btn {
          line-height: 30px;
          border: 1px solid #90ff00;
          border-radius: 4px;
          text-align: center;
          color: #90ff00;
          font-size: 16px;
          padding: 0 15px;
          cursor: pointer;
        }
        .focus-bg {
          background: #90ff00;
          color: #fff;
        }
      }
      .notify-r-more {
        margin-left: 15px;
        img {
          width: 24px;
          height: 24px;
          display: inline-block;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
