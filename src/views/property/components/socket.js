
import { getUuid } from '@/libs/utils'
export const webSocketMixin = {
    data() {
        return {
            isWebsock: false,
            websockTime: "", //心跳
        }
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
            if (msg == "markPriceSend") {
                if (self.contractSumAccountData && self.contractSumAccountData.length) {
                    self.contractSumAccountData.forEach((item) => {
                        self.websock.send(
                            JSON.stringify({
                                id: getUuid(),
                                cmd: "sub",
                                topic: `usdt.contract.marked.price.${item.coinName}`,
                                data: {},
                            })
                        );
                    });
                }
            }
            if (msg == "documentaryMarkPrice") {
                // console.log('跟单发送信息');
                if (self.positionData && self.positionData.length) {
                    self.positionData.forEach((item) => {
                        self.websock.send(
                            JSON.stringify({
                                id: getUuid(),
                                cmd: "sub",
                                topic: `usdt.contract.marked.price.${item.coinName}`,
                                data: {},
                            })
                        );
                    });
                }
            }
            //仓位
            if (msg == "positionSocket") {
                if (self.contractSumAccountData && self.contractSumAccountData.length) {
                    self.contractSumAccountData.forEach((item) => {
                        self.websock.send(
                            JSON.stringify({
                                id: getUuid(),
                                cmd: "sub",
                                topic: `user-usdt-contract-position-${item.coinName}`,
                                data: {},
                            })
                        );
                    });
                }
            }
            //合约资产推送
            if (msg == "contractSend") {
                self.websock.send(
                  JSON.stringify({
                    id: getUuid(),
                    cmd: "sub",
                    topic: 'ex-finance-contract-account-transfer-topic',
                    data: {},
                  })
                );
              }
        },
        //错误
        websockError(e) {
            // console.log(e)
            //   console.log("连接错误");
            this.websockClose();
        },

        //监听返回消息
        websockMessage(msg) {
            const self = this
            const newmsg = JSON.parse(msg.data)
            if (self.contractSumAccountData && self.contractSumAccountData.length) {
                self.contractSumAccountData.forEach((item, index) => {
                    if (newmsg?.topic == `usdt.contract.marked.price.${item.coinName}`) {
                        item.markedPrice = newmsg.data.markedPrice;
                    } else if (newmsg?.topic == `user-usdt-contract-position-${item.coinName}`) {
                        //根据id找到对应的数据
                        if (item.id == newmsg.data.id) {
                            //合约仓位 
                            item.rateReturn = newmsg.data.rateReturn
                            item.unrealizedProfitLoss = newmsg.data.unrealizedProfitLoss
                        }
                    }
                });
            }
            //跟单仓位标记价格
            if (self.positionData && self.positionData.length) {
                self.positionData.forEach((item, index) => {
                    if (newmsg?.topic == `usdt.contract.marked.price.${item.coinName}`) {
                        item.markedPrice = newmsg.data.markedPrice;
                    }
                });
            }
            //合约资产推送返回
            if (newmsg?.topic == 'ex-finance-contract-account-transfer-topic') {
                // console.log('合约资产推送',newmsg);
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