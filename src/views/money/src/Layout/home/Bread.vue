<template>
  <el-breadcrumb separator="/" class="bread">
    <el-breadcrumb-item
      ><span
        class="indexHome"
        @click="goHome"
        style="cursor: pointer;font-weight: 700"
        >首页</span
      ></el-breadcrumb-item
    >
    <el-breadcrumb-item v-for="item in breadAct" :key="item.index"
      >{{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Bread",
  data() {
    return {
      nowTab: []
    };
  },
  computed: {
    ...mapGetters(["getNowAct", "getMenuData"]),
    breadAct() {
      let now = this.getNowAct;
      this.getMenuData.map(v => {
        if (v.path === now) {
          this.nowTab = [];
        }
        if (v.children.length > 0) {
          v.children.map(v2 => {
            if (v2.path === now) {
              this.nowTab = [
                { title: v.name, path: "" },
                { title: v2.name, path: v2.path }
              ];
            }
            if (v2.children.length > 0) {
              v2.children.map(v3 => {
                if (v3.path === now) {
                  this.nowTab = [
                    { title: v.name, path: "" },
                    { title: v2.name, path: "" },
                    { title: v3.name, path: v3.path }
                  ];
                }
              });
            }
          });
        }
      });
      return this.nowTab;
    }
  },
  methods: {
    ...mapMutations(["changeNowAct"]),
    goHome() {
      this.$router.push("/home");
      this.changeNowAct("/home");
    }
  }
};
</script>

<style scoped>
.indexHome:hover {
  color: #409eff !important;
}
</style>
