<template>
  <div class="article-list">
    <s-search @onSearch="onSearch" :placeholder="$t('搜索文章')"></s-search>
    <main>
      <div class="title df aic pr20">
        <img src="@/assets/square-imgs/s-content.png" alt="" />
        <span class="ml10 f18">{{ $t("square.我的最新创作") }}</span>
      </div>
      <div class="tabs pr20">
        <s-tabs :tabsList="tabsList" :active.sync="active">
          <!-- <div class="date">
            <span class="start">{{ startTime }}</span>
            <span class="ml5 mr5">{{ $t("square.至") }}</span>
            <span class="end">{{ endTime }}</span>
          </div> -->
        </s-tabs>
      </div>

      <div
        class="content mt20 pr20"
        v-infinite-scroll="getList"
        :infinite-scroll-disabled="!isLoad"
      >
        <template v-if="active == 1">
          <sEmptyStatus :state="state" v-if="publishList.length == 0" />
          <div class="card" v-for="(item, index) in publishList" :key="index">
            <creator-card
              :info="item"
              :moreList="moreList"
              @onSuccess="
                () => {
                  getPublishData('loading');
                  getRemoveTotalNums();
                }
              "
              noEdit
            ></creator-card>
          </div>
        </template>
        <template v-else>
          <sEmptyStatus :state="state" v-if="removedList.length == 0" />
          <div class="card" v-for="(item, index) in removedList" :key="index">
            <creator-card
              :info="item"
              :moreList="moreList"
              @onSuccess="
                () => {
                  getRemovedData('loading');
                  getPublishTotalNums()
                }
              "
            ></creator-card>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import sSearch from "../../components/s-search.vue";
import sTabs from "../../components/s-tabs.vue";
import creatorCard from "./creator-card.vue";
import sEmptyStatus from "../../components/s-empty-status.vue";

import * as api from "@/api/square";
import { parseTime } from "@/libs/utils";

