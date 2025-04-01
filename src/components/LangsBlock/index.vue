<template>
  <ul class="langs-block-container">
    <li v-for="(item, index) in langs" :key="index" class="langs-block-item">
      <el-button
        type="text"
        @click="changeLang(item.key)"
        :class="currentLang === item?.key ? 'active' : ''"
      >
        {{ item.text }}
      </el-button>
    </li>
  </ul>
</template>
<script>
import { langs } from '@/config/langs'
export default {
  data() {
    return {
      langs,
    }
  },
  computed: {
    currentLang() {
      return this.$i18n.locale
    },
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('lang', lang)
      this.$emit('changeLang', lang)
      location.reload()
    },
  },
}
</script>
<style lang="scss" scoped>
.langs-block-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .langs-block-item {
    width: fit-content;
    min-width: 80px;
  }
  ::v-deep .active {
    span {
      color: #90ff00 !important;
    }
  }
}
</style>