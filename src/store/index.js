import Vue from "vue";
import Vuex from "vuex";
//引入vuex持久化插件
import vuexPresient from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    home: {
      leftMenu: []
    }
  },
  mutations: {
    saveLeftMenu(state, load) {
      console.log(this);
      state.home.leftMenu = load.menuData;
    }
  },
  actions: {
    commMenu({ commit }) {
      commit("saveLeftMenu");
    }
  },
  modules: {},
  plugins: [vuexPresient()]
});
