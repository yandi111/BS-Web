<!-- 最新公告 -->
<template>
  <div class="latest-post">
    <p class="title">{{ title }}</p>
    <p class="time">{{ $formatTime(createTime) }}</p>
    <div class="content" v-html="content">
     
    </div>
  </div>
</template>

<script>
import { announceDetail } from "@/api/home";
export default {
  name: "LatestPost",
  components: {},
  data() {
    return {
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
  },
};
</script>
<style lang='scss' scoped>
.latest-post {
  padding: 40px 60px;
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
    color: #333333;
    margin-bottom: 20px;
  }
}
</style>