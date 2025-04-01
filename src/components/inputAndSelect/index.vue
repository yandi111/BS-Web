<!-- 通用组件 输入和下拉存在 -->
<template>
	<el-input :placeholder="placeholder" :value="field" :class="['bcb-input', { 'bcb-input-active': isFocusStyle }]"
		@input="(e) => changeInput(e)" @focus="$emit('addFocusStyle', (isFocusStyle = true))"
		@blur="$emit('addFocusStyle', (isFocusStyle = false))">
		<div slot="append" >
			<el-popover :placement="placement" :width="width" :offset="20" trigger="click" popper-class="selectInputPop"
				v-model="visible" :visible-arrow="true" @show="handlePopper(true)" @hide="handlePopper(false)">
				<div class="popper-content">
					<div class="input-content">
						<el-input v-model="name" ref="popper" :placeholder="$t('c2c.搜索')" @input="filterCoins"></el-input>
					</div>
					<ul v-if="filterList && filterList.length > 0">
						<li v-for="item in filterList"  @click="handleChoose(item)" :key="item.id" 
							:class="['flexs li',{'li-active': item.id === coinId || item.coinId === coinId}]">
							<div class="popper-img" > <el-image :src="item.icon || item.iconUrl" fit="cover" /> </div>
							{{ item[`${label}`] }}
						</li>
					</ul>
					<div v-else class="no-data">{{ $t('c2c.暂无数据') }}</div>
				</div>
				<div slot="reference" class="prefix-content minWidth18">
					<slot name="box"> </slot>
					<div class="box flexs">
						<img :src="coinIcon || require('@/assets/images/apply-success.png')" alt=""
							style="width: 24px; height: 24px; border-radius: 50%" />
						<div class="text ml5">{{ coinName }}</div>
						<i :class="[
                'custom-icon ml10',
                popperShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
              ]"></i>
					</div>
				</div>
			</el-popover>
		</div>
	</el-input>
</template>

<script>
	import {
		changeNumberVal
	} from "@/libs/utils.js";
	export default {
		name: "",
		components: {},
		props: {
			// 默认提示占位符
			placeholder: {
				type: String | Number,
				default: "请输入",
			},
			// 弹出框宽度
			width: {
				type: String,
			},
			// 弹出框显示指定位置
			placement: {
				type: String,
			},
			// 弹出框显示方式
			trigger: {
				type: String | Number,
				default: "click",
			},
			// 输入绑定字段
			field: {
				type: String | Number,
				default: "",
			},
			// 模糊查询字段
			name: {
				type: String | Number,
				default: "",
			},
			// 过滤数组
			filterList: {
				type: Array,
				default: () => [],
			},
			// 指定默认显示的货币id
			coinId: {
				type: String | Number,
			},
			// 指定货币的名称
			coinName: {
				type: String | Number,
			},
			// 币种icon
			coinIcon: {
				type: String | Number,
			},
			// 显示的字段
			label: {
				type: String | Number,
				default: "name",
			},
			// 精度限制
			accuracy: {
				type: String | Number,
				default: 2,
			},
			// 类型
			tradeType: {
				type: String | Number,
			},
		},
		data() {
			return {
				popperShow: false,
				visible: false,
				isFocusStyle: false,
			};
		},
		methods: {
			// 限制输入规则（数字）
			changeInput(val) {
				val = changeNumberVal(val, this.accuracy, "");
				this.$emit("update:field", val);
				this.$emit("input-change");
			},
			// 过滤虚拟货币
			filterCoins(e) {
				this.$emit("update:name", e);
				this.$emit("filter");
			},
			// 选中
			handleChoose(item) {
				this.visible = false;
				this.$emit("choose", item);
			},
			// 样式
			handlePopper(bool){
				this.popperShow = bool;
				this.$nextTick(_=>{
					this.$refs.popper.focus();
				})
			},
		},
	};
</script>
<style scoped>
	.selectInputPop {}
</style>
<style lang="scss" scoped>
	.prefix-content {
		width: auto;
	}

	::v-deep .box {
		width: 110px;
		margin: auto;
		padding-left: 10px;
		background-color: white;
		border-radius: 6px;
	}

	::v-deep .el-input-group__append {
		padding: 0;
	}

	.custom-icon {
		margin-left: 5px;
		font-size: 16px;
		color: #8992A6;
	}
	.li{
		&-active,&:hover{
			background-color: #f5f7fa;
		}
	}
	.popper-img{
		width: 25px;
		height: 25px;
		line-height: 25px
		;vertical-align: middle;
		margin-right: 10px;
		.el-image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
			object-fit: cover;
		}
	}
	.bcb-input {
		border: 1px solid transparent;
		&:hover {
			border: 1px solid #90ff00;
		}

		&-active {
			background: #ffffff !important;
			border: 1px solid #90ff00;
		}
	}
</style>