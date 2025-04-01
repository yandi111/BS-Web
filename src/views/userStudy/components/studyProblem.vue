<!-- 新手常见问题 -->
<template>
  <div class="study-problem">
    <span class="title">新手常见问题</span>
    <ul class="left-panel">
      <li
        v-for="(item, index) in navList"
        :key="index"
        :class="{ 'item-active': index === activeIndex }"
        @click="handleNav(index, item.id)"
      >
        <span>{{ item.nameLanguage }}</span>
      </li>
    </ul>
    <!-- 账号功能 -->
    <account-func :list.sync="secondList"></account-func>
  </div>
</template>

<script>
import AccountFunc from "./problem/accountFunc.vue";

import {
  helpTabList,
  helpSecondList,
  $getHelpSort,
  helpSortListApi,
} from "@/api/user.js";
export default {
  name: "StudyProblem",
  components: {
    AccountFunc,
  },
  data() {
    return {
      activeIndex: 0,
      navList: [],
      secondList: [],
      init: true,
    };
  },
  methods: {
    // 导航事件
    handleNav(index, id) {
      this.activeIndex = index;
      this.secondList = this.navList.filter((item) => {
        return item.id == id;
      })[0].children;
      this.secondList.forEach((item) => {
        let res = this.getArticleTitle(item.id);
        res.then((result) => {
          if (item.id == result[0].id) {
            item.children = result;
          }
        });
      });
    },

    getTitleTypeList() {
      const params = {
        id: 139,
        type: 1,
      };
      $getHelpSort(params).then((res) => {
        console.log("新手教程", res.data.data);
        this.navList = res.data.data;
        if (this.init) {
          this.handleNav(0, this.navList[0].id);
          this.init = false;
        }
      });
    },
    getArticleTitle(id) {
      const params = {
        id: id,
        type: 1,
      };
      return new Promise((resolve, reject) => {
        helpSortListApi(params)
          .then((res) => {
            resolve(res.data.data);
          })
          .catch((erro) => {
            reject(erro);
          });
      });
      // helpSortListApi(params).then((res) => {
      //   this.secondList.forEach((item) => {
      //     console.log("item", item);
      //     if (item.id == res.data.data[0].id) {
      //       item.children = res.data.data;
      //     }
      //   });
      //   console.log("this.", this.secondList);
      // });
    },
  },
  mounted() {
    this.getTitleTypeList();
  },
};
</script>
<style lang="scss" scoped>
.study-problem {
  width: 100%;
  height: 434px;
  background-color: #ffffff;
  padding: 80px 210px 30px 210px;
  .title {
    font-size: 40px;
    font-weight: 600;
    color: #333333;
  }
  .left-panel {
    margin-top: 30px;
    width: 100%;
    > li {
      margin-right: 40px;
      height: 40px;
      line-height: 40px;
      color: #96a2b2;
      cursor: pointer;
    }
    .item-active {
      > span {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #333333;
        position: relative;
        &::before {
          position: absolute;
          content: "";
          width: 90%;
          height: 2px;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          background-color: var(--theme-color);
          border-radius: 1;
        }
      }
    }
  }
  .left-panel {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
