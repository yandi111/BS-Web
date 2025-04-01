<!-- 买入/卖出 -->
<template>
	<div>
		<table-page v-if="curComp === 'List'" @current-change="change" :total="total" :page.sync="formInline.pageNum">
			<template v-slot:filter>
				<el-form :inline="true" :model="formInline" class="coinsForm between">
					<div>
						<el-form-item prop="amount" class="custol-form">
							<el-input :placeholder="$t(t+'请输入金额（简写）')" v-model.sync="formInline.amount" @input.native="(e) => changeInputPay(e, 'amount')"  maxlength="12">
								<div slot="suffix" >
									<el-popover :append-to-body="false" placement="bottom-end"  :offset="5" trigger="click" v-model="visibleAmount"
										:visible-arrow="true" ref="popover" @show="handleClickPop('popAmount')" @hide="popAmount = false">
										<div class="popper-content">
											<div class="input-content">
												<el-input v-model.sync="legalName" ref="popAmount" class="popper-input-special" :placeholder="$t(t+'搜索')" @input.native="(e) => filterLegalTender(e)" />
											</div>
											<ul v-if="filterLegalList && filterLegalList.length > 0">
												<li v-for="(item, index) in filterLegalList" :key="item.id" @click="handleChoose(item)"
													:class="['flexs li',{'li-active': item.id === formInline.legalTenderId}]">
													<div class="popper-img" > <el-image :src="item.icon" fit="cover" /> </div>
													{{ item.name }}
												</li>
											</ul>
											<div v-else class="no-data"> {{ $t(t+'暂无数据') }} </div>
										</div>
										<div slot="reference" class="prefix-box flexs">
											<el-image :src="legalTenderIcon" fit="cover" />
											<div class="text">{{ legalTenderName }}</div>
											<i :class="['custom-icon', popAmount ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
										</div>
									</el-popover>
								</div>
							</el-input>
						</el-form-item>
						<el-form-item prop="quantity" class="custol-form">
							<el-input v-model.sync="formInline.quantity" autocomplete="off" :placeholder="$t(t+'请输入数量（简写）')" maxlength="12"
								@input.native="(e) => changeInputPay(e, 'quantity')">
								<div slot="suffix" >
									<el-popover :append-to-body="false" placement="bottom-end"  :offset="5" trigger="click" v-model="visibleQuantity"
										:visible-arrow="true" ref="popover" @show="handleClickPop('popQuantity')" @hide="popQuantity = false">
										<div class="popper-content">
											<div class="input-content">
												<el-input v-model.sync="dealName" ref="popQuantity" class="popper-input-special" :placeholder="$t(t+'搜索')"
													@input.native="(e) => filterDeal(e)"></el-input>
											</div>
											<ul v-if="filterDealList && filterDealList.length > 0">
												<li v-for="(item, index) in filterDealList" :key="item.id" @click="handleChooseDeal(item)"
													:class="['flexs li',{'li-active': item.coinId === formInline.coinId}]">
													<div class="popper-img"> <el-image :src="item.iconUrl" fit="cover" /> </div>
													{{ item.coinName }}
												</li>
											</ul>
											<div v-else class="no-data">  {{ $t(t+'暂无数据') }} </div>
										</div>
										<div slot="reference" class="prefix-box flexs">
											<el-image :src="coinIcon" fit="cover" />
											<div class="text">{{ coinName }}</div>
											<i :class="['custom-icon', popQuantity ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
										</div>
									</el-popover>
								</div>
							</el-input>
						</el-form-item>
						<el-form-item prop="payments">
							<el-select v-model="formInline.incomeId" :popper-append-to-body="false" :placeholder="$t(t+'全部支付方式')" 
							@visible-change="popperRander = !popperRander" class="select-prefix">
								<el-option v-for="item in paymentList" :key="item.id" :label="$t(t+item.label)" :value="item.value">
								</el-option>
								<div slot="prefix" >
									<i :class="['custom-icon', popperRander ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
								</div>
							</el-select>
						</el-form-item>
						<el-form-item class="popver flexs mr20">
							<div class="switch-box">
								<div class="switch-text">{{ $t(t+'可交易') }}</div>
								<div class="switch-tab">
									 <el-switch
                    v-model="switchValue"
                    active-color="#13ce66"
                    inactive-color="#E1E1E1"
										@change="handleSwitch"
										>
                   </el-switch>
								</div>
							</div>
						</el-form-item>
						<el-form-item class="popver flexs mr20">
							<el-popover placement="bottom" width="40" trigger="click" ref="other">
								<div class="popper-content">
									<ul>
										<li v-for="(item, index) in otherList" :key="item.type" @click="handleOther(item)"
											:class="{ 'is-select' : activeOther.includes(item.value) }">
											{{ $t(t+item.label) }}
										</li>
									</ul>
								</div>
								<div slot="reference" class="filter-btn">
									<svg-icon iconClass="filter" className="icon-filter" />
								</div>
							</el-popover>
						</el-form-item>
						<el-form-item>
							<el-button type="text" class="mr20 search" size="small" @click="advertisingList"> {{ $t(t+'筛选') }}  </el-button>
						</el-form-item>
					</div>
					<div class="width155">
						<el-form-item class="popver flexs "> 
							<el-select v-model="refreshVal" :popper-append-to-body="false" :placeholder="$t(t+'暂不处理')" class="select-refresh-prefix" @change="handleChangeRefresh">
								<el-option v-for="item in refreshList" :key="item.value" :label="$t(t+item.label)" :value="item.value" />
								<div slot="prefix"> <i class="el-icon-refresh"></i> </div>
							</el-select>
						</el-form-item>
					</div>
				</el-form>
			</template>
			<template v-slot:table>
				<el-table v-loading="loading" :data="tableData" style="width: 100%">
					<el-table-column prop="nickName" :label="$t(t+'商家')" min-width="240" show-overflow-tooltip>
						<template slot-scope="scope">
							<div class="flexs pointer" @click="$router.push({ path: '/c2c/userCenter', query: { isMerchant: false, userId: scope.row.userId } })">
								<div class="width50"><el-avatar class="avatar" :size="40" fit="cover" :src="scope.row.avatar"></el-avatar></div>
								<div>
									<div class="main-content fontWeight600">{{ scope.row.nikeName }}
                    <img class="banner-img vip" decoding="async" src="@/assets/buy-coins/vip.png" alt="Smiley face" style="margin-right: 5px;">  
                    <img v-if="scope.row.createAt == 1" class="banner-img bisness" decoding="async" src="@/assets/buy-coins/bussniss.png" alt="Smiley face"  >  
                  </div>
									<div class="tip-content"> 
										{{ $t(t+'成交量') + $formatNumber(scope.row.orderQuantity) + ' / ' +  scope.row.orderRate + $t(t+'成交率') }}
									</div>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="price" :label="$t(t+'单价')" min-width="180">
						<template slot-scope="scope">
							<div class="pointer">
								<div class="main-content "><span class="fontSize22">￥{{ Number(scope.row.unitPrice).toFixed(accuracy) }} </span>{{ scope.row.legalTenderName }}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column min-width="200" prop="count" :label="$t(t+'数量/限额')">
						<template slot-scope="scope">
							<div class="pointer">
								<div class="normal-content">{{ scope.row.beleftQuantity }}  {{ scope.row.coinName }}</div>
								<div class="normal-content">{{ $formatNumber(scope.row.minMoney) }}  {{ scope.row.legalTenderName }}-
									￥{{ $formatNumber(scope.row.maxMoney) }} {{ scope.row.legalTenderName }}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="payTypes" :label="$t(t+'支付方式')" width="155">
						<template slot-scope="scope">
							<div class="pointer">
								<div class="normal-content payment">
									<template v-if="scope.row.incomeId?.indexOf('1') > -1"><img src="@/assets/buy-coins/yinhangka.png" alt=""></template>
									<template v-if="scope.row.incomeId?.indexOf('2') > -1"><img src="@/assets/buy-coins/zhifubao.png" alt=""></template>
									<template  v-if="scope.row.incomeId?.indexOf('3') > -1"> <img src="@/assets/buy-coins/weixin.png" alt=""></template>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t(t+'操作')" align="right" min-width="150">
						<template slot-scope="scope">
							<div class="flex-box-btn">
								<el-button :class="['btn',(scope.row.type == 1 ? 'btn-sell' : 'btn-bay')]"
									size="mini" type="text" @click="handleBuy(scope)"
								>
									{{ scope.row.type == 1 ? $t(t+'卖出') : $t(t+'买入') }} {{ scope.row.coinName }}
								</el-button>
								
								<!-- <div class="btn btn-isFalse" v-else> {{ $t(t+'不满足条件') }} </div> -->
							</div>
						</template>
					</el-table-column>
					<div slot="empty" style="margin-top: 60px">
						<div class="null-page">
							<img src="@/assets/images/null-page.png" alt="" />
							<div class="text">{{ $t(t+'暂无数据') }}</div>
						</div>
					</div>
				</el-table>
			</template>
		</table-page>
		<!-- 订单 -->
		<div v-if="curComp === 'Buy'" class="common-modal">
			<Order :is-buy="isBuy" @back="handleBack"></Order>
		</div>
		
		<!-- 买入 | 卖出弹窗 -->
		<trade-buy :is-show.sync="showTrade" :buyInfo="buyInfo" @next="handleClickNext" ref="tradeBuy" v-if="showTrade"></trade-buy>

		<!-- 设置支付方式 -->
		<get-methods :is-show.sync="showGetModal" :incomeId="incomeId" :payObj="payObj" :params="showParams"
			@next="choosePay"  ref="getMethods" v-if="showGetModal"/>
		<!-- 交易被禁止 -->
		<stopModal :stopVisible="stopVisible" @cancel="stopVisible = false"/>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <span>当前身份等级不支持C2C大宗交易</span>
      <span>前往认证</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">去认证</el-button>
      </span>
    </el-dialog>
    
	</div>
