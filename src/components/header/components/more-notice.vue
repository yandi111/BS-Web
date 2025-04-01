<!-- 内容通知 -->
<template>
  <div class="more-container">
    <div class="notice-count flex-box-between">
      <div class="left-count">
        <span class="count">{{ amount }}</span>
        <span class="text">{{$t("header.new_notifications")}}</span>
        <span class="clear" @click="clearAll">{{$t("header.clear_all")}}</span>
      </div>
      <div class="more">
        <span @click="more">{{$t("header.see_more")}}</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <ul class="notice-list" v-if="noticeList.length">
      <li v-for="item in noticeList" :key="item.id">
        <p class="title">{{ item.title }}</p>
        <p class="desc">
          {{ item.content }}
        </p>
        <p class="time">{{ $formatTime(item.createTimeTsLong) }}</p>
      </li>
    </ul>
    <div class="no-data" v-else>
      <my-empty></my-empty>
    </div>
  </div>
</template>

<script>
import { msgHistory, deleteAll, unreadCount } from "@/api/home";
import { webSocketMixin } from "./socket";
import {getToken} from "@/libs/utils"
import { baseWssApi } from '@/request/baseApi.js'
export default {
  name: "MoreNotice",
  mixins: [webSocketMixin],
  components: {},
  data() {
    return {
      wsUrl: `${baseWssApi}/ws/zh_cn/${getToken()}`,
      activeIndex: 0,
      noticeList: [],
      pageParams: {
        page: 1,
        size: 6,
      },
      amount: null,
    };
  },
  mounted(){
    this.init()
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
      self.websockSend("noticeData");
    },
    init(){
      this.getHistory()
      this.getUnreadCount()
    },
    //消息通知-历史消息
    getHistory() {
      msgHistory(this.pageParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.noticeList = res.data.data.records || [];
          }
        }
      });
    },
    //未读消息
    getUnreadCount() {
      unreadCount().then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.amount = res.data.data;
            this.$store.commit("setUnreadState", res.data.data);
          }
        }
      });
    },
    // 选择
    // choose(data) {
    //   this.activeIndex = data;
    //   this.$emit("detail", data);
    // },
    // 清除全部
    clearAll() {
      deleteAll().then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.getHistory();
          }
        }
      });
    },
    // 查看更多
    more() {
      this.$router.push("/notice/wholeNotice");
    },
  },
};
</script>
<style lang='scss' scoped>
.more-container {
  padding: 10px 0;
  .notice-count {
    font-family: PingFangSC-Medium, PingFang SC;
    // width: 100%;
    height: 40px;
    background: #f5f5f5;
    border-radius: 6px;
    padding: 0 10px;
    margin: 0 15px;
    .left-count {
      display: flex;
      align-items: center;
      .count {
        font-size: 16px;
        color: #333333;
      }
      .text {
        color: #8992a6;
        font-size: 12px;
        padding: 0 10px;
      }
      .clear {
        font-size: 12px;
        font-weight: 500;
        color: #90ff00;
        cursor: pointer;
      }
    }
    .more {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      cursor: pointer;
      &:hover {
        color: #90ff00;
      }
      .el-icon-arrow-right {
        margin-left: 15px;
      }
    }
  }

  .notice-list {
    width: 100%;
    margin-top: 10px;
    padding: 0 15px;
    max-height: 500px;
    overflow-y: auto;
    li {
      width: 100%;
      border-radius: 6px;
      padding: 10px;
      cursor: pointer;
      .title {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .desc {
        width: 408px;
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #8992a6;
      }
      .time {
        font-size: 10px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #8992a6;
        margin-top: 5px;
      }
      &:hover {
        background: #F5F7FA;
      }
      &:focus {
        background: #F5F7FA;
      }
    }
  }
  .no-data {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    img {
      width: 262px;
      height: 149px;
      display: inline-block;
    }
    p {
      margin-top: 30px;
    }
  }
  .flex-box-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>