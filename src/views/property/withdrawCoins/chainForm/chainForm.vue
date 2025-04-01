<template>
  <div class="form">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <el-form-item :label="$t('property.币种')">
        <coin-select
          ref="selectRef"
          v-if="coinList.length"
          :list="coinList"
          :isHot="true"
          @selectedCoin="onCoinChoose"
          @onAddTag="onAddTag"
        ></coin-select>
      </el-form-item>
      <el-form-item :label="$t('property.链名称')" prop="networkVal">
        <div class="network">
          <el-select
            v-model="ruleForm.showVal"
            ref="chooseNetwork"
            @focus="networkDialog"
            @change="networkChange"
            :placeholder="$t('property.请选择链接')"
          >
            <el-option
              v-for="item in addressQueryArr"
              :key="item.id"
              :label="item.coinName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item prop="dressVal">
        <div class="dress-label" @click="onDress">
          <div class="dress-title">{{ $t("property.提币地址") }}</div>
          <div class="dress-text">
            {{ $t("property.管理地址") }} | {{ $t("property.提币到U地址") }}
          </div>
        </div>
        <div class="network">
          <el-input
            :placeholder="$t('property.请输入提币地址')"
            v-model="ruleForm.dressVal"
            @change="handleDressCheck"
          >
            <i
              slot="suffix"
              style="cursor: pointer"
              class="el-input__icon el-icon-arrow-down"
              @click="withdrawalAddressDialog"
            ></i>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item v-if="checkPlatFormAddress">
        <div class="valid-address">
          <div class="text">{{ $t("property.支付UID") }}：{{ uid }}</div>
          <div>
            {{ $t("property.实时到账无手续费") }}
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('property.提币账户')">
        <div class="account" @click.stop="handleAccount">
          <div class="accounted">{{ accountName }}</div>
          <div class="account-icon">
            <i
              :class="selectIcon ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            ></i>
          </div>
        </div>
        <div v-if="selectIcon" class="account-list">
          <div class="list-box">
            <div
              class="list-item"
              v-for="item in withdrawList"
              :key="item.value"
              @click.stop="chooseAccount(item)"
            >
              <span> {{ item.label }}</span>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('property.提币数量')" prop="coinSumVal">
        <div class="coinSum">
          <el-input
            :placeholder="$t('property.请输入提币数量')"
            v-model="ruleForm.coinSumVal"
            @input="
              ruleForm.coinSumVal = formatDecimal(
                ruleForm.coinSumVal,
                decimalPlaces
              )
            "
          >
            <div slot="suffix" class="all" @click="handleAll">
              {{ $t("property.全部") }}
            </div>
          </el-input>
          <div class="limit-amount" @click="onLimitAmount">
            {{ $t("property.查看今日限额") }}
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="available">
          <p>{{ $t("property.可用") }}：{{ amount }}</p>
          <div v-if="fee">{{ $t("property.手续费") }}：{{ fee }}</div>
          <div v-else>{{ $t("property.手续费") }}： 0 USDT</div>
        </div>
        <div class="account-sum" v-show="arrivalAmount && ruleForm.coinSumVal">
          {{ $t("property.到账数量") }}：{{ arrivalAmount
          }}<span>{{ coinName }}</span>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submitBtn"
          type="primary"
          @click="onSubmit('ruleForm')"
          >{{ $t("property.下一步") }}</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 网络选择弹窗 -->
    <netword-select
      ref="networdRef"
      v-if="networkData.length"
      :is-show.sync="networkShow"
      :networkData="networkData"
      @networkisShow="networkisShow"
      @networkChange="networkChange"
    ></netword-select>
    <!-- 提币地址选择 -->
    <chain-name
      :addressShow.sync="addressShow"
      @addressChange="addressChange"
      @addressManagement="addressManagement"
    ></chain-name>
    <chain-address
      :chainAddressShow.sync="chainAddressShow"
      :iconUrl="iconUrl"
      :coinName="coinName"
      :addressQueryArr="addressQueryArr"
      @toAddress="toAddress"
      @chainAddressChange="chainAddressChange"
    ></chain-address>
    <!-- 认证 -->
    <auth-dialog
      :title="$t('property.提示')"
      :visible="isAuthentication"
      @close="closeDialog"
    ></auth-dialog>
    <verify-form
      ref="verifyRef"
      :is-show.sync="verifyShow"
      :isNeedApi="false"
      @next="verifyNext"
      :phoneStatus="phoneStatus"
      :emailStatus="emailStatus"
      :googleAuthStatus="googleAuthStatus"
      :tradePasswordStatus.sync="tradePasswordStatus"
      :authToken.sync="authToken"
      :isCheckObj="isCheckObj"
      v-if="authToken"
    ></verify-form>
    <success-modal
      :is-show.sync="successShow"
      :btnText="$t('property.确定')"
      :text="$t('property.提币审核中')"
      @next="sureSuccess"
    ></success-modal>
    <!-- 查看今日限额 -->
    <my-modal
      :isShow.sync="isLimitAmount"
      :title="$t('property.今日限额额度')"
      @close="closeLimitAmount"
    >
      <template #content>
        <div class="modal-content">
          <div class="c-title">{{ $t("property.最大提币额度") }}</div>
          <div class="c-text">
            <span>{{
              limitData.limitAmount == -1 ? $t('property.无限制') : limitData.limitAmount
            }}</span>
            <span v-if="limitData.limitAmount != -1">{{ coinName }}</span>
          </div>
          <div class="c-title">{{ $t("property.最大提币次数") }}</div>
          <div class="c-text">
            {{ limitData.limitTimes == -1 ? $t('property.无限制') : limitData.limitTimes }}
          </div>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer">
          <div class="f-btn" @click="closeLimitAmount">
            {{ $t("property.好的") }}
          </div>
        </div>
      </template>
    </my-modal>
  </div>
