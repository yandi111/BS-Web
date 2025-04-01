<template>
  <div class="content-container">
    <!-- 交易区 -->
    <div class="main">
      <div class="content between">
        <div class="content-font">
          <!-- <div class="font-box"> -->
            <div class="title">{{ $t('lang_538') }}</div>
            <div class="tip">1 {{ $t("lang_530") }}</div>
            <div class="tip">2 {{ $t("lang_531") }}</div>
            <div class="tip">3 <span class="three">{{ $t('spot_28') }}</span></div>
          <!-- </div> -->
        </div>
        <div class="content-trade">
          <div class="tabs flexs">
            <div
              :class="[
                'tabs-text',
                'tabs-text' + item.id,
                { 'tabs-text-active': item.id == tradeType },
              ]"
              v-for="item in tradeTabs"
              :key="item.id"
              @click="handleClick(item.id)"
            >
              {{ $t(item.text) }}
            </div>
          </div>

          <div class="formTrade">
            <el-form
              class="bcb-form"
              :model="formData"
              :rules="rules"
              ref="formRules"
            >
              <template v-if="tradeType == 0">
                <el-form-item class="bcb-form-item mt50" prop="amount">
                  <template slot="label">
                    <div class="between width470">
                      <div class="title">{{ $t("lang_712") }}</div>
                      <div
                        class="green pointer fontSize14"
                        @click.stop="showTrans = true"
                      >
                        {{ $t("lang_910") }}
                      </div>
                    </div>
                  </template>
                  <input-and-select
                    :placeholder="$t('lang_298')"
                    width="480"
                    placement="bottom-end"
                    :field.sync="formData.amount"
                    :name.sync="legalName"
                    :filterList="filterLegalList"
                    :coinId="formData.legalTenderId"
                    :accuracy="legalTenderAccuracy"
                    :coinName="legalTenderName"
                    :coinIcon="coinIcon"
                    @input-change="changeInputPay"
                    @filter="filterLegalTender"
                    @choose="handleChoose"
                    :tradeType="tradeType"
                  >
                  </input-and-select>
                </el-form-item>

                <el-form-item
                  class="bcb-form-item mt50"
                  :label="$t('lang_715')"
                >
                  <input-and-select
                    :placeholder="$t('lang_716')"
                    width="480"
                    placement="bottom-end"
                    :field.sync="formData.quantity"
                    :name.sync="dealName"
                    :filterList="filterDealList"
                    :coinId="formData.dealId"
                    :coinName="coinName"
                    :accuracy="coinAccuracy"
                    :coinIcon="legalIcon"
                    label="coinName"
                    @input-change="changeInputGet"
                    @filter="filterDeal"
                    @choose="handleChooseDeal"
                    :tradeType="tradeType"
                  >
                  </input-and-select>
                </el-form-item>
              </template>

              <template v-else>
                <el-form-item class="bcb-form-item mt50" prop="quantity">
                  <template slot="label">
                    <div class="between width470">
                      <div class="title">{{ $t("lang_712") }}</div>
                      <div
                        class="green pointer fontSize14"
                        @click.stop="showTrans = true"
                      >
                        {{ $t("lang_910") }}
                      </div>
                    </div>
                  </template>
                  <input-and-select
                    :placeholder="$t('lang_983')"
                    width="480"
                    placement="bottom-end"
                    :field.sync="formData.quantity"
                    :name.sync="dealName"
                    :filterList="filterDealList"
                    :coinId="formData.dealId"
                    :coinName="coinName"
                    :accuracy="coinAccuracy"
                    :coinIcon="legalIcon"
                    label="coinName"
                    @input-change="changeInputGet"
                    @filter="filterDeal"
                    @choose="handleChooseDeal"
                    :tradeType="tradeType"
                  >
                    <div slot="box" class="mr18 diyBox" v-if="tradeType == 1">
                      <div @click.stop="handleAllMoney()">
                        {{ $t("lang_987") }}
                      </div>
                    </div>
                  </input-and-select>
                </el-form-item>

                <el-form-item
                  class="bcb-form-item mt50"
                  :label="$t('lang_715')"
                >
                  <input-and-select
                    :placeholder="$t('lang_298')"
                    width="480"
                    placement="bottom-end"
                    :field.sync="formData.amount"
                    :name.sync="legalName"
                    :filterList="filterLegalList"
                    :coinId="formData.legalTenderId"
                    :accuracy="legalTenderAccuracy"
                    :coinName="legalTenderName"
                    :coinIcon="coinIcon"
                    @input-change="changeInputPay"
                    @filter="filterLegalTender"
                    @choose="handleChoose"
                    :tradeType="tradeType"
                  >
                  </input-and-select>
                </el-form-item>
              </template>

              <!-- 当前汇率 -->
              <div class="bcb-hint pt25 between">
                {{ $t("lang_87") + "：" }} 1 {{ coinName }} ≈
                {{ exchangeRateToFix }}
                {{ legalTenderName }}
                <div class="text mr20">
                  {{ $t("lang_718") }} {{ balance?.amount }}
                  {{ balance?.coinName }}
                </div>
              </div>
              <!-- 下单按钮 -->
              <el-form-item
                :class="[
                  'item-button mt60',
                  { 'item-button-sell': tradeType == 1 },
                ]"
              >
                <el-button :loading="isLoading">
                  {{ tradeType == 0 ? $t("lang_948") : $t("lang_956") }}
                  {{ balance?.coinName }}
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- 快捷内容 -->
    <div class="menu pb40">
      <div class="content">
        <div class="box pt70">
          <h3 class="box-title">{{ $t("lang_730") }}</h3>
          <div class="between">
            <div class="box-group group1">
              <div class="name">{{ $t("lang_593") }}</div>
              <div class="text">{{ $t("lang_566") }}</div>
            </div>
            <div class="box-group group2">
              <div class="name">{{ $t("lang_121") }}</div>
              <div class="text">{{ $t("lang_565") }}</div>
            </div>
            <div class="box-group group3">
              <div class="name">{{ $t("lang_344") }}</div>
              <div class="text">{{ $t("lang_564") }}</div>
            </div>
          </div>
        </div>
        <otc-question></otc-question>
      </div>
    </div>
    <!--划转 -->
    <fundsTransfer
      :transVisible="showTrans"
      v-if="showTrans"
      :dealId="formData.dealId"
      @closeTransfer="showTrans = false"
      @okTransfer="showTrans = false"
    />
    <!-- 交易被禁止 -->
    <stopModal :stopVisible="stopVisible" @cancel="stopVisible = false" />
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {rateQuery} from "@/api/quotes.js";
import {simpleApi} from "@/api/assetWallet.js";
import checkUtils from "@/libs/checkUtils";
import {truncateDecimal} from "@/libs/utils.js";
import InputAndSelect from "@/components/inputAndSelect/index.vue";
import fundsTransfer from "@/components/commonModal/fundstransfer/index.vue";
import stopModal from "@/components/commonModal/stop/index.vue";
import OtcQuestion from '../components/question/question.vue';
import {advertisingQuick, getLegalTender, queryAccount, quickAstict,} from "@/api/otc.js";

