<template lang="yi">
  <div>
  <el-row :gutter="8">
  <el-col :span="3"><el-input  placeholder="搜索用户手机" prefix-icon="el-icon-search" v-model="input1"></el-input><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="3"><el-input  placeholder="搜索姓名" prefix-icon="el-icon-search" v-model="input2"></el-input><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="16"><el-select  v-model="value" placeholder="全部用户"><el-option v-for="item in options" :key="item.value" :label="item.label":value="item.value"></el-option></el-select><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="2"><el-row class="but"><el-button plain>导出</el-button></el-row><div class="grid-content bg-purple"></div></el-col>
</el-row>
  <el-table
    :data="tableData">
    <el-table-column
      prop="number"
      label="用户id"
      width="150">
    </el-table-column>
    <el-table-column
      prop="number"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户手机"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="总资产"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="可用余额"
      width="100">
    </el-table-column>
    <el-table-column
      prop="czje"
      label="冻结金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="dzje"
      label="待收金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sxf"
      label="累计投资"
      width="120">
    </el-table-column>
    <el-table-column
      prop="czfs"
      label="累计投资收益"
      width="120">
    </el-table-column>
    <el-table-column
      prop="jylsh"
      label="累计借款"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="累计还款"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="借还款差额"
      width="120">
    </el-table-column>
  </el-table>
  <div class="blocks">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
<div style="height: 100vh; ">
<el-scrollbar style="height: 100%;">
<div style="height: 50opx;width: 100%;background: red;"></div>
<div style="height: 50opx;width: 100%;background: yellowgreen;"></div>
<div style="height: 50opx;width: 100%; background: blueviolet; "></div>
</el-scrollbar>
</div>
  </div>
</template>
<script>
export default {
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
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
      value1: "",
      value2: "",
      input1: "",
      input2: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市",
          zip: 200333
        }
      ],
      options: [
        {
          value: "选项1",
          label: "投资用户"
        },
        {
          value: "选项4",
          label: "借款用户"
        }
      ],
      value: ""
    };
  }
};
</script>
<style scoped>
.el-col {
  padding: 5px 5px 5px 5px;
}
</style>
