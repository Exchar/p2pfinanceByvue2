<template>
  <el-row :gutter="20">
    <el-col :span="4"
      ><el-input
        v-model="input"
        placeholder="搜索借款方"
        suffix-icon="el-icon-search"
      ></el-input
    ></el-col>
    <el-col :span="4"
      ><el-input
        v-model="input"
        placeholder="搜索借款人手机"
        suffix-icon="el-icon-search"
      ></el-input
    ></el-col>
    <el-col :span="4">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option> </el-select
    ></el-col>
    <el-col :span="3" :offset="6"
      ><el-button type="primary" plain>自定义列</el-button></el-col
    >
    <el-col :span="3"><el-button type="primary" plain>导出</el-button></el-col>
    <el-table :data="debitltemsData" style="width: 100%">
      <el-table-column label="借款ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借款方" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.borrower }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借款人手机" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借款名称" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.borrowname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借款金额" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年化利率" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.annual }}</span>
        </template>
      </el-table-column>
      <el-table-column label="还款方式" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.repayment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="期限" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.deadline }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借款管理费月率" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.monthly }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借款管理费" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.managerfee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上架时间" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.putawaytime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开售时间" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.saletime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投资进度" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.investprocess }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.state }}</span>
        </template> </el-table-column
      ><el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row)"
            >详情</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-edit"
            circle
            @click="del(scope.row)"
            >投资记录</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row)"
            >还款记录</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="sizes,total,  jumper ,prev, pager, next"
        :total="400"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
export default {
  name: "debitItems",
  data() {
    return {
      input: "",
      options: [
        {
          value: "选项1",
          label: "全部状态"
        },
        {
          value: "选项2",
          label: "新标待审核"
        },
        {
          value: "选项3",
          label: "初审不通过"
        },
        {
          value: "选项4",
          label: "新标待上架"
        },
        {
          value: "选项5",
          label: "满标待审"
        },
        {
          value: "选项6",
          label: "还款中"
        },
        {
          value: "选项7",
          label: "已完成"
        },
        {
          value: "选项8",
          label: "流标"
        },
        {
          value: "选项9",
          label: "撤标"
        }
      ],
      value: "",
      debitltemsData:[],
      tableData: {
        num: "",
        borrower: "",
        phone: "",
        borrowname: "",
        money: "",
        annual: "",
        repayment: "",
        deadline: "",
        monthly: "",
        managerfee: "",
        putawaytime: "",
        saletime: "",
        investprocess: "",
        state: ""
      },
      currentPage4: 4
    };
  },
  mounted: function() {
    this.getloanList();
  },
  methods: {
    getloanList: function() {
      this.$axios
        .get("http://localhost:5900/jieKuan")
        .then(response => {
          var result = response.data;
          if (result.code === 200) {
            this.debitltemsData = result.data;
          } else {
            this.$alert(result.message);
          }
        })
        .catch(() => {});
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
input.el-input__inner {
  width: 50px !important;
}
.el-pagination__total {
  margin-left: 20px;
}
</style>
