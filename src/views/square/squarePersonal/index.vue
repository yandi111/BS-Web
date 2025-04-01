<template>
  <div class="personal">
    <template v-if="$route.query.following">
      <personalFansList />
    </template>
    <template
      v-if="JSON.stringify($route.query) !== '{}' && !$route.query.following"
    >
      <search-list></search-list>
    </template>
    <template v-if="JSON.stringify($route.query) == '{}'">
      <div>
        <s-user-card
          @next="toFans"
          @editList="getList('loading')"
        ></s-user-card>
      </div>
      <div class="p-tabArr">
        <div>
          <s-tabs
            :tabsList="tabsArr"
            :active.sync="activeId"
            :isBg="true"
          ></s-tabs>
        </div>
        <div class="p-search">
          <el-input
            :placeholder="$t('square.搜索文章')"
            v-model="searchVal"
            @keyup.enter.native="onSearch"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <div
        class="p-box"
        v-infinite-scroll="getList"
        :infinite-scroll-disabled="!isLoad"
      >
        <sEmptyStatus :state="state" v-if="!list.length" />
        <div class="p-card" v-for="(item, index) in list" :key="index">
          <s-info-card
            :info="item"
            detail
            :setting="true"
            :forward="true"
            @onSuccess="onSuccess"
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
                  <div class="text">{{ item.content }}</div>
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
      <el-backtop target=".p-box" ref="backtop"></el-backtop>
    </template>
  </div>
</template>

<script>
import sUserCard from "../components/s-user-card.vue";
import sInfoCard from "../components/s-info-card.vue";
import sImags from "../components/s-imgs.vue";
import detailForward from "../squareDetail/components/detail-forward.vue";
import sEmptyStatus from "../components/s-empty-status.vue";
import sTabs from "../components/s-tabs.vue";
import sNotifyFocus from "../squareNotify/s-notify-focus.vue";
import sNotifyMore from "../squareNotify/s-notify-more.vue";
import searchList from "../components/s-search-list.vue";
import personalFansList from "./components/personal-fans-list";

import { $getMyContentList } from "@/api/square";
import { mapState, mapGetters } from "vuex";
export default {
  name: "squarePersonal",
  components: {
    sEmptyStatus,
    sUserCard,
    personalFansList,
    sInfoCard,
    sImags,
    sTabs,
    sNotifyFocus,
    sNotifyMore,
    searchList,
    detailForward,
  },
  data() {
    return {
      activeId: 1,
      tabsArr: [
        {
          id: 1,
          label: this.$t("square.全部内容"),
        },
      ],
      searchVal: "",
      listParams: {
        pageNum: 1,
        pageSize: 10,
        // isRepost: 0, //0 原创 1 转发
        status: 2, // 2 已发布 3 已下架
      },
      list: [],
      state: "",
      isLoad: true,
      keyMap: {},
    };
  },
  computed: {
    ...mapState({
      communityPersonalInformation: ({ square }) =>
        square.communityPersonalInformation,
    }),
    ...mapGetters(["getCommunityPersonalInformation"]),
  },
  methods: {
    //文章列表
    getList(loading) {
      //利用私有变量做缓存 防止重复调用
      const key = `_${this.listParams.pageNum}`;
      const value = this.keyMap[key];
      if (value) return;
      this.keyMap[key] = "temp";

      if (loading == "loading") {
        this.list = [];
        this.listParams.pageNum = 1;
        this.$refs.backtop.scrollToTop();
      }

      $getMyContentList(this.listParams)
        .then((res) => {
          this.state = "success";
          this.list = [...this.list, ...res.data.data.records];
          this.listParams.pageNum++;
          this.isLoad = this.list.length == res.data.data.total ? false : true;
          console.log("this.list", this.list);
        })
        .catch(() => {
          this.state = "error";
          this.isLoad = false;
        });
    },
    onSuccess(value) {
      this.keyMap = {};
      this.getList("loading");
    },
    //粉丝列表
    toFans(index) {
      this.$router.push({
        path: "/square/squarePersonal",
        query: {
          following: index,
        },
      });
    },
    //搜索
    onSearch() {
      this.$router.push({
        url: "/square/squarePersonal",
        query: {
          search: this.searchVal,
          own: 1398931,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.personal {
  position: relative;
  color: #333;
  .p-tabArr {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .p-search {
      width: 160px;
      ::v-deep .el-input__inner {
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #e9edf2;
        font-size: 14px;
        color: #8992a6;
      }
    }
  }

  .p-fans {
    min-height: 950px;
    background: #ffffff;
    border-radius: 6px;
    border: 1px solid #e9edf2;
    padding: 20px;
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
          background: pink;
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
  .dialog-content {
    padding: 20px;
  }
  .el-backtop {
    position: absolute;
    bottom: 120px !important;
  }
  .p-box {
    margin-top: 15px;
    border-radius: 8px;
    background-color: #fff;
    ::v-deep .empty-status{
      height: 635px;
    }

    .p-card {
      padding-bottom: 15px;
      background-color: #f5f7fa;
      &:last-child {
        padding-bottom: 0;
      }
      .container {
        font-size: 14px;
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
}
</style>
