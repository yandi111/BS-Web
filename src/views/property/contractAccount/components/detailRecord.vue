<template>
  <div>
    <div class="detail-record" v-if="tabsIndex === 1">
      <div class="detail-title">
        <i class="el-icon-arrow-left" @click="back"></i>
        <span @click="back">{{$t('property.合约明细')}}</span>
      </div>
      <div class="container">
        <el-tabs v-model="activeName" @tab-click="changeTabs">
          <el-tab-pane :label="$t('property.当前委托')" name="first">
            <contract-account-table
              v-if="activeName === 'first'"
              :columnData="currentCommissionData"
              :tableData="priceLimitData"
              :typeList="typeList"
              :closeTypeList="closeTypeList"
              :currentParams="currentCommissionParams"
              :symbolList="symbolList"
              :total="entrustTotal"
              :page.sync="currentCommissionParams.pageNum"
              :limit.sync="currentCommissionParams.pageSize"
              @pagination="getEntrustList"
              @onTypeChange="currentCommissionChange"
              @symbolChange="entrustSymbolChange"
              @directionChange="directionChange"
            ></contract-account-table>
          </el-tab-pane>
          <el-tab-pane :label="$t('property.历史委托')" name="second">
            <contract-account-table
              v-if="activeName === 'second'"
              :columnData="historyCommissionData"
              :tableData="historyData"
              :typeList="typeList"
              :closeTypeList="closeTypeList"
              :currentParams="historyParams"
              :symbolList="symbolList"
              :historyShow="true"
              :isOrderType="true"
              :total="historyTotal"
              :page.sync="historyParams.pageNum"
              :limit.sync="historyParams.pageSize"
              @symbolChange="historysymbolChange"
              @onTypeChange="historyCommissionChange"
              @directionChange="historyDirectionChange"
              @pagination="gethistoryList"
              @onChangeDate="historyCommissionChangeDate"
            ></contract-account-table>
          </el-tab-pane>
          <el-tab-pane :label="$t('property.历史仓位')" name="third">
            <contract-account-table
              v-if="activeName === 'third'"
              :columnData="entrustDetailRecordData"
              :tableData="entrustDetailRecordList"
              :currentParams="entrustParams"
              :symbolList="symbolList"
              :closeTypeList="entrustTypeList"
              :historyShow="true"
              :typeShow="false"
              :total="positionTotal"
              :page.sync="entrustParams.pageNum"
              :limit.sync="entrustParams.pageSize"
              @symbolChange="positionSymbolChange"
              @directionChange="entrustDirectionChange"
              @onChangeDate="historyPositionChangeDate"
              @pagination="getEntrustDetailRecord"
            ></contract-account-table>
          </el-tab-pane>
          <el-tab-pane :label="$t('property.合约账单')" name="fourth">
            <contract-account-table
              v-if="activeName === 'fourth'"
              :columnData="flowRecordData"
              :tableData="billHistoryData"
              :currentParams="billHistoryParams"
              :symbolList="symbolList"
              :closeTypeList="billTypeList"
              :historyShow="true"
              :typeShow="false"
              :contractTypeShow="true"
              :total="flowTotal"
              :page.sync="billHistoryParams.pageNum"
              :limit.sync="billHistoryParams.pageSize"
              @symbolChange="billSymbolChange"
              @directionChange="billDirectionChange"
              @pagination="getBillHistory"
              @onChangeDate="billChangeDate"
            ></contract-account-table
          ></el-tab-pane>
        </el-tabs>
      </div>
      <!-- 止盈、止损弹窗 -->
      <contract-dialog
        :is-show.sync="dialogShow"
        :setupData="setupData"
      ></contract-dialog>
      <!-- 撤销委托弹窗 -->
      <success-modal
        :is-show.sync="successShow"
        :btnText="$t('property.确定')"
        :text="$t('property.撤销成功')"
        @next="sureSuccess"
      ></success-modal>
      <!-- 历史委托详情弹窗 -->
      <common-modal
        :title="$t('property.委托明细')"
        width="800px"
        :show="isShow"
        :noFooter="true"
        :showClose="true"
        @cancel="isShow = false"
      >
        <template #dia_content>
          <div class="detail">
            <div class="detail-left">{{$t('property.订单')}}</div>
            <div>{{ commissionDetails.entrustNo }}</div>
          </div>
          <div class="detail">
            <div class="detail-left">{{$t('property.方向 | 杠杆')}}</div>
            <div>
              <span v-if="commissionDetails.directType === 1">{{$t('property.开多')}}</span>
              <span v-if="commissionDetails.directType === 2">{{
                commissionDetails.closePositionsType === 1 ? $t('property.强平平多') : $t('property.平多')
              }}</span>
              <span v-if="commissionDetails.directType === 3">{{$t('property.开空')}}</span>
              <span v-if="commissionDetails.directType === 4">{{
                commissionDetails.closePositionsType === 1 ? $t('property.强平平空') : $t('property.平空')
              }}</span>
              <span class="pad">|</span>
              <span>{{ commissionDetails.leverTimes }}X</span>
            </div>
          </div>
          <div class="detail">
            <div class="detail-left">{{$t('property.模式')}}</div>
            <div v-if="commissionDetails.positionType === 0">{{$t('property.全仓')}}</div>
            <div v-if="commissionDetails.positionType === 1">{{$t('property.逐仓')}}</div>
          </div>
          <div class="detail">
            <div class="detail-left">{{$t('property.类型')}}</div>
            <div v-if="commissionDetails.entrustType === 1">{{$t('property.限价委托')}}</div>
            <div v-if="commissionDetails.entrustType === 2">{{$t('property.市价委托')}}</div>
            <div v-if="commissionDetails.entrustType === 3">{{$t('property.市价止盈')}}</div>
            <div v-if="commissionDetails.entrustType === 4">{{$t('property.市价止损')}}</div>
            <div v-if="commissionDetails.entrustType === 5">{{$t('property.计划委托')}}</div>
          </div>
          <div class="detail">
            <div class="detail-left">{{$t('property.委托状态')}}</div>
            <div v-if="commissionDetails.status === 0">{{$t('property.待交易')}}</div>
            <div v-if="commissionDetails.status === 1">{{$t('property.完全成交')}}</div>
            <div v-if="commissionDetails.status === 2">{{$t('property.部分成交')}}</div>
            <div v-if="commissionDetails.status === 3">{{$t('property.撤销中')}}</div>
            <div v-if="commissionDetails.status === 4">{{$t('property.撤销成功')}}</div>
          </div>
          <div class="detail" v-if="commissionDetails.triggerPrice">
            <div class="detail-left">{{$t('property.触发价')}}</div>
            <div>{{ commissionDetails.triggerPrice }}</div>
          </div>
          <div class="detail" v-if="commissionDetails.strongClosePrice">
            <div class="detail-left">{{$t('contract.强平价格')}}</div>
            <div>{{ commissionDetails.strongClosePrice }}</div>
          </div>
          <div class="detail" v-else>
            <div class="detail-left">{{$t('property.委托价格')}}</div>
            <div>
              {{
                commissionDetails.entrustPrice
                  ? commissionDetails.entrustPrice
                  : $t('property.最优市价')
              }}
            </div>
          </div>
          <div class="detail" v-if="commissionDetails.strongCloseAmount">
            <div class="detail-left">{{$t('contract.强平数量')}}</div>
            <div>{{ commissionDetails.strongCloseAmount }}</div>
          </div>
          <div class="detail" v-else>
            <div class="detail-left">{{$t('property.成交数量｜委托数量')}}</div>
            <div>
              <span>{{ commissionDetails.dealAmount }}</span>
              <span class="pad">|</span>
              <span>{{ commissionDetails.entrustAmount }}</span>
            </div>
          </div>
          <div class="detail" v-if="commissionDetails.status != 4">
            <div class="detail-left">{{$t('property.手续费')}}</div>
            <div>{{ commissionDetails.handlingFee }} USDT</div>
          </div>
          <div class="detail" v-if="commissionDetails.strongClosePrice">
            <div class="detail-left">{{$t('property.平仓盈亏')}}</div>
            <div>{{ commissionDetails.realizedProfitLoss }}</div>
          </div>
          <div class="detail" v-if="commissionDetails.status != 4">
            <div class="detail-left">{{$t('property.保证金')}}</div>
            <div>{{ commissionDetails.entrustDeposit }} USDT</div>
          </div>
          <div class="detail">
            <div class="detail-left">{{$t('property.委托时间')}}</div>
            <div>{{ parseTime(commissionDetails.entrustTime) }}</div>
          </div>
          <div class="detail">
            <div class="detail-left">
              {{ commissionDetails.status === 4 ? $t('property.撤销时间') : $t('property.成交时间') }}
            </div>
            <div>
              {{
                commissionDetails.status === 4
                  ? parseTime(commissionDetails.cancelTimeTsLong)
                  : parseTime(commissionDetails.dealTimeTsLong)
              }}
            </div>
          </div>
          <div
            class="leveling"
            v-if="commissionDetails.closePositionsType === 1"
          >
            <div class="leveling-border"></div>
            <div>
              <span class="leveling-title">{{$t('property.强平详情')}}</span>
              <span class="leveling-time">{{
                parseTime(commissionDetails.entrustTimeTsLong)
              }}</span>
            </div>
            <div class="leveling-text">
              {{
                $t("contract.X永续的标记价格到达X时,您的XX仓位的保证金率小于或等于100%，强制平仓将被触发。仓位按照标记价格X被强平引擎接管", [
                  commissionDetails.coinMarket,
                  commissionDetails.strongClosePrice,
                  commissionDetails.coinMarket,
                  direction,
                ])
              }}
            </div>
            <div >
             <span class="leveling-more">
               <span @click="(_) => $router.push('/forcedLiquidation')"
                >{{$t('property.关于强平')}}<i class="iconfont icon-more1 ml10"></i
              ></span>
             </span>
            </div>
          </div>
        </template>
      </common-modal>
    </div>
    <!-- 历史仓位成交明细页面 -->
    <div v-if="tabsIndex === 2">
      <TransactionDetail
        :detail.sync="historyListDetail"
        @back="transactionDetailsBack"
      />
    </div>
    <!-- 查看弹窗 -->
    <contract-dialog
      :isShow.sync="showCheck"
      :data="checkData"
    ></contract-dialog>
  </div>
