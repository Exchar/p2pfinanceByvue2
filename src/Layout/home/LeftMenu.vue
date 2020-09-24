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
    this.$axios
      .get("http://172.16.5.207:5900/getLeftMenu")
      .then(res => {
        this.menuData = [...res.data];
        this.saveLeftMenu([...res.data]);
        console.log(this.menuData);
      })
      .catch(err => {
        console.log(err);
        this.$message({
          type: "error",
          message: "请求失败了"
        });
      });
    this.$axios
      .post("/api/finance/borrowing/allLoan/investmentRecord")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        this.$message({
          type: "error",
          message: "请求失败了"
        });
      });
  },
  methods: {
    tabsAction(ment) {
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
  background-color: rgb(203, 36, 43);
  box-sizing: border-box !important;
  overflow: hidden;
  padding-top: 3px;
}
</style>
