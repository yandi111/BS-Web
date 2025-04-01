<template>
  <div class="guide">
    <div class="header">
      <div class="breadCrumb">
        <div>{{ $t("userInfo.帮助中心") }}</div>
      </div>
      <div class="header-right">
        <div class="input">
          <el-input
            v-model="searchVal"
            :placeholder="$t('userInfo.搜索帮助文章')"
          ></el-input>
          <div class="search" @click="handleSearch">
            {{ $t("userInfo.搜索") }}
          </div>
        </div>
      </div>
    </div>
    <main>
      <div class="slider">
        <div class="cell" v-for="items in slider" :key="items.id">
          <div
            class="title-cell"
            :class="{ active: currentIndexTitle == items.id }"
            @click="toggleExpand(items)"
          >
            <div class="left">
              <!-- <img
                :src="require('@/assets/helpCenter-imgs/' + items.icon)"
                alt=""
              /> -->
              <img :src="items.icon" alt="" />
              <span class="label">{{ items.label }}</span>
            </div>
            <i
              class="iconfont"
              :class="items.expand ? 'icon-up' : 'icon-down'"
            ></i>
          </div>
          <div class="list-cell" v-show="items.expand">
            <div
              class="li"
              :class="{ active: item.active }"
              v-for="item in items.lis"
              :key="item.id"
              @click="chooseItem(items, item)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="breadCrumb">
          <div
            class="li"
            v-for="item in breadCrumbList"
            :key="item.id"
            :class="{ active: item.active }"
            @click="changeBreadCrumb(item)"
          >
            <span class="label">{{ item.label }}</span>
            <i class="iconfont icon-right1" v-if="item.icon"></i>
          </div>
        </div>
        <div class="box">
          <div class="title">{{ cententList[0]?.name }}</div>
          <ul>
            <li
              v-for="(item, index) in cententList"
              :key="index"
              @click="toDetail(item)"
            >
              <div class="dot"></div>
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// import slider from "./js/slider";
import { $getHelpSort, helpSortListApi } from "@/api/user";
export default {
  data() {
    return {
      searchVal: "",
      slider: [],
      currentIndexTitle: 0,
      breadCrumbList: [
        {
          active: false,
          label: "帮助中心",
          icon: true,
          id: 100,
        },
      ], //面包屑
      currentCentent: {}, //当前内容
      cententList: [],
    };
  },
  methods: {
    // 搜索
    handleSearch() {
      this.$router.push({
        path: "/helpSearch",
        query: {
          val: this.searchVal,
        },
      });
    },
    toggleExpand(val) {
      this.slider.forEach((item) => {
        if (item.id == val.id) {
          item.expand = !item.expand;
          this.currentIndexTitle = val.id;
        }
      });
    },
    changeBreadCrumb(val) {
      if (val.id == 100) {
        this.$router.push("/helpCenterPage");
      }
    },
    chooseItem(ul, li) {
      let currentCentent = null;
      this.breadCrumbList.splice(1, 1);
      //选中高亮
      this.slider.forEach((items) => {
        if (items.id == ul.id) {
          currentCentent = items.lis.filter((ele) => ele.id == li.id)[0]; //选中的二级标题
          items.lis.forEach((item) => {
            item.active = item.id == li.id ? true : false;
          });
        } else {
          items.lis.forEach((item) => {
            item.active = false;
          });
        }
      });
      this.getArticleTitle(currentCentent.id);
      this.breadCrumbList.push(currentCentent); //面包屑
    },

    //获取全部标题
    getTitleTypeList() {
      let params = {
        id: 92,
        type: 1,
      };
      $getHelpSort(params).then((res) => {
        let list = res.data.data;
        this.slider = list.map((item, index) => {
          return {
            id: index,
            label: item.nameLanguage,
            type: item.id,
            icon: item.image,
            lis: item.children.map((ele) => {
              return {
                id: ele.id,
                label: ele.nameLanguage,
                active: false,
              };
            }),
            expand: false,
          };
        });
        console.log("this.slider", this.slider);
        this.handleParams();
      });
    },
    //获取文章标题
    getArticleTitle(id) {
      const params = {
        id: id,
        type: 1,
      };
      console.log("params", params);

      helpSortListApi(params).then((res) => {
        console.log("res.data", res.data);
        this.cententList = res.data.data;
        console.log("this.cu", this.cententList);
      });
    },

    //处理slider参数
    handleParams() {
      let { id, type } = this.$route.query;
      let res = null;

      this.slider.forEach((item) => {
        if (item.type == type) {
          this.currentIndexTitle = item.id; //当前一级标题
          res = item.lis.filter((ele) => ele.id == id)[0]; //选中的二级标题

          item.expand = true;
          item.lis.forEach((ele) => {
            ele.active = ele.id == id ? true : false;
          });
        } else {
          item.expand = false;
          item.lis.forEach((ele) => {
            ele.active = false;
          });
        }
      });
      // this.currentCentent = res;
      this.breadCrumbList.push(res); //面包屑

      this.getArticleTitle(id);
    },

    toDetail(val) {
      console.log("val", val);
      let query = {
        id: val.helpId,
        title: val.title,
      };
      this.$router.push({
        path: "/helpDetail",
        query,
      });
    },
  },
  mounted() {
    this.getTitleTypeList();
  },
};
</script>

<style lang="scss" scoped>
@use "./scss/guide.scss";
</style>
