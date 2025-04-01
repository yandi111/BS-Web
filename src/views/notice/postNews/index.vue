<!-- 新闻中心 -->
<template>
  <div class="whole-notice">
    <table-page
      :page.sync="announceParams.pageNum"
      :total="total"
      :pageSize.sync="announceParams.pageSize"
      @current-change="handleCurrentChange"
    >
      <template #table>
        <ul>
          <li v-for="item in newsList" :key="item.newsId" @click="more(item)">
            <p class="title">
              <img
                v-if="item.isRead === 0"
                src="@/assets/images/unread.png"
                alt=""
              />
              {{ item.title }}
            </p>
            <!-- <div class="desc" v-html="item.content"></div> -->
            <div class="desc">{{ item.describe }}</div>
            <div class="bottom-content">
              <p class="time">
                {{ item.publishTime }}
              </p>
              <!-- <p class="more-content" @click="more(item)">
                <span class="time">查看更多</span>
                <i class="el-icon-arrow-right"></i>
              </p> -->
            </div>
          </li>
        </ul>
        <div class="empty" v-if="!newsList.length">
          <my-empty></my-empty>
        </div>
      </template>
    </table-page>
  </div>
</template>

<script>
import TablePage from "@/components/tablePage/index.vue";
import { newsListApi } from "@/api/home";
export default {
  name: "PostNews",
  components: {
    TablePage,
  },
  data() {
    return {
      total: 0,
      announceParams: {
        language: "zh_cn",
        pageNum: 1,
        pageSize: 10,
      },
      newsList: [],
    };
  },
  mounted() {
    this.getNewsList();
  },
  methods: {
    //查询新闻列表
    getNewsList() {
      newsListApi(this.announceParams).then((res) => {
        this.newsList = res.data.data.records;
        this.total = res.data.data.total;
      });
    },

    // 跳转到新闻详情
    more(row) {
      this.$router.push({
        path: "/postDetail",
        query: {
          type:2,
          id: row.newsId
        },
      });
    },
    // 分页点击
    handleCurrentChange(num) {
      this.announceParams.pageNum = num.page;
      this.getNewsList();
    },
  },
};
</script>
<style lang="scss" scoped>
@use "../style/module.scss";

::v-deep .table-content .common-filter {
  padding: 0;
}
::v-deep .table-content .common-page {
  margin-right: 70px;
}
.empty {
  margin-top: 100px;
}
</style>
