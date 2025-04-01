// tips-plugin.js
// import Tips from './Tips.vue'
// import Tipsfill from './swap/Tipsfill.vue'
import Tipsvalue from './swap/Tipsvalue.vue'

export default {
  install(Vue) {
    const TipsConstructor = Vue.extend(Tipsvalue)
    const tipsvalue = new TipsConstructor()
    tipsvalue.$mount(document.createElement('div'))
    document.body.appendChild(tipsvalue.$el)

    Vue.prototype.$tipsvalue = tipsvalue.show
  }
}