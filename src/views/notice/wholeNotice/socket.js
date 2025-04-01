
import { getUuid } from '@/libs/utils'
export const webSocketMixin = {
  data() {
    return {
      isWebsock: false,
      websockTime: "", //心跳
    }
  },
  created() {
    this.webSocket() // 页面打开连接webSocket
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
      // console.log("socket连接成功");
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
    },
    //发送消息
    websockSend(msg) {
      const self = this;
      switch (msg) {
        case 'wholeNotice':
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: 'user_station_letter_notice_push',
              data: {},
            })
          )
          break;
        default:

      }
    },
    //错误
    websockError(e) {
      this.websockClose();
    },

    //监听返回消息
    websockMessage(msg) {
      const self = this
      const newmsg = JSON.parse(msg.data)
      switch (newmsg?.topic) {
        case 'user_station_letter_notice_push':
          console.log('信息推送wholeNotice', newmsg);
          const { id, title, content, createTimeTsLong, readStatus} = newmsg.data
          self.noticeList.unshift({
            id: id,
            title: title,
            content: content,
            createTimeTsLong: createTimeTsLong,
            readStatus:readStatus,
          })
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
  }
}