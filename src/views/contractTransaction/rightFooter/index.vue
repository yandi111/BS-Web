<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="height: 530px; width: 100%; padding-left:9px ; padding-top: 11px; border-left: 1px solid #252525; ">
    <!-- title -->
    <div class="flex">
      <div class="flex "  style="margin-right: 30px;cursor: pointer;">
        <div style="width: 20px; height: 20px;">

          <img height="100%" width="100%" src="@/assets/images/rightFooter/phoneEr.png" alt="">
        </div>
        <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #737373; margin-left: 5px;">计算机
        </div>
      </div>
      <div class="flex" style="flex:1; cursor: pointer;">
        <div style="width: 20px; height: 20px;">

          <img height="100%" width="100%" src="@/assets/images/rightFooter/cuSu.png" alt="">
        </div>
        <div style="font-family: PingFang SC;font-size: 12px;font-weight: 500; color: #FFFFFF; margin-left: 5px;">合约介绍
        </div>
      </div>
    </div>
    <!--  -->
    <div style="padding-right: 20px; margin-top: 20px;">
    <div style="">
        <div class="flex ic jb" style="height: 18px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">合约名称</div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;">{{ getCoinsName}} 永续</div>
        </div>
        <div class="flex ic jb" style="height: 18px; margin-top: 6px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">到期日期</div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;">永续合约，无到期交割日期</div>
        </div>
        <div class="flex ic jb" style="height: 18px;margin-top: 6px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">杠杆倍数</div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;">1x-125x</div>
        </div>

      </div>

      <div style="margin-top: 16px;">
        <div class="flex ic jb" style="height: 18px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">最新价格(USDT)</div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;">{{ $thousandth(getSellPriceInfo) || '- -'}}</div>
        </div>
        <div class="flex ic jb" style="height: 18px; margin-top: 6px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">标记价格(USDT)</div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;">{{ formatNumbertoFixedTwo(getIndexPrice) || "--" }}</div>
        </div>
        <div class="flex ic jb" style="height: 18px;margin-top: 6px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">指数价格(USDT)</div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;"> {{ formatNumbertoFixedTwo(getIndexPrice)  || '- -'}} </div>
        </div>
        <div class="flex ic jb" style="height: 18px;margin-top: 6px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">资金费率</div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;"> {{ $thousandth(getFundingRate) || '--' }} </div>
        </div>

      </div>

      <div style="margin-top: 16px;">
        <div class="flex ic jb" style="height: 18px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">资金费用收取间隔</div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;">8h </div>
        </div>
        <div class="flex ic jb" style="height: 18px; margin-top: 6px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">最小价格变化</div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;">{{ getUnit }} USDT  </div>
        </div>

      </div>

      <div style="margin-top: 16px;">
        <div class="flex ic jb" style="height: 18px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">单笔最小委托数量 </div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;"> {{ getNumMin }} USDT  </div>
        </div>
        <div class="flex ic jb" style="height: 18px; margin-top: 6px;">
          <div style="font-size: 12px; color: #737373; font-family: PingFang SC;">单笔最大委托数量</div>
          <div style="font-size: 12px; color: #FFFFFF; font-family: PingFang SC;">{{ $thousandth(getNumMax)  }} USDT </div>
        </div>

      </div>
     

    </div>






  </div>
</template>
<script>
import {  mapGetters } from "vuex"; // 导入 Vuex 的状态和计算属性映射
export default {
  name: "banner-page", // 组件名称
  components: {
   
  },
  data() {
    return {
     
    };
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
  },
  mounted() {
    
  },

  computed: {
  
    ...mapGetters([

      'getNumMin',
      'getNumMax',
      'getCoinsName',
      'getSellPriceInfo',
      'getIndexPrice',
      'getIncrease24H',
      'getFundingRate',
      'getHighPrice',
      'getLowestPrice',
      'getVolData',
      'getMinPrice24H',
      'getMaxPrice24H',
      'getSelectNum',
      'getTimeStamp', 
      'getInitTime',
      'getUnit'
    ]), // 映射 Vuex 计算属性
    // unit() {
    //   return this.setting.currentMarket.split("/")[0]; // 获取当前市场的基础货币
    // },
    // unitBasec() {
    //   return this.setting.currentMarket.split("/")[1]; // 获取当前市场的报价货币
    // },
   
   
  },
  watch: {
   
  },
};
</script>
