<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-input
        placeholder="搜索姓名"
        prefix-icon="el-icon-search"
        @change="search"
        v-model="input.name"
      >
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-input
        placeholder="手机/用户名"
        prefix-icon="el-icon-search"
        @change="search"
        v-model="input.phone"
      >
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-select v-model="sock" placeholder="请选择" @change="search">
        <el-option
          v-for="item in options1"
          :key="item.value1"
          :label="item.label1"
          :value="item.value1"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-button plain @click="add">
        <router-link to="/luser3">新增用户</router-link>
      </el-button>
      <!--      新增弹出框-->
    </el-col>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="usernumber" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="company" label="公司名称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机/用户名"> </el-table-column>
      <el-table-column prop="email" label="借款人邮箱"> </el-table-column>
      <el-table-column prop="sock" label="锁定状态"> </el-table-column>
      <el-table-column prop="registration" label="注册时间"> </el-table-column>
      <el-table-column prop="logintime" label="最近登陆"> </el-table-column>
      <el-table-column prop="usersource" label="用户来源"> </el-table-column>
      <el-table-column prop="fuck" label="操作">
        <el-button-group>
          <el-button @click="find">查看资料</el-button>
          <el-button @click="pwdMa">密码管理</el-button>
        </el-button-group>
      </el-table-column>
    </el-table>
    <!--分页区域-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-row>
  <!--新增弹出框-->
</template>

<script>
export default {
  name: "postUse",
  data() {
    return {
      queryInfo: {
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2
      },
      total: 0,
      tableData: [],
      input: {
        name: "",
        phone: ""
      },
      options1: [
        {
          value1: 2,
          label1: "全部状态"
        },
        {
          value1: 1,
          label1: "锁定"
        },
        {
          value1: 0,
          label1: "正常"
        }
      ],
      sock: ""
    };
  },
  mounted() {
    //向服务器发送请求
    this.getlist();
  },
  methods: {
    getlist() {
      this.$axios
        .post("/markApi/finance/invest/bypage", {
          page: "1",
          limit: "5"
        })
        .then(response => {
          console.log(response.data);
          this.tableData = response.data.data;
        })
        .catch(err => {
          console.log("err in");
          console.log(err);
        });
    },
    onSubmit() {},
    //路由跳转
    find() {
      this.$router.push("/Modify");
    },
    pwdMa() {
      this.$router.push("/Pwd");
    },
    //监听pagesize改变事件
    handleSizeChange(newsize) {
      this.$axios
        .post("/markApi/finance/invest/bypage", {
          page: "1",
          limit: "2"
        })
        .then(response => {
          console.log(response.data);
          this.tableData = response.data.data;
        })
        .catch(err => {
          console.log("err in");
          console.log(err);
        });
      console.log(`每页 ${newsize} 条`);
      this.queryInfo.pagesize = newsize;
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.$axios
        .post("/markApi/finance/invest/bypage", {
          page: "1",
          limit: "2"
        })
        .then(response => {
          console.log(response.data);
          this.tableData = response.data.data;
        })
        .catch(err => {
          console.log("err in");
          console.log(err);
        });
      console.log(`当前页: ${newPage}`);
      this.queryInfo.pagenum = newPage;
    },
    //查询接口
    search() {
      // console.log(this.input.name);
      console.log(this.sock);
      // console.log(this.realname);
      // console.log(this.usersource);
      // console.log(this.input.phone);
      // console.log(this.queryInfo.pagenum);
      // console.log(this.queryInfo.pagesize);
      // console.log(this.realname);
      this.$axios
        .post("/markApi/finance/loanUser/selectPhoneAndNameAndSock", {
          name: "" + this.input.name,
          sock: "" + this.sock,
          phone: "" + this.input.phone,
          page: this.queryInfo.pagenum,
          limit: this.queryInfo.pagesize
        })
        .then(response => {
          this.tableData = response.data.data;
          console.log("搜索" + this.tableData);
        })
        .catch(err => {
          console.log(err);
        });
    }
    //新增用户
  }
};
</script>

<style scoped></style>