export default {
  components: {
    sSearch,
    sTabs,
    creatorCard,
    sEmptyStatus,
  },
  data() {
    return {
      tabsList: [
        {
          label: this.$t("square.已发布(0)", [0]),
          id: 1,
        },
        {
          label: this.$t("square.已下架(0)", [0]),
          id: 2,
        },
      ],
      active: 1,
      keyword: "",
      moreList: [],
      params: {
        pageNum: 1,
        pageSize: 10,
        // isRepost: 0, //0 原创 1 转发
      },
      publishList: [],
      removedList: [],
      date: {},
      state: "",
      isLoad: true,
      keyMap: {},
    };
  },
  methods: {
    onSearch(keyword) {
      this.keyword = keyword;
      if (this.active == 1) {
        this.getPublishData("loading");
      } else {
        this.getRemovedData("loading");
      }
      this.getPublishTotalNums()
      this.getRemoveTotalNums();
    },
    getList() {
      if (this.active == 1) {
        this.getPublishData();
      } else {
        this.getRemovedData();
      }
    },
    // 个人发布数据
    getPublishData(loading) {
      this.state = "";

      if (loading == "loading") {
        this.publishList = [];
        this.params.pageNum = 1;
      }

      const params = {
        ...this.params,
        status: 2, // 2 已发布 3 已下架
        // startTime: this.date.startTime * 1000,
        // endTime: this.date.endTime * 1000,
      };
      this.keyword ? (params.keyword = this.keyword) : "";

      const key = `_${this.params.pageNum}`;
      const value = this.keyMap[key];
      if (value) return;
      this.keyMap[key] = "temp";

      api
        .$getMyContentList(params)
        .then((res) => {
          this.state = "success";

          this.publishList = [...this.publishList, ...res.data.data.records];
          this.params.pageNum++;
          this.isLoad =
            this.publishList.length == res.data.data.total ? false : true;

          this.tabsList[0].label = this.$t("square.已发布(0)", [
            res.data.data.total,
          ]);
          console.log("已发布", this.publishList);
        })
        .catch((err) => {
          this.state = "error";
          this.isLoad = false;
        })
        .finally(() => {
          this.keyMap = {};
        });
    },
    getRemovedData(loading) {
      this.state = "";
      if (loading == "loading") {
        this.removedList = [];
        this.params.pageNum = 1;
      }

      const params = {
        ...this.params,
        status: 3, // 2 已发布 3 已下架
        // startTime: this.date.startTime * 1000,
        // endTime: this.date.endTime * 1000,
      };

      this.keyword ? (params.keyword = this.keyword) : "";

      const key = `_${this.params.pageNum}`;
      const value = this.keyMap[key];
      if (value) return;
      this.keyMap[key] = "temp";

      api
        .$getMyContentList(params)
        .then((res) => {
          this.state = "success";
          this.removedList = [...this.removedList, ...res.data.data.records];
          this.params.pageNum++;
          this.isLoad =
            this.removedList.length == res.data.data.total ? false : true;

          this.tabsList[1].label = this.$t("square.已下架(0)", [
            res.data.data.total,
          ]);
          console.log("已下架", this.removedList);
        })
        .catch((err) => {
          this.state = "error";
          this.isLoad = false;
        })
        .finally(() => {
          this.keyMap = {};
        });
    },
    getRemoveTotalNums() {
      const params = {
        pageNum: 1,
        pageSize: 10,
        status: 3, // 2 已发布 3 已下架
      };
      this.keyword ? (params.keyword = this.keyword) : "";
      api.$getMyContentList(params).then((res) => {
        this.tabsList[1].label = this.$t("square.已下架(0)", [
          res.data.data.total,
        ]);
      });
    },
    getPublishTotalNums() {
      const params = {
        pageNum: 1,
        pageSize: 10,
        status: 2, // 2 已发布 3 已下架
      };
      this.keyword ? (params.keyword = this.keyword) : "";
      api.$getMyContentList(params).then((res) => {
        this.tabsList[0].label = this.$t("square.已发布(0)", [
          res.data.data.total,
        ]);
      });
    },
  },
  computed: {
    startTime() {
      return parseTime(this.date.startTime, "{y}-{m}-{d}");
    },
    endTime() {
      return parseTime(this.date.endTime, "{y}-{m}-{d}");
    },
  },
  watch: {
    active: {
      handler(newValue) {
        const arr = [
          {
            label: this.$t("square.下架"),
            icon: "icon-s-remove",
            value: "remove",
            id: 0,
          },
          {
            label: this.$t("square.删除"),
            icon: "icon-s-delete",
            value: "delete",
            id: 1,
          },
        ];

        this.params.pageNum = 1;
        this.publishList = [];
        this.removedList = [];
        this.isLoad = true;
        this.getList();

        setTimeout(() => {
          const arr = [
            {
              label: this.$t("square.删除"),
              icon: "icon-s-delete",
              value: "delete",
              id: 1,
            },
          ];
          if (newValue == 1) {
            const o = {
              label: this.$t("square.下架"),
              icon: "icon-s-remove",
              value: "remove",
              id: 0,
            };
            arr.unshift(o);
          } else {
            const o = {
              label: this.$t("square.上架"),
              icon: "icon-s-remove",
              value: "add",
              id: 0,
            };
            arr.unshift(o);
          }
          this.moreList = arr;
        }, 0);
      },
      immediate: true,
    },
  },
  mounted() {
  // this.getPublishTotalNums();
    this.getRemoveTotalNums();
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 15px;
  padding: 20px;
  padding-right: 0;
  height: 900px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e9edf2;
  .title {
    font-size: 18px;
    color: #333;
    margin-bottom: 15px;
  }
  .date {
    font-size: 12px;
    color: #8992a6;
    padding: 7px 15px;
    background: #f5f7fa;
    border-radius: 4px;
  }
  .content {
    height: 780px;
    overflow-y: auto;
  }
}
</style>
