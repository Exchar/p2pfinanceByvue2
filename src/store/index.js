import Vue from "vue";
import Vuex from "vuex";
//引入vuex持久化插件
import vuexPresient from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    home: {
      routes: localStorage.getItem("routes")
        ? JSON.parse(localStorage.getItem("routes"))
        : [],
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
      shortcutsInit: [
        {
          icon: "el-icon-user",
          bgColor: "rgb(255,125,109)",
          path: "/userInfoManage",
          title: "个人信息维护"
        },
        {
          icon: "el-icon-plus",
          bgColor: "rgb(89,179,231)",
          path: "/debitManage/addDebitItem",
          title: "新增借款标"
        },
        {
          icon: "el-icon-s-operation",
          bgColor: "rgb(87,137,208)",
          path: "/systemConfig",
          title: "系统设置"
        },
        {
          icon: "el-icon-s-finance",
          bgColor: "rgb(251,178,37)",
          path: "/capitalManage/userCapital",
          title: "用户资金"
        },
        {
          icon: "el-icon-s-data",
          bgColor: "rgb(45,194,219)",
          path: "/capitalManage/platformCapitalLog",
          title: "平台资金"
        },
        {
          icon: "el-icon-tickets",
          bgColor: "rgb(86,138,208)",
          path: "/debitManage/debitCategory",
          title: "管理标类别"
        }
      ],
      shortcutsAll:
        sessionStorage.getItem("shortcutsAll") !== ""
          ? JSON.parse(sessionStorage.getItem("shortcutsAll"))
          : [],
      shortCutsIcons: [
        "el-icon-coin",
        "el-icon-money",
        "el-icon-set-up",
        "el-icon-bangzhu",
        "el-icon-full-screen",
        "el-icon-guide",
        "el-icon-data-analysis",
        "el-icon-pie-chart"
      ],
      bgColors: [
        "rgb(86,138,208)",
        "rgb(45,194,219)",
        "rgb(251,178,37)",
        "rgb(87,137,208)",
        "rgb(89,179,231)",
        "rgb(255,125,109)"
      ],
      shortcuts: localStorage.getItem("shortcuts")
        ? JSON.parse(localStorage.getItem("shortcuts"))
        : [],
      shortDefaultChecked: [],
      token: ""
    },
    bidInfo: {},
    reexInfo: {},
    name: "",
    hasRoutes: false
  },
  mutations: {
    saveLeftMenu(state, load) {
      state.home.leftMenu = load;
    },
    setDefaultChecked(state, load) {
      state.index.shortDefaultChecked = load;
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
          title = v.name;
        } else if (v.children.length > 0) {
          v.children.forEach(val => {
            if (val.path === load) {
              title = val.name;
            } else if (val.children.length > 0) {
              val.children.forEach(value => {
                value.path === load ? (title = value.name) : "";
              });
            }
          });
        }
      });
      isAdd
        ? state.home.tabItems.push({
            path: load,
            title: title,
            index: "" + index
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
      state.home.tabItems.splice(tabIndex, 1);
    },
    changeNowAct(state, load) {
      state.home.nowActiveTab = load;
    },
    //主页里面的快捷功能
    addshortcut(state, load) {
      console.log(load);
      state.index.shortcuts = load;
    },
    saveRoutes(state, load) {
      state.home.routes = load;
    },
    saveShortcutsAll(state, load) {
      console.log(load);
      state.index.shortcutsAll = load;
    },
    saveToken(state, load) {
      state.index.token = load;
    },
    saveBidInfo(state, load) {
      state.bidInfo = load;
    },
    saveReexInfo(state, load) {
      state.reexInfo = load;
    },
    setNoRefresh(state) {
      state.hasRoutes = true;
    },
    setRefresh(state) {
      state.hasRoutes = false;
    },
    saveName(state, load) {
      state.index.name = load;
    },
    clearShort(state) {
      state.index.shortcuts = [];
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
    },
    saveRoutes({ commit }) {
      commit("saveRoutes");
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
      //console.log("左边菜单", state.index.shortcuts);
      return state.index.shortcuts;
    },
    getShortcutsAll(state) {
      return state.index.shortcutsAll;
    },
    getToken(state) {
      return state.index.token;
    },
    getBid(state) {
      return state.bidInfo;
    },
    getMainten(state) {
      return { ...state.bidInfo, ...state.reexInfo };
    },
    getRoutes(state) {
      let newArr = [...state.home.routes];
      newArr.forEach((v, i) => {
        if (v.path != "/home") {
          newArr[i].component = resolve =>
            require([`../views` + v.path + `/index`], resolve);
        } else {
          newArr[i].component = resolve => require([`../Layout/Home`], resolve);
        }
      });
      return newArr;
    },
    getState(state) {
      return state.hasRoutes;
    },
    getName(state) {
      return state.index.name;
    },
    getShortCutsIcon(state) {
      return state.index.shortCutsIcons;
    },
    getShortCutsColor(state) {
      return state.index.bgColors;
    },
    getShortCutsInit(state) {
      return state.index.shortcutsInit;
    },
    getShortDefaultChecked(state) {
      return state.index.shortDefaultChecked;
    }
  },
  modules: {},
  plugins: [vuexPresient()]
});
