<template>
  <div class="validatorGuide">
    <div class="title">下载 Google 身份验证器指南</div>
    <main>
      <div class="text">
        单击【菜单】 - > 安全中心 - > 申请谷歌身份验证 - >
        打开手机中的【身份验证器】或【Google Authenticator】 - > 开始设置 - >
        【输入提供的密钥】或【手动输入验证码】 - > 输入平台中登录名 - >
        输入我们平台中提供的26位密钥即可成功添加。
      </div>
      <div class="picBox">
        <div class="pic" v-for="item in picList" :key="item.url">
          <img :src="require('@/assets/downAppImages/' + item.url)" alt="" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "validatorGuide",
  data() {
    return {
      picList: [
        { url: "1.png" },
        { url: "2.png" },
        { url: "3.png" },
        { url: "4.png" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.validatorGuide {
  padding: 0 210px;
  .title {
    text-align: center;
    font-size: 50px;
    color: #333333;
    margin: 80px 0 100px;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    .text {
      font-size: 16px;
      color: #333333;
    }
    .picBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20px;
      width: 800px;
      .pic {
        width: 380px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
