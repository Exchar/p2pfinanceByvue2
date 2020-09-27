<template>
  <el-row>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
      <div>
        <p>密码管理</p>
      </div>
      <el-col :span="6">
        <el-form-item label="登录密码:">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="确认登录密码:">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-col :span="6">
         <el-form-item label="交易密码:">
            <el-input v-model="formLabelAlign.pwd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="确认交易密码:">
            <el-input v-model="formLabelAlign.pwd1"></el-input>
          </el-form-item>
        </el-col>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
export default {
name: "Pwd",
  data() {
    return {
      labelPosition: 'center',
      formLabelAlign: {
        name: "",
        region: "",
        pwd:"",
        pwd1:""
      }
    };
  }
};
</script>

<style scoped>

</style>