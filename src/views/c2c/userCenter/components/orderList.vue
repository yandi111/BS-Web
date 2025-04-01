<!-- 商户委托单 -->
<template>
	<div class="order-container">
		<p class="title">{{ $t(t+'向Ta购买')}} </p>
		<table-page :total="buyTotal" :page.sync="buyPageNum" @current-change="changeNumBuy" :showPage="buyTotal > 10 ? true : false">
			<template v-slot:table>
				<el-table :data="buyTableData" style="width: 100%" v-loading="buyLoading">
					<el-table-column prop="type" :label=" $t(t+'委托单类型')" width="170">
						<template slot-scope="scope">
							<div class="color-green">  {{$t(t+'买')}} </div>
						</template>
					</el-table-column>
					<el-table-column prop="unitPrice" :label="$t(t+'单价')" min-width="170">
						<template slot-scope="scope">
								{{ $formatNumber(scope.row.unitPrice) }} {{ scope.row.legalTenderName }}
						</template>
					</el-table-column>
					<el-table-column prop="beleftQuantity" :label="$t(t+'剩余数量')" min-width="170">
						<template slot-scope="scope">
								{{ $formatNumber(scope.row.beleftQuantity) }}{{ scope.row.coinName }}
						</template>
					</el-table-column>
					<el-table-column prop="quantity" :label="$t(t+'总额')" min-width="170">
						<template slot-scope="scope">
									{{ $formatNumber(scope.row.quantity) }} {{ scope.row.legalTenderName }}
						</template>
					</el-table-column>
					<el-table-column prop="price" :label="$t(t+'限额')" min-width="240">
						<template slot-scope="scope">
							<div class="normal-content">{{ $formatNumber(scope.row.quantity) }} {{ scope.row.coinName }}</div>
							<div class="normal-content">{{ $formatNumber(scope.row.minMoney) }}  {{ scope.row.legalTenderName }}-
								￥{{ $formatNumber(scope.row.maxMoney) }} {{ scope.row.legalTenderName }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="payTypes" :label="$t(t+'支付方式')" min-width="240">
						<template slot-scope="scope">
							<div class="flex-box">
								<div class="normal-content payment">
									<span class="pay-card" v-if="scope.row.incomeId && scope.row.incomeId.indexOf('1') > -1"> {{$t(t+'银行卡')}}</span>
									<span class="pay-alipay" v-if="scope.row.incomeId && scope.row.incomeId.indexOf('2') > -1"> {{ $t(t+'支付宝')}}</span>
									<span class="pay-wx" v-if="scope.row.incomeId && scope.row.incomeId.indexOf('3') > -1"> {{ $t(t+'微信')}}</span>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column :label=" $t(t+'操作')" align="right" min-width="140">
						<template slot-scope="scope">
							<div class="flex-box-btn">
								<el-button class="btn-success" size="mini" type="primary"
									@click="handleBuy(scope.row)">{{$t(t+'购买')}}</el-button>
							</div>
						</template>
					</el-table-column>
					<div slot="empty" style="margin-top: 60px">
						<div class="null-page">
							<img src="@/assets/images/null-page.png" alt="" />
							<div class="text">{{$t(t+'暂无数据')}}</div>
						</div>
					</div>
				</el-table>
			</template>
		</table-page>
		
		<p class="title pt50">{{$t(t+'向Ta出售')}}</p>
		<table-page :total="sellTotal" :page.sync="sellPageNum" @current-change="changeNumSell" :showPage="sellTotal > 10 ? true : false">
			<template v-slot:table>
				<el-table :data="sellTableData" style="width: 100%" v-loading="sellLoading">
					<el-table-column prop="type" :label="$t(t+'委托单类型')" width="170">
						<template slot-scope="scope">
								<div class="color-orange">  {{$t(t+'卖')}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="unitPrice" :label="$t(t+'单价')" width="170">
						<template slot-scope="scope">
								{{ $formatNumber(scope.row.unitPrice) }} {{ scope.row.legalTenderName }}
						</template>
					</el-table-column>
					<el-table-column prop="beleftQuantity" :label="$t(t+'剩余数量')" width="170">
						<template slot-scope="scope">
								{{ $formatNumber(scope.row.beleftQuantity) }}{{ scope.row.coinName }}
						</template>
					</el-table-column>
					<el-table-column prop="quantity" :label="$t(t+'总额')" width="170">
						<template slot-scope="scope">
									{{ $formatNumber(scope.row.quantity) }} {{ scope.row.legalTenderName }}
						</template>
					</el-table-column>
					<el-table-column prop="price" :label="$t(t+'限额')" min-width="240">
						<template slot-scope="scope">
							<div class="normal-content">{{ $formatNumber(scope.row.quantity) }} {{ scope.row.coinName }}</div>
							<div class="normal-content">{{ $formatNumber(scope.row.minMoney) }}  {{ scope.row.legalTenderName }}-
								￥{{ $formatNumber(scope.row.maxMoney) }} {{ scope.row.legalTenderName }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="payTypes" :label="$t(t+'支付方式')" min-width="240">
						<template slot-scope="scope">
							<div class="flex-box">
								<div class="normal-content payment">

									<span class="pay-card" v-if="scope.row.incomeId && scope.row.incomeId.indexOf('1') > -1"> {{$t(t+'银行卡')}}</span>
									<span class="pay-alipay" v-if="scope.row.incomeId && scope.row.incomeId.indexOf('2') > -1"> {{ $t(t+'支付宝')}}</span>
									<span class="pay-wx" v-if="scope.row.incomeId && scope.row.incomeId.indexOf('3') > -1"> {{ $t(t+'微信')}}</span>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t(t+'银行卡')" align="right" width="170">
						<template slot-scope="scope">
							<div class="flex-box-btn">
								<el-button class="btn-error" size="mini" type="primary"
									@click="handleBuy(scope.row)">{{$t(t+'出售')}}</el-button>
							</div>
						</template>
					</el-table-column>
					<template #empty>
						<div class="empty-tabaleContent">
							<img src="@/assets/images/null-page.png" alt="" />
							<p>{{$t(t+'暂无数据')}}</p>
						</div>
					</template>
				</el-table>
			</template>
		</table-page>
		<!-- 购买 | 出售弹窗 -->
		<trade-buy :is-show.sync="showTrade" ref="tradeBuy" :buyInfo="buyInfo" @next="handleClickNext" v-if="showTrade"></trade-buy>
		
		<!-- 设置支付方式 -->
		<get-methods :is-show.sync="showGetModal" :incomeId="incomeId" :payObj="payObj" :params="showParams"
			@next="choosePay" v-if="showGetModal"  ref="getMethods" />
		
		<!-- 交易被禁止 -->
		<stopModal :stopVisible="stopVisible" @cancel="stopVisible = false"/>
			
	</div>
</template>

<script>
	import { simpleApi } from '@/api/assetWallet.js'
	import { advertisingMerchantList, getLegalTender, createOrder } from '@/api/otc.js'
	import TablePage from '@/components/tablePage/index.vue'
	import GetMethods from '../../components/popup/getMethods.vue'
	import tradeBuy from '../../tradeToc/components/tradeBuy.vue'
	import stopModal from '@/components/commonModal/stop/index.vue'
	import { mapActions, mapState } from 'vuex'
	
	export default {
		name: 'OrderList',
		components: {
			TablePage,
			GetMethods,
			tradeBuy,
			stopModal
		},
		props: {
			userId: {
				type: String | Number
			},
		},
		data() {
			return {
					// 国际缩写
					t: 'c2c.',
				// 交易被禁止弹窗
				stopVisible: false,
				legalTenderList: [],		// 虚拟币
				simpleList: [],						// 法币
				// 购买 | 出售
				showTrade: false,
				buyInfo: {},
				// 支付方式
				showGetModal: false,
				incomeId: '',
				payObj: [],
				params: {},
				// 购买
				buyTableData: [],				
				buyLoading:true,
				buyTotal: 0,
				buyPageNum: 1,
				// 出售
				sellTableData: [],			
				sellLoading:true,
				sellTotal: 0,
				sellPageNum: 1,
			}
		},
		mounted() {
			this.getSellTodoList();
			this.getBuyTodoList();
			this.getSimpleApi();
			this.getLegalTender();
		},
		methods: {
			...mapActions(['handleOrderInfo', 'handleOrderStatus']),
			
			// 商户的委托单列表 买
			getBuyTodoList(){
				this.buyLoading = true;
				advertisingMerchantList({type: 1,userId: this.userId,pageNum: this.buyPageNum,pageSize: 10}).then(res=>{
					this.sellTableData = res.data.records;
					this.buyTotal = res.data.total;
					this.buyLoading = false;
				})
			},
			// 商户的委托单列表 卖
			getSellTodoList(){
				this.sellLoading = true;
				advertisingMerchantList({type: 0,userId: this.userId,pageNum: this.sellPageNum,pageSize: 10}).then(res=>{
					this.buyTableData= res.data.records;
					this.sellTotal = res.data.total;
					this.sellLoading = false;
				})
			},
			// 购买/出售
			async handleBuy(row) {
				if(this.userStatus.userOTCTradeStatus == 'FORBIDDEN'){
					this.stopVisible = true;
					return
				}
				this.showTrade = true;
				this.$nextTick(_=>{
					const filterSimple = this.simpleList.find(item => item.coinId === row.coinId);
					const filterLegalTender = this.legalTenderList.find(item => item.id === row.legalTenderId);
					// 图标
					row.coinIcon = filterSimple.iconUrl;
					row.legalTenderIcon = filterLegalTender.icon;
					// 精度
					row.decimalPlaces = filterSimple.decimalPlaces;
					row.accuracy = filterLegalTender.retentionAccuracy;
					// 支付方式及创建订单参数
					this.incomeId = row.incomeId;
					this.payObj = row.payTypeVos; 
					this.buyInfo = row;

					this.$refs.tradeBuy.isChange = row.type == 1 ? false : true;
				})
			},
			changeNumBuy(num) {
				this.buyPageNum = num.page;
				this.getBuyTodoList();
			},
			changeNumSell(num){
				this.sellPageNum = num.page;
				this.getSellTodoList();
			},
			// 打开支付弹窗
			handleClickNext(params, showParams) {
				showParams.type = this.buyInfo.type;
				// 组装接口所需参数
				this.params = params
				// 支付页面显示所需参数
				this.showParams = showParams
				// 隐藏交易弹窗
				// this.showTrade = false
				// 打开设置支付方式弹窗
				setTimeout(() => {
					this.showGetModal = true
					if (showParams?.type == 1) {
							this.$nextTick(_=>{
							 this.$refs.getMethods?.getPayList();
							})
					} 
				}, 500)
			},
			// 选择支付方式
			choosePay(accountId) {
				// 支付类型
				let params = {
					...this.params,
					accountId: accountId
				}
				// accountId:1
				createOrder(params).then(res => {
						let orderInfo = res.data;
						orderInfo.orderTime = new Date(orderInfo.createTime).getTime();
						this.handleOrderInfo(orderInfo);
						this.handleOrderStatus(orderInfo.status);
						this.showTrade = false;
						this.showGetModal = false;
						this.$router.push(`/c2c/tradeOrder?orderId=${res.data.id}&type=${this.buyInfo.type == 1 ? 0 : 1}`)
				})
			},
			// 获取虚拟列表
			getSimpleApi() {
				simpleApi({isType: 1}).then(res => {
					this.simpleList = res.data.data;
				})
			},
			// 获取法币列表
			getLegalTender() {
				getLegalTender().then(res => {
					this.legalTenderList = res.data.data;
				})
			},
		},
		computed: {
			// 获取用户交易状态
			...mapState({userStatus: state => state.login.userStatus}),
		},
	}
</script>
<style lang='scss' scoped>
	.order-container {
		padding: 20px;
	}

	.title {
		font-size: 18px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #00082D;
	}
	.color-green {
		color: #90ff00;
	}
	
	.color-orange {
		color: #F75F52;
	}
</style>