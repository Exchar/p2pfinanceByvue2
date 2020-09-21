<template>
  <div class="main">
    <el-row class="headerMain">
      <el-col :span="4" class="backBtn"
        ><router-link to="/"><i class="el-icon-back"></i></router-link
        >返回工作台</el-col
      >
      <el-col :span="14"></el-col>
      <el-col :span="2">
        <el-row>
          <el-col :span="8">1</el-col>
          <el-col :span="8">2</el-col>
          <el-col :span="8">3</el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  computed: {},
  methods: {}
};
</script>

<style scoped>
.el-col {
  line-height: 60px;
  height: 60px;
  text-align: left;
}
.backBtn i {
  font-size: 24px !important;
  vertical-align: middle;
  margin-right: 6px;
}
.backBtn a:active {
  color: #409eff;
}
.backBtn {
  vertical-align: top;
}
.el-avatar {
  vertical-align: middle;
}
</style>
