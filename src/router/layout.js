const layoutRoutes = [
  {
    name: 'comLayout',
    redirect: '/comLayout/squarePublish',
    component: () => import('@/views/layout/layout.vue'),
    children: [
      // 广场发布文章
      {
        path: 'squarePublish',
        name: 'squarePublish',
        component: () => import('@/views/square/squarePublish/index.vue')
      },

    ]
  }
]

export default layoutRoutes