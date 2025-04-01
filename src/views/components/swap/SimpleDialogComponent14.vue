<template>
 <div>
  <!-- <button @click="openDialog">打开对话窗</button> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525; width: 375px;">

     <div class="flex jb"
          style="padding-top: 17px; padding-bottom: 17px; padding-left: 17px; padding-right: 17px;  border-bottom:1px solid #252525; ">
      <div class="ff" style="font-size: 14px; color: #FFFFFF; ">


       <div class="flex">
        <div style=" height: 20px; line-height: 20px; margin-right: 5px;color: #FFFFFF">{{
          leverData.childCoinName
         }}{{ leverData.motherCoinName }} <span
          :style="{color:leverData.direction == 0 ? '#0fbb57' :'#ED3C2F'}">
                   {{ leverData.direction == 0 ? '多' : '空' }} </span>
        </div>
        <div
         style="color:#737373;  padding-right: 5px;  padding-left: 5px;  margin-right: 5px; height: 20px; line-height: 18px;  border-radius: 4px; border: 0.2px solid rgba(115, 115, 115, 0.5);font-size: 12px;">
         {{ leverData.depotType == 0 ? '逐仓' : '全仓' }}{{ leverData.depotMode == 0 ? '合仓' : '分仓' }}
        </div>

        <div @click="setLever(item)" class="flex jc ic"
             style="cursor: pointer; color:#737373;left: 5px; height: 20px; line-height: 20px; border-radius: 4px;  padding-left: 5px; padding-right: 5px;  margin-right: 5px;  border: 0.2px solid rgba(115, 115, 115, 0.5);font-size: 12px;">
         <div style="color:#737373">{{ leverData.multiple }}</div>
         <div class="flex jc ic" style="margin-left: 3px; width: 12px; height: 12px;"><img
          style="width: 100%; height: 100%;" src="@/assets/images/icon/icon-notes.png" alt=""></div>
        </div>
       </div>

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


     <div class="flex jb" style="padding-top: 17px; padding-bottom: 17px; padding-left: 17px; padding-right: 17px; ">
      <div class="ff" style="font-size: 12px; color:#737373;">市场价 <span style="color: #0CBB57;">{{
        marketPrice
       }}</span></div>
      <div></div>
     </div>
     <div class="flex jb"
          style="padding-top: 10px; padding-bottom: 17px; padding-left: 17px; padding-right: 17px;color: #FFFFFF; ">
      <div class="ff" style="font-size: 12px; color:#737373;">选择调整倍数</div>
      <div>当前：{{ leverData.multiple }}</div>
     </div>
     <!--  -->
     <div class="con " style="padding-top: 10px;padding-left: 17px; padding-right: 17px;">


      <div class="flex jb  ff" :style="{border: valueState ? '1px solid #90FF00' : '1px solid rgba(0,0,0,0)' }"
           style="padding:8px 10px; background-color: #252525; font-size:14px;border-radius: 4px; ">
       <div @click="setCount(0)" style="width: 20px; height: 20px;" @mouseover="isHovered = true"
            @mouseleave="isHovered = false">
        <img v-if="isHovered" src="@/assets/images/icon/icon_hovercircle_hover.png"
             style="width: 100%; height: 100%;"
             alt="">
        <img v-else src="@/assets/images/icon/icon_circle.png"
             style="width: 100%; height: 100%;"
             alt="">
       </div>
       <!-- <div style="color: #f0f0f0;"  >{{ Math.floor(value) }}x</div> -->
       <input
        @focus="valueState = true "
        @blur="valueState = false"
        @input="checkValue"
        style="caret-color: #90FF00;color: #f0f0f0; outline: none; background-color: #252525;color: #FFFFFF; border: none; text-align: center; "
        v-model="value" 
        
        type="text">

       <div @click="setCount(1)" style="width: 20px; height: 20px;" @mouseover="isAddHovered = true"
            @mouseleave="isAddHovered = false">
        <img v-if="isAddHovered" src="@/assets/images/icon/icon-circle-add-hover.png"
             style="width: 100%; height: 100%;"
             alt="">
        <img v-else src="@/assets/images/icon/icon-circle-add.png"
             style="width: 100%; height: 100%;"
             alt="">
       </div>
      </div>


      <div style="margin-top: 30px;">
       <sliderInfo :newCount="newCount" @usdtBtcOpen="usdtBtcOpen"/>
      </div>

      <div class="flex jb" style=" margin-top: 20px;">
       <div class="ff" style="font-size: 12px; color:#737373;">当前仓位保证金</div>
       <div style="color: #FFFFFF;">{{ leverData.earnestMoney }} USDT</div>
      </div>
      <div class="flex jb" style="margin-top: 5px;">
       <div class="ff" style="font-size: 12px; color:#737373;">调整后保证金</div>
       <div style="color: #FFFFFF;">{{ bondNew ? $toTwoDecimals(bondNew) : '--' }} USDT</div>
      </div>

      <button @click="closeDialog" style="" class="confirm-button"><span style="width: 100%;color: #252525;">确定</span>
      </button>

     </div>


    </div>
   </div>
  </transition>
 </div>
