<!-- 划转弹框 -->
<template>
  <div>
    <el-dialog
      :visible.sync="transVisible"
      width="600px"
      class="transferDialog"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div class="headerTit fontWeight600 mb40 between fontSize18">
				{{ $t(t+'划转') }}
        <el-image
          class="block pointer"
          @click="$emit('closeTransfer')"
          :src="require('@/assets/contract-imgs/dialogClose.png')"
        />
      </div>
      <el-form
        label-position="top"
        class="form"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
      >
        <el-form-item label="">
          <div class="transfer-chart">
            <Step />
            <div class="chart-right">
              <div class="chart-go">
                <p>{{ $t(t+'从') }}</p>
                <p class="chart-arrive">{{ $t(t+'到') }}</p>
              </div>
              <div class="chart-account">
                <div class="chart-select">
                  <el-select v-model="oneValue" @change="oneChange">
                    <el-option
                      v-for="item in oneList"
                      :key="item.value"
                      :label="$t(t+item.label)"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div style="display: flex" id="chart-border">
                  <div class="chart-border"></div>
                  <div class="chart-img" @click="transferShow">
                    <img src="@/assets/images/go.png" alt="" />
                  </div>
                </div>
                <div class="chart-select">
                  <el-select v-model="twoValue" @change="twoChange">
                    <el-option
                      v-for="item in twoList"
                      :key="item.value"
											:label="$t(t+item.label)"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="$t(t+'币种')">
          <coin-select
            v-if="coinList.length && !usdtShow"
            :coinList="coinList"
            :iconUrl="iconUrl"
            :coinName="coinName"
            :symbolId="coinId"
            @selectedCoin="selectedCoin"
          ></coin-select>
          <div v-if="usdtShow" class="usdt-select">
            <img
              src="https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png"
              alt=""
            />
            <span>USDT</span>
          </div>
        </el-form-item>
        <el-form-item :label="$t(t+'划转数')" prop="amountVal">
          <div class="input">
            <el-input
              v-model="ruleForm.amountVal"
              @input="changeInput"
              :placeholder="$t(t+'请输入划转数量')"
            ></el-input>
            <div class="input-right">
              <div v-if="!usdtShow">{{ coinName }}</div>
              <div v-if="usdtShow">USDT</div>
              <div class="input-all" @click="ruleForm.amountVal = balance">
								{{ $t(t+'全部') }}
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="available mt10">
            {{ $t(t+'可转') }} {{ !usdtShow ? coinName : "USDT" }}{{ $t(t+'数量') }}：<span>{{
              balance
            }}</span>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="submit" @click="onSubmit('ruleForm')">{{ $t(t+'确认') }}</div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 成功提示 -->
    <success-modal
      :is-show.sync="successShow"
      :btnText="$t(t+'确认')"
      :text="$t(t+'资金划转成功')"
      @next="$emit('okTransfer')"
    ></success-modal>
  </div>
</template>

<script>
import Step from "./components/step.vue";
import CoinSelect from "./components/coinSelect.vue";
import SuccessModal from "@/components/successModal.vue";
import {
  simpleApi,
  transferApi,
  transferBalanceApi,
} from "@/api/assetWallet.js";
import { changeNumberVal } from "@/libs/utils.js";

