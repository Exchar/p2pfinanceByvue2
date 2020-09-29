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
      nowActiveTab:
        localStorage.getItem("nowActiveTab") !== "/"
          ? JSON.parse(localStorage.getItem("nowActiveTab"))
          : "/home",
      tabItems: localStorage.getItem("tabItems")
        ? JSON.parse(localStorage.getItem("tabItems"))
        : [{ path: "/home", title: "工作台", index: 0 }]
    },
    index: {
      shortcuts:
        localStorage.getItem("shortcuts") !== null
          ? JSON.parse(localStorage.getItem("shortcuts"))
          : [
              {
                icon: "el-icon-user",
                bgColor: "rgb(255,96,71)",
                linkTo: "/userInfoManage",
                title: "个人信息维护"
              },
              {
                icon: "el-icon-plus",
                bgColor: "rgb(89,179,231)",
                linkTo: "/debitManage/addDebitItem",
                title: "新增借款标"
              },
              {
                icon: "el-icon-s-operation",
                bgColor: "rgb(87,137,208)",
                linkTo: "/userInfoManage",
                title: "系统设置"
              },
              {
                icon: "el-icon-s-finance",
                bgColor: "rgb(251,178,37)",
                linkTo: "/userInfoManage",
                title: "资金日志"
              },
              {
                icon: "el-icon-s-data",
                bgColor: "rgb(45,194,219)",
                linkTo: "/userInfoManage",
                title: "平台资金"
              },
              {
                icon: "el-icon-tickets",
                bgColor: "rgb(86,138,208)",
                linkTo: "/userInfoManage",
                title: "用户资金"
              }
            ],
      shortcutsAll:
        sessionStorage.getItem("shortcutsAll") !== ""
          ? JSON.parse(sessionStorage.getItem("shortcutsAll"))
          : [],
      token: ""
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
    },
    //主页里面的快捷功能
    addshortcut(state, load) {
      console.log(load);
      state.index.shortcuts.push({
        icon: load.icon,
        bgColor: load.bgColor,
        linkTo: load.linkTo
      });
    },
    saveShortcutsAll(state, load) {
      console.log(load);
      state.index.shortcutsAll = load;
    },
    saveToken(state, load) {
      state.index.token = load;
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
    },
    getShortcuts(state) {
      console.log("左边菜单", state.index.shortcuts);
      return state.index.shortcuts;
    },
    getShortcutsAll(state) {
      return state.index.shortcutsAll;
    },
    getToken(state) {
      return state.index.token;
    }
  },
  modules: {},
  plugins: [vuexPresient()]
});
