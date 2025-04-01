<template>
  <div class="emptyBox">
    <div class="empty" v-if="$store.state.login.token">
      <img v-if="!useTheme" src="@/assets/contract-imgs/empty2.png" alt="" />
      <img
        v-else
        :src="
          require(`@/assets/contract-imgs/${
            getTheme == 'dark' ? 'empty2_dark' : 'empty2'
          }.png`)
        "
        alt=""
      />
      <span>{{ "spot.暂无数据" | translate }}</span>
    </div>

    <div class="loginStatus" v-else>
      <span class="login" @click="toLogin(1)">{{ $t("spot.登录") }}</span
      >{{ $t("spot.或") }}<span @click="toLogin(0)">{{ $t("spot.注册") }}</span
      >{{ $t("spot.开始交易") }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    //未登录
    notLoggedIn: {
      type: Boolean,
      default: false,
    },
    useTheme: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  methods: {
    toLogin(type) {
      let url = type ? "/login" : "/register";
      this.$router.push({
        path: url,
        query: { redirect: "/contractTransaction" },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.emptyBox {
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 60px;

    img {
      width: 94px;
      height: 53px;
    }
    span {
      font-size: 12px;
      color: #96a2b2;
      margin-top: 10px;
    }
  }
  .loginStatus {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-top: 80px;
    font-size: 14px;
    color: #96a2b2;
    margin-top: 10px;
    span {
      color: var(--theme-color);
      cursor: pointer;
      margin: 0 5px;
    }
  }
}
</style>
