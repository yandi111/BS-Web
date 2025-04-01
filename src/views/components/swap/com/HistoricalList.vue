<!-- 历史委托 -->
<template>
 <transition name="fade">
  <div>

   <div class="flex" style=" padding-left: 16px; margin-bottom: 15px;">
    <div style="width: 143px; height: 24px; margin-right: 10px;">
     <SelectList :chainList=getInitListInfo :chainListTitle=chainListTitle @chainListFn="chainListFn"/>
    </div>
    <div style="width: 143px; height: 27px; margin-right: 10px;">

     <SelectListPrice :chainList=positionList :chainListTitle=positionTitle
                      @chainListFn="positionListFn"/>
    </div>
    <div class="rangeSeparator" style="width: 240px; height: 24px; margin-right: 10px;">
     <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="-"
                     style="height: 27px !important; line-height: 27px !important; border: 1px solid #252525 !important; color: #737373 !important;"
                     start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                     @change="handleDateChange">
     </el-date-picker>

    </div>
   </div>
   <div class="containerInfo" v-if="historicalList.length > 0" style="height: 300px;overflow-y: auto;">


    <div v-for="(item, index) in historicalList" :key="index"
         style="width: 100%; padding-top: 20px; padding-left: 16px; padding-bottom: 17px; border-bottom: 1px solid #252525; padding-right: 15px;"
         class="flex jb">

     <div style="">
      <div class="flex jb" style="margin-bottom: 15px; width: 100%;">

      <div class="flex" style="margin-bottom: 15px;">
       <!-- 绿色: #0CBB57;   红色 :#ED3C2F;   :style="{color:item.direction == 0  ? '#0CBB57;' : '#ED3C2F;'}" -->
       <div style="font-size: 14px; font-weight: 600; color: #F0F0F0; ">{{ item.childCoinName }}{{
         item.motherCoinName
        }} <span style="font-size: 13px ; color: #ED3C2F;" :style="{ color: item.direction == 0 ? '#0CBB57' : '#ED3C2F' }">
                                    {{ item.direction == 0 ? '多' : '空' }} {{
          item.limitIs == 1 ? '止盈' : item.limitIs ==
          2
           ? '止损' : item.limitIs == 3 ? '止赢止损' : ''
         }} </span>
       </div>
    
       <div
        style="width: 57px; height: 20px; background-color: #252525; color: #737373; border-radius: 4px; font-size: 12px; margin-left: 5px;"
        class="jic">
        {{ item.depotType == 0 ? '逐仓' : '全仓' }}{{ item.depotMode == 0 ? '合仓' : '分仓' }}
       </div>
       <div
        style="width: 46px; height: 20px; background-color: #252525; color: #737373; border-radius: 4px; font-size: 12px; margin-left: 5px;"
        class="jic">{{ item.multiple }}X
       </div>
      </div>

         <div></div>
      </div>

      <div class="flex">
       <div  class="ff"
            style="font-size: 12px; font-weight: 500; margin-right: 15px;color: #737373; ">
        委托量({{ typeBUInfo == item.motherCoinName ? item.motherCoinName : item.childCoinName }})
       </div>

       
       <div class="ff" style="font-weight: 600; font-size: 12px ;color:#F0F0F0">
        {{ typeBUInfo == 'USDT' ? item.motherCoinAmount : item.entrustAmount }}
       </div>

      </div>
      <div class="flex" style="margin-top:11px;">
       <div class="ff"
            style="font-size: 12px; font-weight: 500; margin-right: 15px;color: #737373; ">
        成交量({{ typeBUInfo == item.motherCoinName ? item.motherCoinName : item.childCoinName }})
       </div>
       
       <div v-if="item.tradeStatus == 2"  class="ff" style="font-weight: 600; font-size: 12px;color:#F0F0F0">
        0.00
       </div>

       <div v-else class="ff" style="font-weight: 600; font-size: 12px;color:#F0F0F0">
        {{ typeBUInfo == 'USDT' ? item.motherCoinAmount : item.entrustAmount }}

       </div>
      </div>

     </div>

     <div class="flex" style="padding-top: 38px;">
      <div   v-if="item.closeDepotPrice && item.closeDepotPrice > 0"  class="flex  jc" style="flex-direction: column;">
       <div style="color: #737373; font-size: 12px;margin-bottom: 11px;">强平价</div>
      </div>

      <div v-else class="flex  jc" style="flex-direction: column;">
        <div style="color: #737373; font-size: 12px;margin-bottom: 11px;"> {{ item.tradeType == 0 ? '委托价' : '委托类型' }} </div>
       <div style="color: #737373; font-size: 12px;">成交均价</div>
      </div>

      <div  v-if="item.closeDepotPrice && item.closeDepotPrice > 0"  class="flex jc" style="flex-direction: column;">
       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;margin-bottom: 11px;">
        {{$formatNumberWithCommas(item.closeDepotPrice) }}
       </div>
      </div>

      <div  v-else  class="flex jc" style="flex-direction: column;">

       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;margin-bottom: 11px;">
     
        {{ item.tradeType == 0 ? $formatNumberWithCommas(item.entrustPrice)  : '市价' }} 
       </div>

       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;">{{
       item.tradeStatus == 2 ? '--' :  $formatNumberWithCommas(item.tradePriceAvg)  
        }}
       </div>
      </div>




     </div>

