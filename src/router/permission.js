import router from "../router";
import store from "../store";
import NProgress from "nprogress";
// console.log(store);
import "nprogress/nprogress.css";
import { resetRouter } from "../router";
import { getAsyncRoutes } from "@/router/asyncRouter";
import { errorRoute } from "../router";
const whileList = ["/login"];
var update = true;
router.beforeEach(async (to, from, next) => {
  console.log(from, to);
  NProgress.start();
  document.title = to.meta.title;
  //获取token
  const hasToken =await store.getters.getToken == "" ? false : true;
  // console.log("token:" + hasToken);
  if (hasToken) {
    console.log("有没有token", hasToken);
    if (to.path === "/login" || to.path === "/") {
      next({ path: "/home" });
    } else {
      //获取vuex中保存的路由
      let hasRoutes = await store.getters.getState;
      //如果有路由则直接下一步，如果没有则需要获取路由
      //判断是不是点击刷新
      console.log(from.fullPath, to.fullPath);
      console.log("是否有路由", hasRoutes);
      if (hasRoutes && !update) {
        next();
      } else {
        try {
          await resetRouter();
          const accessRoutes = getAsyncRoutes(await store.getters.getRoutes);
          let changedRoutes = accessRoutes.filter(v => {
            return v.path != "/home";
          });
          //在这个下面添加自定义的路由，不要在index.js里面添加
          changedRoutes.push({
            path: "/",
            component: () => import("@/views/home/index"),
            meta: { title: "工作台" },
            name: "index"
          });
          console.log("转换后的路由:", changedRoutes);
          await router.addRoutes([
            {
              path: "/home",
              component: () => import("@/Layout/Home"),
              name: "home",
              children: changedRoutes
            }
          ]);
          await router.addRoutes(errorRoute);
          await store.commit("setNoRefresh");
          update = false;
          next({ ...to, replace: true });
        } catch (error) {
          next(`/login?redirect=${to.path}`);
          console.log(error);
          NProgress.done();
        }
      }
    }
  } else {
    console.log(to.path);
    if (whileList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: `/login?redirect=${to.path}` });
      NProgress.done();
    }
  }
});
router.afterEach(async () => {
  NProgress.done();
  console.log("导航结束");
});
