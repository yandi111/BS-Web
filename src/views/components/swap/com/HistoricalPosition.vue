<!-- 历史仓位-->
<template>
 <transition name="fade">
  <div>

   <div class="flex" style=" padding-left: 16px; margin-bottom: 20px;">
    <div style="width: 143px; height: 24px; margin-right: 10px;">
     <SelectList :chainList=getInitListInfo :chainListTitle=chainListTitle
                 @chainListFn="chainListFn"/>
    </div>
    <div style="width: 143px; height: 27px; margin-right: 10px;">

     <SelectListPrice :chainList=positionList :chainListTitle=positionTitle
                      @chainListFn="positionListFn"/>
    </div>
    <div class="rangeSeparator" style="width: 240px; height: 24px; margin-right: 10px;">
     <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels
                     range-separator="-"
                     style="height: 27px !important; line-height: 27px !important; border: 1px solid #252525 !important; color: #737373 !important;"
                     :start-placeholder="$t('lang_216')" :end-placeholder="$t('lang_920')" :picker-options="pickerOptions"
                     popper-append-to-body
                     @change="handleDateChange"
     >
     </el-date-picker>

    </div>
   </div>
   <div v-if="historicalList.length > 0" style="height: 300px;overflow-y: auto ; " class="containerInfo">

    <div v-for="(item, index) in historicalList" :key="index"
         style="width: 100%; padding-top: 20px; padding-left: 16px; padding-bottom: 17px; border-bottom: 1px; border-bottom: 1px solid #252525; padding-right: 15px;"
         class="flex jb">

     <div style="">
      <div class="flex" style="margin-bottom: 15px;"> 

        <!-- closeDepotType = 0 是自平   -->
       <!-- 绿色: #0CBB57;   红色 :#ED3C2F;   :style="{color:item.direction == 0  ? '#0CBB57;' : '#ED3C2F;'}" -->
       <div style="font-size: 14px; font-weight: 600; color: #F0F0F0; ">{{ item.coinsName }} <span
        style="font-size: 13px ; color: #ED3C2F;"
        :style="{ color: item.direction == 0 ? '#0CBB57' : '#ED3C2F' }">
        {{item.closeDepotType === 0 ? $t('自平') :  item.closeDepotType === 1 ? $t('lang_1128')  : item.closeDepotType === 2 ? $t('止盈平仓')  : $t('止损平仓')}}{{ item.direction == 0 ? $t('lang_882') : $t('lang_933') }} 
                                    <!-- {{ item.limitIs == 1 ? '止盈' : item.limitIs == 2
          ? '止损' : item.limitIs == 3 ? '止赢止损' : ''
        }} -->
                                </span></div>
       <!-- <div style="width: 46px; height: 20px; background-color: #252525; color: #737373; border-radius: 4px; font-size: 12px; margin-left: 5px;"
           class="jic">主帐户</div> -->
       <div
        style="width: 57px; height: 20px; background-color: #252525; color: #737373; border-radius: 4px; font-size: 12px; margin-left: 5px;"
        class="jic">
        {{ item.depotType == 0 ? '逐仓' : '全仓' }}{{ item.depotMode == 0 ? $t('合仓') : $t('分仓') }}
       </div>
       <div
        style="width: 46px; height: 20px; background-color: #252525; color: #737373; border-radius: 4px; font-size: 12px; margin-left: 5px;"
        class="jic">{{ item.multiple }}X
       </div>
      </div>
      <div class="flex">
       <div class="ff"
            style="font-size: 12px; font-weight: 500; margin-right: 15px;color: #737373; "> {{$t('lang_784')}}
       </div>
       <div class="ff" style="font-weight: 600; font-size: 12px ;color:#F0F0F0">{{
         $formatNumberWithCommas(item.openPriceAvg)
        }}
       </div>
      </div>
      <div class="flex" style="margin-top:11px;">
       <div class="ff"
            style="font-size: 12px; font-weight: 500; margin-right: 15px;color: #737373; "> {{$t('lang_1950')}}
       </div>
       <div class="ff" style="font-weight: 600; font-size: 12px;color:#F0F0F0">
        {{ $formatNumberWithCommas(item.closePriceAvg) }}
       </div>
      </div>

     </div>

     <div style="padding-top: 38px;">
      <div class="flex" style="margin-bottom: 11px; ">
       <div style="color: #737373; font-size: 12px; width: 105px;   white-space: nowrap;">
        {{$t('lang_2187')}}({{ typeBUInfo == item.motherCoinName ? item.motherCoinName : item.childCoinName }})
       </div>
       <div style="margin-left: 25px; color: #F0F0F0;font-size: 12px;">{{
         typeBUInfo == 'USDT' ? item.motherHoldAmount : item.holdAmount || '--'
        }}
       </div>
      </div>
      <div class="flex">
       <div style="color: #737373; font-size: 12px;width: 105px;  white-space: nowrap;">
        {{$t('lang_1050')}}({{ typeBUInfo == item.motherCoinName ? item.motherCoinName : item.childCoinName }})
       </div>
       <div style="margin-left: 25px; color: #F0F0F0;font-size: 12px;">{{
         typeBUInfo == 'USDT' ? item.motherFinishedHoldAmount : item.finishedHoldAmount

        }}
       </div>
      </div>


     </div>

     <div style="padding-top: 38px;">
      <div class="flex" style="margin-bottom: 11px; ">
       <div style="color: #737373; font-size: 12px;">{{$t('lang_2071')}}</div>
       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;">
        {{ $formatInit(item.createTime) }}
       </div>
      </div>
      <div class="flex">
       <div style="color: #737373; font-size: 12px;">{{$t('lang_2382')}}</div>
       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;">{{
         $formatInit(item.updateTime)
        }}
       </div>
      </div>
     </div>

     <div class="" style="padding-top: 38px;  justify-content: end;">
      <div class="flex jb" style="margin-bottom: 11px; ">
       <div style="color: #737373; font-size: 12px;">{{$t('lang_1129')}}</div>
       <div class="flex"
            style="margin-left: 15px; color: #F0F0F0;font-size: 12px; justify-content: end;">
        {{ item.unfinishedHoldAmount == 0 ? $t('lang_1126') : $t('lang_1127') }}
       </div>
      </div>
      <div class="flex jb">
       <div style="color: #737373; font-size: 12px;">{{$t('lang_1953')}}</div>
       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;">{{ item.profitLoss }}</div>
      </div>
     </div>
    </div>

   </div>
   <div v-else class="flex jc ic"
        style="flex-direction: column;  width: 100%; margin-top: 20px; height: 80%; ">
    <div style="width: 48px; height: 48px;">
     <img style="width: 100%; height: 100%;" src="@/assets/images/icon/icon_Null_status.png">
    </div>
    <div style="color: #737373;">{{$t('数据为空')}}</div>
   </div>

  </div>
 </transition>
