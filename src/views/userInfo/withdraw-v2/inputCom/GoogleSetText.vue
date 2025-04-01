<template>
    <div>
      <transition name="fade">
            <div>
  
              <div style="font-size: 12px; color: #737373; margin-top: 30px;" class="ff">
                <div style="color: #F0F0F0;font-size: 14px; font-weight: 500;">2 安装完成后打开谷歌验证器APP，扫描下方二维码或手动输入秘钥，得到6位数验证码
                </div>
                <div style="margin-top: 12px; color: #ED3C2F;">请务必妥善保管谷歌验证秘钥，以免更换或丢失手机导致无法换绑。未保存密钥的情况下删除谷歌验证 </div>
                <div style="margin-top: 2px;font-size: 12px; color: #ED3C2F;">器内已绑定的账号将导致账户无法登录，请谨慎操作。</div>
              </div>
  
              <div style="margin-top: 14px;" class="flex">
                <div style="height: 134px; margin-right: 15px;"> <img class="img100" src="@/assets/userInfo/Group171.png"
                    alt=""> </div>
                <div class="flex" style="margin-top: 101px;">
                  <div style="color: #737373;">秘钥:{{ googleTotpKey }}</div>
                  <div @click="copyText" style="display: flex; margin-left: 2px; margin-right: 2px;">
                    <div style="width: 20px; cursor: pointer;  margin-top: 1px; height: 20px;color: #F0F0F0"> <img width="100%"
                        height="100%" src="@/assets/side/icon_responsible.png" alt=""></div>
                  </div>
  
                </div>
  
              </div>
  
            </div>
      </transition>
  
  
    </div>
  </template>
  
  <script>
  export default {

    props: {
        googleTotpKey: {
            type: String,
            required: true,
        }
    },
    components: {
    },
    name: 'GoogleSetText',

    // googleTotpKey

    data (){
        return {
        }
    },

    // eslint-disable-next-line vue/return-in-computed-property
    mounted() { },
    methods: {
  
  
      async copyText() {
        try {
          await navigator.clipboard.writeText(this.googleTotpKey); // 使用 Clipboard API 复制 UID
          // alert('UID 复制成功: ' + this.uid); // 可选：显示复制成功的提示
          this.$customMessage(0,"复制成功")
        } catch (err) {
          console.error('复制失败:', err); // 处理错误
        }
      },
    
  
    }
  
  
  }
  </script>
  
  <style scoped>
  .ff {
    font-family: PingFang SC;
    font-weight: 500;
  }
  
  .ff0 {
    color: #F0F0F0;
  }
  
  .cof {
    color: #FFFFFF;
  }
  
  .jc {
    justify-content: center;
  }
  
  .ic {
    align-items: center;
  }
  
  .jb {
    justify-content: space-between;
  }
  
  .img100 {
    /* width: 100%; */
    height: 100%;
  }
  
  .input-containerS {
    display: flex;
    align-items: center;
    position: relative;
    /* 使子元素绝对定位相对于这个容器 */
  
    width: 100%;
    /* 容器宽度 */
  }
  
  .rotate {
    transform: rotate(180deg);
    /* 旋转 180 度 */
  }
  
  .dropdown {
    height: 296px;
    border: 0.5px solid #252525;
    width: 272px;
    position: absolute;
    top: 58px;
    left: 0px;
    background-color: #1C1C1C;
    border-radius: 4px;
    margin-top: 1px;
    z-index: 10;
    overflow: hidden;
  }
  
  .input-icon {
    position: absolute;
    right: 10px;
    display: inline-block;
    /* 确保图标在同一行 */
  }
  
  .dropdown-item {
  
    border-radius: 4px;
    /* // padding: 8px 12px; */
    cursor: pointer;
    overflow: hidden;
    /* // color: #363636; */
    color: #737373;
  }
  
  .dropdown-item:hover {
    overflow: hidden;
    border-radius: 4px;
    background-color: #252525;
    color: #90ff00;
  }
  
  .parent-component {
    padding: 20px;
  }
  
  .cancel {
    color: #737373;
    background-color: #252525;
  }
  
  .cancel:hover {
    color: #F0F0F0;
    background-color: #363636;
  }
  
  .submit {
    background-color: #90FF00;
    color: #252525;
  }
  
  .submit:hover {
    color: #737373;
  }
  
  .custom-input {
    width: 100%;
    /* 输入框宽度 */
    height: 40px;
    /* 输入框高度 */
    caret-color: #90FF00;
    /* 光标颜色 */
    outline: none;
    /* 去除聚焦时的蓝色边框 */
    border: 0.5px solid rgba(0, 0, 0, 0);
    /* 初始边框样式 */
    border-radius: 4px;
    /* 圆角边框 */
    background: #252525;
    /* 背景颜色 */
    text-align: left;
    /* 文本左对齐 */
  }
  
  .dialog-overlay {
    border-radius: 10px;
    position: fixed;
    top: -70px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 888;
  }
  
  .dialog-content {
    background-color: #1B1B1B;
    border-radius: 10px;
    position: relative;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
  }
  
  .close-button {
    position: absolute;
    /* top: 10px; */
    right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .close-button svg {
    fill: #333333;
    transition: fill 0.3s ease;
  }
  
  .close-button:hover svg {
    fill: #ffffff;
  }
  
  .confirm-button {
    border-top: 1px solid #252525;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    background: rgba(0, 0, 0, 0);
  
    color: #90FF00;
    ;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .input-container {
    display: flex;
    border-radius: 4px;
    overflow-y: auto;
    position: relative;
    /* 使子元素绝对定位相对于这个容器 */
    width: 100%;
    /* 容器宽度 */
    background: #252525;
    /* 背景颜色 */
  }
  
  /* .confirm-button:hover {
        background-color: #45a049;
      } */
  
  h2 {
    color: #333;
    margin-bottom: 15px;
  }
  
  p {
    margin-bottom: 20px;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  
  .selected-icon {
    position: absolute;
    right: 0.3px;
    top: 0.3px;
    overflow: hidden;
  }
  
  .selected-icon img {
    height: 30px;
    width: 30px;
  }
  
  .box {
    padding: 5px 70px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    border: 1px solid #737373;
    margin-right: 5px;
    overflow: hidden;
    /* 确保图标不会超出边框 */
  }
  
  .box:last-child {
    margin-right: 0;
  }
  
  .selected {
    border-color: #90FF00;
  }
  
  .selected-icon {
    position: absolute;
    top: 0;
    right: 0;
    height: 30px;
    width: auto;
    /* 保持图片的原始宽高比 */
    object-fit: contain;
    /* 确保图片完全显示 */
  }
  
  .textTips {
    font-family: PingFang SC;
    font-size: 11px;
    font-weight: 500;
    color: #737373;
  }
  </style>
  
  <style scoped>
  .custom-slider-container {
    position: relative;
    width: 100%;
    padding-bottom: 20px;
    /* 为标签腾出空间 */
  }
  
  .custom-slider {
    position: relative;
    width: 100%;
    height: 14px;
    padding: 6px 0;
  }
  
  .slider-track {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: #252525;
  }
  
  .slider-fill {
    position: absolute;
    height: 100%;
    background-color: #B3B3B3;
  }
  
  .slider-point {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background: url('@/assets/images/icon/icon-drag-node2.png') no-repeat center center;
    background-size: cover;
  }
  
  .slider-point.active {
    background-image: url('@/assets/images/icon/icon-drag-node.png');
  }
  
  .slider-thumb {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    background: url('@/assets/images/icon/icon-Slide.png') no-repeat center center;
    background-size: cover;
    cursor: pointer;
  }
  
  .slider-tooltip {
    position: absolute;
    top: -25px;
    transform: translateX(-50%);
    background-color: #B3B3B3;
    color: #252525;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: PingFang SC;
    font-size: 11px;
    font-weight: 500;
  
  }
  
  .slider-labels {
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    margin-top: -16px;
    font-family: PingFang SC;
  }
  
  .slider-label {
    position: absolute;
    transform: translateX(-50%);
    font-size: 11px;
    font-weight: 500;
    color: #B3B3B3;
  }
  
  .filteredAccountList {
    color: #B3B3B3;
  
  }
  
  .filteredAccountList:hover {
    color: #FFFFFF;
  }
  </style>