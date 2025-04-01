<template>
  <div class="ctn_header containner">
    <div class="left">
      <ul class="left_ul">
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              BTC/USDT<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu
              slot="dropdown"
              style="padding: 20px; margin-left: 75px"
            >
              <el-input placeholder="请输入内容" v-model="searchKey">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <el-table :data="searchData" style="width: 100%">
                <el-table-column prop="contract" label="合约(永续)" width="180">
                </el-table-column>
                <el-table-column prop="price" label="价格" width="180">
                </el-table-column>
                <el-table-column prop="quoteChange" label="涨跌幅">
                </el-table-column>
              </el-table>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="li_btn">
          <span
            :class="[
              parseFloat(marketInfo.change) >= 0
                ? 'lastPrice_rise'
                : 'lastPrice_fall',
            ]"
            >{{ marketInfo.lastPrice }}</span
          >
          <span
            :class="[
              parseFloat(marketInfo.change) >= 0 ? 'ctn_btn_rise' : 'ctn_btn_fall',
            ]"
            >{{ marketInfo.change }}</span
          >
        </li>
        <li>
          <p>标记价格</p>
          <p>20118.23</p>
        </li>
        <li>
          <p>指数价格</p>
          <p>20118.23</p>
        </li>
        <li>
          <p>最高价</p>
          <p>{{ marketInfo.higePrice }}</p>
        </li>
        <li>
          <p>最低价</p>
          <p>{{ marketInfo.lowPrice }}</p>
        </li>
        <li>
          <p>24H量</p>
          <p>{{ marketInfo.volOf24h }}</p>
        </li>
        <li>
          <p>资金费率倒计时</p>
          <p>0.01%/4:05:25</p>
        </li>
      </ul>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { webSocketMixin } from '../sTradingviewPc/mixin/webSocket'
import {
  marketInfoApi,
} from "@/api/contractTransaction";

export default {
  name: "marketInfoView",
  mixins: [webSocketMixin],
  data() {
    return {
      wsUrl: "ws://192.168.0.11/ws/zh_cn",
      searchKey: "",
      searchData: [
        {
          contract: "BTCUSDT",
          price: "20120.78",
          quoteChange: "-0.23%",
        },
        {
          contract: "ETHUSDT",
          price: "1120.78",
          quoteChange: "+0.23%",
        },
      ],
      // 单个行情信息
      marketInfo: {
        lastPrice: "", //最新价格
        higePrice: "", //最高价格
        lowPrice: "", //最低价
        volOf24h: "", //24成交量
        change: "", //涨跌幅
      },
    };
  },
  mounted() {
    this.getMarketInfo();
  },
  methods: {
     websockOpen(e) {
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
    this.websockSend('priceData'); //最新行情价格
    },
    // 单个行情信息
    getMarketInfo() {
      marketInfoApi({
        marketType: "USDT_M_FUTURE",
        symbol: "BTC/USDT",
      }).then((res) => {
        const data = res.data;
        if (data.code == 1) {
          const marketInfo = data.data;
          marketInfo.change = marketInfo.change>0? "+"+marketInfo.change + "%":marketInfo.change + "%";
          this.marketInfo = marketInfo;

          this.$EventBus.$emit('sendMsg',this.marketInfo)
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ctn_header {
  background: #000622;
  margin: 0 10px;
  height: 80px;
  display: flex;
  @include flex();
  .left {
    flex: 1;
    .left_ul {
      @include flex();
      li {
        font-size: 14px;
        color: #96a2b2;
      }
      .li_btn {
        @include flex();
        .ctn_btn_fall {
          @include marketInfoBtn();
          background: #f75f52;
        }
        .ctn_btn_rise {
          @include marketInfoBtn();
          background: #37bc85;
        }
      }
    }
  }
  .right {
    width: 668px;
    height: 80px;
  }
}
.containner {
  padding: 0 72px;
}
 .el-dropdown {
    font-size: 24px;
    color: #ffffff;
  }
</style>