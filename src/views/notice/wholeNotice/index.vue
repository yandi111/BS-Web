<!-- 全部通知 -->
<template>
  <div class="com-notice">
    <table-page
      :page.sync="pageParams.page"
      :total="total"
      :pageSize.sync="pageParams.size"
      @current-change="handleCurrentChange"
    >
      <template #table>
        <ul>
          <li
            v-for="item in noticeList"
            :key="item.id"
            @click="handleRead(item.id)"
          >
            <p class="title">
              <img
                v-if="item.readStatus === 0"
                src="@/assets/images/unread.png"
                alt=""
              />
              {{ item.title }}
            </p>
            <div class="desc">
              {{ item.content }}
            </div>
            <div class="bottom-content">
              <p class="time">{{ $formatTime(item.createTimeTsLong) }}</p>
            </div>
          </li>
        </ul>
        <div class="empty" v-if="!noticeList.length">
          <my-empty></my-empty>
        </div>
      </template>
    </table-page>
  </div>
</template>

<script>
import TablePage from "@/components/tablePage/index.vue";
import { msgHistory, readAll, deleteAll, updateMsgRead } from "@/api/home";
import { webSocketMixin } from "./socket";
import { getToken } from "@/libs/utils";
import { baseWssApi } from "@/request/baseApi.js";
export default {
  name: "WholeNotice",
  mixins: [webSocketMixin],
  components: {
    TablePage,
  },
  data() {
    return {
      wsUrl: `${baseWssApi}/ws/zh_cn/${getToken()}`,
      total: 0,
      pageParams: {
        page: 1,
        size: 10,
      },
      noticeList: [],
      comp: "",
    };
  },
  mounted() {
    this.comp = this.$route.name;
    switch (this.comp) {
      case "wholeNotice":
        this.$EventBus.$on("wholeMsg", (msg) => {
          //显示与隐藏已读消息功能
          if (msg) {
            //隐藏
            // console.log("消息11111111", msg);
          } else {
            //显示
          }
        });
        break;
      default:
    }

    //全部已读
    switch (this.comp) {
      case "wholeNotice":
        this.$EventBus.$on("readAllMsg", () => {
          this.getAllRead();
        });
        break;
      default:
    }

    //全部删除
    switch (this.comp) {
      case "wholeNotice":
        this.$EventBus.$on("allMsgDel", () => {
          this.getDeleteAll();
        });
        break;
      default:
    }

    this.getHistory();
  },
  methods: {
    // socket 推送
    websockOpen(e) {
      const self = this;
      // console.log("socket连接成功");
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      self.websockSend("wholeNotice");
    },
    // 修改消息为已读
    handleRead(id) {
      updateMsgRead({ id: id }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.getHistory();
          }
        }
      });
    },
    //全部已读
    getAllRead() {
      readAll().then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.getHistory();
          }
        }
      });
    },
    //全部删除
    getDeleteAll() {
      deleteAll().then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.getHistory();
          }
        }
      });
    },
    // 系统通知-历史消息
    getHistory() {
      msgHistory(this.pageParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.noticeList = res.data.data.records || [];
            this.total = res.data.data.total;
          }
        }
      });
    },
    // 分页点击
    handleCurrentChange(num) {
      this.pageParams.page = num.page;
      this.getHistory();
    },
  },
};
</script>
<style lang="scss" scoped>
@use "../style/common.scss";

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
