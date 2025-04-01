<template>
  <div>
    <!-- <button @click="openDialog"></button> -->

    <transition name="fade">
      <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">

        <div class="flex jc" style="width: 484px ; height: 734px; position: relative;">

          <img style="width: 100%; height: 100%;" src="@/assets/images/Friend/phone.png" alt="">

          <div style="position: absolute; right: 16px; top: 24px;">
          <button @click="isDialogVisible = false" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>

        <div class="flex ic" style=" position: absolute; left: 21px; bottom: 119px;">
          <div style="width: 50px; height: 50px;"> <img style="width: 100%; height: 100%; background-color: #fff;" src="" alt=""></div>
          <div style="margin-left: 10px;">
            <div class="ff" style="font-size: 14px; font-weight: 500;">
              邀请码 9274565
            </div>
            <div class="ff" style="color:  #818181; font-size: 14px; margin-top: 6px;">加入BSEX 共同赚币</div>
          </div>
        </div>


        <div class="flex  ic jc ff " style="width: 120px; height: 39px; color: #000000; font-size: 14px; font-weight: 500; border-radius: 4px;
        position: absolute;
        bottom: 30px;
        background-color: #90FF00;
        cursor: pointer;
        ">保存图片</div>

        </div>





      </div>
    </transition>


  </div>
</template>

<script>

export default {

  components: {
    // UserTips

  },
  name: 'InvitePictures',
  data() {
    return {
      isDialogVisible: false,
    }

  },
  computed: {

  },
  // eslint-disable-next-line vue/return-in-computed-property
  mounted() { },
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