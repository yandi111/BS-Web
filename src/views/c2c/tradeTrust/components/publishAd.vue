<!-- 发布广告 -->
<template>
  <div class="publish-ad">
    <div>
      <div class="header-title mb40">
        <span>{{ $t(t + title) }}{{ $t(t + "广告") }}</span>
      </div>
      <el-form
        label-position="left"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAlign"
      >
        <ul class="inline-container df aic jb fww">
          <li class="prover">
            <div class="label tf14">{{ $t(t + "选择币种") }}</div>
            <el-form-item prop="coinId">
              <el-select
                class="select"
                ref="deal"
                v-model="formLabelAlign.coinId"
                :placeholder="$t(t + '选择需要充值的币种')"
                @change="getLabelDeal"
              >
                <el-option
                  v-for="item in dealList"
                  :key="item.id"
                  :label="item.coinName"
                  :value="item.coinId"
                />
              </el-select>
            </el-form-item>
          </li>
          <li class="prover">
            <div class="label tf14">{{ $t(t + "货币类型") }}</div>
            <el-form-item prop="legalTenderId">
              <el-select
                class="select"
                ref="legal"
                v-model="formLabelAlign.legalTenderId"
                :placeholder="$t(t + '请选择货币类型')"
                @change="getLabelLegal"
              >
                <el-option
                  v-for="item in legalList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </li>
          <li class="prover">
            <div class="label tf14">{{ $t(t + "广告类型") }}</div>
            <el-form-item prop="type">
              <el-select
                class="select"
                v-model="formLabelAlign.type"
                :placeholder="$t(t + '请选择广告类型')"
              >
                <el-option
                  v-for="item in adviceList"
                  :key="item.value"
                  :label="$t(t + item.label)"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </li>
          <li class="prover">
            <div class="label minWidth60 tf14">{{ $t(t + "价格单价") }}</div>
            <el-form-item
              v-if="formLabelAlign.isRealTimePrice === 0"
              prop="unitPrice"
              class="pirce"
            >
              <el-input
                v-model="formLabelAlign.unitPrice"
                :placeholder="$t(t + '请输入价格')"
                @input.native="(e) => inputMoney(e, undefined)"
              ></el-input>
            </el-form-item>
            <el-form-item prop="isRealTimePrice">
              <el-select
                class="select"
                v-model="formLabelAlign.isRealTimePrice"
                @change="changPrice"
              >
                <el-option
                  v-for="item in priceList"
                  :key="item.value"
                  :label="$t(t + item.label)"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li>
            <div class="label tf14">
              {{ $t(t + "数量") + formLabelAlign.coinName }}
            </div>
            <el-form-item prop="beleftQuantity">
              <el-input
                class="select"
                v-model="formLabelAlign.beleftQuantity"
                :placeholder="$t(t + '交易数量')"
                @input.native="(e) => inputMoney(e, 'number')"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <div class="label tf14">
              {{ $t(t + "最小金额") }}({{ formLabelAlign.legalTenderName }})
            </div>
            <el-form-item prop="minMoney">
              <el-input
                class="select"
                v-model="formLabelAlign.minMoney"
                :placeholder="$t(t + '最小交易数量')"
                @input.native="(e) => inputMoney(e, 'money')"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <div class="label tf14">
              {{ $t(t + "最大金额") }}({{ formLabelAlign.legalTenderName }})
            </div>
            <el-form-item prop="maxMoney">
              <el-input
                class="select"
                v-model="formLabelAlign.maxMoney"
                :placeholder="$t(t + '最大交易数量')"
                @input.native="(e) => inputMoney(e, 'money')"
              ></el-input>
            </el-form-item>
          </li>
          <li class="paymentMethod">
            <div class="label tf14">{{ $t(t + "收款方式") }}</div>
            <el-form-item prop="accountId" class="payMenuType">
              <div class="no-pay" @click="addPayShow = true">
                <div class="payName" v-if="formLabelAlign.accountId">
                  {{ payTypeName }} <i class="iconfont icon-down"></i>
                </div>
                <div v-else>
                  {{ $t(t + "请") }} <span>{{ $t(t + "选择") }}</span>
                  {{ $t(t + "账户") }}
                </div>
              </div>
            </el-form-item>
          </li>
          <li>
            <div class="label tf14">{{ $t(t + "收款账户") }}</div>
            <el-form-item>
              <el-tooltip
                popper-class="atooltip"
                effect="light"
                :content="payToolTip"
                placement="top-start"
              >
                <div class="normal-height">
                  <span v-for="(item, index) in chooseList" :key="index">
                    {{ item.lastNum }}</span
                  >
                </div>
              </el-tooltip>
            </el-form-item>
          </li>
          <li>
            <div class="label tf14">{{ $t(t + "交易期限") }}</div>
            <el-form-item prop="tradingTime">
              <el-select
                class="select"
                v-model="formLabelAlign.tradingTime"
                :placeholder="$t(t + '请选择') + $t(t + '交易期限')"
              >
                <el-option
                  v-for="item in timeList"
                  :key="item.dealDeadline"
                  :label="$t(t + 'time_label', [item.dealDeadline])"
                  :value="item.dealDeadline"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li class="df aic jb">
            <div class="label tf14">{{ $t(t + "自动接单") }}</div>
            <el-switch
              v-model="formLabelAlign.autoAccept"
              active-color="#34C759"
              inactive-color="#CFCFCF"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </li>
          <li class="df aic jb">
            <div class="label tf14">{{ $t(t + "立即上架") }}</div>
            <el-switch
              v-model="formLabelAlign.status"
              active-color="#34C759"
              inactive-color="#CFCFCF"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </li>
          <li class="remark">
            <div class="label tf14">{{ $t(t + "备注") }}</div>
            <el-form-item prop="remark">
              <el-input
                v-model="formLabelAlign.remark"
                class="textarea"
                type="textarea"
                show-word-limit
                :row="3"
                maxlength="20"
                :placeholder="$t(t + '请输入') + $t(t + '备注')"
              ></el-input>
            </el-form-item>
          </li>
        </ul>
        <div class="btns df aic">
          <my-button @click="publish">{{ $t(t + title) }}</my-button>
        </div>
      </el-form>
    </div>
    <validate-info
      :is-show.sync="validateShow"
      :params="params"
      :isVerify="isVerify"
      @next="handleNext"
    ></validate-info>

    <choose-pay
      :addPayShow.sync="addPayShow"
      :chooseList="chooseList"
      v-if="addPayShow"
      @next="choosePay"
      @cancelPay="addPayShow = false"
    ></choose-pay>
  </div>