</template>

<script>
import sliderInfo from './sliderInfo.vue';
import {mapMutations, mapGetters} from 'vuex';
import {UpdateDepot} from "@/api/hy";

export default {
 components: {sliderInfo},
 name: 'SimpleDialogComponent2',
 data() {
  return {
   valueState: false,
   newCount: null,
   count: 0,
   isHovered: false,
   isAddHovered: false,
   isDialogVisible: false,
   selectedIndex: 1, // 默认选中第二个盒子
   isSecondSelected: true,// 默认选中第二个盒子
   isSecondSelected2: true, // 默认选中第二个盒子
   value: 0,
   isDragging: false,
   showTooltip: false,
   points: [],
   maxValue: null,
   leverData: {},
   initInfo: {},
   holdAmount: null,
   marketPrice: null,
   denominatedType: null  // == 2 子币 否则为母币
  }
 },
 computed: {
  ...mapGetters(['getToken', 'getSelectedCurrency', 'getMultiple']),
  fillWidth() {
   return `${(this.value / this.maxValue) * 100}%`
  },
  thumbPosition() {
   return `calc(${(this.value / this.maxValue) * 100}% - 11px)`
  },

  typeBUInfo() {
   return this.getSelectedCurrency; // 如果没有选择，显示默认文本
  },
  // eslint-disable-next-line vue/return-in-computed-property
  usdtBtcBond() {   // 保证金 计算:
   // 保证金 计算:
   // u 数量/杠杆倍数
   // B 数量*价格/杠杆倍数
   if (this.denominatedType == 2) {  // btc
    return this.holdAmount / 1 * (this.marketPrice / 1) / (this.value | 0) / 1
   } else {
    return (this.holdAmount / 1) / (this.value | 0) / 1
   }
  },
  bondNew() {
   if (this.value && this.value > 0) {
    return this.leverData.unfinishedHoldAmountMotherCoin / this.value
    // if (this.typeBUInfo == 'USDT' ) {
    //   return  this.leverData.unfinishedHoldAmountMotherCoin/this.value
    // }else{
    //   return  this.leverData.unfinishedHoldAmount/this.value
    // }
   } else {
    return '--'
   }
  }


 },

 methods: {
  ...mapMutations([
   'setMultiple',
  ]),
//   checkValue() {
//    if (this.value > this.getMultiple) this.value = this.getMultiple

//    this.newCount = this.value
//   },

checkValue() {
  // 只在输入框失去焦点时进行限制
  console.log( 'this.valuethis.value--------------- ' ,this.value , this.getMultiple,);
  


this.value = Number(this.value)

// 确保 value 不超过 getMultiple
if (this.value > this.getMultiple) {
  this.value = this.getMultiple;
}
  this.newCount = this.value;
},

  usdtBtcOpen(value) {
     this.value = Math.floor(value)
    
  },


  setLever(item) {
   this.value = item.multiple
  },

  startDrag(event) {
   this.isDragging = true
   this.updateValue(event)
   document.addEventListener('mousemove', this.drag)
   document.addEventListener('mouseup', this.stopDrag)
  },

  drag(event) {
   if (this.isDragging) {
    this.updateValue(event)
   }
  },

  stopDrag() {
   this.isDragging = false
   document.removeEventListener('mousemove', this.drag)
   document.removeEventListener('mouseup', this.stopDrag)
  },
  updateValue(event) {
   const sliderRect = this.$refs.slider.getBoundingClientRect()
   let newValue = ((event.clientX - sliderRect.left) / sliderRect.width) * this.maxValue
   newValue = Math.max(0, Math.min(this.maxValue, newValue))
   this.value = newValue
   this.$emit('input', this.value)
  },
  setCount(active) {
   if (active === 0) {
    if (this.value > 0) {
     this.value--
    } else if (this.value === 0) {
     this.value = 0
    }
   }
   if (active === 1) {
    // eslint-disable-next-line no-cond-assign
    if (this.value === this.maxValue || this.value > this.maxValue) return
    this.value++
   }
  },

  toggleSelection() {
   this.isSecondSelected = !this.isSecondSelected
  },
  toggleSelection2() {
   this.isSecondSelected2 = !this.isSecondSelected2
  },

  openDialog(active, initInfo) {
     console.log("activeinitInfo-000-----",active, initInfo);
     
   this.initInfo = initInfo
   this.maxValue = initInfo.multiples
   this.value = active.multiple
   let pionsItem = this.generatePoints(initInfo.multiples)
   this.points = pionsItem
   this.leverData = active
   this.marketPrice = active.marketPrice
   this.holdAmount = active.holdAmount //持仓数量
   console.log(active, 'this.denominatedType');

   this.denominatedType = active.denominatedType // == 2 子币


   this.isDialogVisible = true
  },


  generatePoints(maxValue) {
   const points = [];
   const step = maxValue / 5; // 计算每一步的值

   for (let i = 0; i <= 5; i++) {
    points.push(i * step); // 将每一步的值推入数组
   }
   return points;
  },

  async SurplusLossPrice() {
   let parameter = {
    id: this.leverData.id,
    multiple: this.value,
    // stopLossAmount: , // 止损数量
    stopLossPrice: this.leverData.stopLossPrice, //止损价格
    // takeProfitAmount: ,
    takeProfitPrice: this.leverData.stopSurplus,
    type: 1,
   }

   Promise.try(async () => {
    return await UpdateDepot(JSON.stringify(parameter))
   }).then(() => {
    this.$customMessage(0, '杠杆修改成功')
   })

   this.isDialogVisible = false
  },

  closeDialog() {
   this.SurplusLossPrice()
   this.isDialogVisible = false
  },

  selectItem(index) {
   this.selectedIndex = index
  },

  getBoxStyle(index) {
   let style = {
    padding: '5px 70px',
    borderRadius: '4px',
    marginRight: index < this.items.length - 1 ? '5px' : '0',
    position: 'relative'
   };

   style.bodder = this.selectedIndex === index ? '1px solid #90FF00' : '1px solid #737373'

   return style;
  }
 }

}
</script>

<style scoped>
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
 background-color: #1B1B1B;
 border-radius: 4px;
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
 margin-top: 30px;
 margin-bottom: 15px;
 width: 100%;
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
 padding: 5px 70px;
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
 margin-top: -16px
}

.slider-label {
 position: absolute;
 transform: translateX(-50%);
 font-size: 11px;
 font-weight: 500;
 color: #B3B3B3;
}
</style>