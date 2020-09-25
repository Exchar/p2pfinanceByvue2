<template>
  <div class="main">
    <el-row class="headerMain">
      <el-col :span="8" class="headerInfo">
        <div>
          <img src="../../assets/logo.png" alt="惠众借贷" />
        </div>
        <span>后台管理系统</span>
      </el-col>
      <el-col :span="7"></el-col>
      <el-col :span="9">
        <el-breadcrumb separator="|">
          <el-breadcrumb-item>
            <el-input placeholder="搜索" size="mini" class="searchInp">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <el-badge :value="5" class="item">
              <i class="el-icon-s-comment"></i>
            </el-badge>
            <el-badge>
              <i class="el-icon-question"></i>
            </el-badge>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <el-dropdown>
              <span class="el-dropdown-link">
                <span>{{ username }}</span
                >欢迎登录<i
                  class="el-icon-caret-bottom
 el-icon--right"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息维护</el-dropdown-item>
                <el-dropdown-item>帮助</el-dropdown-item>
                <el-dropdown-item>注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-avatar :size="40" icon="el-icon-user-solid"></el-avatar>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "../../assets/layout/headeAction.css";
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
.searchInp {
  width: 160px;
  border-radius: 20px;
}
.headerInfo > div {
  display: inline-block;
  height: 40px;
  margin-right: 10px;
}
.headerInfo img {
  height: 100%;
  vertical-align: middle;
}
.headerInfo span {
  display: inline-block;
  height: 30px;
  vertical-align: middle;
  font-size: 1.4em;
  border-left: 1px solid gray;
  padding-left: 10px;
}
.el-col {
  text-align: left;
  height: 40px;
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
  margin-left: 10px;
}
.main {
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: 2px solid rgb(237, 108, 112);
}
.el-breadcrumb__item {
  height: 40px;
  line-height: 40px;
}
.el-badge {
  font-size: 20px;
  margin: 0 10px;
}
.el-breadcrumb {
  height: 40px;
  line-height: 40px;
}
.el-dropdown-link > span {
  margin-right: 10px;
  color: rgb(231, 78, 79);
  font-weight: 700;
}
</style>
