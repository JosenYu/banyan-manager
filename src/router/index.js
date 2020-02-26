import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    icon: "el-icon-s-home",
    path: "/",
    name: "首页",
    component: Home
  },
  {
    icon: "el-icon-s-management",
    path: "/stock",
    name: "商品",
    component: () => import("@/views/Stock"),
    children: [
      {
        path: "quantity",
        name: "查询",
        component: () => import("@/components/stock/Quantity"),
        show: true
      },
      {
        path: "purchase",
        name: "采购",
        component: () => import("@/components/stock/Purchase"),
        show: true
      },
      {
        path: "sell",
        name: "出售",
        component: () => import("@/components/stock/Sell"),
        show: true
      },
      {
        path: "detail",
        name: "详情页",
        component: () => import("@/components/stock/Detail")
      },
      {
        path: "model",
        name: "模型",
        show: true,
        component: () => import("@/components/stock/Model")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
