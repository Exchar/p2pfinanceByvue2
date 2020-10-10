<template lang="yi">
  <div>
  <!-- <el-row :gutter="8">
  <el-col :span="3"><el-input  placeholder="搜索用户手机" prefix-icon="el-icon-search" ></el-input><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="3"><el-input  placeholder="搜索账户名" prefix-icon="el-icon-search" </el-input><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="3"><el-select  v-model="value" placeholder="全部状态"><el-option :key="item.value" :label="item.label":value="item.value"></el-option></el-select><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="3"><el-select  v-model="value" placeholder="全部状态"><el-option :key="item.value" :label="item.label":value="item.value"></el-option></el-select><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="10"><el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="2"><el-row class="but"><el-button plain>导出</el-button></el-row><div class="grid-content bg-purple"></div></el-col>
</el-row>
  <el-table
    :data="tableData">
    <el-table-column
      prop="number"
      label="提现单号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="number"
      label="用户手机"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="真实姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="用户类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="提现金额"
      width="100">
    </el-table-column>
    <el-table-column
      prop="czje"
      label="提现手续费"
      width="120">
    </el-table-column>
    <el-table-column
      prop="dzje"
      label="到账金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sxf"
      label="银行账号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="czfs"
      label="银行名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="jylsh"
      label="交易流水号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="提交时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="审核人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="right"
      label="提交时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="right"
      label="到账时间"
      width="120">
    </el-table-column>
  </el-table> -->
  <!-- <div class="blocks">
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
</div> -->
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
      // currentPage4:"",
      limit: 1,
      page: 5,
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
      created() {
        this.$axios
          .post("/markApi/finance/rechargeRecord/selectAll", {
            limit: 5,
            page: 1
          })
          .then(req => {
            console.log(req.data);
          })
          .catch(req => {
            console.log(req);
          });
      },
      methods: {}
    };
  }
};
</script>
<style scoped>
.el-col {
  padding: 5px 5px 5px 5px;
}
</style>
