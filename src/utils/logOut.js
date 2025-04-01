import { removeToken } from "@/libs/utils.js";

export function logOut() {
    this.$store.commit('clearUserList'); // 清空用户信息
    removeToken();
    // this.$router.push("/layout/login");
    window.location.href = "/login";
  }