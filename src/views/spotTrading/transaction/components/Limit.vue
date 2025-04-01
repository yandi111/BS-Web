<!-- 限价 -->
<script>
import slider from "@/views/components/swap/slider.vue";
import {HandleOrder} from "@/api/spotTrading";

export default {
 props: {
  info: {
    type: Array,
    default: () => []
  },
  tabsType: {
   type: Number,
   default: 1
  },
  getCoins: {
   type: Object,
   default: () => {}
  }
 },
 components: {slider},
 data() {
  return {
   newCount: 0,
   isChecked: false,
   loading: false,

   ruleForm: {
    orderPrice: '',
    orderNumber: '',
    orderSymbolBaseType: 0
   },



   rules: {
    coinsId: [{required: true, message: '请选择交易对', trigger: 'change'}],
   }
  }
 },
 mounted() {
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

  async onSubmit() {
   this.loading = true

   let ruleForm = {}

   for (let i in this.ruleForm) {
    if (i === 'orderNumber') {
      ruleForm[this.ruleForm.orderSymbolBaseType === 0 ? 'orderTotal' : 'orderNumber'] = this.ruleForm[i]
    } else {
      ruleForm[i] = this.ruleForm[i]
    }
   }

   try {
    const res = await HandleOrder({
      orderType: this.tabsType,
      coinsId: this.getCoins.id,
      commissionType: 2,
      conditionalLimitOrMarket: 2,
      ...ruleForm
    })
    this.$message.success('操作成功')
   } catch (err) {

   }
   this.loading = false
  }
 }
}
</script>

<template>
 <el-form class="form flex" v-loading="loading">
  <el-form-item prop="orderPrice">
   <el-input v-model="ruleForm.orderPrice" :placeholder="`价格(${info[0].coinName || ''})`" />
  </el-form-item>

  <el-form-item>
   <el-input class="input" v-model="ruleForm.orderNumber" placeholder="请输入数量" />

   <el-select v-model="ruleForm.orderSymbolBaseType">
    <el-option v-for="(item, index) of info" :key="index" :label="item.coinName" :value="item.coinType" />
   </el-select>
  </el-form-item>

  <slider :newCount="newCount" @usdtBtcOpen="usdtBtcOpen" />

  <div @click="toggleIcon" class="check flex">
   <img v-if="isChecked" src='@/assets/images/icon/icon_check.png' alt="">
   <img v-else src='@/assets/images/icon/icon-circle-choice.png' alt="">
   <p>止盈/止损</p>
  </div>

  <el-button class="submit" @click="onSubmit">买入BTC</el-button>
 </el-form>
</template>

<style scoped lang="scss">
.form {
 flex-direction: column;

 ::v-deep {
  .el-form-item {
   .el-form-item__content {
    display: flex;
    align-items: center;
   }
  }
  .el-input {
   border-radius: 4px;

   &.input {
    margin-right: 5px;
   }
   input {
    text-align: center;
    color: #f0f0f0;
    background-color: #252525;
    border-color: #252525;
   }
  }
 }
 .el-select {
  border-radius: 4px;
  background-color: #252525;
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