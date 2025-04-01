<!-- 0 限价 1 市价 2计划 -->
<template>
  <div class="market">
    <div class="money between">
      <div class="money-title flexs">
        {{ $t(`${t + "可用"}`) }}:
        <span class="fontWeight600 pl10"> {{ availableDeposit }} USDT</span>
      </div>
      <el-image
        v-if="token"
        class="block width24 pointer"
        @click="showTrans = true"
        :src="require('@/assets/contract-imgs/huazhuan.png')"
      />
    </div>
    <el-form ref="virtuallyForm" :model="virtuallyForm" :rules="rules">
      <!-- 限价 -->
      <el-form-item
        prop="price"
        class="inputKeQuery between"
        v-if="active == 0"
      >
        <el-input
          :placeholder="$t(`${t + '价格'}`)"
          v-model.trim="virtuallyForm.price"
          class="input"
          maxlength="15"
          @input.native="(e) => changeInput(e, 'price')"
        >
          <div slot="suffix" class="mr10 lineHeight40 flexs suffix">
            <div
              @click="virtuallyForm.price = priceObj?.lastPrice"
              class="text mr10 pointer"
            >
              {{ $t(`${t + "最新"}`) }}
            </div>
            {{ contractInfo?.quoteAssetCode }}
          </div>
        </el-input>
      </el-form-item>
      <!-- 市价 -->
      <div class="inputReadonly between" v-else-if="active == 1">
        <div class="inputReadonly-text">
          {{ $t(`${t + "以当前市场最优价格下单"}`) }}
        </div>
        <div class="inputReadonly-unit">{{ contractInfo?.quoteAssetCode }}</div>
      </div>
      <!-- 计划 -->
      <div class="plane" v-else>
        <div class="flexs">
          <el-form-item class="mb0" prop="triggerPrice">
            <el-input
              :placeholder="$t(`${t + '触发价'}`)"
              v-model.trim="virtuallyForm.triggerPrice"
              @input.native="(e) => changeInput(e, 'triggerPrice')"
              class="cfpirse input"
              maxlength="10"
            >
              <div slot="suffix" class="mr10 lineHeight40 suffix">
                {{ contractInfo?.quoteAssetCode }}
              </div>
            </el-input>
          </el-form-item>
          <div
            class="newpirse borderSty pointer ml10"
            @click="virtuallyForm.triggerPrice = priceObj?.lastPrice"
          >
            {{ $t(`${t + "最新价"}`) }}
          </div>
        </div>
        <div class="flexs mt15">
          <template v-if="activePrice == 0">
            <el-form-item class="mb0" prop="price">
              <el-input
                :placeholder="$t(`${t + '价格'}`)"
                v-model.trim="virtuallyForm.price"
                @input.native="(e) => changeInput(e, 'price')"
                class="cfpirse input"
                maxlength="10"
              >
                <div slot="suffix" class="mr10 lineHeight40 flexs suffix">
                  <div
                    @click="virtuallyForm.price = priceObj?.lastPrice"
                    class="text mr10 pointer"
                  >
                    {{ $t(`${t + "最新"}`) }}
                  </div>
                  {{ contractInfo?.quoteAssetCode }}
                </div>
              </el-input>
            </el-form-item>
          </template>
          <div class="merarket" v-if="activePrice != 0">
            {{ $t(`${t + "最优市价"}`) }}
          </div>
          <div class="newpirse ml10">
            <el-select
              v-model="activePrice"
              :popper-append-to-body="false"
              @change="handleActivePriceType"
            >
              <el-option
                v-for="item in pirseList"
                :key="item.value"
                :label="$t(`${t + item.label}`)"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
      <el-form-item class="quantity mt15" prop="amount">
        <el-popover
          placement="top"
          width="200"
          trigger="manual"
          popper-class="quantity-popover"
          :content="rulesTxt"
        >
          <el-input
            slot="reference"
            :placeholder="$t(`${t + '数量'}`)"
            ref="inputQuenty"
            :class="['input', { inputFocus_active: isFocusStyle }]"
            v-model="virtuallyForm.amount"
            type="text"
            maxlength="15"
            @input.native="(e) => changeInput(e, 'amount')"
            @focus="changeFocus"
            @blur="changeBlur"
          >
            <div slot="suffix" class="suffix">
              <div
                class="flexs lineHeight40"
                @mouseover="isFocusStyle = true"
                @mouseleave="isFocusStyle = false"
              >
                <el-select
                  v-model="unitVal"
                  :popper-append-to-body="false"
                  :placeholder="contractInfo?.quoteAssetCode"
                  class="unitSelect"
                  @visible-change="caretCss = !caretCss"
                >
                  <el-option
                    v-for="item in quantityList"
                    :key="item.value"
                    :label="
                      item.label == '张' ? $t(`${t + item.label}`) : item.label
                    "
                    :value="item.value"
                  />
                  <div slot="prefix">
                    <i
                      :class="[
                        caretCss ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
                      ]"
                    ></i>
                  </div>
                </el-select>
              </div>
            </div>
          </el-input>
        </el-popover>
      </el-form-item>

      <!-- 滑块 -->
      <div class="slider height60 pl15 width310 mb10">
        <el-slider
          v-model="leverValue"
          ref="sliderDom"
          :min="0"
          :marks="marks"
          @input="sliderInput"
        />
      </div>
      <!-- 开关 -->
      <div class="checkbox flexs" v-if="tabsIndex == 1">
        <el-image
          @click="checked = !checked"
          class="width14 mt2 height14"
          :src="
            require(`@/assets/contract-imgs/${
              checked ? 'checkbox-on' : 'checkbox'
            }.png`)
          "
        />
        <div class="ml10">{{ $t(`${t + "止盈/止损"}`) }}</div>
        <el-popover
          placement="top-start"
          popper-class="custom-popover"
          width="280"
          offset="10"
          trigger="hover"
        >
          <div v-text="$t(`${t + '止盈止损'}`)"></div>
          <div>
            {{
              $t(
                `${
                  t +
                  "您可以在开仓前设置止盈止损，开仓后会以最新价格为准，触发止盈止损生效"
                }`
              )
            }}
          </div>
          <el-image
            slot="reference"
            class="width12 tip imgMiddle inline-block ml10 mt2"
            :src="require(`@/assets/contract-imgs/tip.png`)"
          />
        </el-popover>
      </div>
      <div class="profitEloss mt10" v-if="checked && tabsIndex == 1">
        <el-form-item prop="triggerProfitPrice" class="mb10">
          <el-input
            :placeholder="$t(`${t + '止盈价格'}`)"
            :class="['input', { profit_active: profitFocusStyle }]"
            v-model.trim="virtuallyForm.triggerProfitPrice"
            @input.native="(e) => changeInput(e, 'triggerProfitPrice')"
          >
            <div
              slot="suffix"
              @click="virtuallyForm.triggerProfitPrice = priceObj?.lastPrice"
              class="lineHeight40 mr10 pointer suffix"
              @mouseover="profitFocusStyle = true"
              @mouseleave="profitFocusStyle = false"
            >
              {{ $t(`${t + "最新价格"}`) }}
            </div>
          </el-input>
        </el-form-item>
        <el-form-item prop="triggerLossPrice">
          <el-input
            :placeholder="$t(`${t + '止损价格'}`)"
            :class="['input', { loss_active: lossFocusStyle }]"
            v-model.trim="virtuallyForm.triggerLossPrice"
            @input.native="(e) => changeInput(e, 'triggerLossPrice')"
          >
            <div
              slot="suffix"
              @click="virtuallyForm.triggerLossPrice = priceObj?.lastPrice"
              class="lineHeight40 mr10 pointer suffix"
              @mouseover="lossFocusStyle = true"
              @mouseleave="lossFocusStyle = false"
            >
              {{ $t(`${t + "最新价格"}`) }}
            </div>
          </el-input>
        </el-form-item>
      </div>

      <!-- 未登录 -->
      <template
        v-if="!token || Object.keys($store.state.login.userInfo).length == 0"
      >
        <div class="nologin mt30">
          <div class="register">
            <el-button @click="$router.push('/register')"
              >{{ $t(`${t + "立即注册"}`) }}
            </el-button>
          </div>
          <div class="login">
            <el-button class="mt10" @click="$router.push('/login')">{{
              $t(`${t + "登录"}`)
            }}</el-button>
          </div>
        </div>
      </template>

      <!-- 登录后可看数据 -->
      <template v-else>
        <div class="bayAndSell mt20 flexs between">
          <div
            class="baybtn button_hover"
            @click="
              handleBayOrSellVis(tabsIndex == 1 ? '11' : '10', canOpenOrFlatBay)
            "
          >
            {{
              tabsIndex == 1 ? $t(`${t + "买入开多"}`) : $t(`${t + "买入平空"}`)
            }}
          </div>
          <!-- 11 买入开多 10 买入平空 00 卖出开空 01 卖出平多 -->
          <div
            class="sellbtn button_hover"
            @click="
              handleBayOrSellVis(
                tabsIndex == 1 ? '00' : '01',
                canOpenOrFlatSell
              )
            "
          >
            {{
              tabsIndex == 1 ? $t(`${t + "卖出开空"}`) : $t(`${t + "卖出平多"}`)
            }}
          </div>
        </div>

        <div class="rate mt10 flexs between">
          <div class="bay">
            {{ tabsIndex == 1 ? $t(`${t + "可开"}`) : $t(`${t + "可平"}`) }}:
            <span
              >{{ canOpenOrFlatBayTxt }}
              {{ amountUnit == "张" ? $t(`${t + "张"}`) : amountUnit }}
            </span>
          </div>
          <div class="sell">
            {{ tabsIndex == 1 ? $t(`${t + "可开"}`) : $t(`${t + "可平"}`) }}:
            <span
              >{{ canOpenOrFlatSellTxt }}
              {{ amountUnit == "张" ? $t(`${t + "张"}`) : amountUnit }}</span
            >
          </div>
        </div>
        <div class="property mt20">
          <div class="title fontWeight600 mb10">
            {{ contractInfo?.quoteAssetCode }}{{ $t(`${t + "资产"}`) }}
          </div>
          <div class="line between">
            {{ $t(`${t + "账户权益"}`) }}
            <div class="value">
              {{ availableObj?.accountEquity || property.accountEquity }}
              {{ contractInfo?.quoteAssetCode }}
            </div>
          </div>
          <div class="line between">
            {{ $t(`${t + "可用"}`) }}
            <div class="value">
              {{ availableDeposit }} {{ contractInfo?.quoteAssetCode }}
            </div>
          </div>
          <div class="line between">
            {{ $t(`${t + "占用"}`) }}
            <div class="value">
              {{ availableObj?.occupyDeposit || property?.occupyDeposit }}
              {{ contractInfo?.quoteAssetCode }}
            </div>
          </div>
        </div>
        <div class="property pointer mt20">
          <div class="title fontWeight600 mb10">
            {{ $t(`${t + "合约信息"}`) }}
          </div>
          <div class="line between">
            {{ $t(`${t + "最大杠杆"}`) }}
            <div class="value">{{ contractInfo?.maxLever }} X</div>
          </div>
          <div class="line between">
            {{ $t(`${t + "最小下单数量"}`) }}
            <div class="value">
              {{ oneConvertUnit }}
              {{ amountUnit == "张" ? $t(`${t + "张"}`) : amountUnit }}
            </div>
          </div>
        </div>
      </template>
    </el-form>

    <!-- 下单弹框 -->
    <placeOrder
      ref="placeOrderInfo"
      :tabsIndex="tabsIndex"
      :active="active"
      :visible.sync="placeOrderVisible"
      :activePrice="activePrice"
      :quantityDecimal="contractInfo?.quantityDecimal"
      :isBfbUnit="isBfbUnit"
      :params="placeParams"
      :typeBtnTxt="typeBtnTxt"
      :oneConvertUnit="oneConvertUnit"
      @success="handleSuccess"
    />

    <!-- 划转 -->
    <fundsTransfer
      :transVisible="showTrans"
      v-if="showTrans"
      :fromAccout="2"
      :toAccout="3"
      @closeTransfer="showTrans = false"
      @okTransfer="showTrans = false"
    />

    <!-- 交易被禁止 -->
    <stopModal :stopVisible="stopVisible" @cancel="stopVisible = false" />
  </div>
