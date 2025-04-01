<template>
  <div
    style="height: calc(100vh - 4.52547rem);padding-bottom: 200px; padding-left: 24px; padding-top: 24px;">


    <div class="flex jb ic" style="padding-right: 20px;">

      <div style="font-size: 30px;font-weight: 600;">历史记录</div>
      <div class="flex">
        <div class="fc btn1" @click="$router.push('/deposit-v2');"
          style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; background-color: #90FF00;">
          充币</div>
        <div class="fc btn2" @click="$router.push('/withdraw-v2');"
          style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; color: #F0F0F0; margin-left: 20px;">
          提币</div>
        <div class="fc btn2"
        @click="$router.push('/Transfer-v2');"
          style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; color: #F0F0F0; margin-left: 20px;">
          划转</div>
      </div>

    </div>
    <div style="margin-top: 47px; margin-bottom: 18px;">资金流水</div>
    <div class="flex" style="">
      <div class="flex ic"
        style="width: 182px; height: 34px;border-radius: 4px; margin-right: 10px; background-color: #252525; font-size: 12px; padding-left: 13px;">
        资金账户
      </div>
      <div style="width: 182px; height: 34px; margin-right: 10px;">
        <SelectList :coinPairList=coinPairList :chainListTitle=chainListTitle @indexStateFn="chainListFn" />

      </div>

      <div style="width: 182px; height: 34px; ; margin-right: 10px;">
        <SelectListPrice :coinPairList=coinPairListInfo :chainListTitle=chainListTitleInfo
          @indexStateFn="positionListFn" />
      </div>

      <div class="rangeSeparatorSHIN" style="width: 200px; height: 34px; margin-right: 10px;">
        <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="-"
          style="height: 34px !important; line-height: 34px !important; background-color: #252525 !important; border: 1px solid #252525 !important; color: #F0F0F0 !important;"
          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="handleDateChange">
        </el-date-picker>

      </div>

    </div>

    <RechargeRecord ref="rechargeRecord" @pageChangeFn="pageChangeFn"  :records="records" :total="total" :size="size" />

  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
import SelectList from "./com/SelectList.vue";
import SelectListPrice from "./com/SelectListPrice.vue";
import RechargeRecord from "./com/RechargeRecord.vue";
import {getCoinList, getUserCoinHistory} from "@/api/user";

export default {
  name: "SecuritySetting",
  components: {
    SelectList, SelectListPrice, RechargeRecord
  },
  data() {
    return {
      records:[],
      value2: [],
      total:10,
      size:1,
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
      coinPairList: [
      {
          coinName: '全部',
          id: null
        },
        {
          coinName: '链上充值 ',
          id: 'RECHARGE'
        },
        {
          coinName: '链上提现 ',
          id: 'WITHDRAW'
        },
        {
          coinName: '内部提现 ',
          id: 'INTERNAL_WITHDRAW'

        },
        {
          coinName: '内部充值 ',
          id:'INTERNAL_RECHARGE'
        },
        {
          coinName: '转出到U本位合约 ',
          id:'TO_U_CONTRACT'
        },
        {
          coinName: '从U本位合约转入 ',
          id:'FROM_U_CONTRACT'
        },
        {
          coinName: '闪兑转入',
          id:'FAST_EXCHANGE_IN'
        },
        {
          coinName: '闪兑转出',
          id:'FAST_EXCHANGE_OUT'
        },
      ],
      coinPairListInfo: [

      ]
    }
  },
  computed: {
    ...mapGetters(["userInfo", 'getUserList','getToken']),

  },
  created() {

  },
  mounted() {
    // 监听全局点击事件
    this.initCoinList()

    // 历史列表
    this.transferListFn(1,10,null,null,null,null,null,null)
  },
  methods: {
    ...mapActions(['fetchUserInfo']),

    pageChangeFn(page){   // 点击页码
      console.log(page);
      this.transferListFn(page,10,null,null,null,null,null,null)
    },

    chainListFn(item) {
      console.log(item);
      this.chainListTitle = item.coinName

      this.transferListFn(1,10,null,null,item.id,null,null,null)

    },
    positionListFn(item) {
      console.log(item);
      this.chainListTitleInfo = item.coinName
      this.transferListFn(1,10,item.coinName,null,null,null,null,null)

    },
    handleDateChange(value) {
      const startDate =  this.convertToTimestamp(value[0]) ; // 开始日期
      const endDate = this.convertToTimestamp(value[1]) ; // 结束日期
      this.transferListFn(1,10,null,null,null,startDate,endDate,null)

      
      // 格式化日期为 YYYY-MM-DD
      // const formattedStartDate = this.formatDate(startDate);
      // const formattedEndDate = this.formatDate(endDate);
      // this.cancelOrder(1, 100,'', formattedStartDate, formattedEndDate, '')
    },


    initCoinList() {
      Promise.try(async () => {
       return await getCoinList()
      }).then(res => {
       this.coinPairListInfo = res.data
      })
    },

   // 历史列表
   transferListFn(page, size, coinId, coinName, type, startTime, endTime ,aggType) {

    Promise.try(async () => {
     return await getUserCoinHistory({page, size, coinId, coinName, type, startTime, endTime,aggType})
    }).then(res => {
     this.records = res.data.records.map(item=> {
      return {
       ...item,
       type: {
        RECHARGE: '链上充值',
        WITHDRAW: '链上提现',
        INTERNAL_WITHDRAW: '内部提现',
        INTERNAL_RECHARGE: '内部充值',
        TO_U_CONTRACT: '转出到U本位合约',
        FROM_U_CONTRACT: '从U本位合约转入',
        FAST_EXCHANGE_IN: '闪兑转入',
        FAST_EXCHANGE_OUT: '闪兑转出',
       }[item.type]
      }
     })
     this.total=res.data.total
     this.size=res.data.size
    })
   },

   convertToTimestamp(isoString) {
    const date = new Date(isoString);

    // 检查日期是否有效
    if (isNaN(date.getTime())) {
     throw new Error("Invalid date string");
    }

    // 返回毫秒时间戳
    return date.getTime();
   }

  },
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
.rangeSeparatorSHIN .el-date-editor--daterange {
  font-size: 12px !important;
  width: 100% !important;
  /* height: 25px !important; */
  /* line-height: 28px !important; */
  background: #141414 !important;
  border: 1px solid #252525 !important;
  border-radius: 4px !important;
  color: #737373 !important;
}

.rangeSeparatorSHIN .el-range-input {
  font-size: 11px !important;
  background: #252525 !important;
  color: #F0F0F0 !important;

}

.rangeSeparatorSHIN .el-range-input::placeholder {
  color: #F0F0F0;
  /* 设置 placeholder 的颜色 */
}

.rangeSeparatorSHIN .el-date-editor {
  font-size: 11px !important;
  color: #F0F0F0 !important;

}

.rangeSeparatorSHIN .el-icon-date {
  height: 24px;

}

/* el-input__icon el-range__close-icon */
.rangeSeparatorSHIN .el-range__close-icon {
  display: flex !important;
  justify-content: center !important;
  color: #737373;
  align-items: center !important;

}

.rangeSeparatorSHIN .el-range__icon {
  /* padding-bottom: 29px !important; */
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  color: #737373;
}

.rangeSeparatorSHIN .el-range-separator {
  /* padding-bottom: 29px !important; */
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  color: #F0F0F0;
}

/* el-input__icon el-range__icon el-icon-date */
/* .rangeSeparatorSHIN .el-range__icon {
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
}
</style>