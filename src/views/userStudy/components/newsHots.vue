<!-- 新闻热点 -->
<template>
  <div class="news-hots">
    <div class="title">新闻热点</div>
    <!-- <el-row :gutter="20">
      <el-col :span="6">
        <div class="img-container">
          <img decoding="async" src="@/assets/video-img/1.png" alt="新闻热点图片">
          <p>一文解读U本位永续合约交易与币本位永续......</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="img-container">
          <img decoding="async" src="@/assets/video-img/2.png" alt="新闻热点图片">
          <p>一文解读U本位永续合约交易与币本位永续......</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="img-container">
          <img src="@/assets/video-img/1.png" alt="">
          <p>一文解读U本位永续合约交易与币本位永续......</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="img-container">
          <img src="@/assets/video-img/2.png" alt="">
          <p>一文解读U本位永续合约交易与币本位永续......</p>
        </div>
      </el-col>
    </el-row> -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in newList" :key="index">
        <div class="img-container" @click="handleArticle(item.newsId)">
          <!-- <img
            decoding="async"
            src="@/assets/video-img/1.png"
            alt="新闻热点图片"
          /> -->
          <p>{{ item.title }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { newsListApi, newsHotListApi } from "@/api/user";
export default {
  name: "NewsHots",
  components: {},
  data() {
    return {
      newList: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      // newsListApi().then((res) => {
      //   if (res && res.status === 200) {
      //     if (res.data && res.data.success) {
      //       const list = res.data.data || [];
      //       this.newList = list.slice(0, 4);
      //     }
      //   }
      // });
      newsHotListApi({ language: "zh_cn" }).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            const list = res.data.data || [];
            this.newList = list.slice(0, 4);
          }
        }
      });
    },
    //发布文章详情
    handleArticle(id) {
      this.$router.push({
        path: "/newsDetail",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.news-hots {
  padding: 100px 210px 116px 210px;
  .title {
    font-size: 40px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 40px;
  }
  .img-container {
    width: 352px;
    height: 200px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    p{
      &:hover{
        color: #90ff00;
      }
    }
  }
}
</style>