<template>
  <div class="layout">
    <tools></tools>
    <Header></Header>
    <div class="wrapper-view">
      <div class="main-content">
        <div class="side">
          <side-menu :isShow="true"></side-menu>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
      <!-- <Footer></Footer> -->
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
// import Footer from "@/components/footer/footer.vue";
import SideMenu from "@/components/sideMenu/index.vue";
import Tools from "@/components/tools.vue";
export default {
  name: "UserLayout",
  components: {
    Header,
    // Footer,
    SideMenu,
    Tools
  },
  mounted() {
    zE("messenger", "show");
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .wrapper-view {
    background-color: #141414;
    width: 100%;
    height: calc(100% - 70px);
    // overflow-y: auto;
    .main-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      background-color: #141414;
      .side {
        // min-width: 280px;
        // min-height: 500px;
        display: flex;
        justify-content: center;
        background-color: #141414;
        margin-bottom: 60px;
      }
      .content {
        background-color: #141414;
        margin-bottom: 60px;
        flex: 1;
      }
    }
  }
}
</style>