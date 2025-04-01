<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div>
    <transition name="fade">
      <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
        <div class="dialog-content" style="border:1px solid #252525;">

          <div class="flex "
            style="padding-top: 17px; padding-bottom: 17px; padding-left: 17px; padding-right: 17px;  border-bottom:1px solid #252525; ">
            <div class="ff" style="font-size: 14px; color: #FFFFFF; ">平仓{{ activeData.childCoinName }}{{
              activeData.motherCoinName }} <span :style="{ color: activeData.direction == 0 ? '#0CBB57' : '#ED3C2F' }">平{{
                activeData.direction == 0 ? $t('lang_882') :$t('lang_933') }} </span> </div>
            <div class="flex jc ic"
              style="font-family: PingFang SC;font-size: 12px;font-weight: 400; font-size:12px;color:#737373; border: 1px solid #494949; border-radius: 4px; padding-left: 5px; padding-right: 5px; margin-left: 5px; ">
              {{ activeData.depotType == 0 ? $t('lang_1087') : $t('lang_1184') }}{{ activeData.depotMode == 0 ? '合仓' : '分仓' }}</div>
            <div class="flex jc ic"
              style="font-family: PingFang SC;font-size: 12px;font-weight: 400; font-size:12px;color:#737373; border: 1px solid #494949; border-radius: 4px; padding-left: 5px; padding-right: 5px; margin-left: 4px; ">
              {{ activeData.multiple }} X</div>

            <div><button @click="isDialogVisible = false" class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              </button></div>

          </div>

          <!-- {{ (  this.activeData.marketPrice/1 - this.activeData.openDepotPrice/1 ) *this.closePositionData  }}
  {{ (  this.activeData.marketPrice/1 - this.activeData.openDepotPrice/1 ) *this.closePositionData /this.activeData.openDepotPrice/1 }} -->

          <!-- {{ this.activeData.marketPrice }} {{ this.activeData.openDepotPrice}}  {{this.closeInitCoinData  }} -->

          <!-- {{ this.activeData.openDepotPrice }} -->
          <div style="padding-left: 16px; padding-right: 11px;">
            <div class="flex" style="margin-bottom: 20px; color: #737373;">
              <div @click="toggleSelection(0)" :class="['box', 'flex', 'jc', 'ic']"
                :style="{ border: isSecondSelected == 0 ? '1px solid #90FF00' : ' 1px solid #737373' }"
                style="color: #737373;">
                {{$t('市价平仓')}}
                <img v-if="isSecondSelected == 0" class="selected-icon" src="@/assets/images/icon/icon_Click.png"
                  alt="Selected">
                <img v-else src="" alt="">
              </div>
              <div @click="toggleSelection(1)"
                :class="['box', 'flex', 'jc', 'ic', { 'selected': isSecondSelected == 1 }]"
                :style="{ border: isSecondSelected == 1 ? '1px solid #90FF00' : ' 1px solid #737373' }"
                style="padding-left: 37px !important; padding-right: 37px !important; color: #737373;">
                {{$t('限价平仓')}}
                <img v-if="isSecondSelected == 1" class="selected-icon" src="@/assets/images/icon/icon_Click.png"
                  alt="Selected">
                <img v-else src="" alt="">
              </div>
            </div>
          </div>

          <div style="padding-left:16px ; padding-right: 16px;">
            <div class="flex">
              <div style="flex:1; padding-left: 16px; padding: 10px;">
                <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500;color:#737373">{{$t('lang_784')+'(USDT）'}}</div>
                <div
                  style="font-family: PingFang SC;font-size: 11px;font-weight: 500; font-size: 13px; color: #FFFFFF;">{{
                    activeData.openPriceAvg ? $thousandth(activeData.openPriceAvg ) : '--' }}</div>
              </div>
              <div style="flex:1; padding-left: 16px;padding: 10px;">
                <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500;color:#737373">{{$t('spot_10')}}</div>
                <div
                  style="font-family: PingFang SC;font-size: 11px;font-weight: 500; font-size: 13px; color: #0CBB57;">{{
                    $thousandth(getSellPriceInfo) || '--' }}</div>
              </div>
              <div style="flex:1; padding-left: 16px;padding: 10px;">
                <div style="font-family: PingFang SC;font-size: 11px;font-weight: 500;color:#737373">{{$t('预估强平价')}}</div>
                <div
                  style="font-family: PingFang SC;font-size: 11px;font-weight: 500; font-size: 13px; color: #FFFFFF;">{{
                    activeData.estimateForcedCloseDepotPrice ? $thousandth(activeData.estimateForcedCloseDepotPrice) : '--'
                  }}</div>
              </div>
            </div>

            <div v-if="isSecondSelected == 0" class="flex jc ic"
              style=" border-radius: 4px; background: #252525;color: #737373;  padding-left: 158px; padding-right: 158px; font-size: 14px;padding-top: 5px;padding-bottom: 5px;">
              {{$t('lang_1006')}}</div>
            <div v-if="isSecondSelected == 1" :style="containerStyle"
              style="display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;">
              <input v-model="timePrice" @focus="setFocus(true)" @blur="setFocus(false)"
                style="color: #FFFFFF;padding-left: 2px; padding-right: 2px; padding-top: 5px; padding-bottom: 5px; caret-color: #90FF00; border: 1px solid rgba(0, 0, 0, 0); background: #252525; text-align: center; flex: 1;"
                :placeholder="$t('lang_1325')" type="text">
            </div>
            <!-- <div class="flex jc ic" style=" border-radius: 4px; background: #252525;color: #737373;  padding-left: 158px; padding-right: 158px; font-size: 14px;padding-top: 5px;padding-bottom: 5px;" >价格</div> -->

            <div class="flex" style="width: 100%; margin-top: 10px;">
              <div style="width: 100%; border: 1px solid rgba(0, 0, 0, 0); ">
                <div :style="containerStyle1"
                  style="margin-top: 8px; display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;">
                  <input v-model="closeInitCoinData" @focus="setFocus1(true)" @blur="setFocus1(false)"
                    style="color: #FFFFFF;padding-left: 2px; padding-right: 2px; padding-top: 5px; padding-bottom: 5px; caret-color: #90FF00; border: 1px solid rgba(0, 0, 0, 0); background: #252525; text-align: center; flex: 1;"
                    :placeholder="$t('lang_1352')" type="text">
                  <div style="height: 15px; width: 1px; background-color: #737373; position: absolute; right: 42px;">
                  </div>
                  <!-- <div style="color: #666; font-size: 12px; position: absolute; right: 5px;"> {{ activeData.denominatedType == 2 ? activeData.childCoinName : activeData.motherCoinName}}</div> -->
                  <div style="color: #666; font-size: 12px; position: absolute; right: 5px;"> {{ typeBUInfo }}</div>
                </div>

              </div>

            </div>


          </div>

          <div class="con " style="padding-top: 10px;padding-left: 17px; padding-right: 17px;">
            <div style="margin-top: 24px;">
              <slider2 @iconChange="iconChange" :closePositionData="closePositionData" :sliderValue="sliderValue" />
            </div>
            <div class="flex ic jb" style="margin-top: 15px;">
              <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;">{{$t('可平数量')}}</div>
              <!-- <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF; " >{{$thousandth(closePosition)}} {{typeBUInfo}} </div> -->
              <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF; ">
                {{ closeInitCoinData }} {{ typeBUInfo }} </div>
            </div>
            <div class="flex ic jb" style="margin-top: 8px;">

            <!-- {{estimatedProfit}}----=====  {{activeData.profitLoss}} -->
              <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;">{{$t('预计盈亏')}}</div>
              <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600;"
                :style="{ color: textColor }"
                
                >
                {{ estimatedProfit ? removeTrailingZeros(estimatedProfit/1) : removeTrailingZeros(activeData.profitLoss/1) }}
                USDT</div>
              <!-- activeData.profitLoss -->
            </div>
            <button style="padding-left: 158px; padding-right: 158px;" @click="closeDialog"
              class="confirm-button">{{$t('lang_345')}}</button>
          </div>


        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import slider2 from './slider2.vue';
