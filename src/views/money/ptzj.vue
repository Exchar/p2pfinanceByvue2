<template lang="yi">
  <div>
  <el-row :gutter="8">
  <el-col :span="3"><el-input  placeholder="搜索流水号" prefix-icon="el-icon-search" v-model="input1"></el-input><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="3"><el-select  v-model="value" placeholder="全部类型"><el-option v-for="item in options" :key="item.value" :label="item.label":value="item.value"></el-option></el-select><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="16"><el-select  v-model="value" placeholder="出入账"><el-option v-for="item in times" :key="item.value" :label="item.label":value="item.value"></el-option></el-select><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="2"><el-row class="but"><el-button plain>导出</el-button></el-row><div class="grid-content bg-purple"></div></el-col>
</el-row>
  <el-table
    :data="tableData">
    <el-table-column
      prop="number"
      label="流水号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="number"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="出入账"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="操作资金"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="手续费"
      width="100">
    </el-table-column>
    <el-table-column
      prop="czje"
      label="操作前金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="dzje"
      label="操作后金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sxf"
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="czfs"
      label="备注"
      width="120">
    </el-table-column>
    <el-table-column
      prop="jylsh"
      label="操作时间"
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
      input1: "",
      value: "",
      value1: "",
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
          label: "平台充值"
        },
        {
          value: "选项2",
          label: "平台提现"
        },
        {
          value: "选项3",
          label: "借款管理费"
        },
        {
          value: "选项4",
          label: "利息管理费"
        },
        {
          value: "选项5",
          label: "还款垫付"
        }
      ],
      times: [
        {
          value1: "选项1",
          label: "出账"
        },
        {
          value: "选项2",
          label: "入账"
        }
      ]
    };
  }
};
</script>
<style scoped>
.el-col {
  padding: 5px 5px 5px 5px;
}
</style>
