<template>
  <div class="layout">
    <tools></tools>
    <Header></Header>
    <div class="wrapper-view">
      <div class="main-content">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue"
import Tools from '@/components/tools.vue'
export default {
  name: 'Layout',
  components: {
    Header,
    Tools
  },
   mounted() {
    zE("messenger", "show");
  },
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .wrapper-view {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .main-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      background-color: #141414;
      padding: 0 360px 170px 360px;
      .content {
        flex: 1;
      }
    }
  }
}
</style>