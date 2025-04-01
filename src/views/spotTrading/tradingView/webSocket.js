import { mapMutations } from "vuex";

export const webSocketMixin = {
  data() {
    return {
      isWebsock: false, // WebSocket连接状态
      websockTime: "", // 心跳定时器

      onRealtimeCallback: null,

      socketTime: null,
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
        self.websock = new WebSocket(
          `${process.env.VUE_APP_BASE_WS_TY}/websocket`
        ); // 这里的wsUrl需要您自己定义
        // 监听WebSocket连接
        self.websock.onsend = self.websockSend;
        self.websock.onopen = self.websockOpen; // 连接成功时的回调
        self.websock.onerror = self.websockError; // 连接错误时的回调
        self.websock.onmessage = self.websockMessage; // 接收到消息时的回调
      }
    },
    // 连接状态
    websockOpen() {
      let that = this;
      that.websock.send(
        JSON.stringify({
          cmd: "SUBSCRIBE",
          data: this.data,
        })
      );

      that.socketTime = setTimeout(() => {
        that.websock.send("ping");
      }, 30000);
    },

    // 错误处理
    websockError(e) {
      console.log(e, "连接错误88");
    },
    // 监听返回消息   `market.${this.getCoinsName}.${this.interval}MIN.kline`:
    websockMessage(event) {
      // 响应服务端
      if (event.data === "ping") return this.websock.send("pong");

      // 回应服务端
      if (event.data === "pong") return;

      const { key, data } = JSON.parse(event.data);

      if (this.type === "tradingView") {
        let lastBar = {
          time: Number(data.timeStamp), // 注意时间戳转换为毫秒
          close: Number(data.close), // 收盘价
          open: Number(data.open), // 开盘价
          high: Number(data.high), // 最高价
          low: Number(data.low), // 最低价
          volume: Number(data.vol), // 成交量
          rate: data.fluctuation,
        };

        this.lastBar = lastBar; // 更新最后一根K线
        this.currentBar = this.lastBar; // 更新当前K线
        // 确保图表更新

        this.$EventBus.$emit("currencyInfo", lastBar);

        if (this.onRealtimeCallback) this.onRealtimeCallback(lastBar); // 通知图表插件更新
      }

      if (this.type === "DepthPlate" && key.indexOf("trade-market-depth-") > -1)
        this.getOrder(data);

      if (this.type === "DepthPlate" && key.indexOf("spot-trade-") > -1)
        this.getNewOrder(data);
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
