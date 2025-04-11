<!-- 立即赚取收益 -->
<template>
  <div class="card flex">
    <h2 class="title">{{ $t('home_57') }}</h2>

    <el-button v-if="!getToken" type="primary" @click="$router.push('register')">{{ $t('lang_943') }}</el-button>
    <el-button v-else type="primary" @click="">{{ $t('lang_1716') }}</el-button>

  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getToken']),
  },
}
</script>

<style scoped lang="scss">
.card {
  padding: 65px 0;
  background-color: $card_bg;
  @include NewFlex((align: center, justify: center, direction : column));
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

  ::v-deep {
    span {
      @include Font((color: $colorE, size: $h4, weight: 600));
    }
  }
}
</style>