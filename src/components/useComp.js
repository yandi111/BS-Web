// 全局注册组件

import CommonModal from './commonModal/index.vue'

export default {
  install (Vue) {
    Vue.component('CommonModal', CommonModal)
  }
}