<template>
  <div class="headerTab">
    <el-tabs
      v-model="nowActPath"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="tabClick"
      :active-name="getNowAct"
    >
      <el-tab-pane
        v-for="item in getHeaderTabs"
        :key="item.path"
        :label="item.title"
        :name="'' + item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import "../../assets/layout/buttonNoBorder.css";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      nowActPath: ""
    };
  },
  computed: {
    ...mapGetters(["getHeaderTabs", "getNowAct"]),
    nowPath() {
      return this.$route.path;
    }
  },
  methods: {
    ...mapMutations(["delTabItem", "changeNowAct"]),
    tabClick(ment) {
      // console.log(ment);
      if (this.$route.path !== ment.name) {
        this.$router.push(ment.name);
        this.changeNowAct(ment.name);
      }
    },
    removeTab(targetName) {
      //越界判断
      let nowIndex = 0;
      let oldTabs = [...this.getHeaderTabs];
      oldTabs.forEach((v, i) => {
        v.path === targetName ? (nowIndex = i) : "";
      });
      this.delTabItem(targetName);
      if (targetName === this.getNowAct) {
        this.$router.push(oldTabs[nowIndex - 1].path);
        this.changeNowAct(oldTabs[nowIndex - 1].path);
      }
    }
  }
};
</script>
<style scoped>
.el-tabs {
  height: 40px;
  line-height: 40px;
}
.headerTab {
  padding: 4px 0 1px 2px;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
