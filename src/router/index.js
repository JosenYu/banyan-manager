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
  // 库存
  {
    icon: "el-icon-s-management",
    path: "/stock",
    name: "库存",
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
        component: () => import("@/components/stock/detail/Index")
      },
      {
        path: "model",
        name: "模型",
        show: true,
        component: () => import("@/components/stock/Model")
      }
    ]
  },
  {
    icon: "el-icon-s-custom",
    path: "/customer",
    name: "客户",
    component: () => import("@/views/Customer"),
    children: [
      {
        path: "importer",
        name: "进货商",
        show: true,
        component: () => import("@/components/customer/Importer")
      },
      {
        path: "exporter",
        name: "出货商",
        show: true,
        component: () => import("@/components/customer/Exporter")
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
