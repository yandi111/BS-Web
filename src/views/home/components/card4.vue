<!-- 立即赚取收益 -->
<template>
 <div class="card flex">
  <h2 class="title">{{$t('home_57')}}</h2>

  <el-button type="primary" @click="$router.push('register')">{{$t('lang_943')}}</el-button>
 </div>
</template>

<script>
export default {
 data() {
  return {}
 }
}
</script>

<style scoped lang="scss">
.card {
 padding: 65px 0;
 background-color: $card_bg;
 @include NewFlex((align: center, justify: center,direction : column));
}
.title {
 margin-bottom: 31px;
 @include Font((color: $colorD, size: 40px, align: center, weight: bold));
}
.el-button {
 height: 48px;
 width: 164px;
 background-color: $colorA;
 border-color: $colorA;
 transition: .3s;

 &:active {
  transform: scale(.7);
  transition: .3s;
  opacity: .8;
 }

 ::v-deep {
  span {
   @include Font((color: $colorE, size: $h4, weight: 600));
  }
 }
}
</style>