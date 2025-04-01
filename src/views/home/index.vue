<!-- eslint-disable vue/multi-word-component-names -->
<template>
 <div class="home container">
  <div class="flex jc w-1203">
   <Card1 />

   <Card2 />

   <Card3 />
  </div>

  <Card4 />
 </div>
</template>

<script>
import Card1 from "@/views/home/components/card1.vue";
import Card2 from '@/views/home/components/card2.vue'
import Card3 from '@/views/home/components/card3.vue'
import Card4 from '@/views/home/components/card4.vue'

export default {
 components: {
  Card1,
  Card2,
  Card3,
  Card4,
 },
};
</script>

<style lang="scss" scoped>
.container {
 .w-1203 {
  margin: 80px auto 0;
  flex-direction: column;
  //width: 100%;
 }
}
</style>
