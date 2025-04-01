const squareRoutes = [
  {
    name: "square",
    redirect: "/square/squareHome",
    component: () => import("@/views/layout/squareLayout.vue"),
    children: [
      // 首页
      {
        path: "squareHome",
        name: "squareHome",
        meta: {
          type: "square",
          header: true,
          footer: false
        },
        component: () => import("@/views/square/squareHome/index.vue"),
      },
      // 通知
      {
        path: "squareNotify",
        name: "squareNotify",
        meta: {
          type: "square",
        },
        component: () => import("@/views/square/squareNotify/index.vue"),
      },
      {
        path: "squarePersonal",
        name: "squarePersonal",
        meta: {
          type: "square",
        },
        component: () => import("@/views/square/squarePersonal/index.vue"),
      },
      {
        path: "squareCreator",
        name: "squareCreator",
        meta: {
          type: "square",
        },
        component: () => import("@/views/square/squareCreator/index.vue"),
      },
      {
        path: "squareSetting",
        name: "squareSetting",
        meta: {
          type: "square",
        },
        component: () => import("@/views/square/squareSetting/index.vue"),
      },
      {
        path: "detail",
        name: "squareDetail",
        meta: {
          type: "square",
        },
        component: () => import("@/views/square/squareDetail/index.vue"),
      },
      {
        path: "infomation-others",
        name: "infomationOthers",
        meta: {
          type: "square",
        },
        component: () => import("@/views/square/squareOthers/index.vue"),
      },
    ],
  },
];

export default squareRoutes;
