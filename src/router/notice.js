const userRoutes = [
  {
    name: 'notice',
    component: () => import('@/views/layout/noticeLayout.vue'),
    children: [
      // 全部通知
      {
        path: 'wholeNotice',
        name: 'wholeNotice',
        meta: {
          type: 'notice'
        },
        component: () => import('@/views/notice/wholeNotice/index.vue')
      },
      // 公告通知
      {
        path: 'postNotice',
        name: 'postNotice',
        meta: {
          type: 'notice'
        },
        component: () => import('@/views/notice/postNotice/index.vue'),
      },
      //最新资讯
      {
        path: 'postNews',
        name: 'postNews',
        meta: {
          type: 'notice'
        },
        component: () => import('@/views/notice/postNews/index.vue')
      },
      // 系统通知
      {
        path: 'systemNotice',
        name: 'systemNotice',
        meta: {
          type: 'notice'
        },
        component: () => import('@/views/notice/systemNotice/index.vue')
      },
    ]
  }
]

export default userRoutes