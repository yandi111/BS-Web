<template>
 <div
  style="height: calc(100vh - 4.52547rem);padding-bottom: 200px; padding-left: 24px; padding-top: 24px;">
  <div class="flex jb ic" style="padding-right: 20px;">
   <div style="font-size: 30px;font-weight: 600">历史记录</div>
   <div class="flex">
    <div class="fc btn1" @click="$router.push('/user/deposit-v2');"
         style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px;font-size: 13px;font-weight: 600; background-color: #90FF00;">
     充币
    </div>
    <div class="fc btn2" @click="$router.push('/user/withdraw-v2');"
         style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; color: #F0F0F0; margin-left: 20px;">
     提币
    </div>
    <div class="fc btn2" @click="$router.push('/user/Transfer-v2');"
         style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; color: #F0F0F0; margin-left: 20px;">
     划转
    </div>
   </div>

  </div>
  <div style="margin-top: 27px; margin-bottom: 18px;">资金流水</div>
  <div class="flex" style="">
   <div class="flex ic"
        style="width: 182px; height: 34px;border-radius: 4px; margin-right: 10px; background-color: #252525; font-size: 12px; padding-left: 13px;">
    币本位合约
   </div>
   <div style="width: 182px; height: 34px; margin-right: 10px;">
    <SelectList :coinPairList=coinPairList :chainListTitle=chainListTitle @indexStateFn="chainListFn"/>
   </div>

   <div class="rangeSeparatorSH" style="width: 200px; height: 34px; margin-right: 10px;">
    <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="-"
                    style="height: 34px !important; line-height: 34px !important; background-color: #252525 !important; border: 1px solid #252525 !important; color: #F0F0F0 !important;"
                    start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                    @change="handleDateChange">
    </el-date-picker>
   </div>
  </div>

  <RechargeRecord ref="rechargeRecord" @pageChangeFn="pageChangeFn" :records="historicalList" :total="total" :size="size"/>
 </div>
</template>

<script>
import SelectList from "./com/SelectList.vue";
import RechargeRecord from "./com/RechargeRecord.vue";

import {GetWalletRecordList} from "@/api/hy";