</template>

<script>
import { isRelogin } from "@/request/request";
import { userContractUsdt, marketSybomlList } from "@/api/contractExchange.js";
import fundsTransfer from "@/components/commonModal/fundstransfer";
import placeOrder from "./dialog/placeOrder.vue";
import checkUtils from "@/libs/checkUtils";
import { mapState } from "vuex";
import {
  changeNumberVal,
  deepClone,
  truncateDecimal,
  getToken,
} from "@/libs/utils.js";
import stopModal from "@/components/commonModal/stop/index.vue";

export default {
  name: "PriceTags",
  components: {
    fundsTransfer,
    placeOrder,
    stopModal,
  },
  props: {
    // 0 限价 | 1 市价 | 2 计划
    active: {
      type: Number | String,
      default: 0,
    },
    // 1开仓 | 2平仓
    tabsIndex: {
      type: Number | String,
      default: 1,
    },
    // 可平 多仓
    posiMuch: {
      type: Number | String,
      default: 0,
    },
    // 可平 空仓
    posiNull: {
      type: Number | String,
      default: 0,
    },
  },
  data() {
    const rulesAmount = (rule, value, callback) => {
      this.faceValueTip(value, callback);
      // if(value && value < 0.1){
      //   callback(new Error(this.$t('contract.须为0.1的整数倍，此数值将自动调整为0.1')));
      // } else{
      //    callback();
      // }
      // 因为初始 unitVal 赋值会存在校验问题
      if (this.isComponentMounted == true) {
        callback();
        return;
      }
      // 如果值中不包含 '%' ，则将值转为数字
      value = !value?.includes("%") ? Number(value) : String(value);
      // 根据判断结果返回对应的回调
      const resule = this.handleResule(value);
      callback(resule ? new Error(` `) : undefined);
    };
    return {
      // 划转
      showTrans: false,
      // 下单滑块slider
      leverValue: 0,
      isDragging: false,
      marks: {
        0: "0%",
        25: "25%",
        50: "50%",
        75: "75%",
        100: "100%",
      },
      // 可开 | 可平
      canOpenOrFlatBay: "",
      canOpenOrFlatSell: "",

      // 止盈止损开关
      checked: false,
      isLogin: isRelogin,

      // 下单参数
      virtuallyForm: {
        type: undefined, // 多1 空2
        amount: undefined, // 数量 （张）
        price: undefined, // 委托价格（市价下单时此参数不传），计划市价时，不传
        triggerPrice: undefined, // 触发价 (计划限价下单时的触发价格)
        triggerProfitPrice: undefined, //  持有仓位时，对仓位设置止盈触发价，此时orderType传开仓方式中对应的值
        triggerLossPrice: undefined, //  持有仓位时，对仓位设置止损触发价，此时orderType传开仓方式中对应的值
      },
      // 克隆下单参数（因为需要转换）
      placeParams: {},
      typeBtnTxt: null,
      // 下单弹框
      placeOrderVisible: false,
      // 下单是否是百分比单位
      isBfbUnit: false,
      bfbamount: 0,
      // 选中数量单位值
      unitVal: null,
      // 数量单位列表
      quantityList: [],
      // 选中的数量单位
      amountUnit: undefined,
      isComponentMounted: true,
      // 市价|市价选择
      pirseList: [
        { label: "限价", value: 0 },
        { label: "市价", value: 1 },
      ],
      // 合约资产
      property: {},
      // 选中价格类型
      activePrice: 1,
      // 聚焦样式
      isFocusStyle: false,
      profitFocusStyle: false,
      lossFocusStyle: false,
      caretCss: false,
      // 交易禁止开关
      stopVisible: false,
      // 校验与提示
      rulesTxt: "",
      oneConvertUnit: undefined,
      rulesPlease: "",
      rules: {
        price: [
          {
            required: true,
            message: " ",
            trigger: "change",
          },
        ],
        amount: [
          {
            required: true,
            validator: rulesAmount,
            trigger: "blur",
          },
        ],
        triggerPrice: [
          {
            required: true,
            message: " ",
            trigger: "change",
          },
        ],
      },
      // 国际缩写
      t: "contract.",
    };
  },
  created() {
    this.getUserContractUsdt(); // 获取合约资产
    // 保存刷新后的数量单位
    this.$nextTick((_) => {
      if (this.quantityUnit && this.unitVal != this.quantityUnit) {
        this.unitVal = Number(this.quantityUnit);
        this.amountUnit = this.quantityList.find(
          (item) => item.value == this.quantityUnit
        )?.label;
        this.handleSumConver();
      }
    });
    this.getPrice();
  },
  methods: {
    faceValueTip(value, callback) {
      if (
        value &&
        (value / this.contractInfo.faceValue)>0 && !Number.isInteger((value*1000000 / this.contractInfo.faceValue)/1000000) &&
        this.unitVal == 3
      ) {
        callback(
          new Error(this.$t("contract.须为面值", [this.contractInfo.faceValue]))
        );
      } else {
        callback();
      }
    },
    // 打开下单弹框
    handleBayOrSellVis(type, amount) {
      if (this.userStatus.userUSDTContractTradeStatus == "FORBIDDEN") {
        this.stopVisible = true;
        return;
      }
      this.isComponentMounted = false;
      this.rulesPlease = type[0] == 1 ? "buy" : "sell";

      this.$refs["virtuallyForm"].validate((valid, rej) => {
        if (valid) {
          const directionType = {
            "00": {
              label: this.$t(`${this.t}卖出开空`),
              value: "00",
            },
            "01": {
              label: this.$t(`${this.t}卖出平多`),
              value: "01",
            },
            11: {
              label: this.$t(`${this.t}买入开多`),
              value: "11",
            },
            10: {
              label: this.$t(`${this.t}买入平空`),
              value: "10",
            },
          };

          this.isBfbUnit = this.leverValue != 0 ? true : false;
          this.placeOrderVisible = true;
          this.typeBtnTxt = directionType[type];
          console.log("this.typeBtnTxt", this.typeBtnTxt);
          // 空1 | 多2
          this.virtuallyForm.type = type.substr(-1) == "1" ? 1 : 2;
          // 克隆是为了不影响转换
          this.placeParams = deepClone(this.virtuallyForm);
          //  如果是百分比进行数量转换
          if (this.leverValue != 0) {
            let sliderVal = this.placeParams.amount.replace("%", "");
            let count = checkUtils.accDiv(sliderVal, 100);
            this.placeParams.amount =
              this.amountUnit == "张"
                ? parseInt(checkUtils.accMul(amount, count))
                : this.amountUnit == "USDT"
                ? checkUtils.accMul(amount, count)
                : checkUtils.accMul(
                    checkUtils.accDiv(amount, this.contractInfo.faceValue),
                    count
                  );
          }
        }
      });
    },
    // 下单成功
    handleSuccess() {
      this.$store.dispatch("handlePlaceOrder", true);
      this.$refs.virtuallyForm.resetFields();
      this.leverValue = 0;
      this.isComponentMounted = true;
      this.placeOrderVisible = false;
      this.$emit("next");
      this.$message({
        message: `${this.$t(`${this.t + "下单成功！"}`)}`,
        type: "success",
      });
    },
    // 获取单个交易对信息
    getMarketSybomlList() {
      if (!this.contractCoin.symbol || !this.contractCoin.marketType) return;
      marketSybomlList({
        symbolCode: this.contractCoin.symbol,
        marketType: this.contractCoin.marketType,
      }).then((res) => {
        // 数量单位
        this.quantityList = [
          { label: "张", value: 1 },
          { label: res.data?.quoteAssetCode, value: 2 },
          { label: res.data?.baseAssetCode, value: 3 },
        ];
        this.amountUnit = this.quantityList.find(
          (item) => item.value == this.quantityUnit
        )?.label;
        res.data.amountUnit = this.amountUnit;
        // console.log(res.data,'546456451231阿萨德')
        this.$store.dispatch("handleContract", res.data);
        this.handleResule(res.data.singleMinQty);
      });
    },

    // 输入框限制
    changeInput(e, type) {
      this.isComponentMounted = false;
      // 直接修改e.target.value可能不会触发Vue的双向数据绑定更新机制。
      let val = e.target.value;
      // 输入价格获取下单量限制
      type == "price" && this.handleSumConver();
      // 输入时显示tip
      type == "amount" && this.getPopoverDom(val);
      // 输入校验
      this.virtuallyForm[type] = changeNumberVal(
        val,
        type == "amount"
          ? this.contractInfo?.quantityDecimal
          : this.contractInfo?.priceDecimal,
        ""
      );
    },
    // 获取popver提示
    getPopoverDom(val, type = undefined) {
      const tooltip = document.querySelectorAll(".quantity-popover")[0];
      type = type || (val || this.virtuallyForm.amount ? "block" : "none");
      if (this.token) {
        tooltip.style.display = type;
      }
    },
    changeFocus() {
      this.leverValue = 0;
      this.handleResule(this.virtuallyForm.amount);
      this.getPopoverDom(this.virtuallyForm.amount);
    },
    changeBlur() {
      const tooltip = document.querySelectorAll(".quantity-popover")[0];
      tooltip.style.display = "none";
    },
    // 输入校验与popver文案提示
    handleResule(value) {
      if (!this.token) return;
      // 取最大买卖数量
      const maxBayQty = this.canOpenOrFlatBay;
      const maxSellQty = this.canOpenOrFlatSell;
      const isMaxVal = Math.max(maxBayQty, maxSellQty);
      // console.log(this.contractInfo)
      // 取最小下单数量，并进行单位转换
      const converMin = this.convertAmountByCurrency(
        this.contractInfo.singleMinQty,
        this.amountUnit
      );
      // 截取精度后的值
      this.oneConvertUnit = truncateDecimal(
        converMin,
        this.contractInfo?.quantityDecimal
      );
      // 判断是否超出买/卖限制
      let displayType = undefined;
      // 根据不同的情况设置提示文本和显隐
      if (this.rulesPlease) {
        // 如果是 % 就是正常范围
        if (String(value)?.includes("%")) {
          return false;
        }
        // 下单提示校验
        if (this.rulesPlease === "buy") {
          // 文字tip
          this.rulesTxt =
            value > maxBayQty
              ? `${this.$t(this.t + "最大买入下单数量为")} ${maxBayQty} `
              : `${this.$t(this.t + "最小买入下单数量为")} ${
                  this.oneConvertUnit
                } `;

          displayType = value > maxBayQty || value < this.oneConvertUnit;
        } else if (this.rulesPlease === "sell") {
          // 文字tip
          this.rulesTxt =
            value > maxSellQty
              ? `${this.$t(this.t + "最大卖出下单数量为")} ${maxSellQty} `
              : `${this.$t(this.t + "最小卖出下单数量为")} ${
                  this.oneConvertUnit
                } `;

          displayType = value > maxSellQty || value < this.oneConvertUnit;
        }
        this.getPopoverDom(value, displayType == true ? "block" : "none");
        this.rulesPlease = undefined;
      } else {
        // 输入提示
        this.rulesTxt = `${
          value > isMaxVal
            ? `${this.$t(this.t + "最大下单数量")} ${isMaxVal}`
            : `${this.$t(this.t + "最小下单数量")} ${this.oneConvertUnit}`
        } `;
      }
      this.rulesTxt +=
        this.amountUnit == "张" ? this.$t(this.t + "张") : this.amountUnit;
      return (
        !value || value < this.oneConvertUnit || value > isMaxVal || displayType
      );
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
        this.virtuallyForm.amount =
          this.leverValue != 0 ? this.leverValue + "%" : "";
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

    /** 计算可开张数 | 最小可开 */
    calculateCanOpen(leverType = undefined) {
      // 面值 | 手续费
      const { faceValue, openTakerFee } = this.contractInfo;

      // 价格 (限价就用输入的价格)
      const lastPrice =
        this.activePrice == 0
          ? this.virtuallyForm.price
          : this.priceObj.lastPrice;
      // 可用保证金（最新价格）
      const availableDeposit = this.availableDeposit;
      // （最新价格 * 面值）计算价格
      const countPrice = checkUtils.accMul(lastPrice, faceValue);
      // 可开 = 可用保证金 * 杠杆 /（最新价格 * 面值 faceValue） newValue.markedPrice 标记价格暂时不用
      const canOpen = checkUtils.accDiv(
        checkUtils.accMul(availableDeposit, this.leverInfo[leverType]),
        countPrice
      );
      // 实际可开张数 = 【可用保证金 -（可开张数 * 面值0.01 * 最新价格 * 手续费费率0.0005）】* 杠杆 /（最新价格 * 面值）
      let result = checkUtils.accDiv(
        checkUtils.accMul(
          availableDeposit -
            checkUtils.accMul(
              parseInt(canOpen),
              faceValue,
              lastPrice,
              openTakerFee
            ),
          this.leverInfo[leverType] // 杠杆
        ),
        countPrice
      );
      // console.log(result)
      return !result ? 0 : result;
    },

    //  需要“转换的币种” 转换成其他币种
    convertAmountByCurrency(amount, type) {
      // 最新价格
      const lastPrice =
        this.activePrice == 0
          ? this.virtuallyForm.price
          : this.priceObj.lastPrice;
      const { faceValue } = this.contractInfo;
      amount = parseInt(amount);
      /* 计算“张”转 USDT */
      // 计算价格（最新价格 * 面值）
      const countPrice = checkUtils.accMul(lastPrice, faceValue);
      // 计算“张”转任意单位	1 张 2 USDT 3 其他单位
      const labelToHandler = {
        1: amount,
        2: type == "USDT" ? countPrice : checkUtils.accMul(amount, countPrice),
        3: checkUtils.accMul(amount, faceValue),
      };
      const handler = labelToHandler[this.quantityUnit];
      return handler || 0;
    },

    // 调用计算函数和转换方法
    handleSumConver() {
      if (!this.token) return;

      let canOpenOrFlatBay = 0;
      let canOpenOrFlatSell = 0;

      // 如果是平仓直接取后端 开仓择需要计算 【tabsIndex 1 开仓 2平仓 positionType 0 全仓 1 逐仓 】
      if (this.leverInfo.positionType === 0) {
        canOpenOrFlatBay =
          this.tabsIndex == 1
            ? this.calculateCanOpen("defaultValue")
            : this.posiNull;
        canOpenOrFlatSell =
          this.tabsIndex == 1 ? canOpenOrFlatBay : this.posiMuch;
      } else {
        canOpenOrFlatBay =
          this.tabsIndex == 1
            ? this.calculateCanOpen("warehouseMuchPosition")
            : this.posiNull;
        canOpenOrFlatSell =
          this.tabsIndex == 1
            ? this.calculateCanOpen("warehouseShortPosition")
            : this.posiMuch;
      }
      // 转换币种（买）
      this.canOpenOrFlatBay = this.convertAmountByCurrency(canOpenOrFlatBay);
      // console.log("prompt", this.canOpenOrFlatBay);

      // 转换币种（卖）
      this.canOpenOrFlatSell = this.convertAmountByCurrency(canOpenOrFlatSell);
    },
    // 切换价格类型
    handleActivePriceType(val) {
      val == 0
        ? (this.virtuallyForm.price = this.priceObj?.lastPrice)
        : undefined;
      val != 2 && (this.activePrice = val);
    },
    // 获取合约资产
    async getUserContractUsdt() {
      if (getToken()) {
        await userContractUsdt().then((res) => {
          this.property = res.data;
        });
      }
    },
    getPrice() {
      this.$EventBus.$on("sendPrice", (msg) => {
        if (this.active == 0) {
          this.virtuallyForm.price = msg;
        }
      });
    },
  },
  watch: {
    contractInfo: {
      handler(val) {},
      immediate: true,
    },
    // 数量单位
    unitVal: {
      handler(newValue) {
        this.$store.dispatch("handleQuantityUnit", newValue);
        if (this.quantityList?.length) {
          this.amountUnit = this.quantityList.find(
            (item) => item.value == newValue
          )?.label;
          this.contractInfo.amountUnit = this.amountUnit;
          this.handleResule(this.contractInfo.singleMinQty);
        }
        this.isComponentMounted = true;
        this.virtuallyForm.amount = "";
        this.handleSumConver();
      },
    },
    // 切换价格类型
    active: {
      handler(newVal) {
        this.leverValue = 0;
        this.$refs.virtuallyForm.resetFields();
        this.handleActivePriceType(newVal);
      },
    },
    // 实时金额
    priceObj: {
      async handler(newValue) {
        if (!this.token) return;
        // 调用计算函数和转换方法
        this.handleSumConver();
      },
    },
    //下单成功 刷新资产
    isPlaceOrder: {
      async handler(value) {
        if (value) {
          await this.getUserContractUsdt(); // 获取合约资产
          this.handleSumConver(); //计算单位转换
        }
      },
    },
    // 监听币种属性的变化
    contractCoin: {
      handler(newValue) {
        for (let key in this.virtuallyForm) {
          this.virtuallyForm[key] = "";
        }
        this.getMarketSybomlList(); // 获取交易对信息
      },
    },
    // 止盈止损是否选中
    checked: {
      handler(newValue) {
        if (!newValue) {
          this.virtuallyForm.triggerProfitPrice = undefined;
          this.virtuallyForm.triggerLossPrice = undefined;
        }
      },
    },
  },
  computed: {
    // 截取小数 可开
    canOpenOrFlatBayTxt() {
      const toFixNum = truncateDecimal(
        this.canOpenOrFlatBay,
        this.contractInfo?.quantityDecimal
      );
      return toFixNum;
    },
    // 截取小数 可平
    canOpenOrFlatSellTxt() {
      const toFixNum = truncateDecimal(
        this.canOpenOrFlatSell,
        this.contractInfo?.quantityDecimal
      );
      return toFixNum;
    },
    // 保证金 可用usdt
    availableDeposit() {
      return (
        this.availableObj?.availableDeposit ||
        this.property?.availableDeposit ||
        0
      );
    },
    ...mapState({
      // 获取用户交易状态
      userStatus: (state) => state.login.userStatus,
      // 实时价格
      priceObj: (state) => state.contract?.priceObj,
      // 合约币种
      contractCoin: (state) => state.contract?.contractCoin,
      // 单个交易对(合约)信息
      contractInfo: (state) => state.contract?.contractInfo,
      // 获取合约杠杆信息
      leverInfo: (state) => state.contract?.leverInfo,
      // 实时保证金
      availableObj: (state) => state.contract?.availableObj,
      // token
      token: (state) => state.login?.token,
      // 数量单位
      quantityUnit: (state) => state.contract?.quantityUnit,
      isPlaceOrder: (state) => state.contract?.isPlaceOrder,
    }),
  },
};
</script>
<style lang="scss">
// 滑块slider 样式
.el-tooltip__popper,
.is-dark {
  background: var(--theme-color) !important;
}

.el-tooltip__popper .popper__arrow {
  border-top-color: var(--theme-color) !important;

  &::after {
    border-top-color: var(--theme-color) !important;
  }
}

// 下拉框 select 样式
.el-scrollbar {
  border-radius: 6px;
}

.unitSelect,
.newpirse {
  .popper__arrow {
    display: none !important;
  }
}

.el-select-dropdown,
.el-popper {
  border: none;
  border-radius: 8px;
}

.el-select-dropdown__list {
  padding: 0;
}

.quantity-popover {
  width: unset !important;
  padding: 10px;
  background: #5e6673;
  font-size: 12px;
  color: white;
  right: 20px !important;
  left: unset !important;
  top: -55px;
  display: none;
}
</style>

<style lang="scss" scoped>
.button_hover {
  &:hover {
    opacity: 0.8;
  }
}

::v-deep .is-error .el-input__inner {
  border-color: #f56c6c !important;
}

::v-deep .input {
  border-radius: 6px;
  border: 1px solid transparent;

  > .el-input__inner {
    border: 1px solid transparent;
    color: var(--trade-text-color);
    background: var(--trade--tabs-input-bg);

    &:focus,
    &:hover {
      border: 1px solid #90ff00;
    }
  }
}

::v-deep .profit_active,
.loss_active {
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #90ff00;
  }
}

