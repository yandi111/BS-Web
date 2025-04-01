<template>
  <div>
    <div class="assets-page" v-if="!haveAssets">
      <div class="title">{{ $t("contract.您在此账户没有资产") }}</div>
      <div class="tip">{{ $t("contract.充值、划转开启您的合约旅程") }}</div>
      <div class="pic">
        <div class="item" @click="onOption(1)">
          <img
            src="@/assets/contract-imgs/assets1_dark.png"
            alt=""
            v-if="getTheme == 'dark'"
          />
          <img src="@/assets/contract-imgs/assets1.png" alt="" v-else />
          <span>{{ $t("contract.充币") }}</span>
        </div>
        <div class="item" @click="onOption(2)">
          <img
            src="@/assets/contract-imgs/assets2_dark.png"
            alt=""
            v-if="getTheme == 'dark'"
          />
          <img src="@/assets/contract-imgs/assets2.png" alt="" v-else />
          <span>{{ $t("contract.新手教程") }}</span>
        </div>
        <div class="item" @click="onOption(3)">
          <img
            src="@/assets/contract-imgs/assets3_dark.png"
            alt=""
            v-if="getTheme == 'dark'"
          />
          <img src="@/assets/contract-imgs/assets3.png" alt="" v-else />
          <span>{{ $t("contract.划转") }}</span>
        </div>
      </div>
    </div>
    <my-empty useTheme v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    haveAssets: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onOption(type) {
      let obj = {
        1: "/wallet/deposit",
        2: "/layout/userStudy",
        3: "/wallet/fundsTransfer",
      };
      this.$router.push({
        path: obj[type],
      });
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
};
</script>

<style lang="scss" scoped>
.assets-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  padding-top: 30px;
  .title {
    font-size: 18px;
    color: var(--main-text-color);
    margin-bottom: 5px;
    font-weight: 700;
  }
  .tip {
    color: #8992a6;
    font-size: 16px;
    transform: scale(0.875); //14px
  }
  .pic {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: var(--main-text-color);
      margin-right: 63px;
      cursor: pointer;
      &:last-child {
        margin-right: 0px;
      }
      img {
        width: 50px;
        margin-bottom: 5px;
      }
      span {
        transform: scale(0.75); //12px
      }
    }
  }
}
</style>
