<template>
    <div>
          <div style="place-self: 30px; padding-top: 12px; margin-bottom: 25px;">
              <!-- 手机号码  -->
                
                <div class="flex ic jc"
                  :style="{ border: blurstate ? '0.5px solid #90FF00' : phoneCheck ? '0.5px solid #E94826' : '0.5px solid rgba(0,0,0,0)' }"
                  style=" width: 100%; cursor: pointer;  position: relative; border-radius: 4px; height: 57px; background: #252525;padding-left: 26px;color: #F0F0F0;">
  
                  <div>
                    <div style="display: flex;">
                      <div class="flex ic jc" style=" height: 26px; border-radius: 4px;" @click="toggleDropdown"> +{{
                        selectedOption }}
                        <div style="margin-left: 26px; border-left: 4.5px solid transparent;
                         width: 0;
                         height: 0;
                         border-right: 4.5px solid transparent;
                         border-top: 6.5px solid #a8a8a8;
                         cursor: pointer;
                         transition: transform 0.5s;
                        " class="triangle" :class="{ rotate: isRotated }">
                      </div>
                  <!-- 小三角 -->
                      </div>
  
                    </div>
                  </div>
                  <div class="flex ic jc"
                    style="margin-top: 2px; margin-right: 15px; width: 2px; height: 20px; line-height: 15px; background-color: #525252; margin-left:27px;">
                  </div>
               
                  <transition name="fade">
                    <div v-if="isDropdownVisible" class="dropdown"
                      style="position: absolute; left: 0px; top: 42px; z-index: 99999;">
                      <div
                        style="overflow-y: scroll; height: 296px;  background-color: #141414; scrollbar-color: #3A3B3D #141414; /* 滚动点颜色和轨道颜色 */">
                        <div
                          style="color: #B3B3B3; font-size: 12px; font-weight: 600; margin-left: 20px; margin-top: 19px; margin-bottom: 10px;">
                          热门国家</div>
  
                        <div
                          style=" width: 100%;  padding-top: 11px; padding-bottom: 11px; padding-left: 20px; padding-right: 20px; "
                          class="dropdown-item flex ic jb" @click="selectOption(item.code)"
                          v-for="(item, index ) in countryList" :key="index">
                          <div>{{ item.name }}</div>
                          <div><span>+{{ item.code }}</span></div>
                        </div>
                    
                      </div>
                    </div>
                  </transition>

                  <input  v-model="phoneData"  @input="phoneInput" placeholder="请输入手机号码"
                    @focus="blurstate = true, phoneCheck = false"
                    @blur="$event.target.style.border = 'none', blurstate = false"
                    style="color: #F0F0F0; text-align: left;  outline: none;text-align: left;width: 100%; caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  height: 40px; line-height: 40px;"
                    type="text">
                </div>
            </div>
    </div>
  </template>
  
  <script>
  import {  GetCountryList } from "@/api/hy";

  export default {
    props: {
        titleInfoState: {
            type: Boolean,
            required: false,
        },
    },
    components: {
    },
   
    name: 'PhoneNumber',
    data() {
      return {
        phoneData:'',
        isRotated:true,
        blurstate: false,
        phoneCheck: false,
        selectedOption: '86', // 默认选项
        phoneNumberData: null,
        isDropdownVisible:false,
        countryList: [
          {
            id: 1,
            name: '中国',
            code: 53
          },
          {
            id: 2,
            name: '中国香港',
            code: 54
          },
  
          {
            id: 2,
            name: '中国香',
            code: 55
          }
  
        ],
  
        isHovered: false,
        isDialogVisible: false,
       
      }
    },
    computed: {
    },
    // eslint-disable-next-line vue/return-in-computed-property
    mounted() {
      this.initGetCountryList()
     },
    methods: {

      async initGetCountryList() {
      try {
        const res = await GetCountryList()
        this.countryList = res.data
      } catch (e) {
        console.log(e);
      }
    },

     phoneNumberChange(){

        },
      toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible;
        this.isRotated = !this.isRotated; // 切换旋转状态
      },
  
  
      selectOption(option) {
        this.selectedOption = option;
        this.isDropdownVisible = false; // 选择后隐藏下拉框
        this.isRotated = false; // 切换旋转状态
        this.selectedValue = option
  
      },
      phoneInput(event) {
        const inputValue = event.target.value.replace(/\D/g, '')
        if (inputValue.length <= 11) {
          this.phoneNumberData = inputValue;
        } else {
          this.phoneNumberData = inputValue.slice(0, 11);
        }
        let phoneNumberData  =  `+${this.selectedOption} ${this.phoneNumberData}`
         this.$emit('phoneNumberData', phoneNumberData)
      },
      openDialog() {
        this.phoneData = '',
  
        this.isDialogVisible = true
      },
  
    }
  
  
  }
  </script>
  
  <style scoped>
  .ff {
    font-weight: 500;
  }
  
  .ff0 {
    color: #F0F0F0;
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
  
  .input-containerS {
    display: flex;
    align-items: center;
    position: relative;
    /* 使子元素绝对定位相对于这个容器 */
  
    width: 100%;
    /* 容器宽度 */
  }
  
  .rotate {
    transform: rotate(180deg);
    /* 旋转 180 度 */
  }
  
  .dropdown {
    height: 296px;
    border: 0.5px solid #252525;
    width: 272px;
    position: absolute;
    top: 58px;
    left: 0px;
    background-color: #1C1C1C;
    border-radius: 4px;
    margin-top: 1px;
    z-index: 10;
    overflow: hidden;
  }
  
  .input-icon {
    position: absolute;
    right: 10px;
    display: inline-block;
    /* 确保图标在同一行 */
  }
  
  .dropdown-item {
  
    border-radius: 4px;
    /* // padding: 8px 12px; */
    cursor: pointer;
    overflow: hidden;
    /* // color: #363636; */
    color: #737373;
  }
  
  .dropdown-item:hover {
    overflow: hidden;
    border-radius: 4px;
    background-color: #252525;
    color: #90ff00;
  }
  
  .parent-component {
    padding: 20px;
  }
  
  .cancel {
    color: #737373;
    background-color: #252525;
  }
  
  .cancel:hover {
    color: #F0F0F0;
    background-color: #363636;
  }
  
  .submit {
    background-color: #90FF00;
    color: #252525;
  }
  
  .submit:hover {
    color: #737373;
  }
  
  .custom-input {
    width: 100%;
    /* 输入框宽度 */
    height: 40px;
    /* 输入框高度 */
    caret-color: #90FF00;
    /* 光标颜色 */
    outline: none;
    /* 去除聚焦时的蓝色边框 */
    border: 0.5px solid rgba(0, 0, 0, 0);
    /* 初始边框样式 */
    border-radius: 4px;
    /* 圆角边框 */
    background: #252525;
    /* 背景颜色 */
    text-align: left;
    /* 文本左对齐 */
  }
  
  .dialog-overlay {
    border-radius: 10px;
    position: fixed;
    top: -70px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 888;
  }
  
  .dialog-content {
    background-color: #1B1B1B;
    border-radius: 10px;
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
  
    color: #90FF00;
    ;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .input-container {
    display: flex;
    border-radius: 4px;
    overflow-y: auto;
    position: relative;
    /* 使子元素绝对定位相对于这个容器 */
    width: 100%;
    /* 容器宽度 */
    background: #252525;
    /* 背景颜色 */
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
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter,
  .fade-leave-to {
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
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    border: 1px solid #737373;
    margin-right: 5px;
    overflow: hidden;
    /* 确保图标不会超出边框 */
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
    width: auto;
    /* 保持图片的原始宽高比 */
    object-fit: contain;
    /* 确保图片完全显示 */
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
    padding-bottom: 20px;
    /* 为标签腾出空间 */
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
    margin-top: -16px;
  }
  
  .slider-label {
    position: absolute;
    transform: translateX(-50%);
    font-size: 11px;
    font-weight: 500;
    color: #B3B3B3;
  }
  
  .filteredAccountList {
    color: #B3B3B3;
  
  }
  
  .filteredAccountList:hover {
    color: #FFFFFF;
  }
  </style>