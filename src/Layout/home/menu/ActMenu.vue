<template>
  <div>
    <!-- 根据实际情况做修改 -->
    <div v-for="item in list" :key="item.index">
      <el-menu-item
        v-if="
          item.children == null ||
            item.children.length === 0 ||
            item.path === '/home'
        "
        :index="item.path"
      >
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
      <el-submenu
        v-if="
          item.children != null &&
            item.path !== '/home' &&
            item.children.length > 0
        "
        :index="item.path"
        class="secondMenu"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <ActMenu :list="item.children"></ActMenu>
      </el-submenu>
    </div>
  </div>
</template>
<script>
export default {
  name: "ActMenu",
  props: {
    list: Array
  }
};
</script>
<style scoped>
.el-menu--inline li {
  background-color: rgb(20, 22, 34);
}
.el-menu--inline li:hover,
.el-submenu__title:hover {
  background-color: rgb(57, 62, 83) !important;
}
</style>
