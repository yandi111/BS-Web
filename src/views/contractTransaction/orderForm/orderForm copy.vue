<template>
  <div class="orderForm">
    <div class="tabs" :class="{ dark: getTheme == 'dark' }">
      <div
        class="tab"
        :class="tabIndex === item.id ? 'tab-active' : ''"
        v-for="item in tabsArr"
        :key="item.id"
        @click="tabChange(item.id)"
        style="font-size: 12px; font-weight: 500;"
      >
        {{ item.label }} 
      </div>
    </div>
    
    <div class="tabs-icon" v-if="tabIndex === 1">
      <div class="handlers">
        <div class="handlers-icon">
          <span
            @click="changePlate('all')"
            class="handler handler-all"
            :class="{ active: selectedPlate == 'all' }"
          ></span>
          <span
            @click="changePlate('sell')"
            class="handler handler-red"
            :class="{ active: selectedPlate == 'sell' }"
          ></span>
          <span
            @click="changePlate('buy')"
            class="handler handler-green"
            :class="{ active: selectedPlate == 'buy' }"
          ></span>
        </div>
        <div class="handler-select" @click.stop="selectShow = !selectShow">
          <div class="select-top" style="font-size: 12px;">
            {{ selectNum }}
            <div class="select-icon">
              <i v-show="!selectShow" class="el-icon-caret-bottom"></i>
              <i v-show="selectShow" class="el-icon-caret-top"></i>
            </div>
          </div>

          <div
            class="select-b"
            :class="{ dark: getTheme == 'dark' }"
            v-show="selectShow"
          >
            <div
              class="select-item"
              v-for="item in this.getDepthInterval"
              :key="item.id"
              @click.stop="selectItem(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table" v-if="tabIndex === 1">
      <div class="table-header">
        <el-row>
          <el-col :span="8"><div style="font-size: 12px; font-weight: 500; color: #737373;">价格(USDT)</div></el-col>
          <el-col :span="7">
            <div class="unit" style="font-size: 12px; font-weight: 500; color: #737373;">
              数量
            </div>
          </el-col>
          <el-col :span="9">
            <div class="unit" style="font-size: 12px; font-weight: 500; color: #737373;">
              合计
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="plate-nowprice" v-show="selectedPlate != 'all'">1111
        <span class="price" :class="changeNum ? 'buy' : 'sell'">{{
          marketInfo1.lastPrice
        }}</span>
        <span v-if="changeNum" class="buy">↑</span>
        <span v-else class="sell">↓</span>
        <el-tooltip
          popper-class="my-tooltip"
          content="Top center"
          placement="top"
        >
          <div slot="content">
            <p>
              {{
                $t("contract.当前标记价格", [markedPrice ? markedPrice : "--"])
              }}
            </p>
          </div>
          <span class="price-right">
            {{ markedPrice ? markedPrice : "--" }}</span
          >
        </el-tooltip>
      </div> -->
      <div
      v-if="sellFlag"  
        class="table-list"
        :class="selectedPlate == 'all' ? 'active-list' : ''"
      >
        <div
          :class="[
            'table-box',
            {
              'hight-active': selectedPlate == 'sell',
              't-flex': selectedPlate == 'all',
            },
          ]"
        >
          <div
            class="table-item"
            style="font-size: 12px; cursor: pointer;"
            :class="selectedPlate === 'sell' ? 'table-active' : ''"
            v-for="(self, index) in bidsListInfo"
            :key="index"
            @click="choosePrice(self.price)"
          >
         
            <div class="pointer" >
              <el-row>
                <el-col :span="8"><div class="sell">{{ $thousandth(self.price) }}</div></el-col>
                <el-col :span="7">
                  <div style="text-align: right; color: #f0f0f0;">
                    {{
                      self.indexValue 
                    }}

                  </div>
                </el-col>
                <el-col :span="9">
                  <div style="text-align: right; color: #f0f0f0;">
                    {{
                      self.value
                    }}
                  </div>
                </el-col>
              </el-row>
            </div>
            <div
              :style="`width: ${(self.indexValue / totalSellAmount) * 100}%`"
              class="ask_bg"
            ></div>
          </div>
        </div>
      </div>
      <div class="plate-nowprice" v-if="cemterFlag" style="display: flex;">
        <!-- <span class="price" :class="changeNum ? 'buy' : 'sell'">{{
          marketInfo1.lastPrice
        }}</span> -->
        <div style="display: flex; justify-content: center;">
          <div>
             <span v-if="changeNum" class="buy">↑</span>
             <span v-else class="sell">↓</span>
          </div>
    <div style="font-size: 16px; margin-left: 3px;" class="price" 
         :style="{ color : changeNum ? '#0CBB57 ' :'  #ED3C2F' }"
         >{{ $thousandth(getLastPrice) }}</div>
      </div>
      <div class="price-right" style="font-size: 12px; display: flex;" >
            <div style="width: 20px; height:20px;">
               <img style="width: 100%;height: 100%;" src="@/assets/newg/icon_red_flag.png" alt="">
            </div>
            <div style="margin-left: 5px;" > {{ markedPrice ? $thousandth(markedPrice) : "--" }}</div>
          </div>
        <el-tooltip
          popper-class="my-tooltip"
          content="Top center"
          placement="top"
        >
          <div slot="content">
            <p>
             <!-- {{
                $t("contract.当前标记价格", [markedPrice ? markedPrice : "--"])
              }}  -->
      
            </p>
          </div>
          
          
        </el-tooltip>
      </div>
      <div
        v-if="buyFlag"  
        class="table-list"
        :class="selectedPlate == 'all' ? 'active-list' : ''"
      >
        <div
          :class="[
            'table-box',
            {
              'hight-active': selectedPlate == 'sell',
              't-flex': selectedPlate == 'all',
            },
          ]"
        >
       
          <div
            class="table-item"
            style="font-size: 12px; cursor: pointer;"
            :class="selectedPlate === 'sell' ? 'table-active' : ''"
            v-for="(self, index) in asksListInfo"
            :key="index"
            @click="choosePrice(self.price)"
          >
         
            <div class="pointer" >
              <el-row>
                <el-col :span="8"><div class="buy">{{ $thousandth(self.price) }}</div></el-col>
                <el-col :span="7">
                  <div style="text-align: right; color: #f0f0f0;">
                    {{
                      self.indexValue 
                    }}

                  </div>
                </el-col>
                <el-col :span="9">
                  <div style="text-align: right; color: #f0f0f0;">
                    {{
                      self.value
                    }}
                  </div>
                </el-col>
              </el-row>
            </div>
            <div
              :style="`width: ${(self.indexValue / totalBuyAmount) * 100}%`"
              class="ask_bg"
            ></div>
          </div>
        </div>
      </div>
    
    </div>
    <div class="news-table" v-if="tabIndex === 2">
      <div class="new-header">
        <el-row>
          <el-col :span="6"><div>{{ $t("contract.时间") }}</div></el-col>
          <el-col :span="4" style="text-align: center"><div>{{ $t("contract.方向") }}</div></el-col>
          <el-col :span="6"><div class="unit">{{ $t("contract.价格") }}(USDT)</div></el-col>
          <el-col :span="8"><div class="unit">{{ $t("contract.数量") }}{{
            quantityUnit === 1
              ? `(${$t("contract.张")})`
              : quantityUnit === 2
              ? "(USDT)"
              : `(${baseAssetCode})`
          }}</div></el-col>
        </el-row>
      </div>
      <div class="new-box">
        <el-row class="new-item" v-for="(item, index) in tradesArr" :key="index">
          <el-col :span="6"><div>{{ item.time | formatDate }}</div></el-col>
          <el-col :span="4"><div style="text-align: center" :class="item.direction === 1 ? 'buy' : 'sell'">{{ item.direction === 1 ? $t("contract.买入") : $t("contract.卖出") }}</div></el-col>
          <el-col :span="6"><div style="text-align: right" :class="item.direction === 1 ? 'buy' : 'sell'">{{ item.price }}</div></el-col>
          <el-col :span="8"><div style="text-align: right">{{ quantityUnit === 1 ? item.num : quantityUnit === 2 ? item.usdtNum : item.baseCoinNum | formatNumberWithUnit }}</div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 导入所需的工具和API
