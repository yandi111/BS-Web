<!-- 当前委托 -->
<script>
import currentTable from './components/currentTable.vue';

export default {
 components: {
  currentTable
 },
 data() {
  return {
   commissionType: 2,

   limit: 0,
   market: 0
  }
 },
 created() {
  this.getList()
 },
 methods: {
  onLength(type, length) {
   if (type === 2) this.limit = length
   if (type === 1) this.market = length
  }
 }
}
</script>

<template>
 <div class="table flex">
  <div class="tabs flex">
   <a @click="commissionType = 2" :class="[commissionType === 2 && 'active', 'flex']">限价委托({{ limit }})</a>
   <a @click="commissionType = 1" :class="[commissionType === 1 && 'active', 'flex']">市价委托({{ market }})</a>
  </div>

  <!-- 市价 -->
  <currentTable v-show="commissionType === 1" @onLength="onLength" :commissionType="1" />

  <!-- 限价 -->
  <currentTable v-show="commissionType === 2" @onLength="onLength" :commissionType="2" />
 </div>
</template>

<style scoped lang="scss">
.table {
 flex-direction: column;

 .tabs {
  margin-bottom: 15px;
  align-items: center;

  a {
   &.active {
    color: rgba(244, 244, 244, 1);
   }
   &:not(:last-child) {
    margin-right: 10px;
   }
   align-items: center;
   justify-content: center;
   width: 84px;
   height: 24px;
   border-radius: 4px;
   background-color: #252525;
   color: #737373;
   transition: .3s;
   font: {
    size: 12px
   }

   &:hover {
    color: #f0f0f0;
    transition: .3s;
   }
  }
 }
}
</style>