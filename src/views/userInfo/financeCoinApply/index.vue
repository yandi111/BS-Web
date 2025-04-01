<template>
  <div class="page">
    <div class="p-banner">
      <div class="banner-box">
        <div class="left">
          <div class="title">BSEX {{ $t("userInfo.上币申请") }}</div>
          <div class="text">
            {{
              $t(
                "userInfo.感谢您对BSEX交易所的关注，请填写申请表并提供有效信息，我们将根据您提供的信息对您的项目进行审核，如果发现任何内容无效或虚假，您的项目将不会被考虑在 BSEX 上币。请提交此申请，您的项目将被送交研究部审查。在您通过初步审查后，我们将与您分享上币流程和技巧。"
              )
            }}
          </div>
          <div class="btn" @click="handleApply">
            {{ token ? $t("userInfo.立即申请") : $t("userInfo.请登录再申请") }}
          </div>
        </div>
        <div class="right">
          <img src="@/assets/financeCoinApply-imgs/coinApply-ad.png" alt="" />
        </div>
      </div>
    </div>
    <div class="p-footer">
      <div class="p-a"></div>
      <div class="p-b"></div>
      <div class="p-c"></div>
      <div class="p-d"></div>
      <div class="p-item pl">
        <div class="item-img">
          <img class="img-a" src="@/assets/financeCoinApply-imgs/c-item1.png" alt="" />
        </div>
        <div class="item-right">
          <div class="item-title">$36.75 {{ $t("userInfo.亿") }}</div>
          <div class="item-text">{{ $t("userInfo.24小时交易量") }}</div>
        </div>
      </div>
      <div class="p-item">
        <div class="item-img">
          <img class="img-b" src="@/assets/financeCoinApply-imgs/c-item2.png" alt="" />
        </div>
        <div class="item-right">
          <div class="item-title">1,200+</div>
          <div class="item-text">{{ $t("userInfo.币种") }}</div>
        </div>
      </div>
      <div class="p-item pr">
        <div class="item-img">
          <img class="img-c" src="@/assets/financeCoinApply-imgs/c-item3.png" alt="" />
        </div>
        <div class="item-right">
          <div class="item-title">800+ {{ $t("userInfo.万") }}</div>
          <div class="item-text">{{ $t("userInfo.注册用户数") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicInformation from "./basicInformation/basicInformation.vue";
import { getToken } from "@/libs/utils.js";
export default {
  name: "financeCoinApply",
  components: {
    BasicInformation,
  },
  data() {
    return {
      token: null,
    };
  },
  mounted() {
    this.token = getToken();
  },
  methods: {
    handleApply() {
      if (getToken()) {
        this.$router.push("/basicInformation");
      } else {
        this.$router.push({
          path: "/layout/login",
          query: { redirect: "/financeCoinApply" },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  color: #333;
  .p-banner {
    width: 100%;
    height: 607px;
    background: url("../../../assets/financeCoinApply-imgs/coinApply-banner.png");
    background-size: contain;
    background-repeat: no-repeat;
    padding: 0 110px;
    .banner-box {
      padding: 108px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 764px;
        .title {
          padding-top: 34px;
          font-size: 28px;
        }
        .text {
          font-size: 14px;
          color: #728398;
          padding-top: 28px;
        }
        .btn {
          width: 400px;
          height: 56px;
          line-height: 56px;
          text-align: center;
          background-color: #90ff00;
          color: #fff;
          font-size: 30px;
          margin-top: 80px;
          border-radius: 8px;
          cursor: pointer;
        }
      }
      .right {
        img {
          width: 410px;
          height: 334px;
        }
      }
    }
  }
  .p-footer {
    position: relative;
    height: 180px;
    background: #f6f9fc;
    border-radius: 6px;
    margin: 0 210px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .p-a {
      position: absolute;
      left: 0;
      top: 0;
      width: 35px;
      height: 35px;
      background: #ecf1f7;
      border-radius: 6px 0px 0px 0px;
    }
    .p-b {
      position: absolute;
      left: 22px;
      top: 22px;
      width: 35px;
      height: 35px;
      background: #ecf1f7;
      opacity: 0.6;
    }
    .p-c {
      position: absolute;
      right: 22px;
      bottom: 22px;
      width: 35px;
      height: 35px;
      background: #ecf1f7;
      opacity: 0.6;
    }
    .p-d {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 35px;
      height: 35px;
      background: #ecf1f7;
      border-radius: 6px 0px 0px 0px;
    }
    .p-item {
      display: flex;
      align-items: center;
      .img-a {
        width: 65px;
        height: 72px;
        margin-right: 20px;
        display: inline-block;
      }
      .img-b {
        width: 67px;
        height: 72px;
        margin-right: 20px;
        display: inline-block;
      }
      .img-c {
        width: 71px;
        height: 72px;
        margin-right: 20px;
        display: inline-block;
      }
      .item-right {
        .item-title {
          font-size: 30px;
        }
        .item-text {
          font-size: 14px;
          color: #000;
        }
      }
    }
    .pl {
      margin-left: 120px;
    }
    .pr {
      margin-right: 120px;
    }
  }
}
</style>