import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Axios from "axios";
import animated from "animate.css";
import "@/router/permission";
Vue.config.productionTip = false;
Vue.use(ElementUi);
Vue.prototype.$axios = Axios;
Axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
Vue.use(animated);
Axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    let token = store.getters.getToken;
    // eslint-disable-next-line no-prototype-builtins
    if (!config.headers.hasOwnProperty("Authorization") && token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
