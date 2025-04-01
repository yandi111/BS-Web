<template>
    <div >
      <!-- <button @click="openDialog">打开对话窗</button> -->
  
      <transition name="fade">
        <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false  ">
          <div class="dialog-content" style="border:1px solid #252525;">
            
            <div class="flex jb" style="padding-top: 17px; padding-bottom: 17px; padding-left: 17px; padding-right: 17px;  border-bottom:1px solid #252525; ">
              <div class="ff" style="font-size: 14px; color: #FFFFFF; " >交易模式</div>
              <div><button @click="closeDialog" class="close-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
            </button></div>
            </div>
          <div class="con" style="padding-top: 10px;padding-left: 17px; padding-right: 17px;" >
            <div class="ff cof" style="font-size: 12px; margin-bottom: 10px; " >保证金模式</div>
           <div class="flex" style="margin-bottom: 20px;">
            <!-- :class="['box', 'flex', 'jc', 'ic','textcolor', { 'selected': isSecondSelected }]" -->
             <div 
                  @click="toggleSelection(1)"
                  class="box  flex jc ic"
                  :style="{color: isSecondSelected ? '#90FF00' : '#737373',border:  isSecondSelected ? '1px solid #90FF00' : '1px solid #737373'}"
                >
                  全仓
                  <img v-if="isSecondSelected" class="selected-icon" src="@/assets/images/icon/icon_Click.png" alt="Selected">
                </div>
                <div 
                  @click="toggleSelection(0)"
                
                  class="box  flex jc ic"
                  :style="{color: !isSecondSelected ? '#90FF00' : '#737373',border:  !isSecondSelected ? '1px solid #90FF00' : '1px solid #737373'}"

                >
                  逐仓
                  <img v-if="!isSecondSelected" class="selected-icon" src="@/assets/images/icon/icon_Click.png" alt="Selected">
                </div>
             </div>

             <div class="ff cof" style="font-size: 12px; margin-bottom: 10px; " >仓位模式</div>
             <div class="flex" style="margin-bottom: 20px;  color: #737373;">
             <div 
                  @click="toggleSelection2(0)"
                  class="box  flex jc ic"
                  :style="{color: !isSecondSelected2 ? '#90FF00' : '#737373',border:  !isSecondSelected2 ? '1px solid #90FF00' : '1px solid #737373'}"
                >
                  合仓
                  <img v-if="!isSecondSelected2" class="selected-icon" src="@/assets/images/icon/icon_Click.png" alt="Selected">
                </div>
                <div 
                  @click="toggleSelection2(1)"
                  class="box  flex jc ic"
                  :style="{color: isSecondSelected2 ? '#90FF00' : '#737373',border:  isSecondSelected2 ? '1px solid #90FF00' : '1px solid #737373'}"
                >
                  分仓
                  <img v-if="isSecondSelected2" class="selected-icon" src="@/assets/images/icon/icon_Click.png" alt="Selected">
                </div>
             </div>
         
             <button  @click="closeDialog" class="confirm-button">确定</button>   </div>
          
           
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  // import store from '../../config/store';
  import { color } from 'echarts';
import {  mapMutations } from 'vuex';
  export default {
    name: 'SimpleDialogComponent',
    data() {
      return {
        isDialogVisible: false,
        selectedIndex: 1, // 默认选中第二个盒子
        isSecondSelected: true ,// 默认选中第二个盒子
        isSecondSelected2: false // 默认选中第二个盒子
      }
    },
    methods: {
      ...mapMutations([
      'setContractId','setDepotType','setDepotTypeInfo'
    ]),
      toggleSelection(type) {
        this.setDepotType(type)
        this.isSecondSelected = !this.isSecondSelected
    },

      toggleSelection2(type) {
        this.setDepotTypeInfo(type)
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

 .ff {
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

.textcolor {
   color: #737373;
}
.selected-icon {
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  width: auto; /* 保持图片的原始宽高比 */
  object-fit: contain; /* 确保图片完全显示 */
}
  </style>