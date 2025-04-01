<!-- 全部公告 -->
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
          <li v-for="item in newsList" :key="item.announceId" @click="more(item)">
            <p class="title">
              <img
                v-if="item.isRead === 0"
                src="@/assets/images/unread.png"
                alt=""
              />{{ item.title }}
            </p>
            <div class="desc">
              {{ item.describe }}
            </div>
            <div class="bottom-content">
              <p class="time">
                {{ item.startTime }}
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
import { announceListApi } from "@/api/user";
import { announcementRead } from "@/api/home";
export default {
  name: "PostNotice",
  components: {
    TablePage,
  },
  data() {
    return {
      total: 0,
      announceParams: {
        pageNum: 1,
        pageSize: 10,
        search: "",
        systemType: 2,
      },
      newsList: [],
    };
  },
  mounted() {
    this.getannounceList();
  },
  methods: {
    //已读
    getRead(id) {
      announcementRead({ id: id }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.getannounceList();
          }
        }
      });
    },
    //客户查询公告列表
    getannounceList() {
      announceListApi(this.announceParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.newsList = res.data.data.records || [];
            this.total = res.data.data.total;
          }
        }
      });
    },
    // 跳转到公告中心详情
    more(row) {
      this.getRead(row.announceId);
      this.$router.push({
        path: "/postDetail",
        query: {
          type: 1,
          id:row.announceId
        },
      });
    },
    // 分页点击
    handleCurrentChange(num) {
      this.announceParams.pageNum = num.page;
      this.getannounceList();
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
.empty{
 margin-top: 100px;
}
</style>
