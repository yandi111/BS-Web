<template>
  <div class="s-notify">
    <div class="s-notify-search">
      <s-search @onSearch="onSearch"></s-search>
    </div>
    <div
      class="notify-search-list"
      v-if="JSON.stringify($route.query) !== '{}'"
    >
      <search-list></search-list>
    </div>
    <div class="s-notify-box" v-else>
      <div class="s-notify-tab">
        <s-tabs :tabsList="tabsList" :active.sync="activeId"></s-tabs>
      </div>
      <div
        class="s-content"
        :infinite-scroll-disabled="!isLoad"
        v-infinite-scroll="getListData"
      >
        <!-- 无数据状态 -->
        <sEmptyStatus :state="state" v-if="!list.length" />
        <!-- 新增关注 -->
        <div v-show="activeId == 1">
          <div v-for="(item, index) in list" :key="index">
            <s-notify-focus :info="item" :sText="$t('square.开始关注你了')">
              <template>
                <div class="s-notify-r">
                  <div
                    class="notify-r-btn"
                    :class="bg(item) ? 'focus-bg' : ''"
                    @click="handleFocus(item)"
                  >
                    <span v-if="!item.followStatus && !item.followMeStatus">{{
                      $t("square.关注")
                    }}</span>
                    <span v-if="!item.followStatus && item.followMeStatus">{{
                      $t("square.回关")
                    }}</span>
                    <span v-if="item.followStatus && !item.followMeStatus">{{
                      $t("square.已关注")
                    }}</span>
                    <span v-if="item.followStatus && item.followMeStatus">{{
                      $t("square.互关")
                    }}</span>
                  </div>
                </div>
              </template>
            </s-notify-focus>
          </div>
        </div>
        <!-- 获得点赞 -->
        <div v-show="activeId == 2">
          <div v-if="list.length">
            <div v-for="(item, index) in list" :key="index">
              <s-notify-focus
                :info="item"
                :isLike="true"
                :sText="
                  item.type == 1
                    ? $t('square.赞了你的文章')
                    : $t('square.赞了你的评论')
                "
              >
              </s-notify-focus>
            </div>
          </div>
        </div>
        <!-- 评论与转发 -->
        <div v-show="activeId == 3">
          <div v-if="list.length">
            <div v-for="(item, index) in list" :key="index">
              <s-notify-focus
                :info="item"
                :isComment="true"
                :sText="
                  item.type == 1
                    ? $t('square.评论了你的文章')
                    : item.type == 2
                    ? $t('square.回复了你的评论')
                    : $t('square.转发了你的文章')
                "
              >
              </s-notify-focus>
            </div>
          </div>
        </div>
      </div>
      <el-backtop target=".s-content" :bottom="100" ref="backtop"></el-backtop>
    </div>
  </div>
</template>

