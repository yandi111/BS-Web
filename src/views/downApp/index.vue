<!-- APP下载 -->
<template>
  <div class="downApp">
    <div class="main">
      <div class="title bgc">
        <div class="bold">{{ "download.随时随地" | translate }}</div>
        <div class="indr">{{ "download.匹配平台" | translate }}</div>
      </div>
      <div class="content">
        <div class="nav">
          <div
            class="item"
            :class="{ active: currentIndex == index }"
            v-for="(item, index) in navBar"
            :key="index"
            @click="changeTab(index)"
          >
            {{ item | translate }}
          </div>
        </div>
        <div class="container">
          <div class="box" v-if="currentIndex == 0">
            <div class="left">
              <div class="type" v-for="(item, index) in logoData" :key="index">
                <div class="label">{{ item.label | translate }}</div>
                <div class="df aic">
                  <div class="cellBox">
                    <div
                      class="cell df aic jb"
                      v-for="(items, index) in item.downFrom"
                      :key="index"
                      @click.stop.prevent="showQrCode(items, item)"
                    >
                      <div class="df aic">
                        <div class="logo">
                          <i class="iconfont" :class="items.logo"></i>
                        </div>
                        <div class="name">
                          <div class="name1 tf12">
                            {{ items.text1 | translate }}
                          </div>
                          <div class="name2">{{ items.text2 | translate }}</div>
                        </div>
                      </div>
                      <div>
                        <i
                          class="iconfont icon-a-code2 code"
                          v-show="items.hasCode"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div class="pl60">
                    <codeBox
                      :url="codeUrl"
                      :is-show="isShow && item.label == type"
                    ></codeBox>
                  </div>
                </div>
              </div>
              <div class="tips">
                <span>{{ $t("download.苹果下载BSEX APP 指南") }}</span>
                <div class="iconBox" @click="$router.push('/appdownLoadGuide')">
                  <i class="iconfont icon-next"></i>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="pic">
                <img
                  :src="require('../../assets/downAppImages/downPic.png')"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="box api" v-else-if="currentIndex == 1">
            <div class="left">
              <div class="label">{{ "download.API" | translate }}</div>
              <div class="indr">{{ "download.与您的交易" | translate }}</div>
              <div class="doc" @click="$router.push('/apiDocument')">
                <div class="logo">
                  <i class="iconfont icon-api"></i>
                </div>
                <span class="txt">{{
                  "download.官方API文档" | translate
                }}</span>
              </div>
            </div>
            <div class="right">
              <img
                class="pc_pic"
                :src="require('../../assets/downAppImages/' + apiPic)"
                alt=""
              />
            </div>
          </div>
          <div class="box validator api" v-else-if="currentIndex == 2">
            <div class="left">
              <div class="label">
                {{ "download.验证器" | translate }}
              </div>
              <div class="indr mb20">
                {{ "download.验证器介绍" | translate }}
              </div>
              <div class="type">
                <div class="df aic">
                  <div class="cellBox">
                    <div
                      class="cell df aic"
                      v-for="item in validatorData"
                      :key="item.id"
                      @click.stop.prevent="showGgQrCode(item)"
                    >
                      <div class="logo">
                        <i class="iconfont" :class="item.logo"></i>
                      </div>
                      <div class="name">
                        <div class="name1 tf12">
                          {{ item.text1 | translate }}
                        </div>
                        <div class="name2">{{ item.text2 | translate }}</div>
                      </div>
                      <div class="code-sm">
                        <i class="iconfont icon-a-code2 code"></i>
                      </div>
                    </div>
                  </div>
                  <div class="pl50">
                    <codeBox :is-show="isShow" :url="codeUrl"></codeBox>
                  </div>
                </div>
              </div>
              <div class="tips">
                <span>{{ $t("download.手机下载 Google 身份验证器指南") }}</span>
                <div class="iconBox" @click="$router.push('/validatorGuide')">
                  <i class="iconfont icon-next"></i>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="pic">
                <img src="../../assets/downAppImages/phone2.png" alt="" />
              </div>
            </div>
          </div>
          <div class="box testflight api" v-else-if="currentIndex == 3">
            <div class="left">
              <div class="label">TestFlight</div>
              <div class="indr mb50">
                {{ $t("download.无需美区ID，即可体验BSEX") }}
              </div>
              <div class="type">
                <div class="cell df aic">
                  <div class="name">
                    <div class="name1 tf12">{{ $t("download.下载自") }}</div>
                    <div class="name2">APP Store</div>
                  </div>
                </div>
              </div>
              <div class="tips">
                <span>{{ $t("download.手机下载TestFlight APP指南") }}</span>
                <div class="iconBox" @click="$router.push('/testFlightGuide')">
                  <i class="iconfont icon-next"></i>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="test">
                <img
                  :src="require('../../assets/downAppImages/' + testFlight)"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">{{ $t("download.为什么选择") }}</div>
      <div class="box">
        <div class="items" v-for="item in resonData" :key="item.id">
          <div class="logo">
            <img
              :src="require('../../assets/downAppImages/' + item.logo)"
              alt=""
            />
          </div>
          <div class="label">{{ item.label | translate }}</div>
          <div class="indr tf14">{{ item.indr | translate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logoData, resonData, validatorData } from "./icon";
import { $getQrCodeUrl } from "@/api/apidocument";
import codeBox from "./codebox.js";

export default {
  name: "DownApp",
  data() {
    return {
      navBar: ["download.APP下载", "API", "download.验证器", "TestFlight"],
      currentIndex: 0,
      //依次是nav对应的数据
      logoData: logoData,
      resonData: resonData,
      validatorData: validatorData,

      chooseType: {}, //被选择的二维码类型
      type: "", // android or ios
      codeUrl: undefined,
    };
  },
  created() {
    document.addEventListener("click", this.onClickOut);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClickOut);
  },
  computed: {
    apiPic() {
      let lang = this.$i18n.locale;
      const obj = {
        cn: "apiPic_cn.png",
        en: "apiPic_en.png",
        tw: "apiPic_tw.png",
        th: "apiPic_th.png",
      };
      return obj[lang];
    },
    testFlight() {
      let lang = this.$i18n.locale;
      const obj = {
        cn: "testFlight_cn.png",
        en: "testFlight_en.png",
        tw: "testFlight_cn.png",
        th: "testFlight_en.png",
      };
      return obj[lang];
    },
    isShow() {
      const flag = Boolean(this.chooseType.hasCode && this.chooseType.type);
      console.log("flag", flag);
      return flag;
    },
  },
  methods: {
    //切换tab栏
    changeTab(id) {
      this.currentIndex = id;
    },

    getUrl(type) {
      $getQrCodeUrl({ type }).then((res) => {
        this.codeUrl = res.data.data?.downloadUrl;
      });
    },

    //显示下载二维码
    showQrCode(items, item) {
      this.getUrl(items.type);
      this.chooseType = items;
      this.type = item?.label;
      if(items.type2 == 'GooglePlay'){
        window.location.href = "https://play.google.com/store/apps/details?id=com.musk.exchange"
       
      } else if(items.type2 == 'ToolInstallation'){
         window.location.href ="https://apps.apple.com/us/app/BSEX/id6473614056"
      }
    },

    // 下载谷歌验证器
    showGgQrCode(item) {
      this.chooseType = item;
      if (item.type == 1) {
        //  this.codeUrl = "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
        // 提供一个下载谷歌验证器的地址
        this.codeUrl ="https://BSEX.s3.ap-east-1.amazonaws.com/BSEX/cd7053c5-ce66-415c-b05f-21ebb680724f.apk"
      } else {
        this.codeUrl =
          "https://apps.apple.com/us/app/google-authenticator/id388497605";
      }
    },

    onClickOut() {
      this.codeUrl = undefined;
      this.type = "";
      this.chooseType = {};
    },
  },
  components: {
    codeBox,
  },
};
</script>
<style lang="scss" scoped>
@use "./index.scss";
</style>
