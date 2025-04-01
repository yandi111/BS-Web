<template>
    <div class="order-buttons">
      <div 
        class="order-button"
        :class="{ 'active': activeTab === 0 }"
        @click="orderList(0)"
      >
        <div>订单薄</div>
        <div v-if="activeTab === 0" class="underline"></div>
      </div>
      <div 
        class="order-button"
        :class="{ 'active': activeTab === 1 }"
        @click="orderList(1)"
      >
        <div>最新成交</div>
        <div v-if="activeTab === 1" class="underline"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      activeTab() {
        return this.$store.state.orderTab.activeTab
      }
    },
    methods: {
      orderList(index) {
        this.$store.dispatch('orderTab/setActiveTab', index)
        // 这里可以添加其他逻辑，比如触发父组件的方法等
      }
    },
    mounted(){

    },
  }
  </script>
  
  <style scoped>
  .order-buttons {
    display: flex;
    align-items: center;
  }
  
  .order-button {
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 500;
    color: #737373;
    cursor: pointer;
    position: relative;
  }
  
  .order-button:not(:first-child) {
    margin-left: 26px;
  }
  
  .order-button.active {
    color: #90FF00;
  }
  
  .underline {
    width: 18px;
    height: 2px;
    margin-top: 3px;
    background-image: url('@/assets/images/icon/lineB.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  </style>