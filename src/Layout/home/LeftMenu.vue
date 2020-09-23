<template>
  <div class="leftMenu">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="false"
      :router="true"
      :unique-opened="true"
    >
      <div class="logo">
        <img src="../../assets/logo.png" alt="logo" />
      </div>
      <Menu :list="menuData"></Menu>
    </el-menu>
  </div>
</template>

<script>
import Menu from "@/components/home/menu/Menu.vue";
export default {
  name: "LeftMenu",
  comments: {
    Menu
  },
  data() {
    return {
      menuData: []
    };
  },
  created() {
    //根据用户权限获取路由,当前是管理员
    this.$axios
      .get("http://localhost:5900/getLeftMenu")
      .then(res => {
        this.menuData = res.data;
        console.log(this.menuData);
      })
      .catch(err => {
        console.log(err);
        this.$message({
          type: "error",
          message: "请求失败了"
        });
      });
  }
};
</script>

<style scoped>
.logo {
  width: 100%;
}
.logo > img {
  width: 60%;
  margin: auto;
}
.el-radio-group {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
}
.leftMenu {
  position: relative;
  padding-top: 10px;
}
</style>
