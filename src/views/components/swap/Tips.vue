<!-- Tips.vue -->
<template>
    <transition name="fade">
      <div v-if="visible" class="tips-container">
        <div class="tips-content">
          <img src="@/assets/images/icon/icon-success.png" alt="成功" class="tips-icon">
          <span class="tips-text">{{ message }}</span>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        timer: null
      }
    },
    methods: {
      show(message, duration = 3000) {
        this.message = message
        this.visible = true
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.visible = false
        }, duration)
      }
    }
  }
  </script>
  
  <style scoped>
  .tips-container {
    position: fixed;
    top: 180px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
  
  .tips-content {
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 30px;
    padding-right: 96px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    border: 0.5px solid #252525
  }
  
  .tips-icon {
    width: 20px;
    height: 20px;
  }
  
  .tips-text {
    font-size: 14px;
    margin-left: 20px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>