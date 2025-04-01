
<template>
   <div>
   <div style="padding-top: 22px;"  class="flex jb ic">
        <div class="flex">
          <div class="ff" style="font-size: 14px; font-weight: 500;">隐藏小额币种(<10 CNY)</div>
            <div style="width: 40px; height: 20px; margin-left: 10px;" @click="stateflag = !stateflag">
             
              <img v-if="stateflag" style="width: 100%;height: 100%;" src="@/assets/images/Friend/icon_button.png" alt="">
              <img v-if="!stateflag" style="width: 100%;height: 100%;" src="@/assets/images/Friend/icon_button2.png" alt="">
            </div>
        </div>

        <div style="width: 182px; height: 34px;">
          <SelectList :coinPairList="coinPairList" :coinPairTitle ="coinPairTitle" />
        </div>

     </div>

     <!-- list -->
      <div style="width: 100%;">
        <div class="title ff  flex jb ic" style="color: #737373;  font-size: 12px; height: 52px; margin-top: 23px;border-bottom: 1px solid #252525;">
            <div class="flex ic">
                <div class="coinpair flex ic is" style="">币种</div>
                <div class="flex ic is">账户资产</div>
            </div>
            <div>操作</div>
        </div>

        <div class="coinItem ff  flex jb ic" style="color: #737373;  font-size: 12px; height: 52px; border-bottom: 1px solid #252525; ">
            <div class="flex ic" style="color: #737373;  font-size: 12px; height: 52px; ">
                <div class="coinpair flex ic is" style="">
                    <div style="width: 22px; height: 22px ; margin-right: 10px;"> 
                        <img style="width: 100%; height: 100%;" src="@/assets/images/Friend/icon_BTC.png" alt="">
                    </div>
                    <div class="ff" style="font-size: 12px; font-weight: 500;">BTC</div>
                </div>
                <div class="flex ic js" style="font-size: 12px; color: #F0F0F0;">0.00000000 BTC &nbsp;<span style="color: #737373;">≈ 0.00 USDT</span></div>
            </div>
            <div style="color: #90FF00; cursor: pointer;">划转</div>
        </div>
        <div class="coinItem ff  flex jb ic" style="color: #737373;  font-size: 12px; height: 52px; border-bottom: 1px solid #252525; ">
            <div class="flex ic" style="color: #737373;  font-size: 12px; height: 52px; ">
                <div class="coinpair flex ic is" style="">
                    <div style="width: 22px; height: 22px ; margin-right: 10px;"> 
                        <img style="width: 100%; height: 100%;" src="@/assets/images/Friend/icon_usdt.png" alt="">
                    </div>
                    <div class="ff" style="font-size: 12px; font-weight: 500;">BTC</div>
                </div>
                <div class="flex ic js" style="font-size: 12px; color: #F0F0F0;">0.00000000 USDT &nbsp;<span style="color: #737373;">≈ 0.00 USDT</span></div>
            </div>
            <div style="color: #90FF00; cursor: pointer;">划转</div>
        </div>
        <div class="coinItem ff  flex jb ic" style="color: #737373;  font-size: 12px; height: 52px; border-bottom: 1px solid #252525; ">
            <div class="flex ic" style="color: #737373;  font-size: 12px; height: 52px; ">
                <div class="coinpair flex ic is" style="">
                    <div style="width: 22px; height: 22px ; margin-right: 10px;"> 
                        <img style="width: 100%; height: 100%;" src="@/assets/images/Friend/icon_eth.png" alt="">
                    </div>
                    <div class="ff" style="font-size: 12px; font-weight: 500;">BTC</div>
                </div>
                <div class="flex ic js" style="font-size: 12px; color: #F0F0F0;">0.00000000 ETH &nbsp;<span style="color: #737373;">≈ 0.00 USDT</span></div>
            </div>
            <div style="color: #90FF00; cursor: pointer;">划转</div>
        </div>

      </div>




    </div>
    </template>
    
    <script>
    import SelectList from "./SelectList.vue";
    

    export default {
     
 
     props:{
       
 
     },
      name: "MinCoinPair",
      components: {
        SelectList
         
        
      },
      data() {
        return {
            stateflag:true,
      coinPairList:[
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
      coinPairTitle:"请选择币种",


    
        }
      },
      computed:{
         
  
  
      },
      mounted(){
    
      },
      methods:{
     
    
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
    