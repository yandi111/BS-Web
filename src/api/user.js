import {instance} from "@/request/request";
import { post, get } from "@/request";

// 登陆
export const onLogin = data => post(instance, '/bsex-user/login', data)

// 获取唯一标识
export const getCreateToken = data => post(instance, 'bsex-user/login/token/create', data)
export const forgetPassword = data => post(instance, '/bsex-user/forget/password', data)

// 获取用户基本信息
export const infoHome = data  => get(instance, "/bsex-user/user/detail", data)

// 用户资产余额接口
export const getUserCurrency = data => post(instance, '/bsex-finance/asset/total', data)

// 用户提现记录
export const getUserRecordList = data => post(instance, '/bsex-finance/withdrawal/apply/record/page', data)

// 用户提现币种地址接口
export const getUserRecordAddress = chainId => post(instance, `bsex-finance/recharge/address/${chainId}`)

// 用户
export const getUserSupperCoin = data => get(instance, '/bsex-finance/recharge/support/coin/list', data)

// 邀请
export const getShareUser = data => get(instance, '/bsex-user/my/invite', data)

// 所邀请用户列表
export const getShareUserList = data => post(instance, '/bsex-user/my/invite/user/page', data)

export const getUserTransferList = data => post(instance, '/bsex-finance/blockChain/transfer/record/page', data)

// 修改用户信息
export const updateUserInfo = function (data = {}) {
  return post(instance, "/ex/user/info/update", data);
};

// 安全设置-开关状态
export const switchStatus = function (data = {}) {
  return post(instance, "/ex/user/auth/switch/status", data);
};

// 设备管理列表
export const deviceList = function (data = {}) {
  return post(instance, "/ex/user/trust/device/page", data);
};

// 删除设备
export const deviceDel = function (data = {}) {
  return post(instance, "/ex/user/trust/device/delete", data);
};

//修改密码-检查旧密码
export const checkPwd = function (data = {}) {
  return post(instance, "/ex/user/password/check", data);
};
// 修改密码
export const setPwd = function (data = {}) {
  return post(instance, "/ex/user/password/update", data);
};

// 设置资金密码
export const setTradePwd = function (data = {}) {
  return post(instance, "/ex/user/auth/set/trade/pwd", data);
};

// 修改资金密码-校验旧密码并获取认证项
export const checkTradePwd = function (data = {}) {
  return post(instance, "/ex/user/auth/check/trade/pwd", data);
};

// 修改资金密码
export const updateTradePwd = function (data = {}) {
  return post(instance, "/ex/user/auth/update/trade/pwd", data);
};
//忘记资金密码-校验身份
export const verifyIdentity = function (data = {}) {
  return post(instance, "/ex/user/find/funds/password/verify/identity", data);
};

//忘记资金密码-修改密码
export const forgetPwdUpdate = function (data = {}) {
  return post(instance, "/ex/user/find/funds/password/update", data);
};

// 设置防钓鱼码
export const fishingCodeSet = function (data = {}) {
  return post(instance, "/ex/user/fishing/code/set", data);
};

// 创建新谷歌认证密钥(更新谷歌验证器)
export const updateGoogleSecret = function (data = {}) {
  return post(instance, "/ex/user/auth/update/google/auth/secret", data);
};

// 绑定谷歌认证器创建密钥
export const googleFirstApi = function (data = {}) {
  return post(instance, "/ex/user/auth/google/first/create", data);
};

// 绑定谷歌认证(首次绑定) 绑定谷歌认证器绑定密钥
export const bindGoogleFirst = function (data = {}) {
  return post(instance, "/ex/user/auth/google/first", data);
};
// 绑定谷歌认证(修改)
export const bindGoogleSecret = function (data = {}) {
  return post(instance, "/ex/user//auth/confirm/update/google/auth/secret", data);
};

// 创建apikey
export const createApiKey = function (data = {}) {
  return post(instance, "/ex/user/create/api/key", data);
};

// 查询apiKey列表
export const apiKeyList = function (data = {}) {
  return post(instance, "/ex/user/api/key/list", data);
};
// 查看apiKey详情
export const apiDetail = function (data = {}) {
  return post(instance, "/ex/user/api/key/detail", data);
};
// 编辑api
export const apiEdit = function (data = {}) {
  return post(instance, "/ex/user/api/key/update", data);
};

// 删除api
export const apiDelet = function (data = {}) {
  return post(instance, "/ex/user/api/key/delete", data);
};

// api权限选项列表 新
export const $apiPermList = function (data = {}) {
  return post(instance, "/ex/user/v2/api/perm/list", data);
};

// 获取国家列表
export const countryList = function (data = {}) {
  return post(instance, "/ex/user/country/list", data);
};

