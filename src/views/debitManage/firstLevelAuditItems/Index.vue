<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            size="max"
            placeholder="搜索借款方"
            suffix-icon="el-icon-search"
            @keyup.native="getQueryLoanList"
            v-model="borrower">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            size="max"
            placeholder="搜索借款人手机"
            suffix-icon="el-icon-search"
            @keyup.native="getQueryLoanList"
            v-model="phone">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="pledge"
            placeholder="请选择"
            @change="getQueryLoanList"
            style="width: 100%"
          >
            <el-option
              v-for="item in stateList"
              :label="item.name"
              :key="item.id"
              :value="item.id"
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
          style="width: 100%">
        <el-table-column
            prop="num"
            label="编号">
        </el-table-column>
        <el-table-column
            prop="borrower"
            label="借款方">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="借款人手机">
        </el-table-column>
        <el-table-column
            prop="entitle"
            label="标名">
        </el-table-column>
        <el-table-column
            prop="guarantee"
            label="担保机构">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型">
        </el-table-column>
        <el-table-column
            prop="money"
            label="借款金额">
        </el-table-column>
        <el-table-column
            prop="annual"
            label="年化利率">
        </el-table-column>
        <el-table-column
            prop="repayment"
            :formatter="repaymentState"
            label="还款方式">
        </el-table-column>
        <el-table-column
            prop="deadline"
            label="期限">
        </el-table-column>
        <el-tale-column
            prop="created"
            label="添加时间">
        </el-tale-column>
        <el-table-column
            prop="state"
            :formatter="loanState"
            label="状态">
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  created() {
    this.getLoanList();
  },
  data() {
    return {
      borrower: "",
      phone: "",
      pledge: "",
      queryState:"",
      stateList: [
        {
          id: 0,
          name: "全部类型"
        },
        {
          id: 1,
          name: "车抵品"
        },
        {
          id: 2,
          name: "房抵品"
        },
        {
          id: 3,
          name: "民品抵押"
        }
      ],
      tableData: []
    }
  },
  methods: {
    // 借款标状态转换
    loanState: function (row) {
      return row.state ==1 ? "待审核" : "未知状态";
    },
    // 还款方式转换
    repaymentState: function (row) {
      return row.repayment ==1 ? "一次性还款"
            : row.repayment==2 ? "等额本息"
            : row.repayment==3 ? "按月付息到期还本"
            : row.repayment==4 ? "按天还款" : "未知状态";
    },
    //获取列表数据
    getLoanList: function () {
      this.$axios.post("/markApi/finance/loan/findLikeLoanCheck", {limit:"1",page:"3"})
        .then(res => {
          if (res.data.code === "200") {
            this.tableData = res.data.data;
          }
      console.log(this.tableData);
    }).catch(error => {
      console.log(error);
    });
    },
    // 多条件查询
    getQueryLoanList: function () {
      let indexPledge=this.pledge;
      if (indexPledge==0) {
        indexPledge="";
      }
      this.$axios.post("/markApi/finance/loan/findLikeLoanCheck", {
        borrower: ""+this.borrower,
        phone: ""+this.phone,
        pledge: indexPledge,
        limit:"1",
        page:"4"
      }).then(res => {
        if (res.data.code === "200") {
          this.tableData = res.data.data;
        }
        console.log(this.tableData);
      }).catch(error => {
        console.log(error);
      });
    },
    // 还款方式转换
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>