<template>
  <div class="subsidyCard" v-if="subsidyInfo != null">
    <div class="s-card">
      <div class="s-item">
        <div v-show="subsidyInfo?.poolStatus == 1">
          {{ subsidyAmount }} <span class="s-unit">USDT</span>
        </div>
        <div v-show="subsidyInfo?.poolStatus == 0">
          <img src="@/assets/contract-imgs/c-nodata.png" alt="" />
        </div>
        <div class="s-mid">
          {{ $t("contract.盈利奖励池") }}
          <el-popover placement="top" trigger="hover">
            <div class="s-pop">
              {{ $t("contract.当奖励池额度为0后无法享受盈利奖励") }}
            </div>
            <i slot="reference" class="el-icon-warning-outline"></i>
          </el-popover>
          <i class="el-icon-question" @click="showModal(1)"></i>
        </div>
        <div v-show="subsidyInfo?.poolStatus == 1">
          <!-- {{ $t("contract.仓位盈利最高可获手续费")
          }}<span>{{ subsidyInfo?.poolRatioMax | ratio }}</span> -->
          {{$t("contract.仓位已实现收益率")}}<span>{{
            subsidyInfo?.poolProfitRatio | ratio
          }}</span>
          {{$t("contract.最高可获得手续费奖励")}}<span>{{
            subsidyInfo?.poolRatioMax | ratio
          }}</span>
        </div>
        <div v-show="subsidyInfo?.poolStatus == 0">
          {{ $t("contract.暂无奖励") }}
        </div>
        <div class="s-more" @click="subsidyMore">
          {{$t("contract.查看更多收益")}}<i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="s-item s-bg">
        <div v-show="subsidyInfo?.handingFeeStatus == 1">
          {{ subsidyInfo?.handingFeeRatio | ratio }}
        </div>
        <div v-show="subsidyInfo?.handingFeeStatus == 0">
          <img src="@/assets/contract-imgs/c-nodata.png" alt="" />
        </div>
        <div class="s-mid">
          {{ $t("contract.交易奖励") }}
          <i class="el-icon-question" @click="showModal(2)"></i>
        </div>
        <div v-show="subsidyInfo?.handingFeeStatus == 1">
          <!-- {{ $t("contract.奖励")
          }}<span>{{ subsidyInfo?.handingFeeRatio | ratio }}</span>
          {{ $t("contract.手续费") }} -->
          <div>{{ $t("contract.交易即奖励") }}</div>
          <div>
            {{ $t("contract.交易手续费") }}
            <span>{{ subsidyInfo?.handingFeeRatio | ratio }}</span>
          </div>
        </div>
        <div v-show="subsidyInfo?.handingFeeStatus == 0">
          {{ $t("contract.暂无奖励") }}
        </div>
      </div>
    </div>
    <div class="s-time">
      <!-- <div class="s-share" @click="rewardSharing">
        <i class="el-icon-share"></i>
        <span>点击分享奖励</span>
      </div> -->
      <div class="t-text">
        <!-- <i class="el-icon-alarm-clock"></i>
        <span v-html="countTxt"></span> -->
      </div>
      <div>
        <!-- <i class="el-icon-question" @click="showModal"></i> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "subsidyCard",
  props: {
    subsidyInfo: {
      type: Object,
      default: () => {},
    },
    countTxt: {
      type: String,
      default: "",
    },
    subsidyAmount: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    showModal(i) {
      this.$emit("show", i);
    },
    // rewardSharing(){
    //    this.$emit('rewardSharing')
    // }
    subsidyMore(){
      this.$emit('more')
    }
  },
  filters: {
    ratio(num) {
      return num + "%";
      // return (num * 100) + '%'
    },
  },
};
</script>

<style lang="scss" scoped>
.subsidyCard {
  padding: 15px;
  .s-card {
    display: flex;
    justify-content: space-between;
    .s-item {
      width: 47%;
      background: linear-gradient(
        135deg,
        rgba(252, 222, 222, 1) 0%,
        rgba(255, 242, 212, 1) 100%
      );
      border-radius: 10px;
      font-size: 14px;
      text-align: center;
      padding: 10px;
      .s-unit {
        color: #333;
      }
      .s-mid {
        padding: 10px 0px;
        .el-icon-warning-outline {
          padding-left: 10px;
          font-size: 16px;
          color: #333;
        }
      }
      span {
        color: #90ff00;
      }
    }
    .s-bg {
      background: linear-gradient(
        135deg,
        rgba(255, 246, 204, 1) 0.77%,
        rgba(184, 255, 231, 1) 100%
      );
    }
  }
  .s-more {
    margin-top: 5px;
    color: #90ff00;
    .el-icon-arrow-right{
      padding-left: 2px;
    }
    cursor: pointer;
  }
  .s-time {
    // margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    .t-text {
      color: #90ff00;
      .el-icon-alarm-clock {
        padding-right: 10px;
        font-size: 16px;
      }
    }
    .el-icon-question {
      font-size: 18px;
      cursor: pointer;
      padding-left: 5px;
    }
    .s-share {
      cursor: pointer;
      .el-icon-share {
        padding-right: 10px;
      }
    }
  }
}
.s-pop {
  padding: 15px;
}
.el-icon-question {
  font-size: 16px;
  cursor: pointer;
  padding-left: 5px;
}
</style>