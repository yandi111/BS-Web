<!-- 入门须知 -->
<template>
  <div class="getting-started">
    <h2> {{ $t(t+'开启C2C之旅') }}</h2>
    <div class="guide-item item-border">
      <div class="item">{{ $t(t+'C2C') }}<span class="green">{{ $t(t+'买币') }}</span>{{ $t(t+'操作指南') }}</div>
      <div class="item">{{ $t(t+'C2C') }}<span class="origin">{{ $t(t+'卖币') }}</span>{{ $t(t+'操作指南') }}</div>
    </div>
    <span class="more">{{ $t(t+'查看更多') }}<i class="el-icon-arrow-right"></i></span>

    <h2 class="video-study">{{ $t(t+'点击查看视频操作教程') }}</h2>
    <div class="video-item">
      <div class="item-content">
        <div class="img-container">
          <img src="@/assets/video-img/video1.png" alt="">
        </div>
        <p>{{ $t(t+'如何在C2C交易市场买币') }}</p>
      </div>

      <div class="item-content">
        <div class="img-container">
          <img src="@/assets/video-img/video2.png" alt="">
        </div>
        <p>{{ $t(t+'如何在C2C交易市场卖币') }}</p>
      </div>
    </div>

    <h2>{{ $t(t+'常见问题') }}</h2>
    <div class="guide-item">
      <div class="item">{{ $t(t+'买币小课堂') }}</div>
      <div class="item">{{ $t(t+'申诉常见问题') }}</div>
    </div>

    <div class="guide-item">
      <div class="item">****{{ $t(t+'法币交易原则') }}</div>
      <div class="item">{{ $t(t+'平台C2C交易法律免责声明') }}</div>
    </div>
    <span class="more">{{$t(t+'查看更多') }}<i class="el-icon-arrow-right"></i></span>
  </div>
</template>

<script>
export default {
  name: 'GettingStarted',
  components: {},
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
		.green{
			cursor: pointer;
			color: #90ff00;
		}
		.origin{
			cursor: pointer;
			color: #F75F52;
		}
    .item {
      margin-right: 100px;
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
    font-weight: 600;
		cursor: pointer;
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
      margin-right: 36px  ;
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