import { getUuid } from "@/libs/utils";
export const webSocketMixin = {
  data() {
    return {
      isWebsock: false,
      websockTime: "", //心跳
    };
  },
  created() {
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
    //链接状态
    websockOpen(e) {
      const self = this;
      console.log("socket连接成功");
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
    },
    //发送消息
    websockSend(msg) {
      const self = this;
      switch (msg) {
        case "depthData":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              // topic: "depth.update.u.btcusdt.1",
              topic: `depth.update.u.${self.coinsName}.${self.selectNum}`,
              data: {},
            })
          );
          break;
        case "tradeData":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: `market_trade.update.u.${self.coinsName}`,
              data: {},
            })
          );
          break;
        case "priceData":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "batch.market.update",
              data: {},
            })
          );
          break;
        case "markPriceSend":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: `usdt.contract.marked.price.${self.coinsName}`,
              data: {},
            })
          );
          break;
        default:
      }

      if (msg == "markPriceArrSend") {
        if (self.positionData && self.positionData.length) {
          self.positionData.forEach((item) => {
            self.websock.send(
              JSON.stringify({
                id: getUuid(),
                cmd: "sub",
                topic: `usdt.contract.marked.price.${item.coinsName}`,
                data: {},
              })
            );
          });
        }
      }
    },
    //停止订阅
    unWebsockSend(msg) {
      const self = this;
      self.websock.send(
        JSON.stringify({
          id: getUuid(),
          cmd: "unsub",
          // topic: "depth.update.u.btcusdt.1",
          topic: `depth.update.u.${self.coinsName}.${self.selectNum}`,
          data: {},
        })
      );
    },
    //错误
    websockError(e) {
      this.websockClose();
    },

    //监听返回消息
    websockMessage(msg) {
      const self = this;
      const newmsg = JSON.parse(msg.data);
      switch (newmsg?.topic) {
        case `depth.update.u.${self.coinsName}.${self.selectNum}`:
          // case "depth.update.u.btcusdt.1":
          // console.log('盘口返回',newmsg);
          if (self.selectedPlate === "all") {
            const arr = newmsg.data.ask;
            self.sellData = arr.slice(arr.length - 11, arr.length);
            self.buyData = newmsg.data.bid.slice(0, 11);
          } else if (self.selectedPlate === "buy") {
            self.buyData = newmsg.data.bid;
          } else if (self.selectedPlate === "sell") {
            self.sellData = newmsg.data.ask;
          }
          self.totalSell = newmsg.data.ask;
          self.totalBuy = newmsg.data.bid;
          break;
        case `market_trade.update.u.${self.coinsName}`:
          let tradeData = newmsg.data.details;
          tradeData.forEach((item) => {
            self.tradesArr.unshift(item);
          });
          break;
        case "batch.market.update":

          if (self.marketInfo) {
            let currentSymbolMarket = newmsg.data.filter((item) => {
              return self.marketInfo.symbol === item.symbol;
            })[0];

            if (currentSymbolMarket) {
              self.marketInfo = {
                ...self.marketInfo,
                ...currentSymbolMarket,
                change:
                  currentSymbolMarket.change > 0
                    ? "+" + currentSymbolMarket.change + "%"
                    : currentSymbolMarket.change === 0
                      ? currentSymbolMarket.change
                      : currentSymbolMarket.change + "%",
              };
            }
          }
          break;
        case `usdt.contract.marked.price.${self.coinsName}`:
          self.markedPrice = newmsg.data.markedPrice;
          break;
        default:
      }

      if (self.positionData && self.positionData.length) {
        self.positionData.forEach((item, index) => {
          if (newmsg?.topic == `usdt.contract.marked.price.${item.coinsName}`) {
            item.markedPrice = newmsg.data.markedPrice;
          }
        });
      }
    },
    //心跳
    websockHeartbeat() {
      const self = this;
      self.websockTime = setInterval(function () {
        console.log('心跳检测发送ping');
        self.websockSend(JSON.stringify({ ping: new Date().getTime() }));
      }, 3000);
    },
    //连接关闭
    websockClose() {
      console.log("合约盘口socket已经关闭");
      clearInterval(this.websockTime);
      this.isWebsock = false;
    },
  },
};
