
<template>
     <div>
        <div>
          <div class="flex ic" style=" margin-top: 34px; height: 22px;">
            <div style="font-size: 16px;font-weight: 600; font-family: PingFang SC; color: #F0F0F0; margin-right: 8px;">
              返佣收入
            </div>
            <div
              style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; margin-right: 10px; ">
              <div @click.stop="iconClick(0)" v-if="iconOpen == 1" style="cursor: pointer; margin-top: 5px;">
                <img src="@/assets/newg/icon_open.png" alt="打开">
              </div>
              <div @click.stop="iconClick(1)" v-if="iconOpen == 0"
                style="cursor: pointer; width: 20px; height: 20px;margin-top: -1px;">
                <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_close.png" alt="关闭">
              </div>
            </div>
          </div>
        </div>

        <div class="flex jb ic" style="height:43px;margin-top: 9px; width: 100%; ">
          <div class="flex ic">
            <div v-if="iconOpen == 1"
              style="font-family: PingFang SC;font-size: 31px;font-weight: 600; color: #F0F0F0; margin-right: 10px;">
              31.82
            </div>
            <div v-else
              style="font-family: PingFang SC;font-size: 31px;font-weight: 600; color: #F0F0F0; margin-right: 10px;">
              ******
            </div>
            <!--  下拉框 -->
            <div style="width: 72px ; height: 26px;">
               <SelectListRefund :coinPairList="coinPairList" :coinPairTitle ="selectedOption" />


            </div>

          </div>

        </div>
        <div>
          <div v-if="iconOpen == 1" style=" margin-top: 1px;">
            <div style="font-family: PingFang SC;font-size: 16px;font-weight: 400; height: 22px;color: #B3B3B3;">≈
              225.95
              CNY</div>

          </div>
          <div v-else style=" margin-top: 1px;">
            <div style="font-family: PingFang SC;font-size: 16px;font-weight: 400; height: 22px;color: #B3B3B3;">≈
              ******
              CNY</div>

          </div>
        </div>

        <div class="flex jc ic"
          style="margin-top: 38px; width: 120px; height: 39px; border-radius: 4px; color: #000000 ; background-color: #90FF00;">
          划转</div>
      </div>
     </template>
     
     <script>
     import SelectListRefund from './SelectListRefund.vue';
 
     export default {
      
  
      props:{
        
  
      },
       name: "RefundMoney",
       components: {
        SelectListRefund
         
       },
       data() {
        return {
      isDropdownVisible: false,
      iconOpen: 1,
      selectedOption: 'USDT', // 默认选项
      isRotated: false,
      stateflag: true,
      coinPairList: [
        {
          id: 2,
          name: "BTC",
          code: 53,
        },
        {
          id: 1,
          name: "ETH",
          code: 54,
        },
        {
          id: 1,
          name: "XRP",
          code: 54,
        },
      ],
      coinPairTitle: "请选择币种",


      tabList: [
        {
          name: 'USDT',
          id: 1
        },
        {
          name: 'BTC',
          id: 2
        }
        ,
        {
          name: 'ETH',
          id: 3
        }
      ]


    };
       },
       computed:{
          
   
   
       },
       mounted(){
     
       },
       methods:{

        iconClick(active) {
      this.iconOpen = active
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
      this.isRotated = !this.isRotated; // 切换旋转状态
    },
    selectOption(option, type) {
      this.usdtBtcType = true; // 设置状态
      this.selectedOption = option; // 记录选择的选项
      this.isDropdownVisible = false; // 选择后隐藏下拉框
      this.isRotated = false; // 切换旋转状态
      this.selectedValue = type; // 设置选中的值

      // 根据选项设置 selectedValue
      if (option === 'USDT') {
        this.selectedValue = 1;
      } else {
        this.selectedValue = 2;
      }

      // 获取当前存储的类型
      // this.setSelectedCurrency(option)
      // this.$store.commit('setSelectedCurrency', option); // 更新 Vuex 状态
    },

      
     
       }
     };
     </script>
     <style lang="scss" scoped>
     .coinpair {
         width: 170px;
     }
     .ff {
       color: #F0F0F0;
     }
     .jc {
       justify-content: center;
     }
     .ic {
     
       align-items: center
     }
     .jb {
       justify-content: space-between
     }
     .js {
         justify-self: start;
     }
     .con {
       width: 640px; 
     }
     .dropdowns {
      
    width: 100%;
   
    /* border: 0.5px solid #252525; */
  //   width: 100%;
    position: absolute;
    left: 0px;
    background-color: #1c1c1c;
    border-radius: 4px;
    z-index: 10;
  }
  .coinItem:hover{
     background-color: #1B1B1B;
  }
  
     
     .dropdown-item {
   
      display: flex;
      justify-content: start;
      align-items: center;
      width: 100%;
    border-radius: 4px;
    cursor: pointer;
    color: #737373;
  }
  
  .dropdown-item:hover {
    border-radius: 4px;
    background-color: #252525;
    color: #90ff00;
  }
  
  ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner::after {
    transform: rotate(50deg) scaleY(1.3);
    
  }
  .rotate {
    transform: rotate(180deg);
    /* 旋转 180 度 */
  }
  .triangle {
    width: 0;
    height: 0;
    border-left: 4.5px solid transparent;
    border-right: 4.5px solid transparent;
    border-top: 6.5px solid #a8a8a8;
    /* 三角形颜色，朝上 */
    cursor: pointer;
    transition: transform 0.5s;
    /* 动画效果 */
    margin: 20px;
    /* 添加一些间距 */
  }
     
     </style>
     