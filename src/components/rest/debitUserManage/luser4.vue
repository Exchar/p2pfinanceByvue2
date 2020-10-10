<template>
  <el-row>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <div>
        <p>基本信息</p>
      </div>
      <el-col :span="12">
        <el-form-item label="手机号:">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio v-model="formLabelAlign.sex" label="1">男</el-radio>
          <el-radio v-model="formLabelAlign.sex" label="2">女</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="用户类型:">
          <el-radio v-model="formLabelAlign.type" label="1"
            ><router-link to="/luser3">企业用户</router-link></el-radio
          >
          <el-radio v-model="formLabelAlign.type" label="2">个人用户</el-radio>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input v-model="formLabelAlign.idcard"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
      </el-col>
      <p>密码管理</p>
      <el-col :span="12">
        <el-form-item label="登陆密码:">
          <el-input v-model="formLabelAlign.Loginaccount"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitone">新增</el-button>
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
      labelPosition: "right",
      formLabelAlign: {
        phone: "",
        username: "",
        type: "",
        idcard: "",
        email: "",
        Loginaccount: "",
        password: "",
        sex: 1
      }
    };
  },
  methods: {
    //新增按钮
    onSubmitone() {
      console.log({
        phone: this.formLabelAlign.phone,
        username: this.formLabelAlign.username,
        type: this.formLabelAlign.type,
        idcard: this.formLabelAlign.idcard,
        email: this.formLabelAlign.email,
        Loginaccount: this.formLabelAlign.Loginaccount,
        password: this.formLabelAlign.password,
        lpassword:this.formLabelAlign.lpassword,
        sex: this.formLabelAlign.sex
      });
      this.$axios
        .post("/markApifinance/loanUser/save", {
          phone: this.formLabelAlign.phone,
          username: this.formLabelAlign.username,
          type: this.formLabelAlign.type,
          idcard: this.formLabelAlign.idcard,
          email: this.formLabelAlign.email,
          Loginaccount: this.formLabelAlign.Loginaccount,
          password: this.formLabelAlign.password,
          lpassword:this.formLabelAlign.lpassword,
          sex: this.formLabelAlign.sex
        })
        .then(res => {
          console.log(res);
          var result = res.data;
          console.log(result)
          if (result.msg){
            this.$message.success(`添加成功`);
            console.log(this.$router)
            this.$router.push("/index");
          }
        })
        .catch(err => {
          console.log(err);
          console.log("111");
         this.$message.err("添加失败");
        });
    },
  }
};
</script>

<style scoped></style>
