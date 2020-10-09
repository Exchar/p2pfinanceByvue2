<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            size="max"
            placeholder="搜索借款名称"
            suffix-icon="el-icon-search"
            v-model="input1"
            @keyup.native="getQueryLoanList"
          >
            size="max" placeholder="搜索标名" suffix-icon="el-icon-search"
            v-model="entitle" @keyup.native="getQueryLoanList">
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
          >
            <el-option
              v-for="item in stateList"
              :label="item.name"
              :key="item.id"
              :value="item.id"
              v-model="queryState"
              placeholder="请选择"
              style="width: 100%"
              @change="getQueryLoanList"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="num" label="编号"> </el-table-column>
        <el-table-column prop="borrower" label="借款方"> </el-table-column>
        <el-table-column prop="phone" label="借款人手机"> </el-table-column>
        <el-table-column prop="entitle" label="标名"> </el-table-column>
        <el-table-column prop="guarantee" label="担保机构"> </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="money" label="借款金额"> </el-table-column>
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
        >
        </el-table-column>
        <el-table-column prop="deadline" label="期限"> </el-table-column>
        <el-tale-column prop="created" label="添加时间"> </el-tale-column>
        <el-table-column prop="state" :formatter="loanState" label="状态">
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false">编辑</el-link>
            |
            <el-link type="primary" :underline="false" @click="void scope.row"
              >作废</el-link
            >
          </template>
        </el-table-column>
      </el-table>
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
      input1: "",
      input2: "",
      input3: "",
      input4: "",
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
          id: 2,
          sname: "新标草稿"
        },
        {
          id: 3,
          sname: "初审不通过"
        }
      ],
      tableData: []
    };
  },
  methods: {
    // 借款标状态转换
    loanState: function(row) {
      return row.state == 1
        ? "新标待审核"
        : row.state == 2
        ? "新标草稿"
        : row.state == 3
        ? "初审不通过"
        : "";
    },
    // 还款方式转换
    repaymentState: function(row) {
      return row.repayment == 1
        ? "一次性还款"
        : row.repayment === 2
        ? "等额本息"
        : row.repayment == 3
        ? "按月付息到期还本"
        : row.repayment == 4
        ? "按天还款"
        : "";
    },
    // 年化利率转换
    annualState: function(row) {
      return row.annual * 100 + "%";
    },
    // 列表渲染
    getLoanList: function() {
      this.$axios
        .post("/markApi/finance/loan/findLikeLoanDefend", {
          limit: "1",
          page: "5"
        })
        .then(res => {
          this.tableData = res.data.data;
          console.log(this.tableData);
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
      this.$axios
        .post(
          "/markApi/finance/loan/findLikeLoanDefend",
          JSON.stringify({
            entitle: "" + this.entitle,
            borrower: "" + this.borrower,
            phone: "" + this.phone,
            state: indexState,
            limit: "1",
            page: "10"
          })
        )
        .then(res => {
          // 请求返回的数据
          // 赋值
          if (res.data.code === "200") {
            this.tableData = res.data.data;
          } else {
            console.log(res.data);
          }
          console.log(this.tableData);
        })
        .catch(error => {
          console.log(error);
        });
    }
    // 作废
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
