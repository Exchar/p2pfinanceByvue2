import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../Layout/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: []
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../Layout/Home.vue")
  },
  {
    path: "*",
    name: "404",
    component: () => import(/* webpackChunkName: "about" */ "../views/404")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
