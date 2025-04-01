<!-- 安全设置 -->
<template>
 <div style="height: calc(100vh - 4.52547rem);overflow-y: scroll; padding-top: 30px;">
  <div style="width: 100%; padding-left: 40px; padding-top: 24px; padding-right: 40px; ">
   <div style="font-size: 30px;font-weight: 600; color: #F0F0F0;">{{$t('lang_2443')}}</div>
   <!--   -->
   <div class="flex" style="margin-top: 21px;">
    <div class="flex" style="margin-right: 42px;">
     <div style="width: 18px; height: 18px;margin-right: 8px;">
      <img v-if="getUserList.mobilePhone" class="img100" src="@/assets/images/icon/icon-success.png" alt="">
      <img v-else class="img100" src="@/assets/images/icon/icon-circle-close.png" alt="">
     </div>
     <div class="ff0" style="font-size: 14px;font-weight: 500;">{{$t('lang_2423')}}</div>
    </div>
    <div class="flex" style="margin-right: 42px;">
     <div style="width: 18px; height: 18px;margin-right: 8px;">
      <img v-if="getUserList.email" class="img100" src="@/assets/images/icon/icon-success.png" alt="">
      <img v-else class="img100" src="@/assets/images/icon/icon-circle-close.png" alt="">
     </div>
     <div class="ff0" style="font-size: 14px;font-weight: 500;">{{$t('绑定邮箱号')}}</div>
    </div>
    <div class="flex" style="margin-right: 42px;">
     <div style="width: 18px; height: 18px;margin-right: 8px;">
      <img v-if="getUserList.googleAuthenticator" class="img100" src="@/assets/images/icon/icon-success.png" alt="">
      <img v-else class="img100" src="@/assets/images/icon/icon-circle-close.png" alt="">
     </div>
     <div class="ff0" style="font-size: 14px;font-weight: 500;">{{$t('谷歌身份验证器')}}</div>
    </div>
    <div class="flex" style="">
     <div style="width: 18px; height: 18px;margin-right: 8px;">
      <img v-if="getUserList.antiScamCode" class="img100" src="@/assets/images/icon/icon-success.png" alt="">
      <img v-else class="img100" src="@/assets/images/icon/icon-circle-close.png" alt="">
     </div>
     <div class="ff0" style="font-size: 14px;font-weight: 500;">{{$t('lang_2499')}}</div>
    </div>

   </div>
   <!-- 多重验证 -->
   <MultipleVerification/>

  </div>
 </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import MultipleVerification from "./com/multipleVerification.vue";

export default {
 name: "SecuritySetting",
 components: {
  MultipleVerification
 },
 data() {
  return {};
 },
 computed: {
  ...mapGetters(["userInfo", 'getUserList']),
  token() {
   return this.$store.getters.getToken
  }
 },
 mounted() {
  if (this.token) {
   this.fetchUserInfo(this.token);
  } else {
   this.fetchUserInfo();
  }
 },
 methods: {
  ...mapActions(['fetchUserInfo']),
 },
};
</script>
<style lang='scss' scoped>
.ff0 {
 color: #F0F0F0;
}
.jic {
 display: flex;
 align-items: center;
 justify-content: center;
}

.img100 {
 width: 100%;
 height: 100%;
}

.common-content {
 padding: 0 20px;
 font-size: 14px;
 color: #637287;

 .img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
 }

 .item {
  margin-top: 15px;
 }

 .btn {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  margin-top: 32px;
  margin-bottom: 10px;

  .cancel {
   width: 210px;
   height: 40px;
   line-height: 40px;
   text-align: center;
   border-radius: 6px;
   // border: 1px solid $colorB;
   // color: $colorB;
   color: #333;
   cursor: pointer;
   background: #F4F5F7;
  }

  .sure {
   width: 210px;
   height: 40px;
   line-height: 40px;
   text-align: center;
   background: $colorB;
   border-radius: 6px;
   color: #ffffff;
   cursor: pointer;
  }
 }
}


</style>