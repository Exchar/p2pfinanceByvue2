import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
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
