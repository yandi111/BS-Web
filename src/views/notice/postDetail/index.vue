<template>
  <div class="post-detail">
    <div class="header">
      <div class="back" @click="back">
        <i class="el-icon-back"></i>
        <h1>{{ $t("notice.详情") }}</h1>
      </div>
      <div class="tool-wrapper">
        <el-input
          class="search"
          v-model="article"
          :placeholder="$t('notice.搜索帮助文章')"
        ></el-input>
        <el-button type="primary" class="btn" @click="handleSearch">{{
          $t("notice.搜索")
        }}</el-button>
      </div>
    </div>
    <!-- 公告详情 -->
    <div class="latest-post" v-show="type == 1">
      <p class="title">{{ title }}</p>
      <p class="time" v-if="createTime">{{ $formatTime(createTime) }}</p>
      <div class="content" v-html="content"></div>
    </div>
    <!-- 新闻详情 -->
    <div class="latest-post" v-show="type == 2">
      <p class="title">{{ title }}</p>
      <p class="time">{{ createTime }}</p>
      <div class="content" v-html="content"></div>
    </div>
    <!-- 帮助详情 -->
    <div class="latest-post" v-show="type == 3">
      <p class="title">{{ title }}</p>
      <p class="time">{{ createTime }}</p>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { announceDetail, userNewsDetail, helpcontentDetail } from "@/api/home";
export default {
  name: "postDetail",
  data() {
    return {
      article: "",
      announceId: null,
      title: "",
      createTime: "",
      content: "",
      type: null,
    };
  },
  created() {
    // 保存路由参数
    // console.log("新闻详情q", this.$route.query.row);
    // if (this.$route.query.row.id) {
    //   this.announceId = this.$route.query.row.id;
    //   this.type = this.$route.query.row.type;
    //   localStorage.setItem("detailId", this.$route.query.row.id);
    //   localStorage.setItem("detailType", this.$route.query.row.type);
    // }
    // if (this.$route.query.row.newsId) {
    //   this.announceId = this.$route.query.row.newsId;
    //   this.type = this.$route.query.row.type;
    //   localStorage.setItem("detailId", this.$route.query.row.newsId);
    //   localStorage.setItem("detailType", this.$route.query.row.type);
    // }
    // if (this.$route.query.row.announceId) {
    //   this.announceId = this.$route.query.row.announceId;
    //   this.type = this.$route.query.row.type;
    //   localStorage.setItem("detailId", this.$route.query.row.announceId);
    //   localStorage.setItem("detailType", this.$route.query.row.type);
    // }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.announceId = this.$route.query.id;
      this.type = this.$route.query.type;
      const type = Number(this.type);
      switch (type) {
        case 1:
          this.$nextTick(() => {
            this.getDetail(this.announceId);
          });
          break;
        case 2:
          this.$nextTick(() => {
            this.getNews(this.announceId);
          });
          break;
        case 3:
          this.$nextTick(() => {
            this.getHelps(this.announceId);
          });
          break;
        default:
      }
    },
    //公告详情
    getDetail(id) {
      announceDetail({ id: id }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.title = res.data.data.contentList[0].title;
            this.createTime = res.data?.data?.createTimeTsLong;
            this.content = res.data.data.contentList[0].content;
          }
        }
      });
    },
    //新闻详情
    getNews(id) {
      userNewsDetail({ newsId: id }).then((res) => {
        this.title = res.data.data.title;
        this.createTime = res.data.data.publishTime;
        this.content = res.data.data.content;
      });
    },
    //帮助详情
    getHelps(id) {
      helpcontentDetail({ helpId: id }).then((res) => {
        this.title = res.data.data.title;
        this.createTime = res.data.data.publishTime;
        this.content = res.data.data.content;
      });
    },

    back() {
      this.$router.go(-1);
    },
    handleSearch() {
      this.$router.push({
        path: "/helpSearch",
        query: {
          val: this.article,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-detail {
  width: 100%;
   background-color: #f8f9fb;
   padding-bottom: 20px;
  .header {
    width: 100%;
    height: 105px;
    padding: 0 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
   
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
    margin: 0 360px;
    padding: 40px;
    background: #fff;
    border-radius: 6px;
    margin-bottom: 20px;
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
      color: #96a2b2;
      margin-bottom: 30px;
    }
    .content {
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      width: 100%;
      color: #333333;
      margin-bottom: 20px;
      ::v-deep img {
        max-width: 100%;
        margin: 20px 0;
      }
      ::v-deep p{
        margin: 20px 0;
      }
      // ::v-deep p.ql-indent-1.ql-align-justify{
      //   padding-left:3em
      // }
      // ::v-deep  .ql-lineheight-1 {
      //   line-height: 1;
      // }
      // ::v-deep  .ql-lineheight-1-5 {
      //   line-height: 1.5;
      // }
      // ::v-deep  .ql-lineheight-1-75 {
      //   line-height: 1.75;
      // }
      // ::v-deep  .ql-lineheight-2 {
      //   line-height: 2;
      // }
      // ::v-deep  .ql-lineheight-3 {
      //   line-height: 3;
      // }
      // ::v-deep  .ql-lineheight-4 {
      //   line-height: 4;
      // }
      // ::v-deep  .ql-lineheight-5 {
      //   line-height: 5;
      // }
    }
  }
}
</style>
