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
  },
  mounted() {},
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
  height: 100%;
  position: relative;
}
body,
html {
  padding: 0 !important;
  margin: 0;
  height: 100%;
}
.viewMain > .el-scrollbar__bar.is-horizontal {
  display: none;
}
.viewMain > .el-scrollbar__wrap {
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: scroll;
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
.el-table {
  min-height: 420px !important;
  margin-top: 10px;
}
.el-table td,.el-table td.is-center{
  text-align: center !important;
}
.el-table th{
  text-align: center !important;
}
.el-pagination{
  text-align: center !important;
  margin-top: 20px;
}
.el-table::before{
  height: 0 !important;
}
</style>
