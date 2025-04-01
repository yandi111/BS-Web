// Loading.js
import { Loading } from 'element-ui';
import Vue from 'vue';

let loadingInstance = null;

// export const showLoading = () => {
//   loadingInstance = Loading.service({
//     fullscreen: true,
//     customClass: 'custom-loading',
//     spinner: `<img src="${require('@/assets/images/loding/lodding.gif')}" alt="Loading" class="loading-icon" />`, // 使用图片作为 spinner
//     text: '', // 可以设置文本，如果不需要可以留空
//     background: '#ccc', // 设置遮罩颜色
//   });
// };


export const showLoading = () => {
    loadingInstance = Loading.service({
      fullscreen: true,
      customClass: 'custom-loading',
      spinner: '', // 不使用默认的 spinner
      text: '', // 可以设置文本，如果不需要可以留空
      background: '#252525', // 设置遮罩颜色
    });
  
    // 添加自定义图标
    // const loadingElement = document.querySelector('.el-loading-text');
    const loadingElement = '';
    if (loadingElement) {
      loadingElement.innerHTML = `<img src="${require('@/assets/images/loding/lodding.gif')}" alt="Loading" class="loading-icon" />`;
    }
  };

export const closeLoading = () => {
  if (loadingInstance) {
    loadingInstance.close();
    loadingInstance = null; // 清空实例
  }
};



Vue.directive('showLoading', {
    // 当被绑定的元素插入到 DOM 中时改变字体颜色
    //el:被绑定的元素，option:接受的参数，是一个对象
    inserted: function (el,option) {
        if(typeof el === 'object'){
            el.style.color = option.value;
        }
    }
})

//禁止控制台输出日志信息
Vue.config.productionTip = false;
new Vue({
    //挂载容器
    el: "#app",


})

