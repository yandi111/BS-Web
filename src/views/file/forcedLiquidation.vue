<template>
  <div class="protocol">
    <div class="title">
      <span @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
        关于强平
      </span>
    </div>
    <div class="content">
      <div class="content-logo">
        <img src="../../assets/images/logo-icon.png" alt="" />
        <div>
          <p class="content-title">UBEX</p>
          <p class="content-date">2023.06.19</p>
        </div>
      </div>
      <div class="content-title mad">U本位合约交易强制平仓常见问题</div>
      <div class="content-title mad">1、什么是保证金率？</div>
      <div class="content-text">
        <div>
          保证金率是反应仓位安全程度的指标，保证金率越高，代表仓位越安全。
          全仓保证金率=（合约账户余额+所有全仓仓位未实现盈亏相加-所有逐仓占用保证金-所有交易对挂单委托占用保证金）/（面值*张数*标记价格*（维持保证金率+手续费率））*100%
        </div>
        <div class="top">
          逐仓保证金率=（逐仓仓位保证金+收益）/（面值*张数*标记价格+（维持保证金率+手续费率）*100%
        </div>
      </div>
      <div class="content-title mad">2、什么强制平仓（强平）？</div>
      <div class="content-text">
        <div>
          全仓保证金制度下，用户所持仓位在最新成交价向相反的方向变动时，当用户的保证金率小于等于100%就会触发强制平仓。
        </div>
        <div class="top">
          逐仓保证金制度下，用户所持仓位在最新成交价向相反的方向变动时，当用户的保证金率小于等于100%就会触发强制平仓。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LegalNotices",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.protocol {
  width: 100%;
  background: #fff;
  padding: 40px 210px;
  color: #333;
  .title {
    font-size: 24px;
   span{
    vertical-align: middle;
    cursor: pointer;
   }
  }
  .content {
    font-size: 14px;
    .content-title {
      font-size: 16px;
    }
    .content-logo {
      margin-top: 40px;
      display: flex;
      align-items: center;
      img {
        width: 34px;
        height: 34px;
        display: inline-block;
        margin-right: 10px;
      }

      .content-date {
        font-size: 10px;
        color: #999;
      }
    }
    .content-text {
      margin: 10px 0;
      font-size: 14px;
      .top{
        margin-top: 10px;
      }
    }
    .content-info {
      p {
        padding-left: 60px;
      }
    }
  }
  .mad{
     margin: 20px 0px;
  }
}
</style>