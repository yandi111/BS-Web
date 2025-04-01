<template>
  <div class="app-downlaodGuide pt60">
    <header>
      <div class="title">苹果手机下载BSEX APP指南</div>
      <div class="btns df aic jc">
        <div
          class="btn mr20"
          :class="{ active: currentIndex == 0 }"
          @click="changeTab(0)"
        >
          没有Apple ID
        </div>
        <div
          class="btn"
          :class="{ active: currentIndex == 1 }"
          @click="changeTab(1)"
        >
          已有Apple ID
        </div>
      </div>
    </header>
    <main v-show="currentIndex == 1">
      <div class="content">
        <div class="title">步骤一: 修改已有Apple ID地址</div>
        <div class="box">
          <div class="title1">
            1. <span>访问苹果官方网站</span>
            <span class="link pointer" @click="onLink">
              https://appleid.apple.com
            </span>
            <span>,登录已有帐户</span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n1-1-1.png" alt="" />
            <img src="@/assets/downAppImages/n1-1-2.png" alt="" />
          </div>
        </div>
        <div class="box">
          <div class="title1">
            2. <span>点击右上角下拉菜单 >> 选择 个人信息</span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n1-2-1.png" alt="" />
          </div>
        </div>
        <div class="box">
          <div class="title1">
            3.
            <span
              >国家或地区需要重新选择，其他内容不限制。邮箱填写常用邮箱即可;
              电话填写能收取验证码的手机号 </span
            ><br />
            <span class="link">*请务必记住输入的邮箱、密码及手机号</span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n1-3-1.png" alt="" />
            <img src="@/assets/downAppImages/n1-3-2.png" alt="" />
          </div>
        </div>
        <div class="box">
          <div class="title1">
            4.
            <span>输入邮箱和手机收到的验证码后, 即可注册成功Apple ID</span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n1-4-1.png" alt="" />
            <img src="@/assets/downAppImages/n1-4-2.png" alt="" />
            <img src="@/assets/downAppImages/n1-1-2.png" alt="" />
          </div>
        </div>
      </div>
      <div class="content mt90">
        <div class="title">步骤二: 登录App Store, 下载BSEX App</div>
        <div class="box">
          <div class="title1">
            1.
            <span
              >打开App Store >> 点击右上角 帐户，如帐号已登录, 则退出登录，
              如帐号未登录, 则输入刚注册的Apple ID和密码</span
            >
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n2-1-1.png" alt="" />
            <img src="@/assets/downAppImages/n2-1-2.png" alt="" />
            <img src="@/assets/downAppImages/n2-1-3.png" alt="" />
          </div>
        </div>
        <div class="box">
          <div class="title1">
            2. <span>登录成功 >> 点击 搜索 >> 输入BSEX>> 点击 获取</span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n2-2-1.png" alt="" />
          </div>
        </div>
      </div>
    </main>
    <main v-show="currentIndex == 0">
      <div class="content">
        <div class="title">步骤一：注册海外Apple ID</div>
        <div class="box">
          <div class="title1">
            1.
            <span>访问苹果官方网站 </span>
            <span class="link pointer" @click="onLink"
              >https://appleid.apple.com/</span
            >
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n1-1-1.png" alt="" />
          </div>
        </div>
        <div class="box">
          <div class="title1">
            2.
            <span>点击右上角下拉菜单 >> 选择 创建你的Apple ID </span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/y1-2-1.png" alt="" />
          </div>
        </div>
        <div class="box">
          <div class="title1">
            3.
            <span
              >国家或地区需要重新选择，其他内容不限制。邮箱填写常用邮箱即可;
              电话填写能收取验证码的手机号 </span
            ><br />
            <span class="link">*请务必记住输入的邮箱、密码及手机号</span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n1-3-1.png" alt="" />
            <img src="@/assets/downAppImages/n1-3-2.png" alt="" />
          </div>
        </div>
        <div class="box">
          <div class="title1">
            4.
            <span>输入邮箱和手机收到的验证码后, 即可注册成功Apple ID</span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n1-4-1.png" alt="" />
            <img src="@/assets/downAppImages/n1-4-2.png" alt="" />
            <img src="@/assets/downAppImages/n1-1-2.png" alt="" />
          </div>
        </div>
      </div>
      <div class="content mt90">
        <div class="title">步骤二: 登录App Store, 下载BSEX App</div>
        <div class="box">
          <div class="title1">
            1.
            <span
              >打开App Store >> 点击右上角 帐户，如帐号已登录, 则退出登录，
              如帐号未登录, 则输入刚注册的Apple ID和密码</span
            >
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n2-1-1.png" alt="" />
            <img src="@/assets/downAppImages/n2-1-2.png" alt="" />
            <img src="@/assets/downAppImages/n2-1-3.png" alt="" />
          </div>
        </div>
        <div class="box">
          <div class="title1">
            2. <span>登录成功 >> 点击 搜索 >> 输入BSEX>> 点击 获取</span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/n2-2-1.png" alt="" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    changeTab(id) {
      this.currentIndex = id;
    },
    onLink(e){
      console.log('e',e.target.innerText);
      window.open(e.target.innerText,'_blank')
    }
  },
};
</script>

<style lang="scss" scoped>
.app-downlaodGuide {
  header {
    text-align: center;
    margin-bottom: 40px;
    .title {
      font-size: 50px;
      font-weight: bold;
      color: #333;
      margin-bottom: 40px;
    }
    .btns {
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 200px;
        height: 55px;
        font-size: 24px;
        color: #90ff00;
        padding: 0 20px;
        border-radius: 10px;
        border: 2px solid #90ff00;
        cursor: pointer;
        &.active {
          color: #fff;
          background-color: #90ff00;
        }
      }
    }
  }
  main {
    padding: 0 360px;
    .content {
      width: 100%;
      .title {
        text-align: center;
        font-size: 32px;
        color: #333;
        margin-bottom: 50px;
      }
      .box {
        .title1 {
          color: #333;
          .link {
            color: #90ff00;
          }
        }
        .pic {
          img {
            width: 288px;
          }
        }
      }
    }
  }
}
</style>
