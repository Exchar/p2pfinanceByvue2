<template>
  <div class="maintain">
    <el-dialog
      title="修改标的信息"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="借款编号">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="借款方">
          <el-input v-model="form.borrower"></el-input>
        </el-form-item>
        <el-form-item label="借款人手机">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="标名">
          <el-input v-model="form.entitle"></el-input>
        </el-form-item>
        <el-form-item label="借款金额">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="年利率化">
          <el-input v-model="form.annual"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.state"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submit">确定</el-button>
        <el-button @click="reBack">返回</el-button>
      </span>
    </el-dialog>

    <div id="nav">
      <el-form>
        <el-form-item prop="region">
          <el-row :gutter="20">
            <el-col :span="4"
              ><div class="grid-content">
                <el-input
                  placeholder="请输入借款方"
                  suffix-icon="el-icon-search"
                  v-model="peopleList.borrower"
                  @change="searchRunning"
                >
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content">
                <el-input
                  placeholder="请输入借款人手机"
                  suffix-icon="el-icon-search"
                  v-model="peopleList.phone"
                  @change="searchRunning"
                >
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content">
                <el-select placeholder="全部类型" v-model="selectVal">
                  <el-option label="车抵押" value="car"></el-option>
                  <el-option label="房抵押" value="house"></el-option>
                  <el-option label="民品抵押" value="thing"></el-option>
                </el-select></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light"></div
            ></el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div id="table">
      <el-table stripe style="width: 100%" :data="tableData">
        <el-table-column prop="num" label="借款编号"> </el-table-column>
        <el-table-column prop="borrower" label="借款方"> </el-table-column>
        <el-table-column prop="phone" label="借款人手机"> </el-table-column>
        <el-table-column prop="entitle" label="标名"> </el-table-column>
        <el-table-column prop="money" label="借款金额"> </el-table-column>
        <el-table-column prop="annual" label="年利率化"> </el-table-column>
        <el-table-column prop="repayment" label="还款方式"> </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-table-column prop="putawaytime" label="上架时间"> </el-table-column>
        <el-table-column prop="saletime" label="开售时间"> </el-table-column>
        <el-table-column prop="checkTime" label="已投金额"> </el-table-column>
        <el-table-column prop="sname" label="投资进度"> </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column prop="action" label="操作" width="180px">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="edit(scope.row)"
              >修改</el-link
            >
            |
            <el-link type="primary" :underline="false" @click="markDown(scope.row)"
              >下架</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-row>
        <el-col :span="6"><div></div></el-col>
        <el-col :span="6"><div></div></el-col>
        <el-col :span="10"
          ><div>
            <el-pagination
               @size-change="handleSizeChange"                     @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 3, 5, 10]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination></div
        ></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkMange",
  data() {
    return {
      peopleList: {
        pledge: "",
        borrower: "",
        phone: "",
        limit: "",
        page: ""
      },
      input1: "",
      input2: "",
      currentPage: 1,
      pageSize:3,
      total:3,
      tableData: [],
      selectVal: "",
      dialogFormVisible: false,
      form: {
        num: "",
        borrower: "",
        phone: "",
        entitle: "",
        money: "",
        annual: "",
        state: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .post("/markApi/finance/loan/findingByPage", {
          limit: 1,
          page: 5
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            console.log(response.data);
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    edit(obj) {
      this.dialogFormVisible = true
      this.form.num = obj.num
      this.form.borrower = obj.borrower
      this.form.phone = obj.phone
      this.form.entitle = obj.entitle
      this.form.money = obj.money
      this.form.annual = obj.annual
      this.form.state = obj.state
    },
    submit() {
      this.dialogFormVisible = false;
      this.$axios
        .post("/markApi/finance/load/update",{
          num: this.form.num,
          borrower:this.form.borrower,
          money: this.form.money,
          /*phone: this.form.phone,
          entitle: this.form.entitle,
          annual: this.form.annual,
          state: this.form.state*/
        })
        .then(response => {
          console.log(response)
          if (response.data.code == 200) {
            this.getData();
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    markDown() {
      this.$axios
      .post("/markApi/finance/loan/updating",{
        num: ""+this.peopleList.num,
        remarks: ""+this.peopleList.remarks,
        state: 100
      })
      .then(response =>{
        console.log(response)
      })
      .catch(error =>{
        console.log(error)
      })
    },
    //搜索
    searchRunning() {
      this.$axios
              .post("/markApi/finance/loan/findingByPage",{
                borrower:this.peopleList.borrower,
                phone:this.peopleList.phone,
                limit: this.currentPage,
                page: this.pageSize,
                count:this.total
              })
              .then(response =>{
                if (response.data.code == 200) {
                  this.tableData = response.data.data;
                  console.log(response.data);
                } else {
                  this.$message(response.data.msg);
                }
                console.log(response)
              })
              .catch(error =>{
                console.log(error)
              })
    },
    reBack() {
      this.dialogFormVisible = false;
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.searchRunning();
    },
    handleCurrentChange(value) {
      this.currentPage = value;
      this.searchRunning();
    },
  }
};
</script>

<style scoped>
.dialog-footer{
  display: flex;
  align-items: center;
}
.el-col-6 {
  margin-top: 20px;
  height: 40px;
}
#nav {
  padding: 10px;
}
#table {
  width: 100%;
  height: 470px;
}
</style>
