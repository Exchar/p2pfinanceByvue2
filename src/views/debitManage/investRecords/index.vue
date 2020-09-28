<template>
  <div>
    <el-row :gutter="20">
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
        <el-select v-model="value" placeholder="全部状态"  @change="handleCurrentChange">
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
    <el-table :data="tableData" style="width: 100%" height="350px"  v-loading="loading">
      <el-table-column label="标的编号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资人" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.investor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资人手机" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标名" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.entitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资金额" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="利息" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.interest }}</span>
        </template>
      </el-table-column>
      <el-table-column label="利息管理费" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.managerfee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收益方式" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已收金额" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="待收总额" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.duein }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资渠道" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.ditch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资时间" width="150">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.investime).toLocaleDateString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资状态" width="150" prop="state">
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
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="sizes,total,  jumper ,prev, pager, next"
        :total="8"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
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
      pageSize:5,
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
      loading: true
    };
  },
  mounted: function() {
    this.getInvestList();
    this.getInvestStateList();
  },
  methods: {
    getInvestList() {     
         this.$axios
        .post("/debitApi/finance/investment/findAllPage",{
          limit:this.currentPage4,
          page:this.pageSize
        })
        .then(response => {
          var result = response.data;
          this.tableData = result.data;
          this.loading=false;
          console.log(result.data);
        })
        .catch(() => {});
    },
    getInvestStateList() {
      this.$axios
        .post("/api/finance/investment/findAllPage")
        .then(response => {
          var result = response.data;
          this.options = result.data;
          console.log(result);
        })
        .catch(() => {});
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    investSearch() {
      console.log({
          limit:this.currentPage4,
          page:this.pageSize,
          phone: this.input1,
          entitle: this.input2,
          investState: this.value,
          startDate: new Date(this.value2[0]).getFullYear()+"-"+new Date(this.value2[0]).getMonth()+"-"+new Date(this.value2[0]).getDate(),
          endDate:new Date(this.value2[1]).getFullYear()+"-"+new Date(this.value2[1]).getMonth()+"-"+new Date(this.value2[1]).getDate()
        })
      this.$axios
        .post("/debitApi/finance/investment/findAllPage", {
          limit:this.currentPage4,
          page:this.pageSize,
          phone: this.input1,
          entitle: this.input2,
          investState: this.value,
          startDate: new Date(this.value2[0]).getFullYear()+"-"+new Date(this.value2[0]).getMonth()+"-"+new Date(this.value2[0]).getDate(),
          endDate:new Date(this.value2[1]).getFullYear()+"-"+new Date(this.value2[1]).getMonth()+"-"+new Date(this.value2[1]).getDate()
        })
        .then(response => {
          if (response.data.code == 200) {
             this.tableData=response.data.data;
             console.log(response.data.data)
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(() => {
          this.$alert("请求出错");
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange() {
      this.investSearch();
    },
    handleCurrentChange() {
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
</style>
