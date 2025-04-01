<template>
  <div class="creator-data">
    <div class="top df aic jb">
      <div class="left">
        <div class="title">
          <img src="@/assets/square-imgs/s-data.png" alt="" />
          <span>{{ $t("square.数据表现") }}</span>
        </div>
        <p class="tip">{{ $t("square.以下数据为非实时更新") }}</p>
      </div>
      <div class="right">
        <my-select v-model="date" :options="dateList" :width="50"></my-select>
      </div>
    </div>
    <div class="date df aic">
      <i class="iconfont icon-riqi mr10"></i>
      <span
        >{{ $t("square.截止") }}：{{ parseTime(statisticalData.endTime) }}</span
      >
    </div>
    <div class="box df aic jb">
      <div class="cell" v-for="(item, index) in list" :key="index">
        <div class="top">
          <span>{{ item.type | translate }}</span>
          <el-tooltip placement="top" popper-class="my-tooltip">
            <div slot="content">
              <div class="contentBox">
                <p class="text">{{ item.tip | translate }}</p>
              </div>
            </div>
            <i class="iconfont icon-warning1"></i>
          </el-tooltip>
        </div>
        <p class="nums">{{ item.nums }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import mySelect from "@/components/my-select/my-select.vue";

import { parseTime } from "@/libs/utils";

export default {
  components: {
    mySelect,
  },
  props: {
    statisticalData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dateList: [
        { label: "square.全部", value: "all" },
        { label: "square.今日", value: "today" },
        { label: "square.7日", value: "week" },
        { label: "square.30日", value: "month" },
      ],
      date: "week",
      list: [
        {
          type: "square.已发布",
          value: "contentCount",
          tip: "square.您在指定时间段内发布的内容总量",
          nums: 0,
        },
        {
          type: "square.粉丝数",
          value: "fansCount",
          tip: "square.您在指定时间段内获得的粉丝量",
          nums: 0,
        },
        {
          type: "square.浏览量",
          value: "viewCount",
          tip: "square.在指定时间段内所有发布的内容浏览次数",
          nums: 0,
        },
        {
          type: "square.点赞量",
          value: "likeCount",
          tip: "square.在指定时间段内所有发布的点赞次数",
          nums: 0,
        },
        {
          type: "square.分享量",
          value: "repostCount",
          tip: "square.在指定时间段内所有发布的分享次数",
          nums: 0,
        },
      ],
    };
  },
  watch: {
    date: {
      handler(newValue) {
        this.$emit("onDate", newValue);
      },
      immediate: true,
    },
    statisticalData: {
      handler(newValue) {
        this.list.forEach((item) => {
          for (const key in this.statisticalData) {
            if (
              this.statisticalData.hasOwnProperty.call(
                this.statisticalData,
                key
              )
            ) {
              const element = this.statisticalData[key];
              if (key == item.value) {
                item.nums = element;
              }
            }
          }
        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.creator-data {
  margin-top: 20px;
  padding: 20px;
  min-height: 240px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e9edf2;
  .top {
    .left {
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 26px;
        }
        span {
          font-size: 18px;
          color: #333;
          margin-left: 10px;
        }
      }
      p {
        font-size: 12px;
        color: #8992a6;
        margin-top: 10px;
      }
    }
    .right {
      ::v-deep .selectBox {
        .select {
          border: 1px solid #e9edf2;
        }
        input {
          background: #ffffff !important;
          color: #333 !important;
        }
        i {
          color: #8992a6;
          font-size: 20px;
          &:before {
            font-family: "iconfont";
            content: "\e606";
          }
        }
        .listbox {
          background: #ffffff !important;
          box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.04);
          .cell {
            color: #333;
            &:hover {
              background-color: #f5f7fa;
            }
            &.active {
              color: var(--theme-color);
            }
          }
        }
      }
    }
  }
  .date {
    font-size: 12px;
    color: #333;
    margin-top: 25px;
  }
  .box {
    margin-top: 23px;
    .cell {
      flex: 1;
      height: 80px;
      padding: 15px;
      margin-left: 19px;
      background: #f5f7fa;
      border-radius: 6px;
      &:first-child {
        margin-left: 0px;
      }
      .top {
        display: flex;
        align-items: center;
        color: #333;
        span {
          font-size: 12px;
        }
        i {
          color: #b1b9cb;
          cursor: pointer;
        }
      }
      .nums {
        margin-top: 10px;
        font-size: 20px;
      }
    }
  }
}
</style>
