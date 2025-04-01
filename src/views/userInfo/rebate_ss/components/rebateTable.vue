<template>
  <div class="page">
    <div class="header">
      <div class="h-item0"></div>
      <div class="h-item">{{ $t("userInfo.用户UID") }}</div>
      <div class="h-item">{{ $t("userInfo.注册时间") }}</div>
    </div>
    <div class="box" ref="container" @scroll="handleScroll">
      <div class="table" v-for="(item, index) in inviteList" :key="index">
        <div class="t-item0"></div>
        <div class="t-item">{{ item.uid }}</div>
        <div class="t-item">{{ item.createTime }}</div>
      </div>
      <my-empty v-if="!inviteList.length"></my-empty>
    </div>
  </div>
</template>

<script>
import { myInviteListApi } from "@/api/user";
export default {
  name: "RebateTable",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      records: [],
      pageParams: {
        page: 1,
        size: 10,
      },
      inviteList: [],
    };
  },
  mounted() {
    this.loadMore();
  },
  methods: {
    handleScroll() {
      const container = this.$refs.container;
      const scrollHeight = container.scrollHeight;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        if (this.records.length) {
          this.pageParams.page++;
          this.loadMore();
        }
      }
    },
    loadMore() {
      myInviteListApi(this.pageParams).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.inviteList = this.inviteList.concat(res.data.data.records);
            this.records = res.data.data.records;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  .header {
    display: flex;
    align-items: center;
    height: 60px;
    background: #f4f5f7;
    border-radius: 25px 25px 0px 0px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #727c8b;
    .h-item0 {
      width: 30%;
    }
    .h-item {
      width: 35%;
    }
  }
  .box {
    background: #fff;
    border-radius: 0px 0px 25px 25px;
    height: 500px;
    overflow-y: scroll;
    .table {
      display: flex;
      align-items: center;
      height: 60px;

      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #727c8b;
      &:hover {
        background: #f5f7fa;
      }
      .t-item0 {
        width: 30%;
      }
      .t-item {
        width: 35%;
      }
    }
  }
}
</style>