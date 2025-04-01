const informationRoutes = [
  {
    name: 'information',
    redirect: '/information/compliance',
    component: () => import('@/views/layout/informationLayout.vue'),
    children: [
      //账户指引
      {
        path: 'accountGuidelines',
        name: 'accountGuidelines',
        component: () => import('@/views/information/accountGuidelines/index.vue')
      },
      //相关协议
      {
        path: 'compliance',
        name: 'compliance',
        component: () => import('@/views/information/compliance/index.vue'),
      },
    ]
  }
]

export default informationRoutes