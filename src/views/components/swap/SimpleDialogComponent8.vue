<template>
  <div>
    <!-- <button @click="openDialog">打开对话---=====</button> -->

    <transition name="fade">
      <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
        <div class="dialog-content" style="border:1px solid #252525;">

          <div class="flex "
            style="padding-top: 17px; padding-bottom: 17px; padding-left: 17px; padding-right: 17px;  border-bottom:1px solid #252525; ">
            <div class="ff" style="font-size: 14px; color: #FFFFFF; ">止盈止损 {{ entrustList.childCoinName }}{{
              entrustList.motherCoinName }}
              <span :style="{ color: entrustList.direction == 0 ? '#0fbb57' : '#ED3C2F' }" style="color:#ED3C2F; ;">
                {{ entrustList.direction == 0 ? '开多' : '开空' }}
              </span>
            </div>
            <div class="flex jc ic"
              style="font-family: PingFang SC;font-size: 12px;font-weight: 400; font-size:12px;color:#737373; border: 1px solid #494949; border-radius: 4px; padding-left: 5px; padding-right: 5px; margin-left: 5px; ">
              {{ entrustList.depotType == 0 ? '逐仓' : '全仓' }}{{ entrustList.depotMode == 0 ? '合仓' : '分仓' }}</div>
            <div class="flex jc ic"
              style="font-family: PingFang SC;font-size: 12px;font-weight: 400; font-size:12px;color:#737373; border: 1px solid #494949; border-radius: 4px; padding-left: 5px; padding-right: 5px; margin-left: 4px; ">
              {{ entrustList.multiple }}X</div>



            <div><button @click="isDialogVisible = false" class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              </button></div>

          </div>

          <div class="flex" style="margin-top: 15px; margin-bottom: 10px;padding-left:16px;margin-right: 5px; ">
            <div style="color: #737373; font-size: 12px;">市场价</div>&nbsp;
            <div style="color:#0CBB57 ; font-size: 12px;">{{ $thousandth(entrustList.marketPrice) }}</div>
          </div>
          <div style="padding-left:16px ; padding-right: 16px;">
            <div class="flex" style="width: 100%; margin-top: 10px;">
              <div style="width: 100%; border: 1px solid rgba(0, 0, 0, 0); ">
                <div :style="containerStyle"
                  style="padding-left: 10px;margin-top: 8px; display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;">
                  <div style="color: #737373; font-size: 12px;">委托价格</div>
                  <input @focus="setFocus(true)" @blur="setFocus(false)" v-model="entrustedPrice"
                    style=" color:#FFFFFF;padding-left: 2px; padding-right: 2px; padding-top: 5px; padding-bottom: 5px; caret-color: #90FF00; border: 1px solid rgba(0, 0, 0, 0); background: #252525; text-align: center; flex: 1;"
                    placeholder="" type="text">
                  <div style="color: #666; font-size: 12px; position: absolute; right: 5px; font-weight: 500; ">USDT
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div style="padding-left:16px ; padding-right: 16px;">
            <div class="flex" style="width: 100%; margin-top: 10px;">
              <div style="width: 100%; border: 1px solid rgba(0, 0, 0, 0); ">
                <div :style="containerStyle1"
                  style="padding-left: 10px;margin-top: 8px; display: flex; align-items: center; border-radius: 4px; overflow: hidden; position: relative;">
                  <div style="color: #737373; font-size: 12px;">数量</div>
                  <input v-model="entrustedData" @focus="setFocus1(true)" @blur="setFocus1(false)"
                    style="color: #FFFFFF; padding-left: 2px; padding-right: 2px; padding-top: 5px; padding-bottom: 5px; caret-color: #90FF00; border: 1px solid rgba(0, 0, 0, 0); background: #252525; text-align: center; flex: 1;"
                    placeholder="" type="text">
                  <div style="color: #666; font-size: 12px; position: absolute; right: 5px; font-weight: 500; "> {{
                    typeBUInfo }}</div>
                </div>

              </div>

            </div>
          </div>

          <div class="con " style="padding-top: 10px;padding-left: 17px; padding-right: 17px;">
            <div class="flex ic jb" style="margin-top: 15px;">
              <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;">开仓保证金</div>
              <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF; ">{{
                entrustList.earnestMoney }} USDT </div>
            </div>
            <div class="flex ic jb" style="margin-top: 15px;">
              <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;">可开</div>
              <div style="font-family: PingFang SC;font-size: 13px;font-weight: 600; color: #FFFFFF; ">{{
              $formatNumberWithCommas(entrustedDatash)}} {{ typeBUInfo }} </div>
            </div>
            <button @click="closeDialog" class="confirm-button"
              style="padding-left: 158px;padding-right: 158px;">确定</button>
          </div>


        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import slider2 from './slider2.vue';
