<template>
  <div>
    <!-- 根据实际情况做修改 -->
    <div v-for="(item, index) in list" :key="index">
      <el-menu-item
        :key="index"
        v-if="item.children.length == 0"
        :index="item.path"
      >
        <i class="el-icon-aim"></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
      <el-submenu
        :key="index"
        v-if="item.children.length > 0"
        :index="item.path"
      >
        <template slot="title">
          <i class="el-icon-aim"></i>
          <span>{{ item.title }}</span>
        </template>
        <Menu :list="item.children"></Menu>
      </el-submenu>
    </div>
  </div>
</template>
<script>
export default {
  name: "Menu",
  props: ["list"],
  beforeUpdate() {
    console.log(this.list);
  }
};
</script>
<style scoped></style>
