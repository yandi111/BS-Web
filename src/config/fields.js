// 快捷菜单
export const shortcutList = [{
	name: "快捷买币",
	url: "/c2c/buyCoin",
	icon: 'kuaijie',
	iconDark: 'kuaijie-dark',
},
{
	name: "C2C",
	url: "/c2c/tradeToc",
	icon: 'c2c',
	iconDark: 'c2c-dark',
},
]

//合约交易
export const contractTrading = [
// 	{
// 	name: "合约奖励",
// 	url: "/layout/contractTransaction",
// 	icon: 'contractSubsidy',
// 	iconDark: 'contractSubsidy-dark',
// 	type:1,
// },
{
	name: "U本位",
	url: "/contractTransaction",
	icon: 'UStandard',
	iconDark: 'UStandard-dark',
	type:2,
},
]

// 订单菜单
export const orderList = [{
	name: "合约订单",
	url: "/wallet/contractAccount",
	icon: 'contractOrder',
	iconDark: 'contractOrder-dark',
},
{
	name: "C2C订单",
	url: "/c2c/tradeOrder",
	icon: 'c2cOrder',
	iconDark: 'c2cOrder-dark',
},
]


// 用户菜单
export const menuList = [{
	name: '账户总览',
	url: '/overview',
	icon: 'overview',
	iconImg:'@/assets/side/icon_wallet overview.png',
	activeImg:'@/assets/side/icon_wallet overview(1).png',
	iconDark: 'overview-dark',
},
{
	name: '安全设置',
	url: '/securitySetting',
	icon: 'setting',
	iconDark: 'setting-dark',
},
{
	name: '身份验证',
	url: '/verifyIdentidy',
	icon: 'verify',
	iconDark: 'verify-dark',
},
{
	name: '我的邀请',
	// url: '/user/rebate',
	icon: 'rebate',
	iconDark: 'rebate-dark',
},
{
	name: 'API管理',
	// url: '/user/apiManage',
	icon: 'api',
	iconDark: 'api-dark',
},
{
	name: '偏好设置',
	// url: '/user/likeSetting',
	icon: 'preference',
	iconDark: 'preference-dark',
},
{
	name: '帮助中心',
	url: '/helpCenter',
	icon: 'help',
	iconDark: 'help-dark',
},
{
	name: '退出登录',
	// url: 'loginout',
	icon: 'loginout',
	iconDark: 'loginout-dark',
},
]

// 钱包菜单
export const walletList = [
	{
		name: '资产总览',
		url: '/wallet/assetsOverview',
		icon: 'funding-overview',
		iconDark: 'funding-overview-dark',
	},
	{
		name: '充币',
		url: '/wallet/deposit',
		icon: 'deposit',
		iconDark: 'deposit-dark',
	},
	{
		name: '提币',
		url: '/wallet/withdrawCoins',
		icon: 'withdraw-coins',
		iconDark: 'withdraw-coins-dark',
	},
	{
		name: '闪兑',
		url: '/wallet/flashExchange',
		icon: 'flash_exchange',
		iconDark: 'flash_exchange_dark',
	},
	{
		name: '资金划转',
		url: '/wallet/fundsTransfer',
		icon: 'transfer',
		iconDark: 'transfer-dark',
	},
	{
		name: '资金账户',
		url: '/wallet/capitalAccount',
		icon: 'capital-account',
		iconDark: 'capital-account-dark',
	},
	{
		name: '现货账户',
		url: '/wallet/spotAccount',
		icon: 'spot-account',
		iconDark: 'spot-account-dark',
	},
	{
		name: '合约账户',
		url: '/wallet/contractAccount',
		icon: 'contract-account',
		iconDark: 'contract-account-dark',
	},
	{
		name: '跟单账户',
		url: '/wallet/documentaryAccount',
		icon: 'documentary-account',
		iconDark: 'documentary-account-dark',
	},
]
// 头部钱包菜单
export const walletHeaderList = [

	{
		name: '资金划转',
		url: '/wallet/fundsTransfer',
		icon: 'transfer',
		iconDark: 'transfer-dark',
	},
	{
		name: '资金账户',
		url: '/wallet/capitalAccount',
		icon: 'capital-account',
		iconDark: 'capital-account-dark',
	},
	{
		name: '现货账户',
		url: '/wallet/spotAccount',
		icon: 'spot-account',
		iconDark: 'spot-account-dark',
	},
	{
		name: '合约账户',
		url: '/wallet/contractAccount',
		icon: 'contract-account',
		iconDark: 'contract-account-dark',
	},
	{
		name: '跟单账户',
		url: '/wallet/documentaryAccount',
		icon: 'documentary-account',
		iconDark: 'documentary-account-dark',
	},
]

