<template>
  <!-- <transition>
    <div
      class="coinTypePopup"
      v-show="isShow"
      :class="{ dark: getTheme == 'dark' }"
    >
      <div class="searchBox">
        <i class="iconfont icon-search"> </i>
        <input
          type="text"
          v-model="searchValue"
          :placeholder="$t('contract.搜索')"
          @input="toSearch"
        />
        <i
          v-if="searchValue"
          class="iconfont icon-close2 delete"
          @click="emptyValue"
        ></i>
      </div>
      <div class="tab">
        <span
          class="item"
          :class="{ active: currentIndex == 0 }"
          @click="changeTab(0)"
          >{{ "contract.自选" | translate }}</span
        >
        <span
          class="item"
          :class="{ active: currentIndex == 1 }"
          @click="changeTab(1)"
          >{{ "contract.合约F" | translate }}</span
        >
      </div>
      <div id="contentBox">
        <div class="content" v-if="list.length">
          <el-table
            :height="tableHeight"
            :data="list"
            style="width: 100%"
            @row-click="chooseCoin"
          >
            <el-table-column
              v-for="(item, index) in labelData"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width"
              sortable
            >
              <template slot-scope="{ row }">
                <div class="pl10 cell" v-if="item.symbol">
                  <i
                    class="iconfont mr5 icon-star"
                    :class="{ favorite: row['favorite'] }"
                    @click.stop="onCollection(row)"
                  >
                    <div class="mask"></div>
                  </i>
                  <span>{{ row[item.prop] }}</span>
                  <img
                    v-show="row.isHot"
                    class="ml5"
                    src="@/assets/contract-imgs/fire.png"
                    alt=""
                  />
                  <span class="subsidy" v-show="row.isSubsidy">{{$t('contract.奖励')}}</span>
                </div>
                <div class="pl10 cell price" v-if="item.text">
                  <span :class="num(row) ? 'up' : 'down'">{{
                    row[item.prop]
                  }}</span>
                </div>
                <div class="pl10 cell price" v-if="item.gains">
                  <span
                    v-if="item.gains"
                    :style="
                      row[item.prop] > 0 ? 'color:#90ff00' : 'color:#f75f52'
                    "
                    >{{ row[item.prop] | changeFilter }}</span
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="empty" v-if="!list.length">
          <myEmpty />
        </div>
      </div>
    </div>
  </transition> -->
  <transition name="fade">
              <!-- <div v-show="isShow" -->
              <div v-show="isShow"  class="handTop" style="width: 500px; background: #1E1E1E; padding: 15px 20px; position: absolute;left:0px; z-index: 9999;">
              <!-- <div v-show="true"  style="width: 500px; background: #1E1E1E; padding: 15px 20px; z-index: 9999;"> -->
                <!-- 搜索框 -->
                <div class="flex ic jc"
                  style="cursor: pointer; position: relative;  border-radius: 4px; height: 26px; background: #2a2a2a; color: #ffffff;">
                  <div style="position: absolute; left :5px;top: 5px; margin-left: 10px;">
                    <img style="width: 18px; height: 18px;" src="@/assets/images/icon/icon-notes2.png" alt="">
                  </div>
                  <div style="position: absolute; left :33px">搜索</div>
                  <input @focus="$event.target.style.border = '0.5px solid #90FF00'"
                    @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)'"
                    @input="searchCoinItem"
                    style="outline: none;text-align: center;width: 100%; caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #2a2a2a;  height: 28px; line-height: 28px; color: #FFFFFF;"
                    type="text">
                </div>

                <div style="margin-top: 9px; margin-bottom: 14px;">
                  <div class="flex">

                    <div style="flex-direction: column; margin-right: 15px;" class="flex jc ic">
                      <div @click="selectTab('optional')"
                        :style="{ color: selectedTab === 'optional' ? '#FFFFFF' : '#737373' }"
                        style="font-family: PingFang SC; font-size: 14px; font-weight: 400;white-space: nowrap;">
                        自选
                      </div>
                      <div v-if="selectedTab === 'optional'" style=" width: 15px; height: 2px;">
                        <img style="width: 100%; height: 100%;" src="@/assets/images/icon/lineB.png" alt="">
                      </div>
                      <div v-else style=" margin-left: 0px; width: 15px; height: 2px;">
                      </div>
                    </div>

                    <div style="flex-direction: column;" class="flex jc ic">
                      <div @click="selectTab('USDTy')"
                        :style="{ color: selectedTab === 'USDTy' ? '#FFFFFF' : '#737373' }"
                        style=" font-family: PingFang SC; font-size: 14px; font-weight: 400;white-space: nowrap;">
                        USDT永续
                      </div>
                      <div v-if="selectedTab === 'USDTy'" style="width: 15px; height: 2px;">
                        <img style="width: 100%; height: 100%;" src="@/assets/images/icon/lineB.png" alt="">
                      </div>
                      <div v-else style=" margin-left: 0px; width: 15px; height: 2px;">
                      </div>
                    </div>

                  </div>
                </div>
                <div style="width: 100%; height: 1px; background-color: #252525;"></div>

                <div class="flex" style="margin-top: 10px; width: 100%; margin-bottom: 10px;">
                  <div class="flex ic" style="width: 30%; ">
                    <div
                      style=" font-family: PingFang SC;font-size: 12px;font-weight: 400; margin-right: 2px;margin-top: 1px;">
                      合约</div>
                    <div style="width: 10px; height: 10px;"><img style="width: 100%; height: 100%;"
                        src="@/assets/images/icon/icon_acquiesce_sort.png" alt=""></div>
                  </div>
                  <div class="flex ic" style="width: 25%;justify-content: flex-end">
                    <div
                      style=" font-family: PingFang SC;font-size: 12px;font-weight: 400; margin-right: 2px;margin-top: 1px;">
                      最新价</div>
                    <div style="width: 7px; height: 10px; "><img style="width: 100%; height: 100%;"
                        src="@/assets/images/icon/icon_acquiesce_s.png" alt=""></div>

                  </div>
                  <div class="flex" style="width: 25%;justify-content: flex-end">
                    <div class="flex ic" style="justify-content: flex-end">
                      <div
                        style=" font-family: PingFang SC;font-size: 12px;font-weight: 400; margin-right: 2px;margin-top: 1px;">
                        涨跌幅</div>
                      <div style="width: 10px; height: 10px;"><img
                          style="width: 100%; height: 100%;" src="@/assets/images/icon/icon_acquiesce_x.png" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="flex ic" style="width: 25%;justify-content: flex-end">
                    <div
                      style=" font-family: PingFang SC;font-size: 12px;font-weight: 400; margin-right: 2px;margin-top: 1px;">
                      成交额</div>
                    <div style="width: 10px; height: 10px; "><img style="width: 100%; height: 100%;"
                        src="@/assets/images/icon/icon_acquiesce_sort.png" alt=""></div>

                  </div>
                </div>
                <!-- contractL:{
            coinsName:"BTC" -->
                <div v-for="(item, index) in initCoinList" :key="index" class="flex itemCoinList"
                  @click.stop="contractListItem(item)"
                  style="width: 100%; cursor: pointer; height: 30px; display: flex; align-items: center;"
                  >
                  <div class="flex" style="width: 30%;white-space: nowrap; display: flex; align-items: center;">
                    <div style="width: 14px;height: 14px;"><img style="width: 100%; height: 100%;"
                        src="@/assets/images/icon/icon-star-fill.png" alt=""></div>
                    <div
                      style="margin-left: 4px; font-family: PingFang SC;font-size: 12px;font-weight: 500;color: #FFFFFF; ">
                      {{ item.contract.coinsName || '--' }}
                    </div>
                    <div
                      style="margin-left: 2px; font-family: PingFang SC;font-size: 12px;font-weight: 400;color: #B3B3B3;">
                      永续</div>
                    <div style="margin-left: 2px; width: 12px;height: 12px; margin-top: -1px;"><img
                        style="width: 100%; height: 100%;" src="@/assets/images/icon/icon-hot.png" alt=""></div>

                  </div>
                  <div class="flex" style="width: 25%;justify-content: flex-end">
                    <div
                      style="color: #FFFFFF;font-family: PingFang SC;font-size: 13px;font-weight: 600;padding-right: 5px;">
                      {{ formatNumber(item.market.open) || '--' }}
                    </div>
                  </div>
                  <div class="flex" style="width: 25%;justify-content: flex-end">
                    <div
                      style="font-family: PingFang SC;font-size: 13px;font-weight: 600;padding-right: 8px;"
                      :style="{color:item.market.increase24H > 0 ? '#0CBB57' : '#ED3C2F' }"
                      >
                      {{item.market.increase24H || '--' }}%
                    </div>
                  </div>
                  <div class="flex" style="width: 25%;justify-content: flex-end">
                    <div
                      style="color: #FFFFFF;font-family: PingFang SC;font-size: 13px;font-weight: 600;padding-right: 12px;">
                      {{
                        item.market.amount || '--' }}
                    </div>
                  </div>
                </div>
                <div v-if="initCoinList.length <= 0" class="flex jc ic"  style="flex-direction: column;  margin-top: 10px; width: 100%; margin-top: 20px; ">
          <div style="width: 48px; height: 48px;" >
          <img style="width: 100%; height: 100%;" src="@/assets/images/icon/icon_Null_status.png">
          </div>
          <div style="color: #737373;" >数据为空</div>
        </div>

              </div>
 </transition>


</template>

<script>
import { mapGetters,mapState, mapMutations } from "vuex";
import { favoriteApi } from "@/api/quotes";
import { simulateArrayData } from "@/libs/simulateArrayData.js";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 
      symbolInfo:'BTC-USDT', // 交易对
      resolutionInfo:'1MIN',  // 间隔
      contractId: '', // 合约id
      initContractData: {},
      // eslint-disable-next-line vue/no-dupe-keys
      // isShow:true,
      add: {
        profitPrice: null,
        lossPrice: null,
        USDTbond: null,
        BTCBond: null,
        balance: null,
        feeRate: null,  // 手续费
        usdtBtcOpenPrice: 0,
        maintainEarnestMoneyRate: 2,
      },
      selectedTab: 'USDTy', // 默认选中的标签
      currentIndex: 0,
      searchValue: null,
      lessThen: false,
      num: simulateArrayData(),
      labelData: [
        {
          symbol: true,
          prop: "symbol",
          label: this.$t("contract.合约(永续)"),
          width: "130",
        },
        {
          text: true,
          prop: "lastPrice",
          label: this.$t("contract.价格"),
          width: "80",
        },
        {
          gains: true,
          prop: "change",
          label: this.$t("contract.涨跌幅"),
          width: "80",
        },
      ],
      tableHeight: undefined,
      initContractAr: [],
      indexPrice: null,
      increase24H: null,
      volData: null,
      perpetual: false,
      isRotated: false, // 小三角旋转状态
      initCoinList:[],
      queryInfo:null

    };
  },
  mounted() {
  },
  created(){
  },
  computed: {
    ...mapGetters(["getTheme","getInitListInfo"]),

    ...mapState({
      initListInfo: state => state.initListInfo, // 映射 contractList
    }),



    newList: function () {
      return JSON.parse(JSON.stringify(this.list));
    },


  },
  methods: {
    ...mapMutations([
      'setCoinsName',
      'setMultiple',
      'setContractId',
      'setUnit',
      'setSellPriceInfo',   // 实时价格
      'setIndexPrice', // 标记价
      'setIncrease24H',  //今日涨跌幅
      'setFundingRate', //资金费率
      'setHighPrice', //今日最高价
      'setLowestPrice', //今日最低价
      'setVolData', //24h成交量
      'setCoinsId',   // 合约id
      'setPositionList', 
      'setDepthIntervalList' ,//精度列表
      'setPricePrecision' , // 价格精度
      'setAmountPrecision' ,  // 数量精度
      'setInitTime'
    ]), 

    searchCoinItem(event){
      this.queryInfo = event.target.value
      // console.log(event.target.value,,"searchCoinItemsearchCoinItemsearchCoinItem");
     this.initCoinList = this.searchCoins(event.target.value)

    },
    searchCoins(query) {
        // 过滤出匹配的项
        const matchedCoins = this.initCoinList.filter(item => 
            item.contract.coinsName.toLowerCase().includes(query.toLowerCase())
        );

        // 过滤出不匹配的项
        const unmatchedCoins = this.initCoinList.filter(item => 
            !item.contract.coinsName.toLowerCase().includes(query.toLowerCase())
        );

        // 返回匹配的项在前，不匹配的项在后
        return [...matchedCoins, ...unmatchedCoins];
    },


    selectTab(tab) {
      console.log(tab)
      // this.selectedTab = tab; // 切换选中的标签
      // if (tab === 'optional') {
      //   console.log('自选');
      // } else if (tab === 'USDTy') {
      //   this.comUSDT = true
      //   console.log('永续合约');
      // }
    },
    // 点击弹框每一项
    contractListItem(item) {
      
      console.log(item,'contractListItemcontractListItem');
      this.setMultiple(item.contract.multiples)
      this.setContractId(item.contract.id)
      const contractData = item.contract; 
      const marketData = item.market;
      this.setInitTime(marketData.fundingTime)
      this.setCoinsName(contractData.coinsName);
      const depthIntervals = contractData.depthInterval.split(',').map(value => {
          return { name: parseFloat(value) }; // 将字符串转换为数字并创建对象
        });
        console.log(depthIntervals,"depthIntervals"); 
        
      this.setDepthIntervalList(depthIntervals)   // 列表


      this.setPricePrecision(contractData.pricePrecision) // 价格精度
      this.setAmountPrecision(contractData.amountPrecision) // 数量精度




      this.setUnit(contractData.unit);

      this.setSellPriceInfo(marketData.close);
      this.setIndexPrice(marketData.indexPrice);
      this.setIncrease24H(marketData.increase24H);
      this.setCoinsId(contractData.coinsId)
      // this.setFundingRate(contractData.fundingRate);
      // this.setHighPrice(newMarketData.highPrice);
      // this.setLowestPrice(newMarketData.lowestPrice);
      this.setVolData(marketData.vol);
      // this.$parent.isShow = false
      this.$emit("update:isShow", false);
      this.$emit("chooseCoin", item);
      this.$parent.isRotated = !this.$parent.isRotated 

      // this.marketDataSocket(contractData.coinsId)

    },
   


    setPerpetualFalse() {
      // this.$refs.component9.openDialog();
      this.perpetual = false,
      this.isRotated = false
    },



    formatNumber(num) {
      // 将数字转换为字符串
      const [integerPart, decimalPart] = num.toString().split(".");
      // 使用正则表达式添加千分位
      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // 如果有小数部分，返回格式化后的整数部分和小数部分
      return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    },
    // 


    changeTab(id) {
      this.currentIndex = id;
      this.searchValue = null;
      this.$emit("changeTab", id);
    },
    emptyValue() {
      this.searchValue = null;
      this.toSearch();
    },
    toSearch() {
      this.$emit("toSearch", this.searchValue);
    },
    // chooseCoin(item) {
    //   this.$emit("update:isShow", false);
    //   this.$emit("chooseCoin", item);
    //   console.log(item,'item--------------------0000000');
      
    //   const contractData = item.contract; 
    //   const marketData = item.market;
    //   this.setCoinsName(contractData.coinsName);
    //   this.setSellPriceInfo(marketData.close);
    //   this.setIndexPrice(marketData.indexPrice);
    //   this.setIncrease24H(marketData.increase24H);
    //   this.setCoinsId(contractData.coinsId)
    //   // this.setFundingRate(contractData.fundingRate);
    //   // this.setHighPrice(newMarketData.highPrice);
    //   // this.setLowestPrice(newMarketData.lowestPrice);
    //   this.setVolData(marketData.vol);
    //   this.$parent.isShow = false
    //   this.$parent.isRotated = !this.$parent.isRotated 

    // },
    onCollection(item) {
      if (!this.$store.state.login.token) {
        this.$router.push({
          path: "/login",
          query: { redirect: "/contractTransaction" },
        });
        return;
      }
      let params = {
        symbolId: item.symbolId,
        enable: !item.favorite,
      };
      favoriteApi(params).then((res) => {
        if (res.data.success) {
          this.changeTab(this.currentIndex);
          this.$store.commit("setCollectionState", true);
        }
      });
    },
    compare(newData, oldData) {
      newData.forEach((item) => {
        oldData.forEach((ele) => {
          if (item.symbolId == ele.symbolId) {
            if (item.lastPrice - ele.lastPrice > 0) {
              this.lessThen = false;
            } else {
              this.lessThen = true;
            }
          }
        });
      });
    },
    getContentSize() {
      let contentBox = document.querySelector("#contentBox");
      if (contentBox) {
        
        this.tableHeight = contentBox.clientHeight;
      }
    },
  },
  watch: {
    isShow: {
      handler(value) {
        if (value) {
          this.$nextTick(() => {
            this.getContentSize();
          });
        }
      },
    },
    // getInitListInfo(newList){

    //   this.initCoinList = newList
      
      
    // }

    getInitListInfo: {
      handler(newList) {
        // 处理新列表
        this.initCoinList = newList
      },
      immediate: true // 在初始化时立即执行 handler
    }




  },
  
  filters: {
    changeFilter(val) {
      if (val < 0) {
        return `${val}%`;
      } else if (val == 0 || val == undefined || val == null) {
        return 0;
      } else {
        return `+${val}%`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>


.handTop {
  top:67px;
}
.itemCoinList:hover {
  background-color: #363636;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-leave {
  opacity: 1;
}
.coinTypePopup {
  position: absolute;
  top: 45px;
  left: 0px;
  width: 480px;
  height: 450px;
  padding: 20px 0px 0px;
  margin-right: 0px !important;
  background-color: var(--pop-bg);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  z-index: 999;
  &.dark {
    box-shadow: none;
    .searchBox {
      background-color: var(--main-bg);
      input {
        background-color: var(--main-bg);
      }
    }
  }
  .searchBox {
    position: relative;
    display: flex;
    align-items: center;
    height: 35px;
    background-color: #f8f9fb;
    border-radius: 6px;
    padding-left: 10px;
    padding-right: 40px;
    margin: 0 20px;
    input {
      flex: 1;
      font-size: 14px;
      color: #8992a6;
      margin-left: 8px;
      border: none;
      outline: none;
      background-color: #f8f9fb;
    }
    // &.dark {
    //   background-color: var(--main-bg);

    //   input {
    //     background-color: var(--main-bg);
    //   }
    // }
    .icon-search {
      font-size: 20px;
    }
    .delete {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      font-size: 22px;
      cursor: pointer;
    }
  }
  .tab {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #96a2b2;
    margin: 20px 20px 0px;
    cursor: pointer;
    .item {
      margin-right: 20px;
      font-weight: bold;
      &.active {
        color: var(--main-text-color);
      }
    }
  }
  #contentBox {
    height: 325px;
    margin-top: 20px;
    .content {
      height: 100%;
      background-color: var(--pop-bg);

      .cell {
        display: flex;
        align-items: center;
        &.price {
          padding-left: 0px !important;

          span {
            color: var(--main-text-color);
            &.up {
              color: #90ff00;
            }
            &.down {
              color: #f75f52;
            }
          }
        }
        .iconfont {
          color: #d4d4d4;
          position: relative;
          .mask {
            position: absolute;
            top: 50%;
            left: -10px;
            transform: translateY(-50%);
            width: 30px;
            height: 30px;
            // background-color: rgba($color: #000000, $alpha: 0.3);
            cursor: pointer;
          }
          &.favorite {
            color: #fccf0a;
          }
        }
        span {
          // font-weight: 700;
          color: var(--main-text-color);
        }
      }

      .empty {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 50px;
        .txt {
          font-size: 12px;
          color: #96a2b2;
          margin-top: 5px;
        }
      }
    }
  }
}
.subsidy {
  background: #edad15;
  color: #fff !important;
  border-radius: 4px;
  font-size: 14px;
  display: inline-block;
  padding: 0 2px;
  margin-left: 3px;
}
::v-deep .el-table {
  &::before {
    height: 0px;
  }
  background-color: var(--pop-bg);

  .el-table__row > td {
    border: none;
  }
  thead tr {
    th {
      background-color: var(--pop-bg);
    }
    th.is-leaf {
      border: 0px solid #ebeef5;
      font-size: 12px;
      border-right: none;
      color: #96a2b2;
      &:first-child {
        padding-left: 15px;
      }
    }
  }

  tbody tr {
    background-color: var(--pop-bg);
  }
}
::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  background-color: var(--pop-bg);
}
::v-deep .el-table__body-wrapper {
  background-color: var(--pop-bg);
}
::v-deep .el-table__body-wrapper::-webkit-scrollbar-track-piece {
  background-color: var(--select-bg);
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: var(--pop-hover-bg);
}
</style>
