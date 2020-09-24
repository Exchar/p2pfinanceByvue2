import Vue from "vue";
import Vuex from "vuex";
//引入vuex持久化插件
import vuexPresient from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    home: {
      leftMenu: localStorage.getItem("leftMenu")
        ? JSON.parse(localStorage.getItem("leftMenu"))
        : [],
      nowActiveTab: "/",
      tabItems: localStorage.getItem("tabItems")
        ? JSON.parse(localStorage.getItem("tabItems"))
        : [{ path: "/", title: "工作台", index: 0 }]
    }
  },
  mutations: {
    saveLeftMenu(state, load) {
      state.home.leftMenu = load;
    },
    saveTabItem(state, load) {
      let index = state.home.tabItems.length;
      let isAdd = true;
      let title = "";
      state.home.tabItems.forEach(v => {
        if (v.path === load) {
          isAdd = false;
        }
      });
      state.home.leftMenu.forEach(v => {
        if (v.path === load) {
          title = v.title;
        } else if (v.children.length > 0) {
          v.children.forEach(val => {
            val.path === load ? (title = val.title) : "";
          });
        }
      });
      isAdd
        ? state.home.tabItems.push({
            path: load,
            title: title,
            index: index + load
          })
        : "";
    },
    delTabItem(state, tabPath) {
      let tabIndex = 0;
      state.home.tabItems.forEach((v, i) => {
        if (v.path === tabPath) {
          tabIndex = i;
        }
      });
      let upde = state.home.tabItems.splice(tabIndex, 1);
      console.log(upde);
    },
    changeNowAct(state, load) {
      state.home.nowActiveTab = load;
    }
  },
  actions: {
    commMenu({ commit }) {
      commit("saveLeftMenu");
    },
    commSaveTabItem({ commit }) {
      commit("saveTabItem");
    },
    commDelTabItem({ commit }) {
      commit("delTabItem");
    }
  },
  getters: {
    getHeaderTabs(state) {
      return state.home.tabItems;
    },
    getNowAct(state) {
      return state.home.nowActiveTab;
    },
    getMenuData(state) {
      return state.home.leftMenu;
    }
  },
  modules: {},
  plugins: [vuexPresient()]
});
