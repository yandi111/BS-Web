<template>
 <div>
  <div style="padding-top: 22px;">
   <div class="ff" style="font-size: 16px; font-weight: 500;">资金流水</div>

   <div class="flex ic" style="margin-top: 19px; ">
    <div style="width: 182px; height: 34px; margin-right: 15px;">
     <SelectList :coinPairList="coinPairList" :coinPairTitle="coinPairTitle"/>
    </div>
    <div style="width: 182px; height: 34px;margin-right: 15px;">
     <SelectList :coinPairList="operateList" :coinPairTitle="operateTitle"/>
    </div>
    <div>
     日期
    </div>

   </div>


  </div>

  <!-- list -->

  <div>

   <div class="flex ic"
        style="width: 100%;font-size: 12px; font-weight: 500;color: #737373;height: 52px;border-bottom: 1px solid #252525">
    <div style="flex: 1;"> 币种</div>
    <div style="flex: 1;"> 类型</div>
    <div style="flex: 1;" class="flex jb">
     <div>时间</div>
     <div>数量</div>
    </div>

   </div>

   <div class="flex ic coinItem"
        style="width: 100%;font-size: 12px; font-weight: 500;color: #F0F0F0;height: 52px;border-bottom: 1px solid #252525">
    <div class="flex" style="flex: 1;">
     <div style="width: 22px; height: 22px ; margin-right: 10px;">
      <img style="width: 100%; height: 100%;" src="@/assets/images/Friend/icon_BTC.png" alt="">
     </div>
     <div class="ff" style="font-size: 12px; font-weight: 500;">BTC</div>

    </div>
    <div style="flex: 1;"> 现货返佣</div>
    <div style="flex: 1;" class="flex jb">
     <div>2024-09-05 14:46:36</div>
     <div>1</div>
    </div>

   </div>
   <div class="flex ic coinItem"
        style="width: 100%;font-size: 12px; font-weight: 500;color: #F0F0F0;height: 52px;border-bottom: 1px solid #252525">
    <div class="flex" style="flex: 1;">
     <div style="width: 22px; height: 22px ; margin-right: 10px;">
      <img style="width: 100%; height: 100%;" src="@/assets/images/Friend/icon_usdt.png" alt="">
     </div>
     <div class="ff" style="font-size: 12px; font-weight: 500;">USDT</div>

    </div>
    <div style="flex: 1;"> 现货返佣</div>
    <div style="flex: 1;" class="flex jb">
     <div>2024-09-05 14:46:36</div>
     <div>2</div>
    </div>

   </div>
   <div class="flex ic coinItem"
        style="width: 100%;font-size: 12px; font-weight: 500;color: #F0F0F0;height: 52px;border-bottom: 1px solid #252525">
    <div class="flex" style="flex: 1;">
     <div style="width: 22px; height: 22px ; margin-right: 10px;">
      <img style="width: 100%; height: 100%;" src="@/assets/images/Friend/icon_eth.png" alt="">
     </div>
     <div class="ff" style="font-size: 12px; font-weight: 500;">ETH</div>

    </div>
    <div style="flex: 1;"> 现货返佣</div>
    <div style="flex: 1;" class="flex jb">
     <div>2024-09-05 14:46:36</div>
     <div>3</div>
    </div>

   </div>


  </div>


 </div>
</template>

<script>
import SelectList from "./SelectList.vue";


export default {


 props: {},
 name: "CapitalFlow",
 components: {
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
     name: "XRP",
     code: 54,
    },
   ],
   coinPairTitle: "请选择币种",

   operateList: [
    {
     id: 2,
     name: "现货返佣",
     code: 53,
    },
    {
     id: 1,
     name: "转出",
     code: 54,
    },
    {
     id: 1,
     name: "合约返佣",
     code: 54,
    },
   ],
   operateTitle: "全部",


  }
 },
 computed: {},
 mounted() {

 },
 methods: {}
};
</script>
<style lang="scss" scoped>
.coinpair {
 width: 170px;
}

.ff {
 color: #F0F0F0;
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