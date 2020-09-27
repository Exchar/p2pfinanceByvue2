<template>
  <div class="maintain">
    <div id="nav">
      <el-form>
        <el-form-item prop="region">
          <el-row :gutter="20">
            <el-col :span="4"
              ><div>
                <el-input placeholder="搜索借款方" v-model="peopleList.borrower" clearable>
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div>
                <el-input
                  placeholder="搜索借款人手机" v-model="peopleList.phone">
                </el-input></div
            ></el-col>
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-col :span="16"><div></div></el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div id="table">
      <el-table stripe style="width: 100%" :data="tableData">
        <el-table-column prop="num" label="编号"> </el-table-column>
        <el-table-column prop="borrower" label="借款方"> </el-table-column>
        <el-table-column prop="phone" label="借款人手机"> </el-table-column>
        <el-table-column prop="entitle" label="标名"> </el-table-column>
        <el-table-column prop="guarantee" label="担保机构" width="180">
        </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="money" label="借款金额"> </el-table-column>
        <el-table-column prop="annual" label="年利率化"> </el-table-column>
        <el-table-column prop="repayment" label="还款方式"> </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-table-column label="审核时间"> </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column prop="action" label="操作"> </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-row>
        <el-col :span="6"><div></div></el-col>
        <el-col :span="6"><div></div></el-col>
        <el-col :span="10"
          ><div>
            <el-pagination
              :current-page="peopleList.pageNum"
              :page-sizes="[2, 3, 5, 10]"
              :page-size="peopleList.pageSize"
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
/*const qs = require('qs');*/
export default {
  name: "MarkOn",
  data() {
    return {
      peopleList: {
        pledge: "",
        borrower: "",
        phone: "",
        limit: 1,
        page: 10
      },
      total: 0,
     phoneNum: "",
     tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData: function() {
      this.$axios
        .post("/markApi/finance/sign/findPage", {
          phone: "",
          borrower:"",
          pledge:"",
          limit: 1,
          page: 10
        })
        .then(response => {
          console.log(response);
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
   /* search(){
      console.log(this.peopleList)
      this.$axios.post("/markApi/finance/sign/findPage",{
        phone: "",
        borrower:"",
        pledge:"",
        limit: 1,
        page: 10
      }).then(res=>{
        console.log(res)
      })
    }*/
  },

};
</script>
<style scoped>
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
