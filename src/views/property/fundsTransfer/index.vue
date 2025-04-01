<template>
  <div class="transfer">
    <div class="header">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
      <span @click="$router.go(-1)">{{ $t("property.资金划转") }}</span>
    </div>
    <div class="content">
      <div class="left">
        <el-form
          label-position="top"
          class="form"
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item :label="$t('property.资金划转')">
            <div class="transfer-chart">
              <Step />
              <div class="chart-right">
                <div class="chart-go">
                  <p>{{ $t("property.从") }}</p>
                  <p class="chart-arrive">{{ $t("property.到") }}</p>
                </div>
                <div class="chart-account">
                  <div class="chart-select">
                    <el-select v-model="oneValue" @change="oneChange">
                      <el-option
                        v-for="item in oneList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div style="display: flex" id="chart-border">
                    <div class="chart-border"></div>
                    <div class="chart-img" @click="transferShow">
                      <img src="@/assets/property-imgs/go.png" alt="" />
                    </div>
                  </div>
                  <div class="chart-select">
                    <el-select v-model="twoValue" @change="twoChange">
                      <el-option
                        v-for="item in twoList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('property.币种')">
            <div v-if="usdtShow" class="usdt-select">
              <img src="../../../assets/property-imgs/usdt-icon.png" alt="" />
              <span>USDT</span>
            </div>
            <div v-else class="coin-name">
              <coin-select
                v-if="coinList.length"
                :list="coinList"
                @selectedCoin="selectedCoin"
              ></coin-select>
            </div>
          </el-form-item>
          <el-form-item :label="$t('property.划转数')" prop="amountVal">
            <div class="input">
              <el-input
                v-model="ruleForm.amountVal"
                @input="
                  ruleForm.amountVal = formatDecimal(
                    ruleForm.amountVal,
                    decimalPlaces
                  )
                "
                :placeholder="$t('property.请输入划转数量')"
              ></el-input>
              <div class="input-right">
                <div v-if="!usdtShow">{{ coinName }}</div>
                <div v-if="usdtShow">USDT</div>
                <div class="input-all" @click="handleAll">
                  {{ $t("property.全部") }}
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="available">
              <span v-if="!usdtShow"
                >{{ $t("property.可转") }}{{ coinName
                }}{{ $t("property.数量2") }}：{{ balance }}</span
              >
              <span v-if="usdtShow"
                >{{ $t("property.可转") }}USDT{{ $t("property.数量2") }}：{{
                  balance
                }}</span
              >
            </div>
          </el-form-item>
          <el-form-item>
            <div class="submit" @click="onSubmit('ruleForm')">
              {{ $t("property.确定") }}
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <div class="content-right">
          <div class="right-bg">
            {{ $t("property.守护您的资产") }}<br />{{
              $t("property.BSEX继续为您护航")
            }}
          </div>
          <div>
            <img src="@/assets/property-imgs/assets-banner.png" alt="" />
          </div>
        </div>
        <div class="content-tips">
          <div class="tips-title">{{$t("property.温馨提示")}}</div>
          <span>{{ $t("property.转出后将失效，当账户权益会相应减少，如有持仓，请注意您的风险变化，有持仓或委托转出会爆仓或退出单时：转出后将失效并导致减少仓（爆仓）或开仓委托单再无法维持，请代理收纳") }}</span>
        </div>
      </div>
    </div>
    <div class="record">
      <AssetTable
        :title="$t('property.划转记录')"
        :record="$t('property.暂无划转记录')"
        :tableData="transferRecordQueryData"
        :columnData="columnData"
        :paginationShow="true"
        @current-change="currentChange"
        :total="total"
        :page.sync="currentPagePrams.pageNum"
        @coinChange="coinChange"
        @onRecentDate="onRecentDate"
        @onChangeDate="onChangeDate"
        :symbolList="symbolList"
      />
    </div>
    <success-modal
      :is-show.sync="successShow"
      :btnText="$t('property.确定')"
      :text="$t('property.资金划转成功')"
      @next="sureSuccess"
    ></success-modal>
    <!-- 划转新搜指引弹窗 -->
    <div class="mask">
      <guideMask />
    </div>
  </div>
</template>

<script>
import AssetTable from "@/components/assetWallet/assetTable.vue";
import Step from "./components/step.vue";
// import CoinSelect from "./components/coinSelect.vue";
import SuccessModal from "@/components/successModal.vue";
import CoinSelect from "../components/coinSelect.vue";
import guideMask from "./guideMask/guideMask.vue";

