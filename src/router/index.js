import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    icon: "el-icon-s-home",
    path: "/",
    name: "主页",
    component: Home
  },
  // {
  //   icon: "el-icon-tickets",
  //   path: "/detail",
  //   name: "详情页",
  //   component: () => import("@/views/Detail")
  // },
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
        path: "in",
        name: "入库",
        component: () => import("@/components/commodity/In"),
        show: true
      },
      {
        path: "out",
        name: "出库",
        component: () => import("@/components/commodity/Out"),
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