import { getDate } from "@/libs/utils";
import {
  // eslint-disable-next-line no-unused-vars
  handicapApi,
  // marketTradesApi,
  $getSymbolInfo,
} from "@/api/contractTransaction";
import { mapState, mapGetters ,mapMutations} from "vuex";
import { getUuid } from "@/libs/utils";
import { sendWSPush } from "@/socket/webSocket";
import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import { logListApi } from "@/api/user";
// import {  mapMutations} from "vuex";


export default {
  name: "OrderForm", // 组件名称
  data() {
    return {
      buyFlag:true,
      cemterFlag:true,
      sellFlag : true,


      asksListInfo :[],
      bidsListInfo:[],
      lastPrice:null,  // 市场价
      tabIndex: 1, // 当前选中的标签索引
      headerArr: [
        {
          id: 0,
          label: "",
        },
      ],
      tabsArr: [
        {
          id: 1,
          label: this.$t("订单表"), // 订单表标签
        },
        {
          id: 2,
          label: this.$t("最新成交"), // 最新成交标签
        },
      ],
      selectArr: [], // 下拉选择项数组
      selectNum: "0.1", // 当前选择的数量单位
      selectShow: false, // 下拉选择框是否显示
      tradesArr: [], // 最新成交数据
      buyData:[],
      sellData:[],

      buyDataList: [], // 买盘数据
      sellDataList: [], // 卖盘数据
      totalSellList:[],
      totalBuyList:[],
      selectedPlate: "all", // 当前显示的买卖盘
      currentCoin: {
        change: 0.1, // 当前币种变化
      },
      totalSell: [], // 卖盘总数据
      totalBuy: [], // 买盘总数据
      marketInfo: {}, // 市场信息
      coins: "", // 交易对大写
      coinsName: "", // 交易对小写
      baseAssetCode: "", // 基础资产代码
      marketType: "", // 市场类型
      sendParams: {
        id: getUuid(), // 生成唯一ID
        data: {},
      },
      priceInfo:'',
    };
  },
  computed: {
    ...mapGetters(["getTheme","getDepthInterval","getAsksList","getBidsList",'getCoinsName','getLastPrice']), // 从 Vuex 获取主题
    ...mapState({
      contractCoin: ({ contract }) => contract.contractCoin, // 合约币种
      spotCoinInfo: ({ spots }) => spots.spotCoinInfo, // 现货币种信息
      spotSelectNum: ({ setting }) => setting.SpotSelectNum, // 现货选择数量
      contractSelectNum: ({ setting }) => setting.contractSelectNum, // 合约选择数量
      quantityUnit: (state) => state.contract?.quantityUnit, // 数量单位
    }),

    totalSellAmount() { 
      // return this.asksListInfo[0].indexValue; // 卖盘总金额
       // 检查 asksListInfo 是否存在且不为空
    if (this.asksListInfo && this.asksListInfo.length > 0) {
        return this.asksListInfo.reduce((max, item) => {
            return Math.max(max, item.indexValue || 0); // 比较当前最大值和当前项的 indexValue
        }, -Infinity); // 初始值设为 -Infinity，以确保任何值都能替代
    }
    return 0; // 如果条件不满足，返回 0 或其他默认值
    },
    totalBuyAmount() {
      // return this.bidsListInfo[this.bidsListInfo.length - 1].indexValue * 3 ; // 买盘总金额
      if (this.bidsListInfo && this.bidsListInfo.length > 0) {
        return this.bidsListInfo.reduce((max, item) => {
            return Math.max(max, item.indexValue || 0); // 比较当前最大值和当前项的 indexValue
        }, -Infinity); // 初始值设为 -Infinity，以确保任何值都能替代
    }
    return 0; // 如果条件不满足，返回 0 或其他默认值
      
    },
    markedPrice: {
      get() {
        return this.$store.state.initList.indexPrice; // 获取标记价格
      },
      set(value) {
        console.log(value);
        
      },
    },
    marketInfo1() {
      return this.$store.state.contract.priceObj; // 获取市场信息
    },
    changeNum() {
      const currentNumber = Number(
        // this.$store.state.contract.priceObj.lastPrice // 当前价格
        this.getLastPrice // 当前价格
      );
      const previousNumber = Number(localStorage.getItem("previousNumber")); // 上一个价格

      if (currentNumber >= previousNumber) {
        localStorage.setItem(
          "previousNumber",
          // this.$store.state.contract.priceObj.lastPrice // 更新上一个价格
          this.getLastPrice // 更新上一个价格
        );
        return true; // 当前价格上涨
      } else {
        localStorage.setItem(
          "previousNumber",
          // this.$store.state.contract.priceObj.lastPrice // 更新上一个价格
          this.getLastPrice // 更新上一个价格
        );
        return false; // 当前价格下跌
      }
    },
  },
  watch: {
    contractCoin() {
      this.getSymbols(); // 获取盘口数据
    },
    contractSelectNum(v) {
      this.selectNum = v; // 更新选择的数量单位
    },


getAsksList(newVal) {
  this.asksListInfo = newVal
    // Vue.set(this, 'asksListInfo', newVal);
},

getBidsList(newVal) {

  this.bidsListInfo = newVal
    // Vue.set(this, 'bidsListInfo', newVal);
 
},



  },
  filters: {
    formatDate(time) {
      return getDate(time); // 格式化时间
    },
    formatNumberWithUnit(number) {
      if (!number) {
        return 0; // 如果没有数字，返回0
      }
      if (number >= 1000000) {
        return (
          (number / 1000000)
            ?.toFixed(2)
            ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "M" // 大于百万的格式化
        );
      } else if (number >= 1000) {
        return (
          (number / 1000)?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
          "K" // 大于千的格式化
        );
      } else {
        return Number(number); // 返回原始数字
      }
    },
  },
  created() {
    document.addEventListener("click", () => {
      this.selectShow = false; // 点击文档时隐藏选择框
    });
  },
  mounted() {
   
  },
  methods: {
    ...mapMutations([
      'setCoinsName',
      'setSellPriceInfo',   // 实时价格
      'setIndexPrice', // 标记价
      'setIncrease24H',  //今日涨跌幅
      'setFundingRate', //资金费率
      'setHighPrice', //今日最高价
      'setLowestPrice', //今日最低价
      'setVolData', //24h成交量
      'setCoinsId',   // 合约id
      'setPositionList',
      'setPrice',
      'setSelectNum'
    ]),
    init() {
      this.getdefaultCoin(); // 获取默认交易对
      this.getTabCoin(); // 获取切换后的交易对
    },
    selectItem(item) {
      this.selectShow = false; // 选择后隐藏选择框  item.nameitem.nameitem.name
      this.selectNum = item.name; // 更新选择的数量单位
      console.log(item.name,'item.nameitem.nameitem.name');
      this.setSelectNum(item.name)
      
      // this.$store.commit("setContractSelectNum", item.name); // 更新Vuex中的选择数量
      // this.sendMsg(); // 发送WebSocket消息
      // this.getHandicap(this.selectedPlate); // 获取盘口数据
    },

    tabChange(id) {
      this.tabIndex = id; // 切换标签
      this.getMarketTrades(); // 获取市场交易数据
    },
    changePlate(str) {
      
      this.getPlate(str); // 切换买卖盘
    },
    getPlate(str) {
      console.log(str,"strstrstrstrstrstr");
      this.selectedPlate = str
      
      // if (str != "") {
      //   this.selectedPlate = str; // 更新当前显示的买卖盘
      // }
    //  this.getHandicap(str); // 获取盘口数据

    // buyFlag:true,
    //   cemterFlag:true,
    //   sellFlag : true,

    if (str == 'all') {
      this.buyFlag = true,
       this.cemterFlag = true,
       this.sellFlag  = true
    }
    if (str == 'sell') {
      this.buyFlag = false,
       this.cemterFlag = false,
       this.sellFlag  = true
    }

    if (str == 'buy') {
      this.buyFlag = true,
       this.cemterFlag = false,
       this.sellFlag  = false
    }



    },

    getdefaultCoin() {
      this.$EventBus.$on("sendDefaultSymbol", (msg) => {
        this.marketType = msg.marketType; // 更新市场类型
        this.marketInfo = msg; // 更新市场信息
        this.baseAssetCode = msg.baseAssetCode; // 更新基础资产代码
        this.coins = msg.symbol; // 更新交易对
        this.coinsName = msg.symbolKey; // 更新交易对小写
     //   this.getHandicap("all"); // 获取所有盘口数据
        this.getMarketTrades(); // 获取市场交易数据
        this.getDeepths(this.coins); // 获取深度数据
      });
    },
    getTabCoin() {
      this.$EventBus.$on("sendSymbol", (msg) => {
        this.marketInfo = msg; // 更新市场信息
        this.coins = msg.symbol; // 更新交易对
        this.coinsName = msg.symbolKey; // 更新交易对小写
        this.marketType = msg.marketType; // 更新市场类型
        this.baseAssetCode = msg.baseAssetCode; // 更新基础资产代码
        this.getDeepths(this.coins); // 获取深度数据
      //  this.getHandicap("all"); // 获取所有盘口数据
        this.getMarketTrades(); // 获取市场交易数据
      });
    },

    getSymbols() {
      const { marketType, symbol, symbolKey, baseAssetCode, quoteAssetCode } =
      this.contractCoin; // 解构合约币种信息
      this.marketInfo = this.contractCoin; // 更新市场信息
      this.coins = symbol; // 更新交易对
      this.coinsName = symbolKey; // 更新交易对小写
      this.marketType = marketType; // 更新市场类型
      this.baseAssetCode = baseAssetCode; // 更新基础资产代码
      this.quoteAssetCode = quoteAssetCode; // 更新币种价格单位
      if (symbol) {
        this.getDeepths(symbol); // 获取深度数据
      }
    },
    
    // getHandicap(type){
    //   let asksL = this.asksListInfo
    //   let bidsL = this.bidsListInfo
    //  //   "getAsksList","this.getBidsList"
    //  console.log(this.getAsksList,"this.getAsksList111");
    //  console.log(this.getBidsList,"this.getAsksList222");
    //   //    asksListInfo :[],
    //   // bidsListInfo:[],
    //   let countsss = 1
    //  if (type == "all") {
    //   console.log(1);
    
    //     console.log(type,countsss++,"all---------111");
    //           this.sellDataList = []; // 清空卖盘数据
    //           this.buyDataList = []; // 清空买盘数据
    //           this.buyDataList = asksL.slice(0, 11); // 获取买盘数据
    //           this.sellDataList = bidsL.slice(0, 11); // 获取卖盘数据

    //           this.totalBuyList = asksL; // 更新买盘总数据
    //           this.totalSellList = bidsL; // 更新卖盘总数据

    //         } else if (type == "buy") {
    //           this.buyDataList = asksL; // 获取买盘数据
    //         } else if (type == "sell") {
    //           this.sellDataList = bidsL; // 获取卖盘数据
    //  }

    // },
    getHandicap(type) {
      
      let socket = new WebSocket(`${process.env.VUE_APP_BASE_WS_CQ}/websocket`); // 创建WebSocket连接
      socket.onopen = () => {
      let params = {
        cmd:"SUBSCRIBE",
        data:{topic:`market_${this.getCoinsName}_${this.selectNum}_depth`} // 订阅市场数据
      }
      // `market_${this.getCoinsName}_${this.selectNum}1_depth`

      // let parkline = {
      //   cmd:"SUBSCRIBE",
      //   data:{topic:"market.BTC-USDT.15MIN.kline"} // 订阅市场数据
      // }
      socket.send(JSON.stringify(params)); // 发送订阅请求
     // socket.send(JSON.stringify(parkline)); // 发送订阅请求
    };
    socket.onmessage = (event) => {      
      if (event.data == 'ping') {
        socket.send("pong"); // 发送订阅请求
        
      }
      let depData = JSON.parse(event.data)
    if (depData.key == `market_${this.getCoinsName}_${this.selectNum}_depth`) {
      if (type === "all") {
        console.log(type,"all---------111");
              this.sellDataList = []; // 清空卖盘数据
              this.buyDataList = []; // 清空买盘数据
              // this.buyDataList = depData.data.asks.slice(0, 11); // 获取买盘数据
              // this.sellDataList = depData.data.bids.slice(0, 11); // 获取卖盘数据
              // this.totalSellList = depData.data.asks; // 更新卖盘总数据
              // this.totalBuyList = depData.data.bids; // 更新买盘总数据

              this.buyDataList = depData.data.bids.slice(0, 11); // 获取买盘数据
              this.sellDataList = depData.data.asks.slice(0, 11); // 获取卖盘数据
              this.totalSellList = depData.data.bids; // 更新卖盘总数据
              this.totalBuyList = depData.data.asks ; // 更新买盘总数据
            } else if (type == "buy") {
              this.buyDataList = depData.data.asks; // 获取买盘数据
            } else if (type == "sell") {
              this.sellDataList = depData.data.bids; // 获取卖盘数据
             }
    }
  
    
    }
     // 发送心跳连接
     setInterval(() => {
      socket.send('pong');
      }, 30000); // 每30秒发送一次心跳
    },

    // getMarketTrades() {
    //   marketTradesApi({ symbol: this.coins, marketType: this.marketType }).then(
    //     (res) => {
    //       if (res.status && res.status === 200) {
    //         if (res.data && res.data.success) {
    //           this.tradesArr = res.data.data; // 更新最新成交数据
    //         }
    //       }
    //     }
    //   );
    // },
    getDeepths(symbol) {
      $getSymbolInfo({ symbolCode: symbol, marketType: "USDT_M_FUTURE" }).then(
        (res) => {
          if (res.status && res.status === 200) {
            let list = [];
            list = res.data?.data?.depthConfig.split(",") || []; // 获取深度配置
            let arr = [];
            list.forEach((item, index) => {
              arr.push({
                id: index + 1,
                name: item, // 将深度配置转换为数组
              });
            });
            this.selectArr = arr; // 更新选择项数组
            this.selectNum = this.selectArr[0].name; // 默认选择第一个
            this.$store.commit("setContractSelectNum", this.selectArr[0].name); // 更新Vuex中的选择数量
            this.$store.commit("setContractSymbols", res.data.data); // 保存单个交易对信息
           // this.getHandicap("all"); // 获取所有盘口数据
            this.getMarketTrades(); // 获取市场交易数据
            this.sendMsg(); // 发送WebSocket消息
          }
        }
      );
    },
    choosePrice(price) {
      // console.log(price);
      this.priceInfo = price.slice()
      console.log(price,this.priceInfo,'pricepricepriceprice');
      
      this.setPrice(this.priceInfo)
      // this.$EventBus.$emit("sendPrice", val.price); // 发送选择的价格
    },
    sendMsg() {
      sendWSPush(
        Object.assign(this.sendParams, {
          cmd: "sub",
          topic: `depth.update.u.${this.coinsName}.${this.selectNum}`, // 订阅盘口数据
        })
      );
      sendWSPush(
        Object.assign(this.sendParams, {
          cmd: "sub",
          topic: `market_trade.update.u.${this.coinsName}`, // 订阅市场交易数据
        })
      );
      sendWSPush(
        Object.assign(this.sendParams, {
          cmd: "sub",
          topic: "batch.market.update", // 订阅批量市场更新
        })
      );
      sendWSPush(
        Object.assign(this.sendParams, {
          cmd: "sub",
          topic: `usdt.contract.marked.price.${this.coinsName}`, // 订阅标记价格
        })
      );
      // window.addEventListener("im_msg", this.getMsg); // 监听WebSocket消息
    },
    getMsg(data) {
      console.log(data,"selectedPlateselectedPlateselectedPlate");
      
      const depthTopic = `depth.update.u.${this.coinsName}.${this.selectNum}`; // 盘口数据主题
      const marketTradeTopic = `market_trade.update.u.${this.coinsName}`; // 最新成交主题
      const batchMarketTopic = "batch.market.update"; // 批量市场更新主题
      const markedPriceTopic = `usdt.contract.marked.price.${this.coinsName}`; // 标记价格主题
      if (data.detail.topic == depthTopic) {
        if (this.selectedPlate === "all") {
          const arr = data.detail.data.ask; // 获取卖盘数据
          this.sellData = arr.slice(arr.length - 11, arr.length); // 更新卖盘数据
          this.buyData = data.detail.data.bid.slice(0, 11); // 更新买盘数据
        } else if (this.selectedPlate === "buy") {
          this.buyData = data.detail.data.bid; // 更新买盘数据
        } else if (this.selectedPlate === "sell") {
          this.sellData = data.detail.data.ask; // 更新卖盘数据
        }
        this.totalSell = data.detail.data.ask; // 更新卖盘总数据
        this.totalBuy = data.detail.data.bid; // 更新买盘总数据
      } else if (data.detail.topic == marketTradeTopic) {
        let tradeData = data.detail.data.details; // 获取最新成交数据
        tradeData.forEach((item) => {
          this.tradesArr.unshift(item); // 将最新成交数据添加到数组前面
        });
      } else if (data.detail.topic == batchMarketTopic) {
        if (this.marketInfo) {
          let currentSymbolMarket = data.detail.data.filter((item) => {
            return this.marketInfo.symbol === item.symbol; // 获取当前市场信息
          })[0];

          if (currentSymbolMarket) {
            this.marketInfo = {
              ...this.marketInfo,
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
      } else if (data.detail.topic == markedPriceTopic) {
        this.markedPrice = data.detail.data.markedPrice; // 更新标记价格
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-list {
  overflow: hidden;
}
.orderForm {
  width: 100%; // 设置订单表宽度为100%
  height: 690px; // 设置订单表高度
  padding: 10px; // 设置内边距
  .tabs {
    display: flex; // 使用flex布局
    .tab {
      color: #737373; // 设置标签颜色
      font-size: 14px; // 设置字体大小
      font-weight: 500; // 设置字体粗细
      margin-right: 30px; // 设置右边距
      cursor: pointer; // 鼠标悬停时显示为手型
      padding-bottom: 10px; // 设置下边距
    }

    .tab-active {
      color: #90FF00; // 设置活动标签颜色
      border-bottom: 2px solid #90FF00; // 设置活动标签下边框
    }
    .active {
      color: #90FF00; // 设置活动状态颜色
    }
  }
  .tabs-icon {
    margin: 10px 0px; // 设置上下边距
    .handlers {
      display: flex; // 使用flex布局
      justify-content: space-between; // 设置子元素间距
      align-items: center; // 垂直居中对齐
      .handler-select {
        background-color: #141414; // 设置背景颜色
        position: relative; // 设置相对定位
        font-size: 12px; // 设置字体大小
        color: #515151; // 设置字体颜色
        cursor: pointer; // 鼠标悬停时显示为手型
        .select-top {
          font-size: 12px; // 设置字体大小
          position: relative; // 设置相对定位
          min-width: 96px; // 设置最小宽度
          height: 24px; // 设置高度
          background: #141414; // 设置背景颜色
          border-radius: 2px; // 设置圆角
          display: flex; // 使用flex布局
          justify-content: end; // 水平居中对齐
          align-items: center; // 垂直居中对齐
          .select-icon {
            margin-left: 5px;
            // position: absolute; // 设置绝对定位
            // right: 0px; // 设置右边距
          }
        }

        .select-b {
          width: 96px; // 设置宽度
          padding: 5px 0; // 设置上下内边距
          background: #1c1c1c; // 设置背景颜色
          position: absolute; // 设置绝对定位
          left: 0; // 设置左边距
          top: 29px; // 设置上边距
          z-index: 9999; // 设置层级
          border-radius: 6px; // 设置圆角
          .select-item {
            height: 40px; // 设置高度
            line-height: 40px; // 设置行高
            cursor: pointer; // 鼠标悬停时显示为手型
            border-radius: 4px; // 设置圆角
            text-align: center; // 文本居中
            font-size: 13px; // 设置字体大小
            font-weight: 500; // 设置字体粗细
            &:hover {
              background-color: #363636; // 悬停时背景颜色
              color: #90FF00; // 悬停时字体颜色
              border-radius: 4px; // 悬停时圆角
            }
          }
        }
        .dark {
          box-shadow: none; // 暗主题时无阴影
        }
      }
      .handlers-icon {
        display: flex; // 使用flex布局
        align-items: center; // 垂直居中对齐
        .handler {
          display: inline-block; // 设置为行内块元素
          margin-right: 10px; // 设置右边距
          width: 24px; // 设置宽度
          height: 24px; // 设置高度
          background-size: 100% 100%; // 设置背景图像大小
          cursor: pointer; // 鼠标悬停时显示为手型
          &.handler-all {
            background-image: url("@/assets/contract-imgs/plate_all.png"); // 设置背景图像
            &.active {
              background-image: url("@/assets/contract-imgs/plate_all_active.png"); // 活动状态背景图像
            }
          }
          &.handler-green {
            background-image: url("@/assets/contract-imgs/plate_green.png"); // 设置背景图像
            &.active {
              background-image: url("@/assets/contract-imgs/plate_green_active.png"); // 活动状态背景图像
            }
          }
          &.handler-red {
            background-image: url("@/assets/contract-imgs/plate_red.png"); // 设置背景图像
            &.active {
              background-image: url("@/assets/contract-imgs/plate_red_active.png"); // 活动状态背景图像
            }
          }
        }
      }
    }
  }
  .table {
    height: 595px; // 设置表格高度
    .table-header {
      font-size: 14px; // 设置表头字体大小
      color: #96a2b2; // 设置表头字体颜色
    }
    .plate-nowprice {
      margin-top: 17px; // 设置上边距
      white-space: nowrap;
      .price {
        margin-right: 5px; // 设置右边距
       
      }
      .price-right {
        margin-left: 40px; // 设置左边距
        color: #737373; // 设置字体颜色
        font-weight: 500;
      }
    }
    .active-list {
      height: 254px; // 设置活动列表高度
    }
    .t-flex {
      display: flex; // 使用flex布局
      flex-direction: column; // 垂直排列
      justify-content: flex-end; // 垂直底部对齐
      min-height: 100%; // 设置最小高度
    }
    .table-box {
      overflow: hidden;
      margin-top: 10px; // 设置上边距
      font-size: 16px; // 设置字体大小
      &::-webkit-scrollbar {
        display: none; // 隐藏滚动条
      }
      overflow-y: scroll; // 允许垂直滚动
      .table-item {
        height: 24px; // 设置行高
        line-height: 24px; // 设置行高
        position: relative; // 设置相对定位
        .ask_bg {
          @include handicapBg(); // 使用混合宏
          background-color: rgba(247, 95, 82, 0.1); // 设置背景颜色
          color: #f0f0f0; // 设置字体颜色
          // transition: width 0.2s ease; // 添加过渡效果，持续时间为0.5秒
        }
        .bid_bg {
          @include handicapBg(); // 使用混合宏
          background-color: rgba(55, 188, 133, 0.1); // 设置背景颜色
        }
        &:hover {
          background-color: #2a2a2a; // 悬停时背景颜色
        }
      }
      .table-active {
        height: 24px; // 设置活动行高度
        line-height: 24px; // 设置行高
      }
    }
  }
  .news-table {
    margin-top: 10px; // 设置上边距
    height: 630px; // 设置新闻表高度
    font-size: 16px; // 设置字体大小
    color: var(--main-text-color); // 设置字体颜色
    .new-header {
      margin: 15px 0 10px 0; // 设置上下边距
      color: #96a2b2; // 设置字体颜色
    }
    .new-box {
      height: 568px; // 设置新闻内容区域高度
      overflow-y: scroll; // 允许垂直滚动
      &::-webkit-scrollbar {
        display: none; // 隐藏滚动条
      }
      .new-item {
        height: 30px; // 设置新闻项高度
        line-height: 30px; // 设置行高
      }
    }
  }
  .buy {
    color: #0CBB57 !important; // 设置买入项颜色
  }

  .sell {
    color: #ED3C2F !important; // 设置卖出项颜色
  }
  .hight-active {
    height: 526px; // 设置高亮活动项高度
  }
  .unit {
    text-align: right; // 设置文本右对齐
    overflow: hidden; // 隐藏溢出内容
    text-overflow: ellipsis; // 文本溢出显示省略号
    white-space: nowrap; // 文本不换行
  }
}
</style>