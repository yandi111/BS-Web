<template>
  <div class="box pt70">
    <h3 class="box-title">{{ $t(t + "常见问题") }}</h3>
    <div class="q-item">
      <div
        class="q-text"
        v-for="(item, index) in questionList"
        :key="index"
        @click="toQuestionDetail(item)"
      >
        <span>{{ item.title }}</span>
      </div>
    </div>
    <div class="line green flexs">
      <span @click="toHelp">
        {{ $t(t + "查看更多") }} <i class="ml12 el-icon-right"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { helpSortListApi } from "@/api/user.js";
export default {
  name: "OtcQuestion",
  data() {
    return {
      questionList: [],
      t: "c2c.",
    };
  },
  mounted() {
    this.getQuestion();
  },
  methods: {
    //常见问题
    getQuestion() {
      helpSortListApi({ id: 138 }).then((res) => {
        this.questionList = res.data.data || [];
      });
    },
    toQuestionDetail(item) {
      this.$router.push({
        path: "/helpDetail",
        query: {
          id: item.helpId,
          title: item.title,
        },
      });
    },
    toHelp() {
      this.$router.push("/helpCenterPage");
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  color: #333333;

  &-title {
    font-size: 45px;
    margin-bottom: 40px;
  }

  .q-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .q-text {
      width: 45%;
      font-size: 20px;
      margin-bottom: 20px;
      span {
        cursor: pointer;
        &:hover {
          color: #90ff00;
        }
      }
    }
  }

  .line {
    font-size: 20px;

    span {
      cursor: pointer;
      color: #90ff00;
    }
  }
}
</style>