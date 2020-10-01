<template>
  <div id="app">
    <transition name="el-fade-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  created() {
    this.setRefresh();
    console.log("app.vue的created周期函数");
  },
  mounted() {

  },
  methods: {
    ...mapMutations(["setRefresh"])
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}
body,
html {
  padding: 0 !important;
  margin: 0;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-header {
  height: 80px !important;
}
.el-header {
  height: 80px !important;
}
body {
  overflow: hidden;
}
</style>