import { mapGetters } from 'vuex';
import tgl from './tgl.vue';
import {UpdateContractList} from "@/api/hy";
export default {
  components: { slider2, tgl },
  name: 'SimpleDialogComponent8',
  data() {
    return {
      activeIndex: null,
      isFocused: false,
      isFocused1: false,
      isDialogVisible: false,
      selectedIndex: 1, // 默认选中第二个盒子
      isSecondSelected: true,// 默认选中第二个盒子
      isSecondSelected2: true, // 默认选中第二个盒子,
      entrustList: {
        marketPrice: 111, earnestMoney: 222
      },
      entrustedPrice: null,
      entrustedData: null,
      entrustedDatash: null
    }
  },
  computed: {

    ...mapGetters(['getBalanceInfo', 'getSelectedCurrency','getFeeRateInfo','getToken']),
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
    }
  },
  methods: {
    // eslint-disable-next-line vue/return-in-computed-property
    //   usdtBtcOpenPrice(){
    //    //   this.getBalanceInfo
    //  //  杠杆    multiple
    //  //手续费    commissionCharge
    //  // 委托价   entrustPrice

    //     if (this.selectedValue == 1) {    // usdt   可开: 可用资金 *杠杆 *(1-手续费%)
    //       return this.balanceInfo * this.getMultiple * (1 - this.feeRateInfo)
    //     // eslint-disable-next-line no-empty
    //     }else if (this.selectedValue == 2) { // btc  可开: 可用资金 *杠杆 *(1-手续费%) /价格 
    //       if (this.selectedIndex == 0) {     //市价

    //         return this.balanceInfo * this.getMultiple * (1 - this.feeRateInfo) / this.getEntrustPrice || 0

    //        }else if(this.selectedIndex == 1){  //限价

    //         return this.balanceInfo * this.getMultiple * (1 - this.feeRateInfo) / this.entrustPrice

    //        }

    //     }

    //   },



    toggleActive(index) {
      this.activeIndex = this.activeIndex === index ? null : index
    },
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
    openDialog(active) {

      console.log(active, "activeactiveactiveactive");
      // typeBUInfo
      this.isDialogVisible = true
      this.entrustList = active // 委托列表
      this.entrustedPrice = active.entrustPrice
      //  this.entrustedData = active.entrustAmount
      if (this.typeBUInfo == 'USDT') {
        this.entrustedData = active.motherCoinAmount
      } else {
        this.entrustedData = active.childCoinAmount
      }

      

      //手续费    commissionCharge
      // 委托价   entrustPrice
      if (this.typeBUInfo == 'USDT') {    // usdt   可开: 可用资金 *杠杆 *(1-手续费%)    
        this.entrustedDatash = this.getBalanceInfo * active.multiple * (1 - this.getFeeRateInfo)
      } else {                               // btc  可开: 可用资金 *杠杆 *(1-手续费%) /价格 
        this.entrustedDatash = this.getBalanceInfo * active.multiple * (1 - this.getFeeRateInfo) / active.entrustPrice
      }
    },
    closeDialog() {

      if (!this.entrustedPrice) {
        this.$customMessage(1,"请输入委托价格")
      
      } else if (!this.entrustedData) {
        this.$customMessage(1,"请输入委托数量")
      } else {
        this.SurplusLossPrice()
      }
    },


    // NSDictionary*dic=@{
    //   @“type”:@(4),
    //   @“id”:self.tradModel.id,
    // @“amount”:self.numTextFld.text,
    // @“entrustPrice”:self.priceTextFld.text,
    // @“denominatedUnit”:@(ChlidMothIndx)};

    async SurplusLossPrice() {
      let parameter = {
        amount: Number(this.entrustedData),
        entrustPrice: this.entrustedPrice,
        id: this.entrustList.id,
        denominatedUnit: this.typeBUInfo === 'USDT' ? 0 : 1,
        type: 4,
      }

      try {
       const res = await UpdateContractList(JSON.stringify(parameter))
       this.$customMessage(res.code === 200 ? 0 : 2,res.code === 200 ? '修改成功' : res.msg)
      } catch (e) {
       console.log(e)
      }
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

input:focus {
  outline: none
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

.percent-box {
  transition: all 0.3s ease;
}

.active {
  color: #FFFFFF !important;
  border-color: #737373 !important;
}
</style>