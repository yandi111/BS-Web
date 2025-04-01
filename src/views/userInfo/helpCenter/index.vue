<!-- 帮助中心 -->
<template>
  <div class="help-center">
    <div class="header">
      <div class="breadCrumb">
        <div>{{ $t("userInfo.帮助中心") }} </div>
      </div>
      <div class="header-right">
        <div class="input">
          <el-input
            v-model="searchVal"
            :placeholder="$t('userInfo.搜索帮助文章')"
          ></el-input>
          <div class="search" @click="handleSearch">
            {{ $t("userInfo.搜索") }}
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="module">
        <div class="module-title">{{ questionList.nameLanguage }}</div>
        <div class="grid commonProblem">
          <div
            class="grid-question-item"
            v-for="item in questionList.children"
            :key="item.id"
            @click="goToSecondaryPage(item)"
          >
            <div class="imgBox">
              <!-- <img
                :src="require('@/assets/helpCenter-imgs/' + item.imageUrl)"
                alt=""
              /> -->
              <img :src="item.image" alt="" />
            </div>
            <div class="name">{{ item.nameLanguage }}</div>
          </div>
        </div>
      </div>
      <div class="module">
        <div class="module-title">{{ beginnersTutorialList.nameLanguage }}</div>
        <div class="grid between">
          <div
            class="grid-production-item pointer"
            v-for="item in beginnersTutorialList.children"
            :key="item.id"
            @click="goToSecondaryPage(item)"
          >
            <div class="imgBox">
              <!-- <img
                :src="require('@/assets/helpCenter-imgs/' + item.imageUrl)"
                alt=""
              /> -->
              <img :src="item.image" alt="" />
            </div>
            <div class="title ml0">{{ item.nameLanguage }}</div>
          </div>
          <div class="place"></div>
        </div>
      </div>
      <div class="module">
        <div class="module-title">
          {{ productDescriptionList.nameLanguage }}
        </div>
        <div class="grid between">
          <div
            class="grid-production-item pointer"
            v-for="item in productDescriptionList.children"
            :key="item.id"
            @click="goToSecondaryPage(item)"
          >
            <div class="icon">
              <img src="" alt="" />
            </div>
            <div class="title ml0">{{ item.nameLanguage }}</div>
          </div>
          <div class="place"></div>
        </div>
      </div>
      <div class="module">
        <div class="module-title">{{ $t("userInfo.新闻中心") }}</div>
        <div class="grid news">
          <div
            class="cell"
            @click="checkTheNews(item)"
            v-for="item in newsArticle"
            :key="item.newsId"
          >
            <div class="block"></div>
            <div class="text">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="module">
        <div class="module-title">{{ $t("userInfo.公告中心") }}</div>
        <div class="grid announcement">
          <div
            class="cell"
            v-for="item in announcementCenter"
            :key="item.announceId"
          >
            <div class="title">{{ item.title }}</div>
            <div class="content">
              <div class="mb20 describe">
                {{ item.describe }}
              </div>
              <span class="date">{{ item.startTime }}</span>
            </div>
            <div class="more" @click="viewMore(item)">
              {{ $t("home.查看更多") }}
              <i class="iconfont icon-next"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  helpSortListApi,
  newsListApi,
  newsHotListApi,
  $getHelpSort,
  announcementApi,
} from "@/api/user";
export default {
  name: "HelpCenter",
  components: {},
  data() {
    return {
      searchVal: "",
      questionList: {}, //常见问题
      beginnersTutorialList: {}, //新手教程
      productDescriptionList: {}, //产品说明
      announcementCenter: [],
      newsArticle: [], //最新文章
      hotArticle: [], //热门文章
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getTitleTypeList(); //获取导航标题
      this.getAnnouncement(); //公告中心
      this.getNews();//新闻中心
    },

    //获取全部标题
    getTitleTypeList() {
      const params = {
        id: 92,
        type: 1,
      };
      $getHelpSort(params).then((res) => {
        res.data.data.forEach((item) => {
          if (item.id == 94) {
            this.questionList = item;
            console.log('this.questionList',this.questionList);
          } else if (item.id == 97) {
            this.beginnersTutorialList = item;
          } else if (item.id == 98) {
            this.productDescriptionList = item;
          }
        });
      });
    },

    //新闻中心
    getNews() {
      newsListApi().then((res) => {
        console.log("res.data", res.data);
        this.newsArticle = res.data.data || [];
      });
    },

    //公告中心
    getAnnouncement() {
      announcementApi().then((res) => {
        this.announcementCenter = res.data.data.slice(0, 2);
        // console.log("this.", this.announcementCenter);
      });
    },

    // 搜索
    handleSearch() {
      this.$router.push({
        path: "/helpSearch",
        query: {
          val: this.searchVal,
        },
      });
    },

    //前往二级页
    goToSecondaryPage(val) {
      this.$router.push({
        path: "/helpCenterPage/guide",
        query: {
          id: val.id,
          type: val.superiorId,
        },
      });
    },
    //公告查看
    viewMore(val) {
      const query = {
        type: 1,
        id: val.announceId,
      };
      this.$router.push({
        path: "/postDetail",
        query,
      });
    },

    //查阅新闻
    checkTheNews(val) {
      const query = {
        type: 2,
        id: val.newsId,
      };
      this.$router.push({
        path: "/postDetail",
        query,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@use "./scss/index.scss";
</style>
