<template>
  <div class="page">
    <div class="header container">
      <div>
        <span class="h-title" @click="$router.go(-1)">{{$t('lang_919')}}</span>
        <i class="el-icon-arrow-right"></i>
        <span>{{$t('lang_946')}}</span>
      </div>
    </div>
    <div class="table container">
      <div class="title">
        <div class="title-left">
          <span class="title1">{{$t('lang_946')}}</span>
          <i class="el-icon-minus"></i>
          <span class="title-name">{{ coinTitle }}</span>
        </div>
        <div class="title-right">
          <div class="depth-handicap">
            <div>{{$t('lang_1003')}}</div>
            <div class="handicap">
              <Select
                v-model="handicapVal"
                v-if="handicapArr.length"
                :options="handicapArr"
              />
            </div>
          </div>
          <!-- <div class="merge-depth">
            <div>合并深度</div>
            <div class="merge">
              <Select v-model="mergeVal" :options="mergeArr" />
            </div>
          </div> -->
        </div>
      </div>
      <div class="content">
        <div class="item">
          <div class="item-title">{{$t('lang_947')}}</div>
          <div class="row">
            <el-row>
              <el-col :span="2"><div>{{$t('lang_945')}}</div></el-col>
              <el-col :span="5"><div class="tr">{{$t('lang_1325')}}(USDT)</div></el-col>
              <el-col :span="6"><div class="tr">{{`${$t('lang_1352')}(${baseAssetCode})`}}</div></el-col>
              <el-col :span="6"><div class="tr">{{$t('lang_845')}}(USDT)</div></el-col>
              <el-col :span="5"><div class="last">{{`${$t('lang_939')}(${baseAssetCode})`}}</div></el-col>
            </el-row>
            <div class="box">
              <el-row
                class="row-data"
                v-for="(item, index) in buyList"
                :key="index"
              >
                <el-col :span="2"
                  ><div class="user-buy">{{ `${$t('lang_944')}${index + 1}` }}</div></el-col
                >
                <el-col :span="5"
                  ><div class="tr">{{ item.price }}</div></el-col
                >
                <el-col :span="6"
                  ><div class="tr">{{ item.num | formatNumberWithUnit }}</div></el-col
                >
                <el-col :span="6"
                  ><div class="tr">{{ item.turnover ? item.turnover : "--" }}</div></el-col
                >
                <el-col :span="5" class="last"
                  ><div>
                    <div>{{ item.sum | formatNumberWithUnit }}</div>
                  </div></el-col
                >
                <div
                  :style="`width: ${(item.sum / totalBuyAmount) * 100}%`"
                  class="bid_bg"
                ></div>
              </el-row>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-title">{{$t('lang_963')}}</div>
          <div class="row">
            <el-row>
              <el-col :span="2"><div>{{$t('lang_962')}}</div></el-col>
              <el-col :span="5"><div class="tr">{{$t('lang_1325')}}(USDT)</div></el-col>
              <el-col :span="6"><div class="tr">{{`${$t('lang_1352')}(${baseAssetCode})`}}</div></el-col>
              <el-col :span="6"><div class="tr">{{$t('lang_845')}}(USDT)</div></el-col>
              <el-col :span="5"><div class="last">{{`${$t('lang_939')}(${baseAssetCode})`}}</div></el-col>
            </el-row>
            <div class="box">
              <el-row
                class="row-data"
                v-for="(item, index) in sellList"
                :key="index"
              >
                <el-col :span="2"
                  ><div class="user-sell">{{ `${$t('lang_955')}${index + 1}` }}</div></el-col
                >
                <el-col :span="5"
                  ><div class="tr">{{ item.price }}</div></el-col
                >
                <el-col :span="6"
                  ><div class="tr">{{ item.num | formatNumberWithUnit }}</div></el-col
                >
                <el-col :span="6"
                  ><div class="tr">{{ item.turnover ? item.turnover : "--" }}</div></el-col
                >
                <el-col :span="5" class="last"
                  ><div>
                    <div>{{ item.sum | formatNumberWithUnit }}</div>
                  </div></el-col
                >
                <div
                  :style="`width: ${(item.sum / totalSellAmount) * 100}%`"
                  class="ask_bg"
                ></div>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "./components/select.vue";