::v-deep .inputFocus_active {
  > .el-input__inner {
    border: 1px solid #90ff00;
  }
}

::v-deep .el-dialog {
  border-radius: 26px;

  &__body {
    padding: 8px 0 30px;
  }
}

.market {
  color: var(--trade-text-color);

  .text {
    color: #90ff00;
  }

  .suffix {
    color: var(--trade-text-color);
  }

  .money {
    padding: 22px 0;
    font-size: 14px;
    color: #96a2b2;

    span {
      color: var(--trade-text-color);
    }
  }

  ::v-deep .inputKeQuery {
    .el-input__inner {
      width: 320px;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
    }
  }

  .inputReadonly {
    width: 320px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border-radius: 6px;
    color: var(--trade-text-color);
    background: var(--trade--tabs-disabled-input-bg);
    border-radius: 6px;
  }
  .merarket {
    width: 220px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border-radius: 6px;
    color: var(--trade-text-color);
    background: var(--trade--tabs-input-bg);
  }
  ::v-deep .plane {
    .cfpirse {
      .el-input__inner {
        color: var(--trade-text-color);
        width: 220px;
        height: 40px;
        padding-left: 10px;
      }
    }

    .borderSty {
      border: 1px solid transparent;

      &:hover {
        border: 1px solid #90ff00;
      }
    }

    .newpirse {
      border-radius: 6px;
      width: 90px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: var(--trade--tabs-input-bg);

      .el-input__inner {
        text-align: center;
        color: var(--trade-text-color);
        border: 1px solid transparent !important;
        background: var(--trade--tabs-input-bg) !important;

        &:focus,
        &:hover {
          border: 1px solid #90ff00 !important;
        }
      }
    }
  }

  .el-form-item {
    margin-bottom: 5px;
  }

  ::v-deep .quantity {
    margin-bottom: 20px;
    .unitSelect {
      .el-input__inner {
        border: none;
        background: var(--trade--tabs-input-bg);
        height: 24px;
        text-align: right;
        color: var(--trade-text-color);
        max-width: 120px;
      }
    }

    .popper__arrow {
      left: auto !important;
      right: 40px !important;
    }

    .el-input__prefix {
      left: auto;
      right: 10px;
    }

    .el-select__caret {
      display: none;
    }
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
      background: url("@/assets/contract-imgs/level.png") no-repeat center /
        14px 14px;
    }

    .el-slider__marks-text {
      width: max-content;
      margin-top: 20px;
      font-size: 12px;
      color: #8992a6;
    }
  }

  .checkbox {
    height: 30px;
    font-size: 14px;

    .el-checkbox {
      color: var(--trade-text-color);
    }

    .tip {
      ::v-deep .el-image__inner {
        vertical-align: baseline;
      }
    }
  }

  ::v-deep .profitEloss {
    .mr10 {
      color: var(--trade-text-color);
    }
  }

  .nologin {
    width: 100%;
    .register {
      ::v-deep .el-button {
        width: 100%;
        color: var(--trade-text-color);
        background: #90ff00;
        border-radius: 4px;
        border: none;
      }
    }
    .login {
      ::v-deep .el-button {
        width: 100%;
        color: var(--trade-text-color);
        background: var(--trade--tabs-input-bg);
        border-radius: 4px;
        border: none;
      }
    }

    .el-button + .el-button {
      margin-left: 0;
    }

    // .el-button:hover {
    // 	background-color: transparent;
    // 	border: 1px solid #90ff00;
    // }
  }

  .bayAndSell {
    width: 100%;

    div {
      cursor: pointer;
      text-align: center;
      width: 153px;
      line-height: 38px;
      height: 38px;
      border-radius: 6px;
      color: #fff;
    }

    .baybtn {
      background: #90ff00;
    }

    .sellbtn {
      background: #f75f52;
    }
  }

  .rate {
    font-size: 14px;
    color: #96a2b2;

    span {
      color: var(--trade-text-color);
    }
  }

  .ratio {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    padding: 0 10px;
    font-size: 14px;
    border: 1px solid var(--trade-line-color);
    color: #96a2b2;

    .unit {
      color: #000;
    }

    ::v-deep .el-image__inner {
      vertical-align: middle !important;
    }
  }

  .property {
    width: 320px;
    border-top: 1px solid var(--trade-slider-col);
    // border-bottom: 1px solid var(--trade-slider-col);
    padding: 10px;
    font-size: 14px;

    .line {
      font-size: 12px;
      line-height: 25px;
      color: #96a2b2;
    }

    .value {
      color: var(--trade-text-color);
    }
  }

  .hyInfo {
    width: 100%;
    font-size: 14px;

    .unit {
      color: #333;
    }

    ::v-deep .el-image__inner {
      vertical-align: middle !important;
    }

    .line {
      line-height: 30px;
      color: #96a2b2;
    }

    .value {
      color: var(--trade-text-color);
    }

    ::v-deep .el-collapse {
      border-top: 1px solid var(--trade-slider-col);
      border-bottom: 1px solid var(--trade-slider-col);
      padding: 0 10px 3px;
      background-color: var(--main-bg);

      .el-icon-arrow-right:before {
        content: "";
        display: none;
      }

      .el-collapse-item__header {
        border-bottom: none;
        background-color: var(--main-bg);
        color: var(--trade-text-color);
      }

      .el-collapse-item__arrow {
        display: none;
      }

      .el-collapse-item__wrap {
        border: none;
      }

      .el-collapse-item__content {
        background-color: var(--main-bg);
        padding-bottom: 5px;
      }
    }
  }
}

.block {
  color: var(--trade-text-color);
}
</style>
