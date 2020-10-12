<template>
  <div class="main" ref="appView" id="appView">
    <el-container>
      <div ref="view" id="view" style="width: 100%">
        <el-header ref="header" id="header">
          <HeaderAction></HeaderAction>
        </el-header>
        <el-container
          class="mainBody"
          ref="mainBody"
          id="mainBody"
          style="width: 100%"
        >
          <!--        侧边栏-->
          <el-aside width="200px">
            <LeftMenu></LeftMenu>
          </el-aside>
          <el-main>
            <!--          顶部标签栏-->
            <transition name="slideTo">
              <div
                class="headerTab"
                v-show="$route.path !== '/home' && $route.path !== '/home/'"
              >
                <HeaderTab></HeaderTab>
              </div>
            </transition>
            <div>
              <Bread v-if="breadRefresh"></Bread>
            </div>
            <div class="viewPort" ref="port">
              <!--            视图窗口-->
              <el-scrollbar class="viewMain" ref="viewMain">
                <transition name="viewIn">
                  <router-view></router-view>
                </transition>
              </el-scrollbar>
              <!--              底部的版权声明-->
            </div>
            <p style="text-align: center;margin-top: 8px;font-size:0.8em;">
              &copy;惠众借贷版权所有
            </p>
          </el-main>
        </el-container>
      </div>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderTab from "@/Layout/home/HeaderTab";
import HeaderAction from "@/Layout/home/HeaderAction";
import LeftMenu from "@/Layout/home/LeftMenu";
import Bread from "@/Layout/home/Bread";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    HeaderAction,
    HeaderTab,
    LeftMenu,
    Bread
  },
  data() {
    return {
      breadRefresh: true,
      outerHeight: window.outerHeight,
      nowPage: this.$route
    };
  },
  methods: {
    ...mapMutations(["changeNowAct"])
  },
  computed: {
    ...mapGetters(["getMenuData", "getNowAct"])
  },
  created() {
    this.changeNowAct(this.$route.path);
  },
  watch: {
    //监听页面变化
    getNowAct: function() {
      this.breadRefresh = false;
      let viewPort = this.$refs.port;
      if (this.getNowAct === "/home") {
        viewPort.style.height = "91%";
        viewPort.style.backgroundColor = "rgb(240,240,242)";
      } else {
        viewPort.style.height = "86%";
        viewPort.style.backgroundColor = "#ffffff";
      }
      this.$nextTick(() => {
        this.breadRefresh = true;
      });
    },
    //监听高度变化
    outerHeight: function() {
      let appView = this.$refs.appView;
      let view = this.$refs.view;
      appView.style.height = window.outerHeight + "px";
      view.style.height = window.outerHeight + "px";
      let mainBody = this.$refs.mainBody.$el;
      console.log(
        parseFloat(appView.style.height) -
          parseFloat(this.$refs.header.$el.style.height)
      );
      mainBody.style.height =
        parseFloat(appView.style.height) -
        parseFloat(window.getComputedStyle(this.$refs.header.$el).height) -
        22 +
        "px";
    }
  },
  mounted() {
    console.log(document.body.clientHeight);
    let that = this;
    let appView = this.$refs.appView;
    let view = this.$refs.view;
    appView.style.height = document.documentElement.clientHeight + "px";
    view.style.height = document.documentElement.clientHeight + "px";
    let mainBody = this.$refs.mainBody.$el;
    console.log(
      parseFloat(appView.style.height) -
        parseFloat(this.$refs.header.$el.style.height)
    );
    mainBody.style.height =
      parseFloat(appView.style.height) -
      parseFloat(this.$refs.header.$el.style.height) -
      22 +
      "px";

    //定义窗口大小改变监听事件
    window.onresize = () => {
      return (() => {
        that.outerHeight = window.outerHeight;
      })();
    };
  }
};
</script>
<style scoped>
.viewMain {
  box-shadow:  0 0 6px rgba(0, 0, 0, 0.25), 0 0 6px rgba(0, 0, 0, 0.04);
  height: 100% !important;
  background-color: #ffffff;
}
.viewMain > div {
  transition: all 10s;
}
.viewPort {
  height: 91%;
  box-sizing: border-box;
  padding: 14px;
  background-color:rgb(240, 240, 242) !important;
}
.main {
  background-color: rgb(240, 240, 242);
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
  height: 100%;
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
  padding: 6px 10px 6px 6px !important;
}
.slideTo-enter-active {
  animation: goIn 0.5s;
}
.slideTo-leave-active {
  animation: goIn 0.1s reverse;
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
.viewIn {
  position: relative;
}
.bread {
  margin: 14px 0 0 20px;
  vertical-align: middle;
}
.el-breadcrumb {
  line-height: 14px !important;
  vertical-align: bottom !important;
}
.el-breadcrumb__item {
  vertical-align: bottom !important;
}
.el-breadcrumb__inner {
  vertical-align: bottom !important;
}
.footer {
  font-size: 2em;
}

</style>
