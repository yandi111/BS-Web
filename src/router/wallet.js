const walletRoutes = [
  // 总览
  {
    path: '/assetsOverview',
    name: 'assetsOverview',
    meta: {
      type: 'wallet',
      user: true
    },
    component: () => import('@/views/property/assetsOverview/index.vue')
  },
  // 充币
  {
    path: '/deposit',
    name: 'deposit',
    meta: {
      type: 'wallet',
      user: true
    },
    component: () => import('@/views/property/deposit/index.vue')
  },
  // 提币
  {
    path: '/withdrawCoins',
    name: 'withdrawCoins',
    meta: {
      type: 'wallet',
      user: true
    },
    component: () => import('@/views/property/withdrawCoins/index.vue')
  },
  // 闪兑
  {
    path: '/flashExchange',
    name: 'flashExchange',
    meta: {
      type: 'wallet',
      user: true
    },
    component: () => import('@/views/property/flashExchange/index.vue')
  },
  // 资金划转
  {
    path: '/fundsTransfer',
    name: 'fundsTransfer',
    meta: {
      type: 'wallet',
      user: true
    },
    component: () => import('@/views/property/fundsTransfer/index.vue')
  },
  // 资金账户
  {
    path: '/capitalAccount',
    name: 'capitalAccount',
    meta: {
      type: 'wallet',
      user: true
    },
    component: () => import('@/views//property/capitalAccount/index.vue')
  },
  // 合约账户
  {
    path: '/wallet/contractAccount',
    name: 'walletContractAccount',
    meta: {
      type: 'wallet',
      user: true
    },
    component: () => import('@/views/property/contractAccount/index.vue')
  },
  // 现货账户
  {
    path: '/spotAccount',
    name: 'spotAccount',
    meta: {
      type: 'wallet',
      user: true
    },
    component: () => import('@/views/property/spotAccount/index.vue')
  },
  //跟单账户
  {
    path: '/documentaryAccount',
    name: 'documentaryAccount',
    meta: {
      type: 'wallet',
      user: true
    },
    component: () => import('@/views/property/documentaryAccount/index.vue')
  },
]

export default walletRoutes