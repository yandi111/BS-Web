import { getUuid } from "@/libs/utils";
export const webSocketMixin = {
  data() {
    return {
      isWebsock: false,
      websockTime: "", //心跳
    };
  },
  mounted() {
    // this.webSocket(); // 页面打开连接webSocket
  },
  methods: {
    /**
     * 获取推送数据 （取一个值就好）
     * e {string} load=加载 get=获取
     */
    webSocket(e) {
      const self = this;
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        try {
          self.websock.close();
          this.isWebsock = false;
        } catch (e) { }
        // 实例化socket
        self.websock = new WebSocket(self.wsUrl);
        // 监听socket连接
        self.websock.onopen = self.websockOpen;
        // 监听socket错误信息
        self.websock.onerror = self.websockError;
        // 监听socket消息
        self.websock.onmessage = self.websockMessage;
      }
    },
    //连接状态
    websockOpen(e) {
      const self = this;
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      // setTimeout(function () {
      //     self.websockHeartbeat();
      // }, 1000);
    },
    //发送消息
    websockSend(msg) {
      const self = this;
      switch (msg) {
        case "klineData":
          self.websock.send(
            JSON.stringify({
              id: getUuid(), //客户端生成的随机字符串
              cmd: "sub",
              topic: `kline.update.${self.marketType}.${self.symbol}.${self.filter(self.interval)}`,
              // topic: "kline.update.u.btcusdt.1",
              data: {},
            })
          );
          break;
        case "depthData":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "depth.update.u.btcusdt",
              data: {},
            })
          );
          break;
        case "tradeData":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "market_trade.update.u.btcusdt",
              data: {},
            })
          );
          break;
        case "priceData":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "price.update.u.btcusdt",
              data: {},
            })
          );
          break;
        case "marketData":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "market.update",
              data: {},
            })
          );
          break;
        case "markPriceSend":
          if (self.coinsName) {
            self.websock.send(
              JSON.stringify({
                id: getUuid(),
                cmd: "sub",
                topic: `usdt.contract.marked.price.${self.coinsName}`,
                data: {},
              })
            );
          }
          break;
        case "overviewData":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "market.update",
              data: {},
            })
          );
          break;
        default:
      }
    },
    //错误
    websockError(e) {
      // console.log(e)
      //   console.log("连接错误");
      this.websockClose();
    },

    // 反转方法
    reverse(array) {
      let newArr = [];
      for (let i = array.length - 1; i >= 0; i--) {
        newArr[newArr.length] = array[i];
      }
      return newArr;
    },

    //监听返回消息
    websockMessage(msg) {
      const self = this;
      const newmsg = JSON.parse(msg.data);
      switch (newmsg?.topic) {
        case `kline.update.${self.marketType}.${self.symbol}.${self.interval}`:
          let resp = newmsg.data
          if (self.lastBar) {
            self.lastBar.close = resp.close
            if (resp.close > self.lastBar.high) {
              self.lastBar.high = resp.close
            }
            if (resp.close < self.lastBar.low) {
              self.lastBar.low = resp.close
            }
            self.onRealtimeCallback(self.lastBar)
            if (self.resolution != "1") return
            if (self.currentBar != null) self.onRealtimeCallback(self.currentBar)
            self.lastBar = { time: resp.time * 1000, open: resp.open, high: resp.hige, low: resp.low, close: resp.close }
            self.currentBar = self.lastBar
            self.onRealtimeCallback(self.lastBar)
          }
          break;
        case "depth.update.u.btcusdt":
          if (self.selectedPlate === 'all') {
            self.sellData = newmsg.data.ask.slice(22, 30);
            self.buyData = newmsg.data.bid.slice(0, 8);
          } else if (self.selectedPlate === 'buy') {
            self.buyData = newmsg.data.bid;
          } else if (self.selectedPlate === 'sell') {
            self.sellData = newmsg.data.ask;
          }
          self.totalSell = newmsg.data.ask;
          self.totalBuy = newmsg.data.bid;

          break;
        case "market_trade.update.u.btcusdt":
          let tradeData = newmsg.data.details;
          tradeData.forEach((item) => {
            self.tradesArr.unshift(item);
          });

          break;
        case 'market.update':
          const { symbol, change, higePrice, lastPrice, lowPrice, volOf24h } =
            newmsg.data;
          const newChange =
            change > 0
              ? "+" + change + "%"
              : change === 0
                ? change
                : change + "%";
          // 合约数据
          if (self.contractData) {
            const newtableData = self.contractData
              ? self.contractData.map((item) => {
                if (item.symbol === symbol)
                  return {
                    ...item,
                    change: newChange,
                    higePrice: higePrice,
                    lastPrice: lastPrice,
                    lowPrice: lowPrice,
                    volOf24h: volOf24h,
                  };
                return item;
              })
              : [];
            self.contractData = newtableData;
            // 合约头部数据
            if (self.headerData && self.headerData.symbol === symbol) {
              self.headerData = {
                ...self.headerData,
                ...newmsg.data,
                change:
                  newmsg.data.change > 0
                    ? "+" + change + "%"
                    : change === 0
                      ? change
                      : change + "%",
              };
            }
          }

          // 自选数据
          if (self.optionalData && self.optionalData.length > 0) {
            const newOptionalData = self.optionalData.map((item) => {
              if (item.symbol === symbol)
                return {
                  ...item,
                  change: newChange,
                  higePrice: higePrice,
                  lastPrice: lastPrice,
                  lowPrice: lowPrice,
                  volOf24h: volOf24h,
                };
              return item;
            });
            self.optionalData = newOptionalData;
          }
          // 涨幅数据
          if (self.increaseData && self.increaseData.length > 0) {
            const newIncreaseData = self.increaseData.map((item) => {
              if (item.symbol === symbol)
                return {
                  ...item,
                  change: newChange,
                  higePrice: higePrice,
                  lastPrice: lastPrice,
                  lowPrice: lowPrice,
                  volOf24h: volOf24h,
                };
              return item;
            });
            self.increaseData = newIncreaseData;
          }
          break;
        case `usdt.contract.marked.price.${self.coinsName}`:
          self.markedPrice = newmsg.data.markedPrice;
          break;
        default:
      }
    },
    //心跳
    websockHeartbeat() {
      const self = this;
      self.websockTime = setInterval(function () {
        self.websockSend(JSON.stringify({ ping: new Date().getTime() }));
      }, 3000);
    },
    //连接关闭
    websockClose() {
      // console.log("socket已经关闭");
      clearInterval(this.websockTime);
      this.isWebsock = false;
    },
  },
};
