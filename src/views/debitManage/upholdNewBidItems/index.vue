<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            size="max"
            placeholder="搜索借款名称"
            suffix-icon="el-icon-search"
            v-model="entitle"
            @keyup.native="getQueryLoanList"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            size="max"
            placeholder="搜索借款方"
            suffix-icon="el-icon-search"
            v-model="borrower"
            @keyup.native="getQueryLoanList"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            size="max"
            placeholder="搜索借款人手机"
            suffix-icon="el-icon-search"
            v-model="phone"
            @keyup.native="getQueryLoanList"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="queryState"
            placeholder="请选择"
            style="width: 100%"
            @change="getQueryLoanList"
          >
            <el-option
              v-for="item in stateList"
              :label="item.sname"
              :key="item.id"
              :value="item.id"
              style="width: 100%"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="num" label="编号" width="240px">
        </el-table-column>
        <el-table-column prop="borrower" label="借款方" width="120px">
        </el-table-column>
        <el-table-column prop="phone" label="借款人手机" width="180px">
        </el-table-column>
        <el-table-column prop="entitle" label="标名"> </el-table-column>
        <el-table-column
          prop="guarantee"
          label="担保机构"
          width="200px"
          :formatter="guaranteeState"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          :formatter="typeState"
          width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="money"
          label="借款金额"
          :formatter="moneyState"
          width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="annual"
          :formatter="annualState"
          label="年化利率"
        >
        </el-table-column>
        <el-table-column
          prop="repayment"
          :formatter="repaymentState"
          label="还款方式"
          width="100px"
        >
        </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-table-column prop="created" label="添加时间" width="140px">
        </el-table-column>
        <el-table-column
          prop="state"
          :formatter="loanState"
          label="状态"
          width="100px"
        >
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template scope="scope">
            <el-link type="primary" :underline="false">编辑</el-link>
            |
            <el-link
              type="primary"
              :underline="false"
              @click="toVoid(scope.row.num)"
              >作废</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="marginTop">
      <el-row :gutter="20">
        <el-col :offset="6" style="text-align:center">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pageSize"
            :total="total"
            layout="sizes, total, jumper ,prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  created: function() {
    this.getLoanList();
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 5,
      loading: false,
      borrower: "",
      entitle: "",
      phone: "",
      queryState: "",
      stateList: [
        {
          id: 0,
          sname: "全部状态"
        },
        {
          id: 1,
          sname: "新标待审核"
        },
        {
          id: 60,
          sname: "新标草稿"
        }
      ],
      tableData: []
    };
  },
  methods: {
    //借款金额转换
    moneyState: function(row) {
      return "￥" + row.money;
    },
    // 担保机构转换
    guaranteeState: function(row) {
      return row.guarantee == 1
        ? "上海泽润典当有限公司"
        : row.guarantee == 2
        ? "成都京东金融有限公司"
        : row.guarantee == 3
        ? "杭州阿里金融有限公司"
        : row.guarantee == 4
        ? "北京联想金融有限公司"
        : row.guarantee == 5
        ? "重庆勒花花金融有限公司"
        : row.guarantee;
    },
    // 借款类型转换
    typeState: function(row) {
      return row.type == 1
        ? "新增"
        : row.type == 2
        ? "续贷"
        : row.type == 3
        ? "资产处理"
        : row.type;
    },
    // 借款标状态转换
    loanState: function(row) {
      return row.state == 1 ? "新标待审核" : row.state == 60 ? "新标草稿" : "";
    },
    // 还款方式转换
    repaymentState: function(row) {
      return row.repayment == "1"
        ? "一次性还款"
        : row.repayment == "2"
        ? "等额本息"
        : row.repayment == "3"
        ? "按月付息到期还本"
        : row.repayment == "4"
        ? "按天还款"
        : "";
    },
    // 年化利率转换
    annualState: function(row) {
      return row.annual * 100 + "%";
    },
    // 列表渲染
    getLoanList: function() {
      this.loading = true;
      this.$axios
        .post(
          "/markApi/finance/loan/findLikeLoanDefend",
          JSON.stringify({
            limit: this.currentPage,
            page: this.pageSize
          })
        )
        .then(res => {
          if (res.data.code == "200") {
            this.total = res.data.count;
            this.tableData = res.data.data;
            console.log(this.tableData);
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 多条件查询
    getQueryLoanList: function() {
      let indexState = this.queryState;
      if (indexState == 0) {
        indexState = "";
      }
      console.log(indexState);
      this.$axios
        .post(
          "/markApi/finance/loan/findLikeLoanDefend",
          JSON.stringify({
            entitle: "" + this.entitle,
            borrower: "" + this.borrower,
            phone: "" + this.phone,
            state: indexState,
            limit: this.currentPage,
            page: this.pageSize
          })
        )
        .then(res => {
          if (res.data.code === "200") {
            this.total = res.data.count;
            this.tableData = res.data.data;
          } else {
            console.log(res.data);
          }
          console.log(this.tableData);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 作废
    toVoid: function(row) {
      this.$confirm("是否将此条借款信息作废?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/markApi/finance/loan/delete", {
              num: row
            })
            .then(res => {
              console.log(res);
              if (res.data.code == "200") {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.getLoanList();
              } else {
                this.$message.error(res.data.msg());
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          console.log(row);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLoanList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLoanList();
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.marginTop {
  margin-top: 20px;
}
</style>
