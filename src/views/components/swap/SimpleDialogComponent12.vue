<template>
    <div >
      <!-- <button @click="openDialog">打开对话窗</button> -->
  
      <transition name="fade">
        <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
          <div class="dialog-content" style="border:1px solid #252525;border-bottom: 0px solid rgba(0, 0, 0, 0);border-radius: 0 0 8px 8px;">


            
          <div class="flex jc ic" style="padding-top: 15px;padding: 15px 123px; width: 100%; font-size: 15px; font-weight: 600;background-color: #1B1B1B; color: #FFFFFF;">开仓确认</div>
          
            
         <div style="padding-top: 10px;padding-left: 17px; padding-right: 17px; padding-bottom: 10px;font-family: PingFang SC;background-color: #1B1B1B;" >

            <div class="flex jb ic" style="font-size: 13px; color: #FFFFFF;" >
              <div>BTCUSDT:</div>
              <div>
                 <!-- <span style="color: #0CBB57;">多开</span>  -->
                 <span :style="{color: typeStatus == 0 ? '#0CBB57' : '#ED3C2F'}">{{ typeStatus == 0 ? $t('lang_1912') : $t('lang_1916') }}</span> 
                {{getMultiple}}X</div>
            </div>
            <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('lang_1268')}}:</div>
              <div style="color: #FFFFFF;"> {{ entrustPrice ? $t('lang_1269'): $t('lang_1270')}}</div>
            </div>
            <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('lang_1021')}}:</div>
              <div style="color: #FFFFFF;">  {{ entrustPrice ? $thousandth(entrustPrice) : $t('lang_2020')}} </div>
            </div>
            <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('lang_1013')}}:</div>
              <div style="color: #FFFFFF;"> {{ contractQantityFmt||'-' }} {{ coneNameInfo }}</div>
            </div>
            <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('lang_1769')}}:</div>
              <div style="color: #FFFFFF;"> {{ usdtBtcBondFmt }} USDT</div>
            </div>
            <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('预估强平价')}}:</div>
              <div style="color: #FFFFFF;"> {{  typeStatus == 0 ? $formatNumberWithCommas(estimatedStrong) : $formatNumberWithCommas(estimatedStrongParity) }} USDT</div>
            </div>
            <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('合约价值')}}:</div>
              <div style="color: #FFFFFF;"> {{ contractValue }} USDT</div>
            </div>
            
            <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('有效时间')}}:</div>
              <div style="color: #FFFFFF;"> GTC({{$t('一直有效至取消')}})</div>
            </div>
            

            <div v-if="profitPrice">

            <!-- <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >预估强平价:</div>
              <div style="color: #FFFFFF;"> {{ estimatedStrongParity }} USDT</div>
            </div> -->
            <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('预估强平价与当前标')}}</div>
              <div style="color: #FFFFFF;">-2.34%</div>
            </div>
            <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('记价的差距')}}:</div>
              <div style="color: #FFFFFF;">(-0.0027 USDT)</div>
            </div>
            <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('市价止盈触发价')}}:</div>
              <div style="color: #FFFFFF;">{{ profitPrice }}</div> 
            </div>
            <div style="color: #737373; margin-top: 10px; font-size: 11px; font-family: PingFang SC; font-weight: 500;" >当 <span style="color: #90ff02;">{{$t('lang_1117')}}</span>{{typeStatus===0?'≥':'≤'}} {{  profitPrice }} {{$t('时，系统将以市价平掉整个仓位，')}}</div> <br> 
            <div style="margin-top: -18px; font-size: 11px; font-family: PingFang SC; font-weight: 500; color: #737373;">{{$t('预估盈亏')}} <span style="color: #0fbb57;">{{estimatedProfitFmt  }}</span> </div>  
              <div class="flex jb ic" style="font-size: 13px; margin-top: 10px;" >
              <div style="color:#737373" >{{$t('市价止损触发价')}}:</div>
              <div style="color: #FFFFFF;"> {{ lossPrice  }}</div>
            </div>
            <div style="margin-top: 10px; font-size: 11px; font-weight: 500; color: #737373" >当<span style="color: #90ff02;">{{$t('lang_1117')}}</span>{{typeStatus===0?'≤':'≥'}}{{lossPrice}}{{$t('时，系统将以市价平掉整个仓位，')}}</div> <br>
              <div style="margin-top: -18px; font-size: 11px; font-weight: 500;color: #737373 ">{{$t('预估盈亏')}} <span style="color: #0fbb57;">{{  estimatedProfitInfoFmt }}</span> </div>
           
          </div>       
            </div> 
            <div class="flex" style="width: 100%; font-size: 14px; font-weight: 600; " >
              <div @click="isDialogVisible = false" class="flex jc ic" style="cursor: pointer; width: 50%; border-radius: 0 0 8px 8px; border-top: 1px solid #252525;padding-bottom:12px;padding-top: 13px; border-right: 0px solid rgba(0, 0, 0, 0);background-color: #1B1B1B; overflow: hidden;color: #FFFFFF;" >{{$t('lang_333')}}</div>
              <!-- <div @click="$parent.addContractinfo(typeInfo)" class="flex jc ic" style="cursor: pointer;color: #90FF00; width: 50%; border-radius: 0 0 8px 8px; border-top: 1px solid #252525;padding-bottom:12px;padding-top: 13px;border-left: 0px solid rgba(0, 0, 0, 0);background-color: #1B1B1B;overflow: hidden;">确认</div> -->
              <div @click="addContractinfoClick" class="flex jc ic" style="cursor: pointer;color: #90FF00; width: 50%; border-radius: 0 0 8px 8px; border-top: 1px solid #252525;padding-bottom:12px;padding-top: 13px;border-left: 0px solid rgba(0, 0, 0, 0);background-color: #1B1B1B;overflow: hidden;">{{$t('lang_346')}}</div>
            </div>
          </div>
          
        </div>
      </transition> 
    </div>
  </template>
  
  <script>
  import { types } from 'sass';
