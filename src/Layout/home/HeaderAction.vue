<template>
  <div class="main">
    <el-row class="headerMain">
      <el-col :span="15" class="headerInfo">
        <div>
          <img src="../../assets/logo.png" alt="惠众借贷" />
        </div>
        <span>后台管理系统</span>
      </el-col>
      <el-col :span="9">
        <el-breadcrumb separator="|">
          <el-breadcrumb-item>
            <el-autocomplete
              class="inline-input searchInp"
              v-model="state2"
              :fetch-suggestions="querySearch"
              placeholder="搜索"
              :trigger-on-focus="false"
              @select="handleSelect"
              size="mini"
              ><i slot="prefix" class="el-input__icon el-icon-search"></i
            ></el-autocomplete>
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
            <el-dropdown @command="dropClick">
              <span class="el-dropdown-link">
                <span>{{ getName }}</span
                >欢迎登录<i
                  class="el-icon-caret-bottom
 el-icon--right"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人信息维护</el-dropdown-item>
                <el-dropdown-item command="b">帮助</el-dropdown-item>
                <el-dropdown-item
                  command="c"
                  v-loading.fullscreen.lock="fullscreenLoading"
                  element-loading-text="正在注销"
                  element-loading-background="rgba(0,0,0,.7)"
                  >注销</el-dropdown-item
                >
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
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "LeftMenu",
  computed: {
    ...mapGetters(["getName", "getRoutes"])
  },
  methods: {
    ...mapMutations(["changeNowAct"]),
    async dropClick(e) {
      switch (e) {
        case "c":
          this.fullscreenLoading = true;
          await localStorage.clear();
          await this.$router.push("/login");
          this.fullscreenLoading = false;
          this.$router.history.go(0);
      }
    },
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      let routes = this.getRoutes;
      routes.forEach(v => {
        Object.keys(v).forEach(key => {
          if (key === "name") {
            v["value"] = v[key];
          }
        });
      });
      return routes;
    },
    handleSelect(v) {
      console.log(v);
      this.$router.push(v.path);
      this.changeNowAct(v.path);
    }
  },
  data() {
    return {
      username: "用户名",
      restaurants: [],
      state2: "",
      fullscreenLoading: false
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
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
  padding: 19px 0;
  box-sizing: border-box;
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
.el-badge__content.is-fixed {
  top: 11px !important;
}
.el-breadcrumb .el-breadcrumb__separator {
  font-size: 20px;
  font-weight: 100;
}
.el-input__inner {
  border-radius: 20px !important;
}
</style>
