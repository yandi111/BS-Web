import { getUuid } from "@/libs/utils";

export const socketMixins = {
  data (){
    return {
      socket: this.$webSockets,//全局socket
      topicsArray: [],
      isTopicObj:{},//判断哪些订阅信息开启还是关闭
      sources:{},//订阅信息数据源
    };
  },
  beforeDestroy() {
    sendTopicList(["spot.batch.market.update","spot.batch.market.update","spot.batch.market.update"])
    unSubscribe(["spot.batch.market.update","spot.batch.market.update","spot.batch.market.update"])
  },
  methods: {
      //开启socket
    startSocket() {
      // console.log("开启socket");
      this.socket.doOpen();
      this.socket.on("open", () => {
        this.sendTopicList();
      });
      this.socket.on("message", this.onMessage);
      if (this.socket.connState === 2) {
        this.sendTopicList();
      }
    },
      //订阅消息组
    sendTopicList(topics){

      topics.forEach((topic) => {
        const message = {
          id: getUuid(),
          cmd: "sub",
          topic: topic,
          data: {}
        };
       this.topicsArray.push(message)
        this.socket.send(JSON.stringify(message));
       this.isTopicObj[topic] = true;
      });
      
      console.log(this.isTopicObj, 'arrobj');
    },
      //关闭订阅消息组
    unSubscribe(topicArr) {
      topicArr.map((val)=>{
       const v=topicArr.filter(vas=>vas.topic==val).find(val=>val)
       if (v.topic==val) {
        this.isTopicObj[val] = false
         v.cmd="unsub"
         this.socket.send(JSON.stringify(v));
       }
      })
    },
      //订阅消息回调
    onMessageCallback(message){
      console.log(message);
    },
       //订阅消息处理数据也可以再外面直接用但是不能改混入里的逻辑，建议采用回调的方式写逻辑
    onMessage(event){
      
      const message = JSON.parse(event.data);
      if (this.isTopicObj[message.topic]) {
        this.sources[message.topic] = message;
      }
      this.onMessageCallback(message)
    },
    //关闭 websoc
    websockClose() {
     this.socket.destroy()
     this.topicsArray=[]
     this.isTopicObj={}
     this.sources={}
    },
  }
};