</template>

<script>
import ContractAccountTable from "./contractAccountTable.vue";
import ContractDialog from "./contractDialog.vue";
import SuccessModal from "@/components/successModal.vue";
import TransactionDetail from "./transactionDetails.vue";
import {
  entrustListApi,
  symbolListApi,
  historyApi,
  positionHistoryApi,
  billHistoryApi,
  cancelTrustApi,
  entrustDetialApi,
  positionDetailApi,
  profitLossDetial,
} from "@/api/contractTransaction";
export default {
  name: "DetailRecord",
  components: {
    ContractAccountTable,
    ContractDialog,
    SuccessModal,
    TransactionDetail,
  },
  props: {
    index: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      dialogShow: false,
      successShow: false,
      isShow: false,
      showCheck: false,
      tabsIndex: 1, //控制成交明细页面
      activeName: "first",
      tableData: [],
      //当前委托、历史委托类型筛选
      typeList: [
        {
          value: null,
          label: this.$t('property.全部'),
        },
        {
          value: 1,
          label: this.$t('property.限价委托'),
        },
        {
          value: 2,
          label: this.$t('property.市价委托'),
        },
        {
          value: 3,
          label: this.$t('property.市价止盈'),
        },
        {
          value: 4,
          label: this.$t('property.市价止损'),
        },
        {
          value: 5,
          label: this.$t('property.计划委托'),
        },
      ],
      //合约类型筛选
      billTypeList: [
        {
          value: null,
          label: this.$t('property.全部'),
        },
        {
          value: 1,
          label: this.$t('property.开多'),
        },
        {
          value: 2,
          label: this.$t('property.开空'),
        },
        {
          value: 3,
          label: this.$t('property.平多'),
        },
        {
          value: 4,
          label: this.$t('property.平空'),
        },
        {
          value: 5,
          label: this.$t('property.强平平多'),
        },
        {
          value: 6,
          label: this.$t('property.强平平空'),
        },
        {
          value: 7,
          label: this.$t('property.现货账户转入'),
        },
        {
          value: 8,
          label: this.$t('property.资金账户转入'),
        },
        {
          value: 9,
          label: this.$t('property.转出现货账户'),
        },
        {
          value: 10,
          label: this.$t('property.转出资金账户'),
        },
        {
          value: 11,
          label: this.$t('property.资金费用'),
        },
        {
          value: 12,
          label: this.$t('property.跟单账户划入'),
        },
        {
          value: 13,
          label: this.$t('property.划出跟单账户'),
        },
         {
          value: 17,
          label: this.$t('property.KYC认证赠金'),
        },
      ],
      //当前委托、历史委托方向筛选
      closeTypeList: [
        {
          value: null,
          label: this.$t('property.全部'),
        },
        {
          value: 1,
          label: this.$t('property.开多'),
        },
        {
          value: 2,
          label: this.$t('property.平多'),
        },
        {
          value: 3,
          label: this.$t('property.开空'),
        },
        {
          value: 4,
          label: this.$t('property.平空'),
        },
      ],
      entrustTypeList: [
        {
          value: null,
          label: this.$t('property.全部'),
        },
        {
          value: 1,
          label: this.$t('property.开多'),
        },
        {
          value: 2,
          label: this.$t('property.开空'),
        },
      ],
      //历史委托参数
      historyParams: {
        coinId: null,
        type: null,
        orderType: null,
        coinMarket: null,
        directType: null,
        status: null,
        startTime: null,
        endTime: null,
        pageNum: 1,
        pageSize: 10,
      },
      //当前委托
      currentCommissionData: [
        {
          isTimeType: true,
          // prop: "createTime",
          label: this.$t('property.时间'),
          width: "100",
        },
        {
          currentMarketType: true,
          prop: "coinMarket",
          label: this.$t('property.合约'),
          width: "150",
        },
        {
          currentCommissionType: true,
          // prop: "priceType",
          label: this.$t('property.类型'),
          width: "100",
        },
        {
          currentType: true,
          // prop: "type", //委托方向type：1买, 2卖 杠杆：leverTimes
          label: this.$t('property.方向 | 杠杆'),
          width: "100",
        },
        {
          isAmountType: true,
          // prop: "", //委托数量entrustAmount、成交数量dealAmount
          label: this.$t('property.委托数量 | 成交数量'),
          width: "150",
        },
        {
          entrustPriceType: true,
          prop: "entrustPrice",
          label: this.$t('property.委托价格'),
          width: "130",
        },
        {
          triggerType: true,
          prop: "triggerPrice",
          label: this.$t('property.触发价'),
          width: "",
        },
        {
          isStatusType: true,
          // prop: "status",
          label: this.$t('property.订单状态'),
          width: "120",
        },
        {
          currentPLType: true,
          text: true,
          // prop: "isStop",
          label: this.$t('property.止盈 | 止损'),
          width: "150",
        },
        {
          isOperation: true,
          label: this.$t('property.操作'),
          width: "100",
          operation: [
            {
              type: "check",
              label: this.$t('contract.查看'),
              buttonClick: this.handleCheck,
              isShow: (row) => {
                // return row.profitTriggerPrice || row.lossTriggerPrice
                //   ? true
                //   : false;
                return true;
              },
            },
            {
              type: "undo",
              label: this.$t('contract.撤销委托'),
              buttonClick: this.revokeDelegation,
              isShow: (row) => {
                return true;
              },
            },
          ],
        },
      ],
      // 历史委托
      historyCommissionData: [
        {
          isTimeType: true,
          // prop: "createTime",
          label: this.$t('property.时间'),
          width: "150",
        },
        {
          historyMarketType: true,
          prop: "coinMarket",
          label: this.$t('property.合约'),
          width: "120",
        },
        {
          isPriceType: true,
          // prop: "priceType",
          label: this.$t('property.类型'),
          width: "100",
        },
        {
          historyType: true,
          prop: "type",
          label: this.$t('property.方向 | 杠杆'),
          width: "100",
        },
        {
          isAmountType: true,
          prop: "", //entrustAmount dealAmount
          label: this.$t('property.委托数量 | 成交数量'),
          width: "150",
        },
        {
          historyPriceType: true,
          prop: "entrustPrice",
          label: this.$t('property.委托价格'),
          width: "100",
        },
        {
          isStatusType: true,
          // prop: "status",
          label: this.$t('property.订单状态'),
          width: "100",
        },
        {
          isOperation: true,
          label: this.$t('property.操作'),
          width: "150",
          operation: [
            {
              type: "text",
              label: this.$t('property.委托明细'),
              buttonClick: this.historyDetail,
              isShow: (row) => {
                return true;
              },
            },
          ],
        },
      ],
      //历史仓位
      entrustDetailRecordData: [
        {
          lastTimeType: true,
          label: this.$t('property.开仓时间'),
          width: "100",
        },
        {
          entrustMarketType: true,
          prop: "coinMarket",
          label: this.$t('property.合约'),
          width: "100",
        },
        {
          isdirectionType: true,
          label: this.$t('property.方向 | 杠杆'),
          width: "100",
        },
        {
          text: true,
          prop: "positionAveragePrice",
          label: this.$t('property.开仓价格'),
          width: "100",
        },
        {
          text: true,
          prop: "closeAveragePrice",
          label: this.$t('property.平仓均价'),
          width: "",
        },
        {
          text: true,
          prop: "maxPositionAmount",
          label: this.$t('property.最大持仓量'),
          width: "",
        },
        {
          text: true,
          prop: "closedAmount",
          label: this.$t('property.已平仓量'),
          width: "",
        },
        {
          realizedProfitLossType: true,
          prop: "realizedProfitLoss",
          label: this.$t('property.平仓盈亏'),
          width: "",
        },
         {
          statusType: true,
          prop: "status",
          label: this.$t('property.状态'),
          width: "",
        },
         {
          closePositionTimeType: true,
          prop: "closePositionTimeTsLong",
          label: this.$t('property.平仓时间'),
          width: "150",
        },
        {
          isOperation: true,
          label: this.$t('property.操作'),
          width: "100",
          operation: [
            {
              type: "text",
              label: this.$t('property.成交明细'),
              buttonClick: this.historicalTransactionDetail,
              isShow: (row) => {
                return true;
              },
            },
          ],
        },
      ],
      flowRecordData: [
        {
          isTimeType: true,
          // prop: "", //时间待确认
          label: this.$t('property.时间'),
          width: "",
        },
        // {
        //   isKycLevel: true,
        //   prop: "kycLevel",
        //   label: this.$t('property.KYC等级'),
        //   width: "",
        // },
        {
          isCoinMarket: true,
          prop: "coinMarket",
          label: this.$t('property.合约'),
          width: "",
        },
        {
          text: true,
          prop: "coinName",
          label: this.$t('property.资产总类'),
          width: "",
        },
        {
          contractType: true,
          label: this.$t('property.类型'),
          width: "",
        },
        {
          lossType: true,
          prop: "closeProfitOrLoss",
          label: this.$t('property.收益'),
          width: "",
        },
        {
          feeType: true,
          // prop: "amount",
          label: this.$t('property.手续费'),
          width: "",
        },
        // {
        //   amountType: true,
        //   prop: "amount",
        //   label: this.$t('property.总额'),
        //   width: "",
        // },
      ],
      //接口参数
      symbolList: [], //交易对列表
      //当前委托参数
      currentCommissionParams: {
        coinId: null,
        orderType: null,
        coinMarket: null,
        directType: null,
        type: null,
        pageNum: 1,
        pageSize: 10,
      },
      //限价委托数据
      priceLimitData: [],
      //历史成交
      transactionPrams: {
        pageNum: 0,
        pageSize: 10,
        coinMarket: "", //交易对名字，可选项，不填查所有交易对
      },
      entrustDetailRecordList: [],
      //历史仓位参数
      entrustParams: {
        coinMarket: null,
        positionDirection: null,
        type: null,
        startTime: null,
        endTime: null,
        pageNum: 1,
        pageSize: 10,
      },
      //历史委托数据
      historyData: [],
      //合约账单数据
      billHistoryParams: {
        coinMarket: null,
        type: null,
        startTime: null,
        endTime: null,
        pageNum: 1,
        pageSize: 10,
      },
      billHistoryData: [],
      entrustTotal: 0, //当前委托总数
      flowTotal: 0, //合约账单总数
      historyTotal: 0, //历史委托总数
      positionTotal: 0, //历史仓位总数
      commissionDetails: {}, //历史委托明细
      historyListDetail: {}, //历史仓位明细
      setupData: {}, //设置止盈止损数据详情
      checkData: {}, //查看止盈止损
    };
  },
  watch: {
    priceLimitData(newVal, oldVal) {
      this.priceLimitData = newVal;
    },
    index: {
      handler(index) {
        let tabs = {
          1: "second",
          2: "third",
          3: "fourth",
        };
        this.activeName = tabs[index] || "first";
        this.changeTabs(index);
      },
      immediate: true,
    },
  },
  computed: {
    direction() {
      let directType =
        this.commissionDetails.positionDirection == 1 ||
        this.commissionDetails.positionDirection == 2
          ? this.$t("contract.多仓")
          : this.$t("contract.空仓");
      let text = `${this.$t("lang_795")}-${directType}-${
        this.commissionDetails.leverTimes
      }X`;
      return text;
    },
  },
  mounted() {
    this.getSymbolList();
  },
  methods: {
    changeTabs(tab) {
      let index = tab.index ? tab.index : tab + "";
      let funObj = {
        0: () => this.getEntrustList(),
        1: () => this.gethistoryList(),
        2: () => this.getEntrustDetailRecord(),
        3: () => this.getBillHistory(),
        run: (fn) => fn && fn(),
      };
      funObj.run(funObj[index]);
    },
    back() {
      this.$emit("onBack");
    },
    //获取交易对列表
    getSymbolList() {
      symbolListApi().then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.symbolList = res.data.data;
            this.symbolList.unshift({
              id: null,
              symbolCode: this.$t('property.全部'),
              allId: 'allId'
            });
          }
        }
      });
    },
    //当前委托
    getEntrustList() {
      entrustListApi(this.currentCommissionParams).then((res) => {
        console.log("prompt", res.data);
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.priceLimitData = res.data.data.records;
            this.entrustTotal = res.data?.data?.total;
          }
        }
      });
    },
    //历史委托
    gethistoryList() {
      console.log("prompt", "parameter");
      historyApi(this.historyParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.historyData = res.data.data.records;
            this.historyTotal = res.data?.data?.total;
          }
        }
      });
    },
    //历史仓位
    getEntrustDetailRecord() {
      positionHistoryApi(this.entrustParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.entrustDetailRecordList = res.data.data.records || [];
            this.positionTotal = res.data?.data?.total;
          }
        }
      });
    },
    //合约账单
    getBillHistory() {
      billHistoryApi(this.billHistoryParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.billHistoryData = res.data.data.records || [];
            this.flowTotal = res.data?.data?.total;
          }
        }
      });
    },
    //当前委托筛选类型
    currentCommissionChange(e) {
      this.currentCommissionParams.orderType = e;
      this.getEntrustList();
    },
    //历史委托筛选类型
    historyCommissionChange(e) {
      this.historyParams.orderType = e;
      this.gethistoryList();
    },
    entrustSymbolChange(e) {
      this.symbolList.forEach((item) => {
        if (item.id === e && item.allId === "allId") {
          this.currentCommissionParams.coinMarket = null;
          this.getEntrustList();
        } else if (item.id === e && item.allId !== "allId") {
          this.currentCommissionParams.coinMarket = item.symbolCode;
          this.getEntrustList();
        }
      });
    },
    //历史委托合约选择
    historysymbolChange(e) {
      this.symbolList.forEach((item) => {
        if (item.id === e && item.allId === "allId") {
          this.historyParams.coinMarket = null;
          this.gethistoryList();
        } else if (item.id === e && item.allId !== "allId") {
          this.historyParams.coinMarket = item.symbolCode;
          this.gethistoryList();
        }
      });
    },
    //历史仓位合约选择
    positionSymbolChange(e) {
      this.symbolList.forEach((item) => {
        if (item.id === e && item.allId === "allId") {
          this.entrustParams.coinMarket = null;
          this.getEntrustDetailRecord();
        } else if (item.id === e && item.allId !== "allId") {
          this.entrustParams.coinMarket = item.symbolCode;
          this.getEntrustDetailRecord();
        }
      });
    },
    //合约账单合约选择
    billSymbolChange(e) {
      this.symbolList.forEach((item) => {
        if (item.id === e && item.allId === "allId") {
          this.billHistoryParams.coinMarket = null;
          this.getBillHistory();
        } else if (item.id === e && item.allId !== "allId") {
          this.billHistoryParams.coinMarket = item.symbolCode;
          this.getBillHistory();
        }
      });
    },

    directionChange(e) {
      this.currentCommissionParams.directType = e;
      this.getEntrustList();
    },
    //历史委托方向选择
    historyDirectionChange(e) {
      this.historyParams.directType = e;
      this.gethistoryList();
    },
    //历史仓位方向选择
    entrustDirectionChange(e) {
      this.entrustParams.positionDirection = e;
      this.getEntrustDetailRecord();
    },
    //合约账单类型选择
    billDirectionChange(e) {
      this.billHistoryParams.type = e;
      this.getBillHistory();
    },

    //历史委托日期选择
    historyCommissionChangeDate(data) {
      if (data && data.length > 0) {
        this.historyParams.startTime = data[0].getTime();
        this.historyParams.endTime = data[1].getTime();
      } else {
        this.historyParams.startTime = null;
        this.historyParams.endTime = null;
      }
      this.gethistoryList();
    },
    // 历史仓位日期选择
    historyPositionChangeDate(data) {
      if (data && data.length > 0) {
        this.entrustParams.startTime = data[0].getTime();
        this.entrustParams.endTime = data[1].getTime();
      } else {
        this.entrustParams.startTime = null;
        this.entrustParams.endTime = null;
      }
      this.getEntrustDetailRecord();
    },
    // 合约账单日期选择
    billChangeDate(data) {
      if (data && data.length > 0) {
        this.billHistoryParams.startTime = data[0].getTime();
        this.billHistoryParams.endTime = data[1].getTime();
      } else {
        this.billHistoryParams.startTime = null;
        this.billHistoryParams.endTime = null;
      }
      this.getBillHistory();
    },

    //调整止盈 | 止损明细
    handleCheck(row) {
      if (!row.profitTriggerPrice) return;
      profitLossDetial({
        orderNo: row.entrustNo,
        entrustType: row.entrustType,
      }).then((res) => {
        if (res.status === 200) {
          this.checkData = Object.assign({}, res.data.data, {
            entrustNo: row.entrustNo,
          });
          this.showCheck = true;
        }
      });
    },
    //撤销委托
    revokeDelegation(row) {
      //委托单号entrustNo  orderType：1，限价委托， 2，市价委托， 3 计划委托
      const entrustNos = {
        entrustNos: [
          {
            entrustNo: row.entrustNo,
            orderType: row.entrustType,
          },
        ],
      };
      cancelTrustApi(entrustNos).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            //撤销当前委托单
            this.getEntrustList();
            this.successShow = true;
          }
        }
      });
    },
    sureSuccess() {
      this.successShow = false;
    },
    //历史委托详情
    historyDetail(row) {
      entrustDetialApi({
        orderNo: row.entrustNo,
        entrustType: row.entrustType,
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.commissionDetails = res.data.data;
            this.isShow = true;
          }
        }
      });
    },
    //历史成交详情
    historicalTransactionDetail(row) {
      positionDetailApi({ positionId: row.positionId }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.historyListDetail = res.data.data;
            this.tabsIndex = 2;
          }
        }
      });
    },
    transactionDetailsBack() {
      this.tabsIndex = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-record {
  // border-radius: 15px;
  background: #ffffff;
  color: #333333;
  .detail-title {
    padding: 20px 0 20px 70px;
    background: #f5f7fa;
    .el-icon-arrow-left {
      padding-right: 20px;
      font-size: 24px;
      cursor: pointer;
    }
    span {
      font-size: 32px;
      cursor: pointer;
    }
  }
  .container {
    margin-top: 30px;
    ::v-deep .el-tabs__item {
      padding: 6px 0 0 70px;
      line-height: 20px;
      font-size: 24px;
      font-weight: 500;
      color: #8992a6;
    }
    ::v-deep .el-tabs__item.is-active {
      color: #333333;
    }
    ::v-deep .el-tabs__nav-wrap::after {
      height: 1px;
      background-color: #f4f5f7;
    }
  }
  .detail {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    margin: 0 30px;
    font-size: 16px;
    color: #333;
    .detail-left {
      width: 50%;
      color: #8992a6;
    }
  }
  .leveling {
    padding: 0 30px;
    font-size: 16px;
    .leveling-border {
      border-bottom: 1px solid #f5f5f5;
      margin: 10px 0;
    }
    .leveling-title {
      color: #00082d;
    }
    .leveling-time {
      font-size: 12px;
      color: #999;
      padding-left: 10px;
    }
    .leveling-text {
      font-size: 14px;
      color: #999;
      margin-top: 10px;
    }
    .leveling-more {
      color: #90ff00;
      padding-top: 15px;
      cursor: pointer;
    }
  }
  .pad {
    padding: 0 5px;
  }
}
</style>
