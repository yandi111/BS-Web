<!-- 行情 -->
<template>
  <div class="quotes w-1203">
    <h1 class="title">{{$t('市场')}}</h1>

    <!-- 热门区域 -->
    <Hot />

    <List ref="list" />
  </div>
</template>

<script>
import Hot from "@/views/quotes/components/Hot.vue";
import List from "@/views/quotes/components/List.vue";

export default {
 components: {List, Hot},
  data() {
    return {
    }
  },
 beforeDestroy() {
  this.$refs.list.closeWs();
 }
};
</script>
<style lang="scss" scoped>
.quotes {
  padding-top: 52px;

  .title {
    margin-bottom: 23px;
    @include Font((size: 30px, weight: bold))
  }
}
</style>