</template>

<script>
import ValidateInfo from "./validateInfo.vue";
import { authItemStong } from "@/api/common";
import { simpleApi } from "@/api/assetWallet.js";
import ChoosePay from "../../components/popup/choosePay.vue";
import { changeNumberVal } from "@/libs/utils.js";
import {
  getLegalTender,
  payList,
  advertisingAdd,
  advertisingUpdate,
  checkAdvertising,
  getQuantity,
  getAmount,
  deadlineGet,
} from "@/api/otc.js";

export default {
  name: "PublishAd",
  components: {
    ValidateInfo,
    ChoosePay,
  },

  data() {
    const rulesQuantity = (rule, value, callback) => {
      callback(
        this.formLabelAlign.isRealTimePrice == 0 &&
          !Number(this.formLabelAlign.unitPrice)
          ? new Error("请先输入价格单价")
          : !Number(value)
          ? new Error("请输入交易数量")
          : Number(this.limitQuantity?.max) < Number(value)
          ? new Error(`不能大于${this.limitQuantity?.max}`)
          : Number(this.limitQuantity?.min) > Number(value)
          ? new Error(`不能小于${this.limitQuantity?.min}`)
          : undefined
      );
    };
    const rulesMinAmount = (rule, value, callback) => {
      callback(
        this.formLabelAlign.isRealTimePrice == 0 &&
          !Number(this.formLabelAlign.unitPrice)
          ? new Error("请先输入价格单价")
          : !this.formLabelAlign.beleftQuantity
          ? new Error("请先输入数量")
          : !Number(value)
          ? new Error("请输入最小金额")
          : Number(this.limitMinMoney) > Number(value)
          ? new Error(`不能小于${this.limitMinMoney}`)
          : Number(this.limitMaxMoney) < Number(value)
          ? new Error(`不能大于${this.limitMaxMoney}`)
          : this.formLabelAlign?.maxMoney
          ? Number(value) > Number(this.formLabelAlign?.maxMoney)
            ? new Error(`不能大于最大金额`)
            : undefined
          : undefined
      );
    };
    const rulesMaxAmount = (rule, value, callback) => {
      callback(
        this.formLabelAlign.isRealTimePrice == 0 &&
          !Number(this.formLabelAlign.unitPrice)
          ? new Error("请先输入价格单价")
          : !this.formLabelAlign.beleftQuantity
          ? new Error("请先输入数量")
          : !Number(value)
          ? new Error("请输入最大金额")
          : Number(this.limitMinMoney) > Number(value)
          ? new Error(`不能小于${this.limitMinMoney}`)
          : Number(this.limitMaxMoney) < Number(value)
          ? new Error(`不能大于${this.limitMaxMoney}`)
          : this.formLabelAlign?.minMoney
          ? Number(value) < Number(this.formLabelAlign?.minMoney)
            ? new Error(`不能小于最小金额`)
            : undefined
          : undefined
      );
    };
    return {
      isEdit: false,
      title: "发布",
      payTypeName: undefined,
      params: {},
      chooseList: [],
      addPayShow: false,
      addShow: false,
      validateShow: false,
      isVerify: false, //多重校验
      dealList: [],
      adviceList: [
        { label: "买", value: 1 },
        { label: "卖", value: 0 },
      ],
      priceList: [
        { label: "固定价格", value: 0 },
        { label: "实时价格", value: 1 },
      ],
      payList: [
        { label: "银行卡", value: 1 },
        { label: "支付宝", value: 2 },
        { label: "微信", value: 3 },
      ],
      timeList: [],
      formLabelAlign: {
        id: undefined,
        coinId: "",
        coinIcon: "",
        type: 1,
        unitPrice: undefined, // 价格
        beleftQuantity: undefined, // 数量
        minMoney: "",
        maxMoney: "",
        incomeId: "",
        accountId: "",
        tradingTime: "",
        autoAccept: 1,
        remark: undefined,
        status: 1,
        isRealTimePrice: 0, // 价格类型
        coinName: "",
        legalTenderId: "",
        legalTenderName: "",
        legalTenderSymbol: "",
      },
      legalList: [],
      options: [],
      // 限制条件
      limitQuantity: undefined,
      limitMoney: undefined,
      limitMaxMoney: undefined,
      // 精度
      decimalPlaces: null,
      retentionAccuracy: null,
      // 国际缩写
      t: "c2c.",
      rules: {
        legalTenderId: [
          { required: true, message: "请选择币种", trigger: "change" },
        ],
        coinId: [{ required: true, message: "请选择法币", trigger: "change" }],
        type: [
          { required: true, message: "请选择广告类型", trigger: "change" },
        ],
        unitPrice: [
          { required: true, message: "请输入价格", trigger: "change" },
        ],

        beleftQuantity: [
          {
            required: true,
            validator: rulesQuantity,
            trigger: ["blur", "change"],
          },
        ],
        minMoney: [
          {
            required: true,
            validator: rulesMinAmount,
            trigger: ["blur", "change"],
          },
        ],
        maxMoney: [
          {
            required: true,
            validator: rulesMaxAmount,
            trigger: ["blur", "change"],
          },
        ],

        accountId: [
          { required: true, message: "请选择账户", trigger: "change" },
        ],
        tradingTime: [
          { required: true, message: "请选择交易期限", trigger: "change" },
        ],
        autoAccept: [
          { required: true, message: "请选择接单类型", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        isRealTimePrice: [
          { required: true, message: "请选择价格类型", trigger: "change" },
        ],
      },
    };
  },
  created() {
    Promise.all([
      this.getLegalTender(),
      this.getSimpleApi(),
      this.getTimeList(),
    ]).then(() => {});
  },
  computed: {
    payToolTip() {
      let tipText = null;
      if (this.chooseList && this.chooseList.length > 0) {
        tipText = this.chooseList.map((item) => item.lastNum).join(" | ");
      }
      return tipText;
    },
  },

  methods: {
    //获取交易期限
    getTimeList() {
      return new Promise((resolve, reject) => {
        deadlineGet()
          .then((res) => {
            this.timeList = res.data;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 编辑委托单
    getEchoForm(row) {
      console.log("row", row);
      // 数据回显
      this.title = "编辑";
      this.isEdit = true;
      for (let key in this.formLabelAlign) {
        if (row.hasOwnProperty(key)) {
          this.formLabelAlign[key] = row[key];
        }
      }

      this.formLabelAlign["id"] = row.id;
      // 获取支付方式
      payList({ ids: 0, status: 1 }).then((res) => {
        res.data = res.data.map((item) => {
          // console.log("item.type :>> ", item.type);
          item.lastNum =
            item.type === 1
              ? `${item?.bankName} 尾号${item?.num.substr(-4)}`
              : item.type === 2
              ? `支付宝`
              : item.type === 3
              ? `微信`
              : item.type;
          return item;
        });
        var accountIdArray = row.accountId.split(",").map(Number);
        var result = [];
        res.data.forEach(function (obj) {
          if (accountIdArray.includes(obj.id)) {
            result.push(obj);
          }
        });
        this.chooseList = result;
        // console.log("result", result);
        const paySelect = this.chooseList.map((item) => item.type);
        this.payTypeName = paySelect
          .map(
            (item) =>
              (item =
                item == 1
                  ? "银行卡"
                  : item == 2
                  ? "支付宝"
                  : item == 3
                  ? "微信"
                  : "")
          )
          .join(",");
        this.formLabelAlign["incomeId"] = paySelect.join(",");
        this.formLabelAlign["accountId"] = this.chooseList
          .map((item) => item.id)
          .join(",");
      });
    },
    // 法币
    getLabelLegal() {
      this.$nextTick(() => {
        this.formLabelAlign.legalTenderName = this.$refs.legal.selected.label;
        this.formLabelAlign.legalTenderSymbol = this.legalList.find(
          (item) => item.name == this.$refs.legal.selected.label
        )?.symbol;
      });
    },
    // 虚拟币
    getLabelDeal() {
      this.$nextTick(() => {
        this.formLabelAlign.coinName = this.$refs.deal.selected.label;
        //存发布币种
        //  this.$store.commit("setPubSymbol", this.formLabelAlign.coinName);
        this.formLabelAlign.coinIcon = this.dealList.find(
          (item) => item.coinName == this.$refs.deal.selected.label
        )?.iconUrl;
      });
    },
    // 输入事件监听
    inputMoney(e, type) {
      const input = e.target.value;
      if (
        type &&
        input &&
        this.formLabelAlign.unitPrice &&
        this.formLabelAlign.beleftQuantity
      ) {
        this.getQuantity();
        this.getAmount();
      }
      // 限制小数位数为2位
      const decimalPlaces =
        type == "number"
          ? this.decimalPlaces
          : type == "money"
          ? this.retentionAccuracy
          : 2;
      e.target.value = changeNumberVal(e.target.value, decimalPlaces);
    },
    // 切换价格类型
    changPrice(value) {
      value === 0 && (this.formLabelAlign.unitPrice = "");
    },
    // 选中
    choosePay(list) {
      if (list && list.length > 0) {
        this.chooseList = list;
        this.formLabelAlign.incomeId = this.chooseList
          .map((item) => item.type)
          .join(",");
        this.formLabelAlign.accountId = this.chooseList
          .map((item) => item.id)
          .join(",");
        const paySelect = list.map((item) => item.type);
        this.payTypeName = paySelect
          .map(
            (item) =>
              (item =
                item == 1
                  ? "银行卡"
                  : item == 2
                  ? "支付宝"
                  : item == 3
                  ? "微信"
                  : "")
          )
          .join(",");
      }
    },
    // 获取虚拟列表
    getSimpleApi() {
      return new Promise((resolve, reject) => {
        simpleApi({ isType: 1 })
          .then((res) => {
            const r = res.data.data;
            console.log("r", r);
            this.dealList = r;
            if (!this.isEdit) {
              this.formLabelAlign.coinId = r[0]?.coinId;
              this.formLabelAlign.coinName = r[0]?.coinName;
              this.formLabelAlign.coinIcon = r[0]?.iconUrl;
            }
            this.decimalPlaces = r[0]?.decimalPlaces;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取法币列表
    getLegalTender() {
      return new Promise((resolve, reject) => {
        getLegalTender()
          .then((res) => {
            const r = res.data.data;
            this.legalList = r;
            this.formLabelAlign.legalTenderId = r[0]?.id;
            this.formLabelAlign.legalTenderName = r[0]?.name;
            this.formLabelAlign.legalTenderSymbol = r[0]?.symbol;
            this.retentionAccuracy = r[0]?.retentionAccuracy;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 发布
    publish() {
      console.log("this.formLabelAlign", this.formLabelAlign);

      this.$refs.formLabelAlign.validate((valid) => {
        if (valid) {
          checkAdvertising(this.formLabelAlign).then((res) => {
            // 查询商户信息
            authItemStong({ data: this.formLabelAlign["id"] ? 37 : 36 }).then(
              (auth) => {
                // 验证参数
                this.params = {
                  email: auth.data.email,
                  phone: auth.data.phone,
                  authToken: auth.data.authToken,
                  bizType: this.formLabelAlign["id"] ? 37 : 36,
                  tradePasswordStatus: auth.data.tradePasswordStatus,
                  authGoogleAuth: auth.data.authGoogleAuth,
                };
                this.validateShow = true;
              }
            );
          });
        }
      });
    },
    // 获取数量限制
    getQuantity() {
      getQuantity({
        legalTenderId: this.formLabelAlign.legalTenderId,
        legalTenderName: this.formLabelAlign.legalTenderName,
        coinId: this.formLabelAlign.coinId,
        coinName: this.formLabelAlign.coinName,
        type: this.formLabelAlign.type,
        isRealTimePrice: this.formLabelAlign.isRealTimePrice,
        unitPrice:
          this.formLabelAlign.isRealTimePrice == 0
            ? this.formLabelAlign.unitPrice
            : undefined,
      }).then((res) => {
        this.limitQuantity = res.data;
      });
    },
    // 获取金额限制
    getAmount() {
      getAmount({
        legalTenderId: this.formLabelAlign.legalTenderId,
        legalTenderName: this.formLabelAlign.legalTenderName,
        coinId: this.formLabelAlign.coinId,
        coinName: this.formLabelAlign.coinName,
        type: this.formLabelAlign.type,
        isRealTimePrice: this.formLabelAlign.isRealTimePrice,
        unitPrice:
          this.formLabelAlign.isRealTimePrice == 0
            ? this.formLabelAlign.unitPrice
            : undefined,
        beleftQuantity: this.formLabelAlign.beleftQuantity,
      }).then((res) => {
        this.limitMinMoney = res.data.min;
        this.limitMaxMoney = res.data.max;
      });
    },
    // 验证通过后下一步
    handleNext(item) {
      const api = this.formLabelAlign["id"]
        ? advertisingUpdate
        : advertisingAdd;
      api({ ...this.formLabelAlign, successToken: item.successToken }).then(
        (res) => {
          console.log("res", res);
          this.$message({
            message: `${
              this.formLabelAlign["id"] ? "编辑成功！" : "发布成功！"
            }`,
            type: "success",
          });
          // this.$message(
          //   // `${this.formLabelAlign["id"] ? "编辑成功！" : "发布成功！"}`
          // );
          this.$emit("list");
        }
      );
    },
  },
  watch: {
    ordersValue: {
      handler() {},
    },
  },
};
</script>
<style lang="scss" scoped>
@use "./publishAd.scss";
</style>