import { mapGetters } from 'vuex';

  export default {
    props: {
      estimatedProfitFmt:{
        type:String|Number,
        default:''
      },
      estimatedProfitInfoFmt:{
        type:String|Number,
        default:''
      }
    //   entrustAmount: {
    //   type: Number
    // },
   
  },
    // components: { slider2 },
    name: 'SimpleDialogComponent12',
    data() {
      return {
        count:0,
        isHovered: false,
        isAddHovered: false,
        isDialogVisible: false,
        selectedIndex: 1, // 默认选中第二个盒子
        isSecondSelected: true ,// 默认选中第二个盒子
        isSecondSelected2: true, // 默认选中第二个盒子
      value: 0,
      isDragging: false,
      showTooltip: false,
      points: [0, 25, 50, 75, 100, 125],
      maxValue: 125,
      entrustAmount:null,
      usdtBtcBond:null,
      typeStatus:0,
      profitPrice:null, //  止盈触发价
      lossPrice :null,// 止损触发价
      estimatedStrong:null ,// 预估强评价  --
      estimatedStrongParity:null ,// 预估强评价 ++ 
      entrustPrice:null,
      estimatedProfit:null,// 预估盈利   
      estimatedProfitInfo : null, // 预估盈损
      contractValue:null,// 合约价值
      contractQantity:null, // 数量
      }
    },
    computed: {
        ...mapGetters(['getMultiple','getCoinsName','coinConfigMap']),
      typeInfo(){
       return this.typeStatus == 0 ? 0 :1
      },
     
    fillWidth() {
      return `${(this.value / this.maxValue) * 100}%`
    },
    thumbPosition() {
      return `calc(${(this.value / this.maxValue) * 100}% - 11px)`
    },

    coneNameInfo() {   // 币对列表的子币值
        return this.getCoinsName ? this.getCoinsName.split('-')[0] : 'BTC'
      },
      usdtBtcBondFmt(){
        try {
          const temp= this.coinConfigMap||{}
       const { precision }= temp?.['USDT']||{}
      let result=isNaN(Number(this.usdtBtcBond))?0: Number(this.usdtBtcBond)
       return result?.toFixed?.(precision)
        } catch (error) {
          return ''
        }
      },
      contractQantityFmt(){
        try {
          const temp= this.coinConfigMap||{}
       const { precision }= temp?.[this.coneNameInfo]||{}
      let result=isNaN(Number(this.contractQantity))?0: Number(this.contractQantity)
       return result?.toFixed?.(precision)
        } catch (error) {
          return ''
        }
      
      },
  },
    methods: {
      addContractinfoClick(){
        this.$parent.addContractinfo(this.typeInfo)
        this.isDialogVisible = false
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
      setCount(active){
        if(active === 0){
          if (this.value >0 ) {
            this.value--
          }else if(this.value === 0) {
            this.value = 0
          }
        }if (active === 1) {
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
        

        console.log(active,active.estimatedProfit , active.estimatedStrongParity,"activeactiveactiveactive=-=-=-=-=-");
        
        if (this.entrustAmount) {
          this.entrustAmount === ''
        }
        this.usdtBtcBond = active.usdtBtcBond
        this.entrustAmount = active.entrustAmount
        this.isDialogVisible = true
        this.typeStatus = active.type

        this.profitPrice = active.profitPrice, //  止盈触发价
        this.lossPrice = active.lossPrice // 止损触发价
        this.estimatedStrong = active.estimatedStrong, // 预估强评价  --
        this.estimatedStrongParity = active.estimatedStrongParity ,// 预估强评价 ++ 
        this.entrustPrice = active.entrustPrice
        this.estimatedProfit = active.estimatedProfit   // 预估盈利
        this.estimatedProfitInfo = active.estimatedProfitInfo  // 预估盈损
        
        this.contractValue = active.contractValue, // 合约价值 
        this.contractQantity = active.contractQantity // 数量

      },
      closeDialog() {
        this.isDialogVisible = false
        this.$store.dispatch('orderTab/setActiveLeverNumber', this.value)
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
    /* background-color: #1B1B1B; */
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