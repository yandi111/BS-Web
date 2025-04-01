<template>
  <div class="app-downlaodGuide pt60">
    <header>
      <div class="title">{{ $t("download.下载 TestFlight APP 指南") }}</div>
      <div class="btns df aic jc">
        <div
          class="btn mr20"
          :class="{ active: currentIndex == 0 }"
          @click="changeTab(0)"
        >
          {{ $t("download.中国区") }}
        </div>
        <div
          class="btn"
          :class="{ active: currentIndex == 1 }"
          @click="changeTab(1)"
        >
          {{ $t("download.其他区") }}
        </div>
      </div>
    </header>
    <main v-show="currentIndex == 0">
      <div class="content">
        <div class="box mb28">
          <div class="title1 mb28">
            <span>{{
              $t("download.第一步：在APP Store中下载TestFlight APP。")
            }}</span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/t1-1-1.png" alt="" />
          </div>
        </div>
        <div class="box mb28">
          <div class="title1 mb28">
            <span
              >{{ $t("download.第二步:首先，打开链接：")
              }}<span class="link pointer" @click="onLink"
                >https:/www.liangjianghu.com/searchads-appstore-switch</span
              >
              ，{{
                $t(
                  "download.推荐在手机自带浏览器中打开链接。选择US 美国 United States，页面自动切换至APP Store，等候页面弹出弹窗，点击继续。届时，APP Store已由原来所在的中国区切换为美国区。"
                )
              }}</span
            >
          </div>
          <div class="pic df aic jc">
            <img class="mr76" src="@/assets/downAppImages/t1-2-1.png" alt="" />
            <img class="mr76" src="@/assets/downAppImages/t1-2-2.png" alt="" />
            <img src="@/assets/downAppImages/t1-2-3.png" alt="" />
          </div>
        </div>
        <div class="box df fdc">
          <div class="title1 mb28">
            <span
              >{{ $t("download.第三步:然后，打开链接：")
              }}<span class="link pointer" @click="onLink"
                >https://testflight.apple.com/join/8LIHmRaM</span
              >，{{
                $t(
                  "download.推荐在手机自带浏览器中打开链接，点击开始测试，同意条款，点击安装即可开始使用。"
                )
              }}</span
            ><br />
          </div>
          <div class="pic pic4">
            <img src="@/assets/downAppImages/t1-3-1.png" alt="" />
            <img src="@/assets/downAppImages/t1-3-2.png" alt="" />
            <img src="@/assets/downAppImages/t1-3-3.png" alt="" />
            <img src="@/assets/downAppImages/t1-3-4.png" alt="" />
          </div>
        </div>
      </div>
    </main>
    <main v-show="currentIndex == 1">
      <div class="content">
        <div class="box mb28">
          <div class="title1 mb28">
            <span>{{
              $t("download.第一步：在APP Store中下载TestFlight APP。")
            }}</span>
          </div>
          <div class="pic df aic jc">
            <img src="@/assets/downAppImages/t1-1-1.png" alt="" />
          </div>
        </div>
        <div class="box">
          <div class="title1 mb28">
            <span
              >{{ $t("download.第二步：打开链接：") }}
              <span class="link pointer" @click="onLink"
                >https://testflight.apple.com/join/8LIHmRaM</span
              >，{{
                $t(
                  "download.推荐在手机自带浏览器中打开链接，点击开始测试，同意条款，点击安装即可开始使用。"
                )
              }}</span
            >
          </div>
          <div class="pic pic4">
            <img src="@/assets/downAppImages/t1-3-1.png" alt="" />
            <img src="@/assets/downAppImages/t1-3-2.png" alt="" />
            <img src="@/assets/downAppImages/t1-3-3.png" alt="" />
            <img src="@/assets/downAppImages/t1-3-4.png" alt="" />
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
    onLink(e) {
      console.log("e", e.target.innerText);
      window.open(e.target.innerText, "_blank");
    },
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
          &.pic4 {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 0 200px;
            column-gap: 76px;
          }
        }
      }
    }
  }
}
</style>
