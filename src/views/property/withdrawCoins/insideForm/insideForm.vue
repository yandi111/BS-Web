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
      <el-form-item :label="$t('property.账户类型')">
        <div class="account">
          <div
            class="account-item"
            :class="accountTabIndex == item.id ? 'textActive' : ''"
            v-for="item in accountTabs"
            :key="item.id"
            @click="onAccountTab(item, item.id)"
          >
            {{ item.text }}
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="selectVal">
        <div class="dress-label" @click="onDress">
          <div class="dress-title">{{ $t("property.账户名") }}</div>
          <div class="dress-text">{{ $t("property.提币地址管理") }}</div>
        </div>
        <div class="select-box">
          <div class="phoneArea" v-if="accountTabIndex === 2">
            <div class="phoneArea-text">{{ phoneAreaName }}</div>
            <div class="phoneArea-icon" @click.stop="phoneAreaClick">
              <i
                :class="
                  phoneAreaShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                "
              ></i>
            </div>
            <div class="phoneArea-line">|</div>
          </div>
          <el-input
            :placeholder="
              accountTabIndex === 1
                ? $t('property.请输入邮箱')
                : accountTabIndex === 2
                ? $t('property.请输入手机号')
                : accountTabIndex === 3
                ? $t('property.请输入UID')
                : ''
            "
            v-model="ruleForm.selectVal"
          >
            <i
              v-if="filterAddressArr.length"
              slot="suffix"
              style="cursor: pointer"
              class="el-input__icon"
              :class="selectShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
              @click.stop="onSelected"
            ></i>
          </el-input>
        </div>
        <div class="select-list" v-if="selectShow">
          <div
            class="list-box"
            :class="filterAddressArr.length > 5 ? 'list-active' : ''"
            v-if="filterAddressArr.length"
          >
            <div
              class="list-item"
              v-for="item in filterAddressArr"
              :key="item.id"
              @click.stop="handleChoose(item)"
            >
              <div class="item-text">
                <span> {{ item.address }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="select-list" v-if="phoneAreaShow">
          <div
            class="list-box"
            :class="phoneAreaList.length > 5 ? 'list-active' : ''"
          >
            <div
              class="list-item"
              v-for="(item, index) in phoneAreaList"
              :key="index"
              @click.stop="phoneAreaChoose(item)"
            >
              <div class="item-text">
                <span> {{ item.label }}</span>
                <span> {{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('property.提币账户')">
        <div class="account-box" @click.stop="handleAccount">
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
      <el-form-item :label="$t('property.提币数量')" prop="withdrawalAmountVal">
        <div class="coinSum">
          <el-input
            :placeholder="$t('property.请输入提币数量')"
            v-model="ruleForm.withdrawalAmountVal"
            @input="
              ruleForm.withdrawalAmountVal = formatDecimal(
                ruleForm.withdrawalAmountVal,
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
          <p>{{ $t("property.可用") }}:{{ amount }}</p>
          <div v-if="fee">{{ $t("property.手续费") }} :{{ fee }}</div>
          <div v-else>{{ $t("property.手续费") }}: 0 USDT</div>
        </div>
        <div
          class="account-sum"
          v-show="arrivalAmount && ruleForm.withdrawalAmountVal"
        >
          {{ $t("property.到账数量") }}: {{ arrivalAmount
          }}<span>{{ coinName }}</span>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submitBtn"
          type="primary"
          :disabled="pauseDisable"
          @click="onSubmit('ruleForm')"
          >{{ $t("property.下一步") }}</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 验证 -->
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
    <!-- 内部提币暂停提示 -->
    <pause-prompt :isShow.sync="pauseShow"></pause-prompt>
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
            <span>{{ limitData.limitAmount == -1? $t('property.无限制') :  limitData.limitAmount}}</span>
            <span v-if="limitData.limitAmount != -1">{{ coinName }}</span>
          </div>
          <div class="c-title">{{ $t("property.最大提币次数") }}</div>
          <div class="c-text">{{ limitData.limitTimes == -1? $t('property.无限制') : limitData.limitTimes}}</div>
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
import VerifyForm from "../components/withdrawVeriy.vue";
import SuccessModal from "@/components/successModal.vue";
import pausePrompt from "../components/pausePrompt.vue";
import myModal from "@/components/my-modal/index.vue";
import {
  addressQueryApi,
  withdrawCheckApi,
  userWithdrawApi,
  transferBalanceApi,
  arrivalAccountApi,
  withdrawLimitInfo,
} from "@/api/assetWallet";
import { countryList } from "@/api/user";
export default {
  name: "InsideForm",
  components: {
    CoinSelect,
    VerifyForm,
    SuccessModal,
    pausePrompt,
    myModal,
  },
  props: {
    coinList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      phoneAreaShow: false,
      pauseShow: false,
      pauseDisable: false,
      //表单验证
      ruleForm: {
        ownType: 3, //4-uid；2-手机；3-邮箱；
        internalAccountVal: 1,
        withdrawalAmountVal: "",
        selectVal: "",
        phoneArea: "+86",
      },
      rules: {
        withdrawalAmountVal: [
          {
            required: true,
            message: this.$t("property.请输入提币数量"),
            trigger: "blur",
          },
        ],
        selectVal: [
          {
            required: true,
            message: this.$t("property.请输入账户"),
            trigger: "blur",
          },
        ],
      },
      coinId: null,
      coinName: "",
      iconUrl: "",
      decimalPlaces: null, //精度
      accountTabIndex: 1, //1邮箱，2手机，3uid
      accountTabs: [
        {
          id: 1,
          text: this.$t("property.邮箱"),
        },
        {
          id: 2,
          text: this.$t("property.手机号"),
        },
        {
          id: 3,
          text: "UID",
        },
      ],
      filterAddressArr: [],
      emailAddressArr: [], //查看地址记录邮箱
      phoneAddressArr: [], //查看地址记录手机
      uidAddressArr: [], //查看地址记录uid
      selectShow: false,
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
      selectIcon: false,
      accountName: this.$t("property.现货账户"), //默认现货账户
      amount: "", //可用余额
      fee: "", //手续费
      arrivalAmount: "", //到账数量
      coinName: "", //币种名称
      withdrawParams: {}, //提币参数
      //认证参数
      phoneStatus: null,
      emailStatus: null,
      googleAuthStatus: null,
      tradePasswordStatus: null,
      authToken: null,
      verifyShow: false, //校验弹窗
      phoneAreaList: [],
      phoneAreaName: "",
      successShow: false,
      timer: null,
      isCheckObj: {},
      isLimitAmount: false,
      limitData: {},
    };
  },
  mounted() {
    this.initData();
    this.getAddressList();
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
    //数据初始化
    initData() {
      //监听点击事件
      document.addEventListener("click", () => {
        this.selectShow = false;
        this.selectIcon = false;
        this.phoneAreaShow = false;
      });
      this.getCionList();
      // this.getCountryList();
    },
    getCionList() {
      // 默认选中第一条数据的coinId、iconUrl
      this.coinId = this.coinList[0].coinId;
      this.coinName = this.coinList[0].coinName;
      this.iconUrl = this.coinList[0].iconUrl;
      this.decimalPlaces = this.coinList[0].decimalPlaces;
      this.getBalance(this.ruleForm.internalAccountVal, {
        coinId: this.coinId,
        coinName: this.coinName,
      });
      if (this.coinList[0].isInternalWithdraw == 0) {
        this.pauseShow = true;
        this.pauseDisable = true;
      } else {
        this.pauseShow = false;
        this.pauseDisable = false;
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

    //币种选择
    onCoinChoose(val) {
      if (val.isInternalWithdraw == 0) {
        this.pauseShow = true;
        this.pauseDisable = true;
        return;
      } else {
        this.pauseShow = false;
        this.pauseDisable = false;
      }
      this.coinId = val.coinId;
      this.coinName = val.coinName;
      this.decimalPlaces = val.decimalPlaces;
      this.getBalance(this.ruleForm.internalAccountVal, {
        coinId: this.coinId,
        coinName: this.coinName,
      });
    },
    onAddTag(val) {
      if (!val.isInternalWithdraw) {
        this.pauseShow = true;
        this.pauseDisable = true;
      } else {
        this.pauseShow = false;
        this.pauseDisable = false;
      }
      this.$refs.selectRef.symbolFilterList.forEach((item) => {
        if (val.coinName == item.coinName) {
          this.$refs.selectRef.coinName = item.coinName;
          this.$refs.selectRef.coinUrl = item.iconUrl;
          this.coinId = item.coinId;
          this.coinName = item.coinName;
          this.getBalance(this.ruleForm.internalAccountVal, {
            coinId: this.coinId,
            coinName: this.coinName,
          });
        }
      });
    },
    //账户类型
    onAccountTab(item, index) {
      this.accountTabIndex = index;
      if (item.id === 1) {
        this.ruleForm.ownType = 3; //邮箱
        this.filterAddressArr = this.emailAddressArr.filter((item) => {
          if (item.type === 3) {
            return item;
          }
        });
        this.ruleForm.selectVal = "";
      } else if (item.id === 2) {
        this.ruleForm.ownType = 2; //手机
        this.filterAddressArr = this.phoneAddressArr.filter((item) => {
          if (item.type === 2) {
            return item;
          }
        });
        this.ruleForm.selectVal = "";
        this.getCountryList();
      } else if (item.id === 3) {
        this.ruleForm.ownType = 4; //uid
        this.filterAddressArr = this.uidAddressArr.filter((item) => {
          if (item.type === 4) {
            return item;
          }
        });
        this.ruleForm.selectVal = "";
      }
    },
    //账户名
    onDress() {
      this.$emit("pageChange");
    },
    onSelected() {
      this.selectShow = !this.selectShow;
      this.phoneAreaShow = false;
    },
    onInternalChange(val) {
      this.ruleForm.internalAccountVal = val;
    },
    handleChoose(val) {
      if (this.accountTabIndex === 2) {
        this.ruleForm.selectVal = this.newAddress(val.address);
      } else {
        this.ruleForm.selectVal = val.address;
      }
      this.selectShow = false;
    },
    //去掉区号
    newAddress(val) {
      return val.split(" ")[1];
    },
    //查询提币地址 && 返回type 2手机、3邮箱、4uid)
    getAddressList() {
      addressQueryApi({
        type: 2,
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.emailAddressArr =
              JSON.parse(JSON.stringify(res.data.data)) || [];
            this.phoneAddressArr =
              JSON.parse(JSON.stringify(res.data.data)) || [];
            this.uidAddressArr =
              JSON.parse(JSON.stringify(res.data.data)) || [];
            this.filterAddressArr = this.emailAddressArr.filter((item) => {
              if (item.type === 3) {
                return item;
              }
            });
          }
        }
      });
    },
    //提币账户
    handleAccount() {
      this.selectIcon = !this.selectIcon;
    },
    chooseAccount(item) {
      this.ruleForm.internalAccountVal = item.value;
      this.accountName = item.label;
      this.selectIcon = false;
      //查询余额
      this.getBalance(item.value, {
        coinId: this.coinId,
        coinName: this.coinName,
      });
    },
    //全部
    handleAll() {
      this.ruleForm.withdrawalAmountVal = this.amount;
      this.handleAmount(this.ruleForm.withdrawalAmountVal);
    },
    //选择国家区号
    phoneAreaClick() {
      this.phoneAreaShow = !this.phoneAreaShow;
      this.selectShow = false;
    },
    //获取国家列表
    getCountryList() {
      countryList().then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            const { data } = res.data;
            const list = [];
            data.map((item) => {
              list.push({
                label: item.name,
                value: `+${item.code}`,
              });
            });
            this.phoneAreaList = list;
            this.phoneAreaName = this.phoneAreaList[0].value;
          }
        }
      });
    },
    phoneAreaChoose(item) {
      this.phoneAreaName = item.value;
      this.ruleForm.phoneArea = item.value;
      this.phoneAreaShow = false;
    },

    //提交表单
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //获取认证参数(内部转账)
          const params = {
            type: this.ruleForm.internalAccountVal, //账户类型 1:现货账户  2:资金账户
            ownType: this.ruleForm.ownType, //提币类型 4-uid；2-手机；3-邮箱；
            coinId: this.coinId,
            coinName: this.coinName,
            amount: this.ruleForm.withdrawalAmountVal,
            toAddress:
              this.accountTabIndex === 2
                ? `${this.ruleForm.phoneArea} ${this.ruleForm.selectVal}`
                : this.ruleForm.selectVal, //提币地址或账户  钱包地址、uid、手机号、邮箱号
          };
          this.withdrawParams = params;
          //提币-获取认证选项
          let res = await withdrawCheckApi(params);
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
          //判断是否验证和是否绑定
          this.isCheckObj = {
            authPhone: authPhone,
            authEmail: authEmail,
            authGoogleAuth: authGoogleAuth,
          };
          this.phoneStatus = phoneStatus;
          this.emailStatus = emailStatus;
          this.googleAuthStatus = googleAuthStatus;
          this.tradePasswordStatus = tradePasswordStatus;
          this.authToken = authToken;

          this.withdrawParams = Object.assign(this.withdrawParams, {
            authToken: authToken,
          });
          this.verifyShow = true;
          // if (authPhone && authEmail && authGoogleAuth) {
          //   this.verifyShow = true;
          //   this.withdrawParams = Object.assign(this.withdrawParams, {
          //     authToken: authToken,
          //   });
          // }
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
      const params = Object.assign(this.withdrawParams, newData);
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
    // 提币成功
    sureSuccess() {
      // 参数初始化
      this.accountTabIndex = 1;
      this.ruleForm = {
        ownType: 3, //4-uid；2-手机；3-邮箱；
        internalAccountVal: 1,
        withdrawalAmountVal: "",
        selectVal: "",
        phoneArea: "+86",
      };
      this.getBalance(this.ruleForm.internalAccountVal, {
        coinId: this.coinId,
        coinName: this.coinName,
      });
      this.arrivalAmount = "";
      this.fee = "";
      //提币成功刷新列表
      this.$emit("record");
      this.successShow = false;
    },

    //到账数量，手续费
    handleAmount(val) {
      if (!val) {
        this.fee = "";
        this.arrivalAmount = "";
      } else {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            const params = {
              isOwn: 1, //内部提币
              amount: this.ruleForm.withdrawalAmountVal,
              coinId: this.coinId,
              coinName: this.coinName,
            };
            if (!this.ruleForm.withdrawalAmountVal) return; //输入值为空不请求数据
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
    //输入框限制处理
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
  .account {
    display: flex;
    justify-content: space-between;
    .account-item {
      width: 145px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #ffffff;
      box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      border: 1px solid #f5f7fa;
      cursor: pointer;
    }
    .textActive {
      color: #90ff00;
      border: 1px solid #90ff00;
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
  .select-box {
    display: flex;
    background: #ffffff;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.06);
    border: 1px solid #f5f7fa;
    border-radius: 10px;
    .phoneArea {
      display: flex;
      align-items: center;
      padding-left: 20px;
      .phoneArea-icon {
        padding-left: 5px;
        cursor: pointer;
      }
      .phoneArea-line {
        padding-left: 5px;
        color: #c2c4c9;
      }
    }
    ::v-deep .el-input__inner {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border: none;
      border-radius: 10px;
    }
    ::v-deep .el-input__icon {
      width: 45px;
      font-size: 16px;
      color: #333;
    }
  }
  .select-list {
    position: relative;
    width: 500px;

    .list-box {
      width: 500px;
      position: absolute;
      top: 10px;
      left: 0;
      background: #fff;
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
        .item-text {
          display: flex;
          justify-content: space-between;
          span {
            padding: 0 20px;
          }
        }
      }
    }
    .list-active {
      height: 220px;
      overflow-y: scroll;
    }
  }

  .account-box {
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
      margin-right: 18px;
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
      background: #fff;
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