import { mapState } from "vuex";
import Socket from "@/utils/static/socket";
import { $getSymbolInfo } from "@/api/contractTransaction";
import { getUuid } from "@/libs/utils";
export default {
  name: "Orderlist",
  components: {
    Select,
  },
  data() {
    return {
      socket: new Socket(wsUrl),
      handicapVal: 1,
      mergeVal: 2,
      handicapArr: [],
      coinTitle: "",
      buyList: [],
      sellList: [],
      symbol: "",
      selectNum: null,
      baseAssetCode: "",
    };
  },
  watch: {
    "setting.spotCurrentMarket": {
      handler(val) {
        this.coinTitle =
          this.header.spotTradingHearderData.symbolKey?.toUpperCase();
        this.symbol = this.header.spotTradingHearderData.symbol;
        this.coinName = this.header.spotTradingHearderData.symbolKey;
        this.baseAssetCode = this.header.spotTradingHearderData.baseAssetCode;
      },
      immediate: true,
    },
    handicapVal: {
      handler(val) { 
        if (this.handicapArr.length) {
          let params = this.handicapArr.filter((item) => {
            return item.value == val;
          })[0];
          this.changeDeeps(params.label);
        }
        
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    ...mapState(["setting", "header"]),
    totalSellAmount() {
      // return this.sellList[0].sum;
      return this.sellList[this.sellList.length - 1].sum;
    },
    totalBuyAmount() {
      return this.buyList[this.buyList.length - 1].sum;
    },
  },
  filters: {
    //单位换算
    formatNumberWithUnit(number) {
      if (!number) {
        return 0;
      }
      if (number >= 1000000) {
        return (
          (number / 1000000)
            ?.toFixed(2)
            ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "M"
        );
      } else if (number >= 1000) {
        return (
          (number / 1000)?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
          "K"
        );
      } else {
        return number;
      }
    },
  },
  mounted() {
    this.getData();
  },
  beforeDestroy() {
    // console.log('可以关闭socket了');
    //页面离开停止订阅
    this.stopTopic();
    //关闭socket
    this.socket.onClose();
  },
  methods: {
    //开启socket
    startSocket() {
      // console.log("开启socket");
      this.socket.doOpen();
      this.socket.on("open", () => {
        this.sendTopic();
      });
      this.socket.on("message", this.onMessage);
      this.socket.on("close", this.onClose);
      this.socket.on("error", (event) => {
        console.log("home.vue websocket 出错了", this.onClose);
      });
    },
    //发送订阅信息
    sendTopic() {
      let self = this;
      this.socket.send({
        id: getUuid(), //客户端生成的随机字符串
        cmd: "sub",
        topic: `depth.update.s.${self.coinName}.${self.selectNum}`,
        data: {},
      });
    },
    sendMessage(data) {
      if (this.socket.socket.readyState !== this.socket.socket.OPEN) {
        // this.onClose
        this.socket.doOpen();
      }
      if (this.socket.checkOpen()) {
        this.socket.send(data);
      } else {
        this.socket.on("open", () => {
          this.socket.send(data);
        });
      }
    },
    //停止订阅
    stopTopic() {
      let self = this;
      this.sendMessage({
        id: getUuid(), //客户端生成的随机字符串
        cmd: "unsub",
        topic: `depth.update.s.${self.coinName}.${self.selectNum}`,
        data: {},
      });
    },
    //接收推送信息
    onMessage(data) {
      // console.log("订阅socket推送的数据", data);
      if (data.topic) {
        this.buyList = data.data.bid;
        // this.sellList = data.data.ask;
        this.sellList = this.reverseArray(data.data.ask);
      }
    },

    //盘口数据
    getData() {
      // console.log("币种", this.symbol);
      // handicapApi({
      //   symbol: this.symbol, //交易对
      //   marketType: "SPOT", //市场类型
      //   priceDecimal: this.selectNum,
      // }).then((res) => {
      //   const { ask, bid } = res.data.data;
      //   // this.sellList = ask;
      //   this.sellList = this.reverseArray(ask);
      //   this.buyList = bid;
      //   this.getDeepths();
      // });
    },
    //数组反转
    reverseArray(arr) {
      return arr.reverse();
    },
    //获取深度系数
    getDeepths() {
      $getSymbolInfo({ symbolCode: this.symbol, marketType: "SPOT" }).then(
        (res) => {
          if (res.status && res.status === 200) {
            let list = [];
            list = res.data?.data?.depthConfig.split(",") || [];
            let arr = [];
            list.forEach((item, index) => {
              arr.push({
                value: index + 1,
                label: item,
              });
            });
            this.handicapArr = arr;
            this.selectNum = this.handicapArr[0]?.label
            this.startSocket(); //开启socket
          }
        }
      );
    },
    //切换系数
    changeDeeps(val) {
      //停止订阅
      this.stopTopic();
      this.selectNum = val;
      // 继续订阅
      this.sendTopic();
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: #f5f7fa;
  color: #333;
  .header {
    background: #fff;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    .el-icon-arrow-right {
      padding: 0 10px;
      color: #96a2b2;
    }
    .h-title{
      cursor: pointer;
    }
  }
  .table {
    margin-top: 10px;
    background: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      .title-left {
        margin-top: 30px;
        .title1 {
          font-size: 30px;
        }
        .el-icon-minus {
          font-size: 26px;
          padding: 0 10px;
        }
        .title-name {
          font-size: 18px;
        }
      }
      .title-right {
        margin-top: 20px;
        display: flex;
        font-size: 16px;
        color: #96a2b2;

        .depth-handicap {
          // margin-right: 40px;
          .handicap {
            border-radius: 4px;
          }
        }
        .merge-depth {
          .merge {
          }
        }
      }
    }
    .content {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      .item {
        width: 740px;
        height: 718px;
        border-radius: 6px;
        border: 1px solid #e1e1e1;
        .item-title {
          font-size: 18px;
          padding: 15px 0px 15px 15px;
        }
        .row {
          padding-left: 15px;
          font-size: 14px;
          color: #96a2b2;
          .last {
            text-align: right;
            padding-right: 15px;
          }
        }
        .box {
          height: 635px;
          overflow-y: scroll;
          color: #333333;
          font-size: 14px;
          .row-data {
            margin-top: 15px;
            height: 30px;
            line-height: 30px;
            &:hover {
              background-color: #f5f7fa;
            }
            .user-buy {
              color: #90ff00;
            }
            .user-sell {
              color: #f75f52;
            }
          }
          .ask_bg {
            @include handicapBg2();
            background-color: rgba(247, 95, 82, 0.1);
          }
          .bid_bg {
            @include handicapBg();
            background-color: rgba(55, 188, 133, 0.1);
          }
        }
      }
    }
  }
  .container {
    padding: 0 210px;
  }
  .tr{
    text-align: right;
  }
}
</style>