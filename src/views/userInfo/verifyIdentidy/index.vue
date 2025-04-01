<!-- 身份验证 -->
<template>
 <div class="verify">

  <div class="ff" style="font-weight: 600; font-size: 30px;">{{$t('lang_681')}}</div>
  <!-- 基本信息 -->

  <BasicInformation/>
  <!--标准身份验证 -->
  <StandardInformation/>
  <!--进阶身份认证 -->
  <AdvancedIdentity/>
 </div>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from "vuex";
import BasicInformation from "./com/BasicInformation.vue";
import StandardInformation from "./com/StandardInformation.vue";

import AdvancedIdentity from "./com/AdvancedIdentity.vue";
import {onKycConfigList} from "@/api/user";

export default {
 name: "VerifyIdentidy",
 components: {
  BasicInformation,
  StandardInformation,
  AdvancedIdentity
 },
 data() {
  return {
   detaiStat: ''
  }
 },
 mounted() {
  this.kycInitList()
  this.kycInitDetail(this.getToken)
 },
 computed: {
  ...mapGetters(['getToken']),
 },
 methods: {
  // s2  s1   按钮
  //s3  authLevel = 3   ||    authLevel = 2 && auditStatus = 2
  ...mapMutations(['setKycInitList', 'setDetailList']),
  ...mapActions(['kycInitDetail']),
  kycInitList() {
   Promise.try(() => {
    return onKycConfigList()
   }).then(res => {
    this.initList = res.data
    this.setKycInitList(res.data)
   })
  },
 }
};
</script>
<style lang="scss" scoped>
.verify {
 padding: 30px 41px;
 height: 100%;
}

.ff {
 color: #F0F0F0;
}

.con {
 width: 640px;
}

.verify-identidy {
 background: #f5f7fa;
 color: #333333;
 padding: 0 20px 0 20px;

 .verify-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  .verify-text {
   font-size: 24px;
  }
 }
}

.setting-info {
 width: 100%;
 height: 90px;
 padding: 0 20px;
 background: #fff;
 border-radius: 15px;
 margin-bottom: 20px;
}

main {
 display: flex;
 width: 100%;
 background-color: #ffffff;
 border-radius: 15px;
 padding: 26px 30px;

 .addressContent {
  flex: 1;
  padding-right: 260px;
 }

 .statusBox {
  flex: 1;
  padding-right: 260px;
 }

}

.item-bold1 {
 font-weight: 500;
 color: #333333;
 font-size: 16px;
 padding-left: 20px;
 padding-bottom: 6px;
}

.item-bold2 {
 font-weight: 500;
 color: #333333;
 font-size: 14px;
 padding-right: 30px;
 padding-top: 6px;
}

.main-text {
 font-family: PingFangSC-Medium, PingFang SC;
 font-weight: 500;
}

.thiny-text {
 font-family: PingFangSC-Medium, PingFang SC;
 font-weight: 400;
}

.main-size {
 font-size: 16px;
}

.thiny-size {
 font-size: 12px;
}

.main-color {
 color: #333333;
}

.thiny-color {
 color: #96a2b2;
}

.flex-box-column {
 display: flex;
 justify-content: space-between;
 flex-direction: column;
}

.fix-height {
 height: 40px;
}

.disabled-count {
 color: $colorB;
}

</style>
