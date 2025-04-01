<template>
  <div class="layout">
    <Header></Header>
    <div class="wrapper-view">
      <div class="information">
        <div class="header container">
          <div class="header-left">
            <i class="el-icon-back" @click="handleBack"></i>
            <span @click="handleBack">{{ $t("information.产品资讯") }}</span>
          </div>
          <div class="header-right">
            <el-input
              v-model="searchVal"
              :placeholder="$t('information.搜索帮助文章')"
            ></el-input>
            <span class="search" @click="handleSearch">{{
              $t("information.搜索")
            }}</span>
          </div>
        </div>
        <div class="nav container">
          <div class="nav-left">
            <div
              class="nav-item"
              v-for="(item, index) in navList"
              :key="index"
              :class="item.url === $route.path ? 'nav-active' : ''"
              @click="handleNav(item)"
            >
              {{ item.title }}
            </div>
          </div>
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
export default {
  name: "InformationLayout",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      searchVal: "",
      navList: [
        {
          title: this.$t("information.相关协议"),
          url: "/information/compliance",
        },
      ],
    };
  },
  mounted() {
    zE("messenger", "show");
  },
  methods: {
    handleSearch() {
      this.$router.push({
        path: "/helpSearch",
        query: {
          val: this.searchVal,
        },
      });
    },
    handleNav(item) {
      if (item.url === "/information/compliance") {
        let url = "/information/compliance?params=2";
        this.$router.push(url);
      } else {
        this.$router.push(item.url);
      }
    },
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  color: #333;
  overflow: hidden;
  position: relative;
  .wrapper-view {
    width: 100%;
    height: calc(100% - 70px);
    overflow-y: auto;

    .information {
      width: 100%;
      background: #f8f9fb;
      padding-bottom: 60px;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 105px;
        .header-left {
          .el-icon-back {
            font-size: 24px;
            margin-right: 10px;
            cursor: pointer;
          }
          span {
            font-size: 32px;
            cursor: pointer;
          }
        }
        .header-right {
          display: flex;
          .search {
            display: inline-block;
            width: 80px;
            height: 40px;
            line-height: 40px;
            background: #90ff00;
            border-radius: 3px;
            text-align: center;
            color: #fff;
            margin-left: 20px;
            cursor: pointer;
          }
        }
      }
      .nav {
        display: flex;
        width: 100%;
        .nav-left {
          min-width: 295px;
          background: #fff;
          margin-right: 5px;
          padding-bottom: 20px;
          .nav-item {
            height: 60px;
            line-height: 60px;
            font-size: 16px;
            padding-left: 20px;
            cursor: pointer;
          }
          .nav-active {
            background: #f5f7fa;
            color: #90ff00;
          }
        }
        .content {
          width: 100%;
        }
      }
    }
    .container {
      padding: 0 210px;
    }
  }
}
</style>