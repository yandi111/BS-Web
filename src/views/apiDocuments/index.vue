<template>
  <div class="apiDocument">
    <div class="header">
      <div class="left">
        <div class="logo" @click="toHome">
          <img src="../../assets/apiDocuments_imgs/logo.png" alt="" />
        </div>
        <div class="tab">
          <div
            class="item"
            @click="changeTabBar(item.id)"
            v-for="item in topBarList"
            :key="item.id"
            :class="{ active: currentIndex == item.id }"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <!-- <div class="right">
        <div class="btn">English</div>
      </div> -->
    </div>
    <div class="sideBar">
      <div class="search">
        <input
          type="text"
          :placeholder="$t('lang_443')"
          @input="onSearch"
          v-model="searchKey"
        />
        <i class="iconfont icon-guanbi" v-show="searchKey" @click="clear"></i>
      </div>
      <div class="listBox">
        <div class="list">
          <div
            class="cell"
            v-for="(item, index) in sideBarList"
            :key="item.id"
            :class="{ tabActive: sideBarCurrentIndex == index }"
            @click="changeSideBar(item.id)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="contentBox">
        <div class="first" v-if="currentIndex == 0">
          <basicInfo v-if="sideBarCurrentIndex == 0" />
          <uesrApi v-else></uesrApi>
        </div>
        <div class="second" v-else-if="currentIndex == 1">
          <apiDoc :data="data"></apiDoc>
        </div>
        <div class="second" v-else-if="currentIndex == 2">
          <apiDoc :data="data"></apiDoc>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiDocument from "./js/data.js";
import { debounce } from "./js/debounce.js";
import sideList from "./js/sideList.js";
import basicInfo from "./components/basicInfo.vue";
import uesrApi from "./components/uesrApi.vue";
import apiDoc from "./components/apiDoc.vue";
export default {
  components: {
    basicInfo,
    uesrApi,
    apiDoc,
  },
  data() {
    return {
      searchKey: undefined,
      currentIndex: 0, //top导航下标
      topBarList: [
        { label: "基础信息", id: 0 },
        { label: "合约api", id: 1 },
        { label: "现货api", id: 2 },
      ],
      sideBarList: [], //侧边栏选项列表
      sideBarCurrentIndex: 0, //侧边栏下标
      apiDocuments: null, //api文档数据
      data: null, // api数据
    };
  },
  methods: {
    //改变top栏
    changeTabBar(id) {
      this.currentIndex = id;
      this.sideBarCurrentIndex = 0;
      let obj = {
        0: "api",
        1: "contract",
        2: "spot",
      };
      this.sideBarList = sideList[obj[id]] && sideList[obj[id]];
      if (this.currentIndex) {
        this.apiDocuments = apiDocument[obj[this.currentIndex]];
      }
      this.changeSideBar(0);
    },
    //改变侧边栏
    changeSideBar(id) {
      this.sideBarCurrentIndex = id;
      if (this.currentIndex) {
        this.data = this.apiDocuments.filter((item) => item.id == id)[0];
      }
    },
    //重定向首页
    toHome() {
      this.$router.push("/");
    },
    clear() {
      this.searchKey = "";
      this.onSearch();
    },
    onSearch: debounce(function () {
      let key = this.searchKey?.trim();
      const obj = {
        0: "api",
        1: "contract",
        2: "spot",
      };
      if (!this.currentIndex) return;

      //筛选列表
      if (!key) {
        this.sideBarList = sideList[obj[this.currentIndex]];
      } else {
        this.sideBarList = sideList[obj[this.currentIndex]].filter((item) => {
          return item.label.includes(key);
        });
      }

      //默认选中第一项
      this.sideBarCurrentIndex = this.sideBarList.length ? 0 : 100;
      //获取第一项的id
      let id = this.sideBarList[0]?.id;
      this.data = this.apiDocuments.filter((item) => item.id == id)[0];
    }),
  },
  mounted() {
    //判断路由信息,执行对应方法
    if (this.$route.query.id) {
      let { type, id } = this.$route.query;

      this.changeTabBar(type);
      this.changeSideBar(id);
    } else {
      this.changeTabBar(0);
    }
  },
};
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
