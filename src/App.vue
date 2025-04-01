<template>
  <div id="app">
    <keep-alive>
      <router-view
        v-if="ifRouterAlive && $route.meta.keepAlive"
        :key="$route.fullPath"
      />
    </keep-alive>
    <router-view
      v-if="ifRouterAlive && !$route.meta.keepAlive"
      :key="$route.fullPath"
    />
    
    <my-modal :isShow.sync="showModal" @close="handleClose"> 

      <template #header>
        <div class="m-title">{{ modalTitle }}</div>
      </template>

      <template #content>
        <div class="m-content">
          {{ modalContent }}
        </div>
      </template>
      <template #footer>
        <div>
          <div class="m-btn" v-if="showBtn" @click="handleClose">{{ $t('header.我已知晓') }}</div>
        </div>
      </template>
    </my-modal>
  </div>
</template>

<script>
import myModal from "./components/my-modal/index.vue";
import {getCoinList} from '@/api/user'
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  components: {
    myModal,
  },
  data() {
    return {
      ifRouterAlive: true,
      showModal: false,
      modalContent: "",
      modalTitle:"",
      showBtn: false,
    };
  },
  mounted() {
    this.getCoinConfig()
  },
  methods: {
   async getCoinConfig(){
    const res= await getCoinList()
    if(res.code!==200) return
    this.$store.commit('saveCoinConfig',res.data)
    
    },
    reload() {
      this.ifRouterAlive = false;
      this.$nextTick(() => {
        this.ifRouterAlive = true;
      });
    },
    handleClose(){
      this.showModal = false;
    }
  },
  computed: {
    isMobileRebate() {
      return this.$route.name === 'mobileRebate'; // 检查当前路由名称
    }
  },
};
</script>
<style lang="scss">
.el-tooltip__popper.my-tooltip {
  background-color: var(--main-bg) !important;
  color: var(--main-text-color) !important;
  box-shadow: 0 1px 8px 0 rgba($color: #cccccc, $alpha: var(--box-shadow-alpha));

  .popper__arrow {
    border: none !important;
  }
  .contentBox {
    min-width: 160px;
    max-width: 270px;
    .text {
      line-height: 20px;
      font-size: 12px;
      color: var(--tooltip-text-color);
    }
  }
  p {
    line-height: 17px;
    span {
      color: var(--theme-color);
      cursor: pointer;
    }
    .content_text {
      color: var(--main-text-color);
      cursor: default;
    }
  }
}
.my-tooltip.el-tooltip__popper[x-placement^="top"] .popper__arrow::after {
  border-top-color: var(--main-bg) !important;
}
.my-tooltip.el-tooltip__popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: var(--main-bg) !important;
}
.my-tooltip.el-tooltip__popper[x-placement^="left"] .popper__arrow::after {
  border-left-color: var(--main-bg) !important;
}
.my-tooltip.el-tooltip__popper[x-placement^="right"] .popper__arrow::after {
  border-right-color: var(--main-bg) !important;
}
.m-title{
  font-size: 18px;
  font-weight: 600;
}
.m-conetnt{
  font-size: 16px;
}
.m-btn{
  height: 40px;
  line-height: 40px;
  background: #90ff00;
  color: #fff;
  text-align: center;
  cursor: pointer;
  margin-top: 40px;
  border-radius: 8px;
}
</style>
