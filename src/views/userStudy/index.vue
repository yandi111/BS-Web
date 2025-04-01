<!-- 新手教程 -->
<template>
  <div class="study-container">
    <div class="study-banner">
      <img src="@/assets/video-img/banner.png" alt="" />
      <div class="banner-container">
        <p>{{ bannerTitle }}</p>
        <p>{{ bannerDescribe }}</p>
      </div>
    </div>
    <study-finance></study-finance>
    <study-problem></study-problem>
    <news-hots></news-hots>
  </div>
</template>

<script>
import StudyFinance from "./components/studyFinance.vue";
import StudyProblem from "./components/studyProblem.vue";
import NewsHots from "./components/newsHots.vue";
import * as api from "@/api/noviceTeaching.js";
export default {
  name: "UserStudy",
  components: {
    StudyFinance,
    StudyProblem,
    NewsHots,
  },
  data() {
    return {
      bannerPic: "",
      bannerTitle: "区块链入门到精通",
      bannerDescribe: "一站式学习平台",
    };
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      const params = {
        categoryId: 6,
        type: 1,
      };
      api.$getBanner(params).then((res) => {
        this.bannerPic = res.data?.data[0]?.imgUrl;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.study-container {
  width: 100%;
  height: 100%;
  .study-banner {
    position: relative;
    img {
      width: 100%;
    }

    .banner-container {
      position: absolute;
      top: 155px;
      left: 210px;
      p {
        &:first-child {
          font-size: 65px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 54px;
        }
        &:last-child {
          font-size: 40px;
          font-weight: 500;
          color: #fff;
        }
      }
    }
  }
}
</style>