import {
  simpleApi,
  transferApi,
  transferRecordQueryApi,
  transferBalanceApi,
} from "@/api/assetWallet.js";

export default {
  name: "Transfer",
  components: {
    AssetTable,
    Step,
    CoinSelect,
    SuccessModal,
    guideMask,
  },
  data() {
    return {
      successShow: false,
      oneValue: 1,
      twoValue: 2,
      oneList: [
        {
          value: 1,
          label: this.$t("property.现货账户"),
        },
        {
          value: 2,
          label: this.$t("property.资金账户"),
        },
        {
          value: 3,
          label: this.$t("property.合约账户"),
        },
        {
          value: 4,
          label: this.$t("property.跟单账户"),
        },
      ],
      twoList: [],
      //币种选择
      iconUrl: "",
      coinName: "",
      amount: "", //金额
      coinId: null,
      decimalPlaces: null, //精度
      // fromAccountType: null,
      fromAccountType: 1,
      toAccountType: null,
      coinList: [], //币种列表
      symbolList: [],
      transferRecordQueryData: [], //划转记录数据
      flag: false,
      columnData: [
        {
          createTimeTsLongType: true,
          text: true,
          // prop: "createTimeTsLong",
          label: this.$t("property.时间"),
          width: "",
        },
        {
          text: true,
          prop: "coinName",
          label: this.$t("property.币种"),
          width: "",
        },
        {
          fromAccountType: true,
          text: true,
          label: this.$t("property.转出账户"),
          width: "",
        },
        {
          toAccountType: true,
          text: true,
          label: this.$t("property.转入账户"),
          width: "",
        },
        {
          text: true,
          prop: "amount",
          label: this.$t("property.数量"),
          width: "",
        },
      ],
      //表单验证
      ruleForm: {
        amountVal: "",
      },
      rules: {
        amountVal: [
          {
            required: true,
            message: this.$t("property.请输入划转数量"),
            trigger: "change",
          },
        ],
      },
      usdtShow: false,
      handleAllShow: false,
      balance: "", //可转余额
      currentPagePrams: {
        coinId: "",
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
        pageNum: 0,
        pageSize: 10, // 每页大小
      },
      total: 0,
    };
  },
  watch: {
    oneValue(n) {
      this.twoList = this.oneList.filter((item) => item.value !== n);
      // twoValue 初始值 2 资金账号
      if (n && n === this.twoValue) {
        if (n === 3) {
          this.twoValue = 1;
        } else {
          this.twoValue = 3;
        }
      }
    },
  },
  mounted() {
    this.getCoinList(5);
    this.getTransferRecordQuery();
    // 第二选项的下拉数据根据实际情况给默认数据
    this.twoList = this.oneList.filter((item) => item.value !== this.oneValue);
  },
  methods: {
    //选中法币
    selectedCoin(item) {
      this.coinId = item.coinId;
      this.coinName = item.coinName;
      this.decimalPlaces = item.decimalPlaces;
      // this.gettransferBalanceApi(this.oneValue, item.coinId, item.coinName);
      this.gettransferBalanceApi(item.coinId, item.coinName);
    },

    // 获取划转币种
    getCoinList(type) {
      simpleApi({
        isType: type,
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            let arr = JSON.parse(JSON.stringify(res.data.data));
            this.coinList = res.data.data || [];
            this.symbolList = arr || [];
            this.symbolList.unshift({
              id: "",
              coinName: this.$t("property.全部币种"),
            });
            this.iconUrl = this.coinList[0].iconUrl;
            //默认选中第一条选项
            this.coinName = this.coinList[0].coinName;
            this.coinId = this.coinList[0].coinId;
            this.decimalPlaces = this.coinList[0].decimalPlaces;
            // this.gettransferBalanceApi(
            //   this.oneValue,
            //   this.coinId,
            //   this.coinName
            // );
            this.gettransferBalanceApi(this.coinId, this.coinName);
          }
        }
      });
    },

    oneChange() {
      if (
        this.oneValue === 3 ||
        this.twoValue === 3 ||
        this.oneValue == 4 ||
        this.twoValue == 4
      ) {
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
        // this.gettransferBalanceApi(this.oneValue, coinId, coinName);
        this.gettransferBalanceApi(coinId, coinName);
      } else {
        // this.gettransferBalanceApi(this.oneValue, this.coinId, this.coinName);
        this.gettransferBalanceApi(this.coinId, this.coinName);
        this.usdtShow = false;
      }
    },
    twoChange() {
      if (
        this.oneValue === 3 ||
        this.twoValue === 3 ||
        this.oneValue == 4 ||
        this.twoValue == 4
      ) {
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
        // this.gettransferBalanceApi(this.oneValue, coinId, coinName);
        this.gettransferBalanceApi(coinId, coinName);
      } else {
        // this.gettransferBalanceApi(this.oneValue, this.coinId, this.coinName);
        this.gettransferBalanceApi(this.coinId, this.coinName);
        this.usdtShow = false;
      }
    },

    //查询划转可用余额
    gettransferBalanceApi(coinId, coinName) {
      transferBalanceApi({
        // fromAccountType: fromAccountType,
        coinId: coinId,
        coinName: coinName,
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            const o = {
              1: "tradeAvailableAmount",
              2: "otcAvailableAmount",
              3: "contractAvailableAmount",
              4: "documentaryAvailableAmount",
            };

            this.balance = res.data.data[o[this.oneValue]];
          }
        }
      });
    },
    coinChange(val) {
      this.currentPagePrams.coinId = val;
      this.getTransferRecordQuery();
    },
    onRecentDate(val) {
      let t = new Date().getTime();
      if (val === 2) {
        //最近30天
        this.currentPagePrams.startTime = t - 30 * 24 * 3600 * 1000;
        this.currentPagePrams.endTime = t;

        this.getTransferRecordQuery();
      } else {
        //最近7天
        this.currentPagePrams.startTime =
          new Date().getTime() - 7 * 24 * 3600 * 1000;
        this.currentPagePrams.endTime = new Date().getTime();

        this.getTransferRecordQuery();
      }
    },
    //日期
    onChangeDate(data) {
      if (data && data.length > 0) {
        this.currentPagePrams.startTime = data[0].getTime();
        this.currentPagePrams.endTime = data[1].getTime();
      } else {
        this.currentPagePrams.startTime = "";
        this.currentPagePrams.endTime = "";
      }
      this.getTransferRecordQuery();
    },
    //查询划转记录
    getTransferRecordQuery(data) {
      //获取符合条件时间戳
      // this.currentPagePrams.startTime =
      //   new Date().getTime() - 7 * 24 * 3600 * 1000;
      // this.currentPagePrams.endTime =
      //   new Date(new Date().toLocaleDateString()).getTime() + 86400000 * 2 - 1;
      let params = {
        ...data,
        ...this.currentPagePrams,
      };
      transferRecordQueryApi(params).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.total = res.data.data.total;
            this.transferRecordQueryData = res.data.data.records || [];
          }
        }
      });
    },
    transferShow() {
      const { oneValue, twoValue } = this;
      this.oneValue = twoValue;
      this.twoValue = oneValue;
      this.gettransferBalanceApi(this.coinId, this.coinName);
      //划转usdt的变化值
      if (
        this.oneValue === 3 ||
        this.twoValue === 3 ||
        this.oneValue === 4 ||
        this.twoValue === 4
      ) {
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
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //划转
          const data = {
            coinName: this.coinName,
            amount: this.ruleForm.amountVal,
            coinId: this.coinId,
            fromAccountType: this.oneValue,
            toAccountType: this.twoValue,
          };

          transferApi(data).then((res) => {
            if (res.status && res.status === 200) {
              if (res.data && res.data.success) {
                this.successShow = true;
              }
            }
          });
        } else {
          return false;
        }
      });
    },
    sureSuccess() {
      //成功确定
      this.ruleForm.amountVal = "";
      this.gettransferBalanceApi(this.coinId, this.coinName); //刷新金额
      this.getTransferRecordQuery(this.currentPagePrams);
      //重置
      this.$refs["ruleForm"].resetFields();
      this.successShow = false;
    },
    handleAll() {
      this.ruleForm.amountVal = this.balance;
    },
    //翻页功能
    currentChange(val) {
      this.currentPagePrams.pageNum = val.page;
      //划转记录
      this.getTransferRecordQuery();
    },
    formatDecimal(str, num) {
      //str当前输入值，num是想要保留的小数位数
      str = String(str);
      if (!str.trim()) {
        return str;
      }
      var len1 = str.substr(0, 1);
      var len2 = str.substr(1, 1);
      // 如果第一位是0，第二位不是点，就用数字把点替换掉
      if (str.length > 1 && len1 === 0 && len2 !== ".") {
        str = str.substr(1, 1);
      }
      // 第一位不能是.
      if (len1 === ".") {
        str = "";
      }
      // 限制只能输入一个小数点
      if (str.indexOf(".") !== -1) {
        var str_ = str.substr(str.indexOf(".") + 1);
        if (str_.indexOf(".") !== -1) {
          str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
        }
      }

      // 如果第一位是0，第二位必须大于0或者小数点
      if (str.substring(0, 1) == 0) {
        if (str.substring(1, 2) > 0) {
          str = str.substring(1, 2);
        } else if (str.substring(1, 2) === 0 || str.substring(1, 2) === "0") {
          str = "0";
        }
      }

      // 正则替换
      str = str.replace(/[^\d^.]+/g, ""); // 保留数字和小数点
      if (num || num === 0) {
        var rest = str.split(".")[1];
        if (rest && rest.length > num) {
          rest = rest.substr(0, num);
          str = str.split(".")[0] + "." + rest;
        }
      }
      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
.transfer {
  background-color: #fff;
  .header {
    background-color: $bgColorA;
    padding: 20px 0 20px 70px;
    .el-icon-arrow-left {
      padding-right: 5px;
      font-size: 24px;
      cursor: pointer;
    }
    span {
      font-size: $fontE;
      cursor: pointer;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    padding-right: 154px;
  }
  .form {
    padding-left: 70px;
    padding-top: 20px;
    width: 500px;
    ::v-deep .el-form-item__label {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
    }
    .transfer-number {
      margin-top: 30px;
    }
    .transfer-chart {
      width: 500px;
      height: 130px;
      background: #ffffff;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      border: 1px solid #f4f5f7;
      display: flex;
      .chart-right {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 5px;
        .chart-go {
          font-size: 14px;
          color: #999;
          margin-left: 5px;
          .chart-arrive {
            margin-top: 38px;
          }
        }
        .chart-account {
          margin-right: 10px;
          font-size: 16px;
          color: #333;
          .chart-select {
            height: 40px;
            ::v-deep .el-select {
              width: 100%;
            }
            ::v-deep .el-input__inner {
              border: none;
              height: 40px;
              line-height: 35px;
              padding: 0;
              font-size: 16px;
              color: #333;
              font-weight: 600;
            }
          }
        }
      }
      .chart-border {
        width: 350px;
        border: 1px solid #f4f5f7;
        margin-top: 17px;
        margin-bottom: 18px;
      }
      .chart-img {
        width: 24px;
        height: 24px;
        margin: 5px 5px 0 30px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .input {
      position: relative;
      width: 500px;
      ::v-deep .el-input__inner {
        height: 60px;
        line-height: 60px;
        background: #ffffff;
        box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
        border-radius: 12px;
        border: 1px solid #f4f5f7;
      }
      .input-right {
        position: absolute;
        right: 20px;
        top: 10px;
        display: flex;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        .input-all {
          margin-left: 10px;
          color: $colorB;
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
        padding-right: 20px;
      }
    }
    .submit {
      width: 500px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: $colorB;
      border-radius: 12px;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
    }
    .usdt-select {
      width: 500px;
      height: 60px;
      line-height: 60px;
      background: #ffffff;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      border: 1px solid #f4f5f7;
      display: flex;
      align-items: center;
      font-size: 16px;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: inline-block;
        margin-left: 24px;
        margin-right: 9px;
      }
    }
  }
  .right {
    .content-right {
      margin-top: 150px;
      min-width: 625px;
      min-height: 140px;
      border-radius: 12px;
      background: #fcfcfc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 30px;
      .right-bg {
        .right-t {
          font-size: 20px;
        }
        img {
          width: 97px;
          height: 104px;
          display: block;
        }
      }
    }
    .content-tips {
      margin-top: 40px;
      width: 625px;
      min-height: 138px;
      background: #fcfcfc;
      border-radius: 12px;
      padding: 20px;
      font-size: 14px;
      .tips-title{
        font-size: 16px;
        padding-bottom: 10px;
      }
    }
  }
  .coin-name {
    width: 500px;
    height: 60px;
    background: #ffffff;
    border-radius: 12px;
    position: relative;
  }
  .record {
    margin-left: 70px;
  }
}
</style>
