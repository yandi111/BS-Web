<!-- eslint-disable vue/return-in-computed-property -->
<template>
 <div>
  <!-- <button @click="openDialog">打开对话</button> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525;">

     <div class="flex "
          style="padding-top: 17px; padding-bottom: 17px; padding-left: 17px; padding-right: 17px;  border-bottom:1px solid #252525; ">
      <div class="ff" style="font-size: 14px; color: #FFFFFF; ">止盈止损{{
        positionActiveList.childCoinName
       }}{{ positionActiveList.motherCoinName }} <span
        :style="{color:positionActiveList.direction == 0 ? '#0CBB57' :'#ED3C2F'}"
        style="color:#ED3C2F; ;"> {{ positionActiveList.direction == 0 ? '开多' : '开空' }} </span>
      </div>

      <div class="flex jc ic"
           style="font-family: PingFang SC;font-size: 12px;font-weight: 400; font-size:12px;color:#737373; border: 1px solid #494949; border-radius: 4px; padding-left: 5px; padding-right: 5px; margin-left: 5px; ">
       {{ positionActiveList.depotType == 0 ? '逐仓' : '全仓' }}{{
        positionActiveList.depotMode == 0 ? '合仓 ' : '分仓'
       }}
      </div>
      <div class="flex jc ic"
           style="font-family: PingFang SC;font-size: 12px;font-weight: 400; font-size:12px;color:#737373; border: 1px solid #494949; border-radius: 4px; padding-left: 5px; padding-right: 5px; margin-left: 4px; ">
       {{ positionActiveList.multiple }}X
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
      <div class="flex" style="margin-bottom: 20px; color: #737373;">
       <div style=" white-space: nowrap; width: 50%;" @click="toggleSelection(1)"
            :class="['box', 'flex', 'jc', 'ic', { 'selected': isSecondSelected == 0 }]">
        止盈/止损
        <img v-if="isSecondSelected == 0" class="selected-icon" src="@/assets/images/icon/icon_Click.png"
             alt="Selected">
       </div>
       <div @click="toggleSelection(1)" :class="['box', 'flex', 'jc', 'ic', { 'selected': isSecondSelected == 1 }]"
            style=" white-space: nowrap;  width: 50%;color: #737373;padding-left: 37px !important; padding-right: 37px !important; ">
        仓位止止盈止损
        <img v-if="isSecondSelected == 1" class="selected-icon" src="@/assets/images/icon/icon_Click.png"
             alt="Selected">
       </div>
      </div>
     </div>

     <div style="padding-left:16px ; padding-right: 16px;">
      <div class="flex">
       <div style="flex:1; padding-left: 16px; padding: 10px;">
        <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500;color:#737373">开仓均价(USDT）</div>
        <div
         style=" font-family: PingFang SC;font-size: 11px;font-weight: 500; font-size: 13px; color: #FFFFFF;">
         {{ positionActiveList.openPriceAvg ? $thousandth(positionActiveList.openPriceAvg) : '--' }}
        </div>
       </div>
       <div style="flex:1; padding-left: 16px;padding: 10px;">
        <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500;color:#737373">市场价</div>
        <div
         style="font-family: PingFang SC;font-size: 11px;font-weight: 500; font-size: 13px; color: #0CBB57;">
         {{getSellPriceInfo ? $thousandth(getSellPriceInfo) : '--' }}
        
        </div>
       </div>
       <div style="flex:1; padding-left: 16px;padding: 10px;">
        <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500;color:#737373">预估强平价</div>
        <div
         style="font-family: PingFang SC;font-size: 11px;font-weight: 500; font-size: 13px; color: #FFFFFF;">
         {{
          positionActiveList.estimateForcedCloseDepotPrice ? $thousandth(positionActiveList.estimateForcedCloseDepotPrice) : '--'
         }}
        </div>
       </div>
      </div>
     </div>

     <!--切换部分  -->
     <div v-if="isSecondSelected == 0" style="padding-left:16px ; padding-right: 16px;">
      <div class="flex" style="width: 100%;">

       <div style="width: 50%;">
        <div
         style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px;margin-left: 5px;">
         触发价格
        </div>
        <div class="flex" style="margin-top: 8px;position: relative; ">
         <input
          v-model='triggerPrice'
          @focus="$event.target.style.border = '0.5px solid #90FF00'"
          @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)'"
          style="height: 30px; color: #FFFFFF;padding-top: 5px; width: 100%; padding-bottom: 5px; caret-color: #90FF00;margin-right: 4px;border: 0.5px solid rgba(0, 0, 0, 0); border-radius: 4px; background: #252525;  text-align: center;"
          placeholder="价格" type="text">
        </div>
       </div>

       <div style="width: 50%; ">
        <div
         style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px; margin-left: 5px;">
         盈亏
        </div>

        <div :style="containerStyle"
             style="height: 30px; border: 0.5px solid rgba(0, 0, 0, 0); margin-top: 8px; display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;">
         <input @focus="setFocus(true)" @blur="setFocus(false)"
                style="height: 30px;color: #FFFFFF;padding-left: 2px; padding-right: 2px; padding-top: 6px; padding-bottom: 6px; caret-color: #90FF00; border: none; background: #252525; text-align: center; flex: 1;"
                placeholder="盈亏" type="text">
         <div style="height: 15px; width: 1px; background-color: #737373; position: absolute; right: 42px;">
         </div>
         <div style="color: #666; font-size: 12px; position: absolute; right: 5px;">USDT</div>
        </div>

       </div>

      </div>
      <!-- -------------- -->
      <div class="flex" style="width: 100%;">

       <div style="width: 50%;">
        <div
         style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px;margin-left: 5px;">
         成交价格
        </div>
        <div class="flex" style="margin-top: 8px;position: relative; ">
         <input @focus="$event.target.style.border = '0.5px solid #90FF00'"
                v-model="dealPrice"
                @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)'"
                style="color: #FFFFFF;padding-top: 5px; width: 100%; padding-bottom: 5px; caret-color: #90FF00;margin-right: 4px; border: 0.5px solid rgba(0, 0, 0, 0); border-radius: 4px; background: #252525;  text-align: center;"
                placeholder="市价" type="text">
        </div>
       </div>
       <div style="width: 50%;">
        <div
         style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: rgba(0, 0, 0, 0);margin-top: 5px;margin-left: 5px;">
         成交价格
        </div>
        <div class="flex jb ic"
             style="margin-top: 8px;position: relative; width: 100%; background: #252525; padding-top: 5px; padding-bottom: 5px;border-radius: 4px;">
         <div style="margin-left: 40px;">市价单</div>
         <div style="margin-right: 11px;">
          <tgl ref="childComp"/>
         </div>
        </div>
       </div>

      </div>
      <div class="flex" style="width: 100%;">


       <div style="width: 100%; ">
        <div
         style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px; margin-left: 5px;">
         数量
        </div>

        <div :style="containerStyle1"
             style=" border: 0.5px solid rgba(0, 0, 0, 0); margin-top: 8px; display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;">
         <input
          v-model="numberPrice"
          @focus="setFocus1(true)" @blur="setFocus1(false)"
          style="color: #FFFFFF;padding-left: 2px; padding-right: 2px; padding-top: 5px; padding-bottom: 5px; caret-color: #90FF00; border: none; background: #252525; text-align: center; flex: 1;"
          placeholder="数量" type="text">
         <div style="height: 15px; width: 1px; background-color: #737373; position: absolute; right: 42px;">
         </div>
         <div style="color: #666; font-size: 12px; position: absolute; right: 5px;">USDT</div>
        </div>

       </div>

      </div>
      <div class="con " style="padding-top: 10px;padding-left: 17px; padding-right: 17px;">

       <div style="margin-top: 24px;">
        <slider2/>
       </div>
       <div class="flex ic jb" style="margin-top: 15px;">
        <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;">仓位数量</div>
        <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF; ">
         {{ positionActiveList.holdAmount }} USDT
        </div>
       </div>

       <div class="flex ic jb" style="margin-top: 8px;">
        <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;">预计盈亏</div>
        <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #ED3C2F; ">
         {{ positionActiveList.profitLoss }} USDT
        </div>
       </div>


      </div>
     </div>
     <!--  -->

     <div v-if="isSecondSelected == 1" style="padding-left:16px ; padding-right: 16px;">
      <div class="flex" style="width: 100%;">
       <div style="width: 50%;">
        <div
         style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px;margin-left: 5px;">
         止盈
        </div>
        <div class="flex" style="margin-top: 8px;position: relative; ">
         <input @focus="$event.target.style.border = '0.5px solid #90FF00'"
                v-model="stopSurplus"
                @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)'"
                style="color: #FFFFFF;padding-top: 5px; width: 100%; padding-bottom: 5px; caret-color: #90FF00;margin-right: 4px;border: 0.5px solid rgba(0, 0, 0, 0); border-radius: 4px; background: #252525;  text-align: center;"
                placeholder="价格" type="text">
        </div>
       </div>

       <div style="width: 50%; ">
        <div
         style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px; margin-left: 5px;">
         盈亏
        </div>

        <div :style="containerStyle"
             style=" border: 0.5px solid rgba(0, 0, 0, 0); margin-top: 8px; display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;">
         <!-- :style="{color:flag == -1 ?  '#73737' :flag == 1 ?  '#0CBB57' : '#ED3C2F' }" -->
         <div
          class="flex jc ic"
          :style="{color : flag == 2 ? '#ED3C2F': flag == 1 ? '#0CBB57' : '#737373' }"
          style=" height: 28px;padding-left: 2px;padding-right: 2px; padding-top: 6.5px; padding-bottom: 6.5px; caret-color: #90FF00; border: none; background: #252525; text-align: center; flex: 1;">
          {{ estimatedProfit ? $formatNumberWithCommas(estimatedProfit) : '盈亏' }}
         </div>

         <!-- <input
           v-model="estimatedProfit"
           @focus="setFocus(true)" @blur="setFocus(false)"
           style="color: #FFFFFF;padding-left: 2px; padding-right: 2px; padding-top: 5px; padding-bottom: 5px; caret-color: #90FF00; border: none; background: #252525; text-align: center; flex: 1;color: #ED3C2F;"
           placeholder="盈亏" type="text"> -->
         <div style="height: 15px; width: 1px; background-color: #737373; position: absolute; right: 42px;">
         </div>
         <div style="color: #666; font-size: 12px; position: absolute; right: 5px;">USDT</div>
        </div>

       </div>

      </div>
      <div
       style="font-family: PingFang SC;font-size: 12px;font-weight: 500;color: #737373; margin-top: 10px; margin-bottom: 18px;">
       当标记价格触达{{ stopSurplus }}时,将会触发市价止盈委托平仓当前仓位。<br>
       预期盈亏为<span
       :style="{color : flag == 2 ? '#ED3C2F': flag == 1 ? '#0CBB57' : '#737373' }"
      >
                <!-- {{ estimatedProfit ?  $thousandth(estimatedProfit) : '--'}} -->
               {{ $formatNumberWithCommas(estimatedProfit) }}
       <!-- {{estimatedProfit }} -->

                USDT。</span></div>


      <div class="flex" style="width: 100%;">
       <div style="width: 50%;">
        <div
         style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px;margin-left: 5px;">
         止损
        </div>
        <div class="flex" style="margin-top: 8px;position: relative; ">
         <input @focus="$event.target.style.border = '0.5px solid #90FF00'"
                v-model="stopLossPrice"
                @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)'"
                style="color: #FFFFFF;padding-top: 5px; width: 100%; padding-bottom: 5px; caret-color: #90FF00;margin-right: 4px;border: 0.5px solid rgba(0, 0, 0, 0); border-radius: 4px; background: #252525;  text-align: center;"
                placeholder="价格" type="text">
        </div>
       </div>

       <div style="width: 50%; ">
        <div
         style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF;margin-top: 5px; margin-left: 5px;">
         盈亏
        </div>

        <div :style="containerStyle1"
             style=" border: 0.5px solid rgba(0, 0, 0, 0); margin-top: 8px; display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;">

         <div class="flex jc ic"
              style="height: 28px;padding-left: 2px;padding-right: 2px; padding-top: 6.5px; padding-bottom: 6.5px;  border: none; background: #252525; text-align: center; flex: 1;"
              :style="{color : flagInfo == 2 ? '#ED3C2F': flagInfo == 1 ? '#0CBB57' : '#737373' }"
         >
          {{ estimatedProfitInfo ? $formatNumberWithCommas(estimatedProfitInfo) : '盈亏' }}
         </div>
         <!-- <input
            v-model="estimatedProfitInfo"
           @focus="setFocus1(true)" @blur="setFocus1(false)"
           style="color: #FFFFFF;padding-left: 2px; color: #0CBB57;padding-right: 2px; padding-top: 5px; padding-bottom: 5px; caret-color: #90FF00; border: none; background: #252525; text-align: center; flex: 1;"
           placeholder="盈亏" type="text"> -->
         <div style="height: 15px; width: 1px; background-color: #737373; position: absolute; right: 42px;">
         </div>
         <div style="color: #666; font-size: 12px; position: absolute; right: 5px;">USDT</div>
        </div>

       </div>
      </div>

      <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500;color: #737373; margin-top: 10px;">
       当标记价格触达 {{ stopLossPrice }}时,将会触发市价止损委托平仓当前仓位。<br>
       预期盈亏为<span
       :style="{color : flagInfo == 2 ? '#ED3C2F': flagInfo == 1 ? '#0CBB57' : '#737373' }">{{ $formatNumberWithCommas(estimatedProfitInfo) }}USDT。</span>
      </div>
      <div class="con " style="padding-top: 10px;padding-left: 17px; padding-right: 17px;">
      </div>
     </div>
     <!--  -->


     <div style="padding-left:16px ; padding-right: 16px;">
      <button style="padding-left: 158px; padding-right: 158px;" @click="submit" class="confirm-button">确定</button>
     </div>

    </div>
   </div>
  </transition>
  <simple-dialog-component13 ref="component13"/>
 </div>
