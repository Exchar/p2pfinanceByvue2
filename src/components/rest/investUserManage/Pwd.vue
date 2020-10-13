<template>
  <el-row>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      :rules="rules"
    >
      <div>
        <p>密码管理</p>
      </div>
      <el-col :span="6">
        <el-form-item label="登录密码:" prop="name">
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
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定新增</el-button>
            <el-button @click="$router.push('/memberManage/debitUserManage')"
              >返回</el-button
            >
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
      labelPosition: "center",
      formLabelAlign: {
        name: "",
        region: "",
        pwd: "",
        pwd1: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style scoped></style>
