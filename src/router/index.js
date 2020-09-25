import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../Layout/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [ {
      path: "/",
      name: "Index",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    }
  ]
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
        import(/* webpackChunkName: "about" */ "../views//ptwop/InvestRecords.vue")
      },
      {
        path: "/debitManage/debitCategory",
        name: "DebitItems",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views//ptwop/DebitCategory.vue")
        },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../Layout/Home.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
