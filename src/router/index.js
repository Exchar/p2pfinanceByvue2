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
        path: "/debitManage/details",
        name: "details",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/NotFound")
      },
      {
        path: "/debitManage/secondBidsGroundItems",
        name: "index",
        component: () => import("../views/mark/index")
      },
      {
        path: "/debitManage/reexAuditItems",
        name: "Recheck",
        component: () => import("../views/mark/Recheck")
      },
      {
        path: "/debitManage/index",
        name: "indexs",
        component: () => import("../views/money/index")
      },
      {
        path: "/debitManage/runningBidsItems",
        name: "MarkMange",
        component: () => import("../views/mark/MarkMange")
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
      },
      {
        path: "/debitManage/addDebitItem",
        name: "AddDebitItem",
        component: () => import("../views/debitManage/addDebitItem/Index")
      },
      {
        path: "/debitManage/upholdNewBidItems",
        name: "UpholdNewBidItems",
        component: () => import("../views/debitManage/upholdNewBidItems/Index")
      },
      {
        path: "/debitManage/firstLevelAuditItems",
        name: "FirstLevelAuditItems",
        component: () => import("../views/debitManage/firstLevelAuditItems/Index")
      },
      {
        path: "/details",
        name: "Details",
        component: () => import("../views/debitManage/details/Index")
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
