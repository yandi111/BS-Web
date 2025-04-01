<template>
  <div >
    <!-- <button @click="openDialog">打开对话窗</button> -->

    <transition name="fade">
      <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
        <div class="dialog-content" style="border:1px solid #252525;">
          
          <div class="flex " style="padding-top: 17px; padding-bottom: 17px; padding-left: 17px; padding-right: 17px;  border-bottom:1px solid #252525; ">
            <div class="ff" style="font-size: 14px; color: #FFFFFF; " >止盈止损 NOTUSDT  <span style="color:#ED3C2F; ;" >平空</span> </div>
            <div class="flex jc ic" style="font-family: PingFang SC;font-size: 12px;font-weight: 400; font-size:12px;color:#737373; border: 1px solid #494949; border-radius: 4px; padding-left: 5px; padding-right: 5px; margin-left: 5px; ">逐仓合仓</div>
            <div class="flex jc ic" style="font-family: PingFang SC;font-size: 12px;font-weight: 400; font-size:12px;color:#737373; border: 1px solid #494949; border-radius: 4px; padding-left: 5px; padding-right: 5px; margin-left: 4px; ">10X</div>
           
        

            <div><button @click="closeDialog" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
          </button></div>

          </div>

          <div style="padding-left: 16px; padding-right: 11px;" > 
            <div class="flex" style="margin-bottom: 20px;">
              <div 
                @click="toggleSelection"
                :class="['box', 'flex', 'jc', 'ic', { 'selected': !isSecondSelected }]"
              >
              止止盈/止损
                <img v-if="!isSecondSelected" class="selected-icon" src="@/assets/images/icon/icon-Click.png" alt="Selected">
              </div>
              <div 
                @click="toggleSelection"
                :class="['box', 'flex', 'jc', 'ic', { 'selected': isSecondSelected }]"
                style="padding-left: 37px !important; padding-right: 37px !important; "
              >
              仓位止止盈止损
                <img v-if="isSecondSelected" class="selected-icon" src="@/assets/images/icon/icon-Click.png" alt="Selected">
              </div>
           </div>
          </div>

        <div style="padding-left:16px ; padding-right: 16px;">
           <div class="flex" >
            <div style="flex:1; padding-left: 16px; padding: 10px;">
              <div  style="font-family: PingFang SC;font-size: 11px;font-weight: 500;color:#737373" >开仓均价(USDT）</div>
              <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500; font-size: 13px; color: #FFFFFF;" >56,622.8</div>
            </div>
            <div style="flex:1; padding-left: 16px;padding: 10px;">
              <div  style="font-family: PingFang SC;font-size: 11px;font-weight: 500;color:#737373" >市场价</div>
              <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500; font-size: 13px; color: #FFFFFF;" >56,622.8</div>
            </div>
            <div style="flex:1; padding-left: 16px;padding: 10px;">
              <div  style="font-family: PingFang SC;font-size: 11px;font-weight: 500;color:#737373" >预估强平价</div>
              <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500; font-size: 13px; color: #FFFFFF;" >56,622.8</div>
            </div>
           </div>

          </div>
 <div style="padding-left:16px ; padding-right: 16px;">
   <div class="flex" style="width: 100%;" >
     
            <div style="width: 50%;">
              <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px;margin-left: 5px;">止盈</div>
              <div class="flex" style="margin-top: 8px;position: relative; " >
                <input  @focus="$event.target.style.border = '0.5px solid #90FF00'" @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)' " style="padding-top: 5px; width: 100%; padding-bottom: 5px; caret-color: #90FF00;margin-right: 4px;border: 0.5px solid rgba(0, 0, 0, 0); border-radius: 4px; background: #252525;  text-align: center;" placeholder="止盈" type="text"> 
              </div>
            </div>

       <div style="width: 50%; ">
              <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px; margin-left: 5px;">盈亏</div>

          <div :style="containerStyle" 
            style=" border: 0.5px solid rgba(0, 0, 0, 0); margin-top: 8px; display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;" >
           <input
             @focus="setFocus(true)"
             @blur="setFocus(false)"
             style="padding-left: 2px; padding-right: 2px; padding-top: 5px; padding-bottom: 5px; caret-color: #90FF00; border: none; background: #252525; text-align: center; flex: 1;color: #ED3C2F;"
             placeholder="盈亏"
             type="text"
            > 
              <div style="height: 15px; width: 1px; background-color: #737373; position: absolute; right: 42px;"></div>
             <div style="color: #666; font-size: 12px; position: absolute; right: 5px;">USDT</div>
         </div>
             
      </div>

   </div>
   <!-- -------------- -->

   <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500;color: #737373; margin-top: 10px; margin-bottom: 18px;" >当标记价格触达6,588.00时,将会触发市价止盈委托平仓当前仓当位。<br>
    预期盈亏为<span style="color: #ED3C2F;" >-38.29USDT。</span></div>


  
