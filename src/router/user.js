const userRoutes = [
  // 总览
  {
    path: '/overview',
    name: 'overview',
    component: () => import('@/views/userInfo/overview/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/deposit-v2',
    name: 'deposit-v2',
    component: () => import('@/views/userInfo/deposit-v2/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/withdraw-v2',
    name: 'withdraw-v2',
    component: () => import('@/views/userInfo/withdraw-v2/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/Transfer-v2',
    name: 'Transfer-v2',
    component: () => import('@/views/userInfo/Transfer-v2/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/fastExchange',
    name: 'fastExchange',
    component: () => import('@/views/userInfo/fastExchange/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/fastExchangehistory',
    name: 'fastExchangehistory',
    component: () => import('@/views/userInfo/fastExchangehistory/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/fundExchangehistory',
    name: 'fundExchangehistory',
    component: () => import('@/views/userInfo/fundExchangehistory/index.vue'),
    meta: {
      user: true
    }
  },
  // 安全设置
  {
    path: '/securitySetting',
    name: 'securitySetting',
    component: () => import('@/views/userInfo/securitySetting/index.vue'),
    meta: {
      user: true
    }
  },
  {  // 资金账户
    path: '/fundAccount',
    name: 'fundAccount',
    component: () => import('@/views/userInfo/fundAccount/index.vue'),
    meta: {
      user: true
    }
  },
  {  // 合约账户
    path: '/contractAccount',
    name: 'contractAccount',
    component: () => import('@/views/userInfo/contractAccount/index.vue'),
    meta: {
      user: true
    }
  },
  // {  //  现货账户
  //   path: 'stockAccount',
  //   name: 'stockAccount',
  //   component: () => import('@/views/userInfo/stockAccount/index.vue')
  // },
  // 身份验证
  {
    path: '/verifyIdentidy',
    name: 'verifyIdentidy',
    component: () => import('@/views/userInfo/verifyIdentidy/index.vue'),
    meta: {
      user: true
    }
  },
  // 我的邀请
  {
    path: '/rebate',
    name: 'rebate',
    redirect: '/rebatePage',
    // component: () => import('@/views/userInfo/rebate/index.vue')
  },
  // API管理
  {
    path: '/apiManage',
    name: 'apiManage',
    component: () => import('@/views/userInfo/apiManage/index.vue'),
    meta: {
      user: true
    }
  },
  // 偏好设置
  {
    path: '/likeSetting',
    name: 'likeSetting',
    component: () => import('@/views/userInfo/likeSetting/index.vue'),
    meta: {
      user: true
    }
  },
  // 帮助中心
  {
    path: '/helpCenter',
    name: 'helpCenter',
    redirect: '/helpCenterPage',
    // component: () => import('@/views/userInfo/helpCenter/index.vue')
  },
  {
    path: '/rebateInfo',
    name: 'rebateInfo',
    component: () => import('@/views/userInfo/rebateInfo/index.vue'),
    meta: {
      user: true
    }
  },
]

export default userRoutes