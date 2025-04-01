const postRoutes = [
  {
    name: 'post',
    component: () => import('@/views/layout/postLayout.vue'),
    children: [
      // 最新公告
      {
        path: 'latestPost',
        name: 'latestPost',
        meta: {
          type: 'post'
        },
        component: () => import('@/views/post/latestPost/index.vue')
      },
      // 产品动态
      {
        path: 'productDynamics',
        name: 'productDynamics',
        meta: {
          type: 'post'
        },
        component: () => import('@/views/post/productDynamics/index.vue')
      },
      // 交易活动
      {
        path: 'tradingActivity',
        name: 'tradingActivity',
        meta: {
          type: 'post'
        },
        component: () => import('@/views/post/tradingActivity/index.vue')
      }
    ]
  }
]

export default postRoutes