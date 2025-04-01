<template>
 <div>
  <!-- <button @click="openDialog">打开对话窗</button> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525;">

     <div class="flex jb"
          style="padding-top: 17px; padding-bottom: 10px; padding-left: 17px; padding-right: 17px; border-bottom: 1px solid #252525; ">
      <div class="ff" style="font-size: 16px; color: #F0F0F0; ">选择账号</div>
      <div>
       <button @click="isDialogVisible = false" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
         <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
       </button>
      </div>

     </div>
     <div class="con " style="padding-top: 10px;padding-left: 17px; padding-right: 17px;">
      <div class="flex jb ic"
           style="font-size: 13px;font-weight: 500; color:#FFFFFF; margin-top: 8px; margin-bottom: 10px;">
       <div style="height: 22px; line-height: 22px; margin-right: 183px;">857229093@qq.com</div>
       <div style="height: 22px; line-height: 22px;">移出</div>
      </div>
      <div class="flex jb ic"
           style="font-size: 13px;font-weight: 500; color:#FFFFFF; margin-top: 8px; margin-bottom: 10px;">
       <div style="height: 22px; line-height: 22px; margin-right: 183px;">857229093@qq.com</div>
       <div style="height: 22px; line-height: 22px;">移出</div>
      </div>
      <div class="flex jb ic"
           style="font-size: 13px;font-weight: 500; color:#FFFFFF; margin-top: 8px; margin-bottom: 10px;">
       <div style="height: 22px; line-height: 22px; margin-right: 183px;">857229093@qq.com</div>
       <div style="height: 22px; line-height: 22px; color: #90FF00; cursor: pointer;">移出</div>
      </div>
     </div>
    </div>
   </div>
  </transition>
 </div>
</template>

<script>
export default {
 name: 'SelectAccount',
 data() {
  return {
   count: 0,
   isHovered: false,
   isAddHovered: false,
   isDialogVisible: false,
   accountList: [
    {
     account: '857229093@qq.com',
     name: '移出'
    },
    {
     account: '857229093@qq.com',
     name: '移出'
    },
    {
     account: '857229093@qq.com',
     name: '移出'
    }
   ]


  }
 },
 computed: {},
 methods: {


  openDialog() {
   this.isDialogVisible = true
  },
  closeDialog() {
   this.isDialogVisible = false

  },

 }

}
</script>

<style scoped>

.ff {

 font-weight: 500;
}

.dialog-overlay {
 border-radius: 10px;
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-color: rgba(0, 0, 0, 0.5);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 1000;
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

 color: #90FF00;;
 border: none;
 border-radius: 4px;
 cursor: pointer;
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

.fade-enter-active, .fade-leave-active {
 transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
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
 overflow: hidden; /* 确保图标不会超出边框 */
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
 width: auto; /* 保持图片的原始宽高比 */
 object-fit: contain; /* 确保图片完全显示 */
}

.textTips {
 font-size: 11px;
 font-weight: 500;
 color: #737373;
}
</style>

<style scoped>
.custom-slider-container {
 position: relative;
 width: 100%;
 padding-bottom: 20px; /* 为标签腾出空间 */
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
 font-size: 11px;
 font-weight: 500;

}

.slider-labels {
 position: absolute;
 width: 100%;
 top: 100%;
 left: 0;
 margin-top: -16px;
}

.slider-label {
 position: absolute;
 transform: translateX(-50%);
 font-size: 11px;
 font-weight: 500;
 color: #B3B3B3;
}
</style>