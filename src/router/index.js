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
        path: "/memberManage/debitUserManage",
        name: "DebitItems",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/memberManage/investUserManage/index"
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
    path: "/BwUser2",
    name: "BwUser2",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/rest/BwUser2.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
