<template>
  <div class="sTradingviewContent">
    <div :id="domId" class="sTradingviewView"></div>
  </div>
</template>
<script>
import { widget } from "./static/charting_library.min.js";
import datafeeds from "./static/datafees.js";
import config from "./config";
import tabsConfig from "./config/tabs";
import { webSocketMixin } from "./mixin/webSocket";
import { getLineKApi } from "@/api/contractTransaction";

// import $lodash from "lodash";
export default {
  name: "sTradingview",
  mixins: [webSocketMixin],
  props: {
    //Dom元素id
    domId: {
      type: String,
      default: function () {
        return "tradeView";
      },
    },
    //参数
    marketName: {
      type: String,
      default: function () {
        return "";
      },
    },
    // 请求id
    marketId: {
      type: String | Number,
      default: function () {
        return "";
      },
    },
    // 小数值
    decimal: {
      type: String | Number,
      default: function () {
        return 100;
      },
    },
    //是否显示MACD
    is_MACD: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tabsArr: tabsConfig,
      symbol: null, //币名称
      marketType: "u",
      interval: "1", //默认显示规则
      coins: "", // 获取历史数据的交易对
      chart: null,
      klineData: [], // k线历史数据
      lastBar: null, //记录历史数据最后一条
      currentBar: null, //起始订阅累积
      resolution: "",
      initdata: {},
      datafeeds: new datafeeds(this),
      onLoadedCallback: null, //初始数据回调
      onRealtimeCallback: null, //websocket数据回调
      onHistoryCallback: null,
      subscribe: true, //是否订阅
    };
  },
  created() {
    this.getdefaultCoin();
  },
  mounted() {
    //加载K线图
  },
  methods: {
    // socket 推送
    websockOpen(e) {
      const self = this;
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      //  this.loadChart();
      self.websockSend("klineData");
    },

    // 获取默认的交易对
    getdefaultCoin() {
      this.$EventBus.$on("sendDefaultSymbol", (msg) => {
        this.symbol = msg.symbolKey;
        this.coins = msg.symbol;
        this.loadChart();
        this.webSocket();
      });
    },
    // 获取切换后的交易对
    getTabCoin() {
      this.$EventBus.$on("sendSymbol", (msg) => {
        this.symbol = msg.symbolKey;
        this.coins = msg.symbol;
        this.webSocket();
      });
    },

    /**
     * 切换触发
     * e {string} reset=重置数据
     */
    changeTabs(e) {
      this.interval = e;
      let chartType = e == "1s" ? 3 : 1;
      this.chart.activeChart().setChartType(chartType);
      this.setSymbols();
      this.chart.activeChart().resetData();
      this.webSocket();
      //MA显示隐藏
      this.toggleStudies(e);
    },
    //过滤 时段
    filter(time) {
      return time == "1s" ? "1" : time;
    },

    // k线插件加载历史数据
    getBars(
      symbolInfo,
      resolution,
      rangeStartDate,
      rangeEndDate,
      onHistoryCallback,
      onLoadedCallback
    ) {
      this.onLoadedCallback = onLoadedCallback; //保存回调
      this.onHistoryCallback = onHistoryCallback; //保存回调
      this.resolution = resolution;
      this.getLineK(rangeStartDate, rangeEndDate);
    },

    // 获取k线图数据
    getLineK(rangeStartDate, rangeEndDate) {
      let self = this;
      let params = {
        symbol: this.coins, //交易对
        interval: self.filter(self.interval), // k线时段
        from: rangeStartDate, // 最左边k线时间
        to: rangeEndDate, // 最右边请求的k线时间
        marketType: "USDT_M_FUTURE", // 市场类型现在默认是用u代表U本位
      };
      getLineKApi(params).then((res) => {
        let klineData = [];
        res.data.data.map((item) => {
          klineData.push({
            time: Number(item.time * 1000),
            close: Number(item.close),
            open: Number(item.open),
            high: Number(item.hige),
            low: Number(item.low),
            volume: Number(item.volumn),
          });
        });
        self.lastBar =
          klineData.length > 0 ? klineData[klineData.length - 1] : null;
        self.currentBar = self.lastBar;
        this.onHistoryCallback(klineData);
        this.onHistoryCallback([], { noData: true });
      });
    },

    //socket 数据订阅
    subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback
    ) {
      this.onRealtimeCallback = onRealtimeCallback;
    },
    //取消订阅
    unsubscribeBars(subscriberUID) {
      // console.log("取消订阅", subscriberUID);
      this.subscribe = false;
    },

    //获取配置信息
    getSymbol(symbol) {
      return {
        name: symbol,
        full_name: symbol,
        timezone: "Asia/Shanghai", //默认时区
        minmov: 1,
        minmov2: 0,
        pointvalue: 1,
        fractional: false,
        //设置周期 等于所有时间都是交易时段
        session: "24x7",
        has_intraday: true, //布尔值显示商品是否具有日内（分钟）历史数据
        has_no_volume: false,
        //设置是否支持周月线
        has_daily: true,
        //设置是否支持周月线
        // has_weekly_and_monthly: true,
        description: symbol,
        //设置精度  100表示保留两位小数   1000三位   10000四位
        pricescale: parseInt(this.decimal),
        ticker: symbol,
        supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
        // seconds_multipliers: ["1S", "5S", "15S"],
        // volume_precision: 0, //整数显示此商品的成交量数字的小数位。0表示只显示整数。1表示保留小数位的1个数字字符
        // data_status: "streaming", //数据状态(streaming(实时),endofday(已收盘),pulsed(脉冲),delayed_streaming(延迟流动中))
      };
    },

    //设置商品信息(重新获取初始数据/推送数据)
    setSymbols() {
      let self = this;
      console.log("设置商品信息");
      self.chart.setSymbol(
        self.symbol,
        self.filter(self.interval),
        function (e) {
          self.chart.chart().setVisibleRange(self.initdata);
          self.chart.chart().executeActionById("timeScaleReset");
        }
      );
      self.chart
        .chart()
        .setResolution(
          self.filter(self.interval),
          function onReadyCallback() {}
        );
    },

    //卸载K线
    removeChart() {
      if (this.chart) {
        this.chart.remove();
        this.chart = null;
      }
    },

    //加载K线图插件
    loadChart() {
      let self = this;
      this.getTabCoin();
      // this.webSocket();
      this.chart = new widget({
        container_id: self.domId, //`id`属性为指定要包含widget的DOM元素id。
        symbol: self.symbol,
        interval: self.filter(self.interval),
        locale: "zh", //  语言
        autosize: true,
        fullscreen: false, //是否占用视图所有空间
        // preset: "mobile",
        toolbar_bg: "#ffffff", //工具栏背景色
        datafeed: this.datafeeds,
        timezone: "Asia/Shanghai", //默认时区
        library_path: "/static/charting_library/", //默认脚本核心文件存储位置
        indicators_file_name: "custom-study(MACD红绿).js",
        drawings_access: {
          type: "black",
          tools: [{ name: "Regression Trend" }],
        },
        //配置项
        ...config,
      });

      this.chart.onChartReady(function () {
        //检查是否存在MA
        self.toggleStudies(self.interval);
        self.createButton(self.tabsArr);
      });
    },
    // 创建按钮(这里是时间维度)，并对选中的按钮加上样式
    createButton(buttons) {
      let self = this;
      var thats = this.chart;
      for (var i = 0; i < buttons.length; i++) {
        (function (button) {
          let defaultClass = thats
            .createButton()
            .attr("title", button.label)
            .addClass(
              `mydate ${button.resolution == self.interval ? "s_active" : ""}`
            )
            .text(button.label)
            .on("click", function (e) {
              if (this.className.indexOf("s_active") > -1) {
                // 已经选中
                return false;
              }
              let curent = e.currentTarget.parentNode.parentElement.childNodes;
              for (let index of curent) {
                if (
                  index.className.indexOf("my-group") > -1 &&
                  index.childNodes[0].className.indexOf("s_active") > -1
                ) {
                  index.childNodes[0].className =
                    index.childNodes[0].className.replace("s_active", "");
                } else {
                  self.removeClassName(e);
                }
              }
              this.className = `${this.className} s_active`;
              self.changeTabs(button.resolution);
            })
            .parent()
            .addClass(
              "my-group" +
                (button.resolution == self.interval ? " s_active" : "")
            );
        })(buttons[i]);
      }
    },
    //删除 按钮非选中的class
    removeClassName(el) {
      let dom = el.currentTarget.parentNode.parentNode.parentNode.childNodes;
      for (var i = 0; i < dom.length; i++) {
        if (dom[i].hasChildNodes()) {
          if (
            dom[i].childNodes[0].childNodes[0].className.indexOf("s_active") >
            -1
          ) {
            dom[i].childNodes[0].childNodes[0].className = dom[
              i
            ].childNodes[0].childNodes[0].className.replace("s_active", "");
          }
        }
      }
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
        self.chart.chart().createStudy("Moving Average", !1, !1, [7], null, {});
        self.chart
          .chart()
          .createStudy("Moving Average", !1, !1, [10], null, {});
        self.chart
          .chart()
          .createStudy("Moving Average", !1, !1, [30], null, {});

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
      } catch (e) {}
    },
  },
  //销毁之前
  beforeDestroy() {
    this.removeChart();
  },
};
</script>
<style lang="scss" scoped>
::v-deep   .van-tabs--line .van-tabs__wrap {
  height: 100%;
}
.sTradingviewContent {
  height: 100%;
  width: 100%;
  .tabsWrap {
    height: 88px;
  }
  .sTradingviewView {
    height: 100%;
    // height: calc(100% - 88px);
  }
}
</style>
