<template>
  <div class="tabs-table">
    <div class="tabs df aic jb">
      <div class="tabs_item">
        <div
          class="item"
          :class="{ active: item.activeName == activeName }"
          v-for="(item, index) in navList"
          :key="index"
          @click="toggleTabs(item.activeName)"
        >
          {{ item.label | translate }}
        </div>
      </div>
      <div class="functionBtns" v-if="isLogin && isShow_rightBtn">
        <div class="btns df" v-if="activeName != 'five'">
          <div class="toggle" @click="onSwitch">
            <i
              class="iconfont mr10"
              :class="checkVal ? 'icon-box' : 'icon-box1'"
            ></i>
            <span class="label">{{ checkLabel | translate }}</span>
          </div>
          <div
            class="btn"
            :class="{
              disabled:
                (activeName == 'first' && coinMarketIsDifferent) ||
                (activeName == 'second' && !entrustingData.length),
            }"
            v-show="activeName == 'first' || activeName == 'second'"
            @click="performAction"
          >
            {{ rightBtnLabel | translate }}
          </div>
          <div
            class="btn ml10"
            :class="{ disabled: !multiSelectList.length }"
            v-if="isShowCheckbox"
            @click="cancelSelectedOrders"
          >
            {{ $t("contract.撤销已选") }}
          </div>
        </div>
        <div
          class="showMore"
          v-show="(activeName != 'first' && total > 10) || activeName == 'five'"
          @click="showMore"
        >
          <span class="label">{{ "contract.查看更多" | translate }}</span>
          <i class="iconfont icon-more1"></i>
        </div>
      </div>
    </div>
    <div class="container">
      <dateSearch
        v-if="activeName != 'first' && isShow_rightBtn"
        @update="update"
        :isPickDate="isPickDate"
        :isPickCoin="isPickCoin"
        :paramsTypeList="paramsTypeList"
        :width="width"
      />
      <div class="dataBox">
        <div class="content" v-if="activeName == 'first'">
          <!-- <TableData
            v-if="renderData.length"
            :tableHeight="tableHeight"
            :columnData="positionColumnData['first']"
            :tableData="renderData"
          /> -->
          <demo-table
            v-if="renderData.length"
            :label="positionColumnData['first']"
            :data="renderData"
          ></demo-table>
          <table-noAssets :have-assets="haveAssets" v-else />
        </div>
        <div class="content" v-else-if="activeName == 'second'">
          <TableData
            v-if="entrustingData.length"
            :tableHeight="tableHeight"
            :columnData="positionColumnData['second']"
            :tableData="entrustingData"
            :isShowCheckbox="isShowCheckbox"
            :chooseId="chooseId"
            @multi-select="multiSelect"
            @profitLossrSuccess="getEntrustingData"
          />

          <table-noAssets :have-assets="haveAssets" v-else />
        </div>
        <div class="content" v-else-if="activeName == 'third'">
          <TableData
            v-if="entrustedData.length"
            :tableHeight="tableHeight"
            :columnData="positionColumnData['third']"
            :tableData="entrustedData"
          />
          <my-empty useTheme v-else />
        </div>
        <div class="content" v-else-if="activeName == 'fourth'">
          <TableData
            v-if="historicalPosition.length"
            :tableHeight="tableHeight"
            :columnData="positionColumnData['fourth']"
            :tableData="historicalPosition"
          />
          <my-empty useTheme v-else />
        </div>
        <div class="content" v-else-if="activeName == 'five'">
          <TableData
            v-if="billData.length"
            :tableHeight="tableHeight"
            :columnData="positionColumnData['five']"
            :tableData="billData"
          />
          <my-empty useTheme v-else />
        </div>
      </div>
    </div>

    <!-- 各类弹窗 -->
    <div class="dialog">
      <!-- 杠杆调整 -->
      <table-adjustLeverage
        :is-show.sync="adjustLeverageShow"
        :data="editData"
      />
      <!-- 调整盈亏 -->
      <table-adjustposition
        :isShow.sync="adjustShow"
        :data="rowData"
        :profitLossData="profitLossData"
        @adjustLever-success="updatePositionData"
      />
      <toViewProfit :is-show.sync="toViewShow" :data="toViewData">
      </toViewProfit>
      <!-- 平仓 -->
      <table-closePosition
        :isShow.sync="unwindShow"
        :data="unwindData"
        @adjustLever-success="updatePositionData"
      />
      <!-- 保证金调整 -->
      <table-marginedit
        :isShow.sync="margineditShow"
        :data="positionTypeData"
        @adjustLever-success="updatePositionData"
      />
      <!-- 委托明细 -->
      <entrustdetailModal
        :isShow.sync="entrustdetailShow"
        :data="entrustedDetailData"
      />
      <share :is-show.sync="shareShow" :data="shareData"></share>

      <closePositionConfirmed
        :is-show.sync="unwindAllIsShow"
        @confirm="confirm"
      />
    </div>
  </div>