</template>

<script>
import {mapGetters} from 'vuex';
import SelectList from './SelectList.vue';
import SelectListPrice from './SelectListPrice.vue';
import {GetHistoricalPosition} from "@/api/hy";

export default {
 components: {
  SelectList, SelectListPrice
 },
 data() {
  return {

   historicalList: [],

   chainListTitle: '全部',
   chainList: [],
   positionTitle: '全部',
   positionList: [
    {
     id: '',
     name: '全部',
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
     text: '最近一周',
     onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
     }
    }, {
     text: '最近一个月',
     onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
     }
    }, {
     text: '最近三个月',
     onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
     }
    }]
   },
   startTime: '',
   endTime: '',
   contractIdInfo: '',


  }
 },
 created() {
  this.initTime()
 },
 mounted() {
  console.log(this.startTime, this.endTime, 'this.endTime---------');

  this.cancelOrder(1, 100, '', this.startTime, this.endTime, '')
 },
 methods: {

  initTime(){
    // 获取当前时间
  const currentDate = new Date();
  // 获取三个月之前的时间
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3); // 设置为当前月份减去3
  this.startTime = this.formatDate(threeMonthsAgo)
  this.endTime = this.formatDate(currentDate)
  },


  handleDateChange(value) {
   const startDate = value[0]; // 开始日期
   const endDate = value[1]; // 结束日期
   // 格式化日期为 YYYY-MM-DD
   const formattedStartDate = this.formatDate(startDate);
   const formattedEndDate = this.formatDate(endDate);
   this.cancelOrder(1, 100, '', formattedStartDate, formattedEndDate, '')
  },

  positionListFn(item) {      // 市价 限价
   this.initTime()
   this.positionTitle = item.name
   this.cancelOrder(1, 100, '', this.startTime, this.endTime, item.id)
  },


  chainListFn(item) {    // 子币筛选
    this.initTime()

   if (item === 'IDNULL') {
    this.chainListTitle = '全部'
    this.cancelOrder(1, 100, '', this.startTime, this.endTime, '')
   } else {

    this.chainListTitle = item.contract.coinsName.match(/^([A-Z]+)-/)[1]
    this.contractIdInfo = item.contract.id
    this.cancelOrder(1, 100, item.contract.id, this.startTime, this.endTime, '')
   }

  },

  
  async cancelOrder(page, rows, contractId, startTime, endTime, tradeType) {
   try {
    const res = await GetHistoricalPosition({page, rows, contractId, startTime, endTime, tradeType})

     // this.historicalList  = res.data.data
     let list = res.data

     this.historicalList = list.map(item => {
      if (item.limitIs === 1 && item.closeDepotType === 2) {
       item.typeInfo = '止盈平仓'
      } else if (item.limitIs === 2) {
       item.limitIs = '止损'
      } else if (item.limitIs === 3) {
       item.limitIs = '止赢，止损'
      } else {
       item.limitIs = '没有'
      }
      return item
     })
   
   } catch (e) {
    console.log(e)
   }
  },


  formatDate(date) {
   if (!date) return ''; // 如果日期为空，返回空字符串
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
   const day = String(date.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`; // 返回格式化后的日期
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
.jic {
 display: flex;
 align-items: center;
 justify-content: center;
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

.el-date-table th {
 border: none !important;
 border-bottom: 1px solid #252525 !important;

}
</style>