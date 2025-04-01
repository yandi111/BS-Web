<!-- eslint-disable vue/no-mutating-props -->

<template>
  <div class="flex ic jb" style="width: 100%; height: 100%;  border-radius: 4px; margin-top: 5px; overflow: hidden" :style="{ border: eventFlag ? '0.5px solid #90FF00' : '0.5px solid #252525' }">
    <div class="inputLeft" style="height: 100%; width: 60%; border-radius: 4px;">
      <input  @focus="eventFlag = true" @blur="eventFlag = false"
        v-model="withdrawalAmountNumber" @input="withdrawalAmountFn"
        class="custom-input" placeholder="数量"  type="text"
        style=" padding-left: 15px; width: 100%;  color: #F0F0F0;border:none;height: 100%;outline: none ; background-color: #141414;"  />
    </div>

    <div
      style="cursor: pointer;font-size: 12px; white-space: nowrap;  display: flex; justify-content: end ;align-items: center ; margin-right: 30px; ">
     <div class="flex ic" style="width: 20px; height: 20px; cursor: pointer;">

        <div @click="allAmount" style="color: #90FF00; margin-left: 11px;">全部</div>
     </div>
    </div>
  </div>
 
     </template>
     
     <script>
 
     export default {

      
  
      props:{
          confirmingThreshold:{
              type:String,
              required: false,
          },
          withdrawalAmountNumber:{
              type:String,
              required: false,
          },
          coinName:{
              type:String,
              required: false,
          },
          withdrawMin:{
              type:String,
              required: false,
          },
          withdrawMax:{
              type:String,
              required: false,
          }
  
      },
       // eslint-disable-next-line vue/multi-word-component-names
       name: "SelectCoinListNumber",
       components: {
       
         
       },
       data() {
         return { 
          textCont:'',eventFlag:false,
      };
       },
       computed:{
          
   
   
       },
       mounted(){
     
       },
       methods:{
        withdrawalAmountFn(){
          this.$emit('withdrawalAmount',this.withdrawalAmountNumber)
        },
        allAmount(){
          this.$emit('allAmountFn')
        }

 
       
      
     
       }
     };
     </script>
    <style lang='scss' scoped>
    .ff0 {
      color: #F0F0F0;
    }
    .ic {
      align-items: center;
    }
    
    .jc {
      justify-content: center;
    }
    
    .jic {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .img100 {
      width: 100%;
      height: 100%;
    }
    
    .common-content {
      padding: 0 20px;
      font-size: 14px;
      color: #637287;
    
      .img {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
      }
    
      .item {
        margin-top: 15px;
      }
    
      .btn {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 500;
        margin-top: 32px;
        margin-bottom: 10px;
    
        .cancel {
          width: 210px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 6px;
          // border: 1px solid $colorB;
          // color: $colorB;
          color: #333;
          cursor: pointer;
          background: #F4F5F7;
        }
    
        .hoverItem:hover {
          background: #1B1B1B;
        }
    
        .sure {
          width: 210px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          // background: $colorB;
          border-radius: 6px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }

    .ic {
      align-items: center;
    }
    
    .fd {
      flex-direction: column;
    }
    
    .jc {
      justify-content: center;
    }
    
    .jb {
      justify-content: space-between;
    }
    
    .ff {
      font-family: PingFang SC;
    }
    
    .fc {
      color: #F0F0F0;
    }
    
    .ff90 {
      color: #90FF00;
    }
    
    .dropdown-items {
      border-radius: 4px;
      // padding: 8px 12px;
      cursor: pointer;
      overflow: hidden;
      color: #FFFFFF;
    }
    
    .dropdown-items:hover {
      overflow: hidden;
      border-radius: 4px;
      background-color: #252525;
      color: #90ff00;
    }
    
    .rotate {
      transform: rotate(180deg);
      /* 旋转 180 度 */
    }
    
 
    </style>
     