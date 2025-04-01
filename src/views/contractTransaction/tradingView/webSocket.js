//import { getUuid } from "@/libs/utils"; // 导入生成唯一标识符的工具
import { mapMutations } from "vuex";
export const webSocketMixin = {
  data() {
    return {
      isWebsock: false, // WebSocket连接状态
      websockTime: "", // 心跳定时器
      intervalInfo: "",
      coinsNameInfo: "BTC-USDT",
      selectNum: "0.1",
      // websockState:nullwebsockState

      onRealtimeCallback: null,
    };
  },
  mounted() {},
  methods: {
    ...mapMutations(["setAsksList", "setBidsList"]),
    // 获取推送数据
    webSocket() {
      const self = this;
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket"); // 检查浏览器是否支持WebSocket
      } else {
        try {
          if (self.websock) {
            self.websock.close(); // 关闭现有的WebSocket连接
            this.isWebsock = false; // 更新连接状态
        }
          
        } catch (e) {
          console.log(e); // 捕获并打印错误
        }
        // 实例化WebSocket
        self.websock = new WebSocket(`${process.env.VUE_APP_BASE_WS_TY}/websocket`); // 这里的wsUrl需要您自己定义
                // 监听WebSocket连接
        self.websock.onsend = self.websockSend
        self.websock.onopen = self.websockOpen; // 连接成功时的回调
        self.websock.onerror = self.websockError; // 连接错误时的回调
        self.websock.onmessage = self.websockMessage; // 接收到消息时的回调
      }
    },
    // 连接状态
    websockOpen() {
      const self = this;
      if (this.websockTime) {
        clearInterval(this.websockTime); // 清除心跳定时器
      }
      this.isWebsock = true; // 更新连接状态

      self.websockSend("klineData",null); // 发送订阅消息
      // self.websockSend("depthData",null); // 发送订阅消息
      self.websockSend("depthData",this.getDepthIntervalList[0].name); // 发送订阅消息
      self.websockSend("tradeData",null); // 发送订阅消息
    },


    unwebsockSend(msg){
      if (!self.websock) {
        self.websock = new WebSocket(`${process.env.VUE_APP_BASE_WS_TY}/websocket`); // 这里的wsUrl需要您自己定义
      }
      let selectNuminfo = this.selectNum ? this.selectNum : "0.1";
      let params = {
        cmd: "UNSUBSCRIBE",
        data: { topic: `market_${this.coinsNameInfo}_${selectNuminfo}_depth` }, //  深度数据请求
      };
      if (msg === 'depthData') {
        this.isWebsock = true; // 更新连接状态
        self.websock.send(JSON.stringify(params)); // 深度数据请求
        this.isWebsock = false; // 更新连接状态
      }

    },
    // 发送消息
    websockSend(msg,selectNum) {

      const self = this;
      if (selectNum) {
        this.selectNum = selectNum
      }
      if (!self.websock) {
        self.websock = new WebSocket(`${process.env.VUE_APP_BASE_WS_TY}/websocket`); // 这里的wsUrl需要您自己定义
      }

      let selectNuminfo = this.selectNum ? this.selectNum : "0.1";
      let params = {
        cmd: "SUBSCRIBE",
        data: { topic: `market_${this.coinsNameInfo}_${selectNuminfo}_depth` }, //  深度数据请求
      };
      if (msg === 'depthData') {
        this.isWebsock = true; // 更新连接状态

        self.websock.send(JSON.stringify(params)); // 深度数据请求
      }

      let newParams = {
        cmd: "SUBSCRIBE",
        data: { topic: `market_${this.coinsNameInfo}_trade` }, 
      };
      if (msg === 'tradeData') {
        self.websock.send(JSON.stringify(newParams)); // 最新成交
      }
      this.coinsNameInfo = this.getCoinsName ? this.getCoinsName : "BTC-USDT";
      //  let interval = this.interval ? this.interval : '1MIN'
      let parkline = {
        cmd: "SUBSCRIBE",
        data: { topic: `market.${this.coinsNameInfo}.${this.interval}.kline` }, // 订阅市场数据
      };
      if (msg === "klineData") {
        //  self.websock.send(JSON.stringify(params)); // 发送订阅请求
        self.websock.send(JSON.stringify(parkline)); // 发送订阅请求
      }

    },
    // 错误处理
    websockError(e) {
      console.log(e, "连接错误88");
    },
    // 监听返回消息   `market.${this.getCoinsName}.${this.interval}MIN.kline`:
    websockMessage(event) {
      
      const self = this;
      if (event) {
        if (event.data === "ping") {
          self.websock.send("pong"); // 发送订阅请求
        }
      //  let interval = this.interval ? this.interval : '1MIN'
        let depData = JSON.parse(event.data);
        this.coinsNameInfo = this.getCoinsName ? this.getCoinsName : "BTC-USDT";
        if (depData.key === `market.${this.coinsNameInfo}.${this.interval}.kline`) {
          let resp = depData.data;

          this.setEntrustPrice(resp.open);
          this.setSellPriceInfo(resp.close); //市场价
          this.setIndexPrice(resp.indexPrice); //setIndexPrice
          this.setIncrease24H(resp.increase24H); //24涨跌
          this.setFundingRate(resp.fundingRate); //资金费率
          this.setMaxPrice24H(resp.maxPrice24H); // setMaxPrice24H
          this.setMinPrice24H(resp.minPrice24H); // 24小时最低
          // this.setVolData(resp.volPrice24H); //24成交量
          this.setVolData(resp.vol)  //24成交量
          this.setTimeStamp(resp.timeStamp); //时间戳

          let lastBar = {
            time: Number(resp.timeStamp * 1000), // 时间戳
            open: Number(resp.open), // 开盘价
            high: Number(resp.high), // 最高价
            low: Number(resp.low), // 最低价
            close: Number(resp.close), // 收盘价
            volume: Number(resp.vol), // 成交量
          };
          self.lastBar = lastBar; // 更新最后一根K线
          self.currentBar = self.lastBar; // 更新当前K线
          // 确保图表更新

          if (this.onRealtimeCallback) {
            this.onRealtimeCallback(lastBar); // 通知图表插件更新
          }
        }
        if (depData.key === `market_${this.coinsNameInfo}_${this.selectNum}_depth`) {
          
          this.setAsksList([]);
          this.setBidsList([]);
          this.setAsksList(depData.data.asks);
          this.setBidsList(depData.data.bids);
          this.setIndexPrice(depData.data.indexPrice);
          this.setSellPriceInfo(depData.data.lastPrice);
          this.setLastPrice(depData.data.lastPrice);
          // lastPrice    // indexPrice
        }
        console.log(`market_${this.coinsNameInfo}_trade`)
        if (depData.key === `market_${this.coinsNameInfo}_trade`) {
          this.tradeList.unshift(depData.data)
        }
      }
    },
    // 心跳
    websockHeartbeat() {
      const self = this;
      self.websockTime = setInterval(function () {
        // self.websockSend('pong'); // 发送心跳
        self.websock.send("pong");
      }, 3000);
    },
  },
};
