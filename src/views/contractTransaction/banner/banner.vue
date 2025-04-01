<template>
  <div class="banner" style="padding-top: 10px; padding-bottom: 10px;">
    <div class="left">
      <div class="coinType" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div class="label">
          <span class="text tf14" style="font-size: 20px; color: #FFFFFF;">{{ getCoinsName }}</span>
          <span style="font-size: 14px;color: #FFFFFF;" class="txt">{{ $t("lang_795") }}</span>
        </div>
        <div>
          <div style="margin-left: 4px;">
            <div class="triangle" :class="{ rotate: isRotated }"></div>
          </div>
        </div>
        <coinTypePopup :isShow.sync="isShow" :list="contractData" @changeTab="changeTab" @chooseCoin="chooseCoin"
          @toSearch="toSearch" />
      </div>
   
      <div class="price-change" :class="parseFloat(headerData.change) > 0
          ? 'up'
          : parseFloat(headerData.change) < 0
            ? 'down'
            : '' ">
        <span class="price" style="color: #0cbb57; font-weight:600;margin-right: 15px;">{{
          formatNumbertoFixedTwo(getSellPriceInfo) || '- -'
          }}</span>
        <div class="ratePrice"></div>
      </div>
      <div class="item">
        <p class="df aic tf14" style="color: #737373; font-size: 12px;">
          标记价
        </p>
        <p class="number tf16" style="font-size: 11px; color: #FFFFFF;">{{ formatNumbertoFixedTwo(getIndexPrice) || "--" }}</p>
      </div>
      <div class="item">
        <p class="tf14" style="color: #737373; font-size: 12px;">{{ $t("24h涨跌幅") }}</p>
        <span style="color:  #0CBB57; font-size: 11px;">{{ getIncrease24H || "- -" }}%</span>
      </div>
      <div class="item">
        <p class="tf14" style="color: #737373; font-size: 12px;">
          资金费率/倒计时
        </p>
        <p class="number tf16" style="font-size: 11px; color: #0cbb57;">
          <span class="orange" style="font-size: 11px; color: #90FF00;">{{ getFundingRate/1 *100 || '--'
            }}%</span>
          /
          <span style="color: #FFFFFF; font-size: 11px;">{{ countdown }}</span>
        </p>
      </div>
      <div class="item">
        <p class="tf14" style="color: #737373; font-size: 12px;">今日最高价</p>
        <p class="number tf16" style="font-size: 11px; color: #FFFFFF;">{{ $thousandth(getMaxPrice24H) || "- -" }}</p>
      </div>

      <div class="item">
        <p class="tf14" style="color: #737373; font-size: 12px;">今日最低价</p>
        <p class="number tf16" style="font-size: 11px; color: #FFFFFF;">{{ $thousandth(getMinPrice24H) || "- -" }}</p>
      </div>
      <div class="item">
        <p class="tf14" style="color: #737373; font-size: 12px;">24H成交量 <span style="color: #90FF00;">({{coneNameInfo}})</span></p>
        <p class="number tf16" style="font-size: 11px; color: #FFFFFF;">{{ $thousandth(getVolData) || "- -" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import coinTypePopup from "./coinTypeSearch-popup.vue"; // 导入交易对选择弹窗组件
import { getTextConfiguration } from "@/api/contractTransaction"; // 导入 API 方法
import formateTime from "../tabsTable/js/formateTime.js"; // 导入时间格式化工具
import { mapState, mapGetters, mapMutations } from "vuex"; // 导入 Vuex 的状态和计算属性映射
import { webSocketMixin } from "../tradingView/webSocket";

export default {
  name: "banner-page", // 组件名称
  mixins: [webSocketMixin], // 使用 WebSocket 混合
  components: {
    coinTypePopup, // 注册子组件
  },
  data() {
    return {
      isRotated: false, // 控制三角形旋转状态
      isShow: false, // 是否显示弹窗
      symbolList: [], // 交易对列表
      contractData: [], // 合约数组
      contractSearchData: [], // 合约搜索数据
      optionaSearchlData: [], // 可选搜索数据
      headerData: {}, // 头部行情数据
      tdCoinData: {}, // 交易对数据
      currentIndex: 0, // 弹窗 tab 下标
      fistEnter: true, // 第一次进入搜索弹窗
      countdownTime: undefined, // 倒计时
      markedPrice: undefined, // 标记价格
      coinsName: "", // 交易对小写
      time: undefined, // 倒计时的时间
      fundingRate: undefined, // 资金费率
      a_setInterval: null, // 定时器
      lessThan: false, // 判断价格是否下降
      configuratioText: "", // 配置文本
      timer: null, // 定时器
      remainingTime: null, // 剩余时间（秒）
      countdown: '',
      initTimeStamp: Math.floor(Date.now() / 1000) + 4800
      // interval: "1",
    };
  },

  methods: {
    ...mapMutations(['setSelectNum']),
    startCountdown() {
      // 将时间戳转换为剩余时间（秒）  getInitTime getInitTime 
      this.remainingTime = (this.getInitTime/1 - Date.now())/1000; // 当前时间戳（秒）
      console.log( this.remainingTime ,this.getInitTime ,Date.now() ,"remainingTimeremainingTimeremainingTime");
      
      // 如果剩余时间小于或等于0，直接显示倒计时结束
      if (this.remainingTime <= 0) {
        this.countdown = '00:00:00';
        return;
      }
      // 每秒更新倒计时
      this.timer = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime < 0) {
          clearInterval(this.timer); // 清除定时器
          this.countdown = '00:00:00';// 设置倒计时结束的提示
        } else {
          
          // this.countdown = this.remainingTime // 更新倒计时显示 把秒
          this.countdown = this.formatTime(this.remainingTime); // 更新倒计时显示
        }
      }, 1000);
    },
    formatTime(milliseconds) {
      // 将毫秒转换为秒
      const seconds = Math.floor(milliseconds);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      // 格式化为 HH:mm:ss
      return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
    },

    pad(number) {
      // 确保数字为两位数
      return String(number).padStart(2, '0');
    },


    // 获取资金费率文本
    getTextConfiguration() {
      getTextConfiguration({ sign: 'usdt-contract' }).then(res => {
        this.configuratioText = res.data?.data?.content; // 更新配置文本
      });
    },

    // 新手教程设置
    onHandle(type) {
      if (type == 0) {
        this.$router.push("/userStudy"); // 跳转到新手教程页面
      }
    },

    // 展开搜索
    toggle() {
      this.isShow = !this.isShow; // 切换弹窗显示状态
    },

    mouseenter() {
      this.isRotated = true; // 鼠标进入时旋转三角形
      if (this.fistEnter) {
        // this.changeSymbolList(0); // 第一次进入时加载交易对列表
        this.fistEnter = false; // 设置为非第一次进入
      }
      this.isShow = true; // 显示弹窗
    },

    mouseleave() {
      this.isShow = false; // 鼠标离开时隐藏弹窗
      this.isRotated = false; // 重置三角形旋转状态
    },

    // 选择交易对
    chooseCoin(val) {
      let selectNum = this.getSelectNum
      if (selectNum) {
        this.setSelectNum(selectNum)
      } else {
        this.setSelectNum(0.1)
      }
      //  EventBus.$emit("callMethodB", val);
      localStorage.setItem("COIN_INFO", JSON.stringify(val)); // 将选择的交易对存储到本地
      let sybolKey = JSON.parse(localStorage.getItem("COIN_INFO"))
      this.coinsName = sybolKey.contract.coinsName.toLowerCase().replace('-', '');

      // this.coinsName = JSON.parse(localStorage.getItem("COIN_INFO")).symbolKey; // 获取交易对小写
      this.headerData = JSON.parse(localStorage.getItem("COIN_INFO")); // 更新头部数据
      this.tdCoinData = JSON.parse(localStorage.getItem("COIN_INFO")); // 更新交易对数据
      // this.getMarketPrice(val); // 获取市场价格

     console.log(this.tdCoinData, 4564564)
      this.$store.dispatch("handleTDCoin", this.tdCoinData); // 更新 Vuex 中的交易对数据
      this.$store.dispatch("handleContractCoin", this.headerData); // 更新 Vuex 中的合约数据
      this.getCoundownTime(val.contract.coinsName); // 获取倒计时
      this.$EventBus.$emit("sendSymbol", this.headerData); // 发送事件通知
      this.$store.commit("setCurrentMarket", val.contract.coinsName); // 更新当前市场

      // 存储交易对状态
      this.$store.dispatch("handleContract_symbolStatus", {
        status: val.enabled,
        symbol: val.symbol,
      });
      this.webSocket(); // 重新连接 WebSocket
    },

    // 改变 tab
    changeTab(id) {
      this.changeSymbolList(id); // 根据 tab ID 加载相应的交易对
      this.currentIndex = id; // 更新当前 tab 下标
    },

    toSearch(key) {
      let dataArr = []; // 存储搜索结果
      let searchKey = key && key.toLowerCase().trim(); // 处理搜索关键字
      if (this.currentIndex) {
        if (searchKey) {
          this.contractSearchData.filter((item) => {
            if (item.symbolKey.indexOf(searchKey) != -1) {
              dataArr.push(item); // 将匹配的项添加到结果数组
            }
          });
        } else {
          dataArr = this.contractSearchData; // 如果没有搜索关键字，返回所有数据
        }
        this.contractData = [...dataArr]; // 更新合约数据
      } else {
        if (searchKey) {
          this.optionaSearchlData.filter((item) => {
            if (item.symbolKey.indexOf(searchKey) != -1) {
              dataArr.push(item); // 将匹配的项添加到结果数组
            }
          });
        } else {
          dataArr = this.optionaSearchlData; // 如果没有搜索关键字，返回所有数据
        }
        this.contractData = [...dataArr]; // 更新合约数据
      }
    },

    // changeSymbolList(id) {
    //   this.contractData = []; // 清空合约数据
    //   if (id == 0) {
    //     if (!this.$store.state.login.token) {
    //       this.contractData = []; // 如果未登录，清空合约数据
    //       this.optionaSearchlData = [];
    //       return;
    //     }
    //     $coinTypeCollectionList().then((res) => {
    //       this.contractData = res.data.data; // 获取收藏的合约数据
    //       this.optionaSearchlData = [...this.contractData]; // 更新可选搜索数据
    //     });
    //   } else {
    //     $contractList().then((res) => {
    //       this.contractData = res.data.data.map((item) => {
    //         return {
    //           ...item, // 复制合约数据
    //         };
    //       });
    //       this.contractSearchData = [...this.contractData]; // 更新合约搜索数据
    //     });
    //   }
    // },



    // 


    // 
    getAllSymbolsList() {
     
     
     
    },

 

    countDown() {
      this.countdownTime = formateTime(this.getTimeStamp); // 格式化倒计时

      console.log(this.countdownTime, 'this.countdownTime');


      this.a_setInterval = setInterval(() => {
        this.getTimeStamp = this.getTimeStamp - 1; // 每秒减少1
        this.countdownTime = formateTime(this.getTimeStamp); // 更新倒计时
      }, 1000);

      this.a_setInterval = null; // 重置定时器


    },

    // 查看更多
    checkMore(item) {
      this.$router.push({
        path: "/contractRules/fundingRate",
        query: {
          code: item.symbol,
          rid: item.symbolId,
        },
      });
    },

    formatNumber(num) {
      // 将数字转换为字符串
      const [integerPart, decimalPart] = num.toString().split(".");
      // 使用正则表达式添加千分位
      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // 如果有小数部分，返回格式化后的整数部分和小数部分
      return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    },

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
    this.startCountdown(); // 组件创建时开始倒计时    //  this.getAllSymbolsList(); // 组件挂载后获取所有交易对
  },
  filters: {
    rateFormat(num) {
      if (!num || num == 0) {
        return "0%"; // 如果没有值，返回0%
      } else {
        return num + "%"; // 返回带百分号的值
      }
    },
    priceFormat(val) {
      if (val) {
        if (!(val + "").includes(".")) {
          return val + ".0"; // 如果没有小数点，添加.0
        } else {
          return val; // 否则返回原值
        }
      } else {
        return "- -"; // 如果没有值，返回占位符
      }
    },
  },
  computed: {
    ...mapState(["setting"]), // 映射 Vuex 状态
    ...mapGetters([
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
      'getCoinsName'
    ]), // 映射 Vuex 计算属性
    // unit() {
    //   return this.setting.currentMarket.split("/")[0]; // 获取当前市场的基础货币
    // },
    // unitBasec() {
    //   return this.setting.currentMarket.split("/")[1]; // 获取当前市场的报价货币
    // },
    coneNameInfo() {   // 币对列表的子币值
        return this.getCoinsName ? this.getCoinsName.split('-')[0] : 'BTC'
      },
    changeNum() {
      const currentNumber = Number(
        // this.$store.state.contract.priceObj.lastPrice // 当前价格
        this.getSellPriceInfo // 当前价格
      );
      const previousNumber = Number(localStorage.getItem("previousNumber")); // 上一个价格

      if (currentNumber >= previousNumber) {
        localStorage.setItem(
          "previousNumber",
          // this.$store.state.contract.priceObj.lastPrice // 更新上一个价格
          this.getSellPriceInfo // 更新上一个价格
        );
        return true; // 当前价格上涨
      } else {
        localStorage.setItem(
          "previousNumber",
          // this.$store.state.contract.priceObj.lastPrice // 更新上一个价格
          this.getSellPriceInfo // 更新上一个价格
        );
        return false; // 当前价格下跌
      }
    },
  },
  watch: {
    getInitTime(){
      this.startCountdown(); 
    },
    // "setting.currentMarket"(value) {
    //   // 监听当前市场变化
    //   let val = this.symbolList.filter((item) => {
    //     return item.symbol == value; // 查找当前市场的交易对
    //   });
    //   this.chooseCoin(val[0]); // 选择当前市场的交易对
    // },

    // Spot价格集合
    // headerData: {
    //   async handler(newVal, oldValue) {
    //     this.lessThan = oldValue.lastPrice - newVal.lastPrice > 0 ? true : false; // 判断价格是否下降
    //     newVal.markedPrice = this.markedPrice; // 更新标记价格
    //     await this.$store.dispatch("handleSpotPriceObj", newVal); // 更新 Vuex 中的现货价格对象
    //     await this.$store.dispatch("handlePriceObj", newVal); // 更新 Vuex 中的价格对象
    //     console.log(newVal,"newValnewValnewValnewValnewValnewVal");

    //   },
    // },
    markedPrice: {
      async handler(newValue) {
        newValue = this.markedPrice; // 更新标记价格
        await this.$store.dispatch("handleMarkedPrice", newValue); // 更新 Vuex 中的标记价格
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.buy {
  color: #0CBB57 !important; // 设置买入项颜色
}

.sell {
  color: #ED3C2F !important; // 设置卖出项颜色
}

.triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent; // 左边透明边框
  border-right: 6px solid transparent; // 右边透明边框
  border-top: 8px solid #a8a8a8;
  /* 三角形颜色，朝上 */
  cursor: pointer; // 鼠标悬停时显示为手型
  transition: transform 0.5s;
  /* 动画效果 */
}

.rotate {
  transform: rotate(180deg);
  /* 旋转 180 度 */
}

.banner {
  //height: 70px; // 设置 banner 高度
  background: #141414; // 设置背景颜色
  font-size: 12px; // 设置字体大小
  padding: 0 20px; // 设置内边距
  margin-bottom: 5px; // 设置下边距
  @include flex(); // 使用 flex 布局

  .left {
    @include flex(); // 使用 flex 布局

    div {
      color: #96a2b2; // 设置字体颜色

      .number {
        font-size: 14px; // 设置数字字体大小
        color: var(--main-text-color); // 设置数字字体颜色
        margin-top: 5px; // 设置上边距
      }
    }

    .coinType {
      position: relative; // 设置相对定位
      display: flex; // 使用 flex 布局
      align-items: center; // 垂直居中对齐
      height: 50px; // 设置高度
      margin-right: 20px; // 设置右边距
      z-index: 100; // 设置层级
      cursor: pointer; // 鼠标悬停时显示为手型

      .label {
        display: flex; // 使用 flex 布局
        flex-direction: column; // 垂直排列
        margin-left: 15px; // 设置左边距
        color: var(--main-text-color); // 设置字体颜色
        font-family: PingFangSC-Semibold, PingFang SC; // 设置字体

        .txt {
          font-size: 14px; // 设置文本字体大小
          color: #8992a6; // 设置文本颜色
          font-weight: normal; // 设置字体粗细
        }
      }

      .toggle-icon {
        width: 40px; // 设置图标宽度
        height: 40px; // 设置图标高度
        margin-left: 5px; // 设置左边距
      }

      .iconfont {
        font-size: 34px; // 设置图标字体大小
        margin-left: 8px; // 设置左边距
        color: var(--main-text-color); // 设置图标颜色
      }
    }

    .price-change {
      display: flex; // 使用 flex 布局
      flex-direction: column; // 垂直排列
      min-width: 140px; // 设置最小宽度

      .price {
        color: var(--main-text-color); // 设置价格字体颜色
        font-size: 24px; // 设置价格字体大小

        &.down {
          color: #f75f52; // 设置下降时的颜色
        }

        &.up {
          color: #90ff00; // 设置上升时的颜色
        }
      }

      .ratePrice {
        color: var(--main-text-color); // 设置比率价格字体颜色
        font-size: 14px; // 设置比率价格字体大小
      }
    }

    .item {
      min-width: 70px; // 设置最小宽度
      margin-right: 20px; // 设置右边距
      font-size: 16px; // 设置字体大小

      p:first-child {
        display: flex; // 使用 flex 布局
        align-items: center; // 垂直居中对齐
      }

      .number {
        width: 100%; // 设置宽度为100%

        .orange {
          color: #fdcf39; // 设置橙色字体
        }

        &.up {
          color: #90ff00; // 设置上升时的颜色
        }

        &.down {
          color: #f75f52; // 设置下降时的颜色
        }
      }

      .tip {
        margin-left: 5px; // 设置左边距
        color: #8992a6; // 设置提示图标颜色
        font-size: 26px; // 设置提示图标字体大小
        cursor: pointer; // 鼠标悬停时显示为手型

        &:hover {
          color: lighten(#8992a6, 10%); // 悬停时变亮
        }
      }
    }
  }
}
</style>