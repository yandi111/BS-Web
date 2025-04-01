<template>
    <div >
      <!-- <button @click="openDialog">打开对话窗</button> -->
  
      <transition name="fade">
        <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
          <div class="dialog-content" style="border:1px solid #252525;">
            
           1234123
          
           
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import slider2 from './slider2.vue';
  export default {
    components: { slider2 },
    name: 'SimpleDialogComponent2',
    data() {
      return {
        count:0,
        isHovered: false,
        isAddHovered: false,
        isDialogVisible: false,
        selectedIndex: 1, // 默认选中第二个盒子
        isSecondSelected: true ,// 默认选中第二个盒子
        isSecondSelected2: true // 默认选中第二个盒子
      }
    },
    methods: {
      setCount(active){
        if(active === 0){
          if (this.count >=0 ) {
            this.count--
          }else {
            this.count === 0
          }
        }if (active === 1) {
          this.count++
        }


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
  font-family: PingFang SC;
  font-size: 11px;
  font-weight: 500;
  color: #737373;
}

  </style>