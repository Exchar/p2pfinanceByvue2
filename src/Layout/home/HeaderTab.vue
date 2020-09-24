<template>
  <div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import "../../assets/layout/buttonNoBorder.css";
export default {
  data() {
    return {
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "借贷管理",
          name: "1"
        },
        {
          title: "内容管理",
          name: "2"
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    addTab() {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "tab" + this.tabIndex,
        name: newTabName
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>
<style scoped>
.el-tabs {
  margin-top: 2px;
  height: 60px;
  line-height: 60px;
}
</style>
