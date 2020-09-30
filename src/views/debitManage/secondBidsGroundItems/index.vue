<template>
  <div class="maintain">
    <div id="nav">
      <el-form>
        <el-form-item prop="region">
          <el-row :gutter="20">
            <el-col :span="4"
              ><div>
                <el-input
                  placeholder="搜索借款方"
                  v-model="peopleList.borrower"
                  suffix-icon="el-icon-search"
                  clearable
                  @change="getData"
                >
                </el-input></div
            ></el-col>
            <el-col :span="4"
              ><div>
                <el-input
                  placeholder="搜索借款人手机"
                  v-model="peopleList.phone"
                  suffix-icon="el-icon-search"
                  clearable
                  @change="getData"
                >
                </el-input></div
            ></el-col>
            <el-col :span="16"><div></div></el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div id="table">
      <el-table stripe style="width: 100%" :data="tableData">
        <el-table-column prop="num" label="编号"></el-table-column>
        <el-table-column prop="borrower" label="借款方"> </el-table-column>
        <el-table-column prop="phone" label="借款人手机"> </el-table-column>
        <el-table-column prop="entitle" label="标名"> </el-table-column>
        <el-table-column prop="guarantee" label="担保机构"></el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="money" label="借款金额"> </el-table-column>
        <el-table-column prop="annual" :formatter="annualState" label="年利率化"> </el-table-column>
        <el-table-column prop="repayment" label="还款方式"> </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-table-column label="审核时间"> </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="markOn(scope.row)"
              >上架</el-link
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
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
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
import { mapMutations } from "vuex";
export default {
  name: "MarkOn",
  computed: {},
  data() {
    return {
      peopleList: {
        pledge: "",
        borrower: "",
        phone: "",
        limit: "",
        page: ""
      },
      currentPage4: 1,
      pageSize: 5,
      total: 5,
      phoneNum: "",
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapMutations(["saveMainten"]),
    markOn(row) {
      this.saveMainten(row);
      this.$router.push("/debitManage/Maintenance");
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.getData();
    },
    handleCurrentChange(value) {
      this.currentPage4 = value;
      this.getData();
    },
    getData() {
      this.$axios
        .post("/markApi/finance/sign/findPage", {
          phone: "" + this.peopleList.phone,
          borrower: "" + this.peopleList.borrower,
          pledge: "1",
          limit: +this.currentPage4,
          page: +this.pageSize
        })
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            this.saveMainten(response.data.data);
            console.log(response.data);
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    annualState(row) {
      return row.annual*100+"%";
    }
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
