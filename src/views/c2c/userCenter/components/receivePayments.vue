<!-- 收付款设置 -->
<template>
	<div class="progress-table">
		<table-page :show-page="false">
			<template #filter>
				<el-form :inline="true" :model="formInline" ref="formInline">
					<el-form-item prop="ids">
						<el-select v-model="formInline.ids" :placeholder="$t(t+'收款方式')" class="select-width">
							<el-option v-for="item in paymentList" :key="item.value" :label="$t(t+item.label)" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="status">
						<el-select v-model="formInline.status" :placeholder="$t(t+'所有状态')" class="select-width">
							<el-option v-for="item in typeList" :key="item.value" :label="$t(t+item.label)" :value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item prop="date">
						<el-date-picker v-model="formInline.date" type="daterange" range-separator="-" :start-placeholder="$t(t+'开始日期')"
							:end-placeholder="$t(t+'结束日期')" @change="changeDate" align="right">
						</el-date-picker>
					</el-form-item>
					<el-form-item class="from-btn ml30">
						<el-button type="text" class="config" size="small" @click="getPayList">{{$t(t+'筛选')}}  </el-button>
						<el-button size="small" class="ml20" @click="handleFilter">  {{$t(t+'重置')}} </el-button>
					</el-form-item>
				</el-form>
			</template>
			<template v-slot:table>
				<el-table class="customer-no-border-table" :data="tableData" style="width: 100%" v-loading="loading">
					<el-table-column prop="type" :label="$t(t+'收款方式')" min-width="100" >
						<template slot-scope="scope">
							<div>
								<div v-if="scope.row.type === 1">{{$t(t+'银行卡')}}</div>
								<div v-if="scope.row.type === 2">{{$t(t+'支付宝')}}</div>
								<div v-if="scope.row.type === 3">{{$t(t+'微信')}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="name" :label="$t(t+'账户姓名')" min-width="130" />
					<el-table-column prop="num" :label="$t(t+'账号')" min-width="150" show-overflow-tooltip />
					<el-table-column prop="bankName" :label="$t(t+'开户银行')" min-width="130" > 
					<template slot-scope="scope">
							{{ scope.row.bankName ||  $t(t+'无')  }}
					</template>
					</el-table-column>
					<el-table-column prop="qrcode" :label="$t(t+'收款二维码')" min-width="130">
						<template slot-scope="scope">
							<el-image v-if="scope.row.qrcode && scope.row.qrcode !='//0'" :src="scope.row.qrcode" style="width: 64px;height: 64px" :preview-src-list="[scope.row.qrcode]" fit="cover" />
							<span v-else>{{ $t(t+'暂无') }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="createTime" :label="$t(t+'创建日期')" min-width="180">
						<template slot-scope="scope">
							<div>
								<div>{{ parseTime(scope.row.createTime) }}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column :label=" $t(t+'操作')" align="right" width="140">
						<template slot-scope="scope">
							<div class="tablebtn-group">
								<el-button size="mini"  class="color-green" @click="$emit('handlePay', scope.row)" type="text">{{  $t(t+'编辑')}}  </el-button>
								<el-button size="mini"  class="color-orange"  @click="handleDel(scope.row)" type="text"> {{  $t(t+'删除')}}</el-button>
							</div>
						</template>
					</el-table-column>
					<div slot="empty" style="margin-top: 60px">
						<div class="null-page">
							<img src="@/assets/images/null-page.png" alt="" />
							<div class="text">{{$t(t+'暂无收款')}}</div>
						</div>
					</div>
				</el-table>
			</template>
		</table-page>
	</div>
</template>

<script>
	import TablePage from '@/components/tablePage/index.vue'
	import {coinSimple,payList,payDisabled,delPayType} from '@/api/otc.js'
	import { simpleApi } from '@/api/assetWallet.js'
	export default {
		name: 'MyAdvice',
		components: {
			TablePage
		},
		data() {
			return {
					// 国际缩写
					t: 'c2c.',
				loading: true,
				// 查询币种
				dealList: [],
				typeList: [{
						label: '全部状态',
						value: ''
					},
					{
						label: '启用',
						value: 1
					},
					{
						label: '禁用',
						value: 2
					},
				],
				paymentList: [
					{
						label: '全部支付方式',
						value: 0
					},
					{
						label: '银行卡',
						value: 1
					},
					{
						label: '支付宝',
						value: 2
					},
					{
						label: '微信',
						value: 3
					},
				],
				formInline: {
					ids: 0,
					status: '',
					date: [],
					startDate: undefined,
					endDate: undefined
				},
				tableData: []
			}
		},
		mounted() {
			this.getPayList()
		},
		methods: {
			// 删除
			handleDel(row) {
				this.$modal.confirm( this.$t(this.t+'是否删除该支付方式')+'?').then(() => {
					delPayType({id: row.id}).then(res => {
						this.$message({
							message:this.$t(this.t+'删除成功')+'！',
							type: 'success'
						});
							this.getPayList()
					})
				})
			},
			// 重置 
			handleFilter(){
				this.formInline.startDate = undefined;
				this.formInline.endDate = undefined;
				this.getPayList();
			},
			// 获取收付款
			getPayList() {
				this.loading = true;
				payList({
					ids: this.formInline.ids, 
					status: this.formInline.status, 
					startDate: this.formInline.startDate,
					endDate: this.formInline.endDate,
				}).then(res => {
					this.tableData = res.data;
					this.loading = false;
				})
			},
			// 日期选择
			changeDate(data) {
					this.formInline.startDate = data && data.length > 0 ? data[0] : undefined;
					this.formInline.endDate   = data && data.length > 0 ? data[1] : undefined;
			},
		}
	}
</script>
<style lang='scss' scoped>
.from-btn{
		.el-button{
			width: 70px;
			height: 34px;
			font-weight: bold;
			font-size: 16px;
			border-radius: 6px;
		}
		.config{
			background-color: #90ff00;
			color: white;
			&:hover{
				opacity: .8;
			}
		}
	}
</style>