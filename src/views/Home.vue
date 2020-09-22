<template>
  <div class="main">
    <el-container>
      <el-aside width="200px">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderAction></HeaderAction>
        </el-header>
        <div class="headerTab">
          <HeaderTab></HeaderTab>
        </div>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderAction from "@/components/home/HeaderAction";
import HeaderTab from "@/components/home/HeaderTab";
import LeftMenu from "@/components/home/LeftMenu";
export default {
  name: "Home",
  components: {
    HeaderAction,
    HeaderTab,
    LeftMenu
  }
};
</script>
<style>
body {
  overflow-x: hidden;
}
.main {
  min-width: 800px;
}
.el-header,
.el-footer {
  background-color: aliceblue;
}
.el-aside {
  min-height: 700px;
}
</style>
