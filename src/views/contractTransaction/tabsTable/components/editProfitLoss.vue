<!-- 编辑调整止盈止损 -->
<template>
  <div>
    <my-modal
      :is-show.sync="isShow"
      useTheme
      :title="title"
      @close="handleCancel"
    >
      <template slot="content">
        <div class="content">
          <div class="pirceInfo" v-if="setAdjust">
            <p>
              <span class="label">{{ "contract.合约F" | translate }}</span>
              <span
                class="value down"
                :class="{ up: data.positionDirection != 1 }"
                >{{ data.coinMarket }} {{ "lang_1059" | translate
                }}{{
                  data.positionDirection == 1
                    ? "contract.空"
                    : "contract.多" | translate
                }}{{ data.leverTimes }}X</span
              >
            </p>
            <p>
              <span class="label">{{ "contract.开仓价格" | translate }}</span>
              <span class="value">{{ data.createPositionPrice }} USDT</span>
            </p>
            <p>
              <span class="label">{{ "contract.标记价格" | translate }}</span>
              <span class="value">{{ data.indexPrice }} USDT</span>
            </p>
            <p>
              <span class="label">{{ "contract.预估强平价" | translate }}</span>
              <span class="value">{{ data.strongPrice }} USDT</span>
            </p>
            <p class="tip">
              {{
                $t(
                  "contract.由于行情变动快，止损触发价不宜离预估强平价过近，避免触发失败"
                )
              }}
            </p>
          </div>
          <div class="pirceInfo" v-else>
            <p>
              <span class="label">{{ "contract.合约" | translate }}</span>
              <span class="value">{{ data.coinMarket.replace("/", "") }}</span>
            </p>
            <p>
              <span class="label">{{ "contract.止盈触发价" | translate }}</span>
              <span class="value">
                <span>
                  {{ "contract.最新价格" | translate }}
                  {{ data.positionDirection == 1 ? "<=" : ">=" }}</span
                >
                <span> {{ profit ? profit : "- -" }}</span>
                USDT</span
              >
            </p>
            <p>
              <span class="label">{{ "contract.预期盈亏" | translate }}</span>
              <span class="value" :class="profitvalue > 0 ? 'up' : 'down'">
                {{ profitvalue }}
                USDT</span
              >
            </p>
            <p>
              <span class="label">{{ "contract.止损触发价" | translate }}</span>
              <span class="value">
                <span>
                  {{ "contract.最新价格" | translate }}
                  {{ data.positionDirection == 1 ? ">=" : "<=" }}</span
                >
                <span> {{ loss ? loss : "- -" }}</span>

                USDT</span
              >
            </p>
            <p>
              <span class="label">{{ "contract.预期盈亏" | translate }}</span>
              <span class="value" :class="lossvalue > 0 ? 'up' : 'down'">
                {{ lossvalue }}
                USDT</span
              >
            </p>
          </div>
          <div class="setPrice" v-if="setAdjust">
            <div>
              <div class="ml5 mb10">{{ $t("contract.止盈止损数量") }}</div>
              <div class="s-quenty">
                <el-input
                  ref="inputQuenty"
                  v-model="numValue"
                  :placeholder="$t('contract.数量')"
                  @focus="changeFocus"
                  @input="amountChange"
                >
                  <div slot="suffix" class="numUsdt">
                    <span v-if="quantityUnit == 1">{{
                      $t("contract.张")
                    }}</span>
                    <span v-if="quantityUnit == 2">USDT</span>
                    <span v-if="quantityUnit == 3">{{
                      contractCoin.baseAssetCode
                    }}</span>
                  </div>
                </el-input>
              </div>

              <div class="slider height60 pl15 width525 mb10">
                <el-slider
                  v-model="leverValue"
                  ref="sliderDom"
                  :min="0"
                  :marks="marks"
                  @input="sliderInput"
                />
              </div>
            </div>
            <div class="item" v-if="entrustType == 3 || entrustType == 6">
              <div class="cell">
                <span class="ml5 mb10">{{ "contract.止盈" | translate }}</span>
                <div class="df aic jb">
                  <div class="box">
                    <input
                      type="text"
                      :placeholder="$t('contract.触发价')"
                      v-model="profit"
                      ref="ipt1"
                      @keyup.enter="onNext(1)"
                      @input="profitChange"
                    />
                    <span>USDT</span>
                  </div>
                  <div class="label1">
                    {{ "contract.最新价格" | translate }}
                  </div>
                  <i
                    class="iconfont icon-close2"
                    v-show="profit"
                    @click="profit = null"
                  ></i>
                </div>
              </div>
              <div class="adjust-box">
                <div class="adjust-select">
                  <div class="a-l" @click.stop="handleSelect1">
                    <span>{{ sactiveName1 }}</span>
                    <i
                      :class="
                        showList1 ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                      "
                    ></i>
                  </div>
                  <div class="a-r">
                    <el-input
                      class="a-int"
                      v-if="sactiveindex1 == 2"
                      v-model="limitProfitPrice"
                      @input="limitProfitChange"
                    ></el-input>
                    {{ sactiveindex1 == 1 ? $t("contract.市价") : "USDT" }}
                  </div>
                </div>
                <div class="s-list" v-if="showList1" @click.stop>
                  <div
                    class="list-item"
                    :class="sactiveindex1 == item.id ? 's-textcolor' : ''"
                    v-for="item in slist1"
                    :key="item.id"
                    @click.stop="sitem1(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="describe">
                <p>
                  {{
                    $t(
                      "contract.当最新价格到达x时，将会触发市价止盈委托平仓当前仓位。预计盈亏为xUSDT",
                      [profit ? profit : "0.0", profitvalue]
                    )
                  }}
                </p>
              </div>
            </div>
            <div class="item" v-if="entrustType == 4 || entrustType == 7">
              <div class="cell">
                <span class="mb10 ml5">{{ "contract.止损" | translate }}</span>
                <div class="df aic">
                  <div class="box">
                    <input
                      type="text"
                      :placeholder="$t('contract.触发价')"
                      v-model="loss"
                      ref="ipt2"
                      @keyup.enter="onNext(2)"
                      @input="lossChange"
                    />
                    <span>USDT</span>
                  </div>
                  <div class="label1">
                    {{ "contract.最新价格" | translate }}
                  </div>
                  <i
                    class="iconfont icon-close2"
                    v-show="loss"
                    @click="loss = null"
                  ></i>
                </div>
              </div>
              <div class="adjust-box">
                <div class="adjust-select">
                  <div class="a-l" @click.stop="handleSelect2">
                    <span>{{ sactiveName2 }}</span>
                    <i
                      :class="
                        showList2 ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                      "
                    ></i>
                  </div>
                  <div class="a-r">
                    <el-input
                      class="a-int"
                      v-if="sactiveindex2 == 2"
                      v-model="limitLossPrice"
                      @input="limitLossChange"
                    ></el-input>
                    {{ sactiveindex2 == 1 ? $t("contract.市价") : "USDT" }}
                  </div>
                </div>
                <div class="s-list" v-if="showList2" @click.stop>
                  <div
                    class="list-item"
                    :class="sactiveindex2 == item.id ? 's-textcolor' : ''"
                    v-for="item in slist2"
                    :key="item.id"
                    @click.stop="sitem2(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="describe">
                <p>
                  {{
                    $t(
                      "contract.当最新价格到达x时，将会触发市价止损委托平仓当前仓位。预计盈亏为xUSDT",
                      [loss ? loss : "0.0", lossvalue]
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="tips" v-if="setAdjust">
            {{
              "contract.该止盈止损针对整个仓位（无论加仓或者减仓）。平仓后该止盈止损将自动取消。当价格到达设定的触发价格时，将执行市价平仓委托。如果仓位数量超过市价委托单笔最大数量限制时，委托将被拒绝。"
                | translate
            }}
          </div>
          <div class="protect" v-else>
            <div class="tip_s" v-if="!check">
              <div class="top">
                <div class="left">
                  <span class="label">
                    {{ "contract.价差保护" | translate }}</span
                  >
                  <el-tooltip placement="top" popper-class="my-tooltip">
                    <div slot="content">
                      <div class="contentBox">
                        <p>
                          <span class="content_text">{{
                            "contract.dialog_tp_protectText1" | translate
                          }}</span>
                          <span class="rule" @click="toRules">{{
                            "contract.dialog_tp_protectRule" | translate
                          }}</span>
                          <span class="content_text">{{
                            "contract.dialog_tp_protectText2" | translate
                          }}</span>
                          <span>{{
                            $t(
                              "contract.开启价差保护功能后，止盈止损达到触发价，如果该合约的最新价与标记价格价差超过该合约的设定阈值，止盈止损将不会被触发，防止价格波动影响您的止盈止损策略。进入交易规则，查看阈值。请注意价差保护只会在开启后生效，对未开启时的历史订单无效，反之亦然。API订单不受价差保护开关限制。该设置仅对U本位合约生效。"
                            )
                          }}</span>
                          <span class="rule" @click="toRules">{{
                            $t("contract.查看交易规则")
                          }}</span>
                        </p>
                      </div>
                    </div>
                    <i class="iconfont icon-warning1"></i>
                  </el-tooltip>
                </div>
                <div class="switch">
                  <el-switch
                    v-model="switchValue"
                    active-color="#13ce66"
                    inactive-color="#e1e1e1"
                  >
                  </el-switch>
                </div>
              </div>
              <p class="tip2">
                {{
                  "contract.如果仓位数量超过市价委托单笔最大数量限制时，委托将被拒绝"
                    | translate
                }}
              </p>
              <div class="bottom">
                <i
                  class="iconfont"
                  :class="!check ? 'icon-box1' : 'icon-box'"
                  @click="onChecked"
                ></i>
                <span>{{
                  "contract.不再展示，您可在【用户-交易】中重新设置。"
                    | translate
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template slot="footer">
        <div class="btns" v-if="setAdjust">
          <my-button @click="handleNext"></my-button>
        </div>
        <div class="btns df aic jb" v-else>
          <my-button type="normal" class="mr15" @click="setAdjust = true">{{
            $t("userInfo.返回")
          }}</my-button>
          <my-button @click="toSubmit"></my-button>
        </div>
      </template>
    </my-modal>
  </div>
</template>

<script>
import {
  editProfitLossApi,
  estimateProfitLoss,
  editSingleProfitLoss,
} from "@/api/contractTransaction";
import storage from "@/libs/commonStorage";
import myModal from "@/components/my-modal";
import { mapState } from "vuex";

export default {
  name: "editProfitLoss",
  components: {
    myModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
    profitLossData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      setAdjust: true, //当前是否为调整
      title: "contract.调整止盈止损",
      width: "600px",
      profit: null, //盈利
      loss: null, //亏损
      check: false, //选择框
      switchValue: true, //价差保护
      submitData: {}, //提交数据
      focus: false,
      disabled: false,
      numValue: "",
      amount: "",
      leverValue: "",
      marks: {
        0: "0%",
        25: "25%",
        50: "50%",
        75: "75%",
        100: "100%",
      },
      showList1: false,
      sactiveName1: this.$t("contract.市价止盈"),
      sactiveindex1: 1,
      slist1: [
        {
          id: 1,
          name: this.$t("contract.市价止盈"),
        },
        {
          id: 2,
          name: this.$t("contract.限价止盈"),
        },
      ],
      showList2: false,
      sactiveName2: this.$t("contract.市价止损"),
      sactiveindex2: 1,
      slist2: [
        {
          id: 1,
          name: this.$t("contract.市价止损"),
        },
        {
          id: 2,
          name: this.$t("contract.限价止损"),
        },
      ],
      limitProfitPrice: null,
      limitLossPrice: null,
      profitvalue: "--",
      lossvalue: "--",
      entrustType: null,
      coinValue:null,
      usdtValue:null,
    };
  },
  created() {
    document.addEventListener("click", () => {
      this.showList1 = false;
      this.showList2 = false;
    });
  },
  computed: {
    ...mapState({
      // 数量单位
      quantityUnit: (state) => state.contract?.quantityUnit,
      // 合约币种
      contractCoin: (state) => state.contract?.contractCoin,
      // 实时价格
      priceObj: (state) => state.contract?.priceObj,
      // 单个交易对(合约)信息
      contractInfo: (state) => state.contract?.contractInfo,
    }),
  },
  methods: {
    //取消
    handleCancel() {
      this.setAdjust = true;
      this.profit = null;
      this.loss = null;
      this.width = "600px";
      this.submitData = {};
      // console.log("prompt", this.$refs.ipt1);
      this.$refs.ipt1 && this.$refs.ipt1.blur();
      this.$emit("update:isShow", false);
    },
    onNext(num) {
      // console.log("prompt", "parameter");
      if (num == 1) {
        this.$refs.ipt2.focus();
      } else if (num == 2) {
        this.handleNext();
      }
    },

    changeFocus() {
      this.leverValue = 0;
      this.numValue = null
    },
    //输入数量响应的预估值
    amountChange(e) {
      if (!e) return;
      if (this.profit) {
        estimateProfitLoss({
          id: this.data.entrustNo,
          amount: e,
          triggerPrice: this.profit,
        }).then((res) => {
          this.profitvalue = res.data?.data?.profitLoss;
        });
      }
      if (this.loss) {
        estimateProfitLoss({
          id: this.data.entrustNo,
          amount: e,
          triggerPrice: this.loss,
        }).then((res) => {
          this.lossvalue = res.data?.data?.profitLoss;
        });
      }
      
       //单位张、usdt、币的换算

      const { faceValue } = this.contractInfo;
      let lastPrice = this.priceObj.lastPrice;
      // e = parseInt(e);
      console.log("面值", faceValue);
      switch (this.quantityUnit) {
        case 1:
          // 直接提交的数量
          break;
        case 2:
          // // 计算价格（最新价格 * 面值）
          console.log("数量USDT", parseInt(e / (lastPrice * faceValue)));
          this.usdtValue = parseInt(e / (lastPrice * faceValue));
          break;
        case 3:
          // 数量/面值 = 提交的数量
          this.coinValue = (e * 1000000) / faceValue / 1000000;
          break;
        default:
          console.log("error");
      }

    },
    profitChange(e) {
      //需要考虑止盈止损变化是，预估值的相应变化

      if (/[!~@#$%&=]+/gi.test(this.numValue) && this.leverValue) {
        this.amount = Math.round(this.data.amount * (this.leverValue / 100));
      } else {
        this.amount = this.numValue;
      }
      //需做防抖处理
      if (e.target.value && this.numValue) {
        estimateProfitLoss({
          id: this.data.entrustNo,
          amount: this.amount,
          triggerPrice: e.target.value,
        }).then((res) => {
          this.profitvalue = res.data?.data?.profitLoss;
        });
      } else {
        this.profitvalue = "--";
      }
    },
    limitProfitChange(e) {
      if (/[!~@#$%&=]+/gi.test(this.numValue) && this.leverValue) {
        this.amount = Math.round(this.data.amount * (this.leverValue / 100));
      } else {
        this.amount = this.numValue;
      }
      //需做防抖处理
      if (e && this.numValue) {
        estimateProfitLoss({
          id: this.data.entrustNo,
          amount: this.amount,
          triggerPrice: this.profit,
          limitPrice: e,
        }).then((res) => {
          this.profitvalue = res.data?.data?.profitLoss;
        });
      } else {
        this.profitvalue = "--";
      }
    },
    lossChange(e) {
      if (/[!~@#$%&=]+/gi.test(this.numValue) && this.leverValue) {
        this.amount = Math.round(this.data.amount * (this.leverValue / 100));
      } else {
        this.amount = this.numValue;
      }
      //需做防抖处理
      if (e.target.value && this.numValue) {
        estimateProfitLoss({
          id: this.data.entrustNo,
          amount: this.amount,
          triggerPrice: e.target.value,
        }).then((res) => {
          this.lossvalue = res.data?.data?.profitLoss;
        });
      } else {
        this.lossvalue = "--";
      }
    },
    limitLossChange(e) {
      if (/[!~@#$%&=]+/gi.test(this.numValue) && this.leverValue) {
        this.amount = Math.round(this.data.amount * (this.leverValue / 100));
      } else {
        this.amount = this.numValue;
      }
      //需做防抖处理
      if (e && this.numValue) {
        estimateProfitLoss({
          id: this.data.entrustNo,
          amount: this.amount,
          triggerPrice: this.loss,
          limitPrice: e,
        }).then((res) => {
          this.lossvalue = res.data?.data?.profitLoss;
        });
      } else {
        this.lossvalue = "--";
      }
    },
    //下一步
    handleNext() {
      if (!this.numValue) {
        this.$message({
          message: this.$t("contract.请设置止盈止损数量"),
          type: "error",
        });
        return;
      }
      if (!this.profit && !this.loss) {
        this.$message({
          message: this.$t("contract.请设置止盈或者止损"),
          type: "error",
        });
        return;
      }
      if (this.numValue == 0) {
        this.$message({
          message: this.$t("contract.止盈止损数量不能为"),
          type: "error",
        });
        return;
      }

      let data = {};
      if (this.profit) {
        data.triggerProfitPrice = this.profit;
      }
      if (this.loss) {
        data.triggerLossPrice = this.loss;
      }
      data.positionId = this.data.id;
      data.coinId = this.data.coinId;
      data.userId = null; //是否需要uid，待确认
      data.positionDirection = this.data.positionDirection;
      data.lossType = this.sactiveindex2;
      data.profitType = this.sactiveindex1;
      data.limitLossPrice = this.limitLossPrice;
      data.limitProfitPrice = this.limitProfitPrice;
      data.coinMarket = this.data.coinMarket;

      //需要做处理 如果是滑块，需要计算持仓量*百分比
      if (/[!~@#$%&=]+/gi.test(this.numValue)) {
        data.amount = Math.round(this.data.amount * (this.leverValue / 100));
      } else {
        //提交参数时分张，USDT，币种单位来提交
        switch (this.quantityUnit) {
          case 1:
            data.amount = this.numValue;
            break;
          case 2:
            //usdt
            data.amount = this.usdtValue;
             console.log('usdt',data.amount);
            break;
          case 3:
            //币单位
            data.amount = this.coinValue;
             console.log('币单位',data.amount);
            break;
          default:
            console.log("error");
        }
      }

      const params = {
        id: this.data.entrustNo,
        amount: data.amount,
        triggerPrice:
          this.entrustType == 3 || this.entrustType == 6
            ? this.profit
            : this.loss,
        type:
          this.entrustType == 3 || this.entrustType == 6
            ? this.sactiveindex1 == 1
              ? 2
              : 1
            : this.sactiveindex2 == 1
            ? 2
            : 1,
        limitPrice:
          this.entrustType == 3 || this.entrustType == 6
            ? this.limitProfitPrice
            : this.limitLossPrice,
      };

      this.submitData = params; //提交的数据
      this.setAdjust = false;
      this.title = this.$t("contract.确认止盈止损");
      this.width = "500px";
    },
    //选择框
    onChecked() {
      this.check = !this.check;
    },

    //确认止损
    toSubmit() {
      if (this.disabled) return;
      this.disabled = true;
      editSingleProfitLoss(this.submitData).then((res) => {
        if (res.data.success) {
          this.handleCancel();
          this.$showMsg(this.$t("contract.调整止盈止损成功"), () => {
            this.$emit("profitLossr-success", res.data.success);
          });
        }
      });
    },
    //交易规则l
    toRules() {
      this.$router.push("/contractRules/tradingRules");
    },

    // 滑块
    sliderInput(val) {
      const tooltipPopperElement = document.querySelector(
        "body .el-tooltip__popper"
      );
      if (val || tooltipPopperElement) {
        // el-input存在一个聚焦时 拖动slider 不会失焦的情况需要处理
        val == 0
          ? this.$refs.inputQuenty.focus()
          : this.$refs.inputQuenty.blur();
        // 将值替换成%
        this.numValue = this.leverValue != 0 ? this.leverValue + "%" : "";

        // 样式赋值
        const element = this.$refs.sliderDom.$el.childNodes[1].childNodes[3];
        let step = [0, 25, 50, 75, 100];
        for (let i = 0; i < element.childNodes.length; i++) {
          const child = element.childNodes[i];
          const childClass = step[i];
          child.classList[val >= childClass ? "add" : "remove"]("level-on");
        }
      }
    },

    handleSelect1() {
      this.showList1 = !this.showList1;
    },
    sitem1(item) {
      this.sactiveindex1 = item.id;
      this.sactiveName1 = item.name;
      this.showList1 = false;
    },

    handleSelect2() {
      this.showList2 = !this.showList2;
    },
    sitem2(item) {
      this.sactiveindex2 = item.id;
      this.sactiveName2 = item.name;
      this.showList2 = false;
    },
  },
  watch: {
    check: {
      handler(value) {
        storage.setLocal("whetherToProtect", !value);
      },
    },
    isShow() {
      this.check =
        storage.getLocal("whetherToProtect") == "true" ? false : true;
      // this.numValue = this.data.amount; //数量
      this.sactiveindex1 = this.data.profitType == 1 ? 2 : 1;
      this.sactiveindex2 = this.data.lossType == 1 ? 2 : 1;
      //止盈止损单的4种方式：3-市价止盈；4-市价止损；6-限价止盈；7-限价止损
      this.entrustType = this.data.entrustType;
      // console.log("this.data", this.data);
      if (this.entrustType == 3 || this.entrustType == 6) {
        this.limitProfitPrice = this.data.limitProfitPrice; //止盈现价价格
        this.profit = this.data.triggerProfitPrice; //止盈触发价
        estimateProfitLoss({
          id: this.data.entrustNo,
          amount: this.data.amount,
          triggerPrice: this.profit,
          limitPrice: this.sactiveindex1 == 2 ? this.limitProfitPrice : null,
        }).then((res) => {
          this.profitvalue = res.data?.data?.profitLoss;
        });
      } else if (this.entrustType == 4 || this.entrustType == 7) {
        this.loss = this.data.triggerLossPrice; //止损触发价
        this.limitLossPrice = this.data.limitLossPrice; //止损现价价格
        estimateProfitLoss({
          id: this.data.entrustNo,
          amount: this.data.amount,
          triggerPrice: this.loss,
          limitPrice: this.sactiveindex2 == 2 ? this.limitLossPrice : null,
        }).then((res) => {
          this.lossvalue = res.data?.data?.profitLoss;
        });
      }
      this.leverValue = 100
    },
    data: {
      handler() {
        // this.$nextTick(() => {
        //   this.$refs.ipt1 && this.$refs.ipt1.focus();
        // });
      },
    },
    profit(newVal) {
      if (newVal) {
        this.profit = newVal.replace(/[^\d.]/g, ""); //筛选 数字以外的替换为 ''
      }
    },
    loss(newVal) {
      if (newVal) {
        this.loss = newVal.replace(/[^\d.]/g, ""); //筛选 数字以外的替换为 ''
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text {
    font-size: 18px;
    color: var(--main-text-color);
  }
  .icon-close {
    font-size: 22px;
    cursor: pointer;
  }
}
.btn-group {
  display: flex;
  align-items: center;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 50px;
    font-size: 18px;
    background-color: var(--theme-color);
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
  .confirm .cancel {
    flex: 1;
  }
  .cancel {
    background-color: #f4f5f7;
    margin-right: 20px;
    color: #333;
  }
}
.content {
  .pirceInfo {
    margin-bottom: 20px;
    .tip {
      color: #ffac00;
      font-size: 14px;
    }
    P {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      line-height: 32px;
      font-weight: 700;
      .label {
        color: #8992a6;
      }
      .value {
        color: var(--main-text-color);
        &.down {
          color: #f75f52;
        }
        &.up {
          color: #90ff00;
        }
        // &.expectedUp {
        //   color: #90ff00;
        // }
      }
    }
  }
  .setPrice {
    // margin-top: 5px;
    .s-quenty {
      margin-bottom: 10px;
    }
    .item {
      &:last-child {
        margin-top: 20px;
      }
      .cell {
        display: flex;
        flex-direction: column;
        span {
          font-size: 16px;
          color: var(--main-text-color);
          font-weight: 700;
        }
        .box {
          display: flex;
          align-items: center;
          width: 384px;
          height: 45px;
          border: 1px solid var(--border-color);
          padding: 0 7px;
          border-radius: 6px;
          margin-right: 20px;

          input {
            flex: 1;
            height: 100%;
            border: none;
            outline: none;
            font-size: 16px;
            color: #8992a6;
            padding-left: 3px;
            background-color: var(--dialog-bg);
          }
        }
        .label1 {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 45px;
          font-size: 16px;
          border: 1px solid var(--border-color);
          color: var(--main-text-color);
          font-weight: 700;
          border-radius: 6px;
        }
        .icon-close2 {
          font-size: 26px;
          margin-left: 5px;
          color: #96a2b2;
          cursor: pointer;
        }
      }
      .describe {
        font-size: 12px;
        color: #989898;
        margin-top: 10px;
        .blue {
          color: var(--theme-color);
        }
      }
    }
  }
  .tips {
    margin: 20px 0 0;
    font-size: 12px;
    font-weight: 700;
    color: var(--main-text-color);
    line-height: 20px;
  }
  .protect {
    padding-top: 20px;
    // border-top: 1px solid #fbfcfd;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      .left {
        display: flex;
        align-items: center;
        cursor: pointer;
        .label {
          font-size: 16px;
          color: var(--main-text-color);
          font-weight: 700;
          margin-right: 10px;
        }
        .rule {
          color: var(--theme-color);
          color: red;
        }

        .icon-warning1 {
          font-size: 12px;
          color: #96a2b2;
          cursor: pointer;
        }
      }
    }
    .tip2 {
      color: var(--main-text-color);
      font-size: 14px;
      line-height: 20px;
      // font-weight: 700;
    }
    .bottom {
      margin-top: 15px;
      .iconfont {
        font-size: 14px;
        color: #efefef;
        cursor: pointer;
        margin-right: 10px;
        &.icon-box {
          color: var(--theme-color);
        }
      }
      span {
        color: var(--main-text-color);
      }
    }
  }
}
::v-deep .my-button {
  width: 100%;
}

::v-deep .el-slider .el-slider__runway {
  height: 4px;
  background-color: var(--trade-slider-line-bg);

  .el-slider__bar {
    height: 4px;
  }

  .el-slider__stop {
    background-color: transparent !important;
    top: -5px;
    width: 14px;
    height: 14px;
    background: url("@/assets/contract-imgs/level-step.png") no-repeat center /
      14px 14px;
  }

  .el-slider__button {
    border: none !important;
    background-color: transparent;
    background: url("@/assets/contract-imgs/level-on.png") no-repeat center /
      18px 18px;
    width: 18px;
    height: 18px;
    margin-top: -2px;

    &:hover {
      border: none !important;
      background-color: transparent;
      background: url("@/assets/contract-imgs/level-on.png") no-repeat center /
        18px 18px;
      width: 18px;
      height: 18px;
    }
  }

  .level-on {
    background: url("@/assets/contract-imgs/level.png") no-repeat center / 14px
      14px;
  }

  .el-slider__marks-text {
    width: max-content;
    margin-top: 20px;
    font-size: 12px;
    color: #8992a6;
  }
}
.numUsdt {
  line-height: 40px;
  padding-right: 10px;
  color: #333;
}
.adjust-box {
  position: relative;
  .adjust-select {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    border: 1px solid #f4f5f7;
    height: 50px;
    padding: 0 10px;
    .a-l {
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        padding-right: 10px;
      }
    }
    .a-r {
      display: flex;
      align-items: center;
      .a-int {
        width: 360px;
        ::v-deep .el-input__inner {
          border: none;
        }
      }
    }
  }
  .s-list {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;

    z-index: 999;
    background: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;

    .list-item {
      color: #333;
      padding: 20px;
      cursor: pointer;
      &:hover {
        background: #f5f7fa;
      }
    }
    .s-textcolor {
      color: #90ff00;
    }
  }
}
</style>