export default {
  components: {
    Step,
    CoinSelect,
    SuccessModal,
  },
  props: {
    transVisible: {
      type: Boolean,
      default: false,
    },
    dealId: {
      type: String | Number,
      default: "4",
    },
    fromAccout: {
      type: Number,
      default: 1,
    },
    toAccout: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      // 从
      oneValue: this.fromAccout,
      oneList: [
        { value: 1, label: "现货账户" },
        { value: 2, label: "资金账户" },
        { value: 3, label: "合约账户" },
        { value: 4, label: "跟单账户" },
      ],
      // 到
      twoValue: this.toAccout,
      twoList: [],
      balance: "", //可转余额

      //币种列表
      coinList: [],
      usdtShow: false,
      iconUrl: "",
      coinName: "",
      coinId: null,
      decimalPlaces: null, //精度

      // 成功提示
      successShow: false,

      //表单验证
      ruleForm: {
        amountVal: "",
      },
      rules: {
        amountVal: [
          { required: true, message: "请输入划转数量", trigger: "change" },
        ],
      },
			// 国际缩写
			t: 'contract.'
    };
  },

  watch: {
    oneValue(n) {
      this.twoList = this.oneList.filter((item) => item.value !== n);
      if (n && n === this.twoValue) {
        if (n === 3) {
          this.twoValue = 1;
        } else {
          this.twoValue = 3;
        }
      }
    },
  },

  created() {
    // this.getCoinList();
    // 第二选项的下拉数据根据实际情况给默认数据
    this.twoList = this.oneList.filter((item) => item.value !== this.oneValue);
  },

  methods: {
    // 选择账户
    oneChange() {
      if (this.oneValue === 3 || this.twoValue === 3 ||this.oneValue == 4 || this.twoValue == 4) {
        this.usdtShow = true;
        //获取usdt的coinName 和 coinName
        let coinId = "";
        this.coinList.forEach((item) => {
          if (item.coinName === "USDT") {
            coinId = item.coinId;
            this.coinId = coinId;
          }
        });
        let coinName = "";
        this.coinList.forEach((item) => {
          if (item.coinName === "USDT") {
            coinName = item.coinName;
            this.coinName = coinName;
          }
        });
        this.gettransferBalanceApi(coinId, coinName);
      } else {
        this.gettransferBalanceApi(this.coinId, this.coinName);
        this.usdtShow = false;
      }
    },
    // 划转账户翻转
    transferShow() {
      const { oneValue, twoValue } = this;
      this.oneValue = twoValue;
      this.twoValue = oneValue;
      // this.gettransferBalanceApi(this.oneValue, this.coinId, this.coinName);
      this.gettransferBalanceApi(this.coinId, this.coinName);
      //划转usdt的变化值
      if (this.oneValue === 3 || this.twoValue === 3 || this.oneValue === 4 || this.twoValue === 4) {
        this.usdtShow = true;
        //获取usdt的coinName 和 coinName
        let coinId = "";
        this.coinList.forEach((item) => {
          if (item.coinName === "USDT") {
            coinId = item.coinId;
          }
        });
        let coinName = "";
        this.coinList.forEach((item) => {
          if (item.coinName === "USDT") {
            coinName = item.coinName;
          }
        });
        // this.gettransferBalanceApi(this.oneValue, coinId, coinName);
        this.gettransferBalanceApi(coinId, coinName);
      } else {
        // this.gettransferBalanceApi(this.oneValue, this.coinId, this.coinName);
        this.gettransferBalanceApi(this.coinId, this.coinName);
        this.usdtShow = false;
      }
    },

    twoChange() {
      if (this.oneValue === 3 || this.twoValue === 3 || this.oneValue === 4 || this.twoValue === 4) {
        this.usdtShow = true;
        //获取usdt的coinName 和 coinName
        let coinId = "";
        this.coinList.forEach((item) => {
          if (item.coinName === "USDT") {
            coinId = item.coinId;
            this.coinId = coinId;
          }
        });
        let coinName = "";
        this.coinList.forEach((item) => {
          if (item.coinName === "USDT") {
            coinName = item.coinName;
            this.coinName = coinName;
          }
        });
        this.gettransferBalanceApi(coinId, coinName);
      } else {
        this.gettransferBalanceApi(this.coinId, this.coinName);
        this.usdtShow = false;
      }
    },

    //选中法币
    selectedCoin(item) {
      this.coinId = item.coinId;
      this.coinName = item.coinName;
      this.decimalPlaces = item.decimalPlaces;
      this.gettransferBalanceApi(item.coinId, item.coinName);
    },

    //查询划转可用余额
    gettransferBalanceApi(coinId, coinName) {
      transferBalanceApi({
        coinId: coinId,
        coinName: coinName,
      }).then((res) => {
        const item = res.data.data;
        var account = {
          1: item.tradeAvailableAmount, // 现货可用余额
          2: item.otcAvailableAmount, //资金可用余额
          3: item.contractAvailableAmount, //合约可用余额
          4:item.documentaryAvailableAmount,//跟单
        };
        this.balance = account[this.oneValue];
      });
    },

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //划转
          transferApi({
            coinName: this.coinName,
            amount: this.ruleForm.amountVal,
            coinId: this.coinId,
            fromAccountType: this.oneValue,
            toAccountType: this.twoValue,
          }).then((res) => {
            this.gettransferBalanceApi(
              this.oneValue,
              this.coinId,
              this.coinName
            );
            //刷新金额
            this.ruleForm.amountVal = "";
            this.successShow = true;
            //重置
            this.$refs[formName].resetFields();
          });
        } else {
          return false;
        }
      });
    },

    // 获取划转币种
    getCoinList() {
      simpleApi({ isType: 5 }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            let arr = JSON.parse(JSON.stringify(res.data.data));
            this.coinList = res.data.data || [];
            this.symbolList = arr || [];
            this.symbolList.unshift({
              id: "",
              coinName: this.$t(this.t + '全部币种'),
            });
            const selectCoin = this.coinList.find(
              (item) => item.coinId == this.dealId
            );
            this.iconUrl = selectCoin.iconUrl;
            //默认选中第一条选项
            this.coinName = selectCoin.coinName;
            this.coinId = selectCoin.coinId;
            this.decimalPlaces = selectCoin.decimalPlaces;
            this.gettransferBalanceApi(this.coinId, this.coinName);
          }
        }
      });
    },

    // 限制输入规则（数字）
    changeInput(val) {
      this.ruleForm.amountVal = changeNumberVal(val, this.decimalPlaces);
    },
  },
};
</script>