</template>

<script>
import TablePage from "@/components/tablePage/index.vue";
import tradeBuy from "./tradeBuy.vue";
import CommonModal from "@/components/commonModal/index.vue";
import GetMethods from "../../components/popup/getMethods.vue";
import Order from "../../components/order/index.vue";
import stopModal from "@/components/commonModal/stop/index.vue";
import {getOTCBuyOrSellLevel} from '@/api/otc'
import { getToken } from "@/libs/utils";
import { changeNumberVal } from "@/libs/utils.js";
import { simpleApi } from "@/api/assetWallet.js";
import { mapActions, mapGetters, mapState } from "vuex";
import {
  advertisingList,
  getLegalTender,
  createOrder,
  getMerchantInfo,
} from "@/api/otc.js";

export default {
  name: "CionsBuy",
  components: {
    TablePage,
    CommonModal,
    tradeBuy,
    Order,
    GetMethods,
    stopModal,
  },
  props: {
    // userLevel: {
    //   type: Number | String,
    // },
    method: {
      type: Number | String,
    },
  },
  watch:{
    method:{
      handler(newVal){
        this.formInline.incomeId = newVal
        this.advertisingList()
      }
    },
    merchantInfos:{
      handler(val){
        this.userLevel = val.userLevel
      }
    }
  },
  data() {
    return {
      //等级不够弹窗
      dialogVisible:false,
      // 商户信息
      merchantInfo: {},
      userLevel: undefined,
      isTrade: false, //表格操作不需要做判断
      switchValue: true,
      // 交易被禁止弹窗
      stopVisible: false,
      // 显示/隐藏输入框
      visibleAmount: false,
      visibleQuantity: false,
      visible: true,
      // 支付列表
      payObj: null,
      // 支付方式列表
      incomeId: "",
      // 是否是从交易进入的页面
      isBuy: false,
      // 延时器timer
      timer: null,
      // 下单所需字段
      params: null,
      // 支付页面所需字段
      showParams: null,
      // 控制支付方式显示和隐藏
      showGetModal: false,
      // 买入信息
      buyInfo: null,
      loading: false,
      // 显示交易弹窗
      showTrade: false,
      // 当前显示组件
      curComp: "List",
      // 虚拟货币名称
      dealName: "",
      // 法币名称
      legalName: "",
      dealList: [],
      filterDealList: [],
      legalList: [],
      filterLegalList: [],
      coinName: "",
      coinIcon: "",
      legalTenderName: "",
      legalTenderIcon: "",
      accuracy: undefined,
      decimalPlaces: undefined,
      popQuantity: false,
      popAmount: false,
      popperRander: false,
      dialogVisible:undefined,
      paymentList: [
        { label: "全部支付方式", value: undefined },
        { label: "银行卡", value: 1 },
        { label: "支付宝", value: 2 },
        { label: "微信", value: 3 },
      ],
      // 刷新数据
      refreshList: [
        { label: "暂不处理", value: "0" },
        { label: "5秒自动刷新", value: "5000" },
        { label: "10秒自动刷新", value: "10000" },
        { label: "20秒自动刷新", value: "20000" },
      ],
      refreshVal: "0",
      refreshTime: null,
      // 筛选交易状态
      activeOther: [],
      otherList: [
        { label: "交易过", value: 1, type: "haveTraded" },
        { label: "我的关注", value: 2, type: "myConcern" },
      ],
      formInline: {
        legalTenderId: undefined,
        coinId: undefined,
        amount: undefined,
        pageNum: 1,
        pageSize: 10,
        type: 0,
        quantity: undefined,
        incomeId: undefined,
        startDate: undefined,
        endDate: undefined,
        haveTraded: undefined, // 是否交易过
        myConcern: undefined, // 是否关注过
        isBulkDeal: 1,
        canTransaction: 1, //0不可交易 1可交易
      },
      dateRange: [],
      levelList:{},//普通交易
      // 总数
      total: 0,
      tableData: [],
      // 缓存重置
      sessionCoin: {},
      sessionlegalTender: {},
      // 国际化缩写
      t: "c2c.",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    // 获取用户交易状态
    ...mapState({ userStatus: (state) => state.login.userStatus,
    merchantInfos:  ({ setting }) => setting.merchantInfos,
     },
    
    ),
  },
  mounted() {
    if (this.$cache.local.getJSON("refreshTime")) {
      let refreshTime = this.$cache.local.getJSON("refreshTime");
      this.refreshVal = refreshTime;
      this.handleChangeRefresh(refreshTime);
    }
  },
  methods: {
    ...mapActions(["handleOrderInfo", "handleOrderStatus"]),
    // 多少秒刷新
    handleChangeRefresh(val) {
      this.$cache.local.setJSON("refreshTime", val);
      // 清除已有的定时器
      if (this.refreshTime) {
        clearInterval(this.refreshTime);
        this.refreshTime = null;
      }

      if (val != 0) {
        this.refreshTime = setInterval((_) => {
          this.showTrade == false && this.advertisingList();
        }, val);
      }
    },
    // 查询商户信息
    getMerchantInfo(userId) {
      getMerchantInfo({ userId: userId }).then((res) => {
        const { mailAuth, phoneAuth, identityAuth } = res.data;
        this.merchantInfo = res.data;
        if (mailAuth && phoneAuth && identityAuth) {
          this.isTrade = true;
        } else {
          this.isTrade = false;
        }
      });
    },
    // 选择支付方式后创建订单
    choosePay(accountId) {
      // 支付类型
      // console.log(JSON.parse(JSON.stringify({accountId, ...this.params})));
      // console.log('发布币种-传参',this.params);
      createOrder({ accountId, ...this.params }).then((res) => {
        let orderInfo = res.data;
        orderInfo.orderTime = new Date(orderInfo.createTime).getTime();
        this.handleOrderInfo(orderInfo);
        this.handleOrderStatus(orderInfo.status);
        this.showTrade = false;
        this.showGetModal = false;
        this.isBuy = true;
        this.curComp = "Buy";
        this.$emit("next");
      });
    },
    //可交易或不可交易
    handleSwitch(val) {
      if (val) {
        this.formInline.canTransaction = 1;
        this.advertisingList();
      } else {
        this.formInline.canTransaction = 0;
        this.advertisingList();
      }
    },

    // 过滤筛选
    handleOther(data) {
      let activeIndex = this.activeOther.findIndex(
        (item) => item === data.value
      );
      if (activeIndex !== -1) {
        this.activeOther.splice(activeIndex, 1);
        this.formInline[data.type] = 0;
      } else {
        this.activeOther.push(data.value);
        this.formInline[data.type] = 1;
      }
    },
    // 筛选法币列表
    filterLegalTender(e) {
      e = String(e.target.value);
      if (this.legalList && this.legalList.length > 0) {
        let data = JSON.parse(JSON.stringify(this.legalList));
        this.filterLegalList = !e
          ? data
          : data.filter((item) => item.name.indexOf(e.toUpperCase()) > -1);
      }
    },
    // 筛选虚拟货币列表
    filterDeal(e) {
      e = String(e.target.value);
      if (this.dealList && this.dealList.length > 0) {
        let data = JSON.parse(JSON.stringify(this.dealList));
        this.filterDealList = !e
          ? data
          : data.filter((item) => item.coinName.indexOf(e.toUpperCase()) > -1);
      }
    },
    // 获取法币列表
    getLegalTender() {
      getLegalTender().then((res) => {
        this.legalList = res.data.data;
        this.filterLegalList = res.data.data;
        if (res.data.data.length) {
          this.legalTenderName = res.data.data[0].name;
          this.formInline.legalTenderId = res.data.data[0].id;
          this.legalTenderIcon = res.data.data[0].icon;
          this.accuracy = res.data.data[0].retentionAccuracy;
          // 重置 retentionAccuracy
          this.sessionlegalTender = {
            legalTenderName: res.data.data[0].name,
            legalTenderId: res.data.data[0].id,
            legalTenderIcon: res.data.data[0].icon,
            accuracy: res.data.data[0].retentionAccuracy,
          };
        }
        this.getMerchantInfo();
        this.advertisingList();
      });
    },
    // 获取虚拟币列表
    coinSimple() {
      simpleApi({ isType: 1 }).then((res) => {
        this.dealList = res.data.data;
        this.filterDealList = res.data.data;
        if (res.data.data.length) {
          this.coinName = res.data.data[0].coinName;
          this.formInline.coinId = res.data.data[0].coinId;
          this.coinIcon = res.data.data[0].iconUrl;
          this.decimalPlaces = res.data.data[0].decimalPlaces; //精度
          // 重置
          this.sessionCoin = {
            coinName: res.data.data[0].coinName,
            coinId: res.data.data[0].coinId,
            coinIcon: res.data.data[0].iconUrl,
            decimalPlaces: res.data.data[0].decimalPlaces,
          };
        }
        this.getLegalTender();
      });
    },
    // 输入框限制
    changeInputPay(e, type) {
      if (this.legalName || this.dealName) return;
      let decimalPlaces = type == "amount" ? this.accuracy : this.decimalPlaces;
      this.formInline[type] = changeNumberVal(
        e.target.value,
        decimalPlaces,
        ""
      );
      // console.log(this.formInline.amount);
    },
    // 选中法币
    handleChoose(item) {
      this.visibleAmount = false;
      this.accuracy = item.retentionAccuracy; //精度
      this.formInline.legalTenderId = item.id;
      this.legalTenderName = item.name;
      this.legalTenderIcon = item.icon;
    },
    // 选中虚拟币
    handleChooseDeal(item) {
      this.visibleQuantity = false;
      this.decimalPlaces = item.decimalPlaces; //精度
      this.formInline.coinId = item.coinId;
      this.coinIcon = item.iconUrl;
      this.coinName = item.coinName;
      // console.log('选中法币',item);
    },
    // 返回页面
    handleBack() {
      this.curComp = null;
      this.$emit("back");
      this.$nextTick(() => {
        this.curComp = "List";
      });
    },
    // 事件翻页
    change(val) {
      this.formInline.pageNum = val.page;
      this.advertisingList();
    },
    // 获取列表
    advertisingList() {
      this.loading = true;
      advertisingList(this.formInline).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    
    // 买入/卖出
    handleBuy(scope) {
      if (this.userStatus.userOTCTradeStatus == "FORBIDDEN") {
        this.stopVisible = true;
        return;
      }
      scope.row.legalTenderIcon = this.legalTenderIcon;
      scope.row.coinIcon = this.coinIcon;
      scope.row.decimalPlaces = this.decimalPlaces;
      scope.row.accuracy = this.accuracy;
      // 判断是否登录
      if (!getToken()) {
        this.$router.push({
          path: "/login",
          query: { redirect: this.$route.fullPath },
        });
        return;
      }
      // 判断是否操作自己的单
      if (this.userInfo.userId === scope.row.userId) {
        this.$message.warning(this.$t(this.t + "禁止操作自己的单"));
        return;
      }
      this.incomeId = scope.row.incomeId;
      this.payObj = scope.row.payTypeVos;
      this.buyInfo = scope.row;
      this.showTrade = true;
      this.$nextTick((_) => {
        this.$refs.tradeBuy.isChange = scope.row.type == 1 ? false : true;
        this.$refs.tradeBuy.entranceType =
          this.formInline.isBulkDeal == 1 ? 2 : 1;
      });
    },
    // 打开支付弹窗
    handleClickNext(params, showParams) {
      showParams.type = this.formInline.type;
      // 组装接口所需参数
      this.params = params;
      // 支付页面显示所需参数
      this.showParams = showParams;
      // 隐藏交易弹窗
      // this.showTrade = false
      // 打开设置支付方式弹窗
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.showGetModal = true;
        if (showParams?.type == 1) {
          this.$nextTick((_) => {
            this.$refs.getMethods?.getPayList();
          });
        }
      }, 500);
    },
    // 日期选择
    changeDate(data) {
      this.formInline.startDate =
        data?.length > 0 ? data[0].getTime() : undefined;
      this.formInline.endDate =
        data?.length > 0 ? data[1].getTime() : undefined;
    },
    // 重置
    handleFilter() {
      this.formInline = {
        pageNum: 1,
        pageSize: 10,
        type: this.formInline.type,
        coinId: this.sessionCoin.coinId,
        legalTenderId: this.sessionlegalTender.legalTenderId,
        isBulkDeal: this.formInline.isBulkDeal,
        incomeId: "",
      };
      // 虚拟币
      this.coinName = this.sessionCoin.coinName;
      this.coinIcon = this.sessionCoin.coinIcon;
      this.decimalPlaces = this.sessionCoin.decimalPlaces;
      // 法币
      this.legalTenderName = this.sessionlegalTender.legalTenderName;
      this.legalTenderIcon = this.sessionlegalTender.legalTenderIcon;
      this.accuracy = this.sessionlegalTender.accuracy;

      this.advertisingList();
    },
    handleClickPop(type) {
      this[type] = !this[type];
      this.$nextTick((_) => {
        console.log(type);
        this.$refs[type].focus();
      });
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    // 清除已有的定时器
    if (this.refreshTime) {
      clearInterval(this.refreshTime);
      this.refreshTime = null;
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-switch__core{
    width: 40px !important;
  }
.table-content .common-filter .filter-btn {
    margin-left: 0 !important;
}
.switch-box {
  min-width: 120px;
  height: 40px;
  background: #f5f7fa;
  border-radius: 4px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
  .switch-text{
		margin-right: 10px;
	}
  

}
::v-deep .el-popper {
  margin-left: -4px;
}
::v-deep .el-avatar > img {
  width: 100%;
}
.pointer {
  cursor: pointer !important;
}
::v-deep .el-table .el-table__cell {
  padding: 20px 0;
}
::v-deep .chat-content .chat-panel {
  top: 216px;
  right: 206px;
}

::v-deep .dia-content {
  padding: 51px 0 0 0;
}

.el-table {
  color: #333333;
  .tip-content {
    color: #8992a6;
  }
}
.btn {
  width: 110px;
  height: 40px;
  font-size: 14px;
  border-radius: 6px;
  text-align: center;
  color: white;
  &-sell {
    background: #f75f52;
  }
  &-bay {
    background: #90ff00;
  }
  &-isFalse {
    line-height: 40px;
    color: #8992a6;
    background: #e7e7e7;
    cursor: not-allowed;
  }
}

/* input插槽样式 */
.prefix-box {
  cursor: pointer;
  height: 40px;
  color: #333;
  padding-right: 10px;
  .el-image {
    width: 28px;
    height: 28px;
    margin-right: 4px;
  }
  .custom-icon {
    margin-left: 4px;
    color: #8992a6;
    font-size: 18px;
  }
}
.payment {
  img{
    margin-right:10px;
    width:24px;
    height:24px;
  }
  span {
    padding: 0 20px 0 5px;
  }

  /** 微信 */
  .pay-wx {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      width: 2px;
      height: 12px;
      background: #90ff00;
      left: -5px;
      top: 22%;
    }
  }

  /** 银行卡 */
  .pay-card {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      width: 2px;
      height: 12px;
      background: #ffd887;
      left: -5px;
      top: 22%;
    }
  }

  /** 支付宝 */
  .pay-alipay {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      width: 2px;
      height: 12px;
      background: #90ff00;
      left: -5px;
      top: 22%;
    }
  }
}
::v-deep .coinsForm {
  width: 100%;

  .custol-form {
    .el-input {
      &__inner {
        &:focus {
          border: 1px solid #90ff00;
          background: #fff;
        }
      }
      .li {
        &-active,
        &:hover {
          background-color: #f4f5f7;
        }
      }
      .popper-img {
        width: 25px;
        height: 25px;
        line-height: 25px;
        vertical-align: middle;
        margin-right: 10px;
        .el-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
  }
  .el-select {
    .el-input {
      position: relative;
      &__inner {
        border: 1px solid transparent !important;
      }
    }
  }
  .el-form-item__content {
    // min-width: 220px;
  }

  .select-prefix {
    .el-input__prefix {
      left: auto;
      margin-left: -30px;
      font-size: 18px;
    }
    .el-input--prefix .el-input__inner {
      padding: 0 15px;
    }
  }

  .popver,
  .select-prefix {
    .el-input__suffix {
      display: none;
    }
  }
  .el-input__prefix {
    color: #8992a6;
  }
  .popver {
    .el-form-item__content {
      width: auto !important;
    }
    .el-input__prefix {
      left: 10px;
      font-size: 20px;
      color: #8992a6;
    }

    .select-refresh-prefix {
      .el-input {
        color: #333333;
        position: relative;
        color: #8992a6;
        width: 120px;
        &__inner {
          border: none;
          width: 150px;
          padding: 0 20px;
          height: 40px;
          padding-left: 35px;
          background: #f5f7fa;
          color: #333333;
          font-size: 15px;
          border-radius: 4px;
          &:active {
            opacity: 0.8;
          }
        }
      }
    }
  }

  .el-input {
    position: relative;
    color: #8992a6;
    width: 220px;
    &__inner {
      border: 1px solid transparent;
      width: 220px;
      height: 40px;
      background: #f5f7fa;
      border-radius: 4px;
     
    }

  }
  .search {
    background: #f5f7fa;
    font-size: 14px;
    width: 70px;
    height: 40px;
    color: #333;
    &:active {
      opacity: 0.8;
    }
  }
}

::v-deep .el-popover {
 width:220px;
}
::v-deep .popper-input-special{
  width: 180px !important;
  .el-input__inner{
    width: 180px !important;
 }
}
</style>