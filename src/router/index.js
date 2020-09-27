import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    children: []
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../Layout/Home"),
    children: [
      {
        path: "/",
        name: "pageNotFound",
        component: () => import("../views/NotFound")
      },
      {
        path: "/debitManage/addDebitItem",
        name: "addDebitItem",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/NotFound")
      },
      {
        path: "/MarkOn",
        name: "MarkOn",
        component: () => import("../views/mark/MarkOn")
      },
      {
        path: "/debitManage/debitItems",
        name: "DebitItems",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/debitManage/debitItems/index.vue"
          )
      },
      {
        path: "/debitManage/investRecords",
        name: "DebitItems",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/debitManage/investRecords/index.vue"
          )
      },
      {
        path: "/debitManage/debitCategory",
        name: "DebitItems",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/debitManage/debitCategory/index.vue"
          )
      },
      {
        path: "/repaymentManage/repaymentItems",
        name: "repaymentItems",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/repaymentManage/repaymentItems/index"
          )
      },
      {
        path: "/repaymentManage/repaymentRecords",
        name: "repaymentRecords",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/repaymentManage/repaymentRecords/index"
          )
      }
    ]
  },
  {
    path: "*",
    name: "pageNotFound",
    component: () => import(/* webpackChunkName: "about" */ "../views/NotFound")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
