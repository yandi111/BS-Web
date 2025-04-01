<template>
  <div class="layout">
    <tools></tools>
    <Header></Header>
    <div class="notice-wrapper">
      <h1>{{ $t(t+'通知') }}</h1>
      <div class="tool-wrapper" v-if="comp ==='wholeNotice'">
        <el-checkbox v-model="checked" @change="handleRead"
          >{{ $t(t+'隐藏已读通知') }}</el-checkbox
        >
        <el-dropdown trigger="click">
          <i class="el-icon-success"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleAllRead"
              >{{ $t(t+'全部已读') }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click">
          <i class="el-icon-more-outline"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleAllDel"
              >{{ $t(t+'全部清除') }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="tool-wrapper" v-if="comp ==='systemNotice'">
        <el-checkbox v-model="checked" @change="handleRead"
          >{{ $t(t+'隐藏已读通知') }}</el-checkbox
        >
        <el-dropdown trigger="click">
          <i class="el-icon-success"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleAllRead"
              >{{ $t(t+'全部已读') }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click">
          <i class="el-icon-more-outline"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleAllDel"
              >{{ $t(t+'全部清除') }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
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
    Tools,
  },
  data() {
    return {
      checked: false,
      comp: "",
      t:'notice.'
    };
  },
  mounted() {
    this.comp = this.$route.name;
  },
  methods: {
    handleRead(val) {
      switch (this.comp) {
        case "wholeNotice":
          this.$EventBus.$emit("wholeMsg", val);
          break;
        case "systemNotice":
          this.$EventBus.$emit("systemMsg", val);
          break;
        default:
      }
    },
    handleAllRead() {
      switch (this.comp) {
        case "wholeNotice":
          this.$EventBus.$emit("readAllMsg");
          break;
        case "systemNotice":
          this.$EventBus.$emit("readSystemMsg");
          break;
        default:
      }
    },
    handleAllDel() {
      switch (this.comp) {
        case "wholeNotice":
          this.$EventBus.$emit("allMsgDel");
          break;
        case "systemNotice":
          this.$EventBus.$emit("systemMsgDel");
          break;
        default:
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
    padding: 0 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fb;
    h1 {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
    }
    .tool-wrapper {
      width: 200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
      // background-color: #ffffff;
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