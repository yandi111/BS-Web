<template>
  <div class="help-search">
    <el-row>
      <el-col :span="24">
        <div class="search-box">
          <div class="search-mid">
            <div class="search-title">请输入您的问题</div>
            <div class="input">
              <el-input
                v-model="searchVal"
                placeholder="搜索帮助文章"
                prefix-icon="el-icon-search"
              ></el-input>
              <div class="search" @click="handleSearch">搜索</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col :span="24">
        <div class="list container">
          <div class="nav">
            <span class="nav-text" @click="handleNav('/layout/home')"
              >首页</span
            >
            <span class="nav-line"></span>
            <span class="nav-text" @click="handleNav('/helpCenterPage')"
              >帮助中心</span
            >
            <span class="nav-line"></span>
            <span class="nav-search">搜索结果</span>
          </div>
          <div v-if="searchList.length" class="list-box">
            <div class="list-item" v-for="(item,index) in searchList" :key="index" @click="handleDetail(item)">
              <div class="title-box">
                <p class="title">{{ item.title }}</p>
                <p class="time">{{ item.publishTime }}</p>
              </div>
              <div class="list-content">{{ item.describe }}</div>
              <!-- <div class="list-content" v-html="item.content"></div> -->
            </div>
          </div>
          <div class="no-data" v-else>
            <img src="@/assets/images/null-page.png" alt="" />
            <p>暂无数据</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { newsSearchApi } from "@/api/user";
export default {
  name: "HelpSearch",
  data() {
    return {
      searchVal: "",
      searchList: [],
    };
  },
  mounted() {
    this.searchVal = this.$route.query.val;
    if (this.searchVal) {
      this.getList();
    }
  },
  methods: {
    handleSearch() {
      this.getList();
    },
    getList() {
      newsSearchApi({ title: this.searchVal }).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            //帮助中心
            this.searchList = res.data.data;
          }
        }
      });
    },
    handleNav(url) {
      this.$router.push(url);
    },
    //跳详情
    handleDetail(item){
      console.log('跳去详情',item);
       //携带id跳去详情页
      this.$router.push({
        path: "/detail",
        query: {
          type: item.type,
          id:item.id
        },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.help-search {
  width: 100%;
  background: #f5f7fa;
  .content {
    background: #fff;
    border-radius: 30px 30px 0px 0px;
  }

  .search-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // background: #f8f9fb;
    .search-mid {
      display: flex;
      flex-direction: column;
      text-align: center;
      .search-title {
        width: 100%;
        margin-top: 40px;
        font-size: 32px;
        font-weight: 500;
      }
      .input {
        margin: 40px 0px;
        width: 360px;
        display: flex;
        ::v-deep .el-input__inner {
          height: 40px;
          line-height: 40px;
        }
        .search {
          width: 80px;
          height: 40px;
          line-height: 40px;
          background: #90ff00;
          border-radius: 3px;
          color: #fff;
          text-align: center;
          font-size: 14px;
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .list {
    width: 100%;
    min-height: 500px;
    margin-top: 40px;
    .nav {
      width: 100%;
      font-size: 14px;
      color: #999;
      margin-bottom: 30px;
      .nav-line {
        height: 9px;
        width: 1px;
        background: #999;
        display: inline-block;
        margin: 0 20px;
      }
      .nav-search {
        color: #90ff00;
      }
      .nav-text {
        cursor: pointer;
      }
    }
    .list-box {
      .list-item {
        margin-bottom: 20px;
        padding: 10px 0px;
        cursor: pointer;
        .title-box {
          display: flex;
          justify-content: space-between;
          .title {
            font-size: 20px;
            font-weight: 600;
          }
          .time {
            font-size: 16px;
            color: #999;
            margin-top: 10px;
          }
        }
        .list-content {
          margin-top: 20px;
          font-size: 16px;
          color: #666;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /* 超出几行省略 */
          overflow: hidden;
        }
      }
    }
    .no-data {
      width: 100%;
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 262px;
        height: 149px;
        display: inline-block;
      }
      p {
        color: #333333;
        margin-top: 20px;
        font-size: 18px;
      }
    }
  }
  .container {
    padding: 0 210px;

    border-radius: 30px 30px 0px 0px;
  }
}
</style>