<script>
import sSearch from "../components/s-search.vue";
import sTabs from "../components/s-tabs.vue";
import sNotifyFocus from "./s-notify-focus.vue";
import searchList from "../components/s-search-list.vue";
import * as api from "@/api/square";
import sEmptyStatus from "../components/s-empty-status.vue";
import { mapState } from "vuex";
export default {
  name: "squareNotify",
  components: {
    sSearch,
    sTabs,
    sNotifyFocus,
    searchList,
    sEmptyStatus,
  },
  data() {
    return {
      activeId: 1,
      tabsList: [
        {
          id: 1,
          label: this.$t("square.新增关注"),
        },
        {
          id: 2,
          label: this.$t("square.获得点赞"),
        },
        {
          id: 3,
          label: this.$t("square.评论与转发"),
        },
      ],
      listParams: {
        pageNum: 1,
        pageSize: 10,
        readStatus: null, //读取状态 0-未读；1-已读；
      },
      list: [],
      state: "",
      isLoad: true,
      keyMap: {},
    };
  },
  computed: {
    ...mapState({
      userInfo: ({ square }) => square.userInfo,
    }),
  },
  methods: {
    //搜索
    onSearch(val) {
      this.$router.push({
        url: "/square/squareNotify",
        query: {
          search: val,
        },
      });
    },
    getListData(id, loading) {
      this.state = "";
      const o = {
        1: "fansPage",
        2: "likePage",
        3: "commentpage",
      };
      if (loading=='loading') {
        this.list = [];
        this.listParams.pageNum = 1;
      }

      const key = `_${this.listParams.pageNum}`;
      const value = this.keyMap[key];
      if (value) return;
      this.keyMap[key] = "temp";

      const index = id ? id : this.activeId;
      api[`$${o[index]}`](this.listParams)
        .then((res) => {
          this.state = "success";
          this.list = [...this.list, ...res.data.data.records];
          this.listParams.pageNum++;
          this.isLoad = this.list.length == res.data.data.total ? false : true;
          // if (this.activeId == 3) {
          //   console.log("this.list", this.list);

          //   console.log("121", 121);
          //   const arr = this.list.map((item) => {
          //     console.log("item", item);
          //     return {
          //       ...item,
          //       tipText:
          //         item.type == 1
          //           ? $t("square.评论了我的文章")
          //           : item.type == 2
          //           ? $t("square.回复了我的评论")
          //           : $t("square.转发了我的文章"),
          //     };
          //   });
          //   console.log("thi1111s.list", arr);
          // }
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
    // 互关、回关
    async handleFocus(item) {
      let res = await api.$onFollowOperations({
        uid: item.uid,
        follow: !item.followStatus,
      });
      if (res.data.code == 1) {
        this.getListData(1,'loading');
      }
    },
    //移除、拉黑
    handleMore(data) {
      if (data[0].id == 1) {
        //移除
        api.$unsubscribe({ fansUid: data[1].uid }).then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: "移除成功",
              type: "success",
            });
            this.getListData(1,'loading');
          }
        });
      } else if (data[0].id == 2) {
        // 拉黑
        api
          .$onBlacklistOperation({ uid: data[1].uid, black: true })
          .then((res) => {
            if (res.data.code == 1) {
              this.$message({
                message: "拉黑成功",
                type: "success",
              });
              this.getListData(1,'loading');
            }
          });
      }
    },
    bg(item) {
      if (
        (!item.followStatus && !item.followMeStatus) ||
        (!item.followStatus && item.followMeStatus)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    activeId: {
      handler(newValue) {
        this.list = [];
        this.listParams.pageNum = 1;
        this.isLoad = true;
        this.getListData();
      },
    },
  },
  // mounted() {
  //   let arr = [
  //     { date: "日", value: 23 },
  //     { date: "日", value: 244 },
  //     { date: "月", value: 66 },
  //     { date: "月", value: 123 },
  //     { date: "年", value: 884 },
  //     { date: "年", value: 92 },
  //   ];
  //   let date = ["日", "月", "年"];

  //   let s = [];
  //   s = date.map((ele) => {
  //     let o = {
  //       date: ele,
  //       value: [],
  //     };
  //     arr.forEach((item) => {
  //       if (ele == item.date) {
  //         o.value.push(item.value);
  //       }
  //     });
  //     return o;
  //   });
  //   console.log("s", s);
  // },
};
</script>

<style lang="scss" scoped>
.s-notify {
  position: relative;
  .s-notify-search {
    margin-bottom: 15px;
  }
  .el-backtop {
    position: absolute;
  }
  .s-notify-box {
    min-height: 900px;
    background: #ffffff;
    border-radius: 6px;
    border: 1px solid #e9edf2;
    padding: 20px 0 20px 20px;
    .s-notify-tab {
      margin-bottom: 30px;
    }
    .s-content {
      height: 810px;
      padding-right: 20px;
      overflow-y: auto;
    }
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
      .notify-r-more {
        margin-left: 15px;
        img {
          width: 24px;
          height: 24px;
          display: inline-block;
          cursor: pointer;
        }
      }
      .notify-r-like {
        width: 60px;
        height: 60px;
        background: pink;
      }
    }
  }
  .notify-search-list {
    background: #fff;
    width: 940px;
  }
}
</style>
