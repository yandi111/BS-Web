<template>
 <div>
  <!-- <button @click="openDialog">打开对话窗</button> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525;">

     <div class="flex jb" style="padding-top: 17px; padding-bottom: 10px; padding-left: 17px; padding-right: 17px; ">
      <div class="ff" style="font-size: 14px; color: #FFFFFF; ">有效杠杆</div>
      <div>
       <button @click="isDialogVisible = false" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
         <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
       </button>
      </div>

     </div>
     <div class="con " style="padding-top: 10px;padding-left: 17px; padding-right: 17px;">


      <div
       style="font-family: PingFang SC;font-size: 13px;font-weight: 500; color:#FFFFFF; margin-top: 8px; margin-bottom: 10px;">
       <div style="height: 22px; line-height: 22px;"> 有效杠杆与总账户权益相关，与开仓杠杆不同 <br></div>
       <div style="height: 22px; line-height: 22px;"> 有效杠杆是根据，总账户权益来计算仓位真实 <br></div>
       <div style="height: 22px; line-height: 22px;">杠杆倍数，用户可以根据有效杠杆的大小来判断 <br></div>
       <div style="height: 22px; line-height: 22px;"> 与调整交易策略<br></div>
       <div style="height: 22px; line-height: 22px;"><br></div>
       <div style="height: 22px; line-height: 22px;"> 有效杠杆=当前持有的所有仓位总价值/该账户 <br></div>
       <div style="height: 22px; line-height: 22px;"> 的总账户权益<br></div>
       <div style="height: 22px; line-height: 22px;"><br></div>
       <div style="height: 22px; line-height: 22px;"> 当前持有的所有仓位总价值=(各仓位 合约张数 <br></div>
       <div style="height: 22px; line-height: 22px;"> 面值*而价)总和<br></div>

      </div>
     </div>
     <button @click="isDialogVisible = false" style=" border-top: 1px solid #252525;"
             class="confirm-button  flex jc ic">知道了
     </button>


    </div>
   </div>
  </transition>
 </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {GetClickBackHand} from "@/api/hy";

export default {
 components: {},
 name: 'SimpleDialogComponent2',
 data() {
  return {
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
   points: [0, 25, 50, 75, 100, 125],
   maxValue: 125,
   backhandData: {}
  }
 },
 computed: {
  ...mapGetters(['getToken']),
  fillWidth() {
   return `${(this.value / this.maxValue) * 100}%`
  },
  thumbPosition() {
   return `calc(${(this.value / this.maxValue) * 100}% - 11px)`
  }
 },
 methods: {
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
    this.value++
   }


  },
  toggleSelection() {
   this.isSecondSelected = !this.isSecondSelected
  },
  toggleSelection2() {
   this.isSecondSelected2 = !this.isSecondSelected2
  },
  openDialog(active) {
   this.isDialogVisible = true
   this.backhandData = active
  },
  closeDialog() {
   this.isDialogVisible = false
   this.$store.dispatch('orderTab/setActiveLeverNumber', this.value)
   this.SurplusLossPrice()
  },
  async SurplusLossPrice() { // 一键反手
   console.log(888);

   let parameter = {
    contractId: this.backhandData.contractId,
    depotStatus: null, // 持仓状态: 0：开仓, 1：平仓
    direction: null, //方向: 0：开多，1：开空
    id: this.backhandData.id,
    page: null, // **
    rows: null, // **
    tradeType: null,   //购买类型： 0：限价， 1：市价
   }

   Promise.try(async () => {
    return GetClickBackHand(JSON.stringify(parameter))
   }).then(() => {
    this.$customMessage(0, '一键反手成功')
   })

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
 border-top: 1px solid #252525;
 width: 100%;
 padding-top: 15px;
 padding-bottom: 15px;
 background: rgba(0, 0, 0, 0);

 color: #90FF00;;
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
</style>