import { mapGetters } from 'vuex';
import {HandleAllDepot, HandleDepot} from "@/api/hy";

export default {
  components: { slider2 },
  name: 'SimpleDialogComponent5',
  data() {
    return {
      isFocused: false,
      sliderValue:'',
      isFocused1: false,
      itemValue:{},
      isDialogVisible: false,
      selectedIndex: 1, // 默认选中第二个盒子
      isSecondSelected: 0,// 默认选中第二个盒子
      activeData: {},
      closePositionData: null,
      closeInitCoinData: null,
      closePosition: null,
      timePrice: null, // 限时开仓的价格
      marketPriceopenDepotPrice: ''
    }
  },
  computed: {
    ...mapGetters(['getSelectedCurrency', 'getToken', 'getSellPriceInfo']),

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



    // 子  (市价 - 开仓均价) *数量   
    // usdt (市价 - 开仓均价) *数量  / 开仓均价

    // 自主平仓 activeData  市价 marketPrice   开仓均价 openDepotPrice  数量  closeInitCoinData
    // eslint-disable-next-line vue/return-in-computed-property
    estimatedProfit() {
      if (this.typeBUInfo == 'USDT') {
        return (this.getSellPriceInfo - this.activeData.openDepotPrice) * this.closeInitCoinData / this.activeData.openDepotPrice
      } else {
        return this.marketPriceopenDepotPrice * this.closeInitCoinData
      }
    },


    // eslint-disable-next-line vue/return-in-computed-property
    estimateINfo() {
      if (this.activeData.marketPrice && this.activeData.openDepotPrice && this.closeInitCoinData) {
        return (this.activeData.marketPrice / 1 - this.activeData.openDepotPrice / 1) * this.closeInitCoinData / this.activeData.openDepotPrice
      }
    },


textColor() {
      const value = this.estimatedProfit || this.activeData.profitLoss;
      return value > 0 ? '#0CBB57' : '#ED3C2F';
    }

  },
  watch:{
    closeInitCoinData(val){      
      if(!val){
        this.sliderValue=0
      }else{
        this.setSliderValue()
      }
    }
  },
  methods: {
    setSliderValue(){
      try {
        const amount=this.itemValue.motherCoinAmount      
        if(amount){
        let result=  this.closeInitCoinData/amount
        this.sliderValue=isNaN(result)?0:result
        this.sliderValue*=100
        }
      } catch (error) {
      }
     
    },
    iconChange(value) {
      this.closeInitCoinData = value
    },
    truncateToSixDecimalPlaces(value) {
      // 将输入转换为字符串
      const valueString = String(value);

      // 查找小数点的位置
      const decimalIndex = valueString.indexOf('.');

      // 如果没有小数点，或者小数部分不满6位，直接返回原始值
      if (decimalIndex === -1 || valueString.length - decimalIndex - 1 <= 6) {
        return value; // 返回原始值
      }

      // 截取小数点后6位
      const truncatedValue = valueString.slice(0, decimalIndex + 7); // +7 是因为要包括小数点
      return parseFloat(truncatedValue); // 返回截取后的数字
    },

    async SurplusLossPrice() {
      Promise.try(async () => {
       return await HandleAllDepot({})
      }).then(() => {
       this.$customMessage(0, '平仓成功')
      })

      this.isDialogVisible = false
    },

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
      console.log(active, 'activeactiveactive000-----------');

      this.itemValue=active
      if (this.typeBUInfo == 'USDT') {
        this.closePositionData = active.unfinishedHoldAmountMotherCoin
        this.closeInitCoinData = active.unfinishedHoldAmountMotherCoin
      } else {
        this.closePositionData = active.unfinishedHoldAmount
        this.closeInitCoinData = active.unfinishedHoldAmount
      }
      this.activeData = active

      this.activeData.marketPrice = this.activeData.openDepotPrice

      this.marketPriceopenDepotPrice = active.marketPrice / 1 - active.openDepotPrice / 1


      // this.closePositionData = active.unfinishedHoldAmount
      this.closePosition = active.unfinishedHoldAmount
      this.isDialogVisible = true

    },
    closeDialog() {

      if (!this.closeInitCoinData) {
        this.$customMessage(1, '数量不能为空')

      } else
        if (this.isSecondSelected == 1) {

          if (!this.timePrice) {
            this.$customMessage(1, '价格不能为空')

          } else {
            this.SurplusLossPrice()
          }
        } else {
          this.SurplusLossPrice()
        }
    },

    // eslint-disable-next-line no-dupe-keys, vue/no-dupe-keys
    async SurplusLossPrice() {
      let numberCount = this.closeInitCoinData
      let parameter = {
        closeAmount: numberCount,
        id: this.activeData.id,
        denominatedType: this.typeBUInfo === 'USDT' ? 0 : 1
      }

      Promise.try(async () => {
       return await HandleDepot(JSON.stringify(parameter))
      }).then(() => {
       this.$customMessage(0, '平仓成功')
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
        style.border = '2px solid #737373';
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
    removeTrailingZeros(number) {
    // 非空校验
    if (number === null || number === undefined || isNaN(number)) {
        return ''; // 返回空字符串或您希望的默认值
    }

    // 将数字转换为字符串
    let numStr = number.toString();
    
    // 检查是否为整数
    if (Number.isInteger(Number(numStr))) {
        return numStr; // 如果是整数，直接返回该值
    }

    // 使用正则表达式去掉小数点后面的零
    numStr = numStr.replace(/(\.\d*?[1-9])0+$/, '$1'); // 只去掉小数点后面的零

    // 如果小数部分超过6位，截取到6位小数
    const decimalIndex = numStr.indexOf('.');
    if (decimalIndex !== -1) {
        const decimalPart = numStr.slice(decimalIndex + 1);
        const nonZeroDecimalPart = decimalPart.replace(/0+$/, ''); // 去掉末尾的零
        if (nonZeroDecimalPart.length > 6) {
            // 截取到6位小数
            numStr = numStr.slice(0, decimalIndex + 1) + nonZeroDecimalPart.slice(0, 6);
        }
    }

    // 如果小数部分是0，去掉小数点
    return numStr.replace(/\.0$/, ''); // 如果最后是 .0，去掉小数点
}


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
  /* padding: 5px 54px; */
  padding-top: 5px;
  padding-bottom: 5px;
  width: 50%;
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