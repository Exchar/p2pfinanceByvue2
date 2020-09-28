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
              @keyup.native="getQueryLoanList">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
              size="max"
              placeholder="搜索借款方"
              suffix-icon="el-icon-search"
              v-model="input2">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
              size="max"
              placeholder="搜索借款人手机"
              suffix-icon="el-icon-search"
              v-model="input3">
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
  created:  function() {
    this.getLoanList();
  },
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      queryState:"",
      stateList: [
        {
          id: 1,
          name: "新增草稿"
        },
        {
          id: 2,
          name: "新标待审核"
        },
        {
          id: 3,
          name: "初审不通过"
        }
      ],
      tableData: []
    }
  },
  methods:  {
    getLoanList: function () {
      this.$axios
        .post("/api/finance/loan/findLikeLoanDefend",
         {limit:"1",page:"3"})
        .then(res => {
      // 请求返回的数据
      // 赋值
          this.tableData = res.data.data;
       console.log(this.tableData);
       })
        .catch(error => {
         console.log(error);
       });
    },
    getQueryLoanList: function () {
      this.$axios
          .post("/api/finance/loan/findLikeLoanDefend",
              {"entitle":"测","borrower":"100","phone":"777","state":"2","limit":"1","page":"10"})
          .then(res => {
            // 请求返回的数据
            // 赋值
            this.tableData = res.data.data;
            console.log(this.tableData);
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>