<div class="flex" style="width: 100%;" >
  <div style="width: 50%;">
              <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px;margin-left: 5px;">止损</div>
              <div class="flex" style="margin-top: 8px;position: relative; " >
                <input  @focus="$event.target.style.border = '0.5px solid #90FF00'" @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)' " style="padding-top: 5px; width: 100%; padding-bottom: 5px; caret-color: #90FF00;margin-right: 4px;border: 0.5px solid rgba(0, 0, 0, 0); border-radius: 4px; background: #252525;  text-align: center;" placeholder="价格" type="text"> 
              </div>
            </div>
     
<div style="width: 50%; ">
  <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px; margin-left: 5px;">盈亏</div>

   <div :style="containerStyle1" 
     style=" border: 0.5px solid rgba(0, 0, 0, 0); margin-top: 8px; display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;" >
    <input
      @focus="setFocus1(true)"
      @blur="setFocus1(false)"
      style="padding-left: 2px; color: #0CBB57;padding-right: 2px; padding-top: 5px; padding-bottom: 5px; caret-color: #90FF00; border: none; background: #252525; text-align: center; flex: 1;"
      placeholder="盈亏"
      type="text"
     > 
       <div style="height: 15px; width: 1px; background-color: #737373; position: absolute; right: 42px;"></div>
      <div style="color: #666; font-size: 12px; position: absolute; right: 5px;">USDT</div>
     </div>
      
  </div>
  </div>

  <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500;color: #737373; margin-top: 10px;" >当标记价格触达6,588.00时,将会触发市价止盈委托平仓当前仓当位。<br>
    预期盈亏为<span style="color: #0CBB57;" >-38.29USDT。</span></div>
        <div class="con " style="padding-top: 10px;padding-left: 17px; padding-right: 17px;" >
 </div>
</div>
        <button  @click="closeDialog" class="confirm-button">确定</button> 
         
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import slider from './slider.vue';
import tgl from './tgl.vue';
export default {
  components: { slider,tgl },
  name: 'SimpleDialogComponent3',
  data() {
    return {
      isFocused: false,
      isFocused1: false,
      isDialogVisible: false,
      selectedIndex: 1, // 默认选中第二个盒子
      isSecondSelected: true ,// 默认选中第二个盒子
      isSecondSelected2: true // 默认选中第二个盒子
    }
  },
  computed: {
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
  }
},
  methods: {
    setFocus(focused) {
    this.isFocused = focused
  },
  setFocus1(focused) {
    this.isFocused1 = focused
  },
    toggleSelection() {
    this.isSecondSelected = !this.isSecondSelected
  },
    toggleSelection2() {
    this.isSecondSelected2 = !this.isSecondSelected2
  },
    openDialog() {
      this.isDialogVisible = true
    },
    closeDialog() {
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
input:focus{
  outline: none
} 

.ff {
font-family: PingFang SC;
font-weight: 500;
}
.cof {
color: #FFFFFF;
}

.jc {
  justify-content: center;
}
.ic {
  align-items: center;
}
.jb {
  justify-content: space-between;
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
  margin-top: 20px;
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
padding: 5px 54px;
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