// 绑定手机
export const bindPhone = function (data = {}) {
  return post(instance, "/ex/user/phone/bind", data);
};

// 更改手机号
export const editPhone = function (data = {}) {
  return instance.post("/ex/user/phone/update", data);
};

// 邮箱绑定-认证绑定
export const bindEmail = function (data = {}) {
  return instance.post("/ex/user/email/bind", data);
};

// 修改邮箱
export const editEmail = function (data = {}) {
  return instance.post("/ex/user/email/update", data);
};

//客户查询公告列表
export const announceListApi = function (data = {}) {
  return instance.post("/ex/user/user/list/announce", data);
};

//首页消息轮播
export const announcementApi = function (data = {}) {
  return instance.post("/ex/user/user/scroll/announcement", data);
};

//偏好设置-我的设置
export const userSettingsApi = function (data = {}) {
  return instance.post("/ex/user/settings", data);
};

//偏好设置-修改设置
export const settingsUpdateApi = function (data = {}) {
  return instance.post("/ex/user/settings/update", data);
};

//登录记录
export const loginRecordApi = data => post(instance, "/ex/user/login/record", data)

//用户操作日志
export const logListApi = data => post(instance, "/ex/user/operate/log/list", data)

// 我的邀请-统计数据
export const myInviteApi = function (data = {}) {
  return instance.post("/ex/user/my/invite", data);
};

// 我的邀请-邀请列表
export const myInviteListApi = function (data = {}) {
  return instance.post("/ex/user/my/invite/user", data);
};

// 帮助中心-教程、常见问题
export const helpSortListApi = function (data = {}) {
  return instance.post("/ex/user/help/list", data);
};

// 帮助中心-最新发布新闻
export const newsListApi = function (data = {}) {
  return instance.post("/ex/user/news/new", data);
};

// 帮助中心-最热门文章
export const newsHotListApi = function (data = {}) {
  return instance.post("/ex/user/news/hot", data);
};

// 帮助中心-搜索
export const newsSearchApi = function (data = {}) {
  return instance.post("/ex/user/user/content", data);
};

// 偏好设置-通知设置开启状态
export const messageSettingApi = function (data = {}) {
  return instance.post("/ex/user/message/setting", data);
};

// 偏好设置-修改消息通知设置
export const messageUpdateApi = function (data = {}) {
  return instance.post("/ex/user/message/setting/update", data);
};

//上传文件
export const uploadFileApi = function (data = {}) {
  return instance.post("/ex/user/file/upload-file", data);
};

// 找回api口令密码-校验登录密码
export const apiKeyCheck = function (data = {}) {
  return instance.post("/ex/user/api/key/reset/check", data);
};
//找回Api口令密码-修改密码
export const apiKeyReset = function (data = {}) {
  return instance.post("/ex/user/api/key/reset", data);
};

// 查看详情
export const helpcontentDetail = function (data = {}) {
  return instance.post("/ex/user/help/detail", data);
};
//新闻详情
export const newsDetail = function (data = {}) {
  return instance.post("/ex/user/user/news", data);
};
//滚动公告（最新五条）
export const scrollAnnouncement = (data = {}) => {
  return instance.post("/ex/user/user/scroll/announcement", data);
};
//判断用户是否为新用户(用于展示引导页)
export const getUserStatus = (data = {}) => {
  return instance.post("/ex/user/guide/status", data);
};
//设置用户状态(用于关闭引导页)
export const setUserStatus = (data = {}) => {
  return instance.post("/ex/user/guide/status/update", data);
};

//新手教程获取tab栏类别
export const helpTabList = (data = {}) => {
  return instance.post("/ex/user/help/tabList", data);
};

//新手教程常见问题
export const helpSecondList = (data = {}) => {
  return instance.post("/ex/user/help/secondList", data);
};
//帮助中心列表
export const $getHelpSort = (data = {}) => {
  return instance.post("/ex/user/user/helpSort/get", data);
};

// 修改用户个人主页详情
export const updateUserDetails = (data = {}) => {
  return instance.post("/ex/user/v2/info/update", data);
};

// 重置手机获取认证选项
export const getPhoneAuthItem = (data = {}) => {
  return instance.post("/ex/user/reset/phone/get-auth-item", data);
};

// 重置邮箱获取认证选项
export const getEmailAuthItem = (data = {}) => {
  return instance.post("/ex/user/reset/email/get-auth-item", data);
};

// 验证重置邮箱验证码
export const resetEmailCheck = (data = {}) => {
  return post(instance, "/ex/user/reset/email/check", data);
};

