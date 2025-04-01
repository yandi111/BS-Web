<!-- Tips.vue -->
<template>
 <transition name="fade">
  <div>

   <div class="flex" style=" padding-left: 16px;  margin-bottom: 20px;">

    <div style="width: 143px; height: 27px; margin-right: 10px;">

     <SelectListPrice :chainList=positionList :chainListTitle=positionTitle
                      @chainListFn="positionListFn"/>
    </div>
    <div class="rangeSeparator" style="width: 240px; height: 27px; margin-right: 10px;">
     <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="-"
                     style="height: 27px !important; line-height: 25px !important; border: 1px solid #252525 !important; color: #737373 !important;"
                     start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                     @change="handleDateChange" @blur="handleBlur">
     </el-date-picker>

    </div>
   </div>

   <div v-if="historicalList.length > 0" style="height: 300px;overflow-y: auto;" class="containerInfo">
    <div v-for="(item, index) in historicalList" :key="index"
         style="width: 100%; margin-top: 10px;  padding-left: 16px; padding-bottom: 17px; border-bottom: 1px; border-bottom: 1px solid #252525; padding-right: 15px;"
         class="flex ">

     <div style=" flex: 1;">

      <div class="flex" style="padding-top: 15px;">
       <div class="ff"
            style="font-size: 12px; font-weight: 500; margin-right: 15px;color: #737373; ">
        {{ item.type }}
       </div>
       <div class="ff" style="font-weight: 600; font-size: 12px ;color:#F0F0F0">{{
         item.amount
        }}
       </div>
      </div>
      <div class="flex" style="margin-top:11px;">
       <div v-if="item.coinsName" class="ff"
            style="font-size: 12px; font-weight: 500; margin-right: 15px;color: #737373; ">
        合约
       </div>
       <div  v-if="item.coinsName" class="ff" style="font-weight: 600; font-size: 12px;color:#F0F0F0">{{ item.coinsName }}
       </div>
      </div>

     </div>

     <div class="flex"
          style="padding-top: 15px;flex: 1 ;margin-right: 15px ; flex-direction: column; justify-content: end;">

      <div class="flex">
       <div style="color: #737373; font-size: 12px;">资产</div>
       <div style="margin-left: 5px; color: #F0F0F0;font-size: 12px;">{{
         $formatNumberWithCommas(item.afterBalance)
        }}
       </div>
      </div>

      <!-- 1 委托保证金 2 开仓手续费 3 平仓 释放保证金. 4平仓盈亏. 5平仓手续费 6持仓利息， 7撤单释放保证金, 8撤单释放手续费 ，9划转入, 10划转出, 11后台调整 12过夜费 -->
      <!--  手续费  5  -->

     </div>

     <div class="flex"
          style="padding-top: 15px;flex: 1 ;margin-right: 15px;flex-direction: column; justify-content: end;">

      <div class="flex">
       <div style="color: #737373; font-size: 12px;">已完成</div>
       <div style="margin-left: 15px; color: #F0F0F0;font-size: 12px;"> {{
         $formatInit(item.createTime)
        }}
       </div>
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
import SelectListPrice from './SelectListPrice.vue';
import {GetWalletRecordList} from "@/api/hy";

export default {
 components: {
  SelectListPrice
 },
 data() {
  return {
   historicalList: [],

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
   // 盈亏 -> 114
   // 手续费 -> 2, 5(1, 2, 5, 7, 9, 14)
   // 资金收支 -> 10, 11
   // 系统转入 -> 12
   // 资金费用 -> 6
   positionList: [
    {
     id: '',
     name: "全部",
    },
    {
     id: 114,
     name: "盈亏",
    },
    {
     id: '1,2,5,7,9,14',
     name: "手续费",
    },
    {
     id: '10,11',
     name: "资金收支",
    },
    {
     id: 12,
     name: "系统转入",
    },
    {
     id: 6,
     name: "资金费用",
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

  }
 },
 crdated() {

 },
 mounted() {
  this.initTime()
  // 获取当前时间
  this.cancelOrder(1, 100, this.startTime, this.endTime, '')
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

  handleBlur() {
   // 关闭日期选择器
   this.$refs.datePicker.blur(); // 触发 blur 事件
  },

  handleDateChange(value) {
   const startDate = value[0]; // 开始日期
   const endDate = value[1]; // 结束日期
   // 格式化日期为 YYYY-MM-DD
   const formattedStartDate = this.formatDate(startDate);
   const formattedEndDate = this.formatDate(endDate);
   this.cancelOrder(1, 100, formattedStartDate, formattedEndDate, '')
  },


  positionListFn(item) {
   this.positionTitle = item.name
   this.initTime()
   this.cancelOrder(1, 100, this.startTime, this.endTime, item.id)

  },


  async cancelOrder(page, rows, startTime, endTime, type) {
   Promise.try(() => {
    return GetWalletRecordList({page, rows, startTime, endTime, type})
   }).then(res => {
    let list = res.data
    this.historicalList = list.map(item => {
     if (item.type == 1 || item.type == 2 || item.type == 5 || item.type == 7 || item.type == 9 || item.type == 14) {
      item.type = '手续费'
     } else if (item.type == 10 || item.type == 11) {
      item.type = '资金收支'
     } else if (item.type == 12) {
      item.type = '系统转入'

     } else if (item.type == 6) {
      item.type = '资金费用'
     } else if (item.type == 114) {
      item.type = '盈亏'
     } else {
      return ''
     }
     return item; // 返回修改后的 item
    })
   })

   this.isDialogVisible = false
  },

  formatDate(date) {
   if (!date) return ''; // 如果日期为空，返回空字符串
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
   const day = String(date.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`; // 返回格式化后的日期
  },

 },
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

.el-popper {
 border-right: none !important;
}
</style>