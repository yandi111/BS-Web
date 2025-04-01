<template>
  <div @click.stop="close">
    <div v-if="dressIndex === 1" class="withdrawCoins">
      <div style="display: flex">
        <div class="left">
          <div class="withdrawCoins-title">
            <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
            <span @click="$router.go(-1)">提现地址</span>
          </div>
          <div class="container">
            <div style="display: flex">
              <div v-for="(item, index) in tabArr" :key="index">
                <div
                  class="tab-btn"
                  :class="tabIndex == item.id ? 'btnActive' : ''"
                  @click="checkTab(item, item.id)"
                >
                  {{ item.text }}
                </div>
              </div>
            </div>
            <div class="withdrawCoins-form" v-show="tabIndex === 1">
              <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="80px"
                label-position="top"
              >
                <el-form-item class="coinname" label="币种">
                  <!-- <WithdrawSelect
                    ref="selectRef"
                    v-if="coinList.length"
                    :coinList="coinList"
                    :coinId.sync="coinId"
                    @getCoinId="getCoinId"
                    @getIconUrl="getIconUrl"
                    :iconUrl="iconUrl"
                    @onCoinChoose="onCoinChoose"
                    @onAddTag="onAddTag"
                  /> -->
                  <div class="coin-select" @click.stop>
                    <coin-select
                      ref="selectRef"
                      v-if="coinList.length"
                      :list="coinList"
                      :isHot="true"
                      @selectedCoin="onCoinChoose"
                      @onAddTag="onAddTag"
                    ></coin-select>
                  </div>
                </el-form-item>
                <el-form-item class="chainame" label="链名称" prop="networkVal">
                  <el-select
                    v-model="ruleForm.networkVal"
                    ref="chooseNetwork"
                    @focus="networkDialog"
                    @change="networkChange"
                    placeholder="请选择链接"
                  >
                    <el-option
                      v-for="item in addressQueryArr"
                      :key="item.id"
                      :label="item.coinName"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="chainame" prop="dressVal">
                  <div class="coin-dress" @click.stop="onDress(1)">
                    <p class="dress-title">提币地址</p>
                    <p>
                      <a href="javascript:;">管理地址</a> |
                      <a href="javascript:;">提币到U地址</a>
                    </p>
                  </div>
                  <div class="coin-address">
                    <el-input
                      v-model="ruleForm.dressVal"
                      placeholder="请输入提币地址"
                      @change="handleDressCheck"
                    ></el-input>
                    <div class="address-icon" @click="withdrawalAddressDialog">
                      <img src="@/assets/images/select.png" alt="" />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item v-if="checkPlatFormAddress">
                  <div class="valid-address">
                    <div class="text">支付UID:{{ uid }}</div>
                    <div>该地址属于BSEX用户。实时到账无手续费。</div>
                  </div>
                </el-form-item>
                <el-form-item
                  class="chainame"
                  label="提币账户"
                  prop="accountVal"
                >
                  <el-select
                    v-model="ruleForm.accountVal"
                    placeholder="请输入提币账户"
                    @change="onAccountChange"
                  >
                    <el-option
                      v-for="item in withdrawList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="chainame"
                  label="提币数量"
                  prop="coinSumVal"
                >
                  <div class="amount">
                    <el-input
                      placeholder="请输入提币数量"
                      v-model="ruleForm.coinSumVal"
                      @input="
                        ruleForm.coinSumVal = formatDecimal(
                          ruleForm.coinSumVal,
                          decimalPlaces
                        )
                      "
                    >
                    </el-input>
                    <div class="all" @click="handleAll(1)">全部</div>
                  </div>
                </el-form-item>
                <el-form-item v-if="tabIndex === 1">
                  <div class="available">
                    <p>可用：{{ amount }}</p>
                    <div v-if="fee">手续费：{{ fee }}</div>
                    <div v-else>手续费：0 USDT</div>
                  </div>
                  <div class="account-sum" v-show="arrivalAmount">
                    到账数量：{{ arrivalAmount }}<span>{{ coinName }}</span>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('ruleForm', 1)"
                    >下一步</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div v-show="tabIndex === 2" class="withdrawCoins-form">
              <el-form
                ref="internalRef"
                :model="internalRuleForm"
                :rules="rules"
                label-width="80px"
                label-position="top"
              >
                <el-form-item class="coinname" label="币种">
                  <!-- <InternalWithdrawSelect
                    ref="selectInternalRef"
                    v-if="internalCoinList.length"
                    :coinList="internalCoinList"
                    :coinId.sync="internalCoinId"
                    :iconUrl="internalIconUrl"
                    @getCoinId="getinternalCoinId"
                    @getIconUrl="getinternalCoinUrl"
                    @internalChoose="internalChoose"
                    @onAddTag="onInternalAddTag"
                  /> -->
                  <div class="coin-select" @click.stop>
                    <coin-select
                      ref="selectInternalRef"
                      v-if="internalCoinList.length"
                      :list="internalCoinList"
                      :isHot="true"
                      @selectedCoin="internalChoose"
                      @onAddTag="onInternalAddTag"
                    ></coin-select>
                  </div>
                </el-form-item>
                <el-form-item class="chainame" label="账户类型">
                  <div class="account">
                    <div
                      class="account-item"
                      :class="accountTabIndex == item.id ? 'textActive' : ''"
                      v-for="item in accountTypeTabArr"
                      :key="item.id"
                      @click="onAccountTab(item, item.id)"
                    >
                      {{ item.text }}
                    </div>
                  </div>
                </el-form-item>

                <el-form-item
                  class="chainame"
                  prop="selectVal"
                  v-if="accountTabIndex === 1"
                >
                  <div class="coin-dress">
                    <p class="dress-title">账户名</p>
                    <p @click="onDress(2)">
                      <a href="javascript:;">提币地址管理</a>
                    </p>
                  </div>
                  <div class="select">
                    <el-input
                      v-model="internalRuleForm.selectVal"
                      placeholder="请输入邮箱"
                    >
                    </el-input>
                    <div slot="append" class="select-append">
                      <el-popover
                        placement="bottom"
                        width="500"
                        :offset="-255"
                        trigger="click"
                        :visible-arrow="true"
                        v-model="popperShow"
                      >
                        <div class="popper-content">
                          <ul v-if="filterAddressArr.length > 0">
                            <li
                              v-for="item in filterAddressArr"
                              :key="item.id"
                              @click="handleChoose(item)"
                              :style="{
                                'background-color':
                                  item.id === legalTenderId ? '#EDF1FF' : '',
                              }"
                            >
                              <div
                                style="
                                  display: inline-block;
                                  width: 25px;
                                  height: 25px;
                                  line-height: 25px;
                                  vertical-align: middle;
                                  margin-right: 10px;
                                "
                              ></div>
                              {{ item.address }}
                            </li>
                          </ul>
                          <div v-else class="no-data">暂无数据</div>
                        </div>
                        <div slot="reference" class="select-value">
                          <i
                            :class="[
                              'custom-icon',
                              popperShow
                                ? 'el-icon-arrow-up'
                                : 'el-icon-arrow-down',
                            ]"
                          ></i>
                        </div>
                      </el-popover>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item prop="selectVal" v-if="accountTabIndex === 2">
                  <div class="coin-dress">
                    <p class="dress-title">账户名</p>
                    <p @click="onDress(2)">
                      <a href="javascript:;">提币地址管理</a>
                    </p>
                  </div>
                  <div class="form-phone">
                    <div>
                      <el-input
                        placeholder="请输入手机号"
                        v-model="internalRuleForm.selectVal"
                      >
                        <el-select
                          class="phone-select"
                          v-model="internalRuleForm.phoneArea"
                          slot="prepend"
                          placeholder="请选择"
                          @change="phoneAreaChange"
                        >
                          <el-option
                            v-for="(item, index) in phoneAreaList"
                            :key="index"
                            :label="item.value"
                            :value="item.value"
                          >
                            <span style="float: left">{{ item.label }}</span>
                            <span
                              style="
                                float: right;
                                color: #8492a6;
                                font-size: 13px;
                              "
                              >{{ item.value }}</span
                            >
                          </el-option>
                        </el-select>
                        <div slot="append" class="select-append">
                          <el-popover
                            placement="bottom"
                            width="500"
                            :offset="-223"
                            trigger="click"
                            :visible-arrow="true"
                            v-model="popperShow"
                          >
                            <div class="popper-content">
                              <ul v-if="filterAddressArr.length > 0">
                                <li
                                  v-for="item in filterAddressArr"
                                  :key="item.id"
                                  @click="handleChoose(item)"
                                  :style="{
                                    'background-color':
                                      item.id === legalTenderId
                                        ? '#EDF1FF'
                                        : '',
                                  }"
                                >
                                  <div
                                    style="
                                      display: inline-block;
                                      width: 25px;
                                      height: 25px;
                                      line-height: 25px;
                                      vertical-align: middle;
                                      margin-right: 10px;
                                    "
                                  ></div>
                                  {{ item.address }}
                                </li>
                              </ul>
                              <div v-else class="no-data">暂无数据</div>
                            </div>
                            <div slot="reference" class="select-value">
                              <i
                                :class="[
                                  'custom-icon',
                                  popperShow
                                    ? 'el-icon-arrow-up'
                                    : 'el-icon-arrow-down',
                                ]"
                              ></i>
                            </div>
                          </el-popover>
                        </div>
                      </el-input>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item
                  class="chainame"
                  prop="selectVal"
                  v-if="accountTabIndex === 3"
                >
                  <div class="coin-dress">
                    <p class="dress-title">账户名</p>
                    <p @click="onDress(2)">
                      <a href="javascript:;">提币地址管理</a>
                    </p>
                  </div>
                  <div class="select">
                    <el-input
                      v-model="internalRuleForm.selectVal"
                      placeholder="请输入uid"
                    >
                    </el-input>
                    <div slot="append" class="select-append">
                      <el-popover
                        placement="bottom"
                        width="500"
                        :offset="-255"
                        trigger="click"
                        :visible-arrow="true"
                        v-model="popperShow"
                      >
                        <div class="popper-content">
                          <ul v-if="filterAddressArr.length > 0">
                            <li
                              v-for="item in filterAddressArr"
                              :key="item.id"
                              @click="handleChoose(item)"
                              :style="{
                                'background-color':
                                  item.id === legalTenderId ? '#EDF1FF' : '',
                              }"
                            >
                              <div
                                style="
                                  display: inline-block;
                                  width: 25px;
                                  height: 25px;
                                  line-height: 25px;
                                  vertical-align: middle;
                                  margin-right: 10px;
                                "
                              ></div>
                              {{ item.address }}
                            </li>
                          </ul>
                          <div v-else class="no-data">暂无数据</div>
                        </div>
                        <div slot="reference" class="select-value">
                          <i
                            :class="[
                              'custom-icon',
                              popperShow
                                ? 'el-icon-arrow-up'
                                : 'el-icon-arrow-down',
                            ]"
                          ></i>
                        </div>
                      </el-popover>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item
                  class="chainame"
                  label="提币账户"
                  prop="internalAccountVal"
                >
                  <el-select
                    v-model="internalRuleForm.internalAccountVal"
                    placeholder="请输入提币账户"
                    @change="onInternalChange"
                  >
                    <el-option
                      v-for="item in internalwithdrawList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="chainame"
                  label="提币数量"
                  prop="withdrawalAmountVal"
                >
                  <div class="amount">
                    <el-input
                      placeholder="最小提币金额为"
                      v-model="internalRuleForm.withdrawalAmountVal"
                      @input="
                        internalRuleForm.withdrawalAmountVal = formatDecimal(
                          internalRuleForm.withdrawalAmountVal,
                          internalDecimalPlaces
                        )
                      "
                    ></el-input>
                    <div class="all" @click="handleAll(2)">全部</div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div class="available">
                    <p>可用：{{ internalAmount }}</p>
                    <div v-if="internalFee">手续费：{{ internalFee }}</div>
                    <div v-else>手续费：0 USDT</div>
                  </div>
                  <div class="account-sum" v-show="internalNum">
                    到账数量：{{ internalNum }}
                    <span>{{ internalcoinName }}</span>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('internalRef', 2)"
                    >下一步</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="img">
            <div>
              <p>守护您的资产</p>
              <p>***继续为您护航</p>
            </div>
            <img src="@/assets/images/coin.png" alt="" />
          </div>
          <div class="notice">
            <p
              style="
                font-size: 16px;
                font-weight: 500;
                color: #333333;
                margin-bottom: 10px;
              "
            >
              温馨提示
            </p>
            <p>
              -为了用户资金安全，平台客服可能会以电话形式确认您的提币操作请您注意接听。
            </p>
            <p>
              - 最小提币数量为：
              <span>0.001</span>，最大提币金额不得超过您账户的可用金额。
            </p>
            <p>
              - 建议您完成KYC认证以提高账户安全性；未认证每日提币总额
              <span>50000 USD</span>；每月提币总额<span>100000</span>
              USD；认证后每日提币总额<span>30000000 USD</span>。
            </p>
            <p>- 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
          </div>
          <div class="question">
            <p style="font-size: 16px; font-weight: 500; margin-bottom: 20px">
              常见问题
            </p>
            <p>提币限额调整</p>
            <p>如何从账户提取加密货币?</p>
            <span style="color: #5271ff; cursor: pointer" @click="handleMore"
              >更多</span
            >
          </div>
        </div>
      </div>
      <AssetTable
        :columnData="columnData"
        :tableData="recordList"
        title="提币记录"
        :show="false"
        :paginationShow="true"
        :total="total"
        :page.sync="pagingParams.pageNum"
        :symbolList="symbolList"
        @current-change="currentChange"
        @coinChange="coinChange"
        @onRecentDate="onRecentDate"
        @onChangeDate="onChangeDate"
        @onAllRecord="onAllRecord"
      />
    </div>
    <div v-if="dressIndex === 2">
      <!-- 地址管理 -->
      <InternalDressManage
        @goBack="goInternaBack"
        :withdrawCoinsType="withdrawCoinsType"
      />
    </div>
    <!-- 链名称（网络选择） -->
    <netword-select
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
      :addressQueryArr="addressQueryArr"
      @toAddress="toAddress"
      @chainAddressChange="chainAddressChange"
    ></chain-address>
    <!-- 下一步验证 -->
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
      v-if="authToken"
    ></verify-form>
    <success-modal
      :is-show.sync="successShow"
      btnText="确定"
      text="提币审核中"
      @next="sureSuccess"
    ></success-modal>
    <!-- 禁止交易弹窗 -->
    <el-dialog width="500px" title="温馨提示" :visible.sync="tipShow">
      <el-row class="tip-row">
        <el-col>
          <div>
            由于您的操作行为，风控已禁止您的交易；如需恢复交易请联系在线客服！
          </div>
        </el-col>
        <el-col>
          <div class="tip-btn" @click="handleService">联系客服</div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import AssetTable from "@/components/assetWallet/assetTable.vue";
