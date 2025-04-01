<template>
  <div class="layout">
    <tools></tools>
    <Header></Header>
    <div class="notice-wrapper">
      <div class="back" @click="back">
        <i class="el-icon-back"></i>
        <h1>公告中心</h1>
      </div>
      <div class="tool-wrapper">
        <el-input
          class="search"
          v-model="article"
          placeholder="搜索帮助文章"
        ></el-input>
        <el-button type="primary" class="btn">搜索</el-button>
      </div>
    </div>
    <div class="wrapper-view">
      <div class="main-content">
        <div class="side">
          <side-menu></side-menu>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import SideMenu from "@/components/sideMenu/index.vue";
import Tools from "@/components/tools.vue";
export default {
  name: "NoticeLayout",
  components: {
    Header,
    Footer,
    SideMenu,
    Tools
  },
  data() {
    return {
      article: "",
      checked: true,
    };
  },
  methods: {
    back() {
      let upperLevel = this.$route.query.upperLevel;
      if (upperLevel) {
        this.$router.push(upperLevel);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .notice-wrapper {
    width: 100%;
    height: 105px;
    padding: 0 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fb;
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
        ::v-deep   .el-input__inner {
          width: 260px;
        }
      }
      .btn {
        margin-left: 20px;
        width: 80px;
      }
    }
  }
  .wrapper-view {
    width: 100%;
    height: calc(100% - 70px - 105px);
    overflow-y: auto;
    .main-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      background-color: #ffffff;
      // border-bottom: 1px solid #f8f9fb;
      .side {
        min-width: 280px;
        width: 280px;
        // height: 935px;
        min-height: 500px;
        display: flex;
        justify-content: center;
        // border: 1px solid red;
        margin-right: 20px;
        // background-color: #ffffff;
      }
      .content {
        // background-color: #FFFFFF;
        flex: 1;
      }
    }
  }
}
</style>
