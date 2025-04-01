<template>
  <div class="compliance">
    <MoneyPolicy v-if="id === '2'"></MoneyPolicy>
    <PrivacyPolicy v-if="id === '3'"></PrivacyPolicy>
    <Protocol v-if="id === '4'"></Protocol>
    <LegalNotices v-if="id === '5'"></LegalNotices>
    <RiskWarning v-if="id === '6'"></RiskWarning>
  </div>
</template>

<script>
import Protocol from "../protocol/index.vue";
import MoneyPolicy from "../moneyPolicy/index.vue";
import LegalNotices from "../legalNotices/index.vue";
import RiskWarning from "../riskWarning/index.vue";
import PrivacyPolicy from "../privacyPolicy/index.vue";
export default {
  name: "Compliance",
  components: {
    Protocol,
    MoneyPolicy,
    LegalNotices,
    RiskWarning,
    PrivacyPolicy
  },
  data() {
    return {
      id: null,
    };
  },
  created(){
    this.id = this.$route.query.params 
  }
};
</script>

<style lang="scss" scoped>
.compliance {
  width: 100%;
}
</style>