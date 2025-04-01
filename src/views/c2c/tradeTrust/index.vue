<!-- C2C发布委托单 -->
<!-- <span class="status-btn success-status" v-if="status === 1">接单中</span> -->
<template>
  <div class="page">
    <div class="trade-order" v-if="!isLoading">
      <div class="main">
        <div v-if="curComp === 'List'">
          <div class="topNav between">
            <div class="lf-con">{{ $t(t + "委托单") }}</div>
            <div class="rf-con flexs">
              <div class="icon-btn" @click="merchantCheck('Publish')">
                <i class="el-icon-plus mr10"></i> {{ $t(t + "发布委托单") }}
              </div>
              <div
                class="icon-btn"
                @click="surrenderPolicy"
                v-if="userLevel && userLevel == 1"
              >
                {{ $t(t + "申请退保") }}
              </div>
              <div class="icon-btn" @click="banApply" v-if="status === 4">
                {{ $t(t + "申请解禁") }}
              </div>
            </div>
          </div>
          <div class="progress-table">
            <table-page
              @current-change="changeNum"
              :pageSize="formInline.pageSize"
              :total="total"
            >
              <template #filter>
                <el-form :inline="true" :model="formInline">
                  <el-form-item>
                    <el-select
                      v-model="formInline.coinId"
                      :placeholder="$t(t + '所有币种')"
                      class="width116"
                      @visible-change="popperCss1 = !popperCss1"
                    >
                      <el-option
                        v-for="(item, i) in dealList"
                        :key="item.id"
                        :label="i == 0 ? $t(t + item.coinName) : item.coinName"
                        :value="item.coinId"
                      />
                      <i
                        slot="prefix"
                        :class="[
                          'custom-icon',
                          popperCss1
                            ? 'el-icon-caret-top'
                            : 'el-icon-caret-bottom',
                        ]"
                      ></i>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-select
                      v-model="formInline.type"
                      :placeholder="$t(t + '所有类型')"
                      class="width116"
                      @visible-change="popperCss2 = !popperCss2"
                    >
                      <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="$t(t + item.label)"
                        :value="item.value"
                      />
                      <i
                        slot="prefix"
                        :class="[
                          'custom-icon',
                          popperCss2
                            ? 'el-icon-caret-top'
                            : 'el-icon-caret-bottom',
                        ]"
                      ></i>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-select
                      v-model="formInline.status"
                      :placeholder="$t(t + '所有状态')"
                      class="width116"
                      @visible-change="popperCss3 = !popperCss3"
                    >
                      <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="$t(t + item.label)"
                        :value="item.value"
                      />
                      <i
                        slot="prefix"
                        :class="[
                          'custom-icon',
                          popperCss3
                            ? 'el-icon-caret-top'
                            : 'el-icon-caret-bottom',
                        ]"
                      ></i>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-date-picker
                      v-model="formInline.date"
                      type="daterange"
                      range-separator="-"
                      :start-placeholder="$t(t + '开始日期')"
                      :end-placeholder="$t(t + '结束日期')"
                      @change="changeDate"
                      align="right"
                      class="width287"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item class="placeh-center">
                    <el-input
                      :placeholder="$t(t + '搜索订单编号')"
                      v-model="formInline.number"
                      class="width287"
                    >
                      <el-image
                        slot="prefix"
                        :src="require('@/assets/buy-coins/searchTrode.png')"
                      />
                    </el-input>
                  </el-form-item>
                  <el-form-item class="ml300 from-btn">
                    <el-button
                      type="primary"
                      size="small"
                      @click="advertisingList"
                      >{{ $t(t + "筛选") }}
                    </el-button>
                    <el-button size="small" class="ml20" @click="handleFilter">
                      {{ $t(t + "重置") }}</el-button
                    >
                  </el-form-item>
                </el-form>
              </template>
              <template #table>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  @cell-dblclick="celldblclick"
                  v-loading="loading"
                >
                  <el-table-column
                    prop="number"
                    :label="$t(t + '委托单号')"
                    min-width="150"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <span class="">{{ scope.row.number }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    :label="$t(t + '委托单类型')"
                    min-width="70"
                  >
                    <template slot-scope="scope">
                      <div class="flex-box">
                        <div class="color-green" v-if="scope.row.type === 1">
                          {{ $t(t + "买入") }}
                        </div>
                        <div class="color-orange" v-if="scope.row.type === 0">
                          {{ $t(t + "卖出") }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="coinName"
                    :label="$t(t + '币种')"
                    min-width="70"
                  />
                  <el-table-column
                    prop="count"
                    :label="$t(t + '数量')"
                    min-width="70"
                  >
                    <template slot-scope="scope">
                      <div class="flex-box">
                        <div>
                          {{ scope.row.beleftQuantity }}{{ scope.row.coinName }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="unitPrice"
                    :label="$t(t + '单价')"
                    min-width="80"
                  >
                    <template slot-scope="scope">
                      <div class="flex-box">
                        <span
                          >{{ scope.row.unitPrice }}
                          {{ scope.row.legalTenderName }}</span
                        >
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="incomeId"
                    :label="$t(t + '支付方式')"
                    min-width="90"
                  >
                    <template slot-scope="scope">
                      <div class="flex-box">
                        <div class="normal-content payment">
                          <template v-if="scope.row.incomeId?.indexOf('1') > -1"
                            ><img src="@/assets/buy-coins/yinhangka.png" alt=""
                          /></template>
                          <template v-if="scope.row.incomeId?.indexOf('2') > -1"
                            ><img src="@/assets/buy-coins/zhifubao.png" alt=""
                          /></template>
                          <template
                            v-if="scope.row.incomeId?.indexOf('3') > -1"
                          >
                            <img src="@/assets/buy-coins/weixin.png" alt=""
                          /></template>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    :label="$t(t + '备注')"
                    min-width="70"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.remark }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    :label="$t(t + '发布时间')"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <div class="flex-box">
                        <span>{{ parseTime(scope.row.createTime) }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t(t + '审核状态')">
                    <template slot-scope="scope">
                        <div v-if="scope.row.approvalStatus == 0">{{$t(t + '未审核')}}</div>
                        <div v-if="scope.row.approvalStatus == 1">{{$t(t + '审核通过')}}</div>
                        <div v-if="scope.row.approvalStatus == 2">{{$t(t + '审核不通过')}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    :label="$t(t + '上下架状态')"
                    min-width="60"
                  >
                    <template slot-scope="scope">
                      <span
                        :style="{
                          color:
                            scope.row.status === 0
                              ? '#F75F52'
                              : scope.row.status === 1
                              ? '#2EBD85 '
                              : '',
                        }"
                      >
                        {{
                          scope.row.status === 0
                            ? $t(t + "已下架")
                            : scope.row.status === 1
                            ? $t(t + "已上架")
                            : ""
                        }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t(t + '操作')"
                    min-width="130"
                    align="center"
                    fixed="right"
                  >
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleOper(scope.row, 'status')"
                        type="text"
                        :style="{
                          color:
                            scope.row.status === 1
                              ? '#F75F52'
                              : scope.row.status === 0
                              ? '#2EBD85 '
                              : '',
                        }"
                      >
                        {{
                          scope.row.status === 0
                            ? $t(t + "上架")
                            : $t(t + "下架")
                        }}</el-button
                      >

                      <el-button
                        size="mini"
                        v-if="scope.row.status === 0"
                        class="color-orange"
                        @click="handleOper(scope.row, 'del')"
                        type="text"
                        >{{ $t(t + "删除") }}
                      </el-button>

                      <el-button
                        size="mini"
                        v-if="scope.row.status === 0"
                        class="color-blue"
                        @click="handleOper(scope.row, 'edit')"
                        type="text"
                      >
                        {{ $t(t + "编辑") }}</el-button
                      >

                      <el-button
                        size="mini"
                        @click="handleOper(scope.row, 'details')"
                        type="text"
                      >
                        {{ $t(t + "详情") }}
                      </el-button>
                    </template>
                  </el-table-column>
                  <template #empty>
                    <!-- <div class="empty-tabaleContent">
                      <img src="@/assets/images/null-page.png" alt="" />
                      <p>{{ $t(t + "暂无委托数据") }}</p>
                    </div> -->
                    <my-empty></my-empty>
                  </template>
                </el-table>
              </template>
            </table-page>
          </div>
        </div>

        <common-modal
          :title="$t(t + '广告详情')"
          :show-close="true"
          class="deleteDiaog"
          :show="isShowDetails"
          width="600px"
          @cancel="isShowDetails = false"
          :noFooter="true"
        >
          <template v-slot:dia_content>
            <ul class="detail-info">
              <li>
                <div class="title">{{ $t(t + "广告类型") }}</div>
                <div class="type">
                  {{ echoParam.type === 1 ? $t(t + "购买") : $t(t + "出售") }}
                </div>
              </li>
              <li>
                <div class="title">{{ $t(t + "价格单价") }}</div>
                <div class="type">{{ echoParam.unitPrice }}</div>
              </li>
              <li>
                <div class="title">{{ $t(t + "币种") }}</div>
                <div class="type">{{ echoParam.coinName }}</div>
              </li>
              <li>
                <div class="title">{{ $t(t + "数量") }}</div>
                <div class="type">
                  {{ echoParam.quantity }} {{ echoParam.coinName }}
                </div>
              </li>
              <li>
                <div class="title">{{ $t(t + "最小金额") }}</div>
                <div class="type">
                  {{ echoParam.minMoney }} {{ echoParam.legalTenderName }}
                </div>
              </li>
              <li>
                <div class="title">{{ $t(t + "最大金额") }}</div>
                <div class="type">
                  {{ echoParam.maxMoney }} {{ echoParam.legalTenderName }}
                </div>
              </li>
              <li>
                <div class="title">{{ $t(t + "收款方式") }}</div>
                <div class="type">
                  {{
                    echoParam.incomeId.indexOf("1") > -1 ? $t(t + "银行卡") : ""
                  }}
                  {{
                    echoParam.incomeId.indexOf("2") > -1 ? $t(t + "支付宝") : ""
                  }}
                  {{
                    echoParam.incomeId.indexOf("3") > -1 ? $t(t + "微信") : ""
                  }}
                </div>
              </li>
              <li>
                <div class="title">{{ $t(t + "交易期限") }}</div>
                <div class="type">
                  {{ echoParam.tradingTime }} {{ $t(t + "分钟") }}
                </div>
              </li>
              <li>
                <div class="title">{{ $t(t + "自动接单") }}</div>
                <div class="type">
                  {{ echoParam.autoAccept === 0 ? $t(t + "否") : $t(t + "是") }}
                </div>
              </li>
              <li>
                <div class="title">{{ $t(t + "备注") }}</div>
                <div class="type">{{ echoParam.remark }}</div>
              </li>
              <li>
               <div class="title">{{ $t(t + "审核状态") }}</div>
               <div class="type" v-show="echoParam.approvalStatus ==0">{{ $t(t + "未审核") }}</div>
               <div class="type" v-show="echoParam.approvalStatus ==1">{{ $t(t + "审核通过") }}</div>
               <div class="type" v-show="echoParam.approvalStatus ==2">{{ $t(t + "审核不通过") + echoParam.approvalRemark }}</div>
              </li>
              <li v-if="echoParam.status === 0">
                <div class="title">{{ $t(t + "下架时间") }}</div>
                <div class="type" v-if="echoParam.updateTimeTsLong">
                  {{ $formatTime(echoParam.updateTimeTsLong) }}
                </div>
              </li>
              <li v-if="echoParam.status === 1">
                <div class="title">{{ $t(t + "上架时间") }}</div>
                <div class="type" v-if="echoParam.updateTimeTsLong">
                  {{ $formatTime(echoParam.updateTimeTsLong) }}
                </div>
              </li>
            </ul>
          </template>
        </common-modal>

        <!-- 申请成为商家 Saler -->
        <div v-if="curComp === 'Saler'">
          <to-saler
            @publish="merchantCheck('Publish')"
            :merchantInfo="merchantInfo"
          ></to-saler>
        </div>

        <!-- 发布委托单 -->
        <div v-show="curComp == 'Publish'" class="publish-container">
          <publish-ad
            v-if="curComp == 'Publish'"
            @list="getList"
            ref="publishEdit"
          ></publish-ad>
        </div>

        <!-- 申请退保 -->
        <surrender-policy
          :is-show.sync="applyShow"
          ref="surrenderPolicy"
          v-if="applyShow"
          @next="merchantCheck()"
        ></surrender-policy>

        <!-- 验证 -->
        <validate-info
          :is-show.sync="validateShow"
          :params="validateParam"
          :isVerify="isVerify"
          @next="handleNext"
        ></validate-info>

        <!-- 申请解禁 -->
        <remove-forbid :is-show.sync="banShow" v-if="banShow"></remove-forbid>
      </div>
    </div>
    <!-- 普通用户和商家入口 -->
    <div v-if="curComp === 'User'">
      <AdvUser
        :userStatus="certificationStatus"
        @pubilsh="pubilsh"
        @saler="saler"
      />
    </div>
    <!-- 认证提示 -->
    <OtcAuthDialog :title="''" :visible.sync="isAuthShow" @close="onClose" />
    <!-- 禁止个人发布提示 -->
    <HintDialog :title="''" :visible="hintShow" @close="hintClose" />
  </div>
</template>

<script>
import TablePage from "@/components/tablePage/index.vue";
import ToSaler from "./components/toSaler.vue";
import PublishAd from "./components/publishAd.vue";
import SurrenderPolicy from "./components/surrenderPolicy.vue";
import RemoveForbid from "./components/removeForbid.vue";
import ValidateInfo from "./components/validateInfo.vue";
import AdvUser from "./components/user.vue";
import OtcAuthDialog from "../../../components/otcAuthDialog/index.vue";
import HintDialog from "@/components/hintDialog/index.vue";
import {
  advertisingMerchantList,
  merchantCheck,
  advertisingMerchantUpdate,
  advertisingMerchantDel,
  getMerchantInfoById,
  checkAdvertising,
  criteriaAuthApply,
} from "@/api/otc.js";
import { simpleApi } from "@/api/assetWallet.js";
import { authItemStong } from "@/api/common";
export default {
  name: "TradeOrder",
  components: {
    TablePage,
    ToSaler,
    PublishAd,
    SurrenderPolicy,
    RemoveForbid,
    ValidateInfo,
    AdvUser,
    OtcAuthDialog,
    HintDialog,
  },
  data() {
    return {
      popperCss1: false,
      popperCss2: false,
      popperCss3: false,
      isShowDetails: false,
      surrpolicyShow: false,
      isLoading: true,
      loading: true,
      banShow: false,
      cancelModalShow: false,
      validateShow: false,
      hintShow: false,
      validateParam: {},
      echoParam: {},
      authStatus: undefined,
      // 默认为未申请成为商家
      userLevel: null,
      status: 0,
      curComp: "List",
      applyShow: false,
      dealList: [],
      typeList: [
        { label: "所有类型", value: undefined },
        { label: "购买", value: 1 },
        { label: "出售", value: 0 },
      ],
      statusList: [
        { label: "所有状态", value: undefined },
        { label: "上架", value: 1 },
        { label: "下架", value: 0 },
      ],
      formInline: {
        type: undefined,
        status: undefined,
        number: undefined,
        coinId: undefined,
        date: undefined,
        startDate: undefined,
        endDate: undefined,
        pageNum: 1,
        pageSize: 10,
      },
      total: null,
      tableData: [],
      // 商户信息
      merchantInfo: {},
      // 国际缩写
      t: "c2c.",
      isVerify: false,
      //认证状态
      certificationStatus: {},
      isAuthShow: false,
      auditStatus: null,
    };
  },
  async mounted() {
    //查询认证状态
    await this.getCriteriaAuthApply();
    this.advertisingList();
    // 检查商户信息
    this.getMerchantInfoById();
    this.coinSimple();
  },
  methods: {
    onClose() {
      this.isAuthShow = false;
    },
    pubilsh() {
      this.curComp = "Publish";
    },
    saler() {
      this.$router.push({
        path: "/layout/c2c/tradeTrust",
        query: { curComp: "Saler" },
      });
      // this.curComp = "Saler";
    },
    // 查询认证状态
    async getCriteriaAuthApply() {
      await criteriaAuthApply().then((res) => {
        if (res && res.data) {
          this.certificationStatus = res.data;
          //存入vuex
          this.$store.dispatch(
            "handleSetOtcStatusObj",
            this.certificationStatus
          );
        }
      });
    },
    // 根据用户ID 查询 商户信息
    getMerchantInfoById() {
      getMerchantInfoById().then((res) => {
        this.userLevel = res.data.userLevel;
        this.merchantInfo = res.data;
        this.auditStatus = res.data.auditStatus;
      });
    },
    hintClose() {
      this.hintShow = false;
    },
    // 是否申请商家
    merchantCheck(type = undefined) {
      // 禁止个人发布提示
      if (this.userLevel == 0 && this.auditStatus == 4) {
        this.hintShow = true;
        this.isLoading = false;
        return;
      }
      merchantCheck().then((res) => {
        // 查询商户信息
        this.status = res.data;
        if (
          (this.userLevel == 1 && this.status === 2) ||
          this.status === 3 ||
          this.status === 4 ||
          this.status === 5 ||
          this.status === 6 ||
          this.status === 7
        ) {
          this.curComp = "Saler";
          this.isLoading = false;
          return;
        }
        if (type) {
          // 规避商家未认证就能发布广告
          if (this.certificationStatus.canPersonalAuthStatus) {
            this.curComp = type;
          } else {
            this.isAuthShow = true;
          }
          return;
        }
        //梳理退保成功后的逻辑
        if (this.$route.query.curComp == "cancel" && this.status != 7) {
          if (this.userLevel == 0) {
            this.applyShow = false;
          } else {
            this.surrenderPolicy();
          }

          return;
        }
        if (this.$route.query.curComp == "Saler") {
          this.curComp = "Saler";
          this.isLoading = false;
          return;
        }
        if (this.$route.query.curComp == "Publish") {
          // 发布广告条件判断 （1、普通用户完成所有认证或者 2、已经成为商家）
          if (
            this.certificationStatus.canPersonalAuthStatus &&
            this.certificationStatus.canEmail &&
            this.certificationStatus.tradePwd &&
            this.certificationStatus.canPhone &&
            this.certificationStatus.canGoogleAuth
          ) {
            this.curComp = "Publish";
            this.isLoading = false;
            return;
          } else {
            this.curComp = "User";
            this.isLoading = false;
            return;
          }
        }
        if (this.$route.query.curComp == "User") {
          this.curComp = "User";
          this.isLoading = false;
          return;
        }

        if (
          this.certificationStatus &&
          this.certificationStatus.canPersonalAuthStatus
        ) {
          this.$nextTick(() => {
            if (
              this.certificationStatus.canPersonalAuthStatus &&
              this.certificationStatus.canEmail &&
              this.certificationStatus.tradePwd &&
              this.certificationStatus.canPhone &&
              this.certificationStatus.canGoogleAuth
            ) {
              this.curComp = "List";
              this.isLoading = false;
            } else {
              this.curComp = "User";
              this.isLoading = false;
            }
          });
        } else {
          this.curComp = "User";
          this.isLoading = false;
        }
        if (this.certificationStatus.canMerchantAuthStatus) {
          if (
            this.certificationStatus.canEmail &&
            this.certificationStatus.tradePwd &&
            this.certificationStatus.canPhone &&
            this.certificationStatus.canGoogleAuth
          ) {
            this.curComp = "List";
            this.isLoading = false;
          } else {
            this.curComp = "User";
            this.isLoading = false;
          }
        }
        // console.log(this.curComp);
        // this.curComp = 'List'
        // this.curComp =
        //   this.status != 1 && this.status != 8
        //     ? "Saler"
        //     : this.$route.query.curComp || "List";
        this.isLoading = false;
      });
    },

    changeNum(val) {
      this.formInline.pageNum = val.page;
      this.advertisingList();
    },
    // 日期选择
    changeDate(data) {
      this.formInline.startDate =
        data?.length > 0 ? data[0].getTime() : undefined;
      this.formInline.endDate =
        data?.length > 0 ? data[1].getTime() : undefined;
    },
    // 获取法币列表
    coinSimple() {
      simpleApi({ isType: 1 }).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.dealList = res.data.data || [];
            this.dealList.unshift({
              id: undefined,
              coinName: "所有币种",
            });
          }
        }
      });
    },
    advertisingList() {
      this.loading = true;

      advertisingMerchantList(this.formInline).then((res) => {
        this.tableData = res.data.records;
        this.loading = false;
        this.total = res.data.total;
        this.merchantCheck();
      });
    },
    // 重置
    handleFilter() {
      this.formInline = {
        pageNum: 1,
        pageSize: 10,
      };
      this.advertisingList();
    },
    // 操作栏 上下架  删除
    async handleOper(row, type) {
      this.echoParam = {
        id: row.id,
        coinId: row.coinId,
        type: row.type,
        unitPrice: row.unitPrice,
        quantity: row.quantity,
        beleftQuantity: row.beleftQuantity,
        minMoney: row.minMoney,
        maxMoney: row.maxMoney,
        incomeId: row.incomeId,
        accountId: row.accountId,
        tradingTime: row.tradingTime,
        autoAccept: row.autoAccept,
        remark: row.remark,
        status: row.status == 0 ? 1 : 0,
        isRealTimePrice: row.isRealTimePrice,
        coinName: row.coinName,
        legalTenderId: row.legalTenderId,
        legalTenderName: row.legalTenderName,
        remark: row.remark,
        updateTimeTsLong: row.updateTimeTsLong,
        approvalStatus:row.approvalStatus,
      };

      // console.log("this. this.echoParam", this.echoParam);
      if (type == "status") {
        if (row.status == 0) {
          let res = await merchantCheck();
          if (res.data == 4 || res.data == 5 || res.data == 6) {
            //4:已禁止 5.解禁失败 6.解禁申请
            this.curComp = "Saler";
            return;
          }
          //点击上架 需求只做一次资金密码和谷歌验证校验
          this.$modal
            .confirm(
              this.$t(this.t + "dialog_confirm_shelves", [
                row.status == 0
                  ? this.$t(this.t + "上")
                  : this.$t(this.t + "下"),
              ]) + "?"
            )
            .then((_) => {
              checkAdvertising(this.echoParam).then((res) => {
                this.getAuthItem(37);
              });
            });
        } else {
          //点击下架
          //下架不需要验证，直接调验证接口
          advertisingMerchantUpdate(this.echoParam).then(() => {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.advertisingList();
          });
        }
      } else if (type == "del") {
        this.$modal
          .confirm(this.$t(this.t + "dialog_confirm", [row.number]) + "?")
          .then((_) => {
            this.getAuthItem(38);
          });
      } else if (type == "details") {
        this.isShowDetails = true;
      } else {
        this.curComp = "Publish";
        this.$nextTick((_) => {
          this.$refs.publishEdit.getEchoForm(row);
        });
      }
    },
    // 获取认证选项
    getAuthItem(data) {
      this.authStatus = data;
      authItemStong({ data }).then((auth) => {
        // 验证参数
        this.validateParam = {
          email: auth.data.email,
          phone: auth.data.phone,
          authToken: auth.data.authToken,
          bizType: data,
          tradePasswordStatus: auth.data.tradePasswordStatus,
          authGoogleAuth: auth.data.authGoogleAuth,
        };
        this.validateShow = true;
      });
    },
    // 验证完成
    handleNext(item) {
      if (this.authStatus == 37) {
        advertisingMerchantUpdate({
          ...this.echoParam,
          successToken: item.successToken,
        }).then((res) => {
          this.$message({
            message:
              this.$t(this.t + "msgSuccess_shelves_Successfully", [
                this.echoParam.status == 0
                  ? this.$t(this.t + "下")
                  : this.$t(this.t + "上"),
              ]) + "！",
            type: "success",
          });

          this.advertisingList();
        });
      } else {
        advertisingMerchantDel({
          id: this.echoParam.id,
          successToken: item.successToken,
        }).then((res) => {
          this.$message({
            message: this.$t(this.t + "删除成功") + `！`,
            type: "success",
          });
          this.advertisingList();
        });
      }
    },
    // 发布成功返回列表
    getList() {
      this.curComp = null;
      this.$nextTick(() => {
        this.curComp = "List";
      });
      this.advertisingList();
      this.$scrollToTop();
    },
    // 申请退保
    surrenderPolicy() {
      this.curComp = "List";
      this.isLoading = false;
      const hasStatus = this.tableData.every((item) => item.status == 0);
      hasStatus
        ? (this.applyShow = true)
        : this.$message({
            message: this.$t(this.t + "您有广告未下架，请先下架广告"),
            type: "warning",
          });
    },
    // 申请解禁
    banApply() {
      this.banShow = true;
    },
    // 双击复制
    celldblclick(row, column, cell, event) {
      let oInput = document.createElement("input");
      oInput.value = row[column.property];
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      this.$message.success(this.$t(this.t + "复制成功") + "！");
      oInput.remove();
    },
  },
};
</script>
<style lang="scss">
.payment {
  img {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
}
.progress-table {
  .el-form-item__content {
    .el-input__inner {
      font-size: 16px;
      border: 1px solid transparent !important;
      background: #f5f7fa;
      border-radius: 0.25rem;
    }

    .el-range-input {
      background: #f5f7fa;
    }
  }
}
</style>
<style lang="scss" scoped>
.trade-order {
  background-color: white;
  .main {
    padding: 0 210px;
    margin: auto;
    .topNav {
      width: 100%;
      border-bottom: 1px solid #f4f5f7;
      color: #333333;
      height: 60px;
      line-height: 60px;

      .lf-con {
        font-weight: 600;
        font-size: 18px;
      }

      .rf-con {
        .icon-btn {
          cursor: pointer;
          font-size: 16px;
          min-width: 133px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 15px;
          border: 1px solid #eeeeee;
          margin-left: 30px;

          &:first-child {
            margin-left: 0;
          }

          &:hover {
            border: 1px solid #90ff00;

            .el-icon-plus {
              color: #90ff00;
            }
          }
        }
      }
    }
  }

  ::v-deep .progress-table {
    .el-form-item {
      margin-right: 20px !important;

      .el-input {
        &__inner {
          text-align: center;
          padding-left: 0;
          border: 1px solid #f5f7fa;
        }

        &__suffix {
          display: none;
        }

        &__prefix {
          left: auto;
          right: 10px;
          font-size: 20px;
          color: #8992a6;
          line-height: 35px;
        }
      }

      .custom-icon {
        margin-left: 5px;
        font-size: 16px;
        color: #8992a6;
      }
    }
    .from-btn {
      margin-right: 0px !important;
    }

    .placeh-center {
      .el-input {
        &__inner {
          padding-left: 40px !important;
          text-align: left !important;

          &:focus {
            border: 1px solid #90ff00 !important;
            background: white;
          }
        }

        &__prefix {
          left: 10px !important;
          right: auto !important;
          line-height: 50px !important;
        }

        .el-image {
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  .publish-container {
    display: flex;
    justify-content: center;
    align-items: center;
    // padding-top: 40px;
    // background-color: pink;
  }

  .progress-table {
    ::v-deep .el-date-editor {
      padding-left: 20px !important;
    }

    .color-blue {
      color: #90ff00;
    }

    .color-green {
      color: #90ff00;
    }

    .color-orange {
      color: #f75f52;
    }

    .color-black {
      color: #333333;
    }

    .color-grey {
      color: #8992a6;
    }

    .font-common {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }

    .main-content {
      color: #90ff00;
    }

    .pad-right {
      padding-right: 5px;
    }

    .mar-bottom {
      margin-bottom: 10px;
    }

    .from-btn {
      .el-button {
        width: 70px;
        height: 34px;
        font-weight: bold;
        font-size: 16px;
        border-radius: 6px;
      }
    }
  }
}

.detail-info {
  padding: 0 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;

    .title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #96a2b2;
    }

    .type {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
  }
}

::v-deep .deleteDiaog {
  .el-dialog {
    border-radius: 6px !important;
  }
}
.user {
  background: linear-gradient(180deg, #e9f9f4 0%, #ffffff 41%, #ffffff 100%);
}
</style>
