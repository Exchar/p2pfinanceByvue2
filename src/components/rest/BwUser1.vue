<template>
  <el-row>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <div>
        <p>基本信息</p>
      </div>
      <el-col :span="12">
        <el-form-item label="手机号:">
          <el-input v-model="formLabelAlign.tel"></el-input>
        </el-form-item>
        <el-form-item label="企业名称:">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名:">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="用户类型:">
          <el-radio v-model="formLabelAlign.radio" label="1">企业用户</el-radio>
          <el-radio v-model="formLabelAlign.radio" label="2"><router-link to="/personUse">个人用户</router-link></el-radio>
        </el-form-item>
        <el-form-item label="税务登记:">
          <el-input v-model="formLabelAlign.one"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="formLabelAlign.tow"></el-input>
        </el-form-item>
      </el-col>
      <p>密码管理</p>
      <el-col :span="12">
        <el-form-item label="登陆密码:">
          <el-input v-model="formLabelAlign.three"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:">
          <el-input v-model="formLabelAlign.four"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定新增</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
export default {
name: "BwUser1",
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        tel: "",
        name: "",
        type: "",
        one:"",
        tow:"",
        three:"",
        four:"",
        radio: "1"
      }
    };
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style scoped>

</style>