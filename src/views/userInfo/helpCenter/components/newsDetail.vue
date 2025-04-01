<template>
  <div class="news-detail">
    <div class="header">
      <div class="back" @click="back">
        <i class="el-icon-back"></i>
        <h1>新闻详情</h1>
      </div>
      <div class="tool-wrapper">
        <el-input
          class="search"
          v-model="article"
          placeholder="搜索帮助文章"
        ></el-input>
        <el-button type="primary" class="btn">搜索</el-button>
      </div>
    </div>
    <div class="latest-post">
      <p class="title">{{ title }}</p>
      <p class="time">{{ createTime }}</p>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { userNewsDetail } from "@/api/home";
export default {
  name: "NewsDetail",
  data() {
    return {
      article: "",
      announceId: null,
      title: "",
      createTime: "",
      content: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.announceId = this.$route.query.id;
      this.getDetail(this.announceId);
    },
    getDetail(id) {
      userNewsDetail({ newsId: id }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.createTime = res.data.data.publishTime;
            this.content = res.data.data.content;
            this.title = res.data.data.title;
          }
        }
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
        ::v-deep   .el-input__inner {
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
      ::v-deep   img {
        max-width: 100%;
      }
    }
  }
}
</style>