import WithdrawSelect from "./components/withdrawSelect.vue";
// import AddressManage from "./components/dressManage.vue";
import InternalDressManage from "./components/internalDressManage.vue";
import ChainName from "./components/chainName.vue";
import VerifyForm from "./components/withdrawVeriy.vue";
import SuccessModal from "@/components/successModal.vue";
import NetwordSelect from "./components/NetwordSelect.vue";
import ChainAddress from "./components/chainAddress.vue";
import InternalWithdrawSelect from "./components/internalWithdrawSelect.vue";
import CoinSelect from "../components/coinSelect.vue";
import {
  simpleApi,
  addressQueryApi,
  recordQueryApi,
  chainListApi,
  transferBalanceApi,
  withdrawCheckApi,
  userWithdrawApi,
  arrivalAccountApi,
  isValidAddressApi,
} from "@/api/assetWallet";

import * as user from "@/api/user";
export default {
  name: "WithdrawCoins",
  components: {
    AssetTable,
    WithdrawSelect,
    ChainName,
    VerifyForm,
    SuccessModal,
    NetwordSelect,
    ChainAddress,
    InternalWithdrawSelect,
    InternalDressManage,
    CoinSelect,
  },
  data() {
    return {
      popperShow: false,
      addressShow: false, //提币地址
      networkShow: false, //网络选择弹框
      verifyShow: false, //验证弹框
      successShow: false,
      chainAddressShow: false,
      tipShow: false,
      convertAssetName: "",
      authToken: "", //认证authToken
      legalTenderId: 1,
      dressIndex: 1,
      tabIndex: 1,
      tabArr: [
        {
          id: 1,
          text: "链上提币",
        },
        {
          id: 2,
          text: "内部提币",
        },
      ],
      accountTabIndex: 1, //1邮箱，2手机，3uid
      accountTypeTabArr: [
        {
          id: 1,
          text: "邮箱",
        },
        {
          id: 2,
          text: "手机号",
        },
        {
          id: 3,
          text: "UID",
        },
      ],
      columnData: [
        {
          WithdrawCoinsTimeType: true,
          prop: "confirmTimeTsLong",
          label: "时间",
          width: "",
        },
        {
          text: true,
          prop: "coinName",
          label: "币种",
          width: "",
        },
        {
          isOwnDefined: true,
          text: true,
          label: "类型",
          width: "",
        },
        {
          text: true,
          prop: "amount",
          label: "数量",
          width: "",
        },
        {
          ownDefined: true,
          text: true,
          label: "状态",
          width: "",
        },
        {
          isOperation: true,
          label: "操作",
          width: "80",
        },
      ],
      filterAddressArr: [],
      emailAddressArr: [], //内部转账(查看地址记录邮箱)
      phoneAddressArr: [], //内部转账(查看地址记录手机)
      uidAddressArr: [], //内部转账(查看地址记录uid)
      withdrawList: [
        {
          value: 1,
          label: "现货账户",
        },
        {
          value: 2,
          label: "资金账户",
        },
      ],
      isAdd: false,
      //接口数据
      coinList: [], //提币币种列表
      symbolList: [], //提币记录搜索列表
      addressQueryArr: [], //链上提币地址
      recordList: [], //提币记录
      coinId: null,
      coinName: "",
      iconUrl: "",
      networkData: [],
      amount: "", //可用余额
      //表单验证（链上提币）
      ruleForm: {
        networkVal: "", //链名称绑定值
        dressVal: "", //地址
        coinSumVal: "", //提币数量
        accountVal: this.$route.params.value || 1, //账户名称
        chainName: "", //链名称
      },
      rules: {
        networkVal: [
          { required: true, message: "请选择链接", trigger: "change" },
        ],
        dressVal: [
          { required: true, message: "请输入提币地址", trigger: "change" },
        ],
        coinSumVal: [
          { required: true, message: "请输入提币数量", trigger: "change" },
        ],
        accountVal: [
          { required: true, message: "请输入账户名称", trigger: "change" },
        ],
        //内部转账
        withdrawalAmountVal: [
          { required: true, message: "请输入提币数量", trigger: "change" },
        ],
        selectVal: [{ required: true, message: "请输入账户", trigger: "blur" }],
      },
      //表单验证（内部转账）
      internalRuleForm: {
        ownType: 3, //4-uid；2-手机；3-邮箱；
        internalAccountVal: 1,
        withdrawalAmountVal: "",
        selectVal: "",
        phoneArea: "+86",
      },
      phoneAreaList: [],
      internalwithdrawList: [
        {
          value: 1,
          label: "现货账户",
        },
        {
          value: 2,
          label: "资金账户",
        },
      ],

      //获取提币认证参数
      phoneStatus: null,
      emailStatus: null,
      googleAuthStatus: null,
      tradePasswordStatus: null,
      withdrawCoinsType: null, //1是链上提币2是内部转账

      withdrawParams: {}, //提币参数(内部)
      withdrawChainParams: {}, //提币参数(链上)
      //分页
      pagingParams: {
        type: 2, //2提币
        status: "",
        coinId: "",
        pageNum: 1,
        pageSize: 10,
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
      },
      total: 0,
      arrivalAmount: "", //到账数量
      fee: "", //手续费
      userWithdrawStatus: "", //交易提示状态
      //内部提币参数
      internalCoinList: [],
      internalCoinId: null,
      internalIconUrl: "",
      internalcoinName: "",
      internalAmount: "", //内部转账可用
      internalFee: "", //内部转账手续费
      internalNum: "", //内部转账到账数量
      decimalPlaces: null, //精度链上
      internalDecimalPlaces: null, //精度内部
      checkPlatFormAddress: false, //检验提币地址
      uid: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getCoinList(1, 4); //第一个参数1代表链上，2代表内部
      this.getWithdrawCoinsRecord();
      this.getFunctionStatus();
      this.getCountryList();
    },
    //获取国家列表
    getCountryList() {
      user.countryList().then((res) => {
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
          }
        }
      });
    },
    getFunctionStatus() {
      // functionStatus().then((res) => {
      //   if (res.status && res.status === 200) {
      //     if (res.data && res.data.success) {
      //       this.userWithdrawStatus = res.data?.data?.userWithdrawStatus;
      //       if (res.data?.data?.userWithdrawStatus === "FORBIDDEN") {
      //         this.tipShow = true;
      //       } else {
      //         this.tipShow = false;
      //       }
      //     }
      //   }
      // });
    },
    //联系客服
    handleService() {
      //客服功能待开发
      this.tipShow = false;
    },
    //查询提币币种列表
    getCoinList(index, type) {
      simpleApi({
        isType: type,
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            let arr = JSON.parse(JSON.stringify(res.data.data));
            if (index === 1) {
              this.coinList = res.data.data;
              this.symbolList = arr || [];
              this.symbolList.unshift({
                id: "",
                coinName: "全部币种",
              });
              // 默认选中第一条数据的coinId、iconUrl
              this.coinId = this.coinList[0].coinId;
              this.coinName = this.coinList[0].coinName;
              this.iconUrl = this.coinList[0].iconUrl;
              this.decimalPlaces = this.coinList[0].decimalPlaces;
              //默认币种及id
              this.getBalance(1, this.ruleForm.accountVal, {
                // fromAccountType: this.ruleForm.accountVal,
                coinId: this.coinId,
                coinName: this.coinName,
              });
            } else {
              //内部提币的数据
              this.internalCoinList = res.data.data;
              this.symbolList = arr || [];
              this.symbolList.unshift({
                id: "",
                coinName: "全部币种",
              });
              // 默认选中第一条数据的coinId、iconUrl
              this.internalCoinId = this.internalCoinList[0].coinId;
              this.internalcoinName = this.internalCoinList[0].coinName;
              this.internalIconUrl = this.internalCoinList[0].iconUrl;
              this.internalDecimalPlaces =
                this.internalCoinList[0].decimalPlaces;
              this.getBalance(2, this.internalRuleForm.internalAccountVal, {
                // fromAccountType: this.internalRuleForm.internalAccountVal,
                coinId: this.internalCoinId,
                coinName: this.internalcoinName,
              });
            }
          }
        }
      });
    },
    onAccountChange(val) {
      this.ruleForm.accountVal = val;
      this.getBalance(1, val, {
        fromAccountType: this.ruleForm.accountVal,
        coinId: this.coinId,
        coinName: this.coinName,
      });
    },
    //内部
    onInternalChange(val) {
      this.internalRuleForm.internalAccountVal = val;
      this.getBalance(2, val, {
        // fromAccountType: this.internalRuleForm.internalAccountVal,
        coinId: this.internalCoinId,
        coinName: this.internalcoinName,
      });
    },
    //链上
    onCoinChoose(val) {
      this.coinId = val.coinId;
      this.coinName = val.coinName;
      this.decimalPlaces = val.decimalPlaces;
      // 选币种及id
      this.getBalance(1, this.ruleForm.accountVal, {
        // fromAccountType: this.ruleForm.accountVal,
        coinId: this.coinId,
        coinName: this.coinName,
      });
    },
    //内部
    internalChoose(val) {
      this.internalCoinId = val.coinId;
      this.internalcoinName = val.coinName;
      this.internalDecimalPlaces = val.decimalPlaces;
      this.getBalance(2, this.internalRuleForm.internalAccountVal, {
        // fromAccountType: this.internalRuleForm.internalAccountVal,
        coinId: this.internalCoinId,
        coinName: this.internalcoinName,
      });
    },

    //链上热门币种选择
    onAddTag(val) {
      this.$refs.selectRef.symbolFilterList.forEach((item) => {
        if (val === item.coinName) {
          this.$refs.selectRef.coinName = item.coinName;
          // this.$refs.selectRef.legalTenderId = item.id;
          this.$refs.selectRef.coinUrl = item.iconUrl;
          this.coinId = item.coinId;
          this.coinName = item.coinName;
          this.getBalance(1, this.ruleForm.accountVal, {
            // fromAccountType: this.ruleForm.accountVal,
            coinId: this.coinId,
            coinName: this.coinName,
          });
        }
      });
    },
    //内部热门币种选择
    onInternalAddTag(val) {
      this.$refs.selectInternalRef.symbolFilterList.forEach((item) => {
        if (val === item.coinName) {
          // this.$refs.selectInternalRef.convertAssetName = item.coinName;
          this.$refs.selectInternalRef.coinName = item.coinName;
          // this.$refs.selectInternalRef.legalTenderId = item.id;
          // this.$refs.selectInternalRef.symbolUrl = item.iconUrl;
          this.$refs.selectInternalRef.coinUrl = item.iconUrl;
          this.internalCoinId = item.coinId;
          this.internalcoinName = item.coinName;
          this.getBalance(2, this.internalRuleForm.internalAccountVal, {
            // fromAccountType: this.internalRuleForm.internalAccountVal,
            coinId: this.internalCoinId,
            coinName: this.internalcoinName,
          });
        }
      });
    },
    //查询可用余额 index(链上、内部) type(1现货2资金) data(请求参数)
    getBalance(index, type, data) {
      transferBalanceApi(data).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            if (index === 1) {
              //链上
              if (type === 1) {
                this.amount = res.data?.data?.tradeAvailableAmount;
              } else {
                this.amount = res.data?.data?.otcAvailableAmount;
              }
            } else {
              //内部
              if (type === 1) {
                this.internalAmount = res.data?.data?.tradeAvailableAmount;
              } else {
                this.internalAmount = res.data?.data?.otcAvailableAmount;
              }
            }
          }
        }
      });
    },
    // 查询提币记录
    getWithdrawCoinsRecord() {
      recordQueryApi(this.pagingParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.total = res.data.data.total;
            this.recordList = res.data.data.records;
            for (var i = 0; i < this.recordList.length; i++) {
              this.$set(this.recordList[i], "operateType", "withdraw");
            }
          }
        }
      });
    },
    checkTab(item, index) {
      this.tabIndex = index;
      if (index === 2) {
        this.getCoinList(2, 4);
        this.getAddressList(2); //内部转账地址
        // this.$refs.ruleForm.resetFields();
        this.getWithdrawCoinsRecord();
      } else if (this.tabIndex === 1) {
        this.getCoinList(1, 4);
        // this.$refs.internalRef.resetFields();
      }
    },
    onAccountTab(item, index) {
      this.accountTabIndex = index;
      if (item.id === 1) {
        this.internalRuleForm.ownType = 3; //邮箱
        this.filterAddressArr = this.emailAddressArr.filter((item) => {
          if (item.type === 3) {
            return item;
          }
        });
        this.internalRuleForm.selectVal = "";
      } else if (item.id === 2) {
        this.internalRuleForm.ownType = 2; //手机
        this.filterAddressArr = this.phoneAddressArr.filter((item) => {
          if (item.type === 2) {
            return item;
          }
        });
      } else if (item.id === 3) {
        this.internalRuleForm.ownType = 4; //uid
        this.filterAddressArr = this.uidAddressArr.filter((item) => {
          if (item.type === 4) {
            return item;
          }
        });
        this.internalRuleForm.selectVal = "";
      }
    },
    //提币申请
    getUserWithdrawApi(data) {
      userWithdrawApi(data).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.successShow = true;
            //提币成功刷新列表
            this.getWithdrawCoinsRecord();
          }
        }
      });
    },
    //国家区号
    phoneAreaChange(val) {
      this.internalRuleForm.phoneArea = val;
    },
    //提币确认 type1是链上提币 type2内部转账
    onSubmit(formName, type) {
      if (type === 1) {
        if (this.userWithdrawStatus === "FORBIDDEN") {
          this.tipShow = true;
          return;
        }
        //链上提币
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
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
            if (authPhone && authEmail && authGoogleAuth) {
              this.verifyShow = true;
              this.withdrawChainParams = Object.assign(
                this.withdrawChainParams,
                {
                  authToken: authToken,
                }
              );
            }
          } else {
            return false;
          }
        });
      } else if (type === 2) {
        if (this.userWithdrawStatus === "FORBIDDEN") {
          this.tipShow = true;
          return;
        }
        //内部转账
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            //获取认证参数(内部转账)
            const params = {
              type: this.internalRuleForm.internalAccountVal, //账户类型 1:现货账户  2:资金账户
              ownType: this.internalRuleForm.ownType, //提币类型 4-uid；2-手机；3-邮箱；
              coinId: this.internalCoinId,
              coinName: this.internalcoinName,
              amount: this.internalRuleForm.withdrawalAmountVal,
              toAddress:
                this.accountTabIndex === 2
                  ? `${this.internalRuleForm.phoneArea} ${this.internalRuleForm.selectVal}`
                  : this.internalRuleForm.selectVal, //提币地址或账户  钱包地址、uid、手机号、邮箱号
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
            this.phoneStatus = phoneStatus;
            this.emailStatus = emailStatus;
            this.googleAuthStatus = googleAuthStatus;
            this.tradePasswordStatus = tradePasswordStatus;
            this.authToken = authToken;
            if (authPhone && authEmail && authGoogleAuth) {
              this.verifyShow = true;
              this.withdrawParams = Object.assign(this.withdrawParams, {
                authToken: authToken,
              });
            }
          }
        });
      }
    },
    onDress(e) {
      if (e === 1) {
        this.dressIndex = 2;
        this.withdrawCoinsType = e;
      } else if (e === 2) {
        this.dressIndex = 2;
        this.withdrawCoinsType = e;
      }
    },
    //选择的币种id
    getCoinId(id) {
      this.coinId = id;
    },
    getinternalCoinId(id) {
      this.internalCoinId = id;
    },
    getIconUrl(icon) {
      this.iconUrl = icon;
    },
    getinternalCoinUrl(icon) {
      this.internalIconUrl = icon;
    },
    //链名称（网络）选择
    networkChange(val) {
      this.ruleForm.networkVal = val.chainName;
      this.ruleForm.chainName = val.chainName;
    },
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
    networkisShow() {
      //网络关闭
      this.networkShow = false;
    },
    // 地址选择框
    async withdrawalAddressDialog() {
      //查询提币地址 type 1:查链上地址
      let res = await addressQueryApi({ type: 1 });
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
    //查询提币地址(内部转账type 2  && 返回type 2手机、3邮箱、4uid)
    getAddressList(type) {
      addressQueryApi({
        type: type,
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
    toAddress() {
      this.dressIndex = 2;
      this.withdrawCoinsType = 1;
      this.chainAddressShow = false;
    },

    addressChange(val) {
      this.symbolVal = val.chainName;
    },
    chainAddressChange(val) {
      this.ruleForm.dressVal = val.address;
    },
    //验证通过 提币成功弹窗弹出
    verifyNext(data) {
      const newData = {
        tradePwd: this.$getEncryptCode(data.password), //资金密码
        phoneCode: data.phoneCode,
        emailCode: data.emailCode,
        authCode: data.authCode,
      };
      if (this.tabIndex === 1) {
        const params = Object.assign(this.withdrawChainParams, newData);
        this.getUserWithdrawApi(params);
        //提币申请链上
      } else if (this.tabIndex === 2) {
        //内部
        const params = Object.assign(this.withdrawParams, newData);
        this.getUserWithdrawApi(params);
      }
    },
    sureSuccess() {
      //提币成功确定
      this.successShow = false;
      //清空选项
      if (this.tabIndex === 2) {
        this.internalFee = "";
        this.internalNum = "";
        this.$refs.internalRef.resetFields();
        this.$refs.verifyRef.initParams();
      } else if (this.tabIndex === 1) {
        this.arrivalAmount = "";
        this.fee = "";
        this.$refs.ruleForm.resetFields();
        this.$refs.verifyRef.initParams();
      }
    },
    goBack() {
      this.dressIndex = 1;
      this.getAddressList(2);
    },
    //内部提币地址返回
    goInternaBack() {
      this.dressIndex = 1;
    },
    addressManagement() {
      this.dressIndex = 2;
    },

    newAddress(val) {
      return val.split(" ")[1];
    },
    handleChoose(item) {
      if (this.accountTabIndex === 2) {
        this.internalRuleForm.selectVal = this.newAddress(item.address);
      } else {
        this.internalRuleForm.selectVal = item.address;
      }

      this.popperShow = false;
    },
    handleAll(index) {
      if (index === 1) {
        this.ruleForm.coinSumVal = this.amount;
        this.handleAmount(this.ruleForm.coinSumVal);
        //链上提币
      } else if (index === 2) {
        //内部转账
        this.internalRuleForm.withdrawalAmountVal = this.amount;
        this.handleAmount(this.internalRuleForm.withdrawalAmountVal);
      }
    },
    //翻页功能
    currentChange(val) {
      this.pagingParams.pageNum = val.page;
      //提币记录
      this.getWithdrawCoinsRecord();
    },
    //选择币种筛选
    coinChange(val) {
      this.pagingParams.coinId = val;
      this.getWithdrawCoinsRecord();
    },
    //最近7天，30天筛选
    onRecentDate(val) {
      let t = new Date().getTime();
      if (val === 2) {
        //最近30天
        this.pagingParams.startTime = t - 30 * 24 * 3600 * 1000;
        this.pagingParams.endTime = t;
        this.getWithdrawCoinsRecord();
      } else {
        //最近7天
        this.pagingParams.startTime =
          new Date().getTime() - 7 * 24 * 3600 * 1000;
        this.pagingParams.endTime = new Date().getTime();
        this.getWithdrawCoinsRecord();
      }
    },
    //日期
    onChangeDate(data) {
      if (data && data.length > 0) {
        this.pagingParams.startTime = data[0].getTime();
        this.pagingParams.endTime = data[1].getTime();
      } else {
        this.pagingParams.startTime = "";
        this.pagingParams.endTime = "";
      }
      this.getWithdrawCoinsRecord();
    },
    //点击全部记录
    onAllRecord() {
      recordQueryApi(this.pagingParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.total = res.data.data.total;
            this.recordList = res.data.data.records;
            for (var i = 0; i < this.recordList.length; i++) {
              this.$set(this.recordList[i], "operateType", "withdraw");
            }
          }
        }
      });
    },
    handleDressCheck() {
      this.validAddress();
    },
    // 提币校验地址
    validAddress() {
      const params = {
        chainName: this.ruleForm.networkVal, //链名称
        address: this.ruleForm.dressVal, //地址
      };
      isValidAddressApi(params).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.checkPlatFormAddress = res.data.data.checkPlatFormAddress;
            this.uid = res.data.data.uid;
          }
        }
      });
    },
    handleMore() {
      //更多
      this.$router.push("/helpCenterPage");
    },
    //到账数量 手续费
    handleAmount(val) {
      if (this.tabIndex === 1) {
        //链上
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
      } else {
        //内部
        if (!val) {
          this.internalFee = "";
          this.internalNum = "";
        } else {
          this.$refs.internalRef.validate(async (valid) => {
            if (valid) {
              const params = {
                isOwn: 1, //内部提币
                amount: this.internalRuleForm.withdrawalAmountVal,
                coinId: this.internalCoinId,
                coinName: this.internalcoinName,
              };
              arrivalAccountApi(params).then((res) => {
                if (res.status && res.status === 200) {
                  if (res.data && res.data.success) {
                    this.internalNum = res.data?.data?.amount;
                    this.internalFee = res.data?.data?.fee;
                  }
                }
              });
            }
          });
        }
      }
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
      // 正则替换
      str = str.replace(/[^\d^.]+/g, ""); // 保留数字和小数点
      if (num || num === 0) {
        var rest = str.split(".")[1];
        if (rest && rest.length > num) {
          rest = rest.substr(0, num);
          str = str.split(".")[0] + "." + rest;
        }
      }
      this.handleAmount(str);
      return str;
    },
    //点击关闭币种选择
    close() {
      if (this.tabIndex === 1) {
        this.$refs.selectRef.showFn();
      } else {
        if (this.$refs.selectInternalRef) {
          this.$refs.selectInternalRef.showFn();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.withdrawCoins {
  margin: 20px 80px 0 0;
  padding-bottom: 30px;
  background: #ffffff;
  color: #333333;
  .left {
    .container {
      margin: 20px 0 0 118px;
    }
    .tab-btn {
      width: 160px;
      height: 40px;
      line-height: 40px;
      font-size: 24px;
      border-radius: 6px;
      text-align: center;
      margin-right: 20px;
      font-weight: 500;
      color: #8992a6;
      cursor: pointer;
    }
    .btnActive {
      background: #edf1ff;
      color: #333333;
    }
    .withdrawCoins-form {
      margin-top: 30px;
      .form-phone > div {
        height: 60px;
        background: #ffffff;
        box-shadow: 0px 2px 6px 0px rgba(206, 215, 255, 0.6);
        border-radius: 12px;
        border: 1px solid #e1e1e1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        ::v-deep  .el-select > .el-input {
          width: 100px;
        }
        ::v-deep  .el-input-group__prepend {
          background-color: #ffffff;
          border: none;
        }
        ::v-deep  .el-input-group > .el-input__inner {
          border: none;
          padding: 0;
        }
        ::v-deep   .el-input-group__append,
        .el-input-group__append {
          background-color: #ffffff;
          border: none;
          cursor: pointer;
        }
      }
      .chainame {
        ::v-deep  .el-input__inner {
          width: 500px;
          height: 60px;
          line-height: 600px;
          box-shadow: 0px 2px 6px 0px rgba(206, 215, 255, 0.6);
          border-radius: 12px;
        }
        ::v-deep  .el-form-item__label {
          padding-bottom: 30px;
          padding-top: 10px;
        }
        .amount {
          position: relative;
          .all {
            position: absolute;
            right: 20px;
            top: 11px;
            color: #5271ff;
            font-size: 14px;
            cursor: pointer;
          }
        }

        .select {
          width: 500px;
          height: 60px;
          line-height: 60px;
          background: #ffffff;
          box-shadow: 0px 2px 6px 0px rgba(206, 215, 255, 0.6);
          border-radius: 12px;
          border: 1px solid #e1e1e1;
          position: relative;
          .select-append {
            position: absolute;
            right: 0;
            top: 0;
            width: 10%;
            height: 100%;
            .select-value {
              display: flex;
              justify-content: space-between;
              padding: 0 20px;
              .custom-icon {
                line-height: 60px;
                cursor: pointer;
              }
            }
            .popper-content {
            }
          }
          div {
            width: 110px;
          }
        }
      }
      .coinname {
        margin-bottom: 70px;
      }
      .account {
        display: flex;
        justify-content: space-between;
        .account-item {
          width: 145px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          background: #ffffff;
          box-shadow: 0px 2px 6px 0px rgba(206, 215, 255, 0.6);
          border-radius: 12px;
          border: 1px solid #e1e1e1;
          cursor: pointer;
        }
        .textActive {
          color: #5271ff;
        }
      }
      .dress-title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .coin-dress {
        font-size: 14px;
        margin-bottom: 20px;
        color: #5271ff;
        width: 500px;
        display: flex;
        justify-content: space-between;
        a {
          text-decoration: none;
          color: #5271ff;
        }
      }
      .coin-address {
        position: relative;
        .address-icon {
          position: absolute;
          right: 13px;
          top: 18px;
          font-size: 14px;
          cursor: pointer;
          img {
            width: 24px;
            height: 24px;
            display: inline-block;
          }
        }
      }
      ::v-deep  .el-form-item__label {
        padding: 0;
        line-height: 0;
        font-size: 16px;
        color: #333;
        padding-bottom: 20px;
        font-weight: 500;
      }
      ::v-deep  .el-form-item__content {
        // line-height: 0;
      }
      ::v-deep  .el-button {
        width: 500px;
        height: 60px;
        background: #90ff00;
        border-radius: 12px;
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
    }

    .withdrawCoins-title {
      padding: 30px 0 0 74px;
      .el-icon-arrow-left {
        cursor: pointer;
        padding-right: 20px;
        font-size: 24px;
      }
      span {
        cursor: pointer;
        font-size: 30px;
      }
    }
  }
  .right {
    margin-top: 232px;
    margin-left: 200px;

    .img {
      width: 435px;
      height: 140px;
      background: rgba(133, 154, 255, 0.6);
      border-radius: 6px;
      position: relative;
      div {
        padding: 35px 0 0 50px;
        p {
          font-size: 26px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
      }
      img {
        position: absolute;
        right: -73px;
        bottom: 0;
        width: 155px;
        height: 170px;
      }
    }
    .notice {
      width: 625px;
      height: 200px;
      background: #edf1ff;
      border-radius: 12px;
      margin-top: 42px;
      padding: 29px 0 0 20px;
      color: #333;
      line-height: 22px;
      p {
        font-size: 14px;
        span {
          color: #f75f52;
        }
      }
    }
    .question {
      margin-top: 40px;
      width: 168px;
      height: 151px;
      font-size: 14px;
      color: #333;
    }
  }
}
::v-deep  .el-input__suffix {
  right: 12px;
}
::v-deep   .el-dialog {
  border-radius: 10px;
}
.tip-row {
  width: 100%;
  height: 180px;
  padding: 0 20px;
  font-size: 14px;
  .tip-btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #90ff00;
    border-radius: 6px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    margin-top: 40px;
  }
}
.phone-select {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 1px;
    height: 40%;
    top: 34%;
    right: 8px;
    background-color: #333333;
    z-index: 999;
    opacity: 0.4;
  }
}
.valid-address {
  background: #edf1ff;
  box-shadow: 0px 2px 6px 0px rgba(206, 215, 255, 0.6);
  border-radius: 12px;
  height: 60px;
  line-height: 25px;
  font-size: 16px;
  color: #333;
  padding-left: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .text {
    color: #5271ff;
    display: block;
  }
}
.coin-select {
  width: 500px;
  height: 60px;
  background: #ffffff;
  box-shadow: 0px 2px 6px 0px rgba(206, 215, 255, 0.6);
  border-radius: 12px;
  border: 1px solid #e1e1e1;
  position: relative;
}
</style>
