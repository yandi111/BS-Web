<template>
     <div>  
      <div class="flex ic jb" style="margin-bottom: 0px;padding: 10px">
        <div class="flex ic jc">
     <div 
      @click="selectBox(0)" 
      @mouseover="hoveredBox = 0" 
      @mouseleave="hoveredBox = null" 
      :style="{ opacity: isSelected(0) ? 1 : (isHovered(0) ? 1 : 0.3) }" 
      style="width: 20px; height: 20px;"
    >
      <img style="width: 100%; height: 100%;" src="@/assets/images/icon/whole.png" alt="">
    </div>
    <div 
      @click="selectBox(1)" 
      @mouseover="hoveredBox = 1" 
      @mouseleave="hoveredBox = null" 
      style="margin-left: 15px; width: 20px; height: 20px;"
      :style="{ opacity: isSelected(1) ? 1 : (isHovered(1) ? 1 : 0.3) }"
    >
      <img style="width: 100%; height: 100%;" src="@/assets/images/icon/rise_.png" alt="">
    </div>
    <div 
      @click="selectBox(2)" 
      @mouseover="hoveredBox = 2" 
      @mouseleave="hoveredBox = null" 
      style="margin-left: 15px; width: 20px; height: 20px;"
      :style="{ opacity: isSelected(2) ? 1 : (isHovered(2) ? 1 : 0.3) }"
    >
      <img style="width: 100%; height: 100%;" src="@/assets/images/icon/_fill.png" alt="">
      </div>


        </div>





        <div class="flex ic jc"  @click="toggleRotation" style="cursor: pointer;">
    <div style="font-family: PingFang SC; font-size: 12px; font-weight: 500; color: #737373;">0.1</div>
    <div
      class="icon-container"
     
      :class="{ rotate: isRotated }"
      style="margin-left: 4px; margin-bottom: 3px; width: 9px; height: 6px; cursor: pointer; display: flex; justify-content: center; align-items: center;"
    >
       <img style="width: 100%; height: 100%;" src="@/assets/images/icon/icon_tgl.png" alt="" />
   
    </div>
  </div>


        
        </div>
        <div class="flex ic jb" style="padding-left: 10px; padding-right: 10px; font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373;" >
          <!-- <div class="flex ic jb" style="width: 100%; margin-bottom: 0;" > -->
          <div class="flex jb" style="width: 100%; align-items: flex-start;" >
            <div  style=" flex: 0 0 auto; ">价格(USDT)</div>
            <div  style=" flex: 0 0 auto; margin-left: 8px;">数量(BTC)</div>
            <div  style="flex: 0 0 auto;  ">合计(BTC)</div>
          </div>
        </div>
    <div v-if="selectedBox === 0" style="position: relative;display: grid; grid-template-rows: 1fr auto 1fr; height: 100%;" >
        <!-- 上涨列表  --> 
      <div style="height: auto; min-height: 50px;">   
        <div v-for="(item,index) in  buyList.slice(0,7)" :key="index"  class="flex ic jb" style="background-color: #2a1817;  padding-left: 10px; padding-right: 10px; font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #FFFFFF;height: 30px;" >
        <!-- <div v-for="(item,index) in  riseLiselist.slice(0,7)" :key="index"  class="flex ic jb" style="background-color: #2a1817;  padding-left: 10px; padding-right: 10px; font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #FFFFFF;height: 30px;" > -->
          <div class="flex jb" style="width: 100%; align-items: flex-start;" >
            <div style=" flex: 0 0 auto;color: #ED3C2F; ">{{ toFixedTwo(item.price) }}</div>
            <div style=" flex: 0 0 auto; margin-left:0px;">{{ item.amount }}</div>
            <div style="flex: 0 0 auto;  ">{{ item.quantity }}</div>
          </div>
         
        </div>
      </div>
          <div class="container5" style="align-self: center; margin-bottom: 10px;">
            <div v-if="flag" class="flex box5" >
              <div style="margin-top:3.5px !important; ">  <img  style="width: 20px; height: 20px;"src="@/assets/images/icon/icon_riseUp.png" alt=""></div>
              <div style="font-family: PingFang SC;font-size: 16px;font-weight: 600; margin-left: 5px; color:  #0CBB57;" >{{formatNumbertoFixedTwo(buyPrice)}}</div>
            </div> 
            <div v-else class="flex ic jc box5" >
              <div style="margin-top: 5px !important; "> <img style="width: 20px; height: 20px;" src="@/assets/images/icon/icon_downUp.png" alt=""></div>
              <div style="font-family: PingFang SC;font-size: 16px;font-weight: 600; margin-left: 5px; color:  #ED3C2F;" >{{ formatNumbertoFixedTwo(sellPrice) }}</div>
            </div> 
            <div class="spacer"></div>
            <div class="flex box5" >
              <div >
                <img style="width: 20px; height: 20px;" src="@/assets/images/icon/redFlag.png" alt="">
              </div>
              <div style="font-family: PingFang SC;font-size: 16px;font-weight: 500; color:#737373; margin-left: 4px;" >{{ formatNumbertoFixedTwo(sellPrice) }}</div>
            </div>
          </div>
         <!-- 下跌列表  -->  
      <div style="padding-bottom: 30px; height: auto; min-height: 50px;">      
          <div v-for="(item,index) in  sellList.slice(0,7)" :key="index"   class="flex ic jb" style="padding-left: 10px; padding-right: 10px; font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #FFFFFF; height: 30px;" >
          <!-- <div v-for="(item,index) in  fallLise.slice(0,7)" :key="index"   class="flex ic jb" style="padding-left: 10px; padding-right: 10px; font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #FFFFFF; height: 30px;" > -->
          <div class="flex jb" style="width: 100%; align-items: flex-start;" >
            <div style=" flex: 0 0 auto;color: #0CBB57;">{{ toFixedTwo(item.price) }}</div>
            <div style=" flex: 0 0 auto; margin-left:0px;">{{ item.amount }}</div>
            <div style="flex: 0 0 auto;  ">{{ item.quantity }}</div>
          </div>
         
        </div>
      </div>
      </div>
    <!-- 单独上涨列表 -->
  <div v-if="selectedBox === 1" style="padding-bottom: 30px; ">
    <div v-for="(item,index) in  buyList" :key="index"   class="flex ic jb" style="padding-left: 10px; padding-right: 10px; font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #FFFFFF;height: 30px;" >
          <!-- <div class="flex ic jb" style="width: 100%; margin-bottom: 0;" > -->
          <div class="flex jb" style="width: 100%; align-items: flex-start;" >
            <div style=" flex: 0 0 auto;color: #0CBB57;">{{ toFixedTwo(item.price) }}</div>
            <div style=" flex: 0 0 auto; margin-left:0px;">{{ item.amount }}</div>
            <div style="flex: 0 0 auto;  ">{{ item.quantity }}</div>
          </div>
         
     </div>
    </div>
     <!-- 单独下跌列表 -->
  <div v-if="selectedBox === 2">   
    <div v-for="(item,index) in sellList" :key="index"   class="flex ic jb" style="padding-left: 10px; padding-right: 10px; font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #FFFFFF; height: 30px;" >
          <!-- <div class="flex ic jb" style="width: 100%; margin-bottom: 0;" > -->
          <div class="flex jb" style="width: 100%; align-items: flex-start;" >
            <div style=" flex: 0 0 auto;color: #ED3C2F;">{{ item.price }}</div>
            <div style=" flex: 0 0 auto; margin-left:0px;">{{ item.amount }}</div>
            <div style="flex: 0 0 auto;  ">{{ item.quantity }}</div>
          </div>
         
     </div>
    </div>

      
      </div>
  </template>
  <script>
  export default {
    data() {
      return {
        isRotated: false, // 控制旋转状态
        selectedBox: 0, // 当前选中的盒子
        hoveredBox: null ,// 当前悬停的盒子
        isRotated: false,
        riseLise:[
          {
            price:'02011888',
            amount:'02011',
            quantity:'02011'
          },{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          },{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
         
        ],
        fallLise:[
        {
            price:'02011',
            amount:'02011',
            quantity:'02011'
          },{
            price:'02012',
            amount:'02011',
            quantity:'02011'
          },{
            price:'02013',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02014',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02015',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02016',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02017',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
          ,{
            price:'02011',
            amount:'02011',
            quantity:'02011'
          }
        ],
        dataListState:0
      }
    },
    mounted() {
      document.addEventListener('click', this.handleOutsideClick)
      
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleOutsideClick)
    },
    computed:{
      riseLiselist (){
      return this.riseLise ? this.riseLise : []
      },
      tradeDataList() {
        return this.$store.state.orderTab.tradeDataList || {}
      },
      buyList(){
        return this.tradeDataList.buyList ? this.tradeDataList.buyList : []
      },
      sellList(){
        return this.tradeDataList.buyList ? this.tradeDataList.sellList : []
      },

      buyPrice() {
        return this.$store.state.orderTab.buyPrice
      },
      sellPrice() {
        return this.$store.state.orderTab.sellPrice
      },
    
      flag(){
        if (this.buyPrice > this.sellPrice) {
          return true
        }else{
          return false
        }
      }

    },
    methods: {
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
      toggleRotation() {
      this.isRotated = !this.isRotated; // 切换旋转状态
    },
      toFixedTwo(num) {
      if (isNaN(num)) {
        return null; // 如果输入不是数字，返回 null
      }
      return parseFloat(num).toFixed(2); // 保留两位小数并返回字符串
    },

      selectBox(index) {
      this.selectedBox = index; // 设置选中的盒子
      this.dataList(index); // 调用 dataList 方法
    },
    isSelected(index) {
      return this.selectedBox === index; // 判断是否为选中的盒子
    },
    isHovered(index) {
      return this.hoveredBox === index; // 判断是否为悬停的盒子
    },

      dataList(active){
        this.dataListState = active

      },
      toggleRotation(event) {
        event.stopPropagation()
        this.isRotated = !this.isRotated
      },
      handleOutsideClick() {
        this.isRotated = false
      }
    }
  }


  </script>
  
<style lang="scss">
.icon-container {
  transition: transform 0.3s; /* 旋转动画 */
  transform-origin: center; /* 设置旋转中心为容器的中心 */
}

.rotate {
  transform: rotate(180deg); /* 旋转 180 度 */
}

// img {
//   width: 100%; /* 确保图片填满容器 */
// }
//  import '@/assets/css/swapOr.css'
</style>
  