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
          import(/* webpackChunkName: "about" */ "../views//ptwop/Index.vue")
      },
      {
        path: "/debitManage/investRecords",
        name: "DebitItems",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views//ptwop/InvestRecords.vue"
          )
      },
      {
        path: "/debitManage/debitCategory",
        name: "DebitItems",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views//ptwop/DebitCategory.vue"
          )
      }
    ]
  },
  {
    path: "*",
    name: "pageNotFound",
    component: () => import(/* webpackChunkName: "about" */ "../views/NotFound")
  },
  {
    path: "/newLoans",
    name: "newLoans",
    component: () => import("../views/debitManage/newLoans/Index")
  },
  {
    path: "/standard",
    name: "Standard",
    component: () => import("../views/debitManage/newStandard/Index")
  },
  {
    path: "/loanReview",
    name: "LoanReview",
    component: () => import("../views/debitManage/loanReview/Index")
  },
  {
    path: "/loanDetails",
    name: "LoanDetails",
    component: () => import("../views/debitManage/loanDetails/Index")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
