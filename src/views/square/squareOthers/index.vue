<template>
  <div class="infomation-other">
    <template v-if="!$route.query.hasOwnProperty('search')">
      <sUserCard :info="info">
        <div class="btns df aic">
          <sButton
            class="mr5"
            @click="onChangeState"
            :focus="info.followStatus"
            >{{
              info.followStatus ? $t("square.已关注") : $t("square.关注")
            }}</sButton
          >
          <s-setting
            icon="icon-s-more"
            :action-list="actionList"
            @onAction="onAction('user')"
          />
        </div>
      </sUserCard>
      <div class="tab">
        <s-tabs :tabsList="tabsArr" :active.sync="activeId" isBg></s-tabs>
        <div class="search">
          <el-input
            :placeholder="$t('square.搜索文章')"
            v-model="searchVal"
            @keyup.enter.native="onSearch"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <div
        class="content"
        v-infinite-scroll="getList"
        :infinite-scroll-disabled="!isLoad"
      >
        <sEmptyStatus :state="state" v-if="!list.length" />
        <div class="cell" v-for="(item, index) in list" :key="index">
          <s-info-card
            :info="item"
            detail
            setting
            forward
            other
            @onAction="onAction('content', $event)"
          >
            <template #header>
              <div></div>
            </template>
            <template #content>
              <div class="container">
                <div
                  class="textbox pointer"
                  @click="
                    $router.push({
                      path: '/square/detail',
                      query: { id: item.id },
                    })
                  "
                >
                  <p class="name">{{ item.title }}</p>
                  <div class="text">{{ item.content }}</div>
                </div>
                <div class="imgsBox mt10" v-if="item.urls">
                  <s-imags :urls="item.urls" />
                </div>
                <div class="orinal mt10" v-if="item.originalContent">
                  <detailForward :info="item.originalContent" />
                </div>
              </div>
            </template>
          </s-info-card>
        </div>
      </div>
      <el-backtop
        target=".infomation-other .content"
        ref="backtop"
      ></el-backtop>
      <reportForm :is-show.sync="report_isShow" :reportInfo="reportInfo" />
    </template>
    <template v-else>
      <search-list></search-list>
    </template>
  </div>
</template>

<script>
import sButton from "../components/s-button";
import sSetting from "../components/s-setting";
import sUserCard from "../components/s-user-card";
import reportForm from "../squareDetail/components/report-form";
import sTabs from "../components/s-tabs.vue";

import searchList from "../components/s-search-list.vue";
import sEmptyStatus from "../components/s-empty-status.vue";
import sInfoCard from "../components/s-info-card.vue";
import detailForward from "../squareDetail/components/detail-forward.vue";
import sImags from "../components/s-imgs.vue";

import * as api from "@/api/square";
import { mapGetters } from "vuex";
export default {
  components: {
    sButton,
    sSetting,
    sUserCard,
    reportForm,
    sTabs,
    searchList,
    sEmptyStatus,
    sInfoCard,
    detailForward,
    sImags,
  },
  data() {
    return {
      activeId: 1,
      tabsArr: [
        {
          id: 1,
          label: this.$t("square.全部内容"),
        },
      ],
      searchVal: "",
      uid: "",
      info: {},
      actionList: [
        {
          label: this.$t("square.举报"),
          value: "report",
          icon: "icon-s-report",
        },
      ],
      report_isShow: false,
      reportInfo: {},
      listParams: {
        pageNum: 1,
        pageSize: 5,
        sortType: 1,
        type: 2,
        uid: undefined,
        // isRepost: null,
      },
      list: [],
      state: "",
      isLoad: true,
      keyMap: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    getAuthorDetail(uid) {
      api.$viewAuthorDetail({ uid }).then((res) => {
        this.info = res.data.data;
      });
    },
    onChangeState() {
      const params = {
        uid: this.info.uid,
        follow: !this.info.followStatus,
      };
      api.$onFollowOperations(params).then((res) => {
        if (res.data.success) {
          this.getAuthorDetail(this.info.uid);
        }
      });
    },
    onAction(type, val) {
      this.report_isShow = true;
      this.reportInfo = {
        reportUid: this.userInfo.uid,
      };
      const params =
        type == "user"
          ? { reportedId: this.info.uid, repost: 2 }
          : { reportedId: val.reportedId, repost: val.repost };
      this.reportInfo = { ...this.reportInfo, ...params };
    },
    getList() {
      this.listParams.uid = this.$route.query.uid * 1;
      const params = { ...this.listParams };
      console.log("params", params);

      const key = `_${this.listParams.pageNum}`;
      const value = this.keyMap[key];
      if (value) return;
      this.keyMap[key] = "temp";

      api
        .$getArticleList(params)
        .then((res) => {
          this.state = "success";
          this.list = [...this.list, ...res.data.data.records];
          this.listParams.pageNum++;
          this.isLoad = this.list.length == res.data.data.total ? false : true;
          console.log("this.list", this.list);
        })
        .catch(() => {
          this.state = "error";
          this.isLoad = false;
        });
    },
    onSearch() {
      console.log("this.uid", this.listParams);
      this.$router.push({
        url: "/square/infomation-others",
        query: {
          uid: this.listParams.uid,
          search: this.searchVal,
        },
      });
    },
  },
  mounted() {
    this.getAuthorDetail(this.$route.query.uid);
    // this.getList();
  },
};
</script>

<style lang="scss" scoped>
.infomation-other {
  position: relative;
  .tab {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search {
      width: 160px;
      ::v-deep .el-input__inner {
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #e9edf2;
        font-size: 14px;
        color: #8992a6;
      }
    }
  }
  .el-backtop {
    position: absolute;
    bottom: 120px !important;
  }
  .btns {
    min-width: 60px;
    ::v-deep .s-setting {
      .setting-icon {
        font-size: 22px;
      }
    }
  }
  .content {
    margin-top: 20px;
    height: 698px;
    border-radius: 8px;
    overflow-y: auto;
    background-color: #fff;
    .cell {
      padding-bottom: 15px;
      background-color: #f5f7fa;
      &:last-child {
        padding-bottom: 0;
      }
      .container {
        font-size: 14px;
        .textbox {
          color: #333;
          font-size: 14px;
          .name {
            font-size: 16px;
          }
          .text {
            word-break: break-all;
          }
        }
        .imgsBox {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
        }
        .orinal {
          width: 100%;
        }
      }
    }
  }
}
</style>
