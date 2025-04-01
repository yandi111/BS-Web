<!-- 入门须知 -->
<template>
  <div class="getting-started">
    <h2 class="video-study">{{ $t(t+'点击查看视频操作教程') }}</h2>
    <div class="video-item">
      <div class="item-content">
        <div class="img-container">
          <img src="@/assets/video-img/video1.png" alt="">
        </div>
        <p>{{ $t(t+'如何成为OTC商家') }}</p>
      </div>

      <div class="item-content">
        <div class="img-container">
          <img src="@/assets/video-img/video2.png" alt="">
        </div>
        <p>{{ $t(t+'如何在OTC发布委托订单') }}</p>
      </div>
    </div>
    <otc-question></otc-question>
    <!-- <h2>{{ $t(t+'常见问题') }}</h2>
    <div class="guide-item">
      <div class="item">{{ $t(t+'如何在C2C交易市场发布委托单') }}</div>
      <div class="item">{{ $t(t+'关于自选区委托单须知') }}</div>
    </div>
    <span class="more">{{ $t(t+'查看更多') }}<i class="el-icon-arrow-right"></i></span> -->
  </div>
</template>

<script>
import OtcQuestion from '../../components/question/question.vue';
export default {
  name: 'GettingStarted',
  components: {
    OtcQuestion
  },
  data () {
    return {
        // 国际缩写
          t: 'c2c.',
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.getting-started {
  h2 {
    height: 100px;
    line-height: 100px;
    font-size: 28px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
  }
  .video-study {
    margin-bottom: 20px;
  }
  .guide-item {
    display: flex;
    justify-content: flex-start;
    padding-bottom: 20px;
    .item {
      margin-right: 300px;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
  }
  .item-border {
    border-bottom: 1px solid #EEEEEE;
  }
  .more {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #90ff00;
    height: 45px;
    line-height: 45px;
    .el-icon-arrow-right {
      margin-left: 10px;
      font-size: 22px;
      vertical-align: middle;
    }
  }

  .video-item {
    display: flex;
    justify-content: flex-start;
    .item-content {
      margin-right: 36px;
      .img-container {
        margin-bottom: 20px;
				img{
					width: 500px;
					height: 280px;
				}
      }
      p {
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
      }
    }
  }
}
</style>