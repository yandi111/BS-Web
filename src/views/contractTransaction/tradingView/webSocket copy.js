//import { getUuid } from "@/libs/utils"; // 导入生成唯一标识符的工具
import { mapMutations } from "vuex";
export const webSocketMixin = {
  data() {
    return {
      isWebsock: false, // WebSocket连接状态
      websockTime: "", // 心跳定时器
      intervalInfo:'',
      coinsNameInfo :'BTC-USDT',
       selectNum :'0.1',
    };
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['setAsksList','setBidsList']),
    // 获取推送数据
    webSocket(e) {
        // 实例化WebSocket
        self.websock = new WebSocket(`${process.env.VUE_APP_BASE_WS_CQ}/websocket`); // 这里的wsUrl需要您自己定义
        // 监听WebSocket连接
        self.websock.onopen = self.websockOpen; // 连接成功时的回调
        self.websock.onerror = self.websockError; // 连接错误时的回调
        self.websock.onmessage = self.websockMessage; // 接收到消息时的回调
      
    },
    // 连接状态
    websockOpen(e) {
      const self = this;
      console.log(e); // 打印连接信息
      console.log(this.websockTime ,'self.websock self.websock self.websock111');
      
      
      if (this.websockTime) {
        clearInterval(this.websockTime); // 清除心跳定时器
      }
      this.isWebsock = true; // 更新连接状态
      self.websockSend("klineData"); // 发送订阅消息
    },
    // 发送消息
    websockSend(msg) {
      const self = this;
      if (!self.websock) {
        console.error("WebSocket 未初始化");
        return;
    }
     // const uName =  "u" ; // 根据contractType决定u或s

     if (this.interval == 240) {
      // eslint-disable-next-line no-unused-vars
      this.intervalInfo = '4H'
     } else if(this.interval == '1D'){
         this.intervalInfo = '1DAY'
     }else if(this.interval == '1W'){
      this.intervalInfo = '1WEEK'
      }else if(this.interval == '1M'){
        this.intervalInfo = '1MON'
     }else {
      this.intervalInfo = `${this.interval}MIN`
     }

      this.coinsNameInfo = this.getCoinsName ? this.getCoinsName : 'BTC-USDT'
      this.selectNum  = this.getSelectNum ? this.getSelectNum : '0.1'
       let parkline = {
        cmd:"SUBSCRIBE",
        data:{topic:`market.${this.coinsNameInfo}.${this.intervalInfo}.kline`} // 订阅市场数据
      } 
      let params = {
        cmd:"SUBSCRIBE",
        data:{topic:`market_${this.coinsNameInfo}_${this.selectNum}_depth`} // 订阅市场数据
      }
      console.log(parkline,params,'  parklineparklineparklineparklineparklineparkline');
      self.websock.send(JSON.stringify(params)); // 发送订阅请求
      if (msg == "klineData") {
      //  self.websock.send(JSON.stringify(params)); // 发送订阅请求
        self.websock.send(JSON.stringify(parkline)); // 发送订阅请求
      }
      self.websock.send(JSON.stringify(parkline)); // 发送订阅请求
    },
    // 错误处理
    websockError(e) {
      console.log(e,"连接错误88");
      console.log('连接错误88','self.websock self.websock self.websock2222');

    },
    // 监听返回消息   `market.${this.getCoinsName}.${this.interval}MIN.kline`:
    websockMessage(event) {
      const self = this;
      if (event) {
        if (event.data == 'ping') {
          self.websock.send('pong'); // 发送订阅请求
        }

        let depData = JSON.parse(event.data)
        if (depData.key == `market.${this.coinsNameInfo}.${this.intervalInfo}.kline`) {
          let resp = depData.data
          console.log(depData,"BTC-USDT.15MIN.kline3333333333");
          console.log(resp,"BTC-USDT.15MIN.kline4444444444");
          console.log(resp.maxPrice24H,resp.minPrice24H,"BTC-USDT.15MIN.kline55555");
              this.setSellPriceInfo(resp.open)  //市场价
              this.setIndexPrice(resp.indexPrice)  //setIndexPrice
              this.setIncrease24H(resp.increase24H) //24涨跌 
              this.setFundingRate(resp.fundingRate)  //资金费率
              this.setMaxPrice24H(resp.maxPrice24H) // setMaxPrice24H
              this.setMinPrice24H(resp.minPrice24H) // 24小时最低
              this.setVolData(resp.volPrice24H)  //24成交量

              console.log(resp,"BTC-USDT.15MIN.kline2222222");
            let lastBar = {
              time: Number(resp.timeStamp), // 时间戳
              open: Number(resp.open), // 开盘价
              high: Number(resp.high), // 最高价
              low: Number(resp.low), // 最低价
              close: Number(resp.close), // 收盘价
              volume: Number(resp.vol), // 成交量
            };
            console.log(lastBar,'onRealtimeCallback000');
              self.lastBar = lastBar; // 更新最后一根K线
              self.currentBar = self.lastBar; // 更新当前K线
             // 确保图表更新
             console.log(this.onRealtimeCallback,'onRealtimeCallback111');
      if (this.onRealtimeCallback) {
        this.onRealtimeCallback(lastBar); // 通知图表插件更新
      }
   }
            if (depData.key == `market_${this.coinsNameInfo}_${this.selectNum}_depth`) {

              this.setAsksList([])
              this.setBidsList([])
              this.setAsksList(depData.data.asks)
              this.setBidsList(depData.data.bids)
              this.setIndexPrice(depData.data.indexPrice)
              this.setSellPriceInfo(depData.data.lastPrice)
              this.setLastPrice(depData.data.lastPrice)
              // lastPrice    // indexPrice
           }
        
      }
      

    },
    // 心跳
    websockHeartbeat() {
      const self = this;
      self.websockTime = setInterval(function () {
        // self.websockSend('pong'); // 发送心跳
        self.websock.send('pong')
      }, 3000);
    },
  },
};