import Vue from 'vue';
import Loading from './my-loading/index.vue'; // 根据你的路径调整

// 自定义指令
const loadingDirective = {
  bind(el, binding) {
    const loadingComponent = new (Vue.extend(Loading))({
      propsData: {
        isShow: binding.value
      }
    });

    // 挂载到一个新的 div 上
    const loadingDiv = document.createElement('div');
    el.appendChild(loadingDiv);
    loadingComponent.$mount(loadingDiv);

    // 监听指令的值变化
    el.__vueLoadingComponent__ = loadingComponent;
  },
  update(el, binding) {
    if (el.__vueLoadingComponent__) {
      el.__vueLoadingComponent__.isShow = binding.value;
    }
  },
  unbind(el) {
    if (el.__vueLoadingComponent__) {
      el.__vueLoadingComponent__.$destroy();
      el.removeChild(el.__vueLoadingComponent__.$el);
      delete el.__vueLoadingComponent__;
    }
  }
};

export default loadingDirective;