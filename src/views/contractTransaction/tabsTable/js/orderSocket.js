import langs from "@/i18n/i18nLocale";
import { getUuid } from "@/libs/utils";
export const webSocketMixin = {
  data() {
    return {
      isWebsock: false,
      websockTime: "", //心跳
    };
  },
  mounted() {
    window.addEventListener("beforeunload", (e) => this.websockClose(e));
  },
  methods: {
    /**
     * 获取推送数据 （取一个值就好）
     * e {string} load=加载 get=获取
     */
    webSocket() {
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
      }
    },
    //链接状态
    websockOpen() {
      // const self = this;
      console.log("socket连接成功");
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
    },
    //发送消息
    websockSend(msg) {
      const self = this;
      // console.log('this.positionData',this.positionData);
      if (self.positionData && self.positionData.length) {
        self.positionData.forEach((item) => {
          let obj = {
            markPriceArrSend: () => {
              // console.log('111',111);
              if (self.websock.readyState !== 1) return;
              console.log("ok");
              self.websock.send(
                JSON.stringify({
                  id: getUuid(),
                  cmd: "sub",
                  topic: `usdt.contract.marked.price.${item.coinsName}`,
                  data: {},
                })
              );
            },
            positionSend: () => {
              if (self.websock.readyState !== 1) return;
              self.websock.send(
                JSON.stringify({
                  id: getUuid(),
                  cmd: "sub",
                  topic: `user-usdt-contract-position-${item.coinsName}`,
                  data: {},
                })
              );
            },
            run: (fn) => fn && fn(),
          };
          obj.run(obj[msg]);
        });
      }
      let webObj = {
        //头部行情-标记价格
        markPriceSend: () => {
          if (self.websock.readyState !== 1) return;
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: `usdt.contract.marked.price.${self.coinsName}`,
              data: {},
            })
          );
        },
        //头部行情-交易对实时信息
        marketData: () => {
          if (self.websock.readyState !== 1) return;
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "batch.market.update",
              data: {},
            })
          );
        },
        //头部收藏模块-交易对change变化
        coinCollection: () => {
          if (self.websock.readyState !== 1) return;
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "batch.market.update",
              data: {},
            })
          );
        },
        //订单-当前委托更新
        orderUpdate: () => {
          if (self.websock.readyState !== 1) return;
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "order.update",
              data: {},
            })
          );
        },
        //订单-仓位数据实时
        positionSend: () => {
          if (self.websock.readyState !== 1) return;
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: `user-usdt-contract-position-${self.symbol}`,
              data: {},
            })
          );
        },

        lastPriceSend: () => {
          if (self.websock.readyState !== 1) return;
          self.websock.send(
            JSON.stringify({
              id: getUuid(),
              cmd: "sub",
              topic: "batch.market.update",
              data: {},
            })
          );
        },
        run: (fn) => fn && fn(),
      };
      webObj.run(webObj[msg]);
    },
    //错误
    websockError() {
      this.websockClose();
    },

    //监听返回消息
    websockMessage(msg) {
      const self = this;
      const newmsg = JSON.parse(msg.data);

      let webObj = {
        //标记价格
        [`usdt.contract.marked.price.${self.coinsName}`]: () => {
          self.markedPrice = newmsg.data.markedPrice;
        },
        //行情推送
        ["batch.market.update"]: () => {
          //头部行情
          if (self.headerData) {
            let currentSymbolMarket = newmsg.data.filter((item) => {
              return self.headerData.symbol === item.symbol;
            })[0];
            if (currentSymbolMarket) {
              self.headerData = {
                ...self.headerData,
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

          //[收藏]弹窗交易对信息
          if (self.contractData) {
            newmsg.data.forEach((item) => {
              self.contractData.forEach((ele) => {
                // console.log("item", item);
                if (ele.symbol == item.symbol) {
                  ele.change = item.change;
                  ele.higePrice = item.higePrice;
                  ele.lastPrice = item.lastPrice;
                  ele.lowPrice = item.lowPrice;
                  ele.volOf24h = item.volOf24h;
                  ele.turnoverOf24h = item.turnoverOf24h;
                }
              });
            });
          }

          //头部收藏模块交易对信息
          if (self.selectData) {
            newmsg.data.forEach((item) => {
              self.selectData.forEach((ele) => {
                if (ele.symbol == item.symbol) {
                  ele.change = item.change;
                }
              });
            });
          }
          if (self.positionData) {
            newmsg.data.forEach((item) => {
              self.positionData.forEach((ele) => {
                if (item.symbol == ele.coinMarket) {
                  ele.lastPrice = item.lastPrice;
                }
              });
            });
          }
        },
        //当前委托更新
        [`order.update`]: () => {
          if (newmsg.data.entrustNo) {
            console.log("当前委托更新:", "yes");
            self.orderIsUpdate = true;
          }
        },
        //仓位实时推送
        [`user-usdt-contract-position-${self.symbol}`]: () => {
          //下單時,向原先仓位数组 添加 新下单的对象
          let index = self.positionData.findIndex((item) => {
            return item.id == newmsg.data.id;
          });
          self.positionTotal = self.positionData.length;

          //该对象不在列表里 且 该仓位有效
          if (index == -1 && newmsg.data.effective) {
            let item = newmsg.data;
            // console.log("newst", newmsg.data);
            let obj = {
              ...item,
              $direction: `${(item.positionDirection =
                item.positionDirection == 1
                  ? `${langs.t("lang_1850")}`
                  : `${langs.t("lang_1923")}`)} 丨 ${
                item.leverTimes
              }X`,
              $marginRatio: `${item.marginRatio}%`,
              positionDeposit: `${item.positionDeposit} USDT`,
              positionAveragePrice: Number(item.positionAveragePrice),
              $positionType:
                item.positionType == 0
                  ? `${langs.t("lang_1995")}`
                  : `${langs.t("lang_2156")}`,
              $positionAmount: item.positionAmount,
              $unrealizedProfitLoss:
                item.unrealizedProfitLoss > 0
                  ? `+${item.unrealizedProfitLoss}`
                  : item.unrealizedProfitLoss,
              rateReturn: `${item.rateReturn}%`,
              markedPrice: undefined,
              lastPrice: 1000,
              coinsName: item.coinMarket.replace("/", "").toLocaleLowerCase(),
            };
            self.positionData.unshift(obj);
            self.renderData = self.positionData;
            self.websocketpositionDataIsUpate = true;
            self.getPositionsData();
          }

          //平仓或者其他时,当仓位失效,需要从列表移除该仓位
        },
        run: (fn) => fn && fn(),
      };
      webObj.run(webObj[newmsg?.topic]);

      //仓位数组-对象更新
      if (self.positionData && self.positionData.length) {
        // console.log("prompt", self.positionData);
        self.positionData.forEach((item) => {
          let obj = {
            [`usdt.contract.marked.price.${item.coinsName}`]: () => {
              // console.log('2',2);
              item.markedPrice = newmsg.data.markedPrice;
            },
            [`user-usdt-contract-position-${item.coinsName}`]: () => {
              // console.log("1", newmsg.data);
              if (item.id == newmsg.data.id) {
                //原数据
                item.id = newmsg.data.id;
                item.coinId = newmsg.data.coinId;
                item.leverTimes = newmsg.data.leverTimes;
                item.direction = newmsg.data.positionDirection;
                item.positionAmount = newmsg.data.positionAmount;
                item.flatAmount = newmsg.data.flatAmount;
                item.positionType = newmsg.data.positionType;
                item.rateReturn = `${newmsg.data.rateReturn}%`;
                item.strongPrice = newmsg.data.strongPrice;
                item.positionDeposit = newmsg.data.positionDeposit + ' USDT';
                item.positionAveragePrice = newmsg.data.positionAveragePrice;
                // item.lastPrice = newmsg.data.lastPrice;

                //处理
                item.$direction = `${(newmsg.data.positionDirection =
                  newmsg.data.positionDirection == 1
                    ? `${langs.t("lang_1850")}`
                    : `${langs.t("lang_1923")}`)} 丨 ${
                  newmsg.data.leverTimes
                }X`;
                item.$marginRatio = `${newmsg.data.marginRatio}%`;
                item.$unrealizedProfitLoss =
                  newmsg.data.unrealizedProfitLoss > 0
                    ? `+${newmsg.data.unrealizedProfitLoss}`
                    : newmsg.data.unrealizedProfitLoss;
              }
              let index = self.positionData.findIndex((item) => {
                return item.id == newmsg.data.id;
              });

              //仓位失效时,从列表中移除该仓位
              if (!newmsg.data.effective) {
                self.positionData.length && self.positionData.splice(index, 1);
                self.renderData = self.positionData;
                self.positionTotal = self.positionData.length;
                this.$store.commit("setLiquidation", true);
              }
            },

            run: (fn) => fn && fn(),
          };
          obj.run(obj[newmsg?.topic]);
        });
        self.renderData = self.positionData;
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
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", (e) => this.websockClose(e));
  },
};
