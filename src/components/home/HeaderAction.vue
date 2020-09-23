<template>
  <div class="main">
    <el-row class="headerMain">
      <el-col :span="4" class="backBtn"
        ><router-link to="/"><i class="el-icon-back"></i></router-link
        >返回工作台</el-col
      >
      <el-col :span="15"></el-col>
      <el-col :span="2"> </el-col>
      <el-col :span="3">
        <el-avatar :size="28" icon="el-icon-user-solid"></el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息维护</el-dropdown-item>
            <el-dropdown-item>帮助</el-dropdown-item>
            <el-dropdown-item>注销</el-dropdown-item>
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
  methods: {},
  data() {
    return {
      username: "用户名"
    };
  }
};
</script>

<style scoped>
.el-col {
  line-height: 60px;
  height: 60px;
  text-align: left;
}
.el-avatar {
  margin-right: 10px;
}
.el-dropdown {
  cursor: pointer;
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
