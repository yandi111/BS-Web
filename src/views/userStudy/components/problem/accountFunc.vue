<!-- 新手常见问题 -->
<template>
  <div class="account-func">
    <div class="account-container" v-for="(item, index) in list" :key="index">
      <div class="text">
        <div class="dot"></div>
        <span>{{ item.nameLanguage }}</span>
      </div>
      <ul v-for="(ele, eIndex) in item.children" :key="eIndex">
        <li>
          <!-- <el-link href="https://element.eleme.io" :underline="false" target="_blank">{{ ele.name }}</el-link> -->
          <span class="link" @click="onFunction(ele)">{{ ele.title }}</span>
        </li>
      </ul>
      <i class="el-icon-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountFunc",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onFunction(ele) {
      this.$router.push({
        path: "/postDetail",
        query: {
          type: 3,
          id: ele.helpId,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.account-func {
  width: 100%;
  height: calc(100% - (39px + 60px));
  display: flex;
  justify-content: space-between;
  padding-top: 39px;
  .account-container {
    width: 100%;
    height: 100%;
    // display: flex;
    // justify-content: space-between;
    // flex-direction: column;
    width: 220px;
    .text {
      display: flex;
      align-items: center;
      position: relative;
      font-size: 20px;
      font-family: PingFang SC;
      height: 26px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 20px;
      .dot{
        width: 6px;
        height: 70%;
        margin-right: 10px;
        background-color: var(--theme-color);
        border-radius: 1px;
      }
    }
    ul {
      > li {
        .link {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 28px;
          color: #666666;
          cursor: pointer;
          &:hover {
            color: var(--theme-color);
            border-bottom: var(--theme-color);
          }
        }
      }
    }
    .el-icon-right {
      margin-top: 27px;
      font-size: 24px;
      color: var(--theme-color);
      cursor: pointer;
    }
  }
}
</style>
