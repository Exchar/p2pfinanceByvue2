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
            <span>{{ transData.title }}</span>
          </div>
          <el-form
            label-position="right"
            label-width="80px"
            :model="formData"
            v-if="defaultState"
          >
            <el-form-item
              label="用户名:"
              :rules="[{ required: true, message: '用户名不能为空' }]"
              v-show="login"
            >
              <el-input
                v-model="formData.userName"
                placeholder="请输入用户名"
                @input="nowInput"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户名"
              :rules="[{ required: true, message: '用户名不能为空' }]"
              v-show="!login"
            >
              <el-input
                v-model="formData.forgetName"
                placeholder="输入您想找回密码的用户名"
                @input="nowInput"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" v-show="!login">
              <el-input
                v-model="formData.email"
                type="email"
                placeholder="输入您绑定的邮箱号码"
                @input="nowInput"
                ><template slot="append">
                  <i class="el-icon-timer"></i> </template
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" v-show="login">
              <el-input
                v-model="formData.userPwd"
                type="password"
                @input="nowInput"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form
            label-position="right"
            label-width="80px"
            v-if="!defaultState"
            v-model="reSetPwd"
          >
            <el-form-item label="验证码" v-if="!conSuccess">
              <el-input
                placeholder="查看您邮箱中的验证码"
                v-model="reSetPwd.code"
              >
                <template slot="append">
                  <i class="el-icon-timer"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="新密码" v-if="!conSuccess">
              <el-input
                placeholder="请输入新密码"
                v-model="reSetPwd.newPwd"
              ></el-input>
            </el-form-item>
            <p v-if="conSuccess" class="successInfo">
              重置成功！点击按钮返回登录
            </p>
          </el-form>
          <transition name="fade">
            <p class="errorInfo" v-show="failed">用户名或密码错误</p>
          </transition>
          <div class="subBtns">
            <el-button
              type="primary"
              class="loginBtn"
              v-show="login"
              @click="loginReq"
              @keydown.enter="loginReq"
              >登录</el-button
            >
            <el-button
              type="primary"
              class="loginBtn"
              v-show="!login && defaultState"
              @click="forgetBtnHandle"
              >提交</el-button
            >
            <el-button
              type="primary"
              class="loginBtn"
              v-show="!login && !defaultState && !conSuccess"
              @click="changePwdHandle"
              >提交</el-button
            >
            <el-button
              type=""
              class="forgetPwdBtn"
              v-show="login"
              @click="changeState"
              >找回密码</el-button
            >
            <el-button v-show="!login" @click="$router.go(0)"
              >返回登录</el-button
            >
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "login",
  data() {
    return {
      login: true,
      formData: {
        userName: "",
        userPwd: "",
        email: "",
        forgetName: ""
      },
      reSetPwd: {
        code: "",
        newPwd: ""
      },
      conSuccess: false,
      defaultState: true,
      failed: false,
      saveArr: [],
      imgData: [
        { url: require("../assets/login/loginBackImg.jpg") },
        { url: require("../assets/login/loginBackImg2.jpg") },
        { url: require("../assets/login/loginBackImg3.jpg") }
      ]
    };
  },
  computed: {
    ...mapGetters(["getRoutes", "getShortCutsIcon", "getShortCutsColor"]),
    transData() {
      if (this.login) {
        return {
          login: true,
          title: "请登录",
          firstInp: "用户名",
          firstVal: "",
          secondInp: "密码",
          secondVal: ""
        };
      } else {
        return {
          login: true,
          title: "找回密码",
          firstInp: "手机号或邮箱",
          firstVal: ""
        };
      }
    }
  },
  methods: {
    ...mapMutations([
      "saveLeftMenu",
      "saveToken",
      "setRefresh",
      "saveRoutes",
      "saveName",
      "saveShortcutsAll"
    ]),
    //从一个数组中随意取一个元素
    randomChoice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    //打散数组
    dasan(arr) {
      for (let v in arr) {
        let newItem = {};
        if (
          arr[v].children != null &&
          arr[v].children &&
          arr[v].children.length > 0
        ) {
          arr[v].del = true;
          for (const key in arr[v]) {
            //判断是不是多余的菜单
            if (key == "children") {
              newItem.children = [];
              //判断是不是多余的菜单
            } else {
              newItem[key] = arr[v][key];
            }
          }
        } else {
          for (const key in arr[v]) {
            newItem[key] = arr[v][key];
          }
        }
        this.saveArr.push(newItem);
        if (
          arr[v].children != null &&
          arr[v].children &&
          arr[v].children.length > 0
        ) {
          this.dasan([...arr[v].children]);
        }
      }
    },
    //拼接数组
    connect(newA) {
      let newB = [];
      for (let i in newA) {
        // eslint-disable-next-line no-prototype-builtins
        if (!newA[i].hasOwnProperty("del")) {
          newB.push(newA[i]);
        }
      }
      return newB;
    },
    changeState() {
      this.login = !this.login;
      this.formData = {
        userName: "",
        userPwd: "",
        phone: ""
      };
    },
    //登录时的相关处理
    loginReq() {
      let msgObj = { userName: "用户名", userPwd: "密码" };
      let isLogin = true;
      try {
        Object.keys(msgObj).forEach(v => {
          console.log(v);
          if (this.formData[v].length === 0) {
            this.$message({
              type: "error",
              message: msgObj[v] + "不能为空",
              duration: 500
            });
            isLogin = false;
            this.failed = true;
            throw new Error("EndIterative");
          }
        });
      } catch (e) {
        if (e.message !== "EndIterative") throw e;
      }
      isLogin
        ? this.$axios
            // .post("markApi/finance/check/login", {
            //   username: this.formData.userName,
            //   password: "" + this.formData.userPwd
            // })
            .post("/markApi/finance/check/login", {
              username: this.formData.userName,
              password: "" + this.formData.userPwd
            })
            .then(res => {
              console.log(res);
              if (res.data.code != 200) {
                this.$message({
                  type: "error",
                  duration: 500,
                  message: "用户名或密码错误"
                });
                this.failed = true;
              } else if (res.data.code == 200) {
                //  console.log(res.data.menu);
                // this.$message.success("登录成功");
                // let newA = [...res.data.menu];
                // this.reCon(newA);
                // console.log(newA);
                // this.saveLeftMenu(res.data.menu);
                // this.saveToken(res.data.token);
                // this.setRefresh();
                // this.$router.push("/home");

                console.log(res.data);
                this.$message.success("登录成功");
                let newA = [...res.data.menu];
                this.reCon(newA);
                newA.unshift([...newA][0].children[0]);
                newA[0].icon = "el-icon-house";
                newA[0].path = "/home";
                newA[0].children = [];
                newA[0].name = "工作台";
                newA.splice(1, 1);
                // console.log("修改后的",newA);
                //保存左菜单
                this.saveLeftMenu(newA);
                //生成路由表，保存路由表
                let reArr = [...res.data.menu];
                this.dasan(reArr);
                //保存路由信息
                this.saveRoutes(this.connect(this.saveArr));
                //保存token信息
                this.saveToken(res.data.token);
                //设置需要添加路由
                this.setRefresh();
                //保存用户名
                this.saveName(res.data.name);
                //生成并保存主页的快捷方式json数据
                //1.生成快捷方式json数据
                //先拷贝路由数据
                let shortCuts = this.getRoutes;
                // console.log("初始的快捷方式数据", shortCuts);
                let filtShort = () => {
                  let temp = [];
                  shortCuts.forEach(v => {
                    if (v.path != "/home") {
                      temp.push({
                        path: v.path,
                        title: v.name,
                        icon: this.randomChoice(this.getShortCutsIcon),
                        bgColor: this.randomChoice(this.getShortCutsColor)
                      });
                    }
                  });
                  return temp;
                };
                // console.log(filtShort());
                this.saveShortcutsAll(filtShort());
                //跳转到主页
                this.$router.push("/home");
              }
            })
        : "";
    },
    reCon(arr) {
      arr.forEach(v => {
        if (v.children == null) {
          v.children = [];
        }
        if (v.path == "/home") {
          v.component = "/Layout/Home";
        } else if (v.children == null) {
          v.component = v.path + "/index";
        } else if (v.children && v.children.length > 0) {
          v.component = "/Layout/Home";
          this.reCon(v.children);
        }
      });
    },
    nowInput() {
      this.failed = false;
    },
    //点击忘记密码提交按钮
    forgetBtnHandle() {
      this.defaultState = false;
    },
    //修改密码提交按钮
    changePwdHandle() {
      this.conSuccess = true;
    }
  },
  created() {
    document.title = "惠众借贷后台管理系统登录";
  }
};
</script>

<style scoped>
.errorInfo {
  font-size: 15px;
  font-weight: 400;
  color: red;
  text-align: center;
  margin: 0 !important;
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
}
.successInfo {
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  margin: 0 !important;
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
}
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
.loginBtn {
  width: 20%;
}
</style>
