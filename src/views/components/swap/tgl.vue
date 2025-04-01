<template>
    <div class="icon-container" @click="toggleRotation" style="width: 15px; height: 7px;" >
      <img 
        :style="rotationStyle" 
        src="/src/assets/images/icon/icon_tgl.png" 
        style="width: 11px; height: 7px;"
        alt=""
      >
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isRotated: false
      }
    },
    computed: {
      rotationStyle() {
        return {
          transform: this.isRotated ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s'
        }
      }
    },
    methods: {
      rotateForward() {
        this.isRotated = true
      },
      rotateBack() {
        this.isRotated = false
      },
      toggleRotation() {
        this.isRotated = !this.isRotated
      }
    }
  }
  </script>
  
  <style scoped>
  .icon-container {
    display: inline-block;
    margin-left: 5px;
    cursor: pointer;
    width: 20px;  /* 调整为您的图标实际宽度 */
    height: 20px; /* 调整为您的图标实际高度 */
  }
  
  .icon-container img {
    width: 100%;
    height: 100%;
    display: block;
  }
  </style>