</template>

<script>
import slider2 from './slider2.vue';
import tgl from './tgl.vue';
import SimpleDialogComponent13 from './SimpleDialogComponent13.vue';
import {mapGetters} from 'vuex';
import {UpdateDepot} from '@/api/hy'

export default {
 components: {slider2, tgl, SimpleDialogComponent13},
 name: 'SimpleDialogComponent3',
 data() {
  return {
   isFocused: false,
   isFocused1: false,
   isDialogVisible: false,
   selectedIndex: 1, // 默认选中第二个盒子
   isSecondSelected: 1,// 默认选中第1个盒子
   positionActiveList: {},
   stopSurplus: null,
   stopLossPrice: null,
   triggerPrice: null,  // 触发价格
   dealPrice: null, // 成交价格
   numberPrice: null, // 数量
   openDepotPrice: null,
   holdAmount: null,
   directionInfo: null,
   active:{}
  }
 },
 computed: {
  ...mapGetters(['getToken', 'getSelectedCurrency','getSellPriceInfo']),
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
//  0：开多，1：开空"  directionInfo
  // eslint-disable-next-line vue/return-in-computed-property
  estimatedProfit() {

   if (this.directionInfo == 0) {
    if (this.typeBUInfo == 'USDT') {
     if (this.stopSurplus && this.positionActiveList.openPriceAvg && this.positionActiveList.unfinishedHoldAmountMotherCoin) {
      return (this.stopSurplus / 1 - this.positionActiveList.openPriceAvg / 1) * this.positionActiveList.unfinishedHoldAmountMotherCoin / this.positionActiveList.openPriceAvg
     }
    } else {
     if (this.stopSurplus / 1 && this.positionActiveList.openPriceAvg / 1 && this.positionActiveList.unfinishedHoldAmount) {
      return (this.stopSurplus / 1 - this.positionActiveList.openPriceAvg / 1) * this.positionActiveList.unfinishedHoldAmount
     }
    }

   } else {

    if (this.typeBUInfo == 'USDT') {
     if (this.stopSurplus && this.positionActiveList.openPriceAvg && this.positionActiveList.unfinishedHoldAmountMotherCoin) {
      return (this.positionActiveList.openPriceAvg / 1 - this.stopSurplus / 1) * this.positionActiveList.unfinishedHoldAmountMotherCoin / this.positionActiveList.openPriceAvg
     }
    } else {
     if (this.stopSurplus / 1 && this.positionActiveList.openPriceAvg / 1 && this.positionActiveList.unfinishedHoldAmount) {
      return (this.positionActiveList.openPriceAvg / 1 - this.stopSurplus / 1) * this.positionActiveList.unfinishedHoldAmount
     }
    }
   }


  },
  // eslint-disable-next-line vue/return-in-computed-property
  estimatedProfitInfo() {
   if (this.directionInfo == 0) {
    if (this.typeBUInfo == 'USDT') {
     if (this.stopLossPrice && this.positionActiveList.openPriceAvg && this.positionActiveList.unfinishedHoldAmountMotherCoin) {
      return (this.stopLossPrice / 1 - this.positionActiveList.openPriceAvg / 1) * this.positionActiveList.unfinishedHoldAmountMotherCoin / this.positionActiveList.openPriceAvg
     }
    } else {
     if (this.stopLossPrice / 1 && this.positionActiveList.openPriceAvg / 1 && this.positionActiveList.unfinishedHoldAmount) {
      return (this.stopLossPrice / 1 - this.positionActiveList.openPriceAvg / 1) * this.positionActiveList.unfinishedHoldAmount
     }
    }
   } else {
    if (this.typeBUInfo == 'USDT') {
     if (this.stopLossPrice && this.positionActiveList.openPriceAvg && this.positionActiveList.unfinishedHoldAmountMotherCoin) {
      return (this.positionActiveList.openPriceAvg / 1 - this.stopLossPrice / 1) * this.positionActiveList.unfinishedHoldAmountMotherCoin / this.positionActiveList.openPriceAvg
     }
    } else {
     if (this.stopLossPrice / 1 && this.positionActiveList.openPriceAvg / 1 && this.positionActiveList.unfinishedHoldAmount) {
      return (this.positionActiveList.openPriceAvg / 1 - this.stopLossPrice / 1) * this.positionActiveList.unfinishedHoldAmount
     }
    }

   }

  },

  flag() {
   const profit = Number(this.estimatedProfit);
   if (isNaN(profit)) {
    return -1; // 返回一个特殊值表示无效输入
   } else if (profit > 0) {
    return 1; // 正数
   } else if (profit < 0) {
    return 2; // 负数
   } else {
    return 0; // 零
   }
  },
  flagInfo() {
   const profit = Number(this.estimatedProfitInfo);
   if (isNaN(profit)) {
    return -1; // 返回一个特殊值表示无效输入
   } else if (profit > 0) {
    return 1; // 正数
   } else if (profit < 0) {
    return 2; // 负数
   } else {
    return 0; // 零
   }
  },

 },
 methods: {
  setFocus(focused) {
   this.isFocused = focused
  },
  setFocus1(focused) {
   this.isFocused1 = focused
  },
  toggleSelection(active) {
   this.isSecondSelected = active
  },

  openDialog(active) {
     this.active = active
   if (active.takeProfitPrice) {
    this.stopSurplus = active.takeProfitPrice
   } else {
    this.stopSurplus = null
   }
   if (active.stopLossPrice) {
    this.stopLossPrice = active.stopLossPrice
   } else {
    this.stopLossPrice = null
   }

   this.positionActiveList = active

   this.isDialogVisible = true
   this.openDepotPrice = active.openDepotPrice
   this.holdAmount = active.holdAmount


   this.directionInfo = active.direction


  },
  closeDialog() {
   this.isDialogVisible = false
  },
  submit() {
   if (this.isSecondSelected == 0) {   // 止盈、止损

    if (!this.triggerPrice) {
     this.$customMessage(1, '触发价格不能为空')


    } else if (!this.dealPrice) {
     this.$customMessage(1, '成交价格不能为空')


    } else if (!this.numberPrice) {
     this.$customMessage(1, '数量不能为空')


    } else {
     this.SurplusLossPrice()
    }
   }
   if (this.isSecondSelected == 1) {

     this.SurplusLossPrice()
    
   }
  },
  async SurplusLossPrice() {
   Promise.try(async () => {
    return await UpdateDepot({
     id: this.positionActiveList.id,
     multiple: this.positionActiveList.multiple,
     stopLossPrice: this.stopLossPrice, //止损价格
     takeProfitPrice: this.stopSurplus,
     type: 0,
    })
   }).then(() => {
    this.$customMessage(0, "止盈止损成功")

    this.active.takeProfitPrice = this.stopSurplus,
    this.active.stopLossPrice = this.stopLossPrice

    this.$emit('onSetprice',this.active )
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
 padding: 5px 54px;
 border-radius: 4px;
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
 font-family: PingFang SC;
 font-size: 11px;
 font-weight: 500;
 color: #737373;
}
</style>