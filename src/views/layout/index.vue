<template>
 <div class="layout flex">
  <Header ref="header"></Header>
  <div class="wrapper-view flex" :class="{ dark: setting.theme === 'dark' && useTheme }" :style="{paddingTop: paddingTop + 'px'}">
   <div class="side" v-if="$route.meta.user">
    <side-menu :isShow="true"></side-menu>
   </div>

   <div class="main">
    <router-view></router-view>
   </div>
  </div>

  <Footer v-if="$route.meta.footer" />
 </div>
</template>

<script>
import Header from "@/components/header/header.vue";
// import Footer from "@/components/footer/footer.vue";
import Tools from "@/components/tools.vue";
import {mapState} from "vuex";
import {useThemePage} from "@/libs/useThemePage";
import Footer from "@/components/footer/footer.vue";
import SideMenu from "@/components/sideMenu/index.vue";

export default {
 components: {
  SideMenu,
  Footer,
  Header,
  // Footer,
  Tools,
 },
 data() {
  return {
   paddingTop: 0,
  }
 },
 computed: {
  ...mapState(["header", "setting"]),
  useTheme() {
   return !!useThemePage.includes(this.$route.fullPath);
  },
 },
 mounted() {
  // console.log('当前路径',this.$route.name);
  // zE('messenger', 'show');

  this.paddingTop = this.$refs.header.$el.clientHeight
 }
};
</script>

<style lang="scss" scoped>
.layout {
 flex-direction: column;
 width: 100%;
 min-height: 100vh;
 min-width: 1440px;
 overflow: auto;
 background-color: $bg;
 position: relative;

 .wrapper-view {
  flex: 1 1 auto;
  height: 1%;
  width: 100%;

  &.dark {
   background-color: var(--main-bg);
  }

  .main {
   flex: 1 1 auto;
   width: 1%;
  }
 }
}
</style>
