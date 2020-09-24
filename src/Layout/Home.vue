<template>
  <div class="main">
    <el-container>
      <el-header>
        <HeaderAction></HeaderAction>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main>
          <div class="headerTab">
            <HeaderTab></HeaderTab>
          </div>
          <el-scrollbar class="viewMain">
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderTab from "@/Layout/home/HeaderTab";
import HeaderAction from "@/Layout/home/HeaderAction";
import LeftMenu from "@/Layout/home/LeftMenu";
export default {
  name: "Home",
  components: {
    HeaderAction,
    HeaderTab,
    LeftMenu
  }
};
</script>
<style scoped>
.main {
  background-color: rgb(240, 240, 242);
}
.el-main {
  padding: 0;
  overflow: hidden;
}
.headerTab {
  padding-left: 5px !important;
}
body {
  overflow: hidden;
}
.viewMain.el-scrollbar > div,
.viewMain.el-scrollbar {
  height: 740px;
}
.main {
  min-width: 1350px;
}
.el-header {
  box-sizing: border-box;
}
.el-aside {
  min-height: 800px;
  background-color: rgb(203, 36, 43);
  overflow: hidden;
}
</style>
