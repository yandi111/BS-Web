<!-- 帮助中心 -->
<template>
  <div class="help-center">
    <div class="header">
      <div>公告中心</div>
      <div class="header-right">
        <div class="input">
          <el-input v-model="searchVal" placeholder="搜索公告"></el-input>
          <div class="search" @click="handleSearch">搜索</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="container-title">公告类别</div>
      <div class="grid">
        <div class="grid-item">
          <img
            class="post-item1"
            src="@/assets/user-img/post-item1.png"
            alt=""
          />
          <div class="item-title">最新动态</div>
          <div class="item-text">及时掌握币家最新动态。</div>
        </div>
        <div class="grid-item">
          <img src="@/assets/user-img/post-item2.png" alt="" />
          <div class="item-title">API更新</div>
          <div class="item-text">了解API近期更新。</div>
        </div>
        <div class="grid-item">
          <img src="@/assets/user-img/post-item3.png" alt="" />
          <div class="item-title">最新活动</div>
          <div class="item-text">探索并参与币家最新活动。</div>
        </div>
        <div class="grid-item">
          <img src="@/assets/user-img/post-item4.png" alt="" />
          <div class="item-title">数字货币及交易对上新</div>
          <div class="item-text">
            查看Lauchpad、launchpool、现货 合约市场的最新上币和交易对资讯。
          </div>
        </div>
        <div class="grid-item">
          <img src="@/assets/user-img/post-item5.png" alt="" />
          <div class="item-title">钱包维护更新</div>
          <div class="item-text">随时了解钱包维护、各网络情况。</div>
        </div>
        <div class="no-data"></div>
      </div>
      <div class="news">
        <div class="news-title">最新公告</div>
        <div class="news-content">
          <div
            class="news-item"
            v-for="(item, index) in list"
            :key="index"
            @click="handleDetail(item)"
          >
            {{ item.title }}
            <span>{{ item.startTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { scrollAnnouncement } from "@/api/user";
export default {
  name: "AnnouncementCenter",
  components: {},
  data() {
    return {
      searchVal: "",
      list: [],
    };
  },
  mounted() {
    this.newsList();
  },
  methods: {
    //最新公告
    newsList() {
      scrollAnnouncement().then((res) => {
        this.list = res.data.data;
      });
    },

    // 搜索
    handleSearch() {
      this.$router.push({
        path: "/helpSearch",
        query: {
          val: this.searchVal,
        },
      });
    },
    //公告详情
    handleDetail(row) {
      this.$router.push({
        path: "/postDetail",
        query: {
          type: 1,
          id:row.announceId,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.help-center {
  background: #f5f7fa;
  color: #333;
  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 23px;
    font-size: 32px;
    font-weight: 500;
    padding: 30px 210px 23px 210px;
    .header-right {
      .input {
        display: flex;

        align-items: center;
        ::v-deep .el-input__inner {
          width: 260px;
          height: 30px;
          line-height: 30px;
        }
      }
      .search {
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: $colorB;
        border-radius: 3px;
        color: #fff;
        text-align: center;
        font-size: 14px;
        // margin-left: 20px;
        cursor: pointer;
      }
    }
  }
  .container {
    // margin: 0 210px;
    padding: 0 210px;
    background-color: #fff;
    border-radius: 15px 15px 0px 0px;
    .container-title {
      font-size: 28px;
      font-weight: 500;
      // margin: 37px 0 30px 0;
      padding-top: 30px;
      margin-bottom: 40px;
    }
    .grid {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .grid-item {
        width: 460px;
        height: 320px;
        background: #f5f7fa;
        border-radius: 6px;
        margin-bottom: 60px;
        font-size: 14px;
        color: #96a2b2;
        padding: 50px 0px 0px 50px;
        .post-item1 {
          width: 130px;
          height: 89px;
        }
        .post-item2 {
          width: 116px;
          height: 107px;
        }
        .post-item3 {
          width: 80px;
          height: 101px;
        }
        .post-item4 {
          width: 95px;
          height: 100px;
        }
        .post-item5 {
          width: 81px;
          height: 101px;
        }
        .item-title {
          font-size: 18px;
          color: #333;
          padding: 40px 0px 20px 0px;
        }
        .item-text {
          max-width: 230px;
        }
      }
      .no-data {
        width: 460px;
        height: 320px;
      }
    }

    .news {
      .news-title {
        font-size: 28px;
        color: #333;
      }
      .news-content {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .news-item {
          width: 550px;
          font-size: 14px;
          color: #333;
          margin-bottom: 30px;
          cursor: pointer;
          span {
            color: #96a2b2;
            font-size: 12px;
            padding-left: 20px;
          }
        }
      }
    }
  }
}
</style>