</template>
<script>
import TableData from "./components/tableData.vue";
import * as options from "./js/options.js";
import * as datas from "./js/data.js";
import tableAdjustposition from "./components/table-adjustPosition.vue";
import tableAdjustLeverage from "./components/table-adjustLeverage.vue";
import tableClosePosition from "./components/table-closePosition.vue";
import tableMarginedit from "./components/table-marginedit.vue";
import entrustdetailModal from "./components/entrustdetailModal.vue";
import toViewProfit from "./components/toViewProfit.vue";
import dateSearch from "./components/dateSearch.vue";
import share from "./components/sharebox.vue";
import closePositionConfirmed from "./components/closePositionConfirmed.vue";
import tableNoAssets from "./components/table-noAssets.vue";

import * as api from "@/api/contractTransaction";
import { getDate } from "@/libs/utils";
import { webSocketMixin } from "./js/orderSocket.js";
import { mapState } from "vuex";

import demoTable from "./components/demo-table.vue";

export default {
  name: "TabsTable",
  mixins: [webSocketMixin],
  components: {
    TableData,
    tableAdjustposition,
    tableAdjustLeverage,
    tableClosePosition,
    tableMarginedit,
    entrustdetailModal,
    toViewProfit,
    dateSearch,
    share,
    closePositionConfirmed,
    tableNoAssets,
    demoTable,
  },
  data() {
    return {
      navList: [
        {
          label: `${this.$t("contract.仓位")}(0)`,
          activeName: "first",
        },
        {
          label: `${this.$t("contract.当前委托")}(0)`,
          activeName: "second",
        },
        {
          label: "contract.历史委托",
          activeName: "third",
        },
        {
          label: "contract.历史仓位",
          activeName: "fourth",
        },
        {
          label: "contract.合约账单",
          activeName: "five",
        },
      ],
      isPickDate: true,
      isPickCoin: true,
      isLogin: false,
      chooseId: "", //被选中的id
      activeName: "first", //tab的顺序
      checkVal: false, //右侧选择框值
      checkLabel: "contract.只显示当前", //选择框标识s
      rightBtnLabel: "contract.一键平仓", //选择框右侧按钮标识
      coinInfoData: [],
      positionColumnData: {}, //表头配置
      //仓位表格数据
      positionData: [],
      positionTotal: 0,
      //当前委托
      entrustingData: [],
      //历史委托
      entrustedData: [],
      //历史仓位
      historicalPosition: [],
      //合约账单
      billData: [],
      adjustShow: false, //是否显示 调整止盈止损
      rowData: {},
      editData: {}, //杠杆编辑数据
      unwindData: {}, //平仓数据
      positionTypeData: {}, //逐仓数据
      multiSelectList: [], //当前委托-已选择的 批量撤销
      entrustedDetailData: {
        list: [],
      }, //历史委托-委托明细数据

      isShowCheckbox: false, //是否批量撤单
      adjustLeverageShow: false, //是否显示 调整杠杆
      unwindShow: false, //是否显示 平仓
      margineditShow: false, //是否显示 调整保证金
      entrustdetailShow: false, //是否显示 委托明细
      toViewShow: false, //是否 查看止盈止损
      toViewData: {}, //查看止盈止损
      markedPrice: undefined, //标记价格
      coinId: 1, //基础币
      coinMarket: "BTC/USDT", //交易对名称
      symbol: "btcusdt",
      coinMarketIsDifferent: false, //仓位交易对是否bu相同
      isShow_rightBtn: false,
      renderData: [],
      total: undefined,
      paramsTypeList: [], //搜索-下拉框选项
      searchParams: {}, //搜索参数
      init: true,
      orderIsUpdate: false,
      width: 105,
      shareShow: false,
      shareData: {},
      websocketpositionDataIsUpate: false,
      tableWidth: undefined,
      tableHeight: undefined,
      unwindAllIsShow: false,
      haveAssets: true,
      profitLossData:{}
    };
  },
  methods: {
    websockOpen() {
      const self = this;
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      self.websockSend("positionSend"); //仓位推送
      self.websockSend("lastPriceSend"); //仓位最新价格
      self.websockSend("markPriceArrSend"); //仓位标记价
      self.websockSend("orderUpdate"); //当前委托推送
    },

    toggleTabs(index) {
      this.activeName = index;
      this.isPickDate =
        index == "third" || index == "second" || index == "five" ? false : true;
      this.isPickCoin = index == "five" ? false : true;
      this.getTableSize();
    },

    update(params) {
      this.searchParams = params;
      this.checkVal = false;
      if (!this.checkVal) {
        let obj = {
          second: () => this.getEntrustingData(params),
          third: () => this.getEntrustedData(params),
          fourth: () => this.getHistoricalPosition(params),
          five: () => {
            // console.log("1", 1);
            return this.getBillData(params);
          },
          run: (fn) => fn && fn(),
        };
        obj.run(obj[this.activeName]);
      }
    },

    //检查仓位合约类型 (该方法弃用)
    checkContractType() {
      let arr = [];
      let flag = true;
      this.renderData.forEach((item) => {
        arr.push(item.coinMarket);
      });

      let newArr = [...new Set(arr)];
      if (newArr.length == 1) {
        flag = newArr.includes(this.setting.currentMarket) ? false : true;
      } else {
        flag = true;
      }
      this.coinMarketIsDifferent = flag;
    },

    //批量撤单列表
    multiSelect(event) {
      this.multiSelectList = event;
      // console.log(this.multiSelectList);
    },

    //批量撤销
    cancelSelectedOrders() {
      // console.log("委托已选", this.multiSelectList);
      if (!this.multiSelectList.length) return;

      api.cancelTrustApi({ entrustNos: this.multiSelectList }).then((res) => {
        if (res.data.success) {
          this.$showMsg(`${this.$t("contract.批量撤单成功")}`, () => {
            this.chooseId = "all";
            this.getEntrustingData();
          });
        }
      });
    },
    // 方向/杠杆 编辑
    changeLeverage(event) {
      this.editData = event;
      this.adjustLeverageShow = true;
    },

    //保证金 编辑
    setMargin(event) {
      this.positionTypeData = event;
      this.margineditShow = true;
    },
    //盈亏分享
    shareThisOrder(event) {
      this.shareData = event;
      this.shareShow = true;
    },
    //切换显示当前
    onSwitch() {
      this.checkVal = !this.checkVal;
      // console.log('this.positionData',this.positionData);
    },
    //闪电平仓
    closeApositionQuickly(row) {
    
      let params = {
        type: row.positionDirection,
        amount: row.positionAmount,
        orderType: 4,
        coinMarket: row.coinMarket,
        positionType: row.positionType,
      };
      // console.log("params", params);
      api.$unwind(params).then((res) => {
        if (res.status == 200 && res.data.success) {
          this.$showMsg(this.$t("contract.闪电平仓成功"), (res) => {
           
          });
        }
      });
    },
    //平仓
    closeAposition(row) {
      this.unwindData = row;
      this.unwindShow = true;
    },

    //一键平仓

    confirm() {
      api.$unwindAll().then((res) => {
        if (res.data.success) {
          this.$showMsg(`${this.$t("contract.一键平仓成功")}`, () => {
            this.getPositionsData();
          });
        }
      });
    },

    performAction() {
      if (this.activeName == "first") {
        this.unwindAllIsShow = true;

        //批量撤销
      } else {
        if (!this.entrustingData.length) return;
        this.isShowCheckbox = !this.isShowCheckbox;
        this.chooseId = this.isShowCheckbox ? "" : "all";
      }
    },
    //调整止盈止损
    async setProfitStopLoss(row) {
     
      let type = this.activeName == "first" ? "position" : "entrust";
      this.adjustShow = true;
      this.rowData = row;
      this.rowData.type = type;
      let res = await api.profitLossByPosition({ positionId: row.id });
      this.profitLossData = res.data?.data
    },

    //查看止盈止损
    viewProfitStopLoss(row) {
      //是否可查看
      if (!row.availableStatus) return;
      this.toViewShow = true;
      this.toViewData = row;
    },

    //撤销委托
    undoEntrusted(row) {
      // console.log("row", row);
      let type = {
        1: 1,
        2: 1,
        3: 3,
        4: 3,
        5: 2,
        6:3,
        7:3,
      };
      let entrustNos = [
        {
          entrustNo: row.entrustNo,
          orderType: type[row.entrustType],
        },
      ];
      // console.log("prompt", entrustNos);
      api.cancelTrustApi({ entrustNos }).then((res) => {
        // console.log(res.data.success);
        if (res.data.success) {
          this.$showMsg(`${this.$t("contract.撤销成功")}`, () => {
            this.getEntrustingData();
            this.chooseId = row.entrustNo;
          });
        }
      });
    },

    //委托明细
    entrustDetail(row) {
      // console.log(row);
      let data = {
        entrustType: row.entrustType,
        orderNo: row.entrustNo,
      };
      this.entrustedDetailData.row = row;
      api.entrustDetialApi(data).then((res) => {
        let obj = res.data.data;
        this.entrustedDetailData.row.pointPrrice = obj.strongClosePrice;
        // console.log(obj);
        let arr = [
          {
            label: "contract.订单",
            value: obj.entrustNo,
          },
          {
            label: "contract.方向丨杠杆",
            value: `${datas.options.directType[obj.directType]}丨${
              obj.leverTimes
            }X`,
            type: "direction",
          },
          {
            label: "contract.模式",
            value: obj.positionType == 0 ? "contract.全仓" : "contract.逐仓",
          },
          {
            label: "contract.类型",
            value: datas.options.entrustType[obj.entrustType],
          },
          {
            label: "contract.委托状态",
            value: datas.options.orderStatus[obj.status],
          },
          {
            label: "contract.触发价",
            value: obj.triggerPrice,
            type: 11,
          },
          {
            label: "contract.委托价格",
            value:
              obj.entrustPrice != null
                ? obj.entrustPrice
                : `${this.$t("contract.最优市价")}`,
            type: 20,
          },
          {
            label: "contract.委托数量",
            value: obj.entrustAmount,
            type: 2,
          },
          {
            label: "contract.成交数量丨委托数量",
            value: `${obj.dealAmount}丨${obj.entrustAmount}`,
            type: 1,
          },
          {
            label: "contract.手续费",
            value: `${obj.handlingFee} USDT`,
            type: 4,
          },
          {
            label: "contract.保证金",
            value: `${obj.entrustDeposit} USDT`,
            type: 4,
          },
          {
            label: "contract.委托时间",
            value: obj.entrustTime,
          },
          {
            label: "contract.成交时间",
            value: obj.dealTime,
            type: 12,
          },
          {
            label: "contract.撤销时间",
            value: obj.cancelTime,
            type: 10,
          },
        ];

        let options = {
          2: this.$t("contract.强平平多"),
          4: this.$t("contract.强平平空"),
        };

        if (obj.closePositionsType == 1) {
          arr.forEach((item) => {
            if (item.type == "direction") {
              item.label = "contract.方向丨杠杆";
              item.value = `${options[obj.directType]}丨${obj.leverTimes}X`;
            }
            if (item.type == 2) {
              item.label = "contract.强平数量";
              item.value = obj.strongCloseAmount;
            }
            if (item.type == 20) {
              item.label = "contract.强平价格";
              item.value = obj.strongClosePrice;
            }
          });
          let ol = {
            label: "contract.平仓盈亏",
            value: obj.realizedProfitLoss,
          };
          arr.splice(10, 0, ol);
        }

        this.entrustedDetailData.list = arr.filter((item) => {
          //市价委托全部成交 限价委托全部成交
          if (
            obj.status == 1 &&
            (obj.entrustType == 1 || obj.entrustType == 2)
          ) {
            return (
              item.type != 1 &&
              item.type != 10 &&
              item.type != 11 &&
              item.type != 3 &&
              item.type != 30
            );
            //限价委托部分成交 市价委托部分成交
          } else if (
            obj.status == 2 &&
            (obj.entrustType == 1 || obj.entrustType == 2)
          ) {
            return (
              item.type != 2 &&
              item.type != 10 &&
              item.type != 11 &&
              item.type != 3 &&
              item.type != 30
            );
            //计划委托全部成交
          } else if (obj.status == 1 && obj.entrustType == 5) {
            return (
              item.type != 1 &&
              item.type != 10 &&
              item.type != 3 &&
              item.type != 30
            );
            //计划委托部分成交
          } else if (obj.status == 2 && obj.entrustType == 5) {
            return (
              item.type != 2 &&
              item.type != 10 &&
              item.type != 3 &&
              item.type != 30
            );
            //限价委托已取消
          } else if (obj.status == 4 && obj.entrustType == 1) {
            return (
              item.type != 4 &&
              item.type != 1 &&
              item.type != 11 &&
              item.type != 12 &&
              item.type != 3 &&
              item.type != 30
            );
            //计划委托已取消
          } else if (obj.status == 4 && obj.entrustType == 5) {
            return (
              item.type != 4 &&
              item.type != 2 &&
              item.type != 1 &&
              item.type != 10 &&
              item.type != 12 &&
              item.type != 3 &&
              item.type != 30
            );
            //市价止盈止损撤销
          } else if (
            obj.status == 4 &&
            (obj.entrustType == 4 || obj.entrustType == 3)
          ) {
            return (
              item.type != 1 &&
              item.type != 12 &&
              item.type != 4 &&
              item.type != 3 &&
              item.type != 30
            );
            //市价止盈止损全部成交
          } else if (
            (obj.status == 1 && obj.entrustType == 4) ||
            obj.entrustType == 3
          ) {
            return (
              item.type !== 10 &&
              item.type !== 1 &&
              item.type != 3 &&
              item.type != 30
            );
          }
        });
      });
      // console.log("委托明细", this.entrustedDetailData);
      this.entrustdetailShow = true;
    },
    //成交明细
    dealDetail(row) {
      // console.log("成交明细", row);
      this.$router.push({
        name: "dealDetail",
        query: { positionId: row.positionId },
      });
    },
    //查看更多
    showMore() {
      let tabs = {
        second: 0,
        third: 1,
        fourth: 2,
        five: 3,
      };
      let id = tabs[this.activeName];

      this.$router.push({
        path: "/wallet/contractAccount",
        query: { tabsIndex: 2, id },
      });
    },

    bindFunctions() {
      // this.positionColumnData = options.first;
      window.changeLeverage = this.changeLeverage;
      window.setMargin = this.setMargin;
      window.shareThisOrder = this.shareThisOrder;
      window.closeAposition = this.closeAposition;
      window.closeApositionQuickly = this.closeApositionQuickly;
      window.setProfitStopLoss = this.setProfitStopLoss;
      window.undoEntrusted = this.undoEntrusted;
      window.entrustDetail = this.entrustDetail;
      window.dealDetail = this.dealDetail;
      window.viewProfitStopLoss = this.viewProfitStopLoss;
    },

    //update 仓位
    updatePositionData(flag) {
      if (flag) {
        this.getPositionsData();
      }
    },
    //仓位
    getPositionsData(data = {}) {
      if (!this.isLogin) return;
      api.contractPositionsApi(data).then((res) => {
        this.positionData = res.data.data.map((item) => {
          return {
            ...item,
            $direction: `${(item.positionDirection =
              item.positionDirection == 1
                ? `${this.$t("contract.多")}`
                : `${this.$t("contract.空")}`)} 丨 ${item.leverTimes}X`,
            $marginRatio: `${item.marginRatio}%`,
            positionDeposit: `${item.positionDeposit} USDT`,
            positionAveragePrice: Number(item.positionAveragePrice),
            $positionType:
              item.positionType == 0
                ? `${this.$t("contract.全仓")}`
                : `${this.$t("contract.逐仓")}`,
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
        });

        //添加某些数据
        this.positionData.forEach((item) => {
          api.$getEveryMarketpPrice({ coinId: item.coinId }).then((res) => {
            item.markedPrice = res.data.data.markedPrice;
            this.coinInfoData.forEach((ele) => {
              if (item.coinsName == ele.symbolKey) {
                item.faceValue = ele.faceValue;
              }
            });

            this.renderData = JSON.parse(JSON.stringify(this.positionData));
            this.positionTotal = this.renderData.length;
            this.loadRightBtn(this.renderData, 1);
          });
        });
        this.webSocket();
        //  页面打开连接webSocket;
      });
    },
    //当前委托
    getEntrustingData(data = {}) {
      if (!this.isLogin) return;
      api.entrustListApi(data).then((res) => {
        // console.log("当前委托", res.data.data.records);
        this.total = res.data.data.total;
        this.entrustingData = res.data.data.records.map((item) => {
          let availableStatus =
            (item.entrustType == 1 || item.entrustType == 5) &&
            (item.lossTriggerPrice * 1 != 0 ||
              item.profitTriggerPrice * 1 != 0);
          return {
            ...item,
            createTime: getDate(item.createTime, "year"),
            $entrustType: datas.options.entrustType[item.entrustType],
            $direction: datas.options.priceType[[item.directType]],
            $leverTimes: ` 丨${item.leverTimes}X`,
            $positionType:
              item.positionType == 0
                ? `(${this.$t("contract.全仓")})`
                : `(${this.$t("contract.逐仓")})`,
            $entrustPrice:
              item.entrustPrice != null
                ? item.entrustPrice
                : `${this.$t("contract.最优市价")}`,
            $entrustAmount: `${item.entrustAmount} | ${item.dealAmount}`,
            $orderStatus: datas.options.orderStatus[item.status],
            $price: `${
              item.profitTriggerPrice ? item.profitTriggerPrice : "- -"
            } | ${item.lossTriggerPrice ? item.lossTriggerPrice : "- -"}`,
            $triggerPrice: item.triggerPrice ? item.triggerPrice : "- -",
            availableStatus,
          };
        });
        this.navList[1].label = `${this.$t("contract.当前委托")}(${
          this.entrustingData.length
        })`;

        this.loadRightBtn(this.entrustingData, 2);
        this.orderIsUpdate = false;
        this.$store.commit("setPlaceOrder", false);

        if (this.init) {
          this.getPositionsData();
          this.init = false;
        }
      });
    },
    //历史委托
    getEntrustedData(data = {}) {
      if (!this.isLogin) return;
      api.historyApi(data).then((res) => {
        // console.log("历史委托", res.data.data.records);
        this.total = res.data.data.total;
        this.entrustedData = res.data.data.records.map((item) => {
          return {
            ...item,
            $createTime: getDate(item.createTime, "year"),
            $entrustType: datas.options.entrustType[item.entrustType],
            $positionType:
              item.positionType == 0
                ? `(${this.$t("contract.全仓")})`
                : `(${this.$t("contract.逐仓")})`,

            $direction:
              item.closePositionsType == 1
                ? item.directType == 2
                  ? this.$t("contract.强平平多")
                  : this.$t("contract.强平平空")
                : datas.options.priceType[[item.directType]],
            $leverTimes: ` 丨${item.leverTimes}X`,

            $entrustAmount: `${item.entrustAmount} 丨 ${item.dealAmount}`,
            $orderStatus: datas.options.orderStatus[item.status],
            entrustPrice: item.entrustPrice
              ? item.entrustPrice
              : `${this.$t("contract.最优市价")}`,
          };
        });
        this.loadRightBtn(this.entrustedData, 3);
      });
    },
    //历史仓位
    getHistoricalPosition(data = {}) {
      if (!this.isLogin) return;
      api.positionHistoryApi(data).then((res) => {
        
        this.total = res.data.data.total;

        this.historicalPosition = res.data.data.records.map((item) => {
          return {
            ...item,
            $direction: `${
              item.positionDirection == 1
                ? `${this.$t("contract.开多")}`
                : `${this.$t("contract.开空")}`
            } | ${item.leverage}X`,
            $positionType:
              item.positionType == 0
                ? `(${this.$t("contract.全仓")})`
                : `(${this.$t("contract.逐仓")})`,
            $realizedProfitLoss:
              item.realizedProfitLoss > 0
                ? `+${item.realizedProfitLoss}`
                : item.realizedProfitLoss,
            strongClose:
              item.strongClose == 0
                ? item.status == 1
                  ? this.$t("contract.全部平仓")
                  : this.$t("contract.部分平仓")
                : this.$t("contract.强平"),
          };
        });
        this.loadRightBtn(this.historicalPosition, 4);
      });
    },
    //合约账单
    getBillData(data = {}) {
      if (!this.isLogin) return;
      api.billHistoryApi(data).then((res) => {
        // console.log("合约账单", res.data.data.records);
        this.total = res.data.data.total;

        this.billData = res.data.data.records.map((item) => {
          return {
            ...item,
            coinMarket: item.coinMarket ? item.coinMarket : "--",
            $type: datas.options.contractType[item.type],
            $closeProfitOrLoss:
              item.type > 6 && item.type < 21
                ? item.amount
                : item.type > 2 && item.type < 7
                ? item.closeProfitOrLoss
                : 0,
            $fee: item.type < 7? item.amount : 0,
            $amount: item.type < 7 ? 0 : item.amount,
            assetsType: "USDT",
          };
        });
        this.loadRightBtn(this.billData, 5);
      });
    },
    getsymbolListApi() {
      api.symbolListApi().then((res) => {
        this.coinInfoData = res.data.data;
        // console.log("prompt", this.coinInfoData);
      });
    },
    loadRightBtn(data, num) {
      let obj = {
        1: "first",
        2: "second",
        3: "third",
        4: "fourth",
        5: "five",
      };
      this.isShow_rightBtn =
        data.length > 0 && this.activeName == obj[num] ? true : false;
    },
    getTableSize() {
      let container = document.querySelector(".container");
      let tableDom = document.querySelector(".dataBox");

      this.tableWidth = tableDom.clientWidth + "px";
      this.tableHeight = container.clientHeight - 40 + "px";
      if (this.activeName == "first") {
        this.tableHeight = container.clientHeight + "px";
        const obj = {
          cn: "240",
          tw: "240",
          en: "350",
          th: "430",
        };
        options["first"][9].minWidth = obj[this.$i18n.locale];
      } else if (this.activeName == "third") {
        const obj = {
          cn: "120",
          tw: "120",
          en: "180",
          th: "200",
        };
       
        options["third"][7].minWidth = obj[this.$i18n.locale];
      }
      // console.log("prompt", options["first"][9].minWidth);
    },
  },

  mounted() {
    this.bindFunctions();
    this.positionColumnData = options;
    this.isLogin = this.$store.state.login.token ? true : false;
    this.getsymbolListApi();
    this.getEntrustingData();
    this.getTableSize();

    this.$EventBus.$on("sendSymbol", (res) => {
      // console.log("sendSymbol", res);
      this.coinId = res.baseAssetId;
      this.coinMarket = res.symbol;
      this.symbol = this.coinMarket.replace("/", "").toLocaleLowerCase();
    });
    this.$EventBus.$on("sendDefaultSymbol", (res) => {
      // console.log("sendDefaultSymbol", res);
      this.coinId = res.baseAssetId;
      this.coinMarket = res.symbol;
      this.symbol = this.coinMarket.replace("/", "").toLocaleLowerCase();
    });
  },

  beforeDestroy() {
    this.$EventBus.$off("sendSymbol");
    this.$EventBus.$off("sendDefaultSymbol");
  },
  computed: {
    ...mapState(["contract", "setting"]),
  },
  watch: {
    positionTotal: {
      handler(value) {
        this.navList[0].label = `${this.$t("contract.仓位")}(${value})`;
      },
    },
    "contract.availableObj": {
      handler(newValue) {
        this.haveAssets = newValue.accountEquity * 1 > 0 ? true : false;
      },
      deep: true,
    },
    "contract.isPlaceOrder"(value) {
      // console.log('value',value);
      if (value) {
        this.getEntrustingData();
      }
    },
    orderIsUpdate: {
      handler(newValue) {
        if (newValue) {
          this.getEntrustingData();
        }
      },
    },
    websocketpositionDataIsUpate: {
      handler(value) {
        //下单时,websocket推送了列表,列表更新了,但标记价格需要在列表上forch订阅.而订阅早在进入页面时就开始了,所以为获取到标价,需要从新订阅
        if (value) {
          this.webSocket();
          this.websocketpositionDataIsUpate = false;
        }
      },
    },
    contract: {
      handler(value) {
        this.positionData &&
          this.positionData.forEach((item) => {
            if (value.quantityUnit == 1) {
              item.$positionAmount = item.positionAmount;
            } else if (value.quantityUnit == 2) {
              item.$positionAmount = (
                item.lastPrice *
                item.faceValue *
                item.positionAmount *
                1
              ).toFixed(2);
            } else if (value.quantityUnit == 3) {
              item.$positionAmount = (
                item.positionAmount * item.faceValue
              ).toFixed(1);
            }
          });
      },
      deep: true,
    },
    activeName: {
      handler(oldVal) {
        this.checkVal = false;
        const obj = {
          first: () => {
            this.checkLabel = "contract.只显示当前";
            this.rightBtnLabel = "contract.一键平仓";
            return this.getPositionsData();
          },
          second: () => {
            this.checkLabel = "contract.隐藏其他合约";
            this.rightBtnLabel = this.isShowCheckbox
              ? "contract.取消撤单"
              : "contract.批量撤单";
            this.paramsTypeList = datas.options.entrustTypeParams;
            return this.getEntrustingData();
          },
          third: () => {
            this.paramsTypeList = datas.options.entrustTypeParams;
            return this.getEntrustedData();
          },
          fourth: () => {
            this.paramsTypeList = datas.options.positionDirectionParams;
            this.width = 105;

            return this.getHistoricalPosition();
          },
          five: () => {
            this.width = 250;
            this.paramsTypeList = datas.options.billTypeParams;
            return this.getBillData();
          },
          run: (fn) => {
            fn && fn();
          },
        };
        obj.run(obj[oldVal]);
      },
    },
    //监听是否批量撤单
    isShowCheckbox: {
      handler(oldVal) {
        this.rightBtnLabel = oldVal ? "contract.取消撤单" : "contract.批量撤单";
      },
    },
    //监听右侧选择框 是否只显示当前交易对
    checkVal: {
      handler(isChecked) {
        let obj = {
          first: () =>
            isChecked
              ? this.getPositionsData({ coinId: this.coinId })
              : this.getPositionsData(),
          second: () =>
            isChecked
              ? this.getEntrustingData({ coinMarket: this.coinMarket })
              : this.getEntrustingData(this.searchParams),
          third: () =>
            isChecked
              ? this.getEntrustedData({ coinMarket: this.coinMarket })
              : this.getEntrustedData(this.searchParams),
          fourth: () =>
            isChecked
              ? this.getHistoricalPosition({ coinMarket: this.coinMarket })
              : this.getHistoricalPosition(this.searchParams),
          run: (fn) => fn && fn(),
        };
        obj.run(obj[this.activeName]);
      },
    },
    //监听交易对
    coinId: {
      handler(coinId) {
        // console.log('o',coinId);
        this.activeName == "first"
          ? this.checkVal
            ? this.getPositionsData({ coinId })
            : this.getPositionsData()
          : "";
      },
    },
    coinMarket: {
      handler(coinMarket) {
        let obj = {
          second: () =>
            this.checkVal
              ? this.getEntrustingData({ coinMarket })
              : this.getEntrustingData(),
          third: () =>
            this.checkVal
              ? this.getEntrustedData({ coinMarket })
              : this.getEntrustedData(),
          fourth: () =>
            this.checkVal
              ? this.getHistoricalPosition({ coinMarket })
              : this.getHistoricalPosition(),
          run: (fn) => fn && fn(),
        };
        obj.run(obj[this.activeName]);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  .tabs {
    background: var(--mian-bg);
    padding: 0 15px;
    height: 50px;
    .tabs_item {
      display: flex;
      align-items: center;
      position: relative;

      .item {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-right: 40px;
        color: var(--tabs-text-color);
        cursor: pointer;
        &:hover {
          color: var(--main-text-color);
        }
        &.active {
          position: relative;
          color: var(--main-text-color);
          &::after {
            position: absolute;
            bottom: -4px;
            left: 0;
            content: "";
            width: 100%;
            height: 2px;
            background-color: var(--theme-color);
          }
        }
      }
    }
    .functionBtns {
      display: flex;
      align-items: center;
      font-size: 14px;
      .btns {
        display: flex;
        align-items: center;
        .toggle {
          display: flex;
          align-items: center;
          height: 30px;
          margin-right: 10px;
          .iconfont {
            font-size: 14px;
            cursor: pointer;
            margin-top: 1px;
            color: #96a2b2;
          }
          .icon-box {
            color: var(--theme-color);
          }
        }
        .btn {
          min-width: 80px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          padding: 0 10px;
          border-radius: 6px;
          opacity: 0.85;
          text-align: center;
          border: 1px solid var(--theme-color);
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: var(--theme-color);
          cursor: pointer;
          &.disabled {
            border: 1px solid var(--theme-color);
            color: var(--theme-color);
            opacity: 0.3;
            cursor: not-allowed;
          }
        }
      }
      .showMore {
        display: flex;
        align-items: center;
        height: 30px;
        font-size: 14px;
        color: var(--theme-color);
        cursor: pointer;
        .label {
          margin-left: 5px;
        }
        .iconfont {
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
  }
  .container {
    padding: 0 15px 0 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    // .dataBox {
    //   flex: 1;
    // }
  }
}
</style>
