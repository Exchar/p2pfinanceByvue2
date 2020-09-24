<template>
  <div class="leftMenu">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="false"
      :router="true"
      :unique-opened="true"
    >
      <ActMenu :list="menuData"></ActMenu>
    </el-menu>
  </div>
</template>

<script>
import ActMenu from "@/Layout/home/menu/ActMenu";
import "../../assets/layout/colorWhite.css";
export default {
  name: "LeftMenu",
  components: { ActMenu },
  data() {
    return {
      menuData: []
    };
  },
  created() {
    console.log(this.$route);
    //根据用户权限获取路由,当前是管理员
    this.$axios
      .get("http://172.16.5.207:5900/getLeftMenu")
      .then(res => {
        this.menuData = [...res.data];
        console.log(this.menuData);
      })
      .catch(err => {
        console.log(err);
        this.$message({
          type: "error",
          message: "请求失败了"
        });
      });
  },
  mounted() {
    this.$axios
      .post("/api/finance/borrowing/allLoan/investmentRecord")
      .then(res => {
        console.log(res);
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
.leftMenu,
.leftMenu > ul {
  position: relative;
  padding-top: 10px;
  background-color: rgb(203, 36, 43);
}
</style>
