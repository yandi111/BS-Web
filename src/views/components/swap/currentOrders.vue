<template>
    <div 
      class="triangle-box" 
      :class="{ 'rotated': isRotated }" 
      @click="toggleRotation"
    >
      <img 
        style="width: 8px; height: 8px;" 
        src="@/assets/images/icon/icon_tgl.png" 
        alt="Triangle"
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
    mounted() {
      document.addEventListener('click', this.handleOutsideClick)
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleOutsideClick)
    },
    methods: {
      toggleRotation(event) {
        event.stopPropagation()
        this.isRotated = !this.isRotated
      },
      handleOutsideClick() {
        this.isRotated = false
      }
    }
  }
  </script>
  
  <style scoped>
  .triangle-box {
    margin-left: 28px;
    transition: transform 0.3s ease;
  }
  
  .triangle-box.rotated {
    transform: rotate(180deg);
  }
  </style>