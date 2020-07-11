import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
Vue.use(VueRouter);

const routes = [
  {
    icon: "el-icon-s-home",
    path: "/",
    name: "首页",
    show: true,
    component: Home
  },
  // 库存
  {
    icon: "el-icon-s-management",
    path: "/stock",
    name: "库存",
    component: () => import("@/views/stock/Stock"),
    children: [
      {
        path: "quantity",
        name: "查询",
        component: () => import("@/views/stock/child/Quantity"),
        show: true
      },
      {
        path: "purchase",
        name: "采购",
        component: () => import("@/views/stock/child/Purchase"),
        show: true
      },
      {
        path: "sell",
        name: "出售",
        component: () => import("@/views/stock/child/Sell"),
        show: true
      },
      {
        path: "detail",
        name: "详情页",
        component: () => import("@/views/stock/child/detail/Index")
      },
      {
        path: "model",
        name: "模型",
        show: true,
        component: () => import("@/views/stock/child/Model")
      }
    ]
  },
  {
    icon: "el-icon-s-custom",
    path: "/customer",
    name: "客户",
    component: () => import("@/views/customer/Customer"),
    children: [
      {
        path: "importer",
        name: "进货商",
        show: true,
        component: () => import("@/views/customer/child/Importer")
      },
      {
        path: "exporter",
        name: "出货商",
        show: true,
        component: () => import("@/views/customer/child/Exporter")
      }
    ]
  },
  {
    icon: "el-icon-s-home",
    path: "/login",
    name: "登入",
    component: () => import("../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// *前置路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  if (to.path === "/login") {
    store.commit("setLogin", false);
    next();
  } else {
    if (!sessionStorage.getItem("token")) {
      store.commit("setLogin", false);
      next("/login");
    } else {
      store.commit("setLogin", true);
      next();
    }
  }
});

export default router;
