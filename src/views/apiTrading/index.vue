<template>
  <div class="apiTrading">
    <div class="banner">
      <div class="indr">
        <div class="title">BSEX API</div>
        <div class="title1">{{ $t("doc.接入BSEX API，交易更快更流畅") }}</div>
        <div class="btns">
          <div class="btn type1" @click="createApi">
            {{ $t("doc.创建API Key") }}
          </div>
          <div class="btn type2" @click="checkOutTheDocument()">
            {{ $t("doc.查看API文档") }}
          </div>
        </div>
      </div>
    </div>
    <div class="interface">
      <div class="title">{{ $t("doc.交易接口") }}</div>
      <div class="txt">
        {{ $t("doc.支持 100+ 种类数字货币的币币、合约的API交易") }}
      </div>
      <div class="process">
        <div class="user">
          <div>
            <img
              class="user_pic"
              src="../../assets/apiTrading-imgs/编组 186.png"
              alt=""
            />
          </div>
          <div class="label text">{{ $t("doc.用户") }}</div>
        </div>
        <div class="center">
          <div class="top">
            <img
              class="arrow1"
              src="../../assets/apiTrading-imgs/编组 13.png"
              alt=""
            />
          </div>
          <div class="con">
            <div class="left">
              <img
                class="arrow2"
                src="../../assets/apiTrading-imgs/编组 16.png"
                alt=""
              />
            </div>
            <div class="mid">
              <img
                class="api_pic"
                src="../../assets/apiTrading-imgs/编组 185.png"
                alt=""
              />
              <div class="label text">API</div>
            </div>
            <div class="right">
              <img
                class="arrow2"
                src="../../assets/apiTrading-imgs/编组 17.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="pc">
          <div>
            <img
              class="pc_pic"
              src="../../assets/apiTrading-imgs/编组 184.png"
              alt=""
            />
          </div>
          <div class="label text">{{ $t("doc.业务生态") }}</div>
        </div>
      </div>
      <div class="api">
        <div class="boxs" v-for="item in logoData" :key="item.id">
          <div class="title">{{ item.title | translate }}</div>
          <div class="box">
            <div
              class="cell"
              v-for="(ele, index) in item.icon"
              :key="index"
              :class="{ bgColor: apiOptionsIndex == ele.id }"
              @click="toDocuments(ele)"
            >
              <img
                class="icon"
                :src="require('../../assets/apiTrading-imgs/' + ele.logo)"
                alt=""
              />
              <div class="txt">{{ ele.text | translate }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="advertising">
      <div class="title">{{ $t("doc.为开发者而生") }}</div>
      <div class="txt">
        {{
          $t(
            "doc.BSEX已为开发者打造了完善的生态环境，利用工具和平台来升级您的API交易体验！"
          )
        }}
      </div>
      <div class="btn">
        <img
          class="tele_icon"
          src="../../assets/apiTrading-imgs/tele.png"
          alt=""
        />
        <span class="text">Telegram</span>
      </div>
    </div>
    <div class="help">
      <div class="label">{{ $t("doc.常见问题") }}</div>
      <div class="li">
        <div class="title df aic jb" :class="{ active: flag1 }">
          <span>{{ $t("doc.如何使用API?") }}</span>
          <i
            class="iconfont"
            :class="flag1 ? 'icon-up1' : 'icon-down1'"
            @click="showLi(1)"
          ></i>
        </div>
        <div class="textbox" v-show="flag1">
          <div class="text">
            {{ $t("doc.API Key管理") }}
          </div>
          <div class="text">
            <span>{{ $t("doc.创建完成") }}</span>
            <span class="link" @click="toHelpCenter()">{{
              $t("doc.请参考帮助中心")
            }}</span>
          </div>
        </div>
      </div>
      <div class="li">
        <div class="title df aic jb" :class="{ active: flag2 }">
          <span>{{ $t("doc.哪里可以查阅API文档?") }}</span>
          <i
            class="iconfont"
            :class="flag2 ? 'icon-up1' : 'icon-down1'"
            @click="showLi(2)"
          ></i>
        </div>
        <div class="textbox" v-show="flag2">
          <div class="text">
            <span>{{
              $t("doc.您可以在此处查看")
            }}</span>
            <span class="link" @click="checkOutTheDocument()">{{
              $t("doc.API文档。")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { iconData } from "./icon";
export default {
  data() {
    return {
      logoData: iconData,
      apiOptionsIndex: 0,
      flag1: false,
      flag2: false,
    };
  },
  methods: {
    //前往帮助中心
    toHelpCenter() {
      this.$router.push("/helpCenterPage");
    },
    createApi() {
      this.$router.push("/user/apiManage");
    },
    //查看api文档
    checkOutTheDocument() {
      this.$router.push("/apiDocument");
    },
    //去api文档
    toDocuments(value) {
      this.apiOptionsIndex = value.id;
      this.$router.push("/apiDocument?type=1&id=" + value.id);
    },
    showLi(num) {
      if (num == 1) {
        this.flag1 = !this.flag1;
      } else {
        this.flag2 = !this.flag2;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>
