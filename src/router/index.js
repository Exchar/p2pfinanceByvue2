import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
/*import Maintenance from "../views/mark/Maintenance";*/

Vue.use(VueRouter);

const routes = [
  /* {
    path: "/",
    name: "Maintenance",
    component: Maintenance,
    children: []
  },*/
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
        name: "index",
        component: () => import("../views/home/index")
      },
      {
        path: "/debitManage/addDebitItem",
        name: "addDebitItem",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/NotFound")
      },
      {
        path: "/debitManage/secondBidsGroundItems",
        name: "index",
        component: () => import("../views/debitManage/secondBidsGroundItems/index"),

      },
      {
        path: "/debitManage/reexAuditItems",
        name: "Recheck",
        component: () => import("../views/debitManage/reexAuditItems/index")
      },
      {
        path: "/debitManage/RecheckAction",
        name: "RecheckAction",
        component: () => import("../views/debitManage/reexAuditItems/RecheckAction")
      },
      {
        path: "/debitManage/Maintenance",
        name: "Maintenance",
        component: () => import("../views/debitManage/secondBidsGroundItems/Maintenance")
      },
      {
        path: "/debitManage/index",
        name: "index",
        component: () => import("../views/money/index")
      },
      {
        path: "/debitManage/runningBidsItems",
        name: "MarkMange",
        component: () => import("../views/debitManage/runningBidsItems/index")
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
        path: "/memberManage/investUserManage",
        name: "DebitItems",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/memberManage/debitUserManage/index"
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
  },
  {
    path: "/Investment",
    name: "Investment",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/rest/Investment.vue"
      )
  },
  {
    path: "/index",
    name: "index",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/memberManage/investUserManage/index.vue"
      )
  },
  {
    path: "/Modify",
    name: "Modify",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/rest/Modify.vue")
  },
  {
    path: "/Pwd",
    name: "Pwd",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/rest/Pwd.vue")
  },
  {
    path: "/LoanUser",
    name: "LoanUser",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/rest/LoanUser.vue")
  },
  {
    path: "/index1",
    name: "index1",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/memberManage/debitUserManage/index.vue"
      )
  },
  {
    path: "/BwUser1",
    name: "BwUser1",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/rest/BwUser1.vue")
  },
  {
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
