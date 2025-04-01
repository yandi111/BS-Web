import { getUuid } from "@/libs/utils";
export const webSocketMixin = {
  data() {
    return {
      isWebsock: false,
      websockTime: "", //心跳
    };
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
        } catch (e) {}
        // 实例化socket
        self.websock = new WebSocket(self.wsUrl);
        // 监听socket连接
        self.websock.onopen = self.websockOpen;
        // 监听socket错误信息
        self.websock.onerror = self.websockError;
        // 监听socket消息
        self.websock.onmessage = self.websockMessage;
        //关闭socket
        self.websock.onClose = self.socketClose;
      }
    },
    //链接状态
    websockOpen(e) {
      const self = this;
      // console.log("socket连接成功");
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
    },
    //发送消息
    websockSend(msg) {
      const self = this;
      // console.log("msg", msg);
      let sendObj = {
        //全局交易禁用
        disableData:()=>{
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "global-trade-pair-status-change",
              data: {},
            })
          );
        },
        //通知
        noticeData: () => {
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "user_station_letter_notice_push",
              data: {},
            })
          );
        },
        //单个交易对禁用状态
        symbolStatusSend: () => {
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "notification",
              data: {},
            })
          );
        },

        //合约行情
        contractSymbolSend: () => {
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "batch.market.update",
              data: {},
            })
          );
        },
        //现货行情
        spotSymbolSend: () => {
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "spot.batch.market.update",
              data: {},
            })
          );
        },
        run: (fn) => fn && fn(),
      };
      sendObj.run(sendObj[msg]);
    },
    //错误
    websockError(e) {
      this.websockClose();
    },

    //监听返回消息
    websockMessage(msg) {
      const self = this;
      const newmsg = JSON.parse(msg.data);
      let responseObj = {
        //全局交易禁用
        ['global-trade-pair-status-change']:()=>{
          self.allDisableStatus = newmsg.data.enalbedTrade
          this.$store.dispatch("handleAll_symbolStatus", self.allDisableStatus);
        },
        //通知
        [`user_station_letter_notice_push`]: () => {
          const { id, title, content, createTimeTsLong, readStatus } =
            newmsg.data;
          self.noticeList.unshift({
            id: id,
            title: title,
            content: content,
            createTimeTsLong: createTimeTsLong,
            readStatus: readStatus,
          });
          self.getUnreadCount();
        },
        //合约单个交易对状态
        [`notification`]: () => {
          console.log("symbolstatus", newmsg.data);
          if (newmsg.data.event.includes("symbol")) {
            const obj = {
              status: newmsg.data.event == "symbol.disable" ? 0 : 1,
              symbol: newmsg.data.param.symbol,
            };
            if (newmsg.data.param.marketType == "USDT_M_FUTURE") {
              this.$store.dispatch("handleContract_symbolStatus", obj);
            } else {
              this.$store.dispatch("handleSpot_symbolStatus", obj);
            }
          }
        },
        //合约行情数据
        [`batch.market.update`]: () => {
          if (self.contractList) {
            newmsg.data.forEach((item) => {
              self.contractList.forEach((ele) => {
                if (ele.symbol == item.symbol) {
                  ele.change = item.change;
                  ele.higePrice = item.higePrice;
                  ele.lastPrice = item.lastPrice;
                  ele.lowPrice = item.lowPrice;
                  ele.volOf24h = item.volOf24h;
                }
              });
            });
          }
        },
        //现货行情数据
        [`spot.batch.market.update`]: () => {
          if (self.spotList) {
            newmsg.data.forEach((item) => {
              self.spotList.forEach((ele) => {
                if (ele.symbol == item.symbol) {
                  ele.change = item.change;
                  ele.higePrice = item.higePrice;
                  ele.lastPrice = item.lastPrice;
                  ele.lowPrice = item.lowPrice;
                  ele.volOf24h = item.volOf24h;
                }
              });
            });
          }
        },
        run: (fn) => fn && fn(),
      };
      responseObj.run(responseObj[newmsg?.topic]);
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
    //关闭socket
    socketClose() {
      console.log("关闭socket-----");
      this.websock.close();
    },
  },
};
