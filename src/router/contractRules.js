const contractRulesRoutes = [
  {
    name: "contractRules",
    redirect: "/contractRules/currencyIntroduction",
    component: () => import("@/views/layout/contractLayout.vue"),
    children: [
      //币种简介
      {
        path: "currencyIntroduction",
        name: "currencyIntroduction",
        component: () =>
          import(
            "@/views/contractTransaction/contractRules/currencyIntroduction/index.vue"
          ),
      },
      //交易规则
      {
        path: "tradingRules",
        name: "tradingRules",
        component: () =>
          import(
            "@/views/contractTransaction/contractRules/tradingRules/index.vue"
          ),
      },
      //资金费率历史
      {
        path: "fundingRate",
        name: "fundingRate",
        component: () =>
          import(
            "../views/contractTransaction/contractRules/fundingRate/index.vue"
          ),
      },
      //杠杆与保证金
      {
        path: "leverageMargin",
        name: "leverageMargin",
        component: () =>
          import(
            "../views/contractTransaction/contractRules/leverageMargin/index.vue"
          ),
      },
    ],
  },
  {
    name: "rulesAll",
    path: "/rulesAll",
    component: () =>
      import(
        "../views/contractTransaction/contractRules/tradingRules/rulesAll.vue"
      ),
  },
];

export default contractRulesRoutes;
