<template>
  <el-row class="headerTab" :gutter="20">
    <el-col :span="1.5"
      ><el-button type="primary" plain size="small"
        ><span>标签1</span><i class="el-icon-close"></i></el-button
    ></el-col>
    <el-col :span="1.5"
      ><el-button type="primary" plain size="small"
        ><span>标签2</span><i class="el-icon-close"></i></el-button
    ></el-col>
    <el-col :span="1.5"
      ><el-button type="primary" plain size="small"
        ><span>标签3</span><i class="el-icon-close"></i></el-button
    ></el-col>
    <el-col :span="1.5"
      ><el-button type="primary" plain size="small"
        ><span>这个是标签4</span><i class="el-icon-close"></i></el-button
    ></el-col>
  </el-row>
</template>
<script>
export default {
  name: "HeaderTab"
};
</script>
<style scoped>
.headerTab {
  padding: 10px 10px;
}
.el-col span {
  display: inline-block;
  width: 90%;
}
.el-col button span {
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
}
.el-col button i {
  vertical-align: middle;
  font-size: 14px;
}
.el-button {
  padding: 8px 15px !important;
}
</style>
