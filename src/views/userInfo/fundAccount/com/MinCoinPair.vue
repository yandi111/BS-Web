<!-- eslint-disable vue/no-unused-components -->
<!-- eslint-disable vue/no-parsing-error -->

<template>
  <div>
    <div style="padding-top: 22px;" class="flex jb ic">
      <div class="flex">
        <div class="ff" style="font-size: 14px; font-weight: 500;">{{$t('spot_35')}}(<10 CNY)</div>

            <div @click="hideMinCoin(0)" v-if="stateflag" style="width: 40px; height: 20px; margin-left: 10px;">

              <img style="width: 100%;height: 100%;" src="@/assets/images/Friend/icon_button.png" alt="">
            </div>

            <div  @click="hideMinCoin(1)" v-if="!stateflag" style="width: 40px; height: 20px; margin-left: 10px;">

              <img style="width: 100%;height: 100%;" src="@/assets/images/Friend/icon_button2.png" alt="">
            </div>
        </div>

        <div style="width: 182px; height: 34px;">
          <!-- <SelectList :coinPairList="coinPairList" :coinPairTitle="coinPairTitle" /> -->
        </div>

      </div>

      <!-- list   -->
      <div style="width: 100%;">
        <div class="title ff  flex jb ic"
          style="color: #737373;  font-size: 12px; height: 52px; margin-top: 23px;border-bottom: 1px solid #252525;">
          <div class="flex ic">
            <div class="coinpair flex ic is" style="">{{$t('lang_43')}}</div>
            <div style="width: 400px;" class="flex ic is">{{$t('spot_36')}}</div>
            <div style="" class="flex ic is">{{$t('lang_931')}}</div>
          </div>
          <div>{{$t('lang_1845')}}</div>
        </div> 
        <!-- <transition name="fade"> -->

          
          <div v-if="iconOpenState == 1">
            <div  class="overflowcoinItem" style="height: 350px; overflow-y: auto;">
            <div v-for="(item, index) in coinAssetList" :key="index" class="coinItem ff  flex jb ic"
          style="color: #737373;  font-size: 12px; height: 52px; border-bottom: 1px solid #252525; ">
          <div class="flex ic" style="color: #737373;  font-size: 12px; height: 52px; ">
            <div class="coinpair flex ic is" style="">
              <div style="width: 22px; height: 22px ; margin-right: 10px;">
                <img style="width: 100%; height: 100%;" :src="item.iconUrl" alt="">
              </div>
              <div class="ff" style="font-size: 12px; font-weight: 500;">{{ item.coinName }}</div>
            </div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0; width: 400px;">{{ item.total }}
              {{ item.coinName }} &nbsp;<span style="color: #737373;">≈ {{ item.totalUnit }} {{ unitCoin }}</span></div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0;">{{ item.balance }} {{ item.coinName }}
              &nbsp;<span style="color: #737373;">≈ {{ item.balanceUnit }} {{ unitCoin }}</span></div>
          </div>
          <div class="flex ic js" style="font-size: 12px; color: #F0F0F0;">{{ item.freeze }} {{ item.coinName }}
            &nbsp;<span style="color: #737373;">≈ {{ item.freezeUnit }} {{ unitCoin }}</span></div>
        </div>
          </div>
        </div>


          <div v-else class="overflowcoinItem" style="height: 350px; overflow-y: auto;">
            <div v-for="(item, index) in coinAssetList" :key="index" class="coinItem ff  flex jb ic"
          style="color: #737373;  font-size: 12px; height: 52px; border-bottom: 1px solid #252525; ">
          <div class="flex ic" style="color: #737373;  font-size: 12px; height: 52px; ">
            <div class="coinpair flex ic is" style="">
              <div style="width: 22px; height: 22px ; margin-right: 10px;">
                <img style="width: 100%; height: 100%;" :src="item.iconUrl" alt="">
              </div>
              <div class="ff" style="font-size: 12px; font-weight: 500;">{{ item.coinName }}</div>
            </div>
            
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0; width: 400px;">******
              {{ item.coinName }} &nbsp;<span style="color: #737373;">≈ ****** {{ unitCoin }}</span></div>
            <div class="flex ic js" style="font-size: 12px; color: #F0F0F0;">****** {{ item.coinName }}
              &nbsp;<span style="color: #737373;">≈ ****** {{ unitCoin }}</span></div>
          </div>
          <div class="flex ic js" style="font-size: 12px; color: #F0F0F0;">****** {{ item.coinName }}
            &nbsp;<span style="color: #737373;">≈ ****** {{ unitCoin }}</span></div>
        </div>
          </div>
       

      </div>




    </div>
</template>

<script>
import SelectList from "./SelectList.vue";


export default {


  props: {
    coinAssetList: {
      type: Array,
      required: true,
    },
    unitCoin: {
      type: String,
      required: true,
    },
    iconOpenState: {
      type: Number,
      required: true,
    }
  },
  name: "MinCoinPair",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SelectList


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
/* y轴滚动条样式 */
.overflowcoinItem::-webkit-scrollbar {
 width: 1px;
 /* 设置y轴滚动条的宽度 */
}

.overflowcoinItem::-webkit-scrollbar-track {
 background: #f1f1f1;
 /* y轴滚动条轨道的颜色 */
}

.overflowcoinItem::-webkit-scrollbar-thumb {
 background: #888;
 /* y轴滚动条的颜色 */
 border-radius: 6px;
 /* y轴滚动条的圆角 */
}

.overflowcoinItem::-webkit-scrollbar-thumb:hover {
 background: #555;
 /* y轴滚动条悬停时的颜色 */
}

/* x轴滚动条样式 */
.overflowcoinItem::-webkit-scrollbar {
 height: 1px;
 /* 设置x轴滚动条的高度 */
}

.overflowcoinItem::-webkit-scrollbar-track {
 background: #f1f1f1;
 /* x轴滚动条轨道的颜色 */
}

.overflowcoinItem::-webkit-scrollbar-thumb {
 background: #888;
 /* x轴滚动条的颜色 */
 border-radius: 6px;
 /* x轴滚动条的圆角 */
}
</style>
