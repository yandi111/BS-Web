<template>
  <div class="page">
    <template v-if="showList">
      <creator-article-list></creator-article-list>
    </template>
    <template v-else>
      <header>
        <s-user-card @next="toFans"></s-user-card>
      </header>
      <main>
        <creator-data
          :statisticalData="statisticalData"
          @onDate="onDate"
        ></creator-data>
        <div class="postedContent">
          <div class="title df aic jb pb20">
            <div class="left df aic">
              <img src="@/assets/square-imgs/s-content.png" alt="" />
              <span class="ml10 f18">{{ $t("square.已发布内容") }}</span>
            </div>
            <div class="right df aic" @click="onArticleList">
              <span>{{ $t("square.查看更多") }}</span>
              <i class="iconfont icon-next ml5"></i>
            </div>
          </div>
          <div class="content">
            <sEmptyStatus :state="state" v-if="!contentList.length" />
            <div class="card" v-for="(item, index) in contentList" :key="index">
              <creator-card
                :info="item"
                @onSuccess="onSuccess"
                noEdit
              ></creator-card>
            </div>
          </div>
        </div>
      </main>
    </template>
  </div>
</template>

<script>
import creatorArticleList from "./components/creator-article-list.vue";
import sUserCard from "../components/s-user-card.vue";
import creatorData from "./components/creator-data.vue";
import creatorCard from "./components/creator-card.vue";
import sEmptyStatus from "../components/s-empty-status.vue";

import * as api from "@/api/square";

export default {
  name: "squareCreator",
  components: {
    sEmptyStatus,
    creatorArticleList,
    creatorData,
    creatorCard,
    sUserCard,
  },
  data() {
    return {
      showList: false,
      editArticle_isShow: false,
      contentList: [],
      currentDate: {},
      statisticalData: {},
      state: "",
    };
  },
  methods: {
    onDate(date) {
      const _today = new Date(new Date().toDateString()).getTime() / 1000;
      // console.log('new Date()',new Date());
      const o = {
        today: () => {
          return {
            startTime: _today,
            endTime: Math.floor(new Date().getTime() / 1000),
          };
        },
        week: () => {
          return {
            startTime: _today - 7 * 24 * 60 * 60,
            endTime: Math.floor(new Date().getTime() / 1000),
          };
        },
        month: () => {
          return {
            startTime: _today - 30 * 24 * 60 * 60,
            endTime: Math.floor(new Date().getTime() / 1000),
          };
        },
        all: () => {
          return {};
        },
      };
      this.currentDate = o[date]();
      this.getStatisticalData(this.currentDate);
    },
    // 个人发布数据
    getPersonalData() {
      const params = {
        pageNum: 1,
        pageSize: 2,
        // isRepost: 0, //0 原创 1 转发
        status: 2, // 2 已发布 3 已下架
      };
      api
        .$getMyContentList(params)
        .then((res) => {
          this.state = "success";
          console.log("内容列表", res.data.data.records);
          this.contentList = res.data.data.records;
        })
        .catch(() => {
          this.state = "error";
        });
    },
    //数据表现
    getStatisticalData(date) {
      const params = date.startTime
        ? {
            startTime: date.startTime * 1000,
            endTime: date.endTime * 1000,
          }
        : {};
      api.$getStatisticalData(params).then((res) => {
        this.statisticalData = { ...res.data.data, ...this.currentDate };
      });
    },
    onSuccess() {
      this.getPersonalData();
    },
    toFans(index) {
      this.$router.push({
        path: "/square/squarePersonal",
        query: {
          following: index,
        },
      });
    },

    onArticleList() {
      this.$router.push({
        name: "squareCreator",
        query: {
          search: "",
          s: this.currentDate.startTime + "8013",
          e: this.currentDate.endTime + "107",
        },
      });
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        if (JSON.stringify(newValue.query) != "{}") {
          this.showList = true;
        } else {
          this.showList = false;
          this.getPersonalData();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  // mounted() {
  //   this.getPersonalData();
  // },
};
</script>

<style lang="scss" scoped>
.page {
  // height: 960px;
  width: 930px;
  main {
    .postedContent {
      margin-top: 15px;
      padding: 20px;
      padding-bottom: 0;
      background: #ffffff;
      border-radius: 6px;
      border: 1px solid #e9edf2;
      .title {
        .left {
          img {
            width: 24px;
          }
          span {
            color: #333;
          }
        }
        .right {
          font-size: 14px;
          color: #8992a6;
          cursor: pointer;
          &:hover {
            color: var(--theme-color);
          }
          .iconfont {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
