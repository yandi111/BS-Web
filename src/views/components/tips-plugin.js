// tips-plugin.js
// import Tips from './Tips.vue'
import Tips from './swap/Tips.vue'

export default {
  install(Vue) {
    const TipsConstructor = Vue.extend(Tips)
    const tips = new TipsConstructor()
    tips.$mount(document.createElement('div'))
    document.body.appendChild(tips.$el)

    Vue.prototype.$tips = tips.show
  }
}