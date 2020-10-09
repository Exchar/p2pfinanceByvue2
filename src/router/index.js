import Vue from "vue";
import Router from "vue-router";
// import Layout from "@/Layout";
import Login from "@/views/Login";
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export const constRouters = [
  {
    path: "/login",
    component: Login,
    hidden: true,
    name: "login"
  }
];
const createRouter = () =>
  new Router({
    mode: "history",
    routes: constRouters
  });

const index = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  index.matcher = newRouter.matcher;
}
export const errorRoute = [
  {
    name: "login",
    path: "/login",
    component: () => import("../views/Login")
  }
];
export default index;
