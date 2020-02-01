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
    path: "/commodity",
    name: "商品",
    component: () => import("@/views/CommodityState"),
    children: [
      {
        path: "quantity",
        name: "查询",
        component: () => import("@/components/commodity/Quantity"),
        show: true
      },
      {
        path: "purchase",
        name: "采购",
        component: () => import("@/components/commodity/purchase"),
        show: true
      },
      {
        path: "sell",
        name: "出售",
        component: () => import("@/components/commodity/sell"),
        show: true
      },
      {
        path: "detail",
        name: "详情页",
        component: () => import("@/components/commodity/Detail")
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
