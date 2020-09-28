<template>
  <div class="main">
    <el-container>
      <el-header>
        <HeaderAction></HeaderAction>
      </el-header>
      <el-container class="mainBody">
        <!--        侧边栏-->
        <el-aside width="200px">
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main>
          <!--          顶部标签栏-->
          <transition name="slideTo">
            <div class="headerTab" v-show="$route.path !== '/home'">
              <HeaderTab></HeaderTab>
            </div>
          </transition>
          <div class="viewPort">
            <!--            视图窗口-->
            <el-scrollbar class="viewMain">
              <transition name="viewIn">
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
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25), 0 0 6px rgba(0, 0, 0, 0.04);
  height: 98% !important;
}
.viewMain > div {
  transition: all 10s;
}
.viewPort {
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
  box-shadow: 4px 6px 4px rgba(237, 108, 112, 0.4), 0 0 6px rgba(0, 0, 0, 0.1);
}
.viewMain > div > div > div {
  padding: 6px !important;
}
.slideTo-enter-active {
  animation: goIn 0.5s;
}
.slideTo-leave-active {
  animation: goIn 0.5s reverse;
}
@keyframes goIn {
  0% {
    transform: translateY(-80px);
  }
  50% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0);
  }
}
.viewIn-enter-active {
  transition: all 0.3s ease;
}
.viewIn-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.viewIn-enter, .viewIn-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
