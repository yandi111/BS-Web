<template>
  <div class="searchPage">
    <div class="search-list">
      <div class="s-title">
        <i class="el-icon-back" @click="back"></i>
        <span
          >{{ `“${$route.query.search}”` }}{{ $t("square.的搜索结果") }}</span
        >
      </div>
      <div class="s-tabs">
        <s-tabs :tabsList="tabsList" :active.sync="activeId"></s-tabs>
      </div>
    </div>
    <div
      class="s-tabs-item"
      :class="{ bg: activeId == 2 }"
      v-infinite-scroll="getListData"
      :infinite-scroll-disabled="!isLoad"
    >
      <div v-if="activeId == 1">
        <div>
          <div class="s-focus mb20" v-for="(item, index) in list" :key="index">
            <s-info-card
              :info="item"
              @onChangeState="onChangeState('content', $event)"
            >
              <template #content>
                <div class="container">
                  <div
                    class="textbox pointer"
                    @click="
                      $router.push({
                        path: '/square/detail',
                        query: { id: item.id },
                      })
                    "
                  >
                    <p class="name">{{ item.title }}</p>
                   <div class="text"> {{ item.content }}</div>
                  </div>
                  <div class="imgsBox mt10" v-if="item.urls">
                    <s-imags :urls="item.urls" />
                  </div>
                  <div class="orinal mt10" v-if="item.originalContent">
                    <detailForward :info="item.originalContent" />
                  </div>
                </div>
              </template>
            </s-info-card>
          </div>
        </div>
      </div>
      <div v-if="activeId == 2">
        <div v-if="list.length">
          <div class="s-u-item" v-for="(item, index) in list" :key="index">
            <div class="s-user-box">
              <div class="s-u-left">
                <div class="s-u-icon pointer" @click="toAuthorDetail(item)">
                  <img :src="item.avatar" alt="" />
                </div>
                <div class="s-u-text">
                  <span>{{ item.nickname }}</span>
                  <!-- <span class="s-u-level">V0</span> -->
                </div>
              </div>
              <div
                class="s-r-btn"
                :class="item.isFollowAuthor == 1 ? 's-r-btnAt' : ''"
                @click="onChangeState('user', item)"
              >
                <span v-if="item.isFollowAuthor == 0">{{
                  $t("square.关注")
                }}</span>
                <span v-if="item.isFollowAuthor == 1">{{
                  $t("square.已关注")
                }}</span>
              </div>
            </div>
            <div class="s-b-box">
              <div class="s-u-border"></div>
            </div>
          </div>
        </div>
      </div>
      <sEmptyStatus :state="state" v-if="!list.length" />
    </div>
    <el-backtop target=".s-tabs-item" ref="backtop"></el-backtop>
  </div>
</template>

<script>
import sTabs from "../components/s-tabs.vue";
import sInfoCard from "../components/s-info-card.vue";
import sImags from "../components/s-imgs.vue";
import sEmptyStatus from "../components/s-empty-status.vue";
import detailForward from "../squareDetail/components/detail-forward.vue";
import * as api from "@/api/square";

