<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input
          placeholder="搜索名称"
          prefix-icon="el-icon-search"
          v-model="input.name"
          @keyup.native="query"
        >
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-input
          placeholder="搜索手机/用户名"
          prefix-icon="el-icon-search"
          @keyup.native="query"
          v-model="input.tel"
        >
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="realname" placeholder="请选择" @change="query">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="sock" placeholder="请选择" @change="query">
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
        <el-select v-model="usersource" placeholder="请选择" @change="query">
          <el-option
            v-for="item in options2"
            :key="item.value2"
            :label="item.label2"
            :value="item.value2"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div id="div1"></div>
    <el-row>
      <el-table :data="tableData" border style="width: 100%" id="table1">
        <el-table-column prop="usernumber" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机/用户名"> </el-table-column>
        <el-table-column prop="realname" label="实名状态"> </el-table-column>
        <el-table-column prop="idcard" label="身份证号"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="bank" label="银行卡"> </el-table-column>
        <el-table-column prop="referrer" label="推荐人"> </el-table-column>
        <el-table-column prop="sock" label="锁定状态"> </el-table-column>
        <el-table-column prop="registration" label="注册时间">
        </el-table-column>
        <el-table-column prop="logintime" label="最近登陆"> </el-table-column>
        <el-table-column prop="usersource" label="用户来源"> </el-table-column>
        <el-table-column prop="fuck" label="操作" width="250">
          <template slot-scope="scope">
            <span>
              <el-button @click="editform(scope.row)" class="button1"
                >查看资料</el-button
              >
              <el-button @click="pwdMa(scope.row)" class="button1"
                >密码管理</el-button
              >
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 8]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </el-row>
    <!--            密码修改框-->
    <el-dialog title="密码管理" :visible.sync="dialogFormEditVisible" top="4vh">
      <el-form :model="pwdMana">
        <el-form-item label="登录密码">
          <el-input v-model="pwdMana.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认登录密码">
          <el-input v-model="pwdMana.repassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="交易密码">
          <el-input v-model="pwdMana.trpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认交易密码">
          <el-input
            v-model="pwdMana.retrpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="pwdSave">保 存</el-button>
      </div>
    </el-dialog>
    <!--    <el-dialog title="密码管理" :visible.sync="dialogFormVisible">-->
    <!--      <el-form :model="pwdMana">-->
    <!--    <el-dialog title="登录密码" :visible.sync="dialogFormVisible">-->
    <!--      <el-form :model="pwdMana.loginPwd">-->
    <!--        <el-form-item label="确认登录密码:" :label-width="formLabelWidth">-->
    <!--          <el-input v-model="pwdMana.suc" auto-complete="off"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="交易密码:" :label-width="formLabelWidth">-->
    <!--          <el-input v-model="pwdMana.charge" auto-complete="off"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="确认交易密码:" :label-width="formLabelWidth">-->
    <!--          <el-input v-model="pwdMana.sucCharge" auto-complete="off"></el-input>-->
    <!--        </el-form-item>-->
    <!--    <div slot="footer" class="dialog-footer">-->
    <!--      <el-button @click="dialogFormVisible = false">取 消</el-button>-->
    <!--      <el-button type="primary" @click="save"-->
    <!--      >确定</el-button-->
    <!--      >-->
    <!--    </div>-->
    <!--    </el-dialog>-->
    <!--            修改数据框-->
    <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
      <el-form :model="editdata">
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="editdata.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" :label-width="formLabelWidth">
          <el-input v-model="editdata.idcard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" :label-width="formLabelWidth">
          <el-input v-model="editdata.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-col>银行卡信息</el-col>
        <el-form-item label="登录时间:" :label-width="formLabelWidth">
          <el-input v-model="editdata.logintime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号:" :label-width="formLabelWidth">
          <el-input v-model="editdata.bank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="最近登录时间:" :label-width="formLabelWidth">
          <el-input
            v-model="editdata.registration"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-col>操作</el-col>
        <el-form-item label="状态:">
          <el-radio v-model="editdata.sock" label="1">正常</el-radio>
          <el-radio v-model="editdata.sock" label="2">锁定</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </el-dialog>
  </div>
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
        pagesize: 4
      },
      total: 5,
      input: {
        tel: "",
        name: ""
      },
      tableData: [],
      options: [
        {
          value: 2,
          label: "全部实名状态"
        },
        {
          value: 1,
          label: "已认证"
        },
        {
          value: 0,
          label: "未认证"
        }
      ],
      realname: "",
      options1: [
        {
          value1: 2,
          label1: "全部状态"
        },
        {
          value1: 0,
          label1: "锁定"
        },
        {
          value1: 1,
          label1: "正常"
        }
      ],
      sock: "",
      options2: [
        {
          value2: 1,
          label2: "用户来源"
        },
        {
          value2: 2,
          label2: "网站"
        },
        {
          value2: 3,
          label2: "Adnroid客户端"
        },
        {
          value2: 4,
          label2: "ios客户端"
        },
        {
          value2: 5,
          label2: "其他渠道"
        }
      ],
      usersource: "",
      dialogFormEditVisible: false,
      dialogFormVisible: false,
      form: {
        phone: "",
        idcard: "",
        name: "",
        logintime: "",
        bank: "",
        registration: "",
        sock: "0",
        delivery: false,
        type: []
      },
      formLabelWidth: "120px",
      editdata: {
        phone: "",
        idcard: "",
        name: "",
        logintime: "",
        bank: "",
        registration: "",
        sock: 0
      },
      pwdMana: {
        id: "",
        password: "",
        repassword: "",
        trpassword: "",
        retrpassword: ""
      }
    };
  },
  computed: {},
  mounted() {
    //向服务器发送请求
    this.getlist();
  },
  methods: {
    getlist() {
      console.log({
        page: this.queryInfo.pagenum,
        limit: this.queryInfo.pagesize
      });
      this.$axios
        .post("/markApi/finance/invest/bypage", {
          page: this.queryInfo.pagenum,
          limit: this.queryInfo.pagesize
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
    //保存修改内容
    save() {
      console.log(this.editdata);
      // console.log(this.editform.sock);
      // this.dialogFormVisible = false;
      this.$axios
        .post("/markApi/finance/invest/byid", {
          // phone: this.editdata.phone ,
          idcard: this.editdata.idcard,
          // name: this.editdata.name ,
          logintime: this.editdata.logintime,
          bank: this.editdata.bank,
          registration: this.editdata.registration,
          sock: this.editdata.sock
        })
        .then(response => {
          var result = response.data;
          console.log(result);
          if (result.code == 200) {
            this.$alert(result.msg);
            this.getlist();
            this.dialogFormVisible = false;
          } else {
            this.$alert(result.message);
          }
        })
        .catch(err => {
          this.$alert("修改错误，请重试" + err);
        });
    },
    editform(obj) {
      console.log(obj);
      this.dialogFormVisible = true;
      this.editdata.phone = obj.phone;
      this.editdata.idcard = obj.idcard;
      this.editdata.name = obj.name;
      this.editdata.logintime = obj.logintime;
      this.editdata.bank = obj.bank;
      this.editdata.registration = obj.registration;
      this.editdata.sock = obj.sock;
      // console.log(this.editdata);
    },
    //密码修改
    pwdMa(obj) {
      (this.dialogFormEditVisible = true), (this.pwdMana.id = obj.id);
      console.log(this.pwdMana.id);
    },
    pwdSave() {
      if (
        this.pwdMana.password == "" ||
        this.pwdMana.repassword == "" ||
        this.pwdMana.trpassword == "" ||
        this.pwdMana.retrpassword == ""
      ) {
        this.$alert("密码不能为空");
        return false;
      }
      if (this.pwdMana.password != this.pwdMana.repassword) {
        this.$alert("两次密码不相同");
        return false;
      } else if (this.pwdMana.trpassword != this.pwdMana.retrpassword) {
        this.$alert("两次交易密码不相同");
        return false;
      }
      this.$axios
        .post("/markApi/finance/invest/updatepsd", {
          id: this.pwdMana.id,
          password: this.pwdMana.password,
          trpassword: this.pwdMana.trpassword
        })
        .then(response => {
          var result = response.data;
          console.log(result);
          if (result.code == 200) {
            this.$alert(result.msg);
            this.getlist();
            this.dialogFormEditVisible = false;
          } else {
            this.$alert(result.message);
          }
        })
        .catch(err => {
          this.$alert("修改错误，请重试" + err);
        });
    },

    //监听pagesize改变事件
    handleSizeChange(newsize) {
      console.log(`每页 ${newsize} 条`);
      this.queryInfo.pagesize = newsize;
      this.getlist();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(`当前页: ${newPage}`);
      this.queryInfo.pagenum = newPage;
      this.getlist();
    },
    //查询接口
    query() {
      // console.log(this.input.name);
      // console.log(this.sock);
      // console.log(this.realname);
      // console.log(this.usersource);
      // console.log(this.input.phone);
      // console.log(this.queryInfo.pagenum);
      // console.log(this.queryInfo.pagesize);
      let realname = this.realname;
      if (realname == "全部实名状态") {
        realname = "";
      }
      console.log(this.realname);
      console.log(this.input.name);
      this.$axios
        .post("/markApi/finance/invest/byname", {
          name: "" + this.input.name,
          sock: "" + this.sock,
          realname: "" + realname,
          usersource: "" + this.usersource,
          phone: "" + this.input.phone,
          page: this.queryInfo.pagenum,
          limit: this.queryInfo.pagesize
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.data;
          console.log("搜索" + this.tableData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#div1 {
  height: 20px;
}
</style>
