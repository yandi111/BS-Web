<template>
 <div>
  <!-- <button @click="openDialog">打开对话</button> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525; width: 375px;">

     <div class="flex "
          style="padding-top: 17px; padding-bottom: 17px; padding-left: 17px; padding-right: 17px;  border-bottom:1px solid #252525; ">
      <div class="ff" style="font-size: 14px; color: #FFFFFF; ">调整保证金{{
        bondList.childCoinName
       }}{{ bondList.motherCoinName }} <span :style="{color: bondList.direction == '0' ? '#0CBB57':'#ED3C2F' } "
       >{{ bondList.direction == '0' ? '开多' : '开空' }}   </span></div>
      <div class="flex jc ic"
           style="font-family: PingFang SC;font-size: 12px;font-weight: 400; font-size:12px;color:#737373; border: 1px solid #494949; border-radius: 4px; padding-left: 5px; padding-right: 5px; margin-left: 5px; ">
       {{ bondList.depotType == 0 ? '逐仓' : '全仓' }}{{ bondList.depotMode == 0 ? '合仓' : '分仓' }}
      </div>
      <div class="flex jc ic"
           style="font-family: PingFang SC;font-size: 12px;font-weight: 400; font-size:12px;color:#737373; border: 1px solid #494949; border-radius: 4px; padding-left: 5px; padding-right: 5px; margin-left: 4px; ">
       {{ bondList.multiple }}X
      </div>


      <div>
       <button @click="isDialogVisible = false" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
         <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
       </button>
      </div>

     </div>

     <div style="padding-left: 16px; padding-right: 11px;">
      <div class="flex" style="margin-bottom: 20px;">
       <div
        @click="toggleSelection(0)"
        :class="['box', 'flex', 'jc', 'ic', { 'selected': isSecondSelected == 0 }]"
        style="color: #737373; font-size: 14px;"
       >
        增加保证金
        <img v-if="isSecondSelected == 0" class="selected-icon" src="@/assets/images/icon/icon_Click.png"
             alt="Selected">
       </div>
       <div
        @click="toggleSelection(1)"
        :class="['box', 'flex', 'jc', 'ic', { 'selected':  isSecondSelected  == 1}]"
        style="padding-left: 37px !important; padding-right: 37px !important; font-size: 14px;color: #737373"
       >
        减少保证金
        <img v-if="isSecondSelected == 1" class="selected-icon" src="@/assets/images/icon/icon_Click.png"
             alt="Selected">
       </div>
      </div>
     </div>

     <div style="padding-left:16px ; padding-right: 16px;">


      <div class="flex" style="width: 100%; margin-top: 10px;">
       <div style="width: 100%; border: 1px solid rgba(0, 0, 0, 0); ">
        <div :style="containerStyle1"
             style="margin-top: 8px; display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;">
         <input
          @focus="setFocus(true)"
          @blur="setFocus1(false)"
          v-model="bondData"
          @input="bondDataStateFun"
          style="color: #FFFFFF; padding-left: 2px; padding-right: 2px; padding-top: 5px; padding-bottom: 5px; caret-color: #90FF00; border: 1px solid rgba(0, 0, 0, 0); background: #252525; text-align: center; flex: 1;"
          placeholder="保证金"
          type="text"
         >
         <div style="height: 15px; width: 1px; background-color: #737373; position: absolute; right: 42px;"></div>
         <div style="color: #666; font-size: 12px; position: absolute; right: 5px; font-weight: 500; ">USDT</div>
        </div>

       </div>

      </div>


     </div>

     <div class="con " style="padding-top: 10px;padding-left: 17px; padding-right: 17px;">


      <div class="flex" style="width: 100%;">
       <div class="flex jc ic percent-box" :class="{ 'active': activeIndex === 0 }" @click="toggleActive(0,10)"
            style="padding-top:3px; padding-bottom: 3px; width: 20%; border-radius: 4px; margin-right: 8px;color: #737373;font-family: PingFang SC;font-size: 12px;font-weight: 400; border: 0.2px solid #252525; ">
        10%
       </div>
       <div class="flex jc ic percent-box" :class="{ 'active': activeIndex === 1 }" @click="toggleActive(1,20)"
            style="padding-top:3px; padding-bottom: 3px; width: 20%; border-radius: 4px; margin-right: 8px;color: #737373;font-family: PingFang SC;font-size: 12px;font-weight: 400; border: 0.2px solid #252525; ">
        20%
       </div>
       <div class="flex jc ic percent-box" :class="{ 'active': activeIndex === 2 }" @click="toggleActive(2,50)"
            style="padding-top:3px; padding-bottom: 3px; width: 20%; border-radius: 4px; margin-right: 8px;color: #737373;font-family: PingFang SC;font-size: 12px;font-weight: 400; border: 0.2px solid #252525; ">
        50%
       </div>
       <div class="flex jc ic percent-box" :class="{ 'active': activeIndex === 3 }" @click="toggleActive(3,80)"
            style="padding-top:3px; padding-bottom: 3px; width: 20%; border-radius: 4px; margin-right: 8px;color: #737373;font-family: PingFang SC;font-size: 12px;font-weight: 400; border: 0.2px solid #252525; ">
        80%
       </div>
       <div class="flex jc ic percent-box" :class="{ 'active': activeIndex === 4 }" @click="toggleActive(4,100)"
            style="padding-top:3px; padding-bottom: 3px; width: 20%; border-radius: 4px; color: #737373;font-family: PingFang SC;font-size: 12px;font-weight: 400; border: 0.5px solid #252525; ">
        100%
       </div>
      </div>

      <div class="flex ic jb" style="margin-top: 15px;">
       <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;">最多可<span
        v-if="isSecondSelected == 0" style="font-size: 12px;color: #737373">增加</span><span style="font-size: 12px; color: #737373" v-if="isSecondSelected == 1">减少</span>保证金
       </div>
       <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF; ">{{
         isSecondSelected == 0 ? formatNumbertoFixedTwo(getUsableAmount) : bondList.alterEarnestMoney > 0 ? bondList.alterEarnestMoney : '0.00'
        }} USTD
       </div>
      </div>
      <div class="flex ic jb" style="margin-top: 15px;">
       <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;">保证余额</div>
       <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF; ">{{
        isSecondSelected == 0  ?  bondDataInfo : bondDataState
        }}
        USTD
       </div>
      </div>
      <div class="flex ic jb" style="margin-top: 15px;">
       <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;">开仓保证金</div>
       <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF; ">
        {{ formatNumbertoFixedTwo(bondList.earnestMoney) }} USTD
       </div>
      </div>
      <div class="flex ic jb" style="margin-top: 15px;">
       <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;">预估强平价</div>
       <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF; ">
        {{ formatNumbertoFixedTwo(bondList.estimateForcedCloseDepotPrice) }} USTD
       </div>
      </div>
      <button @click="closeDialog" class="confirm-button">确定</button>
     </div>


    </div>
   </div>
  </transition>
 </div>
