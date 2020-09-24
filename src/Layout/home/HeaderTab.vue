<template>
  <div class="headerTab">
    <el-tabs
      v-model="editableTabsValue"
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
        :name="item.path"
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
      editableTabsValue: "/",
      tabIndex: 2
    };
  },
  computed: {
    ...mapGetters(["getHeaderTabs", "getNowAct"]),
    active() {
      let nowPath = this.$route.path;
      let cls = "";
      this.getHeaderTabs.forEach(v => {
        if (nowPath === v.path) {
          cls = "active";
        }
      });
      return cls;
    }
  },
  methods: {
    ...mapMutations(["delTabItem"]),
    tabClick(ment) {
      if (this.$route.path !== ment.name) {
        this.$router.push(ment.name);
      }
    },
    removeTab(targetName) {
      this.delTabItem(targetName);
    }
  }
};
</script>
<style scoped>
.el-tabs {
  margin-top: 2px;
  height: 40px;
  line-height: 40px;
}
.headerTab {
  padding: 4px 0 1px 10px;
}
</style>