<style>
.popper__arrow {
  display: none !important;
}
</style>
<style lang="scss" scoped>
.transferDialog {
  overflow: hidden;
  ::v-deep   .el-dialog {
    border-radius: 26px;
    background: var(--trade-order-Input-bg);
    &__header {
      display: none;
    }
    &__body {
      width: 540px;
      margin: auto;
      text-align: left;
      padding: 30px 0;
    }
  }

  .headerTit {
    color: var(--trade-text-color);
  }
  /*  划转 */
  .form {
    ::v-deep   .el-form-item {
      margin-bottom: 40px;
      &:nth-child(3) {
        margin-bottom: 0 !important;
      }
      &:nth-last-child(1) {
        margin-bottom: 10px !important;
      }
      &__label {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: var(--trade-text-color);
        line-height: 0;
        margin-bottom: 20px;
      }
    }
    .transfer-chart {
      width: 540px;
      height: 130px;
      background: var(--trade-tranf-input-bg);
      border-radius: 12px;
      display: flex;
      padding-right: 20px;
      border: 1px solid var(--trade-lever-Input-bg);

      .chart-right {
        width: 100%;
        display: flex;
        align-items: center;
        margin-left: 5px;
        .chart-go {
          font-size: 14px;
          color: var(--trade-text-color);
          margin-left: 5px;
          margin-right: 20px;
          .chart-arrive {
            margin-top: 38px;
          }
        }
        .chart-account {
          font-size: 16px;
          color: var(--trade-text-color);
          flex: 1;
          .chart-select {
            height: 40px;
            ::v-deep   .el-select {
              width: 100%;
            }
            ::v-deep   .el-input__inner {
              border: none;
              height: 40px;
              line-height: 35px;
              padding: 0;
              font-size: 16px;
              background: transparent;
              color: var(--trade-text-color);
              font-weight: 600;
            }
          }
        }
      }
      .chart-border {
        height: 1px;
        flex: 1;
        border: 1px solid #e1e1e1;
        margin-top: 17px;
        margin-bottom: 18px;
      }
      .chart-img {
        width: 36px;
        height: 36px;
        margin-left: 20px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .input {
      position: relative;
      ::v-deep   .el-input__inner {
        width: 540px;
        height: 60px;
        border-radius: 12px;
        color: var(--trade-text-color);
        background: var(--trade-tranf-input-bg);
        border: 1px solid var(--trade-lever-Input-bg);
      }
      .input-right {
        position: absolute;
        right: 20px;
        top: 10px;
        display: flex;
        font-size: 16px;
        font-weight: 600;
        color: var(--trade-text-color);
        .input-all {
          margin-left: 10px;
          color: #90ff00;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .available {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #8992a6;
      span {
        color: var(--trade-text-color);
        padding-right: 20px;
      }
    }
    .submit {
      width: 540px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #90ff00;
      border-radius: 12px;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .usdt-select {
      width: 540px;
      height: 60px;
      line-height: 60px;
      background: var(--trade-tranf-input-bg);
      border-radius: 12px;
      color: var(--trade-text-color);
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: inline-block;
        margin-left: 24px;
        margin-right: 10px;
      }
    }
  }
}
</style>
