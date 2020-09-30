import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Axios from "axios";
import animated from "animate.css";
import moment from 'moment';
Vue.config.productionTip = false;
Vue.use(ElementUi);
Vue.prototype.$axios = Axios;
Vue.prototype.$moment = moment;
Axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
Vue.use(animated);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
