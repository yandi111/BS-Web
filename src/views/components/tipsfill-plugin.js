// tips-plugin.js
// import Tips from './Tips.vue'
import Tipsfill from './swap/Tipsfill.vue'

export default {
  install(Vue) {
    const TipsConstructor = Vue.extend(Tipsfill)
    const tipsfill = new TipsConstructor()
    tipsfill.$mount(document.createElement('div'))
    document.body.appendChild(tipsfill.$el)

    Vue.prototype.$tipsfill = tipsfill.show
  }
}