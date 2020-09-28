<template>
  <div class="maintain">
    <div id="nav">
      <el-form>
        <el-form-item prop="region">
          <el-row :gutter="20">
            <el-col :span="4"
              ><div class="grid-content">
                <el-input
                  placeholder="请输入借款方"
                  suffix-icon="el-icon-search"
                  v-model="input1"
                >
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content">
                <el-input
                  placeholder="请输入借款人手机"
                  suffix-icon="el-icon-search"
                  v-model="input2"
                >
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content">
                <el-select placeholder="全部类型">
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
          <el-link type="primary" :underline="false" @click="change"
            >修改</el-link
          >
          |
          <el-link type="primary" :underline="false" @click="markDown"
            >下架</el-link
          >
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
              :current-page="currentPage"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="20"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
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
      input1: "",
      input2: "",
      currentPage: 1,
      tableData: []
    };
  },
  methods: {
    getData: function() {
      this.$axios
        .post("/markApi/finance/sign/findPage", {
          limit: 1,
          page: 5
        })
        .then(response => {
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
    change() {},
    markDown() {}
  },
  mounted() {
    this.getData();
  }
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