// 通知菜单
export const noticeList = [{
	name: '系统通知',
	url: '/notice/wholeNotice',
},
{
	name: '公告通知',
	url: '/notice/postNotice',
	// icon: 'publish-notice',
	// iconDark: 'publish-notice-dark',
	children: [
		{
			name: '全部公告',
			url: '/notice/postNotice',
			module: 'allNotice'
		},
		{
			name: '最新活动',
			url: '/notice/postNotice',
			module: 'newActivity',
			category: 1
		},
		{
			name: '充提暂停/恢复公告',
			url: '/notice/postNotice',
			module: 'depositsNotice',
			category: 2
		},
		{
			name: '现货公告',
			url: '/notice/postNotice',
			module: 'spotNotice',
			category: 3
		},
		{
			name: '合约公告',
			url: '/notice/postNotice',
			module: 'contractNotice',
			category: 4
		},
		{
			name: '跟单公告',
			url: '/notice/postNotice',
			module: 'followNotice',
			category: 5
		},
		{
			name: 'C2C公告',
			url: '/notice/postNotice',
			module: 'c2c',
			category: 6
		},
		{
			name: '其他公告',
			url: '/notice/postNotice',
			module: 'other',
			category: 7
		},

	]


},
{
	name: '最新资讯',
	url: '/notice/postNews',
},
	// {
	// 	name: 'header.system_notifications',
	// 	url: '/notice/systemNotice',
	// 	icon: 'sys-notice',
	// 	iconDark: 'sys-notice-dark',
	// }
]

// 通知菜单
export const postList = [{
	name: '最新公告',
	url: '/post/latestPost'
},
{
	name: '产品动态',
	url: '/post/productDynamics'
},
{
	name: '交易活动',
	url: '/post/tradingActivity'
}
]

// 广告菜单
export const moreC2CList = [{
	name: '成为商家',
	url: '/post/latestPost'
},
{
	name: '发布广告',
	url: '/post/productDynamics'
},
{
	name: '申请退保',
	url: '/post/tradingActivity'
},
{
	name: '申请解禁',
	url: '/post/tradingActivity'
},
]

// 国际化菜单
export const langsOption = [
	{
		value: "cn",
		label: "中文"
	},
	{
		value: "en",
		label: "English"
	},
	{
		value: "tw",
		label: "繁体"
	},
	{
		value: "th",
		label: "ไทย"
	},
	{
		value: "ar",
		label: "عربي"
	},
	{
		value: "pt",
		label: "Brasileiro"
	},
	{
		value: "de",
		label: "Deutsch"
	},
	{
		value: "fr",
		label: "Français"
	},
]

// 订单列表状态
export const statusObj = {
	0: '待支付',
	1: '待放币',
	2: '申诉中',
	3: '已完成',
	4: '取消',
	5: '超时取消',
	6: '申诉后交易最终完成',
	7: '申诉后取消交易',
	8: '用户违规取消',
	9: '商户违规取消',
}

// 订单状态(已完成)
export const statusComplete = [{
	label: '所有状态',
	value: -1
},
{
	label: '已完成',
	value: 3
},
{
	label: '取消',
	value: 4
},
{
	label: '超时取消',
	value: 5
},
{
	label: '申诉后交易最终完成',
	value: 6
},
{
	label: '申诉后取消交易',
	value: 7
},
{
	label: '用户违规取消',
	value: 8
},
{
	label: '商户违规取消',
	value: 9
}
]
// 订单状态(进行中)
export const statusaffot = [{
	label: '所有状态',
	value: -2
},
{
	label: '待支付',
	value: 0
},
{
	label: '待放币',
	value: 1
},
{
	label: '申诉中',
	value: 2
},
]

// 用户审核状态
export const auditStatus = {
	1: '审核通过',
	2: '审核中',
	3: '审核失败',
	4: '已禁止',
	5: '解禁失败',
	6: '解禁申请'
}

// 广场
export const squareList = [
	{
		name: "首页",
		url: "/square/squareHome",
		icon: 's-home',
		iconActive: 's-home-active',
	},
	{
		name: "通知",
		url: "/square/squareNotify",
		icon: 's-notice',
		iconActive: 's-notice-active',
	},
	{
		name: "个人中心",
		url: "/square/squarePersonal",
		icon: 's-persional',
		iconActive: 's-personal-active',
	},
	{
		name: "创作者中心",
		url: "/square/squareCreator",
		icon: 's-creator',
		iconActive: 's-creator-active',
	},
	{
		name: "设置",
		url: "/square/squareSetting",
		icon: 's-setting',
		iconActive: 's-setting-active',
	},
]
