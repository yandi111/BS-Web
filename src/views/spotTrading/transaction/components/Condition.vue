<!-- 条件 -->
<script>
import slider from "@/views/components/swap/slider.vue";

export default {
 components: {slider},
 data() {
  return {
   newCount: 0,
   isChecked: false
  }
 },
 methods: {
  usdtBtcOpen(e) {
   console.log(e)
  },
  toggleIcon() {
   this.isChecked = !this.isChecked;
   this.add.profitPrice = null
   this.add.lossPrice = null
  },
 }
}
</script>

<template>
 <div class="form flex">
  <div class="form_item">
   <p class="price flex">触发价格（USDT）</p>

   <div class="input flex">
    <el-input placeholder="委托价格（USDT）" />

    <el-select></el-select>
   </div>

   <div class="input flex">
    <el-input placeholder="请输入数量" />

    <el-select></el-select>
   </div>
  </div>

  <slider :newCount="newCount" @usdtBtcOpen="usdtBtcOpen" />

  <div @click="toggleIcon" class="check flex">
   <img v-if="isChecked" src='@/assets/images/icon/icon_check.png' alt="">
   <img v-else src='@/assets/images/icon/icon-circle-choice.png' alt="">
   <p>止盈/止损</p>
  </div>

  <el-button class="submit">买入BTC</el-button>
 </div>
</template>

<style scoped lang="scss">
.form {
 flex-direction: column;

 &_item {
  margin-bottom: 20px;
  flex-direction: column;
  .price {
   margin-bottom: 12px;
   align-items: center;
   justify-content: center;
   width: 100%;
   padding: 10px;
   border-radius: 4px;
   font: {
    size: 12px;
    weight: 500
   }
   color: #737373;
   background-color: #252525;
  }

  .input {
   &:not(:last-child) {
    margin-bottom: 10px;
   }
   ::v-deep {
    .el-input {
     margin-right: 5px;
     border-radius: 4px;
     input {
      background-color: #252525;
      border-color: #252525;
      border-radius: 4px;
     }
    }
   }
   .el-select {
    border-radius: 4px;
    background-color: #252525;
   }
  }
 }

 ::v-deep {
  .custom-slider-container {
   width: 90%;
   margin: auto;
  }
 }

 .check {
  margin: 12px 0 25px;
  align-items: center;
  cursor: pointer;

  img {
   margin-right: 5px;
   width: 18px;
  }
  p {
   font: {
    size: 12px;
    weight: 500;
   }
   color: #737373;
  }
 }

 .submit {
  width: 100%;
  padding: 12px 0;
  background-color: #0CBB57;
  border: none;
  transition: .3s;
  font: {
   size: 14px;
   weight: 600;
  }

  &:active {
   transform: scale(.9);
   background-color: #7ED6A4;
   transition: .3s;
  }
 }
}
</style>