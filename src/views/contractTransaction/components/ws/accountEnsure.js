import { getUuid } from "@/libs/utils";
import { getToken } from "@/libs/utils.js";
import { baseWssApi } from "@/request/baseApi.js";

// 保证金
export const account = {
  data() {
    return {
      wsUrl: `${baseWssApi}/ws/zh_cn/${getToken()}`, // WebSocket URL
      websock: null, // WebSocket 对象
      reconnectInterval: 3000, // 重连间隔时间（单位：毫秒）
      heartbeatInterval: 5000, // 心跳间隔时间（单位：毫秒）
      heartbeatTimer: null, // 心跳定时器
      reconnectTimer: null, // 重连定时器
      useWebSocket: true, // 是否使用 WebSocket
    };
  },
  created() {
    // 初始化 WebSocket
    this.initWebSocket();
  },
  beforeDestroy() {
    // Vue实例销毁前清除定时器并关闭WebSocket
    clearInterval(this.heartbeatTimer);
    clearTimeout(this.reconnectTimer);
    this.websock.close();
    this.useWebSocket = false;
  },
  methods: {
    // 初始化WebSocket连接
    initWebSocket() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持 WebSocket");
        return;
      }

      this.websock = new WebSocket(this.wsUrl);
      this.websock.onopen = this.onWebSocketOpen;
      this.websock.onerror = this.onWebSocketError;
      this.websock.onmessage = this.onWebSocketMessage;
      this.websock.onclose = this.onWebSocketClose;
    },
    // WebSocket 连接打开
    onWebSocketOpen() {
      // console.log('连接打开');
      if (this.useWebSocket) {
        this.startHeartbeat();
      }
    },
    // WebSocket 连接错误
    onWebSocketError(e) {
      // console.error('连接错误:', e);
      this.reconnect();
    },
    // WebSocket 接收消息
    onWebSocketMessage(msg) {
      const data = JSON.parse(msg.data);
      let result = data.data;
      switch (data?.topic) {
        case "usdt-contract-user-account-flush":
          this.$store.commit("setAvailable", getToken() ? result : {});
          break;
        default:
      }
    },
    // WebSocket 连接关闭
    onWebSocketClose(event) {
      console.warn("连接关闭:", event);
      this.stopHeartbeat();
      this.reconnect();
    },
    // 启动心跳定时器
    startHeartbeat() {
      this.stopHeartbeat();
      this.heartbeatTimer = setTimeout(() => {
        if (this.websock && this.websock.readyState === WebSocket.OPEN) {
          this.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "usdt-contract-user-account-flush",
              data: {},
            })
          );
        }
      }, 0);
    },
    // 停止心跳定时器
    stopHeartbeat() {
      clearTimeout(this.heartbeatTimer);
      this.heartbeatTimer = null;
    },
    // 尝试重新连接WebSocket
    reconnect() {
      if (this.reconnectTimer) return;
      this.reconnectTimer = setTimeout(() => {
        this.initWebSocket();
        this.reconnectTimer = null;
      }, this.reconnectInterval);
    },
  },
};
