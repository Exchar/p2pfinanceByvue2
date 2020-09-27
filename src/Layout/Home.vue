<template>
  <div class="main">
    <el-container>
      <el-header>
        <HeaderAction></HeaderAction>
      </el-header>
      <el-container class="mainBody">
        <el-aside width="200px">
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main>
          <div class="headerTab">
            <HeaderTab></HeaderTab>
          </div>
          <div class="viewPort">
            <el-scrollbar class="viewMain">
              <transition name="fade" mode="out-in" appear>
                <router-view></router-view>
              </transition>
            </el-scrollbar>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderTab from "@/Layout/home/HeaderTab";
import HeaderAction from "@/Layout/home/HeaderAction";
import LeftMenu from "@/Layout/home/LeftMenu";
import { mapMutations } from "vuex";
export default {
  name: "Home",
  components: {
    HeaderAction,
    HeaderTab,
    LeftMenu
  },
  methods: {
    ...mapMutations(["changeNowAct"])
  },
  created() {
    this.changeNowAct(this.$route.path);
  }
};
</script>
<style scoped>
.viewMain {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
}
.viewPort{
  height: 100%;
}
.main {
  background-color: rgb(240, 240, 242);
}
.mainBody {
  height: 100%;
}
.el-main {
  padding: 0;
  overflow: hidden;
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
  background-color: rgba(33, 38, 60, 0) !important;
  overflow: hidden;
  height: 100%;
}
.viewPort {
  padding: 10px;
}
.el-header {
  border-bottom: 2px solid rgb(237, 108, 112);
  box-sizing: content-box;
  box-shadow: 4px 2px 4px rgba(237, 108, 112, 0.4), 0 0 6px rgba(0, 0, 0, 0.04);
}
.viewMain>div>div>div{
  padding: 6px !important;
}
</style>
