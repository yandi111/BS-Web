<!-- eslint-disable vue/no-parsing-error -->

<template>
  <div>
    <div style="padding-top: 0px; border-top: 1px solid #252525;" class="flex jb ic">
      <!-- <div class="flex">
        <div class="ff" style="font-size: 14px; font-weight: 500;">隐藏小额币种(<10 CNY)</div>

            <div @click="hideMinCoin(0)" v-if="stateflag" style="width: 40px; height: 20px; margin-left: 10px;">

              <img style="width: 100%;height: 100%;" src="@/assets/images/Friend/icon_button.png" alt="">
            </div>

            <div  @click="hideMinCoin(1)" v-if="!stateflag" style="width: 40px; height: 20px; margin-left: 10px;">

              <img style="width: 100%;height: 100%;" src="@/assets/images/Friend/icon_button2.png" alt="">
            </div>
        </div> -->
      
      </div>
      <!-- list   -->
      <div style="width: 100%;">
        <div class="title ff  flex jb ic"
          style="color: #737373;  font-size: 12px; height: 52px; margin-top: 23px;border-bottom: 1px solid #252525;">
          <div class="flex ic">
            <div class="coinpair flex ic is" style="">{{$t('lang_2385')}}</div>
            <div style="width: 300px;" class="flex ic is">{{$t('spot_36')}}</div>
            <div style="width: 300px;" class="flex ic is">{{$t('lang_1029')}}</div>
            <div style="width: 300px;" class="flex ic is">{{$t('lang_1920')}}</div>
            <div style="" class="flex ic is">{{$t('lang_115')}}</div>
          </div>
          <div>{{$t('lang_776')}}</div>
        </div>
        <!-- <transition name="fade"> -->


          
        <div  class="coinItem ff  flex jb ic"
         v-if="iconOpenState == 1"
          style="color: #737373;  font-size: 12px; height: 52px; border-bottom: 1px solid #252525; ">
          <div class="flex ic" style="color: #737373;  font-size: 12px; height: 52px; ">
            <div class="coinpair flex ic is" style="">
              <div style="width: 22px; height: 22px ; margin-right: 10px;">
                <img style="width: 100%; height: 100%;" src="@/assets/images/user/usdtImg.png" alt="">
              </div>
              <div class="ff" style="font-size: 12px; font-weight: 500;">USDT</div>
            </div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0; width: 300px;">{{  $formatNumberWithCommas( dataInfo.afterBalanceUsdt) }}
              USDT &nbsp;<span style="color: #737373;">≈ {{  $formatNumberWithCommas( dataInfo.afterBalanceUsdt) }} USDT</span>
            </div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0; width: 300px;">{{  $formatNumberWithCommas( dataInfo.unfinishedProfitLossUsdt) }}
              USDT &nbsp;<span style="color: #737373;">≈ {{ $formatNumberWithCommas( dataInfo.unfinishedProfitLossUsdt) }} USDT</span>
            </div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0; width: 300px;">{{$formatNumberWithCommas( dataInfo.earnestMoneyUsdt)}}
              USDT &nbsp;<span style="color: #737373;">≈ {{ $formatNumberWithCommas( dataInfo.earnestMoneyUsdt) }} USDT</span>
            </div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0;">{{ $formatNumberWithCommas( dataInfo.freezeEarnestMoneyUsdt) }} USDT
              &nbsp;<span style="color: #737373;">≈ {{ $formatNumberWithCommas( dataInfo.freezeEarnestMoneyUsdt) }} USDT</span></div>
          </div>
          <div  @click="$router.push('/user/Transfer-v2');"  class="flex ic js" style="font-size: 12px; color: #F0F0F0; cursor: pointer;">
            &nbsp;<span style="color: #90FF00;">{{$t('lang_910')}}</span></div>
        </div>

        <div  class="coinItem ff  flex jb ic"
        v-else
          style="color: #737373;  font-size: 12px; height: 52px; border-bottom: 1px solid #252525; ">
          <div class="flex ic" style="color: #737373;  font-size: 12px; height: 52px; ">
            <div class="coinpair flex ic is" style="">
              <div style="width: 22px; height: 22px ; margin-right: 10px;">
                <img style="width: 100%; height: 100%;" src="@/assets/images/user/usdtImg.png" alt="">
              </div>
              <div class="ff" style="font-size: 12px; font-weight: 500;">USDT</div>
            </div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0; width: 300px;">******
              USDT &nbsp;<span style="color: #737373;">≈ ****** USDT</span>
            </div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0; width: 300px;">******
              USDT &nbsp;<span style="color: #737373;">≈ ****** USDT</span>
            </div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0; width: 300px;">******
              USDT &nbsp;<span style="color: #737373;">≈ ****** USDT</span>
            </div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0;">****** USDT
              &nbsp;<span style="color: #737373;">≈ ****** USDT</span></div>
          </div>
          <div  @click="$router.push('/user/Transfer-v2');"  class="flex ic js" style="font-size: 12px; color: #F0F0F0; cursor: pointer;">
            &nbsp;<span style="color: #90FF00;">{{$t('lang_910')}}</span></div>
        </div>






      <!-- </transition> -->

      </div>




    </div>
</template>

<script>
// import SelectList from "./SelectList.vue";



export default {


  props: {
    dataInfo: {
      type: Object,
      required: false,
    },
    unitCoin: {
      type: String,
      required: false,
    },
    iconOpenState: {
      type: Number,
      required: false,
    }
  },
  name: "MinCoinPair",
  components: {
    // SelectList


  },
  data() {
    return {
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
          name: "USDT",
          code: 54,
        },
      ],
      coinPairTitle: "请选择币种",



    }
  },
  computed: {



  },
  mounted() {

  },
  methods: {
    hideMinCoin(type) {
      if (type == 0) {
        this.stateflag = false
      }else {
        this.stateflag = true
      }
    
      this.$emit('hideMinCoinFn',type)
    }


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

.coinItem:hover {
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