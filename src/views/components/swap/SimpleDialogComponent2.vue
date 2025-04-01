<template>
 <div>
  <!-- <button @click="openDialog">打开对话窗</button> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525;">

     <div class="flex jb"
          style="padding-top: 17px; padding-bottom: 17px; padding-left: 17px; padding-right: 17px;  border-bottom:1px solid #252525; ">
      <div class="ff" style="font-size: 14px; color: #FFFFFF; ">{{$t('杠杆调整')}}</div>
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
        v-model="value" type="text">

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
      <div style="margin-top: 24px;">


       <sliderInfoList :newCount="value" @usdtBtcOpen="usdtBtcOpen" />  
     


      </div>
      <div class="textTips" style="margin-top: 8px;">{{$t('杠杆调整将同时影响当前仓位和挂单的杠杆')}}</div>
      <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color:#B3B3B3; margin-top: 8px;">
       *{{$t('选择超过[10x]杠杆交易会增加强行平仓风险，请注意相关风险，更')}}<br>
       {{$t('多信息请')}} <span style="color:#90FF00; cursor: pointer;">{{$t('参考这里。')}}</span>
      </div>

      <button @click="closeDialog" style="" class="confirm-button">{{$t('lang_345')}}</button>

     </div>


    </div>
   </div>
  </transition>
 </div>
</template>

<script>
import slider2 from './slider2.vue';
import {mapMutations, mapGetters} from 'vuex';
import {UpdateDepot} from "@/api/hy";
import sliderInfoList from './sliderInfoList.vue';

export default {
 // eslint-disable-next-line vue/no-unused-components
 components: {slider2,sliderInfoList},
 name: 'SimpleDialogComponent2',
 data() {
  return {
   valueState: false,
   count: 0,
   isHovered: false,
   isAddHovered: false,
   isDialogVisible: false,
   selectedIndex: 1, // 默认选中第二个盒子
   isSecondSelected: true,// 默认选中第二个盒子
   isSecondSelected2: true, // 默认选中第二个盒子
   value: 125,
   isDragging: false,
   showTooltip: false,
   points: [0, 25, 50, 75, 100, 125],
   maxValue: 125,
   leverData: {},
   newCount:null
  }
 },
 computed: {
  ...mapGetters(['getToken']),

 
 },
 methods: {
  ...mapMutations([
   'setMultiple',
  ]),



     usdtBtcOpen(value) {
       this.value = Math.floor(value)
       console.log(value,'value----------88888');
      },



  checkValue() {

   
   if (this.value > 125) {
    this.value = 125; // 如果大于125，则设置为125
   }
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
    if (this.value == 125) {
     this.value = 125
    } else {
     this.value++
    }
   }


  },
 
  openDialog(active) {
   console.log(active);

   this.value = active

   // this.leverData = active
   this.isDialogVisible = true
  },

 


  

  closeDialog() {
   // this.SurplusLossPrice()
   // this.isDialogVisible = false
   // this.$store.dispatch('orderTab/setActiveLeverNumber', this.value)
   this.setMultiple(this.value)
   this.isDialogVisible = false

  },


 },
 watch:{
     value:{
          handler(val,old){
               console.log('watch value',val);
          },
          immediate:true
     }
 }

}
</script>

<style scoped>
.ff {
 font-weight: 500;
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

h2 {
 color: #333;
 margin-bottom: 15px;
}

p {
 margin-bottom: 20px;
}

.selected-icon img {
 height: 30px;
 width: 30px;
}

.textTips {
 font-size: 11px;
 font-weight: 500;
 color: #737373;
}
</style>