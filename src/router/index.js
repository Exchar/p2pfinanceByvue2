import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../Layout/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "pageNotFound",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/NotFound")
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
    path: "/about",
    name: "About",
    component: () => import("../Layout/Home.vue")
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