import { mapGetters } from "vuex";
export default {
  name: "searchList",
  components: {
    sTabs,
    sInfoCard,
    sImags,
    sEmptyStatus,
    detailForward,
  },
  data() {
    return {
      activeId: 1,
      tabsList: [
        {
          id: 1,
          label: "内容",
        },
        {
          id: 2,
          label: "用户",
        },
      ],
      searchParams: {
        pageNum: 1,
        pageSize: 10,
        sortType: null,
        keyword: null,
        type: null,
        uid: null,
        isRepost: null,
      },
      list: [],
      state: "",
      isLoad: true,
      keyMap: {},
    };
  },
  watch: {
    activeId: {
      handler(newValue) {
        this.list = [];
        this.searchParams.pageNum = 1;
        this.isLoad = true;
        this.getListData();
      },
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.searchParams.keyword = this.$route.query.search;
    console.log("this.", this.$route.query);
    if (this.$route.query.own || this.$route.query.uid) {
      this.tabsList.splice(1, 1);
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toAuthorDetail(item) {
      const params =
        item.uid == this.userInfo.uid
          ? {
              path: "squarePersonal",
            }
          : {
              path: "infomation-others",
              query: {
                uid: item.uid,
              },
            };
      this.$router.push(params);
    },
    getListData(loading) {
      const o = {
        1: "getArticleList",
        2: "authorList",
      };
      if (loading == "loading") {
        this.list = [];
        this.searchParams.pageNum = 1;
      }

      //查询时 会调两次
      const key = `_${this.searchParams.pageNum}`;
      const value = this.keyMap[key];
      if (value) return;
      this.keyMap[key] = "temp";

      if (this.$route.query.own) {
        this.searchParams.uid = this.userInfo.uid;
      } else {
        this.searchParams.uid = this.$route.query.uid;
      }

      api[`$${o[this.activeId]}`](this.searchParams)
        .then((res) => {
          this.state = "success";
          this.list = [...this.list, ...res.data.data.records];
          this.searchParams.pageNum++;
          this.isLoad = this.list.length == res.data.data.total ? false : true;
          console.log("内容", this.list);
        })
        .catch((err) => {
          this.state = "error";
          this.isLoad = false;
        })
        .finally(() => {
          this.keyMap = {};
        });
    },

    //关注状态
    onChangeState(type, val) {
      const params =
        type == "content" ? val : { uid: val.uid, follow: !val.isFollowAuthor };
      api.$onFollowOperations(params).then((res) => {
        if (res.data.success) {
          this.getListData("loading");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.searchPage {
  position: relative;
  height: 900px;
  overflow: hidden;
  background-color: #f5f7fa;
  .el-backtop {
    position: absolute;
    bottom: 120px !important;
  }
  .search-list {
    border-radius: 6px;
    border-bottom-left-radius: 0px;
    padding: 20px 20px 15px;
    margin-right: 5px;
    color: #333;
    background-color: #fff;
    border: 1px solid #e9edf2;
    border-bottom: none;
    .s-title {
      display: flex;
      align-items: center;
      font-size: 22px;
      .el-icon-back {
        padding-right: 10px;
        cursor: pointer;
      }
    }
    .s-tabs {
      margin-top: 30px;
    }
  }
  .s-tabs-item {
    background-color: #f5f7fa;

    height: 780px;
    overflow-y: auto;
    overflow-x: hidden;
    &.bg {
      background-color: #fff;
      border: 1px solid #e9edf2;
    }
    .s-focus {
      &:first-child {
        .info-card {
          border-top-right-radius: 0px;
          border-top-left-radius: 0px;
        }
      }
      .container {
        .textbox {
          color: #333;
          font-size: 14px;
          .name {
            font-size: 16px;
          }
          .text {
              word-break: break-all;
            }
        }
        .imgsBox {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
        }
        .orinal {
          width: 100%;
        }
      }
    }
  }
  .s-u-item {
    margin-bottom: 15px;
    .s-user-box {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      font-size: 16px;
      .s-r-btn {
        height: 25px;
        line-height: 25px;
        background: #90ff00;
        border-radius: 2px;
        text-align: center;
        padding: 0 15px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
      }
      .s-r-btnAt {
        background: #68d9b7;
      }
      .s-u-left {
        display: flex;
        .s-u-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            display: inline-block;
            border-radius: 50%;
          }
        }
        .s-u-text {
          .s-u-level {
            height: 10px;
            line-height: 10px;
            background: #e8f8f4;
            border-radius: 2px;
            color: #90ff00;
            text-align: center;
            font-size: 10px;
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .s-b-box {
    padding-left: 70px;
    .s-u-border {
      margin-top: 20px;
      border: 1px solid #e9edf2;
    }
  }
}
</style>
