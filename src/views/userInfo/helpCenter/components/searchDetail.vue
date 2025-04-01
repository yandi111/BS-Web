<template>
  <div class="news-detail">
    <div class="header">
      <div class="back" @click="back">
        <i class="el-icon-back"></i>
        <h1>详情</h1>
      </div>
      <div class="tool-wrapper">
        <el-input
          class="search"
          v-model="article"
          placeholder="搜索帮助文章"
        ></el-input>
        <el-button type="primary" class="btn" @click="handleSearch"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="latest-post" v-if="tabIndex ==1">
      <p class="title">{{ title }}</p>
      <p class="time">{{ createTimeTsLong }}</p>
      <div class="content" v-html="content"></div>
    </div>
    <div class="latest-post" v-else>
      <p class="title">{{ title }}</p>
      <p class="time">{{ createTimeTsLong }}</p>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { userNewsDetail, announceDetail, helpcontentDetail } from "@/api/home"; 
export default {
  name: "Detail",
  data() {
    return {
      article: "",
      title: "",
      createTimeTsLong: "",
      content: "",
      paramsData: {
        id: null,
        type: null,
      },
      tabIndex: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.paramsData.id = this.$route.query.id;
      this.paramsData.type = this.$route.query.type;
      this.tabIndex = this.$route.query.type;
      this.getDetail(this.paramsData.type);
    },

    //获取详情
    getDetail(type) {
      switch (type) {
        case '1':
          //公告
          announceDetail({ id: this.paramsData.id }).then((res) => {
            this.title = res.data.data.contentList[0].title;
            this.createTimeTsLong = res.data.data.createTimeTsLong;
            this.content = res.data.data.contentList[0].content;
          });
          break;
        case '2':
          //新闻
          userNewsDetail({ newsId: this.paramsData.id }).then((res) => {
            this.title = res.data.data.title;
            this.createTimeTsLong = res.data.data.publishTime;
            this.content = res.data.data.content;
          });
          break;
        case '3':
          //帮助中心
          helpcontentDetail({ helpId: this.paramsData.id }).then((res) => {
            this.title = res.data.data.title;
            this.createTimeTsLong = res.data.data.publishTime;
            this.content = res.data.data.content;
          });
          break;
        default:
      }
    },

    //搜索
    handleSearch() {
      this.$router.push({
        path: "/helpSearch",
        query: {
          val: this.article,
        },
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.news-detail {
  width: 100%;
  .header {
    width: 100%;
    height: 105px;
    padding: 0 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fb;
    .back {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-icon-back {
        font-size: 24px;
        margin-right: 15px;
        cursor: pointer;
      }
      h1 {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
    }
    .tool-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .search {
        ::v-deep .el-input__inner {
          width: 260px;
        }
      }
      .btn {
        margin-left: 20px;
        width: 80px;
      }
    }
  }
  .latest-post {
    padding: 40px 80px;
    .title {
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
      margin-bottom: 30px;
    }
    .time {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #8992a6;
      margin-bottom: 30px;
    }
    .content {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      width: 100%;
      color: #333333;
      margin-bottom: 20px;
      ::v-deep img {
        max-width: 100%;
      }
    }
  }
}
</style>
