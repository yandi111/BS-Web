<!-- 最新公告 -->
<template>
  <div class="latest-post">
    <p class="title">关于维护TONCOIN/USDT现货交易对的公告</p>
    <p class="time">2023-04-07 16:58</p>
    <p class="content">尊敬的全球用户：</p>
    <p class="content">2023年4月7日 (UTC+8) 进行TONCOIN/USDT现货交易对维护升级，升级期间，TONCOIN/USDT现货交易对暂停交易。</p>
    <p class="content">升级完成后，我们将第一时间恢复相关业务，请留意官方公告。如遇行情波动较大等因素导致升级时间调整，平台将另行通知。保留随时全权酌情因任何理由修改、变更或取消此公告的权利，无需事先通知。</p>
    <p class="content">为您带来的不便，敬请谅解！感谢您支持与关注！</p>
  </div>
</template>

<script>
export default {
  name: 'LatestPost',
  components: {},
  data () {
    return {
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.latest-post {
  padding: 40px 60px;
  .title {
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
    margin-bottom: 30px;
  }
  .time {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #8992a6;
    margin-bottom: 30px;
  }
  .content {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-bottom: 20px;
  }
}
</style>