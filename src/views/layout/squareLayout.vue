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
      <!-- <Footer :changePadding="true" v-if="$route.name != 'squareDetail'"></Footer> -->
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue"
// import Footer from "@/components/footer/footer.vue"
import SideMenu from '@/components/sideMenu/index.vue'
import Tools from '@/components/tools.vue'
export default {
  name: 'SquareLayout',
  components: {
    Header,
    // Footer,
    SideMenu,
    Tools,
  },
  created(){
    zE('messenger', 'hide');
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  position: relative;
  .wrapper-view {
    width: 100%;
    height: calc(100% - 70px);
    overflow-y: auto;
    .main-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      background-color: #f5f7fa;
      // padding: 30px 360px 0px 360px;
      .side {
        width: 240px;
        display: flex;
        justify-content: center;
        background-color: #FFFFFF;
        margin-bottom: 60px;
      }
      .content {
        flex: 1;
        margin-bottom: 60px;
        padding-left: 20px;
      }
    }
  }
}
</style>