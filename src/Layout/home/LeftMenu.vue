<template>
  <div class="leftMenu">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="false"
      :router="true"
      :unique-opened="true"
      :default-active="$route.path"
      active-text-color="#ffffff"
      @select="tabsAction"
    >
      <ActMenu :list="menuData"></ActMenu>
    </el-menu>
  </div>
</template>

<script>
import ActMenu from "@/Layout/home/menu/ActMenu";
import "../../assets/layout/colorWhite.css";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "LeftMenu",
  components: { ActMenu },
  computed: {
    ...mapGetters(["getMenuData", "getHeaderTabs"])
  },
  data() {
    return {
      menuData: this.getMenuData
    };
  },
  created() {
    //根据用户权限获取路由,当前是管理员
    this.menuData = this.getMenuData;
  },
  methods: {
    tabsAction(ment) {
      console.log(ment);
      this.changeNowAct(ment);
      let addItem = true;
      let tabItems = this.getHeaderTabs;
      tabItems.forEach(v => {
        if (v.path === ment) {
          addItem = false;
        }
      });
      addItem ? this.saveTabItem(ment) : "";
    },
    ...mapMutations(["saveLeftMenu", "saveTabItem", "changeNowAct"])
  }
};
</script>

<style scoped>
.logo {
  width: 100%;
}
.logo > img {
  width: 60%;
  margin: auto;
}
.el-radio-group {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
}
.leftMenu,
.leftMenu > ul {
  position: relative;
  box-sizing: border-box !important;
  overflow: hidden;
}
.leftMenu {
  position: relative;
  z-index: 10;
  width: 100%;
}
.leftMenu ul {
  box-shadow: 4px 0 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  min-height: 880px;
  background-color: rgb(33, 38, 60);
}
.el-menu > div {
  width: 200px !important;
}
</style>
