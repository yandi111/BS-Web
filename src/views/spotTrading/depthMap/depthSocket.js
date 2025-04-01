import { getUuid,truncateDecimal } from "@/libs/utils";

export const webSocketMixin = {
  data() {
    return {
      isWebsock: false,
      websockTime: "", //心跳
    };
  },
  // created() {
  //   this.webSocket(); // 页面打开连接webSocket
  // },
  destroyed() {
    this.websockClose();
  },
  methods: {
    /**
     * 获取推送数据 （取一个值就好）
     * e {string} load=加载 get=获取
     */
    webSocket(e) {
      const self = this;
     // console.log(self.depthNum,'this.depthNum');
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        try {
          self.websock?.close();
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
      const {symbolKey,symbol,marketType}= this.coinInfo
      let uName = marketType == 'SPOT'? 's' : 'u'
      switch (msg) {
        case "depthMap":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: `depth.update.${uName}.${symbolKey}.${this.depthNum}`,
              // topic: `depth.update.u.${self.coinsName}`,
              data: {},
            })
          );
          break;
        default:
      }
    },
    //停止订阅
    unWebsockSend(msg) {
      const self = this;
      const {symbolKey,symbol,marketType}= this.coinInfo
      let uName = marketType == 'SPOT'? 's' : 'u'
      switch (msg) {
        case "unDepthMap":
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "unsub",
              topic: `depth.update.${uName}.${symbolKey}.${this.depthNum}`,
              // topic: `depth.update.u.${self.coinsName}`,
              data: {},
            })
          );
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
      const self = this;
      const newmsg = JSON.parse(msg.data);
      const {symbolKey,symbol,marketType}= this.coinInfo
      let uName = marketType == 'SPOT'? 's' : 'u'
      switch (newmsg?.topic) {
        case `depth.update.${uName}.${symbolKey}.${this.depthNum}`:{
          let buyData =   newmsg.data.bid
          let sellData =  newmsg.data.ask
          const bidsDatas = buyData.map((item,index) => index==0?[Number(item?.price), 0]: [Number(item?.price), Number(item?.sum)])
          const asksDatas = sellData.map((item,index) => index==sellData.length-1?[Number(item?.price), 0]: [Number(item?.price), Number(item?.sum)])
          self.bidsData = bidsDatas.reverse()
          self.asksData = asksDatas.reverse()
          self.initChart()
          // console.log('socket推送',self.bidsData,self.asksData);
          break;
        }
     

      }
    },

    calculateRangeValuesX(value1, value2) {
      var rangeData = [];
      var step = (value2 - value1) / 30;
      var currentValue = value1;
      
      for (var i = 0; i <= 30; i++) {
        rangeData.push(parseFloat(currentValue.toFixed(0)));
        currentValue += step;
      }
      
      return rangeData;
    },
    

    completeData(data, targetLength, target,type) {  
      //type :true买绿，false卖红
      // 如果数组长度已经等于或超过目标长度，则不进行操作  
      if (data.length >= targetLength) {  
        return data;  
      }  

      // 计算需要添加的元素数量  
      var countToAdd = targetLength - data.length;  


      // 循环添加新的元素  
      for (var i = 0; i < countToAdd; i++) {  
        var lastElement = data[data.length - 1]; 


       const num=  (Number(lastElement?.price) - Number(i + 1))>0?(Number(lastElement?.price) - Number(i + 1)):0

        var newElement = {  
              diffRate: 0,  
              price:num.toFixed(2),  
              num: lastElement?.num,  
              high:type ?0: lastElement[target],
              sum: type ?0:lastElement[target],
            };  
          data.push(newElement);  
      }  
     // console.log(data,'data',lastElement);
      return  data;  
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
      const self = this;
      // console.log("socket已经关闭");
      clearInterval(self.websockTime);
      self.websock?.close();
      this.isWebsock = false;
    },
  },
};