</template>

<script>
import slider2 from './slider2.vue';
import tgl from './tgl.vue';
import {mapGetters} from 'vuex';
import {UpdateDepot} from "@/api/hy";

export default {
 // eslint-disable-next-line vue/no-unused-components
 components: {slider2, tgl},
 name: 'SimpleDialogComponent7',
 data() {
  return {
   activeIndex: null,
   isFocused: false,
   isFocused1: false,
   isDialogVisible: false,
   selectedIndex: 1, // 默认选中第二个盒子
   isSecondSelected: 0,// 默认选中第二个盒子
   bondList: {},
   bondData: null,
   toggleStatus: 0,
   activeState:null
  }
 },
 computed: {
  ...mapGetters(['getUsableAmount', 'getToken', 'getSelectedCurrency']),
  typeBUInfo() {
   return this.getSelectedCurrency; // 如果没有选择，显示默认文本
  },
  containerStyle() {
   return {
    border: this.isFocused ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)',
    background: '#252525'
   }
  },
  containerStyle1() {
   return {
    border: this.isFocused1 ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)',
    background: '#252525'
   }
  },
 },
 methods: {
  toggleActive(index, active) {
     this.activeState =active
   this.activeIndex = this.activeIndex === index ? null : index 

   if (this.isSecondSelected == 0 ) {
     this.bondData = this.formatNumbertoFixedTwo(this.getUsableAmount / 100 * active) || 0
     this.bondDataInfo =  this.formatNumbertoFixedTwo(this.getUsableAmount / 100 * active) || 0
   }else {

     this.bondData = this.formatNumbertoFixedTwo(this.bondList.alterEarnestMoney / 100 * active) || 0

     this.bondDataState =  this.formatNumbertoFixedTwo(this.bondList.alterEarnestMoney / 100 * active) || 0
   }
  },
  setFocus(focused) {
   this.isFocused = focused
   this.bondData = null
   this.activeIndex = null

   this.bondDataInfo = null
   this.bondDataState = null
  },
  setFocus1(focused) {

   this.isFocused1 = focused
  },

  toggleSelection(index) {

     this.activeIndex = 5
   this.toggleStatus = index
   this.isSecondSelected = index

   console.log(this.bondList.alterEarnestMoney,'this.bondList.alterEarnestMoney');
   

   if (index == 0 ) {
          this.bondData =  null
          this.bondDataInfo =  this.formatNumbertoFixedTwo(this.getUsableAmount) 
     }else{
          this.bondData =  null
          this.bondDataState =  0

     }
  },

  bondDataStateFun(event){
     if (this.isSecondSelected == 0 ) {
          
          this.bondDataInfo = event.target.value;
     }else {
          this.bondDataState = event.target.value;
     }
  },

  openDialog(active) {
     this.activeIndex = 5
     this.bondData =  null

     if (this.isSecondSelected == 0 ) {
          this.bondDataInfo =  this.formatNumbertoFixedTwo(this.getUsableAmount) 
     }else{
          this.bondDataState =  0
     }
   this.bondList = active
   this.isDialogVisible = true
  },
  closeDialog() {
   this.isDialogVisible = false
   this.SurplusLossPrice()
  },
  removeThous(numberString) {
   // 使用正则表达式替换所有的逗号
   return numberString.replace(/,/g, '');
  },
  async SurplusLossPrice() {
   let bondDataInfo = this.removeThous(this.bondData)

   let parameter = {
    id: this.bondList.id,
    earnestMoney: +this.toggleStatus === 1 ? -bondDataInfo : bondDataInfo,
    // stopLossAmount: , // 止损数量
    stopLossPrice: this.bondList.stopLossPrice, //止损价格
    // takeProfitAmount: ,
    takeProfitPrice: this.bondList.stopSurplus,
    type: 3,
   }

   try {
    const res = await UpdateDepot(JSON.stringify(parameter))
    if (res.code == 200) {
     this.$customMessage(0, '保证金修改成功')
    } 
   } catch (e) {
    this.$customMessage(2, '保证金修改失败')
   }

   this.isDialogVisible = false
  },

  selectItem(index) {
   this.selectedIndex = index
  },
  getBoxStyle(index) {
   var style = {
    padding: '5px 70px',
    borderRadius: '4px',
    marginRight: index < this.items.length - 1 ? '5px' : '0',
    position: 'relative'
   };

   if (this.selectedIndex === index) {
    style.border = '1px solid #90FF00';
   } else {
    style.border = '1px solid #737373';
   }

   return style;
  },
  formatNumbertoFixedTwo(num) {
   // 确保输入是数字
   if (num === null || num === undefined || isNaN(num)) {
    return null; // 或者返回一个默认值
   }

   // 将数字转换为字符串并分割整数部分和小数部分
   const parts = Number(num).toFixed(2).split('.');

   // 使用正则表达式为整数部分添加千分位逗号
   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

   // 返回格式化后的字符串
   return parts.join('.');
  },

 }
}
</script>

<style scoped>
input:focus {
 outline: none
}

.ff {
 font-weight: 500;
}

.cof {
 color: #FFFFFF;
}

.parent-component {
 padding: 20px;
}

.dialog-overlay {
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
 width: 370px;
 background-color: #1B1B1B;
 border-radius: 4px;
 position: relative;
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
 width: 100%;
 /* padding-left: 158px;
 padding-right: 158px; */
 margin-top: 20px;
 margin-bottom: 15px;
 padding-top: 10px;
 padding-bottom: 10px;
 background: #90FF00;

 color: #252525;
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
 /* padding: 5px 54px; */
 padding-top: 5px;
 padding-bottom: 5px;
 width: 50%;
 border-radius: 4px;
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
 font-family: PingFang SC;
 font-size: 11px;
 font-weight: 500;
 color: #737373;
}

.percent-box {
 transition: all 0.3s ease;
}

.active {
 color: #FFFFFF !important;
 border-color: #737373 !important;
}
</style>