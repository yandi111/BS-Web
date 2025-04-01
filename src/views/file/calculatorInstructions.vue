<template>
  <div class="calculatorInstructions">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <span>计算器说明</span>
    </div>
    <div id="content">
      <div class="title">如何使用BSEX合约计算器</div>
      <div class="tip mb15">
        在发布任何订单前，您都可以使用BSEX合约计算器计算起始保证金、收益(PnL)、回报率(ROE)、目标价格、强平价格等。
      </div>
      <div class="list">
        <div class="item" v-for="item in textArr" :key="item.id">
          <div class="textTitle mb10">{{ item.textTitle }}</div>
          <div class="mb20">
            <img
              class="img"
              :src="require('../../assets/calculator-imgs/' + item.pic)"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { textArr } from "./calculatorInstructions.js";
export default {
  name: "calculatorInstructions",
  data() {
    return {
      textArr: textArr,
    };
  },
};
</script>

<style lang="scss" scoped>
.calculatorInstructions {
  padding: 30px 210px;
  .title {
    display: flex;
    align-items: center;
    i {
      font-size: 30px;
      margin-top: 3px;
      cursor: pointer;
    }
    span {
      font-size: 24px;
    }
  }
  #content {
    margin-top: 30px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .list {
      .item {
        margin-bottom: 15px;
        .img {
          // border-radius: 15px;
          overflow: hidden;
          width: 590px;
        }
        &:first-child {
          .img {
            width: 320px;
          }
        }
      }
    }
  }
}
</style>