</template>

<script>
import CoinSelect from "../../components/coinSelect.vue";
import NetwordSelect from "../components/NetwordSelect.vue";
import ChainName from "../components/chainName.vue";
import ChainAddress from "../components/chainAddress.vue";
import VerifyForm from "../components/withdrawVeriy.vue";
import SuccessModal from "@/components/successModal.vue";
import AuthDialog from "../components/authDialog.vue";
import myModal from "@/components/my-modal/index.vue";
import {
  transferBalanceApi,
  chainListApi,
  isValidAddressApi,
  addressQueryApi,
  arrivalAccountApi,
  withdrawCheckApi,
  userWithdrawApi,
  getKycRemainByUserId,
  withdrawLimitInfo,
} from "@/api/assetWallet";

export default {
  name: "ChainForm",
  components: {
    CoinSelect,
    NetwordSelect,
    ChainName,
    ChainAddress,
    VerifyForm,
    SuccessModal,
    AuthDialog,
    myModal,
  },
  props: {
    coinList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const validDress = async (rule, value, callback) => {
      const isValid = await this.validAddress(rule, value, callback);
      console.log(isValid, "isValid");
      if (!value) {
        callback(new Error(this.$t("property.请输入提币地址")));
      } else {
        if (isValid) {
          callback();
        } else {
          callback(new Error(this.$t("property.输入提币地址有误")));
        }
      }
    };
    return {
      // coinList: [], //提币币种列表
      coinId: null, //币种id
      coinName: "", //币种名称
      iconUrl: "", //币种图标
      addressQueryArr: [], //链上提币地址
      checkPlatFormAddress: false, //检验提币地址
      selectIcon: false,
      networkShow: false, //网络弹窗
      chainAddressShow: false, //查询到有地址
      addressShow: false, //未选择到的地址
      networkData: [], //网络数据
      uid: "",
      withdrawList: [
        {
          value: 1,
          label: this.$t("property.现货账户"),
        },
        {
          value: 2,
          label: this.$t("property.资金账户"),
        },
      ],
      accountName: this.$t("property.现货账户"), //默认现货账户
      decimalPlaces: null, //精度
      fee: "", //手续费
      amount: "", //可用余额
      arrivalAmount: "", //到账数量
      userWithdrawStatus: "", //交易提示状态
      //表单验证
      ruleForm: {
        networkVal: "", //链名称绑定值
        dressVal: "", //地址
        coinSumVal: "", //提币数量
        accountVal: 1, //账户名称
        chainName: "", //链名称
        showVal: "",
      },
      //验证规则
      rules: {
        networkVal: [
          {
            required: true,
            message: this.$t("property.请选择链接"),
            trigger: "blur",
          },
        ],
        dressVal: [{ required: true, validator: validDress, trigger: "blur" }],
        coinSumVal: [
          {
            required: true,
            message: this.$t("property.请输入提币数量"),
            trigger: "blur",
          },
        ],
        accountVal: [
          {
            required: true,
            message: this.$t("property.请输入账户名称"),
            trigger: "blur",
          },
        ],
      },
      withdrawChainParams: {}, //提币参数
      verifyShow: false, //表单校验弹窗
      successShow: false,
      isAuthentication: false, //去认证
      //认证参数
      phoneStatus: null,
      emailStatus: null,
      googleAuthStatus: null,
      tradePasswordStatus: null,
      authToken: null,
      isValid: false, //校验提币地址是否正确
      timer: null,
      isCheckObj: {},
      allowedWithdrawalMethods: null,
      isLimitAmount: false,
      limitData: {},
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    //查看今日限额
    onLimitAmount() {
      this.isLimitAmount = true;
      withdrawLimitInfo({ coinName: this.coinName }).then((res) => {
        this.limitData = res.data?.data;
      });
    },
    closeLimitAmount() {
      this.isLimitAmount = false;
    },
    //币种选择
    onCoinChoose(val) {
      this.coinId = val.coinId;
      this.coinName = val.coinName;
      this.iconUrl = val.iconUrl;
      this.decimalPlaces = val.decimalPlaces;
      // 选币种及id
      this.getBalance(this.ruleForm.accountVal, {
        coinId: this.coinId,
        coinName: this.coinName,
      });
    },
    //热门币种选择
    onAddTag(val) {
      this.$refs.selectRef.symbolFilterList.forEach((item) => {
        if (val.coinName == item.coinName) {
          this.$refs.selectRef.coinName = item.coinName;
          this.$refs.selectRef.coinUrl = item.iconUrl;
          this.coinId = item.coinId;
          this.coinName = item.coinName;
          this.iconUrl = item.iconUrl;
          this.getBalance(this.ruleForm.accountVal, {
            coinId: this.coinId,
            coinName: this.coinName,
          });
        }
      });
    },
    // 数据初始化
    initData() {
      //监听点击事件
      document.addEventListener("click", () => {
        this.selectIcon = false;
      });
      this.getCionList();
    },
    //币种列表
    getCionList() {
      // 默认选中第一条数据的coinId、iconUrl
      this.coinId = this.coinList[0].coinId;
      this.coinName = this.coinList[0].coinName;
      this.iconUrl = this.coinList[0].iconUrl;
      this.decimalPlaces = this.coinList[0].decimalPlaces;
      this.getBalance(this.ruleForm.accountVal, {
        coinId: this.coinId,
        coinName: this.coinName,
      });
    },
    //链名称
    networkDialog() {
      this.$refs.chooseNetwork.blur();
      // 打开网络选择弹框
      this.networkShow = true;
      //网络查询
      chainListApi({ coinId: this.coinId }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.networkData = res.data.data;
          }
        }
      });
    },
    //网络选择
    networkChange(val) {
      this.ruleForm.networkVal = val.chainName;
      this.ruleForm.showVal = val.remark;
      this.ruleForm.chainName = val.chainName;
    },
    //网络弹窗关闭
    networkisShow(val) {
      if (!val) return;
      this.networkShow = false;
      if (this.ruleForm.networkVal && this.ruleForm.dressVal) {
        this.validAddress();
      }
      let params = {
        coinName: this.coinName,
        chainName: this.ruleForm.chainName,
      };
      this.$emit("chaiConfigure", params);
    },
    //提币地址
    onDress() {
      this.$emit("pageChange");
    },
    handleDressCheck() {
      this.validAddress();
    },
    // 提币校验地址
    async validAddress(rule, value, callback) {
      console.log(rule, value, callback, "rule, value, callback");
      //如果不选网络就不发请求
      if (!this.ruleForm.networkVal) return;
      const params = {
        chainName: this.ruleForm.networkVal, //链名称
        address: this.ruleForm.dressVal, //地址
      };
      if (this.ruleForm.dressVal) {
        const res = await isValidAddressApi(params);
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.checkPlatFormAddress = res.data.data.checkPlatFormAddress;
            this.uid = res.data.data.uid;
            this.isValid = res.data.data.valid;
            return res.data.data.valid;
          }
        }
      }
    },
    // 地址选择框
    async withdrawalAddressDialog() {
      //查询提币地址 type 1:查链上地址
      let res = await addressQueryApi({ type: 1, coinId: this.coinId });
      if (res.status && res.status === 200) {
        if (res.data && res.data.success) {
          this.addressQueryArr = res.data.data;
          if (this.addressQueryArr.length) {
            //查询到有地址
            this.chainAddressShow = true;
          } else {
            //未选择到的地址
            this.addressShow = true;
          }
        }
      }
    },
    addressChange(val) {
      // this.symbolVal = val.chainName;
    },
    chainAddressChange(val) {
      this.ruleForm.dressVal = val.address;
    },
    addressManagement() {
      this.$emit("pageChange");
    },
    toAddress() {
      this.$emit("pageChange");
    },

    //选择账户
    handleAccount() {
      this.selectIcon = !this.selectIcon;
    },
    chooseAccount(item) {
      this.ruleForm.accountVal = item.value;
      this.accountName = item.label;
      this.selectIcon = false;
      this.getBalance(item.value, {
        coinId: this.coinId,
        coinName: this.coinName,
      });
    },
    //提币数量
    handleAll() {
      this.ruleForm.coinSumVal = this.amount;
      this.handleAmount(this.ruleForm.coinSumVal);
    },
    //到账数量，手续费
    handleAmount(val) {
      if (!val) {
        this.arrivalAmount = "";
        this.fee = "";
      } else {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            const params = {
              isOwn: 0, //链上提币
              amount: this.ruleForm.coinSumVal,
              coinId: this.coinId,
              coinName: this.coinName,
              chainName: this.ruleForm.networkVal,
              toAddress: this.ruleForm.dressVal, //提币地址
            };
            if (!this.ruleForm.coinSumVal) return; //输入数量为空不请求
            arrivalAccountApi(params).then((res) => {
              if (res.status && res.status === 200) {
                if (res.data && res.data.success) {
                  this.arrivalAmount = res.data?.data?.amount;
                  this.fee = res.data?.data?.fee;
                }
              }
            });
          }
        });
      }
    },
    //查询余额 type(1现货2资金) data(请求参数)
    getBalance(type, data) {
      transferBalanceApi(data).then((res) => {
        switch (type) {
          case 1:
            this.amount = res.data?.data?.tradeAvailableAmount;
            break;
          case 2:
            this.amount = res.data?.data?.otcAvailableAmount;
            break;
          default:
        }
      });
    },
    //关闭认证弹窗
    closeDialog() {
      this.isAuthentication = false;
    },
    //提交表单
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 提币等级认证
          const resp = await getKycRemainByUserId();
          this.allowedWithdrawalMethods =
            resp.data.data.allowedWithdrawalMethods;
          if (
            resp.data.data.allowedWithdrawalMethods == 2 ||
            resp.data.data.allowedWithdrawalMethods == 4
          ) {
            // 去认证
            this.isAuthentication = true;
          } else {
            //获取认证参数(链上提币)
            let params = {
              type: this.ruleForm.accountVal,
              ownType: 1,
              coinId: this.coinId,
              coinName: this.coinName,
              chainName: this.ruleForm.chainName,
              amount: this.ruleForm.coinSumVal,
              toAddress: this.ruleForm.dressVal,
            };
            this.withdrawChainParams = params;
            //提币-获取认证选项
            let res = await withdrawCheckApi(params);
            // 提币认证参数
            let {
              authToken,
              authPhone,
              authEmail,
              authGoogleAuth,
              phoneStatus,
              emailStatus,
              googleAuthStatus,
              tradePasswordStatus,
            } = res.data.data;
            this.phoneStatus = phoneStatus;
            this.emailStatus = emailStatus;
            this.googleAuthStatus = googleAuthStatus;
            this.tradePasswordStatus = tradePasswordStatus;
            this.authToken = authToken;
            this.isCheckObj = {
              authPhone: authPhone,
              authEmail: authEmail,
              authGoogleAuth: authGoogleAuth,
            };
            this.withdrawChainParams = Object.assign(this.withdrawChainParams, {
              authToken: authToken,
            });
            // 安全认证
            this.verifyShow = true;
          }
        } else {
          return false;
        }
      });
    },

    //验证通过 提币成功弹窗弹出
    verifyNext(data) {
      const newData = {
        tradePwd: this.$getEncryptCode(data.password), //资金密码
        phoneCode: data.phoneCode,
        emailCode: data.emailCode,
        authCode: data.authCode,
      };
      const params = Object.assign(this.withdrawChainParams, newData);
      this.getUserWithdraw(params);
    },
    //提币申请
    getUserWithdraw(data) {
      userWithdrawApi(data).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.successShow = true;
            //清除子组件绑定的参数，定时器
            this.$refs.verifyRef.initParams();
            this.$refs.verifyRef.initTimer();
          }
        }
      });
    },
    //提币成功提示
    sureSuccess() {
      // 数据初始化
      this.$refs.networdRef.activeKey = 0;
      this.ruleForm = {
        networkVal: "", //链名称绑定值
        dressVal: "", //地址
        coinSumVal: "", //提币数量
        accountVal: 1, //账户名称
        chainName: "",
        showVal: "", //链名称
      };
      this.getBalance(this.ruleForm.accountVal, {
        coinId: this.coinId,
        coinName: this.coinName,
      });
      this.arrivalAmount = "";
      this.fee = "";
      //提币成功刷新列表
      this.$emit("record");
      this.successShow = false;
    },

    //输入框输入规则
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
      // 正则替换
      str = str.replace(/[^\d^.]+/g, ""); // 保留数字和小数点
      if (num || num === 0) {
        var rest = str.split(".")[1];
        if (rest && rest.length > num) {
          rest = rest.substr(0, num);
          str = str.split(".")[0] + "." + rest;
        }
      }

      //防抖
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.handleAmount(str);
      }, 300);
      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 500px;
  margin-top: 10px;
  color: #333;
  .network {
    ::v-deep .el-input__inner {
      width: 500px;
      height: 60px;
      line-height: 60px;
      background: #ffffff;
      box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.06);
      border-radius: 10px;
      border: 1px solid #f5f7fa;
    }
    ::v-deep .el-input__icon {
      width: 45px;
      font-size: 16px;
      color: #333;
    }
  }
  .dress-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .dress-title {
      font-size: 16px;
    }
    .dress-text {
      font-size: 14px;
      color: #90ff00;
      cursor: pointer;
    }
  }
  .valid-address {
    height: 80px;
    line-height: 25px;
    background: #f5f7fa;
    border-radius: 10px;
    font-size: 16px;
    color: #333;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .text {
      color: #90ff00;
      display: block;
    }
  }
  .account {
    height: 60px;
    background: #ffffff;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    border: 1px solid #f5f7fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .accounted {
      margin-left: 20px;
      font-size: 16px;
    }
    .account-icon {
      margin-right: 20px;
      i {
        font-size: 16px;
        color: #333;
      }
    }
  }
  .account-list {
    position: relative;
    width: 500px;
    .list-box {
      width: 500px;
      position: absolute;
      top: 10px;
      left: 0;
      background: #ffffff;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.04);
      border-radius: 12px;
      z-index: 99;
      padding: 10px 0;
      .list-item {
        height: 40px;
        cursor: pointer;
        &:hover {
          background: #f5f7fa;
        }
        span {
          padding: 0 20px;
        }
      }
    }
  }
  .coinSum {
    position: relative;
    ::v-deep .el-input__inner {
      width: 500px;
      height: 60px;
      line-height: 60px;
      background: #ffffff;
      box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.06);
      border-radius: 10px;
      border: 1px solid #f5f7fa;
    }
    ::v-deep .el-input__suffix {
      top: 10px;
      right: 15px;
      cursor: pointer;
      color: #90ff00;
    }
    .limit-amount {
      position: absolute;
      top: -48px;
      right: 0;
      font-size: 14px;
      color: #90ff00;
      cursor: pointer;
    }
  }
  .available {
    display: flex;
    justify-content: space-between;
    color: #333;
    font-size: 12px;
    line-height: 20px;
    P {
      color: #8992a6;
    }
  }
  .account-sum {
    font-size: 12px;
    color: #333;
    span {
      padding-left: 5px;
    }
  }
  .submitBtn {
    width: 500px;
    height: 60px;
  }
}
//表单样式修改
::v-deep .el-form-item__label {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.modal-content {
  line-height: 30px;
  .c-title {
    color: #96a2b2;
  }
}

.modal-footer {
  margin-top: 20px;
  .f-btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    background: #90ff00;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
}
</style>
