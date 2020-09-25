<template>
  <div class="loginMain">
    <div class="zhezhao">
      <el-carousel
        height="100%"
        class="mainCar"
        indicator-position="none"
        arrow="never"
        :interval="6000"
      >
        <el-carousel-item v-for="item in imgData" :key="item.index">
          <img :src="item.url" alt="图片" />
        </el-carousel-item>
      </el-carousel>
      <div class="logoBox">
        <img src="../assets/logo.png" alt="" />
        <span>惠众借贷后台管理系统</span>
      </div>
      <div class="middleBox">
        <el-card class="box-card">
          <h1>一切都是为了更好的沟通</h1>
        </el-card>
      </div>
      <div class="rightCard">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="text-align: center">
            <span>尊敬的用户，请登录</span>
          </div>
          <el-form label-position="right" label-width="80px" :model="formData">
            <el-form-item label="用户名:">
              <el-input v-model="formData.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input v-model="formData.userPwd"></el-input>
            </el-form-item>
          </el-form>
          <div class="subBtns">
            <el-button>登录</el-button>
            <el-button>找回密码</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formData: {
        userName: "",
        userPwd: ""
      },
      imgData: [
        { url: require("../assets/login/loginBackImg.jpg") },
        { url: require("../assets/login/loginBackImg2.jpg") },
        { url: require("../assets/login/loginBackImg3.jpg") }
      ]
    };
  },
  methods: {
    gotoHome() {
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
.loginMain {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 1350px;
  min-height: 600px;
  z-index: -1;
}
.el-carousel {
  opacity: 0.8;
}
.zhezhao {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("../assets/login/zhezhao.jpg");
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 1;
}
.mainCar {
  height: 100%;
}
.middleBox,
.rightCard,
.logoBox {
  position: absolute;
  z-index: 20;
  font-size: 1.2em;
  font-weight: 600;
}
.logoBox {
  top: 0;
  width: 40%;
  min-width: 150px;
  padding: 20px;
}
.logoBox > img {
  width: 170px;
  vertical-align: middle;
}
.logoBox > span {
  color: white;
  font-size: 1.4em;
  border-left: 2px solid rgb(196, 64, 64);
  padding-left: 3px;
}
.middleBox {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 120px;
}
.middleBox .el-card {
  padding-left: 100px;
  opacity: 0.6;
}
.rightCard {
  top: 0;
  bottom: 0;
  right: 130px;
  height: 300px;
  margin: auto;
  width: 600px;
}
.rightCard .el-card {
  height: 100%;
  width: 100%;
}
.el-form {
  margin-bottom: 20px;
}
.subBtns {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>
