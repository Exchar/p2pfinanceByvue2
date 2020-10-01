<template>
  <div class="contentMain">
    <div>
      <el-row class="actionMenu" :gutter="20">
        <h3 class="actionNorTit">常用功能</h3>
        <el-col
          :span="2"
          v-for="item in actionMenuInit"
          :key="item.index"
          class="colItem"
        >
          <div
            class="actionMenuItem"
            style="text-align: center;cursor: pointer"
            @click="linkGo(item.linkTo)"
          >
            <div
              style="text-align: center"
              class="iconOUt"
              :style="'background-color:' + item.bgColor"
            >
              <i :class="item.icon" class="iconIn"></i>
            </div>
            <p style="text-align: center" class="iconBot">
              {{ item.title }}
            </p>
          </div>
        </el-col>
      </el-row>
      <el-row class="actionMenu mainContent" :gutter="20">
        <h3 class="actionNorTit">项目概况</h3>
        <el-col :span="16"></el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import preventBack from "vue-prevent-browser-back";
import "../../assets/index/main.css";
export default {
  name: "index",
  mixins:[preventBack],
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "getShortcuts",
      "getMenuData",
      "getShortcutsAll",
      "getHeaderTabs"
    ]),
    actionMenuInit() {
      return this.getShortcuts;
    }
  },
  methods: {
    linkGo(ment) {
      console.log(ment)
      this.changeNowAct(ment);
      this.$router.push(ment);
      let addItem = true;
      let tabItems = this.getHeaderTabs;
      console.log(tabItems)
      tabItems.forEach(v => {
        if (v.path === ment) {
          addItem = false;
        }
      });
      addItem ? this.saveTabItem(ment) : "";
    },
    ...mapMutations([
      "addshortcut",
      "addshortcut",
      "saveLeftMenu",
      "saveTabItem",
      "changeNowAct"
    ])
  },
  created() {
    console.log(this.getShortcuts);
  }
};
</script>

<style scoped>
.iconOUt {
  width: 60px;
  height: 60px;
  margin: auto;
  position: relative;
  border-radius: 2px;
}
.iconIn {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 50%;
  height: 50%;
  font-size: 1.4em;
}
.actionMenu {
  padding: 2px 20px 2px 20px;
}
.iconBot {
  font-size: 0.9em;
}
.actionNorTit {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1em;
  font-weight: 500 !important;
  margin-left: 10px;
}
.contentMain > div > .el-row {
  background-color: #ffffff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25), 0 0 6px rgba(0, 0, 0, 0.04);
}
.contentMain > div > .el-row:not(:first-of-type) {
  margin-top: 10px;
}
.contentMain > div {
  padding: 0 8px 0 8px;
}
</style>
