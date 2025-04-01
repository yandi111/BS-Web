import { getUuid } from "@/libs/utils";
export const webSocketMixin = {
  data() {
    return {
      isWebsock: false,
      websockTime: "", //心跳
    };
  },
  created() {
    this.webSocket(); // 页面打开连接webSocket
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
        //关闭socket
        self.websock.onClose = self.websockClose;
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
    //发送消息（发送订阅）
    websockSend(msg) {
      const self = this;
      switch (msg) {
        case "coinDetailData":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "spot.batch.market.update",
              data: {},
            })
          );
          break;
        default:
      }
    },
    //停止订阅
   unSubscribe(msg){
    const self = this;
    switch (msg) {
      case "unMarketData":
        self.websock.send(
          JSON.stringify({
            id: getUuid(),
            cmd: "unsub",
            topic: "batch.market.update",
            data: {},
          })
        );
        break;
      case "unSpotData":
        self.websock.send(
          JSON.stringify({
            id: getUuid(),
            cmd: "unsub",
            topic: "spot.batch.market.update",
            data: {},
          })
        );
        break;
      default:
    }
   },
    //错误
    websockError(e) {
      this.websockReconnection();
    },

    //监听返回消息
    websockMessage(msg) {
      const self = this;
      const newmsg = JSON.parse(msg.data);
      switch (newmsg?.topic) {
        case "spot.batch.market.update":
          // 现货数据
          if (self.quotesList) {
            newmsg.data.forEach(item => {
              self.quotesList.forEach(ele => {
                if (ele.symbol == item.symbol) {
                  ele.change = item.change;
                  ele.lastPrice = item.lastPrice;
                }
              })
            });
          }
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
    //连接关闭重连
    websockReconnection() {
      // console.log("socket已经关闭");
      // clearInterval(this.websockTime);
      // this.isWebsock = false;
      const self = this
      setTimeout(function () {
        clearInterval(this.websockTime);
        self.websock = new WebSocket(self.wsUrl);
        this.isWebsock = false;
      }, 1000); // 延迟一定时间后重新连接
      console.log("延迟一定时间后重新连接");
    },
    //关闭socket
    websockClose(){
     this.websock.close()
    }
  },
};
