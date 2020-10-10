<template>
  <div>
    <el-row :gutter="20" class="searchLan">
      <el-col :span="3"
        ><el-input
          v-model="input1"
          placeholder="投资人手机"
          suffix-icon="el-icon-search"
          @change="investSearch"
        ></el-input
      ></el-col>
      <el-col :span="3"
        ><el-input
          v-model="input2"
          placeholder="标名"
          suffix-icon="el-icon-search"
          @change="investSearch"
        ></el-input
      ></el-col>
      <el-col :span="3">
        <el-select
          v-model="value"
          placeholder="全部状态"
          @change="investSearch"
        >
          <el-option label="全部状态" value=""> </el-option>
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.sname"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3"
        ><div class="block">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="investSearch"
          >
          </el-date-picker></div
      ></el-col>
      <el-col :span="3" :offset="6"
        ><el-button plain>自定义列</el-button></el-col
      >
      <el-col :span="3"><el-button plain>导出</el-button></el-col></el-row
    >
    <el-table
      :data="tableData"
      style="width: 100%"
      height="350px"
      v-loading="loading"
      align="center"
    >
      <el-table-column label="标的编号" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资人" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.investor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资人手机" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标名" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.entitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资金额" width="150" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.money ? "￥" + parseFloat(scope.row.money).toFixed(2) : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="利息" width="150" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.interest ? scope.row.interest * 100 + "%" : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="利息管理费" width="150" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.managerfee
              ? "￥" + parseFloat(scope.row.managerfee).toFixed(2)
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收益方式" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已收金额" width="150" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.amount
              ? "￥" + parseFloat(scope.row.amount).toFixed(2)
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="待收总额" width="150" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.duein ? "￥" + parseFloat(scope.row.duein).toFixed(2) : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资渠道" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ditch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资时间" width="150" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.investime
              ? new Date(scope.row.investime).toLocaleDateString()
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资状态" width="150" prop="state" align="center">
        <template slot-scope="scope">
          <p v-if="tableData[scope.$index].state == 1">待回款</p>
          <p v-if="tableData[scope.$index].state == 2">已结算</p>
          <p v-if="tableData[scope.$index].state == 3">撤标</p>
          <p v-if="tableData[scope.$index].state == 4">流标</p>
          <p v-if="tableData[scope.$index].state == 5">投资中</p>
          <p v-if="tableData[scope.$index].state == 6">投资失败</p>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="sizes,total,  jumper ,prev, pager, next"
      :total="total"
      prev-text="上一页"
      next-text="下一页"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "debitItems",
  data() {
    return {
      input1: "",
      input2: "",
      options: [
        {
          value: "",
          label: ""
        }
      ],
      value: "",
      tableData: [],
      currentPage4: 1,
      pageSize: 10,
      total: 8,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      loading: false
    };
  },
  mounted: function() {
    this.getInvestList();
    this.getInvestStateList();
  },
  methods: {
    getInvestList() {
      this.loading = true;
      this.$axios
        .post("/markApi/finance/investment/findAllPage", {
          limit: this.currentPage4,
          page: this.pageSize
        })
        .then(response => {
          console.log(response.data);
          var result = response.data;
          this.tableData = result.data;
          this.total = response.data.count;
          this.loading = false;
        })
        .catch(() => {});
    },
    getInvestStateList() {
      this.loading = true;
      this.$axios
        .post("/api/finance/investment/findAllPage")
        .then(response => {
          var result = response.data;
          this.options = result.data;
          this.loading = false;
          console.log(response.data);
        })
        .catch(() => {});
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    investSearch() {
      this.loading = true;
      this.$axios
        .post("/markApi/finance/investment/findAllPage", {
          limit: this.currentPage4,
          page: this.pageSize,
          phone: this.input1,
          entitle: this.input2,
          state: this.value,
          startDate:
            this.value2 && this.value2[0] && this.value2[0] != null
              ? `${new Date(this.value2[0]).getFullYear()}-${Number(
                  new Date(this.value2[0]).getMonth() + 1
                )}-${new Date(this.value2[0]).getDate()}`
              : "",
          endDate:
            this.value2 && this.value2[1] && this.value2[1] != null
              ? `${new Date(this.value2[1]).getFullYear()}-${Number(
                  new Date(this.value2[1]).getMonth() + 1
                )}-${new Date(this.value2[1]).getDate()}`
              : "",
              count: this.total
        })
        .then(response => {
          if (response.data.code == 200) {
            this.tableData = response.data.data;
            this.total = response.data.count;
            console.log(response.data.data,response.data.count);
            this.loading = false;
          } else {
            this.$message(response.data.msg);
            this.loading = false;
          }
        })
        .catch(() => {
          this.$alert("请求出错");
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.investSearch();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.investSearch();
    }
  }
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px solid;
}
.el-pagination {
  position: absolute;
  bottom: 30px;
  right: 30px;
}
.searchLan {
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>