export default {
  name: "buyConinsBusiness",
  components: {
    InputAndSelect,
    fundsTransfer,
    stopModal,
    OtcQuestion
  },
  data() {
    // 金额校验
    var validateAmout = (rule, value, callback) => {
      this.tradeType == 1 && callback();
      !value
        ? callback(new Error(this.$t("lang_719")))
        : value < this.minAmount
        ? callback(
            new Error(this.$t("lang_720") + `${this.minAmount}`)
          )
        : value > this.maxAmount
        ? callback(
            new Error(
              this.$t("lang_721") +
                `${this.maxAmount}` +
                this.$t("lang_722")
            )
          )
        : callback();
    };
    // 数量校验
    var validateQuantity = (rule, value, callback) => {
      this.tradeType == 0 && callback();
      !value
        ? callback(new Error("数量不能为空！"))
        : value < this.minAmount
        ? callback(new Error(`数量不能小于${this.minAmount}`))
        : value > this.maxAmount
        ? callback(new Error(`数量不能大于${this.maxAmount}`))
        : callback();
    };
    return {
      isLoading: false,
      // 交易内容
      tradeTabs: [
        { text: "lang_232", id: "0" },
        { text: "lang_232", id: "1" },
      ],
      // 买卖参数
      formData: {
        // 金额 计算汇率所得到金额或者输入金额
        amount: "",
        // 计算汇率所得到数量或者输入数量
        quantity: "",
        // 买入币种
        dealId: 4,
        // 支付方式
        incomeId: "1",
        // 法币ID
        legalTenderId: 1,
      },
      payNum: {
        1: "银行卡",
        2: "支付宝",
        3: "微信",
      },
      // 交易类型 0买 1卖
      tradeType: "0",
      // 虚拟币信息
      coinName: "USDT",
      dealName: "",
      coinIcon: undefined,
      dealList: [],
      filterDealList: [],
      // 法币信息
      legalName: "",
      legalTenderName: "",
      legalIcon: undefined,
      legalList: [],
      // 汇率
      exchangeRate: 0,
      filterLegalList: [],
      // 精度
      legalTenderAccuracy: undefined,
      coinAccuracy: undefined,
      // 快捷查询余额
      balance: {},
      // 最大/最小金额
      minAmount: undefined,
      maxAmount: undefined,
      rules: {
        amount: [
          {
            validator: validateAmout,
            trigger: "blur",
          },
        ],
        quantity: [
          {
            validator: validateQuantity,
            trigger: "blur",
          },
        ],
      },
      // 划转开关
      showTrans: false,
      // 交易禁止开关
      stopVisible: false,
      // 国际缩写
      t: "c2c.",
    };
  },
  created() {
    this.init();
  },

  methods: {
    ...mapActions([
      "handleOrderInfo",
      "handleFastBuyAndSaleInfo",
      "handleOrderStatus",
    ]),
    async init() {
      await this.getLegalTender();
      await this.getSimpleApi();
      await this.getRateQuery();
      await this.getQueryAccount();
    },
    // 选中法币
    handleChoose(item) {
      this.formData.legalTenderId = item.id;
      this.legalTenderName = item.name;
      this.coinIcon = item.icon;
      this.legalTenderAccuracy = item.retentionAccuracy;
      this.getRateQuery(1);
    },
    // 选中虚拟币
    handleChooseDeal(item) {
      this.formData.dealId = item.coinId;
      this.coinName = item.coinName;
      this.legalIcon = item.iconUrl;
      this.coinAccuracy = item.decimalPlaces;
      this.getRateQuery(2);
    },
    handleAllMoney() {
      this.formData.quantity = this.balance?.amount;
      this.changeInputGet();
    },
    // 筛选法币列表
    filterLegalTender() {
      if (this.legalList && this.legalList.length > 0) {
        let data = JSON.parse(JSON.stringify(this.legalList));
        if (!this.legalName) {
          this.filterLegalList = data;
        } else {
          this.filterLegalList = data.filter(
            (item) => item.name.indexOf(this.legalName.toUpperCase()) > -1
          );
        }
      }
    },
    // 获取法币列表
    getLegalTender() {
      return new Promise((resolve, reject) => {
        getLegalTender()
          .then((res) => {
            const r = res.data.data;
            this.legalList = r;
            this.filterLegalList = r;
            this.legalTenderName = r[0]?.name;
            this.formData.legalTenderId = r[0]?.id;
            this.coinIcon = r[0]?.icon;
            this.legalTenderAccuracy = r[0]?.retentionAccuracy;
            resolve();
          })
          .catch()
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 虚拟币
    getSimpleApi() {
      return new Promise((resolve, reject) => {
        simpleApi({
          isType: 1,
        })
          .then((res) => {
            const r = res.data.data;
            this.dealList = r;
            this.filterDealList = r;
            this.formData.dealId = r[0]?.coinId;
            this.coinName = r[0]?.coinName;
            this.legalIcon = r[0]?.iconUrl;
            this.coinAccuracy = r[0]?.decimalPlaces;
            resolve();
          })
          .catch()
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 表单初始化事件
    initForm() {
      this.formData.quantity = "";
      this.formData.amount = "";
      this.popperShow = false;
      this.popperShowQ = false;
    },
    async changeInputPay() {
      this.formData.quantity = await checkUtils
        .accDiv(this.formData.amount, this.exchangeRate)
        .toFixed(this.coinAccuracy);
      Number(this.formData.quantity) <= 0 && (this.formData.quantity = "");
    },
    async changeInputGet() {
      this.formData.amount = await checkUtils
        .accMul(this.formData.quantity, this.exchangeRate)
        .toFixed(this.legalTenderAccuracy);
      Number(this.formData.amount) <= 0 && (this.formData.amount = "");
    },
    // tab点击使事件
    async handleClick(id) {
      this.tradeType = id;
      // 清除校验
      this.$nextTick(() => {
        this.$refs.formRules.clearValidate();
      });
      // 重置交易方式，按金额还是按照数量
      this.isChange = this.tradeType === "0" ? true : false;
      this.initForm();
      await this.getRateQuery();
    },
    // 筛选虚拟货币列表
    filterDeal() {
      if (this.dealList && this.dealList.length > 0) {
        let data = JSON.parse(JSON.stringify(this.dealList));
        if (!this.dealName) {
          this.filterDealList = data;
        } else {
          this.filterDealList = data.filter(
            (item) => item.coinName.indexOf(this.dealName.toUpperCase()) > -1
          );
        }
      }
    },

    // 快捷卖币查询资产
    getQueryAccount() {
      queryAccount({
        coinId: this.formData.dealId,
        type: 2,
      }).then((res) => {
        this.balance = res.data;
      });
    },
    // 汇率查询
    async getRateQuery(type) {
      rateQuery(
        {
          convertAssetName: this.coinName,
          unitAssetName: this.legalTenderName,
        },
        { cancel: true }
      ).then((res) => {
        this.exchangeRate = res.data.exchangeRate;
        if (type) {
          type == 1 ? this.changeInputGet() : this.changeInputPay();
          this.getQueryAccount();
        }
      });
      this.getAuickAstict();
    },
    // 获取最大最小金额
    getAuickAstict() {
      quickAstict({
        coinId: this.tradeType == "1" ? this.formData.dealId : undefined,
        coinName: this.tradeType == "1" ? this.coinName : undefined,
        legalTenderName:
          this.tradeType == "0" ? this.legalTenderName : undefined,
        type: this.tradeType == "0" ? 1 : 0,
        legalTenderId:
          this.tradeType == "0" ? this.formData.legalTenderId : undefined,
      }).then((math) => {
        this.minAmount = math.data.minAmount;
        this.maxAmount = math.data.maxAmount;
      });
    },
    // 快捷卖币卖币查询
    advertisingQuick() {
      let params = {
        type: this.tradeType == "0" ? "1" : "0",
        coinId: this.formData.dealId,
        coinName: this.coinName,
        legalTenderId: this.formData.legalTenderId,
        legalTenderName: this.legalTenderName,
        createType: this.tradeType == "0" ? 2 : 1,
        amount: this.formData.amount,
        quantity: this.formData.quantity,
      };
      this.isLoading = true;
      advertisingQuick(params)
        .then((res) => {
          // 16001 绑定手机号
          if (res.code === 16001) {
            this.$confirm(
              this.$t("tips.检测到还没有绑定手机号是否去绑定？"),
              this.$t("tips.绑定手机号"),
              {
                confirmButtonText: this.$t("tips.去绑定"),
                cancelButtonText: this.$t("tips.取消"),
                type: "warning",
              }
            )
              .then(() => {
                this.$router.push("/user/securitySetting");
              })
              .catch(() => {
                this.$emit("cancelMethod");
              });
            return;
          }
          // 未绑定支付方式
          if (res.code === 10017) {
            this.$confirm(
              this.$t("tips.检测到还没有添加收款方式，是否添加？"),
              this.$t("tips.提示"),
              {
                confirmButtonText: this.$t("tips.去添加"),
                cancelButtonText: this.$t("tips.取消"),
                type: "warning",
              }
            )
              .then(() => {
                this.$emit("buy", "addPayMent");
              })
              .catch(() => {
                this.$emit("cancelMethod");
              });
            return;
          }
          if (!res.data || res.data.length === 0) {
            this.$message({
              message:"暂无符合广告",
              type:'warning'
            });
            return;
          }
          // 支付列表
          let payList = [];
          res.data.forEach((item) => {
            console.log(item, "asdk");
            payList.push({
              key: item.showPayType,
              name: this.payNum[item.showPayType],
              unitPrice: item.unitPrice,
              payTypeVos: item.payTypeVos,
            });
          });
          console.log(payList, "asdk");
          // this.formInline.isBulkDeal
          // 一键买卖币
          let buyInfo = {
            ...this.formData,
            // 虚拟币
            coinName: this.coinName,
            // 法币
            legalTenderName: this.legalTenderName,
            isChange: this.isChange,
            payArr: payList,
            createType: params.createType,
            coinIcon: this.coinIcon,
            legalIcon: this.legalIcon,
            data: res.data,
          };

          console.log("asdlkl ", buyInfo);
          this.$emit("buy", this.tradeType, buyInfo, res.data);
        })
        .catch((rej) => {
          if (rej.code == 11032) {
            setTimeout((_) => {
              this.$router.push("/layout/c2c/tradeOrder");
            }, 1000);
          }
          this.isLoading = false;
        });
    },
  },
  computed: {
    ...mapState({
      // 获取用户交易状态
    }),
    // 截取小数
    exchangeRateToFix() {
     return truncateDecimal(
       this.exchangeRate,
       this.legalTenderAccuracy
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.content-container {
  .green {
    color: #90ff00;
  }

  .orange {
    color: #f75f52;
  }

  .main {
    width: 100%;
    background: #f5f7fa;

    .content {
      height: 669px;
      // width: 1400px;
      padding: 0 210px;
      margin: auto;

      &-font {
        width: 625px;
        height: 366px;
        background: url("@/assets/buy-coins/trade-font.png") no-repeat right / 571px 366px;
        color: #333333;
        // font-weight: 600;
				font-family: arial;
        // .font-box {
        //   // background-color: pink;
				// 	width: 320px;
				// 	display: flex;
				// 	flex-direction: column;
				// 	flex-wrap: wrap;
          .title {
            font-size: 30px;
            margin-top: 33px;
						font-weight: 600;
          }

          .tip {
            font-size: 16px;
            margin-top: 40px;
          }
					.three{
						// background-color: pink;
						display: inline-block;
						width: 320px;
						vertical-align: top;
					}
        // }
      }

      &-trade {
        width: 540px;
        height: 529px;
        background: #ffffff;
        box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.05);
        border-radius: 15px;

        .tabs {
          cursor: pointer;

          &-text {
            width: 270px;
            height: 64px;
            line-height: 64px;
            text-align: center;
            background: #f5f7fa;
            color: #5e6573;
            font-size: 22px;

            &-active {
              color: #333;
              background: #fff;
            }

            &0 {
              border-radius: 15px 0 15px;
            }

            &1 {
              border-radius: 0 15px 0 15px;
            }
          }
        }

        .formTrade {
          padding: 0 30px;
          color: #333;

          .bcb-form {
            .bcb-form-item {
              margin: auto;

              ::v-deep .el-form-item__label {
                // width: 100%;
                line-height: 0;
                margin-bottom: 18px;
                color: #333333;
              }

              ::v-deep .el-form-item__error {
                padding-top: 13px !important;
              }

              .diyBox {
                font-size: 18px;
                color: #90ff00;
              }

              .bcb-input {
                width: 480px;
                height: 70px;
                background: #f5f7fa;
                border-radius: 6px;

                :deep(.el-input__inner) {
                  height: 70px;
                  background-color: transparent;
                  border: none;
                  color: #333;
                  font-size: 18px;
                }

                :deep(.el-input__icon) {
                  line-height: 100%;
                }

                :deep(.el-input-group__append) {
                  background-color: transparent;
                  border: none;
                }
              }
            }

            .bcb-hint {
              margin: auto;
              height: 14px;
              color: #8992a6;
            }

            .item-button {
              :deep(.el-button) {
                font-size: 24px;
                font-weight: 500;
                color: #fffefe;
                width: 480px;
                height: 70px;
                border-color: #90ff00;
                background: #90ff00;
                border-radius: 10px;
                color: #fff;

                &:hover {
                  opacity: 0.8;
                }
              }

              &-sell {
                :deep(.el-button) {
                  border-color: #f75f52;
                  background: #f75f52;
                }
              }
            }
          }
        }
      }
    }
  }

  .menu {
    width: 100%;
    background: #ffffff;

    .content {
      // width: 1400px;
      padding: 0 210px;
      margin: auto;

      .box {
        color: #333333;

        &-title {
          font-size: 45px;
          margin-bottom: 60px;
        }

        &-group {
          width: 440px;
          height: 300px;
          text-align: center;
        }

        .name {
          padding: 150px 0 30px;
          font-size: 22px;
        }

        .text {
          color: #8992a6;
          width: 279px;
          margin: auto;
        }

        .group1 {
          background: url("@/assets/buy-coins/staick1.png") no-repeat right /
            440px 300px;
        }

        .group2 {
          background: url("@/assets/buy-coins/staick2.png") no-repeat right /
            440px 300px;
        }

        .group3 {
          background: url("@/assets/buy-coins/staick3.png") no-repeat right /
            440px 300px;
        }

        .line {
          font-size: 20px;
          cursor: pointer;

          &:hover {
            color: #90ff00;
          }
        }
      }
    }
  }
}
</style>