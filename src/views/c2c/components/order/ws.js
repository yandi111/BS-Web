
import { getUuid } from '@/libs/utils'
import { getToken } from '@/libs/utils.js'
import { baseWssApi } from '@/request/baseApi.js'
export const wsMixin = {
    data() {
        return {
            wsUrl: `${baseWssApi}/ws/zh_cn/${getToken()}`,
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
                alert("您的浏览器不支持socket")
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
                // 连接关闭重新连接
                self.websock.onclose = self.websockClose;
            }
        },
        //链接状态
        websockOpen(e) {
            const self = this
            if (this.websockTime) {
                clearInterval(this.websockTime)
            }
            this.isWebsock = true;
        },
        //发送消息
        websockSend(msg) {
            const self = this;
            // console.log(msg,'fas d');
            switch (msg) {
                case 'orderStatus':
                    self.websock.send(
                        JSON.stringify({
                            id: getUuid(),
                            cmd: "sub",
                            topic: 'ex-order-otc-update-topic',
                            data: {},
                        })
                    )
                    break;
                case 'orderChat':
                    self.websock.send(
                        JSON.stringify({
                            id: getUuid(),
                            cmd: "sub",
                            topic: 'ex-order-otc-im-topic',
                            data: {},
                        })
                    )
                    break;
                default:
            }
        },
        //错误
        websockError(e) {
            // console.log(e)
            //   console.log("连接错误");
            this.$message({
                message: '连接错误',
                  type:'error'
                });
            this.websockClose();
        },

        // 反转方法
        reverse(array) {
            let newArr = []
            for (let i = array.length - 1; i >= 0; i--) {
                newArr[newArr.length] = array[i]
            }
            return newArr
        },

        //监听返回消息
        websockMessage(msg) {
            const self = this
            const newmsg = JSON.parse(msg.data)
            // 当前订阅类型
            switch (newmsg?.topic) {
                case 'ex-order-otc-update-topic':
                    if (this.orderInfo.id == newmsg.data.id) {
                        if (newmsg.data.status == this.orderInfo.status) return
                        this.orderInfo.status = newmsg.data.status
                        console.log('订单状态推送', this.orderInfo.status);
                        this.orderDetail(); //此处是订单状态推送回来时自动调用订单详情
                       
                    }
                    break;
                case 'ex-order-otc-im-topic':
                    console.log('newmsg', newmsg)
                    for (const key of self.infoList) {
                        if (key.id == newmsg.data.id) return
                    }

                    if (this.orderInfo.id == newmsg.data.orderId) {
                        self.infoList.push(newmsg.data)
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
        // 连接关闭，尝试重新连接
        websockClose(event) {
            const self = this
            setTimeout(function () {
                clearInterval(this.websockTime);
                self.websock = new WebSocket(self.wsUrl);
                this.isWebsock = false;
            }, 1000); // 延迟一定时间后重新连接
        }
    }
}