<!-- 委托价 entrustPrice  -->

     <div style="padding-top: 38px;">
      <div class="flex" style="margin-bottom: 11px; ">
       <div style="color: #737373; font-size: 12px;">委托时间</div>
       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;">
        {{ $formatInit(item.createTime) }}
       </div>
      </div>
      <div class="flex">
       <div style="color: #737373; font-size: 12px;"> {{ item.tradeStatus == 2 ? '撤单时间' : '成交时间' }} </div>
       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;">{{
        
          $formatInit(item.updateTime)
        }}
       </div>
      </div>
     </div>


     <div class="flex" style="padding-top: 38px;padding-right: 20px;position: relative;">

      <div v-if="item.tradeStatus == 2" style="color: #525252; font-size: 12px; font-weight: 600; position: absolute; right: 0; top: -5px;">{{ item.tradeStatus == 2 ? '已撤单' : '' }}</div>

       <div v-else class="flex ic" style="position: absolute; right: 0; top: -5px;">
        <div style="color: #B3B3B3; font-size: 12px; font-weight: 600; ">
          
          {{ 
        item.completedAmount == 0 ? '未成交' : item.completedAmount/1 == item.entrustAmount/1 ? '全部成交':'部分成交'
           }} </div>
        <div style="width: 10px;height: 14px;">
          <!-- <img width="100%" height="100%" src="@/assets/images/invite/arr_right.png" alt=""> -->
        </div>
       </div>

       <div class="flex  jc" style="flex-direction: column; ">
       <div style="color: #737373; font-size: 12px;margin-bottom: 11px;">盈亏</div>
       <div style="color: #737373; font-size: 12px;">预扣分润</div>
      </div>

      <div class="flex jc" style="flex-direction: column;">
       <!-- <div style="color: #737373; font-size: 12px;">预扣分润</div> -->
       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;margin-bottom: 11px;"
            :style="{ color: item.finishedProfitLoss > 0 ? '#0CBB57' : '#ED3C2F' }">{{

         item.finishedProfitLoss ? $formatNumberWithCommas(item.finishedProfitLoss) : '--'
        }}
       </div>

       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;">--</div>
      </div>
     </div>
    </div>

   </div>
   <div v-else class="flex jc ic"
        style="flex-direction: column;  width: 100%; margin-top: 20px; height: 80%; ">
    <div style="width: 48px; height: 48px;">
     <img style="width: 100%; height: 100%;" src="@/assets/images/icon/icon_Null_status.png">
    </div>
    <div style="color: #737373;">数据为空</div>
   </div>

  </div>

 </transition>
