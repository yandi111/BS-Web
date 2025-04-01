<template>
  <div class="trade-view" :class="theme === 'light' ? '' : 'activeBg'" ref="fullRef">
   <div class="trade-header" :class="theme === 'light' ? '' : 'activeBorder'">
    <div class="left-empty" v-show="pType === 's'"></div>
    <div class="tabs-left" v-show="pType === 'k'">
     <div class="coin">
       <div style="width: 16px; height: 16px;margin-right: 5px;">
         <img style="width: 100%; height: 100%;"  :src="iconUrl" alt="" />
       </div>
      <span style="color: #737373;">{{ coinTitle }}</span>
     </div>
     <div class="times" :class="activeId === item.value ? 'times-active' : '' " v-for="item in tabsArr"
          :key="item.value" v-show="item?.active" @click="checkResolution(item)">
      {{ item.label | translate }}
     </div>
     <div class="time-select" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <div class="time-box"></div>
      <div class="s-icon">
             <span :class="{
               'times-active': !tabsArrNewActive(activeId, true)?.active,
             }">
               {{
               !tabsArrNewActive(activeId, true)?.active
                ? tabsArrNewActive(activeId, true)?.label
                : $t("lang_3045") | translate
              }}
             </span>
 
       <i :class="!timeShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
      </div>
      <div class="s-content" v-show="timeShow" style="background-color: #252525; ">
       <div class="s-container" style="background-color: #252525; ">
        <div class="s-header">
         <span style="color: #FFFFFF">{{ $t("lang_1045") }}</span>
         <span class="s-edit" v-show="!iseDit" @click="handleEdit('e')" style="color: #90FF00;">{{
           $t("lang_2465")
          }}</span>
         <span class="s-edit" v-show="iseDit" @click="handleEdit('s')">{{$t("lang_2819")}}</span>
        </div>
        <div class="s-time">
         <div class="s-item" :class="{
                   'active-item': tabsArrNewActive(item?.value)?.active,
                 }" v-for="item in tabsArr" :key="item.value" @click="chooseItem(item)">
          {{ item.label | translate }}
 
          <img v-show="iseDit && !tabsArrNewActive(item?.value)?.active"
               src="@/assets/contract-imgs/times-icon2.png" alt=""/>
          <img v-show="iseDit && tabsArrNewActive(item?.value)?.active"
               src="@/assets/contract-imgs/times-icon1.png" alt=""/>
         </div>
         <div class="s-item empty none"></div>
         <div class="s-item empty none"></div>
         <!-- <div class="s-item empet"></div> -->
        </div>
       </div>
      </div>
     </div>
     <div class="target" @click="handleTarget">
      <!-- <img
        v-if="targetShow"
        src="@/assets/contract-imgs/quota.png"
        alt=""
      /> -->
      <img src="@/assets/contract-imgs/unquota.png" alt=""/>
     </div>
     <!-- <div class="setting" @click="handleSetting">
       <i class="el-icon-setting"></i>
     </div> -->
    </div>
    <div class="tabs-right">
     <div class="plugin">
      <div class="p-item" :class="pActive === item.id ? 'p-active' : ''" v-for="item in pluginArr" :key="item.id"
           @click="changePlugin(item)">
       {{ item.label }}
      </div>
     </div>
     <div class="full" @click="handleFull">
      <img v-if="isFullscreen" src="@/assets/contract-imgs/unFullscreen.png" alt=""/>
      <img v-else src="@/assets/contract-imgs/fullscreen.png" alt=""/>
     </div>
    </div>
   </div>
   <div id="tradeId" v-show="pType === 'k'"></div>
   <div class="depth-chart" v-if="pType === 's'">
    <DepthMap :depthNum="depthNum" :coinInfo="coinInfo" :contractType="contractType"/>
   </div>
  </div>
 </template>
 
 <script>
 import screenfull from "screenfull";
 import {widget} from "@/utils/static/charting_library.min.js";
 import Datafeeds from "@/utils/static/datafees";
 import config from "@/utils/config";
 import tabsConfig from "@/utils/config/tabs";
 import DepthMap from "../depthMap/depthMap.vue";
 import {mapGetters, mapState, mapMutations} from "vuex";
 import {webSocketMixin} from "./webSocket";
 import {GetQuotesHistory} from "@/api/contractTransaction";
 
 export default {
  name: "ContactTradingView",
  mixins: [webSocketMixin],
  components: {
   DepthMap,
  },
  props: {
   //true合约类型 ，false现货类型
   contractType: {
    type: Boolean,
    default: true,
   },
  },
  data() {
   return {
    tradeList: [],
    isFullscreen: false,
    timeShow: false,
    iseDit: false,
    activeId: 1,
    targetShow: false,
    chart: null,
    datafeeds: new Datafeeds(this),
    tabsArr: tabsConfig,
    interval: "1MIN",
    symbol: "BTC/USDT",
    pricescale: 100, //k线精度
    currentBar: null,
    lastBar: null,
    onLoadedCallback: null,
    onRealtimeCallback: null,
    coinName: "",
    iconUrl: "",
    coinTitle: "",
    pluginArr: [
     {
      id: 1,
      label: "Trading View",
      type: "k",
     },
     // {
     //  id: 2,
     //  label: this.$t("doc.深度图"),
     //  type: "s",
     // },
    ],
    pActive: 1,
    pType: "k",
    theme: "",
    coinInfo: {},
    contractArrType: [],
    depthNum: 1,
    iskLineData: [], //判断是否需要加载历史数据
    isLoadHistory: true, //判断是否需要加载历史数据
    lang: '',
    newTradeList: []
   };
  },
  watch: {
 
 
   // tradeList
   tradeList: {
    handler(newValue) {
     // 当 tdCoin 发生变化时调用 getdefaultCoin
     this.$emit('tradeListFn', newValue)
    },
    deep: true, // 开启深度监听
    immediate: true // 如果需要在组件创建时立即调用
   },
 
 
   getTheme: {
    handler(val) {
     console.log(val);
     console.log(val,'oldValueoldValueoldValueoldValue------------------');
     this.theme = val;
     this.$nextTick(() => {
      this.initChars();
     });
    },
    immediate: true,
    deep: true,
   },
 
   tdCoin: {
    handler(newValue, oldValue) {
     // 当 tdCoin 发生变化时调用 getdefaultCoin
     console.log(oldValue,newValue,'oldValueoldValueoldValueoldValue');
 
     this.getdefaultCoin();
    },
    deep: true, // 开启深度监听
    immediate: true // 如果需要在组件创建时立即调用
   },
 
   spotCoinInfo(newold) {
     console.log(newold,'oldValueoldValueoldValueoldValue------------------');
 
    this.getdefaultCoin();
   },
   spotSelectNum() {
    this.depthNum = this.contractSelectNum
   },
   contractSelectNum(v) {
    this.depthNum = v
   },
   //合约单个交易对信息(合约)
   contractSymbol: {
    handler(val) {
     this.pricescale = Math.pow(10, val.priceDecimal);
     this.initChars();
    },
   },
   //现货交易对信息
   spotTradePairs: {
    handler(val) {
     this.pricescale = Math.pow(10, val.priceDecimal);
     this.initChars();
    },
   },
  },
  computed: {
   ...mapGetters(["getTheme", "getCoinsName", "getNewTradeList","getDepthIntervalList"]),
   ...mapState({
    tradingTabsActive: ({header}) => header.tradingTabsActive,
    spotsTabsActive: ({header}) => header.spotsTabsActive,
    // contractCoin: ({ contract }) => contract.contractCoin,
    tdCoin: ({contract}) => contract.tdCoin,
    spotCoinInfo: ({spots}) => spots.spotCoinInfo,
    spotSelectNum: ({setting}) => setting.SpotSelectNum,
    contractSelectNum: ({setting}) => setting.contractSelectNum,
    //单个交易对信息
    contractSymbol: ({contract}) => contract.contractSymbol,
    //现货交易对信息
    spotTradePairs: (state) => state.spots?.spotTradePairs,
   }),
  },
  created() {
   this.lang = this.$i18n.locale
  },
  beforeMount() {
   //根据类型获取合约或现货的币种信息
 
   this.contractArrType = this.tradingTabsActive
   // this.coinInfo = this.contractType ? this.contractCoin : this.spotCoinInfo;
   this.coinInfo = this.tdCoin
   this.depthNum = this.contractSelectNum
   // 预挂载k
   // onready(this.getdefaultCoin());
  },
  mounted() {
   this.getdefaultCoin()
   this.isLoadHistory = true;
   this.initTimeTabs();
   this.tabsEdit();
  },
  //卸载k线
  destroyed() {
  },
  beforeDestroy() {
   if (this.charts) {
    this.charts.remove();
    this.charts = null;
   }
  },
  methods: {
   ...mapMutations(['setIndexPrice', 'setEntrustPrice', 'setTimeStamp', 'setSellPriceInfo', 'setIncrease24H', 'setFundingRate', 'setMaxPrice24H', 'setMinPrice24H', 'setVolData', 'setLastPrice']),
 
 
   myPow(a, n) {
    var ret = 1;
    var i;
    for (i = 0; i < n; i++) {
     ret = ret * a;
    }
    return ret;
   },
   //初始化选择时间
   initTimeTabs() {
    if (
     this.contractArrType?.length === 0 &&
     Array.isArray(this.contractArrType)
    ) {
     const arr = this.tabsArr?.filter((t) => t.active);
     this.$store.commit("setTradingActive", arr)
    }
   },
 
 
   //查询选择时间
   tabsArrNewActive(v, type) {
    return type
     ? this.tabsArr?.find((item) => item.value === v)
     : this.contractArrType?.find((item) => item.value === v);
   },
   // 获取默认的交易对
   getdefaultCoin() {
    this.contractArrType = this.tradingTabsActive
    // this.coinInfo = this.contractType ? this.contractCoin : this.spotCoinInfo;
    this.coinInfo = this.tdCoin.contract
    this.depthNum = this.contractSelectNum
    
    // const {  coinsName } = this.coinInfo?.contract.coinsName;
    const coinsName = this.coinInfo?.coinsName
 
    console.log(this.tdCoin.contract,this.contractSelectNum  ,this.coinInfo?.coinsName , 'this.coinInfo?.coinsNamethis.coinInfo?.coinsName');
 
    this.iconUrl = this.tdCoin.contract.icon   ;
    this.coinTitle = coinsName?.replace('-', '');
    this.symbol = coinsName;
    this.$nextTick(() => {
     // this.unSubscribe(this.interval);
     this.initChars();
    });
   },
 
 
   //分时切换
   checkResolution(item) {
    console.log(item)
    //停止上一个订阅
    // this.setIntervalInfo()
 
    if (this.interval) {
     this.websockSend("unKlineData", null);
    }
    this.interval = item.resolution;
    this.activeId = item.value;
    const what = this.chart?.chart();
    this.isLoadHistory = true;
    what.setChartType(item.chartType);
    what.setResolution(item.resolution, function onReadyCallback() {
    });
    //发送下一个订阅
    if (this.interval) {
     console.log('getDepthIntervalList------------>',this.getDepthIntervalList[0].name);
     
     this.websockSend("klineData", this.getDepthIntervalList[0].name);
     this.initChars();
    }
   },
   //分时 选择
   mouseenter() {
    this.timeShow = true;
   },
   mouseleave() {
    if (!this.iseDit) {
     this.timeShow = false;
    }
   },
   handleEdit(str) {
    this.iseDit = !this.iseDit;
    if (str === "s") {
     // console.log("点击保存");
     this.tabsEdit();
    } else {
     // console.log("编辑状态");
    }
   },
   //时间保存更新
   tabsEdit() {
    //根据默认配置 this.tabsArr和选择this.contractArrType数组判断是否要显示
    if (Array.isArray(this.contractArrType)) {
     this.tabsArr.forEach((item) => {
      if (this.contractArrType?.some((val) => val.value === item.value)) {
       item.active = true;
      } else {
       item.active = false;
      }
     });
     //排序
     this.tabsArr = this.tabsArr.sort((a, b) => {
      return a.value - b.value;
     });
    }
   },
   chooseItem(item) {
    if (!this.iseDit) {
     //编辑时选择操作  121212
     this.checkResolution(item);
     return;
    }
    //触发保存状态时选择操作
    const valList = JSON.parse(JSON.stringify(item));
    let arrs = this.contractArrType;
    if (!this.contractArrType?.some((val) => val.value === valList.value)) {
     valList.active = true;
     arrs.push(valList);
    } else {
     //删除当前
     this.contractArrType?.map((val, index) => {
      if (val.value === valList.value) {
       valList.active = false;
       arrs.splice(index, 1);
      }
     });
    }
    const isarr = Array.isArray(arrs) ? arrs : [];
    this.contractType
    this.$store.commit("setTradingActive", isarr)
    // console.log(arrs, 'cho', this.tabsArr, item, arrs.some(val => val.value == valList.value));
   },
   changePlugin(item) {
    this.pActive = item.id;
    this.pType = item.type;
   },
   //是否全屏
   handleFull() {
    if (!screenfull.isEnabled) {
     console.log("浏览器不支持");
     return;
    }
    screenfull.toggle(this.$refs.fullRef);
    this.isFullscreen = !this.isFullscreen
   },
   //指标
   handleTarget() {
    const what = this.chart.chart();
    what.executeActionById("insertIndicator");
   },
   //设置
   handleSetting() {
    const what = this.chart.chart();
    what.executeActionById("chartProperties");
   },
 
   //订阅数据
   subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    this.onRealtimeCallback = onRealtimeCallback; //保存回调
   },
 
   //加载插件
   initChars() {
    let self = this;
    let langObj = {
     cn: 'zh',
     en: 'en',
     tw: 'zh_TW'
    };
    // eslint-disable-next-line no-unused-vars
    const downColor = "#ED3C2F" // 设置下跌颜色
    // eslint-disable-next-line no-unused-vars
    const upColor = "#0CBB57" // 设置上涨颜色
    this.chart = new widget({
     container_id: "tradeId", // 指定要包含widget的DOM元素id
     symbol: self.symbol, // 交易对
     interval: this.interval.replace('MIN', ''), // 时间间隔
     locale: langObj.cn, // 语言
     autosize: true, // 自适应大小
     fullscreen: false, // 是否占用视图所有空间
     volumeSize: 500, // 设置成交量指标区域的默认高度
     toolbar_bg: "#141414", // 工具栏背景色
     datafeed: self.datafeeds, // 数据源
     timezone: "Asia/Shanghai", // 默认时区
     library_path: "/static/charting_library/", // 默认脚本核心文件存储位置
     indicators_file_name: "custom-study(MACD红绿).js", // 指标文件名
     drawings_access: {
      type: "black",
      tools: [{name: "Regression Trend"}], // 绘图工具
     },
     loading_screen: {
      backgroundColor: "#141414", // 加载背景颜色
      foregroundColor: "#141414", // 加载样式
     },
     // 配置项
     ...config,
     overrides: {
      "symbolWatermarkProperties.color": "rgba(0,0,0, 0)", // 水印颜色
      "paneProperties.background": "#141414", // 面板背景色
      "paneProperties.vertGridProperties.color": "#1c1c1c", // 垂直网格颜色
      "paneProperties.horzGridProperties.color": "#1c1c1c", // 水平网格颜色
      "paneProperties.crossHairProperties.color": "#737373", // 十字线颜色
      "paneProperties.crossHairProperties.style": 2, // 十字线样式
      "mainSeriesProperties.style": 1, // 主系列样式
      "mainSeriesProperties.visible": false, // 是否可见
      "mainSeriesProperties.showPriceLine": false, // 是否显示价格线
      "mainSeriesProperties.lockScale": false, // 是否锁定比例
      "mainSeriesProperties.borderUpColor": upColor, // 设置上涨柱的边框颜色
      "mainSeriesProperties.borderDownColor": downColor, // 设置下跌柱的边框颜色
 
      // 成交量颜色设置
      "volumeSeriesProperties.color": '#087F3B', // 设置上涨成交量的颜色
      "volumeSeriesProperties.borderColor": '#087F3B', // 设置上涨成交量的边框颜色
      "volumeSeriesProperties.downColor": '#A82C23', // 设置下跌成交量的颜色
      "volumeSeriesProperties.borderDownColor": '#A82C23', // 设置下跌成交量的边框颜色
      volumePaneSize: "medium", // 底部视图大小
      editorFontsList: [
       "Lato",
       "Arial",
       "Verdana",
       "Courier New",
       "Times New Roman",
      ],
      "paneProperties.topMargin": 5, // 上边距
      "paneProperties.bottomMargin": 0, // 下边距
      "paneProperties.legendProperties.showLegend": true, // 显示图例
      "paneProperties.leftAxisProperties.autoScale": true, // 左轴自动缩放
      "paneProperties.leftAxisProperties.alignLabels": true, // 左轴标签对齐
      "scalesProperties.showLeftScale": false, // 不显示左侧刻度
      "scalesProperties.showRightScale": true, // 显示右侧刻度
      "scalesProperties.backgroundColor": "#fff", // 刻度背景颜色
      "scalesProperties.lineColor": '#252525', // 刻度线颜色
      "scalesProperties.textColor": "#737373", // 刻度文本颜色
     },
    });
    this.chart.onChartReady(function () {
     self.toggleStudies(self.interval); // 检查是否存在MA
    });
   },
 
   async historyBsexMarket(
    symbolInfo,
    resolution,
    rangeStartDate,
    rangeEndDate,
    onLoadedCallback,
    onErrorCallback
   ) {
    let klineData = [];
    let that = this;
 
    let rangeEndInfo = Math.floor(Date.now() / 1000);
 
 
    // 请求历史K线数据
    Promise.try(async () => {
     return GetQuotesHistory({symbol: symbolInfo.name, count: 1000, to: rangeEndInfo, resolution: this.interval})
    }).then(res => {
     console.log(res, 4564654564)
     // 遍历数据并格式化成 TradingView 需要的格式
     klineData = res.data.map(item => {
      return {
       time: Number(item.timeStamp * 1000), // 注意时间戳转换为毫秒
       close: Number(item.close), // 收盘价
       open: Number(item.open), // 开盘价
       high: Number(item.high), // 最高价
       low: Number(item.low), // 最低价
       volume: Number(item.vol), // 成交量
      }
     })
 
     // 更新 K 线数据
     this.iskLineData = klineData.reverse();
 
     if (that.onLoadedCallback) {
      let isNoData = false;
 
      if (that.currentBar) {
       // 检查是否有新数据
       isNoData = klineData[klineData.length - 1]?.timeStamp === this.iskLineData[this.iskLineData.length - 1]?.timeStamp;
      } else {
       isNoData = true; // 没有新数据
      }
 
      // 调用回调函数，传递数据给 TradingView
      that.onLoadedCallback(this.iskLineData, {noData: isNoData});
      // 深拷贝 K 线数据
      that.onLoadedCallback(isNoData ? [] : this.iskLineData, {
       noData: isNoData,
      }); //加载历史数据
      this.iskLineData = JSON.parse(JSON.stringify(klineData)).reverse();
 
      this.webSocket();
     }
    }).catch(err => {
     console.log(err)
     onErrorCallback && onErrorCallback(err)
    })
   },
 
 
   simulateArrayData() {
    let dataArray = 0;
    return function (newData) {
     if (newData !== undefined) {
      dataArray = JSON.parse(JSON.stringify(newData));
      const oldData = dataArray;
      if (dataArray !== 0) return newData === oldData;
     }
    };
   },
 
   //加载历史数据
   getBars(
    symbolInfo,
    resolution,
    rangeStartDate,
    rangeEndDate,
    onLoadedCallback,
    onErrorCallback
   ) {
    this.coinName = symbolInfo.name.replace("/", "").toLowerCase();
    // this.startSocket();
    this.onLoadedCallback = onLoadedCallback; //保存回调
 
 
    // this.getLineList(
    //   symbolInfo,
    //   resolution,
    //   rangeStartDate,
    //   rangeEndDate,
    //   onLoadedCallback
    // );
    this.historyBsexMarket(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback, onErrorCallback);
 
   },
 
 
   /**
    * 根据状态 显示隐藏 MA
    * e {string} 时段
    */
   toggleStudies(e) {
    let self = this;
    if (e == "1s") {
     self.chart
      .activeChart()
      .getAllStudies()
      .forEach((e) => {
       if (e.name == "Moving Average") {
        self.chart.activeChart().removeEntity(e.id);
       }
      });
    } else {
     //检查是否存在MA
     this.getAllStudiesFun();
    }
   },
   //检查是否有 指标MA
   getAllStudiesFun() {
    let self = this;
    let strArr = [];
    self.chart
     .activeChart()
     .getAllStudies()
     .forEach((e) => {
      // console.log(e);
      strArr.push(e.name);
     });
    if (JSON.stringify(strArr).indexOf("Moving Average") == -1) {
     //创建指标
     self.createStudyFun();
    }
   },
   //创建显示指标
   createStudyFun() {
    let self = this;
    try {
     self.chart.chart().createStudy("Moving Average", !1, !1, [10], null, {
      "plot.color": "#ffce68", //设置移动平均线的颜色
      // "plot.fill": 1,//设置是否填充
      // "plot.linewidth": 1,//设置线宽
      // "plot.symbol": "none",//设置图形形状
      // "plot.symbolSize": 1,//设置图形大小
      // "plot.transparency": 1,//设置透明度
      // "plot.type": "line",//设置图形类型
      // "plot.showLabels":!0,//设置是否显示标签
      // "plot.showGrid":!0,//设置是否显示网格
      // "plot.showAxis":!0,//设置是否显示坐标轴
      // "plot.showTicks":!0,//设置是否显示刻度
      // "plot.showCrosshair":!0,//设置是否显示辅助线
      // "plot.crosshairColor": "#ffce68",//设置辅助线颜色
      // "plot.crosshairWidth": 1,//设置辅助线宽度
      // "plot.crosshairStyle": "solid",//设置辅助线样式
      // "plot.crosshairLabelColor": "#ffce68",//设置辅助线标签颜色
      // "plot.crosshairLabelFontSize": 10,//设置辅助线标签字体大小
      // "plot.crosshairLabelFontWeight": "normal",//设置辅助线标签字体粗细
      // "plot.crosshairLabelFormat": "{value}",//设置辅助线标签格式
      // "plot.crosshairLabelAlign": "center",//设置辅助线标签位置
     });
     self.chart.chart().createStudy("Moving Average", !1, !1, [30], null, {
      "plot.color": "#62b0ff", //设置移动平均线的颜色
     });
     self.chart.chart().createStudy("Moving Average", !1, !1, [60], null, {
      "plot.color": "#ec9df1", //设置移动平均线的颜色
     });
 
     if (self.is_MACD) {
      self.chart.chart().createStudy("MACD", !1, !1, [20], null, {}); //MACD
      self.chart
       .chart()
       .createStudy(
        "指数平滑异同移动平均线(MACD_Custom)",
        false,
        false,
        [20],
        null,
        {}
       ); //自定义MACD
     }
    } catch (e) {
     console.log(e);
     
    }
   },
   //设置商品信息(重新获取初始数据/推送数据)
   setSymbols() {
    let self = this;
    self.chart.setSymbol(
     self.symbol,
     // self.filter(self.interval),
     self.interval,
     function () {
      self.chart.chart().setVisibleRange(self.initdata);
      self.chart.chart().executeActionById("timeScaleReset");
     }
    );
    self.chart.chart().setResolution(
     // self.filter(self.interval),
     self.interval,
     function onReadyCallback() {
     }
    );
   },
  },
 };
 </script>
 
 <style lang="scss" scoped>
 .trade-view {
  width: 100%;
  height: 100%;
  background-color: #141414;
 
  .trade-header {
   background-color: #141414;
   width: 100%;
   height: 40px;
   border-bottom: 1px solid #141414;
   display: flex;
   justify-content: space-between;
   font-size: 14px;
   padding: 0 20px;
 
   .left-empty {
    width: 50%;
   }
 
   .tabs-left {
    display: flex;
 
    .coin {
     font-size: 16px;
     display: flex;
     justify-content: center;
     align-items: center;
 
     img {
      width: 24px;
      height: 24px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 10px;
     }
    }
 
    .times {
     display: flex;
     justify-content: center;
     align-items: center;
     margin-left: 20px;
     cursor: pointer;
     color: #8992a6;
    }
 
    .times-active {
     color: #21BF90;
    }
 
    .time-select {
     margin-left: 20px;
     position: relative;
     height: 40px;
 
     .time-box {
      position: absolute;
      width: 20px;
      height: 40px;
      cursor: pointer;
     }
 
     .s-icon {
      height: 40px;
      line-height: 30px;
      color: #8992a6;
      font-size: 14px;
     }
 
     .s-content {
      position: absolute;
      top: 35px;
      left: -20px;
      z-index: 999;
      width: 375px;
      background: var(--select-bg);
      box-shadow: 0px 2px 24px 0px rgba(0, 0, 28, 0.04);
      border-radius: 5px;
      padding: 15px;
      color: #96a2b2;
 
      .s-container {
       .s-header {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 15px;
 
        .s-edit {
         color: $colorA;
         cursor: pointer;
        }
       }
 
       .s-time {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
 
        .s-item {
         position: relative;
         width: 80px;
         height: 25px;
         line-height: 25px;
         text-align: center;
         background: #252525;
         // background: var(--s-item-bg);
         border-radius: 4px;
         margin-bottom: 10px;
         font-size: 12px;
         cursor: pointer;
         color: #737373;
         border: 1px solid #737373;
 
         &:hover {
          // background: rgba(33, 191, 144, 0.2);
          border: 1px solid #737373;
          color: #90ff00;
          border: 1px solid #90ff00;
         }
 
         img {
          width: 10px;
          height: 10px;
          position: absolute;
          top: -2px;
          right: -2px;
         }
 
         /* &.icon::after {
           position: absolute;
           top: -5px;
           right: -5px;
           height: 12px;
           line-height: 12px;
           width: 12px;
           border-radius: 50%;
           background: #d5dae9;
           color: #fff;
           text-align: center;
           content: "√";
         }
         &.icon-active::after {
           position: absolute;
           top: -5px;
           right: -5px;
           height: 12px;
           line-height: 12px;
           width: 12px;
           border-radius: 50%;
           background: #21BF90;
           color: #fff;
           text-align: center;
           content: "√";
         } */
        }
 
        .ta {
         &.icon::after {
          background: rgba(33, 191, 144, 0.1);
          content: "√";
         }
        }
 
        .active-item {
         background: rgba(33, 191, 144, 0.1);
         border-radius: 4px;
         color: #21bf90;
 
         &:hover {
          background: rgba(33, 191, 144, 0.2);
         }
        }
 
        .empty {
         height: 1px;
         background: transparent;
        }
       }
      }
     }
    }
 
    .target {
     margin-left: 20px;
     display: flex;
     justify-content: center;
     align-items: center;
 
     img {
      width: 24px;
      height: 24px;
      display: inline-block;
      cursor: pointer;
     }
    }
 
    .setting {
     margin-left: 20px;
     display: flex;
     justify-content: center;
     align-items: center;
     font-size: 24px;
     color: #999;
 
     i {
      cursor: pointer;
     }
    }
   }
 
   .tabs-right {
    display: flex;
 
    .plugin {
     margin-right: 30px;
     display: flex;
     align-items: center;
     font-size: 14px;
     color: #96a2b2;
 
     .p-item {
      margin-left: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      // border: 1px solid #e1e1e1;
      padding: 0 5px;
      cursor: pointer;
     }
 
     .p-active {
      // border: 1px solid #21BF90;
      color: #21BF90;
     }
    }
 
    .full {
     display: flex;
     align-items: center;
 
     img {
      width: 24px;
      height: 24px;
      display: inline-block;
      cursor: pointer;
     }
    }
   }
  }
 
  .activeBorder {
   border-bottom: 1px solid #2e2e2e;
  }
 
  #tradeId {
   width: 100%;
   height: 94%;
  }
 
  .depth-chart {
   width: 100%;
   height: 94%;
  }
 }
 
 .activeBg {
  background-color: #121212;
 }
 </style>