// 验证重置手机号验证码
export const resetPhoneCheck = (data = {}) => post(instance, "/ex/user/reset/phone/check", data)

// 发送重置绑定验证码 （手机或邮箱）
export const resetBindCaptchaSend = (data = {}) => post(instance, "/ex/user/reset/bind/captcha/send", data)

// 重置更新邮箱
export const resetEmailUpdate = (data = {}) => post(instance, "/ex/user/reset/email/update", data)

// 重置更新手机号
export const resetPhoneUpdate = (data = {}) => post(instance, "/ex/user/reset/phone/update", data)

// 币种
export const getCoinList = () => get(instance, '/bsex-market/coin/list')



// 用户历史列表
export const getUserCoinHistory = (data) => instance.post('/bsex-finance/asset/main/record/page', data)

export const onBindGoogleKey = data => post(instance, '/bsex-user/bind/google/totp/key/bind', data)

export const onBindGoogleTotp = data => post(instance, '/bsex-user/bind/google/totp/key', data)

export const onPinShingCode = data => post(instance, '/bsex-user/set/anti/phishing/code', data)

export const onModifyPass = data => post(instance, '/bsex-user/modify/fund/password', data)

export const ModifyPass = data => post(instance, '/bsex-user/modify/fund/password/check', data)

export const SetPass = data => post(instance, '/bsex-user/set/fund/password', data)

export const SetPassCheck = data => post(instance, '/bsex-user/set/fund/password/check', data)

export const onModifyEmailCheck = data => post(instance, '/bsex-user/modify/email/check', data)

export const onModifyEmail = data => post(instance, '/bsex-user/modify/email', data)

export const onModifyGoogleKey = data => post(instance, '/bsex-user/modify/google/totp/key', data)

export const onModifyGoogleBindKey = data => post(instance, '/bsex-user/modify/google/totp/key/bind', data)

export const ModifyPassCheck = data => post(instance, '/bsex-user/modify/password/check', data)

export const ModifyMobileCheck = data => post(instance, '/bsex-user/modify/phone/check', data)

export const ModifyPassword = data => post(instance, '/bsex-user/modify/phone', data)

export const onBindMobileCheck = data => post(instance, '/bsex-user/bind/phone/check', data)

export const onBindMobileC = data => post(instance, '/bsex-user/bind/phone', data)

export const BindEmailCheck = data => post(instance, '/bsex-user/bind/email/check', data)

export const onBindEmail = data => post(instance, '/bsex-user/bind/email', data)

export const onModifyPassword = data => post(instance, '/bsex-user/modify/password', data)

export const onKycConfigList = data => post(instance, '/bsex-user/kyc/config/list', data)
export const onLogout = data  => get(instance, "/bsex-user/logout", data)

// 提币检查
export const onWithdrawalCheck = data => post(instance, '/bsex-finance/withdrawal/check', data)
// kycDetail
export const onKycDetail = data => post(instance, '/bsex-user/kyc/lv1/detail', data)

export const getAddressType = data => post(instance, '/bsex-user/kyc/lv3/get/address/type', data)


export const onKycLv1Submit = data => post(instance, '/bsex-user/kyc/lv1/submit', data)

export const onKycLv2Submit = data => post(instance, '/bsex-user/kyc/lv2/submit', data)



export const exchangeRecordPage = data => post(instance, '/bsex-finance/asset/fast/exchange/record/page', data)

export const fastExchangeAmount = data => post(instance, '/bsex-finance/asset/fast/exchange/amount', data)

export const assetFastExchange = data => post(instance, '/bsex-finance/asset/fast/exchange', data)

export const onKycLv3Submit = data => post(instance, '/bsex-user/kyc/lv3/submit', data)


export const onModifyUserInfo = data => post(instance, '/bsex-user/modify/user/info', data)

export const onBsexUserVerify = data => post(instance, '/bsex-user/verify', data)



// export const onWithdrawalApply = data => post(instance, '/bsex-finance/withdrawal/apply', data)

// export const onBsexFinanceAssetCoin = data => post(instance, '/bsex-finance/asset/coin', data)

export const onBsexFinanceAssetCoin = (data = {}) => {
  return post(instance, '/bsex-finance/asset/coin', data);
};



export const onWithdrawalApply = (data = {}) => {
  return post(instance, "/bsex-finance/withdrawal/apply", data);
};

// import {onBsexFinanceAssetCoin} from "@/api/user";

// Promise.try(() => {
//   return onBsexFinanceAssetCoin(params)
//  }).then(res => {
//           if (res.code == 200) {
            

//           } else {
//             this.$customMessage(2, res.msg);
//           }
//  }).catch((e)=>{
//   console.log(e);
  
//  })