</template>

<script>
import {mapGetters} from 'vuex';
import SelectList from './SelectList.vue';
import SelectListPrice from './SelectListPrice.vue';
import {GetContractList} from "@/api/hy";

export default {
 components: {
  SelectList, SelectListPrice
 },
 data() {
  return {
   historicalList: [],
   contractIdInfo: '', // 列表合约id

   chainListTitle: '全部',
   chainList: [
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
   positionTitle: '全部',
   positionList: [
    {
     id: '',
     name: "全部",
     code: 53,
    },
    {
     id: 1,
     name: "市价",
     code: 53,
    },
    {
     id: 0,
     name: "限价",
     code: 54,
    }
   ],
   value2: '',
   pickerOptions: {
    shortcuts: [{
     text: '7天',
     onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
     }
    }, {
     text: '30天',
     onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
     }
    }, {
     text: '90天',
     onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
     }
    }]
   },
   startTime: '',
   endTime: ''

  }
 },
 mounted() {
  this.cancelOrder(1, 100, '', this.startTime, this.endTime, '')
 },
 created() {
  this.initTime()
 },
 methods: {

  initTime() {
   const currentDate = new Date();

   // 获取三个月之前的时间
   const threeMonthsAgo = new Date();
   threeMonthsAgo.setMonth(currentDate.getMonth() - 3); // 设置为当前月份减去3
   this.startTime = this.formatDate(threeMonthsAgo)
   this.endTime = this.formatDate(currentDate)
  },

  async cancelOrder(page, rows, contractId, startTime, endTime, tradeType) {
   Promise.try(async () => {
    return await GetContractList({page, rows, contractId, startTime, endTime, tradeType})
   }).then(res => {
    this.historicalList = res.data
   }).catch(() => {
    this.$closeLoading()
   })

   this.isDialogVisible = false
  },
  handleDateChange(value) {
   const startDate = value[0]; // 开始日期
   const endDate = value[1]; // 结束日期
   // 格式化日期为 YYYY-MM-DD
   const formattedStartDate = this.formatDate(startDate);
   const formattedEndDate = this.formatDate(endDate);
   this.cancelOrder(1, 100, '', formattedStartDate, formattedEndDate, '')
  },

  formatDate(date) {
   if (!date) return ''; // 如果日期为空，返回空字符串
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
   const day = String(date.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`; // 返回格式化后的日期
  },

  chainListFn(item) {
   this.initTime()
   if (item === 'IDNULL') {
    this.chainListTitle = '全部'
    this.cancelOrder(1, 100, '', this.startTime, this.endTime, '')
   } else {
    this.chainListTitle = item.contract.coinsName.match(/^([A-Z]+)-/)[1]
    this.contractIdInfo = item.contract.id
    this.cancelOrder(1, 100, this.contractIdInfo, this.startTime, this.endTime, '')
   }
  },
  positionListFn(item) {
   this.initTime()
   this.positionTitle = item.name
   this.cancelOrder(1, 100, this.contractIdInfo, this.startTime, this.endTime, item.id)
  },

 },
 computed: {
  ...mapGetters(['getToken', 'getSelectedCurrency', 'getInitListInfo']),
  tokenInfo() {
   return this.getToken
  },
  typeBUInfo() {
   return this.getSelectedCurrency; // 如果没有选择，显示默认文本
  },
 }
}
</script>

<style scoped>
.tips-container {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 z-index: 9999;
}

.tips-content {
 background-color: rgba(0, 0, 0, 0.7);
 color: #fff;
 padding-top: 12px;
 padding-bottom: 12px;
 padding-left: 30px;
 padding-right: 96px;
 border-radius: 4px;
 display: flex;
 align-items: center;
 border: 0.5px solid #252525
}

.tips-icon {
 width: 20px;
 height: 20px;
}

.tips-text {
 font-size: 14px;
 margin-left: 20px;
}

.fade-enter-active,
.fade-leave-active {
 transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
 opacity: 0;
}

.ff0 {
 color: #F0F0F0;
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

/* y轴滚动条样式 */
.containerInfo::-webkit-scrollbar {
 width: 1px;
 /* 设置y轴滚动条的宽度 */
}

.containerInfo::-webkit-scrollbar-track {
 background: #f1f1f1;
 /* y轴滚动条轨道的颜色 */
}

.containerInfo::-webkit-scrollbar-thumb {
 background: #888;
 /* y轴滚动条的颜色 */
 border-radius: 6px;
 /* y轴滚动条的圆角 */
}

.containerInfo::-webkit-scrollbar-thumb:hover {
 background: #555;
 /* y轴滚动条悬停时的颜色 */
}

/* x轴滚动条样式 */
.containerInfo::-webkit-scrollbar {
 height: 1px;
 /* 设置x轴滚动条的高度 */
}

.containerInfo::-webkit-scrollbar-track {
 background: #f1f1f1;
 /* x轴滚动条轨道的颜色 */
}

.containerInfo::-webkit-scrollbar-thumb {
 background: #888;
 /* x轴滚动条的颜色 */
 border-radius: 6px;
 /* x轴滚动条的圆角 */
}

.el-date-table th {
 border: none !important;
 border-bottom: 1px solid #252525 !important;

}
</style>
<style>
.rangeSeparator .el-date-editor--daterange {
 font-size: 12px !important;
 width: 100% !important;
 /* height: 25px !important; */
 /* line-height: 28px !important; */
 background: #141414 !important;
 border: 1px solid #252525 !important;
 border-radius: 4px !important;
 color: #737373 !important;
}

.rangeSeparator .el-range-input {
 font-size: 11px !important;
 background: #141414 !important;
 color: #737373 !important;

}

.rangeSeparator .el-range-input::placeholder {
 color: #737373;
 /* 设置 placeholder 的颜色 */
}

.rangeSeparator .el-date-editor {
 font-size: 11px !important;
 color: #737373 !important;

}

.rangeSeparator .el-icon-date {
 height: 24px;

}

/* el-input__icon el-range__close-icon */
.rangeSeparator .el-range__close-icon {
 display: flex !important;
 justify-content: center !important;
 color: #737373;
 align-items: center !important;

}

.rangeSeparator .el-range__icon {
 /* padding-bottom: 29px !important; */
 display: flex !important;
 justify-content: center !important;
 align-items: center !important;
 color: #737373;
}

.rangeSeparator .el-range-separator {
 /* padding-bottom: 29px !important; */
 display: flex !important;
 justify-content: center !important;
 align-items: center !important;
}

/* el-input__icon el-range__icon el-icon-date */
/* .rangeSeparator .el-range__icon {
    width: 100%;
    height: 100%;
} */

.has-sidebar {
 background-color: #141414 !important;
 border: none;
 /* border: 0.5px solid #252525; */
}

.el-picker-panel__sidebar {
 background-color: #141414 !important;
 border: none;
 border: 1px solid #252525 !important;
}

.el-picker-panel__body-wrapper {
 /* width: 700px !important; */
 border: 0.5px solid #252525;

}

.el-date-range-picker__content.is-left {
 border-right: 1px solid #252525 !important;
}


.el-date-table td.start-date div {
 background-color: #252525 !important;
}

.el-date-table td.end-date div {
 background-color: #252525 !important;
}

.el-date-table td.in-range div {
 background-color: #252525 !important;
}

.el-date-table td.start-date span,
.el-date-table td.end-date span {
 background-color: #3b3b3b !important;
}

.in-range {
 /* background-color: #3b3b3b !important; */
}

/*  选中  in-range    start-date   end-date */
/* .in-range {
    background-color: #3b3b3b !important;
    color: #FFFFFF !important;
 }
 .start-date .end-date{
    background-color: #252525 !important;
 } */
.el-popper {
 border-right: none !important;
}
</style>