export default {
 name: "SecuritySetting",
 components: {
  SelectList, RechargeRecord
 },
 data() {
  return {
   records: [],
   value2: [],
   total: null,
   size: 1,
   isDatePickerVisible: false, // 控制日期选择器的显示状态
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
   chainListTitle: '全部',
   chainListTitleInfo: '全部',
   historicalList: [],


   coinPairList: [
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

   coinPairListInfo: []
  }
 },
 mounted() {
  // 获取当前时间
  const currentDate = new Date();

  // 获取三个月之前的时间
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3); // 设置为当前月份减去3
  this.startTime = this.formatDate(threeMonthsAgo)
  this.endTime = this.formatDate(currentDate)
  this.cancelOrder(1, 10, this.startTime, this.endTime, '')
 },
 methods: {
  pageChangeFn(page) {
   this.cancelOrder(page, 10, this.startTime, this.endTime, '')
  },

  chainListFn(item) {
   this.chainListTitle = item.name

   this.cancelOrder(1, 10, this.startTime, this.endTime, item.id)


  },

  handleDateChange(value) {
   const startDate = this.convertToTimestamp(value[0]); // 开始日期
   const endDate = this.convertToTimestamp(value[1]); // 结束日期

   // 格式化日期为 YYYY-MM-DD
   const formattedStartDate = this.formatDate(startDate);
   const formattedEndDate = this.formatDate(endDate);
   // this.cancelOrder(1, 100,'', formattedStartDate, formattedEndDate, '')
   this.cancelOrder(1, 10, formattedStartDate, formattedEndDate, '')
  },


  // 历史列表
  async cancelOrder(page, rows, startTime, endTime, type) {
   Promise.try(async () => {
    return await GetWalletRecordList({page, rows, startTime, endTime, type})
   }).then(res => {
    let list = res.data
    this.total = res.data.total

    this.historicalList = list.map(item => {
     if ([1, 2, 5, 7, 9, 14].includes(+item.type)) {
      item.type = '手续费'
     } else if ([10, 1].includes(+item.type)) {
      item.type = '资金收支'
     } else if (+item.type === 12) {
      item.type = '系统转入'
     } else if (+item.type === 6) {
      item.type = '资金费用'
     } else if (+item.type === 114) {
      item.type = '盈亏'
     } else {
      return ''
     }

     return item; // 返回修改后的 item
    })
   })
   this.isDialogVisible = false
  },

  convertToTimestamp(isoString) {
   const date = new Date(isoString);
   // 检查日期是否有效
   if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
   }

   // 返回毫秒时间戳
   return date.getTime();
  },

  formatDate(date) {
   if (!date) return ''; // 如果日期为空，返回空字符串
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
   const day = String(date.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`; // 返回格式化后的日期
  },

 },
};
</script>
<style lang='scss' scoped>
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

/* Webkit 浏览器（Chrome, Safari） */
.scroll-container::-webkit-scrollbar {
 width: 1px;
 /* 滚动条宽度 */
}

.scroll-container::-webkit-scrollbar-track {
 background: #141414;
 /* 滚动条轨道颜色 */
}

.scroll-container::-webkit-scrollbar-thumb {
 background: #141414;
 /* 滚动条颜色 */
 border-radius: 6px;
 /* 滚动条圆角 */
}

.scroll-container::-webkit-scrollbar-thumb:hover {
 background: #141414;
 /* 滚动条悬停时的颜色 */
}

/* Firefox */
.scroll-container {
 scrollbar-width: thin;
 /* 滚动条宽度 */
 scrollbar-color: #252525 #141414;
 /* 滚动条颜色和轨道颜色 */
}

.fc {
 display: flex;
 justify-content: center;
 align-items: center;
}

.btn1 {
 color: #252525
}

.btn1:hover {
 color: #737373
}

.btn2 {
 background-color: #252525;
}

.btn2:hover {
 background-color: #363636;
}
</style>
<style>
.rangeSeparatorSH .el-date-editor--daterange {
 font-size: 12px !important;
 width: 100% !important;
 /* height: 25px !important; */
 /* line-height: 28px !important; */
 background: #141414 !important;
 border: 1px solid #252525 !important;
 border-radius: 4px !important;
 color: #737373 !important;
}

.rangeSeparatorSH .el-range-input {
 font-size: 11px !important;
 background: #252525 !important;
 color: #F0F0F0 !important;

}

.rangeSeparatorSH .el-range-input::placeholder {
 color: #F0F0F0;
 /* 设置 placeholder 的颜色 */
}

.rangeSeparatorSH .el-date-editor {
 font-size: 11px !important;
 color: #F0F0F0 !important;

}

.rangeSeparatorSH .el-icon-date {
 height: 24px;

}

/* el-input__icon el-range__close-icon */
.rangeSeparatorSH .el-range__close-icon {
 display: flex !important;
 justify-content: center !important;
 color: #737373;
 align-items: center !important;

}

.rangeSeparatorSH .el-range__icon {
 /* padding-bottom: 29px !important; */
 display: flex !important;
 justify-content: center !important;
 align-items: center !important;
 color: #737373;
}

.rangeSeparatorSH .el-range-separator {
 /* padding-bottom: 29px !important; */
 display: flex !important;
 justify-content: center !important;
 align-items: center !important;
 color: #F0F0F0;
}

/* el-input__icon el-range__icon el-icon-date */
/* .rangeSeparatorSH .el-range__icon {
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
 background-color: #141414;
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

.el-date-range-picker {
 border-right: 1px solid #252525 !important;
 background-color: #141414;
}

.el-popper {
 border: none;
}

.el-date-table th {
 border: none !important;
 border-bottom: 1px solid #252525 !important;

}

.el-picker-panel {
 border: none !important;
 /* left: 380px !important; */
}

.el-popper {
 /* left: 200px !